import hackerNews from '../utils/hacker-news';

export default {
  namespaced: true,
  state: {
    top: [],
    new: [],
    best: [],
    ask: [],
  },
  mutations: {
    setStories(state, { storyName, stories }) {
      state[storyName] = stories
    },
    setStory(state, { storyName, storyIndex, story }) {
      state[storyName] = [
        ...state[storyName].slice(0, storyIndex), 
        story,
        ...state[storyName].slice(storyIndex + 1, state[storyName].length)
      ];
    }
  },
  actions: {
    async getStories({ commit }, { storyName, stories, pageNumber, pageCount }) {
      commit('setStories', {
        storyName, 
        stories
      });

      if (pageNumber && pageCount) {
        for (let i = pageCount * (pageNumber - 1) - 1; i <= pageCount * pageNumber; i++) {
          commit('setStory', {
            storyName,
            storyIndex: i,
            story: await hackerNews.getItem(stories[i])
          });
        }
      }

      for (let i = 0; i < stories.length; i++) {
        if (!stories[i].type) {
          commit('setStory', {
            storyName,
            storyIndex: i,
            story: await hackerNews.getItem(stories[i])
          });
        }
      }
    },
    async getTopStories({ dispatch }, { pageNumber, pageCount }) {
      dispatch('getStories', { 
        pageNumber, 
        pageCount,
        storyName: 'top',
        stories: await hackerNews.getTopStoryIds() 
      });
    },
    async getNewStories({ dispatch }, { pageNumber, pageCount }) {
      dispatch('getStories', { 
        pageNumber, 
        pageCount,
        storyName: 'new',
        stories: await hackerNews.getNewStoryIds() 
      });
    },
    async getBestStories({ dispatch }, { pageNumber, pageCount }) {
      dispatch('getStories', { 
        pageNumber, 
        pageCount,
        storyName: 'best',
        stories: await hackerNews.getBestStoryIds() 
      });
    },
    async getAskStories({ dispatch }, { pageNumber, pageCount }) {
      dispatch('getStories', { 
        pageNumber, 
        pageCount,
        storyName: 'ask',
        stories: await hackerNews.getAskStoryIds() 
      });
    }
  }
}