(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Mew"] = factory();
	else
		root["Mew"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdateMew"];
/******/ 	window["webpackHotUpdateMew"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "faa71e038d4bbc10dce8";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "app";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
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
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/index.js")(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/is-var-name/index.mjs":
/*!********************************************!*\
  !*** ./node_modules/is-var-name/index.mjs ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return isVarName; });\n/*!\n * is-var-name | ISC (c) Shinnosuke Watanabe\n * https://github.com/shinnn/is-var-name\n*/\nfunction isVarName(str) {\n\tif (typeof str !== 'string') {\n\t\treturn false;\n\t}\n\n\tif (str.trim() !== str) {\n\t\treturn false;\n\t}\n\n\ttry {\n\t\tnew Function(str, 'var ' + str);\n\t} catch (e) {\n\t\treturn false;\n\t}\n\n\treturn true;\n}\n\n\n//# sourceURL=webpack://Mew/./node_modules/is-var-name/index.mjs?");

/***/ }),

/***/ "./src/callHooks.js":
/*!**************************!*\
  !*** ./src/callHooks.js ***!
  \**************************/
/*! exports provided: callMountedHooks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"callMountedHooks\", function() { return callMountedHooks; });\nfunction recurseThroughComponentTree(root, callBack) {\r\n    var component = root.$component;\r\n    callBack(root.$component);\r\n    if (root.$component.$children && root.$component.$children.$activeComponents)\r\n        root.$component.$children.$activeComponents.forEach(c => recurseThroughComponentTree(c, callBack));\r\n}\r\n\r\nfunction callMountedHooks(component) {\r\n    recurseThroughComponentTree({ $component: component }, (comp) => {\r\n        // when we figure out why mounted is call twice remove || statment\r\n        comp.$_onMounted.forEach(p => p());\r\n        if (comp.$hooks && comp.$hooks.$mounted) comp.$hooks.$mounted.call(comp.$proxy);\r\n    });\r\n}\r\n\r\n\n\n//# sourceURL=webpack://Mew/./src/callHooks.js?");

/***/ }),

/***/ "./src/computedProp.js":
/*!*****************************!*\
  !*** ./src/computedProp.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ComputedProp; });\n/* harmony import */ var _typeManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeManager */ \"./src/typeManager.js\");\n/* harmony import */ var _getRecorder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getRecorder */ \"./src/getRecorder.js\");\n/* harmony import */ var _prop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./prop */ \"./src/prop.js\");\n\r\n\r\n\r\n\r\nclass ComputedProp extends _prop__WEBPACK_IMPORTED_MODULE_2__[\"default\"] {\r\n    constructor(descriptor) {\r\n        super(null, descriptor.type || 'any', true);\r\n\r\n        this.$className = 'ComputedProp';\r\n        if (!_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isFunction(descriptor.compute)) {\r\n            throw new Error('Computed Properties must have a function registered under \"compute\".');\r\n        }\r\n\r\n        this.$computable = descriptor.compute;\r\n        this.$watch = _typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isArray(descriptor.watch) ? descriptor.watch : [];\r\n        this.$dynamic = _typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isBool(descriptor.dynamic) ? descriptor.dynamic : true;\r\n        this.value = null;\r\n    }\r\n\r\n    $initalize(self) {\r\n        var isDynamic = this.$dynamic;\r\n        var $addWatcher = this.$addWatcher.bind(this)\r\n        this.$evalFunction = Object(_getRecorder__WEBPACK_IMPORTED_MODULE_1__[\"GetEvalFunctionInSelf\"])(self, this.$computable, function(propName, prop) {\r\n            if (isDynamic) {\r\n                $addWatcher(prop, propName);\r\n            }\r\n        });\r\n        for (var w of this.$watch) {\r\n            this.$addWatcher(self[w], w);\r\n        }\r\n        this.$compute();\r\n    }\r\n\r\n    $addWatcher(prop, propName) {\r\n        if (!_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isProp(prop)) {\r\n            console.error('Cannot set computed watch on non-prop object. PropName: ', propName);\r\n        } else {\r\n            if (!prop.$hasDep(dep => _typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isObject(dep) && dep.This === this)) {\r\n                prop.$addDep({ This: this, $run: this.$compute.bind(this) });\r\n            } \r\n        }\r\n    }\r\n\r\n    $compute() {\r\n        return this.$setValue(this.$evalFunction() || null, true, true);\r\n    }\r\n} \r\n\r\n\n\n//# sourceURL=webpack://Mew/./src/computedProp.js?");

/***/ }),

/***/ "./src/getRecorder.js":
/*!****************************!*\
  !*** ./src/getRecorder.js ***!
  \****************************/
/*! exports provided: GetEvalFunctionInSelf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GetEvalFunctionInSelf\", function() { return GetEvalFunctionInSelf; });\n/* harmony import */ var _typeManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeManager */ \"./src/typeManager.js\");\n/* harmony import */ var _proxyContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./proxyContext */ \"./src/proxyContext.js\");\n\r\n\r\n\r\nfunction GetEvalFunctionInSelf(self, evalScript, onGet) {\r\n    var proxyGet;\r\n    if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isProxyContext(self)) {\r\n        proxyGet = Object(_proxyContext__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(self.$component(), { onGet: onGet });\r\n    } else {\r\n        proxyGet = Object(_proxyContext__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(self, { onGet: onGet });\r\n    } \r\n    var evalFun;\r\n\r\n    if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isFunction(evalScript)) {\r\n        evalFun = evalScript;\r\n    } else {\r\n        evalFun = Function.call(null, '\"use strict\";\\nreturn ('+evalScript+');');\r\n    }\r\n    return evalFun.bind(proxyGet);\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://Mew/./src/getRecorder.js?");

/***/ }),

/***/ "./src/htmlPropertyManager.js":
/*!************************************!*\
  !*** ./src/htmlPropertyManager.js ***!
  \************************************/
/*! exports provided: removeStyle, addStyle, removeProperty, setProperty, hasClass, addClass, removeClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeStyle\", function() { return removeStyle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addStyle\", function() { return addStyle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeProperty\", function() { return removeProperty; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setProperty\", function() { return setProperty; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasClass\", function() { return hasClass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addClass\", function() { return addClass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeClass\", function() { return removeClass; });\nfunction removeStyle(node, styleTag) {\r\n    if (node.style.removeProperty) {\r\n        node.style.removeProperty(styleTag);\r\n    } else {\r\n        node.style.removeAttribute(styleTag);\r\n    }\r\n}\r\n\r\nfunction addStyle(node, styleTag, value) {\r\n    if (node.style.setProperty) {\r\n        node.style.setProperty(styleTag, value);\r\n    } else {\r\n        node.style.setAttribute(styleTag, value);\r\n    }\r\n}\r\n\r\nfunction removeProperty(node, attr) {\r\n    if (node.removeProperty) {\r\n        node.removeProperty(attr);\r\n    } else {\r\n        node.removeAttribute(attr);\r\n    }\r\n}\r\n\r\nfunction setProperty(node, attr, value) {\r\n    if (node.setProperty) {\r\n        node.setProperty(attr, value);\r\n    } else {\r\n        node.setAttribute(attr, value);\r\n    }\r\n}\r\n\r\nfunction hasClass(ele,cls) {\r\n    return !!ele.className.match(new RegExp('(\\\\s|^)'+cls+'(\\\\s|$)'));\r\n}\r\n\r\nfunction addClass(ele,cls) {\r\n    if (!hasClass(ele,cls)) ele.className = (ele.className + \" \" + cls).trim();\r\n}\r\n\r\nfunction removeClass(ele,cls) {\r\n    if (hasClass(ele,cls)) {\r\n        var reg = new RegExp('(\\\\s|^)'+cls+'(\\\\s|$)');\r\n        ele.className = ele.className.replace(reg,'');\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://Mew/./src/htmlPropertyManager.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: Component, MountComponent, ComputedProp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _parser_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parser/parser */ \"./src/parser/parser.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return _parser_parser__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"MountComponent\", function() { return _parser_parser__WEBPACK_IMPORTED_MODULE_0__[\"MountComponent\"]; });\n\n/* harmony import */ var _computedProp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./computedProp */ \"./src/computedProp.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ComputedProp\", function() { return _computedProp__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://Mew/./src/index.js?");

