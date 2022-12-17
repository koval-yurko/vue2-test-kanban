<template>
  <div class="my-board-column my-board-column__add">
    <div class="my-board-column_title h4"></div>
    <button class="my-board-column_button h1" @click="onAddClick">
      <span class="h1">+ New Column</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import { MODAL_DASHBOARD_EDIT } from "@/store/constants";
import type { Dashboard } from "@/store/types";

type MyBoardAddColumnProps = {
  activeDashboard: Dashboard;

  showModal: (props: { name: string; data: Dashboard }) => void;

  onAddClick: () => void;
};

export default defineComponent<MyBoardAddColumnProps, MyBoardAddColumnProps>({
  name: "MyBoardAddColumn",
  props: {},
  computed: {
    ...mapGetters({
      activeDashboard: "dashboards/activeDashboard",
    }),
  },
  methods: {
    ...mapActions({
      showModal: "modals/show",
    }),
    onAddClick() {
      this.showModal({
        name: MODAL_DASHBOARD_EDIT,
        data: this.activeDashboard,
      });
    },
  },
});
</script>

<style>
.my-board-column__add {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  max-height: 90vh;
}

.my-board-column_button {
  flex-grow: 1;
  margin: 0;
  padding: 0;
  color: var(--add-column-color);
  background: var(--add-column-bg-color);
  border: none;
  border-radius: 6px;
  appearance: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.my-board-column_button:hover {
  color: var(--add-column-color-hover);
}
</style>
