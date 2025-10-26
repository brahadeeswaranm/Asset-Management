import '@servicenow/sdk/global';
import { UiPage } from '@servicenow/sdk/core';
import assetTrackingPage from '../../client/index.html';

export const asset_tracking_page = UiPage({
  $id: Now.ID['asset-tracking-page'], 
  endpoint: 'x_1397622_asset_tr_assets.do',
  description: 'Asset Tracking Management UI Page with React',
  category: 'general',
  html: assetTrackingPage,
  direct: true
})