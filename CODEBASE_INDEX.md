# Its Different Productions - Codebase Index

This document provides a comprehensive index of the codebase structure, key files, and their purposes for the Its Different Productions platform.

## Project Overview

**Project Name**: Its Different Productions
**Type**: E-commerce platform for beats, merchandise, and NFTs
**Framework**: Next.js 15 with React 19
**Language**: TypeScript
**Styling**: Tailwind CSS with shadcn/ui components
**Database**: Supabase (PostgreSQL)
**Authentication**: Supabase Auth
**Deployment**: Vercel

## Root Directory Structure

```
itsdifferentproductions/
├── app/                    # Next.js App Router pages
├── components/             # React components
├── contexts/              # React contexts
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries and helpers
├── public/                # Static assets
├── styles/                # Global styles
├── supabase/              # Database schemas and migrations
├── types/                 # TypeScript type definitions
├── workflows/             # Documentation for workflows
└── Configuration files
```

## Core Configuration Files

### Package Management
- `package.json` - Dependencies and scripts
- `pnpm-lock.yaml` - Lock file for pnpm package manager

### Build & Development
- `next.config.mjs` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `postcss.config.mjs` - PostCSS configuration
- `components.json` - shadcn/ui configuration

### Deployment
- `vercel.json` - Vercel deployment configuration

## Application Structure (app/)

### Core Pages
- `app/layout.tsx` - Root layout with providers
- `app/page.tsx` - Home page with entrance animation
- `app/globals.css` - Global styles and CSS variables

### Authentication
- `app/auth/sign-in/page.tsx` - Sign-in page
- `app/auth/sign-up/page.tsx` - Sign-up page

### Store Pages
- `app/store/layout.tsx` - Store layout wrapper
- `app/store/page.tsx` - Main store page
- `app/store/beats/page.tsx` - Beats marketplace
- `app/store/merch/page.tsx` - Merchandise store
- `app/store/nfts/page.tsx` - NFT marketplace

### User Dashboard
- `app/dashboard/beats/upload/` - Beat upload functionality

### Utility Pages
- `app/contact/page.tsx` - Contact page
- `app/privacy/page.tsx` - Privacy policy
- `app/terms/page.tsx` - Terms of service
- `app/theme-demo/page.tsx` - Theme customization demo

## Components Structure (components/)

### Authentication Components
- `components/auth/sign-in-form.tsx` - Sign-in form
- `components/auth/sign-up-form.tsx` - Sign-up form

### Form Components
- `components/forms/beats/beat-upload-form.tsx` - Beat upload form

### Layout Components
- `components/site-header.tsx` - Main navigation header
- `components/site-footer.tsx` - Site footer
- `components/enter-button.tsx` - Animated entrance button

### Interactive Components
- `components/globe.tsx` - 3D globe component
- `components/discord-invite.tsx` - Discord community invite
- `components/discord-banner.tsx` - Discord banner
- `components/theme-selector.tsx` - Theme customization selector
- `components/theme-provider.tsx` - Theme provider wrapper

### UI Components (components/ui/)
Complete shadcn/ui component library including:
- Form elements: `button.tsx`, `input.tsx`, `textarea.tsx`, `select.tsx`
- Layout: `card.tsx`, `separator.tsx`, `sheet.tsx`, `sidebar.tsx`
- Navigation: `navigation-menu.tsx`, `breadcrumb.tsx`, `pagination.tsx`
- Feedback: `alert.tsx`, `toast.tsx`, `sonner.tsx`, `progress.tsx`
- Data display: `table.tsx`, `chart.tsx`, `avatar.tsx`, `badge.tsx`
- Overlays: `dialog.tsx`, `popover.tsx`, `tooltip.tsx`, `hover-card.tsx`
- Theming: `theme-toggle.tsx`

## Context & State Management (contexts/)

- `contexts/auth-context.tsx` - Authentication state management
- `contexts/theme-context.tsx` - Theme customization state

## Custom Hooks (hooks/)

- `hooks/use-mobile.tsx` - Mobile device detection
- `hooks/use-toast.ts` - Toast notification management

## Library & Utilities (lib/)

### Database & Storage
- `lib/supabase.ts` - Supabase client configuration
- `lib/database-helpers.ts` - Database operation helpers
- `lib/storage-helpers.ts` - File storage utilities

### Validation
- `lib/validators/auth.ts` - Authentication validation schemas
- `lib/validators/beats.ts` - Beat upload validation
- `lib/validators/merchandise.ts` - Merchandise validation
- `lib/validators/nfts.ts` - NFT validation

### Utilities
- `lib/utils.ts` - General utility functions (cn, etc.)

## Database & Backend (supabase/)

- `supabase/schema.sql` - Main database schema
- `supabase/schema-updates.sql` - Schema updates and migrations
- `supabase/storage.sql` - Storage bucket configurations
- `supabase/README.md` - Database documentation

## Type Definitions (types/)

- `types/supabase.ts` - Generated Supabase types

## Workflow Documentation (workflows/)

- `workflows/README.md` - Workflow overview
- `workflows/beat-upload.md` - Beat upload process
- `workflows/user-registration.md` - User registration flow
- `workflows/payment-processing.md` - Payment workflow
- `workflows/ci-cd.md` - CI/CD pipeline documentation
- `workflows/sync-repository.yml` - GitHub Actions workflow

## Static Assets (public/)

- `public/placeholder-logo.png` - Logo placeholder
- `public/placeholder-logo.svg` - SVG logo placeholder
- `public/placeholder-user.jpg` - User avatar placeholder
- `public/placeholder.jpg` - General image placeholder
- `public/pikachu.jpg` - Sample image

## Key Dependencies

