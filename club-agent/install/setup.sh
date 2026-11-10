#!/usr/bin/env bash
# What: One-time setup that turns a fresh clone of ai-club-agent into a member's research workspace.
# How: Switches to (or creates) the member's own branch member/<github-name>, builds research/ from templates, adds local
#      guardrails (Claude Code settings + git hooks), then commits research/ and pushes the branch.
# Objective: One command after cloning. No separate folders or links; club updates arrive through git every session.
set -euo pipefail

usage() {
  cat >&2 <<'USAGE'
Usage: setup.sh [--github USERNAME] [--non-interactive --name NAME --level L1..L5 [--intensity gentle|standard|relentless] --interests "a,b"] [--no-push]
USAGE
}

die() { echo "error: $1" >&2; exit "${2:-2}"; }

# What: replace every {{KEY}} in a text with a value. How: split on the key instead of ${t//pat/rep}, whose handling of
#       "&" and quotes differs between bash 3.2 (macOS) and 5.2 (Git Bash). Objective: answers like "M&A" survive as typed.
fill() {
  local text="$1" key="$2" val="$3" out=""
  while [[ "$text" == *"$key"* ]]; do
    out="$out${text%%"$key"*}$val"
    text="${text#*"$key"}"
  done
  printf '%s' "$out$text"
}

# What: work from the repo root. How: this script lives in club-agent/install/. Objective: runs the same from any folder.
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd -P)"
cd "$ROOT"
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || die "run this inside the ai-club-agent folder that git clone made"
[ -f club-agent/AGENTS.md ] && [ -d .claude/skills ] || die "not an ai-club-agent repo: $ROOT"

GH="" NAME="" LEVEL="" INTENSITY="" INTERESTS="" NONINTERACTIVE=0 PUSH=1
while [ $# -gt 0 ]; do
  case "$1" in
    --github) GH="${2:?}"; shift 2 ;;
    --non-interactive) NONINTERACTIVE=1; shift ;;
    --name) NAME="${2:?}"; shift 2 ;;
    --level) LEVEL="${2:?}"; shift 2 ;;
    --intensity) INTENSITY="${2:?}"; shift 2 ;;
    --interests) INTERESTS="${2:?}"; shift 2 ;;
    --no-push) PUSH=0; shift ;;
    -h|--help) usage; exit 0 ;;
    *) usage; die "unknown argument: $1" ;;
  esac
done

# What: pick the member branch name. How: --github, else the current member branch, else the gh CLI login, else ask.
# Objective: one branch per member, with the same name on every laptop they use.
current="$(git branch --show-current)"
if [ -z "$GH" ] && [[ "$current" == member/* ]]; then GH="${current#member/}"; fi
if [ -z "$GH" ] && command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
  GH="$(gh api user -q .login 2>/dev/null || true)"
fi
if [ -z "$GH" ] && [ "$NONINTERACTIVE" -eq 0 ]; then read -r -p "Your GitHub username: " GH; fi
GH="$(printf '%s' "$GH" | tr '[:upper:]' '[:lower:]' | sed -e 's/[^a-z0-9-]/-/g' -e 's/^-*//' -e 's/-*$//')"
[ -n "$GH" ] || die "a GitHub username is required (use --github USERNAME)"
BRANCH="member/$GH"
# Interactive runs may let git ask for a GitHub sign-in; agent-run (non-interactive) ones must never hang on a prompt.
[ "$NONINTERACTIVE" -eq 1 ] && export GIT_TERMINAL_PROMPT=0

# What: switch to the member branch. How: resume a local or GitHub copy if one exists, else branch off the latest main
#       without tracking it. Objective: returning members get their work back; new members start from current club files.
if [ "$current" != "$BRANCH" ]; then
  [ -z "$(git status --porcelain --untracked-files=no)" ] || die "you have unsaved changes to club files; undo them (git restore .) and run setup again" 1
  # Only main and this member's own branch: never download every classmate's branch.
  git fetch -q origin main </dev/null 2>/dev/null || echo "note: could not reach GitHub; setting up offline"
  git fetch -q origin "$BRANCH" </dev/null 2>/dev/null || true
  if git show-ref --verify --quiet "refs/heads/$BRANCH"; then
    git switch -q "$BRANCH"
  elif git show-ref --verify --quiet "refs/remotes/origin/$BRANCH"; then
    git switch -q -c "$BRANCH" --track "origin/$BRANCH"
  else
    base=HEAD
    git show-ref --verify --quiet refs/remotes/origin/main && base=origin/main
    git switch -q --no-track -c "$BRANCH" "$base"
  fi
fi

# What: ask the 4 profile questions. How: only when interactive and research/profile.md does not exist. Objective: the agent knows who it talks to.
PROFILE="research/profile.md"
if [ ! -f "$PROFILE" ]; then
  if [ "$NONINTERACTIVE" -eq 0 ]; then
    read -r -p "What should the agent call you? " NAME
    read -r -p "Your AI comfort level, L1 (new) to L5 (builder): " LEVEL
    read -r -p "Fields or problems that interest you (comma separated): " INTERESTS
    read -r -p "Intensity: gentle, standard or relentless (Enter for the default for your level): " INTENSITY
  fi
  # Accept "l2" or a bare "2" as L2.
  LEVEL="$(printf '%s' "$LEVEL" | tr '[:lower:]' '[:upper:]' | tr -d ' ')"
  case "$LEVEL" in [1-5]) LEVEL="L$LEVEL" ;; esac
  # What: validate before writing. How: exit 2 with a clear message. Objective: no half-built workspace on bad input.
  case "$LEVEL" in L1|L2|L3|L4|L5) ;; *) die "level must be L1-L5" ;; esac
  case "$INTENSITY" in
    "") case "$LEVEL" in L1|L2) INTENSITY=gentle ;; L3) INTENSITY=standard ;; *) INTENSITY=relentless ;; esac ;;
    gentle|standard|relentless) ;;
    *) die "intensity must be gentle, standard or relentless" ;;
  esac
  [ -n "$NAME" ] || die "name is required"
