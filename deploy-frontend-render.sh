#!/bin/bash

# Deploy Frontend to Render
echo "🚀 Deploying Frontend to Render..."

# Check if render CLI is installed
if ! command -v render &> /dev/null; then
    echo "❌ Render CLI not found. Installing..."
    npm install -g @render/cli
fi

# Deploy using render.yaml
echo "📦 Deploying with render-frontend.yaml..."
render deploy --config render-frontend.yaml

echo "✅ Frontend deployment initiated!"
echo "🌐 Your app will be available at: https://deployer-glow-studio-frontend.onrender.com"
echo ""
echo "📋 Next steps:"
echo "1. Set environment variables in Render dashboard"
echo "2. Update OAuth redirect URLs"
echo "3. Test the deployment"