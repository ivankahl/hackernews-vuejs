<template>
  <v-app>
    <the-app-bar v-model="drawer"/>
    <the-navigation-drawer v-model="drawer"/>
    <v-content>
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.15s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>