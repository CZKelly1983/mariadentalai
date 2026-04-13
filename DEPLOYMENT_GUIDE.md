# Deploying Maria's Website to GitHub Pages

## Overview

This guide walks you through setting up the new person-centric website on GitHub Pages, which you can then point to Maria's custom domain.

---

## Step 1: Create a GitHub Account (if you don't have one)
- Go to https://github.com/signup
- Create an account with your email

---

## Step 2: Create a New Repository

1. Log into GitHub
2. Click the **+** icon in the top-right → **New repository**
3. Name it: `mariadentalai.github.io` (exact name is important for Pages)
4. Add a description: "Maria's Career Transition Platform"
5. Choose **Public** (required for free GitHub Pages)
6. Click **Create repository**

---

## Step 3: Upload Your Files

You have two options:

### Option A: Upload via GitHub Web Interface (Easiest)
1. In your new repository, click **Add file** → **Upload files**
2. Drag and drop the `index.html` file
3. Click **Commit changes**

### Option B: Use Git Command Line (If comfortable with terminal)
```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/mariadentalai.github.io.git
cd mariadentalai.github.io

# Copy your index.html into this folder
# Then push it
git add index.html
git commit -m "Add initial website"
git push
```

---

## Step 4: Verify It's Live

After uploading:
1. Wait 2-3 minutes for GitHub to build your site
2. Visit `https://mariadentalai.github.io`
3. Your site should be live!

---

## Step 5: Point Your Custom Domain

If Maria already owns `mariadentalai.com`, you can point it to GitHub Pages:

1. In your GitHub repository, go to **Settings** → **Pages**
2. Under "Custom domain", enter `mariadentalai.com`
3. Click **Save**

Then, in your domain registrar (GoDaddy, Namecheap, etc.):
1. Go to DNS settings
2. Add a `CNAME` record:
   - Name: `www`
   - Value: `mariadentalai.github.io`
3. (Optional) Add an `A` record pointing to GitHub's IP:
   - Type: A
   - Host: @
   - IP: `185.199.108.153`

4. Wait 15-30 minutes for DNS propagation

---

## Step 6: Enable HTTPS (Automatic)

GitHub Pages automatically provides HTTPS when you add a custom domain. In GitHub repository settings → Pages, GitHub will:
1. Verify your domain ownership
2. Automatically generate an SSL certificate
3. Enforce HTTPS

---

## Future Updates

To update your site later:
1. Edit `index.html` locally
2. Upload the new version to GitHub (via web interface or git push)
3. Changes go live in 1-2 minutes

---

## Customizations You Can Make

### Colors
Edit these CSS variables at the top of the `<style>` section:
```css
:root {
    --primary: #185FA5;        /* Blue - main brand color */
    --accent: #D85A30;         /* Orange - accent color */
    --bg-primary: #FFFFFF;     /* White background */
    /* ... and more */
}
```

### Content
- Update program descriptions in the "Choose your path" section
- Change pricing if needed
- Update testimonials with real client quotes
- Edit "About Maria" section with real details

### Forms
The contact/enrollment forms currently show alerts. To make them actually send emails, integrate with:
- **Formspree** (easiest): https://formspree.io
- **EmailJS**: https://www.emailjs.com
- Your own backend service

---

## Optional: Add a Blog Section

If Maria wants to add blog posts, you can either:
1. Create a `/blog` folder with additional HTML pages
2. Use a static site generator like Hugo (more advanced)
3. Embed a Medium publication feed

---

## Troubleshooting

**Site not showing up?**
- Wait 5 minutes (GitHub needs time to build)
- Check that the file is named exactly `index.html`
- Go to Settings → Pages and verify the source is set to main branch

**Custom domain not working?**
- DNS changes take 15-30 minutes
- Check that your CNAME record is correct in your registrar
- Use a DNS checker: https://dnschecker.org

**Want to test locally first?**
- Just open `index.html` in your browser (double-click it)
- It should work perfectly without any server needed

---

## File Structure

```
mariadentalai.github.io/
├── index.html          (the entire website)
└── README.md           (optional - info about the repo)
```

That's it! Single file, fully self-contained.

---

## Need Help?

- GitHub Pages docs: https://pages.github.com
- Domain setup: Contact your domain registrar's support
- Questions about the site design: Review the HTML comments and CSS variables
