import { use, settings } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'

settings.change({
    server: {
        graphql: {
            introspection: true
        },
        playground: true,
        cors: {
            origin: '*'
        }
    }
})

use(prisma())

