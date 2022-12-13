<template>
  <router-view id="app" class="app"></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type AppProps = {
  //
};

export default defineComponent<AppProps, AppProps>({
  data() {
    return { name: "Yura" };
  },
});
</script>

<style scoped>

</style>
