<template>
  <div class="home">
    <NavBar />
    <main>
      <HeroSection />
      <hr class="divider" />
      <AboutSection />
      <hr class="divider" />
      <SkillsSection />
      <hr class="divider" />
      <ExperienceSection />
      <hr class="divider" />
      <ProjectsSection />
      <hr class="divider" />
      <ContactSection />
    </main>
    <footer class="footer">
      <div class="container footer-inner">
        <p>© {{ year }} Filip Veškrna. Built with Vue 3 + TypeScript.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import SkillsSection from '../components/SkillsSection.vue'
import ExperienceSection from '../components/ExperienceSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import ContactSection from '../components/ContactSection.vue'

const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--color-border);
  padding: 28px 0;
  transition: border-color var(--transition);
}

.footer-inner {
  display: flex;
  justify-content: center;
}

.footer-inner p {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}
</style>
