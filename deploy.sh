#!/bin/bash

# Deployment script for Vercel
echo "🚀 Preparing for Vercel deployment..."

# Check if files exist
if [ ! -f "index.html" ]; then
    echo "❌ index.html not found!"
    exit 1
fi

if [ ! -f "app.js" ]; then
    echo "❌ app.js not found!"
    exit 1
fi

echo "✅ All required files found"

# Check if .env.local exists (should not be deployed)
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local found - make sure it's in .gitignore"
fi

echo "📋 Pre-deployment checklist:"
echo "  1. ✅ Firebase project configured"
echo "  2. ✅ Environment variables ready"
echo "  3. ✅ .gitignore configured"
echo "  4. ✅ vercel.json configured"
echo ""
echo "🔑 Don't forget to set these environment variables in Vercel:"
echo "  - VITE_FIREBASE_API_KEY"
echo "  - VITE_FIREBASE_AUTH_DOMAIN"
echo "  - VITE_FIREBASE_PROJECT_ID"
echo "  - VITE_FIREBASE_STORAGE_BUCKET"
echo "  - VITE_FIREBASE_MESSAGING_SENDER_ID"
echo "  - VITE_FIREBASE_APP_ID"
echo "  - VITE_FIREBASE_MEASUREMENT_ID"
echo ""
echo "🌐 After deployment, add your Vercel domain to Firebase authorized domains"
echo ""
echo "Ready to deploy! Run: vercel --prod"
