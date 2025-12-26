import { getPostsById } from "@/lib/api/blog/search";
import { capitalizeFirstLetter } from "@/lib/utils";
import { notFound } from "next/navigation";

async function isValidPost({
    post,
}: {
    post: Promise<{ id: number; tags: string[] }>;
}): Promise<boolean> {
    return (
        post &&
        typeof (await post).id === "number" &&
        Array.isArray((await post).tags)
    );
}

export default async function PostIdPage({ 
    params,
}: {
    params: Promise<{ postId: string }>;
}) {

    const { postId } = await params;

    let postWithAuthor;

    try {
        postWithAuthor = await getPostsById(Number(postId));
    } catch{
        return notFound();
    }
    if (!postWithAuthor || !await isValidPost({ post: Promise.resolve(postWithAuthor) })) {
        return notFound();
    }

    return (

        <div className="container mx-auto p-10 flex-grow">
            <main className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8">
                <section className="space-y-6">
                    <article key={postWithAuthor.id} className="p-4">
                        <h2 className="text-3xl font-bold mb-2">
                            {postWithAuthor.title}
                        </h2>
                        <section className="inline-block px-3 py-1 mb-3">
                            {postWithAuthor.tags.map((tag: string, index: number) => (
                                <a key={index} className="inline-block px-3 py-1 border rounded-full text-sm bg-gray-200 hover:bg-blue-300 transition mb-3 mr-2 hover:underline" href={`/post/categories/${tag}`}>
                                    {capitalizeFirstLetter(tag)}
                                </a>
                            ))
                            }
                            <a>
                                <p className="text-sm text-gray-600 mt-2">By {postWithAuthor.authorName}</p>
                            </a>
                        </section>
                        <p className="mb-2 indent-8 text-justify">
                            {postWithAuthor.body}
                        </p>
                    </article>
                </section>
                <section className="inline-block">
                    <aside className="p-4 bg-blue-100 rounded">
                        <h3 className=" text-2xl font-semibold mb-4">About Me</h3>
                        <p>
                            {" Hi! I'm a passionate developer who loves writing about technology and programming. Follow my blog for the latest updates and tutorials."}
                        </p>
                    </aside>
                </section>
            </main>
        </div>
    );
}