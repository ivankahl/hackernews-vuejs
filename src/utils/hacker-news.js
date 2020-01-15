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

function flattenComments(comments, subLevel) {
  if (!subLevel) subLevel = 0;
  
  let flattenedComments = [];

  for (const comment of comments) {
    const parentComment = { 
      by: comment.by,
      id: comment.id,
      parent: comment.parent,
      text: comment.text,
      time: comment.time,
      subLevel,
    };

    flattenedComments = [
      ...flattenedComments, 
      parentComment,
      ...(comment.kids ? flattenComments(comment.kids, subLevel + 1) : [])
    ];
  }

  return flattenedComments;
}

async function getCommentAndSubcomments(kidId) {
  const comment = await getItem(kidId);

  if (comment.kids) {
    for (let i = 0; i < comment.kids.length; i++) {
      comment.kids[i] = await getCommentAndSubcomments(comment.kids[i]);
    }
  }

  return comment;
}

export default {
  getItem,
  getTopStoryIds,
  getNewStoryIds,
  getBestStoryIds,
  getAskStoryIds,
  getShowStoryIds,
  getJobStoryIds,
  getCommentAndSubcomments,
  flattenComments
};