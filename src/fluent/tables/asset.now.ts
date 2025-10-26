import '@servicenow/sdk/global'
import { Table, StringColumn, ChoiceColumn, DateColumn, ReferenceColumn, DecimalColumn, BooleanColumn } from '@servicenow/sdk/core'

// Asset tracking table with comprehensive fields for managing assets
export const x_1397622_asset_tr_asset = Table({
  name: 'x_1397622_asset_tr_asset',
  label: 'Asset',
  schema: {
    asset_tag: StringColumn({ 
      label: 'Asset Tag', 
      maxLength: 40,
      mandatory: true
    }),
    name: StringColumn({ 
      label: 'Asset Name', 
      maxLength: 100,
      mandatory: true 
    }),
    description: StringColumn({ 
      label: 'Description', 
      maxLength: 500 
    }),
    category: ChoiceColumn({
      label: 'Category',
      choices: {
        hardware: { label: 'Hardware', sequence: 0 },
        software: { label: 'Software', sequence: 1 },
        furniture: { label: 'Furniture', sequence: 2 },
        equipment: { label: 'Equipment', sequence: 3 },
        vehicle: { label: 'Vehicle', sequence: 4 }
      },
      dropdown: 'dropdown_with_none'
    }),
    status: ChoiceColumn({
      label: 'Status',
      choices: {
        available: { label: 'Available', sequence: 0 },
        in_use: { label: 'In Use', sequence: 1 },
        maintenance: { label: 'Maintenance', sequence: 2 },
        retired: { label: 'Retired', sequence: 3 },
        lost: { label: 'Lost', sequence: 4 }
      },
      dropdown: 'dropdown_with_none',
      default: 'available'
    }),
    assigned_to: ReferenceColumn({
      label: 'Assigned To',
      referenceTable: 'sys_user'
    }),
    location: StringColumn({ 
      label: 'Location', 
      maxLength: 100 
    }),
    serial_number: StringColumn({ 
      label: 'Serial Number', 
      maxLength: 100 
    }),
    model: StringColumn({ 
      label: 'Model', 
      maxLength: 100 
    }),
    manufacturer: StringColumn({ 
      label: 'Manufacturer', 
      maxLength: 100 
    }),
    purchase_date: DateColumn({ 
      label: 'Purchase Date' 
    }),
    purchase_price: DecimalColumn({ 
      label: 'Purchase Price' 
    }),
    warranty_expiry: DateColumn({ 
      label: 'Warranty Expiry' 
    }),
    is_critical: BooleanColumn({ 
      label: 'Critical Asset',
      default: false
    }),
    notes: StringColumn({ 
      label: 'Notes', 
      maxLength: 1000 
    })
  },
  display: 'name',
  accessible_from: 'public',
  actions: ['create', 'read', 'update', 'delete'],
  allow_web_service_access: true
})