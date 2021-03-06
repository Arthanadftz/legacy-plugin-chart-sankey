"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@superset-ui/core");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Sankey = _interopRequireDefault(require("./Sankey"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
const ReactSanKey = (0, _core.reactify)(_Sankey.default);

const SankeyComponent = ({
  className,
  ...otherProps
}) => {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: className
  }, /*#__PURE__*/_react.default.createElement(ReactSanKey, otherProps));
};

SankeyComponent.propTypes = {
  className: _propTypes.default.string.isRequired
};

var _default = (0, _core.styled)(SankeyComponent)`
  .superset-legacy-chart-sankey {
    .node {
      rect {
        cursor: move;
        fill-opacity: 0.9;
        shape-rendering: crispEdges;
      }
      text {
        pointer-events: none;
        text-shadow: 0 1px 0 #fff;
      }
    }
    .link {
      fill: none;
      stroke: #000;
      stroke-opacity: 0.2;
      &:hover {
        stroke-opacity: 0.5;
      }
    }
  }
  .superset-legacy-chart-sankey-tooltip {
    position: absolute;
    width: auto;
    background: #ddd;
    padding: 10px;
    font-size: ${({
  theme
}) => theme.typography.sizes.s};
    font-weight: ${({
  theme
}) => theme.typography.weights.light};
    color: #333;
    border: 1px solid #fff;
    text-align: center;
    pointer-events: none;
  }
`;

exports.default = _default;