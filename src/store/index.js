import Vue from 'vue';
import Vuex from 'vuex';

import ModuleStories from './module-stories';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    stories: ModuleStories
  }
});