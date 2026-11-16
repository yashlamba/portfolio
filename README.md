# portfolio

## Blog and notes

Write articles and short notes as regular posts in `content/blogs/`.
Use `cover.image` for an optional image on the left of the card. Omit `cover`
for a text-only tile. The list uses the theme's standard pagination.

### Inline gallery

Wrap regular Markdown images in `inline-gallery` to display a responsive grid.
Click an image to enlarge it; close with Escape, the close button, or a click
outside the image. You can use more than one gallery in a post.

```markdown
{{< inline-gallery >}}
![First latte art attempt](/images/latte-1.jpg)
![A heart taking shape](/images/latte-2.jpg)
{{< /inline-gallery >}}
```

Put photos in `static/images/` and reference them as `/images/filename.jpg`.
Page bundle images also work with paths relative to the post. The grid crops
thumbnails to squares; the enlarged view shows the full image.

For images in `assets/`, omit the leading slash and `assets/` prefix, for example
`![Latte art](latte-art/2026-11-12-2.jpg)` for `assets/latte-art/2026-11-12-2.jpg`.

Hugo automatically generates WebP copies for gallery photos in `assets/` or page
bundles: square thumbnails up to 480 pixels and zoom images that fit within
1600 × 1600 pixels. Only the lazy-loaded thumbnails are fetched for the grid;
the larger version loads when clicked. Originals are preserved. Remote images,
files in `static/`, animated GIFs, and unsupported formats use their existing
URLs without resizing. Images outside the gallery keep their normal rendering.

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
project_image: "/images/project-preview.png" # optional; falls back to cover.image, then a text placeholder
tags: ["project", "python", "react"]
cover:
  image: "/images/project-preview.png"
  alt: "Project preview"
```
