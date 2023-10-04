import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import firebase from "firebase";
import { collection, query, where } from "firebase/firestore";
import { db } from "@/firebaseDb";
const state = {
  user: null,
  userStatus: null,
  userError: null,
  status: null,
  error: null,
  usersList: [],
  bikesList: [],
  bikeFilters: {
    model: null,
    color: null,
    location: null,
    pickupDate: null,
    dropoffDate: null,
    rating: null,
    isAvailable: true,
  },
  bikesListStatus: null,
  bikesListError: null,
  bookingsList: [],
  bookingsListStatus: null,
  bookingsListError: null,
  selectedBike: null,
  selectedBikeStatus: null,
  selectedBikeError: null,
  selectedUser: null,
  selectedUserStatus: null,
  selectedUserError: null,
  showOnlyUsersWhoReserved: false,
  allUsersList: [],
  allBikesList: [],
  allBookingsList: [],
};

const mutations = {
  initialiseStore(state) {
    if (localStorage.getItem("user")) {
      state.user = JSON.parse(localStorage.getItem("user"));
    }
  },
  resetStore(state) {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
    }
    state.user = null;
  },
  setAllUsersList(state, payload) {
    state.allUsersList = payload;
  },
  setAllBikesList(state, payload) {
    state.allBikesList = payload;
  },
  setAllBookingsList(state, payload) {
    state.allBookingsList = payload;
  },
  setUser(state, payload) {
    localStorage.setItem("user", JSON.stringify(payload));
    state.user = payload;
  },
  setUserStatus(state, payload) {
    state.userStatus = payload;
  },
  setUserError(state, payload) {
    state.userError = payload;
  },
  removeUser(state) {
    state.user = null;
  },
  setStatus(state, payload) {
    state.status = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  setUsersList(state, payload) {
    state.usersList = payload;
  },
  setBikesList(state, payload) {
    state.bikesList = payload;
  },
  setBikesListStatus(state, payload) {
    state.bikesListStatus = payload;
  },
  setBikesListError(state, payload) {
    state.bikesListError = payload;
  },
  resetBikeFilters(state, payload) {
    state.bikeFilters = {
      model: null,
      color: null,
      location: null,
      pickupDate: null,
      dropoffDate: null,
      rating: null,
      isAvailable: true,
    };
  },
  setBookingsList(state, payload) {
    state.bookingsList = payload;
  },
  setBookingsListStatus(state, payload) {
    state.bookingsListStatus = payload;
  },
  setBookingsListError(state, payload) {
    state.bookingsListError = payload;
  },
  setSelectedBike(state, payload) {
    state.selectedBike = payload;
  },
  setSelectedBikeStatus(state, payload) {
    state.selectedBikeStatus = payload;
  },
  setSelectedBikeError(state, payload) {
    state.selectedBikeError = payload;
  },
  setSelectedUser(state, payload) {
    state.selectedUser = payload;
  },
  setSelectedUserStatus(state, payload) {
    state.selectedUserStatus = payload;
  },
  setSelectedUserError(state, payload) {
    state.selectedUserError = payload;
  },
  resetSelectedBike(state) {
    state.selectedBike = null;
  },
  resetBookingsList(state) {
    state.bookingsList = [];
  },
  setShowOnlyUsersWhoReserved(state) {
    state.showOnlyUsersWhoReserved = !state.showOnlyUsersWhoReserved;
  },
};
const actions = {
  async signupAction({ commit }, payload) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        console.log("createUserWithEmailAndPassword", response.user.uid);
        db.collection("users")
          .doc(response.user.uid)
          .set({
            email: response.user.email,
            name: payload.name,
            phone: payload.phone,
            role: payload.role || "user",
            key: response.user.uid,
          });
      })
      .catch((error) => {
        commit("setStatus", "failure");
        commit("setError", error.message);
      });
  },
  async loginAction({ dispatch, commit }, payload) {
    commit("setStatus", "loading");
    await firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        console.log("loginAction", response.user.uid);
        dispatch("getCurrentUser", response.user.uid);
        commit("setStatus", "success");
      })
      .catch((error) => {
        commit("setError", error.message);
        commit("setStatus", "failed");
      });
  },
  async logoutAction({ dispatch, commit }) {
    commit("setUserStatus", "loading");
    await firebase
      .auth()
      .signOut()
      .then(() => {
        commit("setUser", null);
        commit("setUserStatus", "success");
        commit("setUserError", null);
        commit("resetStore");
        dispatch("resetBikeFiltersAction");
        dispatch("resetSelectedBikeAction");
        dispatch("resetBookingsListAction");
      })
      .catch((error) => {
        commit("setUserStatus", "failure");
        commit("setUserError", error.message);
      });
  },
  async getAllUsers({ commit, state }, payload) {
    if (state.showOnlyUsersWhoReserved) {
      let users = [];
      db.collection("users").onSnapshot((snapshotChange) => {
        snapshotChange.forEach((doc) => {
          users.push({
            key: doc.id,
            name: doc.data().name,
            email: doc.data().email,
            phone: doc.data().phone,
            role: doc.data().role,
          });
        });
        let a = getUsersWhoReserved(state.allBookingsList, users);
        console.log("getAllUsers users", a);
        commit("setUsersList", a);
      });
    } else {
      db.collection("users").onSnapshot((snapshotChange) => {
        let users = [];
        snapshotChange.forEach((doc) => {
          users.push({
            key: doc.id,
            name: doc.data().name,
            email: doc.data().email,
            phone: doc.data().phone,
            role: doc.data().role,
          });
        });
        console.log("getAllUsers users", users);
        commit("setUsersList", users);
      });
    }
    // }
  },
  getCurrentUser({ commit }, payload) {
    commit("setUserStatus", "loading");
    console.log("getCurrentUser store", payload);
    const userRef = db.collection("users").doc(payload);
    userRef
      .get()
      .then((doc) => {
        console.log("getCurrentUser data", { ...doc.data(), key: payload });
        commit("setUser", { ...doc.data(), key: payload });
        commit("setUserStatus", "success");
      })
      .catch((error) => {
        commit("setUserStatus", "failure");
        commit("setUserError", error.message);
      });
  },
  editUser({ dispatch }, payload) {
    console.log("editUser", payload);
    db.collection("users")
      .doc(payload.key)
      .set(payload)
      .then(() => {
        dispatch("getAllUsers");
      });
  },
  deleteUser({ dispatch }, payload) {
    console.log("deleteUser", payload);
    db.collection("users")
      .doc(payload)
      .delete()
      .then(() => {
        console.log("Delete User Successfull");
        dispatch("getAllUsers");
      });
  },
  async getBikesList({ dispatch, commit, state }, payload) {
    let { model, color, location, rating, isAvailable } = { ...payload };
    let bikePayload = { model, color, location, rating, isAvailable };
    let bookings1 = [];
    let bookings2 = [];
    if (payload && payload.pickupDate) {
      db.collection("bookings")
        .where("dropoffDate", ">=", payload.pickupDate)
        .onSnapshot((snapshotChange) => {
          snapshotChange.forEach((doc) => {
            bookings1.push({
              key: doc.id,
              user: doc.data().user,
              bike: doc.data().bike,
              pickupDate: doc.data().pickupDate,
              dropoffDate: doc.data().dropoffDate,
              status: doc.data().status,
            });
          });
        });
    }
    if (payload && payload.dropoffDate) {
      db.collection("bookings")
        .where("pickupDate", "<=", payload.dropoffDate)
        .onSnapshot((snapshotChange) => {
          snapshotChange.forEach((doc) => {
            bookings2.push({
              key: doc.id,
              user: doc.data().user,
              bike: doc.data().bike,
              pickupDate: doc.data().pickupDate,
              dropoffDate: doc.data().dropoffDate,
              status: doc.data().status,
            });
          });
        });
    }
    console.log("bookings1,2", bookings1, bookings2);
    commit("setBikesListStatus", "loading");
    const bikesRef = db.collection("bikes");
    const bikesQuery = getQuery(bikesRef, bikePayload);
    await bikesQuery.onSnapshot((snapshotChange) => {
      let bikes = [];
      snapshotChange.forEach((doc) => {
        bikes.push({
          key: doc.id,
          model: doc.data().model,
          color: doc.data().color,
          location: doc.data().location,
          rating: doc.data().rating,
          image: doc.data().image,
          ratingsCount: doc.data().ratingsCount,
          isAvailable: doc.data().isAvailable,
        });
      });
      let availableBikes = getAvailableBikes(bookings1, bookings2, bikes);
      commit("setBikesList", availableBikes);
      commit("setBikesListStatus", "success");
    });
  },
  resetBikeFiltersAction({ commit }) {
    commit("resetBikeFilters");
  },
  resetSelectedBikeAction({ commit }) {
    commit("resetSelectedBike");
  },
  resetBookingsListAction({ commit }) {
    commit("resetBookingsList");
  },
  addBike({ dispatch, commit, state }, payload) {
    console.log("addBike", payload);
    db.collection("bikes")
      .doc()
      .set({ ...payload })
      .then(() => {
        dispatch("getBikesList", state.bikeFilters);
      });
  },
  editBike({ dispatch, commit, state }, payload) {
    console.log("editBike", payload);
    db.collection("bikes")
      .doc(payload.key)
      .set(payload)
      .then(() => {
        console.log("Bike updated Successfull");
        dispatch("getBikesList", state.bikeFilters);
      });
  },
  rateBike({ dispatch, commit, state }, payload) {
    console.log("rateBike", payload);
    const bikeRef = db.collection("bikes").doc(payload.key);
    bikeRef
      .get()
      .then((doc) => {
        console.log("getBike data", { ...doc.data(), key: payload });
        console.log(
          "Rate bike data",
          doc.data().rating,
          payload.rating,
          doc.data().ratingsCount,
          (doc.data().rating + payload.rating) / (doc.data().ratingsCount + 1)
        );
        db.collection("bikes")
          .doc(payload.key)
          .set({
            ...payload,
            ...doc.data(),
            rating:
              (doc.data().rating * doc.data().ratingsCount + payload.rating) /
              (doc.data().ratingsCount + 1),
            ratingsCount: doc.data().ratingsCount + 1,
          })
          .then(() => {
            console.log("Bike updated Successfull");
            dispatch("getBikesList", state.bikeFilters);
          });
      })
      .catch((error) => {});
  },
  deleteBike({ dispatch, commit, state }, payload) {
    console.log("deleteBike", payload);
    db.collection("bikes")
      .doc(payload)
      .delete()
      .then(() => {
        console.log("Delete Bike Successfull");
        dispatch("getBikesList", state.bikeFilters);
      });
  },
  getBike({ commit }, payload) {
    console.log("getBike store", payload);
    const bikeRef = db.collection("bikes").doc(payload);
    bikeRef
      .get()
      .then((doc) => {
        console.log("getBike data", { ...doc.data(), key: payload });
        commit("setSelectedBike", { ...doc.data(), key: payload });
        commit("setSelectedBikeStatus", "success");
      })
      .catch((error) => {
        commit("setSelectedBikeStatus", "failure");
        commit("setSelectedBikeError", error.message);
      });
  },
  async getUser({ commit }, payload) {
    console.log("getUser store", payload);
    const userRef = db.collection("users").doc(payload);
    await userRef
      .get()
      .then((doc) => {
        commit("setSelectedUser", { ...doc.data(), key: payload });
        commit("setSelectedUserStatus", "success");
      })
      .catch((error) => {
        commit("setSelectedUserStatus", "failure");
        commit("setSelectedUserError", error.message);
      });
  },

  async getBookingsList({ commit, state }, payload) {
    console.log("getBookingsList index.js", state.bikeFilters, payload);

    commit("setBookingsListStatus", "loading");
    const bookingsRef = db.collection("bookings");
    let query = bookingsRef;
    for (let key in payload) {
      query = query.where(key, "==", payload[key]);
    }
    const bookingsQuery = query;
    bookingsQuery.onSnapshot((snapshotChange) => {
      let bookings = [];
      snapshotChange.forEach((doc) => {
        bookings.push({
          key: doc.id,
          user: doc.data().user,
          bike: doc.data().bike,
          pickupDate: doc.data().pickupDate,
          dropoffDate: doc.data().dropoffDate,
          status: doc.data().status,
          location: doc.data().location,
        });
      });
      console.log("bookings final if", bookings);
      commit("setBookingsList", bookings);
      commit("setBookingsListStatus", "success");
    });
  },
  createBooking({ dispatch, state }, payload) {
    console.log("createBooking", payload);

    db.collection("bookings")
      .doc()
      .set(payload)
      .then(() => {
        dispatch("getBookingsList", {
          user: payload.user,
        });
      });
  },
  cancelBooking({ dispatch, commit }, payload) {
    console.log("cancelBooking", payload);
    db.collection("bookings")
      .doc(payload.key)
      .set(payload)
      .then(() => {
        console.log("Booking updated Successfull");
        dispatch("getBookingsList");
      });
  },
  toggleUserFilterAction({ commit, state }) {
    commit("setShowOnlyUsersWhoReserved");
  },
  getAllUsersListInitialise({ commit }) {
    let users = [];
    db.collection("users").onSnapshot((snapshotChange) => {
      snapshotChange.forEach((doc) => {
        users.push({
          key: doc.id,
          name: doc.data().name,
          email: doc.data().email,
          phone: doc.data().phone,
          role: doc.data().role,
        });
      });
      console.log("allUsersListInitialise", users);
      commit("setAllUsersList", users);
    });
  },
  getAllBikesListInitialise({ commit }) {
    db.collection("bikes").onSnapshot((snapshotChange) => {
      let bikes = [];
      snapshotChange.forEach((doc) => {
        bikes.push({
          key: doc.id,
          model: doc.data().model,
          color: doc.data().color,
          location: doc.data().location,
          rating: doc.data().rating,
          image: doc.data().image,
          ratingsCount: doc.data().ratingsCount,
          isAvailable: doc.data().isAvailable,
        });
      });
      console.log("allBikesListInitialise", bikes);
      commit("setAllBikesList", bikes);
    });
  },
  getAllBookingsListInitialise({ commit }) {
    db.collection("bookings").onSnapshot((snapshotChange) => {
      let bookings = [];
      snapshotChange.forEach((doc) => {
        bookings.push({
          key: doc.id,
          user: doc.data().user,
          bike: doc.data().bike,
          pickupDate: doc.data().pickupDate,
          dropoffDate: doc.data().dropoffDate,
          status: doc.data().status,
          location: doc.data().location,
        });
      });
      commit("setAllBookingsList", bookings);
    });
  },
};
const getters = {
  user(state) {
    return state.user;
  },
  status(state) {
    return state.status;
  },
  error(state) {
    return state.error;
  },
  isUserManager(state) {
    return (
      state.user &&
      (state.user.role == "manager" || state.user.role == "administrator")
    );
  },
  isDateFilterSelected(state) {
    return (
      state.bikeFilters &&
      state.bikeFilters.pickupDate &&
      state.bikeFilters.dropoffDate
    );
  },
};
const filterOpsMap = {
  model: {
    operator: "==",
  },
  rating: {
    operator: ">=",
  },
  color: {
    operator: "==",
  },
  location: {
    operator: "==",
  },
  pickupDate: {
    operator: "<=",
  },
  dropoffDate: {
    operator: ">=",
  },
  isAvailable: {
    operator: "==",
  },
  user: {
    operator: "==",
  },
  bike: {
    operator: "==",
  },
};

