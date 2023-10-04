<template>
  <div class="users-page">
    <div class="d-flex flex-row justify-content-between align-items-end mb-3">
      <b-badge class="mr-2 px-2 py-1 badge-filters border-brand text-brand" pill
        >{{ usersList.length }}
        {{ usersList.length > 1 ? "users" : "user" }} available</b-badge
      >
      <button
        class="btn btn-sm btn-outline-brand ml-2 px-3"
        @click="openAddUserModal"
      >
        Add User
      </button>
    </div>

    <b-list-group>
      <b-list-group-item
        v-for="(user, userIndex) of usersList"
        :key="user.key"
        class="mb-3 rounded"
        @click="getUserDetails(user.key)"
      >
        <div class="container p-2">
          <div class="d-flex flex-row justify-content-end align-items-center">
            <button
              class="user-edit-option btn btn-sm btn-outline-brand"
              @click="openEditUserModal(user, userIndex)"
            >
              <i class="fa-solid fa-pencil fa-xs"></i> Edit User
            </button>
            <button
              class="bike-delete-option btn btn-sm btn-outline-brand ml-2"
              @click="openDeleteBikeConfirmationModal(user, userIndex)"
            >
              <i class="fa-solid fa-trash fa-xs"></i> Delete User
            </button>
          </div>
          <div>
            {{ user.name }}
          </div>
          <div>
            {{ user.email }}
          </div>
          <div>
            {{ user.phone }}
          </div>
          <div>
            {{ user.role }}
          </div>
          <b-button
            v-show="isUserManager"
            class="btn btn-sm bg-brand px-3 mt-1"
            @click="viewBookings(user)"
            >View Bookings</b-button
          >
          <ConfirmationModal
            ref="deleteUserModal"
            :id="user.key"
            :title="'Delete User'"
            :content="'Are you sure you want to delete this user?'"
            :cancelButtonText="'Cancel'"
            :okButtonText="'Delete'"
            @onOk="onDeleteUser(user)"
            @onCancel="hideDeleteConfirmation(user, userIndex)"
          />
          <EditUserModal
            ref="editUserModal"
            :id="user.key"
            :user="user"
            :title="'Edit User'"
            :cancelButtonText="'Cancel'"
            :okButtonText="'Edit'"
            @onOk="onEditUser(user, userIndex)"
            @onCancel="hideEditUserModal(user, userIndex)"
          />
        </div>
      </b-list-group-item>
    </b-list-group>
    <AddUserModal
      ref="addUserModal"
      :title="'Add User'"
      :cancelButtonText="'Cancel'"
      :okButtonText="'Add'"
      @onOk="onAddUser"
      @onCancel="hideAddUserModal"
    />
  </div>
</template>
<script>
import { BListGroup, BListGroupItem, BButton, BBadge } from "bootstrap-vue";
import { mapActions, mapState, mapGetters } from "vuex";
import ConfirmationModal from "@/components/modal/ConfirmationModal.vue";
import AddUserModal from "@/components/modal/AddUserModal.vue";
import EditUserModal from "@/components/modal/EditUserModal.vue";
export default {
  name: "UsersList",
  components: {
    BListGroup,
    BListGroupItem,
    BButton,
    BBadge,
    ConfirmationModal,
    AddUserModal,
    EditUserModal,
  },
  computed: {
    ...mapState({
      usersList: (state) => state.usersList,
      selectedUser: (state) => state.selectedUser,
      showOnlyUsersWhoReserved: (state) => state.showOnlyUsersWhoReserved,
      bikeFilters: (state) => state.bikeFilters,
    }),
    ...mapGetters(["isUserManager"]),
  },
  created() {
    this.getAllUsers();
  },
  methods: {
    ...mapActions([
      "getAllUsers",
      "getUser",
      "editUser",
      "deleteUser",
      "getBookingsList",
      "signupAction",
    ]),
    getUserDetails(userId) {
      this.getUser(userId);
    },
    onDeleteUser(user) {
      this.deleteUser(user.key);
    },
    async viewBookings(user) {
      await this.getUser(user.key);

      await this.getBookingsList({
        user: this.selectedUser.key,
      });
      this.$router.push(`/users/${this.selectedUser.key}/bookings`);
    },
    hideDeleteConfirmation(user, userIndex) {
      this.$refs.deleteUserModal[userIndex].$refs[
        `confirmation-modal-${user.key}`
      ].hide();
    },
    openDeleteBikeConfirmationModal(user, userIndex) {
      this.$refs.deleteUserModal[userIndex].$refs[
        `confirmation-modal-${user.key}`
      ].show();
    },
    hideAddUserModal() {
      this.$refs.addUserModal.$refs["add-user-modal"].hide();
    },
    openAddUserModal() {
      this.$refs.addUserModal.$refs["add-user-modal"].show();
    },
    onAddUser(user) {
      this.signupAction({ ...user });
      this.hideAddUserModal();
    },
    hideEditUserModal(user, userIndex) {
      this.$refs.editUserModal[userIndex].$refs[
        `edit-user-modal-${user.key}`
      ].hide();
    },
    openEditUserModal(user, userIndex) {
      this.$refs.editUserModal[userIndex].$refs[
        `edit-user-modal-${user.key}`
      ].show();
    },
    onEditUser(user, userIndex) {
      this.editUser({
        ...user,
      });
      this.hideEditUserModal(user, userIndex);
    },
  },
  watch: {
    showOnlyUsersWhoReserved(value) {
      this.getAllUsers();
    },
  },
};
</script>
<style scoped>
.bike-delete-option {
  margin-left: 1rem;
}
</style>