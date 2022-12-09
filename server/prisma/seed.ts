import { PrismaClient } from '@prisma/client'
import {hash} from 'bcryptjs'
const prisma = new PrismaClient()
async function main() {
  const wednesday = await prisma.user.upsert({
    where: { email: 'wednesday@prisma.io' },
    update: {},
    create: {
      email: 'wednesday@prisma.io',
      password:await hash('wednesday', 10),
      name: 'Wednesday',
      profile:{
        create:{
          profilePictureUrl:'',
          coverPhotoUrl:'',
          birthday:'',
          bio:'',
          location:'',
        }
      },
      tweets: {
        create: {
          caption:'I hate everyone',
          photoUrl:''
        },
      },
    },
  })
  const enid = await prisma.user.upsert({
    where: { email: 'enid@prisma.io' },
    update: {},
    create: {
      email: 'enid@prisma.io',
      password:await hash('enid', 10),
      name: 'Enid',
      profile:{
        create:{
          profilePictureUrl:'',
          coverPhotoUrl:'',
          birthday:'',
          bio:'',
          location:'',
        }
      },
      tweets: {
        create: {
          caption:'I love everyone',
          photoUrl:''
        },
      },
    },
  })
  console.log({wednesday,enid })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })