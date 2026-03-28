<template>
  <div class="case-study">
    <NavBar />

    <main>
      <!-- Not found -->
      <div v-if="!project" class="container not-found">
        <h1>Project not found</h1>
        <RouterLink to="/" class="btn btn-primary">Back to home</RouterLink>
      </div>

      <template v-else>
        <!-- Back button -->
        <div class="container back-bar">
          <a href="#" class="back-link" @click.prevent="goBack">
            <IconArrowLeft />
            Back to projects
          </a>
        </div>

        <!-- Hero -->
        <div class="container cs-hero">
          <div class="cs-tags">
            <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <h1 class="cs-title">{{ project.title }}</h1>
          <p class="cs-tagline">{{ project.tagline }}</p>
          <div class="cs-hero-links">
            <a
              v-if="project.liveUrl"
              :href="project.liveUrl"
              class="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live site
            </a>
            <a
              v-if="project.thesisUrl"
              :href="project.thesisUrl"
              class="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              View thesis
            </a>
            <a
              v-if="project.githubUrl"
              :href="project.githubUrl"
              class="btn btn-outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconGitHub :size="18" />
              GitHub
            </a>
          </div>
        </div>

        <!-- Screenshots gallery -->
        <section v-if="project.screenshots?.length" class="screenshots-section">
          <div class="container">
            <p class="section-label">Screenshots</p>
            <div class="screenshots-grid">
              <figure
                v-for="(shot, i) in project.screenshots"
                :key="shot.filename"
                class="screenshot-figure"
                @click="openLightbox(i)"
              >
                <div class="screenshot-img-wrap">
                  <img
                    :src="`${base}projects/${project.slug}/${shot.filename}`"
                    :alt="shot.caption"
                    class="screenshot-img"
                    loading="lazy"
                  />
                  <div class="screenshot-overlay" aria-hidden="true">
                    <IconExpand />
                  </div>
                </div>
                <figcaption class="screenshot-caption">{{ shot.caption }}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <!-- Main content -->
        <div class="container cs-content">

          <!-- Context (optional — e.g. academic background) -->
          <section v-if="project.context" class="cs-section">
            <h2 class="cs-section-title">Context</h2>
            <div class="context-card">
              <p class="cs-body">{{ project.context }}</p>
            </div>
          </section>

          <!-- Overview -->
          <section class="cs-section">
            <h2 class="cs-section-title">Overview</h2>
            <p class="cs-body">{{ project.overview }}</p>
          </section>

          <!-- Algorithm steps (optional — numbered step-by-step flow) -->
          <section v-if="project.algorithmSteps?.length" class="cs-section">
            <h2 class="cs-section-title">How the solver works</h2>
            <ol class="algorithm-steps">
              <li
                v-for="(s, i) in project.algorithmSteps"
                :key="s.step"
                class="algorithm-step"
              >
                <span class="step-number">{{ i + 1 }}</span>
                <div class="step-content">
                  <h3 class="step-title">{{ s.step }}</h3>
                  <p class="step-desc">{{ s.description }}</p>
                </div>
              </li>
            </ol>
          </section>

          <!-- Modules / Interactive systems -->
          <section v-if="project.modules?.length" class="cs-section">
            <h2 class="cs-section-title">{{ project.modulesHeading ?? "What's inside" }}</h2>
            <div class="modules-grid">
              <div
                v-for="mod in project.modules"
                :key="mod.name"
                class="module-card"
              >
                <h3 class="module-name">{{ mod.name }}</h3>
                <p class="module-desc">{{ mod.description }}</p>
              </div>
            </div>
          </section>

          <!-- Key features (optional) -->
          <section v-if="project.features?.length" class="cs-section">
            <h2 class="cs-section-title">{{ project.featuresHeading ?? 'Key features' }}</h2>
            <div class="highlights-grid">
              <div
                v-for="feat in project.features"
                :key="feat.title"
                class="highlight-card card"
              >
                <h3 class="highlight-title">{{ feat.title }}</h3>
                <p class="highlight-desc">{{ feat.description }}</p>
              </div>
            </div>
          </section>

          <!-- The Problem (optional) -->
          <section v-if="project.problem" class="cs-section">
            <h2 class="cs-section-title">The Problem</h2>
            <p class="cs-body">{{ project.problem }}</p>
          </section>

          <!-- The Solution (optional) -->
          <section v-if="project.solution" class="cs-section">
            <h2 class="cs-section-title">The Solution</h2>
            <p class="cs-body">{{ project.solution }}</p>
          </section>

          <!-- Technical Highlights -->
          <section class="cs-section">
            <h2 class="cs-section-title">Technical Highlights</h2>
            <div class="highlights-grid">
              <div
                v-for="h in project.technicalHighlights"
                :key="h.title"
                class="highlight-card card"
              >
                <h3 class="highlight-title">{{ h.title }}</h3>
                <p class="highlight-desc">{{ h.description }}</p>
              </div>
            </div>
          </section>

          <!-- Reflection (optional — custom heading + prose) -->
          <section v-if="project.reflection" class="cs-section">
            <h2 class="cs-section-title">{{ project.reflection.heading }}</h2>
            <p class="cs-body">{{ project.reflection.body }}</p>
          </section>

          <!-- Lessons Learned (optional) -->
          <section v-if="project.lessonsLearned" class="cs-section">
            <h2 class="cs-section-title">Lessons Learned</h2>
            <p class="cs-body">{{ project.lessonsLearned }}</p>
          </section>

          <!-- Demo videos (optional) -->
          <section v-if="project.videos?.length" class="cs-section">
            <h2 class="cs-section-title">See it in action</h2>
            <div class="videos-list">
              <a
                v-for="video in project.videos"
                :key="video.url"
                :href="video.url"
                class="video-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div class="video-play-badge" aria-hidden="true">
                  <IconPlay />
                </div>
                <div class="video-info">
                  <span class="video-label">{{ video.label }}</span>
                  <span class="video-source">Watch on YouTube</span>
                </div>
                <IconExternalLink class="video-arrow" />
              </a>
            </div>
          </section>

          <!-- Tech stack (optional) -->
          <section v-if="project.techStack?.length" class="cs-section">
            <h2 class="cs-section-title">Built with</h2>
            <div class="tech-stack-tags">
              <span v-for="tech in project.techStack" :key="tech" class="tag tech-tag">{{ tech }}</span>
            </div>
          </section>

        </div>

        <!-- Closing CTA (optional) -->
        <section v-if="project.closing" class="closing-section">
          <div class="container closing-inner">
            <h2 class="closing-heading">{{ project.closing.heading }}</h2>
            <p class="closing-body">{{ project.closing.body }}</p>
            <a
              :href="project.closing.linkUrl"
              class="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ project.closing.linkLabel }}
            </a>
          </div>
        </section>

        <!-- Try it CTA (optional) -->
        <section v-if="project.tryIt" class="try-it-section">
          <div class="container try-it-inner">
            <h2 class="try-it-heading">{{ project.tryIt.heading }}</h2>
            <p class="try-it-body">{{ project.tryIt.body }}</p>
            <div class="try-it-links">
              <a
                :href="project.tryIt.liveUrl"
                class="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ project.tryIt.liveLabel ?? 'Open app' }}
              </a>
              <a
                :href="project.tryIt.githubUrl"
                class="try-it-gh-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconGitHub :size="18" />
                View source on GitHub
              </a>
            </div>
          </div>
        </section>

        <!-- Bottom back link -->
        <div class="container cs-bottom-nav">
          <a href="#" class="btn btn-outline" @click.prevent="goBack">
            <IconArrowLeft />
            Back to projects
          </a>
        </div>
      </template>
    </main>

    <footer class="footer">
      <div class="container footer-inner">
        <p>© {{ year }} Filip Veškrna. Built with Vue 3 + TypeScript.</p>
      </div>
    </footer>

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="lightboxIndex !== null && project?.screenshots"
        class="lightbox"
        @click.self="closeLightbox"
      >
        <button class="lightbox-close" @click="closeLightbox" aria-label="Close">
          <IconClose />
        </button>
        <button
          v-if="lightboxIndex > 0"
          class="lightbox-nav lightbox-prev"
          @click="lightboxIndex--"
          aria-label="Previous"
        >
          <IconArrowLeft />
        </button>
        <div class="lightbox-img-wrap">
          <img
            :src="`${base}projects/${project.slug}/${project.screenshots[lightboxIndex].filename}`"
            :alt="project.screenshots[lightboxIndex].caption"
            class="lightbox-img"
          />
          <p class="lightbox-caption">{{ project.screenshots[lightboxIndex].caption }}</p>
        </div>
        <button
          v-if="lightboxIndex < project.screenshots.length - 1"
          class="lightbox-nav lightbox-next"
          @click="lightboxIndex++"
          aria-label="Next"
        >
          <IconArrowRight />
        </button>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import { getProjectBySlug } from '../data/projects'
import {
  IconGitHub,
  IconArrowLeft,
  IconArrowRight,
  IconClose,
  IconExpand,
  IconExternalLink,
} from '../icons'

// Inline play icon (only used here)
import { h, defineComponent } from 'vue'
const IconPlay = defineComponent({
  name: 'IconPlay',
  setup() {
    return () =>
      h(
        'svg',
        { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'currentColor' },
        [h('polygon', { points: '5 3 19 12 5 21 5 3' })],
      )
  },
})

const route = useRoute()
const router = useRouter()
const year = new Date().getFullYear()
const base = import.meta.env.BASE_URL

const project = computed(() => getProjectBySlug(route.params.slug as string))

function goBack() {
  router.push('/').then(() => {
    setTimeout(() => {
      const el = document.getElementById('projects')
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 72
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }, 80)
  })
}

// Lightbox
const lightboxIndex = ref<number | null>(null)

function openLightbox(i: number) {
  lightboxIndex.value = i
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightboxIndex.value = null
  document.body.style.overflow = ''
}

function handleKeydown(e: KeyboardEvent) {
  if (lightboxIndex.value === null || !project.value?.screenshots) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight' && lightboxIndex.value < project.value.screenshots.length - 1) {
    lightboxIndex.value++
  }
  if (e.key === 'ArrowLeft' && lightboxIndex.value > 0) {
    lightboxIndex.value--
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* ===== Layout ===== */
.container {
  max-width: 960px;
}

/* ===== Not found ===== */
.not-found {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  padding-top: 80px;
  padding-bottom: 80px;
}
.not-found h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

/* ===== Back ===== */
.back-bar {
  padding-top: 36px;
}
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--transition);
}
.back-link:hover {
  color: var(--color-accent);
}

