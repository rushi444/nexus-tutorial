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
            origin: ['18.232.225.224','34.233.19.82','52.204.128.250','3.132.201.78','3.19.44.88','3.20.244.231']
        }
    }
})

use(prisma())

// use(auth({
//     auth0Audience: 'https://dev-7t102zrf.us.auth0.com/api/v2/',
//     auth0Domain: 'dev-7t102zrf.us.auth0.com',
// }))

