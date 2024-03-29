import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'

import Card from '~/components/Card'
import Container from '~/components/Container'
import Welcome from '~/components/Welcome'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getPosts, type Post, postsQuery } from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    posts: Post[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const posts = await getPosts(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      posts,
    },
  }
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [posts] = useLiveQuery<Post[]>(props.posts, postsQuery)

  let newestPost: Post
  posts.length ? (newestPost = posts[0]) : (newestPost = null)

  return (
    <Container>
      <section>
        {posts.length ? (
          <div className="flex flex-col justify-start items-center py-6 gap-6 lg:gap-8 w-[80%] lg:w-[60%] xl:w-[50%] m-auto">
            <p className="text-2xl md:text-3xl border-b-2 border-b-gray-500 ">
              Hot Post
            </p>
            <Card key={newestPost._id} post={newestPost} isFirst={true} />
            <p className="text-2xl md:text-3xl border-b-2 border-b-gray-500 ">
              Other Posts
            </p>
            <div className="w-full flex flex-col justify-start items-center gap-6 lg:gap-8 lg:grid grid-cols-2 lg:items-start">
              {posts.map((post) =>
                post._id !== newestPost._id ? (
                  <Card key={post._id} post={post} />
                ) : null,
              )}
            </div>
          </div>
        ) : (
          <Welcome />
        )}
      </section>
    </Container>
  )
}
