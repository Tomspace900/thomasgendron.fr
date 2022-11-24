<template>
  <div class="git-card">
    <h2>
      <a :href="repo.url" target="_blank"> {{ repo.name }} </a>
    </h2>
    <h3>Last commit : {{ repo.last_commit }}</h3>
    <p>{{ repo.description }}</p>
  </div>
</template>

<script>
export default {
  name: "Gitcard",
  props: ["repo"],
  data() {
    return {};
  },
};
</script>

<style lang="css" scoped></style>
