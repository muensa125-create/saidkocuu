'use client'

import { ArrowLeft, Heart, Users, Sparkles, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import CustomCursor from '../components/CustomCursor'

const questions = [
  // E/I (Extraversion/Introversion)
  "Kalabalık ortamlarda enerjimin arttığını hissederim.",
  "Yeni insanlarla tanışmaktan keyif alırım.",
  "Sosyal etkinliklerden sonra kendimi yorgun hissederim.",
  "Derin sohbetlerden çok, genel sohbetleri tercih ederim.",
  "Düşüncelerimi yüksek sesle düşünmeyi severim.",
  "Yalnız zaman geçirmekten çok, başkalarıyla vakit geçirmeyi tercih ederim.",
  "Parti veya etkinliklerde merkezde olmaktan hoşlanırım.",
  "İlk konuşmayı başlatan taraf genelde ben olurum.",
  "Grup çalışmalarında daha verimli çalışırım.",
  "Yeni yerlere gitmek beni heyecanlandırır.",
  
  // S/N (Sensing/Intuition)
  "Somut detaylara odaklanırım, soyut fikirlerden çok.",
  "Gelecekteki olasılıklar hayal etmekten hoşlanırım.",
  "Pratik ve gerçekçi çözümleri tercih ederim.",
  "Metafor ve sembollerle düşünmekten keyif alırım.",
  "Deneyimlerime dayanarak öğrenirim.",
  "Büyük resmi görmek, detaylara takılı kalmak benim için önemlidir.",
  "Geleneksel yöntemler yerine yenilikçi yaklaşımları tercih ederim.",
  "Kuramsal konuları tartışmakten hoşlanırım.",
  "Şimdiki zamanın somut gerçeklerine odaklanırım.",
  "İçgüdülerime güvenerek karar veririm.",
  
  // T/F (Thinking/Feeling)
  "Karar verirken mantığımı duygularıma tercih ederim.",
  "Başkalarının duygularını önemsemek benim için önceliktir.",
  "Adalet ve nesnellik benim için önemlidir.",
  "Empati kurmak benim doğal yeteneğimdir.",
  "Çatışma durumlarında mantıklı çözümler ararım.",
  "Başkalarını motive etmek beni mutlu eder.",
  "Eleştiriyi kişisel algılamam.",
  "İlişkilerde duygusal bağ benim için önemlidir.",
  "Analitik düşünmeyi severim.",
  "Başkalarının ihtiyaçlarını kendi ihtiyaçlarımdan önce koyabilirim.",
  
  // J/P (Judging/Perceiving)
  "Planlı ve organize yaşamayı tercih ederim.",
  "Anlık fırsatlara açık, esnek olmayı severim.",
  "Son tarihler (deadline) beni motive eder.",
  "Plansızlık beni rahatsız eder.",
  "Birden fazla projeyi aynı anda yürütebilirim.",
  "Karar vermeden önce tüm seçenekleri değerlendirmek isterim.",
  "Düzen ve yapı benim için önemlidir.",
  "Spontane değişikliklere açığım.",
  "İşleri tamamlamadan önce yeni başlangıçlar yapmam.",
  "Esneklik benim için güçlü bir özelliktir."
]

const partnerQuestions = [
  // E/I (Extraversion/Introversion)
  "Kalabalık ortamlarda enerjisinin arttığını hisseder.",
  "Yeni insanlarla tanışmaktan keyif alır.",
  "Sosyal etkinliklerden sonra kendini yorgun hisseder.",
  "Derin sohbetlerden çok, genel sohbetleri tercih eder.",
  "Düşüncelerini yüksek sesle düşünmeyi sever.",
  "Yalnız zaman geçirmekten çok, başkalarıyla vakit geçirmeyi tercih eder.",
  "Parti veya etkinliklerde merkezde olmaktan hoşlanır.",
  "İlk konuşmayı başlatan taraf genelde odur.",
  "Grup çalışmalarında daha verimli çalışır.",
  "Yeni yerlere gitmek onu heyecanlandırır.",
  
  // S/N (Sensing/Intuition)
  "Somut detaylara odaklanır, soyut fikirlerden çok.",
  "Gelecekteki olasılıkları hayal etmekten hoşlanır.",
  "Pratik ve gerçekçi çözümleri tercih eder.",
  "Metafor ve sembollerle düşünmekten keyif alır.",
  "Deneyimlerine dayanarak öğrenir.",
  "Büyük resmi görmek, detaylara takılı kalmamak onun için önemlidir.",
  "Geleneksel yöntemler yerine yenilikçi yaklaşımları tercih eder.",
  "Kuramsal konuları tartışmaktan hoşlanır.",
  "Şimdiki zamanın somut gerçeklerine odaklanır.",
  "İçgüdülerine güvenerek karar verir.",
  
  // T/F (Thinking/Feeling)
  "Karar verirken mantığını duygularına tercih eder.",
  "Başkalarının duygularını önemsemek onun için önceliktir.",
  "Adalet ve nesnellik onun için önemlidir.",
  "Empati kurmak onun doğal yeteneğidir.",
  "Çatışma durumlarında mantıklı çözümler arar.",
  "Başkalarını motive etmek onu mutlu eder.",
  "Eleştiriyi kişisel algılamaz.",
  "İlişkilerde duygusal bağ onun için önemlidir.",
  "Analitik düşünmeyi sever.",
  "Başkalarının ihtiyaçlarını kendi ihtiyaçlarından önce koyabilir.",
  
  // J/P (Judging/Perceiving)
  "Planlı ve organize yaşamayı tercih eder.",
  "Anlık fırsatlara açık, esnek olmayı sever.",
  "Son tarihler (deadline) onu motive eder.",
  "Plansızlık onu rahatsız eder.",
  "Birden fazla projeyi aynı anda yürütebilir.",
  "Karar vermeden önce tüm seçenekleri değerlendirmek ister.",
  "Düzen ve yapı onun için önemlidir.",
  "Spontane değişikliklere açıktır.",
  "İşleri tamamlamadan önce yeni başlangıçlar yapmaz.",
  "Esneklik onun için güçlü bir özelliktir."
]

const reversedQuestions = [3, 4, 13, 19, 27, 34, 39] // Ters puanlanacak soruların indeksleri

const personalityTypes = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
]

