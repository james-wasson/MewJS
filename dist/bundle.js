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
/******/ 	var hotCurrentHash = "a9031101d97c9f3463ed";
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
/*! exports provided: Component, MountComponent, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _parser_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parser/parser */ \"./src/parser/parser.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return _parser_parser__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"MountComponent\", function() { return _parser_parser__WEBPACK_IMPORTED_MODULE_0__[\"MountComponent\"]; });\n\n\r\n\r\nif (window.MewJS) throw new Error(\"MewJS already defined on the window\");\r\n\r\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (_parser_parser__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\n//# sourceURL=webpack://Mew/./src/index.js?");

/***/ }),

/***/ "./src/parser/childParser.js":
/*!***********************************!*\
  !*** ./src/parser/childParser.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/parser/utils.js\");\n/* harmony import */ var _typeManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../typeManager */ \"./src/typeManager.js\");\n/* harmony import */ var _propParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./propParser */ \"./src/parser/propParser.js\");\n\r\n\r\n\r\n\r\n\r\nfunction processListener(listeners, callBack) {\r\n    if (!listeners || typeof listeners !== 'object') {\r\n        console.error('Listeners on child must be in form of object.')\r\n    } else {\r\n        for (var eventName in listeners) {\r\n            if (listeners.hasOwnProperty(eventName)) {\r\n                if (typeof listeners[eventName] !== 'function') {\r\n                    console.error('Listeners bound to an event must be of type \"function\"')\r\n                } else {\r\n                    callBack(eventName, listeners[eventName]);\r\n                }\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\nfunction processChildren(childrenDef) {\r\n    if (!childrenDef || typeof childrenDef !== 'object') {\r\n        console.error(\"Malformed children object.\");\r\n        return;\r\n    }\r\n\r\n    if (childrenDef.hasOwnProperty('props')) {\r\n        if (Array.isArray(childrenDef.props)) {\r\n            Object(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"PROCESS_PROP_OPTIONS\"].ARRAY, this.$children, childrenDef.props, this)\r\n        } else if (childrenDef.props && typeof childrenDef.props === 'object') {\r\n            Object(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"PROCESS_PROP_OPTIONS\"].DEFINITION_OBJECT, this.$children, childrenDef.props, this)\r\n        } else {\r\n            console.error('Child props must be of type Array or Object');\r\n        }\r\n    }\r\n\r\n    this.$listeners = {};\r\n    if (childrenDef.hasOwnProperty('listeners')) {\r\n        processListener(childrenDef.listeners, (eventName, eventHandler) => this.$listeners[eventName] = eventHandler);\r\n    }\r\n\r\n    if (childrenDef.hasOwnProperty('components')) {\r\n        if (!childrenDef.components || typeof childrenDef.components !== 'object') {\r\n            console.error('components on children must be in form of object.');\r\n        } else {\r\n            var components = childrenDef.components;\r\n            for (var componentName in components) {\r\n                if (components.hasOwnProperty(componentName)) {\r\n                    var compList = components[componentName];\r\n                    if (!Array.isArray(compList))\r\n                         compList = [compList];\r\n                    for (var comp of compList) {\r\n                        var rv = {};\r\n                        if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isObject(comp)) {\r\n                            console.error('Individual components must either be object or Array of objects');\r\n                            continue;\r\n                        }\r\n                        \r\n                        if (comp.hasOwnProperty('definition') && _typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isComponentFactory(comp.definition)) {\r\n                            rv.$definition = comp.definition;\r\n                        } else {\r\n                            console.error('Component must have definition and it be constructed by component factory');\r\n                            continue;\r\n                        }\r\n\r\n                        if (comp.hasOwnProperty('props')) {\r\n                            if (Array.isArray(comp.props)) {\r\n                                Object(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"PROCESS_PROP_OPTIONS\"].ARRAY, rv, comp.props, Object.assign({}, this.$children, this))\r\n                            } else if (typeof comp.props === 'object') {\r\n                                Object(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"PROCESS_PROP_OPTIONS\"].DEFINITION_OBJECT, rv, comp.props, Object.assign({}, this.$children, this));\r\n                            } else {\r\n                                console.error('Props on component expected to be of type \"object\" or an array');\r\n                            }\r\n                        }\r\n\r\n                        rv.$listeners = {};\r\n                        if (comp.hasOwnProperty('listeners')) {\r\n                            processListener(comp.listeners, (eventName, eventHandler) => rv.$listeners[eventName] = eventHandler);\r\n                        }\r\n\r\n                        var eventNames = Object.keys(this.$listeners).concat(Object.keys(rv.$listeners))\r\n                                            .filter((value, index, self) => self.indexOf(value) === index); // get unique\r\n                        var providedListeners = {};\r\n                        for (var eventName of eventNames) {\r\n                            providedListeners[eventName] = [];\r\n                            if (rv.$listeners[eventName]) providedListeners[eventName].push(rv.$listeners[eventName]);\r\n                            if (this.$listeners[eventName]) providedListeners[eventName].push(this.$listeners[eventName]);\r\n                        }\r\n                        \r\n                        rv.$definition.$create = rv.$definition.$create.bind(rv.$definition, {\r\n                            $props: _utils__WEBPACK_IMPORTED_MODULE_0__[\"default\"].objectFilter(Object.assign({}, rv, this.$children, this), (key, value) => _typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isPropObj(value)),\r\n                            $parent: this,\r\n                            $listeners: providedListeners                        \r\n                        });\r\n\r\n                        if (!this.$children.$components[componentName])\r\n                            this.$children.$components[componentName] = []\r\n                        this.$children.$components[componentName].push(rv);\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (processChildren);\r\n\n\n//# sourceURL=webpack://Mew/./src/parser/childParser.js?");

/***/ }),

