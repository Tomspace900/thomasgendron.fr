<template>
  <div>
    <Header />
    <nuxt />
  </div>
</template>

<script setup>
import { useStore } from "@nuxtjs/composition-api";
import { onMounted, onUnmounted } from "vue";
import Header from "../components/Header.vue";

const store = useStore();

onMounted(() => {
  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll, {
    passive: true,
  });
});

const handleScroll = () => {
  store.commit("handleScroll", window.scrollY);
};
</script>

<style lang="css">
* {
  font-family: var(--font-main);
  font-size: 32px;
  font-weight: 300;
}
</style>
