<template>
  <div class="my-add-board">
    <div class="my-add-board_title h2">
      No boards yet. Create a new one to get started.
    </div>
    <my-button
      class="my-add-board_button"
      size="large"
      @click="onAddNewDashboardClick"
    >
      + Create New Board
    </my-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import { MyButton } from "@/components/form/MyButton";
import { MODAL_DASHBOARD_EDIT } from "@/store/constants";

type MyAddBoardProps = {
  onAddNewDashboardClick: () => void;

  showModal: (opts: { name: string }) => void;
};

export default defineComponent<MyAddBoardProps, MyAddBoardProps>({
  name: "MyAddBoard",
  components: { MyButton },
  methods: {
    ...mapActions({
      showModal: "modals/showModal",
    }),
    onAddNewDashboardClick() {
      this.showModal({
        name: MODAL_DASHBOARD_EDIT,
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