/***/ }),

/***/ "./src/parser/childParser.js":
/*!***********************************!*\
  !*** ./src/parser/childParser.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/parser/utils.js\");\n/* harmony import */ var _typeManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../typeManager */ \"./src/typeManager.js\");\n/* harmony import */ var _propParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./propParser */ \"./src/parser/propParser.js\");\n\r\n\r\n\r\n\r\n\r\nfunction processListener(listeners, callBack) {\r\n    if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isObject(listeners)) {\r\n        console.error('Listeners on child must be in form of object.')\r\n    } else {\r\n        for (var eventName in listeners) {\r\n            if (listeners.hasOwnProperty(eventName)) {\r\n                if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isFunction(listeners[eventName])) {\r\n                    console.error('Listeners bound to an event must be of type \"function\"')\r\n                } else {\r\n                    callBack(eventName, listeners[eventName]);\r\n                }\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\nfunction processChildren(self, childrenDef) {\r\n    if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isObject(childrenDef)) {\r\n        console.error(\"Malformed children object.\");\r\n        return;\r\n    }\r\n\r\n    if (childrenDef.hasOwnProperty('props')) {\r\n        if (Array.isArray(childrenDef.props)) {\r\n            Object(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"PROCESS_PROP_OPTIONS\"].ARRAY, self.$children, childrenDef.props, self)\r\n        } else if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isObject(childrenDef.props)) {\r\n            Object(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"PROCESS_PROP_OPTIONS\"].DEFINITION_OBJECT, self.$children, childrenDef.props, self)\r\n        } else {\r\n            console.error('Child props must be of type Array or Object');\r\n        }\r\n    }\r\n\r\n    if (childrenDef.hasOwnProperty('listeners')) {\r\n        processListener(childrenDef.listeners, (eventName, eventHandler) => self.$listeners[eventName] = eventHandler);\r\n    }\r\n\r\n    if (childrenDef.hasOwnProperty('components')) {\r\n        if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isObject(childrenDef.components)) {\r\n            console.error('components on children must be in form of object.');\r\n        } else {\r\n            var components = childrenDef.components;\r\n            for (var componentName in components) {\r\n                if (components.hasOwnProperty(componentName)) {\r\n                    var compList = components[componentName];\r\n                    if (!Array.isArray(compList))\r\n                         compList = [compList];\r\n                    for (var comp of compList) {\r\n                        var rv = {};\r\n                        if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isObject(comp)) {\r\n                            console.error('Individual components must either be object or Array of objects');\r\n                            continue;\r\n                        }\r\n                        \r\n                        if (comp.hasOwnProperty('definition') && _typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isComponentFactory(comp.definition)) {\r\n                            rv.$definition = comp.definition.$clone();\r\n                        } else {\r\n                            console.error('Component must have definition and it be constructed by component factory');\r\n                            continue;\r\n                        }\r\n\r\n                        if (comp.hasOwnProperty('props')) {\r\n                            if (Array.isArray(comp.props)) {\r\n                                Object(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"PROCESS_PROP_OPTIONS\"].ARRAY, rv, comp.props, Object.assign({}, self.$children, self))\r\n                            } else if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isObject(comp.props)) {\r\n                                Object(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"PROCESS_PROP_OPTIONS\"].DEFINITION_OBJECT, rv, comp.props, Object.assign({}, self.$children, self));\r\n                            } else {\r\n                                console.error('Props on component expected to be of type \"object\" or an array');\r\n                            }\r\n                        }\r\n\r\n                        rv.$listeners = {};\r\n                        if (comp.hasOwnProperty('listeners')) {\r\n                            processListener(comp.listeners, (eventName, eventHandler) => rv.$listeners[eventName] = eventHandler);\r\n                        }\r\n\r\n                        rv.$prepend = false;\r\n                        if (comp.hasOwnProperty('prepend')) {\r\n                            rv.$prepend = _typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isBool(comp.prepend) ? comp.prepend : false;\r\n                        }\r\n\r\n                        var eventNames = Object.keys(self.$listeners).concat(Object.keys(rv.$listeners))\r\n                                            .filter((value, index, self) => self.indexOf(value) === index); // get unique\r\n                        var providedListeners = {};\r\n                        for (var eventName of eventNames) {\r\n                            providedListeners[eventName] = [];\r\n                            if (rv.$listeners[eventName]) providedListeners[eventName].push(rv.$listeners[eventName]);\r\n                            if (self.$listeners[eventName]) providedListeners[eventName].push(self.$listeners[eventName]);\r\n                        }\r\n\r\n                        rv.$definition.$addScope(componentName, { // leave null so we can pass the element\r\n                            $props: _utils__WEBPACK_IMPORTED_MODULE_0__[\"default\"].objectFilter(Object.assign({}, rv, self.$children, self), (key, value) => _typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isProp(value)),\r\n                            $parent: self,\r\n                            $listeners: providedListeners                        \r\n                        });\r\n\r\n                        if (!self.$children.$components[componentName])\r\n                            self.$children.$components[componentName] = []\r\n                        self.$children.$components[componentName].push(rv);\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (processChildren);\r\n\n\n//# sourceURL=webpack://Mew/./src/parser/childParser.js?");

/***/ }),

/***/ "./src/parser/hooksParser.js":
/*!***********************************!*\
  !*** ./src/parser/hooksParser.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _typeManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../typeManager */ \"./src/typeManager.js\");\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function(descriptor) {\r\n\r\n    if (descriptor.hasOwnProperty('mounted')) {\r\n        if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isFunction(descriptor.mounted)) {\r\n            this.$hooks.$mounted = descriptor.mounted;\r\n        } else {\r\n            console.error('life cycle hooks must be of type function. At: ', descriptor);\r\n        }\r\n    }\r\n\r\n    if (descriptor.hasOwnProperty('created')) {\r\n        if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isFunction(descriptor.created)) {\r\n            this.$hooks.$created = descriptor.created;\r\n        } else {\r\n            console.error('life cycle hooks must be of type function. At: ', descriptor);\r\n        }\r\n    }\r\n});\n\n//# sourceURL=webpack://Mew/./src/parser/hooksParser.js?");

/***/ }),