/***/ "./src/parser/htmlParser.js":
/*!**********************************!*\
  !*** ./src/parser/htmlParser.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/parser/utils.js\");\n/* harmony import */ var _typeManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../typeManager */ \"./src/typeManager.js\");\n/* harmony import */ var _htmlPropertyManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../htmlPropertyManager */ \"./src/htmlPropertyManager.js\");\n/* harmony import */ var _proxyContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../proxyContext */ \"./src/proxyContext.js\");\n\r\n\r\n\r\n\r\n\r\nclass GetRecorder {\r\n    constructor(value, propName, onGet) {\r\n        var self = this;\r\n\r\n        this.value = value;\r\n        this.onGet = _typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isFunction(onGet) ? onGet : null;\r\n        this.propName = propName;\r\n\r\n        this.$className = 'GetRecorder'; // helps the type checker\r\n\r\n        var baseValue = this.$getValue();\r\n\r\n        if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isFunction(baseValue)) {\r\n            return new Proxy(baseValue, {\r\n                apply: (target, thisArg, argumentsList) => {\r\n                    self.onGet();\r\n                    return target.apply(thisArg || self, argumentsList);\r\n                },\r\n                $getValue: (getPropValue) => self.$getValue(getPropValue),\r\n                $setValue: (value) => self.$setValue(value),\r\n                $className: 'GetRecorder' // helps the type checker\r\n            });\r\n        } else if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isObject(baseValue)) {\r\n            return new Proxy(this, {\r\n                get: (obj, prop) => {\r\n                    obj.onGet();\r\n                    return obj.$getValue()[prop];\r\n                },\r\n                set: (obj, prop, value) => {\r\n                    obj.$setValue(value)[prop];\r\n                },\r\n                $getValue: (getPropValue) => self.$getValue(getPropValue),\r\n                $setValue: (value) => self.$setValue(value),\r\n                $className: 'GetRecorder' // helps the type checker\r\n            });\r\n        }\r\n    }\r\n\r\n    $getValue(getPropValue) {\r\n        if (getPropValue !== false && _typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isPropObj(this.value))\r\n            return this.value.$getValue();\r\n        return this.value;\r\n    }\r\n\r\n    $setValue(value) {\r\n        if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isPropObj(this.value)) {\r\n            this.value.$setValue(value);\r\n        } else {\r\n            this.value = value;\r\n        }\r\n    }\r\n\r\n    [Symbol.toPrimitive]() {\r\n        this.onGet();\r\n        return this.$getValue();\r\n    }\r\n\r\n    valueOf() {\r\n        this.onGet();\r\n        return this.$getValue();\r\n    }\r\n}\r\n\r\nfunction GetEvalFunctionInSelf(self, evalScript, onGet) {\r\n    self = Object.assign({},self);\r\n    // we must maintain a sorted array in this case\r\n    var keys = Object.keys(self); \r\n    keys.sort();\r\n\r\n    self = Object(_proxyContext__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(self);\r\n    var evalFun = Function.apply(null, keys.concat(['\"use strict\";\\nreturn ('+evalScript+');']));\r\n\r\n    return function(self, keys, evalFun) {\r\n        var orderedValues = keys.map(k => {\r\n            if (self.$props(k)) \r\n                return new GetRecorder(self.$props(k), k, (function(propName, prop, onGet) { onGet(propName, prop); }).bind(self, k, self.$props(k), onGet));\r\n            return self[k];\r\n        });\r\n\r\n        return evalFun.apply(null, orderedValues);\r\n    }.bind(null, self, keys, evalFun)\r\n}\r\n\r\nfunction convertToActualParserValue(value, addDeps) {\r\n    if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isGetRecorderObj(value)) {\r\n        var valueOfWrapper = value.$getValue(false);\r\n        // if it is a prop we need to be watching it\r\n        if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isPropObj(valueOfWrapper)) {\r\n            addDeps(value.propName, valueOfWrapper);\r\n            return valueOfWrapper.$getValue();\r\n        } else { // else just perform the action because it is a static object\r\n            return valueOfWrapper;\r\n        }\r\n    } else {\r\n        return value; \r\n    }\r\n} \r\n\r\nfunction attributeObjectParser(evalObj, addDeps, performAction, node, attribute) {\r\n    if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isObject(evalObj)) {\r\n        for (var key in evalObj) {\r\n            if (evalObj.hasOwnProperty(key)) {\r\n                var value = convertToActualParserValue(evalObj[key], addDeps);\r\n                performAction(node, key, value, attribute);\r\n            }\r\n        }\r\n    } else if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isUndef(evalObj, true)) {\r\n        console.error(attribute + \" is returning something other than object undefined or null on node: \", node);\r\n    }\r\n}\r\n\r\nfunction attributeBoolParser(evalObj, addDeps, performAction, node, attribute) {\r\n    var value = convertToActualParserValue(evalObj, addDeps);\r\n    if (value) {\r\n        performAction(node, true, attribute);\r\n    } else {\r\n        performAction(node, false, attribute);\r\n    }\r\n}\r\n\r\nfunction attributeStringParser(evalObj, addDeps, performAction, node, attribute) {\r\n    var value = convertToActualParserValue(evalObj, addDeps);\r\n    if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isString(value)) {\r\n        performAction(node, value, attribute);\r\n    } else {\r\n        console.error(attribute + \" is returning sometthing other than type 'string' on node: \", node);\r\n    }\r\n}\r\n\r\nfunction addAttributeParser(self, node, attribute, evalType, performAction) {\r\n    (function(self, node) {\r\n        var addDeps = function(propName, prop) {\r\n            if (!prop.$hasDep((dep) => _typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isObject(dep) && dep.node === node && dep.attribute === attribute))\r\n                prop.$addDep({ node: node, attribute: attribute, $run: performEval});\r\n        }\r\n\r\n        var getterFun = GetEvalFunctionInSelf(self, node.getAttribute(attribute), addDeps);\r\n        node.removeAttribute(attribute); // clean up after ourselves\r\n\r\n        var performEval = function() {\r\n            var evalObj = getterFun();\r\n            switch(evalType.toLowerCase()) {\r\n                case \"object\":\r\n                    return attributeObjectParser(evalObj, addDeps, performAction, node, attribute);\r\n                case \"bool\":\r\n                case \"boolean\":\r\n                    return attributeBoolParser(evalObj, addDeps, performAction, node, attribute);\r\n                case \"string\":\r\n                    return attributeStringParser(evalObj, addDeps, performAction, node, attribute);\r\n            }\r\n        };\r\n        performEval();\r\n    }(self, node))\r\n}\r\n\r\nfunction processHtmlRecursively(self, parentNode) {\r\n    for (var node of parentNode.childNodes) {\r\n        if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isTextNode(node)) {\r\n            //console.log(node) TEXT NODES GO HERE\r\n        } else {\r\n            if (node.getAttribute(\"m-bind:class\")) {\r\n                addAttributeParser(self, node, \"m-bind:class\", \"object\", function(node, className, value) {\r\n                    if (value) Object(_htmlPropertyManager__WEBPACK_IMPORTED_MODULE_2__[\"addClass\"])(node, className);\r\n                    else Object(_htmlPropertyManager__WEBPACK_IMPORTED_MODULE_2__[\"removeClass\"])(node, className);\r\n                });\r\n\r\n            }\r\n            if (node.getAttribute(\"m-bind:style\")) {\r\n                addAttributeParser(self, node, \"m-bind:style\", \"object\", function(node, styleName, styleValue) {\r\n                    if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isString(styleValue) && styleValue.length > 0) \r\n                        Object(_htmlPropertyManager__WEBPACK_IMPORTED_MODULE_2__[\"addStyle\"])(node, styleName, styleValue);\r\n                    else \r\n                        Object(_htmlPropertyManager__WEBPACK_IMPORTED_MODULE_2__[\"removeStyle\"])(node, styleName);\r\n                });\r\n            }\r\n            // must come after m-bind:style so it can override if needed\r\n            if (node.getAttribute(\"m-show\")) {\r\n                addAttributeParser(self, node, \"m-show\", \"bool\", function(node, shouldShow) {\r\n                    if (shouldShow) \r\n                        Object(_htmlPropertyManager__WEBPACK_IMPORTED_MODULE_2__[\"removeStyle\"])(node, \"display\");\r\n                    else\r\n                        Object(_htmlPropertyManager__WEBPACK_IMPORTED_MODULE_2__[\"addStyle\"])(node, \"display\", \"none\");\r\n                });\r\n            }\r\n\r\n            if (node.getAttribute(\"m-on\")) {\r\n                addAttributeParser(self, node, \"m-on\", \"object\", function(node, eventName, fun) {\r\n                    if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isFunction(fun)) {\r\n                        if (!self.$htmlEvents[node]) self.$htmlEvents[node] = [];\r\n                        if (!self.$htmlEvents[node].some(p => p.eventName === eventName && p.action === fun)) {\r\n                            self.$htmlEvents[node].push({\r\n                                eventName: eventName,\r\n                                node: node,\r\n                                action: fun\r\n                            });\r\n                            node.addEventListener(eventName, fun);\r\n                        }\r\n                    } else {\r\n                        console.error(\"m-on events expect type of function as return value for an event\");\r\n                    }\r\n                });\r\n            }\r\n\r\n            if (node.getAttribute(\"m-comp\")) {\r\n                addAttributeParser(self, node, \"m-comp\", \"string\", function(node, componentName) {\r\n                    if (self.$children.$components.hasOwnProperty(componentName)) {\r\n                        var components = self.$children.$components[componentName];\r\n                        components.forEach(compDescription => {\r\n                            var comp = compDescription.$definition.$create();\r\n                            node.appendChild(comp.$templateHtml.content)\r\n                        });\r\n                    } else {\r\n                        console.error('Component \"'+componentName+'\" not found for node: ', node);\r\n                    }\r\n                });\r\n            }\r\n        }\r\n        processHtmlRecursively(self, node);\r\n    }\r\n}\r\n\r\nfunction processTemplateHtml() {\r\n    if (!this.$templateHtml && this.$templateHtml.content) return;\r\n    if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isElementNode(this.$templateHtml)) {\r\n        console.error(\"Cannot parse templates html if not a dom element.\");\r\n        return;\r\n    }\r\n\r\n    processHtmlRecursively(this, this.$templateHtml.content);\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (processTemplateHtml);\n\n//# sourceURL=webpack://Mew/./src/parser/htmlParser.js?");

