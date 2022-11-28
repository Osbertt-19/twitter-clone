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
import { Query } from './schema/query'
import { Mutation } from './schema/mutation'
import { AuthPayload, Tweet, PostCreateInput, PostOrderByUpdatedAtInput, SortOrder, User, UserCreateInput, UserUniqueInput } from './schema/types'
export const DateTime = asNexusMethod(DateTimeResolver, 'date')
const schemaWithoutPermissions = makeSchema({
  types: [
    Query,
    Mutation,
    Tweet,
    User,
    AuthPayload,
    UserUniqueInput,
    UserCreateInput,
    PostCreateInput,
    SortOrder,
    PostOrderByUpdatedAtInput,
    DateTime,
  ],
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
