import Link from 'next/link'

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="bg-orange-500 w-full flex flex-col items-center py-8 text-white text-2xl">
        <Link href="/">&lt;Sample Blog Website&gt;</Link>
      </header>
      <main>{children}</main>
      <header className="bg-orange-500 w-full flex flex-col items-center py-8 text-white text-base">
        <p>Copyright &copy; anqst, 2024</p>
      </header>
    </div>
  )
}
