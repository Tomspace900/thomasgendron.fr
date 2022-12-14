<template>
  <div id="wrapper">
    <img
      src="./../assets/images/Photo_Accueil.webp"
      id="thomas"
      alt="profile-pic"
    />
    <div class="left">
      <h1 id="title">
        Thomas <br />
        GENDRON
      </h1>
      <hr id="line" />
      <div v-if="lang == 'en'" id="desc">
        Hello it's a test I'm Thomas I'm struggling to find an idea of design
      </div>
      <div v-else id="desc">
        Bonjour c'est un test moi c'est Thomas je galère à trouver une idée de
        design
      </div>
    </div>

    <Bubble
      class="bubble"
      id="bubble-myprojects"
      @scrollDown="scrollDown"
      :scrollTo="'projets'"
      :lang="lang"
      :textFR="'Mes projets'"
      :textEN="'My projects'"
    />
    <Bubble
      class="bubble"
      id="bubble-myresume"
      :lang="lang"
      :textFR="'Mon CV'"
      :textEN="'My resume'"
      :icon="'download-black.svg'"
      :link="'https://onedrive.live.com/download?cid=CA608DF00D748098&resid=CA608DF00D748098%21112823&authkey=AE51YlWlObeAMg4&em=2'"
    />
    <Bubble
      class="bubble-logo"
      id="bubble-github"
      :icon="'Github_Logo.png'"
      :link="'https://github.com/Tomspace900'"
    />
    <Bubble
      class="bubble-logo"
      id="bubble-linkedin"
      :icon="'Linkedin_Logo.png'"
      :link="'https://www.linkedin.com/in/gendron-thomas/'"
    />

    <img
      src="../assets/images/Arrow.svg"
      id="arrow"
      @click="scrollDown('parcours')"
      alt="arrow"
    />
  </div>
</template>

<script setup>
import Bubble from "../components/Bubble.vue";
import { computed } from "vue";
import { useStore } from "@nuxtjs/composition-api";

const lang = computed(() => useStore().state.lang);

function scrollDown(string) {
  const el = document.querySelector("#" + string);
  if (el) {
    el.scrollIntoView({
      block: "start", // par defaut
      inline: "nearest", // par defaut
      behavior: "smooth",
    });
  }
}
</script>

<style lang="scss" scoped>
#wrapper {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.left {
  position: absolute;
  left: 5%;
  top: 100px;
}

#title {
  margin-left: 110px;
  font-size: 3.6rem;
  font-weight: 100;
}

#line {
  height: 1px;
  width: 200px;
  background-color: black;
  margin: 25px 0 48px 0;
}

#desc {
  width: 530px;
}

#thomas {
  position: absolute;
  right: 0;
  bottom: -10px;
  max-width: 50vw;
  max-height: 85%;
  object-fit: contain;
}

.bubble {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 27px;
  background: #ffffff;
  box-shadow: var(--shadow-bubble);
  border-radius: 30px;
  cursor: pointer;
}

#bubble-myprojects {
  position: absolute;
  left: 756px;
  top: 404px;
}

#bubble-myresume {
  position: absolute;
  right: 80px;
  bottom: 40px;
}

.bubble-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 13px;
  width: 70px;
  height: 70px;
  box-shadow: var(--shadow-bubble);
  border-radius: 20px;
  cursor: pointer;
}

#bubble-github {
  position: absolute;
  right: 85px;
  bottom: 450px;
  background: linear-gradient(60deg, #161b22 30%, #ffffff 139.52%);
}

#bubble-linkedin {
  position: absolute;
  width: 70px;
  height: 70px;
  left: 743px;
  bottom: 115px;
  background: linear-gradient(60deg, #0279b5 30%, #ffffff 127.15%);
}

#arrow {
  position: absolute;
  bottom: 50px;
  left: 300px;
  cursor: pointer;
}
</style>
