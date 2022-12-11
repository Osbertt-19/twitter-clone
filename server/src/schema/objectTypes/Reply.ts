import { objectType } from 'nexus'
import { Context } from '../../context'
import { Retweet } from './Retweet'
import { Tweet } from './Tweet'
import { User } from './User'

export const Reply = objectType({
  name: 'Reply',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.string('caption')
    t.string('photoUrl')
    t.list.field('liked_users', {
      type: User,
      resolve: async (_parent, args, context: Context) => {
        return await context.prisma.reply
          .findUnique({
            where: { id: _parent.id || undefined },
          })
          .liked_users()
      },
    })
    t.field('author', {
      type: User,
      resolve: async(_parent, args, context: Context) => {
        return await context.prisma.reply
          .findUnique({
            where: { id: _parent.id || undefined },
          })
          .author()
      },
    })
    t.field('tweet', {
      type: Tweet,
      resolve: async(_parent, args, context: Context) => {
        return await context.prisma.reply
          .findUnique({
            where: { id: _parent.id || undefined },
          })
          .tweet()
      },
    })
    t.field('retweet', {
      type: Retweet,
      resolve: async(_parent, args, context: Context) => {
        return await context.prisma.reply
          .findUnique({
            where: { id: _parent.id || undefined },
          })
          .retweet()
      },
    })
  },
})
