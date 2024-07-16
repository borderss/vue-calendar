<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
  >
    <component :is="icon" fill="currentColor" />
    <path :fill="fill" :d="iconSet[icon]" />
  </svg>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import iconSet from './IconSet'

export default {
  name: 'Icon',
  props: {
    icon: {
      type: String as PropType<keyof typeof iconSet>,
      required: true
    },
    size: {
      type: String,
      default: '1em'
    },
    fill: {
      type: String,
      default: 'currentColor'
    }
  },
  setup() {
    return {
      iconSet
    }
  }
}
</script>