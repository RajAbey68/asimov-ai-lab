# 🚀 GitHub Deployment Guide

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top-right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `personal-website` or `asimov-ai-website`
   - **Description**: "AI Advisory & Consulting website with comprehensive Risk Assessment methodology"
   - **Visibility**: Choose Public or Private
   - ⚠️ **Do NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

---

## Step 2: Connect Local Repo to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Add GitHub as remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/personal-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy to GitHub Pages (Optional)

### Option A: Manual Deployment

1. In your GitHub repository, go to **Settings** → **Pages**
2. Under "Source", select **"GitHub Actions"**
3. GitHub will suggest a workflow - use the suggested one for Vite/React

### Option B: Using the Workflow File (Recommended)

I've created a GitHub Actions workflow file for you. This will automatically deploy your site whenever you push to the main branch.

**The workflow file is ready at:** `.github/workflows/deploy.yml`

Once you push to GitHub, it will:
- ✅ Build your Vite project
- ✅ Deploy to GitHub Pages automatically
- ✅ Your site will be available at: `https://YOUR_USERNAME.github.io/personal-website/`

---

## Step 4: Update Vite Configuration for GitHub Pages

If your repository name is NOT `personal-website`, update the `base` path in `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/YOUR-REPO-NAME/',  // ← Change this
})
```

---

## Commands Reference

```bash
# Check git status
git status

# View remote URL
git remote -v

# View commit history
git log --oneline

# Push changes
git add .
git commit -m "Your commit message"
git push

# Pull latest changes
git pull origin main
```

---

## Troubleshooting

### "remote origin already exists"
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/personal-website.git
```

### "failed to push some refs"
```bash
git pull origin main --rebase
git push origin main
```

### Pages not showing latest changes
- Check the Actions tab in GitHub to see if deployment succeeded
- Clear browser cache
- Wait 1-2 minutes for GitHub Pages to update

---

## 🎉 Your Site Will Be Live At:

**GitHub Pages URL**: `https://YOUR_USERNAME.github.io/personal-website/`

Replace `YOUR_USERNAME` with your actual GitHub username!

---

## Future Updates

To update your website:

```bash
# Make changes to your files
# Then commit and push
git add .
git commit -m "Update: describe your changes"
git push
```

GitHub Actions will automatically rebuild and deploy! 🚀
