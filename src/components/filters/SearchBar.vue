<template>
  <div>
    <b-input-group class="mt-3 w-75">
      <b-form-input
        id="search-bar"
        v-model="searchedString"
        placeholder="Search by model, color, location..."
        disabled
      ></b-form-input>
      <!-- <b-input-group-append class="border px-2">&#x1f50d;</b-input-group-append> -->
    </b-input-group>
  </div>
</template>
<script>
import {
  BInputGroup,
  BInputGroupAppend,
  BFormInput,
  BInputGroupText,
  BIcon,
} from "bootstrap-vue";
export default {
  name: "SearchBar",
  data() {
    return {
      searchedString: "",
    };
  },
  components: {
    BInputGroup,
    BInputGroupAppend,
    BFormInput,
    BInputGroupText,
    BIcon,
  },
};
</script>