// 16x16 Uyum matrisi
const compatibilityMatrix: Record<string, Record<string, { score: number, category: string }>> = {
  'INFJ': { 'ENTP': { score: 94, category: 'İdeal Eşleşme' }, 'ENFP': { score: 82, category: 'Yüksek Uyum' }, 'INTJ': { score: 80, category: 'Yüksek Uyum' }, 'ESTP': { score: 30, category: 'Zorlayıcı' } },
  'ENFP': { 'INTJ': { score: 94, category: 'İdeal Eşleşme' }, 'INFJ': { score: 82, category: 'Yüksek Uyum' }, 'ENTP': { score: 78, category: 'Yüksek Uyum' }, 'ISTJ': { score: 58, category: 'Orta Uyum' } },
  'ISFJ': { 'ESFP': { score: 94, category: 'İdeal Eşleşme' }, 'ESFJ': { score: 82, category: 'Yüksek Uyum' }, 'ISTJ': { score: 80, category: 'Yüksek Uyum' }, 'ENTP': { score: 58, category: 'Orta Uyum' } },
  'INTJ': { 'ENFP': { score: 94, category: 'İdeal Eşleşme' }, 'INFJ': { score: 80, category: 'Yüksek Uyum' }, 'ENTJ': { score: 82, category: 'Yüksek Uyum' }, 'ESFJ': { score: 58, category: 'Orta Uyum' } },
  'ISTP': { 'ENFJ': { score: 94, category: 'İdeal Eşleşme' }, 'ESTP': { score: 82, category: 'Yüksek Uyum' }, 'INTP': { score: 80, category: 'Yüksek Uyum' }, 'ESFJ': { score: 58, category: 'Orta Uyum' } },
  'ISFP': { 'ENTJ': { score: 94, category: 'İdeal Eşleşme' }, 'ESFP': { score: 82, category: 'Yüksek Uyum' }, 'INFP': { score: 80, category: 'Yüksek Uyum' }, 'ESTJ': { score: 30, category: 'Zorlayıcı' } },
  'INFP': { 'ENTJ': { score: 94, category: 'İdeal Eşleşme' }, 'ISFP': { score: 80, category: 'Yüksek Uyum' }, 'ENFP': { score: 78, category: 'Yüksek Uyum' }, 'ESTJ': { score: 30, category: 'Zorlayıcı' } },
  'INTP': { 'ESFJ': { score: 94, category: 'İdeal Eşleşme' }, 'ENTJ': { score: 82, category: 'Yüksek Uyum' }, 'ISTP': { score: 80, category: 'Yüksek Uyum' }, 'ISFJ': { score: 58, category: 'Orta Uyum' } },
  'ESTP': { 'ISFJ': { score: 94, category: 'İdeal Eşleşme' }, 'ISTP': { score: 82, category: 'Yüksek Uyum' }, 'ESFP': { score: 80, category: 'Yüksek Uyum' }, 'INFJ': { score: 30, category: 'Zorlayıcı' } },
  'ESFP': { 'ISTJ': { score: 94, category: 'İdeal Eşleşme' }, 'ISFP': { score: 82, category: 'Yüksek Uyum' }, 'ESTP': { score: 80, category: 'Yüksek Uyum' }, 'INTJ': { score: 30, category: 'Zorlayıcı' } },
  'ENTJ': { 'ISFP': { score: 94, category: 'İdeal Eşleşme' }, 'INTJ': { score: 82, category: 'Yüksek Uyum' }, 'ENTP': { score: 80, category: 'Yüksek Uyum' }, 'ESFP': { score: 30, category: 'Zorlayıcı' } },
  'ENTP': { 'INFJ': { score: 94, category: 'İdeal Eşleşme' }, 'ENFP': { score: 78, category: 'Yüksek Uyum' }, 'ENTJ': { score: 80, category: 'Yüksek Uyum' }, 'ISFJ': { score: 58, category: 'Orta Uyum' } },
  'ESTJ': { 'INFP': { score: 94, category: 'İdeal Eşleşme' }, 'ESFJ': { score: 82, category: 'Yüksek Uyum' }, 'ESTP': { score: 80, category: 'Yüksek Uyum' }, 'ISFP': { score: 30, category: 'Zorlayıcı' } },
  'ESFJ': { 'INTP': { score: 94, category: 'İdeal Eşleşme' }, 'ESTJ': { score: 82, category: 'Yüksek Uyum' }, 'ESFP': { score: 80, category: 'Yüksek Uyum' }, 'INTJ': { score: 58, category: 'Orta Uyum' } },
  'ENFJ': { 'ISTP': { score: 94, category: 'İdeal Eşleşme' }, 'INFJ': { score: 82, category: 'Yüksek Uyum' }, 'ENFP': { score: 78, category: 'Yüksek Uyum' }, 'INTP': { score: 58, category: 'Orta Uyum' } }
}

