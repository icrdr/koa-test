import jwt from 'jsonwebtoken'
import { getUserFromCtx } from '../service/user.js'

const permissionCheck = async (ctx, next) => {
    const user = await getUserFromCtx(ctx)
    console.log(user)
    await next();
};

export default permissionCheck