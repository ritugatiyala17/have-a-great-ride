<template>
  <div>
    <b-modal
      ref="add-user-modal"
      v-bind="$attrs"
      :title="title"
      button-size="sm"
      hide-footer
      @hidden="onCancel"
    >
      <b-form
        class="container justify-content-center w-auto"
        @submit.prevent="onOk"
      >
        <b-form-group
          id="user-name-id"
          class="pb-3"
          label="Name"
          label-for="user-name"
        >
          <b-form-input
            id="user-name"
            v-model="user.name"
            type="text"
            placeholder="Enter fullname"
            class="form-control form-control-sm"
            required
          >
          </b-form-input>
        </b-form-group>

        <b-form-group
          id="user-email-id"
          class="pb-3"
          label="Email"
          label-for="user-email"
        >
          <b-form-input
            id="user-email"
            v-model="user.email"
            type="email"
            placeholder="Enter email"
            class="form-control form-control-sm"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          id="user-password-id"
          class="pb-3"
          label="Password"
          label-for="user-password"
        >
          <b-form-input
            id="user-password"
            v-model="user.password"
            type="text"
            placeholder="Enter password"
            class="form-control form-control-sm"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          id="user-phone-id"
          class="pb-3"
          label="Phone Number"
          label-for="user-phone"
        >
          <b-form-input
            id="user-phone"
            v-model="user.phone"
            type="tel"
            pattern="[0-9]{10}"
            placeholder="Enter phone number"
            class="form-control form-control-sm"
          >
          </b-form-input>
          <span class="form-input-info"
            >(Enter 10 digit phone number, without spaces)</span
          >
        </b-form-group>
        <b-form-group
          id="user-role-id"
          class="pb-3"
          label="Role"
          label-for="user-role"
        >
          <b-form-select
            id="user-role"
            v-model="user.role"
            :options="userRoles"
            type="text"
            placeholder="Select Role"
            class="form-control form-control-sm"
            required
          >
            <template #first>
              <b-form-select-option :value="null" disabled
                >Select Role</b-form-select-option
              >
            </template>
          </b-form-select>
        </b-form-group>
        <div
          class="
            w-100
            d-flex
            flex-row
            justify-content-between
            align-items-center
          "
        >
          <button size="sm" class="btn btn-sm" @click="onCancel">
            {{ cancelButtonText }}
          </button>
          <b-button type="submit" class="btn-outline bg-brand m-2">{{
            okButtonText
          }}</b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>
<script>
import {
  BModal,
  VBModal,
  BForm,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BFormSelectOption,
  BButton,
} from "bootstrap-vue";

export default {
  name: "AddUserModal",
  props: {
    title: {
      type: String,
      default: "AddUser",
    },
    cancelButtonText: {
      type: String,
      default: "Cancel",
    },
    okButtonText: {
      type: String,
      default: "Okay",
    },
  },
  components: {
    BModal,
    BForm,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BFormSelectOption,
    BButton,
  },
  directives: { "b-modal": VBModal },
  data() {
    return {
      user: {
        name: "",
        email: "",
        phone: null,
        password: "",
        role: "",
      },
      userRoles: ["user", "manager", "administrator"],
    };
  },
  methods: {
    onOk() {
      this.$emit("onOk", this.user);
    },
    onCancel() {
      this.user = {
        name: "",
        email: "",
        phone: null,
        password: "",
        role: "",
      };
      this.$emit("onCancel");
    },
  },
};
</script>