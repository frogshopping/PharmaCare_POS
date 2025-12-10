"use client"

import * as React from "react"
import { FormModal } from "@/components/ui/FormModal"
import { FormField } from "@/components/ui/FormField"
import { Input } from "@/components/ui/Input"
import { CreatableSelect } from "@/components/ui/CreatableSelect"
import { Package, AlertCircle, Building2, ShoppingBag, DollarSign, Percent, Box } from "lucide-react"
import { useFormState } from "@/lib/hooks/useFormState"
import { medicineService, Rack, GenericName } from "@/services"
import { CreateModalProps, EditModalProps, Medicine, Category, Subcategory, ChildCategory } from "@/lib/types"

interface ProductType {
    id: number;
    name: string;
}

interface Manufacturer {
    id: number;
    name: string;
    suppliers: Supplier[];
}

interface Supplier {
    id: number;
    name: string;
    phone: string;
}

type ProductFormModalProps = (CreateModalProps | EditModalProps<Medicine>);

export function ProductFormModal(props: ProductFormModalProps) {
    const { isOpen, onClose, onSuccess } = props;
    const isEditMode = 'item' in props;
    const product = isEditMode ? props.item : null;

    const [racks, setRacks] = React.useState<Rack[]>([])
    const [generics, setGenerics] = React.useState<GenericName[]>([])
    const [productTypes, setProductTypes] = React.useState<ProductType[]>([
        { id: 1, name: 'Tablet' },
        { id: 2, name: 'Capsule' },
        { id: 3, name: 'Syrup' },
        { id: 4, name: 'Injection' },
        { id: 5, name: 'Suspension' },
        { id: 6, name: 'Cream' },
    ])
    const [manufacturers, setManufacturers] = React.useState<Manufacturer[]>([
        {
            id: 1,
            name: "Square Pharmaceuticals",
            suppliers: [
                { id: 1, name: "Mr. Rahman", phone: "+880 1711-223344" },
                { id: 2, name: "Ms. Sultana", phone: "+880 1811-334455" },
            ]
        },
        {
            id: 2,
            name: "Beximco Pharmaceuticals",
            suppliers: [
                { id: 3, name: "Mr. Khan", phone: "+880 1911-445566" },
            ]
        },
        {
            id: 3,
            name: "Renata Limited",
            suppliers: [
                { id: 4, name: "Ms. Akter", phone: "+880 1611-556677" },
                { id: 5, name: "Mr. Hossain", phone: "+880 1511-667788" },
            ]
        },
    ])

    const [selectedManufacturer, setSelectedManufacturer] = React.useState<Manufacturer | null>(null)
    const [availableSuppliers, setAvailableSuppliers] = React.useState<Supplier[]>([])
    const [selectedSupplier, setSelectedSupplier] = React.useState<Supplier | null>(null)

    // New State for Categories
    const [categories, setCategories] = React.useState<Category[]>([
        { id: '1', number: 1, name: 'Medicine', status: 'Active' },
        { id: '2', number: 2, name: 'Equipment', status: 'Active' },
    ])
    const [subCategories, setSubCategories] = React.useState<Subcategory[]>([])
    const [childCategories, setChildCategories] = React.useState<ChildCategory[]>([])

    // Handlers for Category Creation (Mock)
    const handleCreateCategory = (name: string) => {
        const newCat: Category = { id: Date.now().toString(), number: categories.length + 1, name, status: 'Active' }
        setCategories(prev => [...prev, newCat])
        handleChange('category', name)
    }

    const handleCreateSubCategory = (name: string) => {
        const newSub: Subcategory = { id: Date.now().toString(), number: subCategories.length + 1, name, categoryName: formData.category, status: 'Active' }
        setSubCategories(prev => [...prev, newSub])
        handleChange('subCategory', name)
    }

    const handleCreateChildCategory = (name: string) => {
        const newChild: ChildCategory = { id: Date.now().toString(), number: childCategories.length + 1, name, subcategory: formData.subCategory, status: 'Active' }
        setChildCategories(prev => [...prev, newChild])
        handleChange('childCategory', name)
    }

    const { formData, handleChange, handleReset, isSubmitting, setSubmitting } = useFormState({
        productName: product?.name || "",
        description: product?.description || "",
        power: product?.strength || "",
        generic: product?.genericName || "",
        manufacturer: product?.manufacture || "",
        supplier: product?.supplier || "",
        supplierPhone: product?.supplierContact || "",
        rack: product?.rackNo || product?.rackLocation || "",
        stock: product?.inStock || 0,
        stockUnit: "unit" as "unit" | "strip" | "box",
        stockQuantity: product?.inStock || 0,
        productType: product?.type || "",

        // Packaging (defined once)
        stripSize: product?.packSize?.strip || 0,
        boxSize: product?.packSize?.box || 0,

        // Buying prices
        buyingUnitPrice: product?.buyingPrice || 0,
        buyingStripPrice: 0,
        buyingBoxPrice: 0,

        // MRP & Discount - use stored MRP if available, otherwise use selling price
        mrpUnitPrice: product?.mrp || product?.price || 0,
        discountPercent: product?.discount || 0,

        // Selling prices (auto-calculated)
        sellingUnitPrice: product?.price || 0,
        sellingStripPrice: product?.packPrice?.strip || 0,
        sellingBoxPrice: product?.packPrice?.box || 0,

        // New Fields
        productCode: product?.productCode || "", // Auto-generate if empty
        category: product?.category || "",
        subCategory: product?.subCategory || "",
        childCategory: product?.childCategory || "",
        stockAlert: product?.stockAlert || 10,
        vat: product?.vat || 0,
        infoStatus: product?.status || 'Active',
        isEcommerce: product?.eCommerceProduct || false,
    })

    const needsPackaging = formData.productType === 'Tablet' || formData.productType === 'Capsule';

    // Calculate total units based on stock unit selection
    const calculateTotalUnits = () => {
        if (!needsPackaging) return formData.stock;

        const qty = formData.stockQuantity || 0;

        switch (formData.stockUnit) {
            case 'box':
                return qty * (formData.boxSize || 0) * (formData.stripSize || 1);
            case 'strip':
                return qty * (formData.stripSize || 1);
            case 'unit':
            default:
                return qty;
        }
    };

    // Auto-update stock when stockQuantity or stockUnit changes
    React.useEffect(() => {
        if (needsPackaging) {
            handleChange('stock', calculateTotalUnits());
        }
    }, [formData.stockQuantity, formData.stockUnit, formData.stripSize, formData.boxSize, needsPackaging]);

    // Auto-calculate buying strip and box prices
    React.useEffect(() => {
        if (needsPackaging && formData.buyingUnitPrice && formData.stripSize) {
            const stripPrice = formData.buyingUnitPrice * formData.stripSize;
            handleChange('buyingStripPrice', parseFloat(stripPrice.toFixed(2)));

            if (formData.boxSize) {
                const boxPrice = stripPrice * formData.boxSize;
                handleChange('buyingBoxPrice', parseFloat(boxPrice.toFixed(2)));
            }
        }
    }, [formData.buyingUnitPrice, formData.stripSize, formData.boxSize, needsPackaging]);

    // Auto-calculate selling prices from MRP and discount
    React.useEffect(() => {
        if (formData.mrpUnitPrice) {
            const discountAmount = (formData.mrpUnitPrice * formData.discountPercent) / 100;
            const sellingUnit = formData.mrpUnitPrice - discountAmount;
            handleChange('sellingUnitPrice', parseFloat(sellingUnit.toFixed(2)));

            if (needsPackaging && formData.stripSize) {
                const sellingStrip = sellingUnit * formData.stripSize;
                handleChange('sellingStripPrice', parseFloat(sellingStrip.toFixed(2)));

                if (formData.boxSize) {
                    const sellingBox = sellingStrip * formData.boxSize;
                    handleChange('sellingBoxPrice', parseFloat(sellingBox.toFixed(2)));
                }
            }
        }
    }, [formData.mrpUnitPrice, formData.discountPercent, formData.stripSize, formData.boxSize, needsPackaging]);

    // Fetch racks and generics, and prefill manufacturer/supplier for edit mode
    React.useEffect(() => {
        if (isOpen) {
            Promise.all([
                medicineService.getRacks(),
                medicineService.getGenerics()
            ]).then(([racksData, genericsData]) => {
                setRacks(racksData)
                setGenerics(genericsData)
            })

            // In edit mode, set up manufacturer and supplier relationships
            if (isEditMode && product) {
                const manufacturer = manufacturers.find(m => m.name === product.manufacture);
                if (manufacturer) {
                    setSelectedManufacturer(manufacturer);
                    setAvailableSuppliers(manufacturer.suppliers);
                    const supplier = manufacturer.suppliers.find(s => s.name === product.supplier);
                    if (supplier) {
                        setSelectedSupplier(supplier);
                    }
                } else if (product.manufacture) {
                    // Manufacturer not in list - add it dynamically
                    const newManufacturer: Manufacturer = {
                        id: Date.now(),
                        name: product.manufacture,
                        suppliers: product.supplier ? [{
                            id: Date.now(),
                            name: product.supplier,
                            phone: product.supplierContact || ''
                        }] : []
                    };
                    setManufacturers(prev => [...prev, newManufacturer]);
                    setSelectedManufacturer(newManufacturer);
                    setAvailableSuppliers(newManufacturer.suppliers);
                    if (newManufacturer.suppliers.length > 0) {
                        setSelectedSupplier(newManufacturer.suppliers[0]!);
                    }
                }
            }
        }
    }, [isOpen, isEditMode, product])

    const handleManufacturerChange = (name: string) => {
        handleChange('manufacturer', name);
        const manufacturer = manufacturers.find(m => m.name === name);
        setSelectedManufacturer(manufacturer || null);
        setAvailableSuppliers(manufacturer?.suppliers || []);

        handleChange('supplier', '');
        handleChange('supplierPhone', '');
        setSelectedSupplier(null);
    }

    const handleSupplierChange = (name: string) => {
        handleChange('supplier', name);
        const supplier = availableSuppliers.find(s => s.name === name);
        setSelectedSupplier(supplier || null);

        if (supplier) {
            handleChange('supplierPhone', supplier.phone);
        } else {
            handleChange('supplierPhone', '');
        }
    }

    const handleCreateManufacturer = (name: string) => {
        const newManufacturer: Manufacturer = {
            id: Date.now(),
            name,
            suppliers: []
        };
        setManufacturers(prev => [...prev, newManufacturer]);
        handleManufacturerChange(name);
    }

    const handleCreateSupplier = (name: string) => {
        if (!selectedManufacturer) {
            alert("Please select a manufacturer first");
            return;
        }

        const newSupplier: Supplier = {
            id: Date.now(),
            name,
            phone: ""
        };

        setManufacturers(prev => prev.map(m =>
            m.id === selectedManufacturer.id
                ? { ...m, suppliers: [...m.suppliers, newSupplier] }
                : m
        ));

        setAvailableSuppliers(prev => [...prev, newSupplier]);
        handleSupplierChange(name);
    }

    const handleCreateProductType = (name: string) => {
        const newType: ProductType = {
            id: Date.now(),
            name
        };
        setProductTypes(prev => [...prev, newType]);
        handleChange('productType', name);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.productName || !formData.sellingUnitPrice) {
            alert("Please fill in required fields: Product Name and Selling Price")
            return
        }

        if (needsPackaging && !formData.stripSize) {
            alert("Please define strip size for tablets/capsules")
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
                rackLocation: formData.rack, // Also set rackLocation for display consistency
                inStock: formData.stock,
                price: formData.sellingUnitPrice,
                mrp: formData.mrpUnitPrice, // Store MRP
                discount: formData.discountPercent, // Store discount
                buyingPrice: formData.buyingUnitPrice,
                type: formData.productType as any,
                stockStatus: formData.stock === 0 ? 'Low Stock' as const : formData.stock < 20 ? 'Stock Alert' as const : 'Normal' as const,
                // New Fields Mapping
                productCode: formData.productCode || `P-${Date.now()}`,
                category: formData.category,
                subCategory: formData.subCategory,
                childCategory: formData.childCategory,
                stockAlert: formData.stockAlert,
                vat: formData.vat,
                status: formData.infoStatus as 'Active' | 'Inactive',
                eCommerceProduct: formData.isEcommerce,
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

    const handleCreateRack = (name: string) => {
        const newRack = { id: Date.now(), name }
        setRacks(prev => [...prev, newRack])
        handleChange('rack', name)
    }

    const handleCreateGeneric = (name: string) => {
        const newGeneric = { id: Date.now(), name }
        setGenerics(prev => [...prev, newGeneric])
        handleChange('generic', name)
    }

    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title={isEditMode ? "Edit Product" : "Add New Product"}
            icon={Package}
            submitText={isEditMode ? "Update Product" : "Save Product"}
            isSubmitting={isSubmitting}
            maxWidth="max-w-7xl"
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">

                {/* COLUMN 1: Basic Info & Classification */}
                <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <Package size={16} className="text-slate-500" />
                            Basic Details
                        </h4>
                        <div className="space-y-3">
                            <FormField label="Product Name" required>
                                <Input
                                    placeholder="e.g. Paracetamol"
                                    value={formData.productName}
                                    onChange={e => handleChange('productName', e.target.value)}
                                    required
                                />
                            </FormField>

                            <FormField label="Product Code/Reference Code (Auto-generated if blank)">
                                <Input
                                    placeholder="e.g. SKU-12345"
                                    value={formData.productCode}
                                    onChange={e => handleChange('productCode', e.target.value)}
                                />
                            </FormField>

                            <div className="grid grid-cols-2 gap-3">
                                <FormField label="Type" required>
                                    <CreatableSelect
                                        options={productTypes}
                                        value={formData.productType}
                                        onChange={opt => handleChange('productType', opt.name)}
                                        onCreate={handleCreateProductType}
                                        placeholder="Type..."
                                    />
                                </FormField>
                                <FormField label="Strength">
                                    <Input
                                        placeholder="500mg"
                                        value={formData.power}
                                        onChange={e => handleChange('power', e.target.value)}
                                    />
                                </FormField>
                            </div>

                            <FormField label="Generic Name">
                                <CreatableSelect
                                    options={generics}
                                    value={formData.generic}
                                    onChange={opt => handleChange('generic', opt.name)}
                                    onCreate={handleCreateGeneric}
                                    placeholder="Select generic..."
                                />
                            </FormField>

                            <FormField label="Category">
                                <CreatableSelect
                                    options={categories}
                                    value={formData.category}
                                    onChange={opt => handleChange('category', opt.name)}
                                    onCreate={handleCreateCategory}
                                    placeholder="Select Category..."
                                />
                            </FormField>

                            <div className="grid grid-cols-2 gap-3">
                                <FormField label="Sub Category (Optional)">
                                    <CreatableSelect
                                        options={subCategories}
                                        value={formData.subCategory}
                                        onChange={opt => handleChange('subCategory', opt.name)}
                                        onCreate={handleCreateSubCategory}
                                        placeholder="Select..."
                                    />
                                </FormField>
                                <FormField label="Child Category (Optional)">
                                    <CreatableSelect
                                        options={childCategories}
                                        value={formData.childCategory}
                                        onChange={opt => handleChange('childCategory', opt.name)}
                                        onCreate={handleCreateChildCategory}
                                        placeholder="Select..."
                                    />
                                </FormField>
                            </div>

                            <FormField label="Description">
                                <textarea
                                    className="w-full min-h-[60px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm resize-none"
                                    placeholder="Details..."
                                    value={formData.description}
                                    onChange={e => handleChange('description', e.target.value)}
                                    rows={2}
                                />
                            </FormField>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <AlertCircle size={16} className="text-blue-500" />
                            Storage & Location
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                            <FormField label="Rack / Location">
                                <CreatableSelect
                                    options={racks}
                                    value={formData.rack}
                                    onChange={opt => handleChange('rack', opt.name)}
                                    onCreate={handleCreateRack}
                                    placeholder="Select rack..."
                                />
                            </FormField>
                        </div>
                    </div>
                </div>

                {/* COLUMN 2: Sourcing, Stock & Packaging */}
                <div className="space-y-4">
                    {/* Manufacturer & Supplier Section */}
                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                        <h4 className="text-sm font-bold text-purple-900 mb-3 flex items-center gap-2">
                            <Building2 size={16} className="text-purple-600" />
                            Sourcing
                        </h4>
                        <div className="space-y-3">
                            <FormField label="Manufacturer" required>
                                <CreatableSelect
                                    options={manufacturers.map(m => ({ id: m.id, name: m.name }))}
                                    value={formData.manufacturer}
                                    onChange={opt => handleManufacturerChange(opt.name)}
                                    onCreate={handleCreateManufacturer}
                                    placeholder="Select..."
                                />
                            </FormField>

                            <div className="grid grid-cols-2 gap-3">
                                <FormField
                                    label="Supplier"
                                    hint={!formData.manufacturer ? "Select mfr first" : undefined}
                                >
                                    <CreatableSelect
                                        options={availableSuppliers.map(s => ({ id: s.id, name: s.name }))}
                                        value={formData.supplier}
                                        onChange={opt => handleSupplierChange(opt.name)}
                                        onCreate={handleCreateSupplier}
                                        placeholder="Supplier..."
                                    />
                                </FormField>

                                <FormField label="Phone">
                                    <Input
                                        placeholder="Phone"
                                        value={formData.supplierPhone}
                                        onChange={e => handleChange('supplierPhone', e.target.value)}
                                        readOnly={!!selectedSupplier}
                                    />
                                </FormField>
                            </div>
                        </div>
                    </div>

                    {/* Initial Stock */}
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <h4 className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
                            <Box size={16} className="text-blue-600" />
                            Stock & Packaging
                        </h4>

                        <div className="space-y-3">
                            {/* Packaging Configuration */}
                            {needsPackaging && (
                                <div className="grid grid-cols-2 gap-3 pb-3 border-b border-blue-200/50">
                                    <FormField label="Strip Size" required hint="Units/strip">
                                        <Input
                                            type="number"
                                            placeholder="10"
                                            min="1"
                                            value={formData.stripSize || ''}
                                            onChange={e => handleChange('stripSize', parseInt(e.target.value))}
                                            required
                                        />
                                    </FormField>

                                    <FormField label="Box Size" hint="Strips/box">
                                        <Input
                                            type="number"
                                            placeholder="10"
                                            min="0"
                                            value={formData.boxSize || ''}
                                            onChange={e => handleChange('boxSize', parseInt(e.target.value))}
                                        />
                                    </FormField>
                                </div>
                            )}

                            {/* Initial Stock Input */}
                            {needsPackaging ? (
                                <FormField label="Initial Stock" required>
                                    <div className="grid grid-cols-3 gap-2">
                                        <Input
                                            type="number"
                                            placeholder="Qty"
                                            min="0"
                                            value={formData.stockQuantity || ''}
                                            onChange={e => handleChange('stockQuantity', parseInt(e.target.value))}
                                            className="col-span-1"
                                        />
                                        <select
                                            className="col-span-1 rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500/20"
                                            value={formData.stockUnit}
                                            onChange={e => handleChange('stockUnit', e.target.value as "unit" | "strip" | "box")}
                                        >
                                            <option value="unit">Units</option>
                                            <option value="strip">Strips</option>
                                            <option value="box">Boxes</option>
                                        </select>
                                        <div className="col-span-1 relative">
                                            <div className="flex items-center justify-center h-full px-2 bg-blue-100 rounded text-blue-800 font-bold text-sm">
                                                {calculateTotalUnits()} <span className="text-[10px] ml-1 font-normal">total</span>
                                            </div>
                                        </div>
                                    </div>
                                </FormField>
                            ) : (
                                <FormField label="Initial Stock">
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        min="0"
                                        value={formData.stock || ''}
                                        onChange={e => handleChange('stock', parseInt(e.target.value))}
                                    />
                                </FormField>
                            )}

                            <FormField label="Stock Alert Level">
                                <Input
                                    type="number"
                                    placeholder="10"
                                    value={formData.stockAlert || ''}
                                    onChange={e => handleChange('stockAlert', parseInt(e.target.value))}
                                />
                            </FormField>
                        </div>
                    </div>
                </div>

                {/* COLUMN 3: Pricing */}
                <div className="bg-green-50 p-4 rounded-xl border border-green-100 h-fit">
                    <h4 className="text-sm font-bold text-green-900 mb-3 flex items-center gap-2">
                        <DollarSign size={16} className="text-green-600" />
                        Pricing Strategy
                    </h4>

                    <div className="space-y-4">
                        {/* Buying Price */}
                        <div className="bg-white p-3 rounded-lg border border-green-200">
                            <p className="text-xs font-bold text-green-800 mb-2 flex items-center gap-1">
                                <ShoppingBag size={12} />
                                Cost (Buying)
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <FormField label="Unit Cost">
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        step="0.01"
                                        value={formData.buyingUnitPrice || ''}
                                        onChange={e => handleChange('buyingUnitPrice', parseFloat(e.target.value))}
                                    />
                                </FormField>
                                {needsPackaging && formData.stripSize > 0 && (
                                    <FormField label="Strip Cost" hint="Calc">
                                        <Input
                                            type="number"
                                            value={formData.buyingStripPrice || ''}
                                            readOnly
                                            className="bg-slate-50 text-slate-600"
                                        />
                                    </FormField>
                                )}
                            </div>
                        </div>

                        {/* MRP & Discount */}
                        <div className="bg-white p-3 rounded-lg border border-green-200">
                            <p className="text-xs font-bold text-green-800 mb-2 flex items-center gap-1">
                                <Package size={12} />
                                MRP Setting
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <FormField label="MRP (Unit)" required>
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        step="0.01"
                                        value={formData.mrpUnitPrice || ''}
                                        onChange={e => handleChange('mrpUnitPrice', parseFloat(e.target.value))}
                                        required
                                    />
                                </FormField>

                                <FormField label="Discount %">
                                    <div className="relative">
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            max="100"
                                            value={formData.discountPercent || ''}
                                            onChange={e => handleChange('discountPercent', parseFloat(e.target.value))}
                                            className="pr-6"
                                        />
                                        <Percent size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
                                    </div>
                                </FormField>
                                <FormField label="VAT %">
                                    <div className="relative">
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            value={formData.vat || ''}
                                            onChange={e => handleChange('vat', parseFloat(e.target.value))}
                                            className="pr-6"
                                        />
                                        <Percent size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
                                    </div>
                                </FormField>
                            </div>
                        </div>

                        {/* Selling Price Summary */}
                        <div className="bg-emerald-100/50 p-3 rounded-lg border border-emerald-200">
                            <p className="text-xs font-bold text-emerald-900 mb-2">Selling Price (Final)</p>
                            <div className="grid grid-cols-1 gap-2">
                                <div className="flex justify-between items-center bg-white p-2 rounded border border-emerald-100">
                                    <span className="text-xs text-slate-600">Per Unit</span>
                                    <span className="font-bold text-emerald-700">BDT {formData.sellingUnitPrice.toFixed(2)}</span>
                                </div>
                                {needsPackaging && formData.stripSize > 0 && (
                                    <div className="flex justify-between items-center bg-white p-2 rounded border border-emerald-100">
                                        <span className="text-xs text-slate-600">Per Strip</span>
                                        <span className="font-bold text-emerald-700">BDT {formData.sellingStripPrice.toFixed(2)}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="pt-2 border-t border-green-200 mt-4">
                        <div className="flex items-center justify-between gap-4">
                            <FormField label="Status" className="flex-1">
                                <select
                                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20"
                                    value={formData.infoStatus}
                                    onChange={e => handleChange('infoStatus', e.target.value)}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </FormField>
                            <div className="flex items-center pt-6">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                        checked={formData.isEcommerce}
                                        onChange={e => handleChange('isEcommerce', e.target.checked)}
                                    />
                                    eCommerce Product?
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FormModal>
    )
}
