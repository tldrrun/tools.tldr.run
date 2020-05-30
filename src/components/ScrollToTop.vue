<template>
  <div
    class="scrollToTop"
    v-on:click="scrollToTop"
    v-bind:class="{ top: isTop }"
  >
    ↑
  </div>
</template>

<script>
export default {
  data: () => ({
    isTop: true,
  }),
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    handleScroll() {
      this.isTop = window.pageYOffset < 250;
    },
  },
};
</script>

<style scoped>
.scrollToTop {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  font-weight: bold;
  font-size: 2rem;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  background-color: var(--yellow);
  box-shadow: 0 0 10px rgba(100, 100, 100, 0.2);
  opacity: 1;
  transition: opacity ease-in 300ms;
}
.top {
  opacity: 0;
}
</style>
