import '@nuxtjs/feed'

let articles = []

export const create = async (feed, args) => {
  const [, ext] = args
  const hostname =
    process.env.NODE_ENV === 'production'
      ? 'https://blog.takumma.net'
      : 'http://localhost:3000'
  feed.options = {
    title: "takumma's blog",
    description: "takumma's blog feed",
    link: `${hostname}/feed.${ext}`,
  }
  const { $content } = require('@nuxt/content')
  articles = await $content('articles', { text: true }).fetch()

  articles.forEach((article) => {
    const url = `${hostname}/${article.slug}`
    feed.addItem({
      title: article.title,
      id: url,
      link: url,
      date: new Date(new Date(article.date).getTime() + 1000 * 60 * 60 * 9),
      description: `This is personal feed of ${article.title}`,
      content: article.text.slice(0, 200) + '...',
    })
  })

  return feed
}
