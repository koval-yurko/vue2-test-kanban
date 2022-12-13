<template>
  <div class="demo">
    Demo {{ theme }}

    <button @click="toggleTheme()">Toggle</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";

export default defineComponent({
  name: "DemoPage",
  computed: {
    ...mapGetters({
      theme: "theme/activeTheme",
    }),
  },
  methods: {
    ...mapActions({
      toggleTheme: "theme/toggleTheme",
    }),
  },
});
</script>

<style scoped></style>
