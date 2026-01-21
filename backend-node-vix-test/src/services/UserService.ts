import { UserModel } from "../models/UserModel";
import { querySchema } from "../types/validations/Queries/queryListAll";
import { 
    TUserCreated, 
    userCreatedSchema 
} from "../types/validations/User/createUser";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";

export class UserService {
  constructor() { }
  private userModel = new UserModel();

  async getSelf(email: string) {
    return await this.userModel.getSelf(email);
  }

  async getById(idUser: string) {
    return this.userModel.getById(idUser);
  }

  async listAll(query: unknown) {
    const validQuery = querySchema.parse(query);
    return this.userModel.listAll(validQuery);
  }

  async createNewUser(user: TUserCreated) {
    const validData = userCreatedSchema.parse(user);

    const newUser =
      await this.userModel.createNewUser(validData);

    return newUser;
  }

  async updateUser(validData: TUserCreated, idUser: string) {
    return await this.userModel.updateUser(
      idUser,
      validData,
    );
  }


  async deleteUser(idUser: string) {
    const oldUser = await this.userModel.getById(idUser);
    if (!oldUser) {
      throw new AppError(
        ERROR_MESSAGE.BRAND_MASTER_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
    }

    const deletedUser =
      await this.userModel.deleteUser(idUser);

    return {
      user: deletedUser,
    };
  }
}
