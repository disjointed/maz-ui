import Vue from 'vue'
import App from './App.vue'
import './assets/scss/main.scss'
import './components'
import './filters'

import router from './router'

import VueMazelUi from './lib'
import VueHighlightJS from 'vue-highlightjs'

import javascript from 'highlight.js/lib/languages/javascript'
import bash from 'highlight.js/lib/languages/bash'
import 'highlight.js/styles/default.css'

import store from './store'

Vue.use(VueHighlightJS, {
  languages: {
    javascript,
    bash
  }
})
Vue.use(VueMazelUi)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
