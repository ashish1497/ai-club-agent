#!/usr/bin/env bash
# What: Propose one of the member's domain packs to the club library (run by the share-pack skill).
# How: Check research/domains/<field>.md has the 7 template headings, copy only that file onto a fresh pack/<name>-<field>
#      branch made from main (in a temporary worktree, so the member's branch is untouched), push it, print a PR link.
# Objective: sharing needs no git knowledge, and nothing else from research/ ever leaves the member branch.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/../.."
die() { echo "error: $1" >&2; exit "${2:-2}"; }

field="${1:-}"
[[ "$field" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]] || die "usage: share-pack.sh <field>  (kebab-case, e.g. retail-media)"
src="research/domains/$field.md"
[ -f "$src" ] || die "no pack at $src"
branch="$(git branch --show-current)"
case "$branch" in member/*) ;; *) die "run this on your member branch (you are on '$branch')" ;; esac
who="${branch#member/}"

# What: same 7 headings as the template. How: compare the template's "## " lines with the pack's. Objective: packs stay comparable.
while IFS= read -r h; do
  grep -qxF "$h" "$src" || die "$src is missing the heading: $h"
done < <(grep '^## ' club-agent/templates/domain-pack.md)

export GIT_TERMINAL_PROMPT=0
git fetch -q origin main 2>/dev/null || die "could not reach GitHub; try again when online" 1
pack_branch="pack/$who-$field"
tmp="$(mktemp -d)"
trap 'git worktree remove --force "$tmp" >/dev/null 2>&1 || true; rm -rf "$tmp"' EXIT
git worktree add -q --no-track -B "$pack_branch" "$tmp" origin/main
cp "$src" "$tmp/club-packs/packs/$field.md"
git -C "$tmp" add "club-packs/packs/$field.md"
git -C "$tmp" diff --cached --quiet && die "the library already has this exact pack" 1
git -C "$tmp" commit -q -m "Add $field domain pack (from $who)"
git -C "$tmp" push -q -f -u origin "$pack_branch" 2>/dev/null || die "upload failed (offline or no access yet); your pack is safe in $src" 1

# What: the pull-request link. How: turn the origin URL (https or ssh) into owner/repo. Objective: one click for the member.
repo="$(git remote get-url origin | sed -E 's#(\.git)?$##; s#^.*github\.com[:/]##')"
echo "Shared $field as branch $pack_branch."
echo "Open this link and click Create pull request: https://github.com/$repo/compare/main...$pack_branch?expand=1"
