import { objectType } from "nexus"
import { Context } from "../../context"
import { Retweet } from "./Retweet"
import { Tweet } from "./Tweet"

export const Tag = objectType({
    name: 'Tag',
    definition(t) {
      t.nonNull.string('slug')
      t.nonNull.string('tagName')
      t.list.field('tweets', {
        type: Tweet,
        resolve: async(_parent, args, context: Context) => {
          return await context.prisma.tag
            .findUnique({
              where: { slug: _parent.slug || undefined }
            }).tweets()
        },
      })  
      t.list.field('retweets', {
        type: Retweet,
        resolve: async(_parent, args, context: Context) => {
          return await context.prisma.tag
            .findUnique({
              where: { slug: _parent.slug || undefined }
            }).retweets()
        },
      })  
    }
})