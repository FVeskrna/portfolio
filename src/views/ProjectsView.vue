<template>
  <div class="projects-page">
    <NavBar />

    <main>
      <header class="head">
        <div class="container">
          <button type="button" class="back" @click="goToSection('projects')">
            <IconArrowLeft :size="14" />
            Home
          </button>
          <h1 class="title">Projects</h1>
          <p class="lede">
            Everything I've built, from web applications to Unity simulations and automation tools.
            Open any project for the full case study.
          </p>

          <div class="filters" role="group" aria-label="Filter projects by type">
            <button
              v-for="f in filters"
              :key="f.id"
              type="button"
              class="filter"
              :class="{ active: active === f.id }"
              :aria-pressed="active === f.id"
              @click="active = f.id"
            >
              {{ f.label }}
              <span class="filter-count mono">{{ f.count }}</span>
            </button>
          </div>
        </div>
      </header>

      <div class="container">
        <ul class="list">
          <li v-for="p in visible" :key="p.slug">
            <RouterLink :to="`/projects/${p.slug}`" class="row">
              <span class="thumb" aria-hidden="true">
                <img
                  v-if="p.screenshots?.length"
                  :src="`${base}projects/${p.slug}/${p.screenshots[p.coverIndex ?? 0].filename}`"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <IconFolder v-else :size="18" />
              </span>
              <span class="body">
                <span class="name">{{ p.title }}</span>
                <span class="tagline">{{ p.tagline }}</span>
              </span>
              <span class="meta">
                <span class="category">{{ categorySingular[p.category] }}</span>
                <span class="tags">{{ p.tags.slice(0, 3).join(' · ') }}</span>
              </span>
              <span class="open">
                Case study
                <IconArrowRight :size="14" />
              </span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { projects as allProjects, categoryLabels, categorySingular, type ProjectCategory } from '../data/projects'
import { useUi } from '../composables/useUi'
import { IconArrowLeft, IconArrowRight, IconFolder } from '../icons'

const { goToSection } = useUi()
const base = import.meta.env.BASE_URL

// Featured first, then projects with screenshots, then the rest (stable within each group).
const rank = (p: (typeof allProjects)[number]) => (p.featured ? 0 : p.screenshots?.length ? 1 : 2)
const projects = [...allProjects].sort((a, b) => rank(a) - rank(b))

type Filter = 'all' | ProjectCategory
const active = ref<Filter>('all')

const filters = computed(() => [
  { id: 'all' as Filter, label: 'All', count: projects.length },
  ...(Object.keys(categoryLabels) as ProjectCategory[])
    .map((id) => ({
      id: id as Filter,
      label: categoryLabels[id],
      count: projects.filter((p) => p.category === id).length,
    }))
    .filter((f) => f.count > 0),
])

const visible = computed(() =>
  active.value === 'all' ? projects : projects.filter((p) => p.category === active.value),
)
</script>

<style scoped>
.head {
  padding: 56px 0 40px;
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

.title {
  font-size: clamp(2.5rem, 6vw, 4.25rem);
  line-height: 1.02;
  letter-spacing: -0.04em;
  margin-bottom: 16px;
}

.lede {
  max-width: 56ch;
  font-size: clamp(1.0625rem, 1.6vw, 1.1875rem);
  line-height: 1.6;
  color: var(--text-2);
  margin-bottom: 36px;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 34px;
  padding: 0 12px;
  border-radius: var(--radius-control);
  font-size: 0.875rem;
  color: var(--text-2);
  box-shadow: 0 0 0 1px var(--line) inset;
  transition: color var(--fast) ease, background-color var(--fast) ease, box-shadow var(--fast) ease;
}

.filter:hover {
  color: var(--text);
  background: var(--glow);
}

.filter.active {
  color: var(--inverse-text);
  background: var(--inverse-bg);
  box-shadow: 0 0 0 1px var(--inverse-bg) inset;
}

.filter-count {
  font-size: 0.75rem;
  opacity: 0.7;
}

.list {
  border-top: 1px solid var(--line);
  margin-bottom: clamp(72px, 10vw, 120px);
}

.row {
  display: grid;
  grid-template-columns: 120px minmax(0, 5fr) minmax(0, 3fr) auto;
  align-items: center;
  gap: 24px;
  padding: 18px 8px;
  border-bottom: 1px solid var(--line);
  transition: background-color var(--fast) ease;
}

.row:hover {
  background: var(--glow);
}

.thumb {
  display: grid;
  place-items: center;
  width: 120px;
  height: 72px;
  border-radius: 8px;
  overflow: hidden;
  color: var(--text-3);
  background: var(--bg-raised);
  box-shadow: 0 0 0 1px var(--line) inset;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  transition: transform 400ms var(--ease-out);
}

.row:hover .thumb img {
  transform: scale(1.04);
}

.body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.name {
  font-size: 1.0625rem;
  font-weight: 500;
  letter-spacing: -0.02em;
}

.tagline {
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--text-2);
}

.meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.8125rem;
}

.category {
  color: var(--text);
}

.tags {
  color: var(--text-3);
}

.open {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 12px;
  border-radius: var(--radius-control);
  font-size: 0.8125rem;
  font-weight: 500;
  white-space: nowrap;
  color: var(--text);
  box-shadow: 0 0 0 1px var(--line-strong) inset;
  transition: background-color var(--fast) ease, box-shadow var(--fast) ease;
}

.open :deep(svg) {
  transition: transform 200ms var(--ease-out);
}

.row:hover .open {
  background: var(--glow);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--text) 30%, transparent) inset;
}

.row:hover .open :deep(svg) {
  transform: translateX(3px);
}

@media (max-width: 860px) {
  .row {
    grid-template-columns: 96px minmax(0, 1fr);
    gap: 12px 16px;
    align-items: start;
  }
  .thumb {
    width: 96px;
    height: 60px;
    grid-row: 1 / span 3;
  }
  .meta {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 4px 10px;
  }
  .open {
    justify-self: start;
  }
}
</style>
