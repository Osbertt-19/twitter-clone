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
import { AuthPayload, Profile } from './objectTypes'
import { string } from 'yup'
import slugify from '@sindresorhus/slugify'

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
        const userWithProfilePicture = await context.prisma.user.update({
          where: { id: user.id },
          data: {
            profile: {
              upsert: {
                create: {
                  profilePictureUrl:
                    'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg',
                  coverPhotoUrl:
                    'https://theoheartist.com/wp-content/uploads/sites/2/2015/01/fbdefault.png',
                },
                update: {
                  profilePictureUrl:
                    'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg',
                  coverPhotoUrl:
                    'https://theoheartist.com/wp-content/uploads/sites/2/2015/01/fbdefault.png',
                },
              },
            },
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
        const user = await context.prisma.user.findUnique({
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
        profilepictureUrl: stringArg(),
        coverphotoUrl: stringArg(),
        birthday: stringArg(),
        bio: stringArg(),
        location: stringArg(),
      },
      resolve: async (
        _,
        { birthday, bio, location, profilePictureUrl, coverPhotoUrl },
        context: Context,
      ) => {
        const userId = getUserId(context)
        return await context.prisma.user.update({
          where: { id: userId },
          data: {
            profile: {
              upsert: {
                create: {
                  birthday,
                  bio,
                  location,
                  profilePictureUrl,
                  coverPhotoUrl,
                },
                update: {
                  birthday,
                  bio,
                  location,
                  profilePictureUrl,
                  coverPhotoUrl,
                },
              },
            },
          },
        })
      },
    })

    t.field('createTweet', {
      type: 'Tweet',
      args: {
        caption: stringArg(),
        photoUrl: stringArg(),
      },
      resolve: async (_, { caption, photoUrl }, context: Context) => {
        const userId = getUserId(context)
        return await context.prisma.tweet.create({
          data: {
            caption: caption,
            photoUrl: photoUrl,
            authorId: userId,
          },
        })
      },
    })

    t.field('editTweet', {
      type: 'Tweet',
      args: {
        id: nonNull(stringArg()),
        caption: stringArg(),
        photoUrl: stringArg(),
      },
      resolve: async (_, { id, caption, photoUrl }, context: Context) => {
        return await context.prisma.tweet.update({
          where: { id: id || undefined },
          data: {
            caption,
            photoUrl,
          },
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
        tweetId: nonNull(stringArg()),
        caption: stringArg(),
        photoUrl: stringArg(),
      },
      resolve: async (_, { tweetId, caption, photoUrl }, context: Context) => {
        const userId = getUserId(context)
        const reply = await context.prisma.reply.create({
          data: {
            caption: caption,
            photoUrl: photoUrl,
            authorId: userId,
            tweetId: tweetId,
          },
        })
      },
    })

    t.field('editReply', {
      type: 'Reply',
      args: {
        id: nonNull(stringArg()),
        caption: stringArg(),
        photoUrl: stringArg(),
      },
      resolve: async (_, { id, caption, photoUrl }, context: Context) => {
        return context.prisma.reply.update({
          where: { id: id || undefined },
          data: { caption, photoUrl },
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
