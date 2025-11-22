# StudioFlow Design Guidelines

## Design Approach

**Selected Approach:** Minimalist Monochrome with Energetic Accent

This is a modern, professional fitness studio management platform. The design uses a sophisticated monochromatic grayscale palette with a vibrant green accent representing energy, growth, and health - core values of fitness studios.

**Key Design Principles:**
1. Clean, professional monochrome interface
2. Strategic use of green accent for energy and calls-to-action  
3. Information clarity with strong visual hierarchy
4. Minimalist, distraction-free workflows

**Color Philosophy:**
- **Monochrome Base:** Pure blacks, grays, and whites create a professional, timeless foundation
- **Green Accent:** Vibrant emerald green (#22c55e) represents fitness, energy, and progress
- **No Gradients:** Except for the subtle text gradient in the logo for brand identity

---

## Typography

**Font Family:** Inter (via Google Fonts CDN)
- Primary: Inter (400, 500, 600, 700)

**Hierarchy:**
- Page Titles: text-2xl font-semibold
- Section Headers: text-lg font-semibold
- Card/Panel Titles: text-base font-semibold
- Body Text: text-sm font-normal
- Helper/Meta Text: text-xs font-normal
- Table Headers: text-xs font-semibold uppercase tracking-wide
- Labels: text-sm font-medium
- Stats/Numbers: text-3xl font-bold

---

## Layout System

**Spacing Primitives:** Tailwind units of 1, 2, 3, 4, 6, 8, 12, 16
- Component padding: p-4, p-6
- Card spacing: p-6
- Section gaps: gap-6, gap-8
- Page margins: px-6, px-8
- Vertical rhythm: space-y-6, space-y-8

**Container Widths:**
- Full application: Full viewport width
- Content max-width: max-w-7xl mx-auto
- Forms/modals: max-w-2xl
- Sidebars: w-64

---

## Navigation Structure

**Primary Navigation:** Left sidebar (w-64, fixed)
- Dashboard (home icon)
- Clients (users icon)
- Schedule (calendar icon)
- Instructors (user-circle icon)
- Modalities (grid icon)
- Check-in (check-circle icon)

**Top Bar:** Full-width header (h-16)
- Logo/brand on left
- Page title center
- User profile menu on right
- Notification bell icon

**Navigation States:**
- Active: font-semibold with visual indicator
- Hover: Subtle highlight
- Icons: Heroicons outline, 20px

---

## Component Library

### Dashboard Cards
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Card structure: rounded-lg border p-6
- Stat display: Large number (text-3xl font-bold), label below (text-sm)
- Icon positioned top-right at 32px

### Data Tables
- Full-width with rounded-lg border
- Header: Sticky, font-semibold uppercase tracking-wide text-xs
- Row height: py-4 px-6
- Alternating row treatment
- Action buttons: Icon buttons aligned right
- Pagination: Bottom-right, showing "X-Y of Z results"

### Calendar/Schedule Grid
- Weekly view: 7 columns (days) + time rows
- Time slots: 30-minute or 1-hour intervals
- Class blocks: Rounded rectangles with modality name, instructor, capacity (X/Y)
- Capacity indicator: Visual progress or fraction
- Click to view details/manage
- Current time indicator line

### Forms
- Label positioning: Above input, text-sm font-medium mb-1
- Input heights: h-10
- Input spacing: space-y-4
- Field groups: Grouped with space-y-6 between groups
- Required indicators: Asterisk in label
- Helper text: text-xs, positioned below input
- Error states: Text and border treatment
- Submit buttons: Full or right-aligned based on context

### Modals/Dialogs
- Overlay with centered content
- Max-width: max-w-2xl
- Padding: p-6
- Header: Text-lg font-semibold with close button (X icon)
- Content area: py-4
- Footer: Flex justify-end gap-3 for action buttons

### Buttons
- Primary: h-10 px-4 rounded-md font-medium
- Secondary: Same size, different treatment
- Icon buttons: w-8 h-8 rounded-md (for table actions)
- Destructive actions: Distinct visual treatment

### Client Profile View
- Two-column layout: Sidebar (w-80) with client info + main area with tabs
- Info cards: Stacked vertically, space-y-4
- Status badges: Rounded-full px-3 py-1 text-xs font-medium
- Action buttons: Grouped at top-right of header

### Class Enrollment Interface
- Split view: Available slots list (left) + enrolled students list (right)
- Capacity indicator: Progress bar showing X/Y with percentage
- Student cards: Includes avatar placeholder, name, status
- Add student: Search/select dropdown + confirm button

### Check-in Interface
- List view of enrolled students
- Checkbox or toggle for presence marking
- Timestamp display for checked-in students
- Bulk actions: Check all / Uncheck all buttons

### Metrics Display (Dashboard)
- "Top Classes" section: Horizontal bar chart or ranked list with numbers
- Occupancy rate: Large percentage with visual gauge/progress ring
- Weekly trend: Simple line or bar micro-chart

---

## Icons

**Library:** Heroicons (via CDN)
- Navigation: outline variant, 20px
- Actions: outline variant, 18px
- Status indicators: solid variant, 16px
- Dashboard stats: outline variant, 32px

**Common Icons:**
- Home, Users, Calendar, UserCircle, ViewGrid, CheckCircle, Bell, Plus, Pencil, Trash, Search, Filter, ChevronDown, ChevronRight, X

---

## Responsive Behavior

**Desktop-First (Primary):**
- Optimized for 1440px+ screens
- Sidebar always visible
- Multi-column layouts

**Tablet/Mobile (Graceful degradation):**
- Collapsible sidebar with hamburger menu
- Stack columns to single column
- Touch-optimized button sizes (min h-11)

---

## Images

No hero images required. This is a data-focused admin dashboard.

**Avatar Placeholders:**
- Client list: 40px circular avatars (initials fallback)
- Instructor cards: 48px circular
- User profile menu: 32px circular

**Empty States:**
- Simple illustrations for empty tables/lists
- Centered, max-w-sm, with descriptive text and CTA button

---

## Key UX Patterns

- **Quick Actions:** Floating action button (FAB) on list pages for "Add New"
- **Inline Editing:** Click to edit on tables where appropriate
- **Confirmation Dialogs:** For destructive actions (delete class, remove student)
- **Toast Notifications:** Top-right position for success/error feedback
- **Loading States:** Skeleton loaders for tables and cards
- **Search/Filter:** Combined search bar with filter dropdown on list pages
- **Breadcrumbs:** For deep navigation (Client > Profile > History)

---

This design creates a professional, efficient SaaS platform optimized for rapid data entry and management tasks while maintaining modern visual standards.