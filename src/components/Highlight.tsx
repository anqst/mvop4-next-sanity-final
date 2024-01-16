import { BlockStyleProps } from 'sanity'

export default function Highlight(props: BlockStyleProps) {
  return <div className="highlight">{props.children}</div>
}
