<template>
  <base-page>
    <v-card v-if="story" class="mt-2">
      <v-container class="pa-6">
        <v-row dense>
          <v-col cols="12">
            <div class="d-flex">
              <v-btn text icon class="mb-1 mr-2" @click="goBack">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              <div>
                <h2 class="display-1">
                  {{ title }}
                </h2>
                <div class="caption mb-2">
                  <a class="story-link grey--text text--darken-1" v-if="link" :href="link" target="_blank">{{ link }}</a>
                </div>
                <div class="overline mt-4">
                  <span class="mr-1" v-if="time">
                    <v-icon small>mdi-clock</v-icon>
                    &nbsp;
                    {{ time }}
                  </span>
                  <span class="mr-1" v-if="author">
                    <v-icon small>mdi-account</v-icon>
                    &nbsp;
                    {{ author }}
                  </span>
                </div>
              </div>
            </div>
            
          </v-col>
        </v-row>
      </v-container>
      <div v-if="text">
        <v-divider/>
        <v-container class="pa-6">
          <v-row dense>
            <v-col cols="12">
              <div v-html="text"></div>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <v-divider />
      <v-container class="pa-6">
        <comments-container :comments="comments"/>
      </v-container>
    </v-card>
  </base-page>
</template>

<script>
import BasePage from '../components/BasePage';
import CommentsContainer from '../components/CommentsContainer';

import hackerNews from '../utils/hacker-news';
import dateHelpers from '../utils/date-helpers';
import domHelpers from '../utils/dom-helpers';

export default {
  components: {
    BasePage,
    CommentsContainer
  },
  props: {
    id: {
      type: String
    }
  },
  data() { 
    return {
      story: null
    }
  },
  async mounted() { 
    this.story = await hackerNews.getItem(this.id);
  },
  computed: {
    title() { return domHelpers.htmlDecode(this.story.title); },
    link() { return this.story.url; },
    points() { return this.story.score; },
    author() { return this.story.by; },
    time() { return dateHelpers.convertUnixTimeToRelativeTime(this.story.time); },
    text() { return this.story.text; },
    comments() { return this.story.kids; }
  },
  watch: {
    story(value) {
      document.title = value.title + " - HackerNews"
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.story-link {
  text-decoration: none;
}

.story-link:hover {
  text-decoration: underline;
}
</style>