/***/ "./src/parser/htmlParser.js":
/*!**********************************!*\
  !*** ./src/parser/htmlParser.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/parser/utils.js\");\n/* harmony import */ var _typeManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../typeManager */ \"./src/typeManager.js\");\n/* harmony import */ var _htmlPropertyManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../htmlPropertyManager */ \"./src/htmlPropertyManager.js\");\n/* harmony import */ var _getRecorder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../getRecorder */ \"./src/getRecorder.js\");\n/* harmony import */ var _callHooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../callHooks */ \"./src/callHooks.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nfunction attributeObjectParser(evalObj, performAction, node, attribute) {\r\n    if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isObject(evalObj)) {\r\n        for (var key in evalObj) {\r\n            if (evalObj.hasOwnProperty(key)) {\r\n                performAction(node, key, evalObj[key], attribute);\r\n            }\r\n        }\r\n    } else if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isUndef(evalObj, true)) {\r\n        console.error('Attribute: \"' + attribute + '\" is returning something other than object undefined or null on node: ', node);\r\n    }\r\n}\r\n\r\nfunction attributeBoolParser(evalObj, performAction, node, attribute) {\r\n    if (evalObj) {\r\n        return performAction(node, true, attribute);\r\n    } else {\r\n        return performAction(node, false, attribute);\r\n    }\r\n}\r\n\r\nfunction attributeStringParser(evalObj, performAction, node, attribute) {\r\n    if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isString(evalObj)) {\r\n        return performAction(node, evalObj, attribute);\r\n    } else {\r\n        console.error(attribute + \" is returning sometthing other than type 'string' on node: \", node);\r\n    }\r\n}\r\n\r\nfunction addAttributeParser(self, node, attribute, evalType, performAction) {\r\n    var addDeps = function(propName, prop) {\r\n        if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isProp(prop)) {\r\n            if (!prop.$hasDep((dep) => _typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isObject(dep) && dep.node === node && dep.attribute === attribute))\r\n                prop.$addDep({ node: node, attribute: attribute, $run: performEval});\r\n        }\r\n    }\r\n\r\n    var getterFun = Object(_getRecorder__WEBPACK_IMPORTED_MODULE_3__[\"GetEvalFunctionInSelf\"])(self, node.getAttribute(attribute), addDeps);\r\n    node.removeAttribute(attribute); // clean up after ourselves\r\n\r\n    var performEval = function() {\r\n        var evalObj = getterFun();\r\n        switch(evalType.toLowerCase()) {\r\n            case \"object\":\r\n                return attributeObjectParser(evalObj, performAction, node, attribute);\r\n            case \"bool\":\r\n            case \"boolean\":\r\n                return attributeBoolParser(evalObj, performAction, node, attribute);\r\n            case \"string\":\r\n                return attributeStringParser(evalObj, performAction, node, attribute);\r\n            case \"any\":\r\n                return performAction(node, evalObj, attribute);\r\n        }\r\n    };\r\n    performEval();\r\n}\r\n\r\nfunction stringParser(evalObj, performAction, node) {\r\n    if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isString(evalObj)) {\r\n        performAction(node, evalObj);\r\n    } else {\r\n        console.error('Template: \"'+evalObj+'\" is returning sometthing other than type \"string\" on node: ', node);\r\n    }\r\n}\r\n\r\nvar PLACE_HOLDER_COMMENT = () => _utils__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getDocument('<!-----   -----!>').content.childNodes[0];\r\nfunction addInlineTextParser(self, node, text) {\r\n    var guid = _utils__WEBPACK_IMPORTED_MODULE_0__[\"default\"].uuidv4();\r\n    var newNode = _utils__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getDocument('<span m-text-render-'+guid+'></span>').content.childNodes[0];\r\n    node.parentNode.replaceChild(newNode, node);\r\n    var nodeList = [newNode];\r\n    var addDeps = function(propName, prop) {\r\n        if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isProp(prop)) {\r\n            if (!prop.$hasDep((dep) => _typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isObject(dep) && dep.guid === guid && dep.attribute === 'text'))\r\n                prop.$addDep({ guid: guid, attribute: 'text', $run: performEval});\r\n        }\r\n    }\r\n\r\n    var getterFun = Object(_getRecorder__WEBPACK_IMPORTED_MODULE_3__[\"GetEvalFunctionInSelf\"])(self, '`'+ text + '`', addDeps);\r\n\r\n    var performEval = function() {\r\n        var evalObj = getterFun();\r\n        var first = nodeList.shift();\r\n        var parentNode = first.parentNode;\r\n        var placeholder = PLACE_HOLDER_COMMENT();\r\n        parentNode.replaceChild(placeholder, first);\r\n        nodeList.forEach(node => parentNode.removeChild(node));\r\n        nodeList = [];\r\n        // reverse because there is no insert after function\r\n        var elements = [..._utils__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getDocument(evalObj).content.childNodes].reverse();\r\n\r\n        if (elements.length > 1) {\r\n            var first = elements.shift();\r\n            parentNode.replaceChild(first, placeholder);\r\n            nodeList = [first];\r\n            elements.forEach(element => {\r\n                parentNode.insertBefore(element, nodeList[nodeList.length - 1]);\r\n                nodeList.push(element);\r\n            });\r\n        } else {\r\n            nodeList = [placeholder];\r\n        }\r\n    };\r\n\r\n    return performEval;\r\n}\r\n\r\nfunction processHtmlRecursively(self, parentNode) {\r\n    for (var node of parentNode.childNodes) {\r\n        self.$nodes.push(node);\r\n        if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isTextNode(node)) {\r\n            var litRegex = /{{([^}}]+)}}/g;// includes ${} template literal syntax\r\n            var text = node.nodeValue;\r\n            var found = text.match(litRegex);\r\n            if (found && found.length > 0) {\r\n                // replaces the matches with template literal syntax\r\n                for (var f of found) {\r\n                    text = text.replace(f, '$' + f.trim().substr(1, f.length - 2));\r\n                }\r\n                self.$_onMounted.push(addInlineTextParser(self, node, text));\r\n            }\r\n        } else if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isElementNode(node)) {\r\n            if (node.getAttribute(\"m-bind:class\")) {\r\n                addAttributeParser(self, node, \"m-bind:class\", \"object\", function(node, className, value) {\r\n                    if (value) Object(_htmlPropertyManager__WEBPACK_IMPORTED_MODULE_2__[\"addClass\"])(node, className);\r\n                    else Object(_htmlPropertyManager__WEBPACK_IMPORTED_MODULE_2__[\"removeClass\"])(node, className);\r\n                });\r\n\r\n            }\r\n            if (node.getAttribute(\"m-bind:style\")) {\r\n                addAttributeParser(self, node, \"m-bind:style\", \"object\", function(node, styleName, styleValue) {\r\n                    if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isString(styleValue) && styleValue.length > 0) \r\n                        Object(_htmlPropertyManager__WEBPACK_IMPORTED_MODULE_2__[\"addStyle\"])(node, styleName, styleValue);\r\n                    else \r\n                        Object(_htmlPropertyManager__WEBPACK_IMPORTED_MODULE_2__[\"removeStyle\"])(node, styleName);\r\n                });\r\n            }\r\n            // must come after m-bind:style so it can override if needed\r\n            if (node.getAttribute(\"m-show\")) {\r\n                addAttributeParser(self, node, \"m-show\", \"bool\", function(node, shouldShow) {\r\n                    if (shouldShow) \r\n                        Object(_htmlPropertyManager__WEBPACK_IMPORTED_MODULE_2__[\"removeStyle\"])(node, \"display\");\r\n                    else\r\n                        Object(_htmlPropertyManager__WEBPACK_IMPORTED_MODULE_2__[\"addStyle\"])(node, \"display\", \"none\");\r\n                });\r\n            }\r\n\r\n            if (node.getAttribute(\"m-on\")) {\r\n                addAttributeParser(self, node, \"m-on\", \"object\", function(node, eventName, fun) {\r\n                    if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isFunction(fun)) {\r\n                        if (!self.$htmlEvents[node]) self.$htmlEvents[node] = [];\r\n                        if (!self.$htmlEvents[node].some(p => p.eventName === eventName && (p.action === fun || p.action.toString() === fun.toString()))) {\r\n                            self.$htmlEvents[node].push({\r\n                                eventName: eventName,\r\n                                node: node,\r\n                                action: fun\r\n                            });\r\n                            node.addEventListener(eventName, fun.bind(self.$proxy));\r\n                        }\r\n                    } else {\r\n                        console.error(\"m-on events expect type of function as return value for an event\");\r\n                    }\r\n                });\r\n            }\r\n\r\n            if (node.getAttribute(\"m-comp\")) {\r\n                addAttributeParser(self, node, \"m-comp\", \"any\", function(node, componentNames) {\r\n                    // remove previous active components for this node\r\n                    self.$children.$activeComponents = self.$children.$activeComponents.filter(active => {\r\n                        if (active.$parentNode === node) {\r\n                            node.removeChild(active.$childNode); // remove the component node\r\n                            return false; // filter the $activeComponent out\r\n                        }\r\n                        return true;\r\n                    });\r\n                    if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isArray(componentNames)) componentNames = [componentNames];\r\n                    for (var componentName of componentNames) {\r\n                        if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isString(componentName) && self.$children.$components.hasOwnProperty(componentName)) {\r\n                            var components = self.$children.$components[componentName];\r\n\r\n                            if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isArray(components)) components = [components];\r\n                            // add new active componenets for this node\r\n                            self.$children.$activeComponents = self.$children.$activeComponents.concat(\r\n                                components.reduce((accumulator, compDescription) => {\r\n                                    var comp = compDescription.$definition.$create(node);\r\n                                    var childNodes = [...comp.$templateHtml.content.children]; // conversion from htmlNodeList to array\r\n                                    accumulator = accumulator.concat(childNodes.map(child => {\r\n                                        if (compDescription.$prepend === true) {\r\n                                            node.prepend(child);\r\n                                        } else {\r\n                                            node.appendChild(child);\r\n                                        }\r\n\r\n                                        return {\r\n                                            $component: comp,\r\n                                            $parentNode: node,\r\n                                            $childNode: child\r\n                                        };\r\n                                    }));\r\n                                    Object(_callHooks__WEBPACK_IMPORTED_MODULE_4__[\"callMountedHooks\"])(comp);\r\n                                    return accumulator;\r\n                                }, [])\r\n                            );\r\n                        } else {\r\n                            console.error('Component \"'+componentName+'\" not found for node: ', node);\r\n                        }\r\n                    }\r\n                });\r\n            }\r\n        }\r\n        processHtmlRecursively(self, node);\r\n    }\r\n}\r\n\r\nfunction processTemplateHtml() {\r\n    if (!this.$templateHtml && this.$templateHtml.content) return;\r\n    if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isElementNode(this.$templateHtml)) {\r\n        console.error(\"Cannot parse templates html if not a dom element.\");\r\n        return;\r\n    }\r\n\r\n    processHtmlRecursively(this, this.$templateHtml.content);\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (processTemplateHtml);\n\n//# sourceURL=webpack://Mew/./src/parser/htmlParser.js?");

