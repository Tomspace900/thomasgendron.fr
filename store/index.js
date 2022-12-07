export const state = () => ({
  lang: "fr",
  scrollpx: 0,
  parcours: "efrei",
});

export const mutations = {
  toggleLang(state, language) {
    state.lang = language;
  },

  handleScroll(state, scrolly) {
    state.scrollpx = scrolly;
  },

  toggleParcours(state, school) {
    state.parcours = school;
  },
};

export const getters = {};

export const actions = {};
