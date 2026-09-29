<template>
  <Teleport to="body">
    <Transition name="cmd">
      <div v-if="menuOpen" class="cmd-overlay" @mousedown.self="close">
        <div
          class="cmd"
          role="dialog"
          aria-modal="true"
          aria-label="Command menu"
          @keydown="onKeydown"
        >
          <div class="cmd-search">
            <IconSearch :size="16" />
            <input
              ref="inputEl"
              v-model="query"
              class="cmd-input"
              type="text"
              placeholder="Jump to a section, project, or action"
              aria-label="Search commands"
              role="combobox"
              aria-expanded="true"
              aria-controls="cmd-list"
              :aria-activedescendant="filtered.length ? `cmd-item-${active}` : undefined"
              autocomplete="off"
              spellcheck="false"
            />
            <span class="kbd">Esc</span>
          </div>

          <div id="cmd-list" ref="listEl" class="cmd-list" role="listbox">
            <template v-for="group in grouped" :key="group.name">
              <p class="cmd-group">{{ group.name }}</p>
              <button
                v-for="item in group.items"
                :id="`cmd-item-${item.index}`"
                :key="item.id"
                type="button"
                role="option"
                class="cmd-item"
                :class="{ active: item.index === active }"
                :aria-selected="item.index === active"
                @mousemove="active = item.index"
                @click="run(item)"
              >
                <component :is="item.icon" :size="16" class="cmd-icon" />
                <span class="cmd-item-label">{{ item.label }}</span>
                <span v-if="item.hint" class="cmd-hint">{{ item.hint }}</span>
              </button>
            </template>
            <p v-if="!filtered.length" class="cmd-empty">No matches for “{{ query }}”.</p>
          </div>

          <div class="cmd-foot">
            <span><span class="kbd">↑</span><span class="kbd">↓</span> to navigate</span>
            <span><span class="kbd">↵</span> to select</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch, type Component } from 'vue'
import { useRouter } from 'vue-router'
import { useUi } from '../composables/useUi'
import { projects } from '../data/projects'
import { profile } from '../data/profile'
import {
  IconSearch,
  IconHash,
  IconFolder,
  IconCopy,
  IconGitHub,
  IconLinkedIn,
  IconSun,
  IconMoon,
  IconMail,
} from '../icons'

interface Command {
  id: string
  group: string
  label: string
  hint?: string
  icon: Component
  keywords?: string
  action: () => void | Promise<void>
}

const { menuOpen, goToSection, copyEmail, toggleTheme, theme } = useUi()
const router = useRouter()

const query = ref('')
const active = ref(0)
const inputEl = ref<HTMLInputElement | null>(null)
const listEl = ref<HTMLElement | null>(null)
let lastFocus: HTMLElement | null = null

const sections = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['certificates', 'Certificates'],
  ['contact', 'Contact'],
] as const

const commands = computed<Command[]>(() => [
  ...sections.map(([id, label]) => ({
    id: `section-${id}`,
    group: 'Sections',
    label,
    icon: IconHash,
    action: () => goToSection(id),
  })),
  ...projects.map((p) => ({
    id: `project-${p.slug}`,
    group: 'Case studies',
    label: p.title,
    hint: p.tags.slice(0, 2).join(' · '),
    keywords: p.tags.join(' '),
    icon: IconFolder,
    action: () => {
      router.push(`/projects/${p.slug}`)
    },
  })),
  {
    id: 'copy-email',
    group: 'Contact',
    label: 'Copy email address',
    hint: profile.email,
    icon: IconCopy,
    action: copyEmail,
  },
  {
    id: 'mail',
    group: 'Contact',
    label: 'Write an email',
    icon: IconMail,
    action: () => {
      window.location.href = `mailto:${profile.email}`
    },
  },
  {
    id: 'linkedin',
    group: 'Contact',
    label: 'Open LinkedIn',
    icon: IconLinkedIn,
    action: () => {
      window.open(profile.linkedin, '_blank', 'noopener')
    },
  },
  {
    id: 'github',
    group: 'Contact',
    label: 'Open GitHub',
    icon: IconGitHub,
    action: () => {
      window.open(profile.github, '_blank', 'noopener')
    },
  },
  {
    id: 'theme',
    group: 'Preferences',
    label: theme.value === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
    icon: theme.value === 'dark' ? IconSun : IconMoon,
    keywords: 'theme dark light mode',
    action: toggleTheme,
  },
])

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  const list = q
    ? commands.value.filter((c) =>
        `${c.label} ${c.group} ${c.keywords ?? ''} ${c.hint ?? ''}`.toLowerCase().includes(q),
      )
    : commands.value
  return list.map((c, index) => ({ ...c, index }))
})

