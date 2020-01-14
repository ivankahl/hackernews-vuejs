<template>
  <base-page>
    <div v-if="this.stories.length > 0">
      <story-card v-for="item in stories" :key="item.id" :id="item.id" :title="item.title" :points="item.score" :author="item.by" :time="item.time" :comments="(item.kids || []).length" :link="item.url" />
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
import BasePage from '../components/BasePage';
import StoryCard from '../components/StoryCard';

export default {
  components: {
    BasePage,
    StoryCard
  },
  computed: {
    stories() { return this.$store.state.stories.top; },
    page() { return parseInt(this.$route.query.p) || 1; }
  },
  watch: {
    page: {
      handler(page) {
        this.$store.dispatch('stories/getTopStories', { pageNumber: page, pageCount: 10 });
        window.scrollTo(0,0);
      },
      immediate: true
    }
  }
}
</script>