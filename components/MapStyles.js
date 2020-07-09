import { css, createGlobalStyle } from 'styled-components';

export const leafletStyles = css`
  /* required styles */
  .leaflet-pane,
  .leaflet-tile,
  .leaflet-marker-icon,
  .leaflet-marker-shadow,
  .leaflet-tile-container,
  .leaflet-pane > svg,
  .leaflet-pane > canvas,
  .leaflet-zoom-box,
  .leaflet-image-layer,
  .leaflet-layer {
    position: absolute;
    left: 0;
    top: 0;
  }
  .leaflet-container {
    overflow: hidden;
  }
  .leaflet-tile,
  .leaflet-marker-icon,
  .leaflet-marker-shadow {
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    -webkit-user-drag: none;
  }
  /* Safari renders non-retina tile on retina better with this, but Chrome is worse */
  .leaflet-safari .leaflet-tile {
    image-rendering: -webkit-optimize-contrast;
  }
  /* hack that prevents hw layers "stretching" when loading new tiles */
  .leaflet-safari .leaflet-tile-container {
    width: 1600px;
    height: 1600px;
    transform-origin: 0 0;
  }
  .leaflet-marker-icon,
  .leaflet-marker-shadow {
    display: block;
  }
  /* .leaflet-container svg: reset svg max-width decleration shipped in Joomla! (joomla.org) 3.x */
  /* .leaflet-container img: map is broken in FF if you have max-width: 100% on tiles */
  .leaflet-container .leaflet-overlay-pane svg,
  .leaflet-container .leaflet-marker-pane img,
  .leaflet-container .leaflet-shadow-pane img,
  .leaflet-container .leaflet-tile-pane img,
  .leaflet-container img.leaflet-image-layer,
  .leaflet-container .leaflet-tile {
    max-width: none !important;
    max-height: none !important;
  }
  .leaflet-container.leaflet-touch-zoom {
    -ms-touch-action: pan-x pan-y;
    touch-action: pan-x pan-y;
  }
  .leaflet-container.leaflet-touch-drag {
    -ms-touch-action: pinch-zoom;
    /* Fallback for FF which doesn't support pinch-zoom */
    touch-action: none;
    touch-action: pinch-zoom;
  }
  .leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {
    -ms-touch-action: none;
    touch-action: none;
  }
  .leaflet-container {
    -webkit-tap-highlight-color: transparent;
  }
  .leaflet-container a {
    -webkit-tap-highlight-color: rgba(51, 181, 229, 0.4);
  }
  .leaflet-tile {
    filter: inherit;
    visibility: hidden;
  }
  .leaflet-tile-loaded {
    visibility: inherit;
  }
  .leaflet-zoom-box {
    width: 0;
    height: 0;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    z-index: 8;
  }
  /* workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=888319 */
  .leaflet-overlay-pane svg {
    -moz-user-select: none;
  }
  .leaflet-pane {
    z-index: 4;
  }
  .leaflet-tile-pane {
    z-index: 2;
  }
  .leaflet-overlay-pane {
    z-index: 4;
  }
  .leaflet-shadow-pane {
    z-index: 5;
  }
  .leaflet-marker-pane {
    z-index: 6;
  }
  .leaflet-tooltip-pane {
    z-index: 6;
  }
  .leaflet-popup-pane {
    z-index: 7;
  }
  .leaflet-map-pane canvas {
    z-index: 1;
  }
  .leaflet-map-pane svg {
    z-index: 2;
  }
  .leaflet-vml-shape {
    width: 1px;
    height: 1px;
  }
  .lvml {
    behavior: url(#default#VML);
    display: inline-block;
    position: absolute;
  }
  /* control positioning */
  .leaflet-control {
    position: relative;
    z-index: 8;
    pointer-events: visiblePainted; /* IE 9-10 doesn't have auto */
    pointer-events: auto;
  }
  .leaflet-top,
  .leaflet-bottom {
    position: absolute;
    z-index: 10;
    pointer-events: none;
  }
  .leaflet-top {
    top: 0;
  }
  .leaflet-right {
    right: 0;
  }
  .leaflet-bottom {
    bottom: 0;
  }
  .leaflet-left {
    left: 0;
  }
  .leaflet-control {
    float: left;
    clear: both;
  }
  .leaflet-right .leaflet-control {
    float: right;
  }
  .leaflet-top .leaflet-control {
    margin-top: 10px;
  }
  .leaflet-bottom .leaflet-control {
    margin-bottom: 10px;
  }
  .leaflet-left .leaflet-control {
    margin-left: 10px;
  }
  .leaflet-right .leaflet-control {
    margin-right: 10px;
  }
  /* zoom and fade animations */
  .leaflet-fade-anim .leaflet-tile {
    will-change: opacity;
  }
  .leaflet-fade-anim .leaflet-popup {
    opacity: 0;
    -webkit-transition: opacity 0.2s linear;
    -moz-transition: opacity 0.2s linear;
    transition: opacity 0.2s linear;
  }
  .leaflet-fade-anim .leaflet-map-pane .leaflet-popup {
    opacity: 1;
  }
  .leaflet-zoom-animated {
    -webkit-transform-origin: 0 0;
    -ms-transform-origin: 0 0;
    transform-origin: 0 0;
  }
  .leaflet-zoom-anim .leaflet-zoom-animated {
    will-change: transform;
  }
  .leaflet-zoom-anim .leaflet-zoom-animated {
    -webkit-transition: -webkit-transform 0.25s cubic-bezier(0, 0, 0.25, 1);
    -moz-transition: -moz-transform 0.25s cubic-bezier(0, 0, 0.25, 1);
    transition: transform 0.25s cubic-bezier(0, 0, 0.25, 1);
  }
  .leaflet-zoom-anim .leaflet-tile,
  .leaflet-pan-anim .leaflet-tile {
    -webkit-transition: none;
    -moz-transition: none;
    transition: none;
  }
  .leaflet-zoom-anim .leaflet-zoom-hide {
    visibility: hidden;
  }
  /* cursors */
  .leaflet-interactive {
    cursor: pointer;
  }
  .leaflet-grab {
    cursor: -webkit-grab;
    cursor: -moz-grab;
    cursor: grab;
  }
  .leaflet-crosshair,
  .leaflet-crosshair .leaflet-interactive {
    cursor: crosshair;
  }
  .leaflet-popup-pane,
  .leaflet-control {
    cursor: auto;
  }
  .leaflet-dragging .leaflet-grab,
  .leaflet-dragging .leaflet-grab .leaflet-interactive,
  .leaflet-dragging .leaflet-marker-draggable {
    cursor: move;
    cursor: -webkit-grabbing;
    cursor: -moz-grabbing;
    cursor: grabbing;
  }
  /* marker & overlays interactivity */
  .leaflet-marker-icon,
  .leaflet-marker-shadow,
  .leaflet-image-layer,
  .leaflet-pane > svg path,
  .leaflet-tile-container {
    pointer-events: none;
  }
  .leaflet-marker-icon.leaflet-interactive,
  .leaflet-image-layer.leaflet-interactive,
  .leaflet-pane > svg path.leaflet-interactive {
    pointer-events: visiblePainted; /* IE 9-10 doesn't have auto */
    pointer-events: auto;
  }
  /* visual tweaks */
  .leaflet-container {
    background: #ddd;
    outline: 0;
  }
  .leaflet-container a {
    color: #0078a8;
  }
  .leaflet-container a.leaflet-active {
    outline: 2px solid orange;
  }
  .leaflet-zoom-box {
    border: 2px dotted #38f;
    background: rgba(255, 255, 255, 0.5);
  }
  /* general typography */
  .leaflet-container {
    font: 12px/1.5 'Helvetica Neue', Arial, Helvetica, sans-serif;
  }
  /* general toolbar styles */
  .leaflet-bar {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
    border-radius: 4px;
  }
  .leaflet-bar a,
  .leaflet-bar a:hover {
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    width: 30px;
    height: 30px;
    line-height: 30px;
    display: block;
    text-align: center;
    text-decoration: none;
    color: black;
  }
  .leaflet-bar a,
  .leaflet-control-layers-toggle {
    background-position: 50% 50%;
    background-repeat: no-repeat;
    display: block;
  }
  .leaflet-bar a:hover {
    background-color: #f4f4f4;
  }
  .leaflet-bar a:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .leaflet-bar a:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom: none;
  }
  .leaflet-bar a.leaflet-disabled {
    cursor: default;
    background-color: #f4f4f4;
    color: #bbb;
  }
  .leaflet-touch .leaflet-bar a {
    width: 30px;
    height: 30px;
    line-height: 30px;
  }
  .leaflet-touch .leaflet-bar a:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .leaflet-touch .leaflet-bar a:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  /* zoom control */
  .leaflet-control-zoom-in,
  .leaflet-control-zoom-out {
    font: bold 18px 'Lucida Console', Monaco, monospace;
    text-indent: 1px;
  }
  .leaflet-touch .leaflet-control-zoom-in,
  .leaflet-touch .leaflet-control-zoom-out {
    font-size: 22px;
  }
  /* layers control */
  .leaflet-control-layers {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
    background: #fff;
    border-radius: 5px;
  }
  .leaflet-control-layers-toggle {
    background-image: url(images/layers.png);
    width: 36px;
    height: 36px;
  }
  .leaflet-retina .leaflet-control-layers-toggle {
    background-image: url(images/layers-2x.png);
    background-size: 30px 30px;
  }
  .leaflet-touch .leaflet-control-layers-toggle {
    width: 44px;
    height: 44px;
  }
  .leaflet-control-layers .leaflet-control-layers-list,
  .leaflet-control-layers-expanded .leaflet-control-layers-toggle {
    display: none;
  }
  .leaflet-control-layers-expanded .leaflet-control-layers-list {
    display: block;
    position: relative;
  }
  .leaflet-control-layers-expanded {
    padding: 6px 10px 6px 6px;
    color: #333;
    background: #fff;
  }
  .leaflet-control-layers-scrollbar {
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 5px;
  }
  .leaflet-control-layers-selector {
    margin-top: 2px;
    position: relative;
    top: 1px;
  }
  .leaflet-control-layers label {
    display: block;
  }
  .leaflet-control-layers-separator {
    height: 0;
    border-top: 1px solid #ddd;
    margin: 5px -10px 5px -6px;
  }
  /* Default icon URLs */
  .leaflet-default-icon-path {
    background-image: url(images/marker-icon.png);
  }
  /* attribution and scale controls */
  .leaflet-container .leaflet-control-attribution {
    background: #fff;
    background: rgba(255, 255, 255, 0.7);
    margin: 0;
  }
  .leaflet-control-attribution,
  .leaflet-control-scale-line {
    padding: 0 5px;
    color: #333;
  }
  .leaflet-control-attribution a {
    text-decoration: none;
  }
  .leaflet-control-attribution a:hover {
    text-decoration: underline;
  }
  .leaflet-container .leaflet-control-attribution,
  .leaflet-container .leaflet-control-scale {
    font-size: 11px;
  }
  .leaflet-left .leaflet-control-scale {
    margin-left: 5px;
  }
  .leaflet-bottom .leaflet-control-scale {
    margin-bottom: 5px;
  }
  .leaflet-control-scale-line {
    border: 2px solid #777;
    border-top: none;
    line-height: 1.1;
    padding: 2px 5px 1px;
    font-size: 11px;
    white-space: nowrap;
    overflow: hidden;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background: #fff;
    background: rgba(255, 255, 255, 0.5);
  }
  .leaflet-control-scale-line:not(:first-child) {
    border-top: 2px solid #777;
    border-bottom: none;
    margin-top: -2px;
  }
  .leaflet-control-scale-line:not(:first-child):not(:last-child) {
    border-bottom: 2px solid #777;
  }
  .leaflet-touch .leaflet-control-attribution,
  .leaflet-touch .leaflet-control-layers,
  .leaflet-touch .leaflet-bar {
  }
  .leaflet-touch .leaflet-control-layers,
  .leaflet-touch .leaflet-bar {
    background-clip: padding-box;
  }
  /* popup */
  .leaflet-popup {
    position: absolute;
    text-align: center;
    margin-bottom: 20px;
  }
  .leaflet-popup-content-wrapper {
    padding: 1px;
    text-align: left;
    border-radius: 5px;
  }
  .leaflet-popup-content {
    margin: 10px 15px;
    line-height: 1.4;
  }
  .leaflet-popup-content p {
    margin: 18px 0;
  }
  .leaflet-popup-tip-container {
    width: 40px;
    height: 20px;
    position: absolute;
    left: 50%;
    margin-left: -20px;
    overflow: hidden;
    pointer-events: none;
  }
  .leaflet-popup-tip {
    width: 17px;
    height: 17px;
    padding: 1px;
    margin: -10px auto 0;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  .leaflet-popup-content-wrapper,
  .leaflet-popup-tip {
    background: white;
    color: #333;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  .leaflet-container a.leaflet-popup-close-button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 4px 4px 0 0;
    border: none;
    text-align: center;
    width: 18px;
    height: 14px;
    font: 16px/14px Tahoma, Verdana, sans-serif;
    color: #c3c3c3;
    text-decoration: none;
    font-weight: bold;
    background: transparent;
  }
  .leaflet-container a.leaflet-popup-close-button:hover {
    color: #999;
  }
  .leaflet-popup-scrolled {
    overflow: auto;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
  }
  .leaflet-oldie .leaflet-popup-content-wrapper {
    zoom: 1;
  }
  .leaflet-oldie .leaflet-popup-tip {
    width: 24px;
    margin: 0 auto;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)';
    filter: progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678);
  }
  .leaflet-oldie .leaflet-popup-tip-container {
    margin-top: -1px;
  }
  .leaflet-oldie .leaflet-control-zoom,
  .leaflet-oldie .leaflet-control-layers,
  .leaflet-oldie .leaflet-popup-content-wrapper,
  .leaflet-oldie .leaflet-popup-tip {
    border: 1px solid #999;
  }
  /* div icon */
  .leaflet-div-icon {
    background: #fff;
    border: 1px solid #666;
  }
  /* Tooltip */
  /* Base styles for the element that has a tooltip */
  .leaflet-tooltip {
    position: absolute;
    padding: 6px;
    background-color: #fff;
    border: 1px solid #fff;
    border-radius: 3px;
    color: #222;
    white-space: nowrap;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
  .leaflet-tooltip.leaflet-clickable {
    cursor: pointer;
    pointer-events: auto;
  }
  .leaflet-tooltip-top:before,
  .leaflet-tooltip-bottom:before,
  .leaflet-tooltip-left:before,
  .leaflet-tooltip-right:before {
    position: absolute;
    pointer-events: none;
    border: 6px solid transparent;
    background: transparent;
    content: '';
  }
  /* Directions */
  .leaflet-tooltip-bottom {
    margin-top: 6px;
  }
  .leaflet-tooltip-top {
    margin-top: -6px;
  }
  .leaflet-tooltip-bottom:before,
  .leaflet-tooltip-top:before {
    left: 50%;
    margin-left: -6px;
  }
  .leaflet-tooltip-top:before {
    bottom: 0;
    margin-bottom: -12px;
    border-top-color: #fff;
  }
  .leaflet-tooltip-bottom:before {
    top: 0;
    margin-top: -12px;
    margin-left: -6px;
    border-bottom-color: #fff;
  }
  .leaflet-tooltip-left {
    margin-left: -6px;
  }
  .leaflet-tooltip-right {
    margin-left: 6px;
  }
  .leaflet-tooltip-left:before,
  .leaflet-tooltip-right:before {
    top: 50%;
    margin-top: -6px;
  }
  .leaflet-tooltip-left:before {
    right: 0;
    margin-right: -12px;
    border-left-color: #fff;
  }
  .leaflet-tooltip-right:before {
    left: 0;
    margin-left: -12px;
    border-right-color: #fff;
  }
`;

