import app, { use, settings } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
// import {auth} from 'nexus-plugin-auth0'

settings.change({
    server: {
        graphql: {
            introspection: true
        },
        playground: true,
        cors: {
            origin: ['*']
        }
    }
})

use(prisma())

// use(auth({
//     auth0Audience: 'https://dev-7t102zrf.us.auth0.com/api/v2/',
//     auth0Domain: 'dev-7t102zrf.us.auth0.com',
// }))