/***/ }),

/***/ "./src/parser/parentParser.js":
/*!************************************!*\
  !*** ./src/parser/parentParser.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/parser/utils.js\");\n/* harmony import */ var _typeManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../typeManager */ \"./src/typeManager.js\");\n/* harmony import */ var _propParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./propParser */ \"./src/parser/propParser.js\");\n/* harmony import */ var _prop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../prop */ \"./src/prop.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nfunction freezePropOnSelf(self, prop) {\r\n    if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isPropObj(self[prop])) {\r\n        console.error('Cannot freeze prop that is not constructed by \"Prop\"');\r\n        return;\r\n    }\r\n    self[prop] = new _prop__WEBPACK_IMPORTED_MODULE_3__[\"default\"](self[prop], 'prop', true);\r\n}\r\n\r\nfunction processParent(parentDef, parentScopeAccess) {\r\n    if (!parentDef || typeof parentDef !== 'object') {\r\n        console.error(\"Malformed parent object.\");\r\n        return;\r\n    }\r\n    var parentScopeIsGood = parentScopeAccess && typeof parentScopeAccess === 'object';\r\n    // pasrse the props object\r\n    if (parentDef.hasOwnProperty('props')) {\r\n        if (!parentScopeIsGood || !parentScopeAccess.$props || typeof parentScopeAccess.$props !== 'object') {\r\n            console.error('Cannot inherit props from null parent props.');\r\n        } else {\r\n            var props = parentDef.props;\r\n            if (Array.isArray(props)) {\r\n                Object(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"PROCESS_PROP_OPTIONS\"].ARRAY, this, props, parentScopeAccess.$props, function(self, prop) {\r\n                    self.$inheritedProps.push(prop);\r\n                    freezePropOnSelf(self, prop);\r\n                })\r\n            } else if (typeof props === 'object') {\r\n                Object(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"PROCESS_PROP_OPTIONS\"].RENAME_OBJECT, this, props, parentScopeAccess.$props, function(self, prop) { \r\n                    self.$inheritedProps.push(prop);\r\n                    freezePropOnSelf(self, prop);\r\n                })\r\n            } else {\r\n                console.error('Props on parent must be of type \"object\".')\r\n            }\r\n        }\r\n    }\r\n\r\n    if (parentDef.hasOwnProperty('slots')) {\r\n        if (Array.isArray(parentDef.slots)) {\r\n            console.error('slots on parent must be array of strings.')\r\n        } else {\r\n            for (var slot of parentDef.slots) {\r\n                if (typeof slot !== 'string')\r\n                    console.error('Only strings are allowed in slot array values.');\r\n                else if (!parentScope.$slots || typeof parentScope.$slots !== 'object' || !parentScope.$slots[slot]) {\r\n                    console.error('Slot \"'+slot+'\" doesn\\' exist on parent');\r\n                } else {\r\n                    this.$slots[slot] = parentScope.$slots[slot];\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    if (parentDef.hasOwnProperty('emit')) {\r\n        if (Array.isArray(parentDef.emit)) {\r\n            for(var eventName of parentDef.emit) {\r\n                if (typeof eventName !== 'string') {\r\n                    console.error('Each element in emit array must be string.');\r\n                } else {\r\n                    if (!parentScopeAccess.$listeners) parentScopeAccess.$listeners = {};\r\n                    var listeners = parentScopeAccess.$listeners[eventName] || [];\r\n                    this.$emit[eventName] =  (function(listeners, eventName){\r\n                        var rv = function() {\r\n                            for(var listener of listeners) {\r\n                                if (typeof listener === 'function')\r\n                                    listener.apply(arguments);\r\n                                else\r\n                                    console.error('Listener is not of type \"function\"')\r\n                            }\r\n                        };\r\n                        rv.eventName = eventName;\r\n                        return rv;\r\n                    }.bind(this)(listeners, eventName));\r\n                }\r\n            }\r\n        } else {\r\n            console.error('Emit defined on parent must be array.');\r\n        }\r\n    }\r\n\r\n    if (parentScopeAccess && parentScopeAccess.hasOwnProperty('$parent') && _typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isComponentObj(parentScopeAccess.$parent)) {\r\n        this.$parent = parentScopeAccess.$parent;\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (processParent);\r\n\n\n//# sourceURL=webpack://Mew/./src/parser/parentParser.js?");

