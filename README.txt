PORTFOLIO WEBSITE — QUICK START
================================

Files:
- index.html
- css/style.css
- js/script.js
- assets/images/ (add your own images here)
- assets/icons/ (optional local icons)
- assets/resume.pdf (optional; add your own CV if desired)

RUN LOCALLY
1. Extract the portfolio.zip file.
2. Open the portfolio folder in VS Code.
3. Open index.html in your browser. For a smoother development workflow, use the VS Code Live Server extension.
4. Internet is required for Tailwind's browser CDN, Google Fonts, and Lucide icons.

PERSONALIZE
1. Open js/script.js and edit the PORTFOLIO object at the top:
   - name, initials, location
   - email, phone, WhatsApp number, LinkedIn, GitHub, Instagram
2. Edit the About, skills, projects, education, and course text in index.html.
3. Replace “Your college or university” with your actual institution.
4. Replace or remove sample project cards. Add real demo/source URLs only.
5. Add your own profile image under assets/images/ if desired; update the hero HTML accordingly.
6. Add a real resume PDF to assets/resume.pdf and add a download link only when ready.
7. Update the SEO description and Open Graph metadata in index.html before publishing.

TECH NOTES
- Uses Tailwind CSS v4 browser CDN (@tailwindcss/browser@4), not a CLI build.
- Custom design and responsive behavior live in css/style.css.
- Vanilla JavaScript interactions live in js/script.js.
- Lucide icons load from its CDN.
- No contact form is included.
- No personal contact links are shown until real details are supplied.
- The website uses a sample project based on “Personalised Learning Path”; check every description and technology before publishing.
- For production, consider switching from the browser CDN to the official Tailwind CLI build process and optimizing images.
