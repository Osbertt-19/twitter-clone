import { getUserId } from '../utils'

import { intArg, nonNull, queryType, stringArg, arg } from 'nexus'
import { Context } from '../context'

export const Query = queryType({
  definition(t) {
    t.nonNull.list.nonNull.field('allUsers', {
      type: 'User',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.user.findMany()
      },
    })

    t.nullable.field('me', {
      type: 'User',
      resolve: (parent, args, context: Context) => {
        const userId = getUserId(context)
        return context.prisma.user.findUnique({
          where: {
            id: userId,
          },
        })
      },
    })

    t.nullable.field('tweetById', {
      type: 'Tweet',
      args: {
        id: stringArg(),
      },
      resolve: (_parent, { id }, context: Context) => {
        return context.prisma.tweet.findUnique({
          where: { id: id || undefined },
        })
      },
    })

    t.list.field('tweets', {
      type: 'Tweet',
      resolve: (_parent, args, context: Context) => {
        return context.prisma.tweet.findMany()
      },
    })

    t.nonNull.list.nonNull.field('feed', {
      type: 'Tweet',
      args: {
        searchString: stringArg(),
        skip: intArg(),
        take: intArg(),
      },
      resolve: (_parent, args, context: Context) => {
        const or = args.searchString
          ? {
              OR: [
                { title: { contains: args.searchString } },
                { content: { contains: args.searchString } },
              ],
            }
          : {}

        return context.prisma.tweet.findMany({
          where: {
            ...or,
          },
          take: args.take || undefined,
          skip: args.skip || undefined,
        })
      },
    })

    t.list.field('tweetsByUser', {
      type: 'Tweet',
      args: {
        id: stringArg(),
      },
      resolve: (_parent, {id}, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: {
              id: id || undefined,
            },
          })
          .tweets()
      },
    })
  },
})
