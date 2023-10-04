<template>
  <div>
    <b-form
      class="container justify-content-center m-5 px-5 w-auto"
      @submit.prevent="signup"
      @reset="onReset"
    >
      <b-form-group
        id="login-name-id"
        class="pb-3"
        label="Full Name"
        label-for="login-name"
      >
        <b-form-input
          id="login-name"
          v-model="user.name"
          type="text"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="login-phone-id"
        class="pb-3"
        label="Mobile Number"
        label-for="login-phone"
      >
        <b-form-input
          id="login-phone"
          v-model="user.phone"
          type="tel"
          placeholder="Enter mobile number"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="login-email-id"
        class="pb-3"
        label="Email address"
        label-for="login-email"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="login-email"
          v-model="user.email"
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
          v-model="user.password"
          type="password"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" class="bg-brand m-2">Signup</b-button>
      <b-button class="ml-1" type="reset">Reset</b-button>
    </b-form>
  </div>
</template>
<script>
import { BFormInput, BFormGroup, BForm, BButton } from "bootstrap-vue";
import { mapActions } from "vuex";
export default {
  name: "SignupPage",
  components: { BFormInput, BFormGroup, BForm, BButton },
  data() {
    return {
      user: {
        email: "",
        password: "",
        name: "",
        phoen: null,
      },
    };
  },
  methods: {
    ...mapActions(["signupAction"]),
    signup() {
      const user = { ...this.user };
      this.signupAction(user);
      this.$router.push("/login");
    },
    onReset() {
      this.email = "";
      this.password = "";
    },
  },
};
</script>
<style scoped>
</style>