<template>
  <v-card outlined class="pa-2">
    <v-container>
      <div class="d-flex">
        <v-avatar color="blue">
          <span class="white--text subtitle-1">{{ avatar }}</span>
        </v-avatar>
        <div class="ml-4">
          <div class="overline mb-2">{{ author }} - {{ relativeTime }}</div>
          <div class="body-2" v-html="text"></div>
        </div>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import dateHelpers from '../utils/date-helpers';

export default {
  props: {
    text: {
      type: String,
      default: ""
    },
    author: {
      type: String,
      default: ""
    },
    time: {
      type: Number,
      default: 0
    }
  },
  computed: {
    avatar() { 
      return this.author.split(' ').map(x => x[0]).slice(0, 2).join('').toUpperCase();
    },
    relativeTime() { 
      return dateHelpers.convertUnixTimeToRelativeTime(this.time);
    }
  }
}
</script>