/* ===== Hero ===== */
.cs-hero {
  padding-top: 36px;
  padding-bottom: 48px;
  border-bottom: 1px solid var(--color-border);
  transition: border-color var(--transition);
}
.cs-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}
.cs-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: var(--color-text-primary);
  line-height: 1.12;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}
.cs-tagline {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
  margin-bottom: 28px;
  max-width: 560px;
}
.cs-hero-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* ===== Screenshots ===== */
.screenshots-section {
  padding: 56px 0;
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  transition: background-color var(--transition), border-color var(--transition);
}
.screenshots-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 20px;
}
.screenshot-figure {
  cursor: zoom-in;
  margin: 0;
}
.screenshot-img-wrap {
  position: relative;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  overflow: hidden;
  background-color: var(--color-bg);
  transition: border-color var(--transition), box-shadow var(--transition);
}
.screenshot-img-wrap:hover {
  border-color: var(--color-accent);
  box-shadow: 0 8px 32px rgba(37, 99, 235, 0.15);
}
.screenshot-img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}
.screenshot-img-wrap:hover .screenshot-img {
  transform: scale(1.01);
}
.screenshot-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
  color: #fff;
  opacity: 0;
}
.screenshot-img-wrap:hover .screenshot-overlay {
  background: rgba(0, 0, 0, 0.35);
  opacity: 1;
}
.screenshot-caption {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  margin-top: 10px;
  text-align: center;
  line-height: 1.4;
}

/* ===== Main content ===== */
.cs-content {
  display: flex;
  flex-direction: column;
  gap: 64px;
  padding-top: 64px;
  padding-bottom: 64px;
}
.cs-section-title {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--color-accent);
  display: inline-block;
}
.cs-body {
  font-size: 1.0625rem;
  color: var(--color-text-secondary);
  line-height: 1.8;
}

