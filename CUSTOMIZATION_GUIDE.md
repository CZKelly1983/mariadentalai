# How to Customize the Website

## Quick Start

The entire website is in **one file**: `index.html`

You can open it in any text editor (VS Code, Notepad++, even Notepad).

---

## Common Changes

### 1. Update Program Prices

Find this section (search for "Program Launch"):

```html
<div class="program-price">
    <div class="amount">$497</div>
    <div class="details">Or 2 payments of $297</div>
</div>
```

Change the numbers to your actual pricing.

---

### 2. Update Testimonials

Find the "Testimonials Section" (search for `class="testimonials"`):

```html
<div class="testimonial">
    <p class="testimonial-quote">"I was overwhelmed and unsure of myself. Maria's guidance completely transformed my experience..."</p>
    <p class="testimonial-author">Ceydel Fundora</p>
    <p class="testimonial-role">Dental Hygienist & Career Transitioner</p>
</div>
```

Replace with real client testimonials. Make sure to get permission!

---

### 3. Update Social Media Links

Find the "Footer" section (search for `social-links`):

```html
<div class="social-links">
    <a href="https://linkedin.com/in/mariadentalai" target="_blank" title="LinkedIn">in</a>
    <a href="https://instagram.com/dental.ai.solutions" target="_blank" title="Instagram">📷</a>
    <a href="https://tiktok.com/@dental.ai.solution" target="_blank" title="TikTok">⏪</a>
</div>
```

Update the URLs to match Maria's actual profiles.

---

### 4. Change Email Address

The email appears in two places:

**In the footer:**
```html
<a href="https://www.linkedin.com/in/mariadentalai">LinkedIn</a>
```

**In the contact modal:**
```html
<p style="margin-top: 24px; font-size: 14px; text-align: center; color: var(--color-text-tertiary);">
    Or email directly: <strong>maria.dentalai@gmail.com</strong>
</p>
```

Update both to the correct email.

---

### 5. Change Brand Colors

At the very top of the `<style>` section, find:

```css
:root {
    --primary: #185FA5;        /* Blue - main brand color */
    --primary-light: #378ADD;
    --primary-dark: #0C447C;
    --accent: #D85A30;         /* Orange - accent color */
    --accent-light: #F0997B;
    /* ... */
}
```

You can change:
- `--primary` - Main button/link color (currently blue)
- `--accent` - Accent color for highlights (currently orange)

Use a color picker: https://htmlcolorcodes.com

---

### 6. Update Program Features/Details

Find the Career Launch Program section:

```html
<ul class="program-features">
    <li>AI Skills Foundation (4 modules)</li>
    <li>Resume conversion workshop</li>
    <li>LinkedIn positioning strategy</li>
    <li>2 personalized coaching sessions</li>
    <li>Access to opportunity network</li>
</ul>
```

Update the list items to match what you actually offer.

---

### 7. Add Real About Section Details

Find "About Maria" section:

```html
<div class="about-text">
    <h2>Why Maria built this</h2>
    <p>Maria spent more than 20 years in dentistry—15+ as a practicing hygienist...</p>
    <!-- Update these paragraphs -->
    
    <ul class="about-highlights">
        <li>Trained hygiene teams across 30+ offices</li>
        <li>Partnered with tech startups as a clinical advisor</li>
        <li>Mentored 40+ hygienists into new roles</li>
        <li>Speaker at schools, podcasts, and industry events</li>
    </ul>
</div>
```

Replace with real details about Maria.

---

## Advanced Customizations

### Change the Hero Background

Find the hero section:

```css
.hero {
    padding-top: 140px;
    padding-bottom: 80px;
    background: linear-gradient(135deg, #f8f6f2 0%, #f0ebe5 100%);
}
```

Change the hex colors (#f8f6f2, #f0ebe5) to your preferred colors.

### Add a New Section

Copy an existing section and modify it. For example, to add a "FAQ" section after programs:

```html
<section class="faq section">
    <div class="container">
        <h2>Frequently Asked Questions</h2>
        <!-- Add your FAQ content here -->
    </div>
</section>
```

### Change Typography

The site uses system fonts. To use a Google Font instead:

1. Add this line in the `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Lato:wght@400;500&display=swap" rel="stylesheet">
```

2. Update the font-family in CSS:
```css
body {
    font-family: 'Lato', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif;
}
```

---

## Connecting Forms to Email

Currently, the forms just show "thank you" alerts. To actually send emails, integrate with **Formspree** (easiest):

1. Go to https://formspree.io
2. Sign up with your email
3. Create a new form
4. Copy the form endpoint
5. Update the form action in the HTML:

```html
<form onsubmit="handleContact(event)" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

Remove the `onsubmit="handleContact(event)"` line if using Formspree.

---

## Testing Changes

1. **Open locally** - Double-click `index.html` to preview changes
2. **Use a text editor** - VS Code is free and excellent
3. **Check all sections** - Scroll through to verify your edits
4. **Test on mobile** - The site is fully responsive

---

## Common Mistakes to Avoid

❌ **Don't:** Delete opening or closing tags (like `<div>` or `</div>`)
- The layout will break

✅ **Do:** Only edit text content inside tags

❌ **Don't:** Change random numbers in the CSS
- Padding, font sizes, and colors are intentional

✅ **Do:** Use the CSS variables at the top for color changes

❌ **Don't:** Add external images without uploading them
- GitHub Pages needs them in the repository

✅ **Do:** Keep the site simple (single HTML file = easiest deployment)

---

## Useful Tools

- **Text Editor:** VS Code (free) - https://code.visualstudio.com
- **Color Picker:** https://htmlcolorcodes.com
- **Font Generator:** Google Fonts - https://fonts.google.com
- **Validation:** https://validator.w3.org (checks for HTML errors)

---

## Before You Deploy

**Checklist:**
- [ ] Updated all "Maria" references with real name/details
- [ ] Verified all social media links work
- [ ] Updated email address
- [ ] Changed program prices to correct amounts
- [ ] Added real testimonials
- [ ] Checked that all links work (click around!)
- [ ] Tested on mobile (open on a phone)
- [ ] Changed colors if desired

---

## Troubleshooting

**"The site looks broken after I edited it"**
- You probably deleted a `<` or `>`
- Use Ctrl+Z (Cmd+Z on Mac) to undo
- Check the HTML validator: https://validator.w3.org

**"My changes aren't showing up"**
- Hard refresh your browser: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
- If on GitHub Pages, wait 2-3 minutes for it to rebuild

**"I accidentally broke something"**
- Download the original file again
- Or use GitHub's file history to revert

---

## Need Help?

- **HTML question?** - https://www.w3schools.com/html/
- **CSS question?** - https://www.w3schools.com/css/
- **Stuck?** - Try reverting to the original and making one change at a time

---

## Next Steps After Customization

1. Test the website locally (double-click the file)
2. Follow the **DEPLOYMENT_GUIDE.md** to put it on GitHub Pages
3. Point your custom domain to GitHub Pages
4. Share the link everywhere!

---

## Final Note

This site is designed to be simple and maintainable. You don't need to hire a developer to update it. Just open the HTML file in a text editor and make your changes.

**That's it. No build process. No dependencies. Just one file that works everywhere.**
