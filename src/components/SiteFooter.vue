<template>
  <footer class="footer">
    <div class="container footer-inner">
      <p class="footer-left">
        <span class="mark" aria-hidden="true">FV</span>
        © {{ year }} {{ profile.name }}
      </p>
      <p class="footer-right">
        <span class="hint">Press <span class="kbd">{{ modKey }}</span><span class="kbd">K</span> to jump anywhere</span>
        <a :href="profile.github" target="_blank" rel="noopener noreferrer" class="footer-link">GitHub</a>
        <a :href="profile.linkedin" target="_blank" rel="noopener noreferrer" class="footer-link">LinkedIn</a>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { profile } from '../data/profile'

const year = new Date().getFullYear()
const modKey = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘' : 'Ctrl'
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--line);
  padding: 28px 0 36px;
  font-size: 0.8125rem;
  color: var(--text-3);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.footer-left {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.mark {
  display: inline-grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  font-size: 0.625rem;
  font-weight: 700;
  color: var(--text-2);
  box-shadow: 0 0 0 1px var(--line-strong) inset;
}

.footer-right {
  display: inline-flex;
  align-items: center;
  gap: 20px;
}

.hint .kbd {
  margin: 0 1px;
}

.footer-link {
  transition: color var(--fast) ease;
}

.footer-link:hover {
  color: var(--text);
}

@media (max-width: 640px) {
  .hint {
    display: none;
  }
}
</style>
