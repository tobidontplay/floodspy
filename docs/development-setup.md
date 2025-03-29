# Development Environment Setup

This guide will help you set up your development environment for the FloodSpy project.

## Prerequisites

- Node.js (v18.x or later)
- pnpm (v8.x or later)
- Git

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd floodspy
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your local configuration values.

## Development Workflow

### Starting the Development Server

```bash
pnpm dev
```

This will start the Next.js development server at [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
pnpm build
```

### Running Production Build Locally

```bash
pnpm start
```

### Running Tests

```bash
pnpm test          # Run all tests
pnpm test:watch    # Run tests in watch mode
pnpm test:coverage # Run tests with coverage report
```

### Linting and Formatting

```bash
pnpm lint         # Run ESLint
pnpm format       # Run Prettier
pnpm format:check # Check formatting without making changes
```

## Project Structure

```
floodspy/
├── app/              # Next.js App Router
├── components/       # React components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and shared logic
├── public/           # Static assets
├── styles/           # Global styles
├── docs/             # Documentation
├── next.config.mjs   # Next.js configuration
├── package.json      # Project dependencies and scripts
├── tsconfig.json     # TypeScript configuration
└── tailwind.config.ts # Tailwind CSS configuration
```

## TypeScript

The project uses TypeScript for type safety. Make sure your editor supports TypeScript for the best development experience.

## Styling

We use Tailwind CSS for styling components. Refer to the [Tailwind documentation](https://tailwindcss.com/docs) for more information.

## Recommended Extensions (VS Code)

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Hero
- GitLens

## Troubleshooting

### Common Issues

1. **Module not found errors**:
   - Make sure you've installed all dependencies with `pnpm install`
   - Check for typos in import paths

2. **TypeScript errors**:
   - Run `pnpm tsc` to check for TypeScript errors
   - Make sure your TypeScript version matches the project's requirements

3. **Build failures**:
   - Check the console for specific error messages
   - Verify that all environment variables are properly set

For additional help, please refer to the project's issue tracker or contact the development team.
