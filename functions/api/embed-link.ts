import { Context, Callback, APIGatewayEvent } from 'aws-lambda'

interface EmbedLinkResponse {
  statusCode: number,
  body: string,
}

exports.handler = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  console.log("test")
  const params = event.queryStringParameters
  const resp: EmbedLinkResponse = {
    statusCode: 200,
    body: JSON.stringify({
      msg: `EmbedTest`,
      requestId: context.awsRequestId || 'dummy',
      params
    })
  }

  callback(undefined, resp)
}