/***/ }),

/***/ "./src/parser/parser.js":
/*!******************************!*\
  !*** ./src/parser/parser.js ***!
  \******************************/
/*! exports provided: Component, MountComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return ComponentFactory; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MountComponent\", function() { return MountComponent; });\n/* harmony import */ var _childParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./childParser */ \"./src/parser/childParser.js\");\n/* harmony import */ var _parentParser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parentParser */ \"./src/parser/parentParser.js\");\n/* harmony import */ var _selfParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selfParser */ \"./src/parser/selfParser.js\");\n/* harmony import */ var _htmlParser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./htmlParser */ \"./src/parser/htmlParser.js\");\n/* harmony import */ var _proxyContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../proxyContext */ \"./src/proxyContext.js\");\n/* harmony import */ var _typeManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../typeManager */ \"./src/typeManager.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nclass Component {\r\n    constructor(compDescriptor, parentScope) {\r\n        if (!_typeManager__WEBPACK_IMPORTED_MODULE_5__[\"typeChecker\"].isObject(compDescriptor)) {\r\n            console.warn('The component descriptor must be of type \"object\"');\r\n            compDescriptor = {};\r\n        }\r\n        this.$slots = {};\r\n        this.$emit = {};\r\n        this.$parent = null;\r\n        this.$watchers = {};\r\n        this.$inheritedProps = [];\r\n        this.$children = {\r\n            $listeners: {},\r\n            $components: {},\r\n        }\r\n        this.$htmlEvents = {};\r\n\r\n        if (!_typeManager__WEBPACK_IMPORTED_MODULE_5__[\"typeChecker\"].isObject(compDescriptor.self)) {\r\n            throw new Error('Components must have self defined of type \"object\".');\r\n        }\r\n\r\n        if (compDescriptor.hasOwnProperty('parent'))\r\n            (_parentParser__WEBPACK_IMPORTED_MODULE_1__[\"default\"].bind(this))(compDescriptor.parent, parentScope);\r\n\r\n        (_selfParser__WEBPACK_IMPORTED_MODULE_2__[\"default\"].bind(this))(compDescriptor.self);\r\n\r\n        if (compDescriptor.hasOwnProperty('children'))\r\n            (_childParser__WEBPACK_IMPORTED_MODULE_0__[\"default\"].bind(this))(compDescriptor.children);\r\n\r\n            _htmlParser__WEBPACK_IMPORTED_MODULE_3__[\"default\"].bind(this)();\r\n\r\n        this.$className = \"Component\";\r\n    }\r\n}\r\n\r\nclass ComponentFactory {\r\n    constructor(compDescriptor) {\r\n        this.descriptor = compDescriptor;\r\n        this.$className = \"ComponentFactory\";\r\n    }\r\n\r\n    $create(parentScope) {\r\n        var component = new Component(this.descriptor, parentScope);\r\n        return Object(_proxyContext__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(component); // passing in parentProps freezes them only in this context\r\n    }\r\n}\r\n\r\nfunction MountComponent(nodeOrId, componentFactory) {\r\n    if (!_typeManager__WEBPACK_IMPORTED_MODULE_5__[\"typeChecker\"].isComponentFactory(componentFactory)) {\r\n        console.error('Mount type expects type of componentFactory.');\r\n        return null;\r\n    }\r\n\r\n    if (_typeManager__WEBPACK_IMPORTED_MODULE_5__[\"typeChecker\"].isString(nodeOrId))\r\n        nodeOrId = document.getElementById(nodeOrId.replace('#', ''));\r\n    \r\n    if (_typeManager__WEBPACK_IMPORTED_MODULE_5__[\"typeChecker\"].isElementNode(nodeOrId)) {\r\n        var node = nodeOrId;\r\n        node.appendChild(componentFactory.$create().$templateHtml.content);\r\n    } else {\r\n        console.error('mount point expects valid html id or node type');\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://Mew/./src/parser/parser.js?");

