import { DateResolver, DateTimeResolver } from 'graphql-scalars'
import { objectType, inputObjectType, enumType, asNexusMethod } from 'nexus'
import { resolve } from 'path'
import { Context } from '../context'
import { getUserId } from '../utils'

export * from './mutation'
export * from './query'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')
export const Date = asNexusMethod(DateResolver, 'date')

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id')
    t.string('name')
    t.nonNull.string('email')
    t.list.field('tweets', {
      type: 'Tweet',
      resolve: (_parent, args, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: _parent.id || undefined }
          }).tweets()
      },
    })
    t.field('profile', {
      type: 'Profile',
      resolve: (_parent, args, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: _parent.id || undefined },
          }).profile()
      },
    })
    t.list.field('replies', {
      type: 'Reply',
      resolve: (_parent, args, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: _parent.id || undefined },
          })
          .replies()
      },
    })
    t.list.field('liked_tweets', {
      type: Tweet,
      resolve: (_parent, args, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: _parent.id || undefined },
          })
          .liked_tweets()
      },
    })
    t.list.field('followedBy', {
      type: Follow,
      resolve: (_parent, args, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: _parent.id || undefined },
          })
          .followedBy()
      },
    })
    t.list.field('following', {
      type: Follow,
      resolve: (_parent, args, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: _parent.id || undefined },
          })
          .following()
      },
    })
  },
})
export const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.field('user', {
      type: User,
      resolve: (_parent, args, context: Context) => {
        const userId = getUserId(context)
        return context.prisma.profile
          .findUnique({
            where: { userId: userId|| undefined },
          })
          .user()
      },
    })
    t.string('birthday')
    t.string('bio')
    t.string('location')
  },
})
export const Tweet = objectType({
  name: 'Tweet',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.nonNull.string('content')
    t.list.field('liked_users', { type: 'User' })
    t.field('author', {
      type: User,
      resolve: (_parent, args, context: Context) => {
        return context.prisma.tweet
          .findUnique({
            where: { id: _parent.id || undefined },
          })
          .author()
      },
    })
    t.list.field('replies', {
      type: Reply,
      resolve: (_parent, args, context: Context) => {
        return context.prisma.tweet
          .findUnique({
            where: { id: _parent.id || undefined },
          })
          .replies()
      },
    })
  },
})

export const Reply = objectType({
  name: 'Reply',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.nonNull.string('content')
    t.list.field('liked_users', { type: User })
    t.list.field('replied_users', {
      type: User,
      resolve: (_parent, args, context: Context) => {
        return context.prisma.reply
          .findUnique({
            where: { id: _parent.id || undefined },
          })
          .replied_users()
      },
    })
    t.field('author', {
      type: User,
      resolve: (_parent, args, context: Context) => {
        return context.prisma.reply
          .findUnique({
            where: { id: _parent.id || undefined },
          })
          .author()
      },
    })
    t.field('tweet', {
      type: Tweet,
      resolve: (_parent, args, context: Context) => {
        return context.prisma.reply
          .findUnique({
            where: { id: _parent.id || undefined },
          })
          .tweet()
      },
    })
  },
})

export const Follow = objectType({
  name: 'Follow',
  definition(t) {
    t.nonNull.int('id')
    t.field('follower', {
      type: User,
      resolve: (_parent, args, context: Context) => {
        return context.prisma.follow
          .findUnique({
            where: { id: _parent.id || undefined },
          })
          .follower()
      },
    })
    t.field('following', {
      type: User,
      resolve: (_parent, args, context: Context) => {
        return context.prisma.follow
          .findUnique({
            where: { id: _parent.id || undefined },
          })
          .following()
      },
    })
  },
})

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

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token')
    t.field('user', { type: 'User' })
  },
})
