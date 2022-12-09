import { objectType } from 'nexus'
import { Context } from '../../context'
import { Reply } from './Reply'
import { Retweet } from './Retweet'
import { Tag } from './Tag'
import { User } from './User'

export const Tweet = objectType({
  name: 'Tweet',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.string('caption')
    t.string('photoUrl')
    t.field('author', {
      type: User,
      resolve: async (_parent, args, context: Context) => {
        return await context.prisma.tweet
          .findUnique({
            where: { id: _parent.id || undefined },
          })
          .author()
      },
    })
    t.list.field('liked_users', {
      type: 'User',
      resolve: async (_parent, args, context: Context) => {
        return await context.prisma.tweet
          .findUnique({
            where: { id: _parent.id || undefined },
          })
          .liked_users()
      },
    })
    t.list.field('replies', {
      type: Reply,
      resolve: async (_parent, args, context: Context) => {
        return await context.prisma.tweet
          .findUnique({
            where: { id: _parent.id || undefined },
          })
          .replies()
      },
    })
    t.list.field('retweets', {
      type: Retweet,
      resolve: async (_parent, args, context: Context) => {
        return await context.prisma.tweet
          .findUnique({
            where: { id: _parent.id || undefined },
          })
          .retweets()
      },
    })
    t.list.field('tags', {
      type: Tag,
      resolve: async (_parent, args, context: Context) => {
        return await context.prisma.tweet
          .findUnique({
            where: { id: _parent.id || undefined },
          })
          .tags()
      },
    })
  },
})
