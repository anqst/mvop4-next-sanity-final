import Image from 'next/image'
import Link from 'next/link'

import { urlForImage } from '~/lib/sanity.image'
import { type Post } from '~/lib/sanity.queries'
import { formatDate } from '~/utils'
import { getClient } from '~/lib/sanity.client'

export default function Card({ post }: { post: Post }) {
  //
  console.log(post)

  return (
    <div className="flex flex-col justify-start items-center gap-6 w-screen">
      <div className="w-[80%] py-3 border-b-4 border-b-gray-500">
        {post.mainImage ? (
          <Image
            className="w-full"
            src={urlForImage(post.mainImage).height(1000).url()}
            height={150}
            width={150}
            alt=""
          />
        ) : (
          <div className="w-full h-[150px] bg-black" />
        )}
        <div className="w-full flex flex-col gap-3 py-3 px-3 text-black">
          <Link href={`/post/${post.slug.current}`}>
            <p className="text-left text-2xl font-bold">{post.title}</p>
          </Link>
          <p className="text-base">{post.excerpt}</p>
          <div className="text-base">
            <span className="font-bold">{formatDate(post._createdAt)}</span>
            <span>&nbsp; by &nbsp;</span>
            <span className="text-base font-bold">{post.postAuthor.name}</span>
          </div>
          {post.postCategory ? (
            <div className="flex flex-row">
              <p className="p-2 rounded-xl bg-gray-500 text-white text-sm">
                {post.postCategory.title}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
