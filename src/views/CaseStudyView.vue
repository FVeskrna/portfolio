<template>
  <div class="case-study">
    <NavBar />

    <main>
      <div v-if="!project" class="container not-found">
        <h1>Project not found</h1>
        <p>That case study doesn't exist or has moved.</p>
        <RouterLink to="/" class="btn btn-primary">Back to home</RouterLink>
      </div>

      <template v-else>
        <header class="cs-header">
          <div class="container">
            <button type="button" class="back" @click="goBack">
              <IconArrowLeft :size="14" />
              All projects
            </button>

            <h1 class="cs-title">{{ project.title }}</h1>
            <p class="cs-tagline">{{ project.tagline }}</p>

            <div class="cs-meta">
              <ul class="cs-tags">
                <li v-for="tag in project.tags" :key="tag" class="chip">{{ tag }}</li>
              </ul>
              <div class="cs-actions">
                <a
                  v-if="project.liveUrl"
                  :href="project.liveUrl"
                  class="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live site
                  <IconArrowUpRight :size="14" />
                </a>
                <a
                  v-if="project.thesisUrl"
                  :href="project.thesisUrl"
                  class="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the thesis
                  <IconArrowUpRight :size="14" />
                </a>
                <a
                  v-if="project.githubUrl"
                  :href="project.githubUrl"
                  class="btn btn-ghost"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconGitHub :size="16" />
                  Source
                </a>
              </div>
            </div>
          </div>
        </header>

        <section v-if="project.screenshots?.length" class="gallery-section" aria-label="Screenshots">
          <div class="container">
            <div class="gallery" :class="isPortrait ? 'gallery-portrait' : 'gallery-landscape'">
              <figure v-for="(shot, i) in project.screenshots" :key="shot.filename" class="shot">
                <button
                  type="button"
                  class="shot-frame"
                  :aria-label="`Enlarge screenshot: ${shot.caption}`"
                  @click="openLightbox(i)"
                >
                  <img
                    :src="`${base}projects/${project.slug}/${shot.filename}`"
                    :alt="shot.caption"
                    loading="lazy"
                    decoding="async"
                    @load="i === 0 && detectShape($event)"
                  />
                  <span class="shot-zoom" aria-hidden="true"><IconExpand :size="16" /></span>
                </button>
                <figcaption class="shot-caption">{{ shot.caption }}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <div class="container doc">
          <nav class="toc" aria-label="On this page">
            <p class="toc-title">On this page</p>
            <ul>
              <li v-for="s in sections" :key="s.id">
                <a :href="`#${s.id}`" class="toc-link" :class="{ active: activeId === s.id }" @click.prevent="jump(s.id)">
                  {{ s.label }}
                </a>
              </li>
            </ul>
          </nav>

          <article class="doc-body">
            <section v-if="project.context" id="context" class="doc-section">
              <h2 class="doc-h2">Context</h2>
              <p class="doc-p">{{ project.context }}</p>
            </section>

            <section id="overview" class="doc-section">
              <h2 class="doc-h2">Overview</h2>
              <p class="doc-p">{{ project.overview }}</p>
            </section>

            <section v-if="project.algorithmSteps?.length" id="how-it-works" class="doc-section">
              <h2 class="doc-h2">{{ project.algorithmHeading ?? 'How the solver works' }}</h2>
              <ol class="steps">
                <li v-for="(s, i) in project.algorithmSteps" :key="s.step" class="step">
                  <span class="step-n mono">{{ String(i + 1).padStart(2, '0') }}</span>
                  <div>
                    <h3 class="doc-h3">{{ s.step }}</h3>
                    <p class="doc-small">{{ s.description }}</p>
                  </div>
                </li>
              </ol>
            </section>

            <section v-if="project.modules?.length" id="modules" class="doc-section">
              <h2 class="doc-h2">{{ project.modulesHeading ?? "What's inside" }}</h2>
              <div class="cells">
                <div v-for="mod in project.modules" :key="mod.name" class="cell">
                  <h3 class="doc-h3">{{ mod.name }}</h3>
                  <p class="doc-small">{{ mod.description }}</p>
                </div>
              </div>
            </section>

            <section v-if="project.features?.length" id="features" class="doc-section">
              <h2 class="doc-h2">{{ project.featuresHeading ?? 'Key features' }}</h2>
              <dl class="points">
                <div v-for="f in project.features" :key="f.title" class="point">
                  <dt class="doc-h3">{{ f.title }}</dt>
                  <dd class="doc-small">{{ f.description }}</dd>
                </div>
              </dl>
            </section>

            <section v-if="project.problem" id="problem" class="doc-section">
              <h2 class="doc-h2">The problem</h2>
              <p class="doc-p">{{ project.problem }}</p>
            </section>

            <section v-if="project.solution" id="solution" class="doc-section">
              <h2 class="doc-h2">The solution</h2>
              <p class="doc-p">{{ project.solution }}</p>
            </section>

            <section id="highlights" class="doc-section">
              <h2 class="doc-h2">Technical highlights</h2>
              <dl class="points">
                <div v-for="h in project.technicalHighlights" :key="h.title" class="point">
                  <dt class="doc-h3">{{ h.title }}</dt>
                  <dd class="doc-small">{{ h.description }}</dd>
                </div>
              </dl>
            </section>

            <section v-if="project.reflection" id="reflection" class="doc-section">
              <h2 class="doc-h2">{{ project.reflection.heading }}</h2>
              <p class="doc-p">{{ project.reflection.body }}</p>
            </section>

            <section v-if="project.lessonsLearned" id="lessons" class="doc-section">
              <h2 class="doc-h2">Lessons learned</h2>
              <p class="doc-p">{{ project.lessonsLearned }}</p>
            </section>

            <section v-if="project.videos?.length" id="videos" class="doc-section">
              <h2 class="doc-h2">See it in action</h2>
              <ul class="videos">
                <li v-for="video in project.videos" :key="video.url">
                  <a :href="video.url" class="video" target="_blank" rel="noopener noreferrer">
                    <span class="video-icon" aria-hidden="true"><IconPlay :size="14" /></span>
                    <span class="video-label">{{ video.label }}</span>
                    <span class="video-src">YouTube</span>
                    <IconArrowUpRight :size="14" class="video-arrow" />
                  </a>
                </li>
              </ul>
            </section>

            <section v-if="project.techStack?.length" id="built-with" class="doc-section">
              <h2 class="doc-h2">Built with</h2>
              <ul class="cs-tags">
                <li v-for="tech in project.techStack" :key="tech" class="chip">{{ tech }}</li>
              </ul>
            </section>

            <section v-if="project.closing || project.tryIt" class="cta panel">
              <template v-if="project.tryIt">
                <h2 class="cta-title">{{ project.tryIt.heading }}</h2>
                <p class="cta-body">{{ project.tryIt.body }}</p>
                <div class="cta-actions">
                  <a :href="project.tryIt.liveUrl" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    {{ project.tryIt.liveLabel ?? 'Open app' }}
                    <IconArrowUpRight :size="14" />
                  </a>
                  <a :href="project.tryIt.githubUrl" class="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                    <IconGitHub :size="16" />
                    View source
                  </a>
                </div>
              </template>
              <template v-else-if="project.closing">
                <h2 class="cta-title">{{ project.closing.heading }}</h2>
                <p class="cta-body">{{ project.closing.body }}</p>
                <div class="cta-actions">
                  <a :href="project.closing.linkUrl" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    {{ project.closing.linkLabel }}
                    <IconArrowUpRight :size="14" />
                  </a>
                </div>
              </template>
            </section>

            <nav class="pager" aria-label="More case studies">
              <RouterLink v-if="prev" :to="`/projects/${prev.slug}`" class="pager-link">
                <span class="pager-dir"><IconArrowLeft :size="14" /> Previous</span>
                <span class="pager-name">{{ prev.title }}</span>
              </RouterLink>
              <span v-else />
              <RouterLink v-if="next" :to="`/projects/${next.slug}`" class="pager-link pager-next">
                <span class="pager-dir">Next <IconArrowRight :size="14" /></span>
                <span class="pager-name">{{ next.title }}</span>
              </RouterLink>
            </nav>
          </article>
        </div>
      </template>
    </main>

    <SiteFooter />

    <Teleport to="body">
      <Transition name="lb">
        <div
          v-if="lightboxIndex !== null && project?.screenshots"
          class="lightbox"
          role="dialog"
          aria-modal="true"
          :aria-label="project.screenshots[lightboxIndex].caption"
          @click.self="closeLightbox"
        >
          <button ref="lbClose" class="lb-btn lb-close" type="button" aria-label="Close" @click="closeLightbox">
            <IconClose :size="18" />
          </button>
          <button
            v-if="lightboxIndex > 0"
            class="lb-btn lb-prev"
            type="button"
            aria-label="Previous screenshot"
            @click="lightboxIndex--"
          >
            <IconArrowLeft :size="18" />
          </button>
          <figure class="lb-figure">
            <img
              :src="`${base}projects/${project.slug}/${project.screenshots[lightboxIndex].filename}`"
              :alt="project.screenshots[lightboxIndex].caption"
              class="lb-img"
            />
            <figcaption class="lb-caption">
              <span class="mono">{{ lightboxIndex + 1 }} / {{ project.screenshots.length }}</span>
              {{ project.screenshots[lightboxIndex].caption }}
            </figcaption>
          </figure>
          <button
            v-if="lightboxIndex < project.screenshots.length - 1"
            class="lb-btn lb-next"
            type="button"
            aria-label="Next screenshot"
            @click="lightboxIndex++"
          >
            <IconArrowRight :size="18" />
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { getProjectBySlug, projects } from '../data/projects'
import {
  IconGitHub,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUpRight,
  IconClose,
  IconExpand,
  IconPlay,
} from '../icons'

