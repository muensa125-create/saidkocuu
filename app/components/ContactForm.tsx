'use client'

import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Mesajınız başarıyla gönderildi!',
        })
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Bir hata oluştu. Lütfen tekrar deneyin.',
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Bir hata oluştu. Lütfen tekrar deneyin.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-xs text-white/70 mb-1.5 font-medium"
        >
          Adınız
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white/90 placeholder-white/40 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-colors"
          placeholder="Adınız Soyadınız"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-xs text-white/70 mb-1.5 font-medium"
        >
          E-posta
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white/90 placeholder-white/40 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-colors"
          placeholder="ornek@email.com"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs text-white/70 mb-1.5 font-medium"
        >
          Mesajınız
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white/90 placeholder-white/40 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-colors resize-none"
          placeholder="Mesajınızı buraya yazın..."
        />
      </div>

      {submitStatus.type && (
        <div
          className={`p-3 text-sm rounded-lg ${
            submitStatus.type === 'success'
              ? 'bg-green-500/10 border border-green-500/20 text-green-400'
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white/90 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span>Gönderiliyor...</span>
          </>
        ) : (
          <>
            <Send className="h-3.5 w-3.5" />
            <span>Gönder</span>
          </>
        )}
      </button>
    </form>
  )
}
