<template>
  <a v-if="link" :href="link" target="_blank">
    <span v-if="textFR || textEN" class="bubble-text">{{
      lang == "en" ? textEN : textFR
    }}</span>
    <img
      v-if="icon"
      :class="textFR || textEN ? 'bubble-icon' : ''"
      :src="require('../assets/images/' + icon)"
      alt="bubble-icon"
    />
  </a>
  <div v-else @click="scrollTo ? $emit('scrollDown', scrollTo) : null">
    <span v-if="textFR || textEN" class="bubble-text">{{
      lang == "en" ? textEN : textFR
    }}</span>
    <img
      v-if="icon"
      :class="textFR || textEN ? 'bubble-icon' : ''"
      :src="require('../assets/images/' + icon)"
      alt="bubble-icon"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  lang: String,
  textFR: String,
  textEN: String,
  icon: String,
  scrollTo: String,
  link: String,
});
</script>

<style lang="scss" scoped>
.bubble-text {
}

.bubble-icon {
  padding-left: 20px;
}
</style>
