<template>
  <div class="cardContainer" v-if="filteredList.length > 0">
    <div class="card" v-for="tool in filteredList" v-bind:key="tool.name">
      <div class="card-header">
        <div class="card-header-icon" aria-label="more options">
          <span
            class="icon"
            v-if="tool.availability.includes('opensource')"
            title="Open Source"
          >
            <OpenSource />
          </span>
          <span
            class="icon"
            v-if="tool.availability.includes('free')"
            title="Free"
          >
            <CoffeeCup />
          </span>
          <span
            class="icon"
            v-if="tool.availability.includes('commercial')"
            title="Commercial"
          >
            <Dollar />
          </span>
        </div>
        <p class="card-header-title is-centered" style="overflow: auto;">
          <a
            v-bind:href="tool.url"
            target="_blank"
            v-on:click="triggerOpenTool(tool.name)"
            >{{ tool.name }}</a
          >
        </p>
        <div class="card-header-icon" aria-label="more options">
          <span
            class="icon"
            v-if="tool.operating_systems.includes('windows')"
            title="Windows"
          >
            <Windows />
          </span>
          <span
            class="icon"
            v-if="tool.operating_systems.includes('linux')"
            title="Linux"
          >
            <Linux />
          </span>
          <span
            class="icon"
            v-if="tool.operating_systems.includes('mac')"
            title="Mac"
          >
            <Mac />
          </span>
        </div>
      </div>
      <div class="card-content" style="max-height: 200px; overflow: auto;">
        <div class="content has-text-centered">{{ tool.description }}</div>
      </div>
      <div class="card-footer tags card-footer-item">
        <span class="tag" v-for="tag in tool.tags" v-bind:key="tag">{{
          tag
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// Icons
import CoffeeCup from "../icons/coffee-cup";
import Dollar from "../icons/dollar-icon";
import Linux from "../icons/linux-logo";
import Mac from "../icons/mac-logo";
import OpenSource from "../icons/open-source";
import Windows from "../icons/windows-logo";

export default {
  props: ["filteredList"],
  components: {
    CoffeeCup,
    Dollar,
    Linux,
    Mac,
    OpenSource,
    Windows,
  },
  methods: {
    triggerOpenTool(toolName) {
      const gtag = window.gtag;
      if (gtag) {
        gtag("event", "Open A Tool", {
          event_category: "Click",
          event_label: toolName,
        });
      }
    },
  },
};
</script>

<style scoped>
.cardContainer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 20px;
  height: fit-content;
}
.card {
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(100, 100, 100, 0.1);
  transition: box-shadow ease-in 300ms;
  display: flex;
  flex-direction: column;
}
.card div.card-content {
  flex: 1;
}
.card .card-footer {
  flex: unset;
}
.card:hover {
  box-shadow: 0 0 10px rgba(150, 150, 150, 0.35);
}
.tag {
  transition: background-color ease-in 400ms;
  background-color: var(--yellow);
}
.card:hover .tag {
  background-color: var(--yellow-dark);
}
.icon svg {
  margin-right: 5px;
  width: 20px;
  height: 20px;
}
</style>
