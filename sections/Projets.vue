<template>
  <div>
    <h1>Projets</h1>
    <NuxtLink to="/git" id="nuxtlink">Tous les autres</NuxtLink>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "@nuxtjs/composition-api";

const lang = computed(() => useStore().state.lang);
</script>

<style lang="scss" scoped></style>
