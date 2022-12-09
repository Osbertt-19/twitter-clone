import { objectType } from 'nexus'
import { Context } from '../../context'
import { Reply } from './Reply'
import { Tag } from './Tag'
import { Tweet } from './Tweet'
import { User } from './User'

export const Retweet = objectType({
  name: 'Retweet',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.string('caption')
    t.field('author', {
      type: User,
      resolve: async(_parent, args, context: Context) => {
        return await context.prisma.retweet
          .findUnique({
            where: { id: _parent.id || undefined },
          })
          .author()
      },
    })
    t.field('tweet', {
      type: Tweet,
      resolve: async(_parent, args, context: Context) => {
        return await context.prisma.retweet
          .findUnique({
            where: { id: _parent.id || undefined },
          })
          .tweet()
      },
    })
    t.list.field('liked_users', {
        type: User,
        resolve: async (_parent, args, context: Context) => {
          return await context.prisma.retweet
            .findUnique({
              where: { id: _parent.id || undefined },
            })
            .liked_users()
        },
      })
    t.field('replies', {
      type: Reply,
      resolve: async(_parent, args, context: Context) => {
        return await context.prisma.retweet
          .findUnique({
            where: { id: _parent.id || undefined },
          })
          .replies()
      },
    })
    t.list.field('tags', {
      type: Tag,
      resolve: async (_parent, args, context: Context) => {
        return await context.prisma.retweet
          .findUnique({
            where: { id: _parent.id || undefined },
          })
          .tags()
      },
    })
  },
})
