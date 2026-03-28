<template>
  <section class="section" id="experience">
    <div class="container">
      <p class="section-label">Career</p>
      <h2 class="section-title">Work experience</h2>

      <div class="timeline">
        <div
          v-for="(item, index) in experience"
          :key="index"
          class="timeline-item"
        >
          <div class="timeline-dot" />
          <div class="timeline-content card">
            <div class="timeline-header">
              <div>
                <h3 class="timeline-role">{{ item.role }}</h3>
                <p class="timeline-company">{{ item.company }}</p>
              </div>
              <span class="timeline-period">{{ item.period }}</span>
            </div>
            <p class="timeline-desc">{{ item.description }}</p>
          </div>
        </div>
      </div>

      <!-- Education -->
      <div class="education-block">
        <h3 class="edu-heading">Education</h3>
        <div class="edu-list">
          <div v-for="(edu, index) in education" :key="index" class="edu-item card">
            <div class="edu-header">
              <div>
                <p class="edu-degree">{{ edu.degree }}</p>
                <p class="edu-school">{{ edu.school }}</p>
              </div>
              <span class="edu-period">{{ edu.period }}</span>
            </div>
            <p v-if="edu.note" class="edu-note">{{ edu.note }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const experience = [
  {
    company: 'Techfides',
    role: 'Full-Stack Developer',
    period: 'January 2026 – Present',
    description:
      'ERP development using TypeScript and Vue.js. E2E testing with Cypress. GitLab CI/CD pipelines.',
  },
  {
    company: 'FNZ',
    role: 'Analyst Developer',
    period: 'January 2025 – December 2025',
    description:
      '.NET REST API development and maintenance. Code reviews. Release management for major global financial clients. Participation in hiring as primary interviewer. Mentoring via Buddy Program.',
  },
  {
    company: 'FNZ',
    role: 'Associate Analyst Developer',
    period: 'July 2024 – December 2024',
    description:
      'Feature development and maintenance on .NET platform. Production incident resolution. Collaboration with analysts on requirements.',
  },
  {
    company: 'FNZ',
    role: 'Technology Solutions Graduate',
    period: 'August 2023 – July 2024',
    description:
      'Rotational graduate program: Analysis & Test, Development, Production Support.',
  },
]

const education = [
  {
    school: 'Brno University of Technology',
    degree: "Master's Degree — Mechanical Engineering, Applied Computer Science and Control",
    period: '2021 – 2023',
    note: 'Graduated with Red Diploma',
  },
  {
    school: 'Brno University of Technology',
    degree: "Bachelor's Degree — Mechanical Engineering, Applied Computer Science and Control",
    period: '2018 – 2021',
    note: '',
  },
]
</script>

<style scoped>
/* Timeline */
.timeline {
  position: relative;
  margin-top: 48px;
  padding-left: 28px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background-color: var(--color-border);
  transition: background-color var(--transition);
}

.timeline-item {
  position: relative;
  margin-bottom: 24px;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -28px;
  top: 24px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: var(--color-accent);
  border: 2px solid var(--color-bg);
  box-shadow: 0 0 0 2px var(--color-accent);
  transition: background-color var(--transition), border-color var(--transition);
}

.timeline-content {
  /* inherits .card */
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.timeline-role {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 2px;
}

.timeline-company {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-accent);
}

.timeline-period {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  white-space: nowrap;
  padding-top: 2px;
}

.timeline-desc {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
}

/* Education */
.education-block {
  margin-top: 56px;
}

.edu-heading {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 20px;
}

.edu-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.edu-item {
  /* inherits .card */
}

.edu-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
}

.edu-degree {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 2px;
}

.edu-school {
  font-size: 0.875rem;
  color: var(--color-accent);
  font-weight: 500;
}

.edu-period {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  white-space: nowrap;
  padding-top: 2px;
}

.edu-note {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-top: 8px;
  font-style: italic;
}

@media (max-width: 640px) {
  .timeline-header {
    flex-direction: column;
  }

  .edu-header {
    flex-direction: column;
  }
}
</style>