/***/ }),

/***/ "./src/parser/propParser.js":
/*!**********************************!*\
  !*** ./src/parser/propParser.js ***!
  \**********************************/
/*! exports provided: PROCESS_PROP_OPTIONS, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PROCESS_PROP_OPTIONS\", function() { return PROCESS_PROP_OPTIONS; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/parser/utils.js\");\n/* harmony import */ var _typeManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../typeManager */ \"./src/typeManager.js\");\n/* harmony import */ var is_var_name__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! is-var-name */ \"./node_modules/is-var-name/index.mjs\");\n/* harmony import */ var _prop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../prop */ \"./src/prop.js\");\n\r\n\r\n\r\n\r\n\r\nfunction definePropOnSelf(self, prop, value) {\r\n    if (self.hasOwnProperty(prop)) {\r\n        if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isPropObj(self[prop])) {\r\n            console.warn('Redefinging prop \"'+prop+'\"');\r\n        } else {\r\n            console.error(\"Cannot redefine a public Api.\");\r\n            return;\r\n        }\r\n    }\r\n    if(!value || !_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isPropObj(value)) {\r\n        console.error(\"Value must be of type prop.\");\r\n        return;\r\n    }\r\n    self[prop] = value;\r\n}\r\n\r\n/**\r\n * Creates a list of props based on the inputs\r\n * Does some proxy mapping to make getting and setting the values easier\r\n * Values are mapped from the names => prop.value = valuePerName[name] || null\r\n * Dependencies are mapped from the names => prop.deps = depsPerName[name] || []\r\n * If value is already prop, just adds to the list and continues\r\n * @param {Array of Strings | String} names \r\n * @param {Object} valuePerName \r\n * @param {Object} depsPerName depsPerName[name] can return array or a single element\r\n * @returns {Object} \r\n */\r\nfunction CreateProps(propDescriptors) {\r\n    if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isObject(propDescriptors)) {\r\n        console.warn('createProps expects an object as its\\' first parameter');\r\n        return {};\r\n    }\r\n\r\n    var props = {};\r\n    for (name in propDescriptors) {\r\n        if (propDescriptors.hasOwnProperty(name)) {\r\n            var hasError = false;\r\n            var propDescript = propDescriptors[name];\r\n            if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isObject(propDescript)) {\r\n                console.warn('Property must be of type object to be processed, Property: ', propDescript);\r\n                hasError = true;\r\n            }\r\n            if (!Object(is_var_name__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(name)) {\r\n                console.error('Prop name must be a valid javascript variable name, Name: ', name);\r\n                hasError = true;\r\n            }\r\n            if (hasError) continue;\r\n            if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isPropObj(propDescript)) {\r\n                props[name] = propDescript;\r\n                continue;\r\n            }\r\n\r\n            var value = propDescript['value'] || null;\r\n            var type = Object(_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeSafePropGetter\"])('string', propDescript, 'type', 'any');\r\n            var shouldFreeze = Object(_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeSafePropGetter\"])('bool', propDescript, 'shouldFreeze', false);\r\n\r\n            // adds the prop to the prop array\r\n            props[name] = new _prop__WEBPACK_IMPORTED_MODULE_3__[\"default\"](value, type, shouldFreeze);\r\n        }\r\n    }\r\n    \r\n    return props;\r\n}\r\n\r\nconst PROCESS_PROP_OPTIONS = Object.freeze({\r\n    ARRAY: 0,\r\n    DEFINITION_OBJECT: 1,\r\n    RENAME_OBJECT: 2\r\n});\r\n\r\nfunction propParser(processOption, self, propsObj, scope = {}, propCallback = null) {\r\n    switch(processOption) {\r\n        case PROCESS_PROP_OPTIONS.ARRAY:\r\n            if (Array.isArray(propsObj)) {\r\n                for (var prop of propsObj) {\r\n                    if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isString(prop)) {\r\n                        console.error(\"Props defined in Array for must be a string.\");\r\n                    } else if (!scope.hasOwnProperty(prop)) {\r\n                        console.error('Prop \"' + prop +'\" definition not found.');\r\n                    } else {\r\n                        definePropOnSelf(self, prop, scope[prop]);\r\n                        if (propCallback) propCallback(self, prop, scope[prop]);\r\n                    }\r\n                }\r\n            } else {\r\n                console.error(\"Error expected array for props.\");\r\n                return false;\r\n            }\r\n        return true;\r\n        case PROCESS_PROP_OPTIONS.DEFINITION_OBJECT:\r\n            if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isObject(propsObj)) {\r\n                console.error(\"Props definition must be of type object.\");\r\n                return false;\r\n            } else {\r\n                // turns string references into props under different name\r\n                var stringObj = _utils__WEBPACK_IMPORTED_MODULE_0__[\"default\"].objectFilter(propsObj, (key, value) => _typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isString(value));\r\n                for(var sKey in stringObj) {\r\n                    if (scope.hasOwnProperty(stringObj[sKey])) propsObj[sKey] = scope[stringObj[sKey]];\r\n                    else console.error('Could not find deffinition for \"'+stringObj[sKey]+'\" to rename as \"'+sKey+'\"');\r\n                }\r\n                var createdProps = CreateProps(propsObj);\r\n                for(var prop in createdProps) {\r\n                    definePropOnSelf(self, prop, createdProps[prop]);\r\n                    if (propCallback) propCallback(self, prop, createdProps[prop]);\r\n                }\r\n            }\r\n        return true;\r\n        case PROCESS_PROP_OPTIONS.RENAME_OBJECT:\r\n            if (propsObj && typeof propsObj === 'object') {\r\n                for (var prop in propsObj) {\r\n                    if (scope.hasOwnProperty(propsObj[prop])) {\r\n                        var value = scope[propsObj[prop]];\r\n                        definePropOnSelf(self, prop, value);\r\n                        if (propCallback) propCallback(self, prop, value);\r\n                    } else {\r\n                        console.error('Prop \"' + propsObj[prop] + '\" defined as \"'+ prop +'\" but definition not found.');\r\n                        return false;\r\n                    }\r\n                }\r\n            } else {\r\n                console.error(\"Error expected rename object for props.\");\r\n                return false;\r\n            }\r\n        return true;\r\n        default:\r\n            throw new Error(\"ProcessProps option not supported.\");\r\n    }\r\n}\r\n\r\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (propParser);\n\n//# sourceURL=webpack://Mew/./src/parser/propParser.js?");

