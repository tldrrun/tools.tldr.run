<template>
    <div>
        <section class="hero is-primary is-bold">
            <div class="container hero-body">
                <h1 class="title is-1">
                    Cloud Native Security Tools!
                </h1>
                <h2 class="subtitle">
                    Curated list of security tools for Hackers & Builders!
                </h2>
                <div class="field has-addons">
                    <input class="input is-rounded" v-model="search" type="text" placeholder="Search Here"/>
                </div>
        
                <div class="container columns">
                    <label class="column checkbox">
                        <input type="checkbox" value="windows" v-model="selectedOS">
                        Windows
                    </label>
                    <label class="column checkbox">
                        <input type="checkbox" value="linux" v-model="selectedOS">
                        Linux
                    </label>
                    <label class="column checkbox">
                        <input type="checkbox" value="mac" v-model="selectedOS">
                        Mac OSX
                    </label>
                </div>
                <hr />
                <div class="container columns">
                    <label class="column checkbox">
                        <input type="checkbox" value="opensource" v-model="selectedAvailability">
                        Open Source
                    </label>
                    <label class="column checkbox">
                        <input type="checkbox" value="free" v-model="selectedAvailability">
                        Free/Restricted
                    </label>
                    <label class="column checkbox">
                        <input type="checkbox" value="commercial" v-model="selectedAvailability">
                        Commercial/Proprietary
                    </label>
                </div>

            </div>
        </section>
    
        <section class="section">
            <!-- <div class="hero is-white-bis is-bold column card container is-3 is-mobile">
            <div class="hero-body" style="overflow-y:auto; overflow-x:hidden">
            <h2 class="content is-large">Filter by Tags</h2>
            <ul>
            <li>This is amazing stuff</li>

            <label class="column checkbox">
                <input type="checkbox">
                Opensource1
            </label>
            <label class="column checkbox">
                <input type="checkbox">
                Opensource2
            </label>
                        <label class="column checkbox">
                <input type="checkbox">
                Opensource3
            </label>
            </ul>
            </div>
            </div> -->

            <div class="columns is-multiline is-mobile">
                <div class="column is-4 card" v-for="tool in filteredList" v-bind:key="tool.name">
                    <header class="card-header">
                        <div class="card-header-icon" aria-label="more options">
                            <span class="icon" v-if="tool.availability.includes('opensource')" title="Open Source">
                                <i class="fas fa-laptop-code"></i>
                            </span>
                            <span class="icon" v-if="tool.availability.includes('free')" title="Free/Restricted">
                                <i class="fas fa-coffee"></i>
                            </span>
                            <span class="icon" v-if="tool.availability.includes('commercial')" title="Commercial/Proprietary">
                                <i class="fas fa-dollar-sign"></i>
                            </span>
                        </div>
                            <p class="card-header-title is-centered" style="overflow: auto;">
                            {{ tool.name }}
                            </p>
                        <div class="card-header-icon" aria-label="more options">
                            <span class="icon" v-if="tool.operating_systems.includes('windows')" title="Windows">
                                <i class="fab fa-windows"></i>
                            </span>
                            <span class="icon" v-if="tool.operating_systems.includes('linux')" title="Linux">
                                <i class="fab fa-linux"></i>
                            </span>
                            <span class="icon" v-if="tool.operating_systems.includes('mac')" title="Mac">
                                <i class="fab fa-apple"></i>
                            </span>
                        </div>
                    </header>
                    <div class="card-content" style="max-height: 200px; overflow: auto;">
                        <div class="content has-text-centered">
                            {{ tool.description }}
                        </div>
                    </div>
                    <footer class="card-footer tags card-footer-item">
                        <span class="tag is-info" v-for="tag in tool.tags" v-bind:key="tag">{{ tag }}</span>
                    </footer>
                </div>
            </div>
        </section>
    </div>
</template>


<script>

export default {
  name: "Header",
  props: ['toolsData'],
  data() {
      return {
        search: "",
        selectedOS: [],
        selectedAvailability: [],
      }
  },
  computed: {
    filteredList() {
    return this.toolsData.filter(tools => {
    // return [...this.toolsData, ...this.toolsData].filter(tools => {
      const allInOne = tools.name + tools.description + tools.availability + tools.operating_system + tools.license + tools.tags.join(' ');
      return allInOne.toLowerCase().includes(this.search.toLowerCase())
    }).filter(tools=> {
        // console.log(this.selectedOS);
        if(this.selectedOS.length == 0) {
            return true;
        }
        let osPresent = false;
        this.selectedOS.forEach(operating_systems => {
            if (tools.operating_systems.includes(operating_systems)) {
                osPresent = true;
            }
        })
        return osPresent;
    }).filter(tools=> {
        if(this.selectedAvailability.length == 0) {
            return true;
        }
        let availabilityPresent = false;
        this.selectedAvailability.forEach(availability => {
            if (tools.availability.includes(availability)) {
                availabilityPresent = true;
            }
        })
        return availabilityPresent; 
    })
  }
  },

  methods: {
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->