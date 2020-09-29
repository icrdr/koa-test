import Router from 'koa-router';
import all_ctls from "./controller/index.js"

// register all controller
const router = new Router()
for (let [namespace, ctl_space] of Object.entries(all_ctls)) {
    const _router = new Router()
    for (const [url, ctl] of Object.entries(ctl_space)) {
        const [method, path] = url.split(" ", 2)
        console.log(namespace)
        console.log(method)
        console.log(path)
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
        console.log(`register router: ${method} /api${namespace}${path}`);
    }
    router.use('/api' + namespace, _router.routes(), _router.allowedMethods());
}
export default router;