const route = useRoute()
const router = useRouter()
const base = import.meta.env.BASE_URL

const project = computed(() => getProjectBySlug(route.params.slug as string))

const index = computed(() => projects.findIndex((p) => p.slug === project.value?.slug))
const prev = computed(() => (index.value > 0 ? projects[index.value - 1] : undefined))
const next = computed(() =>
  index.value >= 0 && index.value < projects.length - 1 ? projects[index.value + 1] : undefined,
)

const sections = computed(() => {
  const p = project.value
  if (!p) return []
  const list: { id: string; label: string }[] = []
  if (p.context) list.push({ id: 'context', label: 'Context' })
  list.push({ id: 'overview', label: 'Overview' })
  if (p.algorithmSteps?.length) list.push({ id: 'how-it-works', label: 'How it works' })
  if (p.modules?.length) list.push({ id: 'modules', label: p.modulesHeading ?? "What's inside" })
  if (p.features?.length) list.push({ id: 'features', label: p.featuresHeading ?? 'Key features' })
  if (p.problem) list.push({ id: 'problem', label: 'The problem' })
  if (p.solution) list.push({ id: 'solution', label: 'The solution' })
  list.push({ id: 'highlights', label: 'Technical highlights' })
  if (p.reflection) list.push({ id: 'reflection', label: p.reflection.heading })
  if (p.lessonsLearned) list.push({ id: 'lessons', label: 'Lessons learned' })
  if (p.videos?.length) list.push({ id: 'videos', label: 'See it in action' })
  if (p.techStack?.length) list.push({ id: 'built-with', label: 'Built with' })
  return list
})

