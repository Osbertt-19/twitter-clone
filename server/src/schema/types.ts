
import {objectType,inputObjectType,enumType,} from 'nexus'
import { Context } from '../context'

export const User = objectType({
    name: 'User',
    definition(t) {
      t.nonNull.int('id')
      t.string('name')
      t.nonNull.string('email')
      t.list.field('tweets', {
        type: 'Tweet',
        resolve: (parent, _, context: Context) => {
          return context.prisma.user
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .tweets()
        },
      })
      t.list.field('liked_tweets', {
        type: 'Tweet',
        resolve: (parent, _, context: Context) => {
          return context.prisma.user
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .liked_tweets()
        },
      })
      t.list.field('followedBy', {
        type: 'User',
        resolve: (parent, _, context: Context) => {
          return context.prisma.user
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .followedBy()
        },
      })
      t.list.field('following', {
        type: 'User',
        resolve: (parent, _, context: Context) => {
          return context.prisma.user
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .following()
        },
      })
    },
  })
  
  export const Tweet = objectType({
    name: 'Tweet',
    definition(t) {
      t.nonNull.int('id')
      t.nonNull.field('createdAt', { type: 'DateTime' })
      t.nonNull.field('updatedAt', { type: 'DateTime' })
      t.nonNull.string('content')
      t.list.field('liked_users',{
        type:'User',
        resolve: (parent, _, context: Context) => {
          return context.prisma.tweet
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .liked_users()
        },
      })
      t.field('author', {
        type: 'User',
        resolve: (parent, _, context: Context) => {
          return context.prisma.tweet
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .author()
        },
      })
      t.list.field('comments', {
        type: 'Comment',
        resolve: (parent, _, context: Context) => {
          return context.prisma.tweet
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .comments()
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