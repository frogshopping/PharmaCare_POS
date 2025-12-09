# PharmaCare - Pharmacy Management System

A modern, full-featured pharmacy management system built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Recent Refactoring (December 2025)

The codebase has been significantly refactored to improve **maintainability**, **reusability**, and **scalability**. Key improvements include:

- ✅ Centralized type definitions
- ✅ Custom hooks for common patterns  
- ✅ Reusable UI components
- ✅ Service layer architecture
- ✅ Utility functions for validation and formatting
- ✅ Consolidated mock data
- ✅ Comprehensive documentation

**📖 For detailed refactoring information, see:**
- [`REFACTORING_GUIDE.md`](./REFACTORING_GUIDE.md) - Complete guide to new patterns and utilities
- [`REFACTORING_SUMMARY.md`](./REFACTORING_SUMMARY.md) - Summary of changes and next steps

## 🏗️ Project Structure

```
pharma_care/
├── app/                          # Next.js app directory
│   ├── page.tsx                  # Dashboard page
│   ├── inventory/                # Inventory management
│   ├── customers/                # Customer management
│   ├── medicine-rack/            # Medicine rack organization
│   └── ...
├── components/                   # React components
│   ├── ui/                       # Reusable UI components
│   │   ├── FormModal.tsx        # ✨ Modal wrapper
│   │   ├── FormField.tsx        # ✨ Form field wrapper
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── ...
│   ├── dashboard/               # Dashboard components
│   ├── inventory/               # Inventory components
│   └── ...
├── lib/                         # ✨ Utilities, hooks, and types
│   ├── api/                     # API client
│   ├── config/                  # Configuration
│   ├── constants/               # App constants
│   ├── data/                    # Mock data
│   ├── hooks/                   # Custom hooks
│   ├── types/                   # TypeScript types
│   └── utils/                   # Utility functions
├── services/                    # ✨ Service layer
│   ├── medicineService.ts
│   ├── dashboardService.ts
│   ├── catalogService.ts
│   ├── index.ts
│   └── api.ts (legacy)
└── public/                      # Static assets
```

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Charts:** Recharts
- **Date Utilities:** date-fns

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📚 Key Features

- **Dashboard:** Real-time analytics and insights
- **Inventory Management:** Product catalog with CRUD operations
- **Medicine Rack:** Physical organization and tracking
- **Customer Management:** Patient records and history
- **Sales & POS:** Point of sale system
- **Reports:** Profit/loss, sales, and purchase reports
- **Purchase History:** Track all purchases

## 🎨 Code Examples

### Using Custom Hooks

```typescript
import { useFormState } from '@/lib/hooks';

function MyComponent() {
  const { formData, handleChange, handleReset, isSubmitting, setSubmitting } = useFormState({
    name: '',
    email: ''
  });

  // Use formData, handleChange, etc.
}
```

### Using Services

```typescript
import { medicineService } from '@/services';

async function loadMedicines() {
  const medicines = await medicineService.getAll();
  // Process medicines
}
```

### Using Utilities

```typescript
import { formatCurrency, validators } from '@/lib/utils';

const price = formatCurrency(1234.56); // "BDT 1,234.56"
const error = validators.required(value, 'Name');
```

### Using Reusable Components

```typescript
import { FormModal, FormField } from '@/components/ui';

function MyModal({ isOpen, onClose }) {
  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Add Item"
      isSubmitting={false}
    >
      <FormField label="Name" required>
        <Input />
      </FormField>
    </FormModal>
  );
}
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run linter
npm run lint
```

## 📖 Development Guidelines

### Best Practices

1. **Use centralized types** from `@/lib/types`
2. **Leverage custom hooks** for common patterns
3. **Use service layer** for all API calls
4. **Apply utilities** for validation and formatting
5. **Follow component patterns** shown in refactored files

### Creating New Features

1. Define types in `lib/types/index.ts`
2. Create service methods in appropriate service file
3. Build UI using reusable components
4. Use custom hooks for state management
5. Apply utilities for data processing

### File Naming Conventions

- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Types: `PascalCase` interfaces
- Constants: `UPPER_SNAKE_CASE`

## 🔄 Migration Status

### ✅ Completed
- Core utilities and hooks
- Service layer architecture
- UI component library
- AddProductModal
- AddCustomerModal

### 🔨 In Progress
- Remaining modal components
- Page component updates
- Old file cleanup

### 📋 Planned
- Comprehensive testing
- Performance optimizations
- Additional utilities
- Enhanced error handling

## 📝 Contributing

1. Follow existing patterns and conventions
2. Use TypeScript for all new code
3. Write self-documenting code
4. Update documentation as needed
5. Test thoroughly before committing

## 🐛 Troubleshooting

### Import Errors
Ensure `tsconfig.json` has proper path aliases for `@/*`

### Type Errors
Import types from centralized location: `@/lib/types`

### Service Errors
Toggle `USE_MOCK_DATA` in service files during development

## 📄 License

This project is private and proprietary.

## 🤝 Support

For questions or issues:
1. Check documentation in `REFACTORING_GUIDE.md`
2. Review example components
3. Consult utility function documentation

---

**Version:** 0.1.0  
**Last Updated:** December 8, 2025  
**Status:** Active Development