const isPortrait = ref(false)
function detectShape(e: Event) {
  const img = e.target as HTMLImageElement
  isPortrait.value = img.naturalHeight > img.naturalWidth
}

function goBack() {
  router.push('/projects')
}

function jump(id: string) {
  document.getElementById(id)?.scrollIntoView({ block: 'start' })
}

// Table of contents: highlight the section currently in view
const activeId = ref('')
let observer: IntersectionObserver | null = null

function observeSections() {
  observer?.disconnect()
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting)
      if (visible.length) activeId.value = visible[0].target.id
    },
    { rootMargin: '-20% 0px -70% 0px' },
  )
  sections.value.forEach((s) => {
    const el = document.getElementById(s.id)
    if (el) observer!.observe(el)
  })
}

watch(
  () => route.params.slug,
  async () => {
    isPortrait.value = false
    activeId.value = ''
    await nextTick()
    observeSections()
  },
)

// Lightbox
const lightboxIndex = ref<number | null>(null)
const lbClose = ref<HTMLButtonElement | null>(null)
let lastFocus: HTMLElement | null = null

async function openLightbox(i: number) {
  lastFocus = document.activeElement as HTMLElement | null
  lightboxIndex.value = i
  document.documentElement.style.overflow = 'hidden'
  await nextTick()
  lbClose.value?.focus()
}

function closeLightbox() {
  lightboxIndex.value = null
  document.documentElement.style.overflow = ''
  lastFocus?.focus?.()
}

