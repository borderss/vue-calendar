import type { Event } from './types'

interface DateInfo {
  date: Date
  isToday: boolean
  isCurrentMonth: boolean
  isWeekend: boolean
  isPast: boolean
  isFuture: boolean
}

interface PageDayData {
  date: DateInfo
  dateEvents: Event[]
}

export class DateUtils {
  static instance: DateUtils
  static getInstance(): DateUtils {
    if (!DateUtils.instance) {
      DateUtils.instance = new DateUtils()
    }
    return DateUtils.instance
  }

  generatePageDayData(now: Date, monthOffset: number, actualEvents: Event[]): PageDayData[] {
    const pageDayData: PageDayData[] = []
    const firstDay = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1)
    const lastDay = new Date(now.getFullYear(), now.getMonth() + monthOffset + 1, 0)
    const prevMonthDays = DateUtils.instance.getPrevMonthDays(firstDay)
    const nextMonthDays = DateUtils.instance.getNextMonthDays(lastDay)

    pageDayData.push(...DateUtils.instance.generatePrevMonthDays(now, monthOffset, prevMonthDays))
    pageDayData.push(...DateUtils.instance.generateCurrentMonthDays(now, monthOffset, lastDay, actualEvents))
    pageDayData.push(...DateUtils.instance.generateNextMonthDays(now, monthOffset, nextMonthDays))

    return pageDayData
  }

  private getPrevMonthDays(firstDay: Date): number {
    const firstWeekday = firstDay.getDay()
    return (firstWeekday + 6) % 7
  }

  private getNextMonthDays(lastDay: Date): number {
    return 42 - lastDay.getDate()
  }

  private generatePrevMonthDays(now: Date, monthOffset: number, prevMonthDays: number): PageDayData[] {
    const prevMonthData: PageDayData[] = []
    for (let i = 1; i <= prevMonthDays; i++) {
      const monthDayCount = new Date(now.getFullYear(), now.getMonth() + monthOffset, 0).getDate()
      const date = new Date(now.getFullYear(), now.getMonth() + monthOffset - 1, monthDayCount - prevMonthDays + i)
      prevMonthData.push({
        date: {
          date,
          isToday: false,
          isCurrentMonth: false,
          isWeekend: date.getDay() === 0 || date.getDay() === 6,
          isPast: date < now,
          isFuture: date > now
        },
        dateEvents: []
      })
    }
    return prevMonthData
  }

  private generateCurrentMonthDays(now: Date, monthOffset: number, lastDay: Date, actualEvents: Event[]): PageDayData[] {
    const currentMonthData: PageDayData[] = []
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(now.getFullYear(), now.getMonth() + monthOffset, i)
      currentMonthData.push({
        date: {
          date,
          isToday: date.toDateString() === now.toDateString(),
          isCurrentMonth: true,
          isWeekend: date.getDay() === 0 || date.getDay() === 6,
          isPast: date < now,
          isFuture: date > now
        },
        dateEvents: actualEvents.filter(event => {
          const eventDate = new Date(event.date)
          return eventDate.toDateString() === date.toDateString()
        })
      })
    }
    return currentMonthData
  }

  private generateNextMonthDays(now: Date, monthOffset: number, nextMonthDays: number): PageDayData[] {
    const nextMonthData: PageDayData[] = []
    for (let i = 1; i <= nextMonthDays; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() + monthOffset + 1, i)
      nextMonthData.push({
        date: {
          date,
          isToday: false,
          isCurrentMonth: false,
          isWeekend: date.getDay() === 0 || date.getDay() === 6,
          isPast: date < now,
          isFuture: date > now
        },
        dateEvents: []
      })
    }
    return nextMonthData
  }
}