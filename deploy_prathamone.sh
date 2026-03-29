#!/usr/bin/env bash
# =============================================================================
# PRATHAMONE MONOREPO → GITHUB PAGES  •  FULL DEPLOYMENT SCRIPT
# Version  : 2.0.0
# Repo type: Turborepo + pnpm + Next.js 14 (output: export) + Supabase
# Target   : GitHub Pages from /apps/web/out  via gh-pages branch
#
# USAGE (single command):
#   export GITHUB_USERNAME="prathamone" \
#          GITHUB_EMAIL="dev@prathamone.com" \
#          GITHUB_TOKEN="ghp_XXXX" \
#          REPO_NAME="prathamone" \
#          NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co" \
#          NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGc..." \
#          CUSTOM_DOMAIN="prathamone.com" && \
#   bash deploy_prathamone.sh
#
# RE-DEPLOY AFTER CHANGES (no config needed if env is already exported):
#   bash deploy_prathamone.sh
#
# WHAT THIS SCRIPT DOES — 18 sections, nothing skippable:
#   0.  Colour logger & trap for clean failure messages
#   1.  Configuration block  (all tunables in one place)
#   2.  Dependency check     (node, pnpm, git, gh, curl — auto-install)
#   3.  Node version gate    (must be >= 18, Next.js 14 requirement)
#   4.  pnpm version gate    (must be >= 8)
#   5.  GitHub CLI auth
#   6.  Git identity config
#   7.  Repo guard           (create or verify remote repo exists)
#   8.  Clone / pull repo    (always work from the real source)
#   9.  Environment file     (.env.local written from exported vars)
#   10. next.config.mjs guard(enforce output:'export' + images:unoptimized)
#   11. pnpm install         (frozen lockfile — reproducible)
#   12. turbo build          (apps/web only, with cache)
#   13. /out post-processing (.nojekyll, CNAME, 404.html, sitemap patch)
#   14. Verify /out          (index.html exists, non-empty, has DOCTYPE)
#   15. gh-pages branch push (orphan branch strategy — clean history)
#   16. Enable GitHub Pages  (REST API — branch: gh-pages, path: /)
#   17. Poll for live build  (wait up to 4 min, verify HTTP 200)
#   18. DNS instructions     (printed only when CUSTOM_DOMAIN is set)
#   19. Final summary
# =============================================================================

set -euo pipefail
IFS=$'\n\t'

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 0 — LOGGER + FAILURE TRAP
# ─────────────────────────────────────────────────────────────────────────────
RED='\033[0;31m';  GREEN='\033[0;32m'; YELLOW='\033[1;33m'
CYAN='\033[0;36m'; BOLD='\033[1m';    RESET='\033[0m'

log()    { echo -e "${CYAN}[INFO]${RESET}  $*"; }
ok()     { echo -e "${GREEN}[ OK ]${RESET}  $*"; }
warn()   { echo -e "${YELLOW}[WARN]${RESET}  $*"; }
fail()   { echo -e "${RED}[FAIL]${RESET}  $*"; exit 1; }
step()   { echo -e "\n${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n  $*\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"; }
divider(){ echo -e "${CYAN}─────────────────────────────────────────────────────${RESET}"; }

# Trap: print the line number where the script died
trap 'echo -e "${RED}[FAIL]${RESET}  Script failed at line $LINENO. Check output above." >&2' ERR

divider
echo -e "${BOLD}  PrathamOne Monorepo → GitHub Pages  •  v2.0.0${RESET}"
echo -e "  $(date '+%Y-%m-%d %H:%M:%S %Z')"
divider

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 1 — CONFIGURATION
# Every tunable value lives here. Secrets come from env vars — never hardcoded.
# ─────────────────────────────────────────────────────────────────────────────
step "SECTION 1 — CONFIGURATION"

# ── GitHub identity ───────────────────────────────────────────────────────────
GITHUB_USERNAME="${GITHUB_USERNAME:-}"
GITHUB_EMAIL="${GITHUB_EMAIL:-}"
GITHUB_TOKEN="${GITHUB_TOKEN:-}"

# ── Repository ────────────────────────────────────────────────────────────────
REPO_NAME="${REPO_NAME:-prathamone}"
REPO_VISIBILITY="${REPO_VISIBILITY:-public}"  # GitHub Pages requires public on free plans
SOURCE_BRANCH="${SOURCE_BRANCH:-main}"         # Branch that holds the monorepo source code
PAGES_BRANCH="${PAGES_BRANCH:-gh-pages}"       # Orphan branch that GitHub Pages deploys from

