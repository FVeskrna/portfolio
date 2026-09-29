<template>
  <section class="section" id="certificates">
    <div class="container">
      <div class="section-head">
        <h2 class="section-title">Certificates</h2>
      </div>

      <ul class="certs">
        <li v-for="cert in certificates" :key="cert.id">
          <a :href="`${base}${cert.file}`" class="cert" target="_blank" rel="noopener noreferrer">
            <span class="cert-icon" aria-hidden="true"><IconFile :size="18" /></span>
            <span class="cert-body">
              <span class="cert-name">{{ cert.name }}</span>
              <span class="cert-issuer">{{ cert.issuer }}</span>
            </span>
            <span class="cert-date mono">{{ cert.date }}</span>
            <span class="cert-open">
              View PDF
              <IconArrowUpRight :size="14" />
            </span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { certificates } from '../data/profile'
import { IconFile, IconArrowUpRight } from '../icons'

const base = import.meta.env.BASE_URL
</script>

<style scoped>
.certs {
  border-top: 1px solid var(--line);
}

.cert {
  display: grid;
  grid-template-columns: 40px 1fr auto auto;
  align-items: center;
  gap: 20px;
  padding: 18px 8px;
  border-bottom: 1px solid var(--line);
  transition: background-color var(--fast) ease;
}

.cert:hover {
  background: var(--glow);
}

.cert-icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-control);
  color: var(--text-2);
  box-shadow: 0 0 0 1px var(--line) inset;
}

.cert-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.cert-name {
  font-weight: 500;
  letter-spacing: -0.015em;
}

.cert-issuer {
  font-size: 0.875rem;
  color: var(--text-2);
}

.cert-date {
  font-size: 0.8125rem;
  color: var(--text-3);
}

.cert-open {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-2);
  transition: color var(--fast) ease;
}

.cert:hover .cert-open {
  color: var(--text);
}

@media (max-width: 640px) {
  .cert {
    grid-template-columns: 40px 1fr;
    gap: 8px 16px;
  }
  .cert-date,
  .cert-open {
    grid-column: 2;
  }
}
</style>
