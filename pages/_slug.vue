<template>
  <v-row justify="center" align="center" class="background">
    <v-col cols="12" sm="10" md="9" class="col-center">
      <article>
        <div class="py-3">
          {{ article.date }}
          <h1>{{ article.title }}</h1>
        </div>
        <div class="pb-3">
          <tag-tip
            v-for="tag in article.tags"
            :key="tag"
            class="my-1 mr-2"
            :tag="tag"
          ></tag-tip>
        </div>
        <nuxt-content :document="article"/>
        <div class="share py-3">
          share to ...
          <v-btn
            icon
            large
            class="pa-1"
            @click="shareTwitter()"
          >
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
          <v-btn
            icon
            large
            class="pa-1"
            @click="shareFaceBook()"
          >
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
        </div>
      </article>
    </v-col>
  </v-row>
</template>

<script>
const TagTip = () => import('@/components/TagTip.vue')
const ImageLoader = () => import('~/components/ImageLoader.vue')
const TweetCard = () => import('~/components/TweetCard.vue')
const YoutubeCard = () => import('~/components/YoutubeCard.vue')
const EmbedLink = () => import('~/components/EmbedLink.vue')

export default {

  async asyncData({ $content, params, error }) {
    try {
      const article = await $content('articles', params.slug).fetch()
      return { article: article };
    } catch {
      error({
        statusCode: 404,
        message: 'Page Not Found'
      });
    }
  },

  head() {
    return {
      title: this.article.title,
      meta: [
        { hid: 'og:url', property: 'og:url', content: `https://blog.takumma.net${this.$route.path}` },
        { hid: 'og:title', property: 'og:title', content: this.article.title },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:image', property: 'og:image', content: `https://res.cloudinary.com/dykntmxnh/image/upload/l_text:Sawarabi%20Gothic_100:${ this.article.title },co_rgb:000,w_1500,c_fit/v1616594506/blog_ogp.png` },
      ]
    }
  },

  components: {
    TagTip,
    ImageLoader,
    TweetCard,
    YoutubeCard,
    EmbedLink
  },

  methods: {
    shareTwitter() {
      const url = `https://twitter.com/intent/tweet?url=https://blog.takumma.net${this.$route.path}&text=${this.article.title}`
      window.open(url, '_blank')
    },

    shareFaceBook() {
      const url = `https://www.facebook.com/share.php?u=https://blog.takumma.net${this.$route.path}`
      window.open(url, '_blank')
    }
  }
}
</script>

<style lang="scss">

:root {
  --font-size-title: 1.7rem;
  --font-size-h1: 1.6rem;
  --font-size-h2: 1.4rem;
  --font-size-h3: 1.2rem;
  --font-size-h4: 1.15rem;
  --font-size-h5: 1.05rem;
  --article-padding: 1.0rem;
}

@media screen and (min-width:768px) {
  :root {
    --font-size-title: 2.0rem;
    --font-size-h1: 1.8rem;
    --font-size-h2: 1.55rem;
    --font-size-h3: 1.4rem;
    --font-size-h4: 1.25rem;
    --font-size-h5: 1.1rem;
    --article-padding: 2.0rem;
  }
}


.col-center {
  padding: 0px;
}

.background {
  background-color: #263238;
  width: 100%;
}

.container {
  all: unset;
}

.row {
  margin: 0;
}

.title-wrapper {
  margin: auto;
  max-width: 900px;
}

article {
  background-color: white;
  padding: var(--article-padding);
  max-width: 900px;
  margin: auto;
}

h1 {
  font-weight: bold;
  font-size: var(--font-size-title);
}

.share {
  text-align: right;
}

.nuxt-content {

  font-size: 1.05rem;

  h1 {
    font-size: var(--font-size-h1);
    border-bottom: solid 1.5px;
    border-bottom-color: #C3CEE3;
    padding-top: 1.5rem;
    margin-bottom: 1.5rem;

    code {
      font-size: var(--font-size-h1);
    }
  }

  h2 {
    font-size: var(--font-size-h2);
    border-bottom: solid 1.5px;
    border-bottom-color: #C3CEE3;
    padding-top: 1.0rem;
    margin-bottom: 1.0rem;

    code {
      font-size: var(--font-size-h2);
    }
  }

  h3 {
    font-size: var(--font-size-h3);
    padding-top: 0.5rem;
    margin-bottom: 0.5rem;

    code {
      font-size: var(--font-size-h3);
    }
  }

  h4 {
    font-size: var(--font-size-h4);
    padding-top: 0.5rem;
    margin-bottom: 0.5rem;

    code {
      font-size: var(--font-size-h4);
    }
  }

  h5 {
    font-size: var(--font-size-h5);

    code {
      font-size: var(--font-size-h5);
    }
  }

  p {
    font-size: 1.0rem;
  }

  code {
    font-size: 0.9rem;
    font-weight: 500;
    font-family: Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
  }

  ol {
    counter-reset: counter-name;

    li {
      margin: 0; 
      list-style: none;
    }

    li:before {
      counter-increment: counter-name;
      content: counter(counter-name) ".";
      position: absolute;
      left: 0;
      font-weight: bold;
    }
  }

  hr {
    border-top: 1.5px solid #C3CEE3;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  img {
    margin-top: 1.0rem;
    margin-bottom: 1.5rem;
  }

  blockquote {
    color: #777;
    padding-left: 1rem;
    border-left: solid 5px #C3CEE3;
  }
}

.nuxt-content-highlight {
  position: relative;
}

.nuxt-content-highlight .filename {
  position: absolute;
  right: 0;
  color: darkgray;
  font-weight: 300;
  z-index: 2;
  margin-right: 0.5rem;
  margin-top: 0.25rem;
  font-size: 1.0rem;
}

</style>