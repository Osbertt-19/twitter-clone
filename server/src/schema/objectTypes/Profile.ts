import { objectType } from "nexus"
import { Context } from "../../context"
import { getUserId } from "../../utils"
import { User } from "./User"

export const Profile = objectType({
    name: 'Profile',
    definition(t) {
      t.field('user', {
        type: User,
        resolve: (_parent, args, context: Context) => {
          const userId = getUserId(context)
          return context.prisma.profile
            .findUnique({
              where: { userId: userId|| undefined },
            })
            .user()
        },
      })
      t.string('profilePictureUrl')
      t.string('coverPhotoUrl')
      t.string('birthday')
      t.string('bio')
      t.string('location')
    },
  })