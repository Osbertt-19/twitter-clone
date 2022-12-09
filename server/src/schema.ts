import { permissions } from './permissions'
import { APP_SECRET, getUserId } from './utils'
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { applyMiddleware } from 'graphql-middleware'
import {
  makeSchema,
  
  asNexusMethod,
  
} from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
// import { Query } from './types/query'
// import { Mutation } from './types/mutation'
import * as types from './schema/index'

const schemaWithoutPermissions = makeSchema({
  types,
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})

export const schema = applyMiddleware(schemaWithoutPermissions)
// export const schema = applyMiddleware(schemaWithoutPermissions, permissions)
