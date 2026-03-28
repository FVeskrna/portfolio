# Filip Veškrna — Personal Portfolio

Personal portfolio website built with Vue 3 + TypeScript + Vite. Deployed to GitHub Pages via hash-based routing.

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173/portfolio/](http://localhost:5173/portfolio/)

## Building

```bash
npm run build
```

Output goes to `dist/`.

## Deploying to GitHub Pages

**Before your first deploy**, update the `base` path in `vite.config.ts` to match your GitHub repo name:

```ts
// vite.config.ts
export default defineConfig({
  plugins: [vue()],
  base: '/your-repo-name/',   // <-- change this
})
```

For example, if your repo is `github.com/FVeskrna/portfolio`, set `base: '/portfolio/'`.

Then deploy:

```bash
npm run deploy
```

This runs `npm run build` and pushes the `dist/` folder to the `gh-pages` branch. GitHub Pages will serve from that branch automatically.

## Adding a new project

1. Open `src/data/projects.ts`
2. Add a new object to the `projects` array following the `Project` interface
3. The new project card will appear automatically in the Projects section
4. The case study page is at `#/projects/<your-slug>`

## Project structure

```
src/
├── components/
│   ├── NavBar.vue
│   ├── HeroSection.vue
│   ├── AboutSection.vue
│   ├── SkillsSection.vue
│   ├── ExperienceSection.vue
│   ├── ProjectsSection.vue
│   └── ContactSection.vue
├── views/
│   ├── HomeView.vue
│   └── CaseStudyView.vue
├── data/
│   └── projects.ts     ← all project content lives here
├── router/
│   └── index.ts
├── App.vue
├── main.ts
└── style.css
```
