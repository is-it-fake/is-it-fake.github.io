# IsItFake

A modern web application to help users verify the authenticity of content and detect potential fake or misleading information.

## Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com)
- **Icons**: [Lucide React](https://lucide.dev)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)

## Project Structure

```
├── src/
│   ├── app/                    # Next.js app directory
│   ├── components/
│   │   ├── ui/                # shadcn components
│   │   ├── shared/            # Shared components
│   │   └── providers/         # Context providers
│   ├── lib/                   # Utility functions
│   └── styles/                # Global styles
└── public/                    # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/isitfake.git
cd isitfake
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

```bash
# Development
yarn dev              # Start development server
yarn build            # Build for production
yarn start            # Start production server
yarn lint             # Run ESLint
yarn format           # Format code with Prettier
yarn type-check       # Run TypeScript compiler check
```

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Maintain consistent code formatting

### Component Development

- Create reusable components in `src/components/shared`
- Use shadcn/ui components as building blocks
- Implement proper loading states and error handling
- Follow React best practices

### Performance

- Implement code splitting where necessary
- Optimize images using Next.js Image component
- Follow React best practices for performance
- Implement proper caching strategies
