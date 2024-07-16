<template>
  <div class="container">
    <div
      :class="[
        'month-container',
        { 'mobile': isMobile }
      ]"
    >
      <div class="header">
        <span
          v-for="(day, index) in weekdays"
          :key="index"
          class="day"
        >
          {{ day }}
        </span>
      </div>
      <div class="transition-container">
        <Transition
          :name="transitionClass"
        >
          <div :key="uid" class="calendar">
            <div
              v-for="week in 6" 
              :key="week"
              class="week"
            >
              <DateContainer
                v-for="date in 7"
                :key="date" 
                :date="getPageDayData((week - 1) * 7 + date - 1).date"
                :events="getPageDayData((week - 1) * 7 + date - 1).dateEvents"
                :on-event-click="onEventClick"
                :is-mobile="isMobile"
                :active-date="activeDate"
                @date-click="onDateClick"
              >
                <template #eventCard="{ event }">
                  <slot name="eventCard" :event="event" />
                </template>
              </DateContainer>
            </div>
          </div>
        </Transition>
      </div>
    </div>
    <div v-if="isMobile" class="event-list">
      <slot
        v-for="event in activeDateEvents"
        :key="event.id"
        name="eventListItem"
        :event="event"
      >
        <EventCard :event="event" @click="onEventClick(event)" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { CalendarDate, Event } from '@/utils/types'
import EventCard from './EventCard.vue'
import DateContainer from './DateContainer.vue'
import { DateUtils } from '@/utils/DateUtils'
import { Localization } from '@/utils/Localization';

let uid = 0

export default {
  name: 'MonthView',
  components: {
    DateContainer,
    EventCard
  },
  props: {
    events: {
      type: Array as PropType<Event[]>,
      required: true
    },
    onEventClick: {
      type: Function as PropType<(event: Event) => void>,
      required: true
    },
    monthOffset: {
      type: Number,
      required: true
    },
    isMobile: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    return {
      now: new Date(),
      t: Localization.getInstance().t
    }
  },
  data() {
    return {
      pageDayData: [] as {
        date: CalendarDate
        dateEvents: Event[]
      }[],
      uid: uid,
      transitionClass: 'slide-forward',
      activeDate: {
        date: new Date(),
        isToday: true,
        isCurrentMonth: false,
        isWeekend: false,
        isPast: false,
        isFuture: false,
      } as CalendarDate,
    }
  },
  computed: {
    actualEvents(): Event[] {
      return this.events
    },
    activeDateEvents(): Event[] {
      return this.pageDayData.find(data => data.date.date.toDateString() === this.activeDate?.date.toDateString())?.dateEvents || []
    },
    weekdays(): string[] {
      return this.isMobile
        ? this.t('weekDaysShort')
        : this.t('weekDaysLong')
    }
  },
  watch: {
    monthOffset(newVal: number, oldVal: number) {
      this.transitionClass = newVal > oldVal ? 'slide-forward' : 'slide-back'
      
      this.$nextTick(() => {
        this.generatePageDayData()
      })
    },
    pageDayData() {
      this.uid = uid
      uid += 1
    },
    events() {
      this.transitionClass = 'instant'
      this.generatePageDayData()
      this.$nextTick(() => {
        this.transitionClass = this.monthOffset > 0 ? 'slide-forward' : 'slide-back'
      })
    },
    activeDate() {
      this.$forceUpdate()
    }
  },
  created() {
    this.generatePageDayData()
  },
  methods: {
    getPageDayData(id: number) {
      return this.pageDayData[id] as {
        date: CalendarDate
        dateEvents: Event[]
      }
    },
    generatePageDayData() {
      this.pageDayData = DateUtils.getInstance().generatePageDayData(this.now, this.monthOffset, this.actualEvents)
    },
    onDateClick(date: CalendarDate) {
      this.activeDate = date
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  & .event-list {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    padding: 5px;

    &:has( .event-card) {
      height: 200px;
    }
  }
}

.month-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  & .header {
    display: flex;
    justify-content: space-between;
    background-color: var(--zx-vue-calendar-secondary-bg);
    color: var(--zx-vue-calendar-primary-bg);
    border-radius: 12px 12px 0 0;

    & .day {
      font-size: 16px;
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 41px;
    }
  }

  & .transition-container {
    position: relative;
    overflow: hidden;
    height: 100%;
  }

  & .calendar {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    & .week {
      display: flex;
      justify-content: space-between;
      flex-grow: 1;
    }
  }
}

.slide-forward-enter-active,
.slide-forward-leave-active {
  transition: all 0.5s ease-in-out;
}
.slide-forward-enter-from {
  transform: translateY(100%);
}
.slide-forward-leave-to {
  transform: translateY(-100%);
}

.slide-back-enter-active,
.slide-back-leave-active {
  transition: all 0.5s ease-in-out;
}
.slide-back-enter-from {
  transform: translateY(-100%);
}
.slide-back-leave-to {
  transform: translateY(100%);
}

.instant-enter-active,
.instant-leave-active {
  transition: all 0.2s;
}
.instant-enter-from {
  opacity: 0;
}
.instant-leave-to {
  opacity: 0;
}
</style>