import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, isToday, isTomorrow, isYesterday } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string, locale: string = 'en'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (isToday(dateObj)) {
    return locale === 'ar' ? 'اليوم' : 'Today'
  }
  
  if (isTomorrow(dateObj)) {
    return locale === 'ar' ? 'غداً' : 'Tomorrow'
  }
  
  if (isYesterday(dateObj)) {
    return locale === 'ar' ? 'أمس' : 'Yesterday'
  }
  
  return format(dateObj, 'MMM dd, yyyy')
}

export function formatTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, 'h:mm a')
}

export function formatDateTime(date: Date | string, locale: string = 'en'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return `${formatDate(dateObj, locale)} ${formatTime(dateObj)}`
}

export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    SCHEDULED: 'status-scheduled',
    CONFIRMED: 'status-confirmed',
    IN_PROGRESS: 'status-in-progress',
    COMPLETED: 'status-completed',
    CANCELLED: 'status-cancelled',
    NO_SHOW: 'status-cancelled',
    ORDERED: 'status-scheduled',
    SAMPLE_COLLECTED: 'status-in-progress',
  }
  
  return statusColors[status] || 'bg-gray-100 text-gray-800'
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  // Basic phone validation for MENA region
  const phoneRegex = /^[\+]?[0-9\-\s\(\)]{8,15}$/
  return phoneRegex.test(phone)
}

export function generateTimeSlots(startHour: number = 8, endHour: number = 18, interval: number = 30): string[] {
  const slots: string[] = []
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const time = new Date()
      time.setHours(hour, minute, 0, 0)
      slots.push(format(time, 'HH:mm'))
    }
  }
  
  return slots
}

export function calculateAge(birthDate: Date | string): number {
  const today = new Date()
  const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}