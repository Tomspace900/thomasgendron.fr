<template>
  <div
    class="header"
    :style="{
      backgroundColor: 'rgba(255, 255, 255,' + opacity(40) + ')',
      boxShadow: '0px 0px 82px rgba(0, 0, 0,' + opacity(40) / 10 + ')',
    }"
  >
    <NuxtLink
      to="/"
      class="header-left"
      v-if="opacity(40) > 0"
      :style="{ opacity: opacity(40) }"
    >
      <img id="logo" src="../assets/images/Logo.svg" alt="logo" />
      <span id="title">Thomas GENDRON</span>
    </NuxtLink>

    <span
      v-if="$nuxt.$route.path == '/' && opacity(2 * cathHeight - offset) > 0"
      id="category"
      >projets
    </span>
    <span
      v-else-if="$nuxt.$route.path == '/' && opacity(cathHeight - offset) > 0"
      :style="{ opacity: opacity(cathHeight - offset) }"
      id="category"
      >parcours
    </span>
    <div id="language">
      <div
        id="language-fr"
        @click="() => this.$store.commit('toggleLang', 'fr')"
        :class="lang == 'fr' ? 'active' : ''"
      >
        Français
      </div>
      <div
        id="language-en"
        @click="() => this.$store.commit('toggleLang', 'en')"
        :class="lang == 'en' ? 'active' : ''"
      >
        English
      </div>

      <div id="language-indicator"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "@nuxtjs/composition-api";

const store = useStore();
const lang = computed(() => store.state.lang);
const scrollpx = computed(() => store.state.scrollpx);
const cathHeight = window.innerHeight;
const offset = 90;

const opacity = (start) => {
  if ($nuxt.$route.path == "/") {
    if (scrollpx.value >= start && scrollpx.value < 100 + start) {
      return (scrollpx.value - start) / 100;
    } else if (scrollpx.value >= 100 + start) {
      return 1;
    } else return 0;
  } else return 1;
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  height: 90px;
  z-index: 10;

  &-left {
    display: flex;
    align-items: center;
    min-width: 33%;
  }
}

#logo {
  margin-left: 4%;
  height: 50px;
  width: 50px;
}

#title {
  margin-left: 4%;
}

#category {
  width: 34%;
  text-align: center;
  font-family: var(--font-second);
  color: var(--bleu);
}

#language {
  position: absolute;
  right: 100px;
  top: 20px;
  width: 300px;
  display: flex;
  justify-content: space-between;
  z-index: 1;

  &-fr,
  &-en {
    text-align: center;
    width: 50%;
    font-size: 0.85rem;
    padding: 0 5px 5px 5px;
    cursor: pointer;
  }

  &-fr.active ~ &-indicator {
    left: 0;
  }

  &-en.active ~ &-indicator {
    left: 50%;
  }

  &-indicator {
    position: absolute;
    width: 50%;
    height: 2px;
    bottom: 0;
    background: black;
    transition: 0.3s ease;
  }
}
</style>