/***/ }),

/***/ "./src/parser/parentParser.js":
/*!************************************!*\
  !*** ./src/parser/parentParser.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/parser/utils.js\");\n/* harmony import */ var _typeManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../typeManager */ \"./src/typeManager.js\");\n/* harmony import */ var _propParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./propParser */ \"./src/parser/propParser.js\");\n/* harmony import */ var _prop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../prop */ \"./src/prop.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nfunction freezePropOnSelf(self, prop) {\r\n    if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isProp(self[prop])) {\r\n        console.error('Cannot freeze prop that is not constructed by \"Prop\"');\r\n        return;\r\n    }\r\n    self[prop] = new _prop__WEBPACK_IMPORTED_MODULE_3__[\"default\"](self[prop], 'prop', true);\r\n}\r\n\r\nfunction processParent(self, parentDef, parentScopeAccess) {\r\n    if (!parentDef || typeof parentDef !== 'object') {\r\n        console.error(\"Malformed parent object.\");\r\n        return;\r\n    }\r\n\r\n    var parentScopeIsGood = parentScopeAccess && typeof parentScopeAccess === 'object';\r\n    // pasrse the props object\r\n    if (parentDef.hasOwnProperty('props')) {\r\n        if (!parentScopeIsGood || !parentScopeAccess.$props || typeof parentScopeAccess.$props !== 'object') {\r\n            console.error('Cannot inherit props from null parent props.');\r\n        } else {\r\n            var props = parentDef.props;\r\n            if (Array.isArray(props)) {\r\n                Object(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"PROCESS_PROP_OPTIONS\"].ARRAY, self, props, parentScopeAccess.$props, function(self, prop) {\r\n                    self.$inheritedProps.push(prop);\r\n                    freezePropOnSelf(self, prop);\r\n                })\r\n            } else if (typeof props === 'object') {\r\n                Object(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"PROCESS_PROP_OPTIONS\"].RENAME_OBJECT, self, props, parentScopeAccess.$props, function(self, prop) { \r\n                    self.$inheritedProps.push(prop);\r\n                    freezePropOnSelf(self, prop);\r\n                })\r\n            } else {\r\n                console.error('Props on parent must be of type \"object\".')\r\n            }\r\n        }\r\n    }\r\n\r\n    if (parentDef.hasOwnProperty('slots')) {\r\n        if (Array.isArray(parentDef.slots)) {\r\n            console.error('slots on parent must be array of strings.')\r\n        } else {\r\n            for (var slot of parentDef.slots) {\r\n                if (typeof slot !== 'string')\r\n                    console.error('Only strings are allowed in slot array values.');\r\n                else if (!parentScope.$slots || typeof parentScope.$slots !== 'object' || !parentScope.$slots[slot]) {\r\n                    console.error('Slot \"'+slot+'\" doesn\\' exist on parent');\r\n                } else {\r\n                    self.$slots[slot] = parentScope.$slots[slot];\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    if (parentDef.hasOwnProperty('emit')) {\r\n        if (Array.isArray(parentDef.emit)) {\r\n            for(var eventName of parentDef.emit) {\r\n                if (typeof eventName !== 'string') {\r\n                    console.error('Each element in emit array must be string.');\r\n                } else {\r\n                    if (!parentScopeAccess.$listeners) parentScopeAccess.$listeners = {};\r\n                    var listeners = parentScopeAccess.$listeners[eventName] || [];\r\n                    self.$emit[eventName] =  (function(self, listeners){\r\n                        var rv = function() {\r\n                            for(var listener of listeners) {\r\n                                if (typeof listener === 'function')\r\n                                    listener.apply(self.$parent.$proxy, arguments);\r\n                                else\r\n                                    console.error('Listener is not of type \"function\"')\r\n                            }\r\n                        };\r\n                        rv.eventName = eventName;\r\n                        return rv;\r\n                    })(self, listeners);\r\n                }\r\n            }\r\n        } else {\r\n            console.error('Emit defined on parent must be array.');\r\n        }\r\n    }\r\n\r\n    if (parentScopeAccess && parentScopeAccess.hasOwnProperty('$parent') && _typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isComponent(parentScopeAccess.$parent)) {\r\n        self.$parent = parentScopeAccess.$parent;\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (processParent);\r\n\n\n//# sourceURL=webpack://Mew/./src/parser/parentParser.js?");

