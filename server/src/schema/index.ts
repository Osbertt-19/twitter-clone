import { DateResolver, DateTimeResolver } from 'graphql-scalars'
import { objectType, inputObjectType, enumType, asNexusMethod } from 'nexus'
import { resolve } from 'path'
import { Context } from '../context'
import { getUserId } from '../utils'

export * from './mutation'
export * from './query'
export * from './objectTypes'
export const DateTime = asNexusMethod(DateTimeResolver, 'date')
export const Date = asNexusMethod(DateResolver, 'date')

// export const SortOrder = enumType({
//   name: 'SortOrder',
//   members: ['asc', 'desc'],
// })

// export const PostOrderByUpdatedAtInput = inputObjectType({
//   name: 'PostOrderByUpdatedAtInput',
//   definition(t) {
//     t.nonNull.field('updatedAt', { type: 'SortOrder' })
//   },
// })

// export const UserUniqueInput = inputObjectType({
//   name: 'UserUniqueInput',
//   definition(t) {
//     t.int('id')
//     t.string('email')
//   },
// })

// export const TweetCreateInput = inputObjectType({
//   name: 'TweetCreateInput',
//   definition(t) {
//     t.nonNull.string('content')
//   },
// })

// export const UserCreateInput = inputObjectType({
//   name: 'UserCreateInput',
//   definition(t) {
//     t.nonNull.string('email')
//     t.string('name')
//     t.list.nonNull.field('posts', { type: 'PostCreateInput' })
//   },
// })
