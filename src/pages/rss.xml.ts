import postsData from '@/data/posts.json'
import type { PostList } from '@/integrations/getPostList'

import rss from '@astrojs/rss'
import dayjs from 'dayjs'

export const get = () =>
  rss({
    // `<title>` field in output xml
    title: import.meta.env.PUBLIC_SITE_TITLE,
    // `<description>` field in output xml
    description: import.meta.env.PUBLIC_SITE_DESCRIPTION,
    // base URL for RSS <item> links
    // SITE will use "site" from your project's astro.config.
    site: import.meta.env.SITE,
    // list of `<item>`s in output xml
    // simple example: generate items for every md file in /src/pages
    // see "Generating items" section for required frontmatter and advanced use cases
    items: (postsData as PostList).map((post) => ({
      link:
        post.postType === 'normal'
          ? import.meta.env.SITE + '/blog/' + post.id + '/'
          : post.url,
      title: post.title,
      pubDate: dayjs(post.date).toDate(),
      customData: `<guid isPermaLink="false">${post.id}</guid><media:content xmlns:media="http://search.yahoo.com/mrss/" url="${post?.thumbnail?.url}?fm=jpg" type="image/jpeg"></media:content>`,
    })),
    // (optional) inject custom xml
    customData: `<language>ja</language>`,
  })