/***/ }),

/***/ "./src/parser/parser.js":
/*!******************************!*\
  !*** ./src/parser/parser.js ***!
  \******************************/
/*! exports provided: Component, MountComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return ComponentFactory; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MountComponent\", function() { return MountComponent; });\n/* harmony import */ var _childParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./childParser */ \"./src/parser/childParser.js\");\n/* harmony import */ var _parentParser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parentParser */ \"./src/parser/parentParser.js\");\n/* harmony import */ var _selfParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selfParser */ \"./src/parser/selfParser.js\");\n/* harmony import */ var _htmlParser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./htmlParser */ \"./src/parser/htmlParser.js\");\n/* harmony import */ var _hooksParser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hooksParser */ \"./src/parser/hooksParser.js\");\n/* harmony import */ var _proxyContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../proxyContext */ \"./src/proxyContext.js\");\n/* harmony import */ var _typeManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../typeManager */ \"./src/typeManager.js\");\n/* harmony import */ var _callHooks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../callHooks */ \"./src/callHooks.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nclass Component {\r\n    constructor(compDescriptor, parentScope, parentNode, componentName) {\r\n        if (!_typeManager__WEBPACK_IMPORTED_MODULE_6__[\"typeChecker\"].isObject(compDescriptor)) {\r\n            console.warn('The component descriptor must be of type \"object\"');\r\n            compDescriptor = {};\r\n        }\r\n        this.$componentName = componentName;\r\n        this.$proxy = Object(_proxyContext__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(this);\r\n        this.$className = \"Component\";\r\n        this.$rootNode = parentNode;\r\n        this.$slots = {};\r\n        this.$emit = {};\r\n        this.$parent = null;\r\n        this.$watchers = {};\r\n        this.$listeners = {};\r\n        this.$inheritedProps = [];\r\n        this.$children = {\r\n            $listeners: {},\r\n            $components: {},\r\n            $activeComponents: []\r\n        }\r\n        this.$htmlEvents = {};\r\n        this.$hooks = {\r\n            $created: null,\r\n            $mounted: null\r\n        }\r\n        this.$nodes = [];\r\n        this.$_onMounted = [];\r\n\r\n        if (!_typeManager__WEBPACK_IMPORTED_MODULE_6__[\"typeChecker\"].isObject(compDescriptor.self)) {\r\n            throw new Error('Components must have self defined of type \"object\".');\r\n        }\r\n\r\n        if (compDescriptor.hasOwnProperty('parent'))\r\n            _parentParser__WEBPACK_IMPORTED_MODULE_1__[\"default\"].call(this, this, compDescriptor.parent, parentScope);\r\n\r\n        _selfParser__WEBPACK_IMPORTED_MODULE_2__[\"default\"].call(this, compDescriptor.self);\r\n\r\n        if (compDescriptor.hasOwnProperty('children'))\r\n            _childParser__WEBPACK_IMPORTED_MODULE_0__[\"default\"].call(this, this, compDescriptor.children);\r\n\r\n        for (var propName in this) \r\n            if (this.hasOwnProperty(propName) && _typeManager__WEBPACK_IMPORTED_MODULE_6__[\"typeChecker\"].isComputedProp(this[propName]))\r\n                this[propName].$initalize(this);\r\n\r\n        if (compDescriptor.hasOwnProperty('hooks'))\r\n            _hooksParser__WEBPACK_IMPORTED_MODULE_4__[\"default\"].call(this, compDescriptor.hooks);\r\n        \r\n        _htmlParser__WEBPACK_IMPORTED_MODULE_3__[\"default\"].bind(this)();\r\n    }\r\n}\r\n\r\nclass ComponentFactory {\r\n    constructor(compDescriptor) {\r\n        this.descriptor = compDescriptor;\r\n        this.$className = \"ComponentFactory\";\r\n    }\r\n\r\n    $addScope(componentName, parentScope) {\r\n        this.$parentScope = parentScope;\r\n        this.$componentName = componentName;\r\n    }\r\n\r\n    $create(parentNode) {\r\n        var component = new Component(this.descriptor, this.$parentScope, parentNode, this.$componentName);\r\n\r\n        if (component.$hooks.$created) \r\n            component.$hooks.$created.call(component.$proxy);\r\n\r\n        return component.$proxy;\r\n    }\r\n\r\n    $clone() {\r\n        return new ComponentFactory(this.descriptor);\r\n    }\r\n}\r\n\r\nfunction MountComponent(nodeOrId, componentFactory) {\r\n    if (!_typeManager__WEBPACK_IMPORTED_MODULE_6__[\"typeChecker\"].isComponentFactory(componentFactory)) {\r\n        console.error('Mount type expects type of componentFactory.');\r\n        return null;\r\n    }\r\n\r\n    if (_typeManager__WEBPACK_IMPORTED_MODULE_6__[\"typeChecker\"].isString(nodeOrId))\r\n        nodeOrId = document.getElementById(nodeOrId.replace('#', ''));\r\n    \r\n    if (_typeManager__WEBPACK_IMPORTED_MODULE_6__[\"typeChecker\"].isElementNode(nodeOrId)) {\r\n        var node = nodeOrId;\r\n\r\n        var instance = componentFactory.$create(node);\r\n        node.appendChild(instance.$templateHtml.content);\r\n        // calls the mounted hook\r\n        Object(_callHooks__WEBPACK_IMPORTED_MODULE_7__[\"callMountedHooks\"])(instance);\r\n        return instance;\r\n    } else {\r\n        console.error('mount point expects valid html id or node type');\r\n        return null;\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://Mew/./src/parser/parser.js?");

/***/ }),

/***/ "./src/parser/propParser.js":
/*!**********************************!*\
  !*** ./src/parser/propParser.js ***!
  \**********************************/
