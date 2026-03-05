export const apiPath = '/api/v1'

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  channelPath: () => [apiPath, 'channels'].join('/'),
  messagePath: () => [apiPath, 'messages'].join('/')
}
