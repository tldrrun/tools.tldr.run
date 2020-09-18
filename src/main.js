import { createApp, h } from "vue";
import App from "./App.vue";
import data from "../public/assets/main.json";

const app = createApp({
  render() {
    return h(App, {
      toolsData: this.apps.data,
    });
  },

  data: () => ({
    apps: {
      files: [],
      data: data,
      fields: [
        "name",
        "description",
        "tags",
        "operating_systems",
        "license",
        "availability",
        "github_url",
        "url",
      ],
    },
  }),
});

app.config.productionTip = false;

app.mount("#app");
