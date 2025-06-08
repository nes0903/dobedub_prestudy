const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('../pages/LoginPage.vue')
  },
  {
    path: '/creator',
    component: () => import('../pages/CreatorHomePage.vue')
  },
  {
    path: '/chat/:channelUrl',
    component: () => import('../pages/ChatPage.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/ErrorNotFound.vue')
  }
]

export default routes
