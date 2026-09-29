<template>
  <RouterView />
  <CommandMenu />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import CommandMenu from './components/CommandMenu.vue'
</script>
