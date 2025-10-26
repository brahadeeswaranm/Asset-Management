import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    asset_table_module: {
                        table: 'sys_app_module'
                        id: '0707a148060e41d783e25eb34f5f0353'
                    }
                    asset_tracking_category: {
                        table: 'sys_app_category'
                        id: '285353bdf2c0475bad7c6b87697b6cb7'
                    }
                    asset_tracking_menu: {
                        table: 'sys_app_application'
                        id: '3c618cdcc6174cebb3ad578b238f2ec8'
                    }
                    asset_tracking_ui_module: {
                        table: 'sys_app_module'
                        id: '8a55871bdd844be18820cbd7f5b5a61c'
                    }
                    'asset-tracking-page': {
                        table: 'sys_ui_page'
                        id: 'fa3719215a31426ea9960cd5c24a8b7a'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: '6b113e5b74d14aa0b1a53911c6b642c0'
                    }
                    new_asset_module: {
                        table: 'sys_app_module'
                        id: '36cd53a5dc4b44beac8f18af1984bfee'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '93d33d3cebcc4c4a92ce52d0caa04033'
                    }
                    tables_separator: {
                        table: 'sys_app_module'
                        id: '4401aa25783e4997b6d451ac384cf102'
                    }
                    'x_1397622_asset_tr/main': {
                        table: 'sys_ux_lib_asset'
                        id: '76b17407a08742f3b639b849908d8f1b'
                    }
                    'x_1397622_asset_tr/main.js.map': {
                        table: 'sys_ux_lib_asset'
                        id: '5584c9101be64572b9cd138936bc4e63'
                    }
                }
                composite: [
                    {
                        table: 'sys_documentation'
                        id: '05f7de55abc240dcb100908b31ebef22'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'location'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '07606ba3d7a74e76add5350ebf2132ba'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'purchase_price'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1211dee18c4748399447b8eb213721e0'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'category'
                            value: 'vehicle'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '17d1bda351cb457d95ebb64642f2be62'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'status'
                            value: 'lost'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '237987b377d14a449022f4d9b1c1f5f4'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'assigned_to'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2c269e89982a4718acc7bb08b14be67a'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'category'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2e141bbb9c5b41b78be461799769510b'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'purchase_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2f7cd64f55544a46aac60a85c369b8f5'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3016ced129cd4680bb1d2b2323024a33'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'is_critical'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '32aa5e2eeb8b4603a2f56e4a06f56053'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'asset_tag'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '464db213d1ce4b8380f3a9b5973b0bcc'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'model'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '594c5af4f93c4ab7a401b9aebe2a3cb4'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'is_critical'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5a5c881a7b1f4fa0a9d143f30d021dd2'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'notes'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5ce09c0cc06b4c70bbb4bcd000ee6c37'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'serial_number'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5ddbbc488515491cb5f42f62d2a9fc5f'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'status'
                            value: 'in_use'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5e4e2020c8c34e82928059e1052a64b2'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5fd561ad2eda47c5b5d8c8c68e1079f2'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'category'
                            value: 'software'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6109e6be3120400894a1f47d70534693'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'manufacturer'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '64dc94a7b976419ca734e1e93d5d8b5f'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'category'
                            value: 'furniture'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '691cbe4f9ade4d67b31ca631a8f5e1ef'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'manufacturer'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '698bf4dd5f4046c4a6e7030e892bf47c'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'category'
                            value: 'equipment'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '69b14834fdf349ac805433392828f884'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'category'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6a4c9dee7ad44b3481c4c98e9a75ee25'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7839b16008864ce0a68f47e65d9739b2'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'location'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7dd9b3864e4c496895a9e3e16c293933'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'purchase_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7ed5f1cdf01f447291da3eab7bba1e45'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '831b645cf5a0481fa074441926f3e605'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'category'
                            value: 'hardware'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8b2d49c9fda740639f81294852522db0'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '92eedaa8151d4a9e9003b1e3b6728b00'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'af73f37223364020b03f4c3c44d18fb6'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'serial_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bc2f7366b3fd4e029d916d376778516a'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bfbe4eacb5eb44ce80bb131db447563b'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'purchase_price'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c24eab30e4ed4f30a5838d87d38075b6'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'warranty_expiry'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c79970948a3a43428d41c32c116a231b'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'description'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'ccfc12467c304be3bca175773c329b24'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'cd201c07c03349d8870d3670e9d4b58e'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd227456d397a422cbfaa0973af758d42'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'model'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'db26722c26bb425981e5dafcb8f47915'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'status'
                            value: 'retired'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'db7b1a55bd774d10bdb09b283f461d3a'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'asset_tag'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e6d7cdae889c4c8383d0ecc016ec750a'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'status'
                            value: 'maintenance'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e6f9988b80db4cdc8e3148ec5f9f0944'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'status'
                            value: 'available'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f1541271856949539a5e48651cfabad8'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f7d18265fc914596bbdd7897cd2fb730'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'warranty_expiry'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fb07593d2b3c4b2c804cf15b33da379e'
                        key: {
                            name: 'x_1397622_asset_tr_asset'
                            element: 'assigned_to'
                        }
                    },
                ]
            }
        }
    }
}
