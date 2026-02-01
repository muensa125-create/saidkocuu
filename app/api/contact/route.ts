import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Resend edge runtime'da çalışmıyor, nodejs kullanıyoruz
export const runtime = 'nodejs'

const resend = new Resend(process.env.RESEND_API_KEY)

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

    // Resend API key kontrolü
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set')
      return NextResponse.json(
        { error: 'Email servisi yapılandırılmamış. Lütfen daha sonra tekrar deneyin.' },
        { status: 500 }
      )
    }

    // Email gönder
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'muensa125@gmail.com',
      replyTo: email,
      subject: `İletişim Formu: ${name} - ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #D4AF37;">Yeni İletişim Formu Mesajı</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Gönderen:</strong> ${name}</p>
            <p><strong>E-posta:</strong> ${email}</p>
            <p><strong>Mesaj:</strong></p>
            <p style="white-space: pre-wrap; background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Bu mesaj saidkocu.com web sitesindeki iletişim formundan gönderilmiştir.
          </p>
        </div>
      `,
      text: `
Yeni İletişim Formu Mesajı

Gönderen: ${name}
E-posta: ${email}

Mesaj:
${message}

---
Bu mesaj saidkocu.com web sitesindeki iletişim formundan gönderilmiştir.
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      // Resend hatasını daha detaylı logla
      if (error.message) {
        console.error('Resend error message:', error.message)
      }
      return NextResponse.json(
        { 
          error: 'Email gönderilirken bir hata oluştu. Lütfen tekrar deneyin.',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        },
        { status: 500 }
      )
    }

    if (!data || !data.id) {
      console.error('Resend returned no data or email ID')
      return NextResponse.json(
        { error: 'Email gönderilirken bir hata oluştu. Lütfen tekrar deneyin.' },
        { status: 500 }
      )
    }

    console.log('Email sent successfully:', data.id)

    return NextResponse.json(
      { 
        success: true,
        message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'
    return NextResponse.json(
      { 
        error: 'Bir hata oluştu. Lütfen tekrar deneyin.',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    )
  }
}