fi

# What: build research/ from templates. How: create folders, copy templates only where absent, write profile.md once.
# Objective: member edits survive every re-run; empty folders are kept in git with .gitkeep.
mkdir -p research/problems research/domains research/digests research/private-data
for d in problems domains digests; do [ -e "research/$d/.gitkeep" ] || : > "research/$d/.gitkeep"; done
for f in LOCAL.md watchlist.md; do [ -e "research/$f" ] || cp "club-agent/templates/research/$f" "research/$f"; done
if [ ! -e "$PROFILE" ]; then
  t="$(cat club-agent/templates/research/profile.md)"
  t="$(fill "$t" '{{NAME}}' "$NAME")"; t="$(fill "$t" '{{LEVEL}}' "$LEVEL")"
  t="$(fill "$t" '{{INTENSITY}}' "$INTENSITY")"; t="$(fill "$t" '{{INTERESTS}}' "$INTERESTS")"
  printf '%s\n' "$t" > "$PROFILE"
fi

# What: local guardrails. How: Claude Code may not edit club files (deny rules in the git-ignored settings.local.json,
#       merged into any existing file), and git hooks block commits outside research/.
# Objective: members can't accidentally break files that update from main.
DENY=("Edit(./club-agent/**)" "Edit(./club-packs/**)" "Edit(./site/**)" "Edit(./.claude/skills/**)"
  "Edit(./.claude/settings.json)" "Edit(./.github/**)" "Edit(./CLAUDE.md)" "Edit(./AGENTS.md)")
LOCAL_SETTINGS=.claude/settings.local.json
merge_deny() {
  command -v python3 >/dev/null 2>&1 || return 1
  python3 - "$LOCAL_SETTINGS" "${DENY[@]}" <<'PY' 2>/dev/null
import json, sys
path, rules = sys.argv[1], sys.argv[2:]
with open(path) as f:
    data = json.load(f)
deny = data.setdefault("permissions", {}).setdefault("deny", [])
deny.extend(r for r in rules if r not in deny)
with open(path, "w") as f:
    json.dump(data, f, indent=2)
    f.write("\n")
PY
}
if [ -e "$LOCAL_SETTINGS" ] && ! grep -qF "${DENY[0]}" "$LOCAL_SETTINGS"; then
  if ! merge_deny; then
    mv "$LOCAL_SETTINGS" "$LOCAL_SETTINGS.bak"
    echo "note: replaced $LOCAL_SETTINGS (old copy kept as $LOCAL_SETTINGS.bak)"
  fi
fi
if [ ! -e "$LOCAL_SETTINGS" ]; then
  {
    printf '{\n  "permissions": {\n    "deny": [\n'
    for i in "${!DENY[@]}"; do
      sep=","; [ "$i" -eq $((${#DENY[@]} - 1)) ] && sep=""
      printf '      "%s"%s\n' "${DENY[$i]}" "$sep"
    done
    printf '    ]\n  }\n}\n'
  } > "$LOCAL_SETTINGS"
fi
git config core.hooksPath club-agent/githooks

# What: a commit identity for this repo. How: always the member's GitHub no-reply address (the repo is public, so a real
#       email in commits would be published); a name only when git has none. Objective: first commit works, email stays private.
[ -n "$(git config user.name || true)" ] || git config user.name "${NAME:-$GH}"
git config user.email "$GH@users.noreply.github.com"

# What: save and upload. How: commit only research/, then push the member branch. Objective: work is backed up on GitHub from day one.
git add -A research
if ! git diff --cached --quiet -- research; then git commit -q -m "Set up research workspace for $GH" -- research; fi
if [ "$PUSH" -eq 1 ]; then
  if git push -q -u origin "$BRANCH" </dev/null; then
    echo "Uploaded your branch $BRANCH to GitHub."
  else
    echo "note: could not upload to GitHub yet. Accept the club's GitHub invitation and sign in to git, then run setup again. Your work is saved on this laptop."
  fi
fi

echo "Club Agent ready on branch $BRANCH."
echo "Open this folder in Claude Code: $ROOT"
echo "Then say hi, or: start problem 07"
