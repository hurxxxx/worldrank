You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight.
Focus on:
Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.
Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with shar p accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for insp iration.
Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motio n library for React when available. Focus on high-impact moments: one well-orchestrated page load with stagger ed reveals (animation-delay) creates more delight than scattered micro-interactions.
Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.
Avoid generic AI-generated aesthetics:
Overused font families (Inter, Roboto, Arial, system fonts)
Clichéd color schemes (particularly purple gradients on white backgrounds)
Predictable layouts and component patterns
Cookie-cutter design that lacks context-specific character
Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!

## i18n (Internationalization)

This project uses i18next for translations (30+ languages supported).

### Translation Key Convention (CRITICAL)

**Always use English original text as the translation key:**
```tsx
// CORRECT
t('Where do you rank among 8 billion people?')
t('Enter your annual income')

// WRONG - Never use abbreviated keys
t('app_desc')           // ❌
t('income_input_label') // ❌
```

**Locale file format:**
```json
// en.json - key equals value
"Submit": "Submit"

// ko.json - key is English, value is translation
"Submit": "제출"
```

### Workflow

1. Use `t('Full English sentence')` in your component code
2. Run `cd frontend && npm run i18n:parse` to extract keys to all locale files
3. Fill `en.json` with key = value (English text)
4. Add translations to other locale files (`ko.json`, `ja.json`, etc.)

**DO NOT manually add keys to locale files** - always use the parser to maintain consistency.
**DO NOT use abbreviated keys** - always use the full English sentence as the key.
