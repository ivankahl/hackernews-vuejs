<template>
  <v-navigation-drawer
    v-model="value"
    app
    clipped
    >
    <v-list
      dense
      nav>
      <template
        v-for="(item, i) in menuItems">
        <v-subheader
          :key="i"
          v-if="item.heading">
          {{ item.heading }}
        </v-subheader>
        <v-divider
          v-else-if="item.divider"
          :key="i"
          class="my-2"/> 
        <v-list-item 
          v-else
          :key="i"
          :to="item.path"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <div class="mt-3 text-center grey--text caption">Developed by <a target="_blank" class="grey--text" href="https://ivankahl.com/">Ivan Kahl</a></div>
  </v-navigation-drawer>
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
      menuItems: [
        {
          path: '/',
          icon: 'mdi-chart-line-variant',
          title: 'Top'
        },
        {
          path: '/new',
          icon: 'mdi-clock',
          title: 'New'
        },
        {
          path: '/best',
          icon: 'mdi-star',
          title: 'Best'
        },
        {
          path: '/ask',
          icon: 'mdi-help',
          title: 'Ask HN'
        },
        {
          path: '/show',
          icon: 'mdi-projector-screen',
          title: 'Show HN'
        },
        {
          path: '/jobs',
          icon: 'mdi-briefcase',
          title: 'Jobs'
        },
      ]
    };
  }
}
</script>