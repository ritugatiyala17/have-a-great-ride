<template>
  <div>
    {{ user.email }}
    {{ user.name }}
    {{ user.phone }}
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "UserProfile",
  computed: {
    ...mapState({
      user: (state) => state.user,
      bookingsList: (state) => state.bookingsList,
    }),
  },
  methods: {
    getDate(dateInSeconds) {
      var t = new Date(1970, 0, 1); // Epoch
      t.setSeconds(dateInSeconds);
      return t.toDateString();
    },
  },
};
</script>
