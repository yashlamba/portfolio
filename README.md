# portfolio

## Projects grid

The `/projects/` page is rendered by `layouts/projects/list.html`.

Project cards come from pages in `content/projects/`.

Card behavior:

- The card opens the project page itself by default.
- The primary button opens `project_url`.
- If `repo_url` is present, the card also shows a `Code` button.
- If `project_card_url` is present, the whole card opens that URL instead of the project page. Use this when the writeup lives elsewhere, such as a blog post.
- If `project_direct: true` is present, the whole card opens `project_url` instead of the page itself. Use this only when there is no writeup page.

Supported front matter:

```yaml
title: "Project page title"
linkTitle: "Short card title" # optional; useful when title is long
description: "Short card description"
project_cta: "Try It" # optional; defaults to Try
project_url: "https://example.com/live-project"
project_card_url: "/blogs/project-writeup/" # optional
repo_url: "https://github.com/user/repo" # optional
project_direct: true # optional
project_image: "/images/project-preview.png" # optional; falls back to cover.image
tags: ["project", "python", "react"]
cover:
  image: "/images/project-preview.png"
  alt: "Project preview"
```
