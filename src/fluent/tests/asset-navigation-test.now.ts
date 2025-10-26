import '@servicenow/sdk/global';
import { Test } from '@servicenow/sdk/core';

// ATF Test: Asset Tracker Navigation and Application Menu
Test({
  $id: Now.ID['asset_navigation_test'],
  name: 'Asset Tracker - Navigation Test',
  description: 'Test application menu visibility and navigation to Asset Tracker modules',
  active: true,
  failOnServerError: true
}, (atf) => {
  
  // Step 1: Log test start
  atf.server.log({
    $id: Now.ID['nav_test_start_log'],
    log: 'Starting Asset Tracker navigation and menu visibility test'
  });

  // Note: In a real implementation, you would need to query for the actual sys_ids
  // Using placeholder sys_ids here - in practice, use run_query tool to get exact IDs
  
  // Step 2: Verify Asset Tracking application menu is visible
  // Note: This sys_id would need to be queried from sys_app_application table
  atf.applicationNavigator.applicationMenuVisibility({
    $id: Now.ID['verify_app_menu_visible'],
    navigator: 'polaris',
    visible: ['ASSET_TRACKING_APP_SYS_ID'], // This would be the actual sys_id from query
    assertVisible: 'at_least_applications_visible',
    notVisible: [],
    assertNotVisible: 'at_least_applications_not_visible'
  });

  // Step 3: Log menu visibility confirmed
  atf.server.log({
    $id: Now.ID['menu_visible_log'],
    log: 'Asset Tracking application menu is visible in navigator'
  });

  // Step 4: Verify Asset Tracker modules are visible
  // Note: These sys_ids would need to be queried from sys_app_module table
  atf.applicationNavigator.moduleVisibility({
    $id: Now.ID['verify_modules_visible'],
    navigator: 'polaris',
    assertVisible: 'at_least_modules_visible',
    visibleModules: [
      'ASSET_MANAGER_MODULE_SYS_ID', // Asset Manager (React UI)
      'ASSET_TABLE_MODULE_SYS_ID',   // Assets (Table View)
      'NEW_ASSET_MODULE_SYS_ID'      // Create New Asset
    ],
    assertNotVisible: 'at_least_modules_not_visible',
    notVisibleModules: []
  });

  // Step 5: Navigate to Asset Manager module (React UI)
  atf.applicationNavigator.navigateToModule({
    $id: Now.ID['navigate_to_asset_manager'],
    module: 'ASSET_MANAGER_MODULE_SYS_ID' // This would be the actual sys_id from query
  });

  // Step 6: Log successful navigation
  atf.server.log({
    $id: Now.ID['navigation_success_log'],
    log: 'Successfully navigated to Asset Manager React UI'
  });

  // Step 7: Navigate to Assets table view
  atf.applicationNavigator.navigateToModule({
    $id: Now.ID['navigate_to_asset_table'],
    module: 'ASSET_TABLE_MODULE_SYS_ID' // This would be the actual sys_id from query
  });

  // Step 8: Log table navigation
  atf.server.log({
    $id: Now.ID['table_navigation_log'],
    log: 'Successfully navigated to Assets table view'
  });

  // Step 9: Create test data for UI testing
  const testAssetResult = atf.server.recordInsert({
    $id: Now.ID['create_test_asset_for_ui'],
    table: 'x_1397622_asset_tr_asset',
    fieldValues: {
      "asset_tag": "UI_TEST_001",
      "name": "UI Test Asset",
      "description": "Asset created for UI navigation testing",
      "category": "hardware",
      "status": "available",
      "location": "UI Test Lab",
      "is_critical": false
    },
    assert: 'record_successfully_inserted',
    enforceSecurity: false
  });

  // Step 10: Navigate to create new asset form
  atf.applicationNavigator.navigateToModule({
    $id: Now.ID['navigate_to_new_asset'],
    module: 'NEW_ASSET_MODULE_SYS_ID' // This would be the actual sys_id from query
  });

  // Step 11: Verify we can open the asset creation form
  atf.form.openNewForm({
    $id: Now.ID['open_new_asset_from_nav'],
    table: 'x_1397622_asset_tr_asset',
    formUI: 'standard_ui'
  });

  // Step 12: Verify form fields are accessible after navigation
  atf.form.fieldStateValidation({
    $id: Now.ID['validate_form_after_nav'],
    table: 'x_1397622_asset_tr_asset',
    visible: ['asset_tag', 'name', 'description', 'category', 'status'],
    mandatory: ['asset_tag', 'name'],
    notMandatory: ['description', 'location'],
    formUI: 'standard_ui'
  });

  // Step 13: Log form validation success
  atf.server.log({
    $id: Now.ID['form_validation_log'],
    log: 'Asset form is properly accessible after navigation'
  });

  // Step 14: Clean up test data
  atf.server.recordDelete({
    $id: Now.ID['cleanup_ui_test_asset'],
    table: 'x_1397622_asset_tr_asset',
    recordId: testAssetResult.record_id,
    assert: 'record_successfully_deleted',
    enforceSecurity: false
  });

  // Step 15: Final log
  atf.server.log({
    $id: Now.ID['nav_test_completion_log'],
    log: 'Asset Tracker navigation test completed successfully'
  });
});