import Vue from 'vue';
import VueRouter from 'vue-router';

import TopPage from '../pages/TopPage'; 
import NewPage from '../pages/NewPage';
import BestPage from '../pages/BestPage';
import AskPage from '../pages/AskPage';
import StoryPage from '../pages/StoryPage';

Vue.use(VueRouter);

const routes = [
  {
    name: 'top',
    path: '/',
    component: TopPage,
    meta: {
      title: 'Top Stories - HackerNews'
    }
  },
  {
    name: 'new',
    path: '/new',
    component: NewPage,
    meta: {
      title: 'New Stories - HackerNews'
    }
  },
  {
    name: 'best',
    path: '/best',
    component: BestPage,
    meta: {
      title: 'Best Stories - HackerNews'
    }
  },
  {
    name: 'ask',
    path: '/ask',
    component: AskPage,
    meta: {
      title: 'Ask HN - HackerNews'
    }
  },
  {
    name: 'story',
    path: '/story/:id',
    props: true,
    component: StoryPage,
    meta: {
      title: 'Loading Story... - HackerNews'
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'HackerNews';
  next();
});

export default router;