import { ref } from 'vue'
import router from '../router'
import { profile } from '../data/profile'

type Theme = 'dark' | 'light'

const theme = ref<Theme>(
  (typeof document !== 'undefined' &&
    (document.documentElement.getAttribute('data-theme') as Theme)) ||
    'dark',
)
const menuOpen = ref(false)
const emailCopied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | undefined

function setTheme(next: Theme) {
  theme.value = next
  document.documentElement.setAttribute('data-theme', next)
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', next === 'dark' ? '#08090a' : '#fbfbfc')
  try {
    localStorage.setItem('theme', next)
  } catch {
    /* storage unavailable */
  }
}

function toggleTheme() {
  setTheme(theme.value === 'dark' ? 'light' : 'dark')
}

async function goToSection(id: string) {
  if (router.currentRoute.value.path !== '/') {
    await router.push('/')
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
  }
  document.getElementById(id)?.scrollIntoView({ block: 'start' })
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email)
  } catch {
    window.location.href = `mailto:${profile.email}`
    return
  }
  emailCopied.value = true
  clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => (emailCopied.value = false), 1800)
}

export function useUi() {
  return { theme, toggleTheme, menuOpen, goToSection, copyEmail, emailCopied }
}
