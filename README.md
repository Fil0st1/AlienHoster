# 🛸 AlienHoster

Welcome to the **AlienHoster** project repository. AlienHoster is a premium, futuristic, and high-performance hosting provider website tailored exclusively for **Discord bots**. 

The design draws inspiration from advanced alien civilization themes, sci-fi spacecraft interfaces, and modern premium SaaS landing pages, featuring glassmorphism, glowing gradients, smooth scroll-reveal effects, and interactive elements.

---

## 🌌 Brand Concept & Theme

AlienHoster moves away from stereotypical green alien concepts and utilizes a deep space high-tech palette:
- **Deep Space Black** (`#070B14`): Core background canvas.
- **Cosmic Indigo** (`#111827`): Card backgrounds and structural components.
- **Electric Violet** (`#7C3AED`): Glowing accents, borders, and main buttons.
- **Neon Blue** (`#38BDF8`): Interactive highlights, star connection lines, and secondary actions.
- **Soft White** (`#F8FAFC`): Crisp, highly legible typography.

---

## 📂 Project Structure

The codebase is built on pure web technologies (Vanilla HTML/CSS/JS) with no external frameworks, ensuring instant load times and lightweight deployment:

```text
alienhoster/
├── alienhoster.html  # Main webpage structure (Hero, Features, Pricing, Stats, FAQ, Footer)
├── styles.css        # Core stylesheet (Custom properties, Glassmorphism, Animations, Responsiveness)
├── script.js        # Dynamic features (Star-field canvas, Scroll reveal, Counters, FAQ Accordions)
└── logo.png         # Custom AlienHoster logo brand asset
```

---

## ✨ Features & Interactivity

1. **Star-field Canvas (`script.js` & `alienhoster.html`):** 
   - A dynamic background canvas generating drifting stars.
   - Constellation-like lines draw between adjacent stars automatically.
   - Mouse-movement event listener creates an active gravitational link between the cursor and nearby stars.
2. **System Diagnostics (Stats Counter):** 
   - Interactivity-triggered counting animation for uptime, latency, and deployment speeds.
3. **Smooth Scroll-Reveal:**
   - Elements smoothly fade and slide into view as the user scrolls, utilizing an `IntersectionObserver`.
4. **FAQ Accordion:**
   - Seamlessly expanding and collapsing support question slots with height transitions.
5. **Pre-configured Plans (Indian Rupee pricing):**
   - **Starter (₹99/mo):** 1 vCore, 256MB RAM, 3GB NVMe. Best for small utility bots.
   - **Explorer (₹249/mo):** 2 vCores, 2GB RAM, 10GB NVMe. Best for growing communities. (Highlighted *Most Popular* card).
   - **Galaxy (₹499/mo):** 4 vCores, 6GB RAM, 25GB NVMe. Best for large production bots.

---

## 🛠️ Configuration & Customization Guide

### 1. Changing Pricing or System Specifications
To edit or update the price and hardware allocations of plans, locate the `<section id="plans">` in [alienhoster.html](file:///c:/Users/Fil0st/Documents/vibecoding/alienhoster/alienhoster.html) and edit the text elements:
- Modify prices (e.g. `<div class="plan-price"><span class="currency">₹</span>99</div>`)
- Update RAM, NVMe storage, and CPU cores under the `plan-features` list items (`<li>`).

### 2. Updating the Discord Invite Link
All CTAs and purchase buttons redirect users to Discord, where transactions and support tickets are processed:
- Change the URL `https://discord.gg/7yYzqXC5gs` in [alienhoster.html](file:///c:/Users/Fil0st/Documents/vibecoding/alienhoster/alienhoster.html) (Navbar, Hero buttons, Plan cards, FAQs, and CTAs) to your live invite.

### 3. Re-enabling the Testimonials Section
The testimonials / transmission logs section is currently commented out in the HTML.
To display it again:
- Find the section starting with `<!-- <section id="testimonials">` and ending with `</section> -->` in [alienhoster.html](file:///c:/Users/Fil0st/Documents/vibecoding/alienhoster/alienhoster.html).
- Remove the surrounding HTML comment delimiters `<!--` and `-->`.
- Make sure to update the navigation menu link for "Reviews" (`#testimonials`) to link to the active section.

### 4. Customizing CSS Variable Tokens
Colors, fonts, and box-shadow variables are defined globally in the `:root` pseudo-class inside [styles.css](file:///c:/Users/Fil0st/Documents/vibecoding/alienhoster/styles.css). Adjust these variables to instantly change the global theme accent color:
```css
:root {
  --primary-color: #7c3aed;  /* Electric Violet */
  --secondary-color: #38bdf8; /* Neon Blue */
  --bg-dark: #070b14;         /* Deep Space Black */
  --bg-card: rgba(17, 24, 39, 0.7); /* Glassmorphic Cosmic Indigo */
}
```

---

## 🚀 Running Locally

To view and run the website locally:
1. Double-click [alienhoster.html](file:///c:/Users/Fil0st/Documents/vibecoding/alienhoster/alienhoster.html) to open it directly in your web browser.
2. Alternatively, serve the directory using a simple static web server such as VS Code Live Server, Python's server command (`python -m http.server 8000`), or Node's `serve` command.
