import jwt, { TokenExpiredError } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";

const secret = process.env.JWT_SECRET;

interface IPayload {
  idUser: string;
  role: "admin" | "member" | "manager";
}

export const genToken = (payload: IPayload) => {
  if (!secret) {
    throw new Error("JWT_SECRET must be defined.");
  }
  return jwt.sign(payload, secret, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token: string) => {
  if (!secret) {
    throw new Error("JWT_SECRET must be defined.");
  }
  try {
    const data = jwt.verify(token, secret);
    return data;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new AppError(ERROR_MESSAGE.TOKEN_EXPIRED, STATUS_CODE.UNAUTHORIZED);
    }
    throw new AppError(ERROR_MESSAGE.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
  }
};
