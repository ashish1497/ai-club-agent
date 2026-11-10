#!/usr/bin/env bash
# What: Session-start update check, run by the Claude Code SessionStart hook in .claude/settings.json.
# How: On a member/* branch only: fetch the member's own branch (work saved on another laptop) and main, merge both in
#      (members change only research/, so they merge cleanly), and print what arrived. Never fails the session.
# Objective: every member works with their latest research and the latest club rules, skills and problems, unprompted.
set -u
cd "$(dirname "${BASH_SOURCE[0]}")/../.." 2>/dev/null || exit 0
branch="$(git branch --show-current 2>/dev/null)" || exit 0
case "$branch" in member/*) ;; *) exit 0 ;; esac
export GIT_TERMINAL_PROMPT=0

# What: keep the member guardrails on. How: re-point git at club-agent/githooks (an `npm install` would reset it).
# Objective: hooks can't silently switch off.
git config core.hooksPath club-agent/githooks

# What: one merge step. How: merge a ref if HEAD doesn't contain it yet; abort cleanly on failure. Objective: never leave a half-merge.
merge_in() { # $1 = ref, $2 = label for the agent
  local ref="$1" label="$2" n news
  git rev-parse -q --verify "$ref" >/dev/null || return 0
  n="$(git rev-list --count "HEAD..$ref" 2>/dev/null || echo 0)"
  [ "$n" = "0" ] && return 0
  news="$(git log --format='- %s' -n 5 "HEAD..$ref")"
  if git merge -q --no-edit "$ref" >/dev/null 2>&1; then
    echo "Club update check: pulled $n $label. Latest:"
    echo "$news"
    pulled=1
  else
    git merge --abort >/dev/null 2>&1
    echo "Club update check: $n $label could not be merged automatically. Tell the member their research/ files are safe and to ask a club maintainer for help."
    failed=1
  fi
}

pulled=0 failed=0
if ! git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=15 fetch -q origin main 2>/dev/null; then
  echo "Club update check: could not reach GitHub, so updates were skipped this session."
else
  git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=15 fetch -q origin "$branch" 2>/dev/null || true
  # What: refuse to merge over edited club files. How: look for uncommitted changes outside research/. Objective: never lose or tangle work.
  changed="$(git status --porcelain --untracked-files=no -- . ':(exclude)research' | sed 's/^...//' | tr '\n' ' ')"
  if [ -n "$changed" ]; then
    echo "Club update check: updates were not applied because these club files were edited: $changed"
    echo "Tell the member these files belong to the club and will be restored with: git restore $changed (then start a new session)."
  else
    # Staged research changes would make git refuse the merge; unstage them (the changes themselves stay).
    git reset -q -- research 2>/dev/null || true
    merge_in "origin/$branch" "research change(s) saved from another laptop"
    [ "$failed" = 1 ] || merge_in origin/main "club update(s)"
    [ "$pulled" = 1 ] || [ "$failed" = 1 ] || echo "Club update check: up to date."
  fi
fi

# What: remind about unsaved or un-uploaded work. How: research/ changes not committed; commits not pushed. Objective: nothing is lost between laptops.
if [ -n "$(git status --porcelain -- research 2>/dev/null)" ]; then
  echo "Unsaved research changes from last time: offer to save them (handoff)."
fi
if git rev-parse -q --verify "@{u}" >/dev/null 2>&1; then
  ahead="$(git rev-list --count "@{u}..HEAD" 2>/dev/null || echo 0)"
  [ "$ahead" = "0" ] || echo "$ahead saved change(s) not uploaded to GitHub yet: they upload on the next save."
fi
exit 0
