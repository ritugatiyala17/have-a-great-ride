<template>
  <div
    class="
      error-component
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
      {{ content || "Error" }}
    </div>
    <button class="btn btn-sm bg-brand" @click="tryAgain">Try Again</button>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "EmptyComponent",
  props: {
    content: {
      type: String,
      default: "",
    },
    callToAction: {
      type: Boolean,
      default: false,
    },
    callToActionText: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapState({
      filters: (state) => state.filters,
    }),
  },
  methods: {
    ...mapActions(["setBikesList"]),
    tryAgain() {
      this.setBikesList(this.filters);
    },
  },
};
</script>
<style scoped>
.error-component {
  max-height: 30rem !important;
}
</style>