const grouped = computed(() => {
  const groups: { name: string; items: (Command & { index: number })[] }[] = []
  for (const item of filtered.value) {
    let g = groups.find((x) => x.name === item.group)
    if (!g) groups.push((g = { name: item.group, items: [] }))
    g.items.push(item)
  }
  return groups
})

watch(query, () => (active.value = 0))

watch(menuOpen, async (open) => {
  if (open) {
    lastFocus = document.activeElement as HTMLElement | null
    query.value = ''
    active.value = 0
    document.documentElement.style.overflow = 'hidden'
    await nextTick()
    inputEl.value?.focus()
  } else {
    document.documentElement.style.overflow = ''
    lastFocus?.focus?.()
  }
})

function close() {
  menuOpen.value = false
}

async function run(item: Command) {
  close()
  await nextTick()
  await item.action()
}

function scrollActiveIntoView() {
  nextTick(() => {
    listEl.value
      ?.querySelector<HTMLElement>(`#cmd-item-${active.value}`)
      ?.scrollIntoView({ block: 'nearest' })
  })
}

function onKeydown(e: KeyboardEvent) {
  const n = filtered.value.length
  if (e.key === 'Escape') {
    e.preventDefault()
    close()
  } else if (e.key === 'ArrowDown' && n) {
    e.preventDefault()
    active.value = (active.value + 1) % n
    scrollActiveIntoView()
  } else if (e.key === 'ArrowUp' && n) {
    e.preventDefault()
    active.value = (active.value - 1 + n) % n
    scrollActiveIntoView()
  } else if (e.key === 'Enter' && n) {
    e.preventDefault()
    run(filtered.value[active.value])
  } else if (e.key === 'Tab') {
    e.preventDefault()
    inputEl.value?.focus()
  }
}

function onGlobalKey(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    menuOpen.value = !menuOpen.value
  }
}

onMounted(() => window.addEventListener('keydown', onGlobalKey))
onUnmounted(() => window.removeEventListener('keydown', onGlobalKey))
</script>

<style scoped>
.cmd-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: min(16vh, 140px) 16px 16px;
  background: color-mix(in srgb, var(--bg) 55%, transparent);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.cmd {
  width: 100%;
  max-width: 600px;
  max-height: min(520px, 72vh);
  display: flex;
  flex-direction: column;
  background: var(--bg-raised);
  border-radius: 14px;
  box-shadow: 0 0 0 1px var(--line-strong), 0 1px 0 0 var(--highlight) inset,
    0 32px 80px -24px rgba(0, 0, 0, 0.6);
  overflow: hidden;
}

.cmd-search {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  height: 54px;
  border-bottom: 1px solid var(--line);
  color: var(--text-3);
}

.cmd-input {
  flex: 1;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  font: inherit;
  font-size: 0.9375rem;
  color: var(--text);
}

.cmd-input::placeholder {
  color: var(--text-3);
}

.cmd-list {
  flex: 1;
  overflow-y: auto;
  padding: 6px 8px 8px;
  overscroll-behavior: contain;
}

.cmd-group {
  padding: 12px 10px 6px;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-3);
}

.cmd-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  border-radius: 8px;
  text-align: left;
  font-size: 0.875rem;
  color: var(--text-2);
}

.cmd-item.active {
  background: var(--glow);
  color: var(--text);
  box-shadow: 0 0 0 1px var(--line) inset;
}

.cmd-icon {
  flex-shrink: 0;
  color: var(--text-3);
}

.cmd-item.active .cmd-icon {
  color: var(--text);
}

.cmd-item-label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cmd-hint {
  font-size: 0.75rem;
  color: var(--text-3);
  white-space: nowrap;
}

.cmd-empty {
  padding: 28px 12px;
  text-align: center;
  font-size: 0.875rem;
  color: var(--text-3);
}

.cmd-foot {
  display: flex;
  gap: 18px;
  padding: 10px 16px;
  border-top: 1px solid var(--line);
  font-size: 0.75rem;
  color: var(--text-3);
}

.cmd-foot .kbd {
  margin-right: 3px;
}

.cmd-enter-active,
.cmd-leave-active {
  transition: opacity 180ms var(--ease-out);
}
.cmd-enter-active .cmd,
.cmd-leave-active .cmd {
  transition: transform 220ms var(--ease-out), opacity 180ms var(--ease-out),
    filter 220ms var(--ease-out);
}
.cmd-enter-from,
.cmd-leave-to {
  opacity: 0;
}
.cmd-enter-from .cmd,
.cmd-leave-to .cmd {
  opacity: 0;
  transform: translateY(-6px) scale(0.985);
  filter: blur(4px);
}

@media (max-width: 560px) {
  .cmd-hint,
  .cmd-foot {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cmd-enter-active .cmd,
  .cmd-leave-active .cmd {
    transition: opacity 120ms linear;
  }
  .cmd-enter-from .cmd,
  .cmd-leave-to .cmd {
    transform: none;
    filter: none;
  }
}
</style>
