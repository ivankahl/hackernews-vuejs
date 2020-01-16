<template>
  <stories-page name="best" get-action="stories/getBestStories" />
</template>

<script>
import StoriesPage from '../components/StoriesPage';

export default {
  components: {
    StoriesPage
  }
}
</script>