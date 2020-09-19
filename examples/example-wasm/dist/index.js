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
/******/ 					"__wbindgen_object_clone_ref": function(p0i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbindgen_object_clone_ref"](p0i32);
/******/ 					},
/******/ 					"__wbg_instanceof_Window_e8f84259147dce74": function(p0i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_instanceof_Window_e8f84259147dce74"](p0i32);
/******/ 					},
/******/ 					"__wbg_document_d3b6d86af1c5d199": function(p0i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_document_d3b6d86af1c5d199"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_string_new": function(p0i32,p1i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbindgen_string_new"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_get_2e96a823c1c5a5bd": function(p0i32,p1i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_get_2e96a823c1c5a5bd"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbindgen_number_get": function(p0i32,p1i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbindgen_number_get"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_createElement_d00b8e24838e36e1": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_createElement_d00b8e24838e36e1"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_setclassName_5c90ce56028589a5": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_setclassName_5c90ce56028589a5"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_call_0dad7db75ec90ae7": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_call_0dad7db75ec90ae7"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_createTextNode_b7dc170e5271d075": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_createTextNode_b7dc170e5271d075"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_setnodeValue_b246d98e9aea8713": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_setnodeValue_b246d98e9aea8713"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_remove_5e80593db7fb8c61": function(p0i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_remove_5e80593db7fb8c61"](p0i32);
/******/ 					},
/******/ 					"__wbg_remove_753943fab80b89c7": function(p0i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_remove_753943fab80b89c7"](p0i32);
/******/ 					},
/******/ 					"__wbg_appendChild_8658f795c44d1316": function(p0i32,p1i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_appendChild_8658f795c44d1316"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_new_59cb74e423758ede": function() {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_new_59cb74e423758ede"]();
/******/ 					},
/******/ 					"__wbg_stack_558ba5917b466edd": function(p0i32,p1i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_stack_558ba5917b466edd"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_error_4bb6c2a97407129a": function(p0i32,p1i32) {
/******/ 						return installedModules["../../fusion-wasm/pkg/fusion_wasm_bg.js"].exports["__wbg_error_4bb6c2a97407129a"](p0i32,p1i32);
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
/******/ 				var req = fetch(__webpack_require__.p + "" + {"../../fusion-wasm/pkg/fusion_wasm_bg.wasm":"a66895678ba55d787ca7"}[wasmModuleId] + ".module.wasm");
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// @ts-ignore\n__webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! fusion-wasm */ \"../../fusion-wasm/lib/index.js\")).then(({ default: Fusion }) => {\n    function Note(props) {\n        return Fusion.createElement(\"note-name\", { className: \"note\" },\n            \"\\u2705 \",\n            props.name);\n    }\n    ;\n    function App(props) {\n        const notes = props.notes;\n        return (Fusion.createElement(\"main\", null,\n            Fusion.createElement(\"h2\", null, \"Melhores s\\u00E9ries\"),\n            notes.map((name) => {\n                return Fusion.createElement(Note, { name: name });\n            }),\n            Fusion.createElement(\"status\", null,\n                \"it's \",\n                props.status)));\n    }\n    let notes = [\n        \"Cobra Kai\",\n        \"Dark\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n        \"Game of Thrones\",\n    ];\n    Fusion.render(Fusion.createElement(App, { status: \"WORKING\", notes: notes }), document.getElementById(\"root\"));\n    setTimeout(() => {\n        notes.push(\"Jane the virgin\");\n        Fusion.render(Fusion.createElement(App, { status: \"UPDATING\", notes: notes }), document.getElementById(\"root\"));\n    }, 5000);\n});\n\n\n//# sourceURL=webpack:///./src/index.tsx?");

/***/ })

/******/ });