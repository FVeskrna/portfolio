<template>
  <section class="section" id="experience">
    <div class="container">
      <div class="section-head">
        <h2 class="section-title">
          Experience
        </h2>
      </div>

      <ol class="log">
        <li v-for="item in experience" :key="item.role" class="entry">
          <p class="when mono">
            <span>{{ item.start }}</span>
            <span class="when-sep">–</span>
            <span :class="{ present: item.current }">{{ item.end }}</span>
          </p>
          <div class="rail" aria-hidden="true">
            <span v-if="item.current" class="live-dot" />
            <span v-else class="node" />
          </div>
          <div class="what">
            <h3 class="role">
              {{ item.role }} <span class="at">at</span>{{ ' ' }}<span class="org">{{ item.company }}</span>
            </h3>
            <p class="desc">{{ item.description }}</p>
          </div>
        </li>
      </ol>

      <h3 id="education" class="sub-title">Education</h3>
      <ol class="log">
        <li v-for="edu in education" :key="edu.degree" class="entry">
          <p class="when mono">
            <span>{{ edu.start }}</span>
            <span class="when-sep">–</span>
            <span>{{ edu.end }}</span>
          </p>
          <div class="rail" aria-hidden="true"><span class="node" /></div>
          <div class="what">
            <h3 class="role">
              {{ edu.degree }} <span class="at">at</span>{{ ' ' }}<span class="org">{{ edu.school }}</span>
            </h3>
            <p class="desc">
              {{ edu.field }}<template v-if="edu.note">. <span class="note">{{ edu.note }}</span></template>
            </p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import { experience, education } from '../data/profile'
</script>

<style scoped>
.log {
  border-top: 1px solid var(--line);
}

.entry {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 0 24px;
  position: relative;
}

.when {
  grid-column: 1 / span 2;
  padding: 28px 0;
  font-size: 0.8125rem;
  color: var(--text-3);
  display: flex;
  gap: 4px;
  white-space: nowrap;
}

.when-sep {
  color: var(--text-3);
}

.present {
  color: var(--signal);
}

.rail {
  grid-column: 3 / span 1;
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 34px;
}

.rail::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  background: var(--line);
}

.entry:first-child .rail::before {
  top: 34px;
}

.entry:last-child .rail::before {
  bottom: auto;
  height: 38px;
}

.node,
.rail .live-dot {
  position: relative;
  z-index: 1;
}

.node {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--bg);
  box-shadow: 0 0 0 1.5px var(--text-3) inset;
}

.what {
  grid-column: 4 / -1;
  padding: 24px 0 28px;
  border-bottom: 1px solid var(--line);
}

.entry:last-child .what {
  border-bottom: none;
}

.role {
  font-size: 1.125rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.4;
  margin-bottom: 8px;
}

.at {
  margin: 0 0.1em;
  color: var(--text-3);
  font-weight: 400;
}

.desc {
  max-width: 68ch;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--text-2);
}

.note {
  color: var(--text);
}

.sub-title {
  margin: 72px 0 20px;
  font-size: 1.25rem;
  letter-spacing: -0.025em;
}

.log:last-child {
  border-bottom: 1px solid var(--line);
}

@media (max-width: 760px) {
  .entry {
    grid-template-columns: 20px 1fr;
    gap: 0 16px;
  }
  .rail {
    grid-column: 1;
    grid-row: 1 / span 2;
  }
  .when {
    grid-column: 2;
    padding: 24px 0 4px;
  }
  .what {
    grid-column: 2;
    padding-top: 0;
  }
}
</style>
