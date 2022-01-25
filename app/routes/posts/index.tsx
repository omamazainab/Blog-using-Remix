import { useLoaderData, Link } from "remix";
import { getPosts, Post } from "~/posts";

export const loader = () => getPosts();

export default function Posts() {
  const posts = useLoaderData<Post[]>();

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div>
          <Link to={post.slug}>{post.title}</Link>
        </div>
      ))}
    </div>
  );
}
