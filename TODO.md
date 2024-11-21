# Navigation

[] - Update menu with respect to [Generated image]($HOME/dev-nashenas/toghdar/ai-generated-inspiration.jpeg). Move to the very top to make free space below.

# Home page design

[] - the home page Should contain Rahmani picture next to the sea

[] - Implement listing of 4 real properties.

# General

1. Font Management:

   - [x] Download Iran Sans font files (300, 400, 700 weights) in WOFF2 format
   - [x] Create a `src/assets/fonts` directory and place the font files there
   - [x] Update the font-face declarations in your styles to use local files

2. Icon Management:

   - [x] Download or create SVG icons for your project
   - [x] Place SVG icons in `src/assets/icons` directory
   - [x] Create an SVG sprite using a tool like svg-sprite
   - [x] Implement an icon component for easy usage of SVG icons

3. Optimize Assets:

   - [x] Use fonttools to subset Iran Sans font, including only necessary characters
   - [x] Optimize SVG icons using SVGO

4. Update index.html:

   - [ ] Inline critical CSS, including font-face declarations
   - [ ] Add preload links for critical fonts
   - [ ] Implement font-display: swap for font-face declarations
   - [ ] Update meta tags for SEO (title, description, Open Graph tags)

5. AnalogJS Configuration:

   - [ ] Update vite.config.ts to include prerendering for existing routes
   - [ ] Configure post-rendering hooks for any custom scripts or optimizations
   - [ ] Set up sitemap generation in vite.config.ts

6. Vercel Deployment:

   - [ ] Create a Vercel account if you haven't already
   - [ ] Install Vercel CLI: `npm i -g vercel`
   - [ ] Run `vercel` in your project directory to set up the project
   - [ ] Configure build settings if not auto-detected:
     - Build Command: `npm run build`
     - Output Directory: `dist/analog/public`
   - [ ] Set `BUILD_PRESET` environment variable to `vercel` if needed

7. Performance Optimization:

   - [ ] Implement lazy loading for routes in your Angular application
   - [ ] Set up appropriate caching headers for static assets (fonts, icons)

8. Documentation:

   - [ ] Create a README.md with setup and deployment instructions
   - [ ] Document the font and icon usage for future reference

9. Version Control:

   - [ ] Ensure all assets (fonts, icons) are included in your Git repository
   - [ ] Consider using Git LFS for large font files if necessary

10. Build Process:

    - [ ] Verify that your build process correctly copies fonts and icons to the dist folder
    - [ ] Implement hash-based filenames for cache busting if not already handled by AnalogJS

11. Home Page:

    - [ ] Ask which villa to show in the featured home page and provide pictures and ask for title and description
    - [ ] Create small sub-paragraphs with graphics and text to better describe the mentality of twin houses and the architecture(ask ghazal and update accordingly)
    - [ ] Update the sub-paragraphs with financing options

12. Properties Page:
    - [ ] Try to use analog in the index and about page but use angular components for the properties as it has more functionlity.

This todo list focuses on the specific areas you mentioned, particularly around font and icon management, AnalogJS improvements, and Vercel deployment. It should help you prepare your website for launch, even without property listings at this stage.

# Ongoing

- [ ] Integrate new google fonts and colors for property list
  - put both price of land and built area
- [ ] Fix fonts using material 3 api
- [ ] Update Ads
