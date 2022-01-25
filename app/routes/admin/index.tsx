import { Link } from "remix";

export default function AdminPage() {
  return (
    <p>
      <Link to="new">Create Post</Link>
    </p>
  );
}
