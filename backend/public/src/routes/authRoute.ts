import router from "./routes";
import { registerUser } from "../controllers/authController";

router.post("/register", registerUser);

export { router as authRoute };