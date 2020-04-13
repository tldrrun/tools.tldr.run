import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

Vue.config.productionTip = false

const url = "/assets/main.json"

new Vue ({
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
      data: [],
      fields: ["name", "description", "tags", "operating_systems", "license", "availability", "github_url", "url"]
    }
  },

  mounted(){
    let self = this
    axios({
      method: 'get',
      url: url
    }).then(function(response){
      // console.log(response);
      self.apps.files = response.data;
      self.loadfiles()
    })
  },
  methods: {
    loadfiles(){
      let self = this
      this.apps.files.forEach(filename => {
        axios({
          methods: 'get',
          url: "/assets/tools/" + filename
        }).then(function(response){
          self.apps.data = self.apps.data.concat(response.data)
        })
      });
    }
  }
  
}).$mount('#app')
