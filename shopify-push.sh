#!/bin/bash

# Shopify Theme Push Script
# Push local theme to Shopify

echo "📦 Pushing theme to Shopify..."
echo ""

# Navigate to theme directory
cd theme

# Check if --prod flag passed
if [[ "$1" == "--prod" ]] || [[ "$1" == "production" ]]; then
    echo "⚠️  WARNING: Pushing to PRODUCTION theme!"
    echo "This will affect the live site."
    echo ""
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        shopify theme push --live
    else
        echo "❌ Cancelled."
        exit 1
    fi
else
    echo "📍 Pushing to development theme..."
    shopify theme push
fi

echo ""
echo "✅ Push complete!"
