import Vue from 'vue'
import App from './App.vue'
import data from "../public/assets/main.json"

Vue.config.productionTip = false

new Vue({
  render(createElement) {
    return createElement(App, {
      props: {
        toolsData: this.apps.data
      }
    })
  },

  data: {
    apps: {
      files: [],
      data: data,
      fields: ["name", "description", "tags", "operating_systems", "license", "availability", "github_url", "url"]
    }
  }
}).$mount('#app')
