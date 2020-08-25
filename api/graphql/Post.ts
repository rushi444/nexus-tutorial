import { schema } from 'nexus'
import axios from 'axios'

schema.objectType({
    name: 'Post',
    definition: t => {
        t.model.id()
        t.model.title()
        t.model.body()
        t.model.published()
    }
})

schema.extendType({
    type: 'Query',
    definition(t) {
        t.list.field('drafts', {
            type: 'Post',
            resolve(_root, _args, ctx) {
                return ctx.db.post.findMany({ where: { published: false } })
            },
        })
        t.list.field('posts', {
            type: 'Post',
            resolve(_root, _args, ctx) {
                return ctx.db.post.findMany({ where: { published: true } })
            },
        })
    },
})
schema.extendType({
    type: 'Mutation',
    definition(t) {
        t.field('createDraft', {
            type: 'Post',
            args: {
                title: schema.stringArg({ required: true }),
                body: schema.stringArg({ required: true }),
            },
            resolve(_root, args, ctx) {
                const draft = {
                    title: args.title,
                    body: args.body,
                    published: false,
                }
                return ctx.db.post.create({ data: draft })
            },
        })
        t.field('publish', {
            type: 'Post',
            args: {
                draftId: schema.intArg({ required: true }),
            },
            resolve(_root, args, ctx) {
                return ctx.db.post.update({
                    where: { id: args.draftId },
                    data: {
                        published: true,
                    },
                })
            },
        })

        t.field('hello', {
            type: 'String',
            resolve: async (parent, args, context, info) => {
                const url = 'https://dev-7t102zrf.us.auth0.com/userinfo'
                console.log(context.req.headers.authorization)
                const user = await axios.get(url, {
                    headers: {
                        Authorization: context.req.headers.authorization
                    }
                })
                console.log('user', user.data)

                return 'Hello World'
            }
        })
    },
})