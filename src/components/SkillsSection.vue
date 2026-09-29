<template>
  <section class="section" id="skills">
    <div class="container">
      <div class="section-head">
        <h2 class="section-title">
          The stack
        </h2>
      </div>

      <div class="stack">
        <div v-for="group in skillGroups" :key="group.category" class="stack-row">
          <h3 class="stack-label">{{ group.category }}</h3>
          <ul class="stack-items">
            <li v-for="skill in group.skills" :key="skill" class="chip">{{ skill }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { skillGroups } from '../data/profile'
</script>

<style scoped>
.stack {
  border-top: 1px solid var(--line);
}

.stack-row {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 12px 24px;
  align-items: center;
  padding: 22px 0;
  border-bottom: 1px solid var(--line);
}

.stack-label {
  grid-column: 1 / span 3;
  font-size: 0.9375rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--text);
}

.stack-items {
  grid-column: 4 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

@media (max-width: 760px) {
  .stack-label,
  .stack-items {
    grid-column: 1 / -1;
  }
}
</style>
