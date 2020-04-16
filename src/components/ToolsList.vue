<template>
  <div>
    <section class="hero is-primary is-bold">
      <div class="container hero-body">
        <h1 class="title is-1 has-text-centered">
          Cloud Native Security Tools!
        </h1>
        <h2 class="subtitle has-text-centered">
          Curated list of security tools for Hackers & Builders!
        </h2>
        <div class="field has-addons">
          <input
            class="input is-rounded"
            v-model="search"
            type="text"
            placeholder="Search Here"
          />
        </div>
      </div>
    </section>

    <section class="filterBar">
      <label
        class="column checkbox"
        :class="{ active: selectedOS.includes('windows') }"
      >
        <input type="checkbox" value="windows" v-model="selectedOS" />
        <i class="fab fa-windows"></i>Windows
      </label>
      <label
        class="column checkbox"
        :class="{ active: selectedOS.includes('linux') }"
      >
        <input type="checkbox" value="linux" v-model="selectedOS" />
        <i class="fab fa-linux"></i>Linux
      </label>
      <label
        class="column checkbox"
        :class="{ active: selectedOS.includes('mac') }"
      >
        <input type="checkbox" value="mac" v-model="selectedOS" />
        <i class="fab fa-apple"></i>Mac OSX
      </label>
      <label
        class="column checkbox"
        :class="{ active: selectedAvailability.includes('opensource') }"
      >
        <input
          type="checkbox"
          value="opensource"
          v-model="selectedAvailability"
        />
        <i class="fas fa-laptop-code"></i>Open Source
      </label>
      <label
        class="column checkbox"
        :class="{ active: selectedAvailability.includes('free') }"
      >
        <input type="checkbox" value="free" v-model="selectedAvailability" />
        <i class="fas fa-coffee"></i>Free/Restricted
      </label>
      <label
        class="column checkbox"
        :class="{ active: selectedAvailability.includes('commercial') }"
      >
        <input
          type="checkbox"
          value="commercial"
          v-model="selectedAvailability"
        />
        <i class="fas fa-dollar-sign"></i>Commercial / Proprietary
      </label>
    </section>

    <section class="section body">
      <Tags
        :tagsList="tags"
        :selectedTags="selectedTags"
        v-on:selectTag="selectTag"
        v-on:clearTagSelection="clearTagSelection"
      />
      <div class="cardContainer">
        <div class="card" v-for="tool in filteredList" v-bind:key="tool.name">
          <header class="card-header">
            <div class="card-header-icon" aria-label="more options">
              <span
                class="icon"
                v-if="tool.availability.includes('opensource')"
                title="Open Source"
              >
                <i class="fas fa-laptop-code"></i>
              </span>
              <span
                class="icon"
                v-if="tool.availability.includes('free')"
                title="Free/Restricted"
              >
                <i class="fas fa-coffee"></i>
              </span>
              <span
                class="icon"
                v-if="tool.availability.includes('commercial')"
                title="Commercial/Proprietary"
              >
                <i class="fas fa-dollar-sign"></i>
              </span>
            </div>
            <p class="card-header-title is-centered" style="overflow: auto;">
              <a v-bind:href="tool.url" target="_blank">{{ tool.name }}</a>
            </p>
            <div class="card-header-icon" aria-label="more options">
              <span
                class="icon"
                v-if="tool.operating_systems.includes('windows')"
                title="Windows"
              >
                <i class="fab fa-windows"></i>
              </span>
              <span
                class="icon"
                v-if="tool.operating_systems.includes('linux')"
                title="Linux"
              >
                <i class="fab fa-linux"></i>
              </span>
              <span
                class="icon"
                v-if="tool.operating_systems.includes('mac')"
                title="Mac"
              >
                <i class="fab fa-apple"></i>
              </span>
            </div>
          </header>
          <div class="card-content" style="max-height: 200px; overflow: auto;">
            <div class="content has-text-centered">{{ tool.description }}</div>
          </div>
          <footer class="card-footer tags card-footer-item">
            <span
              class="tag is-primary"
              v-for="tag in tool.tags"
              v-bind:key="tag"
              >{{ tag }}</span
            >
          </footer>
        </div>
      </div>
      <div v-if="filteredList.length === 0">
        <H4>No tools found as per your filter</H4>
      </div>
    </section>
  </div>
</template>

<script>
import Tags from "./Tags";

export default {
  name: "Header",
  props: ["toolsData"],
  components: {
    Tags,
  },
  data() {
    return {
      search: "",
      selectedOS: [],
      selectedAvailability: [],
      selectedTags: [],
    };
  },
  computed: {
    tags() {
      const toolsList = this.toolsData.map((tools) => tools.tags).flat();
      return Array.from(new Set(toolsList));
    },
    filteredList() {
      return this.toolsData
        .filter((tools) => {
          // return [...this.toolsData, ...this.toolsData].filter(tools => {
          const allInOne =
            tools.name +
            tools.description +
            tools.availability +
            tools.operating_system +
            tools.license +
            tools.tags.join(" ");
          return allInOne
            .toLowerCase()
            .includes(this.search.toLowerCase().trim());
        })
        .filter((tools) => {
          // console.log(this.selectedOS);
          if (this.selectedOS.length == 0) {
            return true;
          }
          let osPresent = false;
          this.selectedOS.forEach((operating_systems) => {
            if (tools.operating_systems.includes(operating_systems)) {
              osPresent = true;
            }
          });
          return osPresent;
        })
        .filter((tools) => {
          if (this.selectedAvailability.length == 0) {
            return true;
          }
          let availabilityPresent = false;
          this.selectedAvailability.forEach((availability) => {
            if (tools.availability.includes(availability)) {
              availabilityPresent = true;
            }
          });
          return availabilityPresent;
        })
        .filter((tools) => {
          if (this.selectedTags.length) {
            return this.selectedTags.every((tag) => tools.tags.includes(tag));
          }
          return true;
        });
    },
  },

  methods: {
    selectTag(tag) {
      if (this.selectedTags.includes(tag)) {
        this.selectedTags = this.selectedTags.filter((item) => item !== tag);
      } else {
        this.selectedTags = [...this.selectedTags, tag];
      }
    },
    clearTagSelection() {
      this.selectedTags = [];
    },
  },
};
</script>

<style scoped>
.cardContainer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 20px;
  height: 0;
}
.card {
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(100, 100, 100, 0.1);
  transition: box-shadow ease-in 300ms;
  display: flex;
  flex-direction: column;
}
.card div {
  flex: 1;
}
.card footer {
  flex: unset;
}
.card:hover {
  box-shadow: 0 0 10px rgba(150, 150, 150, 0.35);
}
.tag {
  transition: background-color ease-in 400ms;
}
.card:hover .tag {
  background-color: #1ab9a1;
}

.filterBar {
  margin: 10px;
  box-shadow: 0 0 10px rgba(100, 100, 100, 0.2);
  border: 2px solid #1ab9a1;
  border-radius: 5px;
  display: flex;
  text-align: center;
  flex-wrap: wrap;
  background-color: white;
  color: var(--color-black);
}
.filterBar input[type="checkbox"] {
  display: none;
}
.filterBar label {
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}
.filterBar label:hover,
.filterBar label.active {
  background-color: #1ab9a1;
  color: white;
}
.filterBar label svg {
  margin-right: 5px;
}

.hero-body {
  padding: 2rem 1.5rem;
}
.subtitle {
  font-style: italic;
}

.section.body {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 15px;
}
@media screen and (max-width: 600px) {
  .section.body {
    grid-template-columns: 1fr;
  }
  .section.body > *:first-child {
    display: none;
  }
}
</style>
