import { Request, Response } from "express";
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  getMutualFollowers,
} from "../services/followService";

/**
 * @swagger
 * tags:
 *   name: Follow
 *   description: API to manage follow and unfollow actions.
 */

/**
 * @swagger
 * /follow:
 *   post:
 *     summary: Follow a user
 *     tags: [Follow]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - followerId
 *               - followingId
 *             properties:
 *               followerId:
 *                 type: integer
 *               followingId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Successfully followed the user
 *       409:
 *         description: Follow relationship already exists
 *       500:
 *         description: Unable to follow user
 */
export const follow = async (req: Request, res: Response) => {
  const { followerId, followingId } = req.body;
  try {
    const follow = await followUser(followerId, followingId);
    if (!follow) {
      return res
        .status(409)
        .json({ error: "Follow relationship already exists" });
    }
    res.status(201).json(follow);
  } catch (error) {
    res.status(500).json({ error: "Unable to follow user" });
  }
};

/**
 * @swagger
 * /unfollow:
 *   post:
 *     summary: Unfollow a user
 *     tags: [Follow]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - followerId
 *               - followingId
 *             properties:
 *               followerId:
 *                 type: integer
 *               followingId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successfully unfollowed the user
 *       404:
 *         description: Follow relationship does not exist
 *       500:
 *         description: Unable to unfollow user
 */
export const unfollow = async (req: Request, res: Response) => {
  const { followerId, followingId } = req.body;
  try {
    const unfollow = await unfollowUser(followerId, followingId);
    if (!unfollow) {
      return res
        .status(404)
        .json({ error: "Follow relationship does not exist" });
    }
    res.status(200).json(unfollow);
  } catch (error) {
    res.status(500).json({ error: "Unable to unfollow user" });
  }
};

/**
 * @swagger
 * /followers/{userId}:
 *   get:
 *     summary: Get followers of a user
 *     tags: [Follow]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of followers
 *       500:
 *         description: Unable to fetch followers
 */
export const followers = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const followers = await getFollowers(parseInt(userId));
    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch followers" });
  }
};

/**
 * @swagger
 * /following/{userId}:
 *   get:
 *     summary: Get following of a user
 *     tags: [Follow]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of following
 *       500:
 *         description: Unable to fetch following
 */
export const following = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const following = await getFollowing(parseInt(userId));
    res.status(200).json(following);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch following" });
  }
};

/**
 * @swagger
 * /mutual-followers:
 *   get:
 *     summary: Get mutual followers between two users
 *     tags: [Follow]
 *     parameters:
 *       - in: query
 *         name: userId1
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: userId2
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of mutual followers
 *       500:
 *         description: Unable to fetch mutual followers
 */
export const mutualFollowers = async (req: Request, res: Response) => {
  const { userId1, userId2 } = req.query;
  try {
    if (!userId1 || !userId2) {
      return res.status(400).json({ error: "User IDs are required" });
    }
    const mutuals = await getMutualFollowers(
      parseInt(userId1 as string),
      parseInt(userId2 as string)
    );
    res.status(200).json(mutuals);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch mutual followers" });
  }
};
