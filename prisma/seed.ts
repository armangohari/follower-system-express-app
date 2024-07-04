import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: { username: "user1" },
  });

  const user2 = await prisma.user.create({
    data: { username: "user2" },
  });

  const user3 = await prisma.user.create({
    data: { username: "user3" },
  });

  const user4 = await prisma.user.create({
    data: { username: "user4" },
  });

  // Create followers
  await prisma.follower.createMany({
    data: [
      { followerId: user1.id, followingId: user2.id },
      { followerId: user1.id, followingId: user3.id },
      { followerId: user2.id, followingId: user1.id },
      { followerId: user2.id, followingId: user3.id },
      { followerId: user3.id, followingId: user1.id },
      { followerId: user3.id, followingId: user4.id },
      { followerId: user4.id, followingId: user1.id },
      { followerId: user4.id, followingId: user2.id },
    ],
  });

  console.log(
    "Database has been seeded with 5 new `user`s and 8 `follower` relationships. 🌱"
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
