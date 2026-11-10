#!/usr/bin/env bash
# What: GitHub guardrail check, run by .github/workflows/guardrails.yml (and testable locally).
# How: List files a branch (default HEAD) changed since it left main (git diff main...<head>). For a pull request into main:
#      no research/ files. For a member/* branch: only research/ files. Never any private-data/ file.
# Objective: member work never lands in main, members never change club files, and raw personal data never reaches GitHub.
set -euo pipefail
mode="${1:?usage: check-branch.sh pr|member [base-ref] [head-ref]}"
base="${2:-origin/main}"
head="${3:-HEAD}"
files="$(git diff --name-only "$base...$head")"
fail=0
bad_private="$(printf '%s\n' "$files" | grep -E '(^|/)private-data/' | grep -v '/\.gitkeep$' || true)"
if [ -n "$bad_private" ]; then echo "::error::private-data files must never be committed:"; echo "$bad_private"; fail=1; fi
case "$mode" in
  pr)
    bad="$(printf '%s\n' "$files" | grep -E '^research/' || true)"
    [ -z "$bad" ] || { echo "::error::Pull requests into main must not include member research/ files:"; echo "$bad"; fail=1; } ;;
  member)
    bad="$(printf '%s\n' "$files" | grep -vE '^research/' | grep -v '^$' || true)"
    [ -z "$bad" ] || { echo "::error::Member branches may only change research/. These are club files:"; echo "$bad"; fail=1; } ;;
  *) echo "unknown mode: $mode" >&2; exit 2 ;;
esac
[ "$fail" -eq 0 ] && echo "Guardrails OK ($mode): $(printf '%s\n' "$files" | grep -c . || true) changed file(s)."
exit "$fail"