### Core Framework
- **Next.js 15.2.4** - React framework
- **React 19** - UI library
- **TypeScript 5** - Type safety

### UI & Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS
- **shadcn/ui** - Component library via Radix UI
- **Framer Motion 11** - Animation library
- **Lucide React** - Icon library

### Backend & Database
- **Supabase** - Backend as a Service
- **Zod 3.24.1** - Schema validation

### Development Tools
- **pnpm** - Package manager
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## Recent Additions

### Theming System
- Multi-color theme support (Default, Purple, Blue, Green, Amber, Red)
- Light/Dark mode switching
- Theme persistence with localStorage
- CSS variable-based theming system
- Theme demo page for testing

### Enhanced Components
- Advanced theme selector with color previews
- Improved site header with theme controls
- Mobile-responsive theme switching

## Development Status

The codebase is well-structured with:
- ✅ Modern Next.js 15 App Router architecture
- ✅ Comprehensive TypeScript implementation
- ✅ Complete UI component library
- ✅ Authentication system
- ✅ Database integration
- ✅ Theming system
- ✅ Mobile-responsive design
- 🔄 E-commerce functionality (in progress)
- 🔄 Payment integration (planned)
- 🔄 Admin dashboard (planned)

## Getting Started

1. **Install dependencies**: `pnpm install`
2. **Set up environment**: Configure `.env.local` with Supabase credentials
3. **Run development server**: `pnpm dev`
4. **Build for production**: `pnpm build`

For detailed setup instructions, see `README.md`.

## Component Inventory

### Authentication Components
| Component | Path | Purpose |
|-----------|------|---------|
| SignInForm | `components/auth/sign-in-form.tsx` | User sign-in form with validation |
| SignUpForm | `components/auth/sign-up-form.tsx` | User registration form |

### Layout Components
| Component | Path | Purpose |
|-----------|------|---------|
| SiteHeader | `components/site-header.tsx` | Main navigation with mobile menu |
| SiteFooter | `components/site-footer.tsx` | Footer with links and newsletter |
| EnterButton | `components/enter-button.tsx` | Animated entrance button |

### Interactive Components
| Component | Path | Purpose |
|-----------|------|---------|
| Globe | `components/globe.tsx` | 3D interactive globe using COBE |
| DiscordInvite | `components/discord-invite.tsx` | Discord community invitation |
| ThemeSelector | `components/theme-selector.tsx` | Advanced theme customization |
| ThemeProvider | `components/theme-provider.tsx` | Theme context wrapper |

### Form Components
| Component | Path | Purpose |
|-----------|------|---------|
| BeatUploadForm | `components/forms/beats/beat-upload-form.tsx` | Beat file upload form |

### UI Library Components (shadcn/ui)
| Category | Components | Count |
|----------|------------|-------|
| Form Controls | Button, Input, Textarea, Select, Checkbox, Radio, Switch, Slider | 8 |
| Layout | Card, Separator, Sheet, Sidebar, Resizable, Aspect Ratio | 6 |
| Navigation | Navigation Menu, Breadcrumb, Pagination, Tabs | 4 |
| Feedback | Alert, Toast, Sonner, Progress, Skeleton | 5 |
| Data Display | Table, Chart, Avatar, Badge, Calendar | 5 |
| Overlays | Dialog, Popover, Tooltip, Hover Card, Alert Dialog, Context Menu | 6 |
| Advanced | Command, Accordion, Collapsible, Carousel, Drawer | 5 |

### Context Providers
| Context | Path | Purpose |
|---------|------|---------|
| AuthContext | `contexts/auth-context.tsx` | User authentication state |
| ColorThemeContext | `contexts/theme-context.tsx` | Theme customization state |

### Custom Hooks
| Hook | Path | Purpose |
|------|------|---------|
| useIsMobile | `hooks/use-mobile.tsx` | Mobile device detection |
| useToast | `hooks/use-toast.ts` | Toast notification management |
| useColorTheme | `contexts/theme-context.tsx` | Theme state management |

## Database Schema Overview

### Core Tables
- **users** - User profiles and authentication
- **beats** - Beat marketplace items
- **merchandise** - Physical merchandise
- **nfts** - NFT collections
- **orders** - Purchase transactions
- **categories** - Product categorization

### Storage Buckets
- **product_images** - Product photos and artwork
- **audio_files** - Beat audio files
- **user_uploads** - User-generated content
- **nft_assets** - NFT media files

## API Routes & Endpoints

### Authentication
- Sign up, sign in, sign out
- Password reset
- Email verification

### Products
- Beat upload and management
- Merchandise catalog
- NFT minting and trading

### User Management
- Profile updates
- Order history
- Wishlist management

## Styling Architecture

### CSS Variables System
- Light/Dark mode support
- 6 color themes (Default, Purple, Blue, Green, Amber, Red)
- Consistent spacing and typography
- Responsive breakpoints

### Tailwind Configuration
- Custom color palette
- Extended spacing scale
- Animation utilities
- Component variants

## Security Features

### Authentication
- Supabase Auth integration
- Row Level Security (RLS)
- JWT token management
- Session persistence

### Data Validation
- Zod schema validation
- File type restrictions
- Size limitations
- Input sanitization

## Performance Optimizations

### Next.js Features
- App Router for better performance
- Image optimization
- Code splitting
- Static generation where possible

### Loading States
- Skeleton components
- Progressive loading
- Optimistic updates
- Error boundaries

## Accessibility Features

### ARIA Support
- Semantic HTML structure
- Screen reader compatibility
- Keyboard navigation
- Focus management

### Design System
- Consistent color contrast
- Scalable typography
- Touch-friendly interactions
- Responsive design patterns
