<template>
  <section class="section contact-section" id="contact">
    <div class="container">
      <div class="contact panel">
        <div class="contact-inner">
          <h2 class="contact-title">
            Open to new roles
          </h2>
          <p class="contact-body">
            Whether you have a role in mind or just want to connect, email is the fastest way to reach
            me.
          </p>

          <div class="email-row">
            <a :href="`mailto:${profile.email}`" class="email">{{ profile.email }}</a>
            <button type="button" class="btn btn-ghost btn-sm copy" @click="copyEmail">
              <IconCheck v-if="emailCopied" :size="14" class="copied-icon" />
              <IconCopy v-else :size="14" />
              <span aria-live="polite">{{ emailCopied ? 'Copied' : 'Copy' }}</span>
            </button>
          </div>

          <div class="contact-actions">
            <a :href="`mailto:${profile.email}`" class="btn btn-primary">
              <IconMail :size="16" />
              Email me
            </a>
            <a :href="profile.linkedin" class="btn btn-ghost" target="_blank" rel="noopener noreferrer">
              <IconLinkedIn :size="15" />
              LinkedIn
            </a>
            <a :href="profile.github" class="btn btn-ghost" target="_blank" rel="noopener noreferrer">
              <IconGitHub :size="16" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { IconMail, IconGitHub, IconLinkedIn, IconCopy, IconCheck } from '../icons'
import { profile } from '../data/profile'
import { useUi } from '../composables/useUi'

const { copyEmail, emailCopied } = useUi()
</script>

<style scoped>
.contact-section {
  padding-bottom: clamp(64px, 9vw, 112px);
}

.contact {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.contact-inner {
  padding: clamp(32px, 6vw, 72px);
}

.contact-title {
  font-size: clamp(2rem, 4.6vw, 3.5rem);
  line-height: 1.05;
  letter-spacing: -0.04em;
  margin-bottom: 20px;
}

.contact-body {
  max-width: 48ch;
  font-size: 1.0625rem;
  line-height: 1.6;
  color: var(--text-2);
  margin-bottom: 36px;
}

.email-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  padding-bottom: 32px;
  margin-bottom: 32px;
  border-bottom: 1px solid var(--line);
}

.email {
  font-size: clamp(1.25rem, 2.6vw, 1.75rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  text-decoration: underline;
  text-decoration-color: var(--line-strong);
  text-decoration-thickness: 1px;
  text-underline-offset: 6px;
  transition: text-decoration-color var(--fast) ease;
  overflow-wrap: anywhere;
}

.email:hover {
  text-decoration-color: currentColor;
}

.copied-icon {
  color: var(--signal);
}

.contact-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
