<template>
  <header class="nav" :class="{ scrolled }">
    <nav class="container nav-inner" aria-label="Primary">
      <RouterLink to="/" class="wordmark" @click="onLogo">
        <span class="mark" aria-hidden="true">FV</span>
        <span class="wordmark-name">Filip Veškrna</span>
      </RouterLink>

      <ul class="links">
        <li v-for="link in navLinks" :key="link.id">
          <a :href="`#${link.id}`" class="link" @click.prevent="goToSection(link.id)">{{ link.label }}</a>
        </li>
      </ul>

      <div class="controls">
        <button class="cmd-trigger" type="button" aria-label="Open command menu" @click="menuOpen = true">
          <IconSearch :size="14" class="only-wide" />
          <IconMenu :size="16" class="only-narrow" />
          <span class="cmd-label only-wide">Search</span>
          <span class="cmd-label only-narrow">Menu</span>
          <span class="kbd only-wide">{{ modKey }}</span><span class="kbd only-wide">K</span>
        </button>
        <button
          class="icon-btn"
          type="button"
          :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggleTheme"
        >
          <IconSun v-if="theme === 'dark'" :size="16" />
          <IconMoon v-else :size="16" />
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { IconSun, IconMoon, IconSearch, IconMenu } from '../icons'
import { useUi } from '../composables/useUi'

const { theme, toggleTheme, menuOpen, goToSection } = useUi()
const route = useRoute()

const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
]

const modKey = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘' : 'Ctrl'

const scrolled = ref(false)
function onScroll() {
  scrolled.value = window.scrollY > 8
}

function onLogo(e: MouseEvent) {
  if (route.path === '/') {
    e.preventDefault()
    window.scrollTo({ top: 0 })
  }
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  height: var(--nav-height);
  background: transparent;
  border-bottom: 1px solid transparent;
  transition: background-color 200ms ease, border-color 200ms ease, backdrop-filter 200ms ease;
}

.nav.scrolled {
  background: color-mix(in srgb, var(--bg) 78%, transparent);
  border-bottom-color: var(--line);
  backdrop-filter: saturate(160%) blur(14px);
  -webkit-backdrop-filter: saturate(160%) blur(14px);
}

.nav-inner {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
}

.wordmark {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  justify-self: start;
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.mark {
  display: inline-grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 7px;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  background: var(--inverse-bg);
  color: var(--inverse-text);
}

.links {
  display: flex;
  gap: 2px;
}

.link {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 12px;
  border-radius: var(--radius-control);
  font-size: 0.875rem;
  color: var(--text-2);
  transition: color var(--fast) ease, background-color var(--fast) ease;
}

.link:hover {
  color: var(--text);
  background: var(--glow);
}

.controls {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-self: end;
}

.controls .icon-btn {
  width: 34px;
  height: 34px;
}

.cmd-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 34px;
  padding: 0 6px 0 10px;
  border-radius: var(--radius-control);
  font-size: 0.8125rem;
  color: var(--text-3);
  box-shadow: 0 0 0 1px var(--line) inset;
  transition: color var(--fast) ease, box-shadow var(--fast) ease, background-color var(--fast) ease;
}

.cmd-trigger:hover {
  color: var(--text-2);
  background: var(--glow);
  box-shadow: 0 0 0 1px var(--line-strong) inset;
}

.cmd-trigger .kbd + .kbd {
  margin-left: -4px;
}

.cmd-label {
  margin-right: 14px;
}

.only-narrow {
  display: none;
}

@media (max-width: 860px) {
  .links {
    display: none;
  }
  .nav-inner {
    grid-template-columns: 1fr auto;
  }
  .only-wide {
    display: none;
  }
  .only-narrow {
    display: inline;
  }
  .cmd-trigger {
    padding: 0 12px 0 10px;
    color: var(--text);
  }
  .cmd-label {
    margin-right: 0;
  }
}
</style>
