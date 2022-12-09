import { objectType } from "nexus"
import { Context } from "../../context"
import { Profile } from "./Profile"
import { Reply } from "./Reply"
import { Retweet } from "./Retweet"
import { Tweet } from "./Tweet"

export const User = objectType({
    name: 'User',
    definition(t) {
      t.nonNull.string('id')
      t.nonNull.string('email')
      t.string('name')
      t.field('profile', {
        type: Profile,
        resolve: async(_parent, args, context: Context) => {
          return await context.prisma.user
            .findUnique({
              where: { id: _parent.id || undefined },
            }).profile()
        },
      })
      t.list.field('tweets', {
        type: Tweet,
        resolve: async(_parent, args, context: Context) => {
          return await context.prisma.user
            .findUnique({
              where: { id: _parent.id || undefined }
            }).tweets()
        },
      })   
      t.list.field('liked_tweets', {
        type: Tweet,
        resolve: async(_parent, args, context: Context) => {
          return await context.prisma.user
            .findUnique({
              where: { id: _parent.id || undefined },
            })
            .liked_tweets()
        },
      })
      t.list.field('replies', {
        type: Reply,
        resolve: async(_parent, args, context: Context) => {
          return await context.prisma.user
            .findUnique({
              where: { id: _parent.id || undefined },
            })
            .replies()
        },
      })
      t.list.field('liked_replies', {
        type: Reply,
        resolve: async(_parent, args, context: Context) => {
          return await context.prisma.user
            .findUnique({
              where: { id: _parent.id || undefined },
            })
            .liked_replies()
        },
      })
      t.list.field('retweets', {
        type: Retweet,
        resolve: async(_parent, args, context: Context) => {
          return await context.prisma.user
            .findUnique({
              where: { id: _parent.id || undefined }
            }).retweets()
        },
      })   
      t.list.field('liked_retweets', {
        type: Retweet,
        resolve: async(_parent, args, context: Context) => {
          return await context.prisma.user
            .findUnique({
              where: { id: _parent.id || undefined },
            })
            .liked_retweets()
        },
      })
      t.list.field('followedBy', {
        type: User,
        resolve: async(_parent, args, context: Context) => {
          return await context.prisma.user
            .findUnique({
              where: { id: _parent.id || undefined }
            }).followedBy()
        },
      }) 
      t.list.field('following', {
        type: User,
        resolve: async(_parent, args, context: Context) => {
          return await context.prisma.user
            .findUnique({
              where: { id: _parent.id || undefined }
            }).following()
        },
      }) 
    },
  })