<template>
  <div id="main">
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

import { onMounted } from "vue";
import { useStore } from "@nuxtjs/composition-api";

onMounted(() => {
  useStore().commit(
    "handleSectionHeight",
    document.getElementById("parcours").offsetTop
  );
});
</script>

<style lang="scss">
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  // border-bottom: 1px solid black;
}

#turquoise {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

#bleu {
  position: absolute;
  right: 0;
  bottom: -316px;
  z-index: -1;
}

#violet {
  position: absolute;
  left: 0;
  bottom: -181px;
  z-index: -1;
}
</style>
