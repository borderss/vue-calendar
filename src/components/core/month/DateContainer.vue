<template>
  <div
    :class="[
      'date-container',
      { 'is-today': date.isToday },
      { 'is-past': date.isPast },
      { 'is-future': date.isFuture },
      { 'is-weekend': date.isWeekend },
      { 'is-selected': isSelected },
      { 'is-current-month': date.isCurrentMonth},
      { 'is-not-current-month': !date.isCurrentMonth},
      { 'has-events': hasEvents },
      { 'mobile': isMobile }
    ]"
    @click="onDateClick"
  >
    <div class="header">
      <span>
        {{ dayDate }}
      </span>
    </div>
    <div v-if="hasEvents && !isMobile" class="events">
      <slot
        v-for="(event, index) in events"
        :key="index"
        name="eventCard"
        :event="event"
      >
        <EventCard
          :event="event"
          @click="onEventClick && onEventClick(event)"
        />
      </slot>
    </div>
    <div v-if="hasEvents && isMobile" class="events">
      <div 
        v-for="(event, index) in events"
        :key="index"
        :event="event"
        :class="'event-line color-' + (event.color || 'default')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { CalendarDate, Event } from '@/utils/types';
import EventCard from './EventCard.vue';

export default {
  name: 'DateContainer',
  components: {
    EventCard
  },
  props: {
    date: {
      type: Object as PropType<CalendarDate>,
      required: true
    },
    events: {
      type: Array as PropType<Event[]>,
      required: true
    },
    onEventClick: {
      type: Function as PropType<(event: Event) => void>,
      required: false,
      default: () => null
    },
    isMobile: {
      type: Boolean,
      required: true,
    },
    activeDate: {
      type: Object as PropType<CalendarDate | undefined>,
      required: false,
      default: {} as CalendarDate
    }
  },
  emits: ['dateClick'],
  computed: {
    hasEvents(): boolean {
      return this.events.length > 0
    },
    dayDate(): number {
      return this.date.date.getDate()
    },
    isSelected() {
      return this.isMobile && this.activeDate && this.activeDate.date.toDateString() === this.date.date.toDateString()
    }
  },
  methods: {
    onDateClick() {
      this.$emit('dateClick', this.date)
    },
  }
}
</script>

<style scoped>
.date-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 4px;
  border: 1px solid var(--zx-vue-calendar-secondary-bg);
  gap: 4px;

  & .header {
    display: flex;
    justify-content: end;
    height: 28px;

    & span {
      font-size: 14px;
      color: var(--zx-vue-calendar-text-secondary);
      height: 100%;
      aspect-ratio: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
    }
  }

  &.is-current-month {
    background-color: var(--zx-vue-calendar-date-background);
  }

  &.is-not-current-month {
    background-color: var(--zx-vue-calendar-date-background-not-this-week) !important;
  }

  &.is-today .header span {
    background-color: var(--zx-vue-calendar-primary-bg);
    color: var(--zx-vue-calendar-primary-bg-text) !important;
    border-radius: 50%;
  }

  & .events {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    flex: 1 0 0px;
  }
}

.date-container.mobile {
  & .header {
    justify-content: center;
  }

  &.is-selected .header span {
    border-radius: 50%;
    color: var(--zx-vue-calendar-date-selected-color);
    border: 2px solid var(--zx-vue-calendar-date-selected-color);
  }

  & .events {
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
    gap: 2px;

    & .event-line {
      height: 4px;
      width: 100%;
      border-radius: 2px;
      flex: 0 0 auto;
      
      &.color-default {
        background-color: var(--zx-vue-calendar-secondary-bg);
        color: var(--zx-vue-calendar-primary-bg);
      }

      &.color-blue {
        background-color: #D6EBFF;
        color: #2595FF;
      }

      &.color-green {
        background-color: #DFF0D8;
        color: #28A745;
      }

      &.color-red {
        background-color: #F8D7DA;
        color: #DC3545;
      }

      &.color-yellow {
        background-color: #FFF3CD;
        color: #FFC107;
      }
    }
  }
}
</style>