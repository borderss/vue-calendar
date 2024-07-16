<template>
  <div class="page-container">
    <h1>
      Vue Calendar
    </h1>
    <VueCalendar :options="options" />
    <p>
      Est aute exercitation duis laboris proident ea. Reprehenderit mollit aliquip esse consequat et do. Id nostrud occaecat tempor esse commodo excepteur sint proident deserunt aliqua proident nisi. Ad Lorem pariatur consectetur esse incididunt tempor ea nulla ea culpa quis elit amet quis. Deserunt nisi enim enim voluptate officia. Proident sunt ex amet culpa exercitation sit exercitation enim ipsum proident ad reprehenderit sit. Laboris consectetur Lorem dolor veniam Lorem ex ea irure aliqua ipsum quis veniam.
      <br>
      <br>
      Reprehenderit nostrud occaecat nisi esse nisi cupidatat aute irure nulla officia consequat. Et veniam commodo tempor cupidatat. Velit exercitation adipisicing aliquip dolore deserunt esse. Id qui enim ea commodo elit pariatur laborum eiusmod pariatur cillum aliquip non non reprehenderit.
    </p>
  </div>
</template>

<script lang="ts">
import VueCalendar from '../src/components/VueCalendar.vue'
import type { CalendarOptions } from '../src/utils/types'

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
      return setTimeout(() => {
        this.options.events = [
          {
            id: 99,
            title: 'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
            date: '2024-04-17 06:50:20',
            color: 'red'
          },
          {
            id: 98,
            title: 'quia deleniti quis',
            date: '2024-04-20 03:14:39'
          },
          {
            id: 97,
            title: 'et et ipsam',
            date: '2024-04-10 12:42:39'
          },
          {
            id: 96,
            title: 'ullam esse quia',
            date: '2024-04-09 03:26:48'
          },
          {
            id: 95,
            title: 'quia laudantium itaque',
            date: '2024-04-01 02:27:50'
          },
          {
            id: 94,
            title: 'facilis ab corporis',
            date: '2024-04-25 16:28:22'
          },
          {
            id: 93,
            title: 'aut laudantium blanditiis',
            date: '2024-04-02 07:12:10'
          },
          {
            id: 90,
            title: 'assumenda quia velit',
            date: '2024-04-24 04:01:51'
          },
          {
            id: 88,
            title: 'eaque et quia',
            date: '2024-04-17 04:01:37'
          },
          {
            id: 87,
            title: 'quam sequi et',
            date: '2024-04-05 07:26:40'
          },
          {
            id: 86,
            title: 'omnis sed accusamus',
            date: '2024-04-15 18:43:29'
          },
          {
            id: 85,
            title: 'est quae libero',
            date: '2024-04-15 10:47:13'
          },
          {
            id: 84,
            title: 'blanditiis magni laudantium',
            date: '2024-04-15 23:24:12'
          },
          {
            id: 83,
            title: 'itaque ratione velit',
            date: '2024-04-11 10:23:53'
          },
          {
            id: 82,
            title: 'voluptatibus quae corrupti',
            date: '2024-04-16 04:45:36'
          },
          {
            id: 74,
            title: 'alias eum dolorem',
            date: '2024-04-15 15:38:42'
          },
          {
            id: 71,
            title: 'autem doloribus assumenda',
            date: '2024-04-01 05:57:43'
          },
          {
            id: 70,
            title: 'qui et maxime',
            date: '2024-04-21 22:23:10'
          },
          {
            id: 65,
            title: 'alias at nobis',
            date: '2024-04-04 12:51:46'
          },
          {
            id: 64,
            title: 'rerum vel aliquid',
            date: '2024-04-12 22:13:44'
          },
          {
            id: 63,
            title: 'aut omnis odio',
            date: '2024-04-11 11:12:16'
          },
          {
            id: 62,
            title: 'ut facilis incidunt',
            date: '2024-04-21 06:20:35'
          },
          {
            id: 61,
            title: 'a veritatis voluptatibus',
            date: '2024-04-15 07:09:14'
          },
          {
            id: 60,
            title: 'placeat quisquam maiores',
            date: '2024-04-21 01:49:52'
          },
          {
            id: 56,
            title: 'nesciunt eius ratione',
            date: '2024-04-25 19:05:41'
          },
          {
            id: 54,
            title: 'nemo ipsum eum',
            date: '2024-04-19 06:06:13'
          },
          {
            id: 52,
            title: 'quisquam commodi laborum',
            date: '2024-04-29 08:29:09'
          },
          {
            id: 49,
            title: 'ut perferendis qui',
            date: '2024-04-06 19:35:52'
          },
          {
            id: 48,
            title: 'non voluptatum voluptates',
            date: '2024-04-26 23:31:22'
          },
          {
            id: 45,
            title: 'explicabo saepe tenetur',
            date: '2024-04-13 10:16:13'
          },
          {
            id: 44,
            title: 'quam distinctio nesciunt',
            date: '2024-04-06 06:16:36'
          },
          {
            id: 39,
            title: 'ab et animi',
            date: '2024-04-18 08:04:24'
          },
          {
            id: 34,
            title: 'sint quidem vero',
            date: '2024-04-02 21:24:58'
          },
          {
            id: 32,
            title: 'est enim fugiat',
            date: '2024-04-04 14:01:05'
          },
          {
            id: 29,
            title: 'impedit omnis quibusdam',
            date: '2024-04-12 14:12:52'
          },
          {
            id: 27,
            title: 'et fuga consequatur',
            date: '2024-04-16 19:44:43'
          },
          {
            id: 26,
            title: 'libero id ad',
            date: '2024-04-13 00:55:21'
          },
          {
            id: 25,
            title: 'qui possimus nisi',
            date: '2024-04-10 03:19:34'
          },
          {
            id: 24,
            title: 'ut sunt quibusdam',
            date: '2024-04-24 07:34:42'
          },
          {
            id: 22,
            title: 'cumque iste voluptas',
            date: '2024-04-13 05:06:13'
          },
          {
            id: 20,
            title: 'et quae dicta',
            date: '2024-04-28 23:58:50'
          },
          {
            id: 17,
            title: 'dolorem quaerat aut',
            date: '2024-04-15 00:44:50'
          },
          {
            id: 15,
            title: 'veniam est ea',
            date: '2024-04-24 11:35:08'
          },
          {
            id: 13,
            title: 'quia tempora eveniet',
            date: '2024-04-04 01:00:29'
          },
          {
            id: 12,
            title: 'ut est est',
            date: '2024-04-06 23:25:22'
          },
          {
            id: 11,
            title: 'assumenda rerum deleniti',
            date: '2024-04-16 02:01:22'
          },
          {
            id: 9,
            title: 'qui voluptatem voluptatem',
            date: '2024-04-11 01:17:01'
          },
          {
            id: 8,
            title: 'placeat incidunt quos',
            date: '2024-04-02 04:45:00'
          },
          {
            id: 6,
            title: 'sint quis esse',
            date: '2024-04-22 23:32:37'
          },
          {
            id: 4,
            title: 'vero repellendus id',
            date: '2024-04-13 01:15:54'
          },
          {
            id: 2,
            title: 'recusandae ducimus consectetur',
            date: '2024-04-22 11:18:23'
          }
        ]
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
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f0f0f0;

  & h1 {
    margin: 0;
    padding: 16px;
    background-color: #f0f0f0;
  }

  & p {
    margin: 0;
    padding: 16px;
    background-color: #f0f0f0;
  }
}
</style>