"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTextSelection = void 0;
var _react = require("react");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var useTextSelection = exports.useTextSelection = function useTextSelection() {
  var _useState = (0, _react.useState)(""),
    _useState2 = _slicedToArray(_useState, 2),
    selectionData = _useState2[0],
    setSelectionData = _useState2[1];
  var selectionRef = (0, _react.useRef)(null);
  var expandTextNodeRange = function expandTextNodeRange(node, start, end) {
    var text = node.textContent || "";
    while (start > 0 && /\S/.test(text[start - 1])) start--;
    while (end < text.length && /\S/.test(text[end])) end++;
    return {
      start: start,
      end: end
    };
  };
  var handleSelection = (0, _react.useCallback)(function (range) {
    var newRange = range.cloneRange();

    // Handle start node
    if (range.startContainer.nodeType === Node.TEXT_NODE) {
      var _expandTextNodeRange = expandTextNodeRange(range.startContainer, range.startOffset, range.startOffset),
        start = _expandTextNodeRange.start;
      newRange.setStart(range.startContainer, start);
    }

    // Handle end node
    if (range.endContainer.nodeType === Node.TEXT_NODE) {
      var _expandTextNodeRange2 = expandTextNodeRange(range.endContainer, range.endOffset, range.endOffset),
        end = _expandTextNodeRange2.end;
      newRange.setEnd(range.endContainer, end);
    }
    return newRange;
  }, []);
  var handleMouseUp = (0, _react.useCallback)(function (e) {
    var selection = window.getSelection();
    if (!(selection !== null && selection !== void 0 && selection.rangeCount)) return;
    var range = selection.getRangeAt(0);
    if (range.collapsed) {
      selectionRef.current && handleOutsideClick(e);
      return;
    }
    var newRange = handleSelection(range);
    var selectedText = newRange.toString().trim();
    if (selectedText) {
      selection.removeAllRanges();
      selection.addRange(newRange);
      selectionRef.current = newRange.cloneRange();
      setSelectionData(selectedText);
    }
  }, []);
  var handleOutsideClick = (0, _react.useCallback)(function (e) {
    if (!selectionRef.current) return;
    var rect = selectionRef.current.getBoundingClientRect();
    var isOutside = e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom;
    isOutside && clearTextSelection();
  }, []);
  var clearTextSelection = (0, _react.useCallback)(function () {
    var _window$getSelection;
    (_window$getSelection = window.getSelection()) === null || _window$getSelection === void 0 || _window$getSelection.removeAllRanges();
    setSelectionData("");
    selectionRef.current = null;
  }, []);
  (0, _react.useEffect)(function () {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleOutsideClick);
    return function () {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleMouseUp, handleOutsideClick]);
  return {
    selectionData: selectionData,
    clearTextSelection: clearTextSelection
  };
};