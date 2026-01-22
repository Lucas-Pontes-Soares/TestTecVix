import { Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { STATUS_CODE } from "../constants/statusCode";
import { verifyToken } from "../utils/jwt";
import { CustomRequest } from "../types/custom";
import { JwtPayload } from "jsonwebtoken";
import { ERROR_MESSAGE } from "../constants/erroMessages";

export const authUser = async (
  req: CustomRequest<JwtPayload>,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization || Array.isArray(authorization)) {
    throw new AppError(ERROR_MESSAGE.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
  }
  
  const token = authorization.split(" ")[1];

  if (!token) {
    throw new AppError(ERROR_MESSAGE.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded as JwtPayload; 
    return next();
  } catch (error) {
    return next(error);
  }
};