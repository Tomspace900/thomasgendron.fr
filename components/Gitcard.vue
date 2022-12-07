<template>
  <div class="git-card">
    <h2>
      <a :href="repo.url" target="_blank"> {{ repo.name }} </a>
    </h2>
    <h3>Last commit : {{ repo.last_commit }}</h3>
    <p>{{ repo.description }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  repo: Object,
});
</script>

<style lang="scss" scoped></style>
