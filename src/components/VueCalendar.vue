<template>
  <div
    :class="[
      'calendar-container',
      { 'mobile': isMobile }
    ]"
    :style="{
      '--zx-vue-calendar-container-bg': parsed.colors.containerBg,
      '--zx-vue-calendar-primary-bg': parsed.colors.primaryBg,
      '--zx-vue-calendar-primary-bg-text': parsed.colors.primaryBgText,
      '--zx-vue-calendar-secondary-bg': parsed.colors.secondaryBg,
      '--zx-vue-calendar-text-primary': parsed.colors.textPrimary,
      '--zx-vue-calendar-text-secondary': parsed.colors.textSecondary,
      '--zx-vue-calendar-date-selected-color': parsed.colors.dateSelectedColor,
      '--zx-vue-calendar-date-background': parsed.colors.dateBackground,
      '--zx-vue-calendar-date-background-not-this-week': parsed.colors.dateBackgroundNotThisWeek,
      '--zx-vue-calendar-scrollbar-color': parsed.colors.scrollbarColor
    }"
  >
    <div class="header">
      <ViewSelector
        v-if="parsed.showViewSelector"
        v-model="viewState"
        :on-view-change="parsed.onViewChange"
        :is-mobile="isMobile"
      />
      <div v-else class="flex-grow" />
      <NavigationController
        v-if="parsed.showNavigation"
        v-model="monthOffset"
        :view="viewState"
        :on-navigation-change="parsed.onNavigationChange"
        :is-mobile="isMobile"
      >
        <template #dataDisplay="{ date }">
          <slot name="dataDisplay" :date="date" />
        </template>
      </NavigationController>
    </div>
    <div class="view-container">
      <Transition :name="transitionClass" mode="out-in">
        <div v-if="viewState == 'month'" class="view">
          <MonthView
            :events="parsed.events"
            :on-event-click="parsed.onEventClick"
            :month-offset="monthOffset"
            :is-mobile="isMobile"
          >
            <template #eventCard="{ event }">
              <slot name="eventCard" :event="event" />
            </template>
          </MonthView>
        </div>

        <div v-else-if="viewState == 'week'" class="view">
          <h2>
            Nedēļa
          </h2>
        </div>

        <div v-else-if="viewState == 'day'" class="view">
          <h2>
            Diena
          </h2>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Localization } from '@/utils/Localization';
import type { CalendarOptions } from '@/utils/types';
import type { PropType } from 'vue';
import MonthView from './core/month/MonthView.vue';
import NavigationController from './core/NavigationController.vue';
import ViewSelector from './core/ViewSelector.vue';

