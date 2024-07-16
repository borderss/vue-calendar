<template>
  <div class="view-selector-container">
    <button
      :class="{ 'active': value !== 'month' }"
      @click="value = 'month'"
    >
      {{ isMobile ? t('monthTextShort') : t('monthTextLong') }}
    </button>
    <button
      :class="{ 'active': value !== 'week' }"
      @click="value = 'week'"
    >
      {{ isMobile ? t('weekTextShort') : t('weekTextLong') }}
    </button>
    <button
      :class="{ 'active': value !== 'day' }"
      @click="value = 'day'"
    >
      {{ isMobile ? t('dayTextShort') : t('dayTextLong') }}
    </button>
  </div>
</template>

<script lang="ts">
import { Localization } from '@/utils/Localization';

export default {
  name: 'ViewSelector',
  props: {
    modelValue: {
      type: String,
      required: true
    },
    isMobile: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup() {
    return {
      t: Localization.getInstance().t
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value: string) {
        this.$emit('update:modelValue', value);
      }
    }
  },
}
</script>

<style scoped>
.view-selector-container {
  display: flex;
  gap: 10px;
  padding: 4px;
  background-color: var(--zx-vue-calendar-secondary-bg);
  border-radius: 6px;
}
.view-selector-container button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  color: var(--zx-vue-calendar-primary-bg-text);
  background-color: var(--zx-vue-calendar-primary-bg);
  cursor: pointer;
  transition: all 0.2s;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--zx-vue-calendar-primary-bg);
  }

  &:hover {
    background-color: var(--zx-vue-calendar-primary-bg);
  }

  &.active {
    color: var(--zx-vue-calendar-primary-bg);
    background-color: var(--zx-vue-calendar-secondary-bg);

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px var(--zx-vue-calendar-primary-bg);
    }

    &:hover {
      filter: contrast(0.9);
    }
  }
}

@media (max-width: 500px) {
  .view-selector-container {
    justify-content: space-evenly;

    & button {
      width: 100%;
    }
  }
}
</style>