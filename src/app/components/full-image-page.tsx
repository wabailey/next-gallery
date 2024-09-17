import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);

  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  return (
    <div className="flex h-full w-full border text-zinc-100">
      <img src={image.url} alt={image.name} className="object-contain" />

      <div className="flex w-64 flex-col border-l">
        <div className="border-b p-3 text-left text-lg font-medium">
          {image.name}
        </div>
        <div className="flex flex-col p-3">
          <span>Uploaded By:</span>
          <span>{uploaderInfo.fullName}</span>
        </div>
        <div className="flex flex-col p-3">
          <span>Created On:</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
