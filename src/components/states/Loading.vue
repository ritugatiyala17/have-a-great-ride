<template>
  <div
    class="
      loading-component
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
    <div><i class="fas fa-spinner fa-spin text-brand"></i></div>
  </div>
</template>
<script>
export default {
  name: "LoadingComponent",
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
};
</script>
<style scoped>
.loading-component {
  max-height: 30rem !important;
}
</style>