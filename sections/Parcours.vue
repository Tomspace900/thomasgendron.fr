<template>
  <div id="wrapper">
    <h1 id="title">
      {{ lang == "en" ? "My academic " : "Mon" }}
      <span id="parcours">{{ lang == "en" ? "background" : "parcours" }}</span
      >{{ lang == "en" ? null : " académique" }}
    </h1>
    <div id="content">
      <div id="school-info">
        {{ parcours }} <br />
        Contenu encore en travaux... <br />
      </div>
      <hr id="line" />
      <div id="school-cards">
        <SchoolCard class="school-card" id="efrei" :parcours="'efrei'">
        </SchoolCard>
        <SchoolCard class="school-card" id="apu" :parcours="'apu'"></SchoolCard>
        <SchoolCard class="school-card" id="iut" :parcours="'iut'"></SchoolCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "@nuxtjs/composition-api";
import SchoolCard from "../components/SchoolCard.vue";

const store = useStore();
const lang = computed(() => store.state.lang);

const parcours = computed(() => store.state.parcours);
</script>

<style lang="scss" scoped>
#wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#title {
  font-size: 1.5rem;
}

#parcours {
  font-family: var(--font-second);
  color: var(--blue);
  font-size: 1.7rem;
}

#content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 92%;
  max-width: 1400px;
  margin: 5% 0 5% 0;
}

#school-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;

  width: 45%;
  height: 100%;
  background: var(--background-card);
  box-shadow: var(--shadow-card);
  border-radius: 30px;
}

#line {
  width: 2px;
  height: 100%;
  background-color: black;
  margin: 0 7%;
}

#school-cards {
  width: 55%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}

.school-card {
  width: 100%;
  height: 30%;
  padding: 10px 20px 10px 20px;
  background: var(--background-card);
  box-shadow: var(--shadow-card);
  border-radius: 20px;
  display: flex;
  cursor: pointer;
}
</style>
