import axios from 'axios';

const FEEDS = ['top', 'new', 'best', 'ask', 'show', 'job'];

exports.handler = async (event, context) => {
  // Get the feed name and validate it
  const feedName = event.path.split('/').slice(-1)[0];
  if (!FEEDS.includes(feedName)) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'The specified feed could not be found. Please specify a valid feed.' })
    };
  }

  // Get paging parameters if possible
  const n = isNaN(parseInt(event.queryStringParameters['n'])) ? 10 : parseInt(event.queryStringParameters['n']);
  const p = isNaN(parseInt(event.queryStringParameters['p'])) ? 1 : parseInt(event.queryStringParameters['p']);

  try {
    // Get the story IDs
    const storyIds = (await axios.get(`${process.env.HN_DATABASE_URL}/${feedName}stories.json`)).data.slice((p - 1) * n, p * n);

    // Retrieve each story asynchronously
    const stories = await Promise.all(storyIds.map(async (storyId) => {
      return (await axios.get(`${process.env.HN_DATABASE_URL}/item/${storyId}.json`)).data
    }));

    // Return the stories on the page
    return {
      statusCode: 200,
      body: JSON.stringify(stories)
    }
  } catch(e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.toString() })
    };
  } 
}