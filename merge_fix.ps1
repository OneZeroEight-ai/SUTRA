# merge_fix.ps1

# Pull with allow unrelated histories
git pull origin main --allow-unrelated-histories

# Add all files again
git add .

# Create merge commit
git commit -m "Merge remote and local implementations"

# Push to GitHub
git push -u origin main

Write-Host "Repository has been merged and pushed successfully"