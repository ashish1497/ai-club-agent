# What: Windows installer that creates (or safely refreshes) a member's my-research workspace linked to this Club Agent kit.
# How: Same steps as install.sh: folders, club link, skill links (symlink, then junction, then copy), templates only where missing, profile.md.
# Objective: Windows members get the same working setup in minutes, and nothing they wrote is ever overwritten.
param(
  [string]$Kit = (Split-Path -Parent $PSScriptRoot),
  [string]$Workspace = (Join-Path $HOME "my-research"),
  [switch]$NonInteractive,
  [string]$Name = "",
  [string]$Level = "",
  [string]$Intensity = "",
  [string]$Interests = ""
)
$ErrorActionPreference = "Stop"

function Fail([string]$msg, [int]$code = 2) { [Console]::Error.WriteLine("error: $msg"); exit $code }

$profilePath = Join-Path $Workspace "profile.md"

# What: ask the 4 profile questions. How: only when interactive and no profile yet. Objective: parity with install.sh.
if (-not $NonInteractive -and -not (Test-Path $profilePath)) {
  $Name = Read-Host "What should the agent call you?"
  $Level = Read-Host "Your AI comfort level, L1 (new) to L5 (builder)"
  $Interests = Read-Host "Fields or problems that interest you (comma separated)"
  $Intensity = Read-Host "Intensity: gentle, standard or relentless (Enter for the default)"
}

# What: validate before touching disk. How: exit 2 with the same messages as install.sh. Objective: no half-built workspace.
if (-not (Test-Path $profilePath)) {
  if ($Level -notmatch '^L[1-5]$') { Fail "level must be L1-L5" }
}
if ($Intensity -eq "") {
  $Intensity = switch ($Level) { "L1" {"gentle"} "L2" {"gentle"} "L3" {"standard"} default {"relentless"} }
} elseif ($Intensity -notin @("gentle", "standard", "relentless")) {
  Fail "intensity must be gentle, standard or relentless"
}
if (-not ((Test-Path (Join-Path $Kit "AGENTS.md")) -and (Test-Path (Join-Path $Kit "skills")))) { Fail "not a Club Agent kit: $Kit" }
$Kit = (Resolve-Path $Kit).Path

# What: link helper. How: try a symlink, then a directory junction, then a copy (marked with .COPIED). Objective: works without admin rights.
$script:copied = $false
function New-DirLink([string]$link, [string]$target) {
  $item = Get-Item $link -Force -ErrorAction SilentlyContinue
  # Delete only the link itself, never what it points to (Remove-Item can recurse through junctions on PowerShell 5.1).
  if ($item -and $item.LinkType) { [System.IO.Directory]::Delete($link) }
  elseif ($item) {
    if (Test-Path (Join-Path $link ".COPIED")) { Remove-Item $link -Recurse -Force }
    else { Fail "$link exists and is not a link; move it aside and re-run" 1 }
  }
  try { New-Item -ItemType SymbolicLink -Path $link -Target $target | Out-Null; return } catch {}
  try { New-Item -ItemType Junction -Path $link -Target $target | Out-Null; return } catch {}
  Copy-Item $target $link -Recurse
  New-Item -ItemType File -Path (Join-Path $link ".COPIED") | Out-Null
  $script:copied = $true
}

# What: folders and links. How: create dirs; link club and both skills paths to the kit. Objective: Claude Code and Codex both find the skills.
foreach ($d in @("problems", "domains", "digests", "private-data", ".claude", ".agents")) {
  New-Item -ItemType Directory -Force -Path (Join-Path $Workspace $d) | Out-Null
}
New-Item -ItemType File -Force -Path (Join-Path $Workspace "private-data/.gitkeep") | Out-Null
New-DirLink (Join-Path $Workspace "club") $Kit
foreach ($d in @(".claude", ".agents")) { New-DirLink (Join-Path $Workspace "$d/skills") (Join-Path $Kit "skills") }

# What: templates only where absent. How: Test-Path before each copy. Objective: member edits survive every re-run.
foreach ($f in @("AGENTS.md", "CLAUDE.md", "LOCAL.md", "watchlist.md")) {
  $dest = Join-Path $Workspace $f
  if (-not (Test-Path $dest)) { Copy-Item (Join-Path $Kit "templates/workspace/$f") $dest }
}
$settings = Join-Path $Workspace ".claude/settings.json"
if (-not (Test-Path $settings)) { Copy-Item (Join-Path $Kit "install/claude-settings.json") $settings }

# What: create profile.md once. How: literal string replace of the 4 placeholders. Objective: the agent knows who it is talking to.
if (-not (Test-Path $profilePath)) {
  # Read and write UTF-8 without a BOM: PowerShell 5.1 defaults to ANSI (mangles non-English names), and a BOM would break the --- front matter.
  $t = Get-Content (Join-Path $Kit "templates/workspace/profile.md") -Raw -Encoding UTF8
  $t = $t.Replace("{{NAME}}", $Name).Replace("{{LEVEL}}", $Level).Replace("{{INTENSITY}}", $Intensity).Replace("{{INTERESTS}}", $Interests)
  [System.IO.File]::WriteAllText($profilePath, $t, [System.Text.UTF8Encoding]::new($false))
}

Write-Output "Club Agent workspace ready."
if ($script:copied) { Write-Output "Links were not allowed, so the kit was copied. Re-run the installer after every kit update." }
Write-Output "Open this folder in Claude Code: $Workspace"
Write-Output "Then paste a problem statement to start."
