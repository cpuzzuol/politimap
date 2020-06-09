import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import moment from 'moment'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './assets/scss/styles.scss'

Vue.config.productionTip = false

const opts = {
  icons: {
    iconfont: 'mdi'
  },
}
Vue.use(Vuetify)
axios.defaults.headers.common['X-Api-Key'] = process.env.VUE_APP_LAMBDA_API_KEY;
Vue.prototype.$http = axios
Vue.prototype.$moment = moment

new Vue({
  router,
  store,
  vuetify: new Vuetify(opts),
  render: h => h(App)
}).$mount('#app')
