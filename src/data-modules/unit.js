const Resource = require('./resource')

const buildResources = (data, unit) => {
  if (!data.resources) {
    return []
  }

  const resources = data.resources.map((resourceObj) => {
    return new Resource(resourceObj, unit)
  })
  return resources
}

class Unit {
  constructor (data, module) {
    this.data = data
    this.dataModule = module

    this.dataResources = buildResources(data, this)
  }

  get module () {
    return this.dataModule
  }

  get name () {
    return this.data.name
  }

  get path () {
    return this.data.path
  }

  get resources () {
    return this.dataResources
  }

  findResource (resourceId) {
    return this.dataResources.find((resource) => {
      return (resource.name === resourceId) ||
        (resource.path === resourceId)
    })
  }
}

module.exports = Unit