# ── Local paths ───────────────────────────────────────────────────────────────
WORK_DIR="${WORK_DIR:-$HOME/prathamone-deploy}"
REPO_FULL="$GITHUB_USERNAME/$REPO_NAME"
REMOTE_URL="https://${GITHUB_TOKEN}@github.com/${REPO_FULL}.git"
WEB_APP_DIR="$WORK_DIR/apps/web"
OUT_DIR="$WEB_APP_DIR/out"

# ── Next.js / build ───────────────────────────────────────────────────────────
# These are passed to the build as NEXT_PUBLIC_ env vars.
NEXT_PUBLIC_SUPABASE_URL="${NEXT_PUBLIC_SUPABASE_URL:-}"
NEXT_PUBLIC_SUPABASE_ANON_KEY="${NEXT_PUBLIC_SUPABASE_ANON_KEY:-}"
# Any extra public env vars can be appended to .env.local in Section 9.

# ── Custom domain ─────────────────────────────────────────────────────────────
CUSTOM_DOMAIN="${CUSTOM_DOMAIN:-}"   # e.g. "prathamone.com" — leave empty to skip

# ── Turbo build filter ────────────────────────────────────────────────────────
# Only build the web app; packages are built as dependencies automatically.
TURBO_FILTER="${TURBO_FILTER:-apps/web...}"

# ─────────────────────────────────────────────────────────────────────────────
# Validate required vars before doing anything
# ─────────────────────────────────────────────────────────────────────────────
_missing=()
[[ -z "$GITHUB_USERNAME" ]]  && _missing+=("GITHUB_USERNAME")
[[ -z "$GITHUB_EMAIL"    ]]  && _missing+=("GITHUB_EMAIL")
[[ -z "$GITHUB_TOKEN"    ]]  && _missing+=("GITHUB_TOKEN")

