interface Event {
  title: string
  date: Date | string
  startTime?: string
  endTime?: string
  allDay?: boolean
  color?: 'blue' | 'green' | 'red' | 'yellow'
  [key: string]: any // allow extra attributes for custom implementations
}

type ViewType = 'day' | 'week' | 'month'

interface CalendarOptions {
  events?: Event[]
  defaultView?: ViewType
  showViewSelector?: boolean
  showNavigation?: boolean
  mobileBreakpointPx?: number
  forceMobile?: boolean
  forceDesktop?: boolean
  locale?: string
  colors?: {
    containerBg?: string
    primaryBg?: string
    primaryBgText?: string
    secondaryBg?: string
    textPrimary?: string
    textSecondary?: string
    dateSelectedColor?: string
    dateBackground?: string
    dateBackgroundNotThisWeek?: string
    scrollbarColor?: string
  }

  onEventClick?: (event: Event) => void
  onViewChange?: (view: ViewType) => void
  onNavigationChange?: (date: Date) => void
}

interface CalendarDate {
  date: Date
  isToday: boolean
  isCurrentMonth: boolean
  isWeekend: boolean
  isPast: boolean
  isFuture: boolean
}

export type {
  Event,
  CalendarDate,
  CalendarOptions,
}