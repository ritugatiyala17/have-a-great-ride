<template>
  <div>
    <label for="bike-rating">Rating</label>
    <b-form-rating
      id="bike-rating"
      v-model="filters.rating"
      precision="2"
      inline
      no-border
      variant="warning"
    ></b-form-rating>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { BFormRating } from "bootstrap-vue";

export default {
  name: "BikeRating",
  computed: {
    ...mapState({
      bikeFilters: (state) => state.bikeFilters,
    }),
    filters() {
      return this.bikeFilters;
    },
  },
  components: {
    BFormRating,
  },

  watch: {
    rating(value) {
      this.$emit("filterByRating", value);
    },
  },
};
</script>