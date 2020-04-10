import firebase from 'firebase/app';

exports.handler = async (event, context) => {
  //const app = firebase.initializeApp({ databaseURL:  })

  return {
    statusCode: 200,
    body: `${process.env.HN_DATABASE_URL} ${process.env.HN_VERSION} ${event.name}`
  }
}