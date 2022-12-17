<template>
  <div
    id="wrapper"
    @click="() => this.$store.commit('toggleParcours', parcours)"
    :style="[parcours == parcoursActive ? values.styleActive : null]"
  >
    <div id="left">
      <div id="title">{{ values.title }}</div>
      <div id="description">{{ values.description }}</div>
      <div id="date">{{ values.date }}</div>
    </div>
    <div id="right">
      <img :src="require('../assets/images/' + values.logo)" alt="" />
    </div>
  </div>
</template>

<script setup>
import { computed, useStore } from "@nuxtjs/composition-api";

const store = useStore();
const parcoursActive = computed(() => store.state.parcours);
const props = defineProps({
  parcours: String,
});
const values = computed(() => {
  let language = store.state.lang;
  let title, description, date, logo, styleActive;

  switch (props.parcours) {
    case "apu":
      title =
        language === "en"
          ? "Asia Pacific University"
          : "Asia Pacific University";
      description =
        language === "en" ? "Kuala Lumpur, MALAYSIA" : "Kuala Lumpur, MALAISIE";
      date = language === "en" ? "January - May 2022" : "Janvier - Mai 2022";
      logo = "logo_apu.png";
      styleActive = {
        background:
          "radial-gradient(75.47% 672.32% at 0% 50%,#ffec3d99 0%,#ffffff80 100%)",
      };
      break;
    case "iut":
      title =
        language === "en"
          ? "Technology diploma in Physics Measurements"
          : "DUT Mesures Physiques";
      description =
        language === "en"
          ? "Paris-Saclay University, FRANCE"
          : "IUT d'Orsay, Université Paris-Saclay";
      date = language === "en" ? "2018 - 2020" : "2018 020";
      logo = "logo_saclay.png";
      styleActive = {
        background:
          "radial-gradient(72.22% 643.38% at 0% 50%,#98296b99 0%,#ffffff80 100%)",
      };
      break;
    default:
      title =
        language === "en"
          ? "Engineering school in IT and digital"
          : "Ecole d'Ingénieur en IT et digital";
      description =
        language === "en" ? "EFREI Paris, FRANCE" : "EFREi Paris, VILLEJUIF";
      date = language === "en" ? "2021 - Today" : "2021 - Aujourd'hui";
      logo = "logo_efrei.png";
      styleActive = {
        background:
          "radial-gradient(78.63% 700.49% at 0% 50%, rgba(64, 177, 240, 0.6) 0%, rgba(255, 255, 255, 0.6) 100%)",
      };
      break;
  }
  return { title, description, date, logo, styleActive };
});
</script>

<style lang="scss" scoped>
#wrapper {
  width: 100%;
  height: 100%;
}

#left {
  width: 60%;
  display: flex;
  flex-direction: column;
  height: 100%;
}

#title {
  font-size: 0.81rem;
  font-weight: 400;
  height: 50%;
  display: flex;
  align-items: center;
}

#description,
#date {
  font-size: 0.625rem;
  font-weight: 200;
  height: 25%;
  display: flex;
  align-items: center;
}

#right {
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
