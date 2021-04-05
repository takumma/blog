let articles = [];

export const create = async (feed, args) => {
  const [filePath, ext] = args;
  const hostname = process.NODE_ENV === 'production' ? 'https://blog.takumma.net' : 'http://localhost:3000';
  feed.options = {
    title: "takumma's blog",
    description: "takumma's blog fee",
    link: `${hostname}/feed.${ext}`
  }
  const { $content } = require('@nuxt/content')
  articles = await $content('articles').fetch();

  articles.forEach(article => {
    console.log('article: ' + article.title)
    const url = `${hostname}/${article.slug}`;
    feed.addItem({
      title: article.title,
      id: url,
      link: url,
      tags: article.tags,
      createdAt: article.date,
      description: `This is personal feed of ${article.title}`,
      content: article.toc
    });
  })

  console.log(feed)

  return feed;
}