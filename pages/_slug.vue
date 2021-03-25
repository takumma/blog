<template>
  <v-row justify="center" align="center" class="background">
    <v-col cols="12" sm="10" md="9" class="col-center">
      <article>
        <div class="py-3">
          {{ formatedDate(article.createdAt) }}
          <h1>{{ article.title }}</h1>
        </div>
        <v-row class="pb-3">
          <v-col
            v-for="tag in article.tags"
            :key="tag"
            class="py-1 px-1"
          >
            <tag-tip :tag="tag"></tag-tip>
          </v-col>
        </v-row>
        <nuxt-content :document="article"/>
      </article>
    </v-col>
  </v-row>
</template>

<script>
const TagTip = () => import('@/components/TagTip.vue')

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
        { hid: 'og:url', property: 'og:url', content: 'https://blog.takumma.net' + this.$route.path },
        { hid: 'og:title', property: 'og:title', content: this.article.title },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:image', property: 'og:image', content: `https://res.cloudinary.com/dykntmxnh/image/upload/l_text:Sawarabi%20Gothic_100:${ this.article.title },co_rgb:000,w_1500,c_fit/v1616594506/blog_ogp.png` },
      ]
    }
  },

  components: {
    TagTip,
  },

  methods: {
    formatedDate(date) {
      if(date) return date.slice(0, 10).replace(/-/g, '/');
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

.nuxt-content {

  font-size: 1.05rem;

  h1 {
    font-size: var(--font-size-h1);
    border-bottom: solid 1.5px;
    border-bottom-color: #C3CEE3;
    padding-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: var(--font-size-h2);
    border-bottom: solid 1.5px;
    border-bottom-color: #C3CEE3;
    padding-top: 1.0rem;
    margin-bottom: 1.0rem;
  }

  h3 {
    font-size: var(--font-size-h3);
    padding-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  h4 {
    font-size: var(--font-size-h4);
    padding-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  h5 {
    font-size: var(--font-size-h5);
  }

  p {
    font-size: 1.0rem;
  }

  code {
    font-size: 0.95rem;
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