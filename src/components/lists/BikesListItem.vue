<template>
  <div>
    <div class="container p-0 m-0" @click="getBikeInfo(bike.key)">
      <div class="px-4 pt-3 pb-2 position-relative">
        <div class="bike-model-title text-center font-w600">
          {{ bike.title || bike.model }}
        </div>
        <img :src="bike.image" class="bike-image w-100 py-2" />

        <div class="mb-2">
          <i class="solid fa-location-dot"></i
          ><span class="px-2">{{ bike.location }}</span>
        </div>
        <div class="">
          <div
            class="bike-color border"
            :style="{ 'background-color': bike.color }"
          ></div>
        </div>
        <div class="">
          <b-form-rating
            id="bike-rating"
            readonly
            :value="bike.rating"
            variant="warning"
            size="sm"
            inline
            no-border
            precision="2"
          ></b-form-rating>
          <span class="bike-rating-value text-brand"
            >({{ bike.rating }}/5)</span
          >
        </div>
        <div v-show="isUserManager">
          <b-badge
            class="mr-2 px-2 py-1 border-brand text-brand mb-3 mt-3"
            pill
            >{{
              bike.isAvailable ? "Bike is available" : "Not Available"
            }}</b-badge
          >
        </div>
      </div>

      <div class="bike-actions border-top px-4 py-3 m-0 d-flex flex-column">
        <div
          class="d-flex flex-row justify-content-between align-items-end mb-2"
        >
          <div>
            <i class="fa-solid fa-indian-rupee-sign fa-xs"></i>
            <span class="pl-2 bike-price">
              {{ bike.price ? bike.price.day : 349 }}/day
            </span>
          </div>

          <b-button
            class="btn btn-sm bg-brand px-3"
            @click="bookBike"
            :disabled="!isDateFilterSelected"
            >Book</b-button
          >
        </div>
        <button
          v-show="isUserManager"
          class="btn btn-sm btn-outline-brand px-3 mb-2"
          @click="viewBookings"
        >
          View Bookings
        </button>
        <button
          v-show="isUserManager"
          v-b-modal="`edit-bike${bike.key}`"
          class="btn btn-sm btn-outline-brand px-3 mb-2"
        >
          <i class="fa-solid fa-pencil fa-xs"></i> Edit Bike
        </button>
        <button
          v-show="isUserManager"
          class="btn btn-sm btn-outline-danger px-3 mb-2"
          @click="openDeleteBikeConfirmationModal"
        >
          <i class="fa-solid fa-trash fa-xs"></i> Delete Bike
        </button>
      </div>
      <b-modal
        ref="edit-bike-modal"
        hide-footer
        modal-lg
        :id="'edit-bike' + bike.key"
        title="EditBike"
      >
        <b-form
          class="container justify-content-center w-auto"
          @submit.prevent="editBikeDetails"
        >
          <b-form-group
            id="bike-model-id"
            class="pb-3"
            label="Model"
            label-for="bike-model"
          >
            <b-form-select
              id="bike-model"
              v-model="bike.model"
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
              v-model="bike.color"
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
              v-model="bike.location"
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
            :label-for="`bike-isAvailable-${bike.key}`"
          >
            <b-form-checkbox
              :id="`bike-isAvailable-${bike.key}`"
              v-model="bike.isAvailable"
            >
            </b-form-checkbox>
          </b-form-group>
          <b-form-group
            id="bike-image-id"
            class="pb-3"
            label="Image"
            label-for="bike-image"
          >
            <b-form-input
              id="bike-image"
              v-model="bike.image"
              type="text"
              placeholder="Add image"
              class="form-control form-control-sm"
            ></b-form-input>
          </b-form-group>

          <b-button
            type="submit"
            class="btn-outline bg-brand m-2"
            @click="editBikeDetails"
            >Edit</b-button
          >
        </b-form>
      </b-modal>
      <ConfirmationModal
        ref="deleteBikeModal"
        :id="bike.key"
        :title="'Delete Bike'"
        :content="'Are you sure you want to delete this bike?'"
        :cancelButtonText="'Cancel'"
        :okButtonText="'Delete'"
        @onOk="deleteBikeDetails"
        @onCancel="hideDeleteConfirmation"
      />
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import {
  BButton,
  BFormRating,
  BFormSelect,
  BFormSelectOption,
  BModal,
  VBModal,
  BForm,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BBadge,
} from "bootstrap-vue";
import ConfirmationModal from "@/components/modal/ConfirmationModal.vue";
export default {
  name: "BikesListItem",
  props: {
    bike: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    BButton,
    BFormRating,
    BFormSelect,
    BFormSelectOption,
    BModal,
    BForm,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BBadge,
    ConfirmationModal,
  },
  directives: { "b-modal": VBModal },
  data() {
    return {
      locations: ["Mumbai", "Delhi", "Indore", "Ahmedabad"],
      bikeModels: ["Activa", "Jupiter", "Eterno"],
      bikeColors: ["black", "grey", "yellow", "white"],
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      bikeFilters: (state) => state.bikeFilters,
    }),
    ...mapGetters(["isUserManager", "isDateFilterSelected"]),
  },
  methods: {
    ...mapActions([
      "deleteBike",
      "editBike",
      "getBike",
      "createBooking",
      "getBookingsList",
    ]),
    editBikeDetails() {
      this.editBike({
        ...this.bike,
      });
      this.hideEditBikeModal();
    },
    deleteBikeDetails() {
      this.deleteBike(this.bike.key);
    },
    getBikeInfo(bikeId) {
      this.getBike(bikeId);
    },
    async bookBike() {
      if (this.user && this.user.key) {
        let pickup =
          this.bikeFilters.pickupDate ||
          `{new Date().getYear()}-{new Date().getMonth() + 1}-{new Date().getDate()}`;
        let dropoff =
          this.bikeFilters.dropoffDate ||
          `{new Date().getYear()}-{new Date().getMonth() + 1}-{new Date().getDate()}`;
        let bookingDetails = {
          user: this.user.key,
          bike: this.bike.key,
          status: "booked",
          pickupDate: pickup,
          dropoffDate: dropoff,
          location: this.bike.location,
        };
        await this.createBooking(bookingDetails);
        this.$router.push(`/bookings`);
      } else {
        this.$router.push("/login");
      }
    },
    viewBookings() {
      this.getBookingsList({
        bike: this.bike.key,
      });
      this.$router.push(`/bikes/${this.bike.key}/bookings`);
    },
    showEditBikeModal() {
      this.$refs["edit-bike-modal"].show();
    },
    hideEditBikeModal() {
      this.$refs["edit-bike-modal"].hide();
    },
    hideDeleteConfirmation() {
      this.$refs.deleteBikeModal.$refs[
        `confirmation-modal-${this.bike.key}`
      ].hide();
    },
    openDeleteBikeConfirmationModal() {
      this.$refs.deleteBikeModal.$refs[
        `confirmation-modal-${this.bike.key}`
      ].show();
    },
  },
};
</script>
<style scoped>
.bike-model-title {
  font-size: 1.2rem;
  font-weight: bold;
}
.bike-color {
  height: 20px;
  width: 20px;
  border-radius: 50%;
}
#bike-rating {
  padding: 0;
}
.bike-rating-value {
  font-size: 0.9rem;
}
.bike-rating-count {
  display: block;
}
.container {
  background-color: white;
  border-radius: 4%;
}
.bike-edit-option {
  position: absolute;
  top: 1rem;
  right: 2rem;
}
.bike-delete-option {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>