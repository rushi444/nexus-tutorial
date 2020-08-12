"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
nexus_1.schema.objectType({
    name: 'Post',
    definition: t => {
        t.model.id();
        t.model.title();
        t.model.body();
        t.model.published();
    }
});
nexus_1.schema.extendType({
    type: 'Query',
    definition(t) {
        t.list.field('drafts', {
            type: 'Post',
            resolve(_root, _args, ctx) {
                return ctx.db.post.findMany({ where: { published: false } });
            },
        });
        t.list.field('posts', {
            type: 'Post',
            resolve(_root, _args, ctx) {
                return ctx.db.post.findMany({ where: { published: true } });
            },
        });
    },
});
nexus_1.schema.extendType({
    type: 'Mutation',
    definition(t) {
        t.field('createDraft', {
            type: 'Post',
            args: {
                title: nexus_1.schema.stringArg({ required: true }),
                body: nexus_1.schema.stringArg({ required: true }),
            },
            resolve(_root, args, ctx) {
                const draft = {
                    title: args.title,
                    body: args.body,
                    published: false,
                };
                return ctx.db.post.create({ data: draft });
            },
        });
        t.field('publish', {
            type: 'Post',
            args: {
                draftId: nexus_1.schema.intArg({ required: true }),
            },
            resolve(_root, args, ctx) {
                return ctx.db.post.update({
                    where: { id: args.draftId },
                    data: {
                        published: true,
                    },
                });
            },
        });
    },
});
