<template>
  <v-app-bar
    app
    clipped-left
    color="primary"
    dark
  >
    <v-app-bar-nav-icon @click="handleDrawerToggle"></v-app-bar-nav-icon>
    <div class="ml-3 mr-3">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="../assets/logo.png"
        width="40"
      />
    </div>
    <div class="title">HackerNews</div>

    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      drawer: this.value
    };
  },
  methods: {
    handleDrawerToggle() {
      this.drawer = !this.drawer;

      this.$emit('input', this.drawer);
    }
  }
}
</script>