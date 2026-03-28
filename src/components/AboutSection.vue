<template>
  <section class="section" id="about">
    <div class="container about-inner">
      <div class="about-text">
        <p class="section-label">Who I am</p>
        <h2 class="section-title">About me</h2>
        <p class="section-body">
          Analyst Developer with a strong technical background and a focus on delivering scalable,
          efficient software solutions. With a Master's degree in Applied Computer Science and
          Control from Brno University of Technology (graduated with Red Diploma), I specialise in
          C# and .NET development.
        </p>
        <p class="section-body" style="margin-top: 16px;">
          My experience spans both technical and business operations — from software development and
          quality assurance to production support and release management at a global fintech
          platform. I'm passionate about continuous improvement and building tools that actually
          solve real problems.
        </p>
        <p class="section-body" style="margin-top: 16px;">
          Outside of work I build personal projects, including AWY — a full personal workspace app
          I designed and built from scratch.
        </p>
      </div>

      <div class="about-cards">
        <div class="about-stat card">
          <span class="stat-number">3+</span>
          <span class="stat-label">Years experience</span>
        </div>
        <div class="about-stat card">
          <span class="stat-number">M.Sc.</span>
          <span class="stat-label">Applied CS & Control</span>
        </div>
        <div class="about-stat card">
          <span class="stat-number">Fintech</span>
          <span class="stat-label">Domain expertise</span>
        </div>
        <div class="about-stat card">
          <span class="stat-number">.NET</span>
          <span class="stat-label">Core specialisation</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-inner {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 64px;
  align-items: start;
}

.about-text {
  max-width: 640px;
}

.about-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  flex-shrink: 0;
}

.about-stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 130px;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-accent);
  line-height: 1;
}

.stat-label {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

@media (max-width: 900px) {
  .about-inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .about-cards {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 600px) {
  .about-cards {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
