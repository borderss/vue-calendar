<template>
  <div class="container">
    <div class="data-display">
      <slot name="dataDisplay" :date="getNavigatedDate()">
        {{ dataDisplay() }}
      </slot>
    </div>
    <div class="flex-grow" />
    <button @click="onPreviousClick">
      <Icon icon="cheveron-left" size="28px" />
    </button>
    <button @click="onNextClick">
      <Icon icon="cheveron-right" size="28px" />
    </button>
  </div>
</template>

<script lang="ts">
import Icon from '@/components/core/icons/Icon.vue';
import { PropType } from 'vue';
import { Localization } from '@/utils/Localization';

export default {
  name: 'InnerViewController',
  components: {
    Icon
  },
  props: {
    modelValue: {
      type: Number,
      required: true
    },
    view: {
      type: String,
      required: true
    },
    onNavigationChange: {
      type: Function as PropType<(date: Date) => void>,
      required: true
    },
  },
  emits: ['update:modelValue'],
  setup() {
    return {
      Localization
    }
  },
  data() {
    return {
      now: new Date(),
    }
  },
  computed: {
    offsetValue: {
      get() {
        return this.modelValue;
      },
      set(value: number) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  methods: {
    onPreviousClick() {
      this.offsetValue -= 1;
      this.$nextTick(() => {
        this.onNavigationChange(this.getNavigatedDate());
      });
    },
    onNextClick() {
      this.offsetValue += 1;
      this.$nextTick(() => {
        this.onNavigationChange(this.getNavigatedDate());
      });
    },
    dataDisplay() {
      const now = this.getNavigatedDate();
      switch (this.view) {
      case 'month':
        return `${now.toLocaleString(Localization.getInstance().getLocale(), { month: 'long', year: 'numeric' })}`;
      }
    },
    getNavigatedDate() {
      return new Date(this.now.getFullYear(), this.now.getMonth() + this.offsetValue, this.now.getDate());
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  gap: 10px;
  padding: 4px;
  height: 100%;
  border-radius: 6px;

  & button {
    display: flex;
    justify-content: center;
    padding: 4px 6px;
    align-items: center;
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
        filter: darken(0.1);
      }
    }
  }
  
  & .data-display {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
    margin-right: 10px;
  }

  & .flex-grow {
    flex-grow: 1;
  }
}
</style>