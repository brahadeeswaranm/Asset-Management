# Asset Tracker - Unit Test Suite

This document describes the comprehensive unit testing strategy for the Asset Tracker ServiceNow application.

## 🧪 Test Coverage Overview

### **JavaScript/React Unit Tests (Jest + React Testing Library)**

#### **1. AssetService Tests** (`src/test/services/AssetService.test.js`)
- **API Integration Testing:**
  - ✅ Constructor initialization
  - ✅ GET `/api/now/table/x_1397622_asset_tr_asset` - List assets with filters
  - ✅ POST `/api/now/table/x_1397622_asset_tr_asset` - Create asset
  - ✅ PATCH `/api/now/table/x_1397622_asset_tr_asset/{sys_id}` - Update asset
  - ✅ DELETE `/api/now/table/x_1397622_asset_tr_asset/{sys_id}` - Delete asset
  - ✅ GET `/api/now/table/x_1397622_asset_tr_asset/{sys_id}` - Get single asset
- **Error Handling:**
  - ✅ Network failures
  - ✅ HTTP error responses (4xx, 5xx)
  - ✅ JSON parsing errors
  - ✅ ServiceNow API error messages

#### **2. AssetFilter Component Tests** (`src/test/components/AssetFilter.test.js`)
- **Rendering:**
  - ✅ All filter elements render correctly
  - ✅ Default values are set properly
  - ✅ All dropdown options are present
- **User Interactions:**
  - ✅ Search input changes trigger onFilter callback
  - ✅ Status dropdown changes trigger onFilter callback
  - ✅ Category dropdown changes trigger onFilter callback
  - ✅ Reset button clears all filters
- **State Management:**
  - ✅ Filter state is maintained correctly
  - ✅ Multiple filters work together

#### **3. AssetItem Component Tests** (`src/test/components/AssetItem.test.js`)
- **Rendering:**
  - ✅ Asset information displays correctly (object vs primitive values)
  - ✅ Critical badge shows/hides appropriately
  - ✅ Status badges have correct CSS classes
  - ✅ Missing values display as dashes
- **User Interactions:**
  - ✅ Edit button calls onEdit with asset data
  - ✅ Row expansion shows/hides details
  - ✅ Delete confirmation and execution
  - ✅ Delete cancellation handling
- **ServiceNow Field Extraction:**
  - ✅ Handles object field values (`{display_value, value}`)
  - ✅ Handles primitive field values
  - ✅ Extracts sys_id correctly for API calls
- **Error Handling:**
  - ✅ Delete operation failures
  - ✅ Loading states during operations

#### **4. AssetForm Component Tests** (`src/test/components/AssetForm.test.js`)
- **Rendering:**
  - ✅ Create mode vs Edit mode rendering
  - ✅ Form field population for editing
  - ✅ All dropdown options available
- **Form Validation:**
  - ✅ Required field validation
  - ✅ Field value constraints
- **User Interactions:**
  - ✅ Form input handling
  - ✅ Checkbox interactions
  - ✅ Form submission (create/update)
  - ✅ Cancel and close operations
- **ServiceNow Integration:**
  - ✅ Field extraction for editing
  - ✅ API call formatting
- **Error States:**
  - ✅ Creation/update failures
  - ✅ Loading states during save

### **ServiceNow ATF (Automated Test Framework) Tests**

#### **1. Asset CRUD Test** (`src/fluent/tests/asset-crud-test.now.ts`)
- **Form Operations:**
  - ✅ Open new asset form
  - ✅ Set field values with all mandatory fields
  - ✅ Validate field states (mandatory, visible, read-only)
  - ✅ Form submission and validation
  - ✅ Open existing record for editing
  - ✅ Update field values
- **Server Operations:**
  - ✅ Server-side record validation
  - ✅ Server-side record updates
  - ✅ Record queries with complex conditions
  - ✅ Record deletion and cleanup
- **Business Logic Testing:**
  - ✅ Asset status transitions
  - ✅ Critical asset flag handling
  - ✅ Date field validations
  - ✅ Choice field validations (category, status)

#### **2. Navigation Test** (`src/fluent/tests/asset-navigation-test.now.ts`)
- **Application Navigator:**
  - ✅ Application menu visibility verification
  - ✅ Module visibility in navigation
  - ✅ Navigation to React UI page
  - ✅ Navigation to table views
  - ✅ Navigation to form creation
- **Integration Testing:**
  - ✅ Form accessibility after navigation
  - ✅ Field state validation post-navigation
  - ✅ Cross-module functionality
- **UI Integration:**
  - ✅ React UI page accessibility
  - ✅ ServiceNow table integration
  - ✅ Form-to-navigation workflow

## 🚀 Running Tests

### **JavaScript Unit Tests:**
```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage report
npm run test:coverage
```

### **ServiceNow ATF Tests:**
1. **Deploy the application** with ATF tests included
2. **Navigate to** `System Applications > Automated Test Framework > Tests`
3. **Find and run** the following tests:
   - `Asset Tracker - CRUD Operations Test`
   - `Asset Tracker - Navigation Test`

## 📊 Test Strategy

### **Component Testing (Unit Level):**
- **Isolated testing** of React components with mocked dependencies
- **ServiceNow field extraction patterns** thoroughly tested
- **Error handling** for all API operations
- **User interaction simulation** with realistic scenarios

### **Integration Testing (ATF Level):**
- **End-to-end workflows** through ServiceNow UI
- **Cross-component integration** testing
- **ServiceNow platform integration** validation
- **Navigation and application menu** functionality

### **Coverage Goals:**
- **90%+ code coverage** for service layer
- **85%+ component coverage** for React components
- **Critical user paths** covered by ATF tests
- **Error scenarios** comprehensively tested

## 🔧 Test Configuration

### **Jest Configuration:**
```json
{
  "testEnvironment": "jsdom",
  "setupFilesAfterEnv": ["<rootDir>/src/test/setupTests.js"],
  "moduleNameMapping": {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  }
}
```

### **Mocked ServiceNow Globals:**
- `window.g_ck` - User authentication token
- `fetch` - API calls with comprehensive scenarios
- `console` methods - Reduced test noise

### **Testing Libraries:**
- **Jest** - Test framework and assertions
- **React Testing Library** - Component testing utilities
- **@testing-library/user-event** - User interaction simulation
- **@testing-library/jest-dom** - DOM-specific matchers

## 🎯 Key Testing Patterns

### **ServiceNow Field Extraction Testing:**
```javascript
// Test both object and primitive field values
const mockAssetObject = {
  name: { display_value: 'Laptop', value: 'laptop_id' }
};
const mockAssetPrimitive = {
  name: 'Laptop'
};
// Verify component handles both correctly
```

### **API Error Handling:**
```javascript
// Test various error scenarios
fetch.mockResolvedValueOnce({
  ok: false,
  status: 400,
  json: async () => ({ error: { message: 'Validation failed' } })
});
```

### **User Interaction Testing:**
```javascript
// Simulate realistic user workflows
await user.type(searchInput, 'laptop');
await user.selectOptions(statusSelect, 'available');
await user.click(submitButton);
```

## 📈 Quality Metrics

- **95% Pass Rate** target for all tests
- **Sub-second execution** for unit tests
- **Automated CI/CD integration** ready
- **Comprehensive error scenario coverage**
- **Real-world usage pattern validation**

This comprehensive test suite ensures the Asset Tracker application is robust, reliable, and ready for production deployment in ServiceNow environments.