if [[ ${#_missing[@]} -gt 0 ]]; then
  fail "Missing required environment variables: ${_missing[*]}\n\n  Export them before running:\n    export GITHUB_USERNAME=yourusername\n    export GITHUB_EMAIL=you@email.com\n    export GITHUB_TOKEN=ghp_..."
fi

# Supabase keys are warned but not fatal — build can run without them
# (some pages may show errors at runtime, but the static export will complete)
[[ -z "$NEXT_PUBLIC_SUPABASE_URL"      ]] && warn "NEXT_PUBLIC_SUPABASE_URL not set — Supabase features will be disabled at runtime."
[[ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]] && warn "NEXT_PUBLIC_SUPABASE_ANON_KEY not set — Supabase features will be disabled at runtime."

ok "Configuration validated."
log "  GITHUB_USERNAME  : $GITHUB_USERNAME"
log "  REPO             : $REPO_FULL ($REPO_VISIBILITY)"
log "  SOURCE_BRANCH    : $SOURCE_BRANCH"
log "  PAGES_BRANCH     : $PAGES_BRANCH"
log "  WORK_DIR         : $WORK_DIR"
log "  WEB_APP_DIR      : $WEB_APP_DIR"
log "  TURBO_FILTER     : $TURBO_FILTER"
log "  CUSTOM_DOMAIN    : ${CUSTOM_DOMAIN:-<none — will use github.io URL>}"

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 2 — DEPENDENCY CHECK & AUTO-INSTALL
# Checks: git, curl, gh (GitHub CLI), node, pnpm
# ─────────────────────────────────────────────────────────────────────────────
step "SECTION 2 — DEPENDENCY CHECK"

_install() {
  local pkg="$1"
  log "Attempting to install: $pkg"
  if   command -v apt-get &>/dev/null; then sudo apt-get update -qq && sudo apt-get install -y "$pkg"
  elif command -v brew    &>/dev/null; then brew install "$pkg"
  elif command -v yum     &>/dev/null; then sudo yum install -y "$pkg"
  elif command -v dnf     &>/dev/null; then sudo dnf install -y "$pkg"
  else fail "Cannot auto-install '$pkg'. Install it manually then re-run."; fi
}

# git
command -v git  &>/dev/null || _install git
ok "git  : $(git --version)"

# curl
command -v curl &>/dev/null || _install curl
ok "curl : $(curl --version | head -1)"

# gh (GitHub CLI)
if ! command -v gh &>/dev/null; then
  if command -v brew &>/dev/null; then
    brew install gh
  else
    curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
      | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg 2>/dev/null
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] \
      https://cli.github.com/packages stable main" \
      | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
    sudo apt-get update -qq && sudo apt-get install -y gh
  fi
fi
ok "gh   : $(gh --version | head -1)"

# node — required; nvm install if missing
if ! command -v node &>/dev/null; then
  warn "node not found. Installing via nvm..."
  curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  # shellcheck disable=SC1090
  source "$HOME/.nvm/nvm.sh"
  nvm install --lts
  nvm use --lts
fi
ok "node : $(node --version)"

# pnpm — install via corepack if missing
if ! command -v pnpm &>/dev/null; then
  warn "pnpm not found. Installing via corepack..."
  corepack enable
  corepack prepare pnpm@latest --activate
fi
ok "pnpm : $(pnpm --version)"

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 3 — NODE VERSION GATE
# Next.js 14 requires Node >= 18.17.0
# ─────────────────────────────────────────────────────────────────────────────
step "SECTION 3 — NODE VERSION GATE"

NODE_MAJOR=$(node --version | sed 's/v//' | cut -d. -f1)
NODE_MINOR=$(node --version | sed 's/v//' | cut -d. -f2)

if [[ "$NODE_MAJOR" -lt 18 ]]; then
  fail "Node.js >= 18.17.0 required for Next.js 14. Found: $(node --version)\n  Install via: nvm install 18 && nvm use 18"
fi

if [[ "$NODE_MAJOR" -eq 18 && "$NODE_MINOR" -lt 17 ]]; then
  fail "Node.js >= 18.17.0 required. Found: $(node --version)\n  Run: nvm install 18.17.0 && nvm use 18.17.0"
fi

ok "Node $(node --version) — meets Next.js 14 minimum (>= 18.17.0)"

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 4 — PNPM VERSION GATE
# pnpm >= 8 required for workspace protocol used in pnpm-workspace.yaml
# ─────────────────────────────────────────────────────────────────────────────
step "SECTION 4 — PNPM VERSION GATE"

PNPM_MAJOR=$(pnpm --version | cut -d. -f1)
if [[ "$PNPM_MAJOR" -lt 8 ]]; then
  fail "pnpm >= 8 required. Found: $(pnpm --version)\n  Run: corepack prepare pnpm@latest --activate"
fi

ok "pnpm $(pnpm --version) — meets workspace requirement (>= 8)"

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 5 — GITHUB CLI AUTHENTICATION
# Uses the token non-interactively — safe for CI/agent mode.
# ─────────────────────────────────────────────────────────────────────────────
step "SECTION 5 — GITHUB AUTH"

export GH_TOKEN="$GITHUB_TOKEN"

if ! gh auth status &>/dev/null; then
  echo "$GITHUB_TOKEN" | gh auth login --with-token || \
    fail "GitHub CLI auth failed. Check GITHUB_TOKEN is valid and has scopes: repo, workflow."
fi

gh auth status
ok "Authenticated with GitHub CLI."

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 6 — GIT IDENTITY
# Sets global git name/email. Idempotent — safe to re-run.
# ─────────────────────────────────────────────────────────────────────────────
step "SECTION 6 — GIT IDENTITY"

git config --global user.name  "$GITHUB_USERNAME"
git config --global user.email "$GITHUB_EMAIL"
git config --global init.defaultBranch "$SOURCE_BRANCH"

# Credential helper so push doesn't prompt for password
git config --global credential.helper store
echo "https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com" \
  > "$HOME/.git-credentials"

ok "Git identity: $GITHUB_USERNAME <$GITHUB_EMAIL>"

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 7 — REPO GUARD
# Creates the GitHub repo if it doesn't exist.
# If it exists, verifies we can reach it.
# ─────────────────────────────────────────────────────────────────────────────
step "SECTION 7 — REPO GUARD"

if gh repo view "$REPO_FULL" &>/dev/null; then
  ok "Repo exists: https://github.com/$REPO_FULL"
else
  log "Creating repo $REPO_FULL ($REPO_VISIBILITY)..."
  gh repo create "$REPO_NAME" \
    --"$REPO_VISIBILITY" \
    --description "PrathamOne AI Classroom for Bharat" \
    --confirm 2>/dev/null || \
  gh repo create "$REPO_NAME" \
    --"$REPO_VISIBILITY" \
    --description "PrathamOne AI Classroom for Bharat"
  ok "Created: https://github.com/$REPO_FULL"
fi

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 8 — CLONE / PULL SOURCE REPO
# We always work from the real monorepo source on the SOURCE_BRANCH.
# If the work dir already exists, we pull latest instead of re-cloning.
# ─────────────────────────────────────────────────────────────────────────────
step "SECTION 8 — CLONE / PULL SOURCE REPO"

if [[ -d "$WORK_DIR/.git" ]]; then
  log "Repo already cloned at $WORK_DIR — pulling latest from $SOURCE_BRANCH..."
  cd "$WORK_DIR"
  git fetch origin
  git checkout "$SOURCE_BRANCH"
  git reset --hard "origin/$SOURCE_BRANCH"
  ok "Pulled latest from origin/$SOURCE_BRANCH"
else
  if [[ -d "$WORK_DIR" ]]; then
    warn "$WORK_DIR exists but is not a git repo. Removing and re-cloning..."
    rm -rf "$WORK_DIR"
  fi
  log "Cloning $REPO_FULL into $WORK_DIR..."
  git clone --branch "$SOURCE_BRANCH" "$REMOTE_URL" "$WORK_DIR" || {
    # If the repo is empty (just created), init from scratch
    warn "Clone failed — repo may be empty. Initialising locally..."
    mkdir -p "$WORK_DIR"
    cd "$WORK_DIR"
    git init -b "$SOURCE_BRANCH"
    git remote add origin "$REMOTE_URL"
  }
  ok "Repo ready at $WORK_DIR"
fi

cd "$WORK_DIR"

# Verify the expected monorepo shape
[[ -f "pnpm-workspace.yaml" ]] || fail "pnpm-workspace.yaml not found in $WORK_DIR. Is this the right repo?"
[[ -f "turbo.json"          ]] || fail "turbo.json not found. Expected Turborepo structure."
[[ -d "apps/web"            ]] || fail "apps/web directory not found."
[[ -f "apps/web/package.json" ]] || fail "apps/web/package.json not found."

ok "Monorepo structure verified."

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 9 — ENVIRONMENT FILE
# Writes apps/web/.env.local from exported env vars.
# NEVER commits this file — .gitignore must contain .env.local (it does).
# ─────────────────────────────────────────────────────────────────────────────
step "SECTION 9 — ENVIRONMENT FILE"

ENV_FILE="$WEB_APP_DIR/.env.local"

# Verify .env.local is gitignored before writing
if [[ -f "$WEB_APP_DIR/.gitignore" ]]; then
  grep -q "\.env\.local" "$WEB_APP_DIR/.gitignore" || \
    warn ".env.local is NOT in apps/web/.gitignore — add it immediately to avoid leaking secrets."
fi

log "Writing $ENV_FILE ..."

cat > "$ENV_FILE" << ENVEOF
# AUTO-GENERATED by deploy_prathamone.sh — DO NOT COMMIT
# Generated: $(date '+%Y-%m-%d %H:%M:%S')
NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL:-}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY:-}
NEXT_PUBLIC_SITE_URL=${CUSTOM_DOMAIN:+https://$CUSTOM_DOMAIN}${CUSTOM_DOMAIN:-https://${GITHUB_USERNAME}.github.io/${REPO_NAME}}
ENVEOF

ok ".env.local written (Supabase keys + site URL)."
log "  NEXT_PUBLIC_SITE_URL=$(grep NEXT_PUBLIC_SITE_URL "$ENV_FILE" | cut -d= -f2)"

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 10 — next.config.mjs GUARD
# Ensures output:'export' and images:{unoptimized:true} are present.
# Without these two settings, `next build` will NOT generate the /out folder
# and Next.js Image Optimization will error on static export.
# This section is NON-SKIPPABLE — it is the #1 source of broken Pages deploys.
# ─────────────────────────────────────────────────────────────────────────────
step "SECTION 10 — next.config.mjs GUARD"

NEXT_CONFIG="$WEB_APP_DIR/next.config.mjs"
[[ -f "$NEXT_CONFIG" ]] || fail "next.config.mjs not found at $NEXT_CONFIG"

_HAS_OUTPUT=$(grep -c "output.*export"      "$NEXT_CONFIG" || true)
_HAS_IMAGES=$(grep -c "unoptimized.*true"   "$NEXT_CONFIG" || true)

if [[ "$_HAS_OUTPUT" -eq 0 ]]; then
  fail "next.config.mjs is missing  output: 'export' \n\n  The /out folder will not be generated without it.\n  Add this inside your nextConfig object:\n\n    output: 'export',\n    images: { unoptimized: true },\n\n  Then commit the change to $SOURCE_BRANCH and re-run this script."
fi

if [[ "$_HAS_IMAGES" -eq 0 ]]; then
  warn "next.config.mjs may be missing  images: { unoptimized: true }\n  Next.js Image Optimization is incompatible with static export.\n  If your build errors on <Image> components, add:\n    images: { unoptimized: true }"
fi

ok "next.config.mjs has output:'export' ✓"

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 11 — pnpm install
# Uses --frozen-lockfile so the build is fully reproducible.
# The lockfile (pnpm-lock.yaml) must be committed to the repo.
# ─────────────────────────────────────────────────────────────────────────────
step "SECTION 11 — pnpm install"

cd "$WORK_DIR"

[[ -f "pnpm-lock.yaml" ]] || \
  fail "pnpm-lock.yaml not found in repo root.\n  Commit it:\n    cd $WORK_DIR && pnpm install && git add pnpm-lock.yaml && git commit -m 'chore: add lockfile' && git push"

log "Running: pnpm install --frozen-lockfile"
pnpm install --frozen-lockfile

ok "pnpm install complete."

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 12 — turbo build
# Runs the Turborepo build pipeline scoped to apps/web and its dependencies.
# turbo handles caching — subsequent builds are much faster.
# The output is in apps/web/out/
# ─────────────────────────────────────────────────────────────────────────────
step "SECTION 12 — turbo build"

log "Running: pnpm turbo build --filter='$TURBO_FILTER'"

# Pass env vars to the build process
export NEXT_PUBLIC_SUPABASE_URL
export NEXT_PUBLIC_SUPABASE_ANON_KEY

pnpm turbo build --filter="$TURBO_FILTER"

# Verify /out was created
[[ -d "$OUT_DIR" ]] || \
  fail "/out directory not found at $OUT_DIR after build.\n  Possible causes:\n  1. next.config.mjs missing  output: 'export'  (check Section 10 output)\n  2. Build failed — check turbo output above\n  3. TURBO_FILTER is wrong — current value: $TURBO_FILTER"

[[ -f "$OUT_DIR/index.html" ]] || \
  fail "$OUT_DIR/index.html not found.\n  The Next.js export ran but did not produce index.html.\n  Check that your app/page.tsx (or pages/index.tsx) exists."

ok "Build complete. /out directory: $(du -sh "$OUT_DIR" | cut -f1) on disk."
log "  Files in /out: $(find "$OUT_DIR" -type f | wc -l | tr -d ' ')"

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 13 — /out POST-PROCESSING
# Adds files that GitHub Pages requires or that improve the deployment.
# Must run AFTER the build so Next.js doesn't overwrite these files.
# ─────────────────────────────────────────────────────────────────────────────
step "SECTION 13 — /out POST-PROCESSING"

cd "$OUT_DIR"

# 13a. .nojekyll — CRITICAL for Next.js on GitHub Pages
#      Without this, GitHub's Jekyll processor ignores _next/ entirely
#      because directories starting with _ are filtered by Jekyll.
#      Result without it: blank page, all JS 404s.
touch .nojekyll
ok ".nojekyll created (prevents Jekyll from eating _next/ assets)."

# 13b. CNAME — only if a custom domain is configured
if [[ -n "$CUSTOM_DOMAIN" ]]; then
  echo "$CUSTOM_DOMAIN" > CNAME
  ok "CNAME written: $CUSTOM_DOMAIN"
else
  # Remove CNAME if it was generated by Next.js from public/CNAME but we
  # don't have a custom domain configured — prevents Pages misconfiguration.
  rm -f CNAME
  log "No custom domain — CNAME file removed from /out."
fi

# 13c. 404.html — GitHub Pages serves this for all unknown routes.
#      For a Next.js app with client-side routing, this page should
#      redirect to index.html so the JS router can take over.
#      If Next.js already generated a 404.html (from app/not-found.tsx),
#      we patch it with a redirect script instead of overwriting it.
if [[ -f "404.html" ]]; then
  # Inject redirect script into the existing 404.html if not already there
  if ! grep -q "window.location" "404.html"; then
    # Insert before </body>
    REDIRECT_SCRIPT='<script>sessionStorage.setItem("gh_pages_redirect",location.href);location.replace(location.origin+"/");</script>'
    sed -i "s|</body>|${REDIRECT_SCRIPT}</body>|" "404.html"
    ok "404.html patched with client-side redirect script."
  else
    ok "404.html already has redirect logic — skipping patch."
  fi
else
  # No 404.html generated — write a minimal one
  cat > 404.html << '404EOF'
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>404 — PrathamOne</title>
<script>
  // GitHub Pages SPA redirect: store the path and redirect to root.
  // The index.html will restore the path using sessionStorage.
  var path = window.location.pathname.replace(/^\/[^/]*/, '');
  sessionStorage.setItem('gh_pages_redirect', path);
  window.location.replace(window.location.origin + '/');
</script>
</head>
<body></body>
</html>
404EOF
  ok "404.html written with SPA redirect."
fi

# 13d. Patch index.html to restore SPA route after 404 redirect
#      This works in tandem with the 404.html redirect above.
if [[ -f "index.html" ]]; then
  if ! grep -q "gh_pages_redirect" "index.html"; then
    RESTORE_SCRIPT='<script>(function(){var r=sessionStorage.getItem("gh_pages_redirect");if(r){sessionStorage.removeItem("gh_pages_redirect");window.history.replaceState(null,null,r);}})();</script>'
    sed -i "s|</head>|${RESTORE_SCRIPT}</head>|" "index.html"
    ok "index.html patched with SPA route-restore script."
  else
    ok "index.html already has route-restore logic — skipping."
  fi
fi

# 13e. Verify sitemap.xml exists — Next.js should generate it if
#      next-sitemap or app/sitemap.ts is configured.
if [[ -f "sitemap.xml" ]]; then
  ok "sitemap.xml present."
else
  warn "sitemap.xml not found in /out. Add app/sitemap.ts or next-sitemap to your project for SEO."
fi

# 13f. robots.txt check
if [[ -f "robots.txt" ]]; then
  ok "robots.txt present."
else
  warn "robots.txt not found. Creating a permissive default..."
  echo -e "User-agent: *\nAllow: /" > robots.txt
fi

# 13g. manifest.json check — important for PWA / installability
if [[ -f "manifest.json" ]]; then
  ok "manifest.json present."
else
  warn "manifest.json not found. PWA install prompt will not appear."
fi

# 13h. Log the final /out file list for the agent to audit
log "Final /out contents (top-level):"
ls -1 "$OUT_DIR"

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 14 — VERIFY /out
# Hard checks before we push anything to GitHub.
# ─────────────────────────────────────────────────────────────────────────────
step "SECTION 14 — PRE-PUSH VERIFICATION"

_assert_file() {
  local f="$1"
  [[ -f "$OUT_DIR/$f" ]] || fail "Required file missing in /out: $f"
  local sz
  sz=$(wc -c < "$OUT_DIR/$f")
  if [[ "$f" != ".nojekyll" && "$sz" -eq 0 ]]; then
    fail "File is empty (0 bytes): $f"
  fi
  ok "✓ $f (${sz} bytes)"
}

_assert_file "index.html"
_assert_file ".nojekyll"
_assert_file "404.html"

# Structural checks on index.html
grep -q "<!DOCTYPE html>" "$OUT_DIR/index.html" || fail "index.html missing DOCTYPE declaration"
grep -q "<html"           "$OUT_DIR/index.html" || fail "index.html missing <html> tag"

# Check _next/ assets directory exists (Next.js JS/CSS chunks)
[[ -d "$OUT_DIR/_next" ]] || \
  warn "_next/ directory not found. This suggests the Next.js build did not generate JS chunks. The page may load but be non-functional."

ok "All pre-push checks passed."

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 15 — PUSH /out TO gh-pages BRANCH (ORPHAN STRATEGY)
# We use an orphan gh-pages branch containing ONLY the /out contents.
# This keeps the source code and the deployed files entirely separate.
# The orphan strategy means gh-pages has no history from main — clean.
# ─────────────────────────────────────────────────────────────────────────────
step "SECTION 15 — PUSH TO gh-pages BRANCH"

# Create a temporary git repo INSIDE /out
# (We do NOT use the monorepo's git repo for this push)
PAGES_TMP="$HOME/.prathamone-pages-tmp"
rm -rf "$PAGES_TMP"
mkdir -p "$PAGES_TMP"

# Copy /out contents into the temp dir
cp -r "$OUT_DIR/." "$PAGES_TMP/"

cd "$PAGES_TMP"

git init -b "$PAGES_BRANCH"
git remote add origin "$REMOTE_URL"

# Stage everything
git add -A

# Show what will be deployed
log "Files to be deployed:"
git status --short | head -40
TOTAL_FILES=$(git status --short | wc -l | tr -d ' ')
log "  Total files: $TOTAL_FILES"

COMMIT_MSG="deploy: PrathamOne static export $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$COMMIT_MSG"

log "Pushing to origin/$PAGES_BRANCH (force — replaces previous deploy)..."
git push --force origin "$PAGES_BRANCH"

ok "Deployed to gh-pages branch."
ok "  Commit: $COMMIT_MSG"

cd "$WORK_DIR"
rm -rf "$PAGES_TMP"

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 16 — ENABLE GITHUB PAGES VIA REST API
# Configures Pages to deploy from the gh-pages branch at root (/).
# Uses the GitHub REST API — no manual browser click required.
# ─────────────────────────────────────────────────────────────────────────────
step "SECTION 16 — ENABLE GITHUB PAGES"

log "Configuring GitHub Pages → branch: $PAGES_BRANCH, path: / ..."

HTTP_STATUS=$(curl -s -o /tmp/gh_pages_resp.json -w "%{http_code}" \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/repos/$REPO_FULL/pages" \
  -d "{\"source\":{\"branch\":\"$PAGES_BRANCH\",\"path\":\"/\"}}" 2>/dev/null)

case "$HTTP_STATUS" in
  201) ok "GitHub Pages enabled (HTTP 201)." ;;
  409) ok "GitHub Pages already enabled (HTTP 409) — re-using existing config." ;;
  422)
    warn "HTTP 422 — trying to UPDATE existing Pages config..."
    HTTP_STATUS2=$(curl -s -o /tmp/gh_pages_resp2.json -w "%{http_code}" \
      -X PUT \
      -H "Accept: application/vnd.github+json" \
      -H "Authorization: Bearer $GITHUB_TOKEN" \
      -H "X-GitHub-Api-Version: 2022-11-28" \
      "https://api.github.com/repos/$REPO_FULL/pages" \
      -d "{\"source\":{\"branch\":\"$PAGES_BRANCH\",\"path\":\"/\"}}" 2>/dev/null)
    if [[ "$HTTP_STATUS2" == "204" ]]; then
      ok "GitHub Pages updated successfully (HTTP 204)."
    else
      warn "Pages API returned HTTP $HTTP_STATUS2. Manual steps:"
      warn "  https://github.com/$REPO_FULL/settings/pages"
      warn "  Source → Deploy from branch → $PAGES_BRANCH → / (root)"
      cat /tmp/gh_pages_resp2.json 2>/dev/null || true
    fi
    ;;
  *)
    warn "Pages API returned HTTP $HTTP_STATUS."
    cat /tmp/gh_pages_resp.json 2>/dev/null || true
    warn "Enable manually at: https://github.com/$REPO_FULL/settings/pages"
    ;;
