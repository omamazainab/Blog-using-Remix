import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { getPost } from "~/posts";
import invariant from "tiny-invariant";

export const loader: LoaderFunction = ({ params }) => {
  invariant(params.slug, "expected params.slug");
  return getPost(params.slug);
};

export default function postSlug() {
  const post = useLoaderData();
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
    </div>
  );
}