/***/ }),

/***/ "./src/parser/selfParser.js":
/*!**********************************!*\
  !*** ./src/parser/selfParser.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/parser/utils.js\");\n/* harmony import */ var _typeManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../typeManager */ \"./src/typeManager.js\");\n/* harmony import */ var _propParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./propParser */ \"./src/parser/propParser.js\");\n\r\n\r\n\r\n\r\n\r\nvar getDocument = function(html) {\r\n    var doc = document.createElement('template');\r\n    doc.innerHTML = html;\r\n    return doc;\r\n}\r\n\r\n\r\nfunction processSelf(selfDef) {\r\n    if (selfDef.hasOwnProperty('props')) {\r\n        Object(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_propParser__WEBPACK_IMPORTED_MODULE_2__[\"PROCESS_PROP_OPTIONS\"].DEFINITION_OBJECT, this, selfDef.props, this)\r\n    }\r\n\r\n    if (selfDef.hasOwnProperty('template')) {\r\n        if (_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isString(selfDef.template)) {\r\n            this.$template = selfDef.template;\r\n\r\n            this.$templateHtml = getDocument(this.$template);\r\n        } else {\r\n            console.error('template must be of type \"string\"');\r\n        }\r\n    }\r\n\r\n    if (selfDef.hasOwnProperty('watchers')) {\r\n        if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isObject(selfDef.watchers)) {\r\n            console.error('watchers must be of type \"object\"');\r\n        } else {\r\n            var watchers = selfDef.watchers;\r\n            for (var propName in watchers) {\r\n                if (watchers.hasOwnProperty(propName)) {\r\n                    if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isFunction(watchers[propName])) {\r\n                        console.error('Watcher must be of type \"function\".');\r\n                    } else if (!_typeManager__WEBPACK_IMPORTED_MODULE_1__[\"typeChecker\"].isPropObj(this[propName])) {\r\n                        console.error('Cannot watch \"'+propName+'\" because it is not a processed prop.');                        \r\n                    } else {\r\n                        var watchFun = watchers[propName];\r\n                        watchFun = watchFun.bind(this);\r\n                        this[propName].$addDep(watchFun);\r\n                        this.$watchers[propName] = {\r\n                            $dependancy: watchFun,\r\n                            $prop: this[propName]\r\n                        }\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (processSelf);\r\n\n\n//# sourceURL=webpack://Mew/./src/parser/selfParser.js?");

/***/ }),

/***/ "./src/parser/utils.js":
/*!*****************************!*\
  !*** ./src/parser/utils.js ***!
  \*****************************/
/*! exports provided: objectFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"objectFilter\", function() { return objectFilter; });\nfunction objectFilter(obj, predicate) {\r\n    var rv = Object.assign({}, obj);\r\n    for (var key in rv) {\r\n        if (obj.hasOwnProperty(key)) {\r\n            if (!predicate(key, obj[key]))\r\n                delete rv[key];\r\n        }\r\n    }\r\n    return rv;\r\n}\r\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ objectFilter: objectFilter });\n\n//# sourceURL=webpack://Mew/./src/parser/utils.js?");

/***/ }),

