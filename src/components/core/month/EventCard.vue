<template>
  <div :class="'event-card color-' + (event.color || 'default')">
    <span class="title" :title="event.title">
      {{ event.title }}<br>
    </span>
    <span v-if="event.startTime && event.endTime" class="time" :title="event.startTime + ' - ' + event.endTime">
      {{ event.startTime }} - {{ event.endTime }}
    </span>
    <span v-else-if="event.startTime" class="time">
      {{ event.startTime }}
    </span>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { Event } from '@/utils/types';

export default {
  name: 'EventCard',
  props: {
    event: {
      type: Object as PropType<Event>,
      required: true
    }
  }
}
</script>

<style scoped>
.event-card {
  margin-bottom: 4px;
  border-radius: 4px;
  padding: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: filter 0.2s;
  display: block;
  word-break: break-word;

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

  & .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
  }

  & .title {
    font-weight: 500;
    user-select: none;
    overflow: hidden;
  }

  & .time {
    font-weight: 400;
    user-select: none;
  }

  &:hover {
    filter: brightness(95%);
  }

  &:active {
    filter: brightness(90%);
  }
}
</style>