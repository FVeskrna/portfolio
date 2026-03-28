<template>
  <section class="section" id="contact">
    <div class="container contact-inner">
      <div class="contact-text">
        <p class="section-label">Say hello</p>
        <h2 class="section-title">Get in touch</h2>
        <p class="section-body">
          I'm currently open to new opportunities. Whether you have a role in mind or just want
          to connect, feel free to reach out.
        </p>

        <div class="contact-links">
          <a href="mailto:Veskrna.98@gmail.com" class="btn btn-primary contact-email">
            <IconEmail />
            Veskrna.98@gmail.com
          </a>
        </div>

        <div class="contact-social">
          <a
            href="https://github.com/FVeskrna"
            class="icon-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <IconGitHub />
          </a>
          <a
            href="https://linkedin.com/in/filip-veskrna"
            class="icon-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <IconLinkedIn />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { IconEmail, IconGitHub, IconLinkedIn } from '../icons'
</script>

<style scoped>
.contact-inner {
  max-width: 640px;
}

.contact-links {
  margin-top: 36px;
  margin-bottom: 24px;
}

.contact-email {
  font-size: 1rem;
}

.contact-social {
  display: flex;
  gap: 10px;
}
</style>