function handleKeydown(e: KeyboardEvent) {
  if (lightboxIndex.value === null || !project.value?.screenshots) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight' && lightboxIndex.value < project.value.screenshots.length - 1) lightboxIndex.value++
  if (e.key === 'ArrowLeft' && lightboxIndex.value > 0) lightboxIndex.value--
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  observeSections()
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  observer?.disconnect()
  document.documentElement.style.overflow = ''
})
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding-top: 120px;
  padding-bottom: 160px;
}

.not-found h1 {
  font-size: 2.5rem;
  letter-spacing: -0.04em;
}

.not-found p {
  color: var(--text-2);
  margin-bottom: 8px;
}

/* Header */
.cs-header {
  padding: 56px 0 48px;
  border-bottom: 1px solid var(--line);
}

.back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 40px;
  font-size: 0.875rem;
  color: var(--text-3);
  transition: color var(--fast) ease;
}

.back:hover {
  color: var(--text);
}

.cs-title {
  font-size: clamp(2.5rem, 6vw, 4.25rem);
  line-height: 1.02;
  letter-spacing: -0.04em;
  margin-bottom: 16px;
  max-width: 18ch;
}

.cs-tagline {
  font-size: clamp(1.0625rem, 1.6vw, 1.25rem);
  line-height: 1.55;
  color: var(--text-2);
  max-width: 52ch;
  margin-bottom: 36px;
}

.cs-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.cs-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.cs-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* Gallery */
.gallery-section {
  padding: 48px 0;
  border-bottom: 1px solid var(--line);
}

.gallery {
  display: grid;
  gap: 20px;
}

.gallery-landscape {
  grid-template-columns: repeat(2, 1fr);
}

.gallery-portrait {
  grid-template-columns: repeat(4, 1fr);
}

.gallery .shot:only-child {
  grid-column: 1 / -1;
}

.shot {
  margin: 0;
}

.shot-frame {
  position: relative;
  display: block;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  background: var(--bg-raised);
  box-shadow: 0 0 0 1px var(--line);
  cursor: zoom-in;
  transition: box-shadow 200ms ease;
}

.shot-frame:hover {
  box-shadow: 0 0 0 1px var(--line-strong), 0 20px 40px -24px rgba(0, 0, 0, 0.6);
}

.shot-frame img {
  width: 100%;
  height: auto;
  transition: transform 500ms var(--ease-out);
}

.shot-frame:hover img {
  transform: scale(1.012);
}

.shot-zoom {
  position: absolute;
  top: 10px;
  right: 10px;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  color: #f4f5f6;
  background: rgba(8, 9, 10, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity 200ms ease, transform 200ms var(--ease-out);
}

.shot-frame:hover .shot-zoom,
.shot-frame:focus-visible .shot-zoom {
  opacity: 1;
  transform: none;
}

.shot-caption {
  margin-top: 10px;
  font-size: 0.8125rem;
  color: var(--text-3);
  line-height: 1.45;
}

/* Doc layout */
.doc {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 0 24px;
  padding-top: 72px;
  padding-bottom: 96px;
}

.toc {
  grid-column: 1 / span 3;
  position: sticky;
  top: calc(var(--nav-height) + 32px);
  align-self: start;
}

.toc-title {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 12px;
}

.toc ul {
  border-left: 1px solid var(--line);
}

.toc-link {
  display: block;
  margin-left: -1px;
  padding: 6px 0 6px 14px;
  border-left: 1px solid transparent;
  font-size: 0.8125rem;
  line-height: 1.4;
  color: var(--text-3);
  transition: color var(--fast) ease, border-color var(--fast) ease;
}

.toc-link:hover {
  color: var(--text-2);
}

.toc-link.active {
  color: var(--text);
  border-left-color: var(--text);
}

.doc-body {
  grid-column: 4 / span 9;
  min-width: 0;
}

.doc-section {
  padding-bottom: 56px;
}

.doc-section + .doc-section {
  padding-top: 56px;
  border-top: 1px solid var(--line);
}

.doc-h2 {
  font-size: 1.5rem;
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin-bottom: 20px;
}

.doc-h3 {
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: -0.015em;
  color: var(--text);
  margin-bottom: 6px;
}

.doc-p {
  font-size: 1.0625rem;
  line-height: 1.75;
  color: var(--text-2);
  max-width: 68ch;
}

.doc-small {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--text-2);
}

/* Points (highlights / features) */
.points {
  border-top: 1px solid var(--line);
}

