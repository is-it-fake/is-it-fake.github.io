# Vivid Starter

A modern, type-safe Next.js starter template with a focus on maintainable architecture and reusable components.

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com)
- **Icons**: [Lucide React](https://lucide.dev)
- **Component Development**: [Storybook](https://storybook.js.org)
- **Data Management**: [TanStack Query](https://tanstack.com/query)
- **Authentication**: [Auth.js](https://authjs.dev)
- **Database ORM**: [Drizzle ORM](https://orm.drizzle.team)

## Project Structure

```
├── .storybook/                  # Storybook configuration
├── src/
│   ├── app/                     # Next.js app directory
│   │   ├── (marketing)/        # Marketing pages & routes
│   │   ├── (blog)/             # Blog related pages
│   │   ├── (dashboard)/        # Main application routes
│   │   ├── (auth)/             # Authentication routes
│   │   └── api/                # API routes
│   ├── components/
│   │   ├── ui/                 # shadcn components
│   │   ├── shared/             # Shared components
│   │   └── pages/              # Page-specific components
│   ├── lib/
│   │   ├── db/                 # Database configuration
│   │   ├── api/                # API utilities
│   │   ├── repositories/       # Data repositories
│   │   ├── services/           # Business logic services
│   │   ├── auth/              # Authentication utilities
│   │   └── utils/             # Utility functions
│   ├── types/                  # Shared TypeScript types
│   ├── styles/                 # Global styles
│   └── stories/                # Storybook stories
├── drizzle/                    # Drizzle migrations
└── public/                     # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/vivid-starter.git
cd vivid-starter
```

2. Install dependencies:

```bash
yarn install
```

3. Set up your environment variables:

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

```bash
# Development
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint
yarn type-check   # Run TypeScript compiler check

# Storybook
yarn storybook        # Start Storybook development server
yarn build-storybook  # Build Storybook for production

# Testing
yarn test         # Run tests
yarn test:watch   # Run tests in watch mode

# Database
yarn generate-types   # Generate Drizzle types
yarn db:push         # Push schema changes to database

# Code Quality
yarn format       # Format code with Prettier
```

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages following conventional commits

### Component Development

- Create reusable components in `src/components/shared`
- Document components with Storybook
- Follow component structure guidelines in the project documentation
- Implement proper loading states and error boundaries

### API Development

- Follow REST API best practices
- Implement proper error handling
- Use repository pattern for data access
- Implement proper validation for inputs

### Git Workflow

Branch naming convention:

- `feature/[feature-name]` for new features
- `fix/[fix-name]` for bug fixes
- `refactor/[refactor-name]` for code refactoring
- `chore/[chore-name]` for maintenance tasks

### Performance

- Implement code splitting where necessary
- Optimize images using Next.js Image component
- Follow React best practices for performance
- Implement proper caching strategies

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
