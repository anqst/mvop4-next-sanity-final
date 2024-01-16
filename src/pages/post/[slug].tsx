import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'

import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import {
  getPost,
  type Post,
  postBySlugQuery,
  postSlugsQuery,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { formatDate } from '~/utils'
import Highlight from '~/components/Highlight'
import { ReactElement, JSXElementConstructor } from 'react'
import { BlockStyleProps } from 'sanity'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    post: Post
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const post = await getPost(client, params.slug)

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      post,
    },
  }
}

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  //
  console.log(props)

  const [post] = useLiveQuery(props.post, postBySlugQuery, {
    slug: props.post.slug.current,
  })

  return (
    <Container>
      <div className="w-[90%] md:w-[80%] lg:w-[60%] m-auto py-12 flex flex-col gap-6">
        {post.mainImage ? (
          <div className="">
            <Image
              className="w-full"
              src={urlForImage(post.mainImage).height(1000).url()}
              height={0}
              width={500}
              alt=""
            />
          </div>
        ) : null}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h1 className="text-left text-2xl md:text-3xl font-bold">
              {post.title}
            </h1>
            <p className="text-base italic overflow-hidden text-ellipsis line-clamp-3">
              {post.excerpt}
            </p>
            <div className="text-base">
              <span className="font-bold">{formatDate(post._createdAt)}</span>
              <span>&nbsp; by &nbsp;</span>
              <span className="text-base font-bold">
                {post.postAuthor.name}
              </span>
            </div>
            {post.postCategory ? (
              <div className="flex flex-row">
                <p className="p-2 rounded-xl bg-gray-500 text-white text-sm">
                  {post.postCategory.title}
                </p>
              </div>
            ) : null}
          </div>
          <div className="">
            <PortableText
              components={{
                block: {
                  highlight: ({ children }) => (
                    <div className="highlight">{children}</div>
                  ),
                },
              }}
              value={post.body}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(postSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/post/${slug}`) || [],
    fallback: 'blocking',
  }
}
