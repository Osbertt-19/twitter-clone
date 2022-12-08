import { objectType } from "nexus"
import { Context } from "../../context"
import { Reply } from "./Reply"
import { User } from "./User"

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