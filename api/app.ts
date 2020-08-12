import { use, settings } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'

settings.change({
    server: {
        playground: true,
        cors: {
            origin: '*'
        }
    }
})

use(prisma())

