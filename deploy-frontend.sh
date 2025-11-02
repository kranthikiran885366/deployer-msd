#!/bin/bash

# Frontend Deployment Script for Vercel

echo "🚀 Deploying Frontend to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Build the project
echo "📦 Building the project..."
npm run build

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Frontend deployment completed!"
echo "🔗 Your app will be available at: https://your-app.vercel.app"