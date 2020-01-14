import hackerNews from '../utils/hacker-news';

export default {
  namespaced: true,
  state: {
    top: [],
    selected: null
  },
  mutations: {
    setStories(state, { storyName, stories }) {
      state[storyName] = stories
    }
  },
  actions: {
    async getTopStories({ commit }, { pageNumber, pageCount }) {
      commit('setStories', {
        storyName: 'top',
        stories: []
      });

      const stories = (await hackerNews.getTopStoryIds()).splice(pageCount * (pageNumber - 1), pageCount);

      for (let i = 0; i < stories.length; i++) {
        stories[i] = await hackerNews.getItem(stories[i])
      }

      commit('setStories', {
        storyName: 'top', 
        stories
      });
    }
  }
}