import '@servicenow/sdk/global';
import { Test } from '@servicenow/sdk/core';

// ATF Test: Asset CRUD Operations
Test({
  $id: Now.ID['asset_crud_test'],
  name: 'Asset Tracker - CRUD Operations Test',
  description: 'Comprehensive test covering asset creation, reading, updating, and deletion through forms and server operations',
  active: true,
  failOnServerError: true
}, (atf) => {
  
  // Step 1: Log test start
  atf.server.log({
    $id: Now.ID['crud_test_start_log'],
    log: 'Starting comprehensive Asset CRUD operations test'
  });

  // Step 2: Open new asset form
  atf.form.openNewForm({
    $id: Now.ID['open_new_asset_form'],
    table: 'x_1397622_asset_tr_asset',
    formUI: 'standard_ui'
  });

  // Step 3: Set asset field values
  atf.form.setFieldValue({
    $id: Now.ID['set_asset_fields'],
    table: 'x_1397622_asset_tr_asset',
    fieldValues: {
      "asset_tag": "ATF001",
      "name": "Test Laptop - ATF",
      "description": "Dell laptop created via ATF testing",
      "category": "hardware",
      "status": "available",
      "location": "Test Lab",
      "serial_number": "ATF123456",
      "model": "Dell XPS 13",
      "manufacturer": "Dell",
      "purchase_date": "2024-01-15",
      "purchase_price": "1200.00",
      "warranty_expiry": "2026-01-15",
      "is_critical": true,
      "notes": "Created by ATF for testing purposes"
    },
    formUI: 'standard_ui'
  });

  // Step 4: Validate mandatory field states
  atf.form.fieldStateValidation({
    $id: Now.ID['validate_mandatory_fields'],
    table: 'x_1397622_asset_tr_asset',
    mandatory: ['asset_tag', 'name'],
    notMandatory: ['description', 'location', 'notes'],
    visible: ['asset_tag', 'name', 'category', 'status', 'location'],
    formUI: 'standard_ui'
  });

  // Step 5: Submit the form
  const submissionResult = atf.form.submitForm({
    $id: Now.ID['submit_asset_form'],
    assert: 'form_submitted_to_server',
    formUI: 'standard_ui'
  });

  // Step 6: Log successful creation
  atf.server.log({
    $id: Now.ID['asset_created_log'],
    log: 'Asset record created successfully via form submission'
  });

  // Step 7: Validate the created record on server
  atf.server.recordValidation({
    $id: Now.ID['validate_created_asset'],
    table: 'x_1397622_asset_tr_asset',
    recordId: submissionResult.record_id,
    fieldValues: 'asset_tag=ATF001^name=Test Laptop - ATF^category=hardware^status=available^is_critical=true',
    assert: 'record_validated',
    enforceSecurity: false
  });

  // Step 8: Open the created record for editing
  atf.form.openExistingRecord({
    $id: Now.ID['open_created_asset'],
    table: 'x_1397622_asset_tr_asset',
    recordId: submissionResult.record_id,
    formUI: 'standard_ui'
  });

  // Step 9: Update asset status to 'in_use'
  atf.form.setFieldValue({
    $id: Now.ID['update_asset_status'],
    table: 'x_1397622_asset_tr_asset',
    fieldValues: {
      "status": "in_use",
      "notes": "Updated via ATF testing - status changed to in use"
    },
    formUI: 'standard_ui'
  });

  // Step 10: Submit the updated form
  atf.form.submitForm({
    $id: Now.ID['submit_updated_asset'],
    assert: 'form_submitted_to_server',
    formUI: 'standard_ui'
  });

  // Step 11: Validate the updated record
  atf.server.recordValidation({
    $id: Now.ID['validate_updated_asset'],
    table: 'x_1397622_asset_tr_asset',
    recordId: submissionResult.record_id,
    fieldValues: 'status=in_use^notesLIKEUpdated via ATF testing',
    assert: 'record_validated',
    enforceSecurity: false
  });

  // Step 12: Test server-side update
  atf.server.recordUpdate({
    $id: Now.ID['server_update_asset'],
    table: 'x_1397622_asset_tr_asset',
    recordId: submissionResult.record_id,
    fieldValues: {
      "location": "Office Building A - Floor 3",
      "notes": "Location updated via server-side ATF step"
    },
    assert: 'record_successfully_updated',
    enforceSecurity: false
  });

  // Step 13: Query for assets with specific criteria
  atf.server.recordQuery({
    $id: Now.ID['query_hardware_assets'],
    table: 'x_1397622_asset_tr_asset',
    fieldValues: 'category=hardware^statusIN=available,in_use^is_critical=true',
    assert: 'records_match_query',
    enforceSecurity: false
  });

  // Step 14: Log test completion
  atf.server.log({
    $id: Now.ID['crud_test_completion_log'],
    log: 'Asset CRUD operations test completed successfully'
  });

  // Step 15: Clean up - delete the test record
  atf.server.recordDelete({
    $id: Now.ID['cleanup_test_asset'],
    table: 'x_1397622_asset_tr_asset',
    recordId: submissionResult.record_id,
    assert: 'record_successfully_deleted',
    enforceSecurity: false
  });

  // Step 16: Final log
  atf.server.log({
    $id: Now.ID['cleanup_log'],
    log: 'Test asset record cleaned up successfully'
  });
});