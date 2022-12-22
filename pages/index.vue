<template>
  <div id="main">
    <div class="alert" v-if="show">
      <div class="alert-banner">
        <button class="alert-close-button" @click="show = false">
          Fermer X
        </button>
      </div>
      <div class="alert-content">
        <div class="alert-text">Mon site est encore en travaux !</div>
      </div>
    </div>
    <div class="main-sections" id="accueil">
      <img
        src="./../assets/images/Turquoise.webp"
        id="turquoise"
        alt="background_turquoise"
      />
      <Accueil />
    </div>

    <div class="main-sections" id="parcours">
      <img
        :src="
          require('./../assets/images/' +
            (() => {
              switch (this.$store.state.parcours) {
                case 'apu':
                  return 'Jaune.webp';
                case 'iut':
                  return 'Bordeaux.webp';
                default:
                  return 'Bleu.webp';
              }
            })())
        "
        id="bleu"
        alt="background_bleu"
      />
      <Parcours />
    </div>
    <div class="main-sections" id="projets">
      <img
        src="./../assets/images/Violet.webp"
        id="violet"
        alt="background_violet"
      />
      <Projets />
    </div>
  </div>
</template>

<script setup>
import Accueil from "../sections/Accueil.vue";
import Parcours from "../sections/Parcours.vue";
import Projets from "../sections/Projets.vue";

import { onMounted, ref } from "vue";
import { useStore } from "@nuxtjs/composition-api";

const show = ref(true);

onMounted(() => {
  useStore().commit(
    "handleSectionHeight",
    document.getElementById("parcours").offsetTop
  );
});
</script>

<style lang="scss">
.alert {
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  min-width: 900px;
  height: 280px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f8c51e;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &-banner {
    height: 80px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: url(https://images.assetsdelivery.com/compings_v2/yevgenijd/yevgenijd1705/yevgenijd170500275.jpg)
      no-repeat;
    background-size: cover;
    display: flex;
    justify-content: flex-end;
  }

  &-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-close-button {
    color: white;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    margin: 20px;
    text-shadow: 0 0 5px black;
  }
}

#main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main-sections {
  height: 100vh;
  min-height: 800px;
  width: 100%;
  max-width: 1600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  // border-bottom: 1px solid black;
}

#turquoise {
  position: absolute;
  top: -230px;
  left: -380px;
  z-index: -1;
}
#bleu {
  position: absolute;
  right: -350px;
  bottom: -316px;
  z-index: -1;
}

#violet {
  position: absolute;
  left: -290px;
  bottom: -181px;
  z-index: -1;
}
</style>
