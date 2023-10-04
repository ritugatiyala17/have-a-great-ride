<template>
  <div class="filter-component border rounded px-5 py-4 justify-content-left">
    <b-form class="container justify-content-center w-auto">
      <div v-show="!isTabUsers">
        <label for="date-range-picker-start" class="filter-form-label"
          >Pickup Date</label
        >
        <b-form-datepicker
          ref="pickupDateRef"
          id="date-range-picker-start"
          v-model="filters.pickupDate"
          class="mb-2 form-control form-control-sm"
          :min="getToday"
          :date-disabled-fn="dateStartDisabled"
          size="sm"
          label-no-date-selected="Select pickup date"
          required
        ></b-form-datepicker>
        <label for="date-range-picker-end" class="filter-form-label"
          >Dropoff Date</label
        >
        <b-form-datepicker
          ref="dropoffDateRef"
          id="date-range-picker-end"
          v-model="filters.dropoffDate"
          class="mb-2 form-control form-control-sm"
          size="sm"
          :disabled="!filters.pickupDate"
          :date-disabled-fn="disabledEndDate"
          label-no-date-selected="Select dropoff date"
          required
        ></b-form-datepicker>
      </div>

      <div v-show="isTabUsers">
        <div v-show="isTabUsers" class="mb-2 filter-form-label cursor-pointer">
          <label for="show-users-who-reserved" class="cursor-pointer"
            >Only show users who ever reserved</label
          >
          <b-form-checkbox
            id="show-users-who-reserved"
            v-model="showOnlyUsersWhoReserved"
            size="sm"
            class="display-inline"
            @change="onToggleUserFilter"
          >
          </b-form-checkbox>
        </div>
      </div>
      <div
        class="mb-2 filter-form-label"
        v-show="!isTabBookings && !isTabUsers"
      >
        <label for="bike-location">Location</label>
        <b-form-select
          id="bike-location"
          v-model="filters.location"
          :options="locations"
          size="sm"
          class="form-control form-control-sm"
        >
          <template #first>
            <b-form-select-option :value="null" disabled
              >Select location</b-form-select-option
            >
          </template>
        </b-form-select>
      </div>

      <div v-show="showAdditionalFilters">
        <div v-show="isUserManager" class="mb-2 filter-form-label">
          <label for="bike-isAvailable" class="cursor-pointer"
            >Show Available Bikes</label
          >
          <b-form-checkbox
            id="bike-isAvailable"
            v-model="filters.isAvailable"
            size="sm"
            class="display-inline"
          >
          </b-form-checkbox>
        </div>
        <Rating
          class="mb-2 filter-form-label"
          @filterByRating="filterByRating"
        />
        <div class="mb-2">
          <label for="bike-model" class="filter-form-label">Model</label>
          <b-form-select
            id="bike-model"
            v-model="filters.model"
            :options="bikeModels"
            size="sm"
            class="form-control form-control-sm"
          >
            <template #first>
              <b-form-select-option :value="null" disabled
                >Select model</b-form-select-option
              >
            </template>
          </b-form-select>
        </div>
        <div class="mb-3">
          <label for="bike-color" class="filter-form-label">Color</label>
          <b-form-select
            id="bike-color"
            v-model="filters.color"
            :options="bikeColors"
            size="sm"
            class="form-control form-control-sm"
          >
            <template #first>
              <b-form-select-option :value="null" disabled
                >Select color</b-form-select-option
              >
            </template>
          </b-form-select>
        </div>
      </div>
      <div class="d-flex flex-row justify-content-between align-items-center">
        <button
          v-show="showFindBikes"
          :disabled="!checkRequiredFields"
          class="btn btn-sm bg-brand mb-2 px-3"
          @click="findBikes"
        >
          Find Bikes
        </button>
        <button
          v-show="!isTabUsers"
          class="btn btn-sm btn-outline-brand mb-2 px-3"
          :class="!showFindBikes ? 'form-control form-control-sm' : ''"
          @click="clearFilters"
        >
          Clear filters
        </button>
      </div>
    </b-form>
  </div>
</template>
<script>
import {
  BForm,
  BFormSelect,
  BFormSelectOption,
  BFormDatepicker,
  BFormCheckbox,
} from "bootstrap-vue";
import Rating from "./Rating.vue";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "FilterComponent",
  components: {
    BForm,
    BFormSelect,
    BFormSelectOption,
    BFormDatepicker,
    BFormCheckbox,
    Rating,
  },
  data() {
    return {
      selected: [],
      selectedLocation: [],
      locations: ["Mumbai", "Delhi", "Indore", "Ahmedabad"],
      bikeModels: ["Activa", "Jupiter", "Eterno"],
      bikeColors: ["black", "grey", "yellow", "white"],
    };
  },
  computed: {
    ...mapState({
      bikeFilters: (state) => state.bikeFilters,
      showOnlyUsersWhoReserved: (state) => state.showOnlyUsersWhoReserved,
    }),
    ...mapGetters(["isUserManager"]),
    showFindBikes() {
      return !this.isTabBikes && !this.isTabBookings && !this.isTabUsers;
    },
    showAdditionalFilters() {
      return this.$route.meta && this.$route.meta.additionalFilters;
    },
    getToday() {
      var date = new Date();
      date.setDate(date.getDate() - 1);
      return date;
    },
    checkRequiredFields() {
      return (
        this.filters.pickupDate != null &&
        this.filters.dropoffDate != null &&
        this.filters.location != null
      );
    },
    filters() {
      return this.bikeFilters;
    },
    isTabBikes() {
      return (
        this.$route &&
        this.$route.fullPath.split("/").length > 1 &&
        this.$route.fullPath.split("/")[1] == "bikes"
      );
    },
    isTabBookings() {
      return (
        this.$route &&
        this.$route.fullPath.split("/").length > 1 &&
        this.$route.fullPath.split("/")[1] == "bookings"
      );
    },
    isTabUsers() {
      return (
        this.$route &&
        this.$route.fullPath.split("/").length > 1 &&
        this.$route.fullPath.split("/")[1] == "users"
      );
    },
  },
  mounted() {
    this.$refs.pickupDateRef.focus();
  },
  methods: {
    ...mapActions(["resetBikeFiltersAction", "toggleUserFilterAction"]),
    filterByRating(rating) {
      this.filters.rating = rating;
    },
    dateStartDisabled(ymd, date) {
      return date < new Date() && date.getHours() < new Date().getHours();
    },
    disabledEndDate(ymd, date) {
      return ymd < this.filters.pickupDate;
    },
    findBikes() {
      this.$router.push("/bikes");
    },
    clearFilters() {
      this.resetBikeFiltersAction();
    },
    onToggleUserFilter() {
      this.toggleUserFilterAction();
    },
  },
  watch: {
    filters: {
      deep: true,
      handler(value) {
        if (value.pickupDate > value.dropoffDate) {
          value.dropoffDate = null;
        }
      },
    },
  },
};
</script>
<style scoped>
.filter-component {
  background-color: white;
}
.filter-form-label {
  font-size: 0.9rem;
}
</style>