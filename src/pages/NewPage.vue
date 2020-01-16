<template>
  <stories-page name="new" get-action="stories/getNewStories" />
</template>

<script>
import StoriesPage from '../components/StoriesPage';

export default {
  components: {
    StoriesPage
  }
}
</script>