<template>
  <div id="main">
    <div class="main-sections" id="accueil">
      <nuxt-img
        format="webp"
        src="/images/Turquoise.png"
        id="turquoise"
        alt="background_turquoise"
      />
      <Accueil />
    </div>

    <div class="main-sections" id="parcours">
      <img
        :src="
          require('~/assets/images/' +
            (this.$store.state.parcours == 'apu'
              ? 'Jaune.png'
              : null || this.$store.state.parcours == 'iut'
              ? 'Bordeaux.png'
              : null || this.$store.state.parcours == 'efrei'
              ? 'Bleu.png'
              : null))
        "
        id="bleu"
        alt="background_bleu"
      />
      <Parcours />
    </div>

    <div class="main-sections" id="projets">
      <nuxt-img
        format="webp"
        src="/images/Violet.png"
        id="violet"
        alt="background_violet"
      />
      <Projets />
    </div>
  </div>
</template>

<script setup>
import { computed, useStore } from "@nuxtjs/composition-api";
import Accueil from "../sections/Accueil.vue";
import Parcours from "../sections/Parcours.vue";
import Projets from "../sections/Projets.vue";

const store = useStore();
const background = computed(() => {
  if (store.state.parcours == "apu") {
    return "Jaune.png";
  } else if (store.state.parcours == "iut") {
    return "Bordeaux.png";
  } else return "Bleu.png";
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
  border-bottom: 1px solid black;
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
