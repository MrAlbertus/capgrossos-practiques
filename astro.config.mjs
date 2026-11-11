// @ts-check
import { defineConfig } from 'astro/config';

// Static output for Cloudflare Pages. The same repository feeds two Pages projects:
// the public site (drafts hidden) and the drafts preview (SHOW_DRAFTS=true).
export default defineConfig({
  site: 'https://capgrossos-practiques.pages.dev',
  trailingSlash: 'always',
});