.point {
  display: grid;
  grid-template-columns: minmax(180px, 2fr) 5fr;
  gap: 8px 32px;
  padding: 20px 0;
  border-bottom: 1px solid var(--line);
}

.point dt {
  margin: 0;
}

/* Modules: one grid with shared hairlines */
.cells {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);
  border-radius: var(--radius-panel);
  overflow: hidden;
  box-shadow: 0 0 0 1px var(--line);
}

.cell {
  padding: 20px;
  background: var(--bg);
}

.cell .doc-small {
  font-size: 0.875rem;
}

/* Steps */
.steps {
  display: flex;
  flex-direction: column;
}

.step {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 16px;
  padding: 18px 0;
  border-bottom: 1px solid var(--line);
}

.step:first-child {
  border-top: 1px solid var(--line);
}

.step-n {
  font-size: 0.8125rem;
  color: var(--text-3);
  padding-top: 3px;
}

/* Videos */
.videos {
  border-top: 1px solid var(--line);
}

.video {
  display: grid;
  grid-template-columns: 32px 1fr auto 16px;
  align-items: center;
  gap: 14px;
  padding: 16px 8px;
  border-bottom: 1px solid var(--line);
  transition: background-color var(--fast) ease;
}

.video:hover {
  background: var(--glow);
}

.video-icon {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  color: var(--text-2);
  box-shadow: 0 0 0 1px var(--line) inset;
}

.video-label {
  font-weight: 500;
  letter-spacing: -0.01em;
}

.video-src {
  font-size: 0.8125rem;
  color: var(--text-3);
}

.video-arrow {
  color: var(--text-3);
}

/* CTA */
.cta {
  margin-top: 16px;
  padding: clamp(28px, 4vw, 44px);
}

.cta-title {
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  letter-spacing: -0.035em;
  line-height: 1.15;
  margin-bottom: 12px;
}

.cta-body {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--text-2);
  max-width: 56ch;
  margin-bottom: 28px;
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* Pager */
.pager {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 56px;
}

.pager-link {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px;
  border-radius: var(--radius-panel);
  box-shadow: 0 0 0 1px var(--line) inset;
  transition: background-color var(--fast) ease, box-shadow var(--fast) ease;
}

.pager-link:hover {
  background: var(--glow);
  box-shadow: 0 0 0 1px var(--line-strong) inset;
}

.pager-next {
  text-align: right;
  align-items: flex-end;
}

.pager-dir {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8125rem;
  color: var(--text-3);
}

.pager-name {
  font-weight: 500;
  letter-spacing: -0.015em;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 64px 24px 24px;
  background: rgba(4, 5, 6, 0.92);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #f4f5f6;
}

.lb-figure {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  max-width: min(92vw, 1320px);
  margin: 0;
}

.lb-img {
  max-width: 100%;
  max-height: 80vh;
  border-radius: 10px;
  object-fit: contain;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 40px 100px rgba(0, 0, 0, 0.6);
}

.lb-caption {
  display: flex;
  gap: 12px;
  font-size: 0.875rem;
  color: rgba(244, 245, 246, 0.7);
  text-align: center;
}

.lb-caption .mono {
  color: rgba(244, 245, 246, 0.45);
}

.lb-btn {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  color: #f4f5f6;
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  transition: background-color var(--fast) ease;
}

.lb-btn:hover {
  background: rgba(255, 255, 255, 0.14);
}

.lb-close {
  position: absolute;
  top: 16px;
  right: 16px;
}

.lb-enter-active,
.lb-leave-active {
  transition: opacity 200ms var(--ease-out);
}

.lb-enter-active .lb-img {
  transition: transform 300ms var(--ease-out);
}

.lb-enter-from,
.lb-leave-to {
  opacity: 0;
}

.lb-enter-from .lb-img {
  transform: scale(0.98);
}

@media (max-width: 960px) {
  .toc {
    display: none;
  }
  .doc-body {
    grid-column: 1 / -1;
  }
  .gallery-portrait {
    grid-template-columns: repeat(2, 1fr);
  }
  .cells {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .gallery-landscape,
  .cells {
    grid-template-columns: 1fr;
  }
  .point {
    grid-template-columns: 1fr;
  }
  .pager {
    grid-template-columns: 1fr;
  }
  .lb-prev,
  .lb-next {
    display: none;
  }
  .cs-meta {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
