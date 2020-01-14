<template>
  <v-card style="min-height: 110px" class="d-flex align-stretch my-3 non-selectable" @click="handleClick">
    <div class="points-container text-center grey lighten-4 py-2">
      <v-container>
        <div class="display-1">{{ points }}</div>
        <div class="caption grey--text text--darken-1">points</div>
      </v-container>
    </div>
    <v-container class="mx-2 d-flex flex-column">
      <h2 class="headline mt-1" style="line-height: 1.2">
        {{ title }} 
      </h2> 
      <div class="caption mb-2">
        <a class="story-link grey--text text--darken-1" v-if="link" :href="link" target="_blank">{{ link }}</a>
      </div>
      <div class="overline mb-1 mt-auto">
        <span class="mr-1" v-if="relativeTime">
          <v-icon small>mdi-clock</v-icon>
          &nbsp;
          {{ relativeTime }}
        </span>
        <span class="mr-1" v-if="author">
          <v-icon small>mdi-account</v-icon>
          &nbsp;
          {{ author }}
        </span>
        <span class="mr-1" v-if="comments">
          <v-icon small>mdi-comment</v-icon>
          &nbsp;
          {{ comments }} comments
        </span>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import dateHelpers from '../utils/date-helpers';

export default {
  props: {
    id: {
      type: Number
    },
    title: {
      type: String
    },
    link: {
      type: String,
      default: null
    },
    points: {
      type: Number,
      default: 0
    },
    time: {
      type: Number,
      default: 0
    },
    author: {
      type: String,
      default: 'Anonymous'
    },
    comments: {
      type: Number,
      default: 0
    }
  },
  computed: {
    relativeTime() {
      return dateHelpers.convertUnixTimeToRelativeTime(this.time);
    }
  },
  methods: {
    handleClick(e) {
      if(e.target.tagName !== "A") {
        this.$router.push(`/story/${this.id}`);
      }
    }
  }
}
</script>

<style scoped>
.points-container {
  width: 7.5rem;
}

.story-link {
  text-decoration: none;
}

.story-link:hover {
  text-decoration: underline;
}

.non-selectable {
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
}
</style>