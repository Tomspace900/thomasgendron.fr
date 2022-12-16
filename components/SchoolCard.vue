<template>
  <div
    id="wrapper"
    @click="() => this.$store.commit('toggleParcours', parcours)"
    :style="[parcours == parcoursActive ? styleActive : null]"
  >
    <div id="left">
      <div id="title">{{ title }}</div>
      <div id="description">{{ description }}</div>
      <div id="date">{{ date }}</div>
    </div>
    <div id="right">
      <img :src="require('../assets/images/' + logo)" alt="" />
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
const title = computed(() => {
  if (props.parcours == "apu") {
    return "Asia Pacific University";
  } else if (props.parcours == "iut") {
    return "DUT Mesures Physiques";
  } else {
    return "Ecole d'Ingénieur en IT et digital";
  }
});
const description = computed(() => {
  if (props.parcours == "apu") {
    return "Kuala Lumpur, MALAISIE";
  } else if (props.parcours == "iut") {
    return "IUT d'Orsay, Université Paris-Saclay";
  } else {
    return "EFREI Paris, VILLEJUIF";
  }
});
const date = computed(() => {
  if (props.parcours == "apu") {
    return "Janvier - Mai 2022";
  } else if (props.parcours == "iut") {
    return "2018 - 2020";
  } else {
    return "2021 - Aujourd'hui";
  }
});

const logo = computed(() => {
  if (props.parcours == "apu") {
    return "logo_apu.png";
  } else if (props.parcours == "iut") {
    return "logo_saclay.png";
  } else {
    return "logo_efrei.png";
  }
});

const styleActive = computed(() => {
  if (props.parcours == "apu") {
    return {
      background:
        "radial-gradient(75.47% 672.32% at 0% 50%,#ffec3d99 0%,#ffffff80 100%)",
    };
  } else if (props.parcours == "iut") {
    return {
      background:
        "radial-gradient(72.22% 643.38% at 0% 50%,#98296b99 0%,#ffffff80 100%)",
    };
  } else {
    return {
      background:
        "radial-gradient(78.63% 700.49% at 0% 50%, rgba(64, 177, 240, 0.6) 0%, rgba(255, 255, 255, 0.6) 100%)",
    };
  }
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
  flex-wrap: wrap;
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
