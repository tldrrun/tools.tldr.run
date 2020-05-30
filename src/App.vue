<template>
  <Home :toolsData="toolsData" />
</template>

<script>
// @ is an alias to /src
import Home from "@/pages/Home.vue";

export default {
  name: "App",
  components: {
    Home,
  },
  props: ["toolsData"],
};
</script>
