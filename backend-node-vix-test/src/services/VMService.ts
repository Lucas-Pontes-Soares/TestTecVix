import { user, vM } from "@prisma/client";
import { VMModel } from "../models/VMModel";
import { TVMCreate, vMCreatedSchema } from "../types/validations/VM/createVM";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { TVMUpdate, vMUpdatedSchema } from "../types/validations/VM/updateVM";
import { vmListAllSchema } from "../types/validations/VM/vmListAll";
import bcrypt from "bcryptjs";

export class VMService {
  constructor() {}

  private vMModel = new VMModel();

  async getById(idVM: number) {
    const vm = await this.vMModel.getById(idVM);
    if (!vm) return null;
    const { password, ...vmWithoutPassword } = vm;
    return vmWithoutPassword;
  }

  async listAll(query: unknown, user: user) {
    const validQuery = vmListAllSchema.parse(query);
    const { totalCount, result: vms } = await this.vMModel.listAll({
      query: validQuery,
    });

    const vmsWithoutPasswords = vms.map((vm) => {
      const { password, ...vmWithoutPassword } = vm;
      return vmWithoutPassword;
    });

    return { totalCount, result: vmsWithoutPasswords };
  }

  async createNewVM(data: TVMCreate, user: user) {
    const validData = vMCreatedSchema.parse(data);

    let hashedPassword = undefined;
    if (validData.password) {
      const saltRounds = 10;
      hashedPassword = bcrypt.hashSync(validData.password, saltRounds);
    }

    const createdVM = await this.vMModel.createNewVM({
      ...validData,
      status: "RUNNING",
      password: hashedPassword,
    });

    const { password, ...vmWithoutPassword } = createdVM;
    return vmWithoutPassword;
  }

  async updateVM(idVM: number, data: TVMUpdate, user: user) {
    const validateDataSchema = vMUpdatedSchema.parse(data);
    const oldVM = await this.vMModel.getById(idVM);

    if (!oldVM) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const { currentPassword, newPassword, ...restOfData } = validateDataSchema;
    const dataToUpdate: Partial<TVMUpdate> = { ...restOfData };

    if (newPassword && currentPassword) {
      if (!oldVM.password) {
        throw new AppError(
          ERROR_MESSAGE.VM_HAS_NO_PASSWORD,
          STATUS_CODE.BAD_REQUEST,
        );
      }

      const isPasswordCorrect = bcrypt.compareSync(
        currentPassword,
        oldVM.password,
      );

      if (!isPasswordCorrect) {
        throw new AppError(
          ERROR_MESSAGE.CURRENT_PASSWORD_INCORRECT,
          STATUS_CODE.UNAUTHORIZED,
        );
      }

      const saltRounds = 10;
      dataToUpdate.password = bcrypt.hashSync(newPassword, saltRounds);
    } else if (newPassword || currentPassword) {
      throw new AppError(
        ERROR_MESSAGE.PASSWORDS_MUST_BE_PROVIDED,
        STATUS_CODE.BAD_REQUEST,
      );
    }

    const updatedVM = await this.vMModel.updateVM(idVM, dataToUpdate);

    const { password, ...vmWithoutPassword } = updatedVM;
    return vmWithoutPassword;
  }

  async deleteVM(idVM: number, user: user) {
    const oldVM = await this.vMModel.getById(idVM);
    if (!oldVM) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    const deletedVm = await this.vMModel.deleteVM(idVM);

    const { password, ...vmWithoutPassword } = deletedVm;
    return vmWithoutPassword;
  }
}
