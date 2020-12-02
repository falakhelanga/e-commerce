import express from "express";
import * as loginControllers from "../../controllers/authControllers/loginControllers.js";
import auth from "../../middlewares/authMiddleware.js";
import { isAdminMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", loginControllers.postLogin);
router.route("/profile").get(auth, loginControllers.getUserProfile);
router.route("/profile").put(auth, loginControllers.updateUserProfile);

router
  .route("/")
  .post(loginControllers.postRegister)
  .get(auth, isAdminMiddleware, loginControllers.getUsers);
router
  .route("/:id")
  .delete(auth, isAdminMiddleware, loginControllers.deleteUser)
  .get(auth, isAdminMiddleware, loginControllers.getUserById)
  .put(auth, isAdminMiddleware, loginControllers.updateUser);
export default router;