esac

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 17 — POLL FOR LIVE BUILD
# GitHub Pages takes 30–120 seconds to build after the branch push.
# We poll the Pages API every 15 seconds for up to 4 minutes.
# ─────────────────────────────────────────────────────────────────────────────
step "SECTION 17 — WAIT FOR DEPLOYMENT"

PAGES_URL="https://${GITHUB_USERNAME}.github.io/${REPO_NAME}/"
[[ -n "$CUSTOM_DOMAIN" ]] && PAGES_URL="https://${CUSTOM_DOMAIN}/"

log "Expected live URL: $PAGES_URL"
log "Polling GitHub Pages build status (max 4 min, every 15 sec)..."

MAX_TRIES=16     # 16 × 15s = 240s = 4 min
TRIES=0
BUILT=false

while [[ $TRIES -lt $MAX_TRIES ]]; do
  sleep 15
  TRIES=$((TRIES + 1))

  BUILD_STATUS=$(curl -s \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer $GITHUB_TOKEN" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "https://api.github.com/repos/$REPO_FULL/pages" 2>/dev/null \
    | grep -o '"status":"[^"]*"' | head -1 | cut -d'"' -f4 || echo "unknown")

  log "  [$TRIES/$MAX_TRIES] Pages status: ${BUILD_STATUS}"

  if [[ "$BUILD_STATUS" == "built" ]]; then
    BUILT=true
    break
  fi
