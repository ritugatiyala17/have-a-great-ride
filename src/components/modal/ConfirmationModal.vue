<template>
  <div>
    <b-modal
      :ref="`confirmation-modal-${id}`"
      v-bind="$attrs"
      :title="title"
      button-size="sm"
    >
      <p class="my-2">{{ content }}</p>
      <template #modal-footer>
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
          <button size="sm" class="btn btn-sm btn-danger" @click="onOk">
            {{ okButtonText }}
          </button>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import { BModal, VBModal } from "bootstrap-vue";

export default {
  name: "ConfirmationModal",
  props: {
    id: {
      type: String,
      default: "1",
    },
    title: {
      type: String,
      default: "ConfirmationModal",
    },
    content: {
      type: String,
      default: "Are you sure you want to delete this?",
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
  },
  directives: { "b-modal": VBModal },
  methods: {
    onOk() {
      this.$emit("onOk");
    },
    onCancel() {
      this.$emit("onCancel");
    },
  },
};
</script>
<style scoped>
</style>