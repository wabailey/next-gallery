import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

export async function getUserImages() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthroised");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return images;
}

export async function getImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorised");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) throw new Error("Image not found");

  if (image.userId !== user.userId) throw new Error("Unauthorised");

  return image;
}