/*! exports provided: PROCESS_PROP_OPTIONS, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PROCESS_PROP_OPTIONS\", function() { return PROCESS_PROP_OPTIONS; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/parser/utils.js\");\n/* harmony import */ var _typeManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../typeManager */ \"./src/typeManager.js\");\n/* harmony import */ var is_var_name__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! is-var-name */ \"./node_modules/is-var-name/index.mjs\");\n/* harmony import */ var _prop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../prop */ \"./src/prop.js\");\n\r\n\r\n\r\n\r\n\r\nfunction definePropOnSelf(self, prop, value) {\r\n    if (self.hasOwnProperty(prop)) {\r\n        if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isProp(self[prop])) {\r\n            console.warn('Redefinging prop \"'+prop+'\"');\r\n        } else {\r\n            console.error(\"Cannot redefine a public Api.\");\r\n            return;\r\n        }\r\n    }\r\n    if(!value || !_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isProp(value)) {\r\n        console.error(\"Value must be of type prop.\");\r\n        return;\r\n    }\r\n    self[prop] = value;\r\n}\r\n\r\n/**\r\n * Creates a list of props based on the inputs\r\n * Does some proxy mapping to make getting and setting the values easier\r\n * Values are mapped from the names => prop.value = valuePerName[name] || null\r\n * Dependencies are mapped from the names => prop.deps = depsPerName[name] || []\r\n * If value is already prop, just adds to the list and continues\r\n * @param {Array of Strings | String} names \r\n * @param {Object} valuePerName \r\n * @param {Object} depsPerName depsPerName[name] can return array or a single element\r\n * @returns {Object} \r\n */\r\nfunction CreateProps(propDescriptors) {\r\n    if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isObject(propDescriptors)) {\r\n        console.warn('createProps expects an object as its\\' first parameter');\r\n        return {};\r\n    }\r\n\r\n    var props = {};\r\n    for (name in propDescriptors) {\r\n        if (propDescriptors.hasOwnProperty(name)) {\r\n            var hasError = false;\r\n            var propDescript = propDescriptors[name];\r\n            if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isObject(propDescript)) {\r\n                console.warn('Property must be of type object to be processed, Property: ', propDescript);\r\n                hasError = true;\r\n            }\r\n            if (!Object(is_var_name__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(name)) {\r\n                console.error('Prop name must be a valid javascript variable name, Name: ', name);\r\n                hasError = true;\r\n            }\r\n            if (hasError) continue;\r\n            if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isProp(propDescript)) {\r\n                props[name] = propDescript;\r\n                continue;\r\n            }\r\n\r\n            var value = propDescript['value'] || null;\r\n            var type = Object(_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeSafePropGetter\"])('string', propDescript, 'type', 'any');\r\n            var shouldFreeze = Object(_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeSafePropGetter\"])('bool', propDescript, 'freeze', false);\r\n\r\n            // adds the prop to the prop array\r\n            props[name] = new _prop__WEBPACK_IMPORTED_MODULE_3__[\"default\"](value, type, shouldFreeze);\r\n        }\r\n    }\r\n    \r\n    return props;\r\n}\r\n\r\nconst PROCESS_PROP_OPTIONS = Object.freeze({\r\n    ARRAY: 0,\r\n    DEFINITION_OBJECT: 1,\r\n    RENAME_OBJECT: 2\r\n});\r\n\r\nfunction propParser(processOption, self, propsObj, scope = {}, propCallback = null) {\r\n    switch(processOption) {\r\n        case PROCESS_PROP_OPTIONS.ARRAY:\r\n            if (Array.isArray(propsObj)) {\r\n                for (var prop of propsObj) {\r\n                    if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isString(prop)) {\r\n                        console.error(\"Props defined in Array for must be a string.\");\r\n                    } else if (!scope.hasOwnProperty(prop)) {\r\n                        console.error('Prop \"' + prop +'\" definition not found.');\r\n                    } else {\r\n                        definePropOnSelf(self, prop, scope[prop]);\r\n                        if (propCallback) propCallback(self, prop, scope[prop]);\r\n                    }\r\n                }\r\n            } else {\r\n                console.error(\"Error expected array for props.\");\r\n                return false;\r\n            }\r\n        return true;\r\n        case PROCESS_PROP_OPTIONS.DEFINITION_OBJECT:\r\n            if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isObject(propsObj)) {\r\n                console.error(\"Props definition must be of type object.\");\r\n                return false;\r\n            } else {\r\n                // turns string references into props under different name\r\n                var stringObj = _utils__WEBPACK_IMPORTED_MODULE_0__[\"default\"].objectFilter(propsObj, (key, value) => _typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isString(value));\r\n                for(var sKey in stringObj) {\r\n                    if (scope.hasOwnProperty(stringObj[sKey])) propsObj[sKey] = scope[stringObj[sKey]];\r\n                    else console.error('Could not find deffinition for \"'+stringObj[sKey]+'\" to rename as \"'+sKey+'\"');\r\n                }\r\n                var createdProps = CreateProps(propsObj);\r\n                for(var prop in createdProps) {\r\n                    definePropOnSelf(self, prop, createdProps[prop]);\r\n                    if (propCallback) propCallback(self, prop, createdProps[prop]);\r\n                }\r\n            }\r\n        return true;\r\n        case PROCESS_PROP_OPTIONS.RENAME_OBJECT:\r\n            if (propsObj && typeof propsObj === 'object') {\r\n                for (var prop in propsObj) {\r\n                    if (scope.hasOwnProperty(propsObj[prop])) {\r\n                        var value = scope[propsObj[prop]];\r\n                        definePropOnSelf(self, prop, value);\r\n                        if (propCallback) propCallback(self, prop, value);\r\n                    } else {\r\n                        console.error('Prop \"' + propsObj[prop] + '\" defined as \"'+ prop +'\" but definition not found.');\r\n                    }\r\n                }\r\n            } else {\r\n                console.error(\"Error expected rename object for props.\");\r\n                return false;\r\n            }\r\n        return true;\r\n        default:\r\n            throw new Error(\"ProcessProps option not supported.\");\r\n    }\r\n}\r\n\r\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (propParser);\n\n//# sourceURL=webpack://Mew/./src/parser/propParser.js?");

/***/ }),

/***/ "./src/parser/selfParser.js":
/*!**********************************!*\
  !*** ./src/parser/selfParser.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/parser/utils.js\");\n/* harmony import */ var _typeManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../typeManager */ \"./src/typeManager.js\");\n/* harmony import */ var _propParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./propParser */ \"./src/parser/propParser.js\");\n\r\n\r\n\r\n\r\n\r\nfunction processSelf(selfDef) {\r\n    if (selfDef.hasOwnProperty('props')) {\r\n        Object(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"PROCESS_PROP_OPTIONS\"].DEFINITION_OBJECT, this, selfDef.props, this)\r\n    }\r\n\r\n    if (selfDef.hasOwnProperty('template')) {\r\n        if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isString(selfDef.template)) {\r\n            this.$template = selfDef.template;\r\n\r\n            this.$templateHtml = _utils__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getDocument(this.$template);\r\n        } else {\r\n            console.error('template must be of type \"string\"');\r\n        }\r\n    }\r\n\r\n    if (selfDef.hasOwnProperty('watchers')) {\r\n        if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isObject(selfDef.watchers)) {\r\n            console.error('watchers must be of type \"object\"');\r\n        } else {\r\n            var watchers = selfDef.watchers;\r\n            for (var propName in watchers) {\r\n                if (watchers.hasOwnProperty(propName)) {\r\n                    if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isFunction(watchers[propName])) {\r\n                        console.error('Watcher must be of type \"function\".');\r\n                    } else if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isProp(this[propName])) {\r\n                        console.error('Cannot watch \"'+propName+'\" because it is not a processed prop.');                        \r\n                    } else {\r\n                        var watchFun = watchers[propName];\r\n                        watchFun = watchFun.bind(this.$proxy);\r\n                        this[propName].$addDep(watchFun);\r\n                        this.$watchers[propName] = {\r\n                            $onchange: watchFun,\r\n                            $prop: this[propName]\r\n                        }\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (processSelf);\r\n\n\n//# sourceURL=webpack://Mew/./src/parser/selfParser.js?");

