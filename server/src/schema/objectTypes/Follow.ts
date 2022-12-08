import { objectType } from "nexus"
import { Context } from "../../context"
import { User } from "./User"

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