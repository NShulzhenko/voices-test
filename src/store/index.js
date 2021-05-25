import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { getVoiceList } from "./../api/voices";

const state = {
  items: [],
  favouriteIds: [],
  tags: [
    { text: "All", value: "" },
    { text: "Misc", value: "misc" },
    { text: "Devices", value: "devices" },
    { text: "Human", value: "human" },
    { text: "Robotic", value: "robotic" },
    { text: "Sing", value: "sing" },
    { text: "Environment", value: "environment" },
    { text: "Character", value: "character" },
    { text: "Horror", value: "horror" }
  ]
};

const mutations = {
  setItems: (state, items) => {
    state.items = items;
  },

  addFavouriteId: (state, id) => {
    state.favouriteIds.push(id);
  },

  removeFavouriteId: (state, id) => {
    state.favouriteIds = state.favouriteIds.filter(item => item !== id);
  },
};

const actions = {
  async fetchVoices({ commit }) {
    let result;

    try {
      result = await getVoiceList();
    } catch (e) {
      console.error(e);
    }

    if (result) {
      commit("setItems", result);
    }
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
