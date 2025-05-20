# Its Different Productions

A digital shop and media corporation website built with Next.js, TypeScript, and Tailwind CSS. This platform showcases premium beats, merchandise, and NFTs from #40gang.

![Its Different Productions](https://i.imgur.com/placeholder.png)

## Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication**: Supabase Auth with Email and Web3 wallet support
- **Storage**: Supabase Storage for files and media
- **Form Validation**: [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Deployment**: [Vercel](https://vercel.com/)

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

## Features

- **Responsive Design**: Mobile-first approach with responsive layouts for all screen sizes
- **Interactive UI**: Animated components with hover effects and transitions
- **Product Categories**: Separate sections for beats, merchandise, and NFTs
- **Modern Design**: Clean, modern interface with gradient accents and animations
- **Accessibility**: Semantic HTML and proper ARIA attributes
- **User Authentication**: Secure login/signup with email and password (with future web3 wallet support)
- **Data Storage**: PostgreSQL database via Supabase for storing product and user data
- **File Storage**: Secure file storage for beats, images, and NFT assets
- **Form Validation**: Client-side validation with helpful error messages and input requirements
- **Shopping Cart**: Add products to cart with persistent storage
- **User Profiles**: User account management and order history

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

## Development Notes

- **2023-05-15**: Initial project setup with Next.js 15, TypeScript, and Tailwind CSS
- **2023-05-15**: Added shadcn/ui components
- **2023-05-16**: Implemented Globe component using cobe library
- **2023-05-16**: Set up Vercel deployment configuration
- **2023-05-18**: Created home page with animated background and entrance button
- **2023-05-19**: Implemented store page with category sections
- **2023-05-20**: Added responsive header with mobile menu
- **2023-05-21**: Created footer with newsletter subscription and links
- **2023-05-25**: Fixed responsive layout issues and alignment problems
- **2023-05-26**: Enhanced background gradient component with interactive effects
- **2023-05-27**: Improved container configuration for better responsive behavior
- **2023-06-02**: Integrated Supabase for database, authentication, and storage
- **2023-06-03**: Designed database schema for users, products, and orders
- **2023-06-05**: Created form components with validation for user input
- **2023-06-06**: Implemented file upload validation for beats and images
- **2023-06-10**: Added authentication forms and pages (sign-up, sign-in)
- **2023-06-12**: Created beat upload form with file validation
- **2023-06-15**: Added validation schemas for merchandise and NFTs
- **2023-06-18**: Updated project documentation with Supabase integration details
- **2023-06-20**: Connected project to Supabase instance
- **2023-06-22**: Created database schema and storage buckets in Supabase
- **2023-06-25**: Set up Row Level Security policies for data protection
- **2023-07-01**: Deployed project to Vercel with CI/CD pipeline
- **2023-07-03**: Created helper functions for database and storage operations
- **2023-07-05**: Updated documentation with deployment details
- **2023-07-10**: Enhanced database schema with additional fields and tables
- **2023-07-15**: Added workflows directory with process documentation
- **2023-07-20**: Set up GitHub Actions for CI/CD and repository maintenance
- **2023-07-25**: Created comprehensive project status documentation
- **2023-07-28**: Updated roadmap with detailed timelines
- **2023-07-30**: Conducted technical readiness assessment

## Project Status

For a detailed overview of the current project status, completed features, and upcoming tasks, please see the [Project Status Document](./PROJECT_STATUS.md).

## Future Plans

### Short-term Goals (August 2023)
- ✅ Integrate Supabase for database, authentication, and storage
- ✅ Design database schema for users, products, and orders
- ✅ Create form components with validation for user input
- ✅ Implement user authentication system with Supabase Auth
- ✅ Add file upload validation for beats, merchandise, and NFTs
- ✅ Connect project to Supabase instance
- ✅ Set up database tables and storage buckets
- ✅ Configure Row Level Security policies
- ✅ Deploy to Vercel with CI/CD pipeline
- ✅ Enhance schema with additional fields for better data organization
- ✅ Add workflow documentation for key processes
- 🔄 Implement product detail pages for beats, merchandise, and NFTs
- 🔄 Add shopping cart functionality with Supabase
- 🔄 Implement search functionality
- 🔄 Add product filtering and sorting options

### Mid-term Goals (September-October 2023)
- 🔄 Integrate payment processing with NOW Payments API
- 🔄 Enhance user profiles with additional features
- 🔄 Implement wishlist functionality
- 🔄 Create admin dashboard for product management
- Add analytics tracking
- Implement real-time features using Supabase Realtime
- Add email notifications for orders and account activities
- Implement user reviews and ratings for products

### Long-term Goals (Q4 2023 - Q1 2024)
- Implement music player for beat previews with waveform visualization
- Add NFT minting functionality with web3 integration
- Create mobile app version
- Implement internationalization for multiple languages
- Add AI-powered product recommendations
- Scale database as user base grows
- Implement social sharing features
- Add affiliate/referral program

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature-name`)
6. Open a Pull Request

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Framer Motion](https://www.framer.com/motion/) for the animations
- [Lucide Icons](https://lucide.dev/) for the icon set
