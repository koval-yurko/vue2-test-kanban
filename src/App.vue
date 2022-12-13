<template>
  <router-view id="app" class="app"></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

type AppProps = {
  theme: string;
  setThemeAttribute(): void;
};

export default defineComponent<AppProps, AppProps>({
  data() {
    return { name: "Yura" };
  },
  created() {
    this.setThemeAttribute();
  },
  computed: {
    ...mapGetters({
      theme: "theme/activeTheme",
    }),
  },
  methods: {
    setThemeAttribute() {
      if (document) {
        document.documentElement.setAttribute(`data-theme`, this.theme);
      }
    },
  },
  watch: {
    theme() {
      this.setThemeAttribute();
    },
  },
});
</script>

<style scoped></style>