/***/ }),

/***/ "./src/parser/utils.js":
/*!*****************************!*\
  !*** ./src/parser/utils.js ***!
  \*****************************/
/*! exports provided: objectFilter, uuidv4, getDocument, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"objectFilter\", function() { return objectFilter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"uuidv4\", function() { return uuidv4; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getDocument\", function() { return getDocument; });\nfunction objectFilter(obj, predicate) {\r\n    var rv = Object.assign({}, obj);\r\n    for (var key in rv) {\r\n        if (obj.hasOwnProperty(key)) {\r\n            if (!predicate(key, obj[key]))\r\n                delete rv[key];\r\n        }\r\n    }\r\n    return rv;\r\n}\r\n\r\nfunction uuidv4() {\r\n    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {\r\n      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);\r\n      return v.toString(16);\r\n    });\r\n}\r\n\r\nvar getDocument = function(html, tagType) {\r\n    var doc = document.createElement(tagType || 'template');\r\n    doc.innerHTML = html;\r\n    return doc;\r\n}\r\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ objectFilter: objectFilter, uuidv4: uuidv4, getDocument: getDocument });\n\n//# sourceURL=webpack://Mew/./src/parser/utils.js?");

/***/ }),

/***/ "./src/prop.js":
/*!*********************!*\
  !*** ./src/prop.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _typeManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeManager */ \"./src/typeManager.js\");\n\r\n\r\n/**\r\n * Stores the name, value, and any dependencies for the property\r\n * Assumes name is of type string\r\n * Value can be of any type\r\n * Assumes all dependencies are either of tpye function or impliment the method \".run()\"\r\n * It is probably easier to use the \"createProps()\" function\r\n */\r\nclass Prop {\r\n    constructor(value, type, freezeValue) {\r\n        this.deps = [];\r\n        this.type = _typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].types.indexOf(type) > -1 ? type : 'any';\r\n        // allow inital value to be set\r\n        this.freezeValue = false;\r\n        // sets the value\r\n        var valueWasSet = this.$setValue(value || null, false);\r\n        if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isUndef(valueWasSet)) // there was some type error setting the value\r\n            this.value = null;\r\n        // set the value of freezeValue\r\n        this.freezeValue = _typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isBool(freezeValue) ? freezeValue : false;\r\n\r\n        this.$className = 'Prop';\r\n    }\r\n\r\n    $runDepsUpdate(newVal, oldVal) {\r\n        if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isProp(this.value)) {\r\n            this.value.$runDepsUpdate(newVal, oldVal);\r\n        } else {\r\n            for (var i = this.deps.length - 1; i > -1; i -= 1) {\r\n                if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isFunction(this.deps[i]))\r\n                    this.deps[i](newVal, oldVal, this.type);\r\n                else if (this.deps[i] && _typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isFunction(this.deps[i].$run)) {\r\n                    this.deps[i].$run(newVal, oldVal, this.type);\r\n                } else {\r\n                    console.error('Bad dependancy encountered, a dependancy must either be a function or have \"$run\" as a function accessable.');\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    $addDep(dep) {\r\n        if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isProp(this.value)) {\r\n            this.value.$addDep(dep);\r\n        } else {\r\n            this.deps.push(dep);\r\n        }\r\n    }\r\n\r\n    $removeDep(checker) {\r\n        if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isProp(this.value)) {\r\n            this.value.$removeDep(dep);\r\n        } else {\r\n            if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isFunction(checker)) {\r\n                this.deps =this.deps.filter(dep => checker(dep));\r\n            } else {\r\n                var index = this.deps.indexOf(checker);\r\n                if (index > -1) this.deps.splice(index, 1);\r\n            }\r\n        }\r\n    }\r\n\r\n    $hasDep(checker) {\r\n        if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isFunction(checker)) {\r\n            return this.deps.some(dep => checker(dep));\r\n        } else {\r\n            return this.deps.indexOf(checker) > -1;\r\n        }\r\n    }\r\n\r\n    $setValue(newVal, runUpdate, ignoreFrozen) {\r\n        if (!this.freezeValue || ignoreFrozen === true) {\r\n            if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isProp(this.value) && !_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isProp(newVal)) {\r\n                return this.value.setValue(newVal, runUpdate);\r\n            } else {\r\n                if (!Object(_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"isType\"])(this.type, newVal, true)) {\r\n                    console.error('Cannot set value for prop because it doesn\\'t meet type constraint of type \"'+this.type+'\"');\r\n                    return;\r\n                }\r\n                // go down the props tree to get the lowest value that is not a prop\r\n                if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isProp(newVal)) {\r\n                    while (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isProp(newVal.value)) {\r\n                        newVal = newVal.value;\r\n                    }\r\n                }\r\n                var oldVal = this.value;\r\n                this.value = newVal;\r\n                if (oldVal !== newVal && (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isBool(runUpdate) ? runUpdate : true)) \r\n                    this.$runDepsUpdate(newVal, oldVal);\r\n                return newVal;\r\n            }\r\n        } else {\r\n            console.error('Cannot set value for prop because the value is frozen. Prop: ', this);\r\n        }\r\n    }\r\n\r\n    $getValue() {\r\n        if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isProp(this.value)) {\r\n            return this.value.$getValue();\r\n        }\r\n        return this.value;\r\n    }\r\n\r\n    [Symbol.toPrimitive]() {\r\n        return this.$getValue();\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Prop);\n\n//# sourceURL=webpack://Mew/./src/prop.js?");

/***/ }),

/***/ "./src/proxyContext.js":
/*!*****************************!*\
  !*** ./src/proxyContext.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _typeManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeManager */ \"./src/typeManager.js\");\n\r\n\r\n/**\r\n * Returns a proxy for handling getting and setting props\r\n * This function also handles special props that start with '$'\r\n * @param {Object} props\r\n * @returns {Object} Proxy object\r\n */\r\nfunction ProxyContext(context, options) {\r\n    if (!_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isObject(options)) options = {};\r\n    for (var $openApi in $openApis) {\r\n        if (context.hasOwnProperty($openApi) && context[$openApi] !== $openApis[$openApi]) \r\n            console.error('Cannot use an api specific property name \"'+$openApi+'\", refer to the docs.');\r\n        context[$openApi] = $openApis[$openApi];\r\n    }\r\n    // returns a proxy to make getting and setting the values easier\r\n    return new Proxy(context, {\r\n        get: (props, prop, receiver) => {\r\n            if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isUndef(props[prop])) {\r\n                console.warn('Property \"' + prop + '\" does not exist on object. Cannot get value.');\r\n                return;\r\n            }\r\n\r\n            if (options.onGet) options.onGet(prop, props[prop]);\r\n\r\n            if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isFunction(props[prop])) \r\n                return props[prop].bind(props);\r\n\r\n            if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isProp(props[prop]))\r\n                return props[prop].$getValue();\r\n\r\n            return props[prop];\r\n        },\r\n        set: (props, prop, value) => {\r\n            if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isUndef(props[prop])) {\r\n                console.warn('Property \"' + prop + '\" does not exist on object. Cannot set value.');\r\n                return false;\r\n            }\r\n            if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isProp(props[prop])) {\r\n                props[prop].$setValue(value);\r\n                if (options.onSet) options.onSet(prop, props[prop], value);\r\n                return true;\r\n            } else {\r\n                console.error('Can only set value for type of prop.');\r\n            }\r\n            return false;\r\n        },\r\n        $className: 'ProxyContext'\r\n    });\r\n}\r\n\r\nvar $openApis = {\r\n    /**\r\n     * Removes all dependencies from a prop\r\n     * this -> props object\r\n     * @param {String} prop property to add deps to\r\n     */\r\n    $forceDepsUpdate: function (prop) {\r\n        if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isProp(this[prop])) \r\n            this[prop].$runDepsUpdate();\r\n    },\r\n    // Exposes the raw prop within a wrapped object\r\n    $props: function(prop) {\r\n        if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isProp(this[prop])) \r\n            return this[prop];\r\n        return null;\r\n    },\r\n    $component: function() {\r\n        return this;\r\n    }\r\n};\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ProxyContext);\n\n//# sourceURL=webpack://Mew/./src/proxyContext.js?");

