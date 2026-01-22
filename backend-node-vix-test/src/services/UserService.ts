import { UserModel } from "../models/UserModel";
import { querySchema } from "../types/validations/Queries/queryListAll";
import {
  TUserCreated,
  userCreatedSchema,
} from "../types/validations/User/createUser";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import bcrypt from "bcryptjs";
import { TUserUpdated, userUpdatedSchema } from "../types/validations/User/updateUser";
import { TLoginSchema } from "../types/validations/Auth/loginSchema";
import { genToken } from "../utils/jwt";

export class UserService {
  constructor() {}
  private userModel = new UserModel();

  async login(data: TLoginSchema) {
    const user = await this.userModel.getSelf(data.email);

    if (!user) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_EMAIL_OR_PASSWORD,
        STATUS_CODE.UNAUTHORIZED,
      );
    }

    const isPasswordCorrect = bcrypt.compareSync(data.password, user.password);

    if (!isPasswordCorrect) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_EMAIL_OR_PASSWORD,
        STATUS_CODE.UNAUTHORIZED,
      );
    }

    const payload = {
      idUser: user.idUser,
      role: user.role,
    };
    const token = genToken(payload);

    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }
  
  async register(data: TUserCreated) {
    await this.createNewUser(data);

    const loginResult = await this.login({
      email: data.email,
      password: data.password,
    });

    return loginResult;
  }

  async getSelf(email: string) {
    const user = await this.userModel.getSelf(email);
    if (!user) {
      return null;
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getById(idUser: string) {
    const user = await this.userModel.getById(idUser);
    if (!user) {
      return null;
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async listAll(query: unknown) {
    const validQuery = querySchema.parse(query);
    const { totalCount, result } = await this.userModel.listAll(validQuery);

    const usersWithoutPasswords = result.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return { totalCount, result: usersWithoutPasswords };
  }

  async createNewUser(user: TUserCreated) {
    const validData = userCreatedSchema.parse(user);

    const userWithEmail = await this.userModel.getSelf(user.email);
    if(userWithEmail){
      throw new AppError(ERROR_MESSAGE.EMAIL_ALREADY_EXISTS, STATUS_CODE.CONFLICT);
    }
    
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(validData.password, saltRounds);

    const newUser = await this.userModel.createNewUser({
      ...validData,
      password: hashedPassword,
    });

    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async updateUser(data: TUserUpdated, idUser: string) {
    const validateDataSchema = userUpdatedSchema.parse(data);
    const userToUpdate = await this.userModel.getById(idUser);
    if (!userToUpdate) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const { currentPassword, newPassword, ...restOfData } = validateDataSchema;
    const dataToUpdate: Partial<TUserUpdated> = { ...restOfData };

    if (newPassword && currentPassword) {
      const isPasswordCorrect = bcrypt.compareSync(
        currentPassword,
        userToUpdate.password,
      );

      if (!isPasswordCorrect) {
        throw new AppError(ERROR_MESSAGE.CURRENT_PASSWORD_INCORRECT, STATUS_CODE.UNAUTHORIZED);
      }

      const saltRounds = 10;
      dataToUpdate.password = bcrypt.hashSync(newPassword, saltRounds);
    } else if ((newPassword && !currentPassword) || (!newPassword && currentPassword)) {
      throw new AppError(
        ERROR_MESSAGE.PASSWORDS_MUST_BE_PROVIDED,
        STATUS_CODE.BAD_REQUEST,
      );
    }

    const updatedUser = await this.userModel.updateUser(idUser, dataToUpdate);

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async deleteUser(idUser: string) {
    const oldUser = await this.userModel.getById(idUser);
    if (!oldUser) {
      throw new AppError(
        ERROR_MESSAGE.USER_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
    }

    const deletedUser = await this.userModel.deleteUser(idUser);

    const { password, ...userWithoutPassword } = deletedUser;
    return {
      user: userWithoutPassword,
    };
  }
}
