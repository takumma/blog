import { Context, Callback, APIGatewayEvent } from 'aws-lambda'

exports.handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  const params = event.queryStringParameters
  const url = params?.url;
  if(!url){
    callback("400", {});
    return
  }
  const parser = require("ogp-parser")
  const response = await parser(url, { skipOembed: true })
    .then((data: any) => {
      const siteName = data.ogp["og:site_name"] || [""]
      const title = data.title
      const description = data.seo.description || data.ogp["oG:description"] || [""]
      const image = data.ogp["og:image"] || [""]
      const twitterCard = data.seo["twitter:card"] || data.ogp["twitter:card"] || [""]
      return {
        statusCode: 200,
        "headers": { "Content-Type": "application/json; charset=utf-8"},
        body: JSON.stringify({
          url: url,
          siteName: siteName[0],
          title: title,
          description: description[0],
          image: image[0],
          twitterCard: twitterCard[0],
        })
      }
  })
  callback(null, response)
}

// const encoding = require('encoding-japanese');
// const ogp = Object.fromEntries(
//   Object.entries(data.ogp)
//     .map(([key, val]: [string, any]) => [
//       key,
//       encoding.convert(val[0], {
//         to: 'UTF8',
//         from: encoding.detect( data.title)
//       })
//     ])
// )