export const LeafletStyles = createGlobalStyle`${leafletStyles}`;

export const markerClusterStyles = css`
  .marker-cluster-small {
    background-color: rgba(181, 226, 140, 0.6);
  }
  .marker-cluster-small div {
    background-color: rgba(110, 204, 57, 0.6);
  }
  .marker-cluster-medium {
    background-color: rgba(241, 211, 87, 0.6);
  }
  .marker-cluster-medium div {
    background-color: rgba(240, 194, 12, 0.6);
  }
  .marker-cluster-large {
    background-color: rgba(253, 156, 115, 0.6);
  }
  .marker-cluster-large div {
    background-color: rgba(241, 128, 23, 0.6);
  }
  .leaflet-oldie .marker-cluster-small {
    background-color: #b5e28c;
  }
  .leaflet-oldie .marker-cluster-small div {
    background-color: #6ecc39;
  }
  .leaflet-oldie .marker-cluster-medium {
    background-color: #f1d357;
  }
  .leaflet-oldie .marker-cluster-medium div {
    background-color: #f0c20c;
  }
  .leaflet-oldie .marker-cluster-large {
    background-color: #fd9c73;
  }
  .leaflet-oldie .marker-cluster-large div {
    background-color: #f18017;
  }
  .marker-cluster {
    background-clip: padding-box;
    border-radius: 20px;
  }
  .marker-cluster div {
    width: 30px;
    height: 30px;
    margin-left: 5px;
    margin-top: 5px;
    text-align: center;
    border-radius: 15px;
    font: 12px 'Helvetica Neue', Arial, Helvetica, sans-serif;
  }
  .marker-cluster span {
    line-height: 30px;
  }
  .leaflet-cluster-anim .leaflet-marker-icon,
  .leaflet-cluster-anim .leaflet-marker-shadow {
    -webkit-transition: -webkit-transform 0.3s ease-out, opacity 0.3s ease-in;
    -moz-transition: -moz-transform 0.3s ease-out, opacity 0.3s ease-in;
    -o-transition: -o-transform 0.3s ease-out, opacity 0.3s ease-in;
    transition: transform 0.3s ease-out, opacity 0.3s ease-in;
  }
  .leaflet-cluster-spider-leg {
    -webkit-transition: -webkit-stroke-dashoffset 0.3s ease-out,
      -webkit-stroke-opacity 0.3s ease-in;
    -moz-transition: -moz-stroke-dashoffset 0.3s ease-out,
      -moz-stroke-opacity 0.3s ease-in;
    -o-transition: -o-stroke-dashoffset 0.3s ease-out, -o-stroke-opacity 0.3s ease-in;
    transition: stroke-dashoffset 0.3s ease-out, stroke-opacity 0.3s ease-in;
  }
`;

export const MarkerClusterStyles = createGlobalStyle`${markerClusterStyles}`;

export default leafletStyles;
