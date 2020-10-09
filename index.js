/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	function promiseResolve() { return Promise.resolve(); }
/******/
/******/ 	var wasmImportObjects = {
/******/ 		"../../fusion-wasm/pkg/fusion_wasm_bg.wasm": function() {
/******/ 			return {
/******/ 				"./fusion_wasm_bg.js": {
/******/ 					"__wbindgen_object_drop_ref": function(p0i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbindgen_object_drop_ref"](p0i32);
/******/ 					},
/******/ 					"__wbg_setclassName_5c90ce56028589a5": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_setclassName_5c90ce56028589a5"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_settype_d3d5022d7fd1ef0d": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_settype_d3d5022d7fd1ef0d"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_setvalue_dc3cce23da13c2e9": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_setvalue_dc3cce23da13c2e9"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_setchecked_4c76d21b2d916833": function(p0i32,p1i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_setchecked_4c76d21b2d916833"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_setplaceholder_5ad1bfa9ec2545a5": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_setplaceholder_5ad1bfa9ec2545a5"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_addEventListener_116c561435e7160d": function(p0i32,p1i32,p2i32,p3i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_addEventListener_116c561435e7160d"](p0i32,p1i32,p2i32,p3i32);
/******/ 					},
/******/ 					"__wbg_removeEventListener_d9ceb7fdf4ca5166": function(p0i32,p1i32,p2i32,p3i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_removeEventListener_d9ceb7fdf4ca5166"](p0i32,p1i32,p2i32,p3i32);
/******/ 					},
/******/ 					"__wbg_remove_5e80593db7fb8c61": function(p0i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_remove_5e80593db7fb8c61"](p0i32);
/******/ 					},
/******/ 					"__wbg_remove_753943fab80b89c7": function(p0i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_remove_753943fab80b89c7"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_object_clone_ref": function(p0i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbindgen_object_clone_ref"](p0i32);
/******/ 					},
/******/ 					"__wbg_instanceof_Window_e8f84259147dce74": function(p0i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_instanceof_Window_e8f84259147dce74"](p0i32);
/******/ 					},
/******/ 					"__wbg_document_d3b6d86af1c5d199": function(p0i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_document_d3b6d86af1c5d199"](p0i32);
/******/ 					},
/******/ 					"__wbg_createElement_d00b8e24838e36e1": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_createElement_d00b8e24838e36e1"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_createTextNode_b7dc170e5271d075": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_createTextNode_b7dc170e5271d075"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_call_0dad7db75ec90ae7": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_call_0dad7db75ec90ae7"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbindgen_number_get": function(p0i32,p1i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbindgen_number_get"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_is_a2bc492e20d950cf": function(p0i32,p1i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_is_a2bc492e20d950cf"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_setnodeValue_b246d98e9aea8713": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_setnodeValue_b246d98e9aea8713"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_appendChild_8658f795c44d1316": function(p0i32,p1i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_appendChild_8658f795c44d1316"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_self_179e8c2a5a4c73a3": function() {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_self_179e8c2a5a4c73a3"]();
/******/ 					},
/******/ 					"__wbg_window_492cfe63a6e41dfa": function() {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_window_492cfe63a6e41dfa"]();
/******/ 					},
/******/ 					"__wbg_globalThis_8ebfea75c2dd63ee": function() {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_globalThis_8ebfea75c2dd63ee"]();
/******/ 					},
/******/ 					"__wbg_global_62ea2619f58bf94d": function() {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_global_62ea2619f58bf94d"]();
/******/ 					},
/******/ 					"__wbindgen_is_undefined": function(p0i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbindgen_is_undefined"](p0i32);
/******/ 					},
/******/ 					"__wbg_newnoargs_e2fdfe2af14a2323": function(p0i32,p1i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_newnoargs_e2fdfe2af14a2323"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_call_e9f0ce4da840ab94": function(p0i32,p1i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_call_e9f0ce4da840ab94"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbindgen_debug_string": function(p0i32,p1i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbindgen_debug_string"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbindgen_throw": function(p0i32,p1i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbindgen_throw"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbindgen_closure_wrapper65": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbindgen_closure_wrapper65"](p0i32,p1i32,p2i32);
/******/ 					}
/******/ 				}
/******/ 			};
/******/ 		},
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/
/******/ 		// Fetch + compile chunk loading for webassembly
/******/
/******/ 		var wasmModules = {"0":["../../fusion-wasm/pkg/fusion_wasm_bg.wasm"]}[chunkId] || [];
/******/
/******/ 		wasmModules.forEach(function(wasmModuleId) {
/******/ 			var installedWasmModuleData = installedWasmModules[wasmModuleId];
/******/
/******/ 			// a Promise means "currently loading" or "already loaded".
/******/ 			if(installedWasmModuleData)
/******/ 				promises.push(installedWasmModuleData);
/******/ 			else {
/******/ 				var importObject = wasmImportObjects[wasmModuleId]();
/******/ 				var req = fetch(__webpack_require__.p + "" + {"../../fusion-wasm/pkg/fusion_wasm_bg.wasm":"e7fc90c85d349bb2415b"}[wasmModuleId] + ".module.wasm");
/******/ 				var promise;
/******/ 				if(importObject instanceof Promise && typeof WebAssembly.compileStreaming === 'function') {
/******/ 					promise = Promise.all([WebAssembly.compileStreaming(req), importObject]).then(function(items) {
/******/ 						return WebAssembly.instantiate(items[0], items[1]);
/******/ 					});
/******/ 				} else if(typeof WebAssembly.instantiateStreaming === 'function') {
/******/ 					promise = WebAssembly.instantiateStreaming(req, importObject);
/******/ 				} else {
/******/ 					var bytesPromise = req.then(function(x) { return x.arrayBuffer(); });
/******/ 					promise = bytesPromise.then(function(bytes) {
/******/ 						return WebAssembly.instantiate(bytes, importObject);
/******/ 					});
/******/ 				}
/******/ 				promises.push(installedWasmModules[wasmModuleId] = promise.then(function(res) {
/******/ 					return __webpack_require__.w[wasmModuleId] = (res.instance || res).exports;
/******/ 				}));
/******/ 			}
/******/ 		});
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// object with all WebAssembly.instance exports
/******/ 	__webpack_require__.w = {};
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../fusion-wasm/lib/index.js":
/*!*****************************************************************!*\
  !*** /home/gilesv/Projects/react-wasm/fusion-wasm/lib/index.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nlet context;\nlet workLoop;\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  render() {\n    throw new Error(\"Fusion: 'render' used before loading wasm module\");\n  },\n\n  useState() {\n    throw new Error(\"Fusion: 'useState' used before loading wasm module\");\n  },\n\n  createElement() {\n    throw new Error(\"Fusion: 'createElement' used before loading wasm module\");\n  },\n\n  load() {\n    return __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ../pkg/fusion_wasm_bg.js */ \"../../fusion-wasm/pkg/fusion_wasm_bg.js\")).then(glue => {\n      context = glue.get_context();\n\n      workLoop = deadline => {\n        context = glue.work_loop(context, deadline.didTimeout);\n        window.requestIdleCallback(workLoop);\n      };\n\n      this.render = (element, parentDom) => {\n        context = glue.render(context, element, parentDom);\n        window.requestIdleCallback(workLoop);\n      };\n\n      this.useState = initialValue => {\n        let result = glue.use_state(context, initialValue);\n        return result;\n      };\n\n      this.createElement = (type, props, ...rawChildren) => {\n        props = props || {};\n        let children = rawChildren.flat().filter(x => x).map(x => {\n          return typeof x === \"string\" ? glue.create_text_element(x) : x;\n        });\n        let isFunctionalComponent = typeof type === \"function\";\n\n        if (isFunctionalComponent) {\n          props.children = children;\n          return glue.create_functional_component(type, props);\n        } else {\n          let elementProps = glue.create_props(props ? props.className : null, props ? props.nodeValue : null, props ? props.onClick : null);\n          return glue.create_element(type, elementProps, children);\n        }\n      };\n    });\n  }\n\n});\n\n//# sourceURL=webpack:////home/gilesv/Projects/react-wasm/fusion-wasm/lib/index.js?");

/***/ }),

/***/ "./src/Hello.js":
/*!**********************!*\
  !*** ./src/Hello.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Hello; });\n/* harmony import */ var fusion_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fusion-wasm */ \"../../fusion-wasm/lib/index.js\");\n\nfunction Hello({\n  name\n}) {\n  let [clickNumber, setClickNumber] = fusion_wasm__WEBPACK_IMPORTED_MODULE_0__[\"default\"].useState(0);\n\n  let onClick = () => {\n    console.log(clickNumber);\n    setClickNumber(clickNumber + 1);\n  };\n\n  return fusion_wasm__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement(\"div\", null, fusion_wasm__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement(\"h1\", null, \"Hello \", name, \"!\"), fusion_wasm__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement(\"button\", {\n    onClick: onClick\n  }, \"Clica!\"), fusion_wasm__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement(\"span\", null, \"Voc\\xEA clicou \", clickNumber.toString(), \" vezes.\"));\n}\n\n//# sourceURL=webpack:///./src/Hello.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var fusion_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fusion-wasm */ \"../../fusion-wasm/lib/index.js\");\n/* harmony import */ var _Hello_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Hello.js */ \"./src/Hello.js\");\n\n\nfusion_wasm__WEBPACK_IMPORTED_MODULE_0__[\"default\"].load().then(() => {\n  fusion_wasm__WEBPACK_IMPORTED_MODULE_0__[\"default\"].render(fusion_wasm__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement(_Hello_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    name: \"WOOOORLD\"\n  }), document.getElementById(\"root\"));\n});\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });