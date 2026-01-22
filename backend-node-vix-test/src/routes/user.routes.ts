import { Router } from "express";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";
import { UserController } from "../controllers/UserController";
import { authUser } from "../auth/authUser";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.USER; // /api/v1/user

const userRoutes = Router();

export const makeUserController = () => {
  return new UserController();
};

const userController = makeUserController();

// ========= AUTHs =========

userRoutes.post(
  `${BASE_PATH}/login`,
  async (req, res) => {
    await userController.login(req, res);
  },
);

userRoutes.post(
  `${BASE_PATH}/register`,
  async (req, res) => {
    await userController.register(req, res);
  },
);

// ========= GETS =========

userRoutes.get(
  `${BASE_PATH}/self`, 
  authUser,
  async (req, res) => {
    await userController.getSelf(req, res);
  }
);

userRoutes.get(
  `${BASE_PATH}/:idUser`,
  authUser,
  async (req, res) => {
    await userController.getById(req, res);
  },
);

userRoutes.get(
  `${BASE_PATH}`,
   authUser,
  async (req, res) => {
    await userController.listAll(req, res);
  },
);

// ========= POSTs =========

userRoutes.post(
  `${BASE_PATH}`,
  authUser,
  async (req, res) => {
    await userController.createNewUser(req, res);
  },
);

// ========= PUTs =========

userRoutes.put(
  `${BASE_PATH}/:idUser`,
  authUser,
  async (req, res) => {
    await userController.updateUser(req, res);
  },
);

// ========= DELETEs =========

userRoutes.delete(
  `${BASE_PATH}/:idUser`,
  authUser,
  async (req, res) => {
    await userController.deleteUser(req, res);
  },
);

export { userRoutes };
