import moment from 'moment';

function convertUnixTimeToRelativeTime(unixTime) {
  return moment.unix(unixTime).fromNow();
}

export default {
  convertUnixTimeToRelativeTime
}