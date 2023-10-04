<template>
  <div>
    <nav
      class="
        navbar navbar-dark
        bg-dark
        justify-content-between
        flex-nowrap flex-row
        bg-brand
      "
    >
      <div class="container">
        <router-link
          class="navbar-brand nav-link pr-3 float-left align-items-center"
          to="/"
        >
          <img class="brand-logo" src="../../../public/bike.png" /> Rent a
          Bike</router-link
        >
        <ul class="nav navbar-nav flex-row float-right align-items-center">
          <li class="nav-item" :class="isTabBikes ? 'tab-selected' : ''">
            <router-link class="nav-link px-2" to="/bikes">Bikes</router-link>
          </li>
          <li v-if="userStatus === 'loading'">
            <i class="fa-solid fa-spinner fa-spin"></i>
          </li>
          <template v-else>
            <li
              class="nav-item"
              v-show="isUserManager"
              :class="isTabUsers ? 'tab-selected' : ''"
            >
              <router-link class="nav-link px-2" to="/users">Users</router-link>
            </li>
            <li
              class="nav-item"
              v-show="user"
              :class="isTabBookings ? 'tab-selected' : ''"
            >
              <router-link class="nav-link px-2" to="/bookings"
                >Bookings</router-link
              >
            </li>
          </template>

          <li class="nav-item">
            <b-dropdown
              text="text left"
              variant="transparent"
              class="user-profile-avatar p-0"
              no-caret
            >
              <template #button-content>
                <b-avatar
                  v-if="user && user.image"
                  class="border ml-3 p-0"
                  variant="info"
                  :src="user.image"
                  size="2rem"
                ></b-avatar>
                <b-avatar
                  v-else-if="user"
                  class="border ml-3 user-profile-avatar-icon p-0"
                  :text="getUserInitials"
                  size="2rem"
                ></b-avatar>
                <b-avatar
                  v-else
                  class="
                    border
                    ml-3
                    glyphicon glyphicon-user
                    cursor-pointer
                    user-profile-avatar-icon
                    p-0
                  "
                  size="2rem"
                  @click="goToUserLogin"
                ></b-avatar>
              </template>
              <b-dropdown-item v-if="user" href="#" @click="goToUserProfile"
                >Profile</b-dropdown-item
              >
              <div v-if="user" class="dropdown-divider"></div>
              <b-dropdown-item v-if="!user" href="#" @click="goToUserLogin">
                Login
              </b-dropdown-item>
              <b-dropdown-item v-else href="#" @click="logoutUser">
                Logout
              </b-dropdown-item>
            </b-dropdown>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
import { BAvatar, BDropdown, BDropdownItem } from "bootstrap-vue";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "NavBar",
  components: {
    BAvatar,
    BDropdown,
    BDropdownItem,
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      userStatus: (state) => state.userStatus,
      userError: (state) => state.userError,
    }),
    ...mapGetters(["isUserManager"]),
    getUserInitials() {
      return this.user ? this.user.email.slice(0, 1).toUpperCase() : "";
    },
    isTabBikes() {
      return (
        this.$route &&
        this.$route.fullPath.split("/").length > 1 &&
        this.$route.fullPath.split("/")[1] == "bikes"
      );
    },
    isTabUsers() {
      return (
        this.$route &&
        this.$route.fullPath.split("/").length > 1 &&
        this.$route.fullPath.split("/")[1] == "users"
      );
    },
    isTabBookings() {
      return (
        this.$route &&
        this.$route.fullPath.split("/").length > 1 &&
        this.$route.fullPath.split("/")[1] == "bookings"
      );
    },
  },
  methods: {
    ...mapActions(["logoutAction"]),
    goToUserLogin() {
      this.$router.push("/login");
    },
    goToUserProfile() {
      this.$router.push("/profile");
    },
    logoutUser() {
      this.logoutAction();
      this.$router.push("/login");
    },
  },
};
</script>
<style>
.user-profile-avatar button {
  padding: 0 !important;
}
</style>
<style scoped>
.ml-3 {
  margin-left: 1rem;
}

.user-profile-avatar-icon {
  color: white;
}
*:focus {
  outline: none;
}
.tab-selected {
  border-bottom: 2px solid white;
  font-weight: 700;
}
.tab-selected a {
  color: white;
}
</style>