import { objectType } from "nexus"
import { Context } from "../../context"
import { Tweet } from "./Tweet"
import { User } from "./User"

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