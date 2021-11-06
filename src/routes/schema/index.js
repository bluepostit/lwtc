const fp = require('fastify-plugin')

const plugin = async (fastify) => {
  const EMAIL_REGEX = '\\w[\\w+-.]+@([\\w-]+\\.\\w+)+$'

  fastify.addSchema({
    $id: '/auth/login',
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        pattern: EMAIL_REGEX
      }
    }
  })

  fastify.addSchema({
    $id: '/api/v1/ajax-headers',
    type: 'object',
    properties: {
      accept: {
        type: 'string',
        pattern: '^application/json$'
      }
    },
    required: ['accept']
  })

  fastify.addSchema({
    $id: '/api/v1/modules.response.200',
    type: 'object',
    properties: {
      modules: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            units: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  url: { type: 'string' }
                },
                required: ['name', 'url']
              }
            }
          },
          required: ['name']
        }
      }
    },
    required: ['modules']
  })
}

module.exports = fp(plugin, {
  name: 'plugin-index'
})