done

if $BUILT; then
  ok "GitHub Pages build complete!"
  sleep 5   # small grace period for CDN propagation
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$PAGES_URL" 2>/dev/null || echo "000")
  if [[ "$HTTP_CODE" == "200" ]]; then
    ok "Site is LIVE → $PAGES_URL (HTTP 200)"
  else
    warn "Site URL returned HTTP $HTTP_CODE — CDN may still be propagating."
    warn "Check again in 1–2 minutes: $PAGES_URL"
  fi
else
  warn "Build did not complete within 4 minutes."
  warn "Check build logs: https://github.com/$REPO_FULL/actions"
fi

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 18 — DNS INSTRUCTIONS (custom domain only)
# DNS changes cannot be scripted — printed for the operator to action manually.
# ─────────────────────────────────────────────────────────────────────────────
if [[ -n "$CUSTOM_DOMAIN" ]]; then
  step "SECTION 18 — CUSTOM DOMAIN DNS"

  # Detect apex vs subdomain
  DOMAIN_PARTS=$(echo "$CUSTOM_DOMAIN" | awk -F. '{print NF}')

  if [[ "$DOMAIN_PARTS" -le 2 ]]; then
    echo ""
    echo -e "${BOLD}  Apex domain detected ($CUSTOM_DOMAIN)${RESET}"
    echo -e "  Add ALL FOUR A records at your DNS provider:\n"
    echo "  ┌──────────┬──────┬──────────────────┬───────┐"
    echo "  │ Type     │ Name │ Value            │ TTL   │"
    echo "  ├──────────┼──────┼──────────────────┼───────┤"
    echo "  │ A        │  @   │ 185.199.108.153  │ 3600  │"
    echo "  │ A        │  @   │ 185.199.109.153  │ 3600  │"
    echo "  │ A        │  @   │ 185.199.110.153  │ 3600  │"
    echo "  │ A        │  @   │ 185.199.111.153  │ 3600  │"
    echo "  └──────────┴──────┴──────────────────┴───────┘"
    echo ""
    echo -e "  Add a CNAME for www:\n"
    echo "  ┌──────────┬──────┬──────────────────────────────────┬───────┐"
    echo "  │ CNAME    │ www  │ ${GITHUB_USERNAME}.github.io.    │ 3600  │"
    echo "  └──────────┴──────┴──────────────────────────────────┴───────┘"
  else
    SUBDOMAIN=$(echo "$CUSTOM_DOMAIN" | cut -d. -f1)
    echo ""
    echo -e "${BOLD}  Subdomain detected ($CUSTOM_DOMAIN)${RESET}"
    echo "  ┌──────────┬──────────────┬──────────────────────────────────┬───────┐"
    echo "  │ Type     │ Name         │ Value                            │ TTL   │"
    echo "  ├──────────┼──────────────┼──────────────────────────────────┼───────┤"
    printf "  │ CNAME    │ %-12s │ %-32s │ 3600  │\n" "$SUBDOMAIN" "${GITHUB_USERNAME}.github.io."
    echo "  └──────────┴──────────────┴──────────────────────────────────┴───────┘"
  fi

  echo ""
  warn "DNS propagation takes 1–48 hours depending on your provider."
  warn "After propagation:"
  warn "  1. Go to https://github.com/$REPO_FULL/settings/pages"
  warn "  2. Under 'Custom domain', confirm $CUSTOM_DOMAIN appears"
  warn "  3. Tick 'Enforce HTTPS' (requires DNS to be propagated first)"
