<template>
  <div class="home-page">
    <div class="accueil">
      <div class="language">
        <div>Français</div>
        <div>English</div>
      </div>
    </div>
    <div class="parcours"></div>
    <div class="projets"></div>

    <NuxtLink to="/git">Gitpage</NuxtLink>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="css">
.home-page {
  display: flex;
  justify-content: center;
}

.language {
  display: flex;
  justify-content: space-between;
}
</style>
