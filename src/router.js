import Router from 'koa-router';
import controllers from "./controller/index.js"

import jwt from 'jsonwebtoken'

const checkPermission = (validCode) => {
    return async (ctx, next) => {
        const token = ctx.header.authorization.split(' ')[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        let isPass = false
        let scope = undefined
        for (const code of payload.permissions) {
            if (validCode.includes(code)) {
                isPass = true
                scope = code.split("/")[1]

            }
        }
        if (!isPass) {
            ctx.throw(401, 'Unauthorized')
        }

        await next();
        
        console.log(scope)
        switch (scope) {
            case 'isOwner':
                isPass = ctx.body.id === payload.id
                break;
            default:
                break;
        }
        console.log(isPass)
        if (!isPass) {
            ctx.throw(401, 'Unauthorized')
        }

    }
};

// register all controller
const router = new Router()
for (const [setName, controllerSet] of Object.entries(controllers)) {
    const subRouter = new Router()
    for (const [meta, ctl] of Object.entries(controllerSet)) {
        const [method, path, code] = meta.split(" ", 3)
        const cp = checkPermission(code)
        switch (method) {
            case "GET":
                subRouter.get(path, cp, ctl);
                break;
            case "POST":
                subRouter.post(path, cp, ctl);
                break;
            default:
                break;
        }
        console.log(`register router: ${method} /api${setName}${path}`);
    }
    router.use('/api' + setName, subRouter.routes(), subRouter.allowedMethods());
}
export default router;
