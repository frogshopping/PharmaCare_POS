# Get Rack Medicines Endpoint

## Endpoint
```
GET /api/inventory/racks/medicines
```

## Description
Retrieves all racks with their associated medicines. Each rack includes basic rack information (id, name, location) and a list of medicines belonging to that rack with simplified details.

## Response Format
The response contains a `data` array with all racks and their medicines, plus a `total_racks` count:

```json
{
  "data": [
    {
      "rack": {
        "id": 1,
        "name": "Rack A1",
        "location": "Floor 1"
      },
      "medicines": [
        {
          "id": 1,
          "srl_no": 1,
          "code": "MED001",
          "medicine_name": "Paracetamol Tablet",
          "generic_name": "Paracetamol",
          "strength": "500mg",
          "price": 10.50,
          "stock": 500
        },
        {
          "id": 2,
          "srl_no": 2,
          "code": "MED002",
          "medicine_name": "Amoxicillin Capsule",
          "generic_name": "Amoxicillin",
          "strength": "250mg",
          "price": 25.00,
          "stock": 300
        }
      ],
      "total_medicines": 2
    },
    {
      "rack": {
        "id": 2,
        "name": "Rack B1",
        "location": "Floor 2"
      },
      "medicines": [
        {
          "id": 3,
          "srl_no": 1,
          "code": "MED003",
          "medicine_name": "Ibuprofen Tablet",
          "generic_name": "Ibuprofen",
          "strength": "400mg",
          "price": 15.00,
          "stock": 200
        }
      ],
      "total_medicines": 1
    }
  ],
  "total_racks": 2
}
```

## Response Fields

### Rack Object
- `id` (integer): Rack ID
- `name` (string): Rack name/number
- `location` (string): Rack location

### Medicine Item Object
- `id` (integer): Medicine primary key ID (can be used to call GET /api/inventory/medicines/{id})
- `srl_no` (integer): Serial number (index) within the rack's medicine list
- `code` (string): Medicine product code
- `medicine_name` (string): Full medicine name
- `generic_name` (string): Generic/scientific name
- `strength` (string): Medicine strength (e.g., "500mg", "10ml")
- `price` (float): Unit price
- `stock` (integer): Available stock quantity

### Top Level
- `data` (array): Array of rack objects with their medicines
- `total_racks` (integer): Total number of racks returned

## Behavior Notes
- Empty racks (racks with no medicines) are included in the response with an empty `medicines` array
- Medicines are sorted alphabetically by name within each rack
- Only non-deleted products are included
- Only non-deleted racks are included

## Error Response (500 - Server Error)
```json
{
  "success": false,
  "error": "error message here"
}
```

## Example Usage

### Using curl
```bash
curl http://localhost:8080/api/inventory/racks/medicines
```

### Using JavaScript fetch
```javascript
const getRackMedicines = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/inventory/racks/medicines');
    const result = await response.json();
    
    if (response.ok) {
      console.log('Total racks:', result.total_racks);
      
      result.data.forEach(rackData => {
        console.log(`\nRack: ${rackData.rack.name} (${rackData.rack.location})`);
        console.log(`Medicines: ${rackData.total_medicines}`);
        
        rackData.medicines.forEach(medicine => {
          console.log(`  - ${medicine.medicine_name} (${medicine.strength}) - Stock: ${medicine.stock}`);
        });
      });
      
      return result.data;
    } else {
      console.error('Error:', result.error);
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Failed to fetch rack medicines:', error);
    throw error;
  }
};

// Usage
getRackMedicines().then(racks => {
  console.log('Loaded racks:', racks.length);
});
```

### Using JavaScript fetch - Display in table
```javascript
const displayRackMedicines = async () => {
  const result = await fetch('http://localhost:8080/api/inventory/racks/medicines')
    .then(res => res.json());
  
  result.data.forEach(rackData => {
    console.log(`\n=== ${rackData.rack.name} ===`);
    console.log('# | Code | Medicine Name | Generic Name | Strength | Price | Stock');
    console.log('--|------|---------------|--------------|----------|-------|------');
    
    rackData.medicines.forEach(med => {
      console.log(
        `${med.srl_no} | ${med.code} | ${med.medicine_name} | ` +
        `${med.generic_name} | ${med.strength} | $${med.price} | ${med.stock}`
      );
    });
  });
};
```

## Use Cases
1. **Inventory Overview**: Display all medicines organized by their rack locations
2. **Stock Management**: Quick view of what's in each rack for physical inventory checking
3. **Warehouse Navigation**: Help staff locate medicines by rack
4. **Reports**: Generate rack-wise stock reports
5. **Dashboard**: Display rack occupancy and medicine distribution

## Related Endpoints
- `GET /api/inventory/racks` - Get list of all racks (without medicines)
- `GET /api/inventory/medicines` - Get all medicines (with full details)
- `GET /api/inventory/medicines/{id}` - Get specific medicine details
- `POST /api/inventory/racks` - Create a new rack
