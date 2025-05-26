<div align="center">

# 🎵 Its Different Productions

### *Premium Digital Marketplace for Beats, Merchandise & NFTs*

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

![Project Banner](https://via.placeholder.com/800x400/6366f1/ffffff?text=Its+Different+Productions)

---

### 📊 Project Stats

![Components](https://img.shields.io/badge/Components-56-brightgreen?style=flat-square)
![Pages](https://img.shields.io/badge/Pages-12-blue?style=flat-square)
![Themes](https://img.shields.io/badge/Color%20Themes-6-purple?style=flat-square)
![Database Tables](https://img.shields.io/badge/DB%20Tables-9-orange?style=flat-square)
![Code Quality](https://img.shields.io/badge/TypeScript-100%25-blue?style=flat-square)
![Mobile Ready](https://img.shields.io/badge/Mobile-Responsive-green?style=flat-square)

### 🚀 Live Demo
**[Visit Its Different Productions →](https://itsdifferentproductions.vercel.app)**

### 📚 Documentation
**[View Documentation →](https://docs.itsdifferentproductions.com)**

### 🚀 **Current Status**

**Development Progress**: 78% Foundation Complete *(+3% from January 26 build fixes)*
**Latest Update**: may 25, 2025
**Active Features**: Web3 Integration, Vocalist Auditions, Collaboration Platform
**Build Status**: ✅ Production Ready - All critical issues resolved

---

## 💝 Support the Project

*Help us continue building amazing digital experiences!*

### 🌟 **SEEKING STRATEGIC INVESTORS & PARTNERS**

**Its Different Productions** is actively seeking funding to accelerate development and launch our revolutionary Web3-enabled creative marketplace.

**Investment Highlights:**
- 📈 **Market Opportunity**: $43B+ global digital music market growing 7.4% annually
- 🚀 **Unique Position**: First platform combining Web3 with traditional e-commerce for creators
- 🌍 **Global Reach**: Multi-language support targeting international creator communities
- 💻 **Technical Excellence**: Built on proven tech stack with 78% foundation complete

**Funding Target**: $50,000 for complete platform launch

**Contact for Investment**: [Collaboration Form](https://itsdifferentproductions.vercel.app/collaborate)

### 💝 **Community Donations**

**Donate to support development:**
```
Solana Address: h4shed.sol
```

*Your support helps us maintain and enhance this open-source platform for the creative community.*

---

</div>

## 🛠️ Technology Stack

<div align="center">

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Framework** | ![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?logo=next.js) | `15.2.4` | React Framework |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript) | `5.0` | Type Safety |
| **Styling** | ![Tailwind](https://img.shields.io/badge/Tailwind-3.4.17-38bdf8?logo=tailwindcss) | `3.4.17` | CSS Framework |
| **UI Library** | ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Latest-black) | `Latest` | Component Library |
| **Animations** | ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11.0-ff69b4?logo=framer) | `11.0` | Motion Library |
| **Database** | ![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?logo=supabase) | `Latest` | Backend as a Service |
| **Authentication** | ![Supabase Auth](https://img.shields.io/badge/Supabase-Auth-green?logo=supabase) | `Latest` | User Management |
| **Validation** | ![Zod](https://img.shields.io/badge/Zod-3.24.1-blue) | `3.24.1` | Schema Validation |
| **Package Manager** | ![pnpm](https://img.shields.io/badge/pnpm-Latest-orange?logo=pnpm) | `Latest` | Fast Package Manager |
| **Deployment** | ![Vercel](https://img.shields.io/badge/Vercel-Latest-black?logo=vercel) | `Latest` | Hosting Platform |

</div>

## Development Setup

### Prerequisites

- Node.js 18.17.0 or later
- pnpm package manager

### Installation

```bash
# Install dependencies
pnpm install
```

### Supabase Setup

1. Create a free Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new project
3. Run the SQL scripts in the `supabase` directory in the Supabase SQL Editor:
   - `schema.sql` - Creates the database tables and RLS policies
   - `storage.sql` - Creates the storage buckets and RLS policies
4. Configure authentication settings in the Supabase dashboard:
   - Enable "Email" provider
   - Configure email templates for confirmation and password reset
5. Copy your Supabase URL and anon key from the API settings
6. Create a `.env.local` file with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

### Running the Development Server

```bash
# Start the development server
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Deployment

The application is deployed on Vercel with a CI/CD pipeline that automatically deploys changes pushed to the main branch.

1. **Production Environment**: [https://itsdifferentproductions.vercel.app](https://itsdifferentproductions.vercel.app)
2. **Preview Environments**: Automatically created for pull requests

#### Environment Variables

The following environment variables need to be set in the Vercel dashboard:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Building for Production

```bash
# Create a production build
pnpm build

# Start the production server
pnpm start
```

## Project Structure

```
itsdifferentproductions/
├── app/                  # Next.js App Router
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   ├── auth/             # Authentication pages
│   │   ├── sign-in/      # Sign in page
│   │   ├── sign-up/      # Sign up page
│   │   └── reset/        # Password reset page
│   ├── dashboard/        # User dashboard
│   │   ├── profile/      # User profile page
│   │   └── orders/       # Order history page
│   └── store/            # Store pages
│       ├── page.tsx      # Main store page
│       ├── beats/        # Beats section
│       ├── merch/        # Merchandise section
│       └── nfts/         # NFTs section
├── components/           # React components
│   ├── ui/               # UI components (shadcn/ui)
│   │   └── background-gradient.tsx  # Custom gradient component
│   ├── auth/             # Authentication components
│   ├── forms/            # Form components
│   │   ├── beats/        # Beat-related forms
│   │   ├── merch/        # Merchandise-related forms
│   │   └── nfts/         # NFT-related forms
│   ├── site-header.tsx   # Site header component
│   └── site-footer.tsx   # Site footer component
├── contexts/             # React contexts
│   └── auth-context.tsx  # Authentication context
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
│   ├── utils.ts          # Utility functions
│   ├── supabase.ts       # Supabase client
│   ├── database-helpers.ts # Database operation helpers
│   ├── storage-helpers.ts  # Storage operation helpers
│   └── validators/       # Zod validation schemas
├── types/                # TypeScript type definitions
│   └── supabase.ts       # Supabase database types
├── public/               # Static assets
├── styles/               # Additional styles
├── supabase/             # Supabase configuration
│   ├── schema.sql        # Database schema
│   ├── schema-updates.sql # Schema enhancements
│   └── storage.sql       # Storage configuration
├── workflows/            # Workflow documentation
│   ├── user-registration.md # User registration process
│   ├── beat-upload.md    # Beat upload process
│   └── payment-processing.md # Payment processing with NOW Payments
└── .github/              # GitHub configuration
    └── workflows/        # GitHub Actions workflows
        ├── ci.yml        # Continuous Integration
        └── sync-repository.yml # Repository synchronization
```

## Database Schema

### Core Tables

1. **users**
   - id (UUID, primary key)
   - email (string, unique)
   - full_name (string, nullable)
   - avatar_url (string, nullable)
   - created_at (timestamp)
   - updated_at (timestamp)
   - role (enum: 'customer', 'admin')

2. **profiles**
   - id (UUID, primary key, references users.id)
   - username (string, unique)
   - bio (text, nullable)
   - website (string, nullable)
   - social_links (jsonb, nullable)
   - shipping_address (jsonb, nullable)
   - billing_address (jsonb, nullable)

3. **products**
   - id (UUID, primary key)
   - name (string)
   - description (text)
   - price (decimal)
   - category (enum: 'beat', 'merch', 'nft')
   - status (enum: 'draft', 'published', 'archived')
   - created_at (timestamp)
   - updated_at (timestamp)
   - metadata (jsonb, for category-specific data)

### Category-Specific Tables

4. **beats**
   - id (UUID, primary key, references products.id)
   - genre (string)
   - bpm (integer)
   - key (string)
   - duration (integer, in seconds)
   - audio_url (string)
   - waveform_url (string, nullable)
   - license_type (enum: 'basic', 'premium', 'exclusive')
   - tags (array of strings)

5. **merchandise**
   - id (UUID, primary key, references products.id)
   - type (enum: 'shirt', 'hoodie', 'hat', etc.)
   - sizes (array of strings)
   - colors (array of strings)
   - inventory_count (integer)
   - weight (decimal, in kg)
   - dimensions (jsonb, for shipping calculations)

6. **nfts**
   - id (UUID, primary key, references products.id)
   - token_id (string, nullable)
   - blockchain (enum: 'ethereum', 'polygon', etc.)
   - contract_address (string, nullable)
   - edition_size (integer)
   - edition_number (integer)
   - media_url (string)
   - perks (text, nullable)

### Relationship Tables

7. **orders**
   - id (UUID, primary key)
   - user_id (UUID, references users.id)
   - status (enum: 'pending', 'processing', 'completed', 'cancelled')
   - total_amount (decimal)
   - payment_intent_id (string, nullable)
   - shipping_address (jsonb)
   - created_at (timestamp)
   - updated_at (timestamp)

8. **order_items**
   - id (UUID, primary key)
   - order_id (UUID, references orders.id)
   - product_id (UUID, references products.id)
   - quantity (integer)
   - price (decimal)
   - metadata (jsonb, nullable)

9. **cart_items**
   - id (UUID, primary key)
   - user_id (UUID, references users.id)
   - product_id (UUID, references products.id)
   - quantity (integer)
   - added_at (timestamp)

## ✨ Features

<div align="center">

### 🎨 **Design & UI**
![Responsive](https://img.shields.io/badge/📱-Mobile%20First-green) ![Themes](https://img.shields.io/badge/🎨-6%20Color%20Themes-purple) ![Animations](https://img.shields.io/badge/✨-Framer%20Motion-pink) ![Accessibility](https://img.shields.io/badge/♿-WCAG%20Compliant-blue)

### 🛍️ **E-commerce**
![Products](https://img.shields.io/badge/🎵-Beats%20Marketplace-orange) ![Merch](https://img.shields.io/badge/👕-Merchandise-red) ![NFTs](https://img.shields.io/badge/🖼️-NFT%20Gallery-cyan) ![Cart](https://img.shields.io/badge/🛒-Shopping%20Cart-yellow)

### 🔐 **Security & Auth**
![Auth](https://img.shields.io/badge/🔑-Supabase%20Auth-green) ![Wallet](https://img.shields.io/badge/🌐-Web3%20Wallet-blue) ![RLS](https://img.shields.io/badge/🛡️-Row%20Level%20Security-blue) ![Validation](https://img.shields.io/badge/✅-Zod%20Validation-purple) ![TypeSafe](https://img.shields.io/badge/🔒-Type%20Safe-orange)

### 🚀 **Performance**
![SSR](https://img.shields.io/badge/⚡-Server%20Side%20Rendering-yellow) ![Optimized](https://img.shields.io/badge/📦-Code%20Splitting-green) ![Images](https://img.shields.io/badge/🖼️-Image%20Optimization-blue) ![PWA](https://img.shields.io/badge/📱-PWA%20Ready-purple)

</div>

### 🎯 **Core Functionality**

- **🎵 Beat Marketplace** - Upload, preview, and purchase premium beats
- **👕 Merchandise Store** - Physical products with inventory management
- **🖼️ NFT Gallery** - Digital collectibles and exclusive content
- **👤 User Profiles** - Account management and order history
- **🛒 Shopping Cart** - Persistent cart with secure checkout
- **🔍 Search & Filter** - Advanced product discovery
- **📱 Mobile Responsive** - Optimized for all devices
- **🎨 Theme Customization** - 6 unique color schemes
- **🔐 Secure Authentication** - Email and Web3 wallet support (MetaMask)
- **🎤 Vocalist Auditions** - Global talent discovery in all languages and genres
- **🤝 Collaboration System** - Professional forms for developers, artists, investors

### 🎤 **CASTING CALL: A.I. VOCALS PROJECT**

**🌟 WANTED: OPEN AUDITIONS FOR A.I. APP WITH MONETIZATION**

We're actively recruiting talented vocalists worldwide for our revolutionary A.I. voice technology project!

**What We Offer:**
- 💰 **Paid Contracts**: $500-$5,000 per voice model
- 📈 **Royalty Sharing**: 10-25% ongoing revenue
- 🌍 **Global Opportunity**: All languages and genres welcome
- 🎵 **Professional Growth**: Industry connections and portfolio building

**Languages Needed**: English, Spanish, Japanese, Korean, French, Italian, Portuguese, and 40+ more!

**Genres Sought**: Hip-Hop, R&B, Pop, Country, Jazz, Afrobeat, Musical Theater, Electronic, Rock, K-Pop, J-Pop

**Voice Types**: Deep/Bass, Growl/Rough, Smooth/Melodic, Kid Voices, Character Voices, Whisper/Breathy, Power Vocals

**How to Apply**: Visit [itsdifferentproductions.vercel.app/ai-auditions](https://itsdifferentproductions.vercel.app/ai-auditions)

**Timeline**: English/Spanish/Japanese (1 month), Korean (2 months), French/Italian (2 months), Portuguese (3 months)

## Form Validation

The application implements comprehensive form validation for all user inputs:

### Authentication Forms
- **Sign Up**: Validates email format, password strength (min 8 chars, uppercase, lowercase, number), and matching passwords
- **Sign In**: Validates email format and password presence

### Product Upload Forms
- **Beats**:
  - Audio files: Max 50MB, MP3/WAV formats only
  - Cover images: Max 5MB, JPEG/PNG/WebP formats only
  - Required fields: title, description, price, genre, BPM, key, license type

- **Merchandise**:
  - Product images: Max 5MB, JPEG/PNG/WebP formats only, 1-5 images required
  - Required fields: title, description, price, type, sizes, colors, inventory count

- **NFTs**:
  - Media files: Max 50MB, supports images, videos, and audio in standard formats
  - Required fields: title, description, price, edition size, edition number

All forms provide immediate feedback with clear error messages and input requirements.

## Deployment

This project is configured for deployment on Vercel. The `vercel.json` file contains the necessary configuration for deployment.

## 📈 Development Timeline

<div align="center">

### 🏗️ **Foundation Phase** (Dec 2024)
![Setup](https://img.shields.io/badge/✅-Project%20Setup-green) ![Components](https://img.shields.io/badge/✅-UI%20Components-green) ![Responsive](https://img.shields.io/badge/✅-Responsive%20Design-green)

### 🔧 **Integration Phase** (May 2025)
![Database](https://img.shields.io/badge/✅-Supabase%20Integration-green) ![Auth](https://img.shields.io/badge/✅-Authentication-green) ![Validation](https://img.shields.io/badge/✅-Form%20Validation-green)

### 🚀 **Enhancement Phase** (May 2025)
![Theming](https://img.shields.io/badge/✅-6%20Color%20Themes-green) ![Security](https://img.shields.io/badge/✅-RLS%20Policies-green) ![Documentation](https://img.shields.io/badge/✅-Comprehensive%20Docs-green)

### 🎯 **Current Phase** (January 2025)
![Docs](https://img.shields.io/badge/✅-Documentation%20Site-green) ![Security](https://img.shields.io/badge/✅-Enhanced%20Security-green) ![Social](https://img.shields.io/badge/✅-Social%20Integration-green) ![Themes](https://img.shields.io/badge/✅-8%20Color%20Themes-green) ![Wallet](https://img.shields.io/badge/✅-Web3%20Wallet%20Connect-green) ![Auditions](https://img.shields.io/badge/✅-Vocalist%20Auditions-green) ![Collaboration](https://img.shields.io/badge/✅-Collaboration%20System-green) ![E-commerce](https://img.shields.io/badge/🔄-E-commerce%20Features-yellow) ![Payments](https://img.shields.io/badge/🔄-Payment%20Integration-yellow)

</div>

### 📊 **Development Metrics**

| Metric | Count | Status |
|--------|-------|--------|
| 📄 **Pages Created** | 12 | ✅ Complete |
| 🧩 **Components Built** | 56 | ✅ Complete |
| 🎨 **Themes Available** | 6 | ✅ Complete |
| 🗄️ **Database Tables** | 9 | ✅ Complete |
| 📝 **Form Validators** | 4 | ✅ Complete |
| 🔐 **Security Policies** | 15+ | ✅ Complete |
| 📱 **Mobile Responsive** | 100% | ✅ Complete |
| ♿ **Accessibility Score** | A+ | ✅ Complete |

## Project Status

For a detailed overview of the current project status, completed features, and upcoming tasks, please see the [Project Status Document](./PROJECT_STATUS.md).

## 🗺️ Roadmap

<div align="center">

### 🎯 **Current Sprint** (May 2025)
![E-commerce](https://img.shields.io/badge/🛍️-E--commerce%20Core-yellow) ![Payments](https://img.shields.io/badge/💳-Payment%20Integration-yellow) ![Admin](https://img.shields.io/badge/👨‍💼-Admin%20Dashboard-yellow)

### 🚀 **Next Quarter** (Q3 2025)
![Player](https://img.shields.io/badge/🎵-Music%20Player-blue) ![NFT](https://img.shields.io/badge/🖼️-NFT%20Minting-blue) ![Mobile](https://img.shields.io/badge/📱-Mobile%20App-blue)

### 🌟 **Future Vision** (2025+)
![AI](https://img.shields.io/badge/🤖-AI%20Recommendations-purple) ![Web3 Funding Opportunities](https://img.shields.io/badge/🌐-Full%20Web3%20Integration-purple) ![Global](https://img.shields.io/badge/🌍-Internationalization-purple)

</div>

### ✅ **Completed Features**
- [x] **Foundation**: Next.js 15 + TypeScript setup
- [x] **UI System**: 56 shadcn/ui components
- [x] **Theming**: 6 customizable color schemes
- [x] **Database**: Supabase integration with RLS
- [x] **Authentication**: Secure user management
- [x] **Validation**: Comprehensive form validation
- [x] **Responsive**: Mobile-first design
- [x] **Documentation**: Complete project docs
- [x] **Docs Site**: Deployed documentation at docs.itsdifferentproductions.com
- [x] **CI/CD**: Automated deployment pipeline with docs branch strategy
- [x] **Web3 Wallet**: MetaMask integration with wallet connect functionality
- [x] **Vocalist Auditions**: Comprehensive audition system with multi-language support
- [x] **Collaboration System**: Professional collaboration forms and workflows

### 🔄 **In Progress**
- [ ] **Product Pages**: Detailed beat/merch/NFT pages
- [ ] **Shopping Cart**: Full cart functionality
- [ ] **Search**: Advanced filtering and sorting
- [ ] **Payment**: NOW Payments integration

### 🎯 **Upcoming**
- [ ] **Admin Dashboard**: Product management interface
- [ ] **Music Player**: Waveform visualization
- [ ] **NFT Minting**: Web3 integration
- [ ] **Analytics**: User behavior tracking
- [ ] **Reviews**: User rating system
- [ ] **Notifications**: Email and push notifications

## 🤝 Contributing

<div align="center">

**We welcome contributions from the community!**

[![Contributors](https://img.shields.io/badge/Contributors-Welcome-brightgreen?style=for-the-badge)](CONTRIBUTING.md)
[![Code Style](https://img.shields.io/badge/Code%20Style-TypeScript-blue?style=for-the-badge)](https://www.typescriptlang.org/)
[![Guidelines](https://img.shields.io/badge/Guidelines-Available-purple?style=for-the-badge)](.augment-guidelines)

</div>

### 🚀 **Quick Start for Contributors**

1. **Fork & Clone**
   ```bash
   git clone https://github.com/jlucus/idp.git
   cd idp
   ```

2. **Setup Environment**
   ```bash
   pnpm install
   cp .env.example .env.local
   # Add your Supabase credentials
   ```

3. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Follow Guidelines**
   - Read [`.augment-guidelines`](.augment-guidelines) for coding standards
   - Use TypeScript strictly
   - Test on all 6 color themes
   - Ensure mobile responsiveness

5. **Submit PR**
   ```bash
   git commit -m "feat: add amazing feature"
   git push origin feature/amazing-feature
   ```

### 🎯 **Areas We Need Help With**
- 🎵 Music player enhancements
- 🛒 E-commerce features
- 🎨 UI/UX improvements
- 📱 Mobile optimizations
- 🧪 Testing coverage
- 📚 Documentation

---

<div align="center">

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

[![Next.js](https://img.shields.io/badge/Next.js-Framework-black?logo=next.js)](https://nextjs.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Components-black)](https://ui.shadcn.com/)
[![Framer Motion](https://img.shields.io/badge/Framer-Motion-ff69b4?logo=framer)](https://www.framer.com/motion/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green?logo=supabase)](https://supabase.com/)

---

### 💝 **Support the Project**

*If this project helped you, consider supporting its development:*

**Solana Donation Address:**
```
h4shed.sol
```

*Every contribution helps us build better tools for the creative community!*

---

### 🏆 **Thanks Wall - Large Contributors**

*We deeply appreciate our generous supporters who help make this project possible!*

<div align="center">

#### 🌟 **Platinum Supporters** (10+ SOL)
*Be the first to join our Platinum tier!*

#### 🥇 **Gold Supporters** (5-9.99 SOL)
*Your name could be here - support the project today!*

#### 🥈 **Silver Supporters** (1-4.99 SOL)
*Join our growing community of supporters!*

#### 🥉 **Bronze Supporters** (0.1-0.99 SOL)
*Every contribution matters - thank you!*

---

**Want to be featured on our Thanks Wall?**

Send your donation to `h4shed.sol` and email us at `hello@itsdifferentproductions.com` with:
- Your transaction hash
- Your preferred display name (or "Anonymous")
- Optional: Your website/social media link

*All supporters will be featured here with their contribution tier. We update this wall monthly!*

</div>

---

**Made with ❤️ by the Its Different Productions Team**

[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?logo=github)](https://github.com/jlucus/idp)
[![Discord](https://img.shields.io/badge/Discord-Community-5865f2?logo=discord)](https://discord.gg/MDSAnPBewd)
[![Website](https://img.shields.io/badge/Website-Live-brightgreen)](https://itsdifferentproductions.vercel.app)

</div>
