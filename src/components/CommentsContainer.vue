<template>
  <div>
    <v-row dense class="mb-4">
      <v-col cols="12">
        <div class="overline">
          <v-icon small>mdi-comment</v-icon>
          &nbsp;
          <span v-if="!loaded">Loading comments...</span>
          <span v-else>{{ renderedComments.length }} comments</span>
        </div>
      </v-col>
    </v-row>
    <v-row 
      dense 
      v-for="comment in renderedComments" 
      :key="comment.id" >
      <v-col cols="12">
        <comment-card 
          :text="comment.text" 
          :author="comment.by"
          :style="{ marginLeft: `${comment.subLevel * 30}px` }" 
          :time="comment.time"/>
      </v-col>
    </v-row>
    <v-row dense v-if="!loaded">
      <v-col cols="12">
        <v-skeleton-loader class="my-3" type="list-item-avatar-three-line" v-for="i in [0,1,2,3,4,5,6,7]" :key="i"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import hackerNews from '../utils/hacker-news';

import CommentCard from './CommentCard';

export default {
  components: {
    CommentCard
  },
  data() {
    return {
      renderedComments: [],
      loaded: false
    }
  },
  async mounted() {
    for (const id of this.comments) {
      const nestedComments = await hackerNews.getCommentAndSubcomments(id);
      const flatComments = hackerNews.flattenComments([nestedComments]);
      
      this.renderedComments.push(...flatComments.filter(x => !(x.deleted || !x.text)));
    }

    this.loaded = true;
  },
  props: {
    comments: {
      type: Array,
      default: () => []
    }
  }
}
</script>