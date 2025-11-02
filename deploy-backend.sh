#!/bin/bash

# Backend Deployment Script for Render

echo "🚀 Deploying Backend to Render..."

# Navigate to server directory
cd server

# Check if Render CLI is installed
if ! command -v render &> /dev/null; then
    echo "❌ Render CLI not found. Please install it manually:"
    echo "npm install -g @render/cli"
    exit 1
fi

# Deploy to Render
echo "🌐 Deploying to Render..."
render deploy

echo "✅ Backend deployment completed!"
echo "🔗 Your API will be available at: https://your-backend-app.onrender.com"