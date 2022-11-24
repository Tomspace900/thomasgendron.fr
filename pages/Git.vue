<template>
  <div class="git-page">
    <div v-if="loading">Loading...</div>
    <div v-if="!loading" v-for="repo in repositories">
      <Gitcard :repo="repo" />
    </div>
  </div>
</template>

<script>
import Gitcard from "../components/Gitcard.vue";
import axios from "axios";
const base_url = process.env.BASE_URL;

export default {
  data() {
    return {
      repositories: [],
      loading: true,
    };
  },
  components: { Gitcard },
  async mounted() {
    await this.getData("github");
    await this.getData("gitlab");
    this.repositories.sort((a, b) => {
      this.loading = false;
      return new Date(b.last_commit) - new Date(a.last_commit);
    });
  },
  methods: {
    async getData(git) {
      await axios.get(base_url + "/" + git).then((res) => {
        console.log(git);
        console.log(res);
        for (let i = 0; i < res.data.length; i++) {
          this.repositories.push(res.data[i]);
        }
      });
    },
  },
};
</script>

<style lang="css" scoped></style>
