<template>
  <div class="my-add-board">
    <div class="my-add-board_title h2">
      This board is empty. Create a new column to get started.
    </div>
    <my-button
      class="my-add-board_button"
      size="large"
      @click="onAddNewColumnClick"
    >
      + Add New Column
    </my-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import { MyButton } from "@/components/form/MyButton";
import type { Dashboard } from "@/store/types";
import { MODAL_DASHBOARD_EDIT } from "@/store/constants";

type MyEmptyBoardProps = {
  activeDashboard: Dashboard;

  onAddNewColumnClick: () => void;

  showModal: (opts: { name: string; data: Dashboard }) => void;
};

export default defineComponent<MyEmptyBoardProps, MyEmptyBoardProps>({
  name: "MyEmptyBoard",
  components: { MyButton },
  computed: {
    ...mapGetters({
      activeDashboard: "dashboards/activeDashboard",
    }),
  },
  methods: {
    ...mapActions({
      showModal: "modals/show",
    }),
    onAddNewColumnClick() {
      this.showModal({
        name: MODAL_DASHBOARD_EDIT,
        data: this.activeDashboard,
      });
    },
  },
});
</script>

<style>
.my-add-board {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: 20px;
  color: var(--add-board-color);
}

.my-add-board_title {
  margin-bottom: 32px;
}

.my-add-board_button {
}
</style>
