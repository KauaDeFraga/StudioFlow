# StudioFlow - Fitness Studio Management Platform

## Overview

StudioFlow is a web-based SaaS application designed for managing fitness studio operations such as gyms, yoga studios, and pilates centers. The platform provides comprehensive tools for client management (CRM), class scheduling, instructor coordination, attendance tracking, and performance analytics through an administrative dashboard.

The application follows a modern full-stack architecture with React on the frontend, Express.js on the backend, and PostgreSQL for data persistence. It emphasizes a minimalist, professional design with a monochrome color scheme and vibrant green accents representing energy and health.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server
- **Wouter** for lightweight client-side routing
- **TanStack Query** (React Query) for server state management and data synchronization
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for utility-first styling

**Design System:**
- Minimalist monochrome palette (blacks, grays, whites) with emerald green (#22c55e) accent color
- Inter font family via Google Fonts CDN
- Consistent spacing using Tailwind's spacing scale (4, 6, 8, 12, 16 units)
- Custom CSS variables for theming with light/dark mode support
- Border radius values: 9px (lg), 6px (md), 3px (sm)

**State Management:**
- React Query handles all server state (data fetching, caching, mutations)
- Local component state with React hooks for UI interactions
- No global client state management library (Redux, Zustand, etc.)

**Component Architecture:**
- Page components in `client/src/pages/` handle route-level logic
- Reusable UI components in `client/src/components/`
- Form dialogs for create/update operations
- Data tables and cards for displaying lists
- Responsive grid layouts with mobile-first approach

### Backend Architecture

**Technology Stack:**
- **Node.js** with **Express.js** framework
- **TypeScript** for type safety across the stack
- **Drizzle ORM** for database operations
- **Neon Serverless** PostgreSQL driver for database connectivity

**API Design:**
- RESTful API architecture with conventional HTTP methods (GET, POST, PUT, DELETE)
- JSON request/response format
- Routes registered in `server/routes.ts`
- API endpoints prefixed with `/api/`
- Error handling with appropriate HTTP status codes (400, 404, 500)

**Data Access Layer:**
- Storage abstraction defined in `server/storage.ts` with `IStorage` interface
- Drizzle ORM handles query building and execution
- Type-safe database operations using shared schema types
- Support for complex queries with joins for related data (instructors with modalities, classes with enrollments)

**Server Configuration:**
- Development mode (`server/index-dev.ts`): Vite middleware integration with HMR
- Production mode (`server/index-prod.ts`): Serves pre-built static assets
- Session management capability via connect-pg-simple (PostgreSQL session store)
- Request logging middleware with timing information

### Database Architecture

**Database Provider:**
- **PostgreSQL** via Neon serverless platform
- Connection configured through `DATABASE_URL` environment variable
- Drizzle Kit for schema migrations in `migrations/` directory

**Schema Design:**
The database uses a relational model with the following core entities:

- **users**: Authentication and user management (UUID primary keys)
- **modalities**: Class types/categories (e.g., Spinning, Yoga, HIIT)
- **instructors**: Instructor profiles with email and name
- **instructorModalities**: Many-to-many relationship linking instructors to their qualified modalities
- **clients**: Client/member records with status tracking (ativo, inativo, devedor)
- **classes**: Scheduled class sessions with day of week, time, capacity, and references to modality and instructor
- **enrollments**: Client registrations for specific classes
- **attendances**: Check-in records tracking actual attendance

**Key Design Decisions:**
- UUID-based primary keys using PostgreSQL's `gen_random_uuid()`
- Cascading deletes on foreign key relationships to maintain referential integrity
- Timestamp fields for audit trails (`createdAt`)
- Text-based status fields for client state management
- Integer day of week (0-6) for recurring weekly schedules

### Build and Deployment

**Development Workflow:**
- `npm run dev`: Runs development server with Vite HMR and TypeScript compilation
- Type checking with `npm run check` (no emit, validation only)
- Database schema updates via `npm run db:push` (Drizzle Kit)

**Production Build:**
- `npm run build`: Compiles client with Vite and bundles server with esbuild
- Client assets output to `dist/public/`
- Server bundle output to `dist/index.js` as ESM module
- `npm start`: Runs production server from bundled output

**Build Tools:**
- **Vite** for client bundling with React plugin and development features
- **esbuild** for fast server bundling with external package handling
- Path aliases configured in both `vite.config.ts` and `tsconfig.json` (`@/`, `@shared/`, `@assets/`)

## External Dependencies

### UI Component Libraries
- **Radix UI**: Comprehensive set of unstyled, accessible primitives (dialogs, dropdowns, tooltips, etc.)
- **shadcn/ui**: Pre-built components combining Radix UI with Tailwind styling
- **cmdk**: Command menu component for search/navigation
- **lucide-react**: Icon library
- **react-day-picker**: Calendar/date picker component

### Data Management
- **@tanstack/react-query**: Server state management with intelligent caching and background updates
- **react-hook-form**: Form state management with validation
- **@hookform/resolvers**: Integration between react-hook-form and validation libraries
- **drizzle-zod**: Zod schema generation from Drizzle ORM models for validation

### Database and ORM
- **drizzle-orm**: TypeScript ORM with type-safe query builder
- **@neondatabase/serverless**: PostgreSQL driver optimized for serverless environments
- **drizzle-kit**: CLI tool for schema migrations and introspection

### Styling and Theming
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant management for component styling
- **clsx** and **tailwind-merge**: Utility for merging Tailwind class names conditionally

### Development Tools
- **TypeScript**: Type safety across frontend and backend
- **Vite**: Next-generation frontend build tool with HMR
- **tsx**: TypeScript execution for development server
- **esbuild**: Fast JavaScript bundler for production builds

### Replit-Specific Plugins
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Code navigation enhancement
- **@replit/vite-plugin-dev-banner**: Development mode indicator

### Date and Time
- **date-fns**: Modern date utility library for formatting and manipulation