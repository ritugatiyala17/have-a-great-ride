<template>
  <div class="container mt-5">
    <div
      v-if="error"
      class="login-error border border-warning rounded p-2 mb-3"
    >
      <i class="fa fa-exclamation-triangle text-warning" aria-hidden="true"></i>
      {{ error }}
    </div>
    <b-form
      class="container justify-content-center mx-5 mb-5 px-5 w-auto"
      @submit.prevent="login"
      @reset="onReset"
    >
      <b-form-group
        id="login-email-id"
        class="pb-3"
        label="Email address"
        label-for="login-email"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="login-email"
          v-model="email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="login-password"
        class="pb-3"
        label="Your Password"
        label-for="login-pass"
      >
        <b-form-input
          id="login-pass"
          v-model="password"
          type="password"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" class="bg-brand m-2">Login</b-button>
      <!-- <b-button class="ml-1" type="reset">Reset</b-button> -->
      <div>
        <router-link to="/signup">New on RentABike? Signup</router-link>
      </div>
    </b-form>
  </div>
</template>
<script>
import { BFormInput, BFormGroup, BForm, BButton } from "bootstrap-vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "LoginPage",
  components: { BFormInput, BFormGroup, BForm, BButton },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapState({
      status: (state) => state.status,
      error: (state) => state.error,
    }),
  },
  methods: {
    ...mapActions(["loginAction"]),
    async login() {
      const user = {
        email: this.email,
        password: this.password,
      };
      await this.loginAction(user);
      if (!this.error) {
        this.$router.push("/bikes");
      }
    },
    onReset() {
      this.email = "";
      this.password = "";
    },
  },
};
</script>
<style scoped>
.login-error {
  margin-left: 6rem !important;
  margin-right: 6rem !important;
}
</style>