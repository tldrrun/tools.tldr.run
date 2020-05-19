<template>
  <div>
    <h4 class="is-center-text is-bold is-dark">
      <span>Tags List</span>
      <span class="closeTags" v-on:click="closeSidebar">X</span>
    </h4>
    <div>
      <div
        class="search-bar"
        v-bind:class="{ single: selectedTags.length <= 0 }"
      >
        <input
          class="input is-rounded"
          v-model="search"
          type="text"
          placeholder="Search Tags"
        />
        <div
          v-if="selectedTags.length > 0"
          title="Clear all selection"
          v-on:click="clearSelection"
        >
          X
        </div>
      </div>
      <div class="tags is-grouped is-grouped-multiline">
        <div
          class="tool tag is-black"
          v-for="tag in filteredTagsList"
          v-bind:key="tag"
          v-bind:class="{ active: selectedTags.includes(tag) }"
          v-on:click="selectTag(tag)"
        >
          {{ tag }}
          <span class="delete-option">X</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["tagsList", "selectedTags"],
  methods: {
    selectTag(tagName) {
      this.$emit("selectTag", tagName);
    },
    clearSelection() {
      this.$emit("clearTagSelection");
    },
    closeSidebar() {
      this.$emit("closeSidebar");
    },
  },
  data() {
    return {
      search: "",
    };
  },
  computed: {
    filteredTagsList() {
      return this.tagsList.filter((tag) => {
        if (this.search) {
          return tag.toLowerCase().includes(this.search.toLowerCase().trim());
        }
        return true;
      });
    },
  },
};
</script>

<style scoped>
h4 {
  font-size: 18px;
  padding: 5px 10px;
  background-color: var(--yellow);
  border-radius: 5px;
  border: 2px solid var(--yellow);
  user-select: none;
  margin-bottom: 10px;
  font-weight: bold;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tool {
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-bottom: 5px;
}
.tool.active {
  background-color: var(--yellow);
  color: black;
}
.tool .delete-option {
  padding: 2px 5px;
}
.tool:not(.active) .delete-option {
  display: none;
}
.search-bar {
  margin-bottom: 5px;
  display: grid;
  grid-template-columns: 1fr 30px;
  grid-gap: 5px;
}
.search-bar.single {
  grid-template-columns: 1fr;
}
.search-bar input {
  border-radius: 5px;
  padding: 2px 10px;
}
.search-bar div {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
}
.search-bar div:hover {
  background-color: white;
  border-radius: 5px;
  color: var(--color-grey);
}
@media screen and (min-width: 600px) {
  .tool:hover {
    background-color: var(--yellow);
    color: black;
  }
}
.closeTags {
  display: none;
  font-weight: bold;
  padding: 5px 10px;
}
@media screen and (max-width: 600px) {
  .closeTags {
    display: inline-block;
  }
  .tool {
    font-size: 1rem;
  }
}
</style>
