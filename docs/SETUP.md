# Getting Started

This guide will help you get the project up and running.

## Prerequisites

- Node.js 18+
- npm or yarn package manager
- Git for version control

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/[username]/[repo-name].git
cd [repo-name]
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### Step 4: Run the Project

```bash
npm start
# or
npm run dev
```

## Development Setup

For development, use:

```bash
npm run dev
```

This will start the development server with hot-reload enabled.

## Testing

```bash
npm test

# Run tests in watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage
```

## Building for Production

```bash
npm run build

# Preview production build
npm run preview
```

## Troubleshooting

### Issue: Dependencies installation fails

**Solution:** Clear npm cache and try again:
```bash
npm cache clean --force
npm install
```

### Issue: Port already in use

**Solution:** Use a different port:
```bash
npm start -- --port 3001
```

## Getting Help

- 📖 Check the [documentation](../docs/)
- 🐛 [Report an issue](https://github.com/[username]/[repo-name]/issues)
- 💬 [Start a discussion](https://github.com/[username]/[repo-name]/discussions)

## Next Steps

- Read the [Architecture Guide](./ARCHITECTURE.md)
- Check out [Examples](../examples/)
- Review [API Documentation](./API.md)

---

*Last Updated: 2026-03-04*
