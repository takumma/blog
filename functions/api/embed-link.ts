import fetch from "node-fetch";
import { Context, Callback, APIGatewayEvent } from 'aws-lambda'

interface EmbedLinkResponse {
  statusCode: number,
  body: string,
}

exports.handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  const params = event.queryStringParameters
  const ogps = await fetch(params?.url!)
    .then(resp => resp.text())
    .then(text => {
      const el = new DOMParser().parseFromString(text, "text/html")
      const headEls = (el.head.children)
      return Array.from(headEls).map(value => {
        const prop = value.getAttribute('property')
        if(!prop) return;
        return { prop: prop.replace("og:",""),content: value.getAttribute("content")}
      })
    })
  const resp: EmbedLinkResponse = {
    statusCode: 200,
    body: JSON.stringify({
      ...ogps
    })
  }

  callback(undefined, resp)
}
