import Link from 'next/link'

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <header className="">
        {/* <Link className="header__title" href="/">
          My Blog Website
        </Link> */}
      </header>
      <main>{children}</main>
    </div>
  )
}
