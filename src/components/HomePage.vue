<template>
  <div id="home-page">
    <div class="container d-flex flex-row flex-wrap">
      <FilterComponent class="col-4" />
      <b-img-lazy
        v-bind="mainProps"
        src="https://img.freepik.com/premium-vector/big-family-riding-bikes-together-young-parents-with-kids-cycling-park-cute-mother-father-with-three-children-helmets-bicycles-flat-cartoon-vector-illustration_341509-2179.jpg?w=2000"
        alt="Image 1"
      ></b-img-lazy>
    </div>
  </div>
</template>
<script>
import { BImgLazy } from "bootstrap-vue";
import FilterComponent from "./filters/Filter.vue";
export default {
  name: "HomePage",
  components: { BImgLazy, FilterComponent },
  data() {
    return {
      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        blankColor: "#bbb",
        width: 600,
        height: 400,
        class: "my-5",
      },
    };
  },
};
</script>