import '@servicenow/sdk/global';
import { ApplicationMenu, Record } from '@servicenow/sdk/core';

// Create the application menu category with a nice blue style
export const assetTrackingCategory = Record({
  $id: Now.ID['asset_tracking_category'],
  table: 'sys_app_category',
  data: {
    name: 'Asset Tracking',
    style: 'border-color: #0066cc; background-color: #e3f2fd;',
  },
});

// Create the main application menu
export const assetTrackingMenu = ApplicationMenu({
  $id: Now.ID['asset_tracking_menu'],
  title: 'Asset Tracking',
  hint: 'Manage and track organizational assets',
  description: 'Comprehensive asset tracking and management application',
  category: assetTrackingCategory,
  active: true,
  order: 100,
});

// Create module for the Asset Tracking UI Page
export const assetTrackingUiModule = Record({
  $id: Now.ID['asset_tracking_ui_module'],
  table: 'sys_app_module',
  data: {
    title: 'Asset Manager',
    application: assetTrackingMenu.$id,
    link_type: 'DIRECT',
    query: 'x_1397622_asset_tr_assets.do',
    hint: 'Modern React-based asset management interface',
    description: 'Interactive asset tracking dashboard with full CRUD capabilities',
    active: true,
    order: 100,
  },
});

// Create separator for table views
export const tablesSeparator = Record({
  $id: Now.ID['tables_separator'],
  table: 'sys_app_module',
  data: {
    title: 'Asset Data',
    application: assetTrackingMenu.$id,
    link_type: 'SEPARATOR',
    active: true,
    order: 200,
  },
});

// Create module for the Asset table list view
export const assetTableModule = Record({
  $id: Now.ID['asset_table_module'],
  table: 'sys_app_module',
  data: {
    title: 'Assets (Table View)',
    application: assetTrackingMenu.$id,
    link_type: 'LIST',
    name: 'x_1397622_asset_tr_asset',
    hint: 'Traditional ServiceNow list view of assets',
    description: 'Standard ServiceNow table interface for asset records',
    active: true,
    order: 210,
  },
});

// Create module for creating new assets in table view
export const newAssetModule = Record({
  $id: Now.ID['new_asset_module'],
  table: 'sys_app_module',
  data: {
    title: 'Create New Asset',
    application: assetTrackingMenu.$id,
    link_type: 'NEW',
    name: 'x_1397622_asset_tr_asset',
    hint: 'Create a new asset record',
    description: 'Add a new asset using the standard ServiceNow form',
    active: true,
    order: 220,
  },
});