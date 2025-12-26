import { capitalizeFirstLetter } from "@/lib/utils";

export async function SearchNameById(userId: number) {
  const res = await fetch(`https://dummyjson.com/users/${userId}`, { cache: 'no-store' });
  const data = await res.json();
  return data.firstName + ' ' + data.lastName;
}

export default async function Home() {

  const res = await fetch('https://dummyjson.com/posts?limit=1', { cache: 'no-store' });
  const data = await res.json();

  const postWithAuthor = await Promise.all(
    data.posts.map(async (post: any) => {
      const authorName = await SearchNameById(post.userId);
      return { ...post, authorName }; 
    })
  );

  return (

    <div className="container mx-auto p-10 flex-grow">
      <main className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8">
        <section className="space-y-6">
          {postWithAuthor.map((posts: any) => (
            <article key={posts.id} className="p-4">
              <h2 className="text-3xl font-bold mb-2">
                {posts.title}
              </h2>
              <section className="inline-block px-3 py-1 mb-3">
                {posts.tags.map((tag: string, index: number) => (
                  <a key={index} className="inline-block px-3 py-1 border rounded-full text-sm bg-gray-200 hover:bg-blue-300 transition mb-3 mr-2 hover:underline" href={`/post/categories/${tag}`}>
                    {capitalizeFirstLetter(tag)}
                  </a>
                ))
                }
                <a>
                  <p className="text-sm text-gray-600 mt-2">By {posts.authorName}</p>
                </a>
              </section>
              <p className="mb-2 indent-8 text-justify">
                {posts.body}
              </p>
            </article>
          ))}
        </section>
        <section className="inline-block">
          <aside className="p-4">
            <h3 className=" text-2xl font-semibold mb-4">About Me</h3>
            <p>
              Hi! I'm a passionate developer who loves writing about technology and programming. Follow my blog for the latest updates and tutorials.
            </p>
          </aside>
        </section>
      </main>
    </div>
  );
}