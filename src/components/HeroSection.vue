<template>
  <section class="hero section" id="hero">
    <div class="container hero-inner">
      <div class="hero-content">
        <p class="hero-eyebrow">Hello, I'm</p>
        <h1 class="hero-name">Filip Veškrna</h1>
        <p class="hero-title">Full-Stack .NET Developer</p>
        <p class="hero-subtitle">
          Building scalable software with a focus on clean architecture and quality.
          Based in Brno, Czech Republic.
        </p>

        <div class="hero-actions">
          <a href="#projects" class="btn btn-primary" @click.prevent="scrollTo('projects')">
            View Projects
          </a>
          <a href="#contact" class="btn btn-outline" @click.prevent="scrollTo('contact')">
            Get in Touch
          </a>
        </div>

        <div class="hero-social">
          <a
            href="https://github.com/FVeskrna"
            class="icon-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <IconGitHub />
          </a>
          <a
            href="https://linkedin.com/in/filip-veskrna"
            class="icon-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <IconLinkedIn />
          </a>
        </div>
      </div>

      <div class="hero-badge" aria-hidden="true">
        <span class="badge-initials">FV</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { IconGitHub, IconLinkedIn } from '../icons'

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    const offset = 72
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.hero {
  min-height: calc(100vh - var(--nav-height));
  display: flex;
  align-items: center;
}

.hero-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
  padding-top: 48px;
  padding-bottom: 48px;
}

.hero-content {
  max-width: 600px;
}

.hero-eyebrow {
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin-bottom: 8px;
}

.hero-name {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  color: var(--color-text-primary);
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}

.hero-title {
  font-size: clamp(1.125rem, 2.5vw, 1.375rem);
  font-weight: 600;
  color: var(--color-accent);
  margin-bottom: 20px;
}

.hero-subtitle {
  font-size: 1.0625rem;
  color: var(--color-text-secondary);
  line-height: 1.75;
  margin-bottom: 36px;
  max-width: 520px;
}

.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.hero-social {
  display: flex;
  gap: 10px;
}

/* Badge */
.hero-badge {
  flex-shrink: 0;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-accent) 0%, #7c3aed 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 60px rgba(37, 99, 235, 0.25);
}

.badge-initials {
  font-size: 4rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.02em;
  user-select: none;
}

@media (max-width: 768px) {
  .hero-inner {
    flex-direction: column-reverse;
    text-align: center;
    padding-top: 32px;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-social {
    justify-content: center;
  }

  .hero-subtitle {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-badge {
    width: 140px;
    height: 140px;
  }

  .badge-initials {
    font-size: 2.75rem;
  }
}
</style>
