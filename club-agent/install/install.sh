#!/usr/bin/env bash
# What: Creates (or safely refreshes) a member's my-research workspace linked to this Club Agent kit.
# How: Makes folders, links club/ and the skills for Claude Code and Codex, copies templates only where missing, fills profile.md.
# Objective: A working setup in minutes that never overwrites anything the member has written.
set -euo pipefail

usage() {
  cat >&2 <<'USAGE'
Usage: install.sh [--kit DIR] [--workspace DIR]
                  [--non-interactive --name NAME --level L1..L5 [--intensity gentle|standard|relentless] --interests "a,b"]
USAGE
}

die() { echo "error: $1" >&2; exit "${2:-2}"; }

# What: defaults. How: kit = folder above this script; workspace = ~/my-research. Objective: zero-argument install works.
KIT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)"
WS="$HOME/my-research"
NONINTERACTIVE=0
NAME="" LEVEL="" INTENSITY="" INTERESTS=""

while [ $# -gt 0 ]; do
  case "$1" in
    --kit) KIT="${2:?}"; shift 2 ;;
    --workspace) WS="${2:?}"; shift 2 ;;
    --non-interactive) NONINTERACTIVE=1; shift ;;
    --name) NAME="${2:?}"; shift 2 ;;
    --level) LEVEL="${2:?}"; shift 2 ;;
    --intensity) INTENSITY="${2:?}"; shift 2 ;;
    --interests) INTERESTS="${2:?}"; shift 2 ;;
    -h|--help) usage; exit 0 ;;
    *) usage; die "unknown argument: $1" ;;
  esac
done

# What: ask the 4 profile questions. How: only when interactive and profile.md does not exist yet. Objective: same answers as --non-interactive.
if [ "$NONINTERACTIVE" -eq 0 ] && [ ! -f "$WS/profile.md" ]; then
  read -r -p "What should the agent call you? " NAME
  read -r -p "Your AI comfort level, L1 (new) to L5 (builder): " LEVEL
  read -r -p "Fields or problems that interest you (comma separated): " INTERESTS
  read -r -p "Intensity: gentle, standard or relentless (Enter for the default for your level): " INTENSITY
fi

# What: validate inputs before touching disk. How: exit 2 with a clear message. Objective: no half-built workspace on bad input.
if [ ! -f "$WS/profile.md" ]; then
  case "$LEVEL" in L1|L2|L3|L4|L5) ;; *) die "level must be L1-L5" ;; esac
fi
case "$INTENSITY" in
  "") case "$LEVEL" in L1|L2) INTENSITY=gentle ;; L3) INTENSITY=standard ;; *) INTENSITY=relentless ;; esac ;;
  gentle|standard|relentless) ;;
  *) die "intensity must be gentle, standard or relentless" ;;
esac
[ -f "$KIT/AGENTS.md" ] && [ -d "$KIT/skills" ] || die "not a Club Agent kit: $KIT"
KIT="$(cd "$KIT" && pwd -P)"

# What: folders and links. How: mkdir -p; replace club only if it is already a symlink. Objective: idempotent, never clobber real folders.
mkdir -p "$WS"/{problems,domains,digests,private-data,.claude,.agents}
touch "$WS/private-data/.gitkeep"
if [ -L "$WS/club" ]; then rm "$WS/club"; fi
[ -e "$WS/club" ] && die "$WS/club exists and is not a link; move it aside and re-run" 1
ln -s "$KIT" "$WS/club"
for d in .claude .agents; do
  if [ -L "$WS/$d/skills" ]; then rm "$WS/$d/skills"; fi
  [ -e "$WS/$d/skills" ] || ln -s ../club/skills "$WS/$d/skills"
done

# What: copy workspace templates only where absent. How: cp per file with an existence check. Objective: member edits survive every re-run.
for f in AGENTS.md CLAUDE.md LOCAL.md watchlist.md; do
  [ -e "$WS/$f" ] || cp "$KIT/templates/workspace/$f" "$WS/$f"
done
[ -e "$WS/.claude/settings.json" ] || cp "$KIT/install/claude-settings.json" "$WS/.claude/settings.json"

# What: create profile.md once. How: bash string substitution (safe for any characters in answers). Objective: the agent knows who it is talking to.
if [ ! -e "$WS/profile.md" ]; then
  t="$(cat "$KIT/templates/workspace/profile.md")"
  t="${t//'{{NAME}}'/$NAME}"; t="${t//'{{LEVEL}}'/$LEVEL}"
  t="${t//'{{INTENSITY}}'/$INTENSITY}"; t="${t//'{{INTERESTS}}'/$INTERESTS}"
  printf '%s\n' "$t" > "$WS/profile.md"
fi

echo "Club Agent workspace ready."
echo "Open this folder in Claude Code: $WS"
echo "Then paste a problem statement to start."
