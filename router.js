import Router from 'koa-router';
import * as all_ctls from "./controller/index.js"

// register all controller
const router = new Router()
for (const [namespace, ctl_space] of Object.entries(all_ctls)) {
    const _router = new Router()
    for (const [url, ctl] of Object.entries(ctl_space)) {
        const [method, path] = url.split(" ", 2)
        switch (method) {
            case "GET":
                _router.get(path, ctl);
                break;
            case "POST":
                _router.post(path, ctl);
                break;
            default:
                break;
        }
        console.log(`register router: ${method} /${namespace}${path}`);
    }
    router.use('/' + namespace, _router.routes(), _router.allowedMethods());
}
export default router;
