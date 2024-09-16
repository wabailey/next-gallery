import { db } from "~/server/db";

const mockUrls = [
  "https://utfs.io/f/th1eKx1NOm2dAIbvN3yyL4wRCTVr1SZG0bei53Hngdk8NUFP",
  "https://utfs.io/f/th1eKx1NOm2dE59Nm6lGlH5AOYnVMicCFaufKSDm9jEydRI8",
  "https://utfs.io/f/th1eKx1NOm2d8meTNBwJfKbxlFUQHWmBX8TVN46gS2D9ZsIy",
];

const mockImgs = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  console.log(posts);

  return (
    <main>
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {mockImgs.map((img) => (
          <div key={img.id} className="w-48">
            <img src={img.url} alt="image" />
          </div>
        ))}
      </div>
    </main>
  );
}
