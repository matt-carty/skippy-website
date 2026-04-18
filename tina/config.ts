import { defineConfig } from 'tinacms';
import type { TinaField } from 'tinacms';

/**
 * Matches `post` in `src/content/config.ts` (loader: `src/data/post`).
 *
 * - **Posts (Markdown)** — safe to edit in Tina.
 * - **Posts (MDX)** — same fields; files that use `import` in the body (e.g. demos) can be
 *   overwritten by Tina’s editor in ways that drop those imports. Prefer editing those in the
 *   repo, or avoid re-saving from Tina unless the body is plain markdown/MDX.
 */
const postFields: TinaField[] = [
  {
    type: 'string',
    name: 'title',
    label: 'Title',
    isTitle: true,
    required: true,
  },
  {
    type: 'datetime',
    name: 'publishDate',
    label: 'Publish date',
  },
  {
    type: 'datetime',
    name: 'updateDate',
    label: 'Last updated',
  },
  {
    type: 'boolean',
    name: 'draft',
    label: 'Draft',
  },
  {
    type: 'string',
    name: 'excerpt',
    label: 'Excerpt',
    ui: {
      component: 'textarea',
    },
  },
  {
    type: 'string',
    name: 'image',
    label: 'Cover image URL',
  },
  {
    type: 'string',
    name: 'category',
    label: 'Category',
  },
  {
    type: 'string',
    name: 'tags',
    label: 'Tags',
    list: true,
  },
  {
    type: 'string',
    name: 'author',
    label: 'Author',
  },
  {
    type: 'object',
    name: 'metadata',
    label: 'SEO (optional)',
    fields: [
      {
        type: 'string',
        name: 'canonical',
        label: 'Canonical URL',
      },
      {
        type: 'object',
        name: 'robots',
        label: 'Robots',
        fields: [
          { type: 'boolean', name: 'index', label: 'Index' },
          { type: 'boolean', name: 'follow', label: 'Follow' },
        ],
      },
    ],
  },
  {
    type: 'rich-text',
    name: 'body',
    label: 'Body',
    isBody: true,
  },
];

const branch =
  process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || 'main';

export default defineConfig({
  branch,

  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },

  media: {
    tina: {
      mediaRoot: '',
      publicFolder: 'public',
    },
  },

  schema: {
    collections: [
      {
        name: 'post',
        label: 'Posts (Markdown)',
        path: 'src/data/post',
        format: 'md',
        fields: postFields,
      },
      {
        name: 'post_mdx',
        label: 'Posts (MDX)',
        path: 'src/data/post',
        format: 'mdx',
        fields: postFields,
      },
    ],
  },
});
