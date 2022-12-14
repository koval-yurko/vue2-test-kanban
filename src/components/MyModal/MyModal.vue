<template>
  <div>
    <Teleport to="body">
      <transition name="modal-a">
        <div v-if="isVisible" class="cont" key="aaa">
          MODAL <br />
          <button @click="isVisible = !isVisible">toggle</button>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Teleport from "vue2-teleport";
import type { PropType } from "vue";

type MyButtonProps = {
  show: boolean;
  isVisible: boolean;
};

export default defineComponent<MyButtonProps, MyButtonProps>({
  name: "MyModal",
  components: { Teleport },
  props: {
    show: {
      type: Boolean as PropType<boolean>,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      isVisible: this.show,
    };
  },
  watch: {
    show() {
      this.isVisible = this.show;
    },
  },
});
</script>

<style>
.cont {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: #ccc;
  opacity: 1;
}

.modal-a-enter-active {
  transition: all 0.3s ease-out;
  opacity: 0;
}

.modal-a-enter-to {
  opacity: 1;
}

.modal-a-leave-active {
  transition: all 0.3s ease-out;
  opacity: 1;
}

.modal-a-leave-to {
  opacity: 0;
}
</style>
