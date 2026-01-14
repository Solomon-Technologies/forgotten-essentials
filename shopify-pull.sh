#!/bin/bash

# Shopify Theme Pull Script
# Pull theme from Shopify to local

echo "⬇️  Pulling theme from Shopify..."
echo ""

# Navigate to theme directory
cd theme

# Check if --live flag passed
if [[ "$1" == "--live" ]] || [[ "$1" == "production" ]]; then
    echo "📍 Pulling from LIVE (production) theme..."
    shopify theme pull --live
else
    echo "📍 Pulling from development theme..."
    shopify theme pull
fi

echo ""
echo "✅ Pull complete!"
echo "💡 Tip: Run 'git status' to see what changed"
