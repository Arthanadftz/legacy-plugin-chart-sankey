"use strict";

exports.__esModule = true;
exports.default = void 0;

var _d = _interopRequireDefault(require("d3"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _d3Sankey = require("d3-sankey");

var _core = require("@superset-ui/core");

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

/* eslint-disable no-param-reassign */

/* eslint-disable react/sort-prop-types */
const propTypes = {
  data: _propTypes.default.arrayOf(_propTypes.default.shape({
    source: _propTypes.default.string,
    target: _propTypes.default.string,
    value: _propTypes.default.number
  })),
  width: _propTypes.default.number,
  height: _propTypes.default.number,
  colorScheme: _propTypes.default.string
};
const formatNumber = (0, _core.getNumberFormatter)(_core.NumberFormats.FLOAT);

function Sankey(element, props) {
  const {
    data,
    width,
    height,
    colorScheme
  } = props;

  const div = _d.default.select(element);

  div.classed('superset-legacy-chart-sankey', true);
  const margin = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  div.selectAll('*').remove();
  const svg = div.append('svg').attr('width', innerWidth + margin.left + margin.right).attr('height', innerHeight + margin.top + margin.bottom).append('g').attr('transform', `translate(${margin.left},${margin.top})`);
  const tooltip = div.append('div').attr('class', 'sankey-tooltip').style('opacity', 0);

  const colorFn = _core.CategoricalColorNamespace.getScale(colorScheme);

  const sankey = (0, _d3Sankey.sankey)().nodeWidth(15).nodePadding(10).size([innerWidth, innerHeight]);
  const path = sankey.link();
  let nodes = {}; // Compute the distinct nodes from the links.

  const links = data.map(row => {
    const link = { ...row
    };
    link.source = nodes[link.source] || (nodes[link.source] = {
      name: link.source
    });
    link.target = nodes[link.target] || (nodes[link.target] = {
      name: link.target
    });
    link.value = Number(link.value);
    return link;
  });
  nodes = _d.default.values(nodes);
  sankey.nodes(nodes).links(links).layout(32);

  function getTooltipHtml(d) {
    let html;

    if (d.sourceLinks) {
      // is node
      html = `${d.name} Value: <span class='emph'>${formatNumber(d.value)}</span>`;
    } else {
      const val = formatNumber(d.value);

      const sourcePercent = _d.default.round(d.value / d.source.value * 100, 1);

      const targetPercent = _d.default.round(d.value / d.target.value * 100, 1);

      html = ["<div class=''>Path Value: <span class='emph'>", val, '</span></div>', "<div class='percents'>", "<span class='emph'>", Number.isFinite(sourcePercent) ? sourcePercent : '100', '%</span> of ', d.source.name, '<br/>', `<span class='emph'>${Number.isFinite(targetPercent) ? targetPercent : '--'}%</span> of `, d.target.name, '</div>'].join('');
    }

    return html;
  }

  function onmouseover(d) {
    tooltip.html(() => getTooltipHtml(d)).transition().duration(200).style('left', `${_d.default.event.offsetX + 10}px`).style('top', `${_d.default.event.offsetY + 10}px`).style('opacity', 0.95);
  }

  function onmouseout() {
    tooltip.transition().duration(100).style('opacity', 0);
  }

  const link = svg.append('g').selectAll('.link').data(links).enter().append('path').attr('class', 'link').attr('d', path).style('stroke-width', d => Math.max(1, d.dy)).sort((a, b) => b.dy - a.dy).on('mouseover', onmouseover).on('mouseout', onmouseout);

  function dragmove(d) {
    _d.default.select(this).attr('transform', `translate(${d.x},${d.y = Math.max(0, Math.min(height - d.dy, _d.default.event.y))})`);

    sankey.relayout();
    link.attr('d', path);
  }

  const node = svg.append('g').selectAll('.node').data(nodes).enter().append('g').attr('class', 'node').attr('transform', d => `translate(${d.x},${d.y})`).call(_d.default.behavior.drag().origin(d => d).on('dragstart', function dragStart() {
    this.parentNode.append(this);
  }).on('drag', dragmove));
  const minRectHeight = 5;
  node.append('rect').attr('height', d => d.dy > minRectHeight ? d.dy : minRectHeight).attr('width', sankey.nodeWidth()).style('fill', d => {
    const name = d.name || 'N/A';
    d.color = colorFn(name.replace(/ .*/, ''));
    return d.color;
  }).style('stroke', d => _d.default.rgb(d.color).darker(2)).on('mouseover', onmouseover).on('mouseout', onmouseout);
  node.append('text').attr('x', -6).attr('y', d => d.dy / 2).attr('dy', '.35em').attr('text-anchor', 'end').attr('transform', null).text(d => d.name).filter(d => d.x < innerWidth / 2).attr('x', 6 + sankey.nodeWidth()).attr('text-anchor', 'start');
}

Sankey.displayName = 'Sankey';
Sankey.propTypes = propTypes;
var _default = Sankey;
exports.default = _default;