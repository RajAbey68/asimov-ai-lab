# 🚀 Quick GitHub Setup

## ✅ Already Done
- ✅ Git repository initialized
- ✅ All files committed
- ✅ GitHub Actions workflow created
- ✅ Vite configured for GitHub Pages

---

## 📝 Next Steps (3 Simple Steps)

### Step 1: Create GitHub Repository

1. Go to: https://github.com/new
2. **Repository name**: `personal-website` (or choose your own name)
3. **Description**: `AI Advisory & Consulting website`
4. **Visibility**: Choose Public or Private
5. ⚠️ **Important**: Do NOT check any boxes (no README, no .gitignore, no license)
6. Click **"Create repository"**

---

### Step 2: Connect & Push

After creating the repo, copy your repository URL and run these commands:

```bash
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/personal-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Example:**
If your GitHub username is `rajabeya`, the command would be:
```bash
git remote add origin https://github.com/rajabeya/personal-website.git
```

---

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in left sidebar)
3. Under "Source", select: **GitHub Actions**
4. Save (if there's a save button)

That's it! Your site will deploy automatically! 🎉

---

## 🌐 Your Live Site URL

After deployment (takes 1-2 minutes):

```
https://YOUR_USERNAME.github.io/personal-website/
```

**Example:** `https://rajabeya.github.io/personal-website/`

---

## 🔧 If You Named Your Repo Differently

If you used a different name (not `personal-website`), update this file:

**File**: `vite.config.ts`

Change line 7:
```typescript
base: '/YOUR-REPO-NAME/',  // ← Change to your actual repo name
```

Then commit and push:
```bash
git add vite.config.ts
git commit -m "Update base path"
git push
```

---

## 📊 Check Deployment Status

1. Go to your GitHub repository
2. Click the **"Actions"** tab
3. You'll see the deployment workflow running
4. Green checkmark ✅ = Successfully deployed!
5. Red X ❌ = Check the logs to see what went wrong

---

## 🆘 Troubleshooting

### If you see "remote origin already exists":
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/personal-website.git
git push -u origin main
```

### If deployment fails:
1. Check the Actions tab on GitHub
2. Click on the failed workflow
3. Review the error logs
4. Common fixes:
   - Ensure repository name matches in `vite.config.ts`
   - Check that GitHub Pages is enabled in Settings
   - Verify the workflow file has no syntax errors

---

## 🎯 Commands You'll Use Often

```bash
# Check current status
git status

# View remote URL
git remote -v

# After making changes
git add .
git commit -m "Your change description"
git push

# Pull latest from GitHub
git pull origin main
```

---

## 🎉 That's It!

Once you complete these 3 steps, your website will be:
- ✅ Hosted on GitHub
- ✅ Automatically deployed via GitHub Actions
- ✅ Live on the internet
- ✅ Updated automatically when you push changes

**Ready to go live? Follow Step 1 above!** 🚀
