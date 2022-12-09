import { APP_SECRET, getUserId } from '../utils'
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import {
  intArg,
  nonNull,
  objectType,
  stringArg,
  arg,
  list,
  mutationType,
} from 'nexus'
import { Context } from '../context'
import { AuthPayload } from './objectTypes'

export const Mutation = mutationType({
  definition(t) {
    t.field('signup', {
      type: AuthPayload,
      args: {
        name: stringArg(),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, args, context: Context) => {
        const hashedPassword = await hash(args.password, 10)
        const user = await context.prisma.user.create({
          data: {
            name: args.name,
            email: args.email,
            password: hashedPassword,
          },
        })
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, { email, password }, context: Context) => {
        const user: User | null = await context.prisma.user.findUnique({
          where: {
            email,
          },
        })
        if (!user) {
          throw new Error(`No user found for email: ${email}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('editProfile', {
      type: 'Profile',
      args: {
        birthday: stringArg(),
        bio: stringArg(),
        location: stringArg(),
      },
      resolve: async (_, { birthday, bio, location }, context: Context) => {
        const userId = getUserId(context)
        return await context.prisma.user.update({
          where: { id: userId },
          data: {
            profile: {
              upsert: {
                create: { birthday, bio, location },
                update: { birthday,bio, location },
              },
            },
          },
        })
      },
    })

    t.field('createTweet', {
      type: 'Tweet',
      args: {
        content: nonNull(stringArg()),
      },
      resolve: async (_, args, context: Context) => {
        const userId = getUserId(context)
        return await context.prisma.tweet.create({
          data: {
            content: args.content,
            authorId: userId,
          },
        })
      },
    })

    t.field('editTweet', {
      type: 'Tweet',
      args: {
        id: nonNull(stringArg()),
        content: nonNull(stringArg()),
      },
      resolve: async (_, { id, content }, context: Context) => {
        return await context.prisma.tweet.update({
          where: { id: id || undefined },
          data: { content },
        })
      },
    })

    t.field('deleteTweet', {
      type: 'Tweet',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, { id }, context: Context) => {
        return await context.prisma.tweet.delete({
          where: { id: id },
        })
      },
    })

    // t.field('createComment', {
    //   type: 'Comment',
    //   args: {
    //     tweetId: nonNull(intArg()),
    //     content: nonNull(stringArg()),
    //   },
    //   resolve: (_, args, context: Context) => {
    //     const userId = getUserId(context)
    //     return context.prisma.comment.create({
    //       data: {
    //         content: args.content,
    //         authorId: userId,
    //         tweetId: args.tweetId,
    //       },
    //     })
    //   },
    // })

    // t.field('editComment', {
    //   type: 'Comment',
    //   args: {
    //     id: nonNull(intArg()),
    //     content: nonNull(stringArg()),
    //   },
    //   resolve: async (_, args, context: Context) => {
    //     return context.prisma.comment.update({
    //       where: { id: args.id || undefined },
    //       data: { content: args.content },
    //     })
    //   },
    // })

    // t.field('deleteComment', {
    //   type: 'Comment',
    //   args: {
    //     id: nonNull(intArg()),
    //   },
    //   resolve: (_, args, context: Context) => {
    //     return context.prisma.comment.delete({
    //       where: { id: args.id },
    //     })
    //   },
    // })

    t.field('createReply', {
      type: 'Reply',
      args: {
        tweetId: nonNull(intArg()),
        content: nonNull(stringArg()),
        replied_userIds: list(intArg()),
      },
      resolve: (_, args, context: Context) => {
        const userId = getUserId(context)
        type UserWhereUniqueInput = {
          id?: number
          email?: string
        }
        const arr = args.replied_userIds?.map((user) => {
          const obj: UserWhereUniqueInput = {}
          obj.id = user!
          return obj
        })
        return context.prisma.reply.create({
          data: {
            content: args.content,
            authorId: userId,
            tweetId: args.tweetId,
            replied_users: { connect: arr },
          },
        })
      },
    })

    t.field('editReply', {
      type: 'Reply',
      args: {
        id: nonNull(stringArg()),
        content: nonNull(stringArg()),
      },
      resolve: async (_, args, context: Context) => {
        return context.prisma.reply.update({
          where: { id: args.id || undefined },
          data: { content: args.content },
        })
      },
    })

    t.field('deleteReply', {
      type: 'Reply',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.reply.delete({
          where: { id: args.id },
        })
      },
    })
  },
})
