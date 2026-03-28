<template>
  <header class="nav-wrapper">
    <nav class="container nav-inner">
      <!-- Logo -->
      <RouterLink to="/" class="nav-logo" @click="closeMenu">
        Filip Veškrna
      </RouterLink>

      <!-- Desktop links -->
      <ul class="nav-links">
        <li v-for="link in navLinks" :key="link.label">
          <a
            v-if="isHome"
            :href="link.href"
            class="nav-link"
            @click.prevent="scrollToSection(link.id)"
          >{{ link.label }}</a>
          <RouterLink
            v-else
            :to="'/' + link.href"
            class="nav-link"
          >{{ link.label }}</RouterLink>
        </li>
      </ul>

      <!-- Right controls -->
      <div class="nav-controls">
        <button
          class="theme-toggle"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleTheme"
        >
          <IconSun v-if="isDark" />
          <IconMoon v-else />
        </button>

        <!-- Hamburger -->
        <button
          class="hamburger"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="menuOpen"
          @click="toggleMenu"
        >
          <span class="hamburger-line" :class="{ open: menuOpen }" />
          <span class="hamburger-line" :class="{ open: menuOpen }" />
          <span class="hamburger-line" :class="{ open: menuOpen }" />
        </button>
      </div>
    </nav>

    <!-- Mobile drawer -->
    <div class="mobile-menu" :class="{ open: menuOpen }" role="dialog" aria-label="Navigation menu">
      <ul class="mobile-links">
        <li v-for="link in navLinks" :key="link.label">
          <a
            v-if="isHome"
            :href="link.href"
            class="mobile-link"
            @click.prevent="mobileScrollTo(link.id)"
          >{{ link.label }}</a>
          <RouterLink
            v-else
            :to="'/' + link.href"
            class="mobile-link"
            @click="closeMenu"
          >{{ link.label }}</RouterLink>
        </li>
      </ul>
    </div>
    <!-- Backdrop -->
    <div v-if="menuOpen" class="backdrop" @click="closeMenu" />
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { IconSun, IconMoon } from '../icons'

const route = useRoute()
const isHome = computed(() => route.path === '/')

const navLinks = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

const isDark = ref(false)
const menuOpen = ref(false)

onMounted(() => {
  isDark.value = document.documentElement.getAttribute('data-theme') === 'dark'
})

function toggleTheme() {
  isDark.value = !isDark.value
  const theme = isDark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    const offset = 72
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

function mobileScrollTo(id: string) {
  closeMenu()
  setTimeout(() => scrollToSection(id), 300)
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeMenu()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))

</script>

<style scoped>
.nav-wrapper {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  transition: background-color var(--transition), border-color var(--transition);
}

.nav-inner {
  display: flex;
  align-items: center;
  height: var(--nav-height);
  gap: 32px;
}

.nav-logo {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--color-text-primary);
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  transition: color var(--transition);
}

.nav-logo:hover {
  color: var(--color-accent);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
}

.nav-link {
  padding: 6px 12px;
  border-radius: var(--radius);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--transition), background-color var(--transition);
}

.nav-link:hover {
  color: var(--color-text-primary);
  background-color: var(--color-surface);
}

.nav-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: var(--radius);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  transition: color var(--transition), border-color var(--transition),
    background-color var(--transition);
}

.theme-toggle:hover {
  color: var(--color-text-primary);
  background-color: var(--color-surface);
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 38px;
  height: 38px;
  border-radius: var(--radius);
  border: 1px solid var(--color-border);
  padding: 8px;
  color: var(--color-text-secondary);
  transition: background-color var(--transition), border-color var(--transition);
}

.hamburger:hover {
  background-color: var(--color-surface);
}

.hamburger-line {
  display: block;
  width: 18px;
  height: 2px;
  background-color: currentColor;
  border-radius: 2px;
  transition: transform 0.25s ease, opacity 0.25s ease;
  transform-origin: center;
}

.hamburger-line.open:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger-line.open:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger-line.open:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile menu */
.mobile-menu {
  display: none;
  position: fixed;
  top: var(--nav-height);
  left: 0;
  right: 0;
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  padding: 12px 0 20px;
  transform: translateY(-8px);
  opacity: 0;
  pointer-events: none;
  transition: transform 0.25s ease, opacity 0.25s ease;
  z-index: 99;
}

.mobile-menu.open {
  transform: translateY(0);
  opacity: 1;
  pointer-events: all;
}

.mobile-links {
  display: flex;
  flex-direction: column;
}

.mobile-link {
  display: block;
  padding: 14px 24px;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text-primary);
  text-decoration: none;
  transition: background-color var(--transition), color var(--transition);
}

.mobile-link:hover {
  background-color: var(--color-surface);
  color: var(--color-accent);
}

.backdrop {
  position: fixed;
  inset: 0;
  top: var(--nav-height);
  background: rgba(0, 0, 0, 0.3);
  z-index: 98;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .mobile-menu {
    display: block;
  }
}
</style>