/***/ "./src/prop.js":
/*!*********************!*\
  !*** ./src/prop.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _typeManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeManager */ \"./src/typeManager.js\");\n\r\n\r\n/**\r\n * Stores the name, value, and any dependencies for the property\r\n * Assumes name is of type string\r\n * Value can be of nay type\r\n * Assumes all dependencies are either of tpye function or impliment the method \".run()\"\r\n * It is probably easier to use the \"createProps()\" function\r\n */\r\nclass Prop {\r\n    constructor(value, type, freezeValue) {\r\n        this.deps = [];\r\n        this.type = _typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].types.indexOf(type) > -1 ? type : 'any';\r\n        // allow inital value to be set\r\n        this.freezeValue = false;\r\n        // sets the value\r\n        var valueWasSet = this.$setValue(value || null, false);\r\n        if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isUndef(valueWasSet)) // there was some type error setting the value\r\n            this.value = null;\r\n        // set the value of freezeValue\r\n        this.freezeValue = _typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isBool(freezeValue) ? freezeValue : false;\r\n\r\n        this.$className = 'Prop';\r\n    }\r\n\r\n    $runDepsUpdate(newVal, oldVal) {\r\n        if (this.type === 'prop') {\r\n            this.value.$runDepsUpdate(newVal, oldVal);\r\n        } else {\r\n            for (var i = this.deps.length - 1; i > -1; i -= 1) {\r\n                if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isFunction(this.deps[i]))\r\n                    this.deps[i](newVal, oldVal, this.type);\r\n                else if (this.deps[i] && _typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isFunction(this.deps[i].$run)) {\r\n                    this.deps[i].$run(newVal, oldVal, this.type);\r\n                } else {\r\n                    console.error('Bad dependancy encountered, a dependancy must either be a function or have \"$run\" as a function accessable.');\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    $addDep(dep) {\r\n        if (this.type === 'prop') {\r\n            this.value.$addDep(dep);\r\n        } else {\r\n            this.deps.push(dep);\r\n        }\r\n    }\r\n\r\n    $removeDep(checker) {\r\n        if (this.type === 'prop') {\r\n            this.value.$removeDep(dep);\r\n        } else {\r\n            if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isFunction(checker)) {\r\n                this.deps =this.deps.filter(dep => checker(dep));\r\n            } else {\r\n                var index = this.deps.indexOf(checker);\r\n                if (index > -1) this.deps.splice(index, 1);\r\n            }\r\n        }\r\n    }\r\n\r\n    $hasDep(checker) {\r\n        if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isFunction(checker)) {\r\n            return this.deps.some(dep => checker(dep));\r\n        } else {\r\n            return this.deps.indexOf(checker) > -1;\r\n        }\r\n    }\r\n\r\n    $setValue(newVal, runUpdate) {\r\n        if (!this.freezeValue) {\r\n            if (this.type === 'prop' && !_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isPropObj(newVal)) {\r\n                return this.value.setValue(newVal, runUpdate);\r\n            } else {\r\n                if (!Object(_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"isType\"])(this.type, newVal, true)) {\r\n                    console.error('Cannot set value for prop because it doesn\\'t meet type constraint of type \"'+this.type+'\"');\r\n                    return;\r\n                }\r\n                // go down the props tree to get the lowest value that is not a prop\r\n                if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isPropObj(newVal)) {\r\n                    while (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isPropObj(newVal.value)) {\r\n                        newVal = newVal.value;\r\n                    }\r\n                }\r\n                var oldVal = this.value;\r\n                this.value = newVal;\r\n                if (oldVal !== newVal && (!_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isBool(runUpdate) || runUpdate)) \r\n                    this.$runDepsUpdate(newVal, oldVal);\r\n                return newVal;\r\n            }\r\n        } else {\r\n            console.error('Cannot set value for prop because the value is frozen. Prop: ', this);\r\n        }\r\n    }\r\n\r\n    $getValue() {\r\n        if (this.type === 'prop') {\r\n            return this.value.$getValue();\r\n        }\r\n        return this.value;\r\n    }\r\n\r\n    [Symbol.toPrimitive]() {\r\n        return this.$getValue();\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Prop);\n\n//# sourceURL=webpack://Mew/./src/prop.js?");

/***/ }),

/***/ "./src/proxyContext.js":
/*!*****************************!*\
  !*** ./src/proxyContext.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _typeManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeManager */ \"./src/typeManager.js\");\n\r\n\r\n/**\r\n * Returns a proxy for handling getting and setting props\r\n * This function also handles special props that start with '$'\r\n * @param {Object} props\r\n * @returns {Object} Proxy object\r\n */\r\nfunction ProxyContext(context) {\r\n    for (var $openApi in $openApis) {\r\n        if (context.hasOwnProperty($openApi)) console.error('Cannot use an api specific property name \"'+$openApi+'\", refer to the docs.');\r\n        context[$openApi] = $openApis[$openApi];\r\n    }\r\n    // returns a proxy to make getting and setting the values easier\r\n    return new Proxy(context, {\r\n        get: (props, prop, receiver) => {\r\n            if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isUndef(props[prop])) {\r\n                console.warn('Property \"' + prop + '\" does not exist on object. Cannot get value.');\r\n                return;\r\n            }\r\n\r\n            if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isFunction(props[prop])) \r\n                return props[prop].bind(props);\r\n\r\n            if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isPropObj(props[prop]))\r\n                return props[prop].$getValue();\r\n\r\n            return props[prop];\r\n        },\r\n        set: (props, prop, value) => {\r\n            if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isUndef(props[prop])) {\r\n                console.warn('Property \"' + prop + '\" does not exist on object. Cannot set value.');\r\n                return;\r\n            }\r\n            if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isPropObj(props[prop])) {\r\n                props[prop].$setValue(value);\r\n            } else {\r\n                console.error('Can only set value for type of prop.');\r\n            }\r\n        }\r\n    });\r\n}\r\n\r\nvar $openApis = {\r\n    /**\r\n     * Removes all dependencies from a prop\r\n     * this -> props object\r\n     * @param {String} prop property to add deps to\r\n     */\r\n    $forceDepsUpdate: function (prop) {\r\n        if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isPropObj(this[prop])) \r\n            this[prop].$runDepsUpdate();\r\n    },\r\n    // Exposes the raw prop within a wrapped object\r\n    $props: function(prop) {\r\n        if (_typeManager__WEBPACK_IMPORTED_MODULE_0__[\"typeChecker\"].isPropObj(this[prop])) \r\n            return this[prop];\r\n        return null;\r\n    }\r\n};\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ProxyContext);\n\n//# sourceURL=webpack://Mew/./src/proxyContext.js?");

