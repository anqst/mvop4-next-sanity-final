import Image from 'next/image'

import { urlForImage } from '~/lib/sanity.image'
import { type Post } from '~/lib/sanity.queries'
import { formatDate } from '~/utils'
import { getClient } from '~/lib/sanity.client'

export default function Card({ post }: { post: Post }) {
  //
  /* console.log(post) */

  return (
    <div className="flex flex-row justify-start items-center gap-6">
      {post.mainImage ? (
        <Image
          className="card__cover"
          src={urlForImage(post.mainImage).width(500).height(300).url()}
          height={300}
          width={500}
          alt=""
        />
      ) : (
        <div className="w-[500px] h-[300px] bg-black" />
      )}
      <div className="flex flex-col gap-6">
        <div>
          <p>posted by</p>
          <p className="font-bold">{post.postAuthor.name}</p>
        </div>
        <h3 className="text-3xl font-bold">
          <a className="" href={`/post/${post.slug.current}`}>
            {post.title}
          </a>
        </h3>
        <p className="">{post.excerpt}</p>
        <p className="">{formatDate(post._createdAt)}</p>
        <div className="text-gray-500">
          {post.postCategory ? <p>{}</p> : null}
        </div>
      </div>
    </div>
  )
}

/* export default function Card({ post }: { post: Post }) {
  return (
    <div className="card">
      {post.mainImage ? (
        <Image
          className="card__cover"
          src={urlForImage(post.mainImage).width(500).height(300).url()}
          height={300}
          width={500}
          alt=""
        />
      ) : (
        <div className="card__cover--none" />
      )}
      <div className="card__container">
        <h3 className="card__title">
          <a className="card__link" href={`/post/${post.slug.current}`}>
            {post.title}
          </a>
        </h3>
        <p className="card__excerpt">{post.excerpt}</p>
        <p className="card__date">{formatDate(post._createdAt)}</p>
      </div>
    </div>
  )
} */