/***/ }),

/***/ "./src/typeManager.js":
/*!****************************!*\
  !*** ./src/typeManager.js ***!
  \****************************/
/*! exports provided: typeChecker, isType, typeSafeGetter, typeSafePropGetter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"typeChecker\", function() { return typeChecker; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isType\", function() { return isType; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"typeSafeGetter\", function() { return typeSafeGetter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"typeSafePropGetter\", function() { return typeSafePropGetter; });\n\r\nfunction createTypeChecker(checker) {\r\n    return function(obj, nullable = false) {\r\n        if (typeof obj === 'undefined') return false;\r\n        if (obj === null) return !!nullable;\r\n        return checker(obj);\r\n    }\r\n}\r\n\r\nvar typeChecker = {\r\n    types: ['any', 'bool', 'boolean', 'array', 'string', 'object', 'function', 'symbol', 'int', 'float',\r\n            'number', 'undefined', 'prop', 'component', 'component-factory', 'get-recorder', 'proxy-context', 'element-node', 'text-node'],\r\n    isUndef: (obj) => typeof obj === 'undefined',\r\n    isString: createTypeChecker((obj) => typeof obj === 'string'),\r\n    isObject: createTypeChecker((obj) => typeof obj === 'object'),\r\n    isFunction: createTypeChecker((obj) => typeof obj === 'function'),\r\n    isBool: createTypeChecker((obj) => typeof obj === 'boolean'),\r\n    isSymbol: createTypeChecker((obj) => typeof obj === 'symbol'),\r\n    isArray: createTypeChecker((obj) => Array.isArray(obj)),\r\n    isNumber: createTypeChecker((obj) => !isNaN(obj)),\r\n    isInt: createTypeChecker((obj) => Number(obj) === obj && obj % 1 === 0),\r\n    isFloat: createTypeChecker((obj) => Number(obj) === obj && obj % 1 !== 0),\r\n    isPropStrict: createTypeChecker((obj) => typeChecker.isObject(obj) && obj.$className === 'Prop'),\r\n    isProp: createTypeChecker((obj) => typeChecker.isPropStrict(obj) || typeChecker.isComputedProp(obj)),\r\n    isComponent: createTypeChecker((obj) => typeChecker.isObject(obj) && obj.$className === 'Component'),\r\n    isComponentFactory: createTypeChecker((obj) => typeChecker.isObject(obj) && obj.$className === 'ComponentFactory'),\r\n    isGetRecorder: createTypeChecker((obj) => typeChecker.isObject(obj) && obj.$className === 'GetRecorder'),\r\n    isComputedProp: createTypeChecker((obj) => typeChecker.isObject(obj) && obj.$className === 'ComputedProp'),\r\n    isProxyContext: createTypeChecker((obj) => typeChecker.isObject(obj) && obj.$className === 'ProxyContext'),\r\n    isElementNode: createTypeChecker((obj) => typeChecker.isObject(HTMLElement) ? \r\n                                        obj instanceof HTMLElement : //DOM2\r\n                                        typeChecker.isObject(obj) && obj.nodeType === Node.ELEMENT_NODE && typeChecker.isString(obj.nodeName)),\r\n    isTextNode: createTypeChecker((obj) => typeChecker.isObject(obj) && obj.nodeType === Node.TEXT_NODE && typeChecker.isString(obj.nodeName))\r\n}\r\n\r\nvar isType = function(type, obj, nullable = false) {\r\n    if (typeof obj === 'undefined') return false;\r\n    switch(type.toLowerCase()) {\r\n        case 'any':\r\n            if (typeof obj === 'undefined') return false;\r\n            if (obj === null) return !!nullable;\r\n            return true;\r\n        case 'array':\r\n            return typeChecker.isArray(obj, nullable);\r\n        case 'string':\r\n            return typeChecker.isString(obj, nullable);\r\n        case 'object':\r\n            return typeChecker.isObject(obj, nullable);\r\n        case 'function':\r\n            return typeChecker.isFunction(obj, nullable);\r\n        case 'symbol':\r\n            return typeChecker.isSymbol(obj, nullable);\r\n        case 'int':\r\n            return typeChecker.isInt(obj, nullable);\r\n        case 'float':\r\n            return typeChecker.isFloat(obj, nullable);\r\n        case 'number':\r\n            return typeChecker.isNumber(obj, nullable);\r\n        case 'bool':\r\n        case 'boolean':\r\n            return typeChecker.isBool(obj, nullable);\r\n        case 'prop':\r\n            return typeChecker.isProp(obj, nullable);\r\n        case 'computed-prop':\r\n            return typeChecker.isComputedProp(obj, nullable);\r\n        case 'component':\r\n            return typeChecker.isComponent(obj, nullable);\r\n        case 'component-factory':\r\n            return typeChecker.isComponentFactory(obj, nullable);\r\n        case 'get-recorder':\r\n            return typeChecker.isGetRecorder(obj, nullable);\r\n        case 'proxy-context':\r\n            return typeChecker.isProxyContext(obj, nullable);\r\n        case 'element-node':\r\n            return typeChecker.isElementNode(obj, nullable);\r\n        case 'text-node':\r\n            return typeChecker.isTextNode(obj, nullable);\r\n        default:\r\n            throw new Error('Type \"'+type+'\" is not supported.');\r\n    }\r\n}\r\n\r\nvar typeSafeGetter = function(type, value, defaultRv, nullable = false) {\r\n    if (typeof value === 'undefined') return defaultRv;\r\n    if(isType(type, value, nullable)) \r\n        return value;\r\n    return defaultRv;\r\n}\r\n\r\nvar typeSafePropGetter = function(type, obj, prop, defaultRv, nullable = false) {\r\n    if (obj.hasOwnProperty(prop)) {\r\n        return typeSafeGetter(type, obj[prop], defaultRv, nullable);\r\n    }\r\n    return defaultRv;\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://Mew/./src/typeManager.js?");

/***/ })

/******/ });
});