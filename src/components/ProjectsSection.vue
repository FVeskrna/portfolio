<template>
  <section class="section" id="projects">
    <div class="container">
      <div class="section-head">
        <h2 class="section-title">Selected work</h2>
        <p class="section-lede">
          Each project comes with a detailed case study covering the goal, how it was built, and the
          key technical decisions behind it.
        </p>
      </div>

      <div class="bento">
        <RouterLink
          v-for="p in featured"
          :key="p.slug"
          :to="`/projects/${p.slug}`"
          class="tile panel"
          :class="[shapeOf(p) === 'desktop' ? 'tile-wide' : 'tile-half', `shape-${shapeOf(p)}`, { flip: flipped.has(p.slug) }]"
          @pointermove="track"
        >
          <div class="tile-text">
            <h3 class="tile-title">{{ p.title }}</h3>
            <p class="tile-tagline">{{ p.tagline }}</p>
            <ul class="tile-tags">
              <li v-for="tag in p.tags.slice(0, 4)" :key="tag" class="chip">{{ tag }}</li>
            </ul>
            <span class="tile-cta btn btn-ghost btn-sm">
              Read case study
              <IconArrowRight :size="14" />
            </span>
          </div>

          <div class="tile-media" aria-hidden="true">
            <template v-if="shapeOf(p) === 'desktop'">
              <div class="window">
                <img :src="shot(p, p.coverIndex ?? 0)" alt="" loading="lazy" decoding="async" />
              </div>
            </template>
            <template v-else>
              <div class="pair">
                <img
                  v-for="n in 2"
                  :key="n"
                  :src="shot(p, n - 1)"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  class="pair-img"
                  :class="`pair-${n}`"
                />
              </div>
            </template>
          </div>
        </RouterLink>
      </div>

      <RouterLink to="/projects" class="all panel" @pointermove="track">
        <div class="all-text">
          <h3 class="all-title">Browse all {{ projects.length }} projects</h3>
          <p class="all-body">
            Including {{ teaserNames }}, each with its own case study.
          </p>
        </div>
        <div class="all-previews" aria-hidden="true">
          <img
            v-for="p in teaserThumbs"
            :key="p.slug"
            :src="shot(p, p.coverIndex ?? 0)"
            alt=""
            loading="lazy"
            decoding="async"
            class="all-thumb"
          />
          <span v-if="moreCount > 0" class="all-more mono">+{{ moreCount }}</span>
        </div>
        <span class="all-btn btn btn-primary">
          View all projects
          <IconArrowRight :size="14" />
        </span>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { projects, type Project } from '../data/projects'
import { IconArrowRight } from '../icons'

const base = import.meta.env.BASE_URL

const featured = projects.filter((p) => p.featured && p.screenshots?.length)
const others = projects
  .filter((p) => !featured.includes(p))
  .sort((a, b) => Number(!!b.screenshots?.length) - Number(!!a.screenshots?.length))

