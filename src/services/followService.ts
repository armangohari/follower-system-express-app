import prisma from "../utils/prismaClient";

export const followUser = async (followerId: number, followingId: number) => {
  const existingFollow = await prisma.follower.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });
  if (existingFollow) {
    return null; // Indicates that the follow relationship already exists
  }
  return await prisma.follower.create({
    data: {
      followerId,
      followingId,
    },
  });
};

export const unfollowUser = async (followerId: number, followingId: number) => {
  const existingFollow = await prisma.follower.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });
  if (!existingFollow) {
    return null; // Indicates that the follow relationship does not exist
  }
  return await prisma.follower.delete({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });
};

export const getFollowers = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: { followers: true },
  });
};

export const getFollowing = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: { following: true },
  });
};

export const getMutualFollowers = async (userId1: number, userId2: number) => {
  type FollowerIdObject = { followerId: number };

  const followers1: FollowerIdObject[] = await prisma.follower.findMany({
    where: { followingId: userId1 },
    select: { followerId: true },
  });

  const followers2: FollowerIdObject[] = await prisma.follower.findMany({
    where: { followingId: userId2 },
    select: { followerId: true },
  });

  const mutualFollowers = followers1.filter((follower1) =>
    followers2.some(
      (follower2) => follower2.followerId === follower1.followerId
    )
  );

  return mutualFollowers.map((follower) => follower.followerId);
};
