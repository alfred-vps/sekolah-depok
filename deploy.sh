#!/bin/bash
# Deploy Riset Sekolah to Cloudflare Pages
# Prerequisites: CLOUDFLARE_API_TOKEN set in environment or ~/.hermes/.env
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
FRONTEND_DIR="$SCRIPT_DIR/frontend"
OUTPUT_DIR="$FRONTEND_DIR/out"
FUNCTIONS_DIR="$FRONTEND_DIR/functions"
PROJECT="riset-sekolah"

# Load secrets from .env if not already set
if [ -f "$HOME/.hermes/.env" ]; then
  set -a
  source "$HOME/.hermes/.env"
  set +a
fi

echo "🔨 Building Next.js..."
cd "$FRONTEND_DIR"
npm run build

echo "📁 Copying Cloudflare Pages Functions..."
rm -rf "$OUTPUT_DIR/functions"
cp -r "$FUNCTIONS_DIR" "$OUTPUT_DIR/functions"

echo "🔧 Setting environment variables on Cloudflare..."
for name in SUPABASE_URL SUPABASE_SERVICE_KEY SUPABASE_ANON_KEY PASS_APPS_RISETSD; do
  value="${!name}"
  if [ -n "$value" ]; then
    echo "$value" | wrangler pages secret put "$name" --project-name "$PROJECT" 2>/dev/null && echo "  ✓ $name" || echo "  ✗ $name"
  else
    echo "  ⚠ $name is not set"
  fi
done

echo "🚀 Deploying to Cloudflare Pages..."
wrangler pages deploy "$OUTPUT_DIR" --project-name "$PROJECT" --branch main

echo "✅ Deploy complete!"
echo "🌐 https://$PROJECT.pages.dev"
