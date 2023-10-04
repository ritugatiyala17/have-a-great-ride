<template>
  <div
    class="
      empty-component
      container
      d-flex
      flex-column
      justify-content-center
      align-items-center
      w-100
      h-100
      border
      bg-white
      mx-4
      rounded
    "
  >
    <div>
      We can't find what you are looking for. Please use different filters
    </div>
    <span v-if="!isDateFilterSelected">
      Select pickup date and dropoff date
    </span>
    <button v-else class="btn btn-sm bg-brand" @click="clearFilters">
      Clear filters
    </button>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "EmptyComponent",
  computed: {
    ...mapGetters(["isDateFilterSelected"]),
  },
  methods: {
    ...mapActions(["resetBikeFiltersAction"]),
    clearFilters() {
      this.resetBikeFiltersAction();
    },
  },
};
</script>
<style scoped>
.empty-component {
  max-height: 30rem !important;
}
</style>