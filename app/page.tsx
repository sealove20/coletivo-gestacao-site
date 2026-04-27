import type { Metadata } from 'next'
import { createReader } from '@keystatic/core/reader'
import Markdoc from '@markdoc/markdoc'
import keystaticConfig from '../keystatic.config'
import HomePage, { type BlogPost } from '@/components/HomePage'

export const metadata: Metadata = {
  title: 'Coletivo Gestação — Teatro Negro | Rondonópolis MT',
  description: 'Coletivo Afroperspectivista de Teatro. Espetáculo Gestação de Cam — teatro negro, memória e ancestralidade. Rondonópolis, Mato Grosso.',
  openGraph: {
    title: 'Coletivo Gestação — Teatro Negro',
    description: 'Coletivo Afroperspectivista de Teatro. Espetáculo premiado Gestação de Cam.',
    type: 'website',
  },
}

const reader = createReader(process.cwd(), keystaticConfig)

export default async function Page() {
  const slugs = await reader.collections.posts.list()

  const posts = (
    await Promise.all(
      slugs.map(async (slug): Promise<BlogPost | null> => {
        const post = await reader.collections.posts.read(slug)
        if (!post) return null

        const { node } = await post.content()
        const rendered = Markdoc.transform(node)
        const html = Markdoc.renderers.html(rendered)

        return {
          slug,
          category: post.category,
          tag: post.tag,
          title: post.title,
          excerpt: post.excerpt,
          author: post.author,
          date: post.date,
          readTime: post.readTime,
          content: html,
        }
      })
    )
  ).filter((p): p is BlogPost => p !== null)

  return <HomePage posts={posts} />
}
