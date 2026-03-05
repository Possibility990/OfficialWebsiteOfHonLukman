/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./component/modal.js"
/*!****************************!*\
  !*** ./component/modal.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nvar Modal = /*#__PURE__*/function () {\n  function Modal() {\n    _classCallCheck(this, Modal);\n    this._modalIcon = document.querySelector('#admin-icon');\n    this._modalEl = document.querySelector('#modal');\n    this.addEventListeners();\n  }\n  return _createClass(Modal, [{\n    key: \"addEventListeners\",\n    value: function addEventListeners() {\n      this._modalIcon.addEventListener('click', this._open.bind(this));\n      window.addEventListener('click', this._outsideEvent.bind(this));\n    }\n  }, {\n    key: \"_open\",\n    value: function _open() {\n      this._modalEl.style.display = 'block';\n    }\n  }, {\n    key: \"_close\",\n    value: function _close() {\n      this._modalEl.style.display = 'none';\n    }\n  }, {\n    key: \"_outsideEvent\",\n    value: function _outsideEvent(e) {\n      if (e.target === this._modalEl) {\n        this._close();\n      }\n    }\n  }]);\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Modal);\n\n//# sourceURL=webpack:///./component/modal.js?\n}");

/***/ },

/***/ "./component/newsForm.js"
/*!*******************************!*\
  !*** ./component/newsForm.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nvar NewsForm = /*#__PURE__*/function () {\n  function NewsForm() {\n    _classCallCheck(this, NewsForm);\n    this._formBox = document.getElementById('modal-child');\n    console.log(this._formBox);\n  }\n  return _createClass(NewsForm, [{\n    key: \"render\",\n    value: function render() {\n      this._formBox.innerHTML = \" <form action=\\\"\\\" id=\\\"news-form\\\">\\n                <div class=\\\"form-group\\\">\\n                    <input type=\\\"file\\\" accept=\\\"jpg png\\\">\\n                </div>\\n                <div class=\\\"form-group\\\">\\n                    <label for=\\\"\\\">Text</label>\\n                    <textarea name=\\\"text\\\" id=\\\"\\\"></textarea>\\n                </div>\\n                <div class=\\\"form-group\\\">\\n                    <!-- <span>Upload</span> -->\\n                    <input type=\\\"file\\\" accept=\\\"jpg png\\\">\\n                </div>\\n                <div class=\\\"form-group\\\">\\n                    <label for=\\\"\\\">Text</label>\\n                    <textarea name=\\\"text\\\" id=\\\"\\\"></textarea>\\n                </div>\\n                <div class=\\\"form-group\\\">\\n                    <!-- <span>Image</span> -->\\n                    <input type=\\\"file\\\" accept=\\\"jpg png\\\">\\n                </div>\\n                <div class=\\\"form-group\\\">\\n                    <label for=\\\"\\\">Text</label>\\n                    <textarea name=\\\"text\\\" id=\\\"\\\"></textarea>\\n                </div>\\n                <div class=\\\"button-admin\\\">\\n                <button type=\\\"submit\\\">Submit</button>\\n                </div>\\n            </form>\";\n    }\n  }]);\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NewsForm);\n\n//# sourceURL=webpack:///./component/newsForm.js?\n}");

/***/ },

/***/ "./component/utils.js"
/*!****************************!*\
  !*** ./component/utils.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nvar Utility = /*#__PURE__*/function () {\n  function Utility() {\n    _classCallCheck(this, Utility);\n    this._navLink = document.querySelectorAll('.nav-link');\n    this._spinner = document.querySelector('.spinner');\n  }\n  return _createClass(Utility, [{\n    key: \"highlightActiveLink\",\n    value: function highlightActiveLink() {\n      this._navLink.forEach(function (link) {\n        if (window.location.pathname === link.getAttribute('href')) link.classList.add('active');\n      });\n    }\n  }, {\n    key: \"showSpinner\",\n    value: function showSpinner() {\n      console.log(this._spinner);\n      this._spinner.classList.add('show');\n    }\n  }, {\n    key: \"removeSpinner\",\n    value: function removeSpinner() {\n      console.log(this._spinner);\n      this._spinner.classList.remove('show');\n    }\n  }]);\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Utility);\n\n//# sourceURL=webpack:///./component/utils.js?\n}");

/***/ },

/***/ "./src/index.js"
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_spinner_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/spinner.css */ \"./src/css/spinner.css\");\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/style.css */ \"./src/css/style.css\");\n/* harmony import */ var _component_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../component/utils */ \"./component/utils.js\");\n/* harmony import */ var _component_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../component/modal */ \"./component/modal.js\");\n/* harmony import */ var _component_newsForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../component/newsForm */ \"./component/newsForm.js\");\n\n\n\n\n\nvar utils = new _component_utils__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\nvar newsForm = new _component_newsForm__WEBPACK_IMPORTED_MODULE_4__[\"default\"]();\nvar global = {\n  currentPage: window.location.pathname,\n  APIURL: 'api/news'\n};\nfunction init() {\n  switch (global.currentPage) {\n    case '/':\n    case '/home.html':\n    case '/index.html':\n      console.log('you are in home page');\n      utils.showSpinner();\n      utils.removeSpinner();\n      break;\n    case '/about.html':\n      console.log('you are in about');\n      break;\n    case '/university.html':\n      console.log('your are in university page');\n      break;\n    case '/college.html':\n      console.log('you are in college page');\n      break;\n    case '/newsDetails.html':\n      console.log('you are in news details page');\n      break;\n    case '/admin.html':\n      console.log('you are in admin page');\n      var modal = new _component_modal__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n      newsForm.render();\n      break;\n  }\n  utils.highlightActiveLink();\n}\ndocument.addEventListener('DOMContentLoaded', init);\n\n//# sourceURL=webpack:///./src/index.js?\n}");

/***/ },

/***/ "./src/css/spinner.css"
/*!*****************************!*\
  !*** ./src/css/spinner.css ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./src/css/spinner.css?\n}");

/***/ },

/***/ "./src/css/style.css"
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./src/css/style.css?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;