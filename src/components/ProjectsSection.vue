<template>
  <section class="section projects-section" id="projects">
    <div class="container">
      <p class="section-label">What I've built</p>
      <h2 class="section-title">Projects</h2>
      <p class="section-body">
        Personal projects I've designed and built end-to-end.
      </p>

      <div class="projects-grid">
        <article
          v-for="project in projects"
          :key="project.slug"
          class="project-card card"
        >
          <div class="project-thumbnail" aria-hidden="true">
            <img
              v-if="project.screenshots?.length"
              :src="`${base}projects/${project.slug}/${project.screenshots[0].filename}`"
              :alt="project.title"
              class="project-thumbnail-img"
            />
            <span v-else class="project-initials">{{ getInitials(project.title) }}</span>
          </div>

          <div class="project-body">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-tagline">{{ project.tagline }}</p>

            <div class="project-tags">
              <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>

            <div class="project-links">
              <RouterLink :to="`/projects/${project.slug}`" class="btn btn-primary btn-sm">
                View case study
              </RouterLink>
              <a
                v-if="project.liveUrl"
                :href="project.liveUrl"
                class="btn btn-outline btn-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live site
              </a>
              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                class="icon-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub repository"
              >
                <IconGitHub :size="18" />
              </a>
            </div>
          </div>
        </article>

        <!-- Coming soon placeholder -->
        <article class="project-card project-placeholder card">
          <div class="placeholder-content">
            <div class="placeholder-icon" aria-hidden="true">+</div>
            <p class="placeholder-text">More projects coming soon</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { projects } from '../data/projects'
import { IconGitHub } from '../icons'

const base = import.meta.env.BASE_URL

function getInitials(title: string): string {
  return title
    .split(/[\s—–-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}
</script>

<style scoped>
.projects-section {
  background-color: var(--color-surface);
  transition: background-color var(--transition);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
  margin-top: 48px;
}

.project-card {
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg);
  overflow: hidden;
  padding: 0;
}

.project-thumbnail {
  height: 300px;
  background: linear-gradient(135deg, var(--color-accent) 0%, #7c3aed 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-thumbnail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.project-initials {
  font-size: 2.5rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: -0.02em;
  user-select: none;
}

.project-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.project-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.3;
}

.project-tagline {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.55;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.project-links {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: auto;
  padding-top: 8px;
}

/* Smaller button variant */
.btn-sm {
  padding: 8px 16px;
  font-size: 0.875rem;
}

/* Placeholder card */
.project-placeholder {
  background-color: var(--color-bg);
  border-style: dashed;
  min-height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-content {
  text-align: center;
  color: var(--color-text-secondary);
}

.placeholder-icon {
  font-size: 2rem;
  margin-bottom: 8px;
  opacity: 0.4;
}

.placeholder-text {
  font-size: 0.9rem;
  opacity: 0.7;
}

@media (max-width: 480px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
