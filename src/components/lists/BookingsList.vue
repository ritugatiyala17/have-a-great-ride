<template>
  <div class="users-page">
    <b-badge
      class="mr-2 px-2 py-1 badge-filters border-brand text-brand mb-3 mt-3"
      pill
      >{{ filteredBookingsList.length }}
      {{ filteredBookingsList.length > 1 ? "bookings" : "booking" }}
      available</b-badge
    >
    <b-list-group>
      <b-list-group-item
        v-for="booking of filteredBookingsList"
        :key="booking.key"
        class="mb-3 rounded"
      >
        <div class="container p-2">
          <div
            class="d-flex flex-row justify-content-between align-items-start"
          >
            <div>
              <b-badge
                class="mr-2 px-2 py-1 bg-brand text-white mb-3 mt-3 px-3 mr-2"
                pill
              >
                {{ new Date(booking.pickupDate).toDateString() }}</b-badge
              >
              -
              <b-badge
                class="mr-2 px-2 py-1 bg-brand text-white mb-3 mt-3 px-3 ml-2"
                pill
              >
                {{ new Date(booking.dropoffDate).toDateString() }}</b-badge
              >
            </div>
            <div class="d-flex flex-row justify-content-end align-items-center">
              <button
                class="btn btn-sm btn-outline-brand mt-1"
                v-show="allowCancelBooking(booking)"
                @click="cancelMyBooking(booking)"
              >
                Cancel Booking
              </button>
              <b-form-rating
                v-if="allowAddingRating(booking)"
                id="bike-booking-rating"
                v-model="rating"
                precision="2"
                inline
                no-border
                variant="warning"
              ></b-form-rating>
              <button
                class="btn btn-sm btn-outline-brand mb-3"
                v-show="allowAddingRating(booking)"
                @click="rateMyBooking(booking)"
              >
                Rate Bike
              </button>
            </div>
          </div>

          <div>
            <i class="fa fa-user text-brand pr-3" aria-hidden="true"></i>
            {{
              getUserDetails(booking.user)
                ? getUserDetails(booking.user).name
                : "User is deleted"
            }}
          </div>
          <div>
            <i class="fa fa-motorcycle text-brand" aria-hidden="true"></i>

            {{
              getBikeDetails(booking.bike)
                ? getBikeDetails(booking.bike).model
                : "Bike is removed"
            }}
            <div
              v-if="
                getBikeDetails(booking.bike) &&
                getBikeDetails(booking.bike).color
              "
              class="bike-color border"
              :style="{
                'background-color': getBikeDetails(booking.bike).color,
              }"
            ></div>
          </div>
          <div>
            <i class="fa fa-location-dot text-brand" aria-hidden="true"></i>
            {{ booking.location }}
          </div>
          <div>
            <b-badge
              class="mr-2 px-2 py-1 mb-3 mt-3"
              :class="
                booking.status == 'cancelled'
                  ? 'text-secondary border'
                  : 'border-brand text-brand'
              "
              pill
              >{{
                allowAddingRating(booking)
                  ? "Completed"
                  : booking.status.slice(0, 1).toUpperCase() +
                    booking.status.slice(1)
              }}</b-badge
            >
          </div>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
import { BListGroup, BListGroupItem, BBadge, BFormRating } from "bootstrap-vue";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "BookingsList",
  components: {
    BListGroup,
    BListGroupItem,
    BBadge,
    BFormRating,
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      selectedUser: (state) => state.selectedUser,
      selectedBike: (state) => state.selectedBike,
      bookingsList: (state) => state.bookingsList,
      bikeFilters: (state) => state.bikeFilters,
      allUsersList: (state) => state.allUsersList,
      allBikesList: (state) => state.allBikesList,
      allBookingsList: (state) => state.allBookingsList,
    }),
    ...mapGetters(["isUserManager"]),
    filteredBookingsList() {
      let arr = Array.from(this.allBookingsList);
      if (this.$route && this.$route.fullPath == "/bookings") {
        if (!this.isUserManager) {
          if (this.bikeFilters.pickupDate && this.bikeFilters.dropoffDate) {
            return arr.filter(
              (booking) =>
                booking.user === (this.user.key || this.user.uid) &&
                ((booking.dropoffDate >= this.bikeFilters.pickupDate &&
                  booking.dropoffDate <= this.bikeFilters.dropoffDate) ||
                  (booking.pickupDate >= this.bikeFilters.pickupDate &&
                    booking.pickupDate <= this.bikeFilters.dropoffDate))
            );
          } else {
            return arr.filter(
              (booking) => booking.user === (this.user.key || this.user.uid)
            );
          }
        } else if (
          this.isUserManager &&
          this.bikeFilters.pickupDate &&
          this.bikeFilters.dropoffDate
        ) {
          return arr.filter(
            (booking) =>
              (booking.dropoffDate >= this.bikeFilters.pickupDate &&
                booking.dropoffDate <= this.bikeFilters.dropoffDate) ||
              (booking.pickupDate >= this.bikeFilters.pickupDate &&
                booking.pickupDate <= this.bikeFilters.dropoffDate)
          );
        } else {
          return arr;
        }
      } else if (
        this.$route &&
        this.$route.fullPath.indexOf("bookings") > -1 &&
        this.$route.fullPath.indexOf("users") > -1
      ) {
        return arr.filter(
          (booking) =>
            booking.user === (this.selectedUser.key || this.selectedUser.uid)
        );
      } else if (
        this.$route &&
        this.$route.fullPath.indexOf("bookings") > -1 &&
        this.$route.fullPath.indexOf("bikes") > -1
      ) {
        return arr.filter((booking) => booking.bike === this.$route.params.id);
      }
      return arr;
    },
  },
  data() {
    return {
      rating: 0,
    };
  },
  methods: {
    ...mapActions(["getBookingsList", "getUser", "cancelBooking", "rateBike"]),
    showAddBikeModal() {
      this.$refs["add-bike-modal"].show();
    },
    hideAddBikeModal() {
      this.$refs["add-bike-modal"].hide();
    },
    cancelMyBooking(booking) {
      this.cancelBooking({
        key: booking.key,
        ...booking,
        status: "cancelled",
      });
    },
    allowCancelBooking(booking) {
      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      let date = new Date().getDate();
      let today = `${year}-${month}-${date / 10 >= 1 ? date : "0" + date}`;
      return booking.pickupDate > today && booking.status !== "cancelled";
    },
    allowAddingRating(booking) {
      // Only allow for completed bookings
      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      let date = new Date().getDate();
      let today = `${year}-${month}-${date / 10 >= 1 ? date : "0" + date}`;
      return booking.dropoffDate < today && booking.status !== "cancelled";
    },
    rateMyBooking(booking) {
      this.rateBike({
        key: booking.bike,
        rating: this.rating,
      });
    },
    getBikeDetails(bikeId) {
      return this.allBikesList.find((bike) => bike.key === bikeId);
    },
    getUserDetails(userId) {
      return this.allUsersList.find((user) => user.key === userId);
    },
  },
};
</script>
<style scoped>
.bike-color {
  height: 20px;
  width: 20px;
  border-radius: 50%;
}
</style>