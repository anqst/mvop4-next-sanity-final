import Image from 'next/image'
import Link from 'next/link'

import { urlForImage } from '~/lib/sanity.image'
import { type Post } from '~/lib/sanity.queries'
import { formatDate } from '~/utils'
import { getClient } from '~/lib/sanity.client'

export default function Card({
  post,
  isFirst,
}: {
  post: Post
  isFirst?: boolean
}) {
  //
  /* if (isFirst === true) {
    console.log(post)
  } */

  return (
    <div className="flex flex-col justify-start items-center gap-6 w-full">
      <div className="border-2 border-gray-500 relative flex flex-col w-full">
        <Link
          className="absolute w-full h-full"
          href={`/post/${post.slug.current}`}
        ></Link>
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
        ) : (
          <div className="w-full h-[150px] bg-black" />
        )}
        <div className="flex flex-col gap-3 py-3 px-3 text-black pb-3">
          <p className="text-black no-underline text-left text-2xl font-bold overflow-hidden text-ellipsis line-clamp-1">
            {post.title}
          </p>
          {isFirst === true ? (
            <p className="text-base overflow-hidden text-ellipsis line-clamp-3">
              {post.excerpt}
            </p>
          ) : null}
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
