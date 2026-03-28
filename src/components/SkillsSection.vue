<template>
  <section class="section skills-section" id="skills">
    <div class="container">
      <p class="section-label">What I work with</p>
      <h2 class="section-title">Skills &amp; tech stack</h2>

      <div class="skills-grid">
        <div v-for="group in skillGroups" :key="group.category" class="skill-group card">
          <h3 class="group-title">{{ group.category }}</h3>
          <div class="tags-wrap">
            <span v-for="skill in group.skills" :key="skill" class="tag skill-tag">
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const skillGroups = [
  {
    category: 'Languages & frameworks',
    skills: ['C#', '.NET Core', 'TypeScript', 'JavaScript', 'Python', 'ASP.NET', 'React', 'Vue.js'],
  },
  {
    category: 'Tools & platforms',
    skills: ['Azure', 'Supabase', 'Docker', 'Git', 'GitLab', 'CI/CD', 'Azure DevOps', 'TeamCity'],
  },
  {
    category: 'Testing',
    skills: ['Unit Testing', 'Integration Testing', 'E2E (Cypress)', 'NUnit', 'xUnit'],
  },
  {
    category: 'Other',
    skills: ['SOLID principles', 'Clean Architecture', 'Agile/Scrum', 'REST APIs', 'SQL', 'PostgreSQL'],
  },
]
</script>

<style scoped>
.skills-section {
  background-color: var(--color-surface);
  transition: background-color var(--transition);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 48px;
}

.skill-group {
  background-color: var(--color-bg);
}

.group-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 16px;
}

.tags-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  font-size: 0.875rem;
}

@media (max-width: 640px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
