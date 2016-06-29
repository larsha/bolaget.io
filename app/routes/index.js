export default async (ctx, next) => {
  ctx.body = {
    "name": "bolaget.io",
    "url": 'https://github.com/larsha/bolaget.io',
    "version": "1.0.0",
    "description": "RESTful JSON API for Swedish alcohol monopoly, Systembolaget",
    "engines": {
      "node": "6.2.1"
    },
    "author": "Fredrik Lack <fredrik@nody.se>",
    "license": "MIT",
  }
}
