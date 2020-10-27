import { User } from "./user.entity";
// import { hash } from "../../utils.js";
// import jwt from "jsonwebtoken";
import { getConnection, Repository } from "typeorm";
import { Service } from "typedi";
import { NotFoundError } from "routing-controllers";
import { hash } from "../utils";

@Service()
export class UserService {
  userRepository: Repository<User>;

  constructor() {
    this.userRepository = getConnection().getRepository(User);
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne(id);
    return user;
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({ username: username });
    return user;
  }

  async createUser(username: string, password: string) {
    const newUser = new User();
    newUser.username = username;
    newUser.password = hash(username + password);
    newUser.fullName = username;
    await this.userRepository.save(newUser);
    return newUser;
  }

  async getUsers(perpage: number, page: number) {
    const users = await this.userRepository.findAndCount({
      take: perpage,
      skip: page,
    });
    return users;
  }

  async deleteUserById(id: number) {
    await this.userRepository.delete(id);
  }
}

// const userRepository = getConnection().getRepository(User);

// export const getUserById = async (id: number) => {
//   const user = await userRepository.findOne(id);
//   return user;
// };

// const getUserFromCtx = async (ctx) => {
//     const token = ctx.header.authorization.split(' ')[1]
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
//     const user = await getUserById(decodedToken.id)
//     return user
// }

// const authUser = async (username, password) => {
//     const user = await User.findOne({
//         where: {
//             username: username,
//         }
//     })

//     if (user.password === hash(username + password)) {
//         return user
//     } else {
//         return null
//     }
// }
