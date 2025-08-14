import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  TestTube, 
  FileText, 
  Bell, 
  Clock,
  MapPin,
  User,
  Activity,
  TrendingUp,
  Plus
} from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage({ params: { locale } }: { params: { locale: string } }) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect(`/${locale}/auth/signin`)
  }

  const isArabic = locale === 'ar'
  const userName = session.user.name || (isArabic ? 'المستخدم' : 'User')

  // Mock data - in real app, this would come from database
  const stats = {
    totalAppointments: 12,
    completedTests: 8,
    activePrescriptions: 3,
    medicalRecords: 25
  }

  const upcomingAppointments = [
    {
      id: 1,
      doctor: isArabic ? 'د. أحمد محمد' : 'Dr. Ahmed Mohamed',
      specialty: isArabic ? 'طب القلب' : 'Cardiology',
      date: '2024-01-15',
      time: '10:00 AM',
      center: isArabic ? 'مركز القلب الطبي' : 'Heart Medical Center'
    },
    {
      id: 2,
      doctor: isArabic ? 'د. فاطمة علي' : 'Dr. Fatima Ali',
      specialty: isArabic ? 'طب الأطفال' : 'Pediatrics',
      date: '2024-01-18',
      time: '2:30 PM',
      center: isArabic ? 'مستشفى الأطفال' : 'Children Hospital'
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'lab_result',
      title: isArabic ? 'نتائج تحليل الدم متاحة' : 'Blood test results available',
      date: '2024-01-10',
      status: 'completed'
    },
    {
      id: 2,
      type: 'appointment',
      title: isArabic ? 'موعد مع د. سارة أحمد' : 'Appointment with Dr. Sara Ahmed',
      date: '2024-01-08',
      status: 'completed'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 medical-gradient rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {isArabic ? `مرحباً، ${userName}` : `Welcome, ${userName}`}
                </h1>
                <p className="text-gray-600">
                  {isArabic ? 'إليك ملخص حالتك الصحية اليوم' : "Here's your health summary today"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <User className="w-4 h-4" />
              </Button>
              
              {/* Language Toggle */}
              <div className="flex items-center space-x-1">
                <Link href="/en/dashboard">
                  <Button variant="ghost" size="sm" className={locale === 'en' ? 'bg-primary/10' : ''}>
                    EN
                  </Button>
                </Link>
                <Link href="/ar/dashboard">
                  <Button variant="ghost" size="sm" className={locale === 'ar' ? 'bg-primary/10' : ''}>
                    العربية
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isArabic ? 'إجمالي المواعيد' : 'Total Appointments'}
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-600">{stats.totalAppointments}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                {isArabic ? '+2 من الشهر الماضي' : '+2 from last month'}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isArabic ? 'التحاليل المكتملة' : 'Completed Tests'}
              </CardTitle>
              <TestTube className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-health-600">{stats.completedTests}</div>
              <p className="text-xs text-muted-foreground">
                {isArabic ? 'آخر تحليل: أمس' : 'Last test: Yesterday'}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isArabic ? 'الوصفات النشطة' : 'Active Prescriptions'}
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.activePrescriptions}</div>
              <p className="text-xs text-muted-foreground">
                {isArabic ? 'تحتاج متابعة' : 'Need follow-up'}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isArabic ? 'السجلات الطبية' : 'Medical Records'}
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.medicalRecords}</div>
              <p className="text-xs text-muted-foreground">
                {isArabic ? 'منذ 2020' : 'Since 2020'}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  {isArabic ? 'إجراءات سريعة' : 'Quick Actions'}
                </CardTitle>
                <CardDescription>
                  {isArabic ? 'الإجراءات الأكثر استخداماً' : 'Most used actions'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  {isArabic ? 'حجز موعد جديد' : 'Book New Appointment'}
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TestTube className="w-4 h-4 mr-2" />
                  {isArabic ? 'جدولة تحليل' : 'Schedule Lab Test'}
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  {isArabic ? 'عرض التاريخ الطبي' : 'View Medical History'}
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MapPin className="w-4 h-4 mr-2" />
                  {isArabic ? 'العثور على مركز طبي' : 'Find Medical Center'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  {isArabic ? 'المواعيد القادمة' : 'Upcoming Appointments'}
                </CardTitle>
                <CardDescription>
                  {isArabic ? 'مواعيدك الطبية القادمة' : 'Your upcoming medical appointments'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-medical-100 rounded-lg flex items-center justify-center">
                          <User className="w-6 h-6 text-medical-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{appointment.doctor}</h3>
                          <p className="text-sm text-gray-600">{appointment.specialty}</p>
                          <p className="text-sm text-gray-500">{appointment.center}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{appointment.date}</p>
                        <p className="text-sm text-gray-600">{appointment.time}</p>
                        <Button size="sm" variant="outline" className="mt-2">
                          {isArabic ? 'عرض التفاصيل' : 'View Details'}
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {upcomingAppointments.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>{isArabic ? 'لا توجد مواعيد قادمة' : 'No upcoming appointments'}</p>
                      <Button className="mt-4" variant="medical">
                        {isArabic ? 'حجز موعد' : 'Book Appointment'}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                {isArabic ? 'النشاط الأخير' : 'Recent Activity'}
              </CardTitle>
              <CardDescription>
                {isArabic ? 'آخر التحديثات في حسابك الطبي' : 'Latest updates in your medical account'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      {activity.type === 'lab_result' ? (
                        <TestTube className="w-4 h-4 text-green-600" />
                      ) : (
                        <Calendar className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.date}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {isArabic ? 'مكتمل' : 'Completed'}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}