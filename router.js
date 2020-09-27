import Router from 'koa-router';
import * as all_ctls from "./controller/index.js"

// register all controller
const router = new Router()
for (const [namespace, ctl_space] of Object.entries(all_ctls)) {
    for (const [url, ctl] of Object.entries(ctl_space)) {
        const [method, path] = url.split(" ", 2)
        const full_path = "/" + namespace + path
        switch (method) {
            case "GET":
                router.get(full_path, ctl);
                break;
            case "POST":
                router.post(full_path, ctl);
                break;
            default:
                console.log(`invalid router: ${method} ${full_path}`);
                continue;
        }
        console.log(`register router: ${method} ${full_path}`);
    }
}

export default router;
