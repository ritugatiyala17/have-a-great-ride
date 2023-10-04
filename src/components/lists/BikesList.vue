<template>
  <div class="bikes-page h-100">
    <b-modal ref="add-bike-modal" hide-footer id="add-bike" title="AddBike">
      <b-form
        class="container justify-content-center w-auto"
        @submit.prevent="addNewBike"
      >
        <b-form-group
          id="bike-model-id"
          class="pb-3"
          label="Model"
          label-for="bike-model"
        >
          <b-form-select
            id="bike-model"
            v-model="details.model"
            :options="bikeModels"
            type="text"
            placeholder="Enter model"
            class="form-control form-control-sm"
            required
          >
            <template #first>
              <b-form-select-option :value="null" disabled
                >Select model</b-form-select-option
              >
            </template>
          </b-form-select>
        </b-form-group>

        <b-form-group
          id="bike-color-id"
          class="pb-3"
          label="Color"
          label-for="bike-color"
        >
          <b-form-select
            id="bike-color"
            v-model="details.color"
            :options="bikeColors"
            type="text"
            placeholder="Enter color"
            class="form-control form-control-sm"
            required
          >
            <template #first>
              <b-form-select-option :value="null" disabled
                >Select color</b-form-select-option
              >
            </template>
          </b-form-select>
        </b-form-group>
        <b-form-group
          id="bike-location-id"
          class="pb-3"
          label="Location"
          label-for="bike-location"
        >
          <b-form-select
            id="bike-location"
            v-model="details.location"
            :options="locations"
            type="text"
            placeholder="Enter location"
            class="form-control form-control-sm"
            required
          >
            <template #first>
              <b-form-select-option :value="null" disabled
                >Select location</b-form-select-option
              >
            </template>
          </b-form-select>
        </b-form-group>
        <b-form-group
          id="bike-isAvailable-id"
          class="pb-3"
          label="Bike Availability"
          label-for="bike-isAvailable"
        >
          <b-form-checkbox id="bike-isAvailable" v-model="details.isAvailable">
          </b-form-checkbox>
          <span class="form-input-info"
            >(Unselect incase the bike is not immediately available.)</span
          >
        </b-form-group>
        <b-form-group
          id="bike-image-id"
          class="pb-3"
          label="Image"
          label-for="bike-image"
        >
          <b-form-input
            id="bike-image"
            v-model="details.image"
            type="text"
            placeholder="Add image"
            class="form-control form-control-sm"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" class="btn-outline bg-brand m-2">Add</b-button>
      </b-form>
    </b-modal>
    <LoadingComponent v-if="bikesListStatus == 'loading'" />
    <ErrorComponent
      v-else-if="bikesListStatus == 'error'"
      :content="bikesListError"
    />
    <div v-else class="h-100">
      <div
        class="
          container
          mb-3
          mt-3
          mx-1
          d-flex
          justify-content-between
          align-items-start
        "
      >
        <div class="filters-tabs">
          <b-badge
            class="mr-2 px-2 py-1 badge-filters border-brand text-brand"
            pill
            >{{ bikesList.length }}
            {{ bikesList.length > 1 ? "bikes" : "bike" }} available</b-badge
          >
          <b-badge
            v-for="(filter, index) in Object.keys(bikeFilters)"
            :key="index"
            class="mr-2 px-2 py-1 badge-filters border-brand text-brand"
            pill
            v-show="bikeFilters[filter]"
          >
            <template v-if="showIsAvailableBikesFilterTag(filter)">
              {{ filter }}: {{ bikeFilters[filter]
              }}{{ filter == "rating" ? "+" : "" }}
            </template>
          </b-badge>
        </div>
        <b-button
          v-show="isUserManager"
          v-b-modal.modal-lg.add-bike
          class="btn btn-sm btn-outline-brand px-3"
          >Add Bike</b-button
        >
      </div>
      <EmptyComponent v-if="!bikesList.length" />

      <b-container v-else class="bikes-list flex-basis">
        <b-row>
          <b-col
            v-for="bike of bikesList"
            :key="bike.id"
            class="border rounded p-0 col-3 mx-3 mb-4"
          >
            <BikesListItem :bike="bike" />
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import {
  BButton,
  BModal,
  VBModal,
  BForm,
  BFormGroup,
  BFormInput,
  BContainer,
  BRow,
  BCol,
  BBadge,
  BFormSelect,
  BFormSelectOption,
  BFormCheckbox,
} from "bootstrap-vue";
import SearchBar from "../filters/SearchBar.vue";
import BikesListItem from "./BikesListItem.vue";
import EmptyComponent from "../states/Empty.vue";
import LoadingComponent from "../states/Loading.vue";
import ErrorComponent from "../states/Error.vue";
export default {
  name: "BikesList",
  components: {
    BButton,
    BModal,
    BForm,
    BFormGroup,
    BFormInput,
    BContainer,
    BRow,
    BCol,
    BBadge,
    BFormSelect,
    BFormSelectOption,
    BFormCheckbox,
    SearchBar,
    BikesListItem,
    EmptyComponent,
    LoadingComponent,
    ErrorComponent,
  },
  directives: { "b-modal": VBModal },
  data() {
    return {
      details: {
        model: null,
        location: null,
        color: null,
        image: null,
        ratingsCount: 0,
        rating: 0,
        isAvailable: true,
      },
      locations: ["Mumbai", "Delhi", "Indore", "Ahmedabad"],
      bikeModels: ["Activa", "Jupiter", "Eterno"],
      bikeColors: ["black", "grey", "yellow", "white"],
    };
  },
  created() {
    this.getBikesList(this.bikeFilters);
  },
  computed: {
    ...mapState({
      bikesList: (state) => state.bikesList,
      bikeFilters: (state) => state.bikeFilters,
      bikesListStatus: (state) => state.bikesListStatus,
      bikesListError: (state) => state.bikesListError,
    }),
    ...mapGetters(["isDateFilterSelected", "isUserManager"]),
  },
  methods: {
    ...mapActions(["getBikesList", "addBike", "getBookingsList"]),
    addNewBike() {
      let details = Object.assign(this.details);
      if (!this.details.image) {
        details.image =
          "https://d3vp2rl7047vsp.cloudfront.net/bike_models/images/000/000/233/medium/HONDA_ACTIVA_5G.png?1660731811";
      }
      this.addBike(details);
      this.hideAddBikeModal();
      this.resetAddBikeDetails();
    },
    showAddBikeModal() {
      this.$refs["add-bike-modal"].show();
    },
    hideAddBikeModal() {
      this.$refs["add-bike-modal"].hide();
    },
    resetAddBikeDetails() {
      this.details = {
        model: null,
        location: null,
        color: null,
        image: null,
        ratingsCount: 0,
        rating: 0,
        isAvailable: true,
      };
    },
    showIsAvailableBikesFilterTag(filter) {
      if (this.isUserManager) {
        return true;
      }
      return filter != "isAvailable";
    },
  },
  watch: {
    bikeFilters: {
      deep: true,
      handler(value) {
        this.getBikesList(value);
      },
    },
  },
};
</script>
<style scoped>
.badge-filters {
  margin-right: 0.5rem;
}
</style>