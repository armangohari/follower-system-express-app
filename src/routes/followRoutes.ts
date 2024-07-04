import { Router } from "express";
import {
  follow,
  followers,
  following,
  mutualFollowers,
  unfollow,
} from "../controllers/followController";

const router = Router();

router.post("/follow", follow);
router.post("/unfollow", unfollow);
router.get("/followers/:userId", followers);
router.get("/following/:userId", following);
router.get("/mutual-followers", mutualFollowers);

export default router;