function getQuery(collection, filters) {
  let final = collection;
  for (let key in filters) {
    console.log("getQuery", key, filters[key]);
    let operator = filterOpsMap[key] ? filterOpsMap[key].operator : "==";
    if (filters[key]) {
      final = final.where(key, operator, filters[key]);
    }
  }
  return final;
}

function getAvailableBikes(bookingsList1, bookingsList2, bikesList) {
  console.log("getAvailableBikes", bookingsList1, bookingsList2, bikesList);

  let uniqueBooking = bookingsList1.filter(
    (item1) => bookingsList2.findIndex((item2) => item2.key == item1.key) > -1
  );
  let currentBookings = uniqueBooking.filter(
    (booking) => booking.status != "cancelled"
  );
  console.log("uniqueBooking", currentBookings);
  let availableBikes = [];
  availableBikes = bikesList.filter((bike) => {
    return (
      currentBookings.findIndex((booking) => booking.bike == bike.key) == -1
    );
  });
  console.log("availableBikes", availableBikes);
  return availableBikes;
}

function getAvailableBookings(bookingsList1, bookingsList2) {
  console.log("getAvailableBookings", bookingsList1, bookingsList2);
  let bookingsSet = new Set(bookingsList1, bookingsList2);
  console.log("getAvailableBookings final", [...bookingsSet]);
  return [...bookingsSet];
}

function getUsersWhoReserved(bookingsList, usersList) {
  console.log("getUsersWhoReserved", bookingsList, usersList);
  let usersWhoEverReservedBike = [];
  usersWhoEverReservedBike = usersList.filter((user) => {
    return bookingsList.findIndex((booking) => booking.user == user.key) > -1;
  });
  console.log("usersWhoEverReservedBike", usersWhoEverReservedBike);
  return usersWhoEverReservedBike;
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
