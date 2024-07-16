import VueCalendar from './components/VueCalendar.vue'
import NavigationController from './components/core/NavigationController.vue'
import ViewSelector from './components/core/ViewSelector.vue'
import DateContainer from './components/core/month/DateContainer.vue'
import EventCard from './components/core/month/EventCard.vue'
import MonthView from './components/core/month/MonthView.vue'
import Icon from './components/core/icons/Icon.vue'
import './assets/main.css'

export default function install(Vue: any) {
  Vue.component('VueCalendar', VueCalendar);
  Vue.component('NavigationController', NavigationController);
  Vue.component('ViewSelector', ViewSelector);
  Vue.component('DateContainer', DateContainer);
  Vue.component('EventCard', EventCard);
  Vue.component('MonthView', MonthView);
  Vue.component('Icon', Icon);
}

export { VueCalendar, NavigationController, ViewSelector, DateContainer, EventCard, MonthView, Icon }