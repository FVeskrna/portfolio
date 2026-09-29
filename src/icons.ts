import { h, defineComponent, type VNode } from 'vue'

// One stroke family (24px grid, 1.75 stroke, round caps) for UI icons; brand marks are filled.
function strokeIcon(name: string, defaultSize: number, children: () => VNode[]) {
  return defineComponent({
    name,
    props: { size: { type: Number, default: defaultSize } },
    setup(props) {
      return () =>
        h(
          'svg',
          {
            width: props.size,
            height: props.size,
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': 1.75,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'aria-hidden': 'true',
          },
          children(),
        )
    },
  })
}

function fillIcon(name: string, defaultSize: number, d: string) {
  return defineComponent({
    name,
    props: { size: { type: Number, default: defaultSize } },
    setup(props) {
      return () =>
        h(
          'svg',
          {
            width: props.size,
            height: props.size,
            viewBox: '0 0 24 24',
            fill: 'currentColor',
            'aria-hidden': 'true',
          },
          [h('path', { d })],
        )
    },
  })
}

export const IconGitHub = fillIcon(
  'IconGitHub',
  18,
  'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z',
)

export const IconLinkedIn = fillIcon(
  'IconLinkedIn',
  18,
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
)

export const IconMail = strokeIcon('IconMail', 18, () => [
  h('rect', { x: 3, y: 5, width: 18, height: 14, rx: 2.5 }),
  h('path', { d: 'm3.5 7 8.5 6 8.5-6' }),
])

export const IconSun = strokeIcon('IconSun', 18, () => [
  h('circle', { cx: 12, cy: 12, r: 4 }),
  h('path', {
    d: 'M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4',
  }),
])

export const IconMoon = strokeIcon('IconMoon', 18, () => [
  h('path', { d: 'M20.5 13.5A8.5 8.5 0 1 1 10.5 3.5a6.6 6.6 0 0 0 10 10z' }),
])

export const IconArrowLeft = strokeIcon('IconArrowLeft', 16, () => [
  h('path', { d: 'M19 12H5M11 18l-6-6 6-6' }),
])

export const IconArrowRight = strokeIcon('IconArrowRight', 16, () => [
  h('path', { d: 'M5 12h14M13 6l6 6-6 6' }),
])

export const IconArrowUpRight = strokeIcon('IconArrowUpRight', 16, () => [
  h('path', { d: 'M7 17 17 7M8 7h9v9' }),
])

export const IconClose = strokeIcon('IconClose', 18, () => [
  h('path', { d: 'M18 6 6 18M6 6l12 12' }),
])

export const IconExpand = strokeIcon('IconExpand', 18, () => [
  h('path', { d: 'M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7' }),
])

export const IconExternalLink = IconArrowUpRight

export const IconCopy = strokeIcon('IconCopy', 16, () => [
  h('rect', { x: 8.5, y: 8.5, width: 12, height: 12, rx: 2.5 }),
  h('path', { d: 'M15.5 8.5V6A2.5 2.5 0 0 0 13 3.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5' }),
])

export const IconCheck = strokeIcon('IconCheck', 16, () => [h('path', { d: 'm5 12.5 4.5 4.5L19 7.5' })])

export const IconSearch = strokeIcon('IconSearch', 16, () => [
  h('circle', { cx: 11, cy: 11, r: 6.5 }),
  h('path', { d: 'm20 20-4.2-4.2' }),
])

export const IconHash = strokeIcon('IconHash', 16, () => [
  h('path', { d: 'M9 4 7 20M17 4l-2 16M4.5 9h16M3.5 15h16' }),
])

export const IconFolder = strokeIcon('IconFolder', 16, () => [
  h('path', { d: 'M3.5 7.5A2 2 0 0 1 5.5 5.5h4l2 2.5h7a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z' }),
])

export const IconFile = strokeIcon('IconFile', 16, () => [
  h('path', { d: 'M14 3.5H7A2.5 2.5 0 0 0 4.5 6v12A2.5 2.5 0 0 0 7 20.5h10a2.5 2.5 0 0 0 2.5-2.5V9z' }),
  h('path', { d: 'M14 3.5V9h5.5' }),
])

export const IconPlay = strokeIcon('IconPlay', 16, () => [
  h('path', { d: 'M7 4.5v15l12.5-7.5z' }),
])

export const IconMenu = strokeIcon('IconMenu', 18, () => [h('path', { d: 'M4 7.5h16M4 16.5h16' })])
