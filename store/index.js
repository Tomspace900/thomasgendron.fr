export const state = () => ({
  lang: "fr",
  scrollpx: 0,
  parcours: "efrei",
  sectionHeight: 1000,
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
  handleSectionHeight(state, height) {
    state.sectionHeight = height;
  },
};

export const getters = {};

export const actions = {};
