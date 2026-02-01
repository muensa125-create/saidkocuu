import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-serif text-gold mb-4">404</h1>
        <h2 className="text-2xl font-serif text-white/90 mb-6">
          Sayfa Bulunamadı
        </h2>
        <p className="text-white/70 mb-8 leading-relaxed">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white/80 hover:text-white"
        >
          <Home className="h-4 w-4" />
          Ana Sayfaya Dön
        </Link>
      </div>
    </main>
  )
}
