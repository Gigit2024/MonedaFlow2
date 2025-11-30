import { Header } from '@/components/header'
import { Converter } from '@/components/converter'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Header />
      <Converter />
    </main>
  )
}