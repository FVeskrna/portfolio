<template>
  <section class="section" id="about">
    <div class="container about">
      <h2 class="section-title title">
        Engineer by training, developer by trade.
      </h2>

      <div class="prose">
        <p>
          I'm a .NET developer with a Master's in Applied Computer Science and Control from Brno
          University of Technology, where I graduated with a Red Diploma. I specialise in C# and
          .NET, with a focus on delivering scalable, efficient software.
        </p>
        <p>
          At FNZ I worked across the full life of a release: software development, quality
          assurance, production support, and release management for major global financial
          clients. I also interviewed candidates and mentored new joiners.
        </p>
        <p>
          Today at Kentico I develop and maintain the company's enterprise CRM platform, built on
          Microsoft Dynamics&nbsp;365 and tailored to the business through custom development and a wide
          range of third-party integrations.
        </p>
        <p>
          Outside of work I build my own products end to end. The biggest is
          <RouterLink to="/projects/awy" class="text-link">AWY</RouterLink>, a personal workspace app I
          designed and built from scratch.
        </p>
      </div>

      <dl class="facts">
        <div v-for="f in facts" :key="f.term" class="fact">
          <dt>{{ f.term }}</dt>
          <dd>{{ f.value }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const facts = [
  { term: 'Currently', value: 'Internal Services Developer, Kentico' },
  { term: 'Focus', value: 'C#, .NET, Dynamics\u00a0365, TypeScript' },
  { term: 'Domain', value: 'CRM, fintech, ERP' },
  { term: 'Education', value: 'M.Sc., Brno University of Technology' },
  { term: 'Location', value: 'Brno, Czech Republic' },
]
</script>

<style scoped>
.about {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 0 24px;
}

.title {
  grid-column: 1 / span 8;
  margin-bottom: 48px;
}

.prose {
  grid-column: 1 / span 7;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 1.0625rem;
  line-height: 1.7;
  color: var(--text-2);
  max-width: 62ch;
}

.facts {
  grid-column: 9 / span 4;
  align-self: start;
  border-top: 1px solid var(--line);
}

.fact {
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
  font-size: 0.875rem;
}

.fact dt {
  color: var(--text-3);
}

.fact dd {
  color: var(--text);
}

@media (max-width: 960px) {
  .title,
  .prose,
  .facts {
    grid-column: 1 / -1;
  }
  .facts {
    margin-top: 48px;
  }
}
</style>
