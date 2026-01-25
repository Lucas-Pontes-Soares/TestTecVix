import { Router } from "express";
import { BrandMasterController } from "../controllers/BrandMasterController";
import { API_VERSION, ROOT_PATH } from "../constants/basePathRoutes";
import { authUser } from "../auth/authUser";
import { isManagerOrIsAdmin } from "../auth/isManagerOrIsAdmin";
import { isAdmin } from "../auth/isAdmin";

const BASE_PATH = API_VERSION.V1 + ROOT_PATH.BRANDMASTER; // /api/v1/brand-master

const brandMasterRoutes = Router();

export const makeBrandMasterController = () => {
  return new BrandMasterController();
};

const brandMasterController = makeBrandMasterController();

// ========= GETs =========

brandMasterRoutes.get(
  `${BASE_PATH}/self`, 
  async (req, res) => {
   await brandMasterController.getSelf(req, res);
  }
);

brandMasterRoutes.get(
  `${BASE_PATH}/:idBrandMaster`,
  authUser,
  async (req, res) => {
    await brandMasterController.getById(req, res);
  },
);

brandMasterRoutes.get(
  `${BASE_PATH}`,
  authUser,
  async (req, res) => {
    await brandMasterController.listAll(req, res);
  },
);

// ========= POSTs =========

brandMasterRoutes.post(
  `${BASE_PATH}`,
  authUser,
  isManagerOrIsAdmin,
  async (req, res) => {
    await brandMasterController.createNewBrandMaster(req, res);
  },
);

// ========= PUTs =========

brandMasterRoutes.put(
  `${BASE_PATH}/:idBrandMaster`,
  authUser,
  isManagerOrIsAdmin,
  async (req, res) => {
    await brandMasterController.updateBrandMaster(req, res);
  },
);

// ========= DELETEs =========

brandMasterRoutes.delete(
  `${BASE_PATH}/:idBrandMaster`,
  authUser,
  isAdmin,
  async (req, res) => {
    await brandMasterController.deleteBrandMaster(req, res);
  },
);

export { brandMasterRoutes };
