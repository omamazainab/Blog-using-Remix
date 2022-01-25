import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";
import { marked } from "marked";


const postsPath = path.join(__dirname, "..", "posts");

export interface Post {
  slug: string;
  title: string;
  markdown : string;
}

export interface PostMarkdownattriutes{
  title : string;
}

function isValidPostattriute(attributes : any) : attributes is PostMarkdownattriutes{ 
  return attributes?.title;
}

export async function getPosts() {
  const dir = await fs.readdir(postsPath);

  return Promise.all(
    dir.map(async (filename) => {
      const file = await fs.readFile(path.join(postsPath, filename));
      const { attributes } = parseFrontMatter(file.toString());
      invariant(isValidPostattriute(attributes),`${filename} has bad meta data`)
      return {
        slug: filename.replace(/\.md$/,""),
        title : attributes.title
      }
    })
  );
}

export async function getPost(slug: string) {
  const filepath = path.join(postsPath, slug + ".md");
  const file = await fs.readFile(filepath);
  const { attributes,body } = parseFrontMatter(file.toString());
  invariant(
    isValidPostattriute(attributes),
    `Post ${filepath} is missing attributes`
  );
  const html = marked(body);
  return { slug, title: attributes.title, html };
}

export async function createPost(post: Post) {
  const md = `---\ntitle: ${post.title}\n---\n\n${post.markdown}`;
  await fs.writeFile(
    path.join(postsPath, post.slug + ".md"),
    md
  );
  return getPost(post.slug);
}