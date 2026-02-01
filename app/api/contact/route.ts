import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Basit validasyon
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tüm alanlar zorunludur' },
        { status: 400 }
      )
    }

    // Email format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir email adresi giriniz' },
        { status: 400 }
      )
    }

    // Burada email gönderme servisi entegre edilebilir
    // Şimdilik sadece başarılı yanıt döndürüyoruz
    // Örnek: Resend, SendGrid, Nodemailer gibi servisler kullanılabilir

    return NextResponse.json(
      { 
        success: true,
        message: 'Mesajınız alındı. En kısa sürede size dönüş yapacağız.' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    )
  }
}
