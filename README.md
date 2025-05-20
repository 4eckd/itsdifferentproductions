# Its Different Productions

A digital shop and media corporation website built with Next.js, TypeScript, and Tailwind CSS. This platform showcases premium beats, merchandise, and NFTs from #40gang.

![Its Different Productions](https://i.imgur.com/placeholder.png)

## Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
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

### Running the Development Server

```bash
# Start the development server
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

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
│   └── store/            # Store pages
│       ├── page.tsx      # Main store page
│       ├── beats/        # Beats section
│       ├── merch/        # Merchandise section
│       └── nfts/         # NFTs section
├── components/           # React components
│   ├── ui/               # UI components (shadcn/ui)
│   │   └── background-gradient.tsx  # Custom gradient component
│   ├── site-header.tsx   # Site header component
│   └── site-footer.tsx   # Site footer component
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
│   └── utils.ts          # Utility functions
├── public/               # Static assets
└── styles/               # Additional styles
```

## Features

- **Responsive Design**: Mobile-first approach with responsive layouts for all screen sizes
- **Interactive UI**: Animated components with hover effects and transitions
- **Product Categories**: Separate sections for beats, merchandise, and NFTs
- **Modern Design**: Clean, modern interface with gradient accents and animations
- **Accessibility**: Semantic HTML and proper ARIA attributes

## Deployment

This project is configured for deployment on Vercel. The `vercel.json` file contains the necessary configuration for deployment.

## Development Notes

- **2024-07-24**: Initial project setup with Next.js 15, TypeScript, and Tailwind CSS
- **2024-07-24**: Added shadcn/ui components
- **2024-07-24**: Implemented Globe component using cobe library
- **2024-07-24**: Set up Vercel deployment configuration
- **2024-07-25**: Created home page with animated background and entrance button
- **2024-07-25**: Implemented store page with category sections
- **2024-07-25**: Added responsive header with mobile menu
- **2024-07-25**: Created footer with newsletter subscription and links
- **2024-07-26**: Fixed responsive layout issues and alignment problems
- **2024-07-26**: Enhanced background gradient component with interactive effects
- **2024-07-26**: Improved container configuration for better responsive behavior

## Future Plans

### Short-term Goals
- Implement product detail pages for beats, merchandise, and NFTs
- Add shopping cart functionality with local storage
- Create user authentication system
- Implement search functionality
- Add product filtering and sorting options

### Mid-term Goals
- Integrate payment processing with Stripe
- Add user profiles and order history
- Implement wishlist functionality
- Create admin dashboard for product management
- Add analytics tracking

### Long-term Goals
- Implement music player for beat previews
- Add NFT minting functionality
- Create mobile app version
- Implement internationalization for multiple languages
- Add AI-powered product recommendations

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