/***/ }),

/***/ "./src/typeManager.js":
/*!****************************!*\
  !*** ./src/typeManager.js ***!
  \****************************/
/*! exports provided: typeChecker, isType, typeSafeGetter, typeSafePropGetter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"typeChecker\", function() { return typeChecker; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isType\", function() { return isType; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"typeSafeGetter\", function() { return typeSafeGetter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"typeSafePropGetter\", function() { return typeSafePropGetter; });\n\r\nfunction createTypeChecker(checker) {\r\n    return function(obj, nullable = false) {\r\n        if (typeof obj === 'undefined') return false;\r\n        if (obj === null) return !!nullable;\r\n        return checker(obj);\r\n    }\r\n}\r\n\r\nvar typeChecker = {\r\n    types: ['any', 'bool', 'boolean', 'array', 'string', 'object', 'function', 'symbol', 'int', 'float',\r\n            'number', 'undefined', 'prop', 'component', 'component-factory', 'get-recorder', 'element-node', 'text-node'],\r\n    isUndef: (obj) => typeof obj === 'undefined',\r\n    isString: createTypeChecker((obj) => typeof obj === 'string'),\r\n    isObject: createTypeChecker((obj) => typeof obj === 'object'),\r\n    isFunction: createTypeChecker((obj) => typeof obj === 'function'),\r\n    isBool: createTypeChecker((obj) => typeof obj === 'boolean'),\r\n    isSymbol: createTypeChecker((obj) => typeof obj === 'symbol'),\r\n    isArray: createTypeChecker((obj) => Array.isArray(obj)),\r\n    isNumber: createTypeChecker((obj) => !isNaN(obj)),\r\n    isInt: createTypeChecker((obj) => Number(obj) === obj && obj % 1 === 0),\r\n    isFloat: createTypeChecker((obj) => Number(obj) === obj && obj % 1 !== 0),\r\n    isPropObj: createTypeChecker((obj) => typeChecker.isObject(obj) && obj.$className === 'Prop'),\r\n    isComponentObj: createTypeChecker((obj) => typeChecker.isObject(obj) && obj.$className === 'Component'),\r\n    isComponentFactory: createTypeChecker((obj) => typeChecker.isObject(obj) && obj.$className === 'ComponentFactory'),\r\n    isGetRecorderObj: createTypeChecker((obj) => typeChecker.isObject(obj) && obj.$className === 'GetRecorder'),\r\n    isElementNode: createTypeChecker((obj) => typeChecker.isObject(HTMLElement) ? \r\n                                        obj instanceof HTMLElement : //DOM2\r\n                                        typeChecker.isObject(obj) && obj.nodeType === Node.ELEMENT_NODE && typeChecker.isString(obj.nodeName)),\r\n    isTextNode: createTypeChecker((obj) => typeChecker.isObject(obj) && obj.nodeType === Node.TEXT_NODE && typeChecker.isString(obj.nodeName))\r\n}\r\n\r\nvar isType = function(type, obj, nullable = false) {\r\n    if (typeof obj === 'undefined') return false;\r\n    switch(type.toLowerCase()) {\r\n        case 'any':\r\n            if (typeof obj === 'undefined') return false;\r\n            if (obj === null) return !!nullable;\r\n            return true;\r\n        case 'array':\r\n            return typeChecker.isArray(obj, nullable);\r\n        case 'string':\r\n            return typeChecker.isString(obj, nullable);\r\n        case 'object':\r\n            return typeChecker.isObject(obj, nullable);\r\n        case 'function':\r\n            return typeChecker.isFunction(obj, nullable);\r\n        case 'symbol':\r\n            return typeChecker.isSymbol(obj, nullable);\r\n        case 'int':\r\n            return typeChecker.isInt(obj, nullable);\r\n        case 'float':\r\n            return typeChecker.isFloat(obj, nullable);\r\n        case 'number':\r\n            return typeChecker.isNumber(obj, nullable);\r\n        case 'bool':\r\n        case 'boolean':\r\n            return typeChecker.isBool(obj, nullable);\r\n        case 'prop':\r\n            return typeChecker.isPropObj(obj, nullable);\r\n        case 'component':\r\n            return typeChecker.isComponentObj(obj, nullable);\r\n        case 'component-factory':\r\n            return typeChecker.isComponentFactory(obj, nullable);\r\n        case 'get-recorder':\r\n            return typeChecker.isGetRecorderObj(obj, nullable);\r\n        case 'element-node':\r\n            return typeChecker.isElementNode(obj, nullable);\r\n        case 'text-node':\r\n            return typeChecker.isTextNode(obj, nullable);\r\n        default:\r\n            throw new Error('Type \"'+type+'\" is not supported.');\r\n    }\r\n}\r\n\r\nvar typeSafeGetter = function(type, value, defaultRv, nullable = false) {\r\n    if (typeof value === 'undefined') return defaultRv;\r\n    if(isType(type, value, nullable)) \r\n        return value;\r\n    return defaultRv;\r\n}\r\n\r\nvar typeSafePropGetter = function(type, obj, prop, defaultRv, nullable = false) {\r\n    if (obj.hasOwnProperty(prop)) {\r\n        return typeSafeGetter(type, obj[prop], defaultRv, nullable);\r\n    }\r\n    return defaultRv;\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://Mew/./src/typeManager.js?");

/***/ })

/******/ });
});