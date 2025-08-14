import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { authOptions } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Calendar,
  TestTube,
  FileText,
  MapPin,
  Clock,
  Shield,
  Smartphone,
  Globe
} from 'lucide-react'
import Link from 'next/link'

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions)
  
  if (session) {
    redirect(`/${locale}/dashboard`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 via-white to-health-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 medical-gradient rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">MedCare</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href={`/${locale}/auth/signin`}>
              <Button variant="outline">
                {locale === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
              </Button>
            </Link>
            <Link href={`/${locale}/auth/signup`}>
              <Button variant="medical">
                {locale === 'ar' ? 'إنشاء حساب' : 'Get Started'}
              </Button>
            </Link>
            
            {/* Language Toggle */}
            <div className="flex items-center space-x-1">
              <Link href={`/en`}>
                <Button variant="ghost" size="sm" className={locale === 'en' ? 'bg-primary/10' : ''}>
                  EN
                </Button>
              </Link>
              <Link href={`/ar`}>
                <Button variant="ghost" size="sm" className={locale === 'ar' ? 'bg-primary/10' : ''}>
                  العربية
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {locale === 'ar' ? (
              <>
                منصة ذكية لإدارة <br />
                <span className="medical-gradient bg-clip-text text-transparent">الرعاية الصحية</span>
              </>
            ) : (
              <>
                Smart Healthcare <br />
                <span className="medical-gradient bg-clip-text text-transparent">Management Platform</span>
              </>
            )}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {locale === 'ar' 
              ? 'منصة شاملة لإدارة المواعيد الطبية والتحاليل المخبرية والتاريخ الطبي مع تذكيرات ذكية وتوصيات مدعومة بالذكاء الاصطناعي'
              : 'Comprehensive platform for managing medical appointments, lab tests, and medical history with smart reminders and AI-powered recommendations'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/auth/signup`}>
              <Button size="lg" variant="medical" className="w-full sm:w-auto">
                {locale === 'ar' ? 'ابدأ مجاناً' : 'Start Free Trial'}
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              {locale === 'ar' ? 'شاهد العرض التوضيحي' : 'Watch Demo'}
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Calendar className="w-12 h-12 text-medical-500 mx-auto mb-4" />
              <CardTitle className="text-lg">
                {locale === 'ar' ? 'إدارة المواعيد' : 'Appointment Management'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {locale === 'ar' 
                  ? 'حجز وإدارة المواعيد الطبية بسهولة مع تذكيرات تلقائية'
                  : 'Easy booking and management of medical appointments with automated reminders'
                }
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <TestTube className="w-12 h-12 text-health-500 mx-auto mb-4" />
              <CardTitle className="text-lg">
                {locale === 'ar' ? 'التحاليل المخبرية' : 'Lab Tests'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {locale === 'ar' 
                  ? 'جدولة التحاليل وتتبع النتائج مع إشعارات فورية'
                  : 'Schedule tests and track results with instant notifications'
                }
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileText className="w-12 h-12 text-medical-500 mx-auto mb-4" />
              <CardTitle className="text-lg">
                {locale === 'ar' ? 'التاريخ الطبي' : 'Medical History'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {locale === 'ar' 
                  ? 'تنظيم وتتبع السجلات الطبية في مكان واحد آمن'
                  : 'Organize and track medical records in one secure place'
                }
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <MapPin className="w-12 h-12 text-health-500 mx-auto mb-4" />
              <CardTitle className="text-lg">
                {locale === 'ar' ? 'المراكز الطبية' : 'Medical Centers'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {locale === 'ar' 
                  ? 'العثور على أقرب المراكز الطبية مع خرائط جوجل'
                  : 'Find nearby medical centers with Google Maps integration'
                }
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Key Benefits */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {locale === 'ar' ? 'لماذا تختار MedCare؟' : 'Why Choose MedCare?'}
            </h2>
            <p className="text-lg text-gray-600">
              {locale === 'ar' 
                ? 'منصة شاملة مصممة خصيصاً لمنطقة الشرق الأوسط وشمال أفريقيا'
                : 'A comprehensive platform designed specifically for the MENA region'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Clock className="w-10 h-10 text-medical-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">
                {locale === 'ar' ? 'تذكيرات ذكية' : 'Smart Reminders'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'ar' 
                  ? 'إشعارات تلقائية للمواعيد والأدوية'
                  : 'Automated notifications for appointments and medications'
                }
              </p>
            </div>

            <div className="text-center">
              <Shield className="w-10 h-10 text-health-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">
                {locale === 'ar' ? 'أمان عالي' : 'Secure & Private'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'ar' 
                  ? 'حماية متقدمة لبياناتك الطبية'
                  : 'Advanced protection for your medical data'
                }
              </p>
            </div>

            <div className="text-center">
              <Smartphone className="w-10 h-10 text-medical-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">
                {locale === 'ar' ? 'متوافق مع الجوال' : 'Mobile Friendly'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'ar' 
                  ? 'تجربة مثالية على جميع الأجهزة'
                  : 'Perfect experience across all devices'
                }
              </p>
            </div>

            <div className="text-center">
              <Globe className="w-10 h-10 text-health-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">
                {locale === 'ar' ? 'دعم متعدد اللغات' : 'Multi-Language'}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === 'ar' 
                  ? 'يدعم العربية والإنجليزية بالكامل'
                  : 'Full support for Arabic and English'
                }
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="medical-gradient rounded-2xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {locale === 'ar' ? 'ابدأ رحلتك الصحية اليوم' : 'Start Your Health Journey Today'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {locale === 'ar' 
                ? 'انضم إلى آلاف المرضى والأطباء الذين يثقون في MedCare'
                : 'Join thousands of patients and doctors who trust MedCare'
              }
            </p>
            <Link href={`/${locale}/auth/signup`}>
              <Button size="lg" variant="secondary">
                {locale === 'ar' ? 'إنشاء حساب مجاني' : 'Create Free Account'}
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t">
        <div className="text-center text-gray-600">
          <p>&copy; 2024 MedCare. {locale === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
        </div>
      </footer>
    </div>
  )
}