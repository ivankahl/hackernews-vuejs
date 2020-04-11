import axios from 'axios';

exports.handler = async (event, context) => {
  // Get the story ID
  const storyId = parseInt(event.path.split('/').slice(-1)[0]);
  if (isNaN(storyId)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Please enter an valid integer story ID.' })
    }
  }

  try {
    const story = (await axios.get(`${process.env.HN_DATABASE_URL}/item/${storyId}.json`)).data;

    if (story) {
      return {
        statusCode: 200,
        body: JSON.stringify(story)
      };
    }

    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Could not find the specified story.' })
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An unknown error occurred while retrieving the specified story.' })
    };
  }
}