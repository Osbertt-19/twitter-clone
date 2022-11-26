
import {objectType,inputObjectType,enumType,} from 'nexus'
import { Context } from '../context'

export const User = objectType({
    name: 'User',
    definition(t) {
      t.nonNull.int('id')
      t.string('name')
      t.nonNull.string('email')
      t.nonNull.list.nonNull.field('posts', {
        type: 'Post',
        resolve: (parent, _, context: Context) => {
          return context.prisma.user
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .posts()
        },
      })
    },
  })
  
  export const Post = objectType({
    name: 'Post',
    definition(t) {
      t.nonNull.int('id')
      t.nonNull.field('createdAt', { type: 'DateTime' })
      t.nonNull.field('updatedAt', { type: 'DateTime' })
      t.nonNull.string('title')
      t.string('content')
      t.nonNull.boolean('published')
      t.nonNull.int('viewCount')
      t.field('author', {
        type: 'User',
        resolve: (parent, _, context: Context) => {
          return context.prisma.post
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .author()
        },
      })
    },
  })
  
  export const SortOrder = enumType({
    name: 'SortOrder',
    members: ['asc', 'desc'],
  })
  
  export const PostOrderByUpdatedAtInput = inputObjectType({
    name: 'PostOrderByUpdatedAtInput',
    definition(t) {
      t.nonNull.field('updatedAt', { type: 'SortOrder' })
    },
  })
  
  export const UserUniqueInput = inputObjectType({
    name: 'UserUniqueInput',
    definition(t) {
      t.int('id')
      t.string('email')
    },
  })
  
  export const PostCreateInput = inputObjectType({
    name: 'PostCreateInput',
    definition(t) {
      t.nonNull.string('title')
      t.string('content')
    },
  })
  
  export const UserCreateInput = inputObjectType({
    name: 'UserCreateInput',
    definition(t) {
      t.nonNull.string('email')
      t.string('name')
      t.list.nonNull.field('posts', { type: 'PostCreateInput' })
    },
  })
  
  export const AuthPayload = objectType({
    name: 'AuthPayload',
    definition(t) {
      t.string('token')
      t.field('user', { type: 'User' })
    },
  })