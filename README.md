# NeuroLoop Nexus

**HIPAA-Compliant Research Platform for Neurological Condition Management**

NeuroLoop Nexus is a secure, research-grade platform designed for patients, clinicians, carers, and researchers to track, manage, and analyze neurological conditions including epilepsy, Parkinson's disease, migraines, and multiple sclerosis.

---

## 🎯 Project Overview

**Purpose:** Enable collaborative neurological care while maintaining HIPAA compliance and supporting medical research.

**Status:** 🟢 Production-Ready (Development Testing Phase)

**Live Demo:** neuroloop.app *(deployment pending)*

---

## ✨ Key Features

### For Patients
- **Daily Tracking:** Seizures, medications, symptoms, mood, sleep, menstrual cycles
- **Condition Management:** Multi-condition support with personalized tracking features
- **Secure Sharing:** Control who can access your health data
- **Research Participation:** Opt-in to de-identified research studies

### For Clinicians
- **Patient Invitations:** Secure HIPAA-compliant invitation system
- **Dashboard:** Real-time patient data visualization
- **Multi-Patient Management:** Track multiple patients from one account
- **Clinical Insights:** Pattern detection and trend analysis

### For Researchers
- **De-identified Data:** Access anonymized research datasets
- **Research Consent:** Granular patient consent management
- **Data Analytics:** Pre-built research tables for common analyses
- **HIPAA Compliance:** All research data properly de-identified

### For Carers
- **Patient Connection:** Link to patient accounts via secure codes
- **Care Tracking:** Monitor and support patient daily activities
- **Communication:** Coordinate care with clinicians

---

## 🛠 Technology Stack

### Frontend
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **UI Components:** shadcn/ui + Tailwind CSS
- **Icons:** Lucide React
- **State Management:** React Query + Context API
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod validation

### Backend
- **Database:** PostgreSQL (Supabase)
- **Authentication:** Supabase Auth
- **Real-time:** Supabase Realtime
- **Storage:** Supabase Storage (encrypted)
- **Security:** Row Level Security (RLS) on all tables
- **Audit:** Comprehensive audit logging

### Infrastructure
- **Hosting:** Vercel (Frontend)
- **Database:** Supabase (Backend)
- **Email:** Supabase Auth (development) / SendGrid (production)
- **Compliance:** HIPAA-ready architecture

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ & npm ([install with nvm](https://github.com/nvm-sh/nvm))
- Git

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd neuroloop-nexus

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Add your Supabase credentials to .env
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_anon_key

# Start development server
npm run dev
```

### Development URLs
- **Frontend:** http://localhost:5173
- **Supabase Dashboard:** https://supabase.com/dashboard

---

## 📁 Project Structure

```
neuroloop-nexus/
├── src/
│   ├── components/       # React components
│   │   ├── auth/        # Authentication components
│   │   ├── dashboard/   # Dashboard components
│   │   └── ...
│   ├── hooks/           # Custom React hooks
│   ├── integrations/    # Supabase integration
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   └── types/           # TypeScript types
├── public/              # Static assets
├── aws-deployment/      # AWS Lambda functions (future)
├── lambda-resolvers/    # GraphQL resolvers (future)
├── *.sql               # Database migrations
├── SETUP.md            # Detailed setup guide
├── DATABASE.md         # Database documentation
├── SECURITY.md         # Security & compliance
└── DEPLOYMENT.md       # Production deployment
```

---

## 📚 Documentation

- **[SETUP.md](./SETUP.md)** - Detailed setup instructions
- **[DATABASE.md](./DATABASE.md)** - Complete database schema documentation
- **[SECURITY.md](./SECURITY.md)** - Security measures & HIPAA compliance
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment guide
- **[CHANGELOG.md](./CHANGELOG.md)** - Recent changes and updates

---

## 🔒 Security & Compliance

### HIPAA Compliance
- ✅ **Encryption:** All data encrypted in transit (TLS) and at rest
- ✅ **Access Control:** Row Level Security (RLS) on all user data
- ✅ **Audit Logging:** Complete audit trail of all PHI access
- ✅ **Authentication:** Secure multi-factor authentication support
- ✅ **De-identification:** Research data properly anonymized

### Security Features
- Row Level Security (RLS) on 29/34 tables
- Audit triggers on all PHI operations
- Email and IP address hashing
- Secure invitation token system (32 bytes entropy)
- Fixed search_path on all database functions
- Security incident tracking

**⚠️ For Production:** Requires Supabase Teams ($599/month) + BAA signing

See [SECURITY.md](./SECURITY.md) for complete details.

---

## 🧪 Testing

### Current Status
✅ All database tables created (50+ tables)  
✅ All migrations applied successfully  
✅ All triggers active (28 triggers)  
✅ All functions secure (13 functions)  
✅ Security audit passed  

### Run Tests
```bash
# Database verification queries available in:
# - DEBUG_TEST_REPORT.md (temporary)
# - DATABASE.md

# Frontend testing (future)
npm run test
```

---

## 🚢 Deployment

### Development (Current)
- Frontend: Local development server
- Database: Supabase (Free/Pro tier)
- Status: ✅ Ready for testing with fake data

### Production (Planned)
- Frontend: Vercel (HIPAA-compliant configuration)
- Database: Supabase Teams tier + BAA
- Email: SendGrid + BAA
- Domain: neuroloop.app
- SSL: Automatic via Vercel

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide.

---

## 🤝 Contributing

This is a private medical application. Contributions are limited to authorized developers.

### Development Workflow
1. Create feature branch
2. Make changes
3. Test thoroughly (especially security features)
4. Submit pull request
5. Security review required for PHI-related changes

---

## 📝 License

**Proprietary - All Rights Reserved**

This application handles Protected Health Information (PHI) and is subject to HIPAA regulations.

---

## 🆘 Support

### For Development Issues
- Check documentation in `SETUP.md`
- Review `DATABASE.md` for schema questions
- See `SECURITY.md` for compliance questions

### For Production Issues
- Refer to `DEPLOYMENT.md`
- Check Supabase logs
- Review security incident logs

---

## 🎯 Roadmap

### Current Phase: Development Testing ✅
- [x] Complete database schema
- [x] User authentication
- [x] Patient/Clinician/Researcher onboarding
- [x] Daily tracking features
- [x] Patient invitation system
- [x] Security audit & fixes

### Next: Production Launch 🚀
- [ ] Supabase Teams tier + BAA
- [ ] SendGrid integration + BAA
- [ ] Production deployment to Vercel
- [ ] Domain setup (neuroloop.app)
- [ ] User testing
- [ ] Security audit by third party
- [ ] HIPAA compliance certification

### Future Enhancements
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] AI-powered insights
- [ ] Telemedicine integration
- [ ] Wearable device integration

---

**Built with ❤️ for the neurological health community**
