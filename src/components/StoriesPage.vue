<template>
  <base-page>
    <div v-if="this.pageStoriesLoaded">
      <story-card v-for="item in pageStories" :key="item.id" :id="item.id" :title="item.title" :points="item.score" :author="item.by" :time="item.time" :comments="(item.kids || []).length" :link="item.url" />
      <div class="d-flex justify-space-between align-center">
        <div v-if="page === 1" style="width:110px;"></div>
        <v-btn 
          v-if="page > 1" 
          text 
          rounded
          @click="$router.push({ name: 'top', query: { p: page - 1 }})">
          <v-icon>mdi-arrow-left</v-icon>
          &nbsp;
          Newer
        </v-btn>
        <div class="body-1">Page {{ page }}</div>
        <v-btn 
          text
          rounded
          @click="$router.push({ name: 'top', query: { p: page + 1 }})">
          Older
          &nbsp;
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </div>
    <div v-else>
      <v-skeleton-loader class="my-3" v-for="i in [0,1,2,3,4,5,6,7,8,9]" :key="i" type="card-heading, list-item"/>
    </div>
  </base-page>
</template>

<script>
import BasePage from './BasePage';
import StoryCard from './StoryCard';

const pageSize = 10;

export default {
  components: {
    BasePage,
    StoryCard
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    getAction: {
      type: String,
      default: ''
    }
  },
  mounted() {
    if (this.$store.state.stories[this.name].length === 0) {
      this.$store.dispatch(this.getAction, { 
        pageNumber: parseInt(this.$route.query.p) || 1,
        pageCount: pageSize
      });
    }
  },
  computed: {
    allStories() { return this.$store.state.stories[this.name]; },
    page() { return parseInt(this.$route.query.p) || 1; },
    pageStories() { return this.allStories.slice((this.page - 1) * pageSize, this.page * pageSize); },
    pageStoriesLoaded() { return this.pageStories.filter(x => !x.type).length === 0 && this.pageStories.length > 0; },
  },
  watch: {
    page: {
      handler() {
        window.scrollTo(0,0);
      },
      immediate: true
    }
  }
}
</script>