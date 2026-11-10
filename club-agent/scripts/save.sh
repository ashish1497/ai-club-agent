#!/usr/bin/env bash
# What: Save the member's research to their GitHub branch (run by the handoff skill).
# How: Commit only research/ with the given message, then push the member branch. Upload failures are reported, not fatal.
# Objective: work is backed up and visible to the club, and nothing outside research/ is ever committed this way.
set -u
cd "$(dirname "${BASH_SOURCE[0]}")/../.." || exit 2
msg="${1:-Research update}"
branch="$(git branch --show-current)"
case "$branch" in member/*) ;; *) echo "error: save only works on your member branch (you are on '$branch'). Run club-agent/install/setup.sh first." >&2; exit 2 ;; esac
export GIT_TERMINAL_PROMPT=0

git add -A research
if git diff --cached --quiet -- research; then
  echo "Nothing new to save in research/."
else
  git commit -q -m "$msg" -- research || { echo "error: could not save (commit failed)." >&2; exit 1; }
  echo "Saved: $msg"
fi

# What: upload. How: push the member branch; if another laptop pushed first, merge that work in and push again; if a
#       guardrail blocked the push, show why. Objective: a backup off the laptop, and a clear reason when there isn't one.
push() { git push -q -u origin "$branch" 2>&1 >/dev/null; }
if git rev-parse -q --verify "@{u}" >/dev/null 2>&1 && git fetch -q origin "$branch" 2>/dev/null \
  && [ "$(git rev-list --count "@{u}..HEAD")" = "0" ]; then
  echo "GitHub already has everything."
  exit 0
fi
if err="$(push)"; then
  echo "Uploaded to GitHub ($branch)."
elif printf '%s' "$err" | grep -qE 'rejected|fetch first|non-fast-forward'; then
  # Another laptop saved first: bring that work in (research/ only changes, so it merges cleanly), then retry.
  if git fetch -q origin "$branch" 2>/dev/null && git merge -q --no-edit "origin/$branch" >/dev/null 2>&1 && err="$(push)"; then
    echo "Merged work saved from another laptop. Uploaded to GitHub ($branch)."
  else
    git merge --abort >/dev/null 2>&1
    echo "Saved on this laptop, but GitHub has different work on $branch that could not be merged automatically. Ask a club maintainer for help."
  fi
elif printf '%s' "$err" | grep -qE 'Blocked|::error::|hook declined'; then
  echo "Saved on this laptop, but the upload was blocked by a club guardrail:"
  printf '%s\n' "$err" | grep -vE '^(error: failed to push|To |hint:)' | sed '/^$/d'
else
  echo "Saved on this laptop, but the upload to GitHub failed (offline or no access yet). It will upload on the next save."
fi
exit 0