const teaserThumbs = others.filter((p) => p.screenshots?.length).slice(0, 3)
const moreCount = others.length - teaserThumbs.length
const teaserNames = (() => {
  const names = others.slice(0, 3).map((p) => p.title)
  return names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}` : names[0]
})()

const PHONE = new Set(['mimimatch', 'sudoku-solver'])
function shapeOf(p: Project) {
  return PHONE.has(p.slug) ? 'pair' : 'desktop'
}

// Alternate the image side on consecutive wide tiles so the rhythm doesn't repeat.
const flipped = new Set<string>()
let wideRun = 0
for (const p of featured) {
  if (shapeOf(p) !== 'desktop') {
    wideRun = 0
    continue
  }
  if (wideRun % 2 === 1) flipped.add(p.slug)
  wideRun++
}

function shot(p: Project, i: number) {
  const s = p.screenshots![Math.min(i, p.screenshots!.length - 1)]
  return `${base}projects/${p.slug}/${s.filename}`
}

function track(e: PointerEvent) {
  const el = e.currentTarget as HTMLElement
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}
</script>

<style scoped>
.bento {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
}

.tile {
  position: relative;
  display: grid;
  overflow: hidden;
  isolation: isolate;
  color: var(--text);
  transition: box-shadow 240ms ease, background-color 240ms ease;
}

.tile::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: 0;
  background: radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), var(--glow), transparent 70%);
  transition: opacity 300ms ease;
}

.tile:hover {
  box-shadow: 0 0 0 1px var(--line-strong), var(--shadow-panel);
}

.tile:hover::before {
  opacity: 1;
}

.tile-wide {
  grid-column: 1 / -1;
  grid-template-columns: minmax(260px, 4fr) 8fr;
  min-height: 440px;
}

.tile-half {
  grid-column: span 6;
  grid-template-rows: auto 1fr;
  min-height: 560px;
}

.tile-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding: 32px;
}

.tile-wide .tile-text {
  justify-content: flex-end;
}

.tile-title {
  font-size: 1.375rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.tile-tagline {
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--text-2);
  max-width: 40ch;
}

.tile-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}

.tile-cta :deep(svg) {
  transition: transform 200ms var(--ease-out);
}

.tile:hover .tile-cta :deep(svg) {
  transform: translateX(3px);
}

/* Media */
.tile-media {
  position: relative;
  min-height: 0;
  overflow: hidden;
}

.window {
  position: absolute;
  top: 40px;
  left: 0;
  width: 118%;
  border-radius: 10px 0 0 0;
  overflow: hidden;
  background: var(--bg);
  box-shadow: 0 0 0 1px var(--line-strong), 0 1px 0 0 var(--highlight) inset,
    0 30px 60px -30px rgba(0, 0, 0, 0.8);
  transition: transform 500ms var(--ease-out);
}

.tile:hover .window {
  transform: translate(-6px, -4px);
}

.tile-wide.flip {
  grid-template-columns: 8fr minmax(260px, 4fr);
}

.tile-wide.flip .tile-media {
  order: -1;
}

.tile-wide.flip .window {
  left: auto;
  right: 0;
  border-radius: 0 10px 0 0;
}

.tile-wide.flip:hover .window {
  transform: translate(6px, -4px);
}

.window img {
  width: 100%;
  height: auto;
}

.pair {
  position: absolute;
  inset: 0;
}

.pair-img {
  position: absolute;
  top: 32px;
  width: 38%;
  border-radius: 14px;
  box-shadow: 0 0 0 1px var(--line-strong), 0 24px 50px -20px rgba(0, 0, 0, 0.8);
  transition: transform 500ms var(--ease-out);
}

.pair-1 {
  left: 9%;
}

.pair-2 {
  right: 9%;
}

.tile:hover .pair-img {
  transform: translateY(-6px);
}

.tile:hover .pair-2 {
  transition-delay: 40ms;
}

.shape-pair .pair-img {
  border-radius: 12px;
}

/* Case-study CTA inside tiles */
.tile-cta {
  margin-top: 12px;
  pointer-events: none;
}

.tile:hover .tile-cta {
  background: var(--glow);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--text) 30%, transparent) inset;
}

.section-lede {
  grid-column: 1 / span 7;
  margin-top: 16px;
  font-size: 1.0625rem;
  line-height: 1.6;
  color: var(--text-2);
  max-width: 58ch;
}

/* Archive teaser */
.all {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 24px 40px;
  margin-top: 16px;
  padding: 28px 32px;
  overflow: hidden;
  isolation: isolate;
  transition: box-shadow 240ms ease;
}

.all::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: 0;
  background: radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), var(--glow), transparent 70%);
  transition: opacity 300ms ease;
}

.all:hover {
  box-shadow: 0 0 0 1px var(--line-strong), var(--shadow-panel);
}

.all:hover::before {
  opacity: 1;
}

.all-title {
  font-size: 1.375rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin-bottom: 6px;
}

.all-body {
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--text-2);
  max-width: 52ch;
}

.all-previews {
  display: flex;
  align-items: center;
}

.all-thumb,
.all-more {
  width: 88px;
  height: 56px;
  border-radius: 8px;
  box-shadow: 0 0 0 1px var(--line-strong), 0 0 0 4px var(--panel);
  transition: transform 300ms var(--ease-out);
}

.all-thumb {
  object-fit: cover;
  object-position: center top;
  background: var(--bg);
}

.all-thumb + .all-thumb,
.all-thumb + .all-more {
  margin-left: -18px;
}

.all-more {
  display: grid;
  place-items: center;
  font-size: 0.8125rem;
  color: var(--text-2);
  background: var(--bg-raised);
}

.all:hover .all-thumb:nth-child(1) {
  transform: translateX(-6px);
}

.all:hover .all-more {
  transform: translateX(6px);
}

.all-btn :deep(svg) {
  transition: transform 200ms var(--ease-out);
}

.all:hover .all-btn :deep(svg) {
  transform: translateX(3px);
}

@media (max-width: 960px) {
  .tile-wide {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    min-height: 0;
  }
  .tile-wide .tile-media {
    padding-left: 24px;
  }
  .tile-wide .window {
    position: relative;
    top: 0;
    width: 115%;
    margin-bottom: -2px;
  }
  .tile-wide.flip {
    grid-template-columns: 1fr;
  }
  .tile-wide.flip .tile-media {
    order: 0;
  }
  .tile-wide.flip .window {
    right: auto;
    border-radius: 10px 0 0 0;
  }
  .tile-half {
    grid-column: 1 / -1;
    min-height: 520px;
  }
  .all {
    grid-template-columns: 1fr;
    padding: 24px;
  }
  .section-lede {
    grid-column: 1 / -1;
  }
}

@media (max-width: 560px) {
  .tile-text {
    padding: 24px;
  }
  .tile-half {
    min-height: 480px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .window,
  .pair-img,
  .tile-cta :deep(svg) {
    transition: none;
  }
}
</style>
