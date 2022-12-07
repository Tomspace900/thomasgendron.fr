<template>
  <div id="wrapper">
    <h1 id="title">Parcours</h1>
    <div id="content">
      <div id="school-info">{{ parcours }}</div>
      <hr id="line" />
      <div id="school-cards">
        <div
          class="school-card"
          id="efrei"
          @click="() => this.$store.commit('toggleParcours', 'efrei')"
        >
          {{ parcours }}
        </div>
        <div
          class="school-card"
          id="apu"
          @click="() => this.$store.commit('toggleParcours', 'apu')"
        >
          {{ parcours }}
        </div>
        <div
          class="school-card"
          id="iut"
          @click="() => this.$store.commit('toggleParcours', 'iut')"
        >
          {{ parcours }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "@nuxtjs/composition-api";

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
}

#content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 5% 0 5% 0;
}

#school-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  margin: 0 7% 0 10%;

  width: 45%;
  height: 100%;
  background: var(--background-card);
  box-shadow: var(--shadow-card);
  border-radius: 30px;
}

#line {
  width: 2px;
  height: 660px;
  background-color: black;
}

#school-cards {
  width: 55%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: space-between;
  margin: 0 10% 0 7%;
}

.school-card {
}
</style>