export default function SevgiliUyumuTesti() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'self' | 'partner' | 'result'>('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selfAnswers, setSelfAnswers] = useState<number[]>([])
  const [partnerAnswers, setPartnerAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)

  const calculatePersonalityType = (answers: number[]) => {
    let eScore = 0, iScore = 0, sScore = 0, nScore = 0, tScore = 0, fScore = 0, jScore = 0, pScore = 0
    
    answers.forEach((answer, index) => {
      const score = reversedQuestions.includes(index) ? (6 - answer) : answer
      
      if (index < 10) {
        score > 3 ? eScore += score : iScore += score
      } else if (index < 20) {
        score > 3 ? nScore += score : sScore += score
      } else if (index < 30) {
        score > 3 ? tScore += score : fScore += score
      } else {
        score > 3 ? jScore += score : pScore += score
      }
    })
    
    return (
      (eScore > iScore ? 'E' : 'I') +
      (nScore > sScore ? 'N' : 'S') +
      (tScore > fScore ? 'T' : 'F') +
      (jScore > pScore ? 'J' : 'P')
    )
  }

  const getCompatibilityScore = (type1: string, type2: string) => {
    if (compatibilityMatrix[type1] && compatibilityMatrix[type1][type2]) {
      return compatibilityMatrix[type1][type2]
    }
    
    // Varsayılan skorlar
    const sameType = type1 === type2
    const sameTemperament = 
      (type1[0] === type2[0]) && // Aynı E/I
      (type1[3] === type2[3])   // Aynı J/P
    
    if (sameType) return { score: 65, category: 'Orta Uyum' }
    if (sameTemperament) return { score: 75, category: 'Yüksek Uyum' }
    return { score: 45, category: 'Orta Uyum' }
  }

  const handleAnswer = (answer: number) => {
    if (currentStep === 'self') {
      const newAnswers = [...selfAnswers, answer]
      setSelfAnswers(newAnswers)
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setCurrentStep('partner')
        setCurrentQuestion(0)
      }
    } else if (currentStep === 'partner') {
      const newAnswers = [...partnerAnswers, answer]
      setPartnerAnswers(newAnswers)
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setShowResult(true)
        setCurrentStep('result')
      }
    }
  }

  const resetTest = () => {
    setCurrentStep('intro')
    setCurrentQuestion(0)
    setSelfAnswers([])
    setPartnerAnswers([])
    setShowResult(false)
  }

  const startTest = () => {
    setCurrentStep('self')
    setCurrentQuestion(0)
    setSelfAnswers([])
    setPartnerAnswers([])
  }

  const selfType = calculatePersonalityType(selfAnswers)
  const partnerType = calculatePersonalityType(partnerAnswers)
  const compatibility = getCompatibilityScore(selfType, partnerType)

  return (
    <>
      <CustomCursor />
      <main className="min-h-screen bg-black relative overflow-hidden" style={{ cursor: 'none' }}>
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-20 pb-12 sm:px-6 sm:pb-16 md:px-12 md:pb-24 lg:pb-32 relative z-10">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Ana Sayfa</span>
        </Link>

        {/* Intro */}
        {currentStep === 'intro' && (
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <div className="p-4 rounded-full bg-white/5 glow-effect">
                <Heart className="h-8 w-8 text-gold" />
              </div>
            </div>
            <h1 className="mb-6 font-serif text-4xl font-normal leading-tight text-gold sm:text-5xl md:text-6xl">
              Sevgilinizle Uyumunuz Ne Kadar?
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-white/80 max-w-2xl mx-auto">
              Kişilik testi ile sevgilinizle olan uyumunuzu 100 üzerinden ölçün. 
              40 soruluk bu test, ilişkinizin potansiyelini ortaya çıkaracak.
            </p>
            
            <div className="mb-12 p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
              <h3 className="mb-4 font-serif text-xl font-normal text-gold">Test Nasıl İşler?</h3>
              <div className="space-y-3 text-left max-w-md mx-auto">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold text-black flex items-center justify-center font-bold text-sm">1</div>
                  <p className="text-white/70 text-sm">Önce kendi kişilik tipinizi belirleyeceksiniz</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold text-black flex items-center justify-center font-bold text-sm">2</div>
                  <p className="text-white/70 text-sm">Ardından sevgilinizin kişilik tipini tahmin edeceksiniz</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold text-black flex items-center justify-center font-bold text-sm">3</div>
                  <p className="text-white/70 text-sm">Son olarak uyum skorunuzu ve analizinizi göreceksiniz</p>
                </div>
              </div>
            </div>

            <button
              onClick={startTest}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-lg"
            >
              <Sparkles className="h-5 w-5" />
              Teste Başla
            </button>

            <p className="mt-6 text-xs text-white/50">
              Bu test kişisel gelişim ve eğlence amaçlıdır, psikolojik tanı değildir.
            </p>
          </div>
        )}

        {/* Questions */}
        {(currentStep === 'self' || currentStep === 'partner') && (
          <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-white/60 mb-2">
                <span>
                  {currentStep === 'self' ? 'Kendi Kişiliğiniz' : 'Sevgilinizin Kişiliği'} - Soru {currentQuestion + 1}
                </span>
                <span>{questions.length}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-gold h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="p-8 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
              <div className="mb-6 flex items-center gap-3">
                <Users className="h-5 w-5 text-gold" />
                <h2 className="font-serif text-xl font-normal text-white">
                  {(currentStep === 'partner' ? partnerQuestions : questions)[currentQuestion]}
                </h2>
              </div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((score) => (
                  <button
                    key={score}
                    onClick={() => handleAnswer(score)}
                    className="w-full text-left p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-white/80 hover:text-white group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full border border-white/30 group-hover:border-gold transition-colors"></div>
                      <span>
                        {score === 1 && 'Kesinlikle uymuyor'}
                        {score === 2 && 'Uymuyor'}
                        {score === 3 && 'Kararsızım'}
                        {score === 4 && 'Uyuyor'}
                        {score === 5 && 'Kesinlikle uyuyor'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {showResult && (
          <div className="max-w-3xl mx-auto">
            <div className="p-8 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="mb-8 text-center">
                <CheckCircle className="h-16 w-16 text-gold mx-auto mb-4" />
                <h2 className="mb-4 font-serif text-3xl font-normal text-gold">
                  Uyum Skorunuz: {compatibility.score}%
                </h2>
                <div className="mb-6 inline-block px-4 py-2 rounded-full bg-gold/20 text-gold text-sm font-medium">
                  {compatibility.category}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-lg border border-white/5 bg-white/5">
                  <h3 className="mb-3 font-serif text-xl font-normal text-gold">Sizin Kişilik Tipiniz</h3>
                  <div className="text-2xl font-serif text-white mb-2">{selfType}</div>
                  <p className="text-white/70 text-sm">
                    {selfType[0] === 'E' ? 'Dışadönük' : 'İçedönük'} • 
                    {selfType[1] === 'N' ? 'Sezgisel' : 'Duyusal'} • 
                    {selfType[2] === 'T' ? 'Mantıksal' : 'Duygusal'} • 
                    {selfType[3] === 'J' ? 'Planlı' : 'Esnek'}
                  </p>
                </div>
                <div className="p-6 rounded-lg border border-white/5 bg-white/5">
                  <h3 className="mb-3 font-serif text-xl font-normal text-gold">Sevgilinizin Kişilik Tipi</h3>
                  <div className="text-2xl font-serif text-white mb-2">{partnerType}</div>
                  <p className="text-white/70 text-sm">
                    {partnerType[0] === 'E' ? 'Dışadönük' : 'İçedönük'} • 
                    {partnerType[1] === 'N' ? 'Sezgisel' : 'Duyusal'} • 
                    {partnerType[2] === 'T' ? 'Mantıksal' : 'Duygusal'} • 
                    {partnerType[3] === 'J' ? 'Planlı' : 'Esnek'}
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-lg border border-white/5 bg-white/5">
                <h3 className="mb-3 font-serif text-xl font-normal text-gold">Uyum Analizi</h3>
                <div className="space-y-4">
                  {compatibility.category === 'İdeal Eşleşme' && (
                    <p className="text-white/80 leading-relaxed">
                      <strong>Mükemmel uyum!</strong> Zıtların uyumu prensibiyle birbirinizi tamamlıyorsunuz. 
                      Birinizin zayıf yönü, diğerinizin güçlü yönü. Bu ilişki potansiyeli çok yüksek.
                    </p>
                  )}
                  {compatibility.category === 'Yüksek Uyum' && (
                    <p className="text-white/80 leading-relaxed">
                      <strong>Harika uyum!</strong> Benzer değerlere ve iletişim tarzına sahipsiniz. 
                      Birbirinizi anlıyor ve destekliyorsunuz. İlişkiniz çok dengeli görünüyor.
                    </p>
                  )}
                  {compatibility.category === 'Orta Uyum' && (
                    <p className="text-white/80 leading-relaxed">
                      <strong>İyi potansiyel!</strong> Farklılıklarınız var ama bu zenginleşme olabilir. 
                      Anlayış ve iletişimle bu ilişki çok daha da güçlenebilir.
                    </p>
                  )}
                  {compatibility.category === 'Zorlayıcı' && (
                    <p className="text-white/80 leading-relaxed">
                      <strong>Çaba gerektiren uyum!</strong> Farklı dünyalardan geliyorsunuz ama 
                      bu ilgi çekici olabilir. Sabır ve anlayışla harika bir ilişki kurabilirsiniz.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={resetTest}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors justify-center"
                >
                  <Sparkles className="h-4 w-4" />
                  Testi Tekrarla
                </button>
                <Link 
                  href="/manifesto"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 hover:bg-white/10 text-white transition-colors justify-center"
                >
                  <Heart className="h-4 w-4" />
                  Manifesto'yu Oku
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-white/10">
          <div className="flex flex-col items-center gap-4">
            <Link 
              href="/" 
              className="text-white/60 hover:text-white transition-colors text-sm"
            >
              Ana Sayfaya Dön
            </Link>
            <p className="text-xs text-white/40 text-center">
              © {new Date().getFullYear()} Said Koçu. Tüm hakları saklıdır.
            </p>
          </div>
        </footer>
      </div>
    </main>
    </>
  )
}
