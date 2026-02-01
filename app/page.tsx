'use client'

import { ExternalLink, Users, Brain, Youtube, BookOpen, Sparkles, Heart } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import ContactForm from './components/ContactForm'
import Navigation from './components/Navigation'

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up')
            observerRef.current?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const elements = document.querySelectorAll('.scroll-animate')
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => {
      elements.forEach((el) => observerRef.current?.unobserve(el))
      observerRef.current?.disconnect()
    }
  }, [])
  const projects = [
    {
      title: 'Gelişim Anahtarı Discord Topluluğu',
      description: '1325+ üyeli kişisel gelişim topluluğunun kurucusu.',
      link: 'https://discord.com/invite/gelisim-anahtari-gecmisolsun-1021011873753219122',
      icon: Users,
      note: 'Erişim için VPN gerekebilir',
    },
    {
      title: 'Ordina AI',
      description: 'Psikoloji ve gelişim odaklı yapay zeka uygulaması kurucusu.',
      link: 'https://play.google.com/store/apps/details?id=com.saidkocu.ayna&hl=tr',
      icon: Brain,
    },
    {
      title: 'YouTube Kanalı',
      description: 'Bilim ve deneyim paylaşımları.',
      link: 'https://www.youtube.com/@saidkocu',
      icon: Youtube,
    },
    {
      title: 'Medium Makaleleri',
      description: 'Profesyonel yazılar ve analizler.',
      link: 'https://medium.com/@saidkocu',
      icon: BookOpen,
    },
  ]

  const [stats, setStats] = useState([
    { label: 'Discord Üyesi', value: '1325', icon: Users, key: 'discord' },
    { label: 'YouTube Abonesi', value: '1786', icon: Youtube, key: 'youtube' },
    { label: 'Proje', value: '4+', icon: Sparkles, key: 'projects' },
  ])

  // Otomatik güncelleme için API'yi çağır
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats')
        if (response.ok) {
          const data = await response.json()
          setStats((prevStats) =>
            prevStats.map((stat) => {
              if (stat.key === 'discord' && data.discord) {
                return { ...stat, value: data.discord.toString() }
              }
              if (stat.key === 'youtube' && data.youtube) {
                return { ...stat, value: data.youtube.toString() }
              }
              return stat
            })
          )
        }
      } catch (error) {
        console.error('Stats güncellenirken hata:', error)
      }
    }

    fetchStats()
    // Her 5 dakikada bir güncelle
    const interval = setInterval(fetchStats, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])


  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Navigation Menu */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-12">
          <div className="flex items-center justify-between h-16">
            <a href="#home" className="text-gold font-serif text-lg hover:opacity-80 transition-opacity">
              Said Koçu
            </a>
            <div className="flex items-center gap-6">
              <a href="#about" className="text-white/70 hover:text-white text-sm transition-colors">Hakkımda</a>
              <a href="#projects" className="text-white/70 hover:text-white text-sm transition-colors">Projeler</a>
              <a href="#articles" className="text-white/70 hover:text-white text-sm transition-colors">Yazılar</a>
              <a href="#kg" className="text-white/70 hover:text-white text-sm transition-colors">K-G</a>
              <a href="#contact" className="text-white/70 hover:text-white text-sm transition-colors">İletişim</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="mx-auto max-w-4xl px-4 pt-20 pb-12 sm:px-6 sm:pb-16 md:px-12 md:pb-24 lg:pb-32 relative z-10">
        {/* Header Fotoğraf */}
        <div id="home" className="mb-12 sm:mb-16 md:mb-20 flex justify-center scroll-animate pt-0">
          <div className="w-full max-w-2xl image-overlay glow-effect rounded-lg overflow-hidden">
            <Image
              src="/said-kocu-header.jpg"
              alt="Said Koçu"
              width={800}
              height={450}
              className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
          </div>
        </div>
        
        {/* Hakkımda Bölümü */}
        <section id="about" className="mb-16 sm:mb-20 md:mb-24 lg:mb-32 scroll-animate animate-delay-100">
          <h1 className="mb-6 font-serif text-3xl font-normal leading-tight text-gold sm:text-4xl sm:mb-7 md:text-5xl md:mb-8 lg:text-6xl">
            Said Koçu
          </h1>
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <p className="text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
              İzmir'de yaşayan, Mersin Üniversitesi PDR öğrencisi. Psikoloji kuramlarını teknoloji ve yapay zeka ile harmanlayan bir girişimci.
            </p>
          </div>
        </section>

        {/* İstatistikler Bölümü */}
        <section id="istatistikler" className="mb-16 sm:mb-20 md:mb-24 lg:mb-32 scroll-animate animate-delay-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="card-hover p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm glow-effect"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="h-5 w-5 text-white/60" strokeWidth={1.5} />
                    <p className="text-sm text-white/50">{stat.label}</p>
                  </div>
                  <p className="text-2xl font-serif text-white transition-all duration-300">
                    {stat.key === 'discord' || stat.key === 'youtube'
                      ? parseInt(stat.value).toLocaleString('tr-TR')
                      : stat.value}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Projeler Bölümü */}
        <section id="projects" className="mb-16 sm:mb-20 md:mb-24 lg:mb-32 scroll-animate animate-delay-300">
          <h2 className="mb-10 font-serif text-2xl font-normal text-gold sm:text-3xl sm:mb-12 md:text-4xl md:mb-16">
            Projeler
          </h2>
          <div className="space-y-6 sm:space-y-7 md:space-y-8">
            {projects.map((project, index) => {
              const Icon = project.icon
              return (
                <a
                  key={index}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border-b border-white/10 pb-6 card-hover sm:pb-7 md:pb-8"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="mt-0.5 flex-shrink-0 sm:mt-1">
                      <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                        <Icon className="h-4 w-4 text-white/60 group-hover:text-white/80 sm:h-5 sm:w-5 transition-colors" strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="mb-1.5 flex items-baseline gap-2 sm:mb-2">
                        <h3 className="font-serif text-lg font-normal text-white group-hover:text-white/90 sm:text-xl md:text-2xl break-words transition-colors">
                          {project.title}
                        </h3>
                        <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-white/40 group-hover:text-white/60 transition-all group-hover:translate-x-1 group-hover:translate-y-[-1px] sm:h-4 sm:w-4" strokeWidth={1.5} />
                      </div>
                      <p className="mb-1.5 text-sm leading-relaxed text-white/70 group-hover:text-white/80 sm:text-base sm:mb-2 md:text-lg transition-colors">
                        {project.description}
                      </p>
                      {project.note && (
                        <p className="text-xs italic text-white/50 sm:text-sm">
                          {project.note}
                        </p>
                      )}
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </section>

        {/* Kişilik ve Gelişim Envanterleri */}
        <section id="kg" className="mb-16 sm:mb-20 md:mb-24 lg:mb-32 scroll-animate animate-delay-350">
          <h2 className="mb-8 font-serif text-2xl font-normal leading-tight text-gold sm:text-3xl sm:mb-10 md:text-4xl md:mb-12">
            Kişilik ve Gelişim Envanterleri
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sevgilinizle Uyumunuz Testi */}
            <a
              href="/sevgilinizle-uyumunuz-ne-kadar"
              className="group block border border-white/10 rounded-lg p-6 bg-white/5 backdrop-blur-sm card-hover hover:border-white/20 transition-all duration-300"
            >
              <div className="mb-4 flex justify-center">
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                  <Heart className="h-8 w-8 text-gold" />
                </div>
              </div>
              <h3 className="mb-3 font-serif text-lg font-normal text-white text-center group-hover:text-gold transition-colors">
                Sevgilinizle Uyumunuz Ne Kadar?
              </h3>
              <p className="text-sm text-white/70 text-center group-hover:text-white/80 transition-colors">
                Kişilik testi ile ilişkinizin uyum skorunu öğrenin
              </p>
            </a>

            {/* Gelecek Testleri İçin Boş Kartlar */}
            <div className="border border-white/5 rounded-lg p-6 bg-white/2 opacity-50">
              <div className="mb-4 flex justify-center">
                <div className="p-3 rounded-full bg-white/5">
                  <div className="h-8 w-8 text-white/30 flex items-center justify-center">
                    <span className="text-2xl">?</span>
                  </div>
                </div>
              </div>
              <h3 className="mb-3 font-serif text-lg font-normal text-white/50 text-center">
                Yakında
              </h3>
              <p className="text-sm text-white/30 text-center">
                Yeni testler ekleniyor
              </p>
            </div>

            <div className="border border-white/5 rounded-lg p-6 bg-white/2 opacity-50">
              <div className="mb-4 flex justify-center">
                <div className="p-3 rounded-full bg-white/5">
                  <div className="h-8 w-8 text-white/30 flex items-center justify-center">
                    <span className="text-2xl">?</span>
                  </div>
                </div>
              </div>
              <h3 className="mb-3 font-serif text-lg font-normal text-white/50 text-center">
                Yakında
              </h3>
              <p className="text-sm text-white/30 text-center">
                Yeni testler ekleniyor
              </p>
            </div>
          </div>
        </section>

        {/* Fotoğraf */}
        <div className="mb-16 sm:mb-20 md:mb-24 lg:mb-32 flex justify-center scroll-animate animate-delay-400">
          <div className="w-full max-w-lg glow-effect rounded-lg overflow-hidden vignette relative">
            <Image
              src="/said-kocu-new.jpg"
              alt="Said Koçu"
              width={500}
              height={350}
              className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
          </div>
        </div>

        {/* Yazılar Bölümü */}
        <section id="articles" className="scroll-animate">
          <h2 className="mb-10 font-serif text-2xl font-normal text-gold sm:text-3xl sm:mb-12 md:text-4xl md:mb-16">
            Öne Çıkan Yazılar
          </h2>
          <div className="space-y-6 sm:space-y-7 md:space-y-8">
            <a
              href="https://mediumturkiye.com/hayat%C4%B1n-anlam%C4%B1-%C3%B6l%C3%BCm-m%C3%BC-aea8a2306812"
              target="_blank"
              rel="noopener noreferrer"
              className="group block border-b border-white/10 pb-6 card-hover sm:pb-7 md:pb-8 scroll-animate"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="mt-0.5 flex-shrink-0 sm:mt-1">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                    <BookOpen className="h-4 w-4 text-white/60 group-hover:text-white/80 sm:h-5 sm:w-5 transition-colors" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="mb-1.5 flex items-baseline gap-2 sm:mb-2">
                    <h3 className="font-serif text-lg font-normal text-white group-hover:text-white/90 sm:text-xl md:text-2xl break-words transition-colors">
                      Hayatın anlamı ölüm mü?
                    </h3>
                    <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-white/40 group-hover:text-white/60 transition-all group-hover:translate-x-1 group-hover:translate-y-[-1px] sm:h-4 sm:w-4" strokeWidth={1.5} />
                  </div>
                    <p className="mb-1.5 text-sm leading-relaxed text-white/70 group-hover:text-white/80 sm:text-base sm:mb-2 md:text-lg italic transition-colors">
                      "Benlik ölümü" (ego death) denen deneyim de benzer bir şeyi söylüyor: benliğin sınırlarının çözülmesi, insanın daha büyük bir bilinç akışına karışması. Belki ölüm, korkulacak bir yokluk değil; bir dönüşüm, bir bütünlük hâlidir.
                    </p>
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <p className="text-xs text-white/50 mb-2 sm:text-sm">Sizden gelen güzel yorumlar arasından</p>
                    <div className="space-y-2">
                      <p className="text-xs leading-relaxed text-white/60 sm:text-sm italic">
                        "Ölüm hayatın doğal ritmi olsa da kabul etmek güç olabiliyor yaşamın anlamına bir ayna ve bana göre açılan bir kapı. Düşündüren derinliği olan bu güzel yazı için teşekkür ediyorum kaleminize sağlık"
                      </p>
                      <p className="text-xs text-white/40 sm:text-sm">— Aynur Biber</p>
                    </div>
                  </div>
                </div>
              </div>
            </a>

            <a
              href="https://medium.com/turkiyem/ahlak%C4%B1n-%C3%B6l%C3%BCm%C3%BC-hik%C3%A2yelerle-uyutulan-bir-toplumun-%C3%A7%C3%B6k%C3%BC%C5%9F%C3%BC-534898d0a02e"
              target="_blank"
              rel="noopener noreferrer"
              className="group block border-b border-white/10 pb-6 card-hover sm:pb-7 md:pb-8 scroll-animate"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="mt-0.5 flex-shrink-0 sm:mt-1">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                    <BookOpen className="h-4 w-4 text-white/60 group-hover:text-white/80 sm:h-5 sm:w-5 transition-colors" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="mb-1.5 flex items-baseline gap-2 sm:mb-2">
                    <h3 className="font-serif text-lg font-normal text-white group-hover:text-white/90 sm:text-xl md:text-2xl break-words transition-colors">
                      Ahlakın Ölümü: Hikâyelerle Uyutulan Bir Toplumun Çöküşü
                    </h3>
                    <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-white/40 group-hover:text-white/60 transition-all group-hover:translate-x-1 group-hover:translate-y-[-1px] sm:h-4 sm:w-4" strokeWidth={1.5} />
                  </div>
                  <p className="mb-1.5 text-sm leading-relaxed text-white/70 group-hover:text-white/80 sm:text-base sm:mb-2 md:text-lg italic transition-colors">
                    Fakat ahlakın kaynağı, ritüellerde değil; vicdanda ve insan ruhundadır.
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <p className="text-xs text-white/50 mb-2 sm:text-sm">Sizden gelen güzel yorumlar arasından</p>
                    <div className="space-y-2">
                      <p className="text-xs leading-relaxed text-white/60 sm:text-sm italic">
                        "Paylaşmış bulunduğun yazında adeta ülkemizin başlıca sorunu olan etik kurallarını oldukça güzel dile getirmişsin kardeşim kalemine sağlık. Belki, 'AHLAK' ve 'ERDEM' olgularına gereken ihtiyatı gösterdiğimizde ülkemiz tekrar güzelleşir. Yazıyla kal ve fikirlerinle bizi aydınlatmayı ihmal etme…"
                      </p>
                      <p className="text-xs text-white/40 sm:text-sm">— Furkan Keçeli</p>
                    </div>
                  </div>
                </div>
              </div>
            </a>

            <a
              href="https://medium.com/turkiyem/%EF%B8%8F-ba%C5%9Fl%C4%B1k-odan%C4%B1n-i%C5%9F%C4%B1%C4%9F%C4%B1n%C4%B1-kimseye-teslim-etme-058a17bd7a20"
              target="_blank"
              rel="noopener noreferrer"
              className="group block border-b border-white/10 pb-6 card-hover sm:pb-7 md:pb-8 scroll-animate"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="mt-0.5 flex-shrink-0 sm:mt-1">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                    <BookOpen className="h-4 w-4 text-white/60 group-hover:text-white/80 sm:h-5 sm:w-5 transition-colors" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="mb-1.5 flex items-baseline gap-2 sm:mb-2">
                    <h3 className="font-serif text-lg font-normal text-white group-hover:text-white/90 sm:text-xl md:text-2xl break-words transition-colors">
                      Odanın Işığını Kimseye Teslim Etme
                    </h3>
                    <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-white/40 group-hover:text-white/60 transition-all group-hover:translate-x-1 group-hover:translate-y-[-1px] sm:h-4 sm:w-4" strokeWidth={1.5} />
                  </div>
                  <p className="mb-1.5 text-sm leading-relaxed text-white/70 group-hover:text-white/80 sm:text-base sm:mb-2 md:text-lg italic transition-colors">
                    Sonuçta, hayat başkalarının ışıklarıyla aydınlanacak bir yol değildir. İnsanlar renklerinizi değiştirmeye çalışabilir, ışığınızı kısabilir, hatta kıvılcımlarınızı söndürebilir. Ama odanızın ışığı zaten sizin elinizde.
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <p className="text-xs text-white/50 mb-2 sm:text-sm">Sizden gelen güzel yorumlar arasından</p>
                    <div className="space-y-2">
                      <p className="text-xs leading-relaxed text-white/60 sm:text-sm italic">
                        "Sonuçta, hayat başkalarının ışıklarıyla aydınlanacak bir yol değildir. İnsanlar renklerinizi değiştirmeye çalışabilir, ışığınızı kısabilir, hatta kıvılcımlarınızı söndürebilir. Ama odanızın ışığı zaten sizin elinizde. Duvarima asacagin o derece🤌🏻🙏🏻🥹"
                      </p>
                      <p className="text-xs text-white/40 sm:text-sm">— İnci Çilsal</p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* İletişim Bölümü */}
        <section id="iletisim" className="mt-24 sm:mt-32 pt-12 border-t border-white/10 scroll-animate">
          <h2 className="mb-10 font-serif text-2xl font-normal text-gold sm:text-3xl sm:mb-12 md:text-4xl md:mb-16">
            İletişim
          </h2>
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 sm:mt-20 pt-8 border-t border-white/10 scroll-animate">
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs text-white/40 text-center">
              © {new Date().getFullYear()} Said Koçu. Tüm hakları saklıdır.
            </p>
          </div>
        </footer>
      </div>
    </main>
  )
}
