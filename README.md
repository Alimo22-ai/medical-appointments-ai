# MedCare - Smart Healthcare Platform

A comprehensive healthcare management platform designed for the MENA region, supporting both Arabic and English languages. MedCare helps patients, doctors, and medical centers manage appointments, lab tests, and medical history with smart features including automated reminders, AI-based recommendations, and Google Maps integration.

## 🌟 Features

### For Patients
- **Appointment Management**: Book, reschedule, and track medical appointments
- **Lab Test Scheduling**: Schedule lab tests and receive results digitally
- **Medical History**: Comprehensive medical record management
- **Smart Reminders**: Automated notifications for appointments and medications
- **Doctor Search**: Find and filter doctors by specialty, location, and availability
- **Medical Center Locator**: Find nearby medical centers with Google Maps integration

### For Doctors
- **Patient Management**: View and manage patient appointments and records
- **Schedule Management**: Set availability and manage appointment slots
- **Lab Results**: Review and share lab test results with patients
- **Medical Records**: Access comprehensive patient medical histories

### For Medical Centers
- **Multi-doctor Management**: Manage multiple doctors and their schedules
- **Facility Management**: Showcase facilities and services
- **Location Services**: Google Maps integration for easy patient navigation

## 🏗️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js with Google OAuth
- **Internationalization**: next-intl (Arabic & English)
- **Maps**: Google Maps API
- **Real-time**: Pusher for notifications
- **Email**: Nodemailer for automated reminders
- **AI/ML**: OpenAI API for smart recommendations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- Google Cloud Platform account (for Maps API)
- Google OAuth credentials
- (Optional) Pusher account for real-time features

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/medcare-platform.git
   cd medcare-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in the required environment variables:
   - `DATABASE_URL`: PostgreSQL connection string
   - `NEXTAUTH_SECRET`: Random secret for NextAuth.js
   - `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: Google OAuth credentials
   - `GOOGLE_MAPS_API_KEY`: Google Maps API key
   - Other optional services (email, Pusher, etc.)

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📱 Mobile & PWA Support

MedCare is fully responsive and includes Progressive Web App (PWA) capabilities:
- Installable on mobile devices
- Offline functionality for viewing medical records
- Push notifications for appointment reminders
- Native app-like experience

## 🌐 Internationalization

The platform supports both Arabic and English with:
- Complete UI translation
- RTL (Right-to-Left) layout support for Arabic
- Locale-specific date/time formatting
- Cultural adaptations for the MENA region

## 🔐 Security & Privacy

- HIPAA-compliant data handling
- End-to-end encryption for sensitive medical data
- Role-based access control (Patient, Doctor, Admin)
- Secure authentication with NextAuth.js
- Regular security audits and updates

## 📊 Database Schema

The platform uses a comprehensive database schema including:
- **Users**: Patient and doctor profiles with role-based access
- **Appointments**: Scheduling system with status tracking
- **Lab Tests**: Test ordering and result management
- **Medical History**: Comprehensive medical record storage
- **Medical Centers**: Facility information and management
- **Notifications**: Automated reminder system

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signin` - User sign in
- `POST /api/auth/signup` - User registration
- `GET /api/auth/session` - Get current session

### Appointments
- `GET /api/appointments` - Get user appointments
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/[id]` - Update appointment
- `DELETE /api/appointments/[id]` - Cancel appointment

### Lab Tests
- `GET /api/lab-tests` - Get user lab tests
- `POST /api/lab-tests` - Schedule new lab test
- `GET /api/lab-tests/[id]/results` - Get test results

### Medical Records
- `GET /api/medical-history` - Get medical history
- `POST /api/medical-history` - Add medical record

## 🤖 AI Features

- **Smart Scheduling**: AI-powered appointment recommendations
- **Symptom Analysis**: Basic symptom checking and doctor suggestions
- **Medication Reminders**: Intelligent reminder scheduling
- **Health Insights**: Personalized health recommendations

## 🗺️ Google Maps Integration

- Medical center location display
- Turn-by-turn navigation
- Distance and travel time calculations
- Nearby medical facility suggestions

## 📧 Notification System

- Email reminders for appointments
- SMS notifications (optional)
- In-app notifications
- Push notifications for mobile users

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run end-to-end tests
npm run test:e2e
```

## 📦 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set up environment variables in Vercel dashboard
4. Deploy automatically on push

### Docker
```bash
# Build the container
docker build -t medcare-platform .

# Run the container
docker run -p 3000:3000 medcare-platform
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@medcare.com
- 💬 Discord: [Join our community](https://discord.gg/medcare)
- 📚 Documentation: [docs.medcare.com](https://docs.medcare.com)

## 🙏 Acknowledgments

- Thanks to all healthcare professionals who provided feedback
- MENA region healthcare organizations for collaboration
- Open source community for amazing tools and libraries

---

**MedCare** - Digitizing healthcare for the MENA region 🏥✨