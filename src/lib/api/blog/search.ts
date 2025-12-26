type Post = {
    id: number;
    title: string;
    body: string;
    tags: string[];
    userId: number;
}

type PostWithAuthor = Post & {
    authorName: string;
}

async function SearchNameById(userId: number): Promise<string> {
    const res = await fetch(`https://dummyjson.com/users/${userId}`, { cache: 'no-store' });

    const data = await res.json();

    return data.firstName + ' ' + data.lastName;
}

export async function getAllPosts(): Promise<PostWithAuthor[]> {
    const res = await fetch('https://dummyjson.com/posts?limit=10', { cache: 'no-store' });
    const data = await res.json();
    const postsWithAuthor: PostWithAuthor[] = await Promise.all(
        data.posts.map(async (post: Post) => {
            const authorName = await SearchNameById(post.userId);
            return { ...post, authorName };
        })
    );
    return postsWithAuthor;
}

export async function getPostsById(id: number): Promise<PostWithAuthor | null> {
    const res = await fetch(`https://dummyjson.com/posts/${id}`, { cache: 'no-store' });
    const data = await res.json();
    if (!data) return null;
    const authorName = await SearchNameById(data.userId);
    return { ...data, authorName };
}

export async function getPostsByCategory(categoryName: string): Promise<PostWithAuthor[]> {
    const res = await fetch(`https://dummyjson.com/posts/tag/${categoryName}`, { cache: 'no-store' });
    const data = await res.json();
    const postsWithAuthor: PostWithAuthor[] = await Promise.all(
        data.posts.map(async (post: Post) => {
            const authorName = await SearchNameById(post.userId
            );
            return { ...post, authorName };
        })
    );
    return postsWithAuthor;
}
