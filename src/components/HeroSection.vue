<template>
  <section class="hero" id="top">
    <div class="backdrop" aria-hidden="true">
      <div class="light" />
    </div>

    <div class="container hero-inner">
      <h1 class="headline rise" style="--i: 0">
        {{ profile.name }}
        <span class="headline-sub">Full-stack .NET developer.</span>
      </h1>

      <div class="intro">

        <p class="summary rise" style="--i: 1">
          I build scalable software with a focus on clean architecture, from .NET APIs for global
          financial clients at <strong>FNZ</strong> to an enterprise CRM platform built on Dynamics&nbsp;365 at <strong>Kentico</strong>. Based in Brno.
        </p>

        <div class="actions rise" style="--i: 2">
          <a :href="`mailto:${profile.email}`" class="btn btn-primary">
            <IconMail :size="16" />
            Email me
          </a>
          <button type="button" class="btn btn-ghost" @click="goToSection('projects')">
            View work
          </button>
          <span class="socials">
            <span class="divider" aria-hidden="true" />
            <a :href="profile.github" class="icon-btn" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <IconGitHub :size="17" />
            </a>
            <a :href="profile.linkedin" class="icon-btn" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <IconLinkedIn :size="16" />
            </a>
          </span>
        </div>
      </div>

      <aside class="record panel rise" style="--i: 3" aria-label="Career summary">
        <div class="record-head">
          <span class="record-title">Record</span>
          <span class="record-meta mono">2018–now</span>
        </div>
        <ol class="record-list">
          <li v-for="row in record" :key="row.org + row.role" class="record-row">
            <span class="record-mark" aria-hidden="true">
              <span v-if="row.current" class="live-dot" />
              <span v-else class="tick" />
            </span>
            <span class="record-body">
              <span class="record-org">
                {{ row.org }}
                <span v-if="row.current" class="now">Now</span>
              </span>
              <span class="record-role">{{ row.role }}</span>
            </span>
            <span class="record-years mono">{{ row.years }}</span>
          </li>
        </ol>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { IconGitHub, IconLinkedIn, IconMail } from '../icons'
import { profile } from '../data/profile'
import { useUi } from '../composables/useUi'

const { goToSection } = useUi()

const record = [
  { org: 'Kentico', role: 'Internal Services Developer', years: '2026–now', current: true },
  { org: 'Techfides', role: 'Full-Stack Developer', years: '2026' },
  { org: 'FNZ', role: 'Analyst Developer', years: '2023–2025' },
  { org: 'Brno University of Technology', role: "M.Sc., Applied CS & Control · Red Diploma", years: '2018–2023' },
]
</script>

<style scoped>
.hero {
  position: relative;
  margin-top: calc(var(--nav-height) * -1);
  padding-top: calc(var(--nav-height) + clamp(56px, 11vh, 120px));
  padding-bottom: clamp(56px, 9vh, 96px);
  border-bottom: 1px solid var(--line);
  overflow: hidden;
  isolation: isolate;
}

.backdrop {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

.light {
  position: absolute;
  left: 50%;
  top: -340px;
  width: 1100px;
  height: 640px;
  transform: translateX(-50%);
  background: radial-gradient(closest-side, var(--glow), transparent);
  filter: blur(20px);
}

.hero-inner {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 40px 24px;
  align-items: start;
}

.headline {
  grid-column: 1 / -1;
  font-size: clamp(2.75rem, 6.6vw, 5.25rem);
  line-height: 0.98;
  letter-spacing: -0.04em;
  font-weight: 600;
  margin-bottom: -8px;
}

.intro {
  grid-column: 1 / span 7;
  align-self: start;
  padding-top: 8px;
}

.headline-sub {
  display: block;
  color: var(--text-3);
  padding-top: 0.06em;
}

.summary {
  max-width: 52ch;
  font-size: clamp(1.0625rem, 1.4vw, 1.1875rem);
  line-height: 1.6;
  color: var(--text-2);
  letter-spacing: -0.01em;
  margin-bottom: 36px;
}

.summary strong {
  color: var(--text);
  font-weight: 500;
}

.actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.socials {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.divider {
  width: 1px;
  height: 22px;
  margin: 0 6px;
  background: var(--line-strong);
}

/* Record panel */
.record {
  grid-column: 8 / span 5;
  align-self: start;
  padding: 6px;
}

.record-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px 12px;
  border-bottom: 1px solid var(--line);
}

.record-title {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-2);
}

.record-meta {
  font-size: 0.75rem;
  color: var(--text-3);
}

.record-list {
  padding: 6px 0 2px;
}

.record-row {
  display: grid;
  grid-template-columns: 20px 1fr auto;
  align-items: start;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 8px;
}

.record-row + .record-row {
  box-shadow: 0 -1px 0 0 var(--line);
}

.record-mark {
  display: grid;
  place-items: center;
  height: 20px;
}

.tick {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  box-shadow: 0 0 0 1.5px var(--text-3) inset;
}

.record-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.record-org {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9375rem;
  font-weight: 500;
  letter-spacing: -0.015em;
}

.now {
  font-size: 0.6875rem;
  font-weight: 500;
  color: var(--signal);
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--signal-soft);
}

.record-role {
  font-size: 0.8125rem;
  color: var(--text-3);
  line-height: 1.45;
}

.record-years {
  font-size: 0.75rem;
  color: var(--text-3);
  padding-top: 3px;
  white-space: nowrap;
}

/* Entrance: one authored moment on load */
@media (prefers-reduced-motion: no-preference) {
  .rise {
    animation: rise 900ms var(--ease-out) both;
    animation-delay: calc(var(--i) * 90ms + 60ms);
  }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(14px);
    filter: blur(8px);
  }
  to {
    opacity: 1;
    transform: none;
    filter: blur(0);
  }
}

@media (max-width: 960px) {
  .intro,
  .record {
    grid-column: 1 / -1;
  }
  .record {
    max-width: 560px;
  }
}

@media (max-width: 480px) {
  .divider {
    display: none;
  }
}
</style>