/* ===== Context card ===== */
.context-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--color-accent);
  border-radius: var(--radius);
  padding: 24px 28px;
  transition: background-color var(--transition), border-color var(--transition);
}

/* ===== Modules grid ===== */
.modules-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.module-card {
  padding: 18px 20px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-accent);
  border-radius: var(--radius);
  transition: background-color var(--transition), border-color var(--transition),
    box-shadow var(--transition);
}
.module-card:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
}
[data-theme='dark'] .module-card:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
}
.module-name {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 4px;
}
.module-desc {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

/* ===== Highlights grid ===== */
.highlights-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.highlight-card {
  border-left: 3px solid var(--color-accent);
  border-radius: var(--radius);
}
.highlight-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 10px;
}
.highlight-desc {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

/* ===== Videos ===== */
.videos-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.video-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  text-decoration: none;
  color: var(--color-text-primary);
  transition: border-color var(--transition), background-color var(--transition),
    box-shadow var(--transition);
}
.video-card:hover {
  border-color: var(--color-accent);
  color: var(--color-text-primary);
  box-shadow: 0 2px 16px rgba(37, 99, 235, 0.1);
}
.video-play-badge {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-accent);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background-color var(--transition);
}
.video-card:hover .video-play-badge {
  background-color: var(--color-accent-hover);
}
.video-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}
.video-label {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-primary);
}
.video-source {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}
.video-arrow {
  color: var(--color-text-secondary);
  flex-shrink: 0;
  transition: color var(--transition), transform 0.15s ease;
}
.video-card:hover .video-arrow {
  color: var(--color-accent);
  transform: translate(2px, -2px);
}

/* ===== Tech stack ===== */
.tech-stack-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.tech-tag {
  font-size: 0.875rem;
}

/* ===== Closing CTA ===== */
.closing-section {
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: 72px 0;
  transition: background-color var(--transition), border-color var(--transition);
}
.closing-inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}
.closing-heading {
  font-size: clamp(1.375rem, 3vw, 1.75rem);
  font-weight: 800;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
}
.closing-body {
  font-size: 1.0625rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  max-width: 600px;
}

/* ===== Try it ===== */
.try-it-section {
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: 72px 0;
  transition: background-color var(--transition), border-color var(--transition);
}
.try-it-inner {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.try-it-heading {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
}
.try-it-body {
  font-size: 1.0625rem;
  color: var(--color-text-secondary);
  max-width: 420px;
  line-height: 1.6;
}
.try-it-links {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 8px;
}
.try-it-gh-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--transition);
}
.try-it-gh-link:hover {
  color: var(--color-accent);
}

/* ===== Bottom nav ===== */
.cs-bottom-nav {
  padding-top: 40px;
  padding-bottom: 64px;
}

/* ===== Footer ===== */
.footer {
  border-top: 1px solid var(--color-border);
  padding: 28px 0;
  transition: border-color var(--transition);
}
.footer-inner {
  display: flex;
  justify-content: center;
}
.footer-inner p {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

/* ===== Lightbox ===== */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
}
.lightbox-img-wrap {
  max-width: min(90vw, 1200px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
.lightbox-img {
  max-width: 100%;
  max-height: 80vh;
  border-radius: 8px;
  object-fit: contain;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.6);
}
.lightbox-caption {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
}
.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease;
  cursor: pointer;
  border: none;
}
.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.2);
}
.lightbox-nav {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  flex-shrink: 0;
  transition: background 0.15s ease;
}
.lightbox-nav:hover {
  background: rgba(255, 255, 255, 0.22);
}

/* ===== Algorithm steps ===== */
.algorithm-steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.algorithm-step {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}
.step-number {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: var(--color-accent);
  color: #fff;
  font-size: 1.125rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  margin-top: 2px;
}
.step-content {
  flex: 1;
}
.step-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 6px;
}
.step-desc {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

/* ===== Responsive ===== */
@media (max-width: 900px) {
  .modules-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 640px) {
  .screenshots-grid {
    grid-template-columns: 1fr;
  }
  .modules-grid {
    grid-template-columns: 1fr;
  }
  .highlights-grid {
    grid-template-columns: 1fr;
  }
  .lightbox-nav {
    display: none;
  }
}
</style>
