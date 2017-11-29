const actions = {
  create: 'Create',
  update: 'Update',
  remove: 'Remove',
  find: 'Find',
  findAll: 'Find All'
}

const models = {
  log: {
    name: 'log',
    endpoint: 'logs'
  },
  tag: {
    name: 'Tag',
    endpoint: 'tags'
  },
  ship: {
    name: 'Ship',
    endpoint: 'ships'
  },
  user: {
    name: 'User',
    endpoint: 'users',
    preventDefaultApi: true,
    useCustomRoutes: true
  }
}


module.exports = {
  actions,
  models
}