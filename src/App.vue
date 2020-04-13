<template>
  <div class="app">
    <ToolsList :toolsData="toolsData"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ToolsList from "@/components/ToolsList.vue";

export default {
  name: "App",
  components: {
    ToolsList,
  },
  props: ['toolsData']
};
</script>
