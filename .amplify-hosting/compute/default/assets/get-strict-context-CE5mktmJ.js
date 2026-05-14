import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { jsx } from "react/jsx-runtime";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esmMin = (fn, res) => () => (fn && (res = fn(fn = 0)), res);
var __export = (all, symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toCommonJS = (mod) => __hasOwnProp.call(mod, "module.exports") ? mod["module.exports"] : __copyProps(__defProp({}, "__esModule", { value: true }), mod);
function useControlledState(props) {
	const { value, defaultValue, onChange } = props;
	const [state, setInternalState] = useState(value !== void 0 ? value : defaultValue);
	useEffect(() => {
		if (value !== void 0) setInternalState(value);
	}, [value]);
	return [state, useCallback((next, ...args) => {
		setInternalState(next);
		onChange?.(next, ...args);
	}, [onChange])];
}
function getStrictContext(name) {
	const Context = React.createContext(void 0);
	const Provider = ({ value, children }) => /* @__PURE__ */ jsx(Context.Provider, {
		value,
		children
	});
	const useSafeContext = () => {
		const ctx = React.useContext(Context);
		if (ctx === void 0) throw new Error(`useContext must be used within ${name ?? "a Provider"}`);
		return ctx;
	};
	return [Provider, useSafeContext];
}
export { __toCommonJS as a, __export as i, useControlledState as n, __esmMin as r, getStrictContext as t };