export default {
  name: 'VueCalendar',
  components: {
    MonthView,
    ViewSelector,
    NavigationController
  },
  props: {
    options: {
      type: Object as PropType<CalendarOptions>,
      required: true
    }
  },
  setup(props) {
    Localization.getInstance().setLocale(props.options?.locale || 'en');
  },
  data() {
    return {
      viewState: 'month',
      monthOffset: 0,
      transitionClass: 'slide-forward',
      isMobile: false,
    }
  },
  computed: {
    parsed() {
      const opts = this.options as CalendarOptions;
      return {
        events: opts.events || [],
        defaultView: opts?.defaultView || 'month',
        showViewSelector: opts?.showViewSelector !== undefined ? opts.showViewSelector : true,
        showNavigation: opts?.showNavigation !== undefined ? opts.showNavigation : true,
        mobileBreakpointPx: opts?.mobileBreakpointPx || 768,
        forceMobile: opts?.forceMobile !== undefined ? opts.forceMobile : false,
        forceDesktop: opts?.forceDesktop !== undefined ? opts.forceDesktop : false,
        colors: {
          containerBg: opts?.colors?.containerBg || '#ffffff',
          primaryBg: opts?.colors?.primaryBg || '#2f92df',
          primaryBgText: opts?.colors?.primaryBgText || '#ffffff',
          secondaryBg: opts?.colors?.secondaryBg || '#e9f5ff',
          textPrimary: opts?.colors?.textPrimary || '#000000',
          textSecondary: opts?.colors?.textSecondary || '#768B95',
          dateSelectedColor: opts?.colors?.dateSelectedColor || '#69b8ff',
          dateBackground: opts?.colors?.dateBackground || '#ffffff',
          dateBackgroundNotThisWeek: opts?.colors?.dateBackgroundNotThisWeek || '#f9f9f9',
          scrollbarColor: opts?.colors?.scrollbarColor || '#efefef'
        },
        onEventClick: opts?.onEventClick || (() => {}),
        onViewChange: opts?.onViewChange || (() => {}),
        onNavigationChange: opts?.onNavigationChange || (() => { }),
      }
    }
  },
  watch: {
    viewState(oldValue, newValue) {
      if (oldValue !== newValue) {
        if (oldValue === 'month') {
          this.transitionClass = 'slide-back';
          return
        }

        if (oldValue === 'day') {
          this.transitionClass = 'slide-forward';
          return
        }

        if (newValue === 'month') {
          this.transitionClass = 'slide-forward';
        } else {
          this.transitionClass = 'slide-back';
        }
      }
    },
    options: {
      handler() {
        // force re-render
        this.$forceUpdate();
      },
      deep: true
    }
  },
  mounted() {
    window.addEventListener('resize', this.onWindowResize);
    this.onWindowResize();
  },
  unmounted() {
    window.removeEventListener('resize', this.onWindowResize);
  },
  beforeMount() {
    this.viewState = this.parsed.defaultView;
  },
  methods: {
    onWindowResize() {
      if (this.parsed.forceMobile) this.isMobile = true;
      if (this.parsed.forceDesktop) this.isMobile = false;
      this.isMobile = window.innerWidth < (this.parsed.mobileBreakpointPx ?? 0);
    }
  }
}
</script>

<style scoped>
.calendar-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 870px;
  gap: 20px;
  padding: 16px;
  border-radius: 12px;
  background-color: var(--zx-vue-calendar-container-bg);
  color: var(--zx-vue-calendar-text-primary);

  & .header {
    display: flex;
    justify-content: space-between;
    width: 100%;

    & .flex-grow {
      flex-grow: 1;
    }
  }

  & * {
    font-family: "Poppins", sans-serif;
  }

  & ::-webkit-scrollbar {
    width: 6px;
  }

  & ::-webkit-scrollbar-track {
    background: transparent;
  }

  & ::-webkit-scrollbar-thumb {
    background: var(--zx-vue-calendar-scrollbar-color);
    border-radius: 10px;
  }

  & ::-webkit-scrollbar-thumb:hover {
    background: var(--zx-vue-calendar-scrollbar-color);
  }
}

.calendar-container.mobile {
  height: 656px;
  padding: 8px;

  &:has( .event-list .event-card) {
    height: 800px;
  }

  & .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
  }
}

.slide-forward-enter-active,
.slide-forward-leave-active {
  transition: all 0.2s ease-in-out;
}
.slide-forward-enter-from {
  transform: translateX(100%);
}
.slide-forward-leave-to {
  transform: translateX(-100%);
}

.slide-back-enter-active,
.slide-back-leave-active {
  transition: all 0.2s ease-in-out;
}
.slide-back-enter-from {
  transform: translateX(-100%);
}
.slide-back-leave-to {
  transform: translateX(100%);
}

.view-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  overflow: hidden;

  & .view {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    box-shadow: inset 0 0 0 1px var(--zx-vue-calendar-secondary-bg);
  }
}

@media (max-width: 500px) {
  .calendar-container.mobile {
    & .header {
      flex-direction: column;
      align-items: stretch;
      gap: 18px;
    }

    & .view-selector-container {
      justify-content: space-evenly
    }
  }
}

@-moz-document url-prefix() {
  body {
    scrollbar-width: thin;
    scrollbar-color: var(--zx-vue-calendar-scrollbar-color);
  }
}
</style>