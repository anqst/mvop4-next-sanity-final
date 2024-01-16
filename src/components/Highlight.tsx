import { ReactNode } from 'react'
import { BlockStyleProps } from 'sanity'

export default function Highlight(props: BlockStyleProps | undefined) {
  return (
    <div className="bg-green-500 text-white pl-4 py-1">{props.children}</div>
  )
}
