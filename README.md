<div align="center">

# 🚗 DriveEase

### Smart. Stylish. Seamless.

*India's Premier Smart Car Rental Platform*

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-blue?style=for-the-badge)](https://reliable-daifuku-e27641.netlify.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/deepakjadon1902)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/deepak-jadon-612487272)

---

<img src="https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg" alt="DriveEase Banner" width="100%" style="border-radius: 10px; margin: 20px 0;">

</div>

## ✨ About DriveEase

DriveEase revolutionizes car rental in India with a modern, user-centric platform that makes mobility accessible, affordable, and enjoyable. Built with cutting-edge technology and designed with Indian users in mind, DriveEase offers a seamless car rental experience from booking to return.

### 🎯 Mission
To make car rental accessible, affordable, and enjoyable for every Indian, empowering people to explore their dreams without the constraints of vehicle ownership.

### 🌟 Vision  
To become India's most trusted and innovative car rental platform, setting new standards for customer experience, technology integration, and sustainable mobility solutions.

---

## 🚀 Key Features

### 🔐 **Smart Authentication System**
- Secure email/password authentication
- Comprehensive user profiles with Aadhar verification
- Role-based access control (User/Admin)

### 🚘 **Dynamic Car Fleet Management**
- **6 Car Categories**: Eco, SUV, Convertible, Sports, Luxury, Sedan
- **4 Fuel Types**: Petrol, Diesel, Electric, Hybrid
- Real-time availability tracking
- Hourly rental system with transparent pricing

### 🎨 **Adaptive Theme System**
- **6 Unique Themes** that change based on car category
- Beautiful glass-morphism UI design
- Responsive design for all devices
- Smooth animations and micro-interactions

### 📱 **User Experience**
- Intuitive booking system with duration selection
- Real-time booking management
- Cancellation with reason tracking
- Profile management and booking history

### 👨‍💼 **Admin Dashboard**
- Comprehensive car fleet management
- Real-time booking monitoring
- Notification system for new bookings/cancellations
- Analytics and reporting

### 🔔 **Smart Notifications**
- Real-time booking notifications
- Admin alerts for new bookings
- User notifications for booking confirmations
- Cancellation tracking and updates

---

## 🛠️ Technology Stack

### **Frontend**
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

### **Backend & Database**
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Robust relational database
- **Row Level Security (RLS)** - Data protection
- **Real-time subscriptions** - Live updates

### **Development Tools**
- **Vite** - Lightning-fast build tool
- **ESLint** - Code quality
- **PostCSS** - CSS processing
- **Autoprefixer** - Browser compatibility

### **Deployment**
- **Netlify** - Fast, reliable hosting
- **Environment Variables** - Secure configuration
- **Continuous Deployment** - Automated updates

---

## 🏗️ Architecture

### **Database Schema**
```
📊 Database Tables:
├── 👥 users (Authentication data)
├── 👤 profiles (User details & Aadhar verification)
├── 🚗 cars (Fleet management)
├── 📅 bookings (Rental transactions)
└── 🔔 notifications (Real-time alerts)
```

### **Security Features**
- **Row Level Security (RLS)** on all tables
- **Admin-only operations** for car management
- **User data isolation** and privacy protection
- **Secure authentication** with Supabase Auth

---

## 🎨 Design Philosophy

### **Glass-Morphism UI**
- Translucent cards with backdrop blur
- Subtle shadows and borders
- Modern, premium aesthetic

### **Adaptive Theming**
- **🌿 Eco**: Nature-inspired greens
- **🌲 SUV**: Deep forest tones  
- **☀️ Convertible**: Sky blue palette
- **🔥 Sports**: Fiery red-orange
- **🖤 Luxury**: Elegant black diamond
- **⚪ Sedan**: Clean urban pearl

### **Responsive Design**
- Mobile-first approach
- Tablet and desktop optimization
- Touch-friendly interactions

---

## 📱 Screenshots

<div align="center">

### 🏠 Home Page
*Browse available cars with dynamic theming*

### 🚗 Car Booking
*Seamless booking experience with real-time pricing*

### 👨‍💼 Admin Dashboard  
*Comprehensive fleet and booking management*

### 📱 Mobile Experience
*Fully responsive design for all devices*

</div>

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Supabase account

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/deepakjadon1902/DriveEase.git
   cd driveease
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**
   - Run the migration files in `/supabase/migrations/`
   - Set up Row Level Security policies
   - Insert sample car data

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Build for Production**
   ```bash
   npm run build
   ```

---

## 📊 Database Schema

### **Core Tables**

#### 👤 **Profiles**
```sql
- id (uuid, primary key)
- name (text)
- address (text) 
- mobile (text)
- date_of_birth (date)
- aadhar_number (text)
- created_at, updated_at (timestamps)
```

#### 🚗 **Cars**
```sql
- id (uuid, primary key)
- name (text)
- category (enum: eco, suv, convertible, sports, luxury, sedan)
- fuel_type (enum: petrol, diesel, electric, hybrid)
- hourly_rate (integer)
- image_url (text)
- is_available (boolean)
- created_at, updated_at (timestamps)
```

#### 📅 **Bookings**
```sql
- id (uuid, primary key)
- user_id (uuid, foreign key)
- car_id (uuid, foreign key)
- duration_hours (integer)
- total_cost (integer)
- status (enum: active, cancelled, completed)
- booking_time (timestamp)
- cancellation_reason (text, optional)
- created_at, updated_at (timestamps)
```

---

## 🔐 Security & Privacy

### **Data Protection**
- **Row Level Security (RLS)** ensures users only access their data
- **Admin privileges** restricted to verified admin emails
- **Secure authentication** with Supabase Auth
- **Data encryption** in transit and at rest

### **Privacy Compliance**
- **GDPR-ready** data handling
- **User consent** for data collection
- **Right to deletion** and data portability
- **Transparent privacy policy**

---

## 🌟 Key Highlights

### **🎯 User-Centric Design**
- Intuitive interface designed for Indian users
- Aadhar-based verification for trust and security
- Mobile-first responsive design

### **⚡ Performance Optimized**
- Lightning-fast loading with Vite
- Optimized images and assets
- Efficient database queries with proper indexing

### **🔄 Real-Time Features**
- Live booking notifications
- Real-time availability updates
- Instant admin alerts

### **📈 Scalable Architecture**
- Modular component structure
- Clean separation of concerns
- Easy to extend and maintain

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Maintain component modularity
- Write meaningful commit messages
- Test thoroughly before submitting

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

<div align="center">

### **Deepak Jadon**
*Full Stack Developer & UI/UX Enthusiast*

[![GitHub](https://img.shields.io/badge/GitHub-deepakjadon1902-black?style=flat-square&logo=github)](https://github.com/deepakjadon1902)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Deepak_Jadon-0077B5?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/deepak-jadon-612487272)
[![Email](https://img.shields.io/badge/Email-deepakjadon1902@gmail.com-red?style=flat-square&logo=gmail)](mailto:deepakjadon1907@gmail.com)

*"Building the future of mobility, one line of code at a time."*

</div>

---

## 🙏 Acknowledgments

- **Supabase** for the amazing backend platform
- **Pexels** for high-quality car images
- **Lucide** for beautiful icons
- **Tailwind CSS** for the utility-first approach
- **Framer Motion** for smooth animations

---

## 📞 Support

Need help? We're here for you!

- 📧 **Email**: deepakjadon1907@gmail.com
- 💬 **GitHub Issues**: [Create an issue](https://github.com/deepakjadon1902/DriveEase/issues)
- 🌐 **Live Demo**: [DriveEase Platform](https://reliable-daifuku-e27641.netlify.app)

---

<div align="center">

### 🚗 **Experience the Future of Car Rental**

**[Visit DriveEase →](https://reliable-daifuku-e27641.netlify.app)**

*Smart. Stylish. Seamless.*

---

**Made with ❤️ in India** 🇮🇳

</div>
