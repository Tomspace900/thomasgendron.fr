<template>
  <div class="git-page">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">Erreur de connexion avec le serveur.</div>
    <div v-if="!error && !loading" v-for="repo in repositories">
      <GitCard :repo="repo" />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import GitCard from "../components/GitCard.vue";
import { onMounted, ref } from "vue";
const base_url = process.env.API_URL;

const repositories = ref([]);
const loading = ref(true);
const error = ref(false);

onMounted(async () => {
  await init();
});

async function init() {
  try {
    await getData("github");
    await getData("gitlab");
    repositories.value.sort((a, b) => {
      loading.value = false;
      return new Date(b.last_commit) - new Date(a.last_commit);
    });
  } catch (error) {
    loading.value = false;
    error.value = true;
  }
}

async function getData(git) {
  await axios.get(base_url + "/" + git).then((res) => {
    console.log(git);
    console.log(res);
    for (let i = 0; i < res.data.length; i++) {
      repositories.value.push(res.data[i]);
    }
  });
}
</script>

<style lang="css" scoped>
.git-page {
}
</style>