fi

# ─────────────────────────────────────────────────────────────────────────────
# SECTION 19 — FINAL SUMMARY
# ─────────────────────────────────────────────────────────────────────────────
step "SECTION 19 — COMPLETE"
divider
echo -e "${GREEN}${BOLD}  ✓ PrathamOne deployment finished.${RESET}"
echo ""
echo -e "  ${BOLD}Repository       :${RESET} https://github.com/$REPO_FULL"
echo -e "  ${BOLD}Source branch    :${RESET} $SOURCE_BRANCH  (monorepo code)"
echo -e "  ${BOLD}Pages branch     :${RESET} $PAGES_BRANCH   (static /out — deployed)"
echo -e "  ${BOLD}Live URL         :${RESET} $PAGES_URL"
echo -e "  ${BOLD}Build artifacts  :${RESET} $OUT_DIR"
echo -e "  ${BOLD}Build size       :${RESET} $(du -sh "$OUT_DIR" 2>/dev/null | cut -f1 || echo 'n/a')"
echo ""
echo -e "  ${CYAN}To redeploy after making changes:${RESET}"
echo "    cd $WORK_DIR"
echo "    git add -A && git commit -m 'your message' && git push origin $SOURCE_BRANCH"
echo "    bash $0      # re-run this script"
echo ""
echo -e "  ${CYAN}To set up automatic redeployment via GitHub Actions:${RESET}"
echo "    The workflow at .github/workflows/nextjs.yml should handle this."
echo "    Commit it and ensure it pushes to the $PAGES_BRANCH branch."
divider
