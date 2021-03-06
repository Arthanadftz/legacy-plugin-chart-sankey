"use strict";

exports.__esModule = true;
exports.default = void 0;

var _core = require("@superset-ui/core");

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
const config = {
  controlPanelSections: [{
    label: (0, _core.t)('Query'),
    expanded: true,
    controlSetRows: [[{
      name: 'groupby',
      override: {
        label: (0, _core.t)('Source / Target'),
        description: (0, _core.t)('Choose a source and a target')
      }
    }], ['metric'], ['adhoc_filters'], ['custom_filters'], [{
      name: 'row_limit',
      override: {
        description: (0, _core.t)('Limiting rows may result in incomplete data and misleading charts. Consider filtering or grouping source/target names instead.')
      }
    }], [{
      name: 'sort_by_metric',
      config: {
        type: 'CheckboxControl',
        label: (0, _core.t)('Sort by metric'),
        description: (0, _core.t)('Whether to sort results by the selected metric in descending order.')
      }
    }]]
  }, {
    label: (0, _core.t)('Chart Options'),
    expanded: true,
    controlSetRows: [['color_scheme', 'label_colors']]
  }]
};
var _default = config;
exports.default = _default;