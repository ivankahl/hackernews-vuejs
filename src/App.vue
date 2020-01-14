<template>
  <v-app>
    <the-app-bar v-model="drawer"/>
    <the-navigation-drawer v-model="drawer"/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import TheAppBar from './components/TheAppBar';
import TheNavigationDrawer from './components/TheNavigationDrawer';

export default {
  name: 'App',

  components: {
    TheAppBar,
    TheNavigationDrawer
  },

  data() {
    return {
      drawer: true
    }
  }
};
</script>
