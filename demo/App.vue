<template>
  <div class="page-container">
    <h1>
      Vue Calendar
    </h1>
    <VueCalendar :options="options" />
    <p>
      By default, the component has 3 views - month, week, and day. You can switch between them by clicking on the buttons above the calendar, which swithces them with a nice transition effect. For now, only the month view is implemented.
      The calendar container has navigation buttons - forwards and backwards, which change the month / week / day, depending on the current view.
      <br>
      <br>
      Switching views and navigating inside the containers emits events that you can listen to and handle in your application.
      <br>
      <br>
      Each event can be clicked, which also emits an event that you can handle in your application. A slot for the event card is also provided if custom styling or functionality is needed.
      <br>
      <br>
      By default, the calendar grows to fit the container it is in, and the container determines whether it should be mobile or not depending on the screen width, though this can be overriden by manually setting its state.
    </p>
  </div>
</template>

<script lang="ts">
import VueCalendar from '../src/components/VueCalendar.vue'
import type { CalendarOptions, Event } from '../src/utils/types'

const titles = ['et et ipsam',
  'ullam esse quia',
  'quia laudantium itaque',
  'facilis ab corporis',
  'aut laudantium blanditiis',
  'assumenda quia velit',
  'eaque et quia',
  'quam sequi et',
  'omnis sed accusamus',
  'est quae libero',
  'blanditiis magni laudantium',
  'itaque ratione velit',
  'voluptatibus quae corrupti',
  'alias eum dolorem',
  'autem doloribus assumenda',
  'qui et maxime',
  'alias at nobis',
  'rerum vel aliquid',
  'aut omnis odio',
  'ut facilis incidunt',
  'a veritatis voluptatibus',
  'placeat quisquam maiores',
  'nesciunt eius ratione',
  'nemo ipsum eum',
  'quisquam commodi laborum',
  'ut perferendis qui',
  'non voluptatum voluptates',
  'explicabo saepe tenetur',
  'quam distinctio nesciunt',
  'ab et animi',
  'sint quidem vero',
  'est enim fugiat',
  'impedit omnis quibusdam',
  'et fuga consequatur',
  'libero id ad',
  'qui possimus nisi',
  'ut sunt quibusdam',
  'cumque iste voluptas',
  'et quae dicta',
  'dolorem quaerat aut',
  'veniam est ea',
  'quia tempora eveniet',
  'ut est est',
  'assumenda rerum deleniti',
  'qui voluptatem voluptatem',
  'placeat incidunt quos',
  'sint quis esse',
  'vero repellendus id',
  'recusandae ducimus consectetur'
]

export default {
  name: 'App',
  components: {
    VueCalendar
  },
  data() {
    return {
      options: {
        events: [],
        onEventClick: (event) => {
          console.log('Clicked: ', event.title)
        },
        locale: 'en',
      } as CalendarOptions
    }
  },
  async mounted() {
    await this.generateRandomEvents()
    console.log(this.options)
  },
  methods: {
    getRandomColor() {
      const options = ['blue', 'green', 'red', 'yellow']

      return options[Math.floor(Math.random() * options.length)]
    },
    async generateRandomEvents() {
      const events = [] as Event[]

      for (let i = 0; i < 25; i++) {
        const date = new Date()
        date.setDate(Math.floor(Math.random() * 30) + 1)
        date.setHours(Math.floor(Math.random() * 24))
        date.setMinutes(Math.floor(Math.random() * 60))

        const isAllDay = Math.random() > 0.5
        const startTime = isAllDay ? undefined : `${date.getHours()}:${date.getMinutes()}`
        const endTime = isAllDay ? undefined : `${date.getHours() + 1}:${date.getMinutes()}`

        events.push({
          title: titles[Math.floor(Math.random() * titles.length)],
          date: date,
          color: this.getRandomColor(),
          allDay: isAllDay,
          startTime: startTime,
          endTime: endTime
        })
      }
      
      return setTimeout(() => {
        this.options.events = events
      }, 200)
    }
  }
} 
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;

  & h1 {
    margin: 0;
    padding: 16px;
    background-color: #fff;
    border-radius: 12px;
    margin-top: 50px;
  }

  & p {
    margin: 0;
    padding: 16px;
    background-color: #fff;
    border-radius: 12px;
    margin-bottom: 50px;
  }
}
</style>