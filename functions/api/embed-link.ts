import { Context, Callback, APIGatewayEvent } from 'aws-lambda'
import { JSDOM } from 'jsdom'
import axios from "axios";
import fetch from 'node-fetch';


exports.handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  const params = event.queryStringParameters
  const url = params?.url;
  if(!url) return;
  const response = await fetch(url, { headers: { 'User-Agent': 'bot' }})
    .then(async(resp) => {
      const html = await resp.text()
      const dom = new JSDOM(html)
      // const meta = new JSDOM(a).window.document.head.querySelectorAll("meta");
      // const meta = dom.window.document.head.querySelectorAll("meta");
      // const ogp = extractOGP([...meta]);
      return {
        statusCode: 200,
        body: JSON.stringify({
          ...params,
          html
        })
      }
    })
    .catch(err => console.log(err));
  callback(undefined, response)
}

const extractOGP = ( metaElements: HTMLMetaElement[] ): object => {
  const ogp = metaElements
    .filter((element: HTMLMetaElement) => element.hasAttribute('property'))
    .reduce((previous: any, current: HTMLMetaElement) => {
      const property = current.getAttribute("property")?.trim()
      if (!property) return
      const content = current.getAttribute("content")
      previous[property] = content
      return previous
    })
 
  return ogp
}