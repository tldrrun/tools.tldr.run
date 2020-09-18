<template>
  <div>
    <header class="hero is-bold">
      <div class="container hero-body">
        <h1 class="title is-1 has-text-centered has-text-white">
          Security Tools!
        </h1>
        <h2 class="subtitle has-text-centered has-text-white">
          Curated list of security tools for Hackers & Builders!
        </h2>

        <h2 class="title is-5 has-text-centered">
          <a
            class="button has-text-dark has-background-light"
            href="https://github.com/tldrrun/tools.tldr.run#contributing"
            target="_blank"
            >Submit your awesome tools 👍</a
          >
        </h2>

        <TwitterFollow />
        <SharingButtons />

        <br />
        <div class="field has-addons" ref="input">
          <span class="showOpenSidebar" v-on:click="openSidebar">
            <MenuIcon />
          </span>
          <input
            class="input is-rounded"
            type="text"
            placeholder="Search Here"
            v-on:input="setSearchTerm"
          />
        </div>
      </div>
    </header>

    <section class="filterBar">
      <label
        class="column checkbox"
        :class="{ active: selectedOS.includes('windows') }"
      >
        <input type="checkbox" value="windows" v-model="selectedOS" />
        <Windows />Windows
      </label>
      <label
        class="column checkbox"
        :class="{ active: selectedOS.includes('linux') }"
      >
        <input type="checkbox" value="linux" v-model="selectedOS" />
        <Linux />Linux
      </label>
      <label
        class="column checkbox"
        :class="{ active: selectedOS.includes('mac') }"
      >
        <input type="checkbox" value="mac" v-model="selectedOS" />
        <Mac />Mac OSX
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
        <OpenSource />Open Source
      </label>
      <label
        class="column checkbox"
        :class="{ active: selectedAvailability.includes('free') }"
      >
        <input type="checkbox" value="free" v-model="selectedAvailability" />
        <CoffeeCup />Free
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
        <Dollar />Commercial
      </label>
    </section>

    <section class="section body">
      <Tags
        :tagsList="tags"
        :selectedTags="selectedTags"
        v-on:select-tag="selectTag"
        v-on:clear-tag-selection="clearTagSelection"
        v-on:close-sidebar="closeSidebar"
        class="tabsList"
        :class="{ open: showSidebar }"
      />

      <ToolCard :filteredList="filteredList" />

      <div v-if="filteredList.length === 0">
        <h2 class="title is-2 has-text-white has-text-centered">
          No tools found as per your filter
        </h2>
      </div>
    </section>

    <ScrollToTop />
  </div>
</template>

<script>
// Components
import Tags from "../components/Tags";
import ScrollToTop from "../components/ScrollToTop";
import SharingButtons from "../components/SharingButtons";
import TwitterFollow from "../components/TwitterFollow";
import ToolCard from "../components/ToolCard";
// Icons
import CoffeeCup from "../icons/coffee-cup";
import Dollar from "../icons/dollar-icon";
import Linux from "../icons/linux-logo";
import Mac from "../icons/mac-logo";
import OpenSource from "../icons/open-source";
import Windows from "../icons/windows-logo";
import MenuIcon from "../icons/menu-icon";
// Third-party
import Fuse from "fuse.js";
import debounce from "lodash.debounce";

export default {
  name: "Header",
  props: ["toolsData"],
  components: {
    // Components
    Tags,
    ScrollToTop,
    SharingButtons,
    TwitterFollow,
    ToolCard,
    // Icons
    CoffeeCup,
    Dollar,
    Linux,
    Mac,
    OpenSource,
    Windows,
    MenuIcon,
  },
  data() {
    return {
      search: "",
      selectedOS: [],
      selectedAvailability: [],
      selectedTags: [],
      showSidebar: false,
      fuse: null,
    };
  },
  computed: {
    tags() {
      const toolsList = this.toolsData.map((tools) => tools.tags).flat();
      return Array.from(new Set(toolsList));
    },
    filteredList() {
      const toolsData =
        this.search === ""
          ? this.toolsData
          : this.fuse.search(this.search).map((toolsObj) => toolsObj.item);

      const returnData = toolsData
        .filter((tools) => {
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

      return returnData;
    },
  },
  mounted() {
    this.inputPosition =
      this.$refs.input.offsetTop + this.$refs.input.clientHeight;
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    this.fuse = new Fuse(this.toolsData, {
      keys: [{ name: "name", weight: 2 }, "description", "tags", "license"],
      threshold: 0.2,
      location: 0,
      distance: 10000,
    });
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    setSearchTerm: debounce(function(event) {
      this.search = event.target.value;
      if (event.target.value !== "") this.searchUsed();
    }, 250),
    handleScroll() {
      if (window.pageYOffset > this.inputPosition && window.innerWidth <= 600) {
        this.$refs.input.classList.add("sticky");
      } else {
        this.$refs.input.classList.remove("sticky");
      }
    },
    selectTag(tag) {
      if (this.selectedTags.includes(tag)) {
        this.selectedTags = this.selectedTags.filter((item) => item !== tag);
      } else {
        this.selectedTags = [...this.selectedTags, tag];
        this.tagsUsed();
      }
    },
    clearTagSelection() {
      this.selectedTags = [];
    },
    closeSidebar() {
      this.showSidebar = false;
    },
    openSidebar() {
      this.showSidebar = true;
    },
    searchUsed() {
      const gtag = window.gtag;
      if (gtag) {
        gtag("event", "Search", {
          event_category: "Type",
          event_label: "Used",
        });
      }
    },
    tagsUsed() {
      const gtag = window.gtag;
      if (gtag) {
        gtag("event", "Tags", {
          event_category: "Select",
          event_label: "Used",
        });
      }
    },
  },
};
</script>

<style scoped>
.filterBar {
  margin: 10px;
  box-shadow: 0 0 10px rgba(100, 100, 100, 0.2);
  border: 2px solid var(--yellow);
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
  white-space: nowrap;
}
.filterBar label.active {
  background-color: var(--yellow);
}
.filterBar label svg {
  margin-right: 5px;
  width: 20px;
  height: 20px;
}

.hero-body {
  padding: 2rem 1.5rem;
}
.subtitle {
  font-style: italic;
}

.section.body {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 20px;
}
@media screen and (max-width: 600px) {
  .section.body {
    grid-template-columns: 1fr;
    position: relative;
  }
  .section.body > .tabsList {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: 20px;
    background-color: var(--color-grey);
    z-index: 1;
    overflow: scroll;
    transform: translateX(-100%);
    transition: 250ms ease-in transform;
  }
  .section.body > .tabsList.open {
    transform: translateX(0);
  }
}
@media screen and (min-width: 600px) {
  .filterBar label:hover {
    background-color: var(--yellow);
  }
}

.showOpenSidebar {
  display: none;
  align-items: center;
  padding: 0 10px;
}
@media screen and (max-width: 600px) {
  .showOpenSidebar {
    display: flex;
  }
}

.sticky {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  padding: 10px;
  background: white;
  animation: fadeIn 250ms ease-in normal;
  animation-iteration-count: 1;
  color: black;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
