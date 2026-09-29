<template>
  <section class="section" id="projects">
    <div class="container">
      <div class="section-head">
        <h2 class="section-title">
          Selected work
        </h2>
      </div>

      <div class="bento">
        <RouterLink
          v-for="(p, i) in featured"
          :key="p.slug"
          :to="`/projects/${p.slug}`"
          class="tile panel"
          :class="[i === 0 ? 'tile-wide' : 'tile-half', `shape-${shapeOf(p)}`]"
          @pointermove="track"
        >
          <div class="tile-text">
            <h3 class="tile-title">{{ p.title }}</h3>
            <p class="tile-tagline">{{ p.tagline }}</p>
            <ul class="tile-tags">
              <li v-for="tag in p.tags.slice(0, 4)" :key="tag" class="chip">{{ tag }}</li>
            </ul>
            <span class="tile-cta">
              Read case study
              <IconArrowRight :size="14" />
            </span>
          </div>

          <div class="tile-media" aria-hidden="true">
            <template v-if="shapeOf(p) === 'desktop'">
              <div class="window">
                <img :src="shot(p, 0)" alt="" loading="lazy" decoding="async" />
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

      <h3 class="more-title">More projects</h3>
      <ul class="more">
        <li v-for="p in others" :key="p.slug">
          <RouterLink :to="`/projects/${p.slug}`" class="more-row">
            <span class="more-name">{{ p.title }}</span>
            <span class="more-tagline">{{ p.tagline }}</span>
            <span class="more-tags">{{ p.tags.slice(0, 3).join(' · ') }}</span>
            <IconArrowUpRight :size="16" class="more-arrow" />
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { projects, type Project } from '../data/projects'
import { IconArrowRight, IconArrowUpRight } from '../icons'

const base = import.meta.env.BASE_URL

const featured = projects.filter((p) => p.screenshots?.length)
const others = projects.filter((p) => !p.screenshots?.length)

const PHONE = new Set(['mimimatch', 'sudoku-solver'])
function shapeOf(p: Project) {
  return PHONE.has(p.slug) ? 'pair' : 'desktop'
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

.tile-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text);
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

/* More projects */
.more-title {
  margin: 72px 0 16px;
  font-size: 1.25rem;
  letter-spacing: -0.025em;
}

.more {
  border-top: 1px solid var(--line);
}

.more-row {
  display: grid;
  grid-template-columns: 3fr 5fr 3fr 24px;
  align-items: center;
  gap: 24px;
  padding: 20px 8px;
  border-bottom: 1px solid var(--line);
  transition: background-color var(--fast) ease;
}

.more-row:hover {
  background: var(--glow);
}

.more-name {
  font-weight: 500;
  letter-spacing: -0.015em;
}

.more-tagline {
  font-size: 0.875rem;
  color: var(--text-2);
  line-height: 1.5;
}

.more-tags {
  font-size: 0.8125rem;
  color: var(--text-3);
}

.more-arrow {
  color: var(--text-3);
  transition: transform 200ms var(--ease-out), color var(--fast) ease;
}

.more-row:hover .more-arrow {
  color: var(--text);
  transform: translate(2px, -2px);
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
  .tile-half {
    grid-column: 1 / -1;
    min-height: 520px;
  }
  .more-row {
    grid-template-columns: 1fr 24px;
    gap: 6px 16px;
  }
  .more-name {
    grid-column: 1;
  }
  .more-tagline,
  .more-tags {
    grid-column: 1;
  }
  .more-arrow {
    grid-column: 2;
    grid-row: 1 / span 3;
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
