'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Mail, Lock, Chrome } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function SignInPage({ params: { locale } }: { params: { locale: string } }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const isArabic = locale === 'ar'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        toast({
          title: isArabic ? 'خطأ في تسجيل الدخول' : 'Sign In Error',
          description: isArabic 
            ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' 
            : 'Invalid email or password',
          variant: 'destructive',
        })
      } else {
        toast({
          title: isArabic ? 'تم تسجيل الدخول بنجاح' : 'Sign In Successful',
          description: isArabic ? 'مرحباً بك في MedCare' : 'Welcome to MedCare',
          variant: 'success',
        })
        router.push(`/${locale}/dashboard`)
      }
    } catch (error) {
      toast({
        title: isArabic ? 'خطأ' : 'Error',
        description: isArabic ? 'حدث خطأ غير متوقع' : 'An unexpected error occurred',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn('google', { callbackUrl: `/${locale}/dashboard` })
    } catch (error) {
      toast({
        title: isArabic ? 'خطأ' : 'Error',
        description: isArabic ? 'فشل تسجيل الدخول باستخدام Google' : 'Google sign in failed',
        variant: 'destructive',
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 via-white to-health-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 medical-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">MedCare</h1>
          <p className="text-gray-600 mt-2">
            {isArabic ? 'تسجيل الدخول إلى حسابك' : 'Sign in to your account'}
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-center">
              {isArabic ? 'تسجيل الدخول' : 'Sign In'}
            </CardTitle>
            <CardDescription className="text-center">
              {isArabic 
                ? 'أدخل بياناتك للوصول إلى حسابك' 
                : 'Enter your credentials to access your account'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google Sign In */}
            <Button 
              type="button"
              variant="outline" 
              className="w-full"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <Chrome className="w-4 h-4 mr-2" />
              {isArabic ? 'تسجيل الدخول باستخدام Google' : 'Sign in with Google'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {isArabic ? 'أو' : 'Or'}
                </span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {isArabic ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder={isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {isArabic ? 'كلمة المرور' : 'Password'}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="password"
                    placeholder={isArabic ? 'أدخل كلمة المرور' : 'Enter your password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link 
                  href={`/${locale}/auth/forgot-password`}
                  className="text-sm text-primary hover:underline"
                >
                  {isArabic ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                variant="medical"
                disabled={isLoading}
              >
                {isLoading ? (
                  isArabic ? 'جاري تسجيل الدخول...' : 'Signing in...'
                ) : (
                  isArabic ? 'تسجيل الدخول' : 'Sign In'
                )}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                {isArabic ? 'ليس لديك حساب؟' : "Don't have an account?"}{' '}
                <Link 
                  href={`/${locale}/auth/signup`}
                  className="text-primary hover:underline font-medium"
                >
                  {isArabic ? 'إنشاء حساب' : 'Sign up'}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Language Toggle */}
        <div className="flex justify-center mt-6 space-x-2">
          <Link href="/en/auth/signin">
            <Button variant="ghost" size="sm" className={locale === 'en' ? 'bg-primary/10' : ''}>
              English
            </Button>
          </Link>
          <Link href="/ar/auth/signin">
            <Button variant="ghost" size="sm" className={locale === 'ar' ? 'bg-primary/10' : ''}>
              العربية
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}