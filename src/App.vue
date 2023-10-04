<template>
  <div id="app">
    <div class="app-container">
      <NavBar />
      <div v-if="isFiltersLayout" class="container mt-5 d-flex flex-row">
        <div class="col-3">
          <FilterComponent class="mt-3" />
        </div>
        <div class="col-9">
          <div class="ml-3 h-100">
            <router-view></router-view>
          </div>
        </div>
      </div>
      <div v-else class="container mt-5">
        <router-view></router-view>
      </div>
    </div>

    <Footer class="app-footer" />
  </div>
</template>

<script>
import NavBar from "@/components/layouts/NavBar.vue";
import FilterComponent from "./components/filters/Filter.vue";
import Footer from "@/components/layouts/Foooter.vue";
export default {
  name: "App",
  components: {
    NavBar,
    FilterComponent,
    Footer,
  },
  computed: {
    isFiltersLayout() {
      return this.$route.meta.layout === "filters";
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: ghostwhite;
}
</style>
<style scoped>
.ml-3 {
  margin-left: 1rem;
}
.app-container {
  min-height: 93.5vh;
  display: flex;
  flex-direction: column;
}
.app-footer {
  margin-top: auto;
}
</style>
