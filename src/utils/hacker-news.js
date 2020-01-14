import axios from 'axios';

const hackernewsAxios = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0'
});

async function getItem(id) {
  return (await hackernewsAxios.get(`/item/${id}.json`)).data;
}

async function getTopStoryIds() {
  return (await hackernewsAxios.get('/topstories.json')).data;
}

async function getNewStoryIds() {
  return (await hackernewsAxios.get('/newstories.json')).data;
}

async function getBestStoryIds() {
  return (await hackernewsAxios.get('/beststories.json')).data;
}

async function getAskStoryIds() {
  return (await hackernewsAxios.get('/askstories.json')).data;
}

async function getShowStoryIds() {
  return (await hackernewsAxios.get('/showstories.json')).data;
}

async function getJobStoryIds() {
  return (await hackernewsAxios.get('/jobstories.json')).data;
}

export default {
  getItem,
  getTopStoryIds,
  getNewStoryIds,
  getBestStoryIds,
  getAskStoryIds,
  getShowStoryIds,
  getJobStoryIds
};