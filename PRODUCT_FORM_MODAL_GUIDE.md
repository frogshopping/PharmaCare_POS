# ProductFormModal - Add + Edit Combined Implementation Guide

## Overview
Combine `AddProductModal` and `EditProductModal` into a single `ProductFormModal` component that handles both create and update operations.

## Step 1: Rename the File
```bash
# In components/inventory/
Rename: AddProductModal.tsx → ProductFormModal.tsx
```

## Step 2: Update the Component Structure

### A. Update Imports
```tsx
import { CreateModalProps, EditModalProps, Medicine } from "@/lib/types"
```

### B. Update Component Props
```tsx
type ProductFormModalProps = (CreateModalProps | EditModalProps<Medicine>);

export function ProductFormModal(props: ProductFormModalProps) {
    const { isOpen, onClose, onSuccess } = props;
    const isEditMode = 'item' in props;
    const product = isEditMode ? props.item : null;
```

### C. Initialize Form with Product Data (for Edit Mode)
```tsx
const { formData, handleChange, handleReset, isSubmitting, setSubmitting } = useFormState({
    productName: product?.name || "",
    description: product?.description || "",
    power: product?.strength || "",
    generic: product?.genericName || "",
    manufacturer: product?.manufacture || "",
    supplier: product?.supplier || "",
    supplierPhone: product?.supplierContact || "",
    rack: product?.rackNo || "",
    stock: product?.inStock || 0,
    stockUnit: "unit" as "unit" | "strip" | "box",
    stockQuantity: product?.inStock || 0,
    productType: (product as any)?.type || "",
    
    // Packaging
    stripSize: (product as any)?.packSize?.strip || 0,
    boxSize: (product as any)?.packSize?.box || 0,
    
    // Buying prices
    buyingUnitPrice: product?.buyingPrice || 0,
    buyingStripPrice: 0,
    buyingBoxPrice: 0,
    
    // MRP & Discount
    mrpUnitPrice: product?.price || 0,
    discountPercent: 0,
    
    // Selling prices
    sellingUnitPrice: product?.price || 0,
    sellingStripPrice: (product as any)?.packPrice?.strip || 0,
    sellingBoxPrice: (product as any)?.packPrice?.box || 0,
})
```

### D. Update handleSubmit for Both Create and Update
```tsx
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.productName || !formData.sellingUnitPrice) {
        alert("Please fill in required fields: Product Name and Selling Price")
        return
    }

    setSubmitting(true)

    try {
        const payload = {
            name: formData.productName,
            description: formData.description,
            strength: formData.power,
            genericName: formData.generic,
            manufacture: formData.manufacturer,
            supplier: formData.supplier,
            supplierContact: formData.supplierPhone,
            rackNo: formData.rack,
            inStock: formData.stock,
            price: formData.sellingUnitPrice,
            buyingPrice: formData.buyingUnitPrice,
            type: formData.productType as any,
            ...(needsPackaging && {
                packSize: {
                    strip: formData.stripSize,
                    box: formData.boxSize || 0,
                },
                packPrice: {
                    strip: formData.sellingStripPrice,
                    box: formData.sellingBoxPrice,
                },
            }),
        };

        if (isEditMode && product) {
            await medicineService.update(product.id, payload);
        } else {
            await medicineService.create(payload);
        }

        onSuccess()
        onClose()
        handleReset()
    } catch (error) {
        console.error(`Failed to ${isEditMode ? 'update' : 'create'} product:`, error)
        alert(`Failed to ${isEditMode ? 'update' : 'create'} product. Please try again.`)
    } finally {
        setSubmitting(false)
    }
}
```

### E. Update Modal Title and Submit Button
```tsx
<FormModal
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    title={isEditMode ? "Edit Product" : "Add New Product"}
    icon={Package}
    submitText={isEditMode ? "Update Product" : "Save Product"}
    isSubmitting={isSubmitting}
    maxWidth="max-w-3xl"
>
```

## Step 3: Update Inventory Page

### A. Update Imports
```tsx
// REMOVE:
import { AddProductModal } from '@/components/inventory/AddProductModal';
import { EditProductModal } from '@/components/inventory/EditProductModal';

// ADD:
import { ProductFormModal } from '@/components/inventory/ProductFormModal';
```

### B. Update Usage for Add
```tsx
// BEFORE:
<AddProductModal
    isOpen={showAddModal}
    onClose={() => setShowAddModal(false)}
    onSuccess={handleProductAdded}
/>

// AFTER: (Same - no changes needed)
<ProductFormModal
    isOpen={showAddModal}
    onClose={() => setShowAddModal(false)}
    onSuccess={handleProductAdded}
/>
```

### C. Update Usage for Edit
```tsx
// BEFORE:
<EditProductModal
    isOpen={editingProduct !== null}
    onClose={() => setEditingProduct(null)}
    onSuccess={handleProductUpdated}
    product={editingProduct!}
/>

// AFTER:
<ProductFormModal
    isOpen={editingProduct !== null}
    onClose={() => setEditingProduct(null)}
    onSuccess={handleProductUpdated}
    item={editingProduct!}  // Changed from 'product' to 'item'
/>
```

## Step 4: Delete Old EditProductModal
```bash
# Delete the file:
components/inventory/EditProductModal.tsx
```

## Benefits
✅ Single source of truth for product form
✅ Consistent UI/UX for add and edit
✅ Less code duplication
✅ Easier to maintain
✅ All new features (MRP pricing, stock units, etc.) work for both add and edit

## Testing Checklist
- [ ] Can add new product
- [ ] Can edit existing product
- [ ] Form pre-fills correctly in edit mode
- [ ] Modal title changes correctly
- [ ] Submit button text changes correctly
- [ ] Both create and update API calls work
- [ ] Success callbacks trigger correctly
- [ ] All validation works in both modes
