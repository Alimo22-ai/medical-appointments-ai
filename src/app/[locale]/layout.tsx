import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'

const locales = ['en', 'ar']

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound()

  let messages
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  const isRTL = locale === 'ar'

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={isRTL ? 'font-arabic' : 'font-english'}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}