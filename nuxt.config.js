import { create } from './modules/feed';

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "takumma's blog",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "takumma's blog site" },
      { hid: 'og:site_name', property: 'og:site_name', content: "takumma's blog" },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://blog.takumma.net' },
      { hid: 'og:title', property: 'og:title', content: "takumma's blog" },
      { hid: 'og:description', property: 'og:description', content: "takumma's blog site" },
      { hid: 'og:image', property: 'og:image', content: 'https://res.cloudinary.com/dykntmxnh/image/upload/v1616648526/default_ogp_cunef8.png' },
      { hid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { hid: 'shortcut-icon', rel: 'shortcut-icon', href: '/favicon.ico'},
      { hid: 'apple-touch-icon', rel: 'apple-touch-icon', href: '/favicon.ico'}
    ],
  },

  publicRuntimeConfig: {
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-youtube'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/google-analytics'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxt/content',
    '@nuxtjs/feed',
    '@nuxtjs/proxy'
  ],

  feed: [
    {
      path: '/feed.xml',
      create,
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
      data: [ 'articles', 'xml' ]
    },
  ],

  proxy: {
    '/.netlify/functions': {
      target: 'http://localhost:9000'
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: '/'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ja',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
    },
  },

  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css',
      },
    },
  },

  generate: {
    fallback: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
