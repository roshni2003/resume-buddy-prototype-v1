import { a as __toCommonJS, i as __export, n as useControlledState, r as __esmMin, t as getStrictContext } from "./get-strict-context-CE5mktmJ.js";
import { o as setCookie$1, r as getRequestHeaders } from "./server-Ck__86By.js";
import "./__23tanstack-start-server-fn-resolver-DpUljSwK.js";
import { t as cn } from "./style-BVXxCckg.js";
import { n as Button, t as Input } from "./input-C4lW-WI7.js";
import { a as AlertDescription, i as Alert, o as AlertTitle, t as RichInput } from "./rich-input-Coij_gNW.js";
import { t as Spinner } from "./spinner-D8fbffbw.js";
import { t as LoadingScreen } from "./loading-screen-CHUPzkEh.js";
import { _ as wildcardMatch, a as TWO_FACTOR_ERROR_CODES, c as createDefu, d as getHost, f as getOrigin, g as resolveBaseURL, h as isRequestLike, i as PACKAGE_VERSION, l as defu, m as isDynamicBaseURLConfig, n as USERNAME_ERROR_CODES, o as betterFetch, p as getProtocol, t as GENERIC_OAUTH_ERROR_CODES, u as getBaseURL } from "./error-codes-COt8c5aQ.js";
import { a as init_string, c as toUsername, n as generateId$1, o as slugify, r as generateRandomName, s as stripHtml } from "./createSsrRpc-9mmrq80i.js";
import { A as educationItemSchema, B as resumeDataSchema, C as InputGroupText, D as coverLetterItemSchema, E as certificationItemSchema, G as templateSchema, H as summaryItemSchema, I as profileItemSchema, L as projectItemSchema, M as init_data, N as interestItemSchema, O as customSectionSchema, P as languageItemSchema, R as publicationItemSchema, S as InputGroupInput, U as volunteerItemSchema, V as skillItemSchema, W as init_templates, b as InputGroupAddon, c as ConfirmDialogProvider, d as Command$1, f as CommandEmpty, g as CommandList, h as CommandItem, j as experienceItemSchema, k as defaultResumeData, l as useConfirm, m as CommandInput, n as Combobox, p as CommandGroup, t as Badge, u as useDialogStore, v as CommandShortcut, w as awardItemSchema, y as InputGroup, z as referenceItemSchema } from "./badge-C7BDNxcP.js";
import { i as loadLocale, r as isRTL, t as getLocale } from "./locale-BPZR263U.js";
import { d as DialogDescription, f as DialogFooter, l as Dialog$1, m as DialogTitle, p as DialogHeader, u as DialogContent } from "./alert-dialog-D16KSnDL.js";
import { i as isValidToken, n as buildZuvyLoginUrl, r as getAuthToken, t as api } from "./api-CLpzZUWU.js";
import { n as useTheme, r as getTheme, t as ThemeProvider } from "./provider-CRuhYiLs.js";
import { a as FormItem, i as FormField, n as FormControl, o as FormLabel, r as FormDescription, s as FormMessage, t as Form } from "./form-DrLEBR9G.js";
import { t as templates } from "./data-DrR68mVi.js";
import { i as URLInput, n as ScrollArea$1, r as IconPicker, s as parseRgbString, t as Route$11 } from "./route-CsRbs3nG.js";
import { r as PromptDialogProvider, t as useResumeStore } from "./resume-BHY1IvQp.js";
import { n as CometCard, t as Route$12 } from "./resumes-CljkxTrT.js";
import { t as useIsMobile } from "./use-mobile-CJT-n_ru.js";
import { t as Route$10 } from "./_slug-DsusYna5.js";
import { t as Route$15 } from "./profile-Ca-57092.js";
import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HeadContent, Link, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, redirect, useNavigate, useRouteContext } from "@tanstack/react-router";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { createAdapterFactory } from "@better-auth/core/db/adapter";
import { ENV, createLogger, env, getBooleanEnvVar, getEnvVar, isDevelopment, isProduction, isTest, logger, shouldPublishLog } from "@better-auth/core/env";
import "reflect-metadata";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { I18nProvider, Trans, useLingui } from "@lingui/react";
import { ArrowClockwiseIcon, ArrowLeftIcon, ArrowRightIcon, AtIcon, CameraIcon, CheckCircleIcon, DownloadSimpleIcon, FileIcon, HouseSimple, IconContext, InfoIcon, PencilSimpleIcon, PencilSimpleLineIcon, PlusIcon, ReadCvLogo, ReadCvLogoIcon, SlideshowIcon, SpinnerIcon, TrashIcon, UploadSimpleIcon, UserCircle, WarningIcon, Wrench, XCircleIcon, XIcon } from "@phosphor-icons/react";
import { MotionConfig, Reorder, motion, useDragControls } from "motion/react";
import { APIError, APIError as APIError$1, BASE_ERROR_CODES, BetterAuthError } from "@better-auth/core/error";
import { passkey } from "@better-auth/passkey";
import { and, asc, count, desc, eq, gt, gte, ilike, inArray, isNotNull, isNull, like, lt, lte, ne, notInArray, or, sql } from "drizzle-orm";
import { getAuthTables } from "@better-auth/core/db";
import { filterOutputFields } from "@better-auth/core/utils/db";
import { safeJSONParse } from "@better-auth/core/utils/json";
import * as z$2 from "zod";
import z, { ZodError, ZodObject, ZodOptional, flattenError, z as z$1 } from "zod";
import { createRateLimitKey, isValidIP, normalizeIP } from "@better-auth/core/utils/ip";
import { defineRequestState, getBetterAuthVersion, getCurrentAdapter, getCurrentAuthContext, hasRequestState, queueAfterTransactionHook, runWithAdapter, runWithEndpointContext, runWithRequestState, runWithTransaction } from "@better-auth/core/context";
import { generateId } from "@better-auth/core/utils/id";
import { isLoopbackHost } from "@better-auth/core/utils/host";
import { isAPIError } from "@better-auth/core/utils/is-api-error";
import { createAuthEndpoint, createAuthMiddleware } from "@better-auth/core/api";
import { normalizePathname } from "@better-auth/core/utils/url";
import { deprecate } from "@better-auth/core/utils/deprecate";
import { createHash, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { SocialProviderListEnum, socialProviders } from "@better-auth/core/social-providers";
import fs from "node:fs";
import fs$1 from "node:fs/promises";
import os from "node:os";
import path, { basename, dirname, extname, join, normalize } from "node:path";
import { createAuthorizationURL, refreshAccessToken, validateAuthorizationCode } from "@better-auth/core/oauth2";
import { createEnv } from "@t3-oss/env-core";
import { compare, hash } from "bcrypt";
import * as pg from "drizzle-orm/pg-core";
import nodemailer from "nodemailer";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { ORPCError, createRouterClient, os as os$1 } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { ORPCError as ORPCError$1 } from "@orpc/client";
import { DeleteObjectCommand, GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { i18n } from "@lingui/core";
import { StandardRPCJsonSerializer } from "@orpc/client/standard";
import { MutationCache, QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useHotkeys } from "react-hotkeys-hook";
import { HoverCard, Slider, Switch } from "radix-ui";
import { CommandLoading } from "cmdk";
import { create } from "zustand/react";
import { Toaster, toast } from "sonner";
import { match } from "ts-pattern";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext, useFormState, useWatch } from "react-hook-form";
import { zodValidator } from "@tanstack/zod-adapter";
import { RPCHandler } from "@orpc/server/fetch";
import { BatchHandlerPlugin, RequestHeadersPlugin } from "@orpc/server/plugins";
import { SmartCoercionPlugin } from "@orpc/json-schema";
import { OpenAPIGenerator } from "@orpc/openapi";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
function BrandIcon({ variant = "logo", className, ...props }) {
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("img", {
		src: `/${variant}/dark.svg`,
		alt: "Reactive Resume",
		className: cn("hidden size-12 dark:block", className),
		...props
	}), /* @__PURE__ */ jsx("img", {
		src: `/${variant}/light.svg`,
		alt: "Reactive Resume",
		className: cn("block size-12 dark:hidden", className),
		...props
	})] });
}
function ErrorScreen({ error: error$1, reset }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto flex h-svh max-w-md flex-col items-center justify-center gap-y-4",
		children: [
			/* @__PURE__ */ jsx(BrandIcon, {
				variant: "logo",
				className: "size-12"
			}),
			/* @__PURE__ */ jsxs(Alert, { children: [
				/* @__PURE__ */ jsx(WarningIcon, {}),
				/* @__PURE__ */ jsx(AlertTitle, { children: /* @__PURE__ */ jsx(Trans, { id: "l8BGas" }) }),
				/* @__PURE__ */ jsx(AlertDescription, { children: error$1.message })
			] }),
			/* @__PURE__ */ jsxs(Button, {
				onClick: reset,
				children: [/* @__PURE__ */ jsx(ArrowClockwiseIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "lCF0wC" })]
			})
		]
	});
}
function NotFoundScreen({ routeId }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto flex h-svh max-w-md flex-col items-center justify-center gap-y-4",
		children: [
			/* @__PURE__ */ jsx(BrandIcon, {
				variant: "logo",
				className: "size-12"
			}),
			/* @__PURE__ */ jsxs(Alert, { children: [
				/* @__PURE__ */ jsx(WarningIcon, {}),
				/* @__PURE__ */ jsx(AlertTitle, { children: /* @__PURE__ */ jsx(Trans, { id: "l8BGas" }) }),
				/* @__PURE__ */ jsx(AlertDescription, { children: routeId })
			] }),
			/* @__PURE__ */ jsx(Button, {
				asChild: true,
				children: /* @__PURE__ */ jsxs(Link, {
					to: "..",
					children: [/* @__PURE__ */ jsx(ArrowLeftIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "sr0UJD" })]
				})
			})
		]
	});
}
function insensitiveIlike(column, pattern, provider) {
	return provider === "pg" ? ilike(column, pattern) : sql`LOWER(${column}) LIKE LOWER(${pattern})`;
}
function insensitiveInArray(column, values) {
	if (values.length === 0) return sql`false`;
	return sql`LOWER(${column}) IN (${sql.join(values.map((v) => sql`LOWER(${v})`), sql`, `)})`;
}
function insensitiveNotInArray(column, values) {
	if (values.length === 0) return sql`true`;
	return sql`LOWER(${column}) NOT IN (${sql.join(values.map((v) => sql`LOWER(${v})`), sql`, `)})`;
}
function insensitiveEq(column, value) {
	return sql`LOWER(${column}) = LOWER(${value})`;
}
function insensitiveNe(column, value) {
	return sql`LOWER(${column}) <> LOWER(${value})`;
}
var drizzleAdapter = (db$1, config$1) => {
	let lazyOptions = null;
	const createCustomAdapter = (db$2) => ({ getFieldName, getDefaultFieldName, options }) => {
		function getSchema$1(model) {
			const schema$2 = config$1.schema || db$2._.fullSchema;
			if (!schema$2) throw new BetterAuthError("Drizzle adapter failed to initialize. Schema not found. Please provide a schema object in the adapter options object.");
			const schemaModel = schema$2[model];
			if (!schemaModel) throw new BetterAuthError(`[# Drizzle Adapter]: The model "${model}" was not found in the schema object. Please pass the schema directly to the adapter options.`);
			return schemaModel;
		}
		const withReturning = async (model, builder, data, where) => {
			if (config$1.provider !== "mysql") return (await builder.returning())[0];
			await builder.execute();
			const schemaModel = getSchema$1(model);
			const builderVal = builder.config?.values;
			if (where?.length) {
				const clause = convertWhereClause(where.map((w) => {
					if (data[w.field] !== void 0) return {
						...w,
						value: data[w.field]
					};
					return w;
				}), model);
				return (await db$2.select().from(schemaModel).where(...clause))[0];
			} else if (builderVal && builderVal[0]?.id?.value) {
				let tId = builderVal[0]?.id?.value;
				if (!tId) tId = (await db$2.select({ id: sql`LAST_INSERT_ID()` }).from(schemaModel).orderBy(desc(schemaModel.id)).limit(1))[0].id;
				return (await db$2.select().from(schemaModel).where(eq(schemaModel.id, tId)).limit(1).execute())[0];
			} else if (data.id) return (await db$2.select().from(schemaModel).where(eq(schemaModel.id, data.id)).limit(1).execute())[0];
			else {
				if (!("id" in schemaModel)) throw new BetterAuthError(`The model "${model}" does not have an "id" field. Please use the "id" field as your primary key.`);
				return (await db$2.select().from(schemaModel).orderBy(desc(schemaModel.id)).limit(1).execute())[0];
			}
		};
		function convertWhereClause(where, model) {
			const schemaModel = getSchema$1(model);
			if (!where) return [];
			if (where.length === 1) {
				const w = where[0];
				if (!w) return [];
				const field = getFieldName({
					model,
					field: w.field
				});
				if (!schemaModel[field]) throw new BetterAuthError(`The field "${w.field}" does not exist in the schema for the model "${model}". Please update your schema.`);
				const isInsensitive = (w.mode ?? "sensitive") === "insensitive" && (typeof w.value === "string" || Array.isArray(w.value) && w.value.every((v) => typeof v === "string"));
				if (w.operator === "in") {
					if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "in" operator.`);
					if (isInsensitive) return [insensitiveInArray(schemaModel[field], w.value)];
					return [inArray(schemaModel[field], w.value)];
				}
				if (w.operator === "not_in") {
					if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "not_in" operator.`);
					if (isInsensitive) return [insensitiveNotInArray(schemaModel[field], w.value)];
					return [notInArray(schemaModel[field], w.value)];
				}
				if (w.operator === "contains") {
					if (isInsensitive && typeof w.value === "string") return [insensitiveIlike(schemaModel[field], `%${w.value}%`, config$1.provider)];
					return [like(schemaModel[field], `%${w.value}%`)];
				}
				if (w.operator === "starts_with") {
					if (isInsensitive && typeof w.value === "string") return [insensitiveIlike(schemaModel[field], `${w.value}%`, config$1.provider)];
					return [like(schemaModel[field], `${w.value}%`)];
				}
				if (w.operator === "ends_with") {
					if (isInsensitive && typeof w.value === "string") return [insensitiveIlike(schemaModel[field], `%${w.value}`, config$1.provider)];
					return [like(schemaModel[field], `%${w.value}`)];
				}
				if (w.operator === "lt") return [lt(schemaModel[field], w.value)];
				if (w.operator === "lte") return [lte(schemaModel[field], w.value)];
				if (w.operator === "ne") {
					if (w.value === null) return [isNotNull(schemaModel[field])];
					if (isInsensitive && typeof w.value === "string") return [insensitiveNe(schemaModel[field], w.value)];
					return [ne(schemaModel[field], w.value)];
				}
				if (w.operator === "gt") return [gt(schemaModel[field], w.value)];
				if (w.operator === "gte") return [gte(schemaModel[field], w.value)];
				if (w.value === null) return [isNull(schemaModel[field])];
				if (isInsensitive && typeof w.value === "string") return [insensitiveEq(schemaModel[field], w.value)];
				return [eq(schemaModel[field], w.value)];
			}
			const andGroup = where.filter((w) => w.connector === "AND" || !w.connector);
			const orGroup = where.filter((w) => w.connector === "OR");
			const andClause = and(...andGroup.map((w) => {
				const field = getFieldName({
					model,
					field: w.field
				});
				const isInsensitive = (w.mode ?? "sensitive") === "insensitive" && (typeof w.value === "string" || Array.isArray(w.value) && w.value.every((v) => typeof v === "string"));
				if (w.operator === "in") {
					if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "in" operator.`);
					if (isInsensitive) return insensitiveInArray(schemaModel[field], w.value);
					return inArray(schemaModel[field], w.value);
				}
				if (w.operator === "not_in") {
					if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "not_in" operator.`);
					if (isInsensitive) return insensitiveNotInArray(schemaModel[field], w.value);
					return notInArray(schemaModel[field], w.value);
				}
				if (w.operator === "contains") {
					if (isInsensitive && typeof w.value === "string") return insensitiveIlike(schemaModel[field], `%${w.value}%`, config$1.provider);
					return like(schemaModel[field], `%${w.value}%`);
				}
				if (w.operator === "starts_with") {
					if (isInsensitive && typeof w.value === "string") return insensitiveIlike(schemaModel[field], `${w.value}%`, config$1.provider);
					return like(schemaModel[field], `${w.value}%`);
				}
				if (w.operator === "ends_with") {
					if (isInsensitive && typeof w.value === "string") return insensitiveIlike(schemaModel[field], `%${w.value}`, config$1.provider);
					return like(schemaModel[field], `%${w.value}`);
				}
				if (w.operator === "lt") return lt(schemaModel[field], w.value);
				if (w.operator === "lte") return lte(schemaModel[field], w.value);
				if (w.operator === "gt") return gt(schemaModel[field], w.value);
				if (w.operator === "gte") return gte(schemaModel[field], w.value);
				if (w.operator === "ne") {
					if (w.value === null) return isNotNull(schemaModel[field]);
					if (isInsensitive && typeof w.value === "string") return insensitiveNe(schemaModel[field], w.value);
					return ne(schemaModel[field], w.value);
				}
				if (w.value === null) return isNull(schemaModel[field]);
				if (isInsensitive && typeof w.value === "string") return insensitiveEq(schemaModel[field], w.value);
				return eq(schemaModel[field], w.value);
			}));
			const orClause = or(...orGroup.map((w) => {
				const field = getFieldName({
					model,
					field: w.field
				});
				if (!schemaModel[field]) throw new BetterAuthError(`The field "${w.field}" does not exist in the schema for the model "${model}". Please update your schema.`);
				const isInsensitive = (w.mode ?? "sensitive") === "insensitive" && (typeof w.value === "string" || Array.isArray(w.value) && w.value.every((v) => typeof v === "string"));
				if (w.operator === "in") {
					if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "in" operator.`);
					if (isInsensitive) return insensitiveInArray(schemaModel[field], w.value);
					return inArray(schemaModel[field], w.value);
				}
				if (w.operator === "not_in") {
					if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "not_in" operator.`);
					if (isInsensitive) return insensitiveNotInArray(schemaModel[field], w.value);
					return notInArray(schemaModel[field], w.value);
				}
				if (w.operator === "contains") {
					if (isInsensitive && typeof w.value === "string") return insensitiveIlike(schemaModel[field], `%${w.value}%`, config$1.provider);
					return like(schemaModel[field], `%${w.value}%`);
				}
				if (w.operator === "starts_with") {
					if (isInsensitive && typeof w.value === "string") return insensitiveIlike(schemaModel[field], `${w.value}%`, config$1.provider);
					return like(schemaModel[field], `${w.value}%`);
				}
				if (w.operator === "ends_with") {
					if (isInsensitive && typeof w.value === "string") return insensitiveIlike(schemaModel[field], `%${w.value}`, config$1.provider);
					return like(schemaModel[field], `%${w.value}`);
				}
				if (w.operator === "lt") return lt(schemaModel[field], w.value);
				if (w.operator === "lte") return lte(schemaModel[field], w.value);
				if (w.operator === "gt") return gt(schemaModel[field], w.value);
				if (w.operator === "gte") return gte(schemaModel[field], w.value);
				if (w.operator === "ne") {
					if (w.value === null) return isNotNull(schemaModel[field]);
					if (isInsensitive && typeof w.value === "string") return insensitiveNe(schemaModel[field], w.value);
					return ne(schemaModel[field], w.value);
				}
				if (w.value === null) return isNull(schemaModel[field]);
				if (isInsensitive && typeof w.value === "string") return insensitiveEq(schemaModel[field], w.value);
				return eq(schemaModel[field], w.value);
			}));
			const clause = [];
			if (andGroup.length) clause.push(andClause);
			if (orGroup.length) clause.push(orClause);
			return clause;
		}
		function checkMissingFields(schema$2, model, values) {
			if (!schema$2) throw new BetterAuthError("Drizzle adapter failed to initialize. Drizzle Schema not found. Please provide a schema object in the adapter options object.");
			for (const key in values) {
				let fieldName;
				try {
					fieldName = getFieldName({
						model,
						field: key
					});
				} catch {
					fieldName = key;
				}
				if (!schema$2[fieldName]) throw new BetterAuthError(`The field "${key}" does not exist in the "${model}" Drizzle schema. Please update your drizzle schema or re-generate using "npx auth@latest generate".`);
			}
		}
		function getQueryModel(model) {
			if (db$2.query[model]) return model;
			if (config$1.usePlural) {
				const plural = `${model}s`;
				if (db$2.query[plural]) return plural;
			}
			if (config$1.schema) {
				const targetTable = config$1.schema[model];
				if (targetTable) {
					const fullSchema = db$2._.fullSchema;
					if (fullSchema) {
						for (const key of Object.keys(db$2.query)) if (fullSchema[key] === targetTable) return key;
					}
				}
			}
			return null;
		}
		return {
			async create({ model, data: values }) {
				const schemaModel = getSchema$1(model);
				checkMissingFields(schemaModel, model, values);
				return await withReturning(model, db$2.insert(schemaModel).values(values), values);
			},
			async findOne({ model, where, select, join: join$1 }) {
				const schemaModel = getSchema$1(model);
				const clause = convertWhereClause(where, model);
				if (options.experimental?.joins) {
					const queryModel = getQueryModel(model);
					if (!db$2.query || !queryModel) {
						logger.error(`[# Drizzle Adapter]: The model "${model}" was not found in the query object. Please update your Drizzle schema to include relations or re-generate using "npx auth@latest generate".`);
						logger.info("Falling back to regular query");
					} else {
						let includes;
						const pluralJoinResults = [];
						if (join$1) {
							includes = {};
							const joinEntries = Object.entries(join$1);
							for (const [model$1, joinAttr] of joinEntries) {
								const limit = joinAttr.limit ?? options.advanced?.database?.defaultFindManyLimit ?? 100;
								const isUnique = joinAttr.relation === "one-to-one";
								const pluralSuffix = isUnique || config$1.usePlural ? "" : "s";
								includes[`${model$1}${pluralSuffix}`] = isUnique ? true : { limit };
								if (!isUnique) pluralJoinResults.push(`${model$1}${pluralSuffix}`);
							}
						}
						const res$1 = await db$2.query[queryModel].findFirst({
							where: clause[0],
							columns: select?.length && select.length > 0 ? select.reduce((acc, field) => {
								acc[getFieldName({
									model,
									field
								})] = true;
								return acc;
							}, {}) : void 0,
							with: includes
						});
						if (res$1) for (const pluralJoinResult of pluralJoinResults) {
							const singularKey = !config$1.usePlural ? pluralJoinResult.slice(0, -1) : pluralJoinResult;
							res$1[singularKey] = res$1[pluralJoinResult];
							if (pluralJoinResult !== singularKey) delete res$1[pluralJoinResult];
						}
						return res$1;
					}
				}
				const res = await db$2.select(select?.length && select.length > 0 ? select.reduce((acc, field) => {
					const fieldName = getFieldName({
						model,
						field
					});
					return {
						...acc,
						[fieldName]: schemaModel[fieldName]
					};
				}, {}) : void 0).from(schemaModel).where(...clause);
				if (!res.length) return null;
				return res[0];
			},
			async findMany({ model, where, sortBy, limit, select, offset, join: join$1 }) {
				const schemaModel = getSchema$1(model);
				const clause = where ? convertWhereClause(where, model) : [];
				const sortFn = sortBy?.direction === "desc" ? desc : asc;
				if (options.experimental?.joins) {
					const queryModel = getQueryModel(model);
					if (!queryModel) {
						logger.error(`[# Drizzle Adapter]: The model "${model}" was not found in the query object. Please update your Drizzle schema to include relations or re-generate using "npx auth@latest generate".`);
						logger.info("Falling back to regular query");
					} else {
						let includes;
						const pluralJoinResults = [];
						if (join$1) {
							includes = {};
							const joinEntries = Object.entries(join$1);
							for (const [model$1, joinAttr] of joinEntries) {
								const isUnique = joinAttr.relation === "one-to-one";
								const limit$1 = joinAttr.limit ?? options.advanced?.database?.defaultFindManyLimit ?? 100;
								const pluralSuffix = isUnique || config$1.usePlural ? "" : "s";
								includes[`${model$1}${pluralSuffix}`] = isUnique ? true : { limit: limit$1 };
								if (!isUnique) pluralJoinResults.push(`${model$1}${pluralSuffix}`);
							}
						}
						let orderBy = void 0;
						if (sortBy?.field) orderBy = [sortFn(schemaModel[getFieldName({
							model,
							field: sortBy?.field
						})])];
						const res = await db$2.query[queryModel].findMany({
							where: clause[0],
							with: includes,
							columns: select?.length && select.length > 0 ? select.reduce((acc, field) => {
								acc[getFieldName({
									model,
									field
								})] = true;
								return acc;
							}, {}) : void 0,
							limit: limit ?? 100,
							offset: offset ?? 0,
							orderBy
						});
						if (res) for (const item of res) for (const pluralJoinResult of pluralJoinResults) {
							const singularKey = !config$1.usePlural ? pluralJoinResult.slice(0, -1) : pluralJoinResult;
							if (singularKey === pluralJoinResult) continue;
							item[singularKey] = item[pluralJoinResult];
							delete item[pluralJoinResult];
						}
						return res;
					}
				}
				let builder = db$2.select(select?.length && select.length > 0 ? select.reduce((acc, field) => {
					const fieldName = getFieldName({
						model,
						field
					});
					return {
						...acc,
						[fieldName]: schemaModel[fieldName]
					};
				}, {}) : void 0).from(schemaModel);
				const effectiveLimit = limit;
				const effectiveOffset = offset;
				if (typeof effectiveLimit !== "undefined") builder = builder.limit(effectiveLimit);
				if (typeof effectiveOffset !== "undefined") builder = builder.offset(effectiveOffset);
				if (sortBy?.field) builder = builder.orderBy(sortFn(schemaModel[getFieldName({
					model,
					field: sortBy?.field
				})]));
				return await builder.where(...clause);
			},
			async count({ model, where }) {
				const schemaModel = getSchema$1(model);
				const clause = where ? convertWhereClause(where, model) : [];
				return (await db$2.select({ count: count() }).from(schemaModel).where(...clause))[0].count;
			},
			async update({ model, where, update: values }) {
				const schemaModel = getSchema$1(model);
				const clause = convertWhereClause(where, model);
				return await withReturning(model, db$2.update(schemaModel).set(values).where(...clause), values, where);
			},
			async updateMany({ model, where, update: values }) {
				const schemaModel = getSchema$1(model);
				const clause = convertWhereClause(where, model);
				return await db$2.update(schemaModel).set(values).where(...clause);
			},
			async delete({ model, where }) {
				const schemaModel = getSchema$1(model);
				const clause = convertWhereClause(where, model);
				return await db$2.delete(schemaModel).where(...clause);
			},
			async deleteMany({ model, where }) {
				const schemaModel = getSchema$1(model);
				const clause = convertWhereClause(where, model);
				const res = await db$2.delete(schemaModel).where(...clause);
				let count$1 = 0;
				if (res && "rowCount" in res) count$1 = res.rowCount;
				else if (Array.isArray(res)) count$1 = res.length;
				else if (res && ("affectedRows" in res || "rowsAffected" in res || "changes" in res)) count$1 = res.affectedRows ?? res.rowsAffected ?? res.changes;
				if (typeof count$1 !== "number") logger.error("[Drizzle Adapter] The result of the deleteMany operation is not a number. This is likely a bug in the adapter. Please report this issue to the Better Auth team.", {
					res,
					model,
					where
				});
				return count$1;
			},
			options: config$1
		};
	};
	let adapterOptions = null;
	adapterOptions = {
		config: {
			adapterId: "drizzle",
			adapterName: "Drizzle Adapter",
			usePlural: config$1.usePlural ?? false,
			debugLogs: config$1.debugLogs ?? false,
			supportsUUIDs: config$1.provider === "pg" ? true : false,
			supportsJSON: config$1.provider === "pg" ? true : false,
			supportsArrays: config$1.provider === "pg" ? true : false,
			customTransformOutput: ({ data, fieldAttributes }) => {
				if (fieldAttributes.type === "date") {
					if (data === null || data === void 0) return data;
					return new Date(data);
				}
				return data;
			},
			transaction: config$1.transaction ?? false ? (cb) => db$1.transaction((tx) => {
				return cb(createAdapterFactory({
					config: adapterOptions.config,
					adapter: createCustomAdapter(tx)
				})(lazyOptions));
			}) : false
		},
		adapter: createCustomAdapter(db$1)
	};
	const adapter = createAdapterFactory(adapterOptions);
	return (options) => {
		lazyOptions = options;
		return adapter(options);
	};
};
function isPromise(obj) {
	return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
}
function isBytes$1(a) {
	return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function anumber$1(n, title$1 = "") {
	if (!Number.isSafeInteger(n) || n < 0) {
		const prefix = title$1 && `"${title$1}" `;
		throw new Error(`${prefix}expected integer >= 0, got ${n}`);
	}
}
function abytes$1(value, length, title$1 = "") {
	const bytes = isBytes$1(value);
	const len = value?.length;
	const needsLen = length !== void 0;
	if (!bytes || needsLen && len !== length) {
		const prefix = title$1 && `"${title$1}" `;
		const ofLen = needsLen ? ` of length ${length}` : "";
		const got = bytes ? `length=${len}` : `type=${typeof value}`;
		throw new Error(prefix + "expected Uint8Array" + ofLen + ", got " + got);
	}
	return value;
}
function ahash(h) {
	if (typeof h !== "function" || typeof h.create !== "function") throw new Error("Hash must wrapped by utils.createHasher");
	anumber$1(h.outputLen);
	anumber$1(h.blockLen);
}
function aexists$1(instance, checkFinished = true) {
	if (instance.destroyed) throw new Error("Hash instance has been destroyed");
	if (checkFinished && instance.finished) throw new Error("Hash#digest() has already been called");
}
function aoutput$1(out, instance) {
	abytes$1(out, void 0, "digestInto() output");
	const min = instance.outputLen;
	if (out.length < min) throw new Error("\"digestInto() output\" expected to be of length >=" + min);
}
function clean$1(...arrays) {
	for (let i = 0; i < arrays.length; i++) arrays[i].fill(0);
}
function createView$1(arr) {
	return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift) {
	return word << 32 - shift | word >>> shift;
}
function createHasher(hashCons, info$1 = {}) {
	const hashC = (msg, opts) => hashCons(opts).update(msg).digest();
	const tmp = hashCons(void 0);
	hashC.outputLen = tmp.outputLen;
	hashC.blockLen = tmp.blockLen;
	hashC.create = (opts) => hashCons(opts);
	Object.assign(hashC, info$1);
	return Object.freeze(hashC);
}
const oidNist = (suffix) => ({ oid: Uint8Array.from([
	6,
	9,
	96,
	134,
	72,
	1,
	101,
	3,
	4,
	2,
	suffix
]) });
var _HMAC = class {
	oHash;
	iHash;
	blockLen;
	outputLen;
	finished = false;
	destroyed = false;
	constructor(hash$1, key) {
		ahash(hash$1);
		abytes$1(key, void 0, "key");
		this.iHash = hash$1.create();
		if (typeof this.iHash.update !== "function") throw new Error("Expected instance of class which extends utils.Hash");
		this.blockLen = this.iHash.blockLen;
		this.outputLen = this.iHash.outputLen;
		const blockLen = this.blockLen;
		const pad = new Uint8Array(blockLen);
		pad.set(key.length > blockLen ? hash$1.create().update(key).digest() : key);
		for (let i = 0; i < pad.length; i++) pad[i] ^= 54;
		this.iHash.update(pad);
		this.oHash = hash$1.create();
		for (let i = 0; i < pad.length; i++) pad[i] ^= 106;
		this.oHash.update(pad);
		clean$1(pad);
	}
	update(buf) {
		aexists$1(this);
		this.iHash.update(buf);
		return this;
	}
	digestInto(out) {
		aexists$1(this);
		abytes$1(out, this.outputLen, "output");
		this.finished = true;
		this.iHash.digestInto(out);
		this.oHash.update(out);
		this.oHash.digestInto(out);
		this.destroy();
	}
	digest() {
		const out = new Uint8Array(this.oHash.outputLen);
		this.digestInto(out);
		return out;
	}
	_cloneInto(to) {
		to ||= Object.create(Object.getPrototypeOf(this), {});
		const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
		to = to;
		to.finished = finished;
		to.destroyed = destroyed;
		to.blockLen = blockLen;
		to.outputLen = outputLen;
		to.oHash = oHash._cloneInto(to.oHash);
		to.iHash = iHash._cloneInto(to.iHash);
		return to;
	}
	clone() {
		return this._cloneInto();
	}
	destroy() {
		this.destroyed = true;
		this.oHash.destroy();
		this.iHash.destroy();
	}
};
const hmac = (hash$1, key, message$1) => new _HMAC(hash$1, key).update(message$1).digest();
hmac.create = (hash$1, key) => new _HMAC(hash$1, key);
function extract(hash$1, ikm, salt) {
	ahash(hash$1);
	if (salt === void 0) salt = new Uint8Array(hash$1.outputLen);
	return hmac(hash$1, salt, ikm);
}
var HKDF_COUNTER = /* @__PURE__ */ Uint8Array.of(0);
var EMPTY_BUFFER = /* @__PURE__ */ Uint8Array.of();
function expand(hash$1, prk, info$1, length = 32) {
	ahash(hash$1);
	anumber$1(length, "length");
	const olen = hash$1.outputLen;
	if (length > 255 * olen) throw new Error("Length must be <= 255*HashLen");
	const blocks = Math.ceil(length / olen);
	if (info$1 === void 0) info$1 = EMPTY_BUFFER;
	else abytes$1(info$1, void 0, "info");
	const okm = new Uint8Array(blocks * olen);
	const HMAC = hmac.create(hash$1, prk);
	const HMACTmp = HMAC._cloneInto();
	const T = new Uint8Array(HMAC.outputLen);
	for (let counter = 0; counter < blocks; counter++) {
		HKDF_COUNTER[0] = counter + 1;
		HMACTmp.update(counter === 0 ? EMPTY_BUFFER : T).update(info$1).update(HKDF_COUNTER).digestInto(T);
		okm.set(T, olen * counter);
		HMAC._cloneInto(HMACTmp);
	}
	HMAC.destroy();
	HMACTmp.destroy();
	clean$1(T, HKDF_COUNTER);
	return okm.slice(0, length);
}
const hkdf = (hash$1, ikm, salt, info$1, length) => expand(hash$1, extract(hash$1, ikm, salt), info$1, length);
function Chi(a, b, c) {
	return a & b ^ ~a & c;
}
function Maj(a, b, c) {
	return a & b ^ a & c ^ b & c;
}
var HashMD = class {
	blockLen;
	outputLen;
	padOffset;
	isLE;
	buffer;
	view;
	finished = false;
	length = 0;
	pos = 0;
	destroyed = false;
	constructor(blockLen, outputLen, padOffset, isLE$1) {
		this.blockLen = blockLen;
		this.outputLen = outputLen;
		this.padOffset = padOffset;
		this.isLE = isLE$1;
		this.buffer = new Uint8Array(blockLen);
		this.view = createView$1(this.buffer);
	}
	update(data) {
		aexists$1(this);
		abytes$1(data);
		const { view, buffer, blockLen } = this;
		const len = data.length;
		for (let pos = 0; pos < len;) {
			const take = Math.min(blockLen - this.pos, len - pos);
			if (take === blockLen) {
				const dataView = createView$1(data);
				for (; blockLen <= len - pos; pos += blockLen) this.process(dataView, pos);
				continue;
			}
			buffer.set(data.subarray(pos, pos + take), this.pos);
			this.pos += take;
			pos += take;
			if (this.pos === blockLen) {
				this.process(view, 0);
				this.pos = 0;
			}
		}
		this.length += data.length;
		this.roundClean();
		return this;
	}
	digestInto(out) {
		aexists$1(this);
		aoutput$1(out, this);
		this.finished = true;
		const { buffer, view, blockLen, isLE: isLE$1 } = this;
		let { pos } = this;
		buffer[pos++] = 128;
		clean$1(this.buffer.subarray(pos));
		if (this.padOffset > blockLen - pos) {
			this.process(view, 0);
			pos = 0;
		}
		for (let i = pos; i < blockLen; i++) buffer[i] = 0;
		view.setBigUint64(blockLen - 8, BigInt(this.length * 8), isLE$1);
		this.process(view, 0);
		const oview = createView$1(out);
		const len = this.outputLen;
		if (len % 4) throw new Error("_sha2: outputLen must be aligned to 32bit");
		const outLen = len / 4;
		const state = this.get();
		if (outLen > state.length) throw new Error("_sha2: outputLen bigger than state");
		for (let i = 0; i < outLen; i++) oview.setUint32(4 * i, state[i], isLE$1);
	}
	digest() {
		const { buffer, outputLen } = this;
		this.digestInto(buffer);
		const res = buffer.slice(0, outputLen);
		this.destroy();
		return res;
	}
	_cloneInto(to) {
		to ||= new this.constructor();
		to.set(...this.get());
		const { blockLen, buffer, length, finished, destroyed, pos } = this;
		to.destroyed = destroyed;
		to.finished = finished;
		to.length = length;
		to.pos = pos;
		if (length % blockLen) to.buffer.set(buffer);
		return to;
	}
	clone() {
		return this._cloneInto();
	}
};
const SHA256_IV = /* @__PURE__ */ Uint32Array.from([
	1779033703,
	3144134277,
	1013904242,
	2773480762,
	1359893119,
	2600822924,
	528734635,
	1541459225
]);
var SHA256_K = /* @__PURE__ */ Uint32Array.from([
	1116352408,
	1899447441,
	3049323471,
	3921009573,
	961987163,
	1508970993,
	2453635748,
	2870763221,
	3624381080,
	310598401,
	607225278,
	1426881987,
	1925078388,
	2162078206,
	2614888103,
	3248222580,
	3835390401,
	4022224774,
	264347078,
	604807628,
	770255983,
	1249150122,
	1555081692,
	1996064986,
	2554220882,
	2821834349,
	2952996808,
	3210313671,
	3336571891,
	3584528711,
	113926993,
	338241895,
	666307205,
	773529912,
	1294757372,
	1396182291,
	1695183700,
	1986661051,
	2177026350,
	2456956037,
	2730485921,
	2820302411,
	3259730800,
	3345764771,
	3516065817,
	3600352804,
	4094571909,
	275423344,
	430227734,
	506948616,
	659060556,
	883997877,
	958139571,
	1322822218,
	1537002063,
	1747873779,
	1955562222,
	2024104815,
	2227730452,
	2361852424,
	2428436474,
	2756734187,
	3204031479,
	3329325298
]);
var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
var SHA2_32B = class extends HashMD {
	constructor(outputLen) {
		super(64, outputLen, 8, false);
	}
	get() {
		const { A, B, C, D, E, F, G, H } = this;
		return [
			A,
			B,
			C,
			D,
			E,
			F,
			G,
			H
		];
	}
	set(A, B, C, D, E, F, G, H) {
		this.A = A | 0;
		this.B = B | 0;
		this.C = C | 0;
		this.D = D | 0;
		this.E = E | 0;
		this.F = F | 0;
		this.G = G | 0;
		this.H = H | 0;
	}
	process(view, offset) {
		for (let i = 0; i < 16; i++, offset += 4) SHA256_W[i] = view.getUint32(offset, false);
		for (let i = 16; i < 64; i++) {
			const W15 = SHA256_W[i - 15];
			const W2 = SHA256_W[i - 2];
			const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
			SHA256_W[i] = (rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10) + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
		}
		let { A, B, C, D, E, F, G, H } = this;
		for (let i = 0; i < 64; i++) {
			const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
			const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
			const T2 = (rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22)) + Maj(A, B, C) | 0;
			H = G;
			G = F;
			F = E;
			E = D + T1 | 0;
			D = C;
			C = B;
			B = A;
			A = T1 + T2 | 0;
		}
		A = A + this.A | 0;
		B = B + this.B | 0;
		C = C + this.C | 0;
		D = D + this.D | 0;
		E = E + this.E | 0;
		F = F + this.F | 0;
		G = G + this.G | 0;
		H = H + this.H | 0;
		this.set(A, B, C, D, E, F, G, H);
	}
	roundClean() {
		clean$1(SHA256_W);
	}
	destroy() {
		this.set(0, 0, 0, 0, 0, 0, 0, 0);
		clean$1(this.buffer);
	}
};
var _SHA256 = class extends SHA2_32B {
	A = SHA256_IV[0] | 0;
	B = SHA256_IV[1] | 0;
	C = SHA256_IV[2] | 0;
	D = SHA256_IV[3] | 0;
	E = SHA256_IV[4] | 0;
	F = SHA256_IV[5] | 0;
	G = SHA256_IV[6] | 0;
	H = SHA256_IV[7] | 0;
	constructor() {
		super(32);
	}
};
const sha256 = /* @__PURE__ */ createHasher(() => new _SHA256(), /* @__PURE__ */ oidNist(1));
const encoder = new TextEncoder();
const decoder = new TextDecoder();
var MAX_INT32 = 2 ** 32;
function concat(...buffers) {
	const size = buffers.reduce((acc, { length }) => acc + length, 0);
	const buf = new Uint8Array(size);
	let i = 0;
	for (const buffer of buffers) {
		buf.set(buffer, i);
		i += buffer.length;
	}
	return buf;
}
function writeUInt32BE(buf, value, offset) {
	if (value < 0 || value >= MAX_INT32) throw new RangeError(`value must be >= 0 and <= ${MAX_INT32 - 1}. Received ${value}`);
	buf.set([
		value >>> 24,
		value >>> 16,
		value >>> 8,
		value & 255
	], offset);
}
function uint64be(value) {
	const high = Math.floor(value / MAX_INT32);
	const low = value % MAX_INT32;
	const buf = new Uint8Array(8);
	writeUInt32BE(buf, high, 0);
	writeUInt32BE(buf, low, 4);
	return buf;
}
function uint32be(value) {
	const buf = new Uint8Array(4);
	writeUInt32BE(buf, value);
	return buf;
}
function encode$1(string) {
	const bytes = new Uint8Array(string.length);
	for (let i = 0; i < string.length; i++) {
		const code = string.charCodeAt(i);
		if (code > 127) throw new TypeError("non-ASCII string encountered in encode()");
		bytes[i] = code;
	}
	return bytes;
}
function encodeBase64(input) {
	if (Uint8Array.prototype.toBase64) return input.toBase64();
	const CHUNK_SIZE$1 = 32768;
	const arr = [];
	for (let i = 0; i < input.length; i += CHUNK_SIZE$1) arr.push(String.fromCharCode.apply(null, input.subarray(i, i + CHUNK_SIZE$1)));
	return btoa(arr.join(""));
}
function decodeBase64(encoded) {
	if (Uint8Array.fromBase64) return Uint8Array.fromBase64(encoded);
	const binary$1 = atob(encoded);
	const bytes = new Uint8Array(binary$1.length);
	for (let i = 0; i < binary$1.length; i++) bytes[i] = binary$1.charCodeAt(i);
	return bytes;
}
function decode(input) {
	if (Uint8Array.fromBase64) return Uint8Array.fromBase64(typeof input === "string" ? input : decoder.decode(input), { alphabet: "base64url" });
	let encoded = input;
	if (encoded instanceof Uint8Array) encoded = decoder.decode(encoded);
	encoded = encoded.replace(/-/g, "+").replace(/_/g, "/");
	try {
		return decodeBase64(encoded);
	} catch {
		throw new TypeError("The input to be decoded is not correctly encoded.");
	}
}
function encode(input) {
	let unencoded = input;
	if (typeof unencoded === "string") unencoded = encoder.encode(unencoded);
	if (Uint8Array.prototype.toBase64) return unencoded.toBase64({
		alphabet: "base64url",
		omitPadding: true
	});
	return encodeBase64(unencoded).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
var JOSEError = class extends Error {
	static code = "ERR_JOSE_GENERIC";
	code = "ERR_JOSE_GENERIC";
	constructor(message$1, options) {
		super(message$1, options);
		this.name = this.constructor.name;
		Error.captureStackTrace?.(this, this.constructor);
	}
};
var JWTClaimValidationFailed = class extends JOSEError {
	static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
	code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
	claim;
	reason;
	payload;
	constructor(message$1, payload, claim = "unspecified", reason = "unspecified") {
		super(message$1, { cause: {
			claim,
			reason,
			payload
		} });
		this.claim = claim;
		this.reason = reason;
		this.payload = payload;
	}
};
var JWTExpired = class extends JOSEError {
	static code = "ERR_JWT_EXPIRED";
	code = "ERR_JWT_EXPIRED";
	claim;
	reason;
	payload;
	constructor(message$1, payload, claim = "unspecified", reason = "unspecified") {
		super(message$1, { cause: {
			claim,
			reason,
			payload
		} });
		this.claim = claim;
		this.reason = reason;
		this.payload = payload;
	}
};
var JOSEAlgNotAllowed = class extends JOSEError {
	static code = "ERR_JOSE_ALG_NOT_ALLOWED";
	code = "ERR_JOSE_ALG_NOT_ALLOWED";
};
var JOSENotSupported = class extends JOSEError {
	static code = "ERR_JOSE_NOT_SUPPORTED";
	code = "ERR_JOSE_NOT_SUPPORTED";
};
var JWEDecryptionFailed = class extends JOSEError {
	static code = "ERR_JWE_DECRYPTION_FAILED";
	code = "ERR_JWE_DECRYPTION_FAILED";
	constructor(message$1 = "decryption operation failed", options) {
		super(message$1, options);
	}
};
var JWEInvalid = class extends JOSEError {
	static code = "ERR_JWE_INVALID";
	code = "ERR_JWE_INVALID";
};
var JWSInvalid = class extends JOSEError {
	static code = "ERR_JWS_INVALID";
	code = "ERR_JWS_INVALID";
};
var JWTInvalid = class extends JOSEError {
	static code = "ERR_JWT_INVALID";
	code = "ERR_JWT_INVALID";
};
var JWKInvalid = class extends JOSEError {
	static code = "ERR_JWK_INVALID";
	code = "ERR_JWK_INVALID";
};
Symbol.asyncIterator;
var JWSSignatureVerificationFailed = class extends JOSEError {
	static code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
	code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
	constructor(message$1 = "signature verification failed", options) {
		super(message$1, options);
	}
};
function bitLength(alg$1) {
	switch (alg$1) {
		case "A128GCM":
		case "A128GCMKW":
		case "A192GCM":
		case "A192GCMKW":
		case "A256GCM":
		case "A256GCMKW": return 96;
		case "A128CBC-HS256":
		case "A192CBC-HS384":
		case "A256CBC-HS512": return 128;
		default: throw new JOSENotSupported(`Unsupported JWE Algorithm: ${alg$1}`);
	}
}
const generateIv = (alg$1) => crypto.getRandomValues(new Uint8Array(bitLength(alg$1) >> 3));
function checkIvLength(enc$1, iv) {
	if (iv.length << 3 !== bitLength(enc$1)) throw new JWEInvalid("Invalid Initialization Vector length");
}
function checkCekLength(cek, expected) {
	const actual = cek.byteLength << 3;
	if (actual !== expected) throw new JWEInvalid(`Invalid Content Encryption Key length. Expected ${expected} bits, got ${actual} bits`);
}
var unusable = (name, prop = "algorithm.name") => /* @__PURE__ */ new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
var isAlgorithm = (algorithm$1, name) => algorithm$1.name === name;
function getHashLength(hash$1) {
	return parseInt(hash$1.name.slice(4), 10);
}
function getNamedCurve(alg$1) {
	switch (alg$1) {
		case "ES256": return "P-256";
		case "ES384": return "P-384";
		case "ES512": return "P-521";
		default: throw new Error("unreachable");
	}
}
function checkUsage(key, usage) {
	if (usage && !key.usages.includes(usage)) throw new TypeError(`CryptoKey does not support this operation, its usages must include ${usage}.`);
}
function checkSigCryptoKey(key, alg$1, usage) {
	switch (alg$1) {
		case "HS256":
		case "HS384":
		case "HS512": {
			if (!isAlgorithm(key.algorithm, "HMAC")) throw unusable("HMAC");
			const expected = parseInt(alg$1.slice(2), 10);
			if (getHashLength(key.algorithm.hash) !== expected) throw unusable(`SHA-${expected}`, "algorithm.hash");
			break;
		}
		case "RS256":
		case "RS384":
		case "RS512": {
			if (!isAlgorithm(key.algorithm, "RSASSA-PKCS1-v1_5")) throw unusable("RSASSA-PKCS1-v1_5");
			const expected = parseInt(alg$1.slice(2), 10);
			if (getHashLength(key.algorithm.hash) !== expected) throw unusable(`SHA-${expected}`, "algorithm.hash");
			break;
		}
		case "PS256":
		case "PS384":
		case "PS512": {
			if (!isAlgorithm(key.algorithm, "RSA-PSS")) throw unusable("RSA-PSS");
			const expected = parseInt(alg$1.slice(2), 10);
			if (getHashLength(key.algorithm.hash) !== expected) throw unusable(`SHA-${expected}`, "algorithm.hash");
			break;
		}
		case "Ed25519":
		case "EdDSA":
			if (!isAlgorithm(key.algorithm, "Ed25519")) throw unusable("Ed25519");
			break;
		case "ML-DSA-44":
		case "ML-DSA-65":
		case "ML-DSA-87":
			if (!isAlgorithm(key.algorithm, alg$1)) throw unusable(alg$1);
			break;
		case "ES256":
		case "ES384":
		case "ES512": {
			if (!isAlgorithm(key.algorithm, "ECDSA")) throw unusable("ECDSA");
			const expected = getNamedCurve(alg$1);
			if (key.algorithm.namedCurve !== expected) throw unusable(expected, "algorithm.namedCurve");
			break;
		}
		default: throw new TypeError("CryptoKey does not support this operation");
	}
	checkUsage(key, usage);
}
function checkEncCryptoKey(key, alg$1, usage) {
	switch (alg$1) {
		case "A128GCM":
		case "A192GCM":
		case "A256GCM": {
			if (!isAlgorithm(key.algorithm, "AES-GCM")) throw unusable("AES-GCM");
			const expected = parseInt(alg$1.slice(1, 4), 10);
			if (key.algorithm.length !== expected) throw unusable(expected, "algorithm.length");
			break;
		}
		case "A128KW":
		case "A192KW":
		case "A256KW": {
			if (!isAlgorithm(key.algorithm, "AES-KW")) throw unusable("AES-KW");
			const expected = parseInt(alg$1.slice(1, 4), 10);
			if (key.algorithm.length !== expected) throw unusable(expected, "algorithm.length");
			break;
		}
		case "ECDH":
			switch (key.algorithm.name) {
				case "ECDH":
				case "X25519": break;
				default: throw unusable("ECDH or X25519");
			}
			break;
		case "PBES2-HS256+A128KW":
		case "PBES2-HS384+A192KW":
		case "PBES2-HS512+A256KW":
			if (!isAlgorithm(key.algorithm, "PBKDF2")) throw unusable("PBKDF2");
			break;
		case "RSA-OAEP":
		case "RSA-OAEP-256":
		case "RSA-OAEP-384":
		case "RSA-OAEP-512": {
			if (!isAlgorithm(key.algorithm, "RSA-OAEP")) throw unusable("RSA-OAEP");
			const expected = parseInt(alg$1.slice(9), 10) || 1;
			if (getHashLength(key.algorithm.hash) !== expected) throw unusable(`SHA-${expected}`, "algorithm.hash");
			break;
		}
		default: throw new TypeError("CryptoKey does not support this operation");
	}
	checkUsage(key, usage);
}
function message(msg, actual, ...types) {
	types = types.filter(Boolean);
	if (types.length > 2) {
		const last = types.pop();
		msg += `one of type ${types.join(", ")}, or ${last}.`;
	} else if (types.length === 2) msg += `one of type ${types[0]} or ${types[1]}.`;
	else msg += `of type ${types[0]}.`;
	if (actual == null) msg += ` Received ${actual}`;
	else if (typeof actual === "function" && actual.name) msg += ` Received function ${actual.name}`;
	else if (typeof actual === "object" && actual != null) {
		if (actual.constructor?.name) msg += ` Received an instance of ${actual.constructor.name}`;
	}
	return msg;
}
const invalidKeyInput = (actual, ...types) => message("Key must be ", actual, ...types);
const withAlg = (alg$1, actual, ...types) => message(`Key for the ${alg$1} algorithm must be `, actual, ...types);
function assertCryptoKey(key) {
	if (!isCryptoKey(key)) throw new Error("CryptoKey instance expected");
}
const isCryptoKey = (key) => {
	if (key?.[Symbol.toStringTag] === "CryptoKey") return true;
	try {
		return key instanceof CryptoKey;
	} catch {
		return false;
	}
};
const isKeyObject = (key) => key?.[Symbol.toStringTag] === "KeyObject";
const isKeyLike = (key) => isCryptoKey(key) || isKeyObject(key);
async function timingSafeEqual$1(a, b) {
	if (!(a instanceof Uint8Array)) throw new TypeError("First argument must be a buffer");
	if (!(b instanceof Uint8Array)) throw new TypeError("Second argument must be a buffer");
	const algorithm$1 = {
		name: "HMAC",
		hash: "SHA-256"
	};
	const key = await crypto.subtle.generateKey(algorithm$1, false, ["sign"]);
	const aHmac = new Uint8Array(await crypto.subtle.sign(algorithm$1, key, a));
	const bHmac = new Uint8Array(await crypto.subtle.sign(algorithm$1, key, b));
	let out = 0;
	let i = -1;
	while (++i < 32) out |= aHmac[i] ^ bHmac[i];
	return out === 0;
}
async function cbcDecrypt(enc$1, cek, ciphertext, iv, tag$1, aad) {
	if (!(cek instanceof Uint8Array)) throw new TypeError(invalidKeyInput(cek, "Uint8Array"));
	const keySize = parseInt(enc$1.slice(1, 4), 10);
	const encKey = await crypto.subtle.importKey("raw", cek.subarray(keySize >> 3), "AES-CBC", false, ["decrypt"]);
	const macKey = await crypto.subtle.importKey("raw", cek.subarray(0, keySize >> 3), {
		hash: `SHA-${keySize << 1}`,
		name: "HMAC"
	}, false, ["sign"]);
	const macData = concat(aad, iv, ciphertext, uint64be(aad.length << 3));
	const expectedTag = new Uint8Array((await crypto.subtle.sign("HMAC", macKey, macData)).slice(0, keySize >> 3));
	let macCheckPassed;
	try {
		macCheckPassed = await timingSafeEqual$1(tag$1, expectedTag);
	} catch {}
	if (!macCheckPassed) throw new JWEDecryptionFailed();
	let plaintext;
	try {
		plaintext = new Uint8Array(await crypto.subtle.decrypt({
			iv,
			name: "AES-CBC"
		}, encKey, ciphertext));
	} catch {}
	if (!plaintext) throw new JWEDecryptionFailed();
	return plaintext;
}
async function gcmDecrypt(enc$1, cek, ciphertext, iv, tag$1, aad) {
	let encKey;
	if (cek instanceof Uint8Array) encKey = await crypto.subtle.importKey("raw", cek, "AES-GCM", false, ["decrypt"]);
	else {
		checkEncCryptoKey(cek, enc$1, "decrypt");
		encKey = cek;
	}
	try {
		return new Uint8Array(await crypto.subtle.decrypt({
			additionalData: aad,
			iv,
			name: "AES-GCM",
			tagLength: 128
		}, encKey, concat(ciphertext, tag$1)));
	} catch {
		throw new JWEDecryptionFailed();
	}
}
async function decrypt(enc$1, cek, ciphertext, iv, tag$1, aad) {
	if (!isCryptoKey(cek) && !(cek instanceof Uint8Array)) throw new TypeError(invalidKeyInput(cek, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
	if (!iv) throw new JWEInvalid("JWE Initialization Vector missing");
	if (!tag$1) throw new JWEInvalid("JWE Authentication Tag missing");
	checkIvLength(enc$1, iv);
	switch (enc$1) {
		case "A128CBC-HS256":
		case "A192CBC-HS384":
		case "A256CBC-HS512":
			if (cek instanceof Uint8Array) checkCekLength(cek, parseInt(enc$1.slice(-3), 10));
			return cbcDecrypt(enc$1, cek, ciphertext, iv, tag$1, aad);
		case "A128GCM":
		case "A192GCM":
		case "A256GCM":
			if (cek instanceof Uint8Array) checkCekLength(cek, parseInt(enc$1.slice(1, 4), 10));
			return gcmDecrypt(enc$1, cek, ciphertext, iv, tag$1, aad);
		default: throw new JOSENotSupported("Unsupported JWE Content Encryption Algorithm");
	}
}
function isDisjoint(...headers) {
	const sources = headers.filter(Boolean);
	if (sources.length === 0 || sources.length === 1) return true;
	let acc;
	for (const header of sources) {
		const parameters = Object.keys(header);
		if (!acc || acc.size === 0) {
			acc = new Set(parameters);
			continue;
		}
		for (const parameter of parameters) {
			if (acc.has(parameter)) return false;
			acc.add(parameter);
		}
	}
	return true;
}
var isObjectLike = (value) => typeof value === "object" && value !== null;
function isObject(input) {
	if (!isObjectLike(input) || Object.prototype.toString.call(input) !== "[object Object]") return false;
	if (Object.getPrototypeOf(input) === null) return true;
	let proto = input;
	while (Object.getPrototypeOf(proto) !== null) proto = Object.getPrototypeOf(proto);
	return Object.getPrototypeOf(input) === proto;
}
function checkKeySize(key, alg$1) {
	if (key.algorithm.length !== parseInt(alg$1.slice(1, 4), 10)) throw new TypeError(`Invalid key size for alg: ${alg$1}`);
}
function getCryptoKey$2(key, alg$1, usage) {
	if (key instanceof Uint8Array) return crypto.subtle.importKey("raw", key, "AES-KW", true, [usage]);
	checkEncCryptoKey(key, alg$1, usage);
	return key;
}
async function wrap$2(alg$1, key, cek) {
	const cryptoKey = await getCryptoKey$2(key, alg$1, "wrapKey");
	checkKeySize(cryptoKey, alg$1);
	const cryptoKeyCek = await crypto.subtle.importKey("raw", cek, {
		hash: "SHA-256",
		name: "HMAC"
	}, true, ["sign"]);
	return new Uint8Array(await crypto.subtle.wrapKey("raw", cryptoKeyCek, cryptoKey, "AES-KW"));
}
async function unwrap$2(alg$1, key, encryptedKey) {
	const cryptoKey = await getCryptoKey$2(key, alg$1, "unwrapKey");
	checkKeySize(cryptoKey, alg$1);
	const cryptoKeyCek = await crypto.subtle.unwrapKey("raw", encryptedKey, cryptoKey, "AES-KW", {
		hash: "SHA-256",
		name: "HMAC"
	}, true, ["sign"]);
	return new Uint8Array(await crypto.subtle.exportKey("raw", cryptoKeyCek));
}
async function digest(algorithm$1, data) {
	const subtleDigest = `SHA-${algorithm$1.slice(-3)}`;
	return new Uint8Array(await crypto.subtle.digest(subtleDigest, data));
}
function lengthAndInput(input) {
	return concat(uint32be(input.length), input);
}
async function concatKdf(Z, L, OtherInfo) {
	const dkLen = L >> 3;
	const hashLen = 32;
	const reps = Math.ceil(dkLen / hashLen);
	const dk = new Uint8Array(reps * hashLen);
	for (let i = 1; i <= reps; i++) {
		const hashInput = new Uint8Array(4 + Z.length + OtherInfo.length);
		hashInput.set(uint32be(i), 0);
		hashInput.set(Z, 4);
		hashInput.set(OtherInfo, 4 + Z.length);
		const hashResult = await digest("sha256", hashInput);
		dk.set(hashResult, (i - 1) * hashLen);
	}
	return dk.slice(0, dkLen);
}
async function deriveKey$1(publicKey, privateKey, algorithm$1, keyLength, apu = new Uint8Array(), apv = new Uint8Array()) {
	checkEncCryptoKey(publicKey, "ECDH");
	checkEncCryptoKey(privateKey, "ECDH", "deriveBits");
	const otherInfo = concat(lengthAndInput(encode$1(algorithm$1)), lengthAndInput(apu), lengthAndInput(apv), uint32be(keyLength), new Uint8Array());
	return concatKdf(new Uint8Array(await crypto.subtle.deriveBits({
		name: publicKey.algorithm.name,
		public: publicKey
	}, privateKey, getEcdhBitLength(publicKey))), keyLength, otherInfo);
}
function getEcdhBitLength(publicKey) {
	if (publicKey.algorithm.name === "X25519") return 256;
	return Math.ceil(parseInt(publicKey.algorithm.namedCurve.slice(-3), 10) / 8) << 3;
}
function allowed(key) {
	switch (key.algorithm.namedCurve) {
		case "P-256":
		case "P-384":
		case "P-521": return true;
		default: return key.algorithm.name === "X25519";
	}
}
function getCryptoKey$1(key, alg$1) {
	if (key instanceof Uint8Array) return crypto.subtle.importKey("raw", key, "PBKDF2", false, ["deriveBits"]);
	checkEncCryptoKey(key, alg$1, "deriveBits");
	return key;
}
var concatSalt = (alg$1, p2sInput) => concat(encode$1(alg$1), Uint8Array.of(0), p2sInput);
async function deriveKey(p2s, alg$1, p2c, key) {
	if (!(p2s instanceof Uint8Array) || p2s.length < 8) throw new JWEInvalid("PBES2 Salt Input must be 8 or more octets");
	const salt = concatSalt(alg$1, p2s);
	const keylen = parseInt(alg$1.slice(13, 16), 10);
	const subtleAlg = {
		hash: `SHA-${alg$1.slice(8, 11)}`,
		iterations: p2c,
		name: "PBKDF2",
		salt
	};
	const cryptoKey = await getCryptoKey$1(key, alg$1);
	return new Uint8Array(await crypto.subtle.deriveBits(subtleAlg, cryptoKey, keylen));
}
async function wrap$1(alg$1, key, cek, p2c = 2048, p2s = crypto.getRandomValues(new Uint8Array(16))) {
	const derived = await deriveKey(p2s, alg$1, p2c, key);
	return {
		encryptedKey: await wrap$2(alg$1.slice(-6), derived, cek),
		p2c,
		p2s: encode(p2s)
	};
}
async function unwrap$1(alg$1, key, encryptedKey, p2c, p2s) {
	const derived = await deriveKey(p2s, alg$1, p2c, key);
	return unwrap$2(alg$1.slice(-6), derived, encryptedKey);
}
function checkKeyLength(alg$1, key) {
	if (alg$1.startsWith("RS") || alg$1.startsWith("PS")) {
		const { modulusLength } = key.algorithm;
		if (typeof modulusLength !== "number" || modulusLength < 2048) throw new TypeError(`${alg$1} requires key modulusLength to be 2048 bits or larger`);
	}
}
var subtleAlgorithm$1 = (alg$1) => {
	switch (alg$1) {
		case "RSA-OAEP":
		case "RSA-OAEP-256":
		case "RSA-OAEP-384":
		case "RSA-OAEP-512": return "RSA-OAEP";
		default: throw new JOSENotSupported(`alg ${alg$1} is not supported either by JOSE or your javascript runtime`);
	}
};
async function encrypt$1(alg$1, key, cek) {
	checkEncCryptoKey(key, alg$1, "encrypt");
	checkKeyLength(alg$1, key);
	return new Uint8Array(await crypto.subtle.encrypt(subtleAlgorithm$1(alg$1), key, cek));
}
async function decrypt$1(alg$1, key, encryptedKey) {
	checkEncCryptoKey(key, alg$1, "decrypt");
	checkKeyLength(alg$1, key);
	return new Uint8Array(await crypto.subtle.decrypt(subtleAlgorithm$1(alg$1), key, encryptedKey));
}
function cekLength(alg$1) {
	switch (alg$1) {
		case "A128GCM": return 128;
		case "A192GCM": return 192;
		case "A256GCM":
		case "A128CBC-HS256": return 256;
		case "A192CBC-HS384": return 384;
		case "A256CBC-HS512": return 512;
		default: throw new JOSENotSupported(`Unsupported JWE Algorithm: ${alg$1}`);
	}
}
const generateCek = (alg$1) => crypto.getRandomValues(new Uint8Array(cekLength(alg$1) >> 3));
function subtleMapping(jwk) {
	let algorithm$1;
	let keyUsages;
	switch (jwk.kty) {
		case "AKP":
			switch (jwk.alg) {
				case "ML-DSA-44":
				case "ML-DSA-65":
				case "ML-DSA-87":
					algorithm$1 = { name: jwk.alg };
					keyUsages = jwk.priv ? ["sign"] : ["verify"];
					break;
				default: throw new JOSENotSupported("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
			}
			break;
		case "RSA":
			switch (jwk.alg) {
				case "PS256":
				case "PS384":
				case "PS512":
					algorithm$1 = {
						name: "RSA-PSS",
						hash: `SHA-${jwk.alg.slice(-3)}`
					};
					keyUsages = jwk.d ? ["sign"] : ["verify"];
					break;
				case "RS256":
				case "RS384":
				case "RS512":
					algorithm$1 = {
						name: "RSASSA-PKCS1-v1_5",
						hash: `SHA-${jwk.alg.slice(-3)}`
					};
					keyUsages = jwk.d ? ["sign"] : ["verify"];
					break;
				case "RSA-OAEP":
				case "RSA-OAEP-256":
				case "RSA-OAEP-384":
				case "RSA-OAEP-512":
					algorithm$1 = {
						name: "RSA-OAEP",
						hash: `SHA-${parseInt(jwk.alg.slice(-3), 10) || 1}`
					};
					keyUsages = jwk.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
					break;
				default: throw new JOSENotSupported("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
			}
			break;
		case "EC":
			switch (jwk.alg) {
				case "ES256":
					algorithm$1 = {
						name: "ECDSA",
						namedCurve: "P-256"
					};
					keyUsages = jwk.d ? ["sign"] : ["verify"];
					break;
				case "ES384":
					algorithm$1 = {
						name: "ECDSA",
						namedCurve: "P-384"
					};
					keyUsages = jwk.d ? ["sign"] : ["verify"];
					break;
				case "ES512":
					algorithm$1 = {
						name: "ECDSA",
						namedCurve: "P-521"
					};
					keyUsages = jwk.d ? ["sign"] : ["verify"];
					break;
				case "ECDH-ES":
				case "ECDH-ES+A128KW":
				case "ECDH-ES+A192KW":
				case "ECDH-ES+A256KW":
					algorithm$1 = {
						name: "ECDH",
						namedCurve: jwk.crv
					};
					keyUsages = jwk.d ? ["deriveBits"] : [];
					break;
				default: throw new JOSENotSupported("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
			}
			break;
		case "OKP":
			switch (jwk.alg) {
				case "Ed25519":
				case "EdDSA":
					algorithm$1 = { name: "Ed25519" };
					keyUsages = jwk.d ? ["sign"] : ["verify"];
					break;
				case "ECDH-ES":
				case "ECDH-ES+A128KW":
				case "ECDH-ES+A192KW":
				case "ECDH-ES+A256KW":
					algorithm$1 = { name: jwk.crv };
					keyUsages = jwk.d ? ["deriveBits"] : [];
					break;
				default: throw new JOSENotSupported("Invalid or unsupported JWK \"alg\" (Algorithm) Parameter value");
			}
			break;
		default: throw new JOSENotSupported("Invalid or unsupported JWK \"kty\" (Key Type) Parameter value");
	}
	return {
		algorithm: algorithm$1,
		keyUsages
	};
}
async function jwkToKey(jwk) {
	if (!jwk.alg) throw new TypeError("\"alg\" argument is required when \"jwk.alg\" is not present");
	const { algorithm: algorithm$1, keyUsages } = subtleMapping(jwk);
	const keyData = { ...jwk };
	if (keyData.kty !== "AKP") delete keyData.alg;
	delete keyData.use;
	return crypto.subtle.importKey("jwk", keyData, algorithm$1, jwk.ext ?? (jwk.d || jwk.priv ? false : true), jwk.key_ops ?? keyUsages);
}
async function importJWK(jwk, alg$1, options) {
	if (!isObject(jwk)) throw new TypeError("JWK must be an object");
	let ext;
	alg$1 ??= jwk.alg;
	ext ??= options?.extractable ?? jwk.ext;
	switch (jwk.kty) {
		case "oct":
			if (typeof jwk.k !== "string" || !jwk.k) throw new TypeError("missing \"k\" (Key Value) Parameter value");
			return decode(jwk.k);
		case "RSA":
			if ("oth" in jwk && jwk.oth !== void 0) throw new JOSENotSupported("RSA JWK \"oth\" (Other Primes Info) Parameter value is not supported");
			return jwkToKey({
				...jwk,
				alg: alg$1,
				ext
			});
		case "AKP":
			if (typeof jwk.alg !== "string" || !jwk.alg) throw new TypeError("missing \"alg\" (Algorithm) Parameter value");
			if (alg$1 !== void 0 && alg$1 !== jwk.alg) throw new TypeError("JWK alg and alg option value mismatch");
			return jwkToKey({
				...jwk,
				ext
			});
		case "EC":
		case "OKP": return jwkToKey({
			...jwk,
			alg: alg$1,
			ext
		});
		default: throw new JOSENotSupported("Unsupported \"kty\" (Key Type) Parameter value");
	}
}
async function cbcEncrypt(enc$1, plaintext, cek, iv, aad) {
	if (!(cek instanceof Uint8Array)) throw new TypeError(invalidKeyInput(cek, "Uint8Array"));
	const keySize = parseInt(enc$1.slice(1, 4), 10);
	const encKey = await crypto.subtle.importKey("raw", cek.subarray(keySize >> 3), "AES-CBC", false, ["encrypt"]);
	const macKey = await crypto.subtle.importKey("raw", cek.subarray(0, keySize >> 3), {
		hash: `SHA-${keySize << 1}`,
		name: "HMAC"
	}, false, ["sign"]);
	const ciphertext = new Uint8Array(await crypto.subtle.encrypt({
		iv,
		name: "AES-CBC"
	}, encKey, plaintext));
	const macData = concat(aad, iv, ciphertext, uint64be(aad.length << 3));
	return {
		ciphertext,
		tag: new Uint8Array((await crypto.subtle.sign("HMAC", macKey, macData)).slice(0, keySize >> 3)),
		iv
	};
}
async function gcmEncrypt(enc$1, plaintext, cek, iv, aad) {
	let encKey;
	if (cek instanceof Uint8Array) encKey = await crypto.subtle.importKey("raw", cek, "AES-GCM", false, ["encrypt"]);
	else {
		checkEncCryptoKey(cek, enc$1, "encrypt");
		encKey = cek;
	}
	const encrypted = new Uint8Array(await crypto.subtle.encrypt({
		additionalData: aad,
		iv,
		name: "AES-GCM",
		tagLength: 128
	}, encKey, plaintext));
	const tag$1 = encrypted.slice(-16);
	return {
		ciphertext: encrypted.slice(0, -16),
		tag: tag$1,
		iv
	};
}
async function encrypt(enc$1, plaintext, cek, iv, aad) {
	if (!isCryptoKey(cek) && !(cek instanceof Uint8Array)) throw new TypeError(invalidKeyInput(cek, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
	if (iv) checkIvLength(enc$1, iv);
	else iv = generateIv(enc$1);
	switch (enc$1) {
		case "A128CBC-HS256":
		case "A192CBC-HS384":
		case "A256CBC-HS512":
			if (cek instanceof Uint8Array) checkCekLength(cek, parseInt(enc$1.slice(-3), 10));
			return cbcEncrypt(enc$1, plaintext, cek, iv, aad);
		case "A128GCM":
		case "A192GCM":
		case "A256GCM":
			if (cek instanceof Uint8Array) checkCekLength(cek, parseInt(enc$1.slice(1, 4), 10));
			return gcmEncrypt(enc$1, plaintext, cek, iv, aad);
		default: throw new JOSENotSupported("Unsupported JWE Content Encryption Algorithm");
	}
}
async function wrap(alg$1, key, cek, iv) {
	const wrapped = await encrypt(alg$1.slice(0, 7), cek, key, iv, new Uint8Array());
	return {
		encryptedKey: wrapped.ciphertext,
		iv: encode(wrapped.iv),
		tag: encode(wrapped.tag)
	};
}
async function unwrap(alg$1, key, encryptedKey, iv, tag$1) {
	return decrypt(alg$1.slice(0, 7), key, encryptedKey, iv, tag$1, new Uint8Array());
}
async function decryptKeyManagement(alg$1, key, encryptedKey, joseHeader, options) {
	switch (alg$1) {
		case "dir":
			if (encryptedKey !== void 0) throw new JWEInvalid("Encountered unexpected JWE Encrypted Key");
			return key;
		case "ECDH-ES": if (encryptedKey !== void 0) throw new JWEInvalid("Encountered unexpected JWE Encrypted Key");
		case "ECDH-ES+A128KW":
		case "ECDH-ES+A192KW":
		case "ECDH-ES+A256KW": {
			if (!isObject(joseHeader.epk)) throw new JWEInvalid(`JOSE Header "epk" (Ephemeral Public Key) missing or invalid`);
			assertCryptoKey(key);
			if (!allowed(key)) throw new JOSENotSupported("ECDH with the provided key is not allowed or not supported by your javascript runtime");
			const epk = await importJWK(joseHeader.epk, alg$1);
			assertCryptoKey(epk);
			let partyUInfo;
			let partyVInfo;
			if (joseHeader.apu !== void 0) {
				if (typeof joseHeader.apu !== "string") throw new JWEInvalid(`JOSE Header "apu" (Agreement PartyUInfo) invalid`);
				try {
					partyUInfo = decode(joseHeader.apu);
				} catch {
					throw new JWEInvalid("Failed to base64url decode the apu");
				}
			}
			if (joseHeader.apv !== void 0) {
				if (typeof joseHeader.apv !== "string") throw new JWEInvalid(`JOSE Header "apv" (Agreement PartyVInfo) invalid`);
				try {
					partyVInfo = decode(joseHeader.apv);
				} catch {
					throw new JWEInvalid("Failed to base64url decode the apv");
				}
			}
			const sharedSecret = await deriveKey$1(epk, key, alg$1 === "ECDH-ES" ? joseHeader.enc : alg$1, alg$1 === "ECDH-ES" ? cekLength(joseHeader.enc) : parseInt(alg$1.slice(-5, -2), 10), partyUInfo, partyVInfo);
			if (alg$1 === "ECDH-ES") return sharedSecret;
			if (encryptedKey === void 0) throw new JWEInvalid("JWE Encrypted Key missing");
			return unwrap$2(alg$1.slice(-6), sharedSecret, encryptedKey);
		}
		case "RSA-OAEP":
		case "RSA-OAEP-256":
		case "RSA-OAEP-384":
		case "RSA-OAEP-512":
			if (encryptedKey === void 0) throw new JWEInvalid("JWE Encrypted Key missing");
			assertCryptoKey(key);
			return decrypt$1(alg$1, key, encryptedKey);
		case "PBES2-HS256+A128KW":
		case "PBES2-HS384+A192KW":
		case "PBES2-HS512+A256KW": {
			if (encryptedKey === void 0) throw new JWEInvalid("JWE Encrypted Key missing");
			if (typeof joseHeader.p2c !== "number") throw new JWEInvalid(`JOSE Header "p2c" (PBES2 Count) missing or invalid`);
			const p2cLimit = options?.maxPBES2Count || 1e4;
			if (joseHeader.p2c > p2cLimit) throw new JWEInvalid(`JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds`);
			if (typeof joseHeader.p2s !== "string") throw new JWEInvalid(`JOSE Header "p2s" (PBES2 Salt) missing or invalid`);
			let p2s;
			try {
				p2s = decode(joseHeader.p2s);
			} catch {
				throw new JWEInvalid("Failed to base64url decode the p2s");
			}
			return unwrap$1(alg$1, key, encryptedKey, joseHeader.p2c, p2s);
		}
		case "A128KW":
		case "A192KW":
		case "A256KW":
			if (encryptedKey === void 0) throw new JWEInvalid("JWE Encrypted Key missing");
			return unwrap$2(alg$1, key, encryptedKey);
		case "A128GCMKW":
		case "A192GCMKW":
		case "A256GCMKW": {
			if (encryptedKey === void 0) throw new JWEInvalid("JWE Encrypted Key missing");
			if (typeof joseHeader.iv !== "string") throw new JWEInvalid(`JOSE Header "iv" (Initialization Vector) missing or invalid`);
			if (typeof joseHeader.tag !== "string") throw new JWEInvalid(`JOSE Header "tag" (Authentication Tag) missing or invalid`);
			let iv;
			try {
				iv = decode(joseHeader.iv);
			} catch {
				throw new JWEInvalid("Failed to base64url decode the iv");
			}
			let tag$1;
			try {
				tag$1 = decode(joseHeader.tag);
			} catch {
				throw new JWEInvalid("Failed to base64url decode the tag");
			}
			return unwrap(alg$1, key, encryptedKey, iv, tag$1);
		}
		default: throw new JOSENotSupported("Invalid or unsupported \"alg\" (JWE Algorithm) header value");
	}
}
function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
	if (joseHeader.crit !== void 0 && protectedHeader?.crit === void 0) throw new Err("\"crit\" (Critical) Header Parameter MUST be integrity protected");
	if (!protectedHeader || protectedHeader.crit === void 0) return /* @__PURE__ */ new Set();
	if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input) => typeof input !== "string" || input.length === 0)) throw new Err("\"crit\" (Critical) Header Parameter MUST be an array of non-empty strings when present");
	let recognized;
	if (recognizedOption !== void 0) recognized = new Map([...Object.entries(recognizedOption), ...recognizedDefault.entries()]);
	else recognized = recognizedDefault;
	for (const parameter of protectedHeader.crit) {
		if (!recognized.has(parameter)) throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
		if (joseHeader[parameter] === void 0) throw new Err(`Extension Header Parameter "${parameter}" is missing`);
		if (recognized.get(parameter) && protectedHeader[parameter] === void 0) throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
	}
	return new Set(protectedHeader.crit);
}
function validateAlgorithms(option, algorithms) {
	if (algorithms !== void 0 && (!Array.isArray(algorithms) || algorithms.some((s) => typeof s !== "string"))) throw new TypeError(`"${option}" option must be an array of strings`);
	if (!algorithms) return;
	return new Set(algorithms);
}
const isJWK = (key) => isObject(key) && typeof key.kty === "string";
const isPrivateJWK = (key) => key.kty !== "oct" && (key.kty === "AKP" && typeof key.priv === "string" || typeof key.d === "string");
const isPublicJWK = (key) => key.kty !== "oct" && key.d === void 0 && key.priv === void 0;
const isSecretJWK = (key) => key.kty === "oct" && typeof key.k === "string";
var cache$1;
var handleJWK = async (key, jwk, alg$1, freeze = false) => {
	cache$1 ||= /* @__PURE__ */ new WeakMap();
	let cached = cache$1.get(key);
	if (cached?.[alg$1]) return cached[alg$1];
	const cryptoKey = await jwkToKey({
		...jwk,
		alg: alg$1
	});
	if (freeze) Object.freeze(key);
	if (!cached) cache$1.set(key, { [alg$1]: cryptoKey });
	else cached[alg$1] = cryptoKey;
	return cryptoKey;
};
var handleKeyObject = (keyObject, alg$1) => {
	cache$1 ||= /* @__PURE__ */ new WeakMap();
	let cached = cache$1.get(keyObject);
	if (cached?.[alg$1]) return cached[alg$1];
	const isPublic = keyObject.type === "public";
	const extractable = isPublic ? true : false;
	let cryptoKey;
	if (keyObject.asymmetricKeyType === "x25519") {
		switch (alg$1) {
			case "ECDH-ES":
			case "ECDH-ES+A128KW":
			case "ECDH-ES+A192KW":
			case "ECDH-ES+A256KW": break;
			default: throw new TypeError("given KeyObject instance cannot be used for this algorithm");
		}
		cryptoKey = keyObject.toCryptoKey(keyObject.asymmetricKeyType, extractable, isPublic ? [] : ["deriveBits"]);
	}
	if (keyObject.asymmetricKeyType === "ed25519") {
		if (alg$1 !== "EdDSA" && alg$1 !== "Ed25519") throw new TypeError("given KeyObject instance cannot be used for this algorithm");
		cryptoKey = keyObject.toCryptoKey(keyObject.asymmetricKeyType, extractable, [isPublic ? "verify" : "sign"]);
	}
	switch (keyObject.asymmetricKeyType) {
		case "ml-dsa-44":
		case "ml-dsa-65":
		case "ml-dsa-87":
			if (alg$1 !== keyObject.asymmetricKeyType.toUpperCase()) throw new TypeError("given KeyObject instance cannot be used for this algorithm");
			cryptoKey = keyObject.toCryptoKey(keyObject.asymmetricKeyType, extractable, [isPublic ? "verify" : "sign"]);
	}
	if (keyObject.asymmetricKeyType === "rsa") {
		let hash$1;
		switch (alg$1) {
			case "RSA-OAEP":
				hash$1 = "SHA-1";
				break;
			case "RS256":
			case "PS256":
			case "RSA-OAEP-256":
				hash$1 = "SHA-256";
				break;
			case "RS384":
			case "PS384":
			case "RSA-OAEP-384":
				hash$1 = "SHA-384";
				break;
			case "RS512":
			case "PS512":
			case "RSA-OAEP-512":
				hash$1 = "SHA-512";
				break;
			default: throw new TypeError("given KeyObject instance cannot be used for this algorithm");
		}
		if (alg$1.startsWith("RSA-OAEP")) return keyObject.toCryptoKey({
			name: "RSA-OAEP",
			hash: hash$1
		}, extractable, isPublic ? ["encrypt"] : ["decrypt"]);
		cryptoKey = keyObject.toCryptoKey({
			name: alg$1.startsWith("PS") ? "RSA-PSS" : "RSASSA-PKCS1-v1_5",
			hash: hash$1
		}, extractable, [isPublic ? "verify" : "sign"]);
	}
	if (keyObject.asymmetricKeyType === "ec") {
		const namedCurve = new Map([
			["prime256v1", "P-256"],
			["secp384r1", "P-384"],
			["secp521r1", "P-521"]
		]).get(keyObject.asymmetricKeyDetails?.namedCurve);
		if (!namedCurve) throw new TypeError("given KeyObject instance cannot be used for this algorithm");
		if (alg$1 === "ES256" && namedCurve === "P-256") cryptoKey = keyObject.toCryptoKey({
			name: "ECDSA",
			namedCurve
		}, extractable, [isPublic ? "verify" : "sign"]);
		if (alg$1 === "ES384" && namedCurve === "P-384") cryptoKey = keyObject.toCryptoKey({
			name: "ECDSA",
			namedCurve
		}, extractable, [isPublic ? "verify" : "sign"]);
		if (alg$1 === "ES512" && namedCurve === "P-521") cryptoKey = keyObject.toCryptoKey({
			name: "ECDSA",
			namedCurve
		}, extractable, [isPublic ? "verify" : "sign"]);
		if (alg$1.startsWith("ECDH-ES")) cryptoKey = keyObject.toCryptoKey({
			name: "ECDH",
			namedCurve
		}, extractable, isPublic ? [] : ["deriveBits"]);
	}
	if (!cryptoKey) throw new TypeError("given KeyObject instance cannot be used for this algorithm");
	if (!cached) cache$1.set(keyObject, { [alg$1]: cryptoKey });
	else cached[alg$1] = cryptoKey;
	return cryptoKey;
};
async function normalizeKey(key, alg$1) {
	if (key instanceof Uint8Array) return key;
	if (isCryptoKey(key)) return key;
	if (isKeyObject(key)) {
		if (key.type === "secret") return key.export();
		if ("toCryptoKey" in key && typeof key.toCryptoKey === "function") try {
			return handleKeyObject(key, alg$1);
		} catch (err) {
			if (err instanceof TypeError) throw err;
		}
		return handleJWK(key, key.export({ format: "jwk" }), alg$1);
	}
	if (isJWK(key)) {
		if (key.k) return decode(key.k);
		return handleJWK(key, key, alg$1, true);
	}
	throw new Error("unreachable");
}
var tag = (key) => key?.[Symbol.toStringTag];
var jwkMatchesOp = (alg$1, key, usage) => {
	if (key.use !== void 0) {
		let expected;
		switch (usage) {
			case "sign":
			case "verify":
				expected = "sig";
				break;
			case "encrypt":
			case "decrypt":
				expected = "enc";
				break;
		}
		if (key.use !== expected) throw new TypeError(`Invalid key for this operation, its "use" must be "${expected}" when present`);
	}
	if (key.alg !== void 0 && key.alg !== alg$1) throw new TypeError(`Invalid key for this operation, its "alg" must be "${alg$1}" when present`);
	if (Array.isArray(key.key_ops)) {
		let expectedKeyOp;
		switch (true) {
			case usage === "sign" || usage === "verify":
			case alg$1 === "dir":
			case alg$1.includes("CBC-HS"):
				expectedKeyOp = usage;
				break;
			case alg$1.startsWith("PBES2"):
				expectedKeyOp = "deriveBits";
				break;
			case /^A\d{3}(?:GCM)?(?:KW)?$/.test(alg$1):
				if (!alg$1.includes("GCM") && alg$1.endsWith("KW")) expectedKeyOp = usage === "encrypt" ? "wrapKey" : "unwrapKey";
				else expectedKeyOp = usage;
				break;
			case usage === "encrypt" && alg$1.startsWith("RSA"):
				expectedKeyOp = "wrapKey";
				break;
			case usage === "decrypt":
				expectedKeyOp = alg$1.startsWith("RSA") ? "unwrapKey" : "deriveBits";
				break;
		}
		if (expectedKeyOp && key.key_ops?.includes?.(expectedKeyOp) === false) throw new TypeError(`Invalid key for this operation, its "key_ops" must include "${expectedKeyOp}" when present`);
	}
	return true;
};
var symmetricTypeCheck = (alg$1, key, usage) => {
	if (key instanceof Uint8Array) return;
	if (isJWK(key)) {
		if (isSecretJWK(key) && jwkMatchesOp(alg$1, key, usage)) return;
		throw new TypeError(`JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present`);
	}
	if (!isKeyLike(key)) throw new TypeError(withAlg(alg$1, key, "CryptoKey", "KeyObject", "JSON Web Key", "Uint8Array"));
	if (key.type !== "secret") throw new TypeError(`${tag(key)} instances for symmetric algorithms must be of type "secret"`);
};
var asymmetricTypeCheck = (alg$1, key, usage) => {
	if (isJWK(key)) switch (usage) {
		case "decrypt":
		case "sign":
			if (isPrivateJWK(key) && jwkMatchesOp(alg$1, key, usage)) return;
			throw new TypeError(`JSON Web Key for this operation must be a private JWK`);
		case "encrypt":
		case "verify":
			if (isPublicJWK(key) && jwkMatchesOp(alg$1, key, usage)) return;
			throw new TypeError(`JSON Web Key for this operation must be a public JWK`);
	}
	if (!isKeyLike(key)) throw new TypeError(withAlg(alg$1, key, "CryptoKey", "KeyObject", "JSON Web Key"));
	if (key.type === "secret") throw new TypeError(`${tag(key)} instances for asymmetric algorithms must not be of type "secret"`);
	if (key.type === "public") switch (usage) {
		case "sign": throw new TypeError(`${tag(key)} instances for asymmetric algorithm signing must be of type "private"`);
		case "decrypt": throw new TypeError(`${tag(key)} instances for asymmetric algorithm decryption must be of type "private"`);
	}
	if (key.type === "private") switch (usage) {
		case "verify": throw new TypeError(`${tag(key)} instances for asymmetric algorithm verifying must be of type "public"`);
		case "encrypt": throw new TypeError(`${tag(key)} instances for asymmetric algorithm encryption must be of type "public"`);
	}
};
function checkKeyType(alg$1, key, usage) {
	switch (alg$1.substring(0, 2)) {
		case "A1":
		case "A2":
		case "di":
		case "HS":
		case "PB":
			symmetricTypeCheck(alg$1, key, usage);
			break;
		default: asymmetricTypeCheck(alg$1, key, usage);
	}
}
async function flattenedDecrypt(jwe, key, options) {
	if (!isObject(jwe)) throw new JWEInvalid("Flattened JWE must be an object");
	if (jwe.protected === void 0 && jwe.header === void 0 && jwe.unprotected === void 0) throw new JWEInvalid("JOSE Header missing");
	if (jwe.iv !== void 0 && typeof jwe.iv !== "string") throw new JWEInvalid("JWE Initialization Vector incorrect type");
	if (typeof jwe.ciphertext !== "string") throw new JWEInvalid("JWE Ciphertext missing or incorrect type");
	if (jwe.tag !== void 0 && typeof jwe.tag !== "string") throw new JWEInvalid("JWE Authentication Tag incorrect type");
	if (jwe.protected !== void 0 && typeof jwe.protected !== "string") throw new JWEInvalid("JWE Protected Header incorrect type");
	if (jwe.encrypted_key !== void 0 && typeof jwe.encrypted_key !== "string") throw new JWEInvalid("JWE Encrypted Key incorrect type");
	if (jwe.aad !== void 0 && typeof jwe.aad !== "string") throw new JWEInvalid("JWE AAD incorrect type");
	if (jwe.header !== void 0 && !isObject(jwe.header)) throw new JWEInvalid("JWE Shared Unprotected Header incorrect type");
	if (jwe.unprotected !== void 0 && !isObject(jwe.unprotected)) throw new JWEInvalid("JWE Per-Recipient Unprotected Header incorrect type");
	let parsedProt;
	if (jwe.protected) try {
		const protectedHeader$1 = decode(jwe.protected);
		parsedProt = JSON.parse(decoder.decode(protectedHeader$1));
	} catch {
		throw new JWEInvalid("JWE Protected Header is invalid");
	}
	if (!isDisjoint(parsedProt, jwe.header, jwe.unprotected)) throw new JWEInvalid("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
	const joseHeader = {
		...parsedProt,
		...jwe.header,
		...jwe.unprotected
	};
	validateCrit(JWEInvalid, /* @__PURE__ */ new Map(), options?.crit, parsedProt, joseHeader);
	if (joseHeader.zip !== void 0) throw new JOSENotSupported("JWE \"zip\" (Compression Algorithm) Header Parameter is not supported.");
	const { alg: alg$1, enc: enc$1 } = joseHeader;
	if (typeof alg$1 !== "string" || !alg$1) throw new JWEInvalid("missing JWE Algorithm (alg) in JWE Header");
	if (typeof enc$1 !== "string" || !enc$1) throw new JWEInvalid("missing JWE Encryption Algorithm (enc) in JWE Header");
	const keyManagementAlgorithms = options && validateAlgorithms("keyManagementAlgorithms", options.keyManagementAlgorithms);
	const contentEncryptionAlgorithms = options && validateAlgorithms("contentEncryptionAlgorithms", options.contentEncryptionAlgorithms);
	if (keyManagementAlgorithms && !keyManagementAlgorithms.has(alg$1) || !keyManagementAlgorithms && alg$1.startsWith("PBES2")) throw new JOSEAlgNotAllowed("\"alg\" (Algorithm) Header Parameter value not allowed");
	if (contentEncryptionAlgorithms && !contentEncryptionAlgorithms.has(enc$1)) throw new JOSEAlgNotAllowed("\"enc\" (Encryption Algorithm) Header Parameter value not allowed");
	let encryptedKey;
	if (jwe.encrypted_key !== void 0) try {
		encryptedKey = decode(jwe.encrypted_key);
	} catch {
		throw new JWEInvalid("Failed to base64url decode the encrypted_key");
	}
	let resolvedKey = false;
	if (typeof key === "function") {
		key = await key(parsedProt, jwe);
		resolvedKey = true;
	}
	checkKeyType(alg$1 === "dir" ? enc$1 : alg$1, key, "decrypt");
	const k = await normalizeKey(key, alg$1);
	let cek;
	try {
		cek = await decryptKeyManagement(alg$1, k, encryptedKey, joseHeader, options);
	} catch (err) {
		if (err instanceof TypeError || err instanceof JWEInvalid || err instanceof JOSENotSupported) throw err;
		cek = generateCek(enc$1);
	}
	let iv;
	let tag$1;
	if (jwe.iv !== void 0) try {
		iv = decode(jwe.iv);
	} catch {
		throw new JWEInvalid("Failed to base64url decode the iv");
	}
	if (jwe.tag !== void 0) try {
		tag$1 = decode(jwe.tag);
	} catch {
		throw new JWEInvalid("Failed to base64url decode the tag");
	}
	const protectedHeader = jwe.protected !== void 0 ? encode$1(jwe.protected) : new Uint8Array();
	let additionalData;
	if (jwe.aad !== void 0) additionalData = concat(protectedHeader, encode$1("."), encode$1(jwe.aad));
	else additionalData = protectedHeader;
	let ciphertext;
	try {
		ciphertext = decode(jwe.ciphertext);
	} catch {
		throw new JWEInvalid("Failed to base64url decode the ciphertext");
	}
	const result = { plaintext: await decrypt(enc$1, cek, ciphertext, iv, tag$1, additionalData) };
	if (jwe.protected !== void 0) result.protectedHeader = parsedProt;
	if (jwe.aad !== void 0) try {
		result.additionalAuthenticatedData = decode(jwe.aad);
	} catch {
		throw new JWEInvalid("Failed to base64url decode the aad");
	}
	if (jwe.unprotected !== void 0) result.sharedUnprotectedHeader = jwe.unprotected;
	if (jwe.header !== void 0) result.unprotectedHeader = jwe.header;
	if (resolvedKey) return {
		...result,
		key: k
	};
	return result;
}
async function compactDecrypt(jwe, key, options) {
	if (jwe instanceof Uint8Array) jwe = decoder.decode(jwe);
	if (typeof jwe !== "string") throw new JWEInvalid("Compact JWE must be a string or Uint8Array");
	const { 0: protectedHeader, 1: encryptedKey, 2: iv, 3: ciphertext, 4: tag$1, length } = jwe.split(".");
	if (length !== 5) throw new JWEInvalid("Invalid Compact JWE");
	const decrypted = await flattenedDecrypt({
		ciphertext,
		iv: iv || void 0,
		protected: protectedHeader,
		tag: tag$1 || void 0,
		encrypted_key: encryptedKey || void 0
	}, key, options);
	const result = {
		plaintext: decrypted.plaintext,
		protectedHeader: decrypted.protectedHeader
	};
	if (typeof key === "function") return {
		...result,
		key: decrypted.key
	};
	return result;
}
const unprotected = Symbol();
async function keyToJWK(key) {
	if (isKeyObject(key)) if (key.type === "secret") key = key.export();
	else return key.export({ format: "jwk" });
	if (key instanceof Uint8Array) return {
		kty: "oct",
		k: encode(key)
	};
	if (!isCryptoKey(key)) throw new TypeError(invalidKeyInput(key, "CryptoKey", "KeyObject", "Uint8Array"));
	if (!key.extractable) throw new TypeError("non-extractable CryptoKey cannot be exported as a JWK");
	const { ext, key_ops, alg: alg$1, use: use$1, ...jwk } = await crypto.subtle.exportKey("jwk", key);
	if (jwk.kty === "AKP") jwk.alg = alg$1;
	return jwk;
}
async function exportJWK(key) {
	return keyToJWK(key);
}
async function encryptKeyManagement(alg$1, enc$1, key, providedCek, providedParameters = {}) {
	let encryptedKey;
	let parameters;
	let cek;
	switch (alg$1) {
		case "dir":
			cek = key;
			break;
		case "ECDH-ES":
		case "ECDH-ES+A128KW":
		case "ECDH-ES+A192KW":
		case "ECDH-ES+A256KW": {
			assertCryptoKey(key);
			if (!allowed(key)) throw new JOSENotSupported("ECDH with the provided key is not allowed or not supported by your javascript runtime");
			const { apu, apv } = providedParameters;
			let ephemeralKey;
			if (providedParameters.epk) ephemeralKey = await normalizeKey(providedParameters.epk, alg$1);
			else ephemeralKey = (await crypto.subtle.generateKey(key.algorithm, true, ["deriveBits"])).privateKey;
			const { x, y, crv, kty } = await exportJWK(ephemeralKey);
			const sharedSecret = await deriveKey$1(key, ephemeralKey, alg$1 === "ECDH-ES" ? enc$1 : alg$1, alg$1 === "ECDH-ES" ? cekLength(enc$1) : parseInt(alg$1.slice(-5, -2), 10), apu, apv);
			parameters = { epk: {
				x,
				crv,
				kty
			} };
			if (kty === "EC") parameters.epk.y = y;
			if (apu) parameters.apu = encode(apu);
			if (apv) parameters.apv = encode(apv);
			if (alg$1 === "ECDH-ES") {
				cek = sharedSecret;
				break;
			}
			cek = providedCek || generateCek(enc$1);
			encryptedKey = await wrap$2(alg$1.slice(-6), sharedSecret, cek);
			break;
		}
		case "RSA-OAEP":
		case "RSA-OAEP-256":
		case "RSA-OAEP-384":
		case "RSA-OAEP-512":
			cek = providedCek || generateCek(enc$1);
			assertCryptoKey(key);
			encryptedKey = await encrypt$1(alg$1, key, cek);
			break;
		case "PBES2-HS256+A128KW":
		case "PBES2-HS384+A192KW":
		case "PBES2-HS512+A256KW": {
			cek = providedCek || generateCek(enc$1);
			const { p2c, p2s } = providedParameters;
			({encryptedKey, ...parameters} = await wrap$1(alg$1, key, cek, p2c, p2s));
			break;
		}
		case "A128KW":
		case "A192KW":
		case "A256KW":
			cek = providedCek || generateCek(enc$1);
			encryptedKey = await wrap$2(alg$1, key, cek);
			break;
		case "A128GCMKW":
		case "A192GCMKW":
		case "A256GCMKW": {
			cek = providedCek || generateCek(enc$1);
			const { iv } = providedParameters;
			({encryptedKey, ...parameters} = await wrap(alg$1, key, cek, iv));
			break;
		}
		default: throw new JOSENotSupported("Invalid or unsupported \"alg\" (JWE Algorithm) header value");
	}
	return {
		cek,
		encryptedKey,
		parameters
	};
}
var FlattenedEncrypt = class {
	#plaintext;
	#protectedHeader;
	#sharedUnprotectedHeader;
	#unprotectedHeader;
	#aad;
	#cek;
	#iv;
	#keyManagementParameters;
	constructor(plaintext) {
		if (!(plaintext instanceof Uint8Array)) throw new TypeError("plaintext must be an instance of Uint8Array");
		this.#plaintext = plaintext;
	}
	setKeyManagementParameters(parameters) {
		if (this.#keyManagementParameters) throw new TypeError("setKeyManagementParameters can only be called once");
		this.#keyManagementParameters = parameters;
		return this;
	}
	setProtectedHeader(protectedHeader) {
		if (this.#protectedHeader) throw new TypeError("setProtectedHeader can only be called once");
		this.#protectedHeader = protectedHeader;
		return this;
	}
	setSharedUnprotectedHeader(sharedUnprotectedHeader) {
		if (this.#sharedUnprotectedHeader) throw new TypeError("setSharedUnprotectedHeader can only be called once");
		this.#sharedUnprotectedHeader = sharedUnprotectedHeader;
		return this;
	}
	setUnprotectedHeader(unprotectedHeader) {
		if (this.#unprotectedHeader) throw new TypeError("setUnprotectedHeader can only be called once");
		this.#unprotectedHeader = unprotectedHeader;
		return this;
	}
	setAdditionalAuthenticatedData(aad) {
		this.#aad = aad;
		return this;
	}
	setContentEncryptionKey(cek) {
		if (this.#cek) throw new TypeError("setContentEncryptionKey can only be called once");
		this.#cek = cek;
		return this;
	}
	setInitializationVector(iv) {
		if (this.#iv) throw new TypeError("setInitializationVector can only be called once");
		this.#iv = iv;
		return this;
	}
	async encrypt(key, options) {
		if (!this.#protectedHeader && !this.#unprotectedHeader && !this.#sharedUnprotectedHeader) throw new JWEInvalid("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
		if (!isDisjoint(this.#protectedHeader, this.#unprotectedHeader, this.#sharedUnprotectedHeader)) throw new JWEInvalid("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
		const joseHeader = {
			...this.#protectedHeader,
			...this.#unprotectedHeader,
			...this.#sharedUnprotectedHeader
		};
		validateCrit(JWEInvalid, /* @__PURE__ */ new Map(), options?.crit, this.#protectedHeader, joseHeader);
		if (joseHeader.zip !== void 0) throw new JOSENotSupported("JWE \"zip\" (Compression Algorithm) Header Parameter is not supported.");
		const { alg: alg$1, enc: enc$1 } = joseHeader;
		if (typeof alg$1 !== "string" || !alg$1) throw new JWEInvalid("JWE \"alg\" (Algorithm) Header Parameter missing or invalid");
		if (typeof enc$1 !== "string" || !enc$1) throw new JWEInvalid("JWE \"enc\" (Encryption Algorithm) Header Parameter missing or invalid");
		let encryptedKey;
		if (this.#cek && (alg$1 === "dir" || alg$1 === "ECDH-ES")) throw new TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${alg$1}`);
		checkKeyType(alg$1 === "dir" ? enc$1 : alg$1, key, "encrypt");
		let cek;
		{
			let parameters;
			const k = await normalizeKey(key, alg$1);
			({cek, encryptedKey, parameters} = await encryptKeyManagement(alg$1, enc$1, k, this.#cek, this.#keyManagementParameters));
			if (parameters) if (options && unprotected in options) if (!this.#unprotectedHeader) this.setUnprotectedHeader(parameters);
			else this.#unprotectedHeader = {
				...this.#unprotectedHeader,
				...parameters
			};
			else if (!this.#protectedHeader) this.setProtectedHeader(parameters);
			else this.#protectedHeader = {
				...this.#protectedHeader,
				...parameters
			};
		}
		let additionalData;
		let protectedHeaderS;
		let protectedHeaderB;
		let aadMember;
		if (this.#protectedHeader) {
			protectedHeaderS = encode(JSON.stringify(this.#protectedHeader));
			protectedHeaderB = encode$1(protectedHeaderS);
		} else {
			protectedHeaderS = "";
			protectedHeaderB = new Uint8Array();
		}
		if (this.#aad) {
			aadMember = encode(this.#aad);
			const aadMemberBytes = encode$1(aadMember);
			additionalData = concat(protectedHeaderB, encode$1("."), aadMemberBytes);
		} else additionalData = protectedHeaderB;
		const { ciphertext, tag: tag$1, iv } = await encrypt(enc$1, this.#plaintext, cek, this.#iv, additionalData);
		const jwe = { ciphertext: encode(ciphertext) };
		if (iv) jwe.iv = encode(iv);
		if (tag$1) jwe.tag = encode(tag$1);
		if (encryptedKey) jwe.encrypted_key = encode(encryptedKey);
		if (aadMember) jwe.aad = aadMember;
		if (this.#protectedHeader) jwe.protected = protectedHeaderS;
		if (this.#sharedUnprotectedHeader) jwe.unprotected = this.#sharedUnprotectedHeader;
		if (this.#unprotectedHeader) jwe.header = this.#unprotectedHeader;
		return jwe;
	}
};
function subtleAlgorithm(alg$1, algorithm$1) {
	const hash$1 = `SHA-${alg$1.slice(-3)}`;
	switch (alg$1) {
		case "HS256":
		case "HS384":
		case "HS512": return {
			hash: hash$1,
			name: "HMAC"
		};
		case "PS256":
		case "PS384":
		case "PS512": return {
			hash: hash$1,
			name: "RSA-PSS",
			saltLength: parseInt(alg$1.slice(-3), 10) >> 3
		};
		case "RS256":
		case "RS384":
		case "RS512": return {
			hash: hash$1,
			name: "RSASSA-PKCS1-v1_5"
		};
		case "ES256":
		case "ES384":
		case "ES512": return {
			hash: hash$1,
			name: "ECDSA",
			namedCurve: algorithm$1.namedCurve
		};
		case "Ed25519":
		case "EdDSA": return { name: "Ed25519" };
		case "ML-DSA-44":
		case "ML-DSA-65":
		case "ML-DSA-87": return { name: alg$1 };
		default: throw new JOSENotSupported(`alg ${alg$1} is not supported either by JOSE or your javascript runtime`);
	}
}
async function getSigKey(alg$1, key, usage) {
	if (key instanceof Uint8Array) {
		if (!alg$1.startsWith("HS")) throw new TypeError(invalidKeyInput(key, "CryptoKey", "KeyObject", "JSON Web Key"));
		return crypto.subtle.importKey("raw", key, {
			hash: `SHA-${alg$1.slice(-3)}`,
			name: "HMAC"
		}, false, [usage]);
	}
	checkSigCryptoKey(key, alg$1, usage);
	return key;
}
async function verify(alg$1, key, signature, data) {
	const cryptoKey = await getSigKey(alg$1, key, "verify");
	checkKeyLength(alg$1, cryptoKey);
	const algorithm$1 = subtleAlgorithm(alg$1, cryptoKey.algorithm);
	try {
		return await crypto.subtle.verify(algorithm$1, cryptoKey, signature, data);
	} catch {
		return false;
	}
}
async function flattenedVerify(jws, key, options) {
	if (!isObject(jws)) throw new JWSInvalid("Flattened JWS must be an object");
	if (jws.protected === void 0 && jws.header === void 0) throw new JWSInvalid("Flattened JWS must have either of the \"protected\" or \"header\" members");
	if (jws.protected !== void 0 && typeof jws.protected !== "string") throw new JWSInvalid("JWS Protected Header incorrect type");
	if (jws.payload === void 0) throw new JWSInvalid("JWS Payload missing");
	if (typeof jws.signature !== "string") throw new JWSInvalid("JWS Signature missing or incorrect type");
	if (jws.header !== void 0 && !isObject(jws.header)) throw new JWSInvalid("JWS Unprotected Header incorrect type");
	let parsedProt = {};
	if (jws.protected) try {
		const protectedHeader = decode(jws.protected);
		parsedProt = JSON.parse(decoder.decode(protectedHeader));
	} catch {
		throw new JWSInvalid("JWS Protected Header is invalid");
	}
	if (!isDisjoint(parsedProt, jws.header)) throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
	const joseHeader = {
		...parsedProt,
		...jws.header
	};
	const extensions = validateCrit(JWSInvalid, new Map([["b64", true]]), options?.crit, parsedProt, joseHeader);
	let b64 = true;
	if (extensions.has("b64")) {
		b64 = parsedProt.b64;
		if (typeof b64 !== "boolean") throw new JWSInvalid("The \"b64\" (base64url-encode payload) Header Parameter must be a boolean");
	}
	const { alg: alg$1 } = joseHeader;
	if (typeof alg$1 !== "string" || !alg$1) throw new JWSInvalid("JWS \"alg\" (Algorithm) Header Parameter missing or invalid");
	const algorithms = options && validateAlgorithms("algorithms", options.algorithms);
	if (algorithms && !algorithms.has(alg$1)) throw new JOSEAlgNotAllowed("\"alg\" (Algorithm) Header Parameter value not allowed");
	if (b64) {
		if (typeof jws.payload !== "string") throw new JWSInvalid("JWS Payload must be a string");
	} else if (typeof jws.payload !== "string" && !(jws.payload instanceof Uint8Array)) throw new JWSInvalid("JWS Payload must be a string or an Uint8Array instance");
	let resolvedKey = false;
	if (typeof key === "function") {
		key = await key(parsedProt, jws);
		resolvedKey = true;
	}
	checkKeyType(alg$1, key, "verify");
	const data = concat(jws.protected !== void 0 ? encode$1(jws.protected) : new Uint8Array(), encode$1("."), typeof jws.payload === "string" ? b64 ? encode$1(jws.payload) : encoder.encode(jws.payload) : jws.payload);
	let signature;
	try {
		signature = decode(jws.signature);
	} catch {
		throw new JWSInvalid("Failed to base64url decode the signature");
	}
	const k = await normalizeKey(key, alg$1);
	if (!await verify(alg$1, k, signature, data)) throw new JWSSignatureVerificationFailed();
	let payload;
	if (b64) try {
		payload = decode(jws.payload);
	} catch {
		throw new JWSInvalid("Failed to base64url decode the payload");
	}
	else if (typeof jws.payload === "string") payload = encoder.encode(jws.payload);
	else payload = jws.payload;
	const result = { payload };
	if (jws.protected !== void 0) result.protectedHeader = parsedProt;
	if (jws.header !== void 0) result.unprotectedHeader = jws.header;
	if (resolvedKey) return {
		...result,
		key: k
	};
	return result;
}
async function compactVerify(jws, key, options) {
	if (jws instanceof Uint8Array) jws = decoder.decode(jws);
	if (typeof jws !== "string") throw new JWSInvalid("Compact JWS must be a string or Uint8Array");
	const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split(".");
	if (length !== 3) throw new JWSInvalid("Invalid Compact JWS");
	const verified = await flattenedVerify({
		payload,
		protected: protectedHeader,
		signature
	}, key, options);
	const result = {
		payload: verified.payload,
		protectedHeader: verified.protectedHeader
	};
	if (typeof key === "function") return {
		...result,
		key: verified.key
	};
	return result;
}
var epoch = (date) => Math.floor(date.getTime() / 1e3);
var minute = 60;
var hour = minute * 60;
var day = hour * 24;
var week = day * 7;
var year = day * 365.25;
var REGEX$1 = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
function secs(str) {
	const matched = REGEX$1.exec(str);
	if (!matched || matched[4] && matched[1]) throw new TypeError("Invalid time period format");
	const value = parseFloat(matched[2]);
	const unit = matched[3].toLowerCase();
	let numericDate;
	switch (unit) {
		case "sec":
		case "secs":
		case "second":
		case "seconds":
		case "s":
			numericDate = Math.round(value);
			break;
		case "minute":
		case "minutes":
		case "min":
		case "mins":
		case "m":
			numericDate = Math.round(value * minute);
			break;
		case "hour":
		case "hours":
		case "hr":
		case "hrs":
		case "h":
			numericDate = Math.round(value * hour);
			break;
		case "day":
		case "days":
		case "d":
			numericDate = Math.round(value * day);
			break;
		case "week":
		case "weeks":
		case "w":
			numericDate = Math.round(value * week);
			break;
		default:
			numericDate = Math.round(value * year);
			break;
	}
	if (matched[1] === "-" || matched[4] === "ago") return -numericDate;
	return numericDate;
}
function validateInput(label, input) {
	if (!Number.isFinite(input)) throw new TypeError(`Invalid ${label} input`);
	return input;
}
var normalizeTyp = (value) => {
	if (value.includes("/")) return value.toLowerCase();
	return `application/${value.toLowerCase()}`;
};
var checkAudiencePresence = (audPayload, audOption) => {
	if (typeof audPayload === "string") return audOption.includes(audPayload);
	if (Array.isArray(audPayload)) return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
	return false;
};
function validateClaimsSet(protectedHeader, encodedPayload, options = {}) {
	let payload;
	try {
		payload = JSON.parse(decoder.decode(encodedPayload));
	} catch {}
	if (!isObject(payload)) throw new JWTInvalid("JWT Claims Set must be a top-level JSON object");
	const { typ } = options;
	if (typ && (typeof protectedHeader.typ !== "string" || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) throw new JWTClaimValidationFailed("unexpected \"typ\" JWT header value", payload, "typ", "check_failed");
	const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options;
	const presenceCheck = [...requiredClaims];
	if (maxTokenAge !== void 0) presenceCheck.push("iat");
	if (audience !== void 0) presenceCheck.push("aud");
	if (subject !== void 0) presenceCheck.push("sub");
	if (issuer !== void 0) presenceCheck.push("iss");
	for (const claim of new Set(presenceCheck.reverse())) if (!(claim in payload)) throw new JWTClaimValidationFailed(`missing required "${claim}" claim`, payload, claim, "missing");
	if (issuer && !(Array.isArray(issuer) ? issuer : [issuer]).includes(payload.iss)) throw new JWTClaimValidationFailed("unexpected \"iss\" claim value", payload, "iss", "check_failed");
	if (subject && payload.sub !== subject) throw new JWTClaimValidationFailed("unexpected \"sub\" claim value", payload, "sub", "check_failed");
	if (audience && !checkAudiencePresence(payload.aud, typeof audience === "string" ? [audience] : audience)) throw new JWTClaimValidationFailed("unexpected \"aud\" claim value", payload, "aud", "check_failed");
	let tolerance;
	switch (typeof options.clockTolerance) {
		case "string":
			tolerance = secs(options.clockTolerance);
			break;
		case "number":
			tolerance = options.clockTolerance;
			break;
		case "undefined":
			tolerance = 0;
			break;
		default: throw new TypeError("Invalid clockTolerance option type");
	}
	const { currentDate } = options;
	const now$1 = epoch(currentDate || /* @__PURE__ */ new Date());
	if ((payload.iat !== void 0 || maxTokenAge) && typeof payload.iat !== "number") throw new JWTClaimValidationFailed("\"iat\" claim must be a number", payload, "iat", "invalid");
	if (payload.nbf !== void 0) {
		if (typeof payload.nbf !== "number") throw new JWTClaimValidationFailed("\"nbf\" claim must be a number", payload, "nbf", "invalid");
		if (payload.nbf > now$1 + tolerance) throw new JWTClaimValidationFailed("\"nbf\" claim timestamp check failed", payload, "nbf", "check_failed");
	}
	if (payload.exp !== void 0) {
		if (typeof payload.exp !== "number") throw new JWTClaimValidationFailed("\"exp\" claim must be a number", payload, "exp", "invalid");
		if (payload.exp <= now$1 - tolerance) throw new JWTExpired("\"exp\" claim timestamp check failed", payload, "exp", "check_failed");
	}
	if (maxTokenAge) {
		const age = now$1 - payload.iat;
		const max = typeof maxTokenAge === "number" ? maxTokenAge : secs(maxTokenAge);
		if (age - tolerance > max) throw new JWTExpired("\"iat\" claim timestamp check failed (too far in the past)", payload, "iat", "check_failed");
		if (age < 0 - tolerance) throw new JWTClaimValidationFailed("\"iat\" claim timestamp check failed (it should be in the past)", payload, "iat", "check_failed");
	}
	return payload;
}
var JWTClaimsBuilder = class {
	#payload;
	constructor(payload) {
		if (!isObject(payload)) throw new TypeError("JWT Claims Set MUST be an object");
		this.#payload = structuredClone(payload);
	}
	data() {
		return encoder.encode(JSON.stringify(this.#payload));
	}
	get iss() {
		return this.#payload.iss;
	}
	set iss(value) {
		this.#payload.iss = value;
	}
	get sub() {
		return this.#payload.sub;
	}
	set sub(value) {
		this.#payload.sub = value;
	}
	get aud() {
		return this.#payload.aud;
	}
	set aud(value) {
		this.#payload.aud = value;
	}
	set jti(value) {
		this.#payload.jti = value;
	}
	set nbf(value) {
		if (typeof value === "number") this.#payload.nbf = validateInput("setNotBefore", value);
		else if (value instanceof Date) this.#payload.nbf = validateInput("setNotBefore", epoch(value));
		else this.#payload.nbf = epoch(/* @__PURE__ */ new Date()) + secs(value);
	}
	set exp(value) {
		if (typeof value === "number") this.#payload.exp = validateInput("setExpirationTime", value);
		else if (value instanceof Date) this.#payload.exp = validateInput("setExpirationTime", epoch(value));
		else this.#payload.exp = epoch(/* @__PURE__ */ new Date()) + secs(value);
	}
	set iat(value) {
		if (value === void 0) this.#payload.iat = epoch(/* @__PURE__ */ new Date());
		else if (value instanceof Date) this.#payload.iat = validateInput("setIssuedAt", epoch(value));
		else if (typeof value === "string") this.#payload.iat = validateInput("setIssuedAt", epoch(/* @__PURE__ */ new Date()) + secs(value));
		else this.#payload.iat = validateInput("setIssuedAt", value);
	}
};
async function jwtVerify(jwt, key, options) {
	const verified = await compactVerify(jwt, key, options);
	if (verified.protectedHeader.crit?.includes("b64") && verified.protectedHeader.b64 === false) throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
	const result = {
		payload: validateClaimsSet(verified.protectedHeader, verified.payload, options),
		protectedHeader: verified.protectedHeader
	};
	if (typeof key === "function") return {
		...result,
		key: verified.key
	};
	return result;
}
async function jwtDecrypt(jwt, key, options) {
	const decrypted = await compactDecrypt(jwt, key, options);
	const payload = validateClaimsSet(decrypted.protectedHeader, decrypted.plaintext, options);
	const { protectedHeader } = decrypted;
	if (protectedHeader.iss !== void 0 && protectedHeader.iss !== payload.iss) throw new JWTClaimValidationFailed("replicated \"iss\" claim header parameter mismatch", payload, "iss", "mismatch");
	if (protectedHeader.sub !== void 0 && protectedHeader.sub !== payload.sub) throw new JWTClaimValidationFailed("replicated \"sub\" claim header parameter mismatch", payload, "sub", "mismatch");
	if (protectedHeader.aud !== void 0 && JSON.stringify(protectedHeader.aud) !== JSON.stringify(payload.aud)) throw new JWTClaimValidationFailed("replicated \"aud\" claim header parameter mismatch", payload, "aud", "mismatch");
	const result = {
		payload,
		protectedHeader
	};
	if (typeof key === "function") return {
		...result,
		key: decrypted.key
	};
	return result;
}
var CompactEncrypt = class {
	#flattened;
	constructor(plaintext) {
		this.#flattened = new FlattenedEncrypt(plaintext);
	}
	setContentEncryptionKey(cek) {
		this.#flattened.setContentEncryptionKey(cek);
		return this;
	}
	setInitializationVector(iv) {
		this.#flattened.setInitializationVector(iv);
		return this;
	}
	setProtectedHeader(protectedHeader) {
		this.#flattened.setProtectedHeader(protectedHeader);
		return this;
	}
	setKeyManagementParameters(parameters) {
		this.#flattened.setKeyManagementParameters(parameters);
		return this;
	}
	async encrypt(key, options) {
		const jwe = await this.#flattened.encrypt(key, options);
		return [
			jwe.protected,
			jwe.encrypted_key,
			jwe.iv,
			jwe.ciphertext,
			jwe.tag
		].join(".");
	}
};
async function sign(alg$1, key, data) {
	const cryptoKey = await getSigKey(alg$1, key, "sign");
	checkKeyLength(alg$1, cryptoKey);
	const signature = await crypto.subtle.sign(subtleAlgorithm(alg$1, cryptoKey.algorithm), cryptoKey, data);
	return new Uint8Array(signature);
}
var FlattenedSign = class {
	#payload;
	#protectedHeader;
	#unprotectedHeader;
	constructor(payload) {
		if (!(payload instanceof Uint8Array)) throw new TypeError("payload must be an instance of Uint8Array");
		this.#payload = payload;
	}
	setProtectedHeader(protectedHeader) {
		if (this.#protectedHeader) throw new TypeError("setProtectedHeader can only be called once");
		this.#protectedHeader = protectedHeader;
		return this;
	}
	setUnprotectedHeader(unprotectedHeader) {
		if (this.#unprotectedHeader) throw new TypeError("setUnprotectedHeader can only be called once");
		this.#unprotectedHeader = unprotectedHeader;
		return this;
	}
	async sign(key, options) {
		if (!this.#protectedHeader && !this.#unprotectedHeader) throw new JWSInvalid("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");
		if (!isDisjoint(this.#protectedHeader, this.#unprotectedHeader)) throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
		const joseHeader = {
			...this.#protectedHeader,
			...this.#unprotectedHeader
		};
		const extensions = validateCrit(JWSInvalid, new Map([["b64", true]]), options?.crit, this.#protectedHeader, joseHeader);
		let b64 = true;
		if (extensions.has("b64")) {
			b64 = this.#protectedHeader.b64;
			if (typeof b64 !== "boolean") throw new JWSInvalid("The \"b64\" (base64url-encode payload) Header Parameter must be a boolean");
		}
		const { alg: alg$1 } = joseHeader;
		if (typeof alg$1 !== "string" || !alg$1) throw new JWSInvalid("JWS \"alg\" (Algorithm) Header Parameter missing or invalid");
		checkKeyType(alg$1, key, "sign");
		let payloadS;
		let payloadB;
		if (b64) {
			payloadS = encode(this.#payload);
			payloadB = encode$1(payloadS);
		} else {
			payloadB = this.#payload;
			payloadS = "";
		}
		let protectedHeaderString;
		let protectedHeaderBytes;
		if (this.#protectedHeader) {
			protectedHeaderString = encode(JSON.stringify(this.#protectedHeader));
			protectedHeaderBytes = encode$1(protectedHeaderString);
		} else {
			protectedHeaderString = "";
			protectedHeaderBytes = new Uint8Array();
		}
		const data = concat(protectedHeaderBytes, encode$1("."), payloadB);
		const jws = {
			signature: encode(await sign(alg$1, await normalizeKey(key, alg$1), data)),
			payload: payloadS
		};
		if (this.#unprotectedHeader) jws.header = this.#unprotectedHeader;
		if (this.#protectedHeader) jws.protected = protectedHeaderString;
		return jws;
	}
};
var CompactSign = class {
	#flattened;
	constructor(payload) {
		this.#flattened = new FlattenedSign(payload);
	}
	setProtectedHeader(protectedHeader) {
		this.#flattened.setProtectedHeader(protectedHeader);
		return this;
	}
	async sign(key, options) {
		const jws = await this.#flattened.sign(key, options);
		if (jws.payload === void 0) throw new TypeError("use the flattened module for creating JWS with b64: false");
		return `${jws.protected}.${jws.payload}.${jws.signature}`;
	}
};
var SignJWT = class {
	#protectedHeader;
	#jwt;
	constructor(payload = {}) {
		this.#jwt = new JWTClaimsBuilder(payload);
	}
	setIssuer(issuer) {
		this.#jwt.iss = issuer;
		return this;
	}
	setSubject(subject) {
		this.#jwt.sub = subject;
		return this;
	}
	setAudience(audience) {
		this.#jwt.aud = audience;
		return this;
	}
	setJti(jwtId) {
		this.#jwt.jti = jwtId;
		return this;
	}
	setNotBefore(input) {
		this.#jwt.nbf = input;
		return this;
	}
	setExpirationTime(input) {
		this.#jwt.exp = input;
		return this;
	}
	setIssuedAt(input) {
		this.#jwt.iat = input;
		return this;
	}
	setProtectedHeader(protectedHeader) {
		this.#protectedHeader = protectedHeader;
		return this;
	}
	async sign(key, options) {
		const sig = new CompactSign(this.#jwt.data());
		sig.setProtectedHeader(this.#protectedHeader);
		if (Array.isArray(this.#protectedHeader?.crit) && this.#protectedHeader.crit.includes("b64") && this.#protectedHeader.b64 === false) throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
		return sig.sign(key, options);
	}
};
var EncryptJWT = class {
	#cek;
	#iv;
	#keyManagementParameters;
	#protectedHeader;
	#replicateIssuerAsHeader;
	#replicateSubjectAsHeader;
	#replicateAudienceAsHeader;
	#jwt;
	constructor(payload = {}) {
		this.#jwt = new JWTClaimsBuilder(payload);
	}
	setIssuer(issuer) {
		this.#jwt.iss = issuer;
		return this;
	}
	setSubject(subject) {
		this.#jwt.sub = subject;
		return this;
	}
	setAudience(audience) {
		this.#jwt.aud = audience;
		return this;
	}
	setJti(jwtId) {
		this.#jwt.jti = jwtId;
		return this;
	}
	setNotBefore(input) {
		this.#jwt.nbf = input;
		return this;
	}
	setExpirationTime(input) {
		this.#jwt.exp = input;
		return this;
	}
	setIssuedAt(input) {
		this.#jwt.iat = input;
		return this;
	}
	setProtectedHeader(protectedHeader) {
		if (this.#protectedHeader) throw new TypeError("setProtectedHeader can only be called once");
		this.#protectedHeader = protectedHeader;
		return this;
	}
	setKeyManagementParameters(parameters) {
		if (this.#keyManagementParameters) throw new TypeError("setKeyManagementParameters can only be called once");
		this.#keyManagementParameters = parameters;
		return this;
	}
	setContentEncryptionKey(cek) {
		if (this.#cek) throw new TypeError("setContentEncryptionKey can only be called once");
		this.#cek = cek;
		return this;
	}
	setInitializationVector(iv) {
		if (this.#iv) throw new TypeError("setInitializationVector can only be called once");
		this.#iv = iv;
		return this;
	}
	replicateIssuerAsHeader() {
		this.#replicateIssuerAsHeader = true;
		return this;
	}
	replicateSubjectAsHeader() {
		this.#replicateSubjectAsHeader = true;
		return this;
	}
	replicateAudienceAsHeader() {
		this.#replicateAudienceAsHeader = true;
		return this;
	}
	async encrypt(key, options) {
		const enc$1 = new CompactEncrypt(this.#jwt.data());
		if (this.#protectedHeader && (this.#replicateIssuerAsHeader || this.#replicateSubjectAsHeader || this.#replicateAudienceAsHeader)) this.#protectedHeader = {
			...this.#protectedHeader,
			iss: this.#replicateIssuerAsHeader ? this.#jwt.iss : void 0,
			sub: this.#replicateSubjectAsHeader ? this.#jwt.sub : void 0,
			aud: this.#replicateAudienceAsHeader ? this.#jwt.aud : void 0
		};
		enc$1.setProtectedHeader(this.#protectedHeader);
		if (this.#iv) enc$1.setInitializationVector(this.#iv);
		if (this.#cek) enc$1.setContentEncryptionKey(this.#cek);
		if (this.#keyManagementParameters) enc$1.setKeyManagementParameters(this.#keyManagementParameters);
		return enc$1.encrypt(key, options);
	}
};
var check = (value, description$1) => {
	if (typeof value !== "string" || !value) throw new JWKInvalid(`${description$1} missing or invalid`);
};
async function calculateJwkThumbprint(key, digestAlgorithm) {
	let jwk;
	if (isJWK(key)) jwk = key;
	else if (isKeyLike(key)) jwk = await exportJWK(key);
	else throw new TypeError(invalidKeyInput(key, "CryptoKey", "KeyObject", "JSON Web Key"));
	digestAlgorithm ??= "sha256";
	if (digestAlgorithm !== "sha256" && digestAlgorithm !== "sha384" && digestAlgorithm !== "sha512") throw new TypeError("digestAlgorithm must one of \"sha256\", \"sha384\", or \"sha512\"");
	let components;
	switch (jwk.kty) {
		case "AKP":
			check(jwk.alg, "\"alg\" (Algorithm) Parameter");
			check(jwk.pub, "\"pub\" (Public key) Parameter");
			components = {
				alg: jwk.alg,
				kty: jwk.kty,
				pub: jwk.pub
			};
			break;
		case "EC":
			check(jwk.crv, "\"crv\" (Curve) Parameter");
			check(jwk.x, "\"x\" (X Coordinate) Parameter");
			check(jwk.y, "\"y\" (Y Coordinate) Parameter");
			components = {
				crv: jwk.crv,
				kty: jwk.kty,
				x: jwk.x,
				y: jwk.y
			};
			break;
		case "OKP":
			check(jwk.crv, "\"crv\" (Subtype of Key Pair) Parameter");
			check(jwk.x, "\"x\" (Public Key) Parameter");
			components = {
				crv: jwk.crv,
				kty: jwk.kty,
				x: jwk.x
			};
			break;
		case "RSA":
			check(jwk.e, "\"e\" (Exponent) Parameter");
			check(jwk.n, "\"n\" (Modulus) Parameter");
			components = {
				e: jwk.e,
				kty: jwk.kty,
				n: jwk.n
			};
			break;
		case "oct":
			check(jwk.k, "\"k\" (Key Value) Parameter");
			components = {
				k: jwk.k,
				kty: jwk.kty
			};
			break;
		default: throw new JOSENotSupported("\"kty\" (Key Type) Parameter missing or unsupported");
	}
	const data = encode$1(JSON.stringify(components));
	return encode(await digest(digestAlgorithm, data));
}
function decodeProtectedHeader(token) {
	let protectedB64u;
	if (typeof token === "string") {
		const parts = token.split(".");
		if (parts.length === 3 || parts.length === 5) [protectedB64u] = parts;
	} else if (typeof token === "object" && token) if ("protected" in token) protectedB64u = token.protected;
	else throw new TypeError("Token does not contain a Protected Header");
	try {
		if (typeof protectedB64u !== "string" || !protectedB64u) throw new Error();
		const result = JSON.parse(decoder.decode(decode(protectedB64u)));
		if (!isObject(result)) throw new Error();
		return result;
	} catch {
		throw new TypeError("Invalid Token or Protected Header formatting");
	}
}
function decodeJwt(jwt) {
	if (typeof jwt !== "string") throw new JWTInvalid("JWTs must use Compact JWS serialization, JWT must be a string");
	const { 1: payload, length } = jwt.split(".");
	if (length === 5) throw new JWTInvalid("Only JWTs using Compact JWS serialization can be decoded");
	if (length !== 3) throw new JWTInvalid("Invalid JWT");
	if (!payload) throw new JWTInvalid("JWTs must contain a payload");
	let decoded;
	try {
		decoded = decode(payload);
	} catch {
		throw new JWTInvalid("Failed to base64url decode the payload");
	}
	let result;
	try {
		result = JSON.parse(decoder.decode(decoded));
	} catch {
		throw new JWTInvalid("Failed to parse the decoded payload as JSON");
	}
	if (!isObject(result)) throw new JWTInvalid("Invalid JWT Claims Set");
	return result;
}
async function signJWT(payload, secret, expiresIn = 3600) {
	return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(Math.floor(Date.now() / 1e3) + expiresIn).sign(new TextEncoder().encode(secret));
}
async function verifyJWT(token, secret) {
	try {
		return (await jwtVerify(token, new TextEncoder().encode(secret))).payload;
	} catch {
		return null;
	}
}
var info = new Uint8Array([
	66,
	101,
	116,
	116,
	101,
	114,
	65,
	117,
	116,
	104,
	46,
	106,
	115,
	32,
	71,
	101,
	110,
	101,
	114,
	97,
	116,
	101,
	100,
	32,
	69,
	110,
	99,
	114,
	121,
	112,
	116,
	105,
	111,
	110,
	32,
	75,
	101,
	121
]);
var now = () => Date.now() / 1e3 | 0;
var alg = "dir";
var enc = "A256CBC-HS512";
function deriveEncryptionSecret(secret, salt) {
	return hkdf(sha256, new TextEncoder().encode(secret), new TextEncoder().encode(salt), info, 64);
}
function getCurrentSecret(secret) {
	if (typeof secret === "string") return secret;
	const value = secret.keys.get(secret.currentVersion);
	if (!value) throw new Error(`Secret version ${secret.currentVersion} not found in keys`);
	return value;
}
function getAllSecrets(secret) {
	if (typeof secret === "string") return [{
		version: 0,
		value: secret
	}];
	const result = [];
	for (const [version, value] of secret.keys) result.push({
		version,
		value
	});
	if (secret.legacySecret && !result.some((s) => s.value === secret.legacySecret)) result.push({
		version: -1,
		value: secret.legacySecret
	});
	return result;
}
async function symmetricEncodeJWT(payload, secret, salt, expiresIn = 3600) {
	const encryptionSecret = deriveEncryptionSecret(getCurrentSecret(secret), salt);
	const thumbprint = await calculateJwkThumbprint({
		kty: "oct",
		k: encode(encryptionSecret)
	}, "sha256");
	return await new EncryptJWT(payload).setProtectedHeader({
		alg,
		enc,
		kid: thumbprint
	}).setIssuedAt().setExpirationTime(now() + expiresIn).setJti(crypto.randomUUID()).encrypt(encryptionSecret);
}
var jwtDecryptOpts = {
	clockTolerance: 15,
	keyManagementAlgorithms: [alg],
	contentEncryptionAlgorithms: [enc, "A256GCM"]
};
async function symmetricDecodeJWT(token, secret, salt) {
	if (!token) return null;
	let hasKid = false;
	try {
		hasKid = decodeProtectedHeader(token).kid !== void 0;
	} catch {
		return null;
	}
	try {
		const secrets = getAllSecrets(secret);
		const { payload } = await jwtDecrypt(token, async (protectedHeader) => {
			const kid = protectedHeader.kid;
			if (kid !== void 0) {
				for (const s of secrets) {
					const encryptionSecret = deriveEncryptionSecret(s.value, salt);
					if (kid === await calculateJwkThumbprint({
						kty: "oct",
						k: encode(encryptionSecret)
					}, "sha256")) return encryptionSecret;
				}
				throw new Error("no matching decryption secret");
			}
			if (secrets.length === 1) return deriveEncryptionSecret(secrets[0].value, salt);
			return deriveEncryptionSecret(secrets[0].value, salt);
		}, jwtDecryptOpts);
		return payload;
	} catch {
		if (hasKid) return null;
		const secrets = getAllSecrets(secret);
		if (secrets.length <= 1) return null;
		for (let i = 1; i < secrets.length; i++) try {
			const s = secrets[i];
			const { payload } = await jwtDecrypt(token, deriveEncryptionSecret(s.value, salt), jwtDecryptOpts);
			return payload;
		} catch {
			continue;
		}
		return null;
	}
}
var cache = /* @__PURE__ */ new WeakMap();
function getFields(options, modelName, mode) {
	const cacheKey = `${modelName}:${mode}`;
	if (!cache.has(options)) cache.set(options, /* @__PURE__ */ new Map());
	const tableCache = cache.get(options);
	if (tableCache.has(cacheKey)) return tableCache.get(cacheKey);
	const coreSchema = mode === "output" ? getAuthTables(options)[modelName]?.fields ?? {} : {};
	const additionalFields = modelName === "user" || modelName === "session" || modelName === "account" ? options[modelName]?.additionalFields : void 0;
	let schema$2 = {
		...coreSchema,
		...additionalFields ?? {}
	};
	for (const plugin of options.plugins || []) if (plugin.schema && plugin.schema[modelName]) schema$2 = {
		...schema$2,
		...plugin.schema[modelName].fields
	};
	tableCache.set(cacheKey, schema$2);
	return schema$2;
}
function parseUserOutput(options, user$1) {
	return filterOutputFields(user$1, getFields(options, "user", "output"));
}
function parseSessionOutput(options, session$1) {
	return filterOutputFields(session$1, getFields(options, "session", "output"));
}
function parseAccountOutput(options, account$1) {
	const { accessToken: _accessToken, refreshToken: _refreshToken, idToken: _idToken, accessTokenExpiresAt: _accessTokenExpiresAt, refreshTokenExpiresAt: _refreshTokenExpiresAt, password: _password, ...rest } = filterOutputFields(account$1, getFields(options, "account", "output"));
	return rest;
}
function parseInputData(data, schema$2) {
	const action = schema$2.action || "create";
	const fields = schema$2.fields;
	const parsedData = Object.create(null);
	for (const key in fields) {
		if (key in data) {
			if (fields[key].input === false) {
				if (fields[key].defaultValue !== void 0) {
					if (action !== "update") {
						parsedData[key] = fields[key].defaultValue;
						continue;
					}
				}
				if (data[key]) throw APIError.from("BAD_REQUEST", {
					...BASE_ERROR_CODES.FIELD_NOT_ALLOWED,
					message: `${key} is not allowed to be set`
				});
				continue;
			}
			if (fields[key].validator?.input && data[key] !== void 0) {
				const result = fields[key].validator.input["~standard"].validate(data[key]);
				if (result instanceof Promise) throw APIError.from("INTERNAL_SERVER_ERROR", BASE_ERROR_CODES.ASYNC_VALIDATION_NOT_SUPPORTED);
				if ("issues" in result && result.issues) throw APIError.from("BAD_REQUEST", {
					...BASE_ERROR_CODES.VALIDATION_ERROR,
					message: result.issues[0]?.message || "Validation Error"
				});
				parsedData[key] = result.value;
				continue;
			}
			if (fields[key].transform?.input && data[key] !== void 0) {
				parsedData[key] = fields[key].transform?.input(data[key]);
				continue;
			}
			parsedData[key] = data[key];
			continue;
		}
		if (fields[key].defaultValue !== void 0 && action === "create") {
			if (typeof fields[key].defaultValue === "function") {
				parsedData[key] = fields[key].defaultValue();
				continue;
			}
			parsedData[key] = fields[key].defaultValue;
			continue;
		}
		if (fields[key].required && action === "create") throw APIError.from("BAD_REQUEST", {
			...BASE_ERROR_CODES.MISSING_FIELD,
			message: `${key} is required`
		});
	}
	return parsedData;
}
function parseUserInput(options, user$1 = {}, action) {
	return parseInputData(user$1, {
		fields: getFields(options, "user", "input"),
		action
	});
}
function parseSessionInput(options, session$1, action) {
	return parseInputData(session$1, {
		fields: getFields(options, "session", "input"),
		action
	});
}
function getSessionDefaultFields(options) {
	const fields = getFields(options, "session", "input");
	const defaults = {};
	for (const key in fields) if (fields[key].defaultValue !== void 0) defaults[key] = typeof fields[key].defaultValue === "function" ? fields[key].defaultValue() : fields[key].defaultValue;
	return defaults;
}
function mergeSchema(schema$2, newSchema) {
	if (!newSchema) return schema$2;
	for (const table in newSchema) {
		const newModelName = newSchema[table]?.modelName;
		if (newModelName) schema$2[table].modelName = newModelName;
		for (const field in schema$2[table].fields) {
			const newField = newSchema[table]?.fields?.[field];
			if (!newField) continue;
			schema$2[table].fields[field].fieldName = newField;
		}
	}
	return schema$2;
}
var getDate = (span, unit = "ms") => {
	return new Date(Date.now() + (unit === "sec" ? span * 1e3 : span));
};
var SEC = 1e3;
var MIN = SEC * 60;
var HOUR = MIN * 60;
var DAY = HOUR * 24;
var WEEK = DAY * 7;
var MONTH = DAY * 30;
var YEAR = DAY * 365.25;
var REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|months?|mo|years?|yrs?|y)(?: (ago|from now))?$/i;
function parse(value) {
	const match$1 = REGEX.exec(value);
	if (!match$1 || match$1[4] && match$1[1]) throw new TypeError(`Invalid time string format: "${value}". Use formats like "7d", "30m", "1 hour", etc.`);
	const n = parseFloat(match$1[2]);
	const unit = match$1[3].toLowerCase();
	let result;
	switch (unit) {
		case "years":
		case "year":
		case "yrs":
		case "yr":
		case "y":
			result = n * YEAR;
			break;
		case "months":
		case "month":
		case "mo":
			result = n * MONTH;
			break;
		case "weeks":
		case "week":
		case "w":
			result = n * WEEK;
			break;
		case "days":
		case "day":
		case "d":
			result = n * DAY;
			break;
		case "hours":
		case "hour":
		case "hrs":
		case "hr":
		case "h":
			result = n * HOUR;
			break;
		case "minutes":
		case "minute":
		case "mins":
		case "min":
		case "m":
			result = n * MIN;
			break;
		case "seconds":
		case "second":
		case "secs":
		case "sec":
		case "s":
			result = n * SEC;
			break;
		default: throw new TypeError(`Unknown time unit: "${unit}"`);
	}
	if (match$1[1] === "-" || match$1[4] === "ago") return -result;
	return result;
}
function sec(value) {
	return Math.round(parse(value) / 1e3);
}
function tryDecode$1(str) {
	try {
		return decodeURIComponent(str);
	} catch {
		return str;
	}
}
var SECURE_COOKIE_PREFIX = "__Secure-";
function splitSetCookieHeader(setCookie) {
	if (!setCookie) return [];
	const result = [];
	let start = 0;
	let i = 0;
	while (i < setCookie.length) {
		if (setCookie[i] === ",") {
			let j = i + 1;
			while (j < setCookie.length && setCookie[j] === " ") j++;
			while (j < setCookie.length && setCookie[j] !== "=" && setCookie[j] !== ";" && setCookie[j] !== ",") j++;
			if (j < setCookie.length && setCookie[j] === "=") {
				const part = setCookie.slice(start, i).trim();
				if (part) result.push(part);
				start = i + 1;
				while (start < setCookie.length && setCookie[start] === " ") start++;
				i = start;
				continue;
			}
		}
		i++;
	}
	const last = setCookie.slice(start).trim();
	if (last) result.push(last);
	return result;
}
function parseSetCookieHeader(setCookie) {
	const cookies = /* @__PURE__ */ new Map();
	splitSetCookieHeader(setCookie).forEach((cookieString) => {
		const [nameValue, ...attributes] = cookieString.split(";").map((part) => part.trim());
		const [name, ...valueParts] = (nameValue || "").split("=");
		const value = valueParts.join("=");
		if (!name || value === void 0) return;
		const attrObj = { value: value.includes("%") ? tryDecode$1(value) : value };
		attributes.forEach((attribute) => {
			const [attrName, ...attrValueParts] = attribute.split("=");
			const attrValue = attrValueParts.join("=");
			const normalizedAttrName = attrName.trim().toLowerCase();
			switch (normalizedAttrName) {
				case "max-age":
					attrObj["max-age"] = attrValue ? parseInt(attrValue.trim(), 10) : void 0;
					break;
				case "expires":
					attrObj.expires = attrValue ? new Date(attrValue.trim()) : void 0;
					break;
				case "domain":
					attrObj.domain = attrValue ? attrValue.trim() : void 0;
					break;
				case "path":
					attrObj.path = attrValue ? attrValue.trim() : void 0;
					break;
				case "secure":
					attrObj.secure = true;
					break;
				case "httponly":
					attrObj.httponly = true;
					break;
				case "samesite":
					attrObj.samesite = attrValue ? attrValue.trim().toLowerCase() : void 0;
					break;
				case "partitioned":
					attrObj.partitioned = true;
					break;
				default:
					attrObj[normalizedAttrName] = attrValue ? attrValue.trim() : true;
					break;
			}
		});
		cookies.set(name, attrObj);
	});
	return cookies;
}
function toCookieOptions(attributes) {
	return {
		maxAge: attributes["max-age"],
		expires: attributes.expires,
		domain: attributes.domain,
		path: attributes.path,
		secure: attributes.secure,
		httpOnly: attributes.httponly,
		sameSite: attributes.samesite,
		partitioned: attributes.partitioned
	};
}
var ALLOWED_COOKIE_SIZE = 4096;
var ESTIMATED_EMPTY_COOKIE_SIZE = 200;
var CHUNK_SIZE = ALLOWED_COOKIE_SIZE - ESTIMATED_EMPTY_COOKIE_SIZE;
function parseCookiesFromContext(ctx) {
	const cookieHeader = ctx.headers?.get("cookie");
	if (!cookieHeader) return {};
	const cookies = {};
	const pairs = cookieHeader.split("; ");
	for (const pair of pairs) {
		const [name, ...valueParts] = pair.split("=");
		if (name && valueParts.length > 0) cookies[name] = valueParts.join("=");
	}
	return cookies;
}
function getChunkIndex(cookieName) {
	const parts = cookieName.split(".");
	const lastPart = parts[parts.length - 1];
	const index = parseInt(lastPart || "0", 10);
	return isNaN(index) ? 0 : index;
}
function readExistingChunks(cookieName, ctx) {
	const chunks = {};
	const cookies = parseCookiesFromContext(ctx);
	for (const [name, value] of Object.entries(cookies)) if (name.startsWith(cookieName)) chunks[name] = value;
	return chunks;
}
function joinChunks(chunks) {
	return Object.keys(chunks).sort((a, b) => {
		return getChunkIndex(a) - getChunkIndex(b);
	}).map((key) => chunks[key]).join("");
}
function chunkCookie(storeName, cookie, chunks, logger$1) {
	const chunkCount = Math.ceil(cookie.value.length / CHUNK_SIZE);
	if (chunkCount === 1) {
		chunks[cookie.name] = cookie.value;
		return [cookie];
	}
	const cookies = [];
	for (let i = 0; i < chunkCount; i++) {
		const name = `${cookie.name}.${i}`;
		const start = i * CHUNK_SIZE;
		const value = cookie.value.substring(start, start + CHUNK_SIZE);
		cookies.push({
			...cookie,
			name,
			value
		});
		chunks[name] = value;
	}
	logger$1.debug(`CHUNKING_${storeName.toUpperCase()}_COOKIE`, {
		message: `${storeName} cookie exceeds allowed ${ALLOWED_COOKIE_SIZE} bytes.`,
		emptyCookieSize: ESTIMATED_EMPTY_COOKIE_SIZE,
		valueSize: cookie.value.length,
		chunkCount,
		chunks: cookies.map((c) => c.value.length + ESTIMATED_EMPTY_COOKIE_SIZE)
	});
	return cookies;
}
function getCleanCookies(chunks, cookieOptions) {
	const cleanedChunks = {};
	for (const name in chunks) cleanedChunks[name] = {
		name,
		value: "",
		attributes: {
			...cookieOptions,
			maxAge: 0
		}
	};
	return cleanedChunks;
}
var storeFactory = (storeName) => (cookieName, cookieOptions, ctx) => {
	const chunks = readExistingChunks(cookieName, ctx);
	const logger$1 = ctx.context.logger;
	return {
		getValue() {
			return joinChunks(chunks);
		},
		hasChunks() {
			return Object.keys(chunks).length > 0;
		},
		chunk(value, options) {
			const cleanedChunks = getCleanCookies(chunks, cookieOptions);
			for (const name in chunks) delete chunks[name];
			const cookies = cleanedChunks;
			const chunked = chunkCookie(storeName, {
				name: cookieName,
				value,
				attributes: {
					...cookieOptions,
					...options
				}
			}, chunks, logger$1);
			for (const chunk of chunked) cookies[chunk.name] = chunk;
			return Object.values(cookies);
		},
		clean() {
			const cleanedChunks = getCleanCookies(chunks, cookieOptions);
			for (const name in chunks) delete chunks[name];
			return Object.values(cleanedChunks);
		},
		setCookies(cookies) {
			for (const cookie of cookies) ctx.setCookie(cookie.name, cookie.value, cookie.attributes);
		}
	};
};
var createSessionStore = storeFactory("Session");
var createAccountStore = storeFactory("Account");
function getChunkedCookie(ctx, cookieName) {
	const value = ctx.getCookie(cookieName);
	if (value) return value;
	const chunks = [];
	const cookieHeader = ctx.headers?.get("cookie");
	if (!cookieHeader) return null;
	const cookies = {};
	const pairs = cookieHeader.split("; ");
	for (const pair of pairs) {
		const [name, ...valueParts] = pair.split("=");
		if (name && valueParts.length > 0) cookies[name] = valueParts.join("=");
	}
	for (const [name, val] of Object.entries(cookies)) if (name.startsWith(cookieName + ".")) {
		const indexStr = name.split(".").at(-1);
		const index = parseInt(indexStr || "0", 10);
		if (!isNaN(index)) chunks.push({
			index,
			value: val
		});
	}
	if (chunks.length > 0) {
		chunks.sort((a, b) => a.index - b.index);
		return chunks.map((c) => c.value).join("");
	}
	return null;
}
async function setAccountCookie(c, accountData) {
	const accountDataCookie = c.context.authCookies.accountData;
	const options = {
		maxAge: 300,
		...accountDataCookie.attributes
	};
	const data = await symmetricEncodeJWT(accountData, c.context.secretConfig, "better-auth-account", options.maxAge);
	if (data.length > ALLOWED_COOKIE_SIZE) {
		const accountStore = createAccountStore(accountDataCookie.name, options, c);
		const cookies = accountStore.chunk(data, options);
		accountStore.setCookies(cookies);
	} else {
		const accountStore = createAccountStore(accountDataCookie.name, options, c);
		if (accountStore.hasChunks()) {
			const cleanCookies = accountStore.clean();
			accountStore.setCookies(cleanCookies);
		}
		c.setCookie(accountDataCookie.name, data, options);
	}
}
async function getAccountCookie(c) {
	const accountCookie = getChunkedCookie(c, c.context.authCookies.accountData.name);
	if (accountCookie) {
		const accountData = safeJSONParse(await symmetricDecodeJWT(accountCookie, c.context.secretConfig, "better-auth-account"));
		if (accountData) return accountData;
	}
	return null;
}
var getSessionQuerySchema = z$2.optional(z$2.object({
	disableCookieCache: z$2.coerce.boolean().meta({ description: "Disable cookie cache and fetch session from database" }).optional(),
	disableRefresh: z$2.coerce.boolean().meta({ description: "Disable session refresh. Useful for checking session status, without updating the session" }).optional()
}));
function getAlphabet$1(urlSafe) {
	return urlSafe ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
}
function base64Encode(data, alphabet, padding) {
	let result = "";
	let buffer = 0;
	let shift = 0;
	for (const byte of data) {
		buffer = buffer << 8 | byte;
		shift += 8;
		while (shift >= 6) {
			shift -= 6;
			result += alphabet[buffer >> shift & 63];
		}
	}
	if (shift > 0) result += alphabet[buffer << 6 - shift & 63];
	if (padding) {
		const padCount = (4 - result.length % 4) % 4;
		result += "=".repeat(padCount);
	}
	return result;
}
function base64Decode(data, alphabet) {
	const decodeMap = /* @__PURE__ */ new Map();
	for (let i = 0; i < alphabet.length; i++) decodeMap.set(alphabet[i], i);
	const result = [];
	let buffer = 0;
	let bitsCollected = 0;
	for (const char of data) {
		if (char === "=") break;
		const value = decodeMap.get(char);
		if (value === void 0) throw new Error(`Invalid Base64 character: ${char}`);
		buffer = buffer << 6 | value;
		bitsCollected += 6;
		if (bitsCollected >= 8) {
			bitsCollected -= 8;
			result.push(buffer >> bitsCollected & 255);
		}
	}
	return Uint8Array.from(result);
}
var base64 = {
	encode(data, options = {}) {
		const alphabet = getAlphabet$1(false);
		return base64Encode(typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data), alphabet, options.padding ?? true);
	},
	decode(data) {
		if (typeof data !== "string") data = new TextDecoder().decode(data);
		const alphabet = getAlphabet$1(data.includes("-") || data.includes("_"));
		return base64Decode(data, alphabet);
	}
};
var base64Url = {
	encode(data, options = {}) {
		const alphabet = getAlphabet$1(true);
		return base64Encode(typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data), alphabet, options.padding ?? true);
	},
	decode(data) {
		return base64Decode(data, getAlphabet$1(data.includes("-") || data.includes("_")));
	}
};
var decoders = /* @__PURE__ */ new Map();
var binary = {
	decode: (data, encoding = "utf-8") => {
		if (!decoders.has(encoding)) decoders.set(encoding, new TextDecoder(encoding));
		return decoders.get(encoding).decode(data);
	},
	encode: new TextEncoder().encode
};
var hexadecimal = "0123456789abcdef";
var hex = {
	encode: (data) => {
		if (typeof data === "string") data = new TextEncoder().encode(data);
		if (data.byteLength === 0) return "";
		const buffer = new Uint8Array(data);
		let result = "";
		for (const byte of buffer) result += byte.toString(16).padStart(2, "0");
		return result;
	},
	decode: (data) => {
		if (!data) return "";
		if (typeof data === "string") {
			if (data.length % 2 !== 0) throw new Error("Invalid hexadecimal string");
			if (!(/* @__PURE__ */ new RegExp(`^[${hexadecimal}]+$`)).test(data)) throw new Error("Invalid hexadecimal string");
			const result = new Uint8Array(data.length / 2);
			for (let i = 0; i < data.length; i += 2) result[i / 2] = parseInt(data.slice(i, i + 2), 16);
			return new TextDecoder().decode(result);
		}
		return new TextDecoder().decode(data);
	}
};
function getWebcryptoSubtle() {
	const cr = typeof globalThis !== "undefined" && globalThis.crypto;
	if (cr && typeof cr.subtle === "object" && cr.subtle != null) return cr.subtle;
	throw new Error("crypto.subtle must be defined");
}
var createHMAC = (algorithm$1 = "SHA-256", encoding = "none") => {
	const hmac$1 = {
		importKey: async (key, keyUsage) => {
			return getWebcryptoSubtle().importKey("raw", typeof key === "string" ? new TextEncoder().encode(key) : key, {
				name: "HMAC",
				hash: { name: algorithm$1 }
			}, false, [keyUsage]);
		},
		sign: async (hmacKey, data) => {
			if (typeof hmacKey === "string") hmacKey = await hmac$1.importKey(hmacKey, "sign");
			const signature = await getWebcryptoSubtle().sign("HMAC", hmacKey, typeof data === "string" ? new TextEncoder().encode(data) : data);
			if (encoding === "hex") return hex.encode(signature);
			if (encoding === "base64" || encoding === "base64url" || encoding === "base64urlnopad") return base64Url.encode(signature, { padding: encoding !== "base64urlnopad" });
			return signature;
		},
		verify: async (hmacKey, data, signature) => {
			if (typeof hmacKey === "string") hmacKey = await hmac$1.importKey(hmacKey, "verify");
			if (encoding === "hex") signature = hex.decode(signature);
			if (encoding === "base64" || encoding === "base64url" || encoding === "base64urlnopad") signature = await base64.decode(signature);
			return getWebcryptoSubtle().verify("HMAC", hmacKey, typeof signature === "string" ? new TextEncoder().encode(signature) : signature, typeof data === "string" ? new TextEncoder().encode(data) : data);
		}
	};
	return hmac$1;
};
function createCookieGetter(options) {
	const baseURLString = typeof options.baseURL === "string" ? options.baseURL : void 0;
	const dynamicProtocol = typeof options.baseURL === "object" && options.baseURL !== null ? options.baseURL.protocol : void 0;
	const secureCookiePrefix = (options.advanced?.useSecureCookies !== void 0 ? options.advanced?.useSecureCookies : dynamicProtocol === "https" ? true : dynamicProtocol === "http" ? false : baseURLString ? baseURLString.startsWith("https://") : isProduction) ? SECURE_COOKIE_PREFIX : "";
	const crossSubdomainEnabled = !!options.advanced?.crossSubDomainCookies?.enabled;
	const domain = crossSubdomainEnabled ? options.advanced?.crossSubDomainCookies?.domain || (baseURLString ? new URL(baseURLString).hostname : void 0) : void 0;
	if (crossSubdomainEnabled && !domain && !isDynamicBaseURLConfig(options.baseURL)) throw new BetterAuthError("baseURL is required when crossSubdomainCookies are enabled.");
	function createCookie(cookieName, overrideAttributes = {}) {
		const prefix = options.advanced?.cookiePrefix || "better-auth";
		const name = options.advanced?.cookies?.[cookieName]?.name || `${prefix}.${cookieName}`;
		const attributes = options.advanced?.cookies?.[cookieName]?.attributes ?? {};
		return {
			name: `${secureCookiePrefix}${name}`,
			attributes: {
				secure: !!secureCookiePrefix,
				sameSite: "lax",
				path: "/",
				httpOnly: true,
				...crossSubdomainEnabled ? { domain } : {},
				...options.advanced?.defaultCookieAttributes,
				...overrideAttributes,
				...attributes
			}
		};
	}
	return createCookie;
}
function getCookies(options) {
	const createCookie = createCookieGetter(options);
	const sessionToken = createCookie("session_token", { maxAge: options.session?.expiresIn || sec("7d") });
	const sessionData = createCookie("session_data", { maxAge: options.session?.cookieCache?.maxAge || 300 });
	const accountData = createCookie("account_data", { maxAge: options.session?.cookieCache?.maxAge || 300 });
	const dontRememberToken = createCookie("dont_remember");
	return {
		sessionToken: {
			name: sessionToken.name,
			attributes: sessionToken.attributes
		},
		sessionData: {
			name: sessionData.name,
			attributes: sessionData.attributes
		},
		dontRememberToken: {
			name: dontRememberToken.name,
			attributes: dontRememberToken.attributes
		},
		accountData: {
			name: accountData.name,
			attributes: accountData.attributes
		}
	};
}
async function setCookieCache(ctx, session$1, dontRememberMe) {
	if (!ctx.context.options.session?.cookieCache?.enabled) return;
	const filteredSession = filterOutputFields(session$1.session, ctx.context.options.session?.additionalFields);
	const filteredUser = parseUserOutput(ctx.context.options, session$1.user);
	const versionConfig = ctx.context.options.session?.cookieCache?.version;
	let version = "1";
	if (versionConfig) {
		if (typeof versionConfig === "string") version = versionConfig;
		else if (typeof versionConfig === "function") {
			const result = versionConfig(session$1.session, session$1.user);
			version = isPromise(result) ? await result : result;
		}
	}
	const sessionData = {
		session: filteredSession,
		user: filteredUser,
		updatedAt: Date.now(),
		version
	};
	const options = {
		...ctx.context.authCookies.sessionData.attributes,
		maxAge: dontRememberMe ? void 0 : ctx.context.authCookies.sessionData.attributes.maxAge
	};
	const expiresAtDate = getDate(options.maxAge || 60, "sec").getTime();
	const strategy = ctx.context.options.session?.cookieCache?.strategy || "compact";
	let data;
	if (strategy === "jwe") data = await symmetricEncodeJWT(sessionData, ctx.context.secretConfig, "better-auth-session", options.maxAge || 300);
	else if (strategy === "jwt") data = await signJWT(sessionData, ctx.context.secret, options.maxAge || 300);
	else data = base64Url.encode(JSON.stringify({
		session: sessionData,
		expiresAt: expiresAtDate,
		signature: await createHMAC("SHA-256", "base64urlnopad").sign(ctx.context.secret, JSON.stringify({
			...sessionData,
			expiresAt: expiresAtDate
		}))
	}), { padding: false });
	if (data.length > 4093) {
		const sessionStore = createSessionStore(ctx.context.authCookies.sessionData.name, options, ctx);
		const cookies = sessionStore.chunk(data, options);
		sessionStore.setCookies(cookies);
	} else {
		const sessionStore = createSessionStore(ctx.context.authCookies.sessionData.name, options, ctx);
		if (sessionStore.hasChunks()) {
			const cleanCookies = sessionStore.clean();
			sessionStore.setCookies(cleanCookies);
		}
		ctx.setCookie(ctx.context.authCookies.sessionData.name, data, options);
	}
	if (ctx.context.options.account?.storeAccountCookie) {
		const accountData = await getAccountCookie(ctx);
		if (accountData) await setAccountCookie(ctx, accountData);
	}
}
async function setSessionCookie(ctx, session$1, dontRememberMe, overrides) {
	const dontRememberMeCookie = await ctx.getSignedCookie(ctx.context.authCookies.dontRememberToken.name, ctx.context.secret);
	dontRememberMe = dontRememberMe !== void 0 ? dontRememberMe : !!dontRememberMeCookie;
	const options = ctx.context.authCookies.sessionToken.attributes;
	const maxAge = dontRememberMe ? void 0 : ctx.context.sessionConfig.expiresIn;
	await ctx.setSignedCookie(ctx.context.authCookies.sessionToken.name, session$1.session.token, ctx.context.secret, {
		...options,
		maxAge,
		...overrides
	});
	if (dontRememberMe) await ctx.setSignedCookie(ctx.context.authCookies.dontRememberToken.name, "true", ctx.context.secret, ctx.context.authCookies.dontRememberToken.attributes);
	await setCookieCache(ctx, session$1, dontRememberMe);
	ctx.context.setNewSession(session$1);
}
function expireCookie(ctx, cookie) {
	ctx.setCookie(cookie.name, "", {
		...cookie.attributes,
		maxAge: 0
	});
}
function deleteSessionCookie(ctx, skipDontRememberMe) {
	expireCookie(ctx, ctx.context.authCookies.sessionToken);
	expireCookie(ctx, ctx.context.authCookies.sessionData);
	if (ctx.context.options.account?.storeAccountCookie) {
		expireCookie(ctx, ctx.context.authCookies.accountData);
		const accountStore = createAccountStore(ctx.context.authCookies.accountData.name, ctx.context.authCookies.accountData.attributes, ctx);
		const cleanCookies$1 = accountStore.clean();
		accountStore.setCookies(cleanCookies$1);
	}
	if (ctx.context.oauthConfig.storeStateStrategy === "cookie") expireCookie(ctx, ctx.context.createAuthCookie("oauth_state"));
	const sessionStore = createSessionStore(ctx.context.authCookies.sessionData.name, ctx.context.authCookies.sessionData.attributes, ctx);
	const cleanCookies = sessionStore.clean();
	sessionStore.setCookies(cleanCookies);
	if (!skipDontRememberMe) expireCookie(ctx, ctx.context.authCookies.dontRememberToken);
}
var LOCALHOST_IP = "127.0.0.1";
function getIp(req, options) {
	if (options.advanced?.ipAddress?.disableIpTracking) return null;
	const headers = "headers" in req ? req.headers : req;
	const ipHeaders = options.advanced?.ipAddress?.ipAddressHeaders || ["x-forwarded-for"];
	for (const key of ipHeaders) {
		const value = "get" in headers ? headers.get(key) : headers[key];
		if (typeof value === "string") {
			const ip = value.split(",")[0].trim();
			if (isValidIP(ip)) return normalizeIP(ip, { ipv6Subnet: options.advanced?.ipAddress?.ipv6Subnet });
		}
	}
	if (isTest() || isDevelopment()) return LOCALHOST_IP;
	return null;
}
function createHash$1(algorithm$1, encoding) {
	return { digest: async (input) => {
		const encoder$1 = new TextEncoder();
		const data = typeof input === "string" ? encoder$1.encode(input) : input;
		const hashBuffer = await getWebcryptoSubtle().digest(algorithm$1, data);
		if (encoding === "hex") return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
		if (encoding === "base64" || encoding === "base64url" || encoding === "base64urlnopad") {
			if (encoding.includes("url")) return base64Url.encode(hashBuffer, { padding: encoding !== "base64urlnopad" });
			return base64.encode(hashBuffer);
		}
		return hashBuffer;
	} };
}
var defaultKeyHasher$1 = async (identifier) => {
	const hash$1 = await createHash$1("SHA-256").digest(new TextEncoder().encode(identifier));
	return base64Url.encode(new Uint8Array(hash$1), { padding: false });
};
async function processIdentifier(identifier, option) {
	if (!option || option === "plain") return identifier;
	if (option === "hashed") return defaultKeyHasher$1(identifier);
	if (typeof option === "object" && "hash" in option) return option.hash(identifier);
	return identifier;
}
function getStorageOption(identifier, config$1) {
	if (!config$1) return;
	if (typeof config$1 === "object" && "default" in config$1) {
		if (config$1.overrides) {
			for (const [prefix, option] of Object.entries(config$1.overrides)) if (identifier.startsWith(prefix)) return option;
		}
		return config$1.default;
	}
	return config$1;
}
const ATTR_DB_COLLECTION_NAME = "db.collection.name";
const ATTR_HTTP_RESPONSE_STATUS_CODE = "http.response.status_code";
const ATTR_HTTP_ROUTE = "http.route";
var ATTR_OPERATION_ID = "better_auth.operation_id";
var ATTR_HOOK_TYPE = "better_auth.hook.type";
var ATTR_CONTEXT = "better_auth.context";
function createNoopSpan() {
	const span = {
		end() {},
		setAttribute(_key, _value) {},
		setStatus(_status) {},
		recordException(_exception) {},
		updateName(_name) {
			return span;
		}
	};
	return span;
}
function createNoopTracer(noopSpan) {
	function startActiveSpan(_name, ...rest) {
		const fn = rest[rest.length - 1];
		return fn(noopSpan);
	}
	return { startActiveSpan };
}
function createNoopTraceAPI() {
	const noopTracer = createNoopTracer(createNoopSpan());
	return {
		getTracer(_name, _version) {
			return noopTracer;
		},
		getActiveSpan() {}
	};
}
function createNoopOpenTelemetryAPI() {
	return {
		SpanStatusCode: {
			UNSET: 0,
			OK: 1,
			ERROR: 2
		},
		trace: createNoopTraceAPI()
	};
}
var noopOpenTelemetryAPI = createNoopOpenTelemetryAPI();
var openTelemetryAPIPromise;
var openTelemetryAPI;
function getOpenTelemetryAPI() {
	if (!openTelemetryAPIPromise) openTelemetryAPIPromise = import("./esm-D_EuH6y3.js").then((mod) => {
		openTelemetryAPI = mod;
	}).catch(() => void 0);
	return openTelemetryAPI ?? noopOpenTelemetryAPI;
}
var INSTRUMENTATION_SCOPE = "better-auth";
var INSTRUMENTATION_VERSION = "1.6.9";
function isRedirectError(err) {
	if (err != null && typeof err === "object" && "name" in err && err.name === "APIError" && "statusCode" in err) {
		const status = err.statusCode;
		return status >= 300 && status < 400;
	}
	return false;
}
function endSpanWithError(span, err) {
	const { SpanStatusCode } = getOpenTelemetryAPI();
	if (isRedirectError(err)) {
		span.setAttribute(ATTR_HTTP_RESPONSE_STATUS_CODE, err.statusCode);
		span.setStatus({ code: SpanStatusCode.OK });
	} else {
		span.recordException(err);
		span.setStatus({
			code: SpanStatusCode.ERROR,
			message: String(err?.message ?? err)
		});
	}
	span.end();
}
function withSpan(name, attributes, fn) {
	const { trace } = getOpenTelemetryAPI();
	return trace.getTracer(INSTRUMENTATION_SCOPE, INSTRUMENTATION_VERSION).startActiveSpan(name, { attributes }, (span) => {
		try {
			const result = fn();
			if (result instanceof Promise) return result.then((value) => {
				span.end();
				return value;
			}).catch((err) => {
				endSpanWithError(span, err);
				throw err;
			});
			span.end();
			return result;
		} catch (err) {
			endSpanWithError(span, err);
			throw err;
		}
	});
}
function getWithHooks(adapter, ctx) {
	const hooksEntries = ctx.hooks;
	async function createWithHooks(data, model, customCreateFn) {
		const context = await getCurrentAuthContext().catch(() => null);
		let actualData = data;
		for (const { source, hooks } of hooksEntries) {
			const toRun = hooks[model]?.create?.before;
			if (toRun) {
				const result = await withSpan(`db create.before ${model}`, {
					[ATTR_HOOK_TYPE]: "create.before",
					[ATTR_DB_COLLECTION_NAME]: model,
					[ATTR_CONTEXT]: source
				}, () => toRun(actualData, context));
				if (result === false) return null;
				if (typeof result === "object" && "data" in result) actualData = {
					...actualData,
					...result.data
				};
			}
		}
		let created = null;
		if (!customCreateFn || customCreateFn.executeMainFn) created = await (await getCurrentAdapter(adapter)).create({
			model,
			data: actualData,
			forceAllowId: true
		});
		if (customCreateFn?.fn) created = await customCreateFn.fn(created ?? actualData);
		for (const { source, hooks } of hooksEntries) {
			const toRun = hooks[model]?.create?.after;
			if (toRun) await queueAfterTransactionHook(async () => {
				await withSpan(`db create.after ${model}`, {
					[ATTR_HOOK_TYPE]: "create.after",
					[ATTR_DB_COLLECTION_NAME]: model,
					[ATTR_CONTEXT]: source
				}, () => toRun(created, context));
			});
		}
		return created;
	}
	async function updateWithHooks(data, where, model, customUpdateFn) {
		const context = await getCurrentAuthContext().catch(() => null);
		let actualData = data;
		for (const { source, hooks } of hooksEntries) {
			const toRun = hooks[model]?.update?.before;
			if (toRun) {
				const result = await withSpan(`db update.before ${model}`, {
					[ATTR_HOOK_TYPE]: "update.before",
					[ATTR_DB_COLLECTION_NAME]: model,
					[ATTR_CONTEXT]: source
				}, () => toRun(data, context));
				if (result === false) return null;
				if (typeof result === "object" && "data" in result) actualData = {
					...actualData,
					...result.data
				};
			}
		}
		const customUpdated = customUpdateFn ? await customUpdateFn.fn(actualData) : null;
		const updated = !customUpdateFn || customUpdateFn.executeMainFn ? await (await getCurrentAdapter(adapter)).update({
			model,
			update: actualData,
			where
		}) : customUpdated;
		for (const { source, hooks } of hooksEntries) {
			const toRun = hooks[model]?.update?.after;
			if (toRun) await queueAfterTransactionHook(async () => {
				await withSpan(`db update.after ${model}`, {
					[ATTR_HOOK_TYPE]: "update.after",
					[ATTR_DB_COLLECTION_NAME]: model,
					[ATTR_CONTEXT]: source
				}, () => toRun(updated, context));
			});
		}
		return updated;
	}
	async function updateManyWithHooks(data, where, model, customUpdateFn) {
		const context = await getCurrentAuthContext().catch(() => null);
		let actualData = data;
		for (const { source, hooks } of hooksEntries) {
			const toRun = hooks[model]?.update?.before;
			if (toRun) {
				const result = await withSpan(`db updateMany.before ${model}`, {
					[ATTR_HOOK_TYPE]: "updateMany.before",
					[ATTR_DB_COLLECTION_NAME]: model,
					[ATTR_CONTEXT]: source
				}, () => toRun(data, context));
				if (result === false) return null;
				if (typeof result === "object" && "data" in result) actualData = {
					...actualData,
					...result.data
				};
			}
		}
		const customUpdated = customUpdateFn ? await customUpdateFn.fn(actualData) : null;
		const updated = !customUpdateFn || customUpdateFn.executeMainFn ? await (await getCurrentAdapter(adapter)).updateMany({
			model,
			update: actualData,
			where
		}) : customUpdated;
		for (const { source, hooks } of hooksEntries) {
			const toRun = hooks[model]?.update?.after;
			if (toRun) await queueAfterTransactionHook(async () => {
				await withSpan(`db updateMany.after ${model}`, {
					[ATTR_HOOK_TYPE]: "updateMany.after",
					[ATTR_DB_COLLECTION_NAME]: model,
					[ATTR_CONTEXT]: source
				}, () => toRun(updated, context));
			});
		}
		return updated;
	}
	async function deleteWithHooks(where, model, customDeleteFn) {
		const context = await getCurrentAuthContext().catch(() => null);
		let entityToDelete = null;
		try {
			entityToDelete = (await (await getCurrentAdapter(adapter)).findMany({
				model,
				where,
				limit: 1
			}))[0] || null;
		} catch {}
		if (entityToDelete) for (const { source, hooks } of hooksEntries) {
			const toRun = hooks[model]?.delete?.before;
			if (toRun) {
				if (await withSpan(`db delete.before ${model}`, {
					["better_auth.hook.type"]: "delete.before",
					["db.collection.name"]: model,
					["better_auth.context"]: source
				}, () => toRun(entityToDelete, context)) === false) return null;
			}
		}
		const customDeleted = customDeleteFn ? await customDeleteFn.fn(where) : null;
		const deleted = (!customDeleteFn || customDeleteFn.executeMainFn) && entityToDelete ? await (await getCurrentAdapter(adapter)).delete({
			model,
			where
		}) : customDeleted;
		if (entityToDelete) for (const { source, hooks } of hooksEntries) {
			const toRun = hooks[model]?.delete?.after;
			if (toRun) await queueAfterTransactionHook(async () => {
				await withSpan(`db delete.after ${model}`, {
					[ATTR_HOOK_TYPE]: "delete.after",
					[ATTR_DB_COLLECTION_NAME]: model,
					[ATTR_CONTEXT]: source
				}, () => toRun(entityToDelete, context));
			});
		}
		return deleted;
	}
	async function deleteManyWithHooks(where, model, customDeleteFn) {
		const context = await getCurrentAuthContext().catch(() => null);
		let entitiesToDelete = [];
		try {
			entitiesToDelete = await (await getCurrentAdapter(adapter)).findMany({
				model,
				where
			});
		} catch {}
		for (const entity of entitiesToDelete) for (const { source, hooks } of hooksEntries) {
			const toRun = hooks[model]?.delete?.before;
			if (toRun) {
				if (await withSpan(`db delete.before ${model}`, {
					["better_auth.hook.type"]: "delete.before",
					["db.collection.name"]: model,
					["better_auth.context"]: source
				}, () => toRun(entity, context)) === false) return null;
			}
		}
		const customDeleted = customDeleteFn ? await customDeleteFn.fn(where) : null;
		const deleted = !customDeleteFn || customDeleteFn.executeMainFn ? await (await getCurrentAdapter(adapter)).deleteMany({
			model,
			where
		}) : customDeleted;
		for (const entity of entitiesToDelete) for (const { source, hooks } of hooksEntries) {
			const toRun = hooks[model]?.delete?.after;
			if (toRun) await queueAfterTransactionHook(async () => {
				await withSpan(`db delete.after ${model}`, {
					[ATTR_HOOK_TYPE]: "delete.after",
					[ATTR_DB_COLLECTION_NAME]: model,
					[ATTR_CONTEXT]: source
				}, () => toRun(entity, context));
			});
		}
		return deleted;
	}
	return {
		createWithHooks,
		updateWithHooks,
		updateManyWithHooks,
		deleteWithHooks,
		deleteManyWithHooks
	};
}
function getTTLSeconds(expiresAt, now$1 = Date.now()) {
	const expiresMs = typeof expiresAt === "number" ? expiresAt : expiresAt.getTime();
	return Math.max(Math.floor((expiresMs - now$1) / 1e3), 0);
}
var createInternalAdapter = (adapter, ctx) => {
	const logger$1 = ctx.logger;
	const options = ctx.options;
	const secondaryStorage = options.secondaryStorage;
	const sessionExpiration = options.session?.expiresIn || 3600 * 24 * 7;
	const { createWithHooks, updateWithHooks, updateManyWithHooks, deleteWithHooks, deleteManyWithHooks } = getWithHooks(adapter, ctx);
	async function refreshUserSessions(user$1) {
		if (!secondaryStorage) return;
		const listRaw = await secondaryStorage.get(`active-sessions-${user$1.id}`);
		if (!listRaw) return;
		const now$1 = Date.now();
		const validSessions = (safeJSONParse(listRaw) || []).filter((s) => s.expiresAt > now$1);
		await Promise.all(validSessions.map(async ({ token }) => {
			const cached = await secondaryStorage.get(token);
			if (!cached) return;
			const parsed = safeJSONParse(cached);
			if (!parsed) return;
			const sessionTTL = getTTLSeconds(parsed.session.expiresAt, now$1);
			await secondaryStorage.set(token, JSON.stringify({
				session: parsed.session,
				user: user$1
			}), Math.floor(sessionTTL));
		}));
	}
	return {
		createOAuthUser: async (user$1, account$1) => {
			return runWithTransaction(adapter, async () => {
				const createdUser = await createWithHooks({
					createdAt: /* @__PURE__ */ new Date(),
					updatedAt: /* @__PURE__ */ new Date(),
					...user$1
				}, "user", void 0);
				return {
					user: createdUser,
					account: await createWithHooks({
						...account$1,
						userId: createdUser.id,
						createdAt: /* @__PURE__ */ new Date(),
						updatedAt: /* @__PURE__ */ new Date()
					}, "account", void 0)
				};
			});
		},
		createUser: async (user$1) => {
			return await createWithHooks({
				createdAt: /* @__PURE__ */ new Date(),
				updatedAt: /* @__PURE__ */ new Date(),
				...user$1,
				email: user$1.email?.toLowerCase()
			}, "user", void 0);
		},
		createAccount: async (account$1) => {
			return await createWithHooks({
				createdAt: /* @__PURE__ */ new Date(),
				updatedAt: /* @__PURE__ */ new Date(),
				...account$1
			}, "account", void 0);
		},
		listSessions: async (userId, options$1) => {
			if (secondaryStorage) {
				const currentList = await secondaryStorage.get(`active-sessions-${userId}`);
				if (!currentList) return [];
				const list = safeJSONParse(currentList) || [];
				const now$1 = Date.now();
				const seenTokens = /* @__PURE__ */ new Set();
				const sessions = [];
				for (const { token, expiresAt } of list) {
					if (expiresAt <= now$1 || seenTokens.has(token)) continue;
					seenTokens.add(token);
					const data = await secondaryStorage.get(token);
					if (!data) continue;
					try {
						const parsed = typeof data === "string" ? JSON.parse(data) : data;
						if (!parsed?.session) continue;
						sessions.push(parseSessionOutput(ctx.options, {
							...parsed.session,
							expiresAt: new Date(parsed.session.expiresAt)
						}));
					} catch {
						continue;
					}
				}
				return sessions;
			}
			return await (await getCurrentAdapter(adapter)).findMany({
				model: "session",
				where: [{
					field: "userId",
					value: userId
				}, ...options$1?.onlyActiveSessions ? [{
					field: "expiresAt",
					value: /* @__PURE__ */ new Date(),
					operator: "gt"
				}] : []]
			});
		},
		listUsers: async (limit, offset, sortBy, where) => {
			return await (await getCurrentAdapter(adapter)).findMany({
				model: "user",
				limit,
				offset,
				sortBy,
				where
			});
		},
		countTotalUsers: async (where) => {
			const total = await (await getCurrentAdapter(adapter)).count({
				model: "user",
				where
			});
			if (typeof total === "string") return parseInt(total);
			return total;
		},
		deleteUser: async (userId) => {
			if (!secondaryStorage || options.session?.storeSessionInDatabase) await deleteManyWithHooks([{
				field: "userId",
				value: userId
			}], "session", void 0);
			await deleteManyWithHooks([{
				field: "userId",
				value: userId
			}], "account", void 0);
			await deleteWithHooks([{
				field: "id",
				value: userId
			}], "user", void 0);
		},
		createSession: async (userId, dontRememberMe, override, overrideAll) => {
			const headers = await (async () => {
				const ctx$1 = await getCurrentAuthContext().catch(() => null);
				return ctx$1?.headers || ctx$1?.request?.headers;
			})();
			const storeInDb = options.session?.storeSessionInDatabase;
			const { id: _, ...rest } = override || {};
			let sessionId;
			if (secondaryStorage && !storeInDb) {
				const generatedId = ctx.generateId({ model: "session" });
				sessionId = generatedId !== false ? generatedId : generateId();
			}
			const defaultAdditionalFields = getSessionDefaultFields(options);
			const data = {
				...sessionId ? { id: sessionId } : {},
				ipAddress: headers ? getIp(headers, options) || "" : "",
				userAgent: headers?.get("user-agent") || "",
				...rest,
				expiresAt: dontRememberMe ? getDate(3600 * 24, "sec") : getDate(sessionExpiration, "sec"),
				userId,
				token: generateId(32),
				createdAt: /* @__PURE__ */ new Date(),
				updatedAt: /* @__PURE__ */ new Date(),
				...defaultAdditionalFields,
				...overrideAll ? rest : {}
			};
			return await createWithHooks(data, "session", secondaryStorage ? {
				fn: async (sessionData) => {
					const currentList = await secondaryStorage.get(`active-sessions-${userId}`);
					let list = [];
					const now$1 = Date.now();
					if (currentList) {
						list = safeJSONParse(currentList) || [];
						list = list.filter((session$1) => session$1.expiresAt > now$1 && session$1.token !== data.token);
					}
					const sorted = [...list, {
						token: data.token,
						expiresAt: data.expiresAt.getTime()
					}].sort((a, b) => a.expiresAt - b.expiresAt);
					const furthestSessionTTL = getTTLSeconds(sorted.at(-1)?.expiresAt ?? data.expiresAt.getTime(), now$1);
					if (furthestSessionTTL > 0) await secondaryStorage.set(`active-sessions-${userId}`, JSON.stringify(sorted), furthestSessionTTL);
					const user$1 = await (await getCurrentAdapter(adapter)).findOne({
						model: "user",
						where: [{
							field: "id",
							value: userId
						}]
					});
					const sessionTTL = getTTLSeconds(data.expiresAt, now$1);
					if (sessionTTL > 0) await secondaryStorage.set(data.token, JSON.stringify({
						session: sessionData,
						user: user$1
					}), sessionTTL);
					return sessionData;
				},
				executeMainFn: storeInDb
			} : void 0);
		},
		findSession: async (token) => {
			if (secondaryStorage) {
				const sessionStringified = await secondaryStorage.get(token);
				if (!sessionStringified && (!options.session?.storeSessionInDatabase || ctx.options.session?.preserveSessionInDatabase)) return null;
				if (sessionStringified) {
					const s = safeJSONParse(sessionStringified);
					if (!s) return null;
					return {
						session: parseSessionOutput(ctx.options, {
							...s.session,
							expiresAt: new Date(s.session.expiresAt),
							createdAt: new Date(s.session.createdAt),
							updatedAt: new Date(s.session.updatedAt)
						}),
						user: parseUserOutput(ctx.options, {
							...s.user,
							createdAt: new Date(s.user.createdAt),
							updatedAt: new Date(s.user.updatedAt)
						})
					};
				}
			}
			const result = await (await getCurrentAdapter(adapter)).findOne({
				model: "session",
				where: [{
					value: token,
					field: "token"
				}],
				join: { user: true }
			});
			if (!result) return null;
			const { user: user$1, ...session$1 } = result;
			if (!user$1) return null;
			return {
				session: parseSessionOutput(ctx.options, session$1),
				user: parseUserOutput(ctx.options, user$1)
			};
		},
		findSessions: async (sessionTokens, options$1) => {
			if (secondaryStorage) {
				const sessions$1 = [];
				for (const sessionToken of sessionTokens) {
					const sessionStringified = await secondaryStorage.get(sessionToken);
					if (sessionStringified) try {
						const s = typeof sessionStringified === "string" ? JSON.parse(sessionStringified) : sessionStringified;
						if (!s) return [];
						const expiresAt = new Date(s.session.expiresAt);
						if (options$1?.onlyActiveSessions && expiresAt <= /* @__PURE__ */ new Date()) continue;
						const session$1 = {
							session: {
								...s.session,
								expiresAt: new Date(s.session.expiresAt)
							},
							user: {
								...s.user,
								createdAt: new Date(s.user.createdAt),
								updatedAt: new Date(s.user.updatedAt)
							}
						};
						sessions$1.push(session$1);
					} catch {
						continue;
					}
				}
				return sessions$1;
			}
			const sessions = await (await getCurrentAdapter(adapter)).findMany({
				model: "session",
				where: [{
					field: "token",
					value: sessionTokens,
					operator: "in"
				}, ...options$1?.onlyActiveSessions ? [{
					field: "expiresAt",
					value: /* @__PURE__ */ new Date(),
					operator: "gt"
				}] : []],
				join: { user: true }
			});
			if (!sessions.length) return [];
			if (sessions.some((session$1) => !session$1.user)) return [];
			return sessions.map((_session) => {
				const { user: user$1, ...session$1 } = _session;
				return {
					session: session$1,
					user: user$1
				};
			});
		},
		updateSession: async (sessionToken, session$1) => {
			return await updateWithHooks(session$1, [{
				field: "token",
				value: sessionToken
			}], "session", secondaryStorage ? {
				async fn(data) {
					const currentSession = await secondaryStorage.get(sessionToken);
					if (!currentSession) return null;
					const parsedSession = safeJSONParse(currentSession);
					if (!parsedSession) return null;
					const mergedSession = {
						...parsedSession.session,
						...data,
						expiresAt: new Date(data.expiresAt ?? parsedSession.session.expiresAt),
						createdAt: new Date(parsedSession.session.createdAt),
						updatedAt: new Date(data.updatedAt ?? parsedSession.session.updatedAt)
					};
					const updatedSession = parseSessionOutput(ctx.options, mergedSession);
					const now$1 = Date.now();
					const expiresMs = new Date(updatedSession.expiresAt).getTime();
					const sessionTTL = getTTLSeconds(expiresMs, now$1);
					if (sessionTTL > 0) {
						await secondaryStorage.set(sessionToken, JSON.stringify({
							session: updatedSession,
							user: parsedSession.user
						}), sessionTTL);
						const listKey = `active-sessions-${updatedSession.userId}`;
						const listRaw = await secondaryStorage.get(listKey);
						const sorted = (listRaw ? safeJSONParse(listRaw) || [] : []).filter((s) => s.token !== sessionToken && s.expiresAt > now$1).concat([{
							token: sessionToken,
							expiresAt: expiresMs
						}]).sort((a, b) => a.expiresAt - b.expiresAt);
						const furthestSessionExp = sorted.at(-1)?.expiresAt;
						if (furthestSessionExp && furthestSessionExp > now$1) await secondaryStorage.set(listKey, JSON.stringify(sorted), getTTLSeconds(furthestSessionExp, now$1));
						else await secondaryStorage.delete(listKey);
					}
					return updatedSession;
				},
				executeMainFn: options.session?.storeSessionInDatabase
			} : void 0);
		},
		deleteSession: async (token) => {
			if (secondaryStorage) {
				const data = await secondaryStorage.get(token);
				if (data) {
					const { session: session$1 } = safeJSONParse(data) ?? {};
					if (!session$1) {
						logger$1.error("Session not found in secondary storage");
						return;
					}
					const userId = session$1.userId;
					const currentList = await secondaryStorage.get(`active-sessions-${userId}`);
					if (currentList) {
						const list = safeJSONParse(currentList) || [];
						const now$1 = Date.now();
						const filtered = list.filter((session$2) => session$2.expiresAt > now$1 && session$2.token !== token);
						const furthestSessionExp = filtered.sort((a, b) => a.expiresAt - b.expiresAt).at(-1)?.expiresAt;
						if (filtered.length > 0 && furthestSessionExp && furthestSessionExp > Date.now()) await secondaryStorage.set(`active-sessions-${userId}`, JSON.stringify(filtered), getTTLSeconds(furthestSessionExp, now$1));
						else await secondaryStorage.delete(`active-sessions-${userId}`);
					} else logger$1.error("Active sessions list not found in secondary storage");
				}
				await secondaryStorage.delete(token);
				if (!options.session?.storeSessionInDatabase || ctx.options.session?.preserveSessionInDatabase) return;
			}
			await deleteWithHooks([{
				field: "token",
				value: token
			}], "session", void 0);
		},
		deleteAccounts: async (userId) => {
			await deleteManyWithHooks([{
				field: "userId",
				value: userId
			}], "account", void 0);
		},
		deleteAccount: async (accountId) => {
			await deleteWithHooks([{
				field: "id",
				value: accountId
			}], "account", void 0);
		},
		deleteSessions: async (userIdOrSessionTokens) => {
			if (secondaryStorage) {
				if (typeof userIdOrSessionTokens === "string") {
					const activeSession = await secondaryStorage.get(`active-sessions-${userIdOrSessionTokens}`);
					const sessions = activeSession ? safeJSONParse(activeSession) : [];
					if (!sessions) return;
					for (const session$1 of sessions) await secondaryStorage.delete(session$1.token);
					await secondaryStorage.delete(`active-sessions-${userIdOrSessionTokens}`);
				} else for (const sessionToken of userIdOrSessionTokens) if (await secondaryStorage.get(sessionToken)) await secondaryStorage.delete(sessionToken);
				if (!options.session?.storeSessionInDatabase || ctx.options.session?.preserveSessionInDatabase) return;
			}
			await deleteManyWithHooks([{
				field: Array.isArray(userIdOrSessionTokens) ? "token" : "userId",
				value: userIdOrSessionTokens,
				operator: Array.isArray(userIdOrSessionTokens) ? "in" : void 0
			}], "session", void 0);
		},
		findOAuthUser: async (email, accountId, providerId) => {
			const account$1 = await (await getCurrentAdapter(adapter)).findOne({
				model: "account",
				where: [{
					value: accountId,
					field: "accountId"
				}, {
					value: providerId,
					field: "providerId"
				}],
				join: { user: true }
			});
			if (account$1) if (account$1.user) return {
				user: account$1.user,
				linkedAccount: account$1,
				accounts: [account$1]
			};
			else {
				const user$1 = await (await getCurrentAdapter(adapter)).findOne({
					model: "user",
					where: [{
						value: email.toLowerCase(),
						field: "email"
					}]
				});
				if (user$1) return {
					user: user$1,
					linkedAccount: account$1,
					accounts: [account$1]
				};
				return null;
			}
			else {
				const user$1 = await (await getCurrentAdapter(adapter)).findOne({
					model: "user",
					where: [{
						value: email.toLowerCase(),
						field: "email"
					}]
				});
				if (user$1) return {
					user: user$1,
					linkedAccount: null,
					accounts: await (await getCurrentAdapter(adapter)).findMany({
						model: "account",
						where: [{
							value: user$1.id,
							field: "userId"
						}]
					}) || []
				};
				else return null;
			}
		},
		findUserByEmail: async (email, options$1) => {
			const result = await (await getCurrentAdapter(adapter)).findOne({
				model: "user",
				where: [{
					value: email.toLowerCase(),
					field: "email"
				}],
				join: { ...options$1?.includeAccounts ? { account: true } : {} }
			});
			if (!result) return null;
			const { account: accounts, ...user$1 } = result;
			return {
				user: user$1,
				accounts: accounts ?? []
			};
		},
		findUserById: async (userId) => {
			if (!userId) return null;
			return await (await getCurrentAdapter(adapter)).findOne({
				model: "user",
				where: [{
					field: "id",
					value: userId
				}]
			});
		},
		linkAccount: async (account$1) => {
			return await createWithHooks({
				createdAt: /* @__PURE__ */ new Date(),
				updatedAt: /* @__PURE__ */ new Date(),
				...account$1
			}, "account", void 0);
		},
		updateUser: async (userId, data) => {
			const user$1 = await updateWithHooks(data, [{
				field: "id",
				value: userId
			}], "user", void 0);
			await refreshUserSessions(user$1);
			return user$1;
		},
		updateUserByEmail: async (email, data) => {
			const user$1 = await updateWithHooks(data, [{
				field: "email",
				value: email.toLowerCase()
			}], "user", void 0);
			await refreshUserSessions(user$1);
			return user$1;
		},
		updatePassword: async (userId, password) => {
			await updateManyWithHooks({ password }, [{
				field: "userId",
				value: userId
			}, {
				field: "providerId",
				value: "credential"
			}], "account", void 0);
		},
		findAccounts: async (userId) => {
			return await (await getCurrentAdapter(adapter)).findMany({
				model: "account",
				where: [{
					field: "userId",
					value: userId
				}]
			});
		},
		findAccount: async (accountId) => {
			return await (await getCurrentAdapter(adapter)).findOne({
				model: "account",
				where: [{
					field: "accountId",
					value: accountId
				}]
			});
		},
		findAccountByProviderId: async (accountId, providerId) => {
			return await (await getCurrentAdapter(adapter)).findOne({
				model: "account",
				where: [{
					field: "accountId",
					value: accountId
				}, {
					field: "providerId",
					value: providerId
				}]
			});
		},
		findAccountByUserId: async (userId) => {
			return await (await getCurrentAdapter(adapter)).findMany({
				model: "account",
				where: [{
					field: "userId",
					value: userId
				}]
			});
		},
		updateAccount: async (id, data) => {
			return await updateWithHooks(data, [{
				field: "id",
				value: id
			}], "account", void 0);
		},
		createVerificationValue: async (data) => {
			const storageOption = getStorageOption(data.identifier, options.verification?.storeIdentifier);
			const storedIdentifier = await processIdentifier(data.identifier, storageOption);
			return await createWithHooks({
				createdAt: /* @__PURE__ */ new Date(),
				updatedAt: /* @__PURE__ */ new Date(),
				...data,
				identifier: storedIdentifier
			}, "verification", secondaryStorage ? {
				async fn(verificationData) {
					const ttl = getTTLSeconds(verificationData.expiresAt);
					if (ttl > 0) await secondaryStorage.set(`verification:${storedIdentifier}`, JSON.stringify(verificationData), ttl);
					return verificationData;
				},
				executeMainFn: options.verification?.storeInDatabase
			} : void 0);
		},
		findVerificationValue: async (identifier) => {
			const storageOption = getStorageOption(identifier, options.verification?.storeIdentifier);
			const storedIdentifier = await processIdentifier(identifier, storageOption);
			if (secondaryStorage) {
				const cached = await secondaryStorage.get(`verification:${storedIdentifier}`);
				if (cached) {
					const parsed = safeJSONParse(cached);
					if (parsed) return parsed;
				}
				if (storageOption && storageOption !== "plain") {
					const plainCached = await secondaryStorage.get(`verification:${identifier}`);
					if (plainCached) {
						const parsed = safeJSONParse(plainCached);
						if (parsed) return parsed;
					}
				}
				if (!options.verification?.storeInDatabase) return null;
			}
			const currentAdapter = await getCurrentAdapter(adapter);
			async function findByIdentifier(id) {
				return currentAdapter.findMany({
					model: "verification",
					where: [{
						field: "identifier",
						value: id
					}],
					sortBy: {
						field: "createdAt",
						direction: "desc"
					},
					limit: 1
				});
			}
			let verification$1 = await findByIdentifier(storedIdentifier);
			if (!verification$1.length && storageOption && storageOption !== "plain") verification$1 = await findByIdentifier(identifier);
			if (!options.verification?.disableCleanup) await deleteManyWithHooks([{
				field: "expiresAt",
				value: /* @__PURE__ */ new Date(),
				operator: "lt"
			}], "verification", void 0);
			return verification$1[0] || null;
		},
		deleteVerificationByIdentifier: async (identifier) => {
			const storedIdentifier = await processIdentifier(identifier, getStorageOption(identifier, options.verification?.storeIdentifier));
			if (secondaryStorage) await secondaryStorage.delete(`verification:${storedIdentifier}`);
			if (!secondaryStorage || options.verification?.storeInDatabase) await deleteWithHooks([{
				field: "identifier",
				value: storedIdentifier
			}], "verification", void 0);
		},
		updateVerificationByIdentifier: async (identifier, data) => {
			const storedIdentifier = await processIdentifier(identifier, getStorageOption(identifier, options.verification?.storeIdentifier));
			if (secondaryStorage) {
				const cached = await secondaryStorage.get(`verification:${storedIdentifier}`);
				if (cached) {
					const parsed = safeJSONParse(cached);
					if (parsed) {
						const updated = {
							...parsed,
							...data
						};
						const expiresAt = updated.expiresAt ?? parsed.expiresAt;
						const ttl = getTTLSeconds(expiresAt instanceof Date ? expiresAt : new Date(expiresAt));
						if (ttl > 0) await secondaryStorage.set(`verification:${storedIdentifier}`, JSON.stringify(updated), ttl);
						if (!options.verification?.storeInDatabase) return updated;
					}
				}
			}
			if (!secondaryStorage || options.verification?.storeInDatabase) return await updateWithHooks(data, [{
				field: "identifier",
				value: storedIdentifier
			}], "verification", void 0);
			return data;
		}
	};
};
async function runPluginInit(context) {
	let options = context.options;
	const plugins = options.plugins || [];
	const pluginTrustedOrigins = [];
	const dbHooks = [];
	for (const plugin of plugins) if (plugin.init) {
		const initPromise = plugin.init(context);
		let result;
		if (isPromise(initPromise)) result = await initPromise;
		else result = initPromise;
		if (typeof result === "object") {
			if (result.options) {
				const { databaseHooks, trustedOrigins, ...restOpts } = result.options;
				if (databaseHooks) dbHooks.push({
					source: `plugin:${plugin.id}`,
					hooks: databaseHooks
				});
				if (trustedOrigins) pluginTrustedOrigins.push(trustedOrigins);
				options = defu(options, restOpts);
			}
			if (result.context) Object.assign(context, result.context);
		}
	}
	if (pluginTrustedOrigins.length > 0) {
		const allSources = [...options.trustedOrigins ? [options.trustedOrigins] : [], ...pluginTrustedOrigins];
		const staticOrigins = allSources.filter(Array.isArray).flat();
		const dynamicOrigins = allSources.filter((s) => typeof s === "function");
		if (dynamicOrigins.length > 0) options.trustedOrigins = async (request) => {
			const resolved = await Promise.all(dynamicOrigins.map((fn) => fn(request)));
			return [...staticOrigins, ...resolved.flat()].filter((v) => typeof v === "string" && v !== "");
		};
		else options.trustedOrigins = staticOrigins;
	}
	if (options.databaseHooks) dbHooks.push({
		source: "user",
		hooks: options.databaseHooks
	});
	context.internalAdapter = createInternalAdapter(context.adapter, {
		options,
		logger: context.logger,
		hooks: dbHooks,
		generateId: context.generateId
	});
	context.options = options;
}
function getInternalPlugins(options) {
	const plugins = [];
	if (options.advanced?.crossSubDomainCookies?.enabled) {}
	return plugins;
}
async function getTrustedOrigins(options, request) {
	const trustedOrigins = [];
	if (isDynamicBaseURLConfig(options.baseURL)) {
		const allowedHosts = options.baseURL.allowedHosts;
		for (const host of allowedHosts) if (!host.includes("://")) {
			trustedOrigins.push(`https://${host}`);
			if (isLoopbackHost(host)) trustedOrigins.push(`http://${host}`);
		} else trustedOrigins.push(host);
		if (options.baseURL.fallback) try {
			trustedOrigins.push(new URL(options.baseURL.fallback).origin);
		} catch {}
	} else {
		const baseURL = getBaseURL(typeof options.baseURL === "string" ? options.baseURL : void 0, options.basePath, request);
		if (baseURL) trustedOrigins.push(new URL(baseURL).origin);
	}
	if (options.trustedOrigins) {
		if (Array.isArray(options.trustedOrigins)) trustedOrigins.push(...options.trustedOrigins);
		if (typeof options.trustedOrigins === "function") {
			const validOrigins = await options.trustedOrigins(request);
			trustedOrigins.push(...validOrigins);
		}
	}
	const envTrustedOrigins = env.BETTER_AUTH_TRUSTED_ORIGINS;
	if (envTrustedOrigins) trustedOrigins.push(...envTrustedOrigins.split(","));
	return trustedOrigins.filter((v) => Boolean(v));
}
function pickSource(input) {
	if (isRequestLike(input?.request)) return input.request;
	if (!input?.headers) return void 0;
	const headers = input.headers instanceof Headers ? input.headers : new Headers(input.headers);
	if (!headers.has("host") && !headers.has("x-forwarded-host")) return;
	return headers;
}
function resolveDynamicTrustedProxyHeaders(options) {
	return options.advanced?.trustedProxyHeaders ?? true;
}
async function resolveRequestContext(ctx, source, trustedProxyHeaders) {
	const dynamicBaseURLConfig = ctx.options.baseURL;
	const baseURL = resolveBaseURL(dynamicBaseURLConfig, ctx.options.basePath || "/api/auth", source, void 0, trustedProxyHeaders);
	if (!baseURL) throw new BetterAuthError("Could not resolve base URL from request. Check your allowedHosts config.");
	const resolved = Object.create(Object.getPrototypeOf(ctx), Object.getOwnPropertyDescriptors(ctx));
	resolved.baseURL = baseURL;
	resolved.options = {
		...ctx.options,
		baseURL: getOrigin(baseURL) || void 0
	};
	const trustedOriginOptions = {
		...resolved.options,
		baseURL: dynamicBaseURLConfig
	};
	const needsRequest = typeof ctx.options.trustedOrigins === "function" || typeof ctx.options.account?.accountLinking?.trustedProviders === "function";
	let callbackRequest;
	if (needsRequest) if (isRequestLike(source)) callbackRequest = source;
	else if (source) callbackRequest = new Request(baseURL, { headers: source });
	else callbackRequest = void 0;
	else callbackRequest = void 0;
	resolved.trustedOrigins = await getTrustedOrigins(trustedOriginOptions, callbackRequest);
	resolved.trustedProviders = await getTrustedProviders(resolved.options, callbackRequest);
	if (ctx.options.advanced?.crossSubDomainCookies?.enabled) {
		resolved.authCookies = getCookies(resolved.options);
		resolved.createAuthCookie = createCookieGetter(resolved.options);
	}
	return resolved;
}
async function getAwaitableValue(arr, item) {
	if (!arr) return void 0;
	for (const val of arr) {
		const value = typeof val === "function" ? await val() : val;
		if (value[item.field ?? "id"] === item.value) return value;
	}
}
async function getTrustedProviders(options, request) {
	const trustedProviders = options.account?.accountLinking?.trustedProviders;
	if (!trustedProviders) return [];
	if (Array.isArray(trustedProviders)) return trustedProviders.filter((v) => Boolean(v));
	return (await trustedProviders(request) ?? []).filter((v) => Boolean(v));
}
var matchesOriginPattern = (url, pattern, settings) => {
	if (url.startsWith("/")) {
		if (settings?.allowRelativePaths) return url.startsWith("/") && /^\/(?!\/|\\|%2f|%5c)[\w\-.\+/@]*(?:\?[\w\-.\+/=&%@]*)?$/.test(url);
		return false;
	}
	if (pattern.includes("*") || pattern.includes("?")) {
		if (pattern.includes("://")) return wildcardMatch(pattern)(getOrigin(url) || url);
		const host = getHost(url);
		if (!host) return false;
		return wildcardMatch(pattern)(host);
	}
	const protocol = getProtocol(url);
	return protocol === "http:" || protocol === "https:" || !protocol ? pattern === getOrigin(url) : url.startsWith(pattern);
};
function shouldSkipCSRFForBackwardCompat(ctx) {
	return ctx.context.skipOriginCheck === true && ctx.context.options.advanced?.disableCSRFCheck === void 0;
}
function shouldSkipOriginCheck(ctx) {
	const skipOriginCheck = ctx.context.skipOriginCheck;
	if (skipOriginCheck === true) return true;
	if (Array.isArray(skipOriginCheck) && ctx.request) try {
		const basePath = new URL(ctx.context.baseURL).pathname;
		const currentPath = normalizePathname(ctx.request.url, basePath);
		return skipOriginCheck.some((skipPath) => currentPath.startsWith(skipPath));
	} catch {}
	return false;
}
var logBackwardCompatWarning = deprecate(function logBackwardCompatWarning$1() {}, "disableOriginCheck: true currently also disables CSRF checks. In a future version, disableOriginCheck will ONLY disable URL validation. To keep CSRF disabled, add disableCSRFCheck: true to your config.");
var originCheckMiddleware = createAuthMiddleware(async (ctx) => {
	if (ctx.request?.method === "GET" || ctx.request?.method === "OPTIONS" || ctx.request?.method === "HEAD" || !ctx.request) return;
	await validateOrigin(ctx);
	if (shouldSkipOriginCheck(ctx)) return;
	const { body, query } = ctx;
	const callbackURL = body?.callbackURL || query?.callbackURL;
	const redirectURL = body?.redirectTo;
	const errorCallbackURL = body?.errorCallbackURL;
	const newUserCallbackURL = body?.newUserCallbackURL;
	const validateURL = (url, label) => {
		if (!url) return;
		if (!ctx.context.isTrustedOrigin(url, { allowRelativePaths: label !== "origin" })) {
			ctx.context.logger.error(`Invalid ${label}: ${url}`);
			ctx.context.logger.info(`If it's a valid URL, please add ${url} to trustedOrigins in your auth config\n`, `Current list of trustedOrigins: ${ctx.context.trustedOrigins}`);
			if (label === "origin") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_ORIGIN);
			if (label === "callbackURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_CALLBACK_URL);
			if (label === "redirectURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_REDIRECT_URL);
			if (label === "errorCallbackURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_ERROR_CALLBACK_URL);
			if (label === "newUserCallbackURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_NEW_USER_CALLBACK_URL);
			throw APIError.fromStatus("FORBIDDEN", { message: `Invalid ${label}` });
		}
	};
	callbackURL && validateURL(callbackURL, "callbackURL");
	redirectURL && validateURL(redirectURL, "redirectURL");
	errorCallbackURL && validateURL(errorCallbackURL, "errorCallbackURL");
	newUserCallbackURL && validateURL(newUserCallbackURL, "newUserCallbackURL");
});
var originCheck = (getValue) => createAuthMiddleware(async (ctx) => {
	if (!ctx.request) return;
	if (shouldSkipOriginCheck(ctx)) return;
	const callbackURL = getValue(ctx);
	const validateURL = (url, label) => {
		if (!url) return;
		if (!ctx.context.isTrustedOrigin(url, { allowRelativePaths: label !== "origin" })) {
			ctx.context.logger.error(`Invalid ${label}: ${url}`);
			ctx.context.logger.info(`If it's a valid URL, please add ${url} to trustedOrigins in your auth config\n`, `Current list of trustedOrigins: ${ctx.context.trustedOrigins}`);
			if (label === "origin") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_ORIGIN);
			if (label === "callbackURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_CALLBACK_URL);
			if (label === "redirectURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_REDIRECT_URL);
			if (label === "errorCallbackURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_ERROR_CALLBACK_URL);
			if (label === "newUserCallbackURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_NEW_USER_CALLBACK_URL);
			throw APIError.fromStatus("FORBIDDEN", { message: `Invalid ${label}` });
		}
	};
	const callbacks = Array.isArray(callbackURL) ? callbackURL : [callbackURL];
	for (const url of callbacks) validateURL(url, "callbackURL");
});
async function validateOrigin(ctx, forceValidate = false) {
	const headers = ctx.request?.headers;
	if (!headers || !ctx.request) return;
	const originHeader = headers.get("origin") || headers.get("referer") || "";
	const useCookies = headers.has("cookie");
	if (ctx.context.skipCSRFCheck) return;
	if (shouldSkipCSRFForBackwardCompat(ctx)) {
		ctx.context.options.advanced?.disableOriginCheck === true && logBackwardCompatWarning();
		return;
	}
	if (shouldSkipOriginCheck(ctx)) return;
	if (!(forceValidate || useCookies)) return;
	if (!originHeader || originHeader === "null") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.MISSING_OR_NULL_ORIGIN);
	const trustedOrigins = Array.isArray(ctx.context.options.trustedOrigins) ? ctx.context.trustedOrigins : [...ctx.context.trustedOrigins, ...(await ctx.context.options.trustedOrigins?.(ctx.request))?.filter((v) => Boolean(v)) || []];
	if (!trustedOrigins.some((origin) => matchesOriginPattern(originHeader, origin))) {
		ctx.context.logger.error(`Invalid origin: ${originHeader}`);
		ctx.context.logger.info(`If it's a valid URL, please add ${originHeader} to trustedOrigins in your auth config\n`, `Current list of trustedOrigins: ${trustedOrigins}`);
		throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_ORIGIN);
	}
}
var formCsrfMiddleware = createAuthMiddleware(async (ctx) => {
	if (!ctx.request) return;
	await validateFormCsrf(ctx);
});
async function validateFormCsrf(ctx) {
	const req = ctx.request;
	if (!req) return;
	if (ctx.context.skipCSRFCheck) return;
	if (shouldSkipCSRFForBackwardCompat(ctx)) return;
	const headers = req.headers;
	if (headers.has("cookie")) return await validateOrigin(ctx);
	const site = headers.get("Sec-Fetch-Site");
	const mode = headers.get("Sec-Fetch-Mode");
	const dest = headers.get("Sec-Fetch-Dest");
	if (Boolean(site && site.trim() || mode && mode.trim() || dest && dest.trim())) {
		if (site === "cross-site" && mode === "navigate") {
			ctx.context.logger.error("Blocked cross-site navigation login attempt (CSRF protection)", {
				secFetchSite: site,
				secFetchMode: mode,
				secFetchDest: dest
			});
			throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.CROSS_SITE_NAVIGATION_LOGIN_BLOCKED);
		}
		return await validateOrigin(ctx, true);
	}
}
var memory = /* @__PURE__ */ new Map();
function shouldRateLimit(max, window$1, rateLimitData) {
	const now$1 = Date.now();
	const windowInMs = window$1 * 1e3;
	return now$1 - rateLimitData.lastRequest < windowInMs && rateLimitData.count >= max;
}
function rateLimitResponse(retryAfter) {
	return new Response(JSON.stringify({ message: "Too many requests. Please try again later." }), {
		status: 429,
		statusText: "Too Many Requests",
		headers: { "X-Retry-After": retryAfter.toString() }
	});
}
function getRetryAfter(lastRequest, window$1) {
	const now$1 = Date.now();
	const windowInMs = window$1 * 1e3;
	return Math.ceil((lastRequest + windowInMs - now$1) / 1e3);
}
function createDatabaseStorageWrapper(ctx) {
	const model = "rateLimit";
	const db$1 = ctx.adapter;
	return {
		get: async (key) => {
			const data = (await db$1.findMany({
				model,
				where: [{
					field: "key",
					value: key
				}]
			}))[0];
			if (typeof data?.lastRequest === "bigint") data.lastRequest = Number(data.lastRequest);
			return data;
		},
		set: async (key, value, _update) => {
			try {
				if (_update) await db$1.updateMany({
					model,
					where: [{
						field: "key",
						value: key
					}],
					update: {
						count: value.count,
						lastRequest: value.lastRequest
					}
				});
				else await db$1.create({
					model,
					data: {
						key,
						count: value.count,
						lastRequest: value.lastRequest
					}
				});
			} catch (e) {
				ctx.logger.error("Error setting rate limit", e);
			}
		}
	};
}
function getRateLimitStorage(ctx, rateLimitSettings) {
	if (ctx.options.rateLimit?.customStorage) return ctx.options.rateLimit.customStorage;
	const storage = ctx.rateLimit.storage;
	if (storage === "secondary-storage") return {
		get: async (key) => {
			const data = await ctx.options.secondaryStorage?.get(key);
			return data ? safeJSONParse(data) : null;
		},
		set: async (key, value, _update) => {
			const ttl = rateLimitSettings?.window ?? ctx.options.rateLimit?.window ?? 10;
			await ctx.options.secondaryStorage?.set?.(key, JSON.stringify(value), ttl);
		}
	};
	else if (storage === "memory") return {
		async get(key) {
			const entry = memory.get(key);
			if (!entry) return null;
			if (Date.now() >= entry.expiresAt) {
				memory.delete(key);
				return null;
			}
			return entry.data;
		},
		async set(key, value, _update) {
			const ttl = rateLimitSettings?.window ?? ctx.options.rateLimit?.window ?? 10;
			const expiresAt = Date.now() + ttl * 1e3;
			memory.set(key, {
				data: value,
				expiresAt
			});
		}
	};
	return createDatabaseStorageWrapper(ctx);
}
var ipWarningLogged = false;
async function resolveRateLimitConfig(req, ctx) {
	const basePath = new URL(ctx.baseURL).pathname;
	const path$1 = normalizePathname(req.url, basePath);
	let currentWindow = ctx.rateLimit.window;
	let currentMax = ctx.rateLimit.max;
	const ip = getIp(req, ctx.options);
	if (!ip) {
		if (!ipWarningLogged) {
			ctx.logger.warn("Rate limiting skipped: could not determine client IP address. Ensure your runtime forwards a trusted client IP header and configure `advanced.ipAddress.ipAddressHeaders` if needed.");
			ipWarningLogged = true;
		}
		return null;
	}
	const key = createRateLimitKey(ip, path$1);
	const specialRule = getDefaultSpecialRules().find((rule) => rule.pathMatcher(path$1));
	if (specialRule) {
		currentWindow = specialRule.window;
		currentMax = specialRule.max;
	}
	for (const plugin of ctx.options.plugins || []) if (plugin.rateLimit) {
		const matchedRule = plugin.rateLimit.find((rule) => rule.pathMatcher(path$1));
		if (matchedRule) {
			currentWindow = matchedRule.window;
			currentMax = matchedRule.max;
			break;
		}
	}
	if (ctx.rateLimit.customRules) {
		const _path = Object.keys(ctx.rateLimit.customRules).find((p) => {
			if (p.includes("*")) return wildcardMatch(p)(path$1);
			return p === path$1;
		});
		if (_path) {
			const customRule = ctx.rateLimit.customRules[_path];
			const resolved = typeof customRule === "function" ? await customRule(req, {
				window: currentWindow,
				max: currentMax
			}) : customRule;
			if (resolved) {
				currentWindow = resolved.window;
				currentMax = resolved.max;
			}
			if (resolved === false) return null;
		}
	}
	return {
		key,
		currentWindow,
		currentMax
	};
}
async function onRequestRateLimit(req, ctx) {
	if (!ctx.rateLimit.enabled) return;
	const config$1 = await resolveRateLimitConfig(req, ctx);
	if (!config$1) return;
	const { key, currentWindow, currentMax } = config$1;
	const data = await getRateLimitStorage(ctx, { window: currentWindow }).get(key);
	if (data && shouldRateLimit(currentMax, currentWindow, data)) return rateLimitResponse(getRetryAfter(data.lastRequest, currentWindow));
}
async function onResponseRateLimit(req, ctx) {
	if (!ctx.rateLimit.enabled) return;
	const config$1 = await resolveRateLimitConfig(req, ctx);
	if (!config$1) return;
	const { key, currentWindow } = config$1;
	const storage = getRateLimitStorage(ctx, { window: currentWindow });
	const data = await storage.get(key);
	const now$1 = Date.now();
	if (!data) await storage.set(key, {
		key,
		count: 1,
		lastRequest: now$1
	});
	else if (now$1 - data.lastRequest > currentWindow * 1e3) await storage.set(key, {
		...data,
		count: 1,
		lastRequest: now$1
	}, true);
	else await storage.set(key, {
		...data,
		count: data.count + 1,
		lastRequest: now$1
	}, true);
}
function getDefaultSpecialRules() {
	return [{
		pathMatcher(path$1) {
			return path$1.startsWith("/sign-in") || path$1.startsWith("/sign-up") || path$1.startsWith("/change-password") || path$1.startsWith("/change-email");
		},
		window: 10,
		max: 3
	}, {
		pathMatcher(path$1) {
			return path$1 === "/request-password-reset" || path$1 === "/send-verification-email" || path$1.startsWith("/forget-password") || path$1 === "/email-otp/send-verification-otp" || path$1 === "/email-otp/request-password-reset";
		},
		window: 60,
		max: 3
	}];
}
var { get: getOAuthState, set: setOAuthState } = defineRequestState(() => null);
var { get: getShouldSkipSessionRefresh, set: setShouldSkipSessionRefresh } = defineRequestState(() => false);
var getSession$1 = () => createAuthEndpoint("/get-session", {
	method: ["GET", "POST"],
	operationId: "getSession",
	query: getSessionQuerySchema,
	requireHeaders: true,
	metadata: { openapi: {
		operationId: "getSession",
		description: "Get the current session",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: ["object", "null"],
				properties: {
					session: { $ref: "#/components/schemas/Session" },
					user: { $ref: "#/components/schemas/User" }
				},
				required: ["session", "user"]
			} } }
		} }
	} }
}, async (ctx) => {
	const deferSessionRefresh = ctx.context.options.session?.deferSessionRefresh;
	const isPostRequest = ctx.method === "POST";
	if (isPostRequest && !deferSessionRefresh) throw APIError.from("METHOD_NOT_ALLOWED", BASE_ERROR_CODES.METHOD_NOT_ALLOWED_DEFER_SESSION_REQUIRED);
	try {
		const sessionCookieToken = await ctx.getSignedCookie(ctx.context.authCookies.sessionToken.name, ctx.context.secret);
		if (!sessionCookieToken) return null;
		const sessionDataCookie = getChunkedCookie(ctx, ctx.context.authCookies.sessionData.name);
		let sessionDataPayload = null;
		if (sessionDataCookie) {
			const strategy = ctx.context.options.session?.cookieCache?.strategy || "compact";
			if (strategy === "jwe") {
				const payload = await symmetricDecodeJWT(sessionDataCookie, ctx.context.secretConfig, "better-auth-session");
				if (payload && payload.session && payload.user) sessionDataPayload = {
					session: {
						session: payload.session,
						user: payload.user,
						updatedAt: payload.updatedAt,
						version: payload.version
					},
					expiresAt: payload.exp ? payload.exp * 1e3 : Date.now()
				};
				else {
					expireCookie(ctx, ctx.context.authCookies.sessionData);
					return ctx.json(null);
				}
			} else if (strategy === "jwt") {
				const payload = await verifyJWT(sessionDataCookie, ctx.context.secret);
				if (payload && payload.session && payload.user) sessionDataPayload = {
					session: {
						session: payload.session,
						user: payload.user,
						updatedAt: payload.updatedAt,
						version: payload.version
					},
					expiresAt: payload.exp ? payload.exp * 1e3 : Date.now()
				};
				else {
					expireCookie(ctx, ctx.context.authCookies.sessionData);
					return ctx.json(null);
				}
			} else {
				const parsed = safeJSONParse(binary.decode(base64Url.decode(sessionDataCookie)));
				if (parsed) if (await createHMAC("SHA-256", "base64urlnopad").verify(ctx.context.secret, JSON.stringify({
					...parsed.session,
					expiresAt: parsed.expiresAt
				}), parsed.signature)) sessionDataPayload = parsed;
				else {
					expireCookie(ctx, ctx.context.authCookies.sessionData);
					return ctx.json(null);
				}
			}
		}
		const dontRememberMe = await ctx.getSignedCookie(ctx.context.authCookies.dontRememberToken.name, ctx.context.secret);
		if (sessionDataPayload?.session && ctx.context.options.session?.cookieCache?.enabled && !ctx.query?.disableCookieCache) {
			const session$2 = sessionDataPayload.session;
			const versionConfig = ctx.context.options.session?.cookieCache?.version;
			let expectedVersion = "1";
			if (versionConfig) {
				if (typeof versionConfig === "string") expectedVersion = versionConfig;
				else if (typeof versionConfig === "function") {
					const result = versionConfig(session$2.session, session$2.user);
					expectedVersion = result instanceof Promise ? await result : result;
				}
			}
			if ((session$2.version || "1") !== expectedVersion) expireCookie(ctx, ctx.context.authCookies.sessionData);
			else {
				const cachedSessionExpiresAt = new Date(session$2.session.expiresAt);
				if (sessionDataPayload.expiresAt < Date.now() || cachedSessionExpiresAt < /* @__PURE__ */ new Date()) expireCookie(ctx, ctx.context.authCookies.sessionData);
				else {
					const cookieRefreshCache = ctx.context.sessionConfig.cookieRefreshCache;
					if (cookieRefreshCache === false) {
						ctx.context.session = session$2;
						const parsedSession$2 = parseSessionOutput(ctx.context.options, {
							...session$2.session,
							expiresAt: new Date(session$2.session.expiresAt),
							createdAt: new Date(session$2.session.createdAt),
							updatedAt: new Date(session$2.session.updatedAt)
						});
						const parsedUser$2 = parseUserOutput(ctx.context.options, {
							...session$2.user,
							createdAt: new Date(session$2.user.createdAt),
							updatedAt: new Date(session$2.user.updatedAt)
						});
						return ctx.json({
							session: parsedSession$2,
							user: parsedUser$2
						});
					}
					const timeUntilExpiry = sessionDataPayload.expiresAt - Date.now();
					const updateAge$1 = cookieRefreshCache.updateAge * 1e3;
					const shouldSkipSessionRefresh$1 = await getShouldSkipSessionRefresh();
					if (timeUntilExpiry < updateAge$1 && !shouldSkipSessionRefresh$1) {
						const newExpiresAt = getDate(ctx.context.options.session?.cookieCache?.maxAge || 300, "sec");
						const refreshedSession = {
							session: {
								...session$2.session,
								expiresAt: newExpiresAt
							},
							user: session$2.user,
							updatedAt: Date.now()
						};
						await setCookieCache(ctx, refreshedSession, false);
						const sessionTokenOptions = ctx.context.authCookies.sessionToken.attributes;
						const sessionTokenMaxAge = dontRememberMe ? void 0 : ctx.context.sessionConfig.expiresIn;
						await ctx.setSignedCookie(ctx.context.authCookies.sessionToken.name, session$2.session.token, ctx.context.secret, {
							...sessionTokenOptions,
							maxAge: sessionTokenMaxAge
						});
						const parsedRefreshedSession = parseSessionOutput(ctx.context.options, {
							...refreshedSession.session,
							expiresAt: new Date(refreshedSession.session.expiresAt),
							createdAt: new Date(refreshedSession.session.createdAt),
							updatedAt: new Date(refreshedSession.session.updatedAt)
						});
						const parsedRefreshedUser = parseUserOutput(ctx.context.options, {
							...refreshedSession.user,
							createdAt: new Date(refreshedSession.user.createdAt),
							updatedAt: new Date(refreshedSession.user.updatedAt)
						});
						ctx.context.session = {
							session: parsedRefreshedSession,
							user: parsedRefreshedUser
						};
						return ctx.json({
							session: parsedRefreshedSession,
							user: parsedRefreshedUser
						});
					}
					const parsedSession$1 = parseSessionOutput(ctx.context.options, {
						...session$2.session,
						expiresAt: new Date(session$2.session.expiresAt),
						createdAt: new Date(session$2.session.createdAt),
						updatedAt: new Date(session$2.session.updatedAt)
					});
					const parsedUser$1 = parseUserOutput(ctx.context.options, {
						...session$2.user,
						createdAt: new Date(session$2.user.createdAt),
						updatedAt: new Date(session$2.user.updatedAt)
					});
					ctx.context.session = {
						session: parsedSession$1,
						user: parsedUser$1
					};
					return ctx.json({
						session: parsedSession$1,
						user: parsedUser$1
					});
				}
			}
		}
		const session$1 = await ctx.context.internalAdapter.findSession(sessionCookieToken);
		ctx.context.session = session$1;
		if (!session$1 || session$1.session.expiresAt < /* @__PURE__ */ new Date()) {
			deleteSessionCookie(ctx);
			if (session$1) {
				if (!deferSessionRefresh || isPostRequest) await ctx.context.internalAdapter.deleteSession(session$1.session.token);
			}
			return ctx.json(null);
		}
		if (dontRememberMe || ctx.query?.disableRefresh) {
			const parsedSession$1 = parseSessionOutput(ctx.context.options, session$1.session);
			const parsedUser$1 = parseUserOutput(ctx.context.options, session$1.user);
			return ctx.json({
				session: parsedSession$1,
				user: parsedUser$1
			});
		}
		const expiresIn = ctx.context.sessionConfig.expiresIn;
		const updateAge = ctx.context.sessionConfig.updateAge;
		const shouldBeUpdated = session$1.session.expiresAt.valueOf() - expiresIn * 1e3 + updateAge * 1e3 <= Date.now();
		const disableRefresh = ctx.query?.disableRefresh || ctx.context.options.session?.disableSessionRefresh;
		const shouldSkipSessionRefresh = await getShouldSkipSessionRefresh();
		const needsRefresh = shouldBeUpdated && !disableRefresh && !shouldSkipSessionRefresh;
		if (deferSessionRefresh && !isPostRequest) {
			await setCookieCache(ctx, session$1, !!dontRememberMe);
			const parsedSession$1 = parseSessionOutput(ctx.context.options, session$1.session);
			const parsedUser$1 = parseUserOutput(ctx.context.options, session$1.user);
			return ctx.json({
				session: parsedSession$1,
				user: parsedUser$1,
				needsRefresh
			});
		}
		if (needsRefresh) {
			const updatedSession = await ctx.context.internalAdapter.updateSession(session$1.session.token, {
				expiresAt: getDate(ctx.context.sessionConfig.expiresIn, "sec"),
				updatedAt: /* @__PURE__ */ new Date()
			});
			if (!updatedSession) {
				deleteSessionCookie(ctx);
				throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.FAILED_TO_GET_SESSION);
			}
			const maxAge = (updatedSession.expiresAt.valueOf() - Date.now()) / 1e3;
			await setSessionCookie(ctx, {
				session: updatedSession,
				user: session$1.user
			}, false, { maxAge });
			const parsedUpdatedSession = parseSessionOutput(ctx.context.options, updatedSession);
			const parsedUser$1 = parseUserOutput(ctx.context.options, session$1.user);
			return ctx.json({
				session: parsedUpdatedSession,
				user: parsedUser$1
			});
		}
		await setCookieCache(ctx, session$1, !!dontRememberMe);
		const parsedSession = parseSessionOutput(ctx.context.options, session$1.session);
		const parsedUser = parseUserOutput(ctx.context.options, session$1.user);
		return ctx.json({
			session: parsedSession,
			user: parsedUser
		});
	} catch (error$1) {
		if (isAPIError(error$1)) throw error$1;
		ctx.context.logger.error("INTERNAL_SERVER_ERROR", error$1);
		throw APIError.from("INTERNAL_SERVER_ERROR", BASE_ERROR_CODES.FAILED_TO_GET_SESSION);
	}
});
var getSessionFromCtx = async (ctx, config$1) => {
	if (ctx.context.session) return ctx.context.session;
	const session$1 = await getSession$1()({
		...ctx,
		method: "GET",
		asResponse: false,
		headers: ctx.headers,
		returnHeaders: false,
		returnStatus: false,
		query: {
			...config$1,
			...ctx.query
		}
	}).catch((e) => {
		return null;
	});
	ctx.context.session = session$1;
	return session$1;
};
var sessionMiddleware = createAuthMiddleware(async (ctx) => {
	const session$1 = await getSessionFromCtx(ctx);
	if (!session$1?.session) throw APIError.from("UNAUTHORIZED", {
		message: "Unauthorized",
		code: "UNAUTHORIZED"
	});
	return { session: session$1 };
});
var sensitiveSessionMiddleware = createAuthMiddleware(async (ctx) => {
	const session$1 = await getSessionFromCtx(ctx, { disableCookieCache: true });
	if (!session$1?.session) throw APIError.from("UNAUTHORIZED", {
		message: "Unauthorized",
		code: "UNAUTHORIZED"
	});
	return { session: session$1 };
});
createAuthMiddleware(async (ctx) => {
	const session$1 = await getSessionFromCtx(ctx);
	if (!session$1?.session && (ctx.request || ctx.headers)) throw APIError.from("UNAUTHORIZED", {
		message: "Unauthorized",
		code: "UNAUTHORIZED"
	});
	return { session: session$1 };
});
var freshSessionMiddleware = createAuthMiddleware(async (ctx) => {
	const session$1 = await getSessionFromCtx(ctx);
	if (!session$1?.session) throw APIError.from("UNAUTHORIZED", {
		message: "Unauthorized",
		code: "UNAUTHORIZED"
	});
	if (ctx.context.sessionConfig.freshAge !== 0) {
		const createdAt = new Date(session$1.session.createdAt).getTime();
		const freshAge = ctx.context.sessionConfig.freshAge * 1e3;
		if (Date.now() - createdAt >= freshAge) throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.SESSION_NOT_FRESH);
	}
	return { session: session$1 };
});
var listSessions = () => createAuthEndpoint("/list-sessions", {
	method: "GET",
	operationId: "listUserSessions",
	use: [sessionMiddleware],
	requireHeaders: true,
	metadata: { openapi: {
		operationId: "listUserSessions",
		description: "List all active sessions for the user",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "array",
				items: { $ref: "#/components/schemas/Session" }
			} } }
		} }
	} }
}, async (ctx) => {
	try {
		const activeSessions = (await ctx.context.internalAdapter.listSessions(ctx.context.session.user.id, { onlyActiveSessions: true })).filter((session$1) => {
			return session$1.expiresAt > /* @__PURE__ */ new Date();
		});
		return ctx.json(activeSessions.map((session$1) => parseSessionOutput(ctx.context.options, session$1)));
	} catch (e) {
		ctx.context.logger.error(e);
		throw ctx.error("INTERNAL_SERVER_ERROR");
	}
});
var revokeSession = createAuthEndpoint("/revoke-session", {
	method: "POST",
	body: z$2.object({ token: z$2.string().meta({ description: "The token to revoke" }) }),
	use: [sensitiveSessionMiddleware],
	requireHeaders: true,
	metadata: { openapi: {
		description: "Revoke a single session",
		requestBody: { content: { "application/json": { schema: {
			type: "object",
			properties: { token: {
				type: "string",
				description: "The token to revoke"
			} },
			required: ["token"]
		} } } },
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { status: {
					type: "boolean",
					description: "Indicates if the session was revoked successfully"
				} },
				required: ["status"]
			} } }
		} }
	} }
}, async (ctx) => {
	const token = ctx.body.token;
	if ((await ctx.context.internalAdapter.findSession(token))?.session.userId === ctx.context.session.user.id) try {
		await ctx.context.internalAdapter.deleteSession(token);
	} catch (error$1) {
		ctx.context.logger.error(error$1 && typeof error$1 === "object" && "name" in error$1 ? error$1.name : "", error$1);
		throw APIError.from("INTERNAL_SERVER_ERROR", {
			message: "Internal Server Error",
			code: "INTERNAL_SERVER_ERROR"
		});
	}
	return ctx.json({ status: true });
});
var revokeSessions = createAuthEndpoint("/revoke-sessions", {
	method: "POST",
	use: [sensitiveSessionMiddleware],
	requireHeaders: true,
	metadata: { openapi: {
		description: "Revoke all sessions for the user",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { status: {
					type: "boolean",
					description: "Indicates if all sessions were revoked successfully"
				} },
				required: ["status"]
			} } }
		} }
	} }
}, async (ctx) => {
	try {
		await ctx.context.internalAdapter.deleteSessions(ctx.context.session.user.id);
	} catch (error$1) {
		ctx.context.logger.error(error$1 && typeof error$1 === "object" && "name" in error$1 ? error$1.name : "", error$1);
		throw APIError.from("INTERNAL_SERVER_ERROR", {
			message: "Internal Server Error",
			code: "INTERNAL_SERVER_ERROR"
		});
	}
	return ctx.json({ status: true });
});
var revokeOtherSessions = createAuthEndpoint("/revoke-other-sessions", {
	method: "POST",
	requireHeaders: true,
	use: [sensitiveSessionMiddleware],
	metadata: { openapi: {
		description: "Revoke all other sessions for the user except the current one",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { status: {
					type: "boolean",
					description: "Indicates if all other sessions were revoked successfully"
				} },
				required: ["status"]
			} } }
		} }
	} }
}, async (ctx) => {
	const session$1 = ctx.context.session;
	if (!session$1.user) throw APIError.from("UNAUTHORIZED", {
		message: "Unauthorized",
		code: "UNAUTHORIZED"
	});
	const otherSessions = (await ctx.context.internalAdapter.listSessions(session$1.user.id)).filter((session$2) => {
		return session$2.expiresAt > /* @__PURE__ */ new Date();
	}).filter((session$2) => session$2.token !== ctx.context.session.session.token);
	await Promise.all(otherSessions.map((session$2) => ctx.context.internalAdapter.deleteSession(session$2.token)));
	return ctx.json({ status: true });
});
var HANDLING_DOCS_URL = "https://www.better-auth.com/docs/concepts/oauth#handling-providers-without-email";
function missingEmailLogMessage(providerId, options) {
	return `${options?.source === "generic" ? `Generic OAuth provider "${providerId}"` : `Provider "${providerId}"`} did not return an email${options?.source === "id_token" ? " in the id token" : ""}. Either request the provider's email scope, or synthesize one via \`mapProfileToUser\`. See ${HANDLING_DOCS_URL}`;
}
function expandAlphabet(alphabet) {
	switch (alphabet) {
		case "a-z": return "abcdefghijklmnopqrstuvwxyz";
		case "A-Z": return "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		case "0-9": return "0123456789";
		case "-_": return "-_";
		default: throw new Error(`Unsupported alphabet: ${alphabet}`);
	}
}
function createRandomStringGenerator(...baseAlphabets) {
	const baseCharSet = baseAlphabets.map(expandAlphabet).join("");
	if (baseCharSet.length === 0) throw new Error("No valid characters provided for random string generation.");
	const baseCharSetLength = baseCharSet.length;
	return (length, ...alphabets) => {
		if (length <= 0) throw new Error("Length must be a positive integer.");
		let charSet = baseCharSet;
		let charSetLength = baseCharSetLength;
		if (alphabets.length > 0) {
			charSet = alphabets.map(expandAlphabet).join("");
			charSetLength = charSet.length;
		}
		const maxValid = Math.floor(256 / charSetLength) * charSetLength;
		const buf = new Uint8Array(length * 2);
		const bufLength = buf.length;
		let result = "";
		let bufIndex = bufLength;
		let rand;
		while (result.length < length) {
			if (bufIndex >= bufLength) {
				crypto.getRandomValues(buf);
				bufIndex = 0;
			}
			rand = buf[bufIndex++];
			if (rand < maxValid) result += charSet[rand % charSetLength];
		}
		return result;
	};
}
var generateRandomString = createRandomStringGenerator("a-z", "0-9", "A-Z", "-_");
function constantTimeEqual(a, b) {
	if (typeof a === "string") a = new TextEncoder().encode(a);
	if (typeof b === "string") b = new TextEncoder().encode(b);
	const aBuffer = new Uint8Array(a);
	const bBuffer = new Uint8Array(b);
	let c = aBuffer.length ^ bBuffer.length;
	const length = Math.max(aBuffer.length, bBuffer.length);
	for (let i = 0; i < length; i++) c |= (i < aBuffer.length ? aBuffer[i] : 0) ^ (i < bBuffer.length ? bBuffer[i] : 0);
	return c === 0;
}
var config = {
	N: 16384,
	r: 16,
	p: 1,
	dkLen: 64
};
function generateKey(password, salt) {
	return new Promise((resolve, reject) => {
		scrypt(password.normalize("NFKC"), salt, config.dkLen, {
			N: config.N,
			r: config.r,
			p: config.p,
			maxmem: 128 * config.N * config.r * 2
		}, (err, key) => {
			if (err) reject(err);
			else resolve(key);
		});
	});
}
async function hashPassword$2(password) {
	const salt = randomBytes(16).toString("hex");
	return `${salt}:${(await generateKey(password, salt)).toString("hex")}`;
}
async function verifyPassword$3(hash$1, password) {
	const [salt, key] = hash$1.split(":");
	if (!salt || !key) throw new Error("Invalid password hash");
	return (await generateKey(password, salt)).toString("hex") === key;
}
var hashPassword$1 = hashPassword$2;
var verifyPassword$1 = async ({ hash: hash$1, password }) => {
	return verifyPassword$3(hash$1, password);
};
function isBytes(a) {
	return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function abool(b) {
	if (typeof b !== "boolean") throw new Error(`boolean expected, not ${b}`);
}
function anumber(n) {
	if (!Number.isSafeInteger(n) || n < 0) throw new Error("positive integer expected, got " + n);
}
function abytes(value, length, title$1 = "") {
	const bytes = isBytes(value);
	const len = value?.length;
	const needsLen = length !== void 0;
	if (!bytes || needsLen && len !== length) {
		const prefix = title$1 && `"${title$1}" `;
		const ofLen = needsLen ? ` of length ${length}` : "";
		const got = bytes ? `length=${len}` : `type=${typeof value}`;
		throw new Error(prefix + "expected Uint8Array" + ofLen + ", got " + got);
	}
	return value;
}
function aexists(instance, checkFinished = true) {
	if (instance.destroyed) throw new Error("Hash instance has been destroyed");
	if (checkFinished && instance.finished) throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
	abytes(out, void 0, "output");
	const min = instance.outputLen;
	if (out.length < min) throw new Error("digestInto() expects output buffer of length at least " + min);
}
function u32(arr) {
	return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean(...arrays) {
	for (let i = 0; i < arrays.length; i++) arrays[i].fill(0);
}
function createView(arr) {
	return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
const isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
var hasHexBuiltin = /* @__PURE__ */ (() => typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function")();
var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
function bytesToHex(bytes) {
	abytes(bytes);
	if (hasHexBuiltin) return bytes.toHex();
	let hex$1 = "";
	for (let i = 0; i < bytes.length; i++) hex$1 += hexes[bytes[i]];
	return hex$1;
}
var asciis = {
	_0: 48,
	_9: 57,
	A: 65,
	F: 70,
	a: 97,
	f: 102
};
function asciiToBase16(ch) {
	if (ch >= asciis._0 && ch <= asciis._9) return ch - asciis._0;
	if (ch >= asciis.A && ch <= asciis.F) return ch - (asciis.A - 10);
	if (ch >= asciis.a && ch <= asciis.f) return ch - (asciis.a - 10);
}
function hexToBytes(hex$1) {
	if (typeof hex$1 !== "string") throw new Error("hex string expected, got " + typeof hex$1);
	if (hasHexBuiltin) return Uint8Array.fromHex(hex$1);
	const hl = hex$1.length;
	const al = hl / 2;
	if (hl % 2) throw new Error("hex string expected, got unpadded hex of length " + hl);
	const array = new Uint8Array(al);
	for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
		const n1 = asciiToBase16(hex$1.charCodeAt(hi));
		const n2 = asciiToBase16(hex$1.charCodeAt(hi + 1));
		if (n1 === void 0 || n2 === void 0) {
			const char = hex$1[hi] + hex$1[hi + 1];
			throw new Error("hex string expected, got non-hex character \"" + char + "\" at index " + hi);
		}
		array[ai] = n1 * 16 + n2;
	}
	return array;
}
function utf8ToBytes(str) {
	if (typeof str !== "string") throw new Error("string expected");
	return new Uint8Array(new TextEncoder().encode(str));
}
function concatBytes(...arrays) {
	let sum = 0;
	for (let i = 0; i < arrays.length; i++) {
		const a = arrays[i];
		abytes(a);
		sum += a.length;
	}
	const res = new Uint8Array(sum);
	for (let i = 0, pad = 0; i < arrays.length; i++) {
		const a = arrays[i];
		res.set(a, pad);
		pad += a.length;
	}
	return res;
}
function checkOpts(defaults, opts) {
	if (opts == null || typeof opts !== "object") throw new Error("options must be defined");
	return Object.assign(defaults, opts);
}
function equalBytes(a, b) {
	if (a.length !== b.length) return false;
	let diff = 0;
	for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
	return diff === 0;
}
const wrapCipher = (params, constructor) => {
	function wrappedCipher(key, ...args) {
		abytes(key, void 0, "key");
		if (!isLE) throw new Error("Non little-endian hardware is not yet supported");
		if (params.nonceLength !== void 0) {
			const nonce = args[0];
			abytes(nonce, params.varSizeNonce ? void 0 : params.nonceLength, "nonce");
		}
		const tagl = params.tagLength;
		if (tagl && args[1] !== void 0) abytes(args[1], void 0, "AAD");
		const cipher = constructor(key, ...args);
		const checkOutput = (fnLength, output) => {
			if (output !== void 0) {
				if (fnLength !== 2) throw new Error("cipher output not supported");
				abytes(output, void 0, "output");
			}
		};
		let called = false;
		return {
			encrypt(data, output) {
				if (called) throw new Error("cannot encrypt() twice with same key + nonce");
				called = true;
				abytes(data);
				checkOutput(cipher.encrypt.length, output);
				return cipher.encrypt(data, output);
			},
			decrypt(data, output) {
				abytes(data);
				if (tagl && data.length < tagl) throw new Error("\"ciphertext\" expected length bigger than tagLength=" + tagl);
				checkOutput(cipher.decrypt.length, output);
				return cipher.decrypt(data, output);
			}
		};
	}
	Object.assign(wrappedCipher, params);
	return wrappedCipher;
};
function getOutput(expectedLength, out, onlyAligned = true) {
	if (out === void 0) return new Uint8Array(expectedLength);
	if (out.length !== expectedLength) throw new Error("\"output\" expected Uint8Array of length " + expectedLength + ", got: " + out.length);
	if (onlyAligned && !isAligned32$1(out)) throw new Error("invalid output, must be aligned");
	return out;
}
function u64Lengths(dataLength, aadLength, isLE$1) {
	abool(isLE$1);
	const num = new Uint8Array(16);
	const view = createView(num);
	view.setBigUint64(0, BigInt(aadLength), isLE$1);
	view.setBigUint64(8, BigInt(dataLength), isLE$1);
	return num;
}
function isAligned32$1(bytes) {
	return bytes.byteOffset % 4 === 0;
}
function copyBytes(bytes) {
	return Uint8Array.from(bytes);
}
function randomBytes$1(bytesLength = 32) {
	const cr = typeof globalThis === "object" ? globalThis.crypto : null;
	if (typeof cr?.getRandomValues !== "function") throw new Error("crypto.getRandomValues must be defined");
	return cr.getRandomValues(new Uint8Array(bytesLength));
}
function managedNonce(fn, randomBytes_ = randomBytes$1) {
	const { nonceLength } = fn;
	anumber(nonceLength);
	const addNonce = (nonce, ciphertext) => {
		const out = concatBytes(nonce, ciphertext);
		ciphertext.fill(0);
		return out;
	};
	return ((key, ...args) => ({
		encrypt(plaintext) {
			abytes(plaintext);
			const nonce = randomBytes_(nonceLength);
			const encrypted = fn(key, nonce, ...args).encrypt(plaintext);
			if (encrypted instanceof Promise) return encrypted.then((ct) => addNonce(nonce, ct));
			return addNonce(nonce, encrypted);
		},
		decrypt(ciphertext) {
			abytes(ciphertext);
			const nonce = ciphertext.subarray(0, nonceLength);
			const decrypted = ciphertext.subarray(nonceLength);
			return fn(key, nonce, ...args).decrypt(decrypted);
		}
	}));
}
var encodeStr = (str) => Uint8Array.from(str.split(""), (c) => c.charCodeAt(0));
var sigma16 = encodeStr("expand 16-byte k");
var sigma32 = encodeStr("expand 32-byte k");
var sigma16_32 = u32(sigma16);
var sigma32_32 = u32(sigma32);
function rotl(a, b) {
	return a << b | a >>> 32 - b;
}
function isAligned32(b) {
	return b.byteOffset % 4 === 0;
}
var BLOCK_LEN = 64;
var BLOCK_LEN32 = 16;
var MAX_COUNTER = 2 ** 32 - 1;
var U32_EMPTY = Uint32Array.of();
function runCipher(core, sigma, key, nonce, data, output, counter, rounds) {
	const len = data.length;
	const block = new Uint8Array(BLOCK_LEN);
	const b32 = u32(block);
	const isAligned = isAligned32(data) && isAligned32(output);
	const d32 = isAligned ? u32(data) : U32_EMPTY;
	const o32 = isAligned ? u32(output) : U32_EMPTY;
	for (let pos = 0; pos < len; counter++) {
		core(sigma, key, nonce, b32, counter, rounds);
		if (counter >= MAX_COUNTER) throw new Error("arx: counter overflow");
		const take = Math.min(BLOCK_LEN, len - pos);
		if (isAligned && take === BLOCK_LEN) {
			const pos32 = pos / 4;
			if (pos % 4 !== 0) throw new Error("arx: invalid block position");
			for (let j = 0, posj; j < BLOCK_LEN32; j++) {
				posj = pos32 + j;
				o32[posj] = d32[posj] ^ b32[j];
			}
			pos += BLOCK_LEN;
			continue;
		}
		for (let j = 0, posj; j < take; j++) {
			posj = pos + j;
			output[posj] = data[posj] ^ block[j];
		}
		pos += take;
	}
}
function createCipher(core, opts) {
	const { allowShortKeys, extendNonceFn, counterLength, counterRight, rounds } = checkOpts({
		allowShortKeys: false,
		counterLength: 8,
		counterRight: false,
		rounds: 20
	}, opts);
	if (typeof core !== "function") throw new Error("core must be a function");
	anumber(counterLength);
	anumber(rounds);
	abool(counterRight);
	abool(allowShortKeys);
	return (key, nonce, data, output, counter = 0) => {
		abytes(key, void 0, "key");
		abytes(nonce, void 0, "nonce");
		abytes(data, void 0, "data");
		const len = data.length;
		if (output === void 0) output = new Uint8Array(len);
		abytes(output, void 0, "output");
		anumber(counter);
		if (counter < 0 || counter >= MAX_COUNTER) throw new Error("arx: counter overflow");
		if (output.length < len) throw new Error(`arx: output (${output.length}) is shorter than data (${len})`);
		const toClean = [];
		let l = key.length;
		let k;
		let sigma;
		if (l === 32) {
			toClean.push(k = copyBytes(key));
			sigma = sigma32_32;
		} else if (l === 16 && allowShortKeys) {
			k = new Uint8Array(32);
			k.set(key);
			k.set(key, 16);
			sigma = sigma16_32;
			toClean.push(k);
		} else {
			abytes(key, 32, "arx key");
			throw new Error("invalid key size");
		}
		if (!isAligned32(nonce)) toClean.push(nonce = copyBytes(nonce));
		const k32 = u32(k);
		if (extendNonceFn) {
			if (nonce.length !== 24) throw new Error(`arx: extended nonce must be 24 bytes`);
			extendNonceFn(sigma, k32, u32(nonce.subarray(0, 16)), k32);
			nonce = nonce.subarray(16);
		}
		const nonceNcLen = 16 - counterLength;
		if (nonceNcLen !== nonce.length) throw new Error(`arx: nonce must be ${nonceNcLen} or 16 bytes`);
		if (nonceNcLen !== 12) {
			const nc = new Uint8Array(12);
			nc.set(nonce, counterRight ? 0 : 12 - nonce.length);
			nonce = nc;
			toClean.push(nonce);
		}
		const n32 = u32(nonce);
		runCipher(core, sigma, k32, n32, data, output, counter, rounds);
		clean(...toClean);
		return output;
	};
}
function u8to16(a, i) {
	return a[i++] & 255 | (a[i++] & 255) << 8;
}
var Poly1305 = class {
	blockLen = 16;
	outputLen = 16;
	buffer = new Uint8Array(16);
	r = new Uint16Array(10);
	h = new Uint16Array(10);
	pad = new Uint16Array(8);
	pos = 0;
	finished = false;
	constructor(key) {
		key = copyBytes(abytes(key, 32, "key"));
		const t0 = u8to16(key, 0);
		const t1 = u8to16(key, 2);
		const t2 = u8to16(key, 4);
		const t3 = u8to16(key, 6);
		const t4 = u8to16(key, 8);
		const t5 = u8to16(key, 10);
		const t6 = u8to16(key, 12);
		const t7 = u8to16(key, 14);
		this.r[0] = t0 & 8191;
		this.r[1] = (t0 >>> 13 | t1 << 3) & 8191;
		this.r[2] = (t1 >>> 10 | t2 << 6) & 7939;
		this.r[3] = (t2 >>> 7 | t3 << 9) & 8191;
		this.r[4] = (t3 >>> 4 | t4 << 12) & 255;
		this.r[5] = t4 >>> 1 & 8190;
		this.r[6] = (t4 >>> 14 | t5 << 2) & 8191;
		this.r[7] = (t5 >>> 11 | t6 << 5) & 8065;
		this.r[8] = (t6 >>> 8 | t7 << 8) & 8191;
		this.r[9] = t7 >>> 5 & 127;
		for (let i = 0; i < 8; i++) this.pad[i] = u8to16(key, 16 + 2 * i);
	}
	process(data, offset, isLast = false) {
		const hibit = isLast ? 0 : 2048;
		const { h, r } = this;
		const r0 = r[0];
		const r1 = r[1];
		const r2 = r[2];
		const r3 = r[3];
		const r4 = r[4];
		const r5 = r[5];
		const r6 = r[6];
		const r7 = r[7];
		const r8 = r[8];
		const r9 = r[9];
		const t0 = u8to16(data, offset + 0);
		const t1 = u8to16(data, offset + 2);
		const t2 = u8to16(data, offset + 4);
		const t3 = u8to16(data, offset + 6);
		const t4 = u8to16(data, offset + 8);
		const t5 = u8to16(data, offset + 10);
		const t6 = u8to16(data, offset + 12);
		const t7 = u8to16(data, offset + 14);
		let h0 = h[0] + (t0 & 8191);
		let h1 = h[1] + ((t0 >>> 13 | t1 << 3) & 8191);
		let h2 = h[2] + ((t1 >>> 10 | t2 << 6) & 8191);
		let h3 = h[3] + ((t2 >>> 7 | t3 << 9) & 8191);
		let h4 = h[4] + ((t3 >>> 4 | t4 << 12) & 8191);
		let h5 = h[5] + (t4 >>> 1 & 8191);
		let h6 = h[6] + ((t4 >>> 14 | t5 << 2) & 8191);
		let h7 = h[7] + ((t5 >>> 11 | t6 << 5) & 8191);
		let h8 = h[8] + ((t6 >>> 8 | t7 << 8) & 8191);
		let h9 = h[9] + (t7 >>> 5 | hibit);
		let c = 0;
		let d0 = c + h0 * r0 + h1 * (5 * r9) + h2 * (5 * r8) + h3 * (5 * r7) + h4 * (5 * r6);
		c = d0 >>> 13;
		d0 &= 8191;
		d0 += h5 * (5 * r5) + h6 * (5 * r4) + h7 * (5 * r3) + h8 * (5 * r2) + h9 * (5 * r1);
		c += d0 >>> 13;
		d0 &= 8191;
		let d1 = c + h0 * r1 + h1 * r0 + h2 * (5 * r9) + h3 * (5 * r8) + h4 * (5 * r7);
		c = d1 >>> 13;
		d1 &= 8191;
		d1 += h5 * (5 * r6) + h6 * (5 * r5) + h7 * (5 * r4) + h8 * (5 * r3) + h9 * (5 * r2);
		c += d1 >>> 13;
		d1 &= 8191;
		let d2 = c + h0 * r2 + h1 * r1 + h2 * r0 + h3 * (5 * r9) + h4 * (5 * r8);
		c = d2 >>> 13;
		d2 &= 8191;
		d2 += h5 * (5 * r7) + h6 * (5 * r6) + h7 * (5 * r5) + h8 * (5 * r4) + h9 * (5 * r3);
		c += d2 >>> 13;
		d2 &= 8191;
		let d3 = c + h0 * r3 + h1 * r2 + h2 * r1 + h3 * r0 + h4 * (5 * r9);
		c = d3 >>> 13;
		d3 &= 8191;
		d3 += h5 * (5 * r8) + h6 * (5 * r7) + h7 * (5 * r6) + h8 * (5 * r5) + h9 * (5 * r4);
		c += d3 >>> 13;
		d3 &= 8191;
		let d4 = c + h0 * r4 + h1 * r3 + h2 * r2 + h3 * r1 + h4 * r0;
		c = d4 >>> 13;
		d4 &= 8191;
		d4 += h5 * (5 * r9) + h6 * (5 * r8) + h7 * (5 * r7) + h8 * (5 * r6) + h9 * (5 * r5);
		c += d4 >>> 13;
		d4 &= 8191;
		let d5 = c + h0 * r5 + h1 * r4 + h2 * r3 + h3 * r2 + h4 * r1;
		c = d5 >>> 13;
		d5 &= 8191;
		d5 += h5 * r0 + h6 * (5 * r9) + h7 * (5 * r8) + h8 * (5 * r7) + h9 * (5 * r6);
		c += d5 >>> 13;
		d5 &= 8191;
		let d6 = c + h0 * r6 + h1 * r5 + h2 * r4 + h3 * r3 + h4 * r2;
		c = d6 >>> 13;
		d6 &= 8191;
		d6 += h5 * r1 + h6 * r0 + h7 * (5 * r9) + h8 * (5 * r8) + h9 * (5 * r7);
		c += d6 >>> 13;
		d6 &= 8191;
		let d7 = c + h0 * r7 + h1 * r6 + h2 * r5 + h3 * r4 + h4 * r3;
		c = d7 >>> 13;
		d7 &= 8191;
		d7 += h5 * r2 + h6 * r1 + h7 * r0 + h8 * (5 * r9) + h9 * (5 * r8);
		c += d7 >>> 13;
		d7 &= 8191;
		let d8 = c + h0 * r8 + h1 * r7 + h2 * r6 + h3 * r5 + h4 * r4;
		c = d8 >>> 13;
		d8 &= 8191;
		d8 += h5 * r3 + h6 * r2 + h7 * r1 + h8 * r0 + h9 * (5 * r9);
		c += d8 >>> 13;
		d8 &= 8191;
		let d9 = c + h0 * r9 + h1 * r8 + h2 * r7 + h3 * r6 + h4 * r5;
		c = d9 >>> 13;
		d9 &= 8191;
		d9 += h5 * r4 + h6 * r3 + h7 * r2 + h8 * r1 + h9 * r0;
		c += d9 >>> 13;
		d9 &= 8191;
		c = (c << 2) + c | 0;
		c = c + d0 | 0;
		d0 = c & 8191;
		c = c >>> 13;
		d1 += c;
		h[0] = d0;
		h[1] = d1;
		h[2] = d2;
		h[3] = d3;
		h[4] = d4;
		h[5] = d5;
		h[6] = d6;
		h[7] = d7;
		h[8] = d8;
		h[9] = d9;
	}
	finalize() {
		const { h, pad } = this;
		const g = new Uint16Array(10);
		let c = h[1] >>> 13;
		h[1] &= 8191;
		for (let i = 2; i < 10; i++) {
			h[i] += c;
			c = h[i] >>> 13;
			h[i] &= 8191;
		}
		h[0] += c * 5;
		c = h[0] >>> 13;
		h[0] &= 8191;
		h[1] += c;
		c = h[1] >>> 13;
		h[1] &= 8191;
		h[2] += c;
		g[0] = h[0] + 5;
		c = g[0] >>> 13;
		g[0] &= 8191;
		for (let i = 1; i < 10; i++) {
			g[i] = h[i] + c;
			c = g[i] >>> 13;
			g[i] &= 8191;
		}
		g[9] -= 8192;
		let mask = (c ^ 1) - 1;
		for (let i = 0; i < 10; i++) g[i] &= mask;
		mask = ~mask;
		for (let i = 0; i < 10; i++) h[i] = h[i] & mask | g[i];
		h[0] = (h[0] | h[1] << 13) & 65535;
		h[1] = (h[1] >>> 3 | h[2] << 10) & 65535;
		h[2] = (h[2] >>> 6 | h[3] << 7) & 65535;
		h[3] = (h[3] >>> 9 | h[4] << 4) & 65535;
		h[4] = (h[4] >>> 12 | h[5] << 1 | h[6] << 14) & 65535;
		h[5] = (h[6] >>> 2 | h[7] << 11) & 65535;
		h[6] = (h[7] >>> 5 | h[8] << 8) & 65535;
		h[7] = (h[8] >>> 8 | h[9] << 5) & 65535;
		let f = h[0] + pad[0];
		h[0] = f & 65535;
		for (let i = 1; i < 8; i++) {
			f = (h[i] + pad[i] | 0) + (f >>> 16) | 0;
			h[i] = f & 65535;
		}
		clean(g);
	}
	update(data) {
		aexists(this);
		abytes(data);
		data = copyBytes(data);
		const { buffer, blockLen } = this;
		const len = data.length;
		for (let pos = 0; pos < len;) {
			const take = Math.min(blockLen - this.pos, len - pos);
			if (take === blockLen) {
				for (; blockLen <= len - pos; pos += blockLen) this.process(data, pos);
				continue;
			}
			buffer.set(data.subarray(pos, pos + take), this.pos);
			this.pos += take;
			pos += take;
			if (this.pos === blockLen) {
				this.process(buffer, 0, false);
				this.pos = 0;
			}
		}
		return this;
	}
	destroy() {
		clean(this.h, this.r, this.buffer, this.pad);
	}
	digestInto(out) {
		aexists(this);
		aoutput(out, this);
		this.finished = true;
		const { buffer, h } = this;
		let { pos } = this;
		if (pos) {
			buffer[pos++] = 1;
			for (; pos < 16; pos++) buffer[pos] = 0;
			this.process(buffer, 0, true);
		}
		this.finalize();
		let opos = 0;
		for (let i = 0; i < 8; i++) {
			out[opos++] = h[i] >>> 0;
			out[opos++] = h[i] >>> 8;
		}
		return out;
	}
	digest() {
		const { buffer, outputLen } = this;
		this.digestInto(buffer);
		const res = buffer.slice(0, outputLen);
		this.destroy();
		return res;
	}
};
function wrapConstructorWithKey(hashCons) {
	const hashC = (msg, key) => hashCons(key).update(msg).digest();
	const tmp = hashCons(new Uint8Array(32));
	hashC.outputLen = tmp.outputLen;
	hashC.blockLen = tmp.blockLen;
	hashC.create = (key) => hashCons(key);
	return hashC;
}
const poly1305 = (() => wrapConstructorWithKey((key) => new Poly1305(key)))();
function chachaCore(s, k, n, out, cnt, rounds = 20) {
	let y00 = s[0], y01 = s[1], y02 = s[2], y03 = s[3], y04 = k[0], y05 = k[1], y06 = k[2], y07 = k[3], y08 = k[4], y09 = k[5], y10 = k[6], y11 = k[7], y12 = cnt, y13 = n[0], y14 = n[1], y15 = n[2];
	let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
	for (let r = 0; r < rounds; r += 2) {
		x00 = x00 + x04 | 0;
		x12 = rotl(x12 ^ x00, 16);
		x08 = x08 + x12 | 0;
		x04 = rotl(x04 ^ x08, 12);
		x00 = x00 + x04 | 0;
		x12 = rotl(x12 ^ x00, 8);
		x08 = x08 + x12 | 0;
		x04 = rotl(x04 ^ x08, 7);
		x01 = x01 + x05 | 0;
		x13 = rotl(x13 ^ x01, 16);
		x09 = x09 + x13 | 0;
		x05 = rotl(x05 ^ x09, 12);
		x01 = x01 + x05 | 0;
		x13 = rotl(x13 ^ x01, 8);
		x09 = x09 + x13 | 0;
		x05 = rotl(x05 ^ x09, 7);
		x02 = x02 + x06 | 0;
		x14 = rotl(x14 ^ x02, 16);
		x10 = x10 + x14 | 0;
		x06 = rotl(x06 ^ x10, 12);
		x02 = x02 + x06 | 0;
		x14 = rotl(x14 ^ x02, 8);
		x10 = x10 + x14 | 0;
		x06 = rotl(x06 ^ x10, 7);
		x03 = x03 + x07 | 0;
		x15 = rotl(x15 ^ x03, 16);
		x11 = x11 + x15 | 0;
		x07 = rotl(x07 ^ x11, 12);
		x03 = x03 + x07 | 0;
		x15 = rotl(x15 ^ x03, 8);
		x11 = x11 + x15 | 0;
		x07 = rotl(x07 ^ x11, 7);
		x00 = x00 + x05 | 0;
		x15 = rotl(x15 ^ x00, 16);
		x10 = x10 + x15 | 0;
		x05 = rotl(x05 ^ x10, 12);
		x00 = x00 + x05 | 0;
		x15 = rotl(x15 ^ x00, 8);
		x10 = x10 + x15 | 0;
		x05 = rotl(x05 ^ x10, 7);
		x01 = x01 + x06 | 0;
		x12 = rotl(x12 ^ x01, 16);
		x11 = x11 + x12 | 0;
		x06 = rotl(x06 ^ x11, 12);
		x01 = x01 + x06 | 0;
		x12 = rotl(x12 ^ x01, 8);
		x11 = x11 + x12 | 0;
		x06 = rotl(x06 ^ x11, 7);
		x02 = x02 + x07 | 0;
		x13 = rotl(x13 ^ x02, 16);
		x08 = x08 + x13 | 0;
		x07 = rotl(x07 ^ x08, 12);
		x02 = x02 + x07 | 0;
		x13 = rotl(x13 ^ x02, 8);
		x08 = x08 + x13 | 0;
		x07 = rotl(x07 ^ x08, 7);
		x03 = x03 + x04 | 0;
		x14 = rotl(x14 ^ x03, 16);
		x09 = x09 + x14 | 0;
		x04 = rotl(x04 ^ x09, 12);
		x03 = x03 + x04 | 0;
		x14 = rotl(x14 ^ x03, 8);
		x09 = x09 + x14 | 0;
		x04 = rotl(x04 ^ x09, 7);
	}
	let oi = 0;
	out[oi++] = y00 + x00 | 0;
	out[oi++] = y01 + x01 | 0;
	out[oi++] = y02 + x02 | 0;
	out[oi++] = y03 + x03 | 0;
	out[oi++] = y04 + x04 | 0;
	out[oi++] = y05 + x05 | 0;
	out[oi++] = y06 + x06 | 0;
	out[oi++] = y07 + x07 | 0;
	out[oi++] = y08 + x08 | 0;
	out[oi++] = y09 + x09 | 0;
	out[oi++] = y10 + x10 | 0;
	out[oi++] = y11 + x11 | 0;
	out[oi++] = y12 + x12 | 0;
	out[oi++] = y13 + x13 | 0;
	out[oi++] = y14 + x14 | 0;
	out[oi++] = y15 + x15 | 0;
}
function hchacha(s, k, i, out) {
	let x00 = s[0], x01 = s[1], x02 = s[2], x03 = s[3], x04 = k[0], x05 = k[1], x06 = k[2], x07 = k[3], x08 = k[4], x09 = k[5], x10 = k[6], x11 = k[7], x12 = i[0], x13 = i[1], x14 = i[2], x15 = i[3];
	for (let r = 0; r < 20; r += 2) {
		x00 = x00 + x04 | 0;
		x12 = rotl(x12 ^ x00, 16);
		x08 = x08 + x12 | 0;
		x04 = rotl(x04 ^ x08, 12);
		x00 = x00 + x04 | 0;
		x12 = rotl(x12 ^ x00, 8);
		x08 = x08 + x12 | 0;
		x04 = rotl(x04 ^ x08, 7);
		x01 = x01 + x05 | 0;
		x13 = rotl(x13 ^ x01, 16);
		x09 = x09 + x13 | 0;
		x05 = rotl(x05 ^ x09, 12);
		x01 = x01 + x05 | 0;
		x13 = rotl(x13 ^ x01, 8);
		x09 = x09 + x13 | 0;
		x05 = rotl(x05 ^ x09, 7);
		x02 = x02 + x06 | 0;
		x14 = rotl(x14 ^ x02, 16);
		x10 = x10 + x14 | 0;
		x06 = rotl(x06 ^ x10, 12);
		x02 = x02 + x06 | 0;
		x14 = rotl(x14 ^ x02, 8);
		x10 = x10 + x14 | 0;
		x06 = rotl(x06 ^ x10, 7);
		x03 = x03 + x07 | 0;
		x15 = rotl(x15 ^ x03, 16);
		x11 = x11 + x15 | 0;
		x07 = rotl(x07 ^ x11, 12);
		x03 = x03 + x07 | 0;
		x15 = rotl(x15 ^ x03, 8);
		x11 = x11 + x15 | 0;
		x07 = rotl(x07 ^ x11, 7);
		x00 = x00 + x05 | 0;
		x15 = rotl(x15 ^ x00, 16);
		x10 = x10 + x15 | 0;
		x05 = rotl(x05 ^ x10, 12);
		x00 = x00 + x05 | 0;
		x15 = rotl(x15 ^ x00, 8);
		x10 = x10 + x15 | 0;
		x05 = rotl(x05 ^ x10, 7);
		x01 = x01 + x06 | 0;
		x12 = rotl(x12 ^ x01, 16);
		x11 = x11 + x12 | 0;
		x06 = rotl(x06 ^ x11, 12);
		x01 = x01 + x06 | 0;
		x12 = rotl(x12 ^ x01, 8);
		x11 = x11 + x12 | 0;
		x06 = rotl(x06 ^ x11, 7);
		x02 = x02 + x07 | 0;
		x13 = rotl(x13 ^ x02, 16);
		x08 = x08 + x13 | 0;
		x07 = rotl(x07 ^ x08, 12);
		x02 = x02 + x07 | 0;
		x13 = rotl(x13 ^ x02, 8);
		x08 = x08 + x13 | 0;
		x07 = rotl(x07 ^ x08, 7);
		x03 = x03 + x04 | 0;
		x14 = rotl(x14 ^ x03, 16);
		x09 = x09 + x14 | 0;
		x04 = rotl(x04 ^ x09, 12);
		x03 = x03 + x04 | 0;
		x14 = rotl(x14 ^ x03, 8);
		x09 = x09 + x14 | 0;
		x04 = rotl(x04 ^ x09, 7);
	}
	let oi = 0;
	out[oi++] = x00;
	out[oi++] = x01;
	out[oi++] = x02;
	out[oi++] = x03;
	out[oi++] = x12;
	out[oi++] = x13;
	out[oi++] = x14;
	out[oi++] = x15;
}
const chacha20 = /* @__PURE__ */ createCipher(chachaCore, {
	counterRight: false,
	counterLength: 4,
	allowShortKeys: false
});
const xchacha20 = /* @__PURE__ */ createCipher(chachaCore, {
	counterRight: false,
	counterLength: 8,
	extendNonceFn: hchacha,
	allowShortKeys: false
});
var ZEROS16 = /* @__PURE__ */ new Uint8Array(16);
var updatePadded = (h, msg) => {
	h.update(msg);
	const leftover = msg.length % 16;
	if (leftover) h.update(ZEROS16.subarray(leftover));
};
var ZEROS32 = /* @__PURE__ */ new Uint8Array(32);
function computeTag(fn, key, nonce, ciphertext, AAD) {
	if (AAD !== void 0) abytes(AAD, void 0, "AAD");
	const authKey = fn(key, nonce, ZEROS32);
	const lengths = u64Lengths(ciphertext.length, AAD ? AAD.length : 0, true);
	const h = poly1305.create(authKey);
	if (AAD) updatePadded(h, AAD);
	updatePadded(h, ciphertext);
	h.update(lengths);
	const res = h.digest();
	clean(authKey, lengths);
	return res;
}
const _poly1305_aead = (xorStream) => (key, nonce, AAD) => {
	const tagLength = 16;
	return {
		encrypt(plaintext, output) {
			const plength = plaintext.length;
			output = getOutput(plength + tagLength, output, false);
			output.set(plaintext);
			const oPlain = output.subarray(0, -tagLength);
			xorStream(key, nonce, oPlain, oPlain, 1);
			const tag$1 = computeTag(xorStream, key, nonce, oPlain, AAD);
			output.set(tag$1, plength);
			clean(tag$1);
			return output;
		},
		decrypt(ciphertext, output) {
			output = getOutput(ciphertext.length - tagLength, output, false);
			const data = ciphertext.subarray(0, -tagLength);
			const passedTag = ciphertext.subarray(-tagLength);
			const tag$1 = computeTag(xorStream, key, nonce, data, AAD);
			if (!equalBytes(passedTag, tag$1)) throw new Error("invalid tag");
			output.set(ciphertext.subarray(0, -tagLength));
			xorStream(key, nonce, output, output, 1);
			clean(tag$1);
			return output;
		}
	};
};
_poly1305_aead(chacha20);
const xchacha20poly1305 = /* @__PURE__ */ wrapCipher({
	blockSize: 64,
	nonceLength: 24,
	tagLength: 16
}, _poly1305_aead(xchacha20));
var ENVELOPE_PREFIX = "$ba$";
function parseEnvelope(data) {
	if (!data.startsWith(ENVELOPE_PREFIX)) return null;
	const firstSep = 4;
	const secondSep = data.indexOf("$", firstSep);
	if (secondSep === -1) return null;
	const version = parseInt(data.slice(firstSep, secondSep), 10);
	if (!Number.isInteger(version) || version < 0) return null;
	return {
		version,
		ciphertext: data.slice(secondSep + 1)
	};
}
function formatEnvelope(version, ciphertext) {
	return `${ENVELOPE_PREFIX}${version}$${ciphertext}`;
}
async function rawEncrypt(secret, data) {
	const keyAsBytes = await createHash$1("SHA-256").digest(secret);
	const dataAsBytes = utf8ToBytes(data);
	return bytesToHex(managedNonce(xchacha20poly1305)(new Uint8Array(keyAsBytes)).encrypt(dataAsBytes));
}
async function rawDecrypt(secret, hex$1) {
	const keyAsBytes = await createHash$1("SHA-256").digest(secret);
	const dataAsBytes = hexToBytes(hex$1);
	const chacha = managedNonce(xchacha20poly1305)(new Uint8Array(keyAsBytes));
	return new TextDecoder().decode(chacha.decrypt(dataAsBytes));
}
var symmetricEncrypt = async ({ key, data }) => {
	if (typeof key === "string") return rawEncrypt(key, data);
	const secret = key.keys.get(key.currentVersion);
	if (!secret) throw new Error(`Secret version ${key.currentVersion} not found in keys`);
	const ciphertext = await rawEncrypt(secret, data);
	return formatEnvelope(key.currentVersion, ciphertext);
};
var symmetricDecrypt = async ({ key, data }) => {
	if (typeof key === "string") return rawDecrypt(key, data);
	const envelope = parseEnvelope(data);
	if (envelope) {
		const secret = key.keys.get(envelope.version);
		if (!secret) throw new Error(`Secret version ${envelope.version} not found in keys (key may have been retired)`);
		return rawDecrypt(secret, envelope.ciphertext);
	}
	if (key.legacySecret) return rawDecrypt(key.legacySecret, data);
	throw new Error("Cannot decrypt legacy bare-hex payload: no legacy secret available. Set BETTER_AUTH_SECRET for backwards compatibility.");
};
var stateDataSchema = z$2.looseObject({
	callbackURL: z$2.string(),
	codeVerifier: z$2.string(),
	errorURL: z$2.string().optional(),
	newUserURL: z$2.string().optional(),
	expiresAt: z$2.number(),
	oauthState: z$2.string().optional(),
	link: z$2.object({
		email: z$2.string(),
		userId: z$2.coerce.string()
	}).optional(),
	requestSignUp: z$2.boolean().optional()
});
var StateError = class extends BetterAuthError {
	code;
	details;
	constructor(message$1, options) {
		super(message$1, options);
		this.code = options.code;
		this.details = options.details;
	}
};
async function generateGenericState(c, stateData, settings) {
	const state = generateRandomString(32);
	if (c.context.oauthConfig.storeStateStrategy === "cookie") {
		const payload = {
			...stateData,
			oauthState: state
		};
		const encryptedData = await symmetricEncrypt({
			key: c.context.secretConfig,
			data: JSON.stringify(payload)
		});
		const stateCookie$1 = c.context.createAuthCookie(settings?.cookieName ?? "oauth_state", { maxAge: 600 });
		c.setCookie(stateCookie$1.name, encryptedData, stateCookie$1.attributes);
		return {
			state,
			codeVerifier: stateData.codeVerifier
		};
	}
	const stateCookie = c.context.createAuthCookie(settings?.cookieName ?? "state", { maxAge: 300 });
	await c.setSignedCookie(stateCookie.name, state, c.context.secret, stateCookie.attributes);
	const expiresAt = /* @__PURE__ */ new Date();
	expiresAt.setMinutes(expiresAt.getMinutes() + 10);
	if (!await c.context.internalAdapter.createVerificationValue({
		value: JSON.stringify({
			...stateData,
			oauthState: state
		}),
		identifier: state,
		expiresAt
	})) throw new StateError("Unable to create verification. Make sure the database adapter is properly working and there is a verification table in the database", { code: "state_generation_error" });
	return {
		state,
		codeVerifier: stateData.codeVerifier
	};
}
async function parseGenericState(c, state, settings) {
	const storeStateStrategy = c.context.oauthConfig.storeStateStrategy;
	let parsedData;
	if (storeStateStrategy === "cookie") {
		const stateCookie = c.context.createAuthCookie(settings?.cookieName ?? "oauth_state");
		const encryptedData = c.getCookie(stateCookie.name);
		if (!encryptedData) throw new StateError("State mismatch: auth state cookie not found", {
			code: "state_mismatch",
			details: { state }
		});
		try {
			const decryptedData = await symmetricDecrypt({
				key: c.context.secretConfig,
				data: encryptedData
			});
			parsedData = stateDataSchema.parse(JSON.parse(decryptedData));
		} catch (error$1) {
			throw new StateError("State invalid: Failed to decrypt or parse auth state", {
				code: "state_invalid",
				details: { state },
				cause: error$1
			});
		}
		if (!parsedData.oauthState || parsedData.oauthState !== state) throw new StateError("State mismatch: OAuth state parameter does not match stored state", {
			code: "state_security_mismatch",
			details: { state }
		});
		expireCookie(c, stateCookie);
	} else {
		const data = await c.context.internalAdapter.findVerificationValue(state);
		if (!data) throw new StateError("State mismatch: verification not found", {
			code: "state_mismatch",
			details: { state }
		});
		parsedData = stateDataSchema.parse(JSON.parse(data.value));
		if (parsedData.oauthState !== void 0 && parsedData.oauthState !== state) throw new StateError("State mismatch: OAuth state parameter does not match stored state", {
			code: "state_security_mismatch",
			details: { state }
		});
		const stateCookie = c.context.createAuthCookie(settings?.cookieName ?? "state");
		const stateCookieValue = await c.getSignedCookie(stateCookie.name, c.context.secret);
		if (!(settings?.skipStateCookieCheck ?? c.context.oauthConfig.skipStateCookieCheck) && (!stateCookieValue || stateCookieValue !== state)) throw new StateError("State mismatch: State not persisted correctly", {
			code: "state_security_mismatch",
			details: { state }
		});
		expireCookie(c, stateCookie);
		await c.context.internalAdapter.deleteVerificationByIdentifier(state);
	}
	if (parsedData.expiresAt < Date.now()) throw new StateError("Invalid state: request expired", {
		code: "state_mismatch",
		details: { expiresAt: parsedData.expiresAt }
	});
	return parsedData;
}
async function generateState(c, link, additionalData) {
	const callbackURL = c.body?.callbackURL || c.context.options.baseURL;
	if (!callbackURL) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.CALLBACK_URL_REQUIRED);
	const codeVerifier = generateRandomString(128);
	const stateData = {
		...additionalData ? additionalData : {},
		callbackURL,
		codeVerifier,
		errorURL: c.body?.errorCallbackURL,
		newUserURL: c.body?.newUserCallbackURL,
		link,
		expiresAt: Date.now() + 600 * 1e3,
		requestSignUp: c.body?.requestSignUp
	};
	await setOAuthState(stateData);
	try {
		return generateGenericState(c, stateData);
	} catch (error$1) {
		c.context.logger.error("Failed to create verification", error$1);
		throw new APIError("INTERNAL_SERVER_ERROR", {
			message: "Unable to create verification",
			cause: error$1
		});
	}
}
async function parseState(c) {
	const state = c.query.state || c.body?.state;
	const errorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
	let parsedData;
	try {
		parsedData = await parseGenericState(c, state);
	} catch (error$1) {
		c.context.logger.error("Failed to parse state", error$1);
		if (error$1 instanceof StateError && error$1.code === "state_security_mismatch") throw c.redirect(`${errorURL}?error=state_mismatch`);
		throw c.redirect(`${errorURL}?error=please_restart_the_process`);
	}
	if (!parsedData.errorURL) parsedData.errorURL = errorURL;
	if (parsedData) await setOAuthState(parsedData);
	return parsedData;
}
function isLikelyEncrypted(token) {
	if (token.startsWith("$ba$")) return true;
	return token.length % 2 === 0 && /^[0-9a-f]+$/i.test(token);
}
function decryptOAuthToken(token, ctx) {
	if (!token) return token;
	if (ctx.options.account?.encryptOAuthTokens) {
		if (!isLikelyEncrypted(token)) return token;
		return symmetricDecrypt({
			key: ctx.secretConfig,
			data: token
		});
	}
	return token;
}
function setTokenUtil(token, ctx) {
	if (ctx.options.account?.encryptOAuthTokens && token) return symmetricEncrypt({
		key: ctx.secretConfig,
		data: token
	});
	return token;
}
var listUserAccounts = createAuthEndpoint("/list-accounts", {
	method: "GET",
	use: [sessionMiddleware],
	metadata: { openapi: {
		operationId: "listUserAccounts",
		description: "List all accounts linked to the user",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "array",
				items: {
					type: "object",
					properties: {
						id: { type: "string" },
						providerId: { type: "string" },
						createdAt: {
							type: "string",
							format: "date-time"
						},
						updatedAt: {
							type: "string",
							format: "date-time"
						},
						accountId: { type: "string" },
						userId: { type: "string" },
						scopes: {
							type: "array",
							items: { type: "string" }
						}
					},
					required: [
						"id",
						"providerId",
						"createdAt",
						"updatedAt",
						"accountId",
						"userId",
						"scopes"
					]
				}
			} } }
		} }
	} }
}, async (c) => {
	const session$1 = c.context.session;
	const accounts = await c.context.internalAdapter.findAccounts(session$1.user.id);
	return c.json(accounts.map((a) => {
		const { scope, ...parsed } = parseAccountOutput(c.context.options, a);
		return {
			...parsed,
			scopes: scope?.split(",") || []
		};
	}));
});
var linkSocialAccount = createAuthEndpoint("/link-social", {
	method: "POST",
	requireHeaders: true,
	body: z$2.object({
		callbackURL: z$2.string().meta({ description: "The URL to redirect to after the user has signed in" }).optional(),
		provider: SocialProviderListEnum,
		idToken: z$2.object({
			token: z$2.string(),
			nonce: z$2.string().optional(),
			accessToken: z$2.string().optional(),
			refreshToken: z$2.string().optional(),
			scopes: z$2.array(z$2.string()).optional()
		}).optional(),
		requestSignUp: z$2.boolean().optional(),
		scopes: z$2.array(z$2.string()).meta({ description: "Additional scopes to request from the provider" }).optional(),
		errorCallbackURL: z$2.string().meta({ description: "The URL to redirect to if there is an error during the link process" }).optional(),
		disableRedirect: z$2.boolean().meta({ description: "Disable automatic redirection to the provider. Useful for handling the redirection yourself" }).optional(),
		additionalData: z$2.record(z$2.string(), z$2.any()).optional()
	}),
	use: [sessionMiddleware],
	metadata: { openapi: {
		description: "Link a social account to the user",
		operationId: "linkSocialAccount",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					url: {
						type: "string",
						description: "The authorization URL to redirect the user to"
					},
					redirect: {
						type: "boolean",
						description: "Indicates if the user should be redirected to the authorization URL"
					},
					status: { type: "boolean" }
				},
				required: ["redirect"]
			} } }
		} }
	} }
}, async (c) => {
	const session$1 = c.context.session;
	const provider = await getAwaitableValue(c.context.socialProviders, { value: c.body.provider });
	if (!provider) {
		c.context.logger.error("Provider not found. Make sure to add the provider in your auth config", { provider: c.body.provider });
		throw APIError.from("NOT_FOUND", BASE_ERROR_CODES.PROVIDER_NOT_FOUND);
	}
	if (c.body.idToken) {
		if (!provider.verifyIdToken) {
			c.context.logger.error("Provider does not support id token verification", { provider: c.body.provider });
			throw APIError.from("NOT_FOUND", BASE_ERROR_CODES.ID_TOKEN_NOT_SUPPORTED);
		}
		const { token, nonce } = c.body.idToken;
		if (!await provider.verifyIdToken(token, nonce)) {
			c.context.logger.error("Invalid id token", { provider: c.body.provider });
			throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.INVALID_TOKEN);
		}
		const linkingUserInfo = await provider.getUserInfo({
			idToken: token,
			accessToken: c.body.idToken.accessToken,
			refreshToken: c.body.idToken.refreshToken
		});
		if (!linkingUserInfo || !linkingUserInfo?.user) {
			c.context.logger.error("Failed to get user info", { provider: c.body.provider });
			throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.FAILED_TO_GET_USER_INFO);
		}
		const linkingUserId = String(linkingUserInfo.user.id);
		if (!linkingUserInfo.user.email) {
			c.context.logger.error(missingEmailLogMessage(c.body.provider, { source: "id_token" }), { provider: c.body.provider });
			throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.USER_EMAIL_NOT_FOUND);
		}
		if ((await c.context.internalAdapter.findAccounts(session$1.user.id)).find((a) => a.providerId === provider.id && a.accountId === linkingUserId)) return c.json({
			url: "",
			status: true,
			redirect: false
		});
		if (!c.context.trustedProviders.includes(provider.id) && !linkingUserInfo.user.emailVerified || c.context.options.account?.accountLinking?.enabled === false) throw APIError.from("UNAUTHORIZED", {
			message: "Account not linked - linking not allowed",
			code: "LINKING_NOT_ALLOWED"
		});
		if (linkingUserInfo.user.email?.toLowerCase() !== session$1.user.email.toLowerCase() && c.context.options.account?.accountLinking?.allowDifferentEmails !== true) throw APIError.from("UNAUTHORIZED", {
			message: "Account not linked - different emails not allowed",
			code: "LINKING_DIFFERENT_EMAILS_NOT_ALLOWED"
		});
		try {
			await c.context.internalAdapter.createAccount({
				userId: session$1.user.id,
				providerId: provider.id,
				accountId: linkingUserId,
				accessToken: c.body.idToken.accessToken,
				idToken: token,
				refreshToken: c.body.idToken.refreshToken,
				scope: c.body.idToken.scopes?.join(",")
			});
		} catch (_e) {
			throw APIError.from("EXPECTATION_FAILED", {
				message: "Account not linked - unable to create account",
				code: "LINKING_FAILED"
			});
		}
		if (c.context.options.account?.accountLinking?.updateUserInfoOnLink === true) try {
			await c.context.internalAdapter.updateUser(session$1.user.id, {
				name: linkingUserInfo.user?.name,
				image: linkingUserInfo.user?.image
			});
		} catch (e) {
			console.warn("Could not update user - " + e.toString());
		}
		return c.json({
			url: "",
			status: true,
			redirect: false
		});
	}
	const state = await generateState(c, {
		userId: session$1.user.id,
		email: session$1.user.email
	}, c.body.additionalData);
	const url = await provider.createAuthorizationURL({
		state: state.state,
		codeVerifier: state.codeVerifier,
		redirectURI: `${c.context.baseURL}/callback/${provider.id}`,
		scopes: c.body.scopes
	});
	if (!c.body.disableRedirect) c.setHeader("Location", url.toString());
	return c.json({
		url: url.toString(),
		redirect: !c.body.disableRedirect
	});
});
var unlinkAccount = createAuthEndpoint("/unlink-account", {
	method: "POST",
	body: z$2.object({
		providerId: z$2.string(),
		accountId: z$2.string().optional()
	}),
	use: [freshSessionMiddleware],
	metadata: { openapi: {
		description: "Unlink an account",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { status: { type: "boolean" } }
			} } }
		} }
	} }
}, async (ctx) => {
	const { providerId, accountId } = ctx.body;
	const accounts = await ctx.context.internalAdapter.findAccounts(ctx.context.session.user.id);
	if (accounts.length === 1 && !ctx.context.options.account?.accountLinking?.allowUnlinkingAll) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.FAILED_TO_UNLINK_LAST_ACCOUNT);
	const accountExist = accounts.find((account$1) => accountId ? account$1.accountId === accountId && account$1.providerId === providerId : account$1.providerId === providerId);
	if (!accountExist) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.ACCOUNT_NOT_FOUND);
	await ctx.context.internalAdapter.deleteAccount(accountExist.id);
	return ctx.json({ status: true });
});
var getAccessToken = createAuthEndpoint("/get-access-token", {
	method: "POST",
	body: z$2.object({
		providerId: z$2.string().meta({ description: "The provider ID for the OAuth provider" }),
		accountId: z$2.string().meta({ description: "The account ID associated with the refresh token" }).optional(),
		userId: z$2.string().meta({ description: "The user ID associated with the account" }).optional()
	}),
	metadata: { openapi: {
		description: "Get a valid access token, doing a refresh if needed",
		responses: {
			200: {
				description: "A Valid access token",
				content: { "application/json": { schema: {
					type: "object",
					properties: {
						tokenType: { type: "string" },
						idToken: { type: "string" },
						accessToken: { type: "string" },
						accessTokenExpiresAt: {
							type: "string",
							format: "date-time"
						}
					}
				} } }
			},
			400: { description: "Invalid refresh token or provider configuration" }
		}
	} }
}, async (ctx) => {
	const { providerId, accountId, userId } = ctx.body || {};
	const req = ctx.request;
	const session$1 = await getSessionFromCtx(ctx);
	if (req && !session$1) throw ctx.error("UNAUTHORIZED");
	const resolvedUserId = session$1?.user?.id || userId;
	if (!resolvedUserId) throw ctx.error("UNAUTHORIZED");
	const provider = await getAwaitableValue(ctx.context.socialProviders, { value: providerId });
	if (!provider) throw APIError.from("BAD_REQUEST", {
		message: `Provider ${providerId} is not supported.`,
		code: "PROVIDER_NOT_SUPPORTED"
	});
	const accountData = await getAccountCookie(ctx);
	let account$1 = void 0;
	if (accountData && accountData.userId === resolvedUserId && providerId === accountData.providerId && (!accountId || accountData.accountId === accountId)) account$1 = accountData;
	else account$1 = (await ctx.context.internalAdapter.findAccounts(resolvedUserId)).find((acc) => accountId ? acc.accountId === accountId && acc.providerId === providerId : acc.providerId === providerId);
	if (!account$1) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.ACCOUNT_NOT_FOUND);
	try {
		let newTokens = null;
		const accessTokenExpired = account$1.accessTokenExpiresAt && new Date(account$1.accessTokenExpiresAt).getTime() - Date.now() < 5e3;
		if (account$1.refreshToken && accessTokenExpired && provider.refreshAccessToken) {
			const refreshToken$1 = await decryptOAuthToken(account$1.refreshToken, ctx.context);
			newTokens = await provider.refreshAccessToken(refreshToken$1);
			const updatedData = {
				accessToken: await setTokenUtil(newTokens?.accessToken, ctx.context),
				accessTokenExpiresAt: newTokens?.accessTokenExpiresAt,
				refreshToken: newTokens?.refreshToken ? await setTokenUtil(newTokens.refreshToken, ctx.context) : account$1.refreshToken,
				refreshTokenExpiresAt: newTokens?.refreshTokenExpiresAt ?? account$1.refreshTokenExpiresAt,
				idToken: newTokens?.idToken || account$1.idToken
			};
			let updatedAccount = null;
			if (account$1.id) updatedAccount = await ctx.context.internalAdapter.updateAccount(account$1.id, updatedData);
			if (ctx.context.options.account?.storeAccountCookie) await setAccountCookie(ctx, {
				...account$1,
				...updatedAccount ?? updatedData
			});
		}
		const accessTokenExpiresAt = (() => {
			if (newTokens?.accessTokenExpiresAt) {
				if (typeof newTokens.accessTokenExpiresAt === "string") return new Date(newTokens.accessTokenExpiresAt);
				return newTokens.accessTokenExpiresAt;
			}
			if (account$1.accessTokenExpiresAt) {
				if (typeof account$1.accessTokenExpiresAt === "string") return new Date(account$1.accessTokenExpiresAt);
				return account$1.accessTokenExpiresAt;
			}
		})();
		const tokens = {
			accessToken: newTokens?.accessToken ?? await decryptOAuthToken(account$1.accessToken ?? "", ctx.context),
			accessTokenExpiresAt,
			scopes: account$1.scope?.split(",") ?? [],
			idToken: newTokens?.idToken ?? account$1.idToken ?? void 0
		};
		return ctx.json(tokens);
	} catch (_error) {
		throw APIError.from("BAD_REQUEST", {
			message: "Failed to get a valid access token",
			code: "FAILED_TO_GET_ACCESS_TOKEN"
		});
	}
});
var refreshToken = createAuthEndpoint("/refresh-token", {
	method: "POST",
	body: z$2.object({
		providerId: z$2.string().meta({ description: "The provider ID for the OAuth provider" }),
		accountId: z$2.string().meta({ description: "The account ID associated with the refresh token" }).optional(),
		userId: z$2.string().meta({ description: "The user ID associated with the account" }).optional()
	}),
	metadata: { openapi: {
		description: "Refresh the access token using a refresh token",
		responses: {
			200: {
				description: "Access token refreshed successfully",
				content: { "application/json": { schema: {
					type: "object",
					properties: {
						tokenType: { type: "string" },
						idToken: { type: "string" },
						accessToken: { type: "string" },
						refreshToken: { type: "string" },
						accessTokenExpiresAt: {
							type: "string",
							format: "date-time"
						},
						refreshTokenExpiresAt: {
							type: "string",
							format: "date-time"
						}
					}
				} } }
			},
			400: { description: "Invalid refresh token or provider configuration" }
		}
	} }
}, async (ctx) => {
	const { providerId, accountId, userId } = ctx.body;
	const req = ctx.request;
	const session$1 = await getSessionFromCtx(ctx);
	if (req && !session$1) throw ctx.error("UNAUTHORIZED");
	const resolvedUserId = session$1?.user?.id || userId;
	if (!resolvedUserId) throw APIError.from("BAD_REQUEST", {
		message: `Either userId or session is required`,
		code: "USER_ID_OR_SESSION_REQUIRED"
	});
	const provider = await getAwaitableValue(ctx.context.socialProviders, { value: providerId });
	if (!provider) throw APIError.from("BAD_REQUEST", {
		message: `Provider ${providerId} is not supported.`,
		code: "PROVIDER_NOT_SUPPORTED"
	});
	if (!provider.refreshAccessToken) throw APIError.from("BAD_REQUEST", {
		message: `Provider ${providerId} does not support token refreshing.`,
		code: "TOKEN_REFRESH_NOT_SUPPORTED"
	});
	let account$1 = void 0;
	const accountData = await getAccountCookie(ctx);
	if (accountData && accountData.userId === resolvedUserId && (!providerId || providerId === accountData?.providerId)) account$1 = accountData;
	else account$1 = (await ctx.context.internalAdapter.findAccounts(resolvedUserId)).find((acc) => accountId ? acc.accountId === accountId && acc.providerId === providerId : acc.providerId === providerId);
	if (!account$1) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.ACCOUNT_NOT_FOUND);
	let refreshToken$1 = void 0;
	if (accountData && providerId === accountData.providerId) refreshToken$1 = accountData.refreshToken ?? void 0;
	else refreshToken$1 = account$1.refreshToken ?? void 0;
	if (!refreshToken$1) throw APIError.from("BAD_REQUEST", {
		message: "Refresh token not found",
		code: "REFRESH_TOKEN_NOT_FOUND"
	});
	try {
		const decryptedRefreshToken = await decryptOAuthToken(refreshToken$1, ctx.context);
		const tokens = await provider.refreshAccessToken(decryptedRefreshToken);
		const resolvedRefreshToken = tokens.refreshToken ? await setTokenUtil(tokens.refreshToken, ctx.context) : refreshToken$1;
		const resolvedRefreshTokenExpiresAt = tokens.refreshTokenExpiresAt ?? account$1.refreshTokenExpiresAt;
		if (account$1.id) {
			const updateData = {
				...account$1 || {},
				accessToken: await setTokenUtil(tokens.accessToken, ctx.context),
				refreshToken: resolvedRefreshToken,
				accessTokenExpiresAt: tokens.accessTokenExpiresAt,
				refreshTokenExpiresAt: resolvedRefreshTokenExpiresAt,
				scope: tokens.scopes?.join(",") || account$1.scope,
				idToken: tokens.idToken || account$1.idToken
			};
			await ctx.context.internalAdapter.updateAccount(account$1.id, updateData);
		}
		if (accountData && providerId === accountData.providerId && ctx.context.options.account?.storeAccountCookie) await setAccountCookie(ctx, {
			...accountData,
			accessToken: await setTokenUtil(tokens.accessToken, ctx.context),
			refreshToken: resolvedRefreshToken,
			accessTokenExpiresAt: tokens.accessTokenExpiresAt,
			refreshTokenExpiresAt: resolvedRefreshTokenExpiresAt,
			scope: tokens.scopes?.join(",") || accountData.scope,
			idToken: tokens.idToken || accountData.idToken
		});
		return ctx.json({
			accessToken: tokens.accessToken,
			refreshToken: tokens.refreshToken ?? decryptedRefreshToken,
			accessTokenExpiresAt: tokens.accessTokenExpiresAt,
			refreshTokenExpiresAt: resolvedRefreshTokenExpiresAt,
			scope: tokens.scopes?.join(",") || account$1.scope,
			idToken: tokens.idToken || account$1.idToken,
			providerId: account$1.providerId,
			accountId: account$1.accountId
		});
	} catch (_error) {
		throw APIError.from("BAD_REQUEST", {
			message: "Failed to refresh access token",
			code: "FAILED_TO_REFRESH_ACCESS_TOKEN"
		});
	}
});
var accountInfoQuerySchema = z$2.optional(z$2.object({ accountId: z$2.string().meta({ description: "The provider given account id for which to get the account info" }).optional() }));
var accountInfo = createAuthEndpoint("/account-info", {
	method: "GET",
	use: [sessionMiddleware],
	metadata: { openapi: {
		description: "Get the account info provided by the provider",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					user: {
						type: "object",
						properties: {
							id: { type: "string" },
							name: { type: "string" },
							email: { type: "string" },
							image: { type: "string" },
							emailVerified: { type: "boolean" }
						},
						required: ["id", "emailVerified"]
					},
					data: {
						type: "object",
						properties: {},
						additionalProperties: true
					}
				},
				required: ["user", "data"],
				additionalProperties: false
			} } }
		} }
	} },
	query: accountInfoQuerySchema
}, async (ctx) => {
	const providedAccountId = ctx.query?.accountId;
	let account$1 = void 0;
	if (!providedAccountId) {
		if (ctx.context.options.account?.storeAccountCookie) {
			const accountData = await getAccountCookie(ctx);
			if (accountData) account$1 = accountData;
		}
	} else {
		const accountData = await ctx.context.internalAdapter.findAccount(providedAccountId);
		if (accountData) account$1 = accountData;
	}
	if (!account$1 || account$1.userId !== ctx.context.session.user.id) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.ACCOUNT_NOT_FOUND);
	const provider = await getAwaitableValue(ctx.context.socialProviders, { value: account$1.providerId });
	if (!provider) throw APIError.from("INTERNAL_SERVER_ERROR", {
		message: `Provider account provider is ${account$1.providerId} but it is not configured`,
		code: "PROVIDER_NOT_CONFIGURED"
	});
	const tokens = await getAccessToken({
		...ctx,
		method: "POST",
		body: {
			accountId: account$1.accountId,
			providerId: account$1.providerId
		},
		returnHeaders: false,
		returnStatus: false
	});
	if (!tokens.accessToken) throw APIError.from("BAD_REQUEST", {
		message: "Access token not found",
		code: "ACCESS_TOKEN_NOT_FOUND"
	});
	const info$1 = await provider.getUserInfo({
		...tokens,
		accessToken: tokens.accessToken
	});
	return ctx.json(info$1);
});
async function createEmailVerificationToken(secret, email, updateTo, expiresIn = 3600, extraPayload) {
	return await signJWT({
		email: email.toLowerCase(),
		updateTo,
		...extraPayload
	}, secret, expiresIn);
}
async function sendVerificationEmailFn(ctx, user$1) {
	if (!ctx.context.options.emailVerification?.sendVerificationEmail) {
		ctx.context.logger.error("Verification email isn't enabled.");
		throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.VERIFICATION_EMAIL_NOT_ENABLED);
	}
	const token = await createEmailVerificationToken(ctx.context.secret, user$1.email, void 0, ctx.context.options.emailVerification?.expiresIn);
	const callbackURL = ctx.body.callbackURL ? encodeURIComponent(ctx.body.callbackURL) : encodeURIComponent("/");
	const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${callbackURL}`;
	await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
		user: user$1,
		url,
		token
	}, ctx.request));
}
var sendVerificationEmail = createAuthEndpoint("/send-verification-email", {
	method: "POST",
	operationId: "sendVerificationEmail",
	body: z$2.object({
		email: z$2.email().meta({ description: "The email to send the verification email to" }),
		callbackURL: z$2.string().meta({ description: "The URL to use for email verification callback" }).optional()
	}),
	metadata: { openapi: {
		operationId: "sendVerificationEmail",
		description: "Send a verification email to the user",
		requestBody: { content: { "application/json": { schema: {
			type: "object",
			properties: {
				email: {
					type: "string",
					description: "The email to send the verification email to",
					example: "user@example.com"
				},
				callbackURL: {
					type: "string",
					description: "The URL to use for email verification callback",
					example: "https://example.com/callback",
					nullable: true
				}
			},
			required: ["email"]
		} } } },
		responses: {
			"200": {
				description: "Success",
				content: { "application/json": { schema: {
					type: "object",
					properties: { status: {
						type: "boolean",
						description: "Indicates if the email was sent successfully",
						example: true
					} }
				} } }
			},
			"400": {
				description: "Bad Request",
				content: { "application/json": { schema: {
					type: "object",
					properties: { message: {
						type: "string",
						description: "Error message",
						example: "Verification email isn't enabled"
					} }
				} } }
			}
		}
	} }
}, async (ctx) => {
	if (!ctx.context.options.emailVerification?.sendVerificationEmail) {
		ctx.context.logger.error("Verification email isn't enabled.");
		throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.VERIFICATION_EMAIL_NOT_ENABLED);
	}
	const { email } = ctx.body;
	const session$1 = await getSessionFromCtx(ctx);
	if (!session$1) {
		const user$1 = await ctx.context.internalAdapter.findUserByEmail(email);
		if (!user$1 || user$1.user.emailVerified) {
			await createEmailVerificationToken(ctx.context.secret, email, void 0, ctx.context.options.emailVerification?.expiresIn);
			return ctx.json({ status: true });
		}
		await sendVerificationEmailFn(ctx, user$1.user);
		return ctx.json({ status: true });
	}
	if (session$1?.user.email !== email) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.EMAIL_MISMATCH);
	if (session$1?.user.emailVerified) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.EMAIL_ALREADY_VERIFIED);
	await sendVerificationEmailFn(ctx, session$1.user);
	return ctx.json({ status: true });
});
var verifyEmail = createAuthEndpoint("/verify-email", {
	method: "GET",
	operationId: "verifyEmail",
	query: z$2.object({
		token: z$2.string().meta({ description: "The token to verify the email" }),
		callbackURL: z$2.string().meta({ description: "The URL to redirect to after email verification" }).optional()
	}),
	use: [originCheck((ctx) => ctx.query.callbackURL)],
	metadata: { openapi: {
		description: "Verify the email of the user",
		parameters: [{
			name: "token",
			in: "query",
			description: "The token to verify the email",
			required: true,
			schema: { type: "string" }
		}, {
			name: "callbackURL",
			in: "query",
			description: "The URL to redirect to after email verification",
			required: false,
			schema: { type: "string" }
		}],
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					user: {
						type: "object",
						$ref: "#/components/schemas/User"
					},
					status: {
						type: "boolean",
						description: "Indicates if the email was verified successfully"
					}
				},
				required: ["user", "status"]
			} } }
		} }
	} }
}, async (ctx) => {
	function redirectOnError(error$1) {
		if (ctx.query.callbackURL) {
			if (ctx.query.callbackURL.includes("?")) throw ctx.redirect(`${ctx.query.callbackURL}&error=${error$1.code}`);
			throw ctx.redirect(`${ctx.query.callbackURL}?error=${error$1.code}`);
		}
		throw APIError.from("UNAUTHORIZED", error$1);
	}
	const { token } = ctx.query;
	let jwt;
	try {
		jwt = await jwtVerify(token, new TextEncoder().encode(ctx.context.secret), { algorithms: ["HS256"] });
	} catch (e) {
		if (e instanceof JWTExpired) return redirectOnError(BASE_ERROR_CODES.TOKEN_EXPIRED);
		return redirectOnError(BASE_ERROR_CODES.INVALID_TOKEN);
	}
	const parsed = z$2.object({
		email: z$2.email(),
		updateTo: z$2.string().optional(),
		requestType: z$2.string().optional()
	}).parse(jwt.payload);
	const user$1 = await ctx.context.internalAdapter.findUserByEmail(parsed.email);
	if (!user$1) return redirectOnError(BASE_ERROR_CODES.USER_NOT_FOUND);
	if (parsed.updateTo) {
		const session$1 = await getSessionFromCtx(ctx);
		if (session$1 && session$1.user.email !== parsed.email) return redirectOnError(BASE_ERROR_CODES.INVALID_USER);
		switch (parsed.requestType) {
			case "change-email-confirmation": {
				const newToken = await createEmailVerificationToken(ctx.context.secret, parsed.email, parsed.updateTo, ctx.context.options.emailVerification?.expiresIn, { requestType: "change-email-verification" });
				const updateCallbackURL = ctx.query.callbackURL ? encodeURIComponent(ctx.query.callbackURL) : encodeURIComponent("/");
				const url = `${ctx.context.baseURL}/verify-email?token=${newToken}&callbackURL=${updateCallbackURL}`;
				if (ctx.context.options.emailVerification?.sendVerificationEmail) await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
					user: {
						...user$1.user,
						email: parsed.updateTo
					},
					url,
					token: newToken
				}, ctx.request));
				if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
				return ctx.json({ status: true });
			}
			case "change-email-verification": {
				let activeSession = session$1;
				if (!activeSession) {
					const newSession = await ctx.context.internalAdapter.createSession(user$1.user.id);
					if (!newSession) throw APIError.from("INTERNAL_SERVER_ERROR", BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION);
					activeSession = {
						session: newSession,
						user: user$1.user
					};
				}
				const updatedUser$1 = await ctx.context.internalAdapter.updateUserByEmail(parsed.email, {
					email: parsed.updateTo,
					emailVerified: true
				});
				if (ctx.context.options.emailVerification?.afterEmailVerification) await ctx.context.options.emailVerification.afterEmailVerification(updatedUser$1, ctx.request);
				await setSessionCookie(ctx, {
					session: activeSession.session,
					user: {
						...activeSession.user,
						email: parsed.updateTo,
						emailVerified: true
					}
				});
				if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
				return ctx.json({
					status: true,
					user: parseUserOutput(ctx.context.options, updatedUser$1)
				});
			}
			default: {
				let activeSession = session$1;
				if (!activeSession) {
					const newSession = await ctx.context.internalAdapter.createSession(user$1.user.id);
					if (!newSession) throw APIError.from("INTERNAL_SERVER_ERROR", BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION);
					activeSession = {
						session: newSession,
						user: user$1.user
					};
				}
				const updatedUser$1 = await ctx.context.internalAdapter.updateUserByEmail(parsed.email, {
					email: parsed.updateTo,
					emailVerified: false
				});
				const newToken = await createEmailVerificationToken(ctx.context.secret, parsed.updateTo);
				const updateCallbackURL = ctx.query.callbackURL ? encodeURIComponent(ctx.query.callbackURL) : encodeURIComponent("/");
				if (ctx.context.options.emailVerification?.sendVerificationEmail) await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
					user: updatedUser$1,
					url: `${ctx.context.baseURL}/verify-email?token=${newToken}&callbackURL=${updateCallbackURL}`,
					token: newToken
				}, ctx.request));
				await setSessionCookie(ctx, {
					session: activeSession.session,
					user: {
						...activeSession.user,
						email: parsed.updateTo,
						emailVerified: false
					}
				});
				if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
				return ctx.json({
					status: true,
					user: parseUserOutput(ctx.context.options, updatedUser$1)
				});
			}
		}
	}
	if (user$1.user.emailVerified) {
		if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
		return ctx.json({
			status: true,
			user: null
		});
	}
	if (ctx.context.options.emailVerification?.beforeEmailVerification) await ctx.context.options.emailVerification.beforeEmailVerification(user$1.user, ctx.request);
	const updatedUser = await ctx.context.internalAdapter.updateUserByEmail(parsed.email, { emailVerified: true });
	if (ctx.context.options.emailVerification?.afterEmailVerification) await ctx.context.options.emailVerification.afterEmailVerification(updatedUser, ctx.request);
	if (ctx.context.options.emailVerification?.autoSignInAfterVerification) {
		const currentSession = await getSessionFromCtx(ctx);
		if (!currentSession || currentSession.user.email !== parsed.email) {
			const session$1 = await ctx.context.internalAdapter.createSession(user$1.user.id);
			if (!session$1) throw APIError.from("INTERNAL_SERVER_ERROR", BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION);
			await setSessionCookie(ctx, {
				session: session$1,
				user: {
					...user$1.user,
					emailVerified: true
				}
			});
		} else await setSessionCookie(ctx, {
			session: currentSession.session,
			user: {
				...currentSession.user,
				emailVerified: true
			}
		});
	}
	if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
	return ctx.json({
		status: true,
		user: null
	});
});
async function handleOAuthUserInfo(c, opts) {
	const { userInfo, account: account$1, callbackURL, disableSignUp, overrideUserInfo } = opts;
	const dbUser = await c.context.internalAdapter.findOAuthUser(userInfo.email.toLowerCase(), account$1.accountId, account$1.providerId).catch((e) => {
		logger.error("Better auth was unable to query your database.\nError: ", e);
		const errorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
		throw c.redirect(`${errorURL}?error=internal_server_error`);
	});
	let user$1 = dbUser?.user;
	const isRegister = !user$1;
	if (dbUser) {
		const linkedAccount = dbUser.linkedAccount ?? dbUser.accounts.find((acc) => acc.providerId === account$1.providerId && acc.accountId === account$1.accountId);
		if (!linkedAccount) {
			const accountLinking = c.context.options.account?.accountLinking;
			if (!(opts.isTrustedProvider || c.context.trustedProviders.includes(account$1.providerId)) && !userInfo.emailVerified || accountLinking?.enabled === false || accountLinking?.disableImplicitLinking === true) {
				if (isDevelopment()) logger.warn(`User already exist but account isn't linked to ${account$1.providerId}. To read more about how account linking works in Better Auth see https://www.better-auth.com/docs/concepts/users-accounts#account-linking.`);
				return {
					error: "account not linked",
					data: null
				};
			}
			try {
				await c.context.internalAdapter.linkAccount({
					providerId: account$1.providerId,
					accountId: userInfo.id.toString(),
					userId: dbUser.user.id,
					accessToken: await setTokenUtil(account$1.accessToken, c.context),
					refreshToken: await setTokenUtil(account$1.refreshToken, c.context),
					idToken: account$1.idToken,
					accessTokenExpiresAt: account$1.accessTokenExpiresAt,
					refreshTokenExpiresAt: account$1.refreshTokenExpiresAt,
					scope: account$1.scope
				});
			} catch (e) {
				logger.error("Unable to link account", e);
				return {
					error: "unable to link account",
					data: null
				};
			}
			if (userInfo.emailVerified && !dbUser.user.emailVerified && userInfo.email.toLowerCase() === dbUser.user.email) await c.context.internalAdapter.updateUser(dbUser.user.id, { emailVerified: true });
		} else {
			const freshTokens = c.context.options.account?.updateAccountOnSignIn !== false ? Object.fromEntries(Object.entries({
				idToken: account$1.idToken,
				accessToken: await setTokenUtil(account$1.accessToken, c.context),
				refreshToken: await setTokenUtil(account$1.refreshToken, c.context),
				accessTokenExpiresAt: account$1.accessTokenExpiresAt,
				refreshTokenExpiresAt: account$1.refreshTokenExpiresAt,
				scope: account$1.scope
			}).filter(([_, value]) => value !== void 0)) : {};
			if (c.context.options.account?.storeAccountCookie) await setAccountCookie(c, {
				...linkedAccount,
				...freshTokens
			});
			if (Object.keys(freshTokens).length > 0) await c.context.internalAdapter.updateAccount(linkedAccount.id, freshTokens);
			if (userInfo.emailVerified && !dbUser.user.emailVerified && userInfo.email.toLowerCase() === dbUser.user.email) await c.context.internalAdapter.updateUser(dbUser.user.id, { emailVerified: true });
		}
		if (overrideUserInfo) {
			const { id: _, ...restUserInfo } = userInfo;
			user$1 = await c.context.internalAdapter.updateUser(dbUser.user.id, {
				...restUserInfo,
				email: userInfo.email.toLowerCase(),
				emailVerified: userInfo.email.toLowerCase() === dbUser.user.email ? dbUser.user.emailVerified || userInfo.emailVerified : userInfo.emailVerified
			});
		}
	} else {
		if (disableSignUp) return {
			error: "signup disabled",
			data: null,
			isRegister: false
		};
		try {
			const { id: _, ...restUserInfo } = userInfo;
			const accountData = {
				accessToken: await setTokenUtil(account$1.accessToken, c.context),
				refreshToken: await setTokenUtil(account$1.refreshToken, c.context),
				idToken: account$1.idToken,
				accessTokenExpiresAt: account$1.accessTokenExpiresAt,
				refreshTokenExpiresAt: account$1.refreshTokenExpiresAt,
				scope: account$1.scope,
				providerId: account$1.providerId,
				accountId: userInfo.id.toString()
			};
			const { user: createdUser, account: createdAccount } = await c.context.internalAdapter.createOAuthUser({
				...restUserInfo,
				email: userInfo.email.toLowerCase()
			}, accountData);
			user$1 = createdUser;
			if (c.context.options.account?.storeAccountCookie) await setAccountCookie(c, createdAccount);
			if (!userInfo.emailVerified && user$1 && c.context.options.emailVerification?.sendOnSignUp && c.context.options.emailVerification?.sendVerificationEmail) {
				const token = await createEmailVerificationToken(c.context.secret, user$1.email, void 0, c.context.options.emailVerification?.expiresIn);
				const url = `${c.context.baseURL}/verify-email?token=${token}&callbackURL=${callbackURL}`;
				await c.context.runInBackgroundOrAwait(c.context.options.emailVerification.sendVerificationEmail({
					user: user$1,
					url,
					token
				}, c.request));
			}
		} catch (e) {
			logger.error(e);
			if (isAPIError(e)) return {
				error: e.message,
				data: null,
				isRegister: false
			};
			return {
				error: "unable to create user",
				data: null,
				isRegister: false
			};
		}
	}
	if (!user$1) return {
		error: "unable to create user",
		data: null,
		isRegister: false
	};
	const session$1 = await c.context.internalAdapter.createSession(user$1.id);
	if (!session$1) return {
		error: "unable to create session",
		data: null,
		isRegister: false
	};
	return {
		data: {
			session: session$1,
			user: user$1
		},
		error: null,
		isRegister
	};
}
var HIDE_METADATA = { scope: "server" };
var schema$1 = z$2.object({
	code: z$2.string().optional(),
	error: z$2.string().optional(),
	device_id: z$2.string().optional(),
	error_description: z$2.string().optional(),
	state: z$2.string().optional(),
	user: z$2.string().optional()
});
var callbackOAuth = createAuthEndpoint("/callback/:id", {
	method: ["GET", "POST"],
	operationId: "handleOAuthCallback",
	body: schema$1.optional(),
	query: schema$1.optional(),
	metadata: {
		...HIDE_METADATA,
		allowedMediaTypes: ["application/x-www-form-urlencoded", "application/json"]
	}
}, async (c) => {
	let queryOrBody;
	const defaultErrorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
	if (c.method === "POST") {
		const postData = c.body ? schema$1.parse(c.body) : {};
		const queryData = c.query ? schema$1.parse(c.query) : {};
		const mergedData = schema$1.parse({
			...postData,
			...queryData
		});
		const params = new URLSearchParams();
		for (const [key, value] of Object.entries(mergedData)) if (value !== void 0 && value !== null) params.set(key, String(value));
		const redirectURL = `${c.context.baseURL}/callback/${c.params.id}?${params.toString()}`;
		throw c.redirect(redirectURL);
	}
	try {
		if (c.method === "GET") queryOrBody = schema$1.parse(c.query);
		else if (c.method === "POST") queryOrBody = schema$1.parse(c.body);
		else throw new Error("Unsupported method");
	} catch (e) {
		c.context.logger.error("INVALID_CALLBACK_REQUEST", e);
		throw c.redirect(`${defaultErrorURL}?error=invalid_callback_request`);
	}
	const { code, error: error$1, state, error_description, device_id, user: userData } = queryOrBody;
	if (!state) {
		c.context.logger.error("State not found", error$1);
		const url = `${defaultErrorURL}${defaultErrorURL.includes("?") ? "&" : "?"}state=state_not_found`;
		throw c.redirect(url);
	}
	const { codeVerifier, callbackURL, link, errorURL, newUserURL, requestSignUp } = await parseState(c);
	function redirectOnError(error$2, description$1) {
		const baseURL = errorURL ?? defaultErrorURL;
		const params = new URLSearchParams({ error: error$2 });
		if (description$1) params.set("error_description", description$1);
		const url = `${baseURL}${baseURL.includes("?") ? "&" : "?"}${params.toString()}`;
		throw c.redirect(url);
	}
	if (error$1) redirectOnError(error$1, error_description);
	if (!code) {
		c.context.logger.error("Code not found");
		throw redirectOnError("no_code");
	}
	const provider = await getAwaitableValue(c.context.socialProviders, { value: c.params.id });
	if (!provider) {
		c.context.logger.error("Oauth provider with id", c.params.id, "not found");
		throw redirectOnError("oauth_provider_not_found");
	}
	let tokens;
	try {
		tokens = await provider.validateAuthorizationCode({
			code,
			codeVerifier,
			deviceId: device_id,
			redirectURI: `${c.context.baseURL}/callback/${provider.id}`
		});
	} catch (e) {
		c.context.logger.error("", e);
		throw redirectOnError("invalid_code");
	}
	if (!tokens) throw redirectOnError("invalid_code");
	const parsedUserData = userData ? safeJSONParse(userData) : null;
	const userInfo = await provider.getUserInfo({
		...tokens,
		user: parsedUserData ?? void 0
	}).then((res) => res?.user);
	if (!userInfo) {
		c.context.logger.error("Unable to get user info");
		return redirectOnError("unable_to_get_user_info");
	}
	if (!callbackURL) {
		c.context.logger.error("No callback URL found");
		throw redirectOnError("no_callback_url");
	}
	if (link) {
		if (!c.context.trustedProviders.includes(provider.id) && !userInfo.emailVerified || c.context.options.account?.accountLinking?.enabled === false) {
			c.context.logger.error("Unable to link account - untrusted provider");
			return redirectOnError("unable_to_link_account");
		}
		if (userInfo.email?.toLowerCase() !== link.email.toLowerCase() && c.context.options.account?.accountLinking?.allowDifferentEmails !== true) return redirectOnError("email_doesn't_match");
		const existingAccount = await c.context.internalAdapter.findAccountByProviderId(String(userInfo.id), provider.id);
		if (existingAccount) {
			if (existingAccount.userId.toString() !== link.userId.toString()) return redirectOnError("account_already_linked_to_different_user");
			const updateData = Object.fromEntries(Object.entries({
				accessToken: await setTokenUtil(tokens.accessToken, c.context),
				refreshToken: await setTokenUtil(tokens.refreshToken, c.context),
				idToken: tokens.idToken,
				accessTokenExpiresAt: tokens.accessTokenExpiresAt,
				refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
				scope: tokens.scopes?.join(",")
			}).filter(([_, value]) => value !== void 0));
			await c.context.internalAdapter.updateAccount(existingAccount.id, updateData);
		} else if (!await c.context.internalAdapter.createAccount({
			userId: link.userId,
			providerId: provider.id,
			accountId: String(userInfo.id),
			...tokens,
			accessToken: await setTokenUtil(tokens.accessToken, c.context),
			refreshToken: await setTokenUtil(tokens.refreshToken, c.context),
			scope: tokens.scopes?.join(",")
		})) return redirectOnError("unable_to_link_account");
		let toRedirectTo$1;
		try {
			toRedirectTo$1 = callbackURL.toString();
		} catch {
			toRedirectTo$1 = callbackURL;
		}
		throw c.redirect(toRedirectTo$1);
	}
	if (!userInfo.email) {
		c.context.logger.error(missingEmailLogMessage(provider.id));
		return redirectOnError("email_not_found");
	}
	const accountData = {
		providerId: provider.id,
		accountId: String(userInfo.id),
		...tokens,
		scope: tokens.scopes?.join(",")
	};
	const result = await handleOAuthUserInfo(c, {
		userInfo: {
			...userInfo,
			id: String(userInfo.id),
			email: userInfo.email,
			name: userInfo.name || ""
		},
		account: accountData,
		callbackURL,
		disableSignUp: provider.disableImplicitSignUp && !requestSignUp || provider.options?.disableSignUp,
		overrideUserInfo: provider.options?.overrideUserInfoOnSignIn
	});
	if (result.error) {
		c.context.logger.error(result.error.split(" ").join("_"));
		return redirectOnError(result.error.split(" ").join("_"));
	}
	const { session: session$1, user: user$1 } = result.data;
	await setSessionCookie(c, {
		session: session$1,
		user: user$1
	});
	let toRedirectTo;
	try {
		toRedirectTo = (result.isRegister ? newUserURL || callbackURL : callbackURL).toString();
	} catch {
		toRedirectTo = result.isRegister ? newUserURL || callbackURL : callbackURL;
	}
	throw c.redirect(toRedirectTo);
});
function sanitize(input) {
	return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/&(?!amp;|lt;|gt;|quot;|#39;|#x[0-9a-fA-F]+;|#[0-9]+;)/g, "&amp;");
}
var html = (options, code = "Unknown", description$1 = null) => {
	const custom = options.onAPIError?.customizeDefaultErrorPage;
	return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Error</title>
    <style>
      * {
        box-sizing: border-box;
      }
      body {
        font-family: ${custom?.font?.defaultFamily || "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"};
        background: ${custom?.colors?.background || "var(--background)"};
        color: var(--foreground);
        margin: 0;
      }
      :root,
      :host {
        --spacing: 0.25rem;
        --container-md: 28rem;
        --text-sm: ${custom?.size?.textSm || "0.875rem"};
        --text-sm--line-height: calc(1.25 / 0.875);
        --text-2xl: ${custom?.size?.text2xl || "1.5rem"};
        --text-2xl--line-height: calc(2 / 1.5);
        --text-4xl: ${custom?.size?.text4xl || "2.25rem"};
        --text-4xl--line-height: calc(2.5 / 2.25);
        --text-6xl: ${custom?.size?.text6xl || "3rem"};
        --text-6xl--line-height: 1;
        --font-weight-medium: 500;
        --font-weight-semibold: 600;
        --font-weight-bold: 700;
        --default-transition-duration: 150ms;
        --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        --radius: ${custom?.size?.radiusSm || "0.625rem"};
        --default-mono-font-family: ${custom?.font?.monoFamily || "var(--font-geist-mono)"};
        --primary: ${custom?.colors?.primary || "black"};
        --primary-foreground: ${custom?.colors?.primaryForeground || "white"};
        --background: ${custom?.colors?.background || "white"};
        --foreground: ${custom?.colors?.foreground || "oklch(0.271 0 0)"};
        --border: ${custom?.colors?.border || "oklch(0.89 0 0)"};
        --destructive: ${custom?.colors?.destructive || "oklch(0.55 0.15 25.723)"};
        --muted-foreground: ${custom?.colors?.mutedForeground || "oklch(0.545 0 0)"};
        --corner-border: ${custom?.colors?.cornerBorder || "#404040"};
      }

      button, .btn {
        cursor: pointer;
        background: none;
        border: none;
        color: inherit;
        font: inherit;
        transition: all var(--default-transition-duration)
          var(--default-transition-timing-function);
      }
      button:hover, .btn:hover {
        opacity: 0.8;
      }

      @media (prefers-color-scheme: dark) {
        :root,
        :host {
          --primary: ${custom?.colors?.primary || "white"};
          --primary-foreground: ${custom?.colors?.primaryForeground || "black"};
          --background: ${custom?.colors?.background || "oklch(0.15 0 0)"};
          --foreground: ${custom?.colors?.foreground || "oklch(0.98 0 0)"};
          --border: ${custom?.colors?.border || "oklch(0.27 0 0)"};
          --destructive: ${custom?.colors?.destructive || "oklch(0.65 0.15 25.723)"};
          --muted-foreground: ${custom?.colors?.mutedForeground || "oklch(0.65 0 0)"};
          --corner-border: ${custom?.colors?.cornerBorder || "#a0a0a0"};
        }
      }
      @media (max-width: 640px) {
        :root, :host {
          --text-6xl: 2.5rem;
          --text-2xl: 1.25rem;
          --text-sm: 0.8125rem;
        }
      }
      @media (max-width: 480px) {
        :root, :host {
          --text-6xl: 2rem;
          --text-2xl: 1.125rem;
        }
      }
    </style>
  </head>
  <body style="width: 100vw; min-height: 100vh; overflow-x: hidden; overflow-y: auto;">
    <div
        style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
            position: relative;
            width: 100%;
            min-height: 100vh;
            padding: 1rem;
        "
        >
${custom?.disableBackgroundGrid ? "" : `
      <div
        style="
          position: absolute;
          inset: 0;
          background-image: linear-gradient(to right, ${custom?.colors?.gridColor || "var(--border)"} 1px, transparent 1px),
            linear-gradient(to bottom, ${custom?.colors?.gridColor || "var(--border)"} 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.6;
          pointer-events: none;
          width: 100vw;
          height: 100vh;
        "
      ></div>
      <div
        style="
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${custom?.colors?.background || "var(--background)"};
          mask-image: radial-gradient(ellipse at center, transparent 20%, black);
          -webkit-mask-image: radial-gradient(ellipse at center, transparent 20%, black);
          pointer-events: none;
        "
      ></div>
`}

<div
  style="
    position: relative;
    z-index: 10;
    border: 2px solid var(--border);
    background: ${custom?.colors?.cardBackground || "var(--background)"};
    padding: 1.5rem;
    max-width: 42rem;
    width: 100%;
  "
>
    ${custom?.disableCornerDecorations ? "" : `
        <!-- Corner decorations -->
        <div
          style="
            position: absolute;
            top: -2px;
            left: -2px;
            width: 2rem;
            height: 2rem;
            border-top: 4px solid var(--corner-border);
            border-left: 4px solid var(--corner-border);
          "
        ></div>
        <div
          style="
            position: absolute;
            top: -2px;
            right: -2px;
            width: 2rem;
            height: 2rem;
            border-top: 4px solid var(--corner-border);
            border-right: 4px solid var(--corner-border);
          "
        ></div>
  
        <div
          style="
            position: absolute;
            bottom: -2px;
            left: -2px;
            width: 2rem;
            height: 2rem;
            border-bottom: 4px solid var(--corner-border);
            border-left: 4px solid var(--corner-border);
          "
        ></div>
        <div
          style="
            position: absolute;
            bottom: -2px;
            right: -2px;
            width: 2rem;
            height: 2rem;
            border-bottom: 4px solid var(--corner-border);
            border-right: 4px solid var(--corner-border);
          "
        ></div>`}

        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div style="margin-bottom: 1.5rem;">
            <div
              style="
                display: inline-block;
                border: 2px solid ${custom?.disableTitleBorder ? "transparent" : custom?.colors?.titleBorder || "var(--destructive)"};
                padding: 0.375rem 1rem;
              "
            >
              <h1
                style="
                  font-size: var(--text-6xl);
                  font-weight: var(--font-weight-semibold);
                  color: ${custom?.colors?.titleColor || "var(--foreground)"};
                  letter-spacing: -0.02em;
                  margin: 0;
                "
              >
                ERROR
              </h1>
            </div>
            <div
              style="
                height: 2px;
                background-color: var(--border);
                width: calc(100% + 3rem);
                margin-left: -1.5rem;
                margin-top: 1.5rem;
              "
            ></div>
          </div>

          <h2
            style="
              font-size: var(--text-2xl);
              font-weight: var(--font-weight-semibold);
              color: var(--foreground);
              margin: 0 0 1rem;
            "
          >
            Something went wrong
          </h2>

          <div
            style="
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                border: 2px solid var(--border);
                background-color: var(--muted);
                padding: 0.375rem 0.75rem;
                margin: 0 0 1rem;
                flex-wrap: wrap;
                justify-content: center;
            "
            >
            <span
                style="
                font-size: 0.75rem;
                color: var(--muted-foreground);
                font-weight: var(--font-weight-semibold);
                "
            >
                CODE:
            </span>
            <span
                style="
                font-size: var(--text-sm);
                font-family: var(--default-mono-font-family, monospace);
                color: var(--foreground);
                word-break: break-all;
                "
            >
                ${sanitize(code)}
            </span>
            </div>

          <p
            style="
              color: var(--muted-foreground);
              max-width: 28rem;
              margin: 0 auto;
              font-size: var(--text-sm);
              line-height: 1.5;
              text-wrap: pretty;
            "
          >
            ${!description$1 ? `We encountered an unexpected error. Please try again or return to the home page. If you're a developer, you can find more information about the error <a href='https://better-auth.com/docs/reference/errors/${encodeURIComponent(code)}' target='_blank' rel="noopener noreferrer" style='color: var(--foreground); text-decoration: underline;'>here</a>.` : description$1}
          </p>
        </div>

        <div
          style="
            display: flex;
            gap: 0.75rem;
            margin-top: 1.5rem;
            justify-content: center;
            flex-wrap: wrap;
          "
        >
          <a
            href="/"
            style="
              text-decoration: none;
            "
          >
            <div
              style="
                border: 2px solid var(--border);
                background: var(--primary);
                color: var(--primary-foreground);
                padding: 0.5rem 1rem;
                border-radius: 0;
                white-space: nowrap;
              "
              class="btn"
            >
              Go Home
            </div>
          </a>
          <a
            href="https://better-auth.com/docs/reference/errors/${encodeURIComponent(code)}?askai=${encodeURIComponent(`What does the error code ${code} mean?`)}"
            target="_blank"
            rel="noopener noreferrer"
            style="
              text-decoration: none;
            "
          >
            <div
              style="
                border: 2px solid var(--border);
                background: transparent;
                color: var(--foreground);
                padding: 0.5rem 1rem;
                border-radius: 0;
                white-space: nowrap;
              "
              class="btn"
            >
              Ask AI
            </div>
          </a>
        </div>
      </div>
    </div>
  </body>
</html>`;
};
var error = createAuthEndpoint("/error", {
	method: "GET",
	metadata: {
		...HIDE_METADATA,
		openapi: {
			description: "Displays an error page",
			responses: { "200": {
				description: "Success",
				content: { "text/html": { schema: {
					type: "string",
					description: "The HTML content of the error page"
				} } }
			} }
		}
	}
}, async (c) => {
	const url = new URL(c.request?.url || "");
	const unsanitizedCode = url.searchParams.get("error") || "UNKNOWN";
	const unsanitizedDescription = url.searchParams.get("error_description") || null;
	const safeCode = /^[\'A-Za-z0-9_-]+$/.test(unsanitizedCode || "") ? unsanitizedCode : "UNKNOWN";
	const safeDescription = unsanitizedDescription ? sanitize(unsanitizedDescription) : null;
	const queryParams = new URLSearchParams();
	queryParams.set("error", safeCode);
	if (unsanitizedDescription) queryParams.set("error_description", unsanitizedDescription);
	const options = c.context.options;
	const errorURL = options.onAPIError?.errorURL;
	if (errorURL) return new Response(null, {
		status: 302,
		headers: { Location: `${errorURL}${errorURL.includes("?") ? "&" : "?"}${queryParams.toString()}` }
	});
	if (isProduction && !options.onAPIError?.customizeDefaultErrorPage) return new Response(null, {
		status: 302,
		headers: { Location: `/?${queryParams.toString()}` }
	});
	return new Response(html(c.context.options, safeCode, safeDescription), { headers: { "Content-Type": "text/html" } });
});
var ok = createAuthEndpoint("/ok", {
	method: "GET",
	metadata: {
		...HIDE_METADATA,
		openapi: {
			description: "Check if the API is working",
			responses: { "200": {
				description: "API is working",
				content: { "application/json": { schema: {
					type: "object",
					properties: { ok: {
						type: "boolean",
						description: "Indicates if the API is working"
					} },
					required: ["ok"]
				} } }
			} }
		}
	}
}, async (ctx) => {
	return ctx.json({ ok: true });
});
async function validatePassword(ctx, data) {
	const credentialAccount = (await ctx.context.internalAdapter.findAccounts(data.userId))?.find((account$1) => account$1.providerId === "credential");
	const currentPassword = credentialAccount?.password;
	if (!credentialAccount || !currentPassword) return false;
	return await ctx.context.password.verify({
		hash: currentPassword,
		password: data.password
	});
}
async function checkPassword(userId, c) {
	const credentialAccount = (await c.context.internalAdapter.findAccounts(userId))?.find((account$1) => account$1.providerId === "credential");
	const currentPassword = credentialAccount?.password;
	const password = c.body.password;
	if (!credentialAccount || !currentPassword || !password) {
		if (password) await c.context.password.hash(password);
		throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
	}
	if (!await c.context.password.verify({
		hash: currentPassword,
		password
	})) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
	return true;
}
async function shouldRequirePassword(ctx, userId, allowPasswordless) {
	if (!allowPasswordless) return true;
	const credentialAccount = (await ctx.context.internalAdapter.findAccounts(userId))?.find((account$1) => account$1.providerId === "credential" && account$1.password);
	return Boolean(credentialAccount);
}
function redirectError(ctx, callbackURL, query) {
	const url = callbackURL ? new URL(callbackURL, ctx.baseURL) : new URL(`${ctx.baseURL}/error`);
	if (query) Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, v));
	return url.href;
}
function redirectCallback(ctx, callbackURL, query) {
	const url = new URL(callbackURL, ctx.baseURL);
	if (query) Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, v));
	return url.href;
}
var requestPasswordReset = createAuthEndpoint("/request-password-reset", {
	method: "POST",
	body: z$2.object({
		email: z$2.email().meta({ description: "The email address of the user to send a password reset email to" }),
		redirectTo: z$2.string().meta({ description: "The URL to redirect the user to reset their password. If the token isn't valid or expired, it'll be redirected with a query parameter `?error=INVALID_TOKEN`. If the token is valid, it'll be redirected with a query parameter `?token=VALID_TOKEN" }).optional()
	}),
	metadata: { openapi: {
		operationId: "requestPasswordReset",
		description: "Send a password reset email to the user",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					status: { type: "boolean" },
					message: { type: "string" }
				}
			} } }
		} }
	} },
	use: [originCheck((ctx) => ctx.body.redirectTo)]
}, async (ctx) => {
	if (!ctx.context.options.emailAndPassword?.sendResetPassword) {
		ctx.context.logger.error("Reset password isn't enabled.Please pass an emailAndPassword.sendResetPassword function in your auth config!");
		throw APIError.from("BAD_REQUEST", {
			message: "Reset password isn't enabled",
			code: "RESET_PASSWORD_DISABLED"
		});
	}
	const { email, redirectTo } = ctx.body;
	const user$1 = await ctx.context.internalAdapter.findUserByEmail(email, { includeAccounts: true });
	if (!user$1) {
		generateId(24);
		await ctx.context.internalAdapter.findVerificationValue("dummy-verification-token");
		ctx.context.logger.error("Reset Password: User not found", { email });
		return ctx.json({
			status: true,
			message: "If this email exists in our system, check your email for the reset link"
		});
	}
	const expiresAt = getDate(ctx.context.options.emailAndPassword.resetPasswordTokenExpiresIn || 3600 * 1, "sec");
	const verificationToken = generateId(24);
	await ctx.context.internalAdapter.createVerificationValue({
		value: user$1.user.id,
		identifier: `reset-password:${verificationToken}`,
		expiresAt
	});
	const callbackURL = redirectTo ? encodeURIComponent(redirectTo) : "";
	const url = `${ctx.context.baseURL}/reset-password/${verificationToken}?callbackURL=${callbackURL}`;
	await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailAndPassword.sendResetPassword({
		user: user$1.user,
		url,
		token: verificationToken
	}, ctx.request));
	return ctx.json({
		status: true,
		message: "If this email exists in our system, check your email for the reset link"
	});
});
var requestPasswordResetCallback = createAuthEndpoint("/reset-password/:token", {
	method: "GET",
	operationId: "resetPasswordCallback",
	query: z$2.object({ callbackURL: z$2.string().meta({ description: "The URL to redirect the user to reset their password" }) }),
	use: [originCheck((ctx) => ctx.query.callbackURL)],
	metadata: { openapi: {
		operationId: "resetPasswordCallback",
		description: "Redirects the user to the callback URL with the token",
		parameters: [{
			name: "token",
			in: "path",
			required: true,
			description: "The token to reset the password",
			schema: { type: "string" }
		}, {
			name: "callbackURL",
			in: "query",
			required: true,
			description: "The URL to redirect the user to reset their password",
			schema: { type: "string" }
		}],
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { token: { type: "string" } }
			} } }
		} }
	} }
}, async (ctx) => {
	const { token } = ctx.params;
	const { callbackURL } = ctx.query;
	if (!token || !callbackURL) throw ctx.redirect(redirectError(ctx.context, callbackURL, { error: "INVALID_TOKEN" }));
	const verification$1 = await ctx.context.internalAdapter.findVerificationValue(`reset-password:${token}`);
	if (!verification$1 || verification$1.expiresAt < /* @__PURE__ */ new Date()) throw ctx.redirect(redirectError(ctx.context, callbackURL, { error: "INVALID_TOKEN" }));
	throw ctx.redirect(redirectCallback(ctx.context, callbackURL, { token }));
});
var resetPassword = createAuthEndpoint("/reset-password", {
	method: "POST",
	operationId: "resetPassword",
	query: z$2.object({ token: z$2.string().optional() }).optional(),
	body: z$2.object({
		newPassword: z$2.string().meta({ description: "The new password to set" }),
		token: z$2.string().meta({ description: "The token to reset the password" }).optional()
	}),
	metadata: { openapi: {
		operationId: "resetPassword",
		description: "Reset the password for a user",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { status: { type: "boolean" } }
			} } }
		} }
	} }
}, async (ctx) => {
	const token = ctx.body.token || ctx.query?.token;
	if (!token) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_TOKEN);
	const { newPassword } = ctx.body;
	const minLength = ctx.context.password?.config.minPasswordLength;
	const maxLength = ctx.context.password?.config.maxPasswordLength;
	if (newPassword.length < minLength) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_SHORT);
	if (newPassword.length > maxLength) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_LONG);
	const id = `reset-password:${token}`;
	const verification$1 = await ctx.context.internalAdapter.findVerificationValue(id);
	if (!verification$1 || verification$1.expiresAt < /* @__PURE__ */ new Date()) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_TOKEN);
	const userId = verification$1.value;
	const hashedPassword = await ctx.context.password.hash(newPassword);
	if (!(await ctx.context.internalAdapter.findAccounts(userId)).find((ac) => ac.providerId === "credential")) await ctx.context.internalAdapter.createAccount({
		userId,
		providerId: "credential",
		password: hashedPassword,
		accountId: userId
	});
	else await ctx.context.internalAdapter.updatePassword(userId, hashedPassword);
	await ctx.context.internalAdapter.deleteVerificationByIdentifier(id);
	if (ctx.context.options.emailAndPassword?.onPasswordReset) {
		const user$1 = await ctx.context.internalAdapter.findUserById(userId);
		if (user$1) await ctx.context.options.emailAndPassword.onPasswordReset({ user: user$1 }, ctx.request);
	}
	if (ctx.context.options.emailAndPassword?.revokeSessionsOnPasswordReset) await ctx.context.internalAdapter.deleteSessions(userId);
	return ctx.json({ status: true });
});
var verifyPassword$2 = createAuthEndpoint("/verify-password", {
	method: "POST",
	body: z$2.object({ password: z$2.string().meta({ description: "The password to verify" }) }),
	metadata: {
		scope: "server",
		openapi: {
			operationId: "verifyPassword",
			description: "Verify the current user's password",
			responses: { "200": {
				description: "Success",
				content: { "application/json": { schema: {
					type: "object",
					properties: { status: { type: "boolean" } }
				} } }
			} }
		}
	},
	use: [sensitiveSessionMiddleware]
}, async (ctx) => {
	const { password } = ctx.body;
	const session$1 = ctx.context.session;
	if (!await validatePassword(ctx, {
		password,
		userId: session$1.user.id
	})) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
	return ctx.json({ status: true });
});
var socialSignInBodySchema = z$2.object({
	callbackURL: z$2.string().meta({ description: "Callback URL to redirect to after the user has signed in" }).optional(),
	newUserCallbackURL: z$2.string().optional(),
	errorCallbackURL: z$2.string().meta({ description: "Callback URL to redirect to if an error happens" }).optional(),
	provider: SocialProviderListEnum,
	disableRedirect: z$2.boolean().meta({ description: "Disable automatic redirection to the provider. Useful for handling the redirection yourself" }).optional(),
	idToken: z$2.optional(z$2.object({
		token: z$2.string().meta({ description: "ID token from the provider" }),
		nonce: z$2.string().meta({ description: "Nonce used to generate the token" }).optional(),
		accessToken: z$2.string().meta({ description: "Access token from the provider" }).optional(),
		refreshToken: z$2.string().meta({ description: "Refresh token from the provider" }).optional(),
		expiresAt: z$2.number().meta({ description: "Expiry date of the token" }).optional(),
		user: z$2.object({
			name: z$2.object({
				firstName: z$2.string().optional(),
				lastName: z$2.string().optional()
			}).optional(),
			email: z$2.string().optional()
		}).meta({ description: "The user object from the provider. Only available for some providers like Apple." }).optional()
	})),
	scopes: z$2.array(z$2.string()).meta({ description: "Array of scopes to request from the provider. This will override the default scopes passed." }).optional(),
	requestSignUp: z$2.boolean().meta({ description: "Explicitly request sign-up. Useful when disableImplicitSignUp is true for this provider" }).optional(),
	loginHint: z$2.string().meta({ description: "The login hint to use for the authorization code request" }).optional(),
	additionalData: z$2.record(z$2.string(), z$2.any()).optional().meta({ description: "Additional data to be passed through the OAuth flow" })
});
var signInSocial = () => createAuthEndpoint("/sign-in/social", {
	method: "POST",
	operationId: "socialSignIn",
	body: socialSignInBodySchema,
	metadata: {
		$Infer: {
			body: {},
			returned: {}
		},
		openapi: {
			description: "Sign in with a social provider",
			operationId: "socialSignIn",
			responses: { "200": {
				description: "Success - Returns either session details or redirect URL",
				content: { "application/json": { schema: {
					type: "object",
					description: "Session response when idToken is provided",
					properties: {
						token: { type: "string" },
						user: {
							type: "object",
							$ref: "#/components/schemas/User"
						},
						url: { type: "string" },
						redirect: {
							type: "boolean",
							enum: [false]
						}
					},
					required: [
						"redirect",
						"token",
						"user"
					]
				} } }
			} }
		}
	}
}, async (c) => {
	const provider = await getAwaitableValue(c.context.socialProviders, { value: c.body.provider });
	if (!provider) {
		c.context.logger.error("Provider not found. Make sure to add the provider in your auth config", { provider: c.body.provider });
		throw APIError.from("NOT_FOUND", BASE_ERROR_CODES.PROVIDER_NOT_FOUND);
	}
	if (c.body.idToken) {
		if (!provider.verifyIdToken) {
			c.context.logger.error("Provider does not support id token verification", { provider: c.body.provider });
			throw APIError.from("NOT_FOUND", BASE_ERROR_CODES.ID_TOKEN_NOT_SUPPORTED);
		}
		const { token, nonce } = c.body.idToken;
		if (!await provider.verifyIdToken(token, nonce)) {
			c.context.logger.error("Invalid id token", { provider: c.body.provider });
			throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.INVALID_TOKEN);
		}
		const userInfo = await provider.getUserInfo({
			idToken: token,
			accessToken: c.body.idToken.accessToken,
			refreshToken: c.body.idToken.refreshToken,
			user: c.body.idToken.user
		});
		if (!userInfo || !userInfo?.user) {
			c.context.logger.error("Failed to get user info", { provider: c.body.provider });
			throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.FAILED_TO_GET_USER_INFO);
		}
		if (!userInfo.user.email) {
			c.context.logger.error(missingEmailLogMessage(c.body.provider, { source: "id_token" }), { provider: c.body.provider });
			throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.USER_EMAIL_NOT_FOUND);
		}
		const data = await handleOAuthUserInfo(c, {
			userInfo: {
				...userInfo.user,
				email: userInfo.user.email,
				id: String(userInfo.user.id),
				name: userInfo.user.name || "",
				image: userInfo.user.image,
				emailVerified: userInfo.user.emailVerified || false
			},
			account: {
				providerId: provider.id,
				accountId: String(userInfo.user.id),
				accessToken: c.body.idToken.accessToken
			},
			callbackURL: c.body.callbackURL,
			disableSignUp: provider.disableImplicitSignUp && !c.body.requestSignUp || provider.disableSignUp
		});
		if (data.error) throw APIError.from("UNAUTHORIZED", {
			message: data.error,
			code: "OAUTH_LINK_ERROR"
		});
		await setSessionCookie(c, data.data);
		return c.json({
			redirect: false,
			token: data.data.session.token,
			url: void 0,
			user: parseUserOutput(c.context.options, data.data.user)
		});
	}
	const { codeVerifier, state } = await generateState(c, void 0, c.body.additionalData);
	const url = await provider.createAuthorizationURL({
		state,
		codeVerifier,
		redirectURI: `${c.context.baseURL}/callback/${provider.id}`,
		scopes: c.body.scopes,
		loginHint: c.body.loginHint
	});
	if (!c.body.disableRedirect) c.setHeader("Location", url.toString());
	return c.json({
		url: url.toString(),
		redirect: !c.body.disableRedirect
	});
});
var signInEmail = () => createAuthEndpoint("/sign-in/email", {
	method: "POST",
	operationId: "signInEmail",
	use: [formCsrfMiddleware],
	body: z$2.object({
		email: z$2.string().meta({ description: "Email of the user" }),
		password: z$2.string().meta({ description: "Password of the user" }),
		callbackURL: z$2.string().meta({ description: "Callback URL to use as a redirect for email verification" }).optional(),
		rememberMe: z$2.boolean().meta({ description: "If this is false, the session will not be remembered. Default is `true`." }).default(true).optional()
	}),
	metadata: {
		allowedMediaTypes: ["application/x-www-form-urlencoded", "application/json"],
		$Infer: {
			body: {},
			returned: {}
		},
		openapi: {
			operationId: "signInEmail",
			description: "Sign in with email and password",
			responses: { "200": {
				description: "Success - Returns either session details or redirect URL",
				content: { "application/json": { schema: {
					type: "object",
					description: "Session response when idToken is provided",
					properties: {
						redirect: {
							type: "boolean",
							enum: [false]
						},
						token: {
							type: "string",
							description: "Session token"
						},
						url: {
							type: "string",
							nullable: true
						},
						user: {
							type: "object",
							$ref: "#/components/schemas/User"
						}
					},
					required: [
						"redirect",
						"token",
						"user"
					]
				} } }
			} }
		}
	}
}, async (ctx) => {
	if (!ctx.context.options?.emailAndPassword?.enabled) {
		ctx.context.logger.error("Email and password is not enabled. Make sure to enable it in the options on you `auth.ts` file. Check `https://better-auth.com/docs/authentication/email-password` for more!");
		throw APIError.from("BAD_REQUEST", {
			code: "EMAIL_PASSWORD_DISABLED",
			message: "Email and password is not enabled"
		});
	}
	const { email, password } = ctx.body;
	if (!z$2.email().safeParse(email).success) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_EMAIL);
	const user$1 = await ctx.context.internalAdapter.findUserByEmail(email, { includeAccounts: true });
	if (!user$1) {
		await ctx.context.password.hash(password);
		ctx.context.logger.error("User not found", { email });
		throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD);
	}
	const credentialAccount = user$1.accounts.find((a) => a.providerId === "credential");
	if (!credentialAccount) {
		await ctx.context.password.hash(password);
		ctx.context.logger.error("Credential account not found", { email });
		throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD);
	}
	const currentPassword = credentialAccount?.password;
	if (!currentPassword) {
		await ctx.context.password.hash(password);
		ctx.context.logger.error("Password not found", { email });
		throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD);
	}
	if (!await ctx.context.password.verify({
		hash: currentPassword,
		password
	})) {
		ctx.context.logger.error("Invalid password");
		throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD);
	}
	if (ctx.context.options?.emailAndPassword?.requireEmailVerification && !user$1.user.emailVerified) {
		if (!ctx.context.options?.emailVerification?.sendVerificationEmail) throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.EMAIL_NOT_VERIFIED);
		if (ctx.context.options?.emailVerification?.sendOnSignIn) {
			const token = await createEmailVerificationToken(ctx.context.secret, user$1.user.email, void 0, ctx.context.options.emailVerification?.expiresIn);
			const callbackURL = ctx.body.callbackURL ? encodeURIComponent(ctx.body.callbackURL) : encodeURIComponent("/");
			const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${callbackURL}`;
			await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
				user: user$1.user,
				url,
				token
			}, ctx.request));
		}
		throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.EMAIL_NOT_VERIFIED);
	}
	const session$1 = await ctx.context.internalAdapter.createSession(user$1.user.id, ctx.body.rememberMe === false);
	if (!session$1) {
		ctx.context.logger.error("Failed to create session");
		throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION);
	}
	await setSessionCookie(ctx, {
		session: session$1,
		user: user$1.user
	}, ctx.body.rememberMe === false);
	if (ctx.body.callbackURL) ctx.setHeader("Location", ctx.body.callbackURL);
	return ctx.json({
		redirect: !!ctx.body.callbackURL,
		token: session$1.token,
		url: ctx.body.callbackURL,
		user: parseUserOutput(ctx.context.options, user$1.user)
	});
});
var signOut = createAuthEndpoint("/sign-out", {
	method: "POST",
	operationId: "signOut",
	requireHeaders: true,
	metadata: { openapi: {
		operationId: "signOut",
		description: "Sign out the current user",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { success: { type: "boolean" } }
			} } }
		} }
	} }
}, async (ctx) => {
	const sessionCookieToken = await ctx.getSignedCookie(ctx.context.authCookies.sessionToken.name, ctx.context.secret);
	if (sessionCookieToken) try {
		await ctx.context.internalAdapter.deleteSession(sessionCookieToken);
	} catch (e) {
		ctx.context.logger.error("Failed to delete session from database", e);
	}
	deleteSessionCookie(ctx);
	return ctx.json({ success: true });
});
var signUpEmailBodySchema = z$2.object({
	name: z$2.string(),
	email: z$2.email(),
	password: z$2.string().nonempty(),
	image: z$2.string().optional(),
	callbackURL: z$2.string().optional(),
	rememberMe: z$2.boolean().optional()
}).and(z$2.record(z$2.string(), z$2.any()));
var signUpEmail = () => createAuthEndpoint("/sign-up/email", {
	method: "POST",
	operationId: "signUpWithEmailAndPassword",
	use: [formCsrfMiddleware],
	body: signUpEmailBodySchema,
	metadata: {
		allowedMediaTypes: ["application/x-www-form-urlencoded", "application/json"],
		$Infer: {
			body: {},
			returned: {}
		},
		openapi: {
			operationId: "signUpWithEmailAndPassword",
			description: "Sign up a user using email and password",
			requestBody: { content: { "application/json": { schema: {
				type: "object",
				properties: {
					name: {
						type: "string",
						description: "The name of the user"
					},
					email: {
						type: "string",
						description: "The email of the user"
					},
					password: {
						type: "string",
						description: "The password of the user"
					},
					image: {
						type: "string",
						description: "The profile image URL of the user"
					},
					callbackURL: {
						type: "string",
						description: "The URL to use for email verification callback"
					},
					rememberMe: {
						type: "boolean",
						description: "If this is false, the session will not be remembered. Default is `true`."
					}
				},
				required: [
					"name",
					"email",
					"password"
				]
			} } } },
			responses: {
				"200": {
					description: "Successfully created user",
					content: { "application/json": { schema: {
						type: "object",
						properties: {
							token: {
								type: "string",
								nullable: true,
								description: "Authentication token for the session"
							},
							user: {
								type: "object",
								properties: {
									id: {
										type: "string",
										description: "The unique identifier of the user"
									},
									email: {
										type: "string",
										format: "email",
										description: "The email address of the user"
									},
									name: {
										type: "string",
										description: "The name of the user"
									},
									image: {
										type: "string",
										format: "uri",
										nullable: true,
										description: "The profile image URL of the user"
									},
									emailVerified: {
										type: "boolean",
										description: "Whether the email has been verified"
									},
									createdAt: {
										type: "string",
										format: "date-time",
										description: "When the user was created"
									},
									updatedAt: {
										type: "string",
										format: "date-time",
										description: "When the user was last updated"
									}
								},
								required: [
									"id",
									"email",
									"name",
									"emailVerified",
									"createdAt",
									"updatedAt"
								]
							}
						},
						required: ["user"]
					} } }
				},
				"422": {
					description: "Unprocessable Entity. User already exists or failed to create user.",
					content: { "application/json": { schema: {
						type: "object",
						properties: { message: { type: "string" } }
					} } }
				}
			}
		}
	}
}, async (ctx) => {
	return runWithTransaction(ctx.context.adapter, async () => {
		if (!ctx.context.options.emailAndPassword?.enabled || ctx.context.options.emailAndPassword?.disableSignUp) throw APIError.from("BAD_REQUEST", {
			message: "Email and password sign up is not enabled",
			code: "EMAIL_PASSWORD_SIGN_UP_DISABLED"
		});
		const body = ctx.body;
		const { name, email, password, image, callbackURL: _callbackURL, rememberMe, ...rest } = body;
		if (!z$2.email().safeParse(email).success) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_EMAIL);
		if (!password || typeof password !== "string") throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
		const minPasswordLength = ctx.context.password.config.minPasswordLength;
		if (password.length < minPasswordLength) {
			ctx.context.logger.error("Password is too short");
			throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_SHORT);
		}
		const maxPasswordLength = ctx.context.password.config.maxPasswordLength;
		if (password.length > maxPasswordLength) {
			ctx.context.logger.error("Password is too long");
			throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_LONG);
		}
		const shouldReturnGenericDuplicateResponse = ctx.context.options.emailAndPassword.requireEmailVerification;
		const shouldSkipAutoSignIn = ctx.context.options.emailAndPassword.autoSignIn === false || shouldReturnGenericDuplicateResponse;
		const additionalUserFields = parseUserInput(ctx.context.options, rest, "create");
		const normalizedEmail = email.toLowerCase();
		const dbUser = await ctx.context.internalAdapter.findUserByEmail(normalizedEmail);
		if (dbUser?.user) {
			ctx.context.logger.info(`Sign-up attempt for existing email: ${email}`);
			if (shouldReturnGenericDuplicateResponse) {
				await ctx.context.password.hash(password);
				if (ctx.context.options.emailAndPassword?.onExistingUserSignUp) await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailAndPassword.onExistingUserSignUp({ user: dbUser.user }, ctx.request));
				const now$1 = /* @__PURE__ */ new Date();
				const generatedId = ctx.context.generateId({ model: "user" }) || generateId();
				const coreFields = {
					name,
					email: normalizedEmail,
					emailVerified: false,
					image: image || null,
					createdAt: now$1,
					updatedAt: now$1
				};
				const customSyntheticUser = ctx.context.options.emailAndPassword?.customSyntheticUser;
				let syntheticUser;
				if (customSyntheticUser) {
					const additionalFieldKeys = Object.keys(ctx.context.options.user?.additionalFields ?? {});
					const additionalFields = {};
					for (const key of additionalFieldKeys) if (key in additionalUserFields) additionalFields[key] = additionalUserFields[key];
					syntheticUser = customSyntheticUser({
						coreFields,
						additionalFields,
						id: generatedId
					});
				} else syntheticUser = {
					...coreFields,
					...additionalUserFields,
					id: generatedId
				};
				return ctx.json({
					token: null,
					user: parseUserOutput(ctx.context.options, syntheticUser)
				});
			}
			throw APIError.from("UNPROCESSABLE_ENTITY", BASE_ERROR_CODES.USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL);
		}
		const hash$1 = await ctx.context.password.hash(password);
		let createdUser;
		try {
			createdUser = await ctx.context.internalAdapter.createUser({
				email: normalizedEmail,
				name,
				image,
				...additionalUserFields,
				emailVerified: false
			});
			if (!createdUser) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.FAILED_TO_CREATE_USER);
		} catch (e) {
			if (isDevelopment()) ctx.context.logger.error("Failed to create user", e);
			if (isAPIError(e)) throw e;
			ctx.context.logger?.error("Failed to create user", e);
			throw APIError.from("UNPROCESSABLE_ENTITY", BASE_ERROR_CODES.FAILED_TO_CREATE_USER);
		}
		if (!createdUser) throw APIError.from("UNPROCESSABLE_ENTITY", BASE_ERROR_CODES.FAILED_TO_CREATE_USER);
		await ctx.context.internalAdapter.linkAccount({
			userId: createdUser.id,
			providerId: "credential",
			accountId: createdUser.id,
			password: hash$1
		});
		if (ctx.context.options.emailVerification?.sendOnSignUp ?? ctx.context.options.emailAndPassword.requireEmailVerification) {
			const token = await createEmailVerificationToken(ctx.context.secret, createdUser.email, void 0, ctx.context.options.emailVerification?.expiresIn);
			const callbackURL = body.callbackURL ? encodeURIComponent(body.callbackURL) : encodeURIComponent("/");
			const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${callbackURL}`;
			if (ctx.context.options.emailVerification?.sendVerificationEmail) await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
				user: createdUser,
				url,
				token
			}, ctx.request));
		}
		if (shouldSkipAutoSignIn) return ctx.json({
			token: null,
			user: parseUserOutput(ctx.context.options, createdUser)
		});
		const session$1 = await ctx.context.internalAdapter.createSession(createdUser.id, rememberMe === false);
		if (!session$1) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION);
		await setSessionCookie(ctx, {
			session: session$1,
			user: createdUser
		}, rememberMe === false);
		return ctx.json({
			token: session$1.token,
			user: parseUserOutput(ctx.context.options, createdUser)
		});
	});
});
var updateSessionBodySchema = z$2.record(z$2.string().meta({ description: "Field name must be a string" }), z$2.any());
var updateSession = () => createAuthEndpoint("/update-session", {
	method: "POST",
	operationId: "updateSession",
	body: updateSessionBodySchema,
	use: [sessionMiddleware],
	metadata: {
		$Infer: { body: {} },
		openapi: {
			operationId: "updateSession",
			description: "Update the current session",
			responses: { "200": {
				description: "Success",
				content: { "application/json": { schema: {
					type: "object",
					properties: { session: {
						type: "object",
						$ref: "#/components/schemas/Session"
					} }
				} } }
			} }
		}
	}
}, async (ctx) => {
	const body = ctx.body;
	if (typeof body !== "object" || Array.isArray(body)) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.BODY_MUST_BE_AN_OBJECT);
	const session$1 = ctx.context.session;
	const additionalFields = parseSessionInput(ctx.context.options, body, "update");
	if (Object.keys(additionalFields).length === 0) throw APIError.fromStatus("BAD_REQUEST", { message: "No fields to update" });
	const newSession = await ctx.context.internalAdapter.updateSession(session$1.session.token, {
		...additionalFields,
		updatedAt: /* @__PURE__ */ new Date()
	}) ?? {
		...session$1.session,
		...additionalFields,
		updatedAt: /* @__PURE__ */ new Date()
	};
	await setSessionCookie(ctx, {
		session: newSession,
		user: session$1.user
	});
	return ctx.json({ session: parseSessionOutput(ctx.context.options, newSession) });
});
var updateUserBodySchema = z$2.record(z$2.string().meta({ description: "Field name must be a string" }), z$2.any());
var updateUser = () => createAuthEndpoint("/update-user", {
	method: "POST",
	operationId: "updateUser",
	body: updateUserBodySchema,
	use: [sessionMiddleware],
	metadata: {
		$Infer: { body: {} },
		openapi: {
			operationId: "updateUser",
			description: "Update the current user",
			requestBody: { content: { "application/json": { schema: {
				type: "object",
				properties: {
					name: {
						type: "string",
						description: "The name of the user"
					},
					image: {
						type: "string",
						description: "The image of the user",
						nullable: true
					}
				}
			} } } },
			responses: { "200": {
				description: "Success",
				content: { "application/json": { schema: {
					type: "object",
					properties: { user: {
						type: "object",
						$ref: "#/components/schemas/User"
					} }
				} } }
			} }
		}
	}
}, async (ctx) => {
	const body = ctx.body;
	if (typeof body !== "object" || Array.isArray(body)) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.BODY_MUST_BE_AN_OBJECT);
	if (body.email) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.EMAIL_CAN_NOT_BE_UPDATED);
	const { name, image, ...rest } = body;
	const session$1 = ctx.context.session;
	const additionalFields = parseUserInput(ctx.context.options, rest, "update");
	if (image === void 0 && name === void 0 && Object.keys(additionalFields).length === 0) throw APIError.fromStatus("BAD_REQUEST", { message: "No fields to update" });
	const updatedUser = await ctx.context.internalAdapter.updateUser(session$1.user.id, {
		name,
		image,
		...additionalFields
	}) ?? {
		...session$1.user,
		...name !== void 0 && { name },
		...image !== void 0 && { image },
		...additionalFields
	};
	await setSessionCookie(ctx, {
		session: session$1.session,
		user: updatedUser
	});
	return ctx.json({ status: true });
});
var changePassword = createAuthEndpoint("/change-password", {
	method: "POST",
	operationId: "changePassword",
	body: z$2.object({
		newPassword: z$2.string().meta({ description: "The new password to set" }),
		currentPassword: z$2.string().meta({ description: "The current password is required" }),
		revokeOtherSessions: z$2.boolean().meta({ description: "Must be a boolean value" }).optional()
	}),
	use: [sensitiveSessionMiddleware],
	metadata: { openapi: {
		operationId: "changePassword",
		description: "Change the password of the user",
		responses: { "200": {
			description: "Password successfully changed",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					token: {
						type: "string",
						nullable: true,
						description: "New session token if other sessions were revoked"
					},
					user: {
						type: "object",
						properties: {
							id: {
								type: "string",
								description: "The unique identifier of the user"
							},
							email: {
								type: "string",
								format: "email",
								description: "The email address of the user"
							},
							name: {
								type: "string",
								description: "The name of the user"
							},
							image: {
								type: "string",
								format: "uri",
								nullable: true,
								description: "The profile image URL of the user"
							},
							emailVerified: {
								type: "boolean",
								description: "Whether the email has been verified"
							},
							createdAt: {
								type: "string",
								format: "date-time",
								description: "When the user was created"
							},
							updatedAt: {
								type: "string",
								format: "date-time",
								description: "When the user was last updated"
							}
						},
						required: [
							"id",
							"email",
							"name",
							"emailVerified",
							"createdAt",
							"updatedAt"
						]
					}
				},
				required: ["user"]
			} } }
		} }
	} }
}, async (ctx) => {
	const { newPassword, currentPassword, revokeOtherSessions: revokeOtherSessions$1 } = ctx.body;
	const session$1 = ctx.context.session;
	const minPasswordLength = ctx.context.password.config.minPasswordLength;
	if (newPassword.length < minPasswordLength) {
		ctx.context.logger.error("Password is too short");
		throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_SHORT);
	}
	const maxPasswordLength = ctx.context.password.config.maxPasswordLength;
	if (newPassword.length > maxPasswordLength) {
		ctx.context.logger.error("Password is too long");
		throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_LONG);
	}
	const account$1 = (await ctx.context.internalAdapter.findAccounts(session$1.user.id)).find((account$2) => account$2.providerId === "credential" && account$2.password);
	if (!account$1 || !account$1.password) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.CREDENTIAL_ACCOUNT_NOT_FOUND);
	const passwordHash = await ctx.context.password.hash(newPassword);
	if (!await ctx.context.password.verify({
		hash: account$1.password,
		password: currentPassword
	})) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
	await ctx.context.internalAdapter.updateAccount(account$1.id, { password: passwordHash });
	let token = null;
	if (revokeOtherSessions$1) {
		await ctx.context.internalAdapter.deleteSessions(session$1.user.id);
		const newSession = await ctx.context.internalAdapter.createSession(session$1.user.id);
		if (!newSession) throw APIError.from("INTERNAL_SERVER_ERROR", BASE_ERROR_CODES.FAILED_TO_GET_SESSION);
		await setSessionCookie(ctx, {
			session: newSession,
			user: session$1.user
		});
		token = newSession.token;
	}
	return ctx.json({
		token,
		user: parseUserOutput(ctx.context.options, session$1.user)
	});
});
var setPassword = createAuthEndpoint({
	method: "POST",
	body: z$2.object({ newPassword: z$2.string().meta({ description: "The new password to set is required" }) }),
	use: [sensitiveSessionMiddleware]
}, async (ctx) => {
	const { newPassword } = ctx.body;
	const session$1 = ctx.context.session;
	const minPasswordLength = ctx.context.password.config.minPasswordLength;
	if (newPassword.length < minPasswordLength) {
		ctx.context.logger.error("Password is too short");
		throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_SHORT);
	}
	const maxPasswordLength = ctx.context.password.config.maxPasswordLength;
	if (newPassword.length > maxPasswordLength) {
		ctx.context.logger.error("Password is too long");
		throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_LONG);
	}
	const account$1 = (await ctx.context.internalAdapter.findAccounts(session$1.user.id)).find((account$2) => account$2.providerId === "credential" && account$2.password);
	const passwordHash = await ctx.context.password.hash(newPassword);
	if (!account$1) {
		await ctx.context.internalAdapter.linkAccount({
			userId: session$1.user.id,
			providerId: "credential",
			accountId: session$1.user.id,
			password: passwordHash
		});
		return ctx.json({ status: true });
	}
	throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_ALREADY_SET);
});
var deleteUser = createAuthEndpoint("/delete-user", {
	method: "POST",
	use: [sensitiveSessionMiddleware],
	body: z$2.object({
		callbackURL: z$2.string().meta({ description: "The callback URL to redirect to after the user is deleted" }).optional(),
		password: z$2.string().meta({ description: "The password of the user is required to delete the user" }).optional(),
		token: z$2.string().meta({ description: "The token to delete the user is required" }).optional()
	}),
	metadata: { openapi: {
		operationId: "deleteUser",
		description: "Delete the user",
		requestBody: { content: { "application/json": { schema: {
			type: "object",
			properties: {
				callbackURL: {
					type: "string",
					description: "The callback URL to redirect to after the user is deleted"
				},
				password: {
					type: "string",
					description: "The user's password. Required if session is not fresh"
				},
				token: {
					type: "string",
					description: "The deletion verification token"
				}
			}
		} } } },
		responses: { "200": {
			description: "User deletion processed successfully",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					success: {
						type: "boolean",
						description: "Indicates if the operation was successful"
					},
					message: {
						type: "string",
						enum: ["User deleted", "Verification email sent"],
						description: "Status message of the deletion process"
					}
				},
				required: ["success", "message"]
			} } }
		} }
	} }
}, async (ctx) => {
	if (!ctx.context.options.user?.deleteUser?.enabled) {
		ctx.context.logger.error("Delete user is disabled. Enable it in the options");
		throw APIError.fromStatus("NOT_FOUND");
	}
	const session$1 = ctx.context.session;
	if (ctx.body.password) {
		const account$1 = (await ctx.context.internalAdapter.findAccounts(session$1.user.id)).find((account$2) => account$2.providerId === "credential" && account$2.password);
		if (!account$1 || !account$1.password) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.CREDENTIAL_ACCOUNT_NOT_FOUND);
		if (!await ctx.context.password.verify({
			hash: account$1.password,
			password: ctx.body.password
		})) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
	}
	if (ctx.body.token) {
		await deleteUserCallback({
			...ctx,
			query: { token: ctx.body.token }
		});
		return ctx.json({
			success: true,
			message: "User deleted"
		});
	}
	if (ctx.context.options.user.deleteUser?.sendDeleteAccountVerification) {
		const token = generateRandomString(32, "0-9", "a-z");
		await ctx.context.internalAdapter.createVerificationValue({
			value: session$1.user.id,
			identifier: `delete-account-${token}`,
			expiresAt: new Date(Date.now() + (ctx.context.options.user.deleteUser?.deleteTokenExpiresIn || 3600 * 24) * 1e3)
		});
		const url = `${ctx.context.baseURL}/delete-user/callback?token=${token}&callbackURL=${encodeURIComponent(ctx.body.callbackURL || "/")}`;
		await ctx.context.runInBackgroundOrAwait(ctx.context.options.user.deleteUser.sendDeleteAccountVerification({
			user: session$1.user,
			url,
			token
		}, ctx.request));
		return ctx.json({
			success: true,
			message: "Verification email sent"
		});
	}
	if (!ctx.body.password && ctx.context.sessionConfig.freshAge !== 0) {
		const createdAt = new Date(session$1.session.createdAt).getTime();
		const freshAge = ctx.context.sessionConfig.freshAge * 1e3;
		if (Date.now() - createdAt >= freshAge) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.SESSION_EXPIRED);
	}
	const beforeDelete = ctx.context.options.user.deleteUser?.beforeDelete;
	if (beforeDelete) await beforeDelete(session$1.user, ctx.request);
	await ctx.context.internalAdapter.deleteUser(session$1.user.id);
	await ctx.context.internalAdapter.deleteSessions(session$1.user.id);
	deleteSessionCookie(ctx);
	const afterDelete = ctx.context.options.user.deleteUser?.afterDelete;
	if (afterDelete) await afterDelete(session$1.user, ctx.request);
	return ctx.json({
		success: true,
		message: "User deleted"
	});
});
var deleteUserCallback = createAuthEndpoint("/delete-user/callback", {
	method: "GET",
	query: z$2.object({
		token: z$2.string().meta({ description: "The token to verify the deletion request" }),
		callbackURL: z$2.string().meta({ description: "The URL to redirect to after deletion" }).optional()
	}),
	use: [originCheck((ctx) => ctx.query.callbackURL)],
	metadata: { openapi: {
		description: "Callback to complete user deletion with verification token",
		responses: { "200": {
			description: "User successfully deleted",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					success: {
						type: "boolean",
						description: "Indicates if the deletion was successful"
					},
					message: {
						type: "string",
						enum: ["User deleted"],
						description: "Confirmation message"
					}
				},
				required: ["success", "message"]
			} } }
		} }
	} }
}, async (ctx) => {
	if (!ctx.context.options.user?.deleteUser?.enabled) {
		ctx.context.logger.error("Delete user is disabled. Enable it in the options");
		throw APIError.from("NOT_FOUND", {
			message: "Not found",
			code: "NOT_FOUND"
		});
	}
	const session$1 = await getSessionFromCtx(ctx);
	if (!session$1) throw APIError.from("NOT_FOUND", BASE_ERROR_CODES.FAILED_TO_GET_USER_INFO);
	const token = await ctx.context.internalAdapter.findVerificationValue(`delete-account-${ctx.query.token}`);
	if (!token || token.expiresAt < /* @__PURE__ */ new Date()) throw APIError.from("NOT_FOUND", BASE_ERROR_CODES.INVALID_TOKEN);
	if (token.value !== session$1.user.id) throw APIError.from("NOT_FOUND", BASE_ERROR_CODES.INVALID_TOKEN);
	const beforeDelete = ctx.context.options.user.deleteUser?.beforeDelete;
	if (beforeDelete) await beforeDelete(session$1.user, ctx.request);
	await ctx.context.internalAdapter.deleteUser(session$1.user.id);
	await ctx.context.internalAdapter.deleteSessions(session$1.user.id);
	await ctx.context.internalAdapter.deleteAccounts(session$1.user.id);
	await ctx.context.internalAdapter.deleteVerificationByIdentifier(`delete-account-${ctx.query.token}`);
	deleteSessionCookie(ctx);
	const afterDelete = ctx.context.options.user.deleteUser?.afterDelete;
	if (afterDelete) await afterDelete(session$1.user, ctx.request);
	if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL || "/");
	return ctx.json({
		success: true,
		message: "User deleted"
	});
});
var changeEmail = createAuthEndpoint("/change-email", {
	method: "POST",
	body: z$2.object({
		newEmail: z$2.email().meta({ description: "The new email address to set must be a valid email address" }),
		callbackURL: z$2.string().meta({ description: "The URL to redirect to after email verification" }).optional()
	}),
	use: [sensitiveSessionMiddleware],
	metadata: { openapi: {
		operationId: "changeEmail",
		responses: { "200": {
			description: "Email change request processed successfully",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					user: {
						type: "object",
						$ref: "#/components/schemas/User"
					},
					status: {
						type: "boolean",
						description: "Indicates if the request was successful"
					},
					message: {
						type: "string",
						enum: ["Email updated", "Verification email sent"],
						description: "Status message of the email change process",
						nullable: true
					}
				},
				required: ["status"]
			} } }
		} }
	} }
}, async (ctx) => {
	if (!ctx.context.options.user?.changeEmail?.enabled) {
		ctx.context.logger.error("Change email is disabled.");
		throw APIError.fromStatus("BAD_REQUEST", { message: "Change email is disabled" });
	}
	const newEmail = ctx.body.newEmail.toLowerCase();
	if (newEmail === ctx.context.session.user.email) {
		ctx.context.logger.error("Email is the same");
		throw APIError.fromStatus("BAD_REQUEST", { message: "Email is the same" });
	}
	const canUpdateWithoutVerification = ctx.context.session.user.emailVerified !== true && ctx.context.options.user.changeEmail.updateEmailWithoutVerification;
	const canSendConfirmation = ctx.context.session.user.emailVerified && ctx.context.options.user.changeEmail.sendChangeEmailConfirmation;
	const canSendVerification = ctx.context.options.emailVerification?.sendVerificationEmail;
	if (!canUpdateWithoutVerification && !canSendConfirmation && !canSendVerification) {
		ctx.context.logger.error("Verification email isn't enabled.");
		throw APIError.fromStatus("BAD_REQUEST", { message: "Verification email isn't enabled" });
	}
	if (await ctx.context.internalAdapter.findUserByEmail(newEmail)) {
		await createEmailVerificationToken(ctx.context.secret, ctx.context.session.user.email, newEmail, ctx.context.options.emailVerification?.expiresIn);
		ctx.context.logger.info("Change email attempt for existing email");
		return ctx.json({ status: true });
	}
	if (canUpdateWithoutVerification) {
		await ctx.context.internalAdapter.updateUserByEmail(ctx.context.session.user.email, { email: newEmail });
		await setSessionCookie(ctx, {
			session: ctx.context.session.session,
			user: {
				...ctx.context.session.user,
				email: newEmail
			}
		});
		if (canSendVerification) {
			const token$1 = await createEmailVerificationToken(ctx.context.secret, newEmail, void 0, ctx.context.options.emailVerification?.expiresIn);
			const url$1 = `${ctx.context.baseURL}/verify-email?token=${token$1}&callbackURL=${ctx.body.callbackURL || "/"}`;
			await ctx.context.runInBackgroundOrAwait(canSendVerification({
				user: {
					...ctx.context.session.user,
					email: newEmail
				},
				url: url$1,
				token: token$1
			}, ctx.request));
		}
		return ctx.json({ status: true });
	}
	if (canSendConfirmation) {
		const token$1 = await createEmailVerificationToken(ctx.context.secret, ctx.context.session.user.email, newEmail, ctx.context.options.emailVerification?.expiresIn, { requestType: "change-email-confirmation" });
		const url$1 = `${ctx.context.baseURL}/verify-email?token=${token$1}&callbackURL=${ctx.body.callbackURL || "/"}`;
		await ctx.context.runInBackgroundOrAwait(canSendConfirmation({
			user: ctx.context.session.user,
			newEmail,
			url: url$1,
			token: token$1
		}, ctx.request));
		return ctx.json({ status: true });
	}
	if (!canSendVerification) {
		ctx.context.logger.error("Verification email isn't enabled.");
		throw APIError.fromStatus("BAD_REQUEST", { message: "Verification email isn't enabled" });
	}
	const token = await createEmailVerificationToken(ctx.context.secret, ctx.context.session.user.email, newEmail, ctx.context.options.emailVerification?.expiresIn, { requestType: "change-email-verification" });
	const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${ctx.body.callbackURL || "/"}`;
	await ctx.context.runInBackgroundOrAwait(canSendVerification({
		user: {
			...ctx.context.session.user,
			email: newEmail
		},
		url,
		token
	}, ctx.request));
	return ctx.json({ status: true });
});
function isErrorStackTraceLimitWritable() {
	const desc$1 = Object.getOwnPropertyDescriptor(Error, "stackTraceLimit");
	if (desc$1 === void 0) return Object.isExtensible(Error);
	return Object.prototype.hasOwnProperty.call(desc$1, "writable") ? desc$1.writable : desc$1.set !== void 0;
}
function hideInternalStackFrames(stack) {
	const lines = stack.split("\n    at ");
	if (lines.length <= 1) return stack;
	lines.splice(1, 1);
	return lines.join("\n    at ");
}
function makeErrorForHideStackFrame(Base, clazz) {
	class HideStackFramesError extends Base {
		#hiddenStack;
		constructor(...args) {
			if (isErrorStackTraceLimitWritable()) {
				const limit = Error.stackTraceLimit;
				Error.stackTraceLimit = 0;
				super(...args);
				Error.stackTraceLimit = limit;
			} else super(...args);
			const stack = (/* @__PURE__ */ new Error()).stack;
			if (stack) this.#hiddenStack = hideInternalStackFrames(stack.replace(/^Error/, this.name));
		}
		get errorStack() {
			return this.#hiddenStack;
		}
	}
	Object.defineProperty(HideStackFramesError.prototype, "constructor", {
		get() {
			return clazz;
		},
		enumerable: false,
		configurable: true
	});
	return HideStackFramesError;
}
var statusCodes = {
	OK: 200,
	CREATED: 201,
	ACCEPTED: 202,
	NO_CONTENT: 204,
	MULTIPLE_CHOICES: 300,
	MOVED_PERMANENTLY: 301,
	FOUND: 302,
	SEE_OTHER: 303,
	NOT_MODIFIED: 304,
	TEMPORARY_REDIRECT: 307,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	PAYMENT_REQUIRED: 402,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	NOT_ACCEPTABLE: 406,
	PROXY_AUTHENTICATION_REQUIRED: 407,
	REQUEST_TIMEOUT: 408,
	CONFLICT: 409,
	GONE: 410,
	LENGTH_REQUIRED: 411,
	PRECONDITION_FAILED: 412,
	PAYLOAD_TOO_LARGE: 413,
	URI_TOO_LONG: 414,
	UNSUPPORTED_MEDIA_TYPE: 415,
	RANGE_NOT_SATISFIABLE: 416,
	EXPECTATION_FAILED: 417,
	"I'M_A_TEAPOT": 418,
	MISDIRECTED_REQUEST: 421,
	UNPROCESSABLE_ENTITY: 422,
	LOCKED: 423,
	FAILED_DEPENDENCY: 424,
	TOO_EARLY: 425,
	UPGRADE_REQUIRED: 426,
	PRECONDITION_REQUIRED: 428,
	TOO_MANY_REQUESTS: 429,
	REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
	UNAVAILABLE_FOR_LEGAL_REASONS: 451,
	INTERNAL_SERVER_ERROR: 500,
	NOT_IMPLEMENTED: 501,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIMEOUT: 504,
	HTTP_VERSION_NOT_SUPPORTED: 505,
	VARIANT_ALSO_NEGOTIATES: 506,
	INSUFFICIENT_STORAGE: 507,
	LOOP_DETECTED: 508,
	NOT_EXTENDED: 510,
	NETWORK_AUTHENTICATION_REQUIRED: 511
};
var InternalAPIError = class extends Error {
	constructor(status = "INTERNAL_SERVER_ERROR", body = void 0, headers = {}, statusCode = typeof status === "number" ? status : statusCodes[status]) {
		super(body?.message, body?.cause ? { cause: body.cause } : void 0);
		this.status = status;
		this.body = body;
		this.headers = headers;
		this.statusCode = statusCode;
		this.name = "APIError";
		this.status = status;
		this.headers = headers;
		this.statusCode = statusCode;
		this.body = body;
	}
};
var ValidationError = class extends InternalAPIError {
	constructor(message$1, issues) {
		super(400, {
			message: message$1,
			code: "VALIDATION_ERROR"
		});
		this.message = message$1;
		this.issues = issues;
		this.issues = issues;
	}
};
var BetterCallError = class extends Error {
	constructor(message$1) {
		super(message$1);
		this.name = "BetterCallError";
	}
};
var kAPIErrorHeaderSymbol = Symbol.for("better-call:api-error-headers");
var APIError$2 = makeErrorForHideStackFrame(InternalAPIError, Error);
var jsonContentTypeRegex = /^application\/([a-z0-9.+-]*\+)?json/i;
async function getBody(request, allowedMediaTypes) {
	const contentType = request.headers.get("content-type") || "";
	const normalizedContentType = contentType.toLowerCase();
	if (!request.body) return;
	if (allowedMediaTypes && allowedMediaTypes.length > 0) {
		if (!allowedMediaTypes.some((allowed$1) => {
			const normalizedContentTypeBase = normalizedContentType.split(";")[0].trim();
			const normalizedAllowed = allowed$1.toLowerCase().trim();
			return normalizedContentTypeBase === normalizedAllowed || normalizedContentTypeBase.includes(normalizedAllowed);
		})) {
			if (!normalizedContentType) throw new APIError$2(415, {
				message: `Content-Type is required. Allowed types: ${allowedMediaTypes.join(", ")}`,
				code: "UNSUPPORTED_MEDIA_TYPE"
			});
			throw new APIError$2(415, {
				message: `Content-Type "${contentType}" is not allowed. Allowed types: ${allowedMediaTypes.join(", ")}`,
				code: "UNSUPPORTED_MEDIA_TYPE"
			});
		}
	}
	if (jsonContentTypeRegex.test(normalizedContentType)) return await request.json();
	if (normalizedContentType.includes("application/x-www-form-urlencoded")) {
		const formData = await request.formData();
		const result = {};
		formData.forEach((value, key) => {
			result[key] = value.toString();
		});
		return result;
	}
	if (normalizedContentType.includes("multipart/form-data")) {
		const formData = await request.formData();
		const result = {};
		formData.forEach((value, key) => {
			result[key] = value;
		});
		return result;
	}
	if (normalizedContentType.includes("text/plain")) return await request.text();
	if (normalizedContentType.includes("application/octet-stream")) return await request.arrayBuffer();
	if (normalizedContentType.includes("application/pdf") || normalizedContentType.includes("image/") || normalizedContentType.includes("video/")) return await request.blob();
	if (normalizedContentType.includes("application/stream") || request.body instanceof ReadableStream) return request.body;
	return await request.text();
}
function isAPIError$1(error$1) {
	return error$1 instanceof APIError$2 || error$1?.name === "APIError";
}
function tryDecode(str) {
	try {
		return str.includes("%") ? decodeURIComponent(str) : str;
	} catch {
		return str;
	}
}
async function tryCatch(promise) {
	try {
		return {
			data: await promise,
			error: null
		};
	} catch (error$1) {
		return {
			data: null,
			error: error$1
		};
	}
}
function isRequest(obj) {
	return obj instanceof Request || Object.prototype.toString.call(obj) === "[object Request]";
}
function isJSONSerializable(value) {
	if (value === void 0) return false;
	const t = typeof value;
	if (t === "string" || t === "number" || t === "boolean" || t === null) return true;
	if (t !== "object") return false;
	if (Array.isArray(value)) return true;
	if (value.buffer) return false;
	return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
function safeStringify(obj, replacer, space) {
	let id = 0;
	const seen = /* @__PURE__ */ new WeakMap();
	const safeReplacer = (key, value) => {
		if (typeof value === "bigint") return value.toString();
		if (typeof value === "object" && value !== null) {
			if (seen.has(value)) return `[Circular ref-${seen.get(value)}]`;
			seen.set(value, id++);
		}
		if (replacer) return replacer(key, value);
		return value;
	};
	return JSON.stringify(obj, safeReplacer, space);
}
function isJSONResponse(value) {
	if (!value || typeof value !== "object") return false;
	return "_flag" in value && value._flag === "json";
}
var REQUEST_ONLY_HEADERS = new Set([
	"host",
	"user-agent",
	"referer",
	"from",
	"expect",
	"authorization",
	"proxy-authorization",
	"cookie",
	"origin",
	"accept-charset",
	"accept-encoding",
	"accept-language",
	"if-match",
	"if-none-match",
	"if-modified-since",
	"if-unmodified-since",
	"if-range",
	"range",
	"max-forwards",
	"connection",
	"keep-alive",
	"transfer-encoding",
	"te",
	"upgrade",
	"trailer",
	"proxy-connection",
	"content-length"
]);
function stripRequestOnlyHeaders(headers) {
	for (const name of REQUEST_ONLY_HEADERS) headers.delete(name);
}
function toResponse(data, init) {
	if (data instanceof Response) {
		if (init?.headers) {
			const safeHeaders = new Headers(init.headers);
			stripRequestOnlyHeaders(safeHeaders);
			safeHeaders.forEach((value, key) => {
				data.headers.set(key, value);
			});
		}
		return data;
	}
	if (isJSONResponse(data)) {
		const body$1 = data.body;
		const routerResponse = data.routerResponse;
		if (routerResponse instanceof Response) return routerResponse;
		const headers$1 = new Headers();
		if (routerResponse?.headers) {
			const headers$2 = new Headers(routerResponse.headers);
			for (const [key, value] of headers$2.entries()) headers$2.set(key, value);
		}
		if (data.headers) for (const [key, value] of new Headers(data.headers).entries()) headers$1.set(key, value);
		if (init?.headers) {
			const safeHeaders = new Headers(init.headers);
			stripRequestOnlyHeaders(safeHeaders);
			for (const [key, value] of safeHeaders.entries()) headers$1.set(key, value);
		}
		headers$1.set("Content-Type", "application/json");
		return new Response(JSON.stringify(body$1), {
			...routerResponse,
			headers: headers$1,
			status: data.status ?? init?.status ?? routerResponse?.status,
			statusText: init?.statusText ?? routerResponse?.statusText
		});
	}
	if (isAPIError$1(data)) return toResponse(data.body, {
		status: init?.status ?? data.statusCode,
		statusText: data.status.toString(),
		headers: init?.headers || data.headers
	});
	let body = data;
	const headers = new Headers(init?.headers);
	stripRequestOnlyHeaders(headers);
	if (!data) {
		if (data === null) body = JSON.stringify(null);
		headers.set("content-type", "application/json");
	} else if (typeof data === "string") {
		body = data;
		headers.set("Content-Type", "text/plain");
	} else if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
		body = data;
		headers.set("Content-Type", "application/octet-stream");
	} else if (data instanceof Blob) {
		body = data;
		headers.set("Content-Type", data.type || "application/octet-stream");
	} else if (data instanceof FormData) body = data;
	else if (data instanceof URLSearchParams) {
		body = data;
		headers.set("Content-Type", "application/x-www-form-urlencoded");
	} else if (data instanceof ReadableStream) {
		body = data;
		headers.set("Content-Type", "application/octet-stream");
	} else if (isJSONSerializable(data)) {
		body = safeStringify(data);
		headers.set("Content-Type", "application/json");
	}
	return new Response(body, {
		...init,
		headers
	});
}
var algorithm = {
	name: "HMAC",
	hash: "SHA-256"
};
var getCryptoKey = async (secret) => {
	const secretBuf = typeof secret === "string" ? new TextEncoder().encode(secret) : secret;
	return await getWebcryptoSubtle().importKey("raw", secretBuf, algorithm, false, ["sign", "verify"]);
};
var verifySignature = async (base64Signature, value, secret) => {
	try {
		const signatureBinStr = atob(base64Signature);
		const signature = new Uint8Array(signatureBinStr.length);
		for (let i = 0, len = signatureBinStr.length; i < len; i++) signature[i] = signatureBinStr.charCodeAt(i);
		return await getWebcryptoSubtle().verify(algorithm, secret, signature, new TextEncoder().encode(value));
	} catch (e) {
		return false;
	}
};
var makeSignature = async (value, secret) => {
	const key = await getCryptoKey(secret);
	const signature = await getWebcryptoSubtle().sign(algorithm.name, key, new TextEncoder().encode(value));
	return btoa(String.fromCharCode(...new Uint8Array(signature)));
};
var signCookieValue = async (value, secret) => {
	const signature = await makeSignature(value, secret);
	value = `${value}.${signature}`;
	value = encodeURIComponent(value);
	return value;
};
var getCookieKey = (key, prefix) => {
	let finalKey = key;
	if (prefix) if (prefix === "secure") finalKey = "__Secure-" + key;
	else if (prefix === "host") finalKey = "__Host-" + key;
	else return;
	return finalKey;
};
function parseCookies(str) {
	if (typeof str !== "string") throw new TypeError("argument str must be a string");
	const cookies = /* @__PURE__ */ new Map();
	let index = 0;
	while (index < str.length) {
		const eqIdx = str.indexOf("=", index);
		if (eqIdx === -1) break;
		let endIdx = str.indexOf(";", index);
		if (endIdx === -1) endIdx = str.length;
		else if (endIdx < eqIdx) {
			index = str.lastIndexOf(";", eqIdx - 1) + 1;
			continue;
		}
		const key = str.slice(index, eqIdx).trim();
		if (!cookies.has(key)) {
			let val = str.slice(eqIdx + 1, endIdx).trim();
			if (val.codePointAt(0) === 34) val = val.slice(1, -1);
			cookies.set(key, tryDecode(val));
		}
		index = endIdx + 1;
	}
	return cookies;
}
var _serialize = (key, value, opt = {}) => {
	let cookie;
	if (opt?.prefix === "secure") cookie = `${`__Secure-${key}`}=${value}`;
	else if (opt?.prefix === "host") cookie = `${`__Host-${key}`}=${value}`;
	else cookie = `${key}=${value}`;
	if (key.startsWith("__Secure-") && !opt.secure) opt.secure = true;
	if (key.startsWith("__Host-")) {
		if (!opt.secure) opt.secure = true;
		if (opt.path !== "/") opt.path = "/";
		if (opt.domain) opt.domain = void 0;
	}
	if (opt && typeof opt.maxAge === "number" && opt.maxAge >= 0) {
		if (opt.maxAge > 3456e4) throw new Error("Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration.");
		cookie += `; Max-Age=${Math.floor(opt.maxAge)}`;
	}
	if (opt.domain && opt.prefix !== "host") cookie += `; Domain=${opt.domain}`;
	if (opt.path) cookie += `; Path=${opt.path}`;
	if (opt.expires) {
		if (opt.expires.getTime() - Date.now() > 3456e7) throw new Error("Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future.");
		cookie += `; Expires=${opt.expires.toUTCString()}`;
	}
	if (opt.httpOnly) cookie += "; HttpOnly";
	if (opt.secure) cookie += "; Secure";
	if (opt.sameSite) cookie += `; SameSite=${opt.sameSite.charAt(0).toUpperCase() + opt.sameSite.slice(1)}`;
	if (opt.partitioned) {
		if (!opt.secure) opt.secure = true;
		cookie += "; Partitioned";
	}
	return cookie;
};
var serializeCookie = (key, value, opt) => {
	value = encodeURIComponent(value);
	return _serialize(key, value, opt);
};
var serializeSignedCookie = async (key, value, secret, opt) => {
	value = await signCookieValue(value, secret);
	return _serialize(key, value, opt);
};
async function runValidation(options, context = {}) {
	let request = {
		body: context.body,
		query: context.query
	};
	if (options.body) {
		const result = await options.body["~standard"].validate(context.body);
		if (result.issues) return {
			data: null,
			error: fromError(result.issues, "body")
		};
		request.body = result.value;
	}
	if (options.query) {
		const result = await options.query["~standard"].validate(context.query);
		if (result.issues) return {
			data: null,
			error: fromError(result.issues, "query")
		};
		request.query = result.value;
	}
	if (options.requireHeaders && !context.headers) return {
		data: null,
		error: {
			message: "Headers is required",
			issues: []
		}
	};
	if (options.requireRequest && !context.request) return {
		data: null,
		error: {
			message: "Request is required",
			issues: []
		}
	};
	return {
		data: request,
		error: null
	};
}
function fromError(error$1, validating) {
	return {
		message: error$1.map((e) => {
			return `[${e.path?.length ? `${validating}.` + e.path.map((x) => typeof x === "object" ? x.key : x).join(".") : validating}] ${e.message}`;
		}).join("; "),
		issues: error$1
	};
}
var createInternalContext = async (context, { options, path: path$1 }) => {
	const headers = new Headers();
	let responseStatus = void 0;
	const { data, error: error$1 } = await runValidation(options, context);
	if (error$1) throw new ValidationError(error$1.message, error$1.issues);
	const requestHeaders = "headers" in context ? context.headers instanceof Headers ? context.headers : new Headers(context.headers) : "request" in context && isRequest(context.request) ? context.request.headers : null;
	const requestCookies = requestHeaders?.get("cookie");
	const parsedCookies = requestCookies ? parseCookies(requestCookies) : void 0;
	const internalContext = {
		...context,
		body: data.body,
		query: data.query,
		path: context.path || path$1 || "virtual:",
		context: "context" in context && context.context ? context.context : {},
		returned: void 0,
		headers: context?.headers,
		request: context?.request,
		params: "params" in context ? context.params : void 0,
		method: context.method ?? (Array.isArray(options.method) ? options.method[0] : options.method === "*" ? "GET" : options.method),
		setHeader: (key, value) => {
			headers.set(key, value);
		},
		getHeader: (key) => {
			if (!requestHeaders) return null;
			return requestHeaders.get(key);
		},
		getCookie: (key, prefix) => {
			const finalKey = getCookieKey(key, prefix);
			if (!finalKey) return null;
			return parsedCookies?.get(finalKey) || null;
		},
		getSignedCookie: async (key, secret, prefix) => {
			const finalKey = getCookieKey(key, prefix);
			if (!finalKey) return null;
			const value = parsedCookies?.get(finalKey);
			if (!value) return null;
			const signatureStartPos = value.lastIndexOf(".");
			if (signatureStartPos < 1) return null;
			const signedValue = value.substring(0, signatureStartPos);
			const signature = value.substring(signatureStartPos + 1);
			if (signature.length !== 44 || !signature.endsWith("=")) return null;
			return await verifySignature(signature, signedValue, await getCryptoKey(secret)) ? signedValue : false;
		},
		setCookie: (key, value, options$1) => {
			const cookie = serializeCookie(key, value, options$1);
			headers.append("set-cookie", cookie);
			return cookie;
		},
		setSignedCookie: async (key, value, secret, options$1) => {
			const cookie = await serializeSignedCookie(key, value, secret, options$1);
			headers.append("set-cookie", cookie);
			return cookie;
		},
		redirect: (url) => {
			headers.set("location", url);
			return new APIError$2("FOUND", void 0, headers);
		},
		error: (status, body, headers$1) => {
			return new APIError$2(status, body, headers$1);
		},
		setStatus: (status) => {
			responseStatus = status;
		},
		json: (json, routerResponse) => {
			if (!context.asResponse) return json;
			return {
				body: routerResponse?.body || json,
				routerResponse,
				_flag: "json"
			};
		},
		responseHeaders: headers,
		get responseStatus() {
			return responseStatus;
		}
	};
	for (const middleware of options.use || []) {
		const response = await middleware({
			...internalContext,
			returnHeaders: true,
			asResponse: false
		});
		if (response.response) Object.assign(internalContext.context, response.response);
		if (response.headers) response.headers.forEach((value, key) => {
			internalContext.responseHeaders.set(key, value);
		});
	}
	return internalContext;
};
function createEndpoint(pathOrOptions, handlerOrOptions, handlerOrNever) {
	const path$1 = typeof pathOrOptions === "string" ? pathOrOptions : void 0;
	const options = typeof handlerOrOptions === "object" ? handlerOrOptions : pathOrOptions;
	const handler$6 = typeof handlerOrOptions === "function" ? handlerOrOptions : handlerOrNever;
	if ((options.method === "GET" || options.method === "HEAD") && options.body) throw new BetterCallError("Body is not allowed with GET or HEAD methods");
	if (path$1 && /\/{2,}/.test(path$1)) throw new BetterCallError("Path cannot contain consecutive slashes");
	const internalHandler = async (...inputCtx) => {
		const context = inputCtx[0] || {};
		const { data: internalContext, error: validationError } = await tryCatch(createInternalContext(context, {
			options,
			path: path$1
		}));
		if (validationError) {
			if (!(validationError instanceof ValidationError)) throw validationError;
			if (options.onValidationError) await options.onValidationError({
				message: validationError.message,
				issues: validationError.issues
			});
			throw new APIError$2(400, {
				message: validationError.message,
				code: "VALIDATION_ERROR"
			});
		}
		const response = await handler$6(internalContext).catch(async (e) => {
			if (isAPIError$1(e)) {
				const onAPIError = options.onAPIError;
				if (onAPIError) await onAPIError(e);
				if (context.asResponse) return e;
			}
			throw e;
		});
		const headers = internalContext.responseHeaders;
		const status = internalContext.responseStatus;
		return context.asResponse ? toResponse(response, {
			headers,
			status
		}) : context.returnHeaders ? context.returnStatus ? {
			headers,
			response,
			status
		} : {
			headers,
			response
		} : context.returnStatus ? {
			response,
			status
		} : response;
	};
	internalHandler.options = options;
	internalHandler.path = path$1;
	return internalHandler;
}
createEndpoint.create = (opts) => {
	return (path$1, options, handler$6) => {
		return createEndpoint(path$1, {
			...options,
			use: [...options?.use || [], ...opts?.use || []]
		}, handler$6);
	};
};
function createMiddleware(optionsOrHandler, handler$6) {
	const internalHandler = async (inputCtx) => {
		const context = inputCtx;
		const _handler = typeof optionsOrHandler === "function" ? optionsOrHandler : handler$6;
		const internalContext = await createInternalContext(context, {
			options: typeof optionsOrHandler === "function" ? {} : optionsOrHandler,
			path: "/"
		});
		if (!_handler) throw new Error("handler must be defined");
		try {
			const response = await _handler(internalContext);
			const headers = internalContext.responseHeaders;
			return context.returnHeaders ? {
				headers,
				response
			} : response;
		} catch (e) {
			if (isAPIError$1(e)) Object.defineProperty(e, kAPIErrorHeaderSymbol, {
				enumerable: false,
				configurable: true,
				get() {
					return internalContext.responseHeaders;
				}
			});
			throw e;
		}
	};
	internalHandler.options = typeof optionsOrHandler === "function" ? {} : optionsOrHandler;
	return internalHandler;
}
createMiddleware.create = (opts) => {
	function fn(optionsOrHandler, handler$6) {
		if (typeof optionsOrHandler === "function") return createMiddleware({ use: opts?.use }, optionsOrHandler);
		if (!handler$6) throw new Error("Middleware handler is required");
		return createMiddleware({
			...optionsOrHandler,
			method: "*",
			use: [...opts?.use || [], ...optionsOrHandler.use || []]
		}, handler$6);
	}
	return fn;
};
var paths = {};
function getTypeFromZodType(zodType) {
	switch (zodType.constructor.name) {
		case "ZodString": return "string";
		case "ZodNumber": return "number";
		case "ZodBoolean": return "boolean";
		case "ZodObject": return "object";
		case "ZodArray": return "array";
		default: return "string";
	}
}
function getParameters(options) {
	const parameters = [];
	if (options.metadata?.openapi?.parameters) {
		parameters.push(...options.metadata.openapi.parameters);
		return parameters;
	}
	if (options.query instanceof ZodObject) Object.entries(options.query.shape).forEach(([key, value]) => {
		if (value instanceof ZodObject) parameters.push({
			name: key,
			in: "query",
			schema: {
				type: getTypeFromZodType(value),
				..."minLength" in value && value.minLength ? { minLength: value.minLength } : {},
				description: value.description
			}
		});
	});
	return parameters;
}
function getRequestBody(options) {
	if (options.metadata?.openapi?.requestBody) return options.metadata.openapi.requestBody;
	if (!options.body) return void 0;
	if (options.body instanceof ZodObject || options.body instanceof ZodOptional) {
		const shape = options.body.shape;
		if (!shape) return void 0;
		const properties = {};
		const required = [];
		Object.entries(shape).forEach(([key, value]) => {
			if (value instanceof ZodObject) {
				properties[key] = {
					type: getTypeFromZodType(value),
					description: value.description
				};
				if (!(value instanceof ZodOptional)) required.push(key);
			}
		});
		return {
			required: options.body instanceof ZodOptional ? false : options.body ? true : false,
			content: { "application/json": { schema: {
				type: "object",
				properties,
				required
			} } }
		};
	}
}
function getResponse(responses) {
	return {
		"400": {
			content: { "application/json": { schema: {
				type: "object",
				properties: { message: { type: "string" } },
				required: ["message"]
			} } },
			description: "Bad Request. Usually due to missing parameters, or invalid parameters."
		},
		"401": {
			content: { "application/json": { schema: {
				type: "object",
				properties: { message: { type: "string" } },
				required: ["message"]
			} } },
			description: "Unauthorized. Due to missing or invalid authentication."
		},
		"403": {
			content: { "application/json": { schema: {
				type: "object",
				properties: { message: { type: "string" } }
			} } },
			description: "Forbidden. You do not have permission to access this resource or to perform this action."
		},
		"404": {
			content: { "application/json": { schema: {
				type: "object",
				properties: { message: { type: "string" } }
			} } },
			description: "Not Found. The requested resource was not found."
		},
		"429": {
			content: { "application/json": { schema: {
				type: "object",
				properties: { message: { type: "string" } }
			} } },
			description: "Too Many Requests. You have exceeded the rate limit. Try again later."
		},
		"500": {
			content: { "application/json": { schema: {
				type: "object",
				properties: { message: { type: "string" } }
			} } },
			description: "Internal Server Error. This is a problem with the server that you cannot fix."
		},
		...responses
	};
}
async function generator(endpoints, config$1) {
	const components = { schemas: {} };
	Object.entries(endpoints).forEach(([_, value]) => {
		const options = value.options;
		if (!value.path || options.metadata?.SERVER_ONLY) return;
		if (options.method === "GET") paths[value.path] = { get: {
			tags: ["Default", ...options.metadata?.openapi?.tags || []],
			description: options.metadata?.openapi?.description,
			operationId: options.metadata?.openapi?.operationId,
			security: [{ bearerAuth: [] }],
			parameters: getParameters(options),
			responses: getResponse(options.metadata?.openapi?.responses)
		} };
		if (options.method === "POST") {
			const body = getRequestBody(options);
			paths[value.path] = { post: {
				tags: ["Default", ...options.metadata?.openapi?.tags || []],
				description: options.metadata?.openapi?.description,
				operationId: options.metadata?.openapi?.operationId,
				security: [{ bearerAuth: [] }],
				parameters: getParameters(options),
				...body ? { requestBody: body } : { requestBody: { content: { "application/json": { schema: {
					type: "object",
					properties: {}
				} } } } },
				responses: getResponse(options.metadata?.openapi?.responses)
			} };
		}
	});
	return {
		openapi: "3.1.1",
		info: {
			title: "Better Auth",
			description: "API Reference for your Better Auth Instance",
			version: "1.1.0"
		},
		components,
		security: [{ apiKeyCookie: [] }],
		servers: [{ url: config$1?.url }],
		tags: [{
			name: "Default",
			description: "Default endpoints that are included with Better Auth by default. These endpoints are not part of any plugin."
		}],
		paths
	};
}
var getHTML = (apiReference, config$1) => `<!doctype html>
<html>
  <head>
    <title>Scalar API Reference</title>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <script
      id="api-reference"
      type="application/json">
    ${JSON.stringify(apiReference)}
    <\/script>
	 <script>
      var configuration = {
	  	favicon: ${config$1?.logo ? `data:image/svg+xml;utf8,${encodeURIComponent(config$1.logo)}` : void 0} ,
	   	theme: ${config$1?.theme || "saturn"},
        metaData: {
			title: ${config$1?.title || "Open API Reference"},
			description: ${config$1?.description || "Better Call Open API"},
		}
      }
      document.getElementById('api-reference').dataset.configuration =
        JSON.stringify(configuration)
    <\/script>
	  <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"><\/script>
  </body>
</html>`;
var NullProtoObj = /* @__PURE__ */ (() => {
	const e = function() {};
	return e.prototype = Object.create(null), Object.freeze(e.prototype), e;
})();
function createRouter$2() {
	return {
		root: { key: "" },
		static: new NullProtoObj()
	};
}
function splitPath(path$1) {
	const [_, ...s] = path$1.split("/");
	return s[s.length - 1] === "" ? s.slice(0, -1) : s;
}
function getMatchParams(segments, paramsMap) {
	const params = new NullProtoObj();
	for (const [index, name] of paramsMap) {
		const segment = index < 0 ? segments.slice(-(index + 1)).join("/") : segments[index];
		if (typeof name === "string") params[name] = segment;
		else {
			const match$1 = segment.match(name);
			if (match$1) for (const key in match$1.groups) params[key] = match$1.groups[key];
		}
	}
	return params;
}
function addRoute(ctx, method = "", path$1, data) {
	method = method.toUpperCase();
	if (path$1.charCodeAt(0) !== 47) path$1 = `/${path$1}`;
	path$1 = path$1.replace(/\\:/g, "%3A");
	const segments = splitPath(path$1);
	let node = ctx.root;
	let _unnamedParamIndex = 0;
	const paramsMap = [];
	const paramsRegexp = [];
	for (let i = 0; i < segments.length; i++) {
		let segment = segments[i];
		if (segment.startsWith("**")) {
			if (!node.wildcard) node.wildcard = { key: "**" };
			node = node.wildcard;
			paramsMap.push([
				-(i + 1),
				segment.split(":")[1] || "_",
				segment.length === 2
			]);
			break;
		}
		if (segment === "*" || segment.includes(":")) {
			if (!node.param) node.param = { key: "*" };
			node = node.param;
			if (segment === "*") paramsMap.push([
				i,
				`_${_unnamedParamIndex++}`,
				true
			]);
			else if (segment.includes(":", 1)) {
				const regexp = getParamRegexp(segment);
				paramsRegexp[i] = regexp;
				node.hasRegexParam = true;
				paramsMap.push([
					i,
					regexp,
					false
				]);
			} else paramsMap.push([
				i,
				segment.slice(1),
				false
			]);
			continue;
		}
		if (segment === "\\*") segment = segments[i] = "*";
		else if (segment === "\\*\\*") segment = segments[i] = "**";
		const child = node.static?.[segment];
		if (child) node = child;
		else {
			const staticNode = { key: segment };
			if (!node.static) node.static = new NullProtoObj();
			node.static[segment] = staticNode;
			node = staticNode;
		}
	}
	const hasParams = paramsMap.length > 0;
	if (!node.methods) node.methods = new NullProtoObj();
	node.methods[method] ??= [];
	node.methods[method].push({
		data: data || null,
		paramsRegexp,
		paramsMap: hasParams ? paramsMap : void 0
	});
	if (!hasParams) ctx.static["/" + segments.join("/")] = node;
}
function getParamRegexp(segment) {
	const regex = segment.replace(/:(\w+)/g, (_, id) => `(?<${id}>[^/]+)`).replace(/\./g, "\\.");
	return /* @__PURE__ */ new RegExp(`^${regex}$`);
}
function findRoute(ctx, method = "", path$1, opts) {
	if (path$1.charCodeAt(path$1.length - 1) === 47) path$1 = path$1.slice(0, -1);
	const staticNode = ctx.static[path$1];
	if (staticNode && staticNode.methods) {
		const staticMatch = staticNode.methods[method] || staticNode.methods[""];
		if (staticMatch !== void 0) return staticMatch[0];
	}
	const segments = splitPath(path$1);
	const match$1 = _lookupTree(ctx, ctx.root, method, segments, 0)?.[0];
	if (match$1 === void 0) return;
	if (opts?.params === false) return match$1;
	return {
		data: match$1.data,
		params: match$1.paramsMap ? getMatchParams(segments, match$1.paramsMap) : void 0
	};
}
function _lookupTree(ctx, node, method, segments, index) {
	if (index === segments.length) {
		if (node.methods) {
			const match$1 = node.methods[method] || node.methods[""];
			if (match$1) return match$1;
		}
		if (node.param && node.param.methods) {
			const match$1 = node.param.methods[method] || node.param.methods[""];
			if (match$1) {
				const pMap = match$1[0].paramsMap;
				if (pMap?.[pMap?.length - 1]?.[2]) return match$1;
			}
		}
		if (node.wildcard && node.wildcard.methods) {
			const match$1 = node.wildcard.methods[method] || node.wildcard.methods[""];
			if (match$1) {
				const pMap = match$1[0].paramsMap;
				if (pMap?.[pMap?.length - 1]?.[2]) return match$1;
			}
		}
		return;
	}
	const segment = segments[index];
	if (node.static) {
		const staticChild = node.static[segment];
		if (staticChild) {
			const match$1 = _lookupTree(ctx, staticChild, method, segments, index + 1);
			if (match$1) return match$1;
		}
	}
	if (node.param) {
		const match$1 = _lookupTree(ctx, node.param, method, segments, index + 1);
		if (match$1) {
			if (node.param.hasRegexParam) {
				const exactMatch = match$1.find((m) => m.paramsRegexp[index]?.test(segment)) || match$1.find((m) => !m.paramsRegexp[index]);
				return exactMatch ? [exactMatch] : void 0;
			}
			return match$1;
		}
	}
	if (node.wildcard && node.wildcard.methods) return node.wildcard.methods[method] || node.wildcard.methods[""];
}
function findAllRoutes(ctx, method = "", path$1, opts) {
	if (path$1.charCodeAt(path$1.length - 1) === 47) path$1 = path$1.slice(0, -1);
	const segments = splitPath(path$1);
	const matches = _findAll(ctx, ctx.root, method, segments, 0);
	if (opts?.params === false) return matches;
	return matches.map((m) => {
		return {
			data: m.data,
			params: m.paramsMap ? getMatchParams(segments, m.paramsMap) : void 0
		};
	});
}
function _findAll(ctx, node, method, segments, index, matches = []) {
	const segment = segments[index];
	if (node.wildcard && node.wildcard.methods) {
		const match$1 = node.wildcard.methods[method] || node.wildcard.methods[""];
		if (match$1) matches.push(...match$1);
	}
	if (node.param) {
		_findAll(ctx, node.param, method, segments, index + 1, matches);
		if (index === segments.length && node.param.methods) {
			const match$1 = node.param.methods[method] || node.param.methods[""];
			if (match$1) {
				const pMap = match$1[0].paramsMap;
				if (pMap?.[pMap?.length - 1]?.[2]) matches.push(...match$1);
			}
		}
	}
	const staticChild = node.static?.[segment];
	if (staticChild) _findAll(ctx, staticChild, method, segments, index + 1, matches);
	if (index === segments.length && node.methods) {
		const match$1 = node.methods[method] || node.methods[""];
		if (match$1) matches.push(...match$1);
	}
	return matches;
}
var createRouter$1 = (endpoints, config$1) => {
	if (!config$1?.openapi?.disabled) {
		const openapi = {
			path: "/api/reference",
			...config$1?.openapi
		};
		endpoints["openapi"] = createEndpoint(openapi.path, { method: "GET" }, async (c) => {
			const schema$2 = await generator(endpoints);
			return new Response(getHTML(schema$2, openapi.scalar), { headers: { "Content-Type": "text/html" } });
		});
	}
	const router$1 = createRouter$2();
	const middlewareRouter = createRouter$2();
	for (const endpoint of Object.values(endpoints)) {
		if (!endpoint.options || !endpoint.path) continue;
		if (endpoint.options?.metadata?.SERVER_ONLY) continue;
		const methods = Array.isArray(endpoint.options?.method) ? endpoint.options.method : [endpoint.options?.method];
		for (const method of methods) addRoute(router$1, method, endpoint.path, endpoint);
	}
	if (config$1?.routerMiddleware?.length) for (const { path: path$1, middleware } of config$1.routerMiddleware) addRoute(middlewareRouter, "*", path$1, middleware);
	const processRequest = async (request) => {
		const url = new URL(request.url);
		const pathname = url.pathname;
		const path$1 = config$1?.basePath && config$1.basePath !== "/" ? pathname.split(config$1.basePath).reduce((acc, curr, index) => {
			if (index !== 0) if (index > 1) acc.push(`${config$1.basePath}${curr}`);
			else acc.push(curr);
			return acc;
		}, []).join("") : url.pathname;
		if (!path$1?.length) return new Response(null, {
			status: 404,
			statusText: "Not Found"
		});
		if (/\/{2,}/.test(path$1)) return new Response(null, {
			status: 404,
			statusText: "Not Found"
		});
		const route = findRoute(router$1, request.method, path$1);
		if (path$1.endsWith("/") !== route?.data?.path?.endsWith("/") && !config$1?.skipTrailingSlashes) return new Response(null, {
			status: 404,
			statusText: "Not Found"
		});
		if (!route?.data) return new Response(null, {
			status: 404,
			statusText: "Not Found"
		});
		const query = {};
		url.searchParams.forEach((value, key) => {
			if (key in query) if (Array.isArray(query[key])) query[key].push(value);
			else query[key] = [query[key], value];
			else query[key] = value;
		});
		const handler$6 = route.data;
		try {
			const allowedMediaTypes = handler$6.options.metadata?.allowedMediaTypes || config$1?.allowedMediaTypes;
			const context = {
				path: path$1,
				method: request.method,
				headers: request.headers,
				params: route.params ? JSON.parse(JSON.stringify(route.params)) : {},
				request,
				body: handler$6.options.disableBody ? void 0 : await getBody(handler$6.options.cloneRequest ? request.clone() : request, allowedMediaTypes),
				query,
				_flag: "router",
				asResponse: true,
				context: config$1?.routerContext
			};
			const middlewareRoutes = findAllRoutes(middlewareRouter, "*", path$1);
			if (middlewareRoutes?.length) for (const { data: middleware, params } of middlewareRoutes) {
				const res = await middleware({
					...context,
					params,
					asResponse: false
				});
				if (res instanceof Response) return res;
			}
			return await handler$6(context);
		} catch (error$1) {
			if (config$1?.onError) try {
				const errorResponse = await config$1.onError(error$1, request);
				if (errorResponse instanceof Response) return toResponse(errorResponse);
			} catch (error$2) {
				if (isAPIError$1(error$2)) return toResponse(error$2);
				throw error$2;
			}
			if (config$1?.throwError) throw error$1;
			if (isAPIError$1(error$1)) return toResponse(error$1);
			console.error(`# SERVER_ERROR: `, error$1);
			return new Response(null, {
				status: 500,
				statusText: "Internal Server Error"
			});
		}
	};
	return {
		handler: async (request) => {
			const onReq = await config$1?.onRequest?.(request);
			if (onReq instanceof Response) return onReq;
			const req = isRequest(onReq) ? onReq : request;
			const res = await processRequest(req);
			const onRes = await config$1?.onResponse?.(res, req);
			if (onRes instanceof Response) return onRes;
			return res;
		},
		endpoints
	};
};
var defuReplaceArrays = createDefu((obj, key, value) => {
	if (Array.isArray(obj[key]) && Array.isArray(value)) {
		obj[key] = value;
		return true;
	}
});
var hooksSourceWeakMap = /* @__PURE__ */ new WeakMap();
function getOperationId(endpoint, key) {
	if (!endpoint?.options) return key;
	const opts = endpoint.options;
	return opts.operationId ?? opts.metadata?.openapi?.operationId ?? key;
}
async function resolveDynamicContext(rawCtx, input) {
	if (rawCtx.baseURL) return rawCtx;
	const source = pickSource(input);
	const config$1 = rawCtx.options.baseURL;
	const hasFallback = isDynamicBaseURLConfig(config$1) && Boolean(config$1.fallback);
	if (source === void 0 && !hasFallback) throw new APIError("INTERNAL_SERVER_ERROR", { message: "Dynamic baseURL could not be resolved for this direct auth.api call. Pass `headers: request.headers` (or `request`) to the call, or add `fallback` to your baseURL config." });
	try {
		return await resolveRequestContext(rawCtx, source, resolveDynamicTrustedProxyHeaders(rawCtx.options));
	} catch (err) {
		if (err instanceof BetterAuthError) throw new APIError("INTERNAL_SERVER_ERROR", { message: err.message });
		throw err;
	}
}
function toAuthEndpoints(endpoints, ctx) {
	const api$1 = {};
	for (const [key, endpoint] of Object.entries(endpoints)) {
		api$1[key] = async (context) => {
			const operationId = getOperationId(endpoint, key);
			const endpointMethod = endpoint?.options?.method;
			const defaultMethod = Array.isArray(endpointMethod) ? endpointMethod[0] : endpointMethod;
			const run = async () => {
				const rawContext = await ctx;
				const methodName = context?.method ?? context?.request?.method ?? defaultMethod ?? "?";
				const route = endpoint.path ?? "/:virtual";
				const authContext = isDynamicBaseURLConfig(rawContext.options.baseURL) ? await resolveDynamicContext(rawContext, context) : rawContext;
				let internalContext = {
					...context,
					context: {
						...authContext,
						returned: void 0,
						responseHeaders: void 0,
						session: null
					},
					path: endpoint.path,
					headers: context?.headers ? new Headers(context?.headers) : void 0
				};
				const hasRequest = isRequestLike(context?.request);
				const shouldReturnResponse = context?.asResponse ?? hasRequest;
				return withSpan(`${methodName} ${route}`, {
					[ATTR_HTTP_ROUTE]: route,
					[ATTR_OPERATION_ID]: operationId
				}, async () => runWithEndpointContext(internalContext, async () => {
					const { beforeHooks, afterHooks } = getHooks(authContext);
					const before = await runBeforeHooks(internalContext, beforeHooks, endpoint, operationId);
					if ("context" in before && before.context && typeof before.context === "object") {
						const { headers, ...rest } = before.context;
						if (headers) headers.forEach((value, key$1) => {
							internalContext.headers.set(key$1, value);
						});
						internalContext = defuReplaceArrays(rest, internalContext);
					} else if (before) return shouldReturnResponse ? toResponse(before, { headers: context?.headers }) : context?.returnHeaders ? {
						headers: context?.headers,
						response: before
					} : before;
					internalContext.asResponse = false;
					internalContext.returnHeaders = true;
					internalContext.returnStatus = true;
					const result = await runWithEndpointContext(internalContext, () => withSpan(`handler ${route}`, {
						[ATTR_HTTP_ROUTE]: route,
						[ATTR_OPERATION_ID]: operationId
					}, () => endpoint(internalContext))).catch((e) => {
						if (isAPIError(e)) {
							const ctxHeaders = e[kAPIErrorHeaderSymbol];
							const errHeaders = e.headers ? new Headers(e.headers) : null;
							let headers = null;
							if (ctxHeaders || errHeaders) {
								headers = new Headers();
								ctxHeaders?.forEach((value, key$1) => {
									headers.append(key$1, value);
								});
								errHeaders?.forEach((value, key$1) => {
									if (key$1.toLowerCase() === "set-cookie") headers.append(key$1, value);
									else headers.set(key$1, value);
								});
							}
							return {
								response: e,
								status: e.statusCode,
								headers
							};
						}
						throw e;
					});
					if (result && result instanceof Response) return result;
					internalContext.context.returned = result.response;
					internalContext.context.responseHeaders = result.headers;
					const after = await runAfterHooks(internalContext, afterHooks, endpoint, operationId);
					if (after.response) result.response = after.response;
					if (isAPIError(result.response) && shouldPublishLog(authContext.logger.level, "debug")) result.response.stack = result.response.errorStack;
					if (isAPIError(result.response) && !shouldReturnResponse) {
						if (result.headers) Object.defineProperty(result.response, kAPIErrorHeaderSymbol, {
							enumerable: false,
							configurable: true,
							writable: false,
							value: result.headers
						});
						throw result.response;
					}
					return shouldReturnResponse ? toResponse(result.response, {
						headers: result.headers,
						status: result.status
					}) : context?.returnHeaders ? context?.returnStatus ? {
						headers: result.headers,
						response: result.response,
						status: result.status
					} : {
						headers: result.headers,
						response: result.response
					} : context?.returnStatus ? {
						response: result.response,
						status: result.status
					} : result.response;
				}));
			};
			if (await hasRequestState()) return run();
			else return runWithRequestState(/* @__PURE__ */ new WeakMap(), run);
		};
		api$1[key].path = endpoint.path;
		api$1[key].options = endpoint.options;
	}
	return api$1;
}
async function runBeforeHooks(context, hooks, endpoint, operationId) {
	let modifiedContext = {};
	for (const hook of hooks) {
		let matched = false;
		try {
			matched = hook.matcher(context);
		} catch (error$1) {
			const hookSource = hooksSourceWeakMap.get(hook.handler) ?? "unknown";
			context.context.logger.error(`An error occurred during ${hookSource} hook matcher execution:`, error$1);
			throw new APIError("INTERNAL_SERVER_ERROR", { message: `An error occurred during hook matcher execution. Check the logs for more details.` });
		}
		if (matched) {
			const hookSource = hooksSourceWeakMap.get(hook.handler) ?? "unknown";
			const route = endpoint.path ?? "/:virtual";
			const result = await withSpan(`hook before ${route} ${hookSource}`, {
				[ATTR_HOOK_TYPE]: "before",
				[ATTR_HTTP_ROUTE]: route,
				[ATTR_CONTEXT]: hookSource,
				[ATTR_OPERATION_ID]: operationId
			}, () => hook.handler({
				...context,
				returnHeaders: false
			})).catch((e) => {
				if (isAPIError(e) && shouldPublishLog(context.context.logger.level, "debug")) e.stack = e.errorStack;
				throw e;
			});
			if (result && typeof result === "object") {
				if ("context" in result && typeof result.context === "object") {
					const { headers, ...rest } = result.context;
					if (headers instanceof Headers) if (modifiedContext.headers) headers.forEach((value, key) => {
						modifiedContext.headers?.set(key, value);
					});
					else modifiedContext.headers = headers;
					modifiedContext = defuReplaceArrays(rest, modifiedContext);
					continue;
				}
				return result;
			}
		}
	}
	return { context: modifiedContext };
}
async function runAfterHooks(context, hooks, endpoint, operationId) {
	for (const hook of hooks) if (hook.matcher(context)) {
		const hookSource = hooksSourceWeakMap.get(hook.handler) ?? "unknown";
		const route = endpoint.path ?? "/:virtual";
		const result = await withSpan(`hook after ${route} ${hookSource}`, {
			[ATTR_HOOK_TYPE]: "after",
			[ATTR_HTTP_ROUTE]: route,
			[ATTR_CONTEXT]: hookSource,
			[ATTR_OPERATION_ID]: operationId
		}, () => hook.handler(context)).catch((e) => {
			if (isAPIError(e)) {
				const headers = e[kAPIErrorHeaderSymbol];
				if (shouldPublishLog(context.context.logger.level, "debug")) e.stack = e.errorStack;
				return {
					response: e,
					headers: headers ? headers : e.headers ? new Headers(e.headers) : null
				};
			}
			throw e;
		});
		if (result.headers) result.headers.forEach((value, key) => {
			if (!context.context.responseHeaders) context.context.responseHeaders = new Headers({ [key]: value });
			else if (key.toLowerCase() === "set-cookie") context.context.responseHeaders.append(key, value);
			else context.context.responseHeaders.set(key, value);
		});
		if (result.response) context.context.returned = result.response;
	}
	return {
		response: context.context.returned,
		headers: context.context.responseHeaders
	};
}
function getHooks(authContext) {
	const plugins = authContext.options.plugins || [];
	const beforeHooks = [];
	const afterHooks = [];
	const beforeHookHandler = authContext.options.hooks?.before;
	if (beforeHookHandler) {
		hooksSourceWeakMap.set(beforeHookHandler, "user");
		beforeHooks.push({
			matcher: () => true,
			handler: beforeHookHandler
		});
	}
	const afterHookHandler = authContext.options.hooks?.after;
	if (afterHookHandler) {
		hooksSourceWeakMap.set(afterHookHandler, "user");
		afterHooks.push({
			matcher: () => true,
			handler: afterHookHandler
		});
	}
	const pluginBeforeHooks = plugins.flatMap((plugin) => (plugin.hooks?.before ?? []).map((h) => {
		hooksSourceWeakMap.set(h.handler, `plugin:${plugin.id}`);
		return h;
	}));
	const pluginAfterHooks = plugins.flatMap((plugin) => (plugin.hooks?.after ?? []).map((h) => {
		hooksSourceWeakMap.set(h.handler, `plugin:${plugin.id}`);
		return h;
	}));
	if (pluginBeforeHooks.length) beforeHooks.push(...pluginBeforeHooks);
	if (pluginAfterHooks.length) afterHooks.push(...pluginAfterHooks);
	return {
		beforeHooks,
		afterHooks
	};
}
function checkEndpointConflicts(options, logger$1) {
	const endpointRegistry = /* @__PURE__ */ new Map();
	options.plugins?.forEach((plugin) => {
		if (plugin.endpoints) {
			for (const [key, endpoint] of Object.entries(plugin.endpoints)) if (endpoint && "path" in endpoint && typeof endpoint.path === "string") {
				const path$1 = endpoint.path;
				let methods = [];
				if (endpoint.options && "method" in endpoint.options) {
					if (Array.isArray(endpoint.options.method)) methods = endpoint.options.method;
					else if (typeof endpoint.options.method === "string") methods = [endpoint.options.method];
				}
				if (methods.length === 0) methods = ["*"];
				if (!endpointRegistry.has(path$1)) endpointRegistry.set(path$1, []);
				endpointRegistry.get(path$1).push({
					pluginId: plugin.id,
					endpointKey: key,
					methods
				});
			}
		}
	});
	const conflicts = [];
	for (const [path$1, entries] of endpointRegistry.entries()) if (entries.length > 1) {
		const methodMap = /* @__PURE__ */ new Map();
		let hasConflict = false;
		for (const entry of entries) for (const method of entry.methods) {
			if (!methodMap.has(method)) methodMap.set(method, []);
			methodMap.get(method).push(entry.pluginId);
			if (methodMap.get(method).length > 1) hasConflict = true;
			if (method === "*" && entries.length > 1) hasConflict = true;
			else if (method !== "*" && methodMap.has("*")) hasConflict = true;
		}
		if (hasConflict) {
			const uniquePlugins = [...new Set(entries.map((e) => e.pluginId))];
			const conflictingMethods = [];
			for (const [method, plugins] of methodMap.entries()) if (plugins.length > 1 || method === "*" && entries.length > 1 || method !== "*" && methodMap.has("*")) conflictingMethods.push(method);
			conflicts.push({
				path: path$1,
				plugins: uniquePlugins,
				conflictingMethods
			});
		}
	}
	if (conflicts.length > 0) {
		const conflictMessages = conflicts.map((conflict) => `  - "${conflict.path}" [${conflict.conflictingMethods.join(", ")}] used by plugins: ${conflict.plugins.join(", ")}`).join("\n");
		logger$1.error(`Endpoint path conflicts detected! Multiple plugins are trying to use the same endpoint paths with conflicting HTTP methods:
${conflictMessages}

To resolve this, you can:
	1. Use only one of the conflicting plugins
	2. Configure the plugins to use different paths (if supported)
	3. Ensure plugins use different HTTP methods for the same path
`);
	}
}
function getEndpoints(ctx, options) {
	const pluginEndpoints = options.plugins?.reduce((acc, plugin) => {
		return {
			...acc,
			...plugin.endpoints
		};
	}, {}) ?? {};
	const middlewares = options.plugins?.map((plugin) => plugin.middlewares?.map((m) => {
		const middleware = (async (context) => {
			const authContext = await ctx;
			return withSpan(`middleware ${m.path} ${plugin.id}`, {
				["better_auth.hook.type"]: "middleware",
				["http.route"]: m.path,
				["better_auth.context"]: `plugin:${plugin.id}`
			}, () => m.middleware({
				...context,
				context: {
					...authContext,
					...context.context
				}
			}));
		});
		middleware.options = m.middleware.options;
		return {
			path: m.path,
			middleware
		};
	})).filter((plugin) => plugin !== void 0).flat() || [];
	return {
		api: toAuthEndpoints({
			signInSocial: signInSocial(),
			callbackOAuth,
			getSession: getSession$1(),
			signOut,
			signUpEmail: signUpEmail(),
			signInEmail: signInEmail(),
			resetPassword,
			verifyPassword: verifyPassword$2,
			verifyEmail,
			sendVerificationEmail,
			changeEmail,
			changePassword,
			setPassword,
			updateSession: updateSession(),
			updateUser: updateUser(),
			deleteUser,
			requestPasswordReset,
			requestPasswordResetCallback,
			listSessions: listSessions(),
			revokeSession,
			revokeSessions,
			revokeOtherSessions,
			linkSocialAccount,
			listUserAccounts,
			deleteUserCallback,
			unlinkAccount,
			refreshToken,
			getAccessToken,
			accountInfo,
			...pluginEndpoints,
			ok,
			error
		}, ctx),
		middlewares
	};
}
var router = (ctx, options) => {
	const { api: api$1, middlewares } = getEndpoints(ctx, options);
	const basePath = new URL(ctx.baseURL).pathname;
	return createRouter$1(api$1, {
		routerContext: ctx,
		openapi: { disabled: true },
		basePath,
		routerMiddleware: [{
			path: "/**",
			middleware: originCheckMiddleware
		}, ...middlewares],
		allowedMediaTypes: ["application/json"],
		skipTrailingSlashes: options.advanced?.skipTrailingSlashes ?? false,
		async onRequest(req) {
			const disabledPaths = ctx.options.disabledPaths || [];
			const normalizedPath = normalizePathname(req.url, basePath);
			if (disabledPaths.includes(normalizedPath)) return new Response("Not Found", { status: 404 });
			let currentRequest = req;
			for (const plugin of ctx.options.plugins || []) if (plugin.onRequest) {
				const response = await withSpan(`onRequest ${plugin.id}`, {
					[ATTR_HOOK_TYPE]: "onRequest",
					[ATTR_CONTEXT]: `plugin:${plugin.id}`
				}, () => plugin.onRequest(currentRequest, ctx));
				if (response && "response" in response) return response.response;
				if (response && "request" in response) currentRequest = response.request;
			}
			const rateLimitResponse$1 = await onRequestRateLimit(currentRequest, ctx);
			if (rateLimitResponse$1) return rateLimitResponse$1;
			return currentRequest;
		},
		async onResponse(res, req) {
			await onResponseRateLimit(req, ctx);
			for (const plugin of ctx.options.plugins || []) if (plugin.onResponse) {
				const response = await withSpan(`onResponse ${plugin.id}`, {
					[ATTR_HOOK_TYPE]: "onResponse",
					[ATTR_CONTEXT]: `plugin:${plugin.id}`,
					[ATTR_HTTP_RESPONSE_STATUS_CODE]: res.status
				}, () => plugin.onResponse(res, ctx));
				if (response) return response.response;
			}
			return res;
		},
		onError(e) {
			if (isAPIError(e) && e.status === "FOUND") return;
			if (options.onAPIError?.throw) throw e;
			if (options.onAPIError?.onError) {
				options.onAPIError.onError(e, ctx);
				return;
			}
			const optLogLevel = options.logger?.level;
			const log = optLogLevel === "error" || optLogLevel === "warn" || optLogLevel === "debug" ? logger : void 0;
			if (options.logger?.disabled !== true) {
				if (e && typeof e === "object" && "message" in e && typeof e.message === "string") {
					if (e.message.includes("no column") || e.message.includes("column") || e.message.includes("relation") || e.message.includes("table") || e.message.includes("does not exist")) {
						ctx.logger?.error(e.message);
						return;
					}
				}
				if (isAPIError(e)) {
					if (e.status === "INTERNAL_SERVER_ERROR") ctx.logger.error(e.status, e);
					log?.error(e.message);
				} else ctx.logger?.error(e && typeof e === "object" && "name" in e ? e.name : "", e);
			}
		}
	});
};
var createBetterAuth = (options, initFn) => {
	const authContext = initFn(options);
	const { api: api$1 } = getEndpoints(authContext, options);
	return {
		handler: async (request) => {
			const ctx = await authContext;
			const basePath = ctx.options.basePath || "/api/auth";
			let handlerCtx;
			if (isDynamicBaseURLConfig(options.baseURL)) handlerCtx = await resolveRequestContext(ctx, request, resolveDynamicTrustedProxyHeaders(ctx.options));
			else {
				handlerCtx = ctx;
				if (!ctx.options.baseURL) {
					const baseURL = getBaseURL(void 0, basePath, request, void 0, ctx.options.advanced?.trustedProxyHeaders);
					if (baseURL) {
						ctx.baseURL = baseURL;
						ctx.options.baseURL = getOrigin(ctx.baseURL) || void 0;
					} else throw new BetterAuthError("Could not get base URL from request. Please provide a valid base URL.");
				}
				handlerCtx.trustedOrigins = await getTrustedOrigins(ctx.options, request);
				handlerCtx.trustedProviders = await getTrustedProviders(ctx.options, request);
			}
			const { handler: handler$6 } = router(handlerCtx, options);
			return runWithAdapter(handlerCtx.adapter, () => handler$6(request));
		},
		api: api$1,
		options,
		$context: authContext,
		$ERROR_CODES: {
			...options.plugins?.reduce((acc, plugin) => {
				if (plugin.$ERROR_CODES) return {
					...acc,
					...plugin.$ERROR_CODES
				};
				return acc;
			}, {}),
			...BASE_ERROR_CODES
		}
	};
};
async function getBaseAdapter(options, handleDirectDatabase) {
	let adapter;
	if (!options.database) {
		const tables = getAuthTables(options);
		const memoryDB = Object.keys(tables).reduce((acc, key) => {
			acc[key] = [];
			return acc;
		}, {});
		const { memoryAdapter } = await import("./dist-GzqX--23.js");
		adapter = memoryAdapter(memoryDB)(options);
	} else if (typeof options.database === "function") adapter = options.database(options);
	else adapter = await handleDirectDatabase(options);
	if (!adapter.transaction) {
		logger.warn("Adapter does not correctly implement transaction function, patching it automatically. Please update your adapter implementation.");
		adapter.transaction = async (cb) => {
			return cb(adapter);
		};
	}
	return adapter;
}
var DEFAULT_SECRET = "better-auth-secret-12345678901234567890";
function estimateEntropy$1(str) {
	const unique = new Set(str).size;
	if (unique === 0) return 0;
	return Math.log2(Math.pow(unique, str.length));
}
function parseSecretsEnv(envValue) {
	if (!envValue) return null;
	return envValue.split(",").map((entry) => {
		entry = entry.trim();
		const colonIdx = entry.indexOf(":");
		if (colonIdx === -1) throw new BetterAuthError(`Invalid BETTER_AUTH_SECRETS entry: "${entry}". Expected format: "<version>:<secret>"`);
		const version = parseInt(entry.slice(0, colonIdx), 10);
		if (!Number.isInteger(version) || version < 0) throw new BetterAuthError(`Invalid version in BETTER_AUTH_SECRETS: "${entry.slice(0, colonIdx)}". Version must be a non-negative integer.`);
		const value = entry.slice(colonIdx + 1).trim();
		if (!value) throw new BetterAuthError(`Empty secret value for version ${version} in BETTER_AUTH_SECRETS.`);
		return {
			version,
			value
		};
	});
}
function validateSecretsArray(secrets, logger$1) {
	if (secrets.length === 0) throw new BetterAuthError("`secrets` array must contain at least one entry.");
	const seen = /* @__PURE__ */ new Set();
	for (const s of secrets) {
		const version = parseInt(String(s.version), 10);
		if (!Number.isInteger(version) || version < 0 || String(version) !== String(s.version).trim()) throw new BetterAuthError(`Invalid version ${s.version} in \`secrets\`. Version must be a non-negative integer.`);
		if (!s.value) throw new BetterAuthError(`Empty secret value for version ${version} in \`secrets\`.`);
		if (seen.has(version)) throw new BetterAuthError(`Duplicate version ${version} in \`secrets\`. Each version must be unique.`);
		seen.add(version);
	}
	const current = secrets[0];
	if (current.value.length < 32) logger$1.warn(`[better-auth] Warning: the current secret (version ${current.version}) should be at least 32 characters long for adequate security.`);
	if (estimateEntropy$1(current.value) < 120) logger$1.warn("[better-auth] Warning: the current secret appears low-entropy. Use a randomly generated secret for production.");
}
function buildSecretConfig(secrets, legacySecret) {
	const keys = /* @__PURE__ */ new Map();
	for (const s of secrets) keys.set(parseInt(String(s.version), 10), s.value);
	return {
		keys,
		currentVersion: parseInt(String(secrets[0].version), 10),
		legacySecret: legacySecret && legacySecret !== "better-auth-secret-12345678901234567890" ? legacySecret : void 0
	};
}
async function getTelemetryAuthConfig(options, context) {
	return {
		database: context?.database,
		adapter: context?.adapter,
		emailVerification: {
			sendVerificationEmail: !!options.emailVerification?.sendVerificationEmail,
			sendOnSignUp: !!options.emailVerification?.sendOnSignUp,
			sendOnSignIn: !!options.emailVerification?.sendOnSignIn,
			autoSignInAfterVerification: !!options.emailVerification?.autoSignInAfterVerification,
			expiresIn: options.emailVerification?.expiresIn,
			beforeEmailVerification: !!options.emailVerification?.beforeEmailVerification,
			afterEmailVerification: !!options.emailVerification?.afterEmailVerification
		},
		emailAndPassword: {
			enabled: !!options.emailAndPassword?.enabled,
			disableSignUp: !!options.emailAndPassword?.disableSignUp,
			requireEmailVerification: !!options.emailAndPassword?.requireEmailVerification,
			maxPasswordLength: options.emailAndPassword?.maxPasswordLength,
			minPasswordLength: options.emailAndPassword?.minPasswordLength,
			sendResetPassword: !!options.emailAndPassword?.sendResetPassword,
			resetPasswordTokenExpiresIn: options.emailAndPassword?.resetPasswordTokenExpiresIn,
			onPasswordReset: !!options.emailAndPassword?.onPasswordReset,
			password: {
				hash: !!options.emailAndPassword?.password?.hash,
				verify: !!options.emailAndPassword?.password?.verify
			},
			autoSignIn: !!options.emailAndPassword?.autoSignIn,
			revokeSessionsOnPasswordReset: !!options.emailAndPassword?.revokeSessionsOnPasswordReset
		},
		socialProviders: await Promise.all(Object.keys(options.socialProviders || {}).map(async (key) => {
			const p = options.socialProviders?.[key];
			if (!p) return {};
			const provider = typeof p === "function" ? await p() : p;
			return {
				id: key,
				mapProfileToUser: !!provider.mapProfileToUser,
				disableDefaultScope: !!provider.disableDefaultScope,
				disableIdTokenSignIn: !!provider.disableIdTokenSignIn,
				disableImplicitSignUp: provider.disableImplicitSignUp,
				disableSignUp: provider.disableSignUp,
				getUserInfo: !!provider.getUserInfo,
				overrideUserInfoOnSignIn: !!provider.overrideUserInfoOnSignIn,
				prompt: provider.prompt,
				verifyIdToken: !!provider.verifyIdToken,
				scope: provider.scope,
				refreshAccessToken: !!provider.refreshAccessToken
			};
		})),
		plugins: options.plugins?.map((p) => p.id.toString()),
		user: {
			modelName: options.user?.modelName,
			fields: options.user?.fields,
			additionalFields: options.user?.additionalFields,
			changeEmail: {
				enabled: options.user?.changeEmail?.enabled,
				sendChangeEmailConfirmation: !!options.user?.changeEmail?.sendChangeEmailConfirmation
			}
		},
		verification: {
			modelName: options.verification?.modelName,
			disableCleanup: options.verification?.disableCleanup,
			fields: options.verification?.fields
		},
		session: {
			modelName: options.session?.modelName,
			additionalFields: options.session?.additionalFields,
			cookieCache: {
				enabled: options.session?.cookieCache?.enabled,
				maxAge: options.session?.cookieCache?.maxAge,
				strategy: options.session?.cookieCache?.strategy
			},
			disableSessionRefresh: options.session?.disableSessionRefresh,
			expiresIn: options.session?.expiresIn,
			fields: options.session?.fields,
			freshAge: options.session?.freshAge,
			preserveSessionInDatabase: options.session?.preserveSessionInDatabase,
			storeSessionInDatabase: options.session?.storeSessionInDatabase,
			updateAge: options.session?.updateAge
		},
		account: {
			modelName: options.account?.modelName,
			fields: options.account?.fields,
			encryptOAuthTokens: options.account?.encryptOAuthTokens,
			updateAccountOnSignIn: options.account?.updateAccountOnSignIn,
			accountLinking: {
				enabled: options.account?.accountLinking?.enabled,
				trustedProviders: options.account?.accountLinking?.trustedProviders,
				updateUserInfoOnLink: options.account?.accountLinking?.updateUserInfoOnLink,
				allowUnlinkingAll: options.account?.accountLinking?.allowUnlinkingAll
			}
		},
		hooks: {
			after: !!options.hooks?.after,
			before: !!options.hooks?.before
		},
		secondaryStorage: !!options.secondaryStorage,
		advanced: {
			cookiePrefix: !!options.advanced?.cookiePrefix,
			cookies: !!options.advanced?.cookies,
			crossSubDomainCookies: {
				domain: !!options.advanced?.crossSubDomainCookies?.domain,
				enabled: options.advanced?.crossSubDomainCookies?.enabled,
				additionalCookies: options.advanced?.crossSubDomainCookies?.additionalCookies
			},
			database: {
				generateId: options.advanced?.database?.generateId,
				defaultFindManyLimit: options.advanced?.database?.defaultFindManyLimit
			},
			useSecureCookies: options.advanced?.useSecureCookies,
			ipAddress: {
				disableIpTracking: options.advanced?.ipAddress?.disableIpTracking,
				ipAddressHeaders: options.advanced?.ipAddress?.ipAddressHeaders
			},
			disableCSRFCheck: options.advanced?.disableCSRFCheck,
			cookieAttributes: {
				expires: options.advanced?.defaultCookieAttributes?.expires,
				secure: options.advanced?.defaultCookieAttributes?.secure,
				sameSite: options.advanced?.defaultCookieAttributes?.sameSite,
				domain: !!options.advanced?.defaultCookieAttributes?.domain,
				path: options.advanced?.defaultCookieAttributes?.path,
				httpOnly: options.advanced?.defaultCookieAttributes?.httpOnly
			}
		},
		trustedOrigins: options.trustedOrigins?.length,
		rateLimit: {
			storage: options.rateLimit?.storage,
			modelName: options.rateLimit?.modelName,
			window: options.rateLimit?.window,
			customStorage: !!options.rateLimit?.customStorage,
			enabled: options.rateLimit?.enabled,
			max: options.rateLimit?.max
		},
		onAPIError: {
			errorURL: options.onAPIError?.errorURL,
			onError: !!options.onAPIError?.onError,
			throw: options.onAPIError?.throw
		},
		logger: {
			disabled: options.logger?.disabled,
			level: options.logger?.level,
			log: !!options.logger?.log
		},
		databaseHooks: {
			user: {
				create: {
					after: !!options.databaseHooks?.user?.create?.after,
					before: !!options.databaseHooks?.user?.create?.before
				},
				update: {
					after: !!options.databaseHooks?.user?.update?.after,
					before: !!options.databaseHooks?.user?.update?.before
				}
			},
			session: {
				create: {
					after: !!options.databaseHooks?.session?.create?.after,
					before: !!options.databaseHooks?.session?.create?.before
				},
				update: {
					after: !!options.databaseHooks?.session?.update?.after,
					before: !!options.databaseHooks?.session?.update?.before
				}
			},
			account: {
				create: {
					after: !!options.databaseHooks?.account?.create?.after,
					before: !!options.databaseHooks?.account?.create?.before
				},
				update: {
					after: !!options.databaseHooks?.account?.update?.after,
					before: !!options.databaseHooks?.account?.update?.before
				}
			},
			verification: {
				create: {
					after: !!options.databaseHooks?.verification?.create?.after,
					before: !!options.databaseHooks?.verification?.create?.before
				},
				update: {
					after: !!options.databaseHooks?.verification?.update?.after,
					before: !!options.databaseHooks?.verification?.update?.before
				}
			}
		}
	};
}
function detectPackageManager() {
	const userAgent = env.npm_config_user_agent;
	if (!userAgent) return;
	const pmSpec = userAgent.split(" ")[0];
	const separatorPos = pmSpec.lastIndexOf("/");
	const name = pmSpec.substring(0, separatorPos);
	return {
		name: name === "npminstall" ? "cnpm" : name,
		version: pmSpec.substring(separatorPos + 1)
	};
}
function isCI() {
	return env.CI !== "false" && ("BUILD_ID" in env || "BUILD_NUMBER" in env || "CI" in env || "CI_APP_ID" in env || "CI_BUILD_ID" in env || "CI_BUILD_NUMBER" in env || "CI_NAME" in env || "CONTINUOUS_INTEGRATION" in env || "RUN_ID" in env);
}
function detectRuntime() {
	if (typeof Deno !== "undefined") return {
		name: "deno",
		version: Deno?.version?.deno ?? null
	};
	if (typeof Bun !== "undefined") return {
		name: "bun",
		version: Bun?.version ?? null
	};
	if (typeof process !== "undefined" && process?.versions?.node) return {
		name: "node",
		version: process.versions.node ?? null
	};
	return {
		name: "edge",
		version: null
	};
}
function detectEnvironment() {
	return getEnvVar("NODE_ENV") === "production" ? "production" : isCI() ? "ci" : isTest() ? "test" : "development";
}
async function hashToBase64(data) {
	const buffer = await createHash$1("SHA-256").digest(data);
	return base64.encode(buffer);
}
var generateId$2 = (size) => {
	return createRandomStringGenerator("a-z", "A-Z", "0-9")(size || 32);
};
var packageJSONCache;
async function readRootPackageJson() {
	if (packageJSONCache) return packageJSONCache;
	try {
		const cwd = process.cwd();
		if (!cwd) return void 0;
		const raw = await fs$1.readFile(path.join(cwd, "package.json"), "utf-8");
		packageJSONCache = JSON.parse(raw);
		return packageJSONCache;
	} catch {}
}
async function getPackageVersion(pkg) {
	if (packageJSONCache) return packageJSONCache.dependencies?.[pkg] || packageJSONCache.devDependencies?.[pkg] || packageJSONCache.peerDependencies?.[pkg];
	try {
		const cwd = process.cwd();
		if (!cwd) throw new Error("no-cwd");
		const pkgJsonPath = path.join(cwd, "node_modules", pkg, "package.json");
		const raw = await fs$1.readFile(pkgJsonPath, "utf-8");
		return JSON.parse(raw).version || await getVersionFromLocalPackageJson(pkg) || void 0;
	} catch {}
	return getVersionFromLocalPackageJson(pkg);
}
async function getVersionFromLocalPackageJson(pkg) {
	const json = await readRootPackageJson();
	if (!json) return void 0;
	return {
		...json.dependencies,
		...json.devDependencies,
		...json.peerDependencies
	}[pkg];
}
async function getNameFromLocalPackageJson() {
	return (await readRootPackageJson())?.name;
}
async function detectSystemInfo() {
	try {
		const cpus = os.cpus();
		return {
			deploymentVendor: getVendor(),
			systemPlatform: os.platform(),
			systemRelease: os.release(),
			systemArchitecture: os.arch(),
			cpuCount: cpus.length,
			cpuModel: cpus.length ? cpus[0].model : null,
			cpuSpeed: cpus.length ? cpus[0].speed : null,
			memory: os.totalmem(),
			isWSL: await isWsl(),
			isDocker: await isDocker(),
			isTTY: process.stdout ? process.stdout.isTTY : null
		};
	} catch {
		return {
			systemPlatform: null,
			systemRelease: null,
			systemArchitecture: null,
			cpuCount: null,
			cpuModel: null,
			cpuSpeed: null,
			memory: null,
			isWSL: null,
			isDocker: null,
			isTTY: null
		};
	}
}
function getVendor() {
	const env$2 = process.env;
	const hasAny = (...keys) => keys.some((k) => Boolean(env$2[k]));
	if (hasAny("CF_PAGES", "CF_PAGES_URL", "CF_ACCOUNT_ID") || typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers") return "cloudflare";
	if (hasAny("VERCEL", "VERCEL_URL", "VERCEL_ENV")) return "vercel";
	if (hasAny("NETLIFY", "NETLIFY_URL")) return "netlify";
	if (hasAny("RENDER", "RENDER_URL", "RENDER_INTERNAL_HOSTNAME", "RENDER_SERVICE_ID")) return "render";
	if (hasAny("AWS_LAMBDA_FUNCTION_NAME", "AWS_EXECUTION_ENV", "LAMBDA_TASK_ROOT")) return "aws";
	if (hasAny("GOOGLE_CLOUD_FUNCTION_NAME", "GOOGLE_CLOUD_PROJECT", "GCP_PROJECT", "K_SERVICE")) return "gcp";
	if (hasAny("AZURE_FUNCTION_NAME", "FUNCTIONS_WORKER_RUNTIME", "WEBSITE_INSTANCE_ID", "WEBSITE_SITE_NAME")) return "azure";
	if (hasAny("DENO_DEPLOYMENT_ID", "DENO_REGION")) return "deno-deploy";
	if (hasAny("FLY_APP_NAME", "FLY_REGION", "FLY_ALLOC_ID")) return "fly-io";
	if (hasAny("RAILWAY_STATIC_URL", "RAILWAY_ENVIRONMENT_NAME")) return "railway";
	if (hasAny("DYNO", "HEROKU_APP_NAME")) return "heroku";
	if (hasAny("DO_DEPLOYMENT_ID", "DO_APP_NAME", "DIGITALOCEAN")) return "digitalocean";
	if (hasAny("KOYEB", "KOYEB_DEPLOYMENT_ID", "KOYEB_APP_NAME")) return "koyeb";
	return null;
}
var isDockerCached;
async function hasDockerEnv() {
	try {
		fs.statSync("/.dockerenv");
		return true;
	} catch {
		return false;
	}
}
async function hasDockerCGroup() {
	try {
		return fs.readFileSync("/proc/self/cgroup", "utf8").includes("docker");
	} catch {
		return false;
	}
}
async function isDocker() {
	if (isDockerCached === void 0) isDockerCached = await hasDockerEnv() || await hasDockerCGroup();
	return isDockerCached;
}
var isInsideContainerCached;
var hasContainerEnv = async () => {
	try {
		fs.statSync("/run/.containerenv");
		return true;
	} catch {
		return false;
	}
};
async function isInsideContainer() {
	if (isInsideContainerCached === void 0) isInsideContainerCached = await hasContainerEnv() || await isDocker();
	return isInsideContainerCached;
}
async function isWsl() {
	try {
		if (process.platform !== "linux") return false;
		if (os.release().toLowerCase().includes("microsoft")) {
			if (await isInsideContainer()) return false;
			return true;
		}
		return fs.readFileSync("/proc/version", "utf8").toLowerCase().includes("microsoft") ? !await isInsideContainer() : false;
	} catch {
		return false;
	}
}
var projectIdCached = null;
async function getProjectId(baseUrl) {
	if (projectIdCached) return projectIdCached;
	const projectName = await getNameFromLocalPackageJson();
	if (projectName) {
		projectIdCached = await hashToBase64(baseUrl ? baseUrl + projectName : projectName);
		return projectIdCached;
	}
	if (baseUrl) {
		projectIdCached = await hashToBase64(baseUrl);
		return projectIdCached;
	}
	projectIdCached = generateId$2(32);
	return projectIdCached;
}
async function detectDatabaseNode() {
	for (const [pkg, name] of Object.entries({
		pg: "postgresql",
		mysql: "mysql",
		mariadb: "mariadb",
		sqlite3: "sqlite",
		"better-sqlite3": "sqlite",
		"@prisma/client": "prisma",
		mongoose: "mongodb",
		mongodb: "mongodb",
		"drizzle-orm": "drizzle"
	})) {
		const version = await getPackageVersion(pkg);
		if (version) return {
			name,
			version
		};
	}
}
async function detectFrameworkNode() {
	for (const [pkg, name] of Object.entries({
		next: "next",
		nuxt: "nuxt",
		"react-router": "react-router",
		astro: "astro",
		"@sveltejs/kit": "sveltekit",
		"solid-start": "solid-start",
		"tanstack-start": "tanstack-start",
		hono: "hono",
		express: "express",
		elysia: "elysia",
		expo: "expo"
	})) {
		const version = await getPackageVersion(pkg);
		if (version) return {
			name,
			version
		};
	}
}
var noop = async function noop$1() {};
async function createTelemetry(options, context) {
	const debugEnabled = options.telemetry?.debug || getBooleanEnvVar("BETTER_AUTH_TELEMETRY_DEBUG", false);
	const telemetryEndpoint = ENV.BETTER_AUTH_TELEMETRY_ENDPOINT;
	if (!telemetryEndpoint && !context?.customTrack) return { publish: noop };
	const track = async (event) => {
		if (context?.customTrack) await context.customTrack(event).catch(logger.error);
		else if (telemetryEndpoint) if (debugEnabled) logger.info("telemetry event", JSON.stringify(event, null, 2));
		else await betterFetch(telemetryEndpoint, {
			method: "POST",
			body: event
		}).catch(logger.error);
	};
	const isEnabled = async () => {
		const telemetryEnabled = options.telemetry?.enabled !== void 0 ? options.telemetry.enabled : false;
		return (getBooleanEnvVar("BETTER_AUTH_TELEMETRY", false) || telemetryEnabled) && (context?.skipTestCheck || !isTest());
	};
	const enabled = await isEnabled();
	let anonymousId;
	if (enabled) {
		anonymousId = await getProjectId(typeof options.baseURL === "string" ? options.baseURL : void 0);
		track({
			type: "init",
			payload: {
				config: await getTelemetryAuthConfig(options, context),
				runtime: detectRuntime(),
				database: await detectDatabaseNode(),
				framework: await detectFrameworkNode(),
				environment: detectEnvironment(),
				systemInfo: await detectSystemInfo(),
				packageManager: detectPackageManager()
			},
			anonymousId
		});
	}
	return { publish: async (event) => {
		if (!enabled) return;
		if (!anonymousId) anonymousId = await getProjectId(typeof options.baseURL === "string" ? options.baseURL : void 0);
		await track({
			type: event.type,
			payload: event.payload,
			anonymousId
		});
	} };
}
function estimateEntropy(str) {
	const unique = new Set(str).size;
	if (unique === 0) return 0;
	return Math.log2(Math.pow(unique, str.length));
}
function validateSecret(secret, logger$1) {
	const isDefaultSecret = secret === DEFAULT_SECRET;
	if (isTest()) return;
	if (isDefaultSecret && isProduction) throw new BetterAuthError("You are using the default secret. Please set `BETTER_AUTH_SECRET` in your environment variables or pass `secret` in your auth config.");
	if (!secret) throw new BetterAuthError("BETTER_AUTH_SECRET is missing. Set it in your environment or pass `secret` to betterAuth({ secret }).");
	if (secret.length < 32) logger$1.warn(`[better-auth] Warning: your BETTER_AUTH_SECRET should be at least 32 characters long for adequate security. Generate one with \`npx auth secret\` or \`openssl rand -base64 32\`.`);
	if (estimateEntropy(secret) < 120) logger$1.warn("[better-auth] Warning: your BETTER_AUTH_SECRET appears low-entropy. Use a randomly generated secret for production.");
}
async function createAuthContext(adapter, options, getDatabaseType) {
	if (!options.database) options = defu(options, {
		session: { cookieCache: {
			enabled: true,
			strategy: "jwe",
			refreshCache: true,
			maxAge: options.session?.expiresIn || 3600 * 24 * 7
		} },
		account: {
			storeStateStrategy: "cookie",
			storeAccountCookie: true
		}
	});
	const plugins = options.plugins || [];
	const internalPlugins = getInternalPlugins(options);
	const logger$1 = createLogger(options.logger);
	const isDynamicConfig = isDynamicBaseURLConfig(options.baseURL);
	if (isDynamicBaseURLConfig(options.baseURL)) {
		const { allowedHosts } = options.baseURL;
		if (!allowedHosts || allowedHosts.length === 0) throw new BetterAuthError("baseURL.allowedHosts cannot be empty. Provide at least one allowed host pattern (e.g., [\"myapp.com\", \"*.vercel.app\"]).");
	}
	const baseURL = isDynamicConfig ? void 0 : getBaseURL(typeof options.baseURL === "string" ? options.baseURL : void 0, options.basePath);
	if (!baseURL && !isDynamicConfig) logger$1.warn(`[better-auth] Base URL could not be determined. Please set a valid base URL using the baseURL config option or the BETTER_AUTH_URL environment variable. Without this, callbacks and redirects may not work correctly.`);
	if (adapter.id === "memory" && options.advanced?.database?.generateId === false) logger$1.error(`[better-auth] Misconfiguration detected.
You are using the memory DB with generateId: false.
This will cause no id to be generated for any model.
Most of the features of Better Auth will not work correctly.`);
	const secretsArray = options.secrets ?? parseSecretsEnv(env.BETTER_AUTH_SECRETS);
	const legacySecret = options.secret || env.BETTER_AUTH_SECRET || env.AUTH_SECRET || "";
	let secret;
	let secretConfig;
	if (secretsArray) {
		validateSecretsArray(secretsArray, logger$1);
		secret = secretsArray[0].value;
		secretConfig = buildSecretConfig(secretsArray, legacySecret);
	} else {
		secret = legacySecret || "better-auth-secret-12345678901234567890";
		validateSecret(secret, logger$1);
		secretConfig = secret;
	}
	options = {
		...options,
		secret,
		baseURL: isDynamicConfig ? options.baseURL : baseURL ? new URL(baseURL).origin : "",
		basePath: options.basePath || "/api/auth",
		plugins: plugins.concat(internalPlugins)
	};
	checkEndpointConflicts(options, logger$1);
	const cookies = getCookies(options);
	const tables = getAuthTables(options);
	const providers$1 = (await Promise.all(Object.entries(options.socialProviders || {}).map(async ([key, originalConfig]) => {
		const config$1 = typeof originalConfig === "function" ? await originalConfig() : originalConfig;
		if (config$1 == null) return null;
		if (config$1.enabled === false) return null;
		if (!config$1.clientId) logger$1.warn(`Social provider ${key} is missing clientId or clientSecret`);
		const provider = socialProviders[key](config$1);
		provider.disableImplicitSignUp = config$1.disableImplicitSignUp;
		return provider;
	}))).filter((x) => x !== null);
	const generateIdFunc = ({ model, size }) => {
		if (typeof options.advanced?.generateId === "function") return options.advanced.generateId({
			model,
			size
		});
		const dbGenerateId = options?.advanced?.database?.generateId;
		if (typeof dbGenerateId === "function") return dbGenerateId({
			model,
			size
		});
		if (dbGenerateId === "uuid") return crypto.randomUUID();
		if (dbGenerateId === "serial" || dbGenerateId === false) return false;
		return generateId(size);
	};
	const { publish } = await createTelemetry(options, {
		adapter: adapter.id,
		database: typeof options.database === "function" ? "adapter" : getDatabaseType(options.database)
	});
	const pluginIds = new Set(options.plugins.map((p) => p.id));
	const getPluginFn = (id) => options.plugins.find((p) => p.id === id) ?? null;
	const hasPluginFn = (id) => pluginIds.has(id);
	const trustedOrigins = await getTrustedOrigins(options);
	const trustedProviders = await getTrustedProviders(options);
	const ctx = {
		appName: options.appName || "Better Auth",
		baseURL: baseURL || "",
		version: getBetterAuthVersion(),
		socialProviders: providers$1,
		options,
		oauthConfig: {
			storeStateStrategy: options.account?.storeStateStrategy || (options.database ? "database" : "cookie"),
			skipStateCookieCheck: !!options.account?.skipStateCookieCheck
		},
		tables,
		trustedOrigins,
		trustedProviders,
		isTrustedOrigin(url, settings) {
			return this.trustedOrigins.some((origin) => matchesOriginPattern(url, origin, settings));
		},
		sessionConfig: {
			updateAge: options.session?.updateAge !== void 0 ? options.session.updateAge : 1440 * 60,
			expiresIn: options.session?.expiresIn || 3600 * 24 * 7,
			freshAge: options.session?.freshAge === void 0 ? 3600 * 24 : options.session.freshAge,
			cookieRefreshCache: (() => {
				const refreshCache = options.session?.cookieCache?.refreshCache;
				const maxAge = options.session?.cookieCache?.maxAge || 300;
				if ((!!options.database || !!options.secondaryStorage) && refreshCache) {
					logger$1.warn("[better-auth] `session.cookieCache.refreshCache` is enabled while `database` or `secondaryStorage` is configured. `refreshCache` is meant for stateless (DB-less) setups. Disabling `refreshCache` — remove it from your config to silence this warning.");
					return false;
				}
				if (refreshCache === false || refreshCache === void 0) return false;
				if (refreshCache === true) return {
					enabled: true,
					updateAge: Math.floor(maxAge * .2)
				};
				return {
					enabled: true,
					updateAge: refreshCache.updateAge !== void 0 ? refreshCache.updateAge : Math.floor(maxAge * .2)
				};
			})()
		},
		secret,
		secretConfig,
		rateLimit: {
			...options.rateLimit,
			enabled: options.rateLimit?.enabled ?? isProduction,
			window: options.rateLimit?.window || 10,
			max: options.rateLimit?.max || 100,
			storage: options.rateLimit?.storage || (options.secondaryStorage ? "secondary-storage" : "memory")
		},
		authCookies: cookies,
		logger: logger$1,
		generateId: generateIdFunc,
		session: null,
		secondaryStorage: options.secondaryStorage,
		password: {
			hash: options.emailAndPassword?.password?.hash || hashPassword$1,
			verify: options.emailAndPassword?.password?.verify || verifyPassword$1,
			config: {
				minPasswordLength: options.emailAndPassword?.minPasswordLength || 8,
				maxPasswordLength: options.emailAndPassword?.maxPasswordLength || 128
			},
			checkPassword
		},
		setNewSession(session$1) {
			this.newSession = session$1;
		},
		newSession: null,
		adapter,
		internalAdapter: createInternalAdapter(adapter, {
			options,
			logger: logger$1,
			hooks: options.databaseHooks ? [{
				source: "user",
				hooks: options.databaseHooks
			}] : [],
			generateId: generateIdFunc
		}),
		createAuthCookie: createCookieGetter(options),
		async runMigrations() {
			throw new BetterAuthError("runMigrations will be set by the specific init implementation");
		},
		publishTelemetry: publish,
		skipCSRFCheck: !!options.advanced?.disableCSRFCheck,
		skipOriginCheck: options.advanced?.disableOriginCheck !== void 0 ? options.advanced.disableOriginCheck : isTest() ? true : false,
		runInBackground: options.advanced?.backgroundTasks?.handler ?? ((p) => {
			p.catch(() => {});
		}),
		async runInBackgroundOrAwait(promise) {
			try {
				if (options.advanced?.backgroundTasks?.handler) {
					if (promise instanceof Promise) options.advanced.backgroundTasks.handler(promise.catch((e) => {
						logger$1.error("Failed to run background task:", e);
					}));
				} else await promise;
			} catch (e) {
				logger$1.error("Failed to run background task:", e);
			}
		},
		getPlugin: getPluginFn,
		hasPlugin: hasPluginFn
	};
	const initOrPromise = runPluginInit(ctx);
	if (isPromise(initOrPromise)) await initOrPromise;
	return ctx;
}
var initMinimal = async (options) => {
	const adapter = await getBaseAdapter(options, async () => {
		throw new BetterAuthError("Direct database connection requires Kysely. Please use `better-auth` instead of `better-auth/minimal`, or provide an adapter (drizzleAdapter, prismaAdapter, etc.)");
	});
	const getDatabaseType = (_database) => "unknown";
	const ctx = await createAuthContext(adapter, options, getDatabaseType);
	ctx.runMigrations = async function() {
		throw new BetterAuthError("Migrations are not supported in 'better-auth/minimal'. Please use 'better-auth' for migration support.");
	};
	return ctx;
};
var betterAuth = (options) => {
	return createBetterAuth(options, initMinimal);
};
var signInWithOAuth2BodySchema = z$2.object({
	providerId: z$2.string().meta({ description: "The provider ID for the OAuth provider" }),
	callbackURL: z$2.string().meta({ description: "The URL to redirect to after sign in" }).optional(),
	errorCallbackURL: z$2.string().meta({ description: "The URL to redirect to if an error occurs" }).optional(),
	newUserCallbackURL: z$2.string().meta({ description: "The URL to redirect to after login if the user is new. Eg: \"/welcome\"" }).optional(),
	disableRedirect: z$2.boolean().meta({ description: "Disable redirect" }).optional(),
	scopes: z$2.array(z$2.string()).meta({ description: "Scopes to be passed to the provider authorization request." }).optional(),
	requestSignUp: z$2.boolean().meta({ description: "Explicitly request sign-up. Useful when disableImplicitSignUp is true for this provider. Eg: false" }).optional(),
	additionalData: z$2.record(z$2.string(), z$2.any()).optional()
});
var signInWithOAuth2 = (options) => createAuthEndpoint("/sign-in/oauth2", {
	method: "POST",
	body: signInWithOAuth2BodySchema,
	metadata: { openapi: {
		description: "Sign in with OAuth2",
		responses: { 200: {
			description: "Sign in with OAuth2",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					url: { type: "string" },
					redirect: { type: "boolean" }
				}
			} } }
		} }
	} }
}, async (ctx) => {
	const { providerId } = ctx.body;
	const config$1 = options.config.find((c) => c.providerId === providerId);
	if (!config$1) throw APIError$1.fromStatus("BAD_REQUEST", { message: `${GENERIC_OAUTH_ERROR_CODES.PROVIDER_CONFIG_NOT_FOUND} ${providerId}` });
	const { discoveryUrl, authorizationUrl, tokenUrl, clientId, clientSecret, scopes, redirectURI, responseType, pkce, prompt, accessType, authorizationUrlParams, responseMode } = config$1;
	let finalAuthUrl = authorizationUrl;
	let finalTokenUrl = tokenUrl;
	if (discoveryUrl) {
		const discovery = await betterFetch(discoveryUrl, {
			method: "GET",
			headers: config$1.discoveryHeaders,
			onError(context) {
				ctx.context.logger.error(context.error.message, context.error, { discoveryUrl });
			}
		});
		if (discovery.data) {
			finalAuthUrl = discovery.data.authorization_endpoint;
			finalTokenUrl = discovery.data.token_endpoint;
		}
	}
	if (!finalAuthUrl || !finalTokenUrl) throw APIError$1.from("BAD_REQUEST", GENERIC_OAUTH_ERROR_CODES.INVALID_OAUTH_CONFIGURATION);
	if (authorizationUrlParams) {
		const withAdditionalParams = new URL(finalAuthUrl);
		for (const [paramName, paramValue] of Object.entries(authorizationUrlParams)) withAdditionalParams.searchParams.set(paramName, paramValue);
		finalAuthUrl = withAdditionalParams.toString();
	}
	const additionalParams = typeof authorizationUrlParams === "function" ? authorizationUrlParams(ctx) : authorizationUrlParams;
	const { state, codeVerifier } = await generateState(ctx, void 0, ctx.body.additionalData);
	const authUrl = await createAuthorizationURL({
		id: providerId,
		options: {
			clientId,
			clientSecret,
			redirectURI
		},
		authorizationEndpoint: finalAuthUrl,
		state,
		codeVerifier: pkce ? codeVerifier : void 0,
		scopes: ctx.body.scopes ? [...ctx.body.scopes, ...scopes || []] : scopes || [],
		redirectURI: `${ctx.context.baseURL}/oauth2/callback/${providerId}`,
		prompt,
		accessType,
		responseType,
		responseMode,
		additionalParams
	});
	return ctx.json({
		url: authUrl.toString(),
		redirect: !ctx.body.disableRedirect
	});
});
var OAuth2CallbackQuerySchema = z$2.object({
	code: z$2.string().meta({ description: "The OAuth2 code" }).optional(),
	error: z$2.string().meta({ description: "The error message, if any" }).optional(),
	error_description: z$2.string().meta({ description: "The error description, if any" }).optional(),
	state: z$2.string().meta({ description: "The state parameter from the OAuth2 request" }).optional(),
	iss: z$2.string().meta({ description: "The issuer identifier" }).optional()
});
var oAuth2Callback = (options) => createAuthEndpoint("/oauth2/callback/:providerId", {
	method: "GET",
	query: OAuth2CallbackQuerySchema,
	metadata: {
		...HIDE_METADATA,
		allowedMediaTypes: ["application/x-www-form-urlencoded", "application/json"],
		openapi: {
			description: "OAuth2 callback",
			responses: { 200: {
				description: "OAuth2 callback",
				content: { "application/json": { schema: {
					type: "object",
					properties: { url: { type: "string" } }
				} } }
			} }
		}
	}
}, async (ctx) => {
	const defaultErrorURL = ctx.context.options.onAPIError?.errorURL || `${ctx.context.baseURL}/error`;
	if (ctx.query.error || !ctx.query.code) throw ctx.redirect(`${defaultErrorURL}?error=${ctx.query.error || "oAuth_code_missing"}&error_description=${ctx.query.error_description}`);
	const providerId = ctx.params?.providerId;
	if (!providerId) throw APIError$1.from("BAD_REQUEST", GENERIC_OAUTH_ERROR_CODES.PROVIDER_ID_REQUIRED);
	const providerConfig = options.config.find((p) => p.providerId === providerId);
	if (!providerConfig) throw APIError$1.fromStatus("BAD_REQUEST", { message: `${GENERIC_OAUTH_ERROR_CODES.PROVIDER_CONFIG_NOT_FOUND} ${providerId}` });
	let tokens = void 0;
	const { callbackURL, codeVerifier, errorURL, requestSignUp, newUserURL, link } = await parseState(ctx);
	const code = ctx.query.code;
	function redirectOnError(error$1) {
		const defaultErrorURL$1 = ctx.context.options.onAPIError?.errorURL || `${ctx.context.baseURL}/error`;
		let url = errorURL || defaultErrorURL$1;
		if (url.includes("?")) url = `${url}&error=${error$1}`;
		else url = `${url}?error=${error$1}`;
		throw ctx.redirect(url);
	}
	let finalTokenUrl = providerConfig.tokenUrl;
	let finalUserInfoUrl = providerConfig.userInfoUrl;
	let expectedIssuer = providerConfig.issuer;
	if (providerConfig.discoveryUrl) {
		const discovery = await betterFetch(providerConfig.discoveryUrl, {
			method: "GET",
			headers: providerConfig.discoveryHeaders
		});
		if (discovery.data) {
			finalTokenUrl = discovery.data.token_endpoint;
			finalUserInfoUrl = discovery.data.userinfo_endpoint;
			if (!expectedIssuer && discovery.data.issuer) expectedIssuer = discovery.data.issuer;
		}
	}
	if (expectedIssuer) {
		if (ctx.query.iss) {
			if (ctx.query.iss !== expectedIssuer) {
				ctx.context.logger.error("OAuth issuer mismatch", {
					expected: expectedIssuer,
					received: ctx.query.iss
				});
				return redirectOnError("issuer_mismatch");
			}
		} else if (providerConfig.requireIssuerValidation) {
			ctx.context.logger.error("OAuth issuer parameter missing", { expected: expectedIssuer });
			return redirectOnError("issuer_missing");
		}
	}
	try {
		if (providerConfig.getToken) tokens = await providerConfig.getToken({
			code,
			redirectURI: `${ctx.context.baseURL}/oauth2/callback/${providerConfig.providerId}`,
			codeVerifier: providerConfig.pkce ? codeVerifier : void 0
		});
		else {
			if (!finalTokenUrl) throw APIError$1.from("BAD_REQUEST", GENERIC_OAUTH_ERROR_CODES.INVALID_OAUTH_CONFIG);
			const additionalParams = typeof providerConfig.tokenUrlParams === "function" ? providerConfig.tokenUrlParams(ctx) : providerConfig.tokenUrlParams;
			tokens = await validateAuthorizationCode({
				headers: providerConfig.authorizationHeaders,
				code,
				codeVerifier: providerConfig.pkce ? codeVerifier : void 0,
				redirectURI: `${ctx.context.baseURL}/oauth2/callback/${providerConfig.providerId}`,
				options: {
					clientId: providerConfig.clientId,
					clientSecret: providerConfig.clientSecret,
					redirectURI: providerConfig.redirectURI
				},
				tokenEndpoint: finalTokenUrl,
				authentication: providerConfig.authentication,
				additionalParams
			});
		}
	} catch (e) {
		ctx.context.logger.error(e && typeof e === "object" && "name" in e ? e.name : "", e);
		throw redirectOnError("oauth_code_verification_failed");
	}
	if (!tokens) throw APIError$1.from("BAD_REQUEST", GENERIC_OAUTH_ERROR_CODES.INVALID_OAUTH_CONFIG);
	const userInfo = await (async function handleUserInfo() {
		const userInfo$1 = providerConfig.getUserInfo ? await providerConfig.getUserInfo(tokens) : await getUserInfo(tokens, finalUserInfoUrl);
		if (!userInfo$1) throw redirectOnError("user_info_is_missing");
		const mapUser = providerConfig.mapProfileToUser ? await providerConfig.mapProfileToUser(userInfo$1) : userInfo$1;
		const email = mapUser.email ? mapUser.email.toLowerCase() : userInfo$1.email?.toLowerCase();
		if (!email) {
			ctx.context.logger.error(missingEmailLogMessage(providerConfig.providerId, { source: "generic" }), userInfo$1);
			throw redirectOnError("email_is_missing");
		}
		const id = mapUser.id ? String(mapUser.id) : String(userInfo$1.id);
		const name = mapUser.name ? mapUser.name : userInfo$1.name;
		if (!name) {
			ctx.context.logger.error("Unable to get user info", userInfo$1);
			throw redirectOnError("name_is_missing");
		}
		return {
			...userInfo$1,
			...mapUser,
			email,
			id,
			name
		};
	})();
	if (link) {
		if (ctx.context.options.account?.accountLinking?.allowDifferentEmails !== true && link.email.toLowerCase() !== userInfo.email.toLowerCase()) return redirectOnError("email_doesn't_match");
		const existingAccount = await ctx.context.internalAdapter.findAccountByProviderId(String(userInfo.id), providerConfig.providerId);
		if (existingAccount) {
			if (existingAccount.userId !== link.userId) return redirectOnError("account_already_linked_to_different_user");
			const updateData = Object.fromEntries(Object.entries({
				accessToken: await setTokenUtil(tokens.accessToken, ctx.context),
				idToken: tokens.idToken,
				refreshToken: await setTokenUtil(tokens.refreshToken, ctx.context),
				accessTokenExpiresAt: tokens.accessTokenExpiresAt,
				refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
				scope: tokens.scopes?.join(",")
			}).filter(([_, value]) => value !== void 0));
			await ctx.context.internalAdapter.updateAccount(existingAccount.id, updateData);
		} else if (!await ctx.context.internalAdapter.createAccount({
			userId: link.userId,
			providerId: providerConfig.providerId,
			accountId: userInfo.id,
			accessToken: await setTokenUtil(tokens.accessToken, ctx.context),
			accessTokenExpiresAt: tokens.accessTokenExpiresAt,
			refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
			scope: tokens.scopes?.join(","),
			refreshToken: await setTokenUtil(tokens.refreshToken, ctx.context),
			idToken: tokens.idToken
		})) return redirectOnError("unable_to_link_account");
		let toRedirectTo$1;
		try {
			toRedirectTo$1 = callbackURL.toString();
		} catch {
			toRedirectTo$1 = callbackURL;
		}
		throw ctx.redirect(toRedirectTo$1);
	}
	const result = await handleOAuthUserInfo(ctx, {
		userInfo,
		account: {
			providerId: providerConfig.providerId,
			accountId: userInfo.id,
			...tokens,
			scope: tokens.scopes?.join(",")
		},
		callbackURL,
		disableSignUp: providerConfig.disableImplicitSignUp && !requestSignUp || providerConfig.disableSignUp,
		overrideUserInfo: providerConfig.overrideUserInfo
	});
	if (result.error) return redirectOnError(result.error.split(" ").join("_"));
	const { session: session$1, user: user$1 } = result.data;
	await setSessionCookie(ctx, {
		session: session$1,
		user: user$1
	});
	let toRedirectTo;
	try {
		toRedirectTo = (result.isRegister ? newUserURL || callbackURL : callbackURL).toString();
	} catch {
		toRedirectTo = result.isRegister ? newUserURL || callbackURL : callbackURL;
	}
	throw ctx.redirect(toRedirectTo);
});
var OAuth2LinkAccountBodySchema = z$2.object({
	providerId: z$2.string(),
	callbackURL: z$2.string(),
	scopes: z$2.array(z$2.string()).meta({ description: "Additional scopes to request when linking the account" }).optional(),
	errorCallbackURL: z$2.string().meta({ description: "The URL to redirect to if there is an error during the link process" }).optional()
});
var oAuth2LinkAccount = (options) => createAuthEndpoint("/oauth2/link", {
	method: "POST",
	body: OAuth2LinkAccountBodySchema,
	use: [sessionMiddleware],
	metadata: { openapi: {
		description: "Link an OAuth2 account to the current user session",
		responses: { "200": {
			description: "Authorization URL generated successfully for linking an OAuth2 account",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					url: {
						type: "string",
						format: "uri",
						description: "The authorization URL to redirect the user to for linking the OAuth2 account"
					},
					redirect: {
						type: "boolean",
						description: "Indicates that the client should redirect to the provided URL",
						enum: [true]
					}
				},
				required: ["url", "redirect"]
			} } }
		} }
	} }
}, async (c) => {
	const session$1 = c.context.session;
	if (!session$1) throw APIError$1.from("UNAUTHORIZED", GENERIC_OAUTH_ERROR_CODES.SESSION_REQUIRED);
	const provider = options.config.find((p) => p.providerId === c.body.providerId);
	if (!provider) throw APIError$1.from("NOT_FOUND", BASE_ERROR_CODES.PROVIDER_NOT_FOUND);
	const { providerId, clientId, clientSecret, redirectURI, authorizationUrl, discoveryUrl, pkce, scopes, prompt, accessType, authorizationUrlParams } = provider;
	let finalAuthUrl = authorizationUrl;
	if (!finalAuthUrl) {
		if (!discoveryUrl) throw APIError$1.from("BAD_REQUEST", GENERIC_OAUTH_ERROR_CODES.INVALID_OAUTH_CONFIGURATION);
		const discovery = await betterFetch(discoveryUrl, {
			method: "GET",
			headers: provider.discoveryHeaders,
			onError(context) {
				c.context.logger.error(context.error.message, context.error, { discoveryUrl });
			}
		});
		if (discovery.data) finalAuthUrl = discovery.data.authorization_endpoint;
	}
	if (!finalAuthUrl) throw APIError$1.from("BAD_REQUEST", GENERIC_OAUTH_ERROR_CODES.INVALID_OAUTH_CONFIGURATION);
	const state = await generateState(c, {
		userId: session$1.user.id,
		email: session$1.user.email
	}, void 0);
	const additionalParams = typeof authorizationUrlParams === "function" ? authorizationUrlParams(c) : authorizationUrlParams;
	const url = await createAuthorizationURL({
		id: providerId,
		options: {
			clientId,
			clientSecret,
			redirectURI: redirectURI || `${c.context.baseURL}/oauth2/callback/${providerId}`
		},
		authorizationEndpoint: finalAuthUrl,
		state: state.state,
		codeVerifier: pkce ? state.codeVerifier : void 0,
		scopes: c.body.scopes || scopes || [],
		redirectURI: redirectURI || `${c.context.baseURL}/oauth2/callback/${providerId}`,
		prompt,
		accessType,
		additionalParams
	});
	return c.json({
		url: url.toString(),
		redirect: true
	});
});
async function getUserInfo(tokens, finalUserInfoUrl) {
	if (tokens.idToken) {
		const decoded = decodeJwt(tokens.idToken);
		if (decoded) {
			if (decoded.sub && decoded.email) return {
				id: decoded.sub,
				emailVerified: decoded.email_verified,
				image: decoded.picture,
				...decoded
			};
		}
	}
	if (!finalUserInfoUrl) return null;
	const userInfo = await betterFetch(finalUserInfoUrl, {
		method: "GET",
		headers: { Authorization: `Bearer ${tokens.accessToken}` }
	});
	return {
		id: userInfo.data?.sub ?? "",
		emailVerified: userInfo.data?.email_verified ?? false,
		email: userInfo.data?.email,
		image: userInfo.data?.picture,
		name: userInfo.data?.name,
		...userInfo.data
	};
}
var genericOAuth = (options) => {
	const seenIds = /* @__PURE__ */ new Set();
	const nonUniqueIds = /* @__PURE__ */ new Set();
	for (const config$1 of options.config) {
		const id = config$1.providerId;
		if (seenIds.has(id)) nonUniqueIds.add(id);
		seenIds.add(id);
	}
	if (nonUniqueIds.size > 0) console.warn(`Duplicate provider IDs found: ${Array.from(nonUniqueIds).join(", ")}`);
	return {
		id: "generic-oauth",
		version: PACKAGE_VERSION,
		init: (ctx) => {
			return { context: { socialProviders: options.config.map((c) => {
				let finalUserInfoUrl = c.userInfoUrl;
				return {
					id: c.providerId,
					name: c.providerId,
					async createAuthorizationURL(data) {
						let finalAuthUrl = c.authorizationUrl;
						if (!finalAuthUrl && c.discoveryUrl) {
							const discovery = await betterFetch(c.discoveryUrl, {
								method: "GET",
								headers: c.discoveryHeaders
							});
							if (discovery.data) {
								finalAuthUrl = discovery.data.authorization_endpoint;
								finalUserInfoUrl = finalUserInfoUrl ?? discovery.data.userinfo_endpoint;
							}
						}
						if (!finalAuthUrl) throw APIError.from("BAD_REQUEST", GENERIC_OAUTH_ERROR_CODES.INVALID_OAUTH_CONFIGURATION);
						return createAuthorizationURL({
							id: c.providerId,
							options: {
								clientId: c.clientId,
								clientSecret: c.clientSecret,
								redirectURI: c.redirectURI
							},
							authorizationEndpoint: finalAuthUrl,
							state: data.state,
							codeVerifier: c.pkce ? data.codeVerifier : void 0,
							scopes: c.scopes || [],
							redirectURI: `${ctx.baseURL}/oauth2/callback/${c.providerId}`
						});
					},
					async validateAuthorizationCode(data) {
						if (c.getToken) return c.getToken(data);
						let finalTokenUrl = c.tokenUrl;
						if (c.discoveryUrl) {
							const discovery = await betterFetch(c.discoveryUrl, {
								method: "GET",
								headers: c.discoveryHeaders
							});
							if (discovery.data) {
								finalTokenUrl = discovery.data.token_endpoint;
								finalUserInfoUrl = discovery.data.userinfo_endpoint;
							}
						}
						if (!finalTokenUrl) throw APIError.from("BAD_REQUEST", GENERIC_OAUTH_ERROR_CODES.TOKEN_URL_NOT_FOUND);
						return validateAuthorizationCode({
							headers: c.authorizationHeaders,
							code: data.code,
							codeVerifier: data.codeVerifier,
							redirectURI: data.redirectURI,
							options: {
								clientId: c.clientId,
								clientSecret: c.clientSecret,
								redirectURI: c.redirectURI
							},
							tokenEndpoint: finalTokenUrl,
							authentication: c.authentication
						});
					},
					async refreshAccessToken(refreshToken$1) {
						let finalTokenUrl = c.tokenUrl;
						if (c.discoveryUrl) {
							const discovery = await betterFetch(c.discoveryUrl, {
								method: "GET",
								headers: c.discoveryHeaders
							});
							if (discovery.data) finalTokenUrl = discovery.data.token_endpoint;
						}
						if (!finalTokenUrl) throw APIError.from("BAD_REQUEST", GENERIC_OAUTH_ERROR_CODES.TOKEN_URL_NOT_FOUND);
						return refreshAccessToken({
							refreshToken: refreshToken$1,
							options: {
								clientId: c.clientId,
								clientSecret: c.clientSecret
							},
							authentication: c.authentication,
							tokenEndpoint: finalTokenUrl
						});
					},
					async getUserInfo(tokens) {
						const userInfo = c.getUserInfo ? await c.getUserInfo(tokens) : await getUserInfo(tokens, finalUserInfoUrl);
						if (!userInfo) return null;
						const userMap = await c.mapProfileToUser?.(userInfo);
						return {
							user: {
								id: userInfo?.id,
								email: userInfo?.email,
								emailVerified: userInfo?.emailVerified,
								image: userInfo?.image,
								name: userInfo?.name,
								...userMap
							},
							data: userInfo
						};
					},
					options: { overrideUserInfoOnSignIn: c.overrideUserInfo }
				};
			}).concat(ctx.socialProviders) } };
		},
		endpoints: {
			signInWithOAuth2: signInWithOAuth2(options),
			oAuth2Callback: oAuth2Callback(options),
			oAuth2LinkAccount: oAuth2LinkAccount(options)
		},
		options,
		$ERROR_CODES: GENERIC_OAUTH_ERROR_CODES
	};
};
var TWO_FACTOR_COOKIE_NAME = "two_factor";
var TRUST_DEVICE_COOKIE_NAME = "trust_device";
async function verifyTwoFactor(ctx) {
	const invalid = (errorKey) => {
		throw APIError.from("UNAUTHORIZED", TWO_FACTOR_ERROR_CODES[errorKey]);
	};
	const session$1 = await getSessionFromCtx(ctx);
	if (!session$1) {
		const twoFactorCookie = ctx.context.createAuthCookie(TWO_FACTOR_COOKIE_NAME);
		const signedTwoFactorCookie = await ctx.getSignedCookie(twoFactorCookie.name, ctx.context.secret);
		if (!signedTwoFactorCookie) throw APIError.from("UNAUTHORIZED", TWO_FACTOR_ERROR_CODES.INVALID_TWO_FACTOR_COOKIE);
		const verificationToken = await ctx.context.internalAdapter.findVerificationValue(signedTwoFactorCookie);
		if (!verificationToken) throw APIError.from("UNAUTHORIZED", TWO_FACTOR_ERROR_CODES.INVALID_TWO_FACTOR_COOKIE);
		const user$1 = await ctx.context.internalAdapter.findUserById(verificationToken.value);
		if (!user$1) throw APIError.from("UNAUTHORIZED", TWO_FACTOR_ERROR_CODES.INVALID_TWO_FACTOR_COOKIE);
		const dontRememberMe = await ctx.getSignedCookie(ctx.context.authCookies.dontRememberToken.name, ctx.context.secret);
		return {
			valid: async (ctx$1) => {
				const session$2 = await ctx$1.context.internalAdapter.createSession(verificationToken.value, !!dontRememberMe);
				if (!session$2) throw APIError.from("INTERNAL_SERVER_ERROR", {
					message: "failed to create session",
					code: "FAILED_TO_CREATE_SESSION"
				});
				await ctx$1.context.internalAdapter.deleteVerificationByIdentifier(signedTwoFactorCookie);
				await setSessionCookie(ctx$1, {
					session: session$2,
					user: user$1
				});
				expireCookie(ctx$1, twoFactorCookie);
				if (ctx$1.body.trustDevice) {
					const maxAge = ctx$1.context.getPlugin("two-factor").options?.trustDeviceMaxAge ?? 2592e3;
					const trustDeviceCookie = ctx$1.context.createAuthCookie(TRUST_DEVICE_COOKIE_NAME, { maxAge });
					const trustIdentifier = `trust-device-${generateRandomString(32)}`;
					const token = await createHMAC("SHA-256", "base64urlnopad").sign(ctx$1.context.secret, `${user$1.id}!${trustIdentifier}`);
					await ctx$1.context.internalAdapter.createVerificationValue({
						value: user$1.id,
						identifier: trustIdentifier,
						expiresAt: new Date(Date.now() + maxAge * 1e3)
					});
					await ctx$1.setSignedCookie(trustDeviceCookie.name, `${token}!${trustIdentifier}`, ctx$1.context.secret, trustDeviceCookie.attributes);
					expireCookie(ctx$1, ctx$1.context.authCookies.dontRememberToken);
				}
				return ctx$1.json({
					token: session$2.token,
					user: parseUserOutput(ctx$1.context.options, user$1)
				});
			},
			invalid,
			session: {
				session: null,
				user: user$1
			},
			key: signedTwoFactorCookie
		};
	}
	return {
		valid: async (ctx$1) => {
			return ctx$1.json({
				token: session$1.session.token,
				user: parseUserOutput(ctx$1.context.options, session$1.user)
			});
		},
		invalid,
		session: session$1,
		key: `${session$1.user.id}!${session$1.session.id}`
	};
}
function generateBackupCodesFn(options) {
	return Array.from({ length: options?.amount ?? 10 }).fill(null).map(() => generateRandomString(options?.length ?? 10, "a-z", "0-9", "A-Z")).map((code) => `${code.slice(0, 5)}-${code.slice(5)}`);
}
async function encodeBackupCodes(codes, secret, options) {
	const json = JSON.stringify(codes);
	if (options?.storeBackupCodes === "encrypted") return symmetricEncrypt({
		data: json,
		key: secret
	});
	if (typeof options?.storeBackupCodes === "object" && "encrypt" in options?.storeBackupCodes) return options.storeBackupCodes.encrypt(json);
	return json;
}
async function generateBackupCodes(secret, options) {
	const backupCodes = options?.customBackupCodesGenerate ? options.customBackupCodesGenerate() : generateBackupCodesFn(options);
	return {
		backupCodes,
		encryptedBackupCodes: await encodeBackupCodes(backupCodes, secret, options)
	};
}
async function verifyBackupCode(data, key, options) {
	const codes = await getBackupCodes(data.backupCodes, key, options);
	if (!codes) return {
		status: false,
		updated: null
	};
	return {
		status: codes.includes(data.code),
		updated: codes.filter((code) => code !== data.code)
	};
}
async function getBackupCodes(backupCodes, key, options) {
	if (options?.storeBackupCodes === "encrypted") return safeJSONParse(await symmetricDecrypt({
		key,
		data: backupCodes
	}));
	if (typeof options?.storeBackupCodes === "object" && "decrypt" in options?.storeBackupCodes) return safeJSONParse(await options?.storeBackupCodes.decrypt(backupCodes));
	return safeJSONParse(backupCodes);
}
var verifyBackupCodeBodySchema = z$2.object({
	code: z$2.string().meta({ description: `A backup code to verify. Eg: "123456"` }),
	disableSession: z$2.boolean().meta({ description: "If true, the session cookie will not be set." }).optional(),
	trustDevice: z$2.boolean().meta({ description: "If true, the device will be trusted for 30 days. It'll be refreshed on every sign in request within this time. Eg: true" }).optional()
});
var viewBackupCodesBodySchema = z$2.object({ userId: z$2.coerce.string().meta({ description: `The user ID to view all backup codes. Eg: "user-id"` }) });
var backupCode2fa = (opts) => {
	const twoFactorTable = "twoFactor";
	const passwordSchema = z$2.string().meta({ description: "The users password." });
	const generateBackupCodesBodySchema = opts.allowPasswordless ? z$2.object({ password: passwordSchema.optional() }) : z$2.object({ password: passwordSchema });
	return {
		id: "backup_code",
		version: PACKAGE_VERSION,
		endpoints: {
			verifyBackupCode: createAuthEndpoint("/two-factor/verify-backup-code", {
				method: "POST",
				body: verifyBackupCodeBodySchema,
				metadata: { openapi: {
					description: "Verify a backup code for two-factor authentication",
					responses: { "200": {
						description: "Backup code verified successfully",
						content: { "application/json": { schema: {
							type: "object",
							properties: {
								user: {
									type: "object",
									properties: {
										id: {
											type: "string",
											description: "Unique identifier of the user"
										},
										email: {
											type: "string",
											format: "email",
											nullable: true,
											description: "User's email address"
										},
										emailVerified: {
											type: "boolean",
											nullable: true,
											description: "Whether the email is verified"
										},
										name: {
											type: "string",
											nullable: true,
											description: "User's name"
										},
										image: {
											type: "string",
											format: "uri",
											nullable: true,
											description: "User's profile image URL"
										},
										twoFactorEnabled: {
											type: "boolean",
											description: "Whether two-factor authentication is enabled for the user"
										},
										createdAt: {
											type: "string",
											format: "date-time",
											description: "Timestamp when the user was created"
										},
										updatedAt: {
											type: "string",
											format: "date-time",
											description: "Timestamp when the user was last updated"
										}
									},
									required: [
										"id",
										"twoFactorEnabled",
										"createdAt",
										"updatedAt"
									],
									description: "The authenticated user object with two-factor details"
								},
								session: {
									type: "object",
									properties: {
										token: {
											type: "string",
											description: "Session token"
										},
										userId: {
											type: "string",
											description: "ID of the user associated with the session"
										},
										createdAt: {
											type: "string",
											format: "date-time",
											description: "Timestamp when the session was created"
										},
										expiresAt: {
											type: "string",
											format: "date-time",
											description: "Timestamp when the session expires"
										}
									},
									required: [
										"token",
										"userId",
										"createdAt",
										"expiresAt"
									],
									description: "The current session object, included unless disableSession is true"
								}
							},
							required: ["user", "session"]
						} } }
					} }
				} }
			}, async (ctx) => {
				const { session: session$1, valid } = await verifyTwoFactor(ctx);
				const user$1 = session$1.user;
				const twoFactor$2 = await ctx.context.adapter.findOne({
					model: twoFactorTable,
					where: [{
						field: "userId",
						value: user$1.id
					}]
				});
				if (!twoFactor$2) throw APIError.from("BAD_REQUEST", TWO_FACTOR_ERROR_CODES.BACKUP_CODES_NOT_ENABLED);
				const validate = await verifyBackupCode({
					backupCodes: twoFactor$2.backupCodes,
					code: ctx.body.code
				}, ctx.context.secretConfig, opts);
				if (!validate.status || !validate.updated) throw APIError.from("UNAUTHORIZED", TWO_FACTOR_ERROR_CODES.INVALID_BACKUP_CODE);
				const updatedBackupCodes = await encodeBackupCodes(validate.updated, ctx.context.secretConfig, opts);
				if (!await ctx.context.adapter.update({
					model: twoFactorTable,
					update: { backupCodes: updatedBackupCodes },
					where: [{
						field: "id",
						value: twoFactor$2.id
					}, {
						field: "backupCodes",
						value: twoFactor$2.backupCodes
					}]
				})) throw APIError.fromStatus("CONFLICT", { message: "Failed to verify backup code. Please try again." });
				if (!ctx.body.disableSession) return valid(ctx);
				return ctx.json({
					token: session$1.session?.token,
					user: parseUserOutput(ctx.context.options, session$1.user)
				});
			}),
			generateBackupCodes: createAuthEndpoint("/two-factor/generate-backup-codes", {
				method: "POST",
				body: generateBackupCodesBodySchema,
				use: [sessionMiddleware],
				metadata: { openapi: {
					description: "Generate new backup codes for two-factor authentication",
					responses: { "200": {
						description: "Backup codes generated successfully",
						content: { "application/json": { schema: {
							type: "object",
							properties: {
								status: {
									type: "boolean",
									description: "Indicates if the backup codes were generated successfully",
									enum: [true]
								},
								backupCodes: {
									type: "array",
									items: { type: "string" },
									description: "Array of generated backup codes in plain text"
								}
							},
							required: ["status", "backupCodes"]
						} } }
					} }
				} }
			}, async (ctx) => {
				const user$1 = ctx.context.session.user;
				if (!user$1.twoFactorEnabled) throw APIError.from("BAD_REQUEST", TWO_FACTOR_ERROR_CODES.TWO_FACTOR_NOT_ENABLED);
				if (await shouldRequirePassword(ctx, user$1.id, opts.allowPasswordless)) {
					if (!ctx.body.password) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
					await ctx.context.password.checkPassword(user$1.id, ctx);
				}
				const twoFactor$2 = await ctx.context.adapter.findOne({
					model: twoFactorTable,
					where: [{
						field: "userId",
						value: user$1.id
					}]
				});
				if (!twoFactor$2) throw APIError.from("BAD_REQUEST", TWO_FACTOR_ERROR_CODES.TWO_FACTOR_NOT_ENABLED);
				const backupCodes = await generateBackupCodes(ctx.context.secretConfig, opts);
				await ctx.context.adapter.update({
					model: twoFactorTable,
					update: { backupCodes: backupCodes.encryptedBackupCodes },
					where: [{
						field: "id",
						value: twoFactor$2.id
					}]
				});
				return ctx.json({
					status: true,
					backupCodes: backupCodes.backupCodes
				});
			}),
			viewBackupCodes: createAuthEndpoint({
				method: "POST",
				body: viewBackupCodesBodySchema
			}, async (ctx) => {
				const twoFactor$2 = await ctx.context.adapter.findOne({
					model: twoFactorTable,
					where: [{
						field: "userId",
						value: ctx.body.userId
					}]
				});
				if (!twoFactor$2) throw APIError.from("BAD_REQUEST", TWO_FACTOR_ERROR_CODES.BACKUP_CODES_NOT_ENABLED);
				const decryptedBackupCodes = await getBackupCodes(twoFactor$2.backupCodes, ctx.context.secretConfig, opts);
				if (!decryptedBackupCodes) throw APIError.from("BAD_REQUEST", TWO_FACTOR_ERROR_CODES.INVALID_BACKUP_CODE);
				return ctx.json({
					status: true,
					backupCodes: decryptedBackupCodes
				});
			})
		}
	};
};
var defaultKeyHasher = async (token) => {
	const hash$1 = await createHash$1("SHA-256").digest(new TextEncoder().encode(token));
	return base64Url.encode(new Uint8Array(hash$1), { padding: false });
};
var verifyOTPBodySchema = z$2.object({
	code: z$2.string().meta({ description: "The otp code to verify. Eg: \"012345\"" }),
	trustDevice: z$2.boolean().optional().meta({ description: "If true, the device will be trusted for 30 days. It'll be refreshed on every sign in request within this time. Eg: true" })
});
var send2FaOTPBodySchema = z$2.object({ trustDevice: z$2.boolean().optional().meta({ description: "If true, the device will be trusted for 30 days. It'll be refreshed on every sign in request within this time. Eg: true" }) }).optional();
var otp2fa = (options) => {
	const opts = {
		storeOTP: "plain",
		digits: 6,
		...options,
		period: (options?.period || 3) * 60 * 1e3
	};
	async function storeOTP(ctx, otp) {
		if (opts.storeOTP === "hashed") return await defaultKeyHasher(otp);
		if (typeof opts.storeOTP === "object" && "hash" in opts.storeOTP) return await opts.storeOTP.hash(otp);
		if (typeof opts.storeOTP === "object" && "encrypt" in opts.storeOTP) return await opts.storeOTP.encrypt(otp);
		if (opts.storeOTP === "encrypted") return await symmetricEncrypt({
			key: ctx.context.secretConfig,
			data: otp
		});
		return otp;
	}
	async function decryptOrHashForComparison(ctx, storedOtp, userInput) {
		if (opts.storeOTP === "hashed") return [storedOtp, await defaultKeyHasher(userInput)];
		if (opts.storeOTP === "encrypted") return [await symmetricDecrypt({
			key: ctx.context.secretConfig,
			data: storedOtp
		}), userInput];
		if (typeof opts.storeOTP === "object" && "encrypt" in opts.storeOTP) return [await opts.storeOTP.decrypt(storedOtp), userInput];
		if (typeof opts.storeOTP === "object" && "hash" in opts.storeOTP) return [storedOtp, await opts.storeOTP.hash(userInput)];
		return [storedOtp, userInput];
	}
	return {
		id: "otp",
		version: PACKAGE_VERSION,
		endpoints: {
			sendTwoFactorOTP: createAuthEndpoint("/two-factor/send-otp", {
				method: "POST",
				body: send2FaOTPBodySchema,
				metadata: { openapi: {
					summary: "Send two factor OTP",
					description: "Send two factor OTP to the user",
					responses: { 200: {
						description: "Successful response",
						content: { "application/json": { schema: {
							type: "object",
							properties: { status: { type: "boolean" } }
						} } }
					} }
				} }
			}, async (ctx) => {
				if (!options || !options.sendOTP) {
					ctx.context.logger.error("send otp isn't configured. Please configure the send otp function on otp options.");
					throw APIError.from("BAD_REQUEST", {
						message: "otp isn't configured",
						code: "OTP_NOT_CONFIGURED"
					});
				}
				const { session: session$1, key } = await verifyTwoFactor(ctx);
				const code = generateRandomString(opts.digits, "0-9");
				const hashedCode = await storeOTP(ctx, code);
				await ctx.context.internalAdapter.createVerificationValue({
					value: `${hashedCode}:0`,
					identifier: `2fa-otp-${key}`,
					expiresAt: new Date(Date.now() + opts.period)
				});
				const sendOTPResult = options.sendOTP({
					user: session$1.user,
					otp: code
				}, ctx);
				if (sendOTPResult instanceof Promise) await ctx.context.runInBackgroundOrAwait(sendOTPResult.catch((e) => {
					ctx.context.logger.error("Failed to send two-factor OTP", e);
				}));
				return ctx.json({ status: true });
			}),
			verifyTwoFactorOTP: createAuthEndpoint("/two-factor/verify-otp", {
				method: "POST",
				body: verifyOTPBodySchema,
				metadata: { openapi: {
					summary: "Verify two factor OTP",
					description: "Verify two factor OTP",
					responses: { "200": {
						description: "Two-factor OTP verified successfully",
						content: { "application/json": { schema: {
							type: "object",
							properties: {
								token: {
									type: "string",
									description: "Session token for the authenticated session"
								},
								user: {
									type: "object",
									properties: {
										id: {
											type: "string",
											description: "Unique identifier of the user"
										},
										email: {
											type: "string",
											format: "email",
											nullable: true,
											description: "User's email address"
										},
										emailVerified: {
											type: "boolean",
											nullable: true,
											description: "Whether the email is verified"
										},
										name: {
											type: "string",
											nullable: true,
											description: "User's name"
										},
										image: {
											type: "string",
											format: "uri",
											nullable: true,
											description: "User's profile image URL"
										},
										createdAt: {
											type: "string",
											format: "date-time",
											description: "Timestamp when the user was created"
										},
										updatedAt: {
											type: "string",
											format: "date-time",
											description: "Timestamp when the user was last updated"
										}
									},
									required: [
										"id",
										"createdAt",
										"updatedAt"
									],
									description: "The authenticated user object"
								}
							},
							required: ["token", "user"]
						} } }
					} }
				} }
			}, async (ctx) => {
				const { session: session$1, key, valid, invalid } = await verifyTwoFactor(ctx);
				const toCheckOtp = await ctx.context.internalAdapter.findVerificationValue(`2fa-otp-${key}`);
				const [otp, counter] = toCheckOtp?.value?.split(":") ?? [];
				if (!toCheckOtp || toCheckOtp.expiresAt < /* @__PURE__ */ new Date()) {
					if (toCheckOtp) await ctx.context.internalAdapter.deleteVerificationByIdentifier(`2fa-otp-${key}`);
					throw APIError.from("BAD_REQUEST", TWO_FACTOR_ERROR_CODES.OTP_HAS_EXPIRED);
				}
				const allowedAttempts = options?.allowedAttempts || 5;
				if (parseInt(counter) >= allowedAttempts) {
					await ctx.context.internalAdapter.deleteVerificationByIdentifier(`2fa-otp-${key}`);
					throw APIError.from("BAD_REQUEST", TWO_FACTOR_ERROR_CODES.TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE);
				}
				const [storedValue, inputValue] = await decryptOrHashForComparison(ctx, otp, ctx.body.code);
				if (constantTimeEqual(new TextEncoder().encode(storedValue), new TextEncoder().encode(inputValue))) {
					if (!session$1.user.twoFactorEnabled) {
						if (!session$1.session) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION);
						const updatedUser = await ctx.context.internalAdapter.updateUser(session$1.user.id, { twoFactorEnabled: true });
						const newSession = await ctx.context.internalAdapter.createSession(session$1.user.id, false, session$1.session);
						await setSessionCookie(ctx, {
							session: newSession,
							user: updatedUser
						});
						await ctx.context.internalAdapter.deleteSession(session$1.session.token);
						return ctx.json({
							token: newSession.token,
							user: parseUserOutput(ctx.context.options, updatedUser)
						});
					}
					return valid(ctx);
				} else {
					await ctx.context.internalAdapter.updateVerificationByIdentifier(`2fa-otp-${key}`, { value: `${otp}:${(parseInt(counter, 10) || 0) + 1}` });
					return invalid("INVALID_CODE");
				}
			})
		}
	};
};
var schema = {
	user: { fields: { twoFactorEnabled: {
		type: "boolean",
		required: false,
		defaultValue: false,
		input: false
	} } },
	twoFactor: { fields: {
		secret: {
			type: "string",
			required: true,
			returned: false,
			index: true
		},
		backupCodes: {
			type: "string",
			required: true,
			returned: false
		},
		userId: {
			type: "string",
			required: true,
			returned: false,
			references: {
				model: "user",
				field: "id"
			},
			index: true
		},
		verified: {
			type: "boolean",
			required: false,
			defaultValue: true,
			input: false
		}
	} }
};
function getAlphabet(hex$1) {
	return hex$1 ? "0123456789ABCDEFGHIJKLMNOPQRSTUV" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
}
function createDecodeMap(alphabet) {
	const decodeMap = /* @__PURE__ */ new Map();
	for (let i = 0; i < alphabet.length; i++) decodeMap.set(alphabet[i], i);
	return decodeMap;
}
function base32Encode(data, alphabet, padding) {
	let result = "";
	let buffer = 0;
	let shift = 0;
	for (const byte of data) {
		buffer = buffer << 8 | byte;
		shift += 8;
		while (shift >= 5) {
			shift -= 5;
			result += alphabet[buffer >> shift & 31];
		}
	}
	if (shift > 0) result += alphabet[buffer << 5 - shift & 31];
	if (padding) {
		const padCount = (8 - result.length % 8) % 8;
		result += "=".repeat(padCount);
	}
	return result;
}
function base32Decode(data, alphabet) {
	const decodeMap = createDecodeMap(alphabet);
	const result = [];
	let buffer = 0;
	let bitsCollected = 0;
	for (const char of data) {
		if (char === "=") break;
		const value = decodeMap.get(char);
		if (value === void 0) throw new Error(`Invalid Base32 character: ${char}`);
		buffer = buffer << 5 | value;
		bitsCollected += 5;
		while (bitsCollected >= 8) {
			bitsCollected -= 8;
			result.push(buffer >> bitsCollected & 255);
		}
	}
	return Uint8Array.from(result);
}
var base32 = {
	encode(data, options = {}) {
		const alphabet = getAlphabet(false);
		return base32Encode(typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data), alphabet, options.padding ?? true);
	},
	decode(data) {
		if (typeof data !== "string") data = new TextDecoder().decode(data);
		const alphabet = getAlphabet(false);
		return base32Decode(data, alphabet);
	}
};
var defaultPeriod = 30;
var defaultDigits = 6;
async function generateHOTP(secret, { counter, digits, hash: hash$1 = "SHA-1" }) {
	const _digits = digits ?? defaultDigits;
	if (_digits < 1 || _digits > 8) throw new TypeError("Digits must be between 1 and 8");
	const buffer = /* @__PURE__ */ new ArrayBuffer(8);
	new DataView(buffer).setBigUint64(0, BigInt(counter), false);
	const bytes = new Uint8Array(buffer);
	const hmacResult = new Uint8Array(await createHMAC(hash$1).sign(secret, bytes));
	const offset = hmacResult[hmacResult.length - 1] & 15;
	return (((hmacResult[offset] & 127) << 24 | (hmacResult[offset + 1] & 255) << 16 | (hmacResult[offset + 2] & 255) << 8 | hmacResult[offset + 3] & 255) % 10 ** _digits).toString().padStart(_digits, "0");
}
async function generateTOTP(secret, options) {
	const digits = options?.digits ?? defaultDigits;
	const milliseconds = (options?.period ?? defaultPeriod) * 1e3;
	return await generateHOTP(secret, {
		counter: Math.floor(Date.now() / milliseconds),
		digits,
		hash: options?.hash
	});
}
async function verifyTOTP(otp, { window: window$1 = 1, digits = defaultDigits, secret, period = defaultPeriod }) {
	const milliseconds = period * 1e3;
	const counter = Math.floor(Date.now() / milliseconds);
	for (let i = -window$1; i <= window$1; i++) if (otp === await generateHOTP(secret, {
		counter: counter + i,
		digits
	})) return true;
	return false;
}
function generateQRCode({ issuer, account: account$1, secret, digits = defaultDigits, period = defaultPeriod }) {
	const baseURI = `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(account$1)}`;
	const params = new URLSearchParams({
		secret: base32.encode(secret, { padding: false }),
		issuer
	});
	if (digits !== void 0) params.set("digits", digits.toString());
	if (period !== void 0) params.set("period", period.toString());
	return `${baseURI}?${params.toString()}`;
}
var createOTP = (secret, opts) => {
	const digits = opts?.digits ?? defaultDigits;
	const period = opts?.period ?? defaultPeriod;
	return {
		hotp: (counter) => generateHOTP(secret, {
			counter,
			digits
		}),
		totp: () => generateTOTP(secret, {
			digits,
			period
		}),
		verify: (otp, options) => verifyTOTP(otp, {
			secret,
			digits,
			period,
			...options
		}),
		url: (issuer, account$1) => generateQRCode({
			issuer,
			account: account$1,
			secret,
			digits,
			period
		})
	};
};
var generateTOTPBodySchema = z$2.object({ secret: z$2.string().meta({ description: "The secret to generate the TOTP code" }) });
var verifyTOTPBodySchema = z$2.object({
	code: z$2.string().meta({ description: "The otp code to verify. Eg: \"012345\"" }),
	trustDevice: z$2.boolean().meta({ description: "If true, the device will be trusted for 30 days. It'll be refreshed on every sign in request within this time. Eg: true" }).optional()
});
var totp2fa = (options) => {
	const opts = {
		...options,
		digits: options?.digits || 6,
		period: options?.period || 30
	};
	const passwordSchema = z$2.string().meta({ description: "User password" });
	const getTOTPURIBodySchema = options?.allowPasswordless ? z$2.object({ password: passwordSchema.optional() }) : z$2.object({ password: passwordSchema });
	const twoFactorTable = "twoFactor";
	return {
		id: "totp",
		version: PACKAGE_VERSION,
		endpoints: {
			generateTOTP: createAuthEndpoint({
				method: "POST",
				body: generateTOTPBodySchema,
				metadata: { openapi: {
					summary: "Generate TOTP code",
					description: "Use this endpoint to generate a TOTP code",
					responses: { 200: {
						description: "Successful response",
						content: { "application/json": { schema: {
							type: "object",
							properties: { code: { type: "string" } }
						} } }
					} }
				} }
			}, async (ctx) => {
				if (options?.disable) {
					ctx.context.logger.error("totp isn't configured. please pass totp option on two factor plugin to enable totp");
					throw APIError.from("BAD_REQUEST", {
						message: "totp isn't configured",
						code: "TOTP_NOT_CONFIGURED"
					});
				}
				return { code: await createOTP(ctx.body.secret, {
					period: opts.period,
					digits: opts.digits
				}).totp() };
			}),
			getTOTPURI: createAuthEndpoint("/two-factor/get-totp-uri", {
				method: "POST",
				use: [sessionMiddleware],
				body: getTOTPURIBodySchema,
				metadata: { openapi: {
					summary: "Get TOTP URI",
					description: "Use this endpoint to get the TOTP URI",
					responses: { 200: {
						description: "Successful response",
						content: { "application/json": { schema: {
							type: "object",
							properties: { totpURI: { type: "string" } }
						} } }
					} }
				} }
			}, async (ctx) => {
				if (options?.disable) {
					ctx.context.logger.error("totp isn't configured. please pass totp option on two factor plugin to enable totp");
					throw APIError.from("BAD_REQUEST", {
						message: "totp isn't configured",
						code: "TOTP_NOT_CONFIGURED"
					});
				}
				const user$1 = ctx.context.session.user;
				const twoFactor$2 = await ctx.context.adapter.findOne({
					model: twoFactorTable,
					where: [{
						field: "userId",
						value: user$1.id
					}]
				});
				if (!twoFactor$2) throw APIError.from("BAD_REQUEST", TWO_FACTOR_ERROR_CODES.TOTP_NOT_ENABLED);
				const secret = await symmetricDecrypt({
					key: ctx.context.secretConfig,
					data: twoFactor$2.secret
				});
				if (await shouldRequirePassword(ctx, user$1.id, options?.allowPasswordless)) {
					if (!ctx.body.password) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
					await ctx.context.password.checkPassword(user$1.id, ctx);
				}
				return { totpURI: createOTP(secret, {
					digits: opts.digits,
					period: opts.period
				}).url(options?.issuer || ctx.context.appName, user$1.email) };
			}),
			verifyTOTP: createAuthEndpoint("/two-factor/verify-totp", {
				method: "POST",
				body: verifyTOTPBodySchema,
				metadata: { openapi: {
					summary: "Verify two factor TOTP",
					description: "Verify two factor TOTP",
					responses: { 200: {
						description: "Successful response",
						content: { "application/json": { schema: {
							type: "object",
							properties: { status: { type: "boolean" } }
						} } }
					} }
				} }
			}, async (ctx) => {
				if (options?.disable) {
					ctx.context.logger.error("totp isn't configured. please pass totp option on two factor plugin to enable totp");
					throw APIError.from("BAD_REQUEST", {
						message: "totp isn't configured",
						code: "TOTP_NOT_CONFIGURED"
					});
				}
				const { session: session$1, valid, invalid } = await verifyTwoFactor(ctx);
				const user$1 = session$1.user;
				const isSignIn = !session$1.session;
				const twoFactor$2 = await ctx.context.adapter.findOne({
					model: twoFactorTable,
					where: [{
						field: "userId",
						value: user$1.id
					}]
				});
				if (!twoFactor$2) throw APIError.from("BAD_REQUEST", TWO_FACTOR_ERROR_CODES.TOTP_NOT_ENABLED);
				if (isSignIn && twoFactor$2.verified === false) throw APIError.from("BAD_REQUEST", TWO_FACTOR_ERROR_CODES.TOTP_NOT_ENABLED);
				if (!await createOTP(await symmetricDecrypt({
					key: ctx.context.secretConfig,
					data: twoFactor$2.secret
				}), {
					period: opts.period,
					digits: opts.digits
				}).verify(ctx.body.code)) return invalid("INVALID_CODE");
				if (twoFactor$2.verified !== true) {
					if (!user$1.twoFactorEnabled) {
						const activeSession = session$1.session;
						const updatedUser = await ctx.context.internalAdapter.updateUser(user$1.id, { twoFactorEnabled: true });
						await setSessionCookie(ctx, {
							session: await ctx.context.internalAdapter.createSession(user$1.id, false, activeSession),
							user: updatedUser
						});
						await ctx.context.internalAdapter.deleteSession(activeSession.token);
					}
					await ctx.context.adapter.update({
						model: twoFactorTable,
						update: { verified: true },
						where: [{
							field: "id",
							value: twoFactor$2.id
						}]
					});
				}
				return valid(ctx);
			})
		}
	};
};
var twoFactor = (options) => {
	const opts = { twoFactorTable: "twoFactor" };
	const trustDeviceMaxAge = options?.trustDeviceMaxAge ?? 2592e3;
	const allowPasswordless = options?.allowPasswordless;
	const backupCodeOptions = {
		storeBackupCodes: "encrypted",
		...options?.backupCodeOptions
	};
	const totp = totp2fa({
		...options?.totpOptions,
		allowPasswordless: options?.totpOptions?.allowPasswordless ?? allowPasswordless
	});
	const backupCode = backupCode2fa({
		...backupCodeOptions,
		allowPasswordless: options?.backupCodeOptions?.allowPasswordless ?? allowPasswordless
	});
	const otp = otp2fa(options?.otpOptions);
	const passwordSchema = z$2.string().meta({ description: "User password" });
	const enableTwoFactorBodySchema = allowPasswordless ? z$2.object({
		password: passwordSchema.optional(),
		issuer: z$2.string().meta({ description: "Custom issuer for the TOTP URI" }).optional()
	}) : z$2.object({
		password: passwordSchema,
		issuer: z$2.string().meta({ description: "Custom issuer for the TOTP URI" }).optional()
	});
	const disableTwoFactorBodySchema = allowPasswordless ? z$2.object({ password: passwordSchema.optional() }) : z$2.object({ password: passwordSchema });
	return {
		id: "two-factor",
		version: PACKAGE_VERSION,
		endpoints: {
			...totp.endpoints,
			...otp.endpoints,
			...backupCode.endpoints,
			enableTwoFactor: createAuthEndpoint("/two-factor/enable", {
				method: "POST",
				body: enableTwoFactorBodySchema,
				use: [sessionMiddleware],
				metadata: { openapi: {
					summary: "Enable two factor authentication",
					description: "Use this endpoint to enable two factor authentication. This will generate a TOTP URI and backup codes. Once the user verifies the TOTP URI, the two factor authentication will be enabled.",
					responses: { 200: {
						description: "Successful response",
						content: { "application/json": { schema: {
							type: "object",
							properties: {
								totpURI: {
									type: "string",
									description: "TOTP URI"
								},
								backupCodes: {
									type: "array",
									items: { type: "string" },
									description: "Backup codes"
								}
							}
						} } }
					} }
				} }
			}, async (ctx) => {
				const user$1 = ctx.context.session.user;
				const { password, issuer } = ctx.body;
				if (await shouldRequirePassword(ctx, user$1.id, allowPasswordless)) {
					if (!password) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
					if (!await validatePassword(ctx, {
						password,
						userId: user$1.id
					})) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
				}
				const secret = generateRandomString(32);
				const encryptedSecret = await symmetricEncrypt({
					key: ctx.context.secretConfig,
					data: secret
				});
				const backupCodes = await generateBackupCodes(ctx.context.secretConfig, backupCodeOptions);
				if (options?.skipVerificationOnEnable) {
					const updatedUser = await ctx.context.internalAdapter.updateUser(user$1.id, { twoFactorEnabled: true });
					await setSessionCookie(ctx, {
						session: await ctx.context.internalAdapter.createSession(updatedUser.id, false, ctx.context.session.session),
						user: updatedUser
					});
					await ctx.context.internalAdapter.deleteSession(ctx.context.session.session.token);
				}
				const existingTwoFactor = await ctx.context.adapter.findOne({
					model: opts.twoFactorTable,
					where: [{
						field: "userId",
						value: user$1.id
					}]
				});
				await ctx.context.adapter.deleteMany({
					model: opts.twoFactorTable,
					where: [{
						field: "userId",
						value: user$1.id
					}]
				});
				await ctx.context.adapter.create({
					model: opts.twoFactorTable,
					data: {
						secret: encryptedSecret,
						backupCodes: backupCodes.encryptedBackupCodes,
						userId: user$1.id,
						verified: existingTwoFactor != null && existingTwoFactor.verified !== false || !!options?.skipVerificationOnEnable
					}
				});
				const totpURI = createOTP(secret, {
					digits: options?.totpOptions?.digits || 6,
					period: options?.totpOptions?.period
				}).url(issuer || options?.issuer || ctx.context.appName, user$1.email);
				return ctx.json({
					totpURI,
					backupCodes: backupCodes.backupCodes
				});
			}),
			disableTwoFactor: createAuthEndpoint("/two-factor/disable", {
				method: "POST",
				body: disableTwoFactorBodySchema,
				use: [sessionMiddleware],
				metadata: { openapi: {
					summary: "Disable two factor authentication",
					description: "Use this endpoint to disable two factor authentication.",
					responses: { 200: {
						description: "Successful response",
						content: { "application/json": { schema: {
							type: "object",
							properties: { status: { type: "boolean" } }
						} } }
					} }
				} }
			}, async (ctx) => {
				const user$1 = ctx.context.session.user;
				const { password } = ctx.body;
				if (await shouldRequirePassword(ctx, user$1.id, allowPasswordless)) {
					if (!password) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
					if (!await validatePassword(ctx, {
						password,
						userId: user$1.id
					})) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
				}
				const updatedUser = await ctx.context.internalAdapter.updateUser(user$1.id, { twoFactorEnabled: false });
				await ctx.context.adapter.delete({
					model: opts.twoFactorTable,
					where: [{
						field: "userId",
						value: updatedUser.id
					}]
				});
				await setSessionCookie(ctx, {
					session: await ctx.context.internalAdapter.createSession(updatedUser.id, false, ctx.context.session.session),
					user: updatedUser
				});
				await ctx.context.internalAdapter.deleteSession(ctx.context.session.session.token);
				const disableTrustCookie = ctx.context.createAuthCookie(TRUST_DEVICE_COOKIE_NAME, { maxAge: trustDeviceMaxAge });
				const disableTrustValue = await ctx.getSignedCookie(disableTrustCookie.name, ctx.context.secret);
				if (disableTrustValue) {
					const [, trustId] = disableTrustValue.split("!");
					if (trustId) await ctx.context.internalAdapter.deleteVerificationByIdentifier(trustId);
					expireCookie(ctx, disableTrustCookie);
				}
				return ctx.json({ status: true });
			})
		},
		options,
		hooks: { after: [{
			matcher(context) {
				return context.path === "/sign-in/email" || context.path === "/sign-in/username" || context.path === "/sign-in/phone-number";
			},
			handler: createAuthMiddleware(async (ctx) => {
				const data = ctx.context.newSession;
				if (!data) return;
				if (!data?.user.twoFactorEnabled) return;
				const trustDeviceCookieAttrs = ctx.context.createAuthCookie(TRUST_DEVICE_COOKIE_NAME, { maxAge: trustDeviceMaxAge });
				const trustDeviceCookie = await ctx.getSignedCookie(trustDeviceCookieAttrs.name, ctx.context.secret);
				if (trustDeviceCookie) {
					const [token, trustIdentifier] = trustDeviceCookie.split("!");
					if (token && trustIdentifier) {
						if (token === await createHMAC("SHA-256", "base64urlnopad").sign(ctx.context.secret, `${data.user.id}!${trustIdentifier}`)) {
							const verificationRecord = await ctx.context.internalAdapter.findVerificationValue(trustIdentifier);
							if (verificationRecord && verificationRecord.value === data.user.id && verificationRecord.expiresAt > /* @__PURE__ */ new Date()) {
								await ctx.context.internalAdapter.deleteVerificationByIdentifier(trustIdentifier);
								const newTrustIdentifier = `trust-device-${generateRandomString(32)}`;
								const newToken = await createHMAC("SHA-256", "base64urlnopad").sign(ctx.context.secret, `${data.user.id}!${newTrustIdentifier}`);
								await ctx.context.internalAdapter.createVerificationValue({
									value: data.user.id,
									identifier: newTrustIdentifier,
									expiresAt: new Date(Date.now() + trustDeviceMaxAge * 1e3)
								});
								const newTrustDeviceCookie = ctx.context.createAuthCookie(TRUST_DEVICE_COOKIE_NAME, { maxAge: trustDeviceMaxAge });
								await ctx.setSignedCookie(newTrustDeviceCookie.name, `${newToken}!${newTrustIdentifier}`, ctx.context.secret, trustDeviceCookieAttrs.attributes);
								return;
							}
						}
					}
					expireCookie(ctx, trustDeviceCookieAttrs);
				}
				deleteSessionCookie(ctx, true);
				await ctx.context.internalAdapter.deleteSession(data.session.token);
				const maxAge = options?.twoFactorCookieMaxAge ?? 600;
				const twoFactorCookie = ctx.context.createAuthCookie(TWO_FACTOR_COOKIE_NAME, { maxAge });
				const identifier = `2fa-${generateRandomString(20)}`;
				await ctx.context.internalAdapter.createVerificationValue({
					value: data.user.id,
					identifier,
					expiresAt: new Date(Date.now() + maxAge * 1e3)
				});
				await ctx.setSignedCookie(twoFactorCookie.name, identifier, ctx.context.secret, twoFactorCookie.attributes);
				const twoFactorMethods = [];
				if (!options?.totpOptions?.disable) {
					const userTotpSecret = await ctx.context.adapter.findOne({
						model: opts.twoFactorTable,
						where: [{
							field: "userId",
							value: data.user.id
						}]
					});
					if (userTotpSecret && userTotpSecret.verified !== false) twoFactorMethods.push("totp");
				}
				if (options?.otpOptions?.sendOTP) twoFactorMethods.push("otp");
				return ctx.json({
					twoFactorRedirect: true,
					twoFactorMethods
				});
			})
		}] },
		schema: mergeSchema(schema, {
			...options?.schema,
			twoFactor: {
				...options?.schema?.twoFactor,
				...options?.twoFactorTable ? { modelName: options.twoFactorTable } : {}
			}
		}),
		rateLimit: [{
			pathMatcher(path$1) {
				return path$1.startsWith("/two-factor/");
			},
			window: 10,
			max: 3
		}],
		$ERROR_CODES: TWO_FACTOR_ERROR_CODES
	};
};
var getSchema = (normalizer) => {
	return { user: { fields: {
		username: {
			type: "string",
			required: false,
			sortable: true,
			unique: true,
			returned: true,
			transform: { input(value) {
				return typeof value !== "string" ? value : normalizer.username(value);
			} }
		},
		displayUsername: {
			type: "string",
			required: false,
			transform: { input(value) {
				return typeof value !== "string" ? value : normalizer.displayUsername(value);
			} }
		}
	} } };
};
function defaultUsernameValidator(username$1) {
	return /^[a-zA-Z0-9_.]+$/.test(username$1);
}
var signInUsernameBodySchema = z$2.object({
	username: z$2.string().meta({ description: "The username of the user" }),
	password: z$2.string().meta({ description: "The password of the user" }),
	rememberMe: z$2.boolean().meta({ description: "Remember the user session" }).optional(),
	callbackURL: z$2.string().meta({ description: "The URL to redirect to after email verification" }).optional()
});
var isUsernameAvailableBodySchema = z$2.object({ username: z$2.string().meta({ description: "The username to check" }) });
var username = (options) => {
	const normalizer = (username$1) => {
		if (options?.usernameNormalization === false) return username$1;
		if (options?.usernameNormalization) return options.usernameNormalization(username$1);
		return username$1.toLowerCase();
	};
	const displayUsernameNormalizer = (displayUsername) => {
		return options?.displayUsernameNormalization ? options.displayUsernameNormalization(displayUsername) : displayUsername;
	};
	return {
		id: "username",
		version: PACKAGE_VERSION,
		init(ctx) {
			return { options: { databaseHooks: { user: {
				create: { async before(user$1, context) {
					const username$1 = "username" in user$1 ? user$1.username : null;
					const displayUsername = "displayUsername" in user$1 ? user$1.displayUsername : null;
					return { data: {
						...user$1,
						...username$1 ? { username: normalizer(username$1) } : {},
						...displayUsername ? { displayUsername: displayUsernameNormalizer(displayUsername) } : {}
					} };
				} },
				update: { async before(user$1, context) {
					const username$1 = "username" in user$1 ? user$1.username : null;
					const displayUsername = "displayUsername" in user$1 ? user$1.displayUsername : null;
					return { data: {
						...user$1,
						...username$1 ? { username: normalizer(username$1) } : {},
						...displayUsername ? { displayUsername: displayUsernameNormalizer(displayUsername) } : {}
					} };
				} }
			} } } };
		},
		endpoints: {
			signInUsername: createAuthEndpoint("/sign-in/username", {
				method: "POST",
				body: signInUsernameBodySchema,
				metadata: { openapi: {
					summary: "Sign in with username",
					description: "Sign in with username",
					responses: {
						200: {
							description: "Success",
							content: { "application/json": { schema: {
								type: "object",
								properties: {
									token: {
										type: "string",
										description: "Session token for the authenticated session"
									},
									user: { $ref: "#/components/schemas/User" }
								},
								required: ["token", "user"]
							} } }
						},
						422: {
							description: "Unprocessable Entity. Validation error",
							content: { "application/json": { schema: {
								type: "object",
								properties: { message: { type: "string" } }
							} } }
						}
					}
				} }
			}, async (ctx) => {
				if (!ctx.body.username || !ctx.body.password) {
					ctx.context.logger.error("Username or password not found");
					throw APIError.from("UNAUTHORIZED", USERNAME_ERROR_CODES.INVALID_USERNAME_OR_PASSWORD);
				}
				const username$1 = options?.validationOrder?.username === "pre-normalization" ? normalizer(ctx.body.username) : ctx.body.username;
				const minUsernameLength = options?.minUsernameLength || 3;
				const maxUsernameLength = options?.maxUsernameLength || 30;
				if (username$1.length < minUsernameLength) {
					ctx.context.logger.error("Username too short", { username: username$1 });
					throw APIError.from("UNPROCESSABLE_ENTITY", USERNAME_ERROR_CODES.USERNAME_TOO_SHORT);
				}
				if (username$1.length > maxUsernameLength) {
					ctx.context.logger.error("Username too long", { username: username$1 });
					throw APIError.from("UNPROCESSABLE_ENTITY", USERNAME_ERROR_CODES.USERNAME_TOO_LONG);
				}
				if (!await (options?.usernameValidator || defaultUsernameValidator)(username$1)) throw APIError.from("UNPROCESSABLE_ENTITY", USERNAME_ERROR_CODES.INVALID_USERNAME);
				const user$1 = await ctx.context.adapter.findOne({
					model: "user",
					where: [{
						field: "username",
						value: normalizer(username$1)
					}]
				});
				if (!user$1) {
					await ctx.context.password.hash(ctx.body.password);
					ctx.context.logger.error("User not found", { username: username$1 });
					throw APIError.from("UNAUTHORIZED", USERNAME_ERROR_CODES.INVALID_USERNAME_OR_PASSWORD);
				}
				const account$1 = await ctx.context.adapter.findOne({
					model: "account",
					where: [{
						field: "userId",
						value: user$1.id
					}, {
						field: "providerId",
						value: "credential"
					}]
				});
				if (!account$1) throw APIError.from("UNAUTHORIZED", USERNAME_ERROR_CODES.INVALID_USERNAME_OR_PASSWORD);
				const currentPassword = account$1?.password;
				if (!currentPassword) {
					ctx.context.logger.error("Password not found", { username: username$1 });
					throw APIError.from("UNAUTHORIZED", USERNAME_ERROR_CODES.INVALID_USERNAME_OR_PASSWORD);
				}
				if (!await ctx.context.password.verify({
					hash: currentPassword,
					password: ctx.body.password
				})) {
					ctx.context.logger.error("Invalid password");
					throw APIError.from("UNAUTHORIZED", USERNAME_ERROR_CODES.INVALID_USERNAME_OR_PASSWORD);
				}
				if (ctx.context.options?.emailAndPassword?.requireEmailVerification && !user$1.emailVerified) {
					if (!ctx.context.options?.emailVerification?.sendVerificationEmail) throw APIError.from("FORBIDDEN", USERNAME_ERROR_CODES.EMAIL_NOT_VERIFIED);
					if (ctx.context.options?.emailVerification?.sendOnSignIn) {
						const token = await createEmailVerificationToken(ctx.context.secret, user$1.email, void 0, ctx.context.options.emailVerification?.expiresIn);
						const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${ctx.body.callbackURL || "/"}`;
						await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
							user: user$1,
							url,
							token
						}, ctx.request));
					}
					throw APIError.from("FORBIDDEN", USERNAME_ERROR_CODES.EMAIL_NOT_VERIFIED);
				}
				const session$1 = await ctx.context.internalAdapter.createSession(user$1.id, ctx.body.rememberMe === false);
				if (!session$1) throw APIError.from("INTERNAL_SERVER_ERROR", BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION);
				await setSessionCookie(ctx, {
					session: session$1,
					user: user$1
				}, ctx.body.rememberMe === false);
				return ctx.json({
					token: session$1.token,
					user: parseUserOutput(ctx.context.options, user$1)
				});
			}),
			isUsernameAvailable: createAuthEndpoint("/is-username-available", {
				method: "POST",
				body: isUsernameAvailableBodySchema
			}, async (ctx) => {
				const username$1 = ctx.body.username;
				if (!username$1) throw APIError.from("UNPROCESSABLE_ENTITY", USERNAME_ERROR_CODES.INVALID_USERNAME);
				const minUsernameLength = options?.minUsernameLength || 3;
				const maxUsernameLength = options?.maxUsernameLength || 30;
				if (username$1.length < minUsernameLength) throw APIError.from("UNPROCESSABLE_ENTITY", USERNAME_ERROR_CODES.USERNAME_TOO_SHORT);
				if (username$1.length > maxUsernameLength) throw APIError.from("UNPROCESSABLE_ENTITY", USERNAME_ERROR_CODES.USERNAME_TOO_LONG);
				if (!await (options?.usernameValidator || defaultUsernameValidator)(username$1)) throw APIError.from("UNPROCESSABLE_ENTITY", USERNAME_ERROR_CODES.INVALID_USERNAME);
				if (await ctx.context.adapter.findOne({
					model: "user",
					where: [{
						field: "username",
						value: normalizer(username$1)
					}]
				})) return ctx.json({ available: false });
				return ctx.json({ available: true });
			})
		},
		schema: mergeSchema(getSchema({
			username: normalizer,
			displayUsername: displayUsernameNormalizer
		}), options?.schema),
		hooks: { before: [{
			matcher(context) {
				return context.path === "/sign-up/email" || context.path === "/update-user";
			},
			handler: createAuthMiddleware(async (ctx) => {
				const username$1 = typeof ctx.body.username === "string" && options?.validationOrder?.username === "post-normalization" ? normalizer(ctx.body.username) : ctx.body.username;
				if (username$1 !== void 0 && typeof username$1 === "string") {
					const minUsernameLength = options?.minUsernameLength || 3;
					const maxUsernameLength = options?.maxUsernameLength || 30;
					if (username$1.length < minUsernameLength) throw APIError.from("BAD_REQUEST", USERNAME_ERROR_CODES.USERNAME_TOO_SHORT);
					if (username$1.length > maxUsernameLength) throw APIError.from("BAD_REQUEST", USERNAME_ERROR_CODES.USERNAME_TOO_LONG);
					if (!await (options?.usernameValidator || defaultUsernameValidator)(username$1)) throw APIError.from("BAD_REQUEST", USERNAME_ERROR_CODES.INVALID_USERNAME);
					const normalizedUsername = normalizer(ctx.body.username);
					const existingUser = await ctx.context.adapter.findOne({
						model: "user",
						where: [{
							field: "username",
							value: normalizedUsername
						}]
					});
					if (ctx.path === "/sign-up/email" && existingUser) throw APIError.from("BAD_REQUEST", USERNAME_ERROR_CODES.USERNAME_IS_ALREADY_TAKEN);
					if (ctx.path === "/update-user" && existingUser) {
						const session$1 = await getSessionFromCtx(ctx);
						if (!session$1 || existingUser.id !== session$1.user.id) throw APIError.from("BAD_REQUEST", USERNAME_ERROR_CODES.USERNAME_IS_ALREADY_TAKEN);
					}
				}
				const displayUsername = typeof ctx.body.displayUsername === "string" && options?.validationOrder?.displayUsername === "post-normalization" ? displayUsernameNormalizer(ctx.body.displayUsername) : ctx.body.displayUsername;
				if (displayUsername !== void 0 && typeof displayUsername === "string") {
					if (options?.displayUsernameValidator) {
						if (!await options.displayUsernameValidator(displayUsername)) throw APIError.from("BAD_REQUEST", USERNAME_ERROR_CODES.INVALID_DISPLAY_USERNAME);
					}
				}
			})
		}, {
			matcher(context) {
				return context.path === "/sign-up/email";
			},
			handler: createAuthMiddleware(async (ctx) => {
				if (ctx.body.username && !ctx.body.displayUsername) ctx.body.displayUsername = ctx.body.username;
				if (ctx.body.displayUsername && !ctx.body.username) ctx.body.username = ctx.body.displayUsername;
			})
		}] },
		options,
		$ERROR_CODES: USERNAME_ERROR_CODES
	};
};
var tanstackStartCookies = () => {
	return {
		id: "tanstack-start-cookies",
		version: PACKAGE_VERSION,
		hooks: { after: [{
			matcher(ctx) {
				return true;
			},
			handler: createAuthMiddleware(async (ctx) => {
				const returned = ctx.context.responseHeaders;
				if ("_flag" in ctx && ctx._flag === "router") return;
				if (returned instanceof Headers) {
					const setCookies = returned?.get("set-cookie");
					if (!setCookies) return;
					const parsed = parseSetCookieHeader(setCookies);
					const { setCookie } = await import("./server-jarOJZtb.js");
					parsed.forEach((value, key) => {
						if (!key) return;
						try {
							setCookie(key, value.value, toCookieOptions(value));
						} catch {}
					});
					return;
				}
			})
		}] }
	};
};
var stringbool, env$1;
var init_env = __esmMin((() => {
	stringbool = z$1.preprocess((val) => val === "true" || val === "1" || val === true, z$1.boolean());
	env$1 = createEnv({
		clientPrefix: "VITE_",
		runtimeEnv: {
			...process.env,
			VITE_FLAG_DEBUG_PRINTER: void 0
		},
		emptyStringAsUndefined: true,
		client: { VITE_FLAG_DEBUG_PRINTER: stringbool.default(false) },
		server: {
			TZ: z$1.string().default("Etc/UTC"),
			DATABASE_URL: z$1.url({ protocol: /postgres(ql)?/ }).optional(),
			AUTH_SECRET: z$1.string().min(1).optional(),
			GOOGLE_CLIENT_ID: z$1.string().min(1).optional(),
			GOOGLE_CLIENT_SECRET: z$1.string().min(1).optional(),
			GITHUB_CLIENT_ID: z$1.string().min(1).optional(),
			GITHUB_CLIENT_SECRET: z$1.string().min(1).optional(),
			OAUTH_PROVIDER_NAME: z$1.string().min(1).optional(),
			OAUTH_CLIENT_ID: z$1.string().min(1).optional(),
			OAUTH_CLIENT_SECRET: z$1.string().min(1).optional(),
			OAUTH_DISCOVERY_URL: z$1.url({ protocol: /https?/ }).optional(),
			OAUTH_AUTHORIZATION_URL: z$1.url({ protocol: /https?/ }).optional(),
			OAUTH_TOKEN_URL: z$1.url({ protocol: /https?/ }).optional(),
			OAUTH_USER_INFO_URL: z$1.url({ protocol: /https?/ }).optional(),
			OAUTH_SCOPES: z$1.string().min(1).transform((value) => value.split(" ")).default([
				"openid",
				"profile",
				"email"
			]),
			SMTP_HOST: z$1.string().min(1).optional(),
			SMTP_PORT: z$1.coerce.number().int().min(1).max(65535).default(587),
			SMTP_USER: z$1.string().min(1).optional(),
			SMTP_PASS: z$1.string().min(1).optional(),
			SMTP_FROM: z$1.string().min(1).optional(),
			SMTP_SECURE: stringbool.default(false),
			S3_ACCESS_KEY_ID: z$1.string().min(1).optional(),
			S3_SECRET_ACCESS_KEY: z$1.string().min(1).optional(),
			S3_REGION: z$1.string().default("us-east-1"),
			S3_ENDPOINT: z$1.url({ protocol: /https?/ }).optional(),
			S3_BUCKET: z$1.string().min(1).optional(),
			S3_FORCE_PATH_STYLE: stringbool.default(false),
			FLAG_DEBUG_PRINTER: stringbool.default(false),
			FLAG_DISABLE_SIGNUPS: stringbool.default(false),
			FLAG_DISABLE_EMAIL_AUTH: stringbool.default(false)
		}
	});
}));
init_env();
var SALT_ROUNDS = 10;
const hashPassword = (password) => hash(password, SALT_ROUNDS);
const verifyPassword = (password, passwordHash) => compare(password, passwordHash);
var schema_exports = /* @__PURE__ */ __export({
	account: () => account,
	apikey: () => apikey,
	passkey: () => passkey$1,
	resume: () => resume,
	resumeStatistics: () => resumeStatistics,
	session: () => session,
	twoFactor: () => twoFactor$1,
	user: () => user,
	verification: () => verification
}, 1);
var user, session, account, verification, twoFactor$1, passkey$1, resume, resumeStatistics, apikey;
var init_schema = __esmMin((() => {
	init_data();
	init_string();
	user = pg.pgTable("user", {
		id: pg.uuid("id").notNull().primaryKey().$defaultFn(() => generateId$1()),
		image: pg.text("image"),
		name: pg.text("name").notNull(),
		email: pg.text("email").notNull().unique(),
		emailVerified: pg.boolean("email_verified").notNull().default(false),
		username: pg.text("username").notNull().unique(),
		displayUsername: pg.text("display_username").notNull().unique(),
		twoFactorEnabled: pg.boolean("two_factor_enabled").notNull().default(false),
		createdAt: pg.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
		updatedAt: pg.timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => /* @__PURE__ */ new Date())
	}, (t) => [pg.index().on(t.email), pg.index().on(t.username)]);
	session = pg.pgTable("session", {
		id: pg.uuid("id").notNull().primaryKey().$defaultFn(() => generateId$1()),
		token: pg.text("token").notNull().unique(),
		ipAddress: pg.text("ip_address"),
		userAgent: pg.text("user_agent"),
		userId: pg.uuid("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
		expiresAt: pg.timestamp("expires_at", { withTimezone: true }).notNull(),
		createdAt: pg.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
		updatedAt: pg.timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => /* @__PURE__ */ new Date())
	}, (t) => [pg.index().on(t.token, t.userId), pg.index().on(t.expiresAt)]);
	account = pg.pgTable("account", {
		id: pg.uuid("id").notNull().primaryKey().$defaultFn(() => generateId$1()),
		accountId: pg.text("account_id").notNull(),
		providerId: pg.text("provider_id").notNull().default("credential"),
		userId: pg.uuid("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
		scope: pg.text("scope"),
		idToken: pg.text("id_token"),
		password: pg.text("password"),
		accessToken: pg.text("access_token"),
		refreshToken: pg.text("refresh_token"),
		accessTokenExpiresAt: pg.timestamp("access_token_expires_at", { withTimezone: true }),
		refreshTokenExpiresAt: pg.timestamp("refresh_token_expires_at", { withTimezone: true }),
		createdAt: pg.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
		updatedAt: pg.timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => /* @__PURE__ */ new Date())
	}, (t) => [pg.index().on(t.userId)]);
	verification = pg.pgTable("verification", {
		id: pg.uuid("id").notNull().primaryKey().$defaultFn(() => generateId$1()),
		identifier: pg.text("identifier").notNull().unique(),
		value: pg.text("value").notNull(),
		expiresAt: pg.timestamp("expires_at", { withTimezone: true }).notNull(),
		createdAt: pg.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
		updatedAt: pg.timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => /* @__PURE__ */ new Date())
	}, (t) => [pg.index().on(t.identifier)]);
	twoFactor$1 = pg.pgTable("two_factor", {
		id: pg.uuid("id").notNull().primaryKey().$defaultFn(() => generateId$1()),
		userId: pg.uuid("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
		secret: pg.text("secret"),
		backupCodes: pg.text("backup_codes"),
		createdAt: pg.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
		updatedAt: pg.timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => /* @__PURE__ */ new Date())
	}, (t) => [pg.index().on(t.userId), pg.index().on(t.secret)]);
	passkey$1 = pg.pgTable("passkey", {
		id: pg.uuid("id").notNull().primaryKey().$defaultFn(() => generateId$1()),
		name: pg.text("name"),
		aaguid: pg.text("aaguid"),
		publicKey: pg.text("public_key").notNull(),
		credentialID: pg.text("credential_id").notNull(),
		counter: pg.integer("counter").notNull(),
		deviceType: pg.text("device_type").notNull(),
		backedUp: pg.boolean("backed_up").notNull().default(false),
		transports: pg.text("transports").notNull(),
		userId: pg.uuid("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
		createdAt: pg.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
		updatedAt: pg.timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => /* @__PURE__ */ new Date())
	}, (t) => [pg.index().on(t.userId)]);
	resume = pg.pgTable("resume", {
		id: pg.uuid("id").notNull().primaryKey().$defaultFn(() => generateId$1()),
		name: pg.text("name").notNull(),
		slug: pg.text("slug").notNull(),
		tags: pg.text("tags").array().notNull().default([]),
		isPublic: pg.boolean("is_public").notNull().default(false),
		isLocked: pg.boolean("is_locked").notNull().default(false),
		password: pg.text("password"),
		data: pg.jsonb("data").notNull().$type().$defaultFn(() => defaultResumeData),
		userId: pg.uuid("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
		createdAt: pg.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
		updatedAt: pg.timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => /* @__PURE__ */ new Date())
	}, (t) => [
		pg.unique().on(t.slug, t.userId),
		pg.index().on(t.userId),
		pg.index().on(t.userId, t.updatedAt.desc()),
		pg.index().on(t.isPublic, t.slug, t.userId)
	]);
	resumeStatistics = pg.pgTable("resume_statistics", {
		id: pg.uuid("id").notNull().primaryKey().$defaultFn(() => generateId$1()),
		views: pg.integer("views").notNull().default(0),
		downloads: pg.integer("downloads").notNull().default(0),
		lastViewedAt: pg.timestamp("last_viewed_at", { withTimezone: true }),
		lastDownloadedAt: pg.timestamp("last_downloaded_at", { withTimezone: true }),
		resumeId: pg.uuid("resume_id").unique().notNull().references(() => resume.id, { onDelete: "cascade" }),
		createdAt: pg.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
		updatedAt: pg.timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => /* @__PURE__ */ new Date())
	}, (t) => [pg.index().on(t.resumeId)]);
	apikey = pg.pgTable("apikey", {
		id: pg.uuid("id").notNull().primaryKey().$defaultFn(() => generateId$1()),
		name: pg.text("name"),
		start: pg.text("start"),
		prefix: pg.text("prefix"),
		key: pg.text("key").notNull(),
		userId: pg.uuid("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
		refillInterval: pg.integer("refill_interval"),
		refillAmount: pg.integer("refill_amount"),
		lastRefillAt: pg.timestamp("last_refill_at", { withTimezone: true }),
		enabled: pg.boolean("enabled").notNull().default(true),
		rateLimitEnabled: pg.boolean("rate_limit_enabled").notNull().default(false),
		rateLimitTimeWindow: pg.integer("rate_limit_time_window"),
		rateLimitMax: pg.integer("rate_limit_max"),
		requestCount: pg.integer("request_count").notNull().default(0),
		remaining: pg.integer("remaining"),
		lastRequest: pg.timestamp("last_request", { withTimezone: true }),
		expiresAt: pg.timestamp("expires_at", { withTimezone: true }),
		createdAt: pg.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
		updatedAt: pg.timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()),
		permissions: pg.text("permissions"),
		metadata: pg.jsonb("metadata")
	}, (t) => [
		pg.index().on(t.userId),
		pg.index().on(t.key),
		pg.index().on(t.enabled, t.userId)
	]);
}));
var init_drizzle = __esmMin((() => {
	init_schema();
}));
init_drizzle();
init_templates();
var isSmtpEnabled = () => {
	return !!env$1.SMTP_HOST && !!env$1.SMTP_USER && !!env$1.SMTP_PASS && !!env$1.SMTP_FROM;
};
var cachedTransport;
var getTransport = () => {
	if (!isSmtpEnabled()) return;
	if (cachedTransport) return cachedTransport;
	cachedTransport = nodemailer.createTransport({
		host: env$1.SMTP_HOST,
		port: env$1.SMTP_PORT,
		secure: env$1.SMTP_SECURE,
		auth: {
			user: env$1.SMTP_USER,
			pass: env$1.SMTP_PASS
		}
	});
	return cachedTransport;
};
const sendEmail = async (options) => {
	const transport = getTransport();
	const from = options.from ?? env$1.SMTP_FROM ?? "Reactive Resume <noreply@localhost>";
	const payload = {
		to: options.to,
		from,
		subject: options.subject,
		text: options.text
	};
	if (!transport) return console.log("[EMAIL] SMTP not configured; logging email:", payload);
	try {
		await transport.sendMail({
			...options,
			from
		});
	} catch (error$1) {
		console.error("[EMAIL] Failed to send via SMTP; logging email payload instead:", {
			smtp: {
				host: env$1.SMTP_HOST,
				port: env$1.SMTP_PORT,
				secure: env$1.SMTP_SECURE
			},
			email: payload
		}, error$1);
	}
};
var client_exports = /* @__PURE__ */ __export({ db: () => db }, 1);
function getPool() {
	if (!env$1.DATABASE_URL) return;
	if (!globalThis.__pool) globalThis.__pool = new Pool({ connectionString: env$1.DATABASE_URL });
	return globalThis.__pool;
}
function makeDrizzleClient() {
	const pool = getPool();
	if (!pool) {
		console.warn("DATABASE_URL is not set. Database functionality is not available.");
		return;
	}
	return drizzle({
		client: pool,
		schema: schema_exports
	});
}
var getDatabaseServerFn, db;
var init_client = __esmMin((() => {
	init_env();
	getDatabaseServerFn = () => {
		if (!globalThis.__drizzle) globalThis.__drizzle = makeDrizzleClient();
		return globalThis.__drizzle;
	};
	db = getDatabaseServerFn();
}));
init_env();
init_string();
init_drizzle();
function getDatabase() {
	if (!env$1.DATABASE_URL) return null;
	try {
		const { db: db$1 } = (init_client(), __toCommonJS(client_exports));
		return db$1;
	} catch (error$1) {
		console.warn("⚠️  Failed to initialize database:", error$1);
		return null;
	}
}
function isCustomOAuthProviderEnabled() {
	const hasDiscovery = Boolean(env$1.OAUTH_DISCOVERY_URL);
	const hasManual = Boolean(env$1.OAUTH_AUTHORIZATION_URL) && Boolean(env$1.OAUTH_TOKEN_URL) && Boolean(env$1.OAUTH_USER_INFO_URL);
	return Boolean(env$1.OAUTH_CLIENT_ID) && Boolean(env$1.OAUTH_CLIENT_SECRET) && (hasDiscovery || hasManual);
}
var getAuthConfig = () => {
	const authConfigs = [];
	if (isCustomOAuthProviderEnabled()) authConfigs.push({
		providerId: "custom",
		disableSignUp: env$1.FLAG_DISABLE_SIGNUPS,
		clientId: env$1.OAUTH_CLIENT_ID,
		clientSecret: env$1.OAUTH_CLIENT_SECRET,
		discoveryUrl: env$1.OAUTH_DISCOVERY_URL,
		authorizationUrl: env$1.OAUTH_AUTHORIZATION_URL,
		tokenUrl: env$1.OAUTH_TOKEN_URL,
		userInfoUrl: env$1.OAUTH_USER_INFO_URL,
		scopes: env$1.OAUTH_SCOPES,
		redirectURI: `${env$1.APP_URL}/api/auth/oauth2/callback/custom`,
		mapProfileToUser: async (profile) => {
			if (!profile.email) throw new BetterAuthError("OAuth Provider did not return an email address. This is required for user creation.", { cause: "EMAIL_REQUIRED" });
			const email = profile.email;
			const name = profile.name ?? profile.preferred_username ?? email.split("@")[0];
			const username$1 = profile.preferred_username ?? email.split("@")[0];
			return {
				name,
				email,
				image: profile.image ?? profile.picture ?? profile.avatar_url,
				username: username$1,
				displayUsername: username$1,
				emailVerified: true
			};
		}
	});
	const db$1 = getDatabase();
	if (!db$1) {
		console.warn("⚠️  Database not configured. Authentication will not work properly.");
		return betterAuth({
			appName: "Reactive Resume",
			baseURL: env$1.APP_URL,
			secret: env$1.AUTH_SECRET || "fallback-secret-for-no-backend",
			telemetry: { enabled: false }
		});
	}
	return betterAuth({
		appName: "Reactive Resume",
		baseURL: env$1.APP_URL,
		secret: env$1.AUTH_SECRET || "fallback-secret-for-no-backend",
		database: drizzleAdapter(db$1, {
			schema: schema_exports,
			provider: "pg"
		}),
		telemetry: { enabled: false },
		trustedOrigins: [env$1.APP_URL],
		advanced: {
			database: { generateId: generateId$1 },
			useSecureCookies: env$1.APP_URL.startsWith("https://")
		},
		emailAndPassword: {
			enabled: !env$1.FLAG_DISABLE_EMAIL_AUTH,
			autoSignIn: true,
			minPasswordLength: 6,
			maxPasswordLength: 64,
			requireEmailVerification: false,
			disableSignUp: env$1.FLAG_DISABLE_SIGNUPS || env$1.FLAG_DISABLE_EMAIL_AUTH,
			sendResetPassword: async ({ user: user$1, url }) => {
				await sendEmail({
					to: user$1.email,
					subject: "Reset your password",
					text: `You requested a password reset for your Reactive Resume account.\n\nTo reset your password, please visit the following URL:\n${url}.\n\nIf you did not request a password reset, please ignore this email.`
				});
			},
			password: {
				hash: (password) => hashPassword(password),
				verify: ({ password, hash: hash$1 }) => verifyPassword(password, hash$1)
			}
		},
		emailVerification: {
			sendOnSignUp: true,
			autoSignInAfterVerification: true,
			sendVerificationEmail: async ({ user: user$1, url }) => {
				await sendEmail({
					to: user$1.email,
					subject: "Verify your email",
					text: `You recently signed up for an account on Reactive Resume.\n\nTo verify your email, please visit the following URL:\n${url}`
				});
			}
		},
		user: {
			changeEmail: {
				enabled: true,
				sendChangeEmailConfirmation: async ({ user: user$1, newEmail, url }) => {
					await sendEmail({
						to: newEmail,
						subject: "Verify your new email",
						text: `You recently requested to change your email on Reactive Resume from ${user$1.email} to ${newEmail}.\n\nTo verify this change, please visit the following URL:\n${url}\n\nIf you did not request this change, please ignore this email.`
					});
				}
			},
			additionalFields: { username: {
				type: "string",
				required: true
			} }
		},
		account: { accountLinking: {
			enabled: true,
			trustedProviders: ["google", "github"]
		} },
		socialProviders: {
			google: {
				enabled: !!env$1.GOOGLE_CLIENT_ID && !!env$1.GOOGLE_CLIENT_SECRET,
				disableSignUp: env$1.FLAG_DISABLE_SIGNUPS,
				clientId: env$1.GOOGLE_CLIENT_ID,
				clientSecret: env$1.GOOGLE_CLIENT_SECRET,
				mapProfileToUser: async (profile) => {
					return {
						name: profile.name ?? profile.email.split("@")[0],
						email: profile.email,
						image: profile.picture,
						username: profile.email.split("@")[0],
						displayUsername: profile.email.split("@")[0],
						emailVerified: true
					};
				}
			},
			github: {
				enabled: !!env$1.GITHUB_CLIENT_ID && !!env$1.GITHUB_CLIENT_SECRET,
				disableSignUp: env$1.FLAG_DISABLE_SIGNUPS,
				clientId: env$1.GITHUB_CLIENT_ID,
				clientSecret: env$1.GITHUB_CLIENT_SECRET,
				mapProfileToUser: async (profile) => {
					const name = profile.name ?? profile.login ?? String(profile.id);
					const login = profile.login ?? String(profile.id);
					const normalizedLogin = toUsername(login);
					const [legacyAccount] = await db$1.select({
						accountId: account.accountId,
						email: user.email,
						emailVerified: user.emailVerified,
						username: user.username,
						displayUsername: user.displayUsername
					}).from(account).innerJoin(user, eq(account.userId, user.id)).where(and(eq(account.providerId, "github"), or(eq(user.username, normalizedLogin), eq(user.displayUsername, login)))).limit(1);
					if (legacyAccount) return {
						id: legacyAccount.accountId,
						name,
						email: legacyAccount.email,
						image: profile.avatar_url,
						username: legacyAccount.username,
						displayUsername: legacyAccount.displayUsername,
						emailVerified: legacyAccount.emailVerified
					};
					return {
						name,
						email: profile.email,
						image: profile.avatar_url,
						username: normalizedLogin,
						displayUsername: login,
						emailVerified: true
					};
				}
			}
		},
		plugins: [
			username({
				minUsernameLength: 3,
				maxUsernameLength: 64,
				usernameNormalization: (value) => toUsername(value),
				displayUsernameNormalization: (value) => toUsername(value),
				usernameValidator: (username$1) => /^[a-z0-9._-]+$/.test(username$1),
				validationOrder: {
					username: "post-normalization",
					displayUsername: "post-normalization"
				}
			}),
			twoFactor({ issuer: "Reactive Resume" }),
			passkey({
				origin: env$1.APP_URL,
				rpName: "Reactive Resume",
				rpID: new URL(env$1.APP_URL).hostname
			}),
			genericOAuth({ config: authConfigs }),
			tanstackStartCookies()
		]
	});
};
const auth = getAuthConfig();
const getSession = async () => {
	try {
		return await auth.api.getSession({ headers: getRequestHeaders() });
	} catch {
		return null;
	}
};
init_env();
init_schema();
function getDb$2() {
	if (!env$1.DATABASE_URL) return null;
	try {
		const { db: db$1 } = (init_client(), __toCommonJS(client_exports));
		return db$1;
	} catch {
		return null;
	}
}
async function getUserFromHeaders(headers) {
	try {
		const result = await auth.api.getSession({ headers });
		if (!result || !result.user) return null;
		return result.user;
	} catch {
		return null;
	}
}
async function getUserFromApiKey(apiKey) {
	try {
		const db$1 = getDb$2();
		if (!db$1) {
			console.warn("Database not available for API key verification");
			return null;
		}
		const result = await auth.api?.verifyApiKey?.({ body: { key: apiKey } });
		if (!result || !result.key || !result.valid) return null;
		const [userResult] = await db$1.select().from(user).where(eq(user.id, result.key.userId)).limit(1);
		if (!userResult) return null;
		return userResult;
	} catch {
		return null;
	}
}
const publicProcedure = os$1.$context().use(async ({ context, next }) => {
	const headers = context.reqHeaders ?? new Headers();
	const apiKey = headers.get("x-api-key");
	const user$1 = apiKey ? await getUserFromApiKey(apiKey) : await getUserFromHeaders(headers);
	return next({ context: {
		...context,
		user: user$1 ?? null
	} });
});
const protectedProcedure = publicProcedure.use(async ({ context, next }) => {
	if (!context.user) throw new ORPCError("UNAUTHORIZED");
	return next({ context: {
		...context,
		user: context.user
	} });
});
publicProcedure.use(async ({ context, next }) => {
	const headers = context.reqHeaders ?? new Headers();
	if (!(env$1.FLAG_DEBUG_PRINTER || headers.get("x-server-side-call") === "true")) throw new ORPCError("UNAUTHORIZED", { message: "This endpoint can only be called from server-side code" });
	return next({ context });
});
init_env();
var RESUME_ACCESS_COOKIE_PREFIX = "resume_access";
var RESUME_ACCESS_TTL_SECONDS = 600;
var getResumeAccessCookieName = (resumeId) => `${RESUME_ACCESS_COOKIE_PREFIX}_${resumeId}`;
var signResumeAccessToken = (resumeId, passwordHash) => createHash("sha256").update(`${resumeId}:${passwordHash}`).digest("hex");
const grantResumeAccess = (resumeId, passwordHash) => setCookie$1(getResumeAccessCookieName(resumeId), signResumeAccessToken(resumeId, passwordHash), {
	path: "/",
	httpOnly: true,
	sameSite: "lax",
	maxAge: RESUME_ACCESS_TTL_SECONDS,
	secure: env$1.APP_URL.startsWith("https")
});
init_drizzle();
init_env();
function getDb$1() {
	if (!env$1.DATABASE_URL) return null;
	try {
		const { db: db$1 } = (init_client(), __toCommonJS(client_exports));
		return db$1;
	} catch {
		return null;
	}
}
const authService = {
	providers: { list: () => {
		const providers$1 = { credential: "Password" };
		if (env$1.GOOGLE_CLIENT_ID && env$1.GOOGLE_CLIENT_SECRET) providers$1.google = "Google";
		if (env$1.GITHUB_CLIENT_ID && env$1.GITHUB_CLIENT_SECRET) providers$1.github = "GitHub";
		if (env$1.OAUTH_CLIENT_ID && env$1.OAUTH_CLIENT_SECRET) providers$1.custom = env$1.OAUTH_PROVIDER_NAME ?? "Custom OAuth";
		return providers$1;
	} },
	verifyResumePassword: async (input) => {
		const db$1 = getDb$1();
		if (!db$1) throw new ORPCError$1("SERVICE_UNAVAILABLE", { message: "Database not available" });
		const [resume$1] = await db$1.select({
			id: resume.id,
			password: resume.password
		}).from(resume).innerJoin(user, eq(resume.userId, user.id)).where(and(isNotNull(resume.password), eq(resume.slug, input.slug), eq(user.username, input.username)));
		if (!resume$1) throw new ORPCError$1("NOT_FOUND");
		const passwordHash = resume$1.password;
		if (!await verifyPassword(input.password, passwordHash)) throw new ORPCError$1("INVALID_PASSWORD");
		grantResumeAccess(resume$1.id, passwordHash);
		return true;
	}
};
const authRouter = {
	providers: { list: publicProcedure.route({
		method: "GET",
		path: "/auth/providers/list",
		tags: ["Authentication"],
		summary: "List all auth providers",
		description: "A list of all authentication providers, and their display names, supported by the instance of Reactive Resume."
	}).handler(() => {
		return authService.providers.list();
	}) },
	verifyResumePassword: publicProcedure.route({
		method: "POST",
		path: "/auth/verify-resume-password",
		tags: ["Authentication", "Resume"],
		summary: "Verify resume password",
		description: "Verify a resume password, to grant access to the locked resume."
	}).input(z.object({
		slug: z.string().min(1),
		username: z.string().min(1),
		password: z.string().min(1)
	})).output(z.boolean()).handler(async ({ input }) => {
		return await authService.verifyResumePassword({
			slug: input.slug,
			username: input.username,
			password: input.password
		});
	})
};
init_env();
const flagsService = { getFlags: () => ({
	disableSignups: env$1.FLAG_DISABLE_SIGNUPS,
	disableEmailAuth: env$1.FLAG_DISABLE_EMAIL_AUTH
}) };
const flagsRouter = { get: publicProcedure.route({
	method: "GET",
	path: "/flags",
	tags: ["Feature Flags"],
	summary: "Get feature flags",
	description: "Returns the current feature flags for this instance."
}).handler(() => flagsService.getFlags()) };
init_env();
var CONTENT_TYPE_MAP = {
	".webp": "image/webp",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".png": "image/png",
	".gif": "image/gif",
	".svg": "image/svg+xml",
	".pdf": "application/pdf"
};
var DEFAULT_CONTENT_TYPE = "application/octet-stream";
var IMAGE_MIME_TYPES = [
	"image/gif",
	"image/png",
	"image/jpeg",
	"image/webp"
];
function buildPictureKey(userId) {
	return `uploads/${userId}/pictures/${Date.now()}.webp`;
}
function buildScreenshotKey(userId, resumeId) {
	return `uploads/${userId}/screenshots/${resumeId}/${Date.now()}.webp`;
}
function buildPdfKey(userId, resumeId) {
	return `uploads/${userId}/pdfs/${resumeId}/${Date.now()}.pdf`;
}
function buildPublicUrl(path$1) {
	return new URL(path$1, env$1.APP_URL).toString();
}
function inferContentType(filename) {
	return CONTENT_TYPE_MAP[extname(filename).toLowerCase()] ?? DEFAULT_CONTENT_TYPE;
}
function isImageFile(mimeType) {
	return IMAGE_MIME_TYPES.includes(mimeType);
}
async function processImageForUpload(file) {
	const processedBuffer = await sharp(await file.arrayBuffer()).resize(800, 800, {
		fit: "inside",
		withoutEnlargement: true
	}).webp({ preset: "picture" }).toBuffer();
	return {
		data: new Uint8Array(processedBuffer),
		contentType: "image/webp"
	};
}
var LocalStorageService = class {
	rootDirectory;
	constructor() {
		this.rootDirectory = join(process.cwd(), "data");
	}
	async list(prefix) {
		const fullPath = this.resolvePath(prefix);
		try {
			return (await fs$1.readdir(fullPath, { recursive: true })).map((file) => join(prefix, file));
		} catch (error$1) {
			if (error$1 && typeof error$1 === "object" && "code" in error$1 && error$1.code === "ENOENT") return [];
			throw error$1;
		}
	}
	async write({ key, data }) {
		const fullPath = this.resolvePath(key);
		await fs$1.mkdir(dirname(fullPath), { recursive: true });
		await fs$1.writeFile(fullPath, data);
	}
	async read(key) {
		const fullPath = this.resolvePath(key);
		const [arrayBuffer, stats] = await Promise.all([fs$1.readFile(fullPath), fs$1.stat(fullPath)]);
		return {
			data: arrayBuffer,
			size: stats.size,
			etag: `"${stats.size}-${stats.mtime.getTime()}"`,
			lastModified: stats.mtime,
			contentType: inferContentType(key)
		};
	}
	async delete(key) {
		const fullPath = this.resolvePath(key);
		try {
			if ((await fs$1.stat(fullPath)).isDirectory()) {
				await fs$1.rm(fullPath, { recursive: true });
				return true;
			} else {
				await fs$1.unlink(fullPath);
				return true;
			}
		} catch {
			return false;
		}
	}
	async healthcheck() {
		try {
			await fs$1.mkdir(this.rootDirectory, { recursive: true });
			await fs$1.access(this.rootDirectory, fs$1.constants.R_OK | fs$1.constants.W_OK);
			return {
				type: "local",
				status: "healthy",
				message: "Local filesystem storage is accessible and has read/write permission."
			};
		} catch (error$1) {
			return {
				type: "local",
				status: "unhealthy",
				message: "Local filesystem storage is not accessible or lacks sufficient permissions.",
				error: error$1 instanceof Error ? error$1.message : "Unknown error"
			};
		}
	}
	resolvePath(key) {
		const segments = key.replace(/^\/*/, "").split(/[/\\]+/).filter((segment) => segment.length > 0 && segment !== "." && segment !== "..");
		if (segments.length === 0) throw new Error("Invalid storage key");
		return join(this.rootDirectory, ...segments);
	}
};
var S3StorageService = class {
	bucket;
	client;
	constructor() {
		if (!env$1.S3_ACCESS_KEY_ID || !env$1.S3_SECRET_ACCESS_KEY || !env$1.S3_BUCKET) throw new Error("S3 credentials are not set");
		this.bucket = env$1.S3_BUCKET;
		this.client = new S3Client({
			region: env$1.S3_REGION,
			endpoint: env$1.S3_ENDPOINT,
			forcePathStyle: env$1.S3_FORCE_PATH_STYLE,
			credentials: {
				accessKeyId: env$1.S3_ACCESS_KEY_ID,
				secretAccessKey: env$1.S3_SECRET_ACCESS_KEY
			}
		});
	}
	async list(prefix) {
		const command = new ListObjectsV2Command({
			Bucket: this.bucket,
			Prefix: prefix
		});
		const response = await this.client.send(command);
		if (!response.Contents) return [];
		return response.Contents.map((object) => object.Key ?? "");
	}
	async write({ key, data, contentType }) {
		const command = new PutObjectCommand({
			Bucket: this.bucket,
			Key: key,
			Body: data,
			ACL: "public-read",
			ContentType: contentType
		});
		await this.client.send(command);
	}
	async read(key) {
		try {
			const command = new GetObjectCommand({
				Bucket: this.bucket,
				Key: key
			});
			const response = await this.client.send(command);
			if (!response.Body) return null;
			return {
				data: await response.Body.transformToByteArray(),
				size: response.ContentLength ?? 0,
				etag: response.ETag,
				lastModified: response.LastModified,
				contentType: response.ContentType ?? inferContentType(key)
			};
		} catch {
			return null;
		}
	}
	async delete(keyOrPrefix) {
		const keys = await this.list(keyOrPrefix);
		if (keys.length === 0) return false;
		const deleteCommands = keys.map((k) => new DeleteObjectCommand({
			Bucket: this.bucket,
			Key: k
		}));
		return (await Promise.allSettled(deleteCommands.map((c) => this.client.send(c)))).some((r) => r.status === "fulfilled");
	}
	async healthcheck() {
		try {
			const putCommand = new PutObjectCommand({
				Bucket: this.bucket,
				Key: "healthcheck",
				Body: "OK"
			});
			await this.client.send(putCommand);
			const deleteCommand = new DeleteObjectCommand({
				Bucket: this.bucket,
				Key: "healthcheck"
			});
			await this.client.send(deleteCommand);
			return {
				type: "s3",
				status: "healthy",
				message: "S3 storage is accessible and credentials are valid."
			};
		} catch (error$1) {
			return {
				type: "s3",
				status: "unhealthy",
				message: "Failed to connect to S3 storage or invalid credentials.",
				error: error$1 instanceof Error ? error$1.message : "Unknown error"
			};
		}
	}
};
function createStorageService() {
	if (env$1.S3_ACCESS_KEY_ID && env$1.S3_SECRET_ACCESS_KEY && env$1.S3_BUCKET && env$1.S3_ACCESS_KEY_ID !== "seaweedfs") return new S3StorageService();
	return new LocalStorageService();
}
var cachedService = null;
function getStorageService() {
	if (cachedService) return cachedService;
	cachedService = createStorageService();
	return cachedService;
}
async function uploadFile(input) {
	const storageService$2 = getStorageService();
	let key;
	switch (input.type) {
		case "picture":
			key = buildPictureKey(input.userId);
			break;
		case "screenshot":
			if (!input.resumeId) throw new Error("resumeId is required for screenshot uploads");
			key = buildScreenshotKey(input.userId, input.resumeId);
			break;
		case "pdf":
			if (!input.resumeId) throw new Error("resumeId is required for pdf uploads");
			key = buildPdfKey(input.userId, input.resumeId);
			break;
	}
	await storageService$2.write({
		key,
		data: input.data,
		contentType: input.contentType
	});
	return {
		key,
		url: buildPublicUrl(key)
	};
}
var storageService$1 = getStorageService();
var fileSchema = z.file().max(10 * 1024 * 1024, "File size must be less than 10MB");
var filenameSchema = z.object({ filename: z.string().min(1) });
var router_default = {
	auth: authRouter,
	flags: flagsRouter,
	storage: {
		uploadFile: protectedProcedure.route({
			tags: ["Internal"],
			summary: "Upload a file"
		}).input(fileSchema).output(z.object({
			url: z.string(),
			path: z.string(),
			contentType: z.string()
		})).handler(async ({ context, input: file }) => {
			const originalMimeType = file.type;
			const isImage = isImageFile(originalMimeType);
			let data;
			let contentType;
			if (isImage) {
				const processed = await processImageForUpload(file);
				data = processed.data;
				contentType = processed.contentType;
			} else {
				const fileBuffer = await file.arrayBuffer();
				data = new Uint8Array(fileBuffer);
				contentType = originalMimeType;
			}
			const result = await uploadFile({
				userId: context.user.id,
				data,
				contentType,
				type: "picture"
			});
			return {
				url: result.url,
				path: result.key,
				contentType
			};
		}),
		deleteFile: protectedProcedure.route({
			tags: ["Internal"],
			summary: "Delete a file"
		}).input(filenameSchema).output(z.void()).handler(async ({ context, input }) => {
			const key = input.filename.startsWith("uploads/") ? input.filename : `uploads/${context.user.id}/pictures/${input.filename}`;
			if (!await storageService$1.delete(key)) throw new ORPCError("NOT_FOUND");
		})
	}
};
const getORPCClient = () => {
	return createRouterClient(router_default, { context: async () => {
		const locale = await getLocale();
		const reqHeaders = getRequestHeaders();
		reqHeaders.set("x-server-side-call", "true");
		return {
			locale,
			reqHeaders
		};
	} });
};
const client = getORPCClient();
const orpc = createTanstackQueryUtils(client);
var serializer = new StandardRPCJsonSerializer();
const getQueryClient = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				gcTime: 300 * 1e3,
				staleTime: 60 * 1e3,
				queryKeyHashFn(queryKey) {
					const [json, meta] = serializer.serialize(queryKey);
					return JSON.stringify({
						json,
						meta
					});
				}
			},
			dehydrate: { serializeData(data) {
				const [json, meta] = serializer.serialize(data);
				return {
					json,
					meta
				};
			} },
			hydrate: { deserializeData(data) {
				return serializer.deserialize(data.json, data.meta);
			} }
		},
		mutationCache: new MutationCache({ onSettled: (_1, _2, _3, _4, _5, context) => {
			if (context?.meta?.noInvalidate) return;
			queryClient.invalidateQueries();
		} })
	});
	return queryClient;
};
var initialState = {
	open: false,
	search: "",
	pages: []
};
const useCommandPaletteStore = create((set, get) => ({
	...initialState,
	setOpen: (open) => {
		set({ open });
		if (!open) set(initialState);
	},
	setSearch: (search) => set({ search }),
	peekPage: () => get().pages[get().pages.length - 1],
	pushPage: (page) => set((state) => ({
		pages: [...state.pages, page],
		search: ""
	})),
	popPage: () => set((state) => ({
		pages: state.pages.slice(0, -1),
		search: ""
	})),
	reset: () => set(initialState),
	goBack: () => {
		set((state) => {
			if (state.search.length > 0) return { search: "" };
			if (state.pages.length > 0) return {
				pages: state.pages.slice(0, -1),
				search: ""
			};
			return {
				open: false,
				search: "",
				pages: []
			};
		});
	}
}));
const BaseCommandGroup = ({ page, heading, children }) => {
	const pages = useCommandPaletteStore((state) => state.pages);
	const currentPage = pages[pages.length - 1];
	if (!useMemo(() => {
		return currentPage === page;
	}, [currentPage, page])) return null;
	return /* @__PURE__ */ jsx(CommandGroup, {
		heading,
		children
	});
};
var HouseSimpleIcon = HouseSimple;
var ReadCvLogoIcon$1 = ReadCvLogo;
var WrenchIcon = Wrench;
var UserCircleIcon$1 = UserCircle;
function NavigationCommandGroup() {
	const navigate = useNavigate();
	const { session: session$1 } = useRouteContext({ strict: false });
	const reset = useCommandPaletteStore((state) => state.reset);
	const pushPage = useCommandPaletteStore((state) => state.pushPage);
	function onNavigate(path$1) {
		navigate({ to: path$1 });
		reset();
	}
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs(BaseCommandGroup, {
		heading: /* @__PURE__ */ jsx(Trans, { id: "go-to" }),
		children: [
			/* @__PURE__ */ jsxs(CommandItem, {
				keywords: [i18n._({ id: "i0qMbr" })],
				value: "navigation.home",
				onSelect: () => onNavigate("/"),
				children: [/* @__PURE__ */ jsx(HouseSimpleIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "home" })]
			}),
			/* @__PURE__ */ jsxs(CommandItem, {
				disabled: !session$1,
				keywords: [i18n._({ id: "oTBjeH" })],
				value: "navigation.resumes",
				onSelect: () => onNavigate("/dashboard/resumes"),
				children: [/* @__PURE__ */ jsx(ReadCvLogoIcon$1, {}), /* @__PURE__ */ jsx(Trans, { id: "resumes" })]
			}),
			/* @__PURE__ */ jsxs(CommandItem, {
				disabled: !session$1,
				keywords: [i18n._({ id: "Tz0i8g" })],
				value: "navigation.settings",
				onSelect: () => pushPage("settings"),
				children: [/* @__PURE__ */ jsx(WrenchIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "settings" })]
			})
		]
	}), /* @__PURE__ */ jsx(BaseCommandGroup, {
		page: "settings",
		heading: /* @__PURE__ */ jsx(Trans, { id: "settings" }),
		children: /* @__PURE__ */ jsxs(CommandItem, {
			keywords: [i18n._({ id: "vERlcd" })],
			value: "navigation.settings.profile",
			onSelect: () => onNavigate("/dashboard/settings/profile"),
			children: [/* @__PURE__ */ jsx(UserCircleIcon$1, {}), /* @__PURE__ */ jsx(Trans, { id: "profile" })]
		})
	})] });
}
function Kbd({ className, ...props }) {
	return /* @__PURE__ */ jsx("kbd", {
		"data-slot": "kbd",
		className: cn("pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded-sm bg-muted in-data-[slot=tooltip-content]:bg-background/20 px-1 font-medium font-sans in-data-[slot=tooltip-content]:text-background text-muted-foreground text-xs dark:in-data-[slot=tooltip-content]:bg-background/10 [&_svg:not([class*='size-'])]:size-3", className),
		...props
	});
}
function ResumesCommandGroup() {
	const navigate = useNavigate();
	const { openDialog } = useDialogStore();
	const { session: session$1 } = useRouteContext({ strict: false });
	const reset = useCommandPaletteStore((state) => state.reset);
	const peekPage = useCommandPaletteStore((state) => state.peekPage);
	const pushPage = useCommandPaletteStore((state) => state.pushPage);
	const isResumesPage = peekPage() === "resumes";
	const { data: resumes, isLoading } = useQuery({
		queryKey: ["resumes"],
		queryFn: () => api.fetchResumes(),
		enabled: !!session$1 && isResumesPage
	});
	const onCreate = () => {
		navigate({ to: "/dashboard/resumes" });
		openDialog("resume.create", void 0);
		reset();
	};
	const onNavigate = (path$1) => {
		navigate({ to: path$1 });
		reset();
	};
	if (!session$1) return null;
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(BaseCommandGroup, {
		heading: /* @__PURE__ */ jsx(Trans, { id: "Q2wk34" }),
		children: /* @__PURE__ */ jsxs(CommandItem, {
			keywords: [i18n._({ id: "oTBjeH" })],
			value: "search.resumes",
			onSelect: () => pushPage("resumes"),
			children: [/* @__PURE__ */ jsx(ReadCvLogoIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "oTBjeH" })]
		})
	}), /* @__PURE__ */ jsxs(BaseCommandGroup, {
		page: "resumes",
		heading: /* @__PURE__ */ jsx(Trans, { id: "oTBjeH" }),
		children: [/* @__PURE__ */ jsxs(CommandItem, {
			onSelect: onCreate,
			children: [/* @__PURE__ */ jsx(PlusIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "VrBnBN" })]
		}), isLoading ? /* @__PURE__ */ jsx(CommandLoading, { children: /* @__PURE__ */ jsx(Trans, { id: "ABeC9P" }) }) : resumes?.map((resume$1) => /* @__PURE__ */ jsxs(CommandItem, {
			value: resume$1.id,
			keywords: [resume$1.name],
			onSelect: () => onNavigate(`/builder/${resume$1.id}`),
			children: [
				/* @__PURE__ */ jsx(ReadCvLogoIcon, {}),
				resume$1.name,
				/* @__PURE__ */ jsxs(CommandShortcut, {
					className: "opacity-0 transition-opacity group-data-[selected=true]/command-item:opacity-100",
					children: [
						"Press ",
						/* @__PURE__ */ jsx(Kbd, { children: "Enter" }),
						" to open"
					]
				})
			]
		}, resume$1.id))]
	})] });
}
function CommandPalette() {
	const inputRef = useRef(null);
	const { open, search, pages, setOpen, setSearch, goBack } = useCommandPaletteStore();
	const isFirstPage = pages.length === 0;
	const currentPage = pages[pages.length - 1];
	useHotkeys(["meta+k", "ctrl+k"], (e) => {
		e.preventDefault();
		setOpen(!open);
	}, {
		preventDefault: true,
		enableOnFormTags: true
	}, [open]);
	useHotkeys("backspace", (e) => {
		if (!open) return;
		const input = inputRef.current;
		if (!input) return;
		if (document.activeElement !== input) return;
		if (search.length > 0) return;
		e.preventDefault();
		goBack();
	}, {
		preventDefault: false,
		enableOnFormTags: true
	}, [open, search]);
	useHotkeys("escape", () => {
		if (!open) return;
		setOpen(false);
	}, {
		preventDefault: true,
		enableOnFormTags: true
	}, [open]);
	const handleOpenChange = (newOpen) => {
		setOpen(newOpen);
	};
	const handleSearchChange = (value) => {
		setSearch(value);
	};
	return /* @__PURE__ */ jsxs(Dialog$1, {
		open,
		onOpenChange: handleOpenChange,
		children: [/* @__PURE__ */ jsxs(DialogHeader, {
			className: "sr-only print:hidden",
			children: [/* @__PURE__ */ jsx(DialogTitle, { children: /* @__PURE__ */ jsx(Trans, { id: "G5KAPr" }) }), /* @__PURE__ */ jsx(DialogDescription, { children: /* @__PURE__ */ jsx(Trans, { id: "aLB9e4" }) })]
		}), /* @__PURE__ */ jsx(DialogContent, {
			className: "overflow-hidden p-0",
			"aria-label": isFirstPage ? "Command Palette" : `Command Palette - ${currentPage}`,
			children: /* @__PURE__ */ jsxs(Command$1, {
				loop: true,
				"aria-label": "Command Palette",
				className: "[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground **:[[cmdk-group]]:px-2 **:[[cmdk-input]]:h-12 **:[[cmdk-item]]:px-2 **:[[cmdk-item]]:py-3",
				children: [/* @__PURE__ */ jsx(CommandInput, {
					ref: inputRef,
					value: search,
					onValueChange: handleSearchChange,
					placeholder: isFirstPage ? "Type a command or search..." : "Search...",
					"aria-label": "Search commands"
				}), /* @__PURE__ */ jsxs(CommandList, { children: [
					/* @__PURE__ */ jsx(CommandEmpty, { children: /* @__PURE__ */ jsx(Trans, { id: "H7KFBz" }) }),
					/* @__PURE__ */ jsx(ResumesCommandGroup, {}),
					/* @__PURE__ */ jsx(NavigationCommandGroup, {})
				] })]
			})
		})]
	});
}
var Toaster$1 = ({ ...props }) => {
	const { theme = "system" } = useTheme();
	return /* @__PURE__ */ jsx(Toaster, {
		theme,
		className: "toaster group print:hidden",
		icons: {
			success: /* @__PURE__ */ jsx(CheckCircleIcon, { className: "size-4" }),
			info: /* @__PURE__ */ jsx(InfoIcon, { className: "size-4" }),
			warning: /* @__PURE__ */ jsx(WarningIcon, { className: "size-4" }),
			error: /* @__PURE__ */ jsx(XCircleIcon, { className: "size-4" }),
			loading: /* @__PURE__ */ jsx(SpinnerIcon, { className: "size-4 animate-spin" })
		},
		style: {
			"--normal-bg": "var(--popover)",
			"--normal-text": "var(--popover-foreground)",
			"--normal-border": "var(--border)",
			"--border-radius": "var(--radius)"
		},
		toastOptions: { classNames: {
			toast: "cn-toast",
			content: "space-y-0.5",
			description: "text-muted-foreground opacity-60 text-xs"
		} },
		...props
	});
};
function useFormBlocker(form, options) {
	const confirm = useConfirm();
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const { isDirty, isSubmitting } = form.formState;
	const shouldBlock = useCallback(() => {
		if (options?.shouldBlock) return options.shouldBlock();
		return isDirty && !isSubmitting;
	}, [
		options,
		isDirty,
		isSubmitting
	]);
	const requestClose = useCallback(async () => {
		if (!shouldBlock()) {
			closeDialog();
			return;
		}
		if (await confirm(i18n._({ id: "GM1Rg+" }), {
			description: i18n._({ id: "LcV6TH" }),
			confirmText: i18n._({ id: "Mv8CyJ" }),
			cancelText: i18n._({ id: "GCJTE0" })
		})) closeDialog();
	}, [
		shouldBlock,
		closeDialog,
		confirm
	]);
	return {
		requestClose,
		blockEvents: {
			onEscapeKeyDown: (event) => {
				if (shouldBlock()) {
					event.preventDefault();
					requestClose();
				}
			},
			onPointerDownOutside: (event) => {
				if (shouldBlock()) {
					event.preventDefault();
					requestClose();
				}
			},
			onInteractOutside: (event) => {
				if (shouldBlock()) event.preventDefault();
			}
		}
	};
}
init_string();
var formSchema$16 = z.object({
	id: z.string(),
	name: z.string().min(1).max(64),
	slug: z.string().min(1).max(64).transform(slugify),
	tags: z.array(z.string())
});
var basicDetailsSchema = z.object({
	fullName: z.string().trim().min(2, "Full name must be at least 2 characters").max(100).regex(/^[^0-9]*$/, "Full name cannot contain numbers"),
	professionalTitle: z.string().trim().min(2, "Professional title is required").max(100).regex(/^[^0-9]*$/, "Professional title cannot contain numbers"),
	email: z.string().trim().min(5, "Email is required").max(100, "Email must be at most 100 characters").email("Please enter a valid email address").transform((val) => val.toLowerCase()),
	phone: z.string().trim().transform((val) => val.replace(/\D/g, "")).refine((val) => val.length === 10, { message: "Phone number must be exactly 10 digits" }),
	location: z.string().trim().min(2, "Location is required"),
	linkedinUrl: z.string().trim().optional().or(z.literal("")).refine((val) => !val || val.startsWith("https://") && val.includes("linkedin.com"), { message: "Enter a valid LinkedIn URL" }),
	githubUrl: z.string().trim().optional().or(z.literal("")).refine((val) => !val || val.startsWith("https://") && val.includes("github.com"), { message: "Enter a valid GitHub URL" }),
	websiteUrl: z.string().trim().optional().or(z.literal("")).refine((val) => !val || /^https:\/\/.+\..+/.test(val), { message: "Website must start with https://" })
});
function CreateResumeDialog(_) {
	const navigate = useNavigate();
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const [currentStep, setCurrentStep] = useState(1);
	const [selectedTemplate, setSelectedTemplate] = useState("ditto");
	const [basicDetails, setBasicDetails] = useState(null);
	const [profilePhoto, setProfilePhoto] = useState(null);
	const [showPhotoOptions, setShowPhotoOptions] = useState(false);
	const { mutate: createResume, isPending } = useMutation({ mutationFn: (data) => api.createResume(data) });
	const basicDetailsForm = useForm({
		resolver: zodResolver(basicDetailsSchema),
		mode: "onChange",
		defaultValues: {
			fullName: "",
			professionalTitle: "",
			email: "",
			phone: "",
			location: "",
			linkedinUrl: "",
			githubUrl: "",
			websiteUrl: ""
		}
	});
	useEffect(() => {
		if (currentStep === 1 && basicDetails) basicDetailsForm.reset(basicDetails);
	}, [
		currentStep,
		basicDetails,
		basicDetailsForm
	]);
	const isFormValid = basicDetailsForm.formState.isValid;
	const handleProfilePhotoChange = (event) => {
		const file = event.target.files?.[0];
		if (!file) return;
		if (!["image/jpeg", "image/png"].includes(file.type)) {
			toast.error("Only JPEG or PNG images are allowed");
			return;
		}
		if (file.size > 5 * 1024 * 1024) {
			toast.error("Image size must be under 5MB");
			return;
		}
		const reader = new FileReader();
		reader.onloadend = () => {
			setProfilePhoto(reader.result);
			setShowPhotoOptions(true);
		};
		reader.readAsDataURL(file);
		event.target.value = "";
	};
	const handleRemovePhoto = () => {
		setProfilePhoto(null);
		setShowPhotoOptions(false);
		toast.success("Profile photo removed");
	};
	const onBasicDetailsSubmit = (data) => {
		setBasicDetails(data);
		setCurrentStep(2);
	};
	const onTemplateSelected = () => {
		if (!basicDetails) return;
		const resumeName = basicDetails.fullName || generateRandomName();
		const toastId = toast.loading(i18n._({ id: "7HKzmi" }));
		createResume({
			name: resumeName,
			slug: slugify(resumeName),
			tags: [],
			withSampleData: false
		}, {
			onSuccess: async (response) => {
				const resumeId = response.id;
				await new Promise((resolve) => setTimeout(resolve, 500));
				try {
					const createdResume = await api.fetchResume(resumeId);
					const profiles = [];
					if (basicDetails.linkedinUrl) profiles.push({
						id: "linkedin",
						hidden: false,
						network: "LinkedIn",
						username: "",
						icon: "linkedin",
						url: basicDetails.linkedinUrl
					});
					if (basicDetails.githubUrl) profiles.push({
						id: "github",
						hidden: false,
						network: "GitHub",
						username: "",
						icon: "github",
						url: basicDetails.githubUrl
					});
					if (basicDetails.websiteUrl) profiles.push({
						id: "website",
						hidden: false,
						network: "Website",
						username: "",
						icon: "link",
						url: basicDetails.websiteUrl
					});
					const updatedData = {
						...createdResume.data,
						metadata: {
							...createdResume.data.metadata,
							template: selectedTemplate
						},
						picture: {
							...createdResume.data.picture,
							url: profilePhoto || ""
						},
						basics: {
							...createdResume.data.basics,
							name: basicDetails.fullName,
							headline: basicDetails.professionalTitle,
							email: basicDetails.email,
							phone: basicDetails.phone,
							location: basicDetails.location
						},
						sections: {
							...createdResume.data.sections,
							profiles: {
								...createdResume.data.sections.profiles,
								items: profiles
							}
						}
					};
					await api.updateResume(resumeId, { data: updatedData });
					toast.success(i18n._({ id: "+Wj2rz" }), { id: toastId });
					closeDialog();
					navigate({
						to: "/builder/$resumeId",
						params: { resumeId }
					});
				} catch (error$1) {
					console.error("Failed to populate resume:", error$1);
					toast.success(i18n._({ id: "jXOFGY" }), { id: toastId });
					closeDialog();
					navigate({
						to: "/builder/$resumeId",
						params: { resumeId }
					});
				}
			},
			onError: (error$1) => {
				if (error$1.message === "RESUME_SLUG_ALREADY_EXISTS" || error$1.message.toLowerCase().includes("internal server error")) {
					toast.error("Name already exists, please use a different name.", { id: toastId });
					return;
				}
				toast.error(error$1.message, { id: toastId });
			}
		});
	};
	if (currentStep === 1) return /* @__PURE__ */ jsxs(DialogContent, {
		className: "max-h-[90vh] max-w-3xl overflow-y-auto bg-white text-gray-900",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mb-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-2 flex items-center justify-between",
					children: [/* @__PURE__ */ jsx("span", {
						className: "font-medium text-gray-700 text-sm",
						children: "Step 1 of 2"
					}), /* @__PURE__ */ jsx("span", {
						className: "font-medium text-gray-700 text-sm",
						children: "Basic Details"
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "h-1.5 w-full rounded-full bg-gray-200",
					children: /* @__PURE__ */ jsx("div", {
						className: "h-1.5 rounded-full bg-emerald-600 transition-all duration-300",
						style: { width: "50%" }
					})
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mb-6 flex items-start gap-4 border-gray-100 border-b pb-6",
				children: [/* @__PURE__ */ jsx("div", {
					className: "shrink-0",
					children: /* @__PURE__ */ jsx("img", {
						src: "/zoe-talking.png",
						alt: "Zoe AI",
						className: "h-15 w-12 rounded-full"
					})
				}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
					className: "mb-1 font-bold text-emerald-900 text-xl",
					children: "Let's build your resume"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-gray-600",
					children: "I'm Zoe, your AI assistant for Resume Builder. Start with your basics."
				})] })]
			}),
			" ",
			/* @__PURE__ */ jsx(Form, {
				...basicDetailsForm,
				children: /* @__PURE__ */ jsxs("form", {
					onSubmit: basicDetailsForm.handleSubmit(onBasicDetailsSubmit),
					className: "space-y-6",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-start gap-6",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-100",
										children: profilePhoto ? /* @__PURE__ */ jsx("img", {
											src: profilePhoto,
											alt: "Profile",
											className: "h-full w-full object-cover"
										}) : /* @__PURE__ */ jsx(CameraIcon, { className: "h-10 w-10 text-gray-400" })
									}),
									/* @__PURE__ */ jsx("input", {
										type: "file",
										accept: "image/*",
										onChange: handleProfilePhotoChange,
										className: "hidden",
										id: "profile-photo-upload"
									}),
									profilePhoto && showPhotoOptions ? /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: handleRemovePhoto,
										className: "absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 transition-colors hover:bg-red-700",
										title: "Remove photo",
										children: /* @__PURE__ */ jsx(TrashIcon, { className: "h-4 w-4 text-white" })
									}) : /* @__PURE__ */ jsx("label", {
										htmlFor: "profile-photo-upload",
										className: "absolute right-0 bottom-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-emerald-600 transition-colors hover:bg-emerald-700",
										title: "Upload photo",
										children: /* @__PURE__ */ jsx(PlusIcon, { className: "h-4 w-4 text-white" })
									})
								]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex-1 space-y-4",
								children: [/* @__PURE__ */ jsx(FormField, {
									control: basicDetailsForm.control,
									name: "fullName",
									render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
										/* @__PURE__ */ jsxs(FormLabel, {
											className: "text-gray-900",
											children: ["Full Name ", /* @__PURE__ */ jsx("span", {
												className: "text-red-500",
												children: "*"
											})]
										}),
										/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, {
											...field,
											className: "border-2 border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-0",
											placeholder: "John Doe",
											onChange: (e) => {
												const value = e.target.value.replace(/[0-9]/g, "");
												field.onChange(value);
											}
										}) }),
										/* @__PURE__ */ jsx(FormMessage, {})
									] })
								}), /* @__PURE__ */ jsx(FormField, {
									control: basicDetailsForm.control,
									name: "professionalTitle",
									render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
										/* @__PURE__ */ jsxs(FormLabel, {
											className: "text-gray-900",
											children: ["Professional Title ", /* @__PURE__ */ jsx("span", {
												className: "text-red-500",
												children: "*"
											})]
										}),
										/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, {
											...field,
											className: "border-2 border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-0",
											placeholder: "Senior Software Engineer",
											onChange: (e) => {
												const value = e.target.value.replace(/[0-9]/g, "");
												field.onChange(value);
											}
										}) }),
										/* @__PURE__ */ jsx(FormMessage, {})
									] })
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 gap-4 md:grid-cols-3",
							children: [
								/* @__PURE__ */ jsx(FormField, {
									control: basicDetailsForm.control,
									name: "email",
									render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
										/* @__PURE__ */ jsxs(FormLabel, {
											className: "text-gray-900",
											children: ["Email ", /* @__PURE__ */ jsx("span", {
												className: "text-red-500",
												children: "*"
											})]
										}),
										/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, {
											...field,
											type: "email",
											className: "border-2 border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-0",
											placeholder: "john@example.com"
										}) }),
										/* @__PURE__ */ jsx(FormMessage, {})
									] })
								}),
								/* @__PURE__ */ jsx(FormField, {
									control: basicDetailsForm.control,
									name: "phone",
									render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
										/* @__PURE__ */ jsxs(FormLabel, {
											className: "text-gray-900",
											children: ["Phone ", /* @__PURE__ */ jsx("span", {
												className: "text-red-500",
												children: "*"
											})]
										}),
										/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, {
											...field,
											type: "tel",
											inputMode: "numeric",
											maxLength: 10,
											onChange: (e) => {
												const cleaned = e.target.value.replace(/\D/g, "");
												field.onChange(cleaned);
											},
											placeholder: "9876543210"
										}) }),
										/* @__PURE__ */ jsx(FormMessage, {})
									] })
								}),
								/* @__PURE__ */ jsx(FormField, {
									control: basicDetailsForm.control,
									name: "location",
									render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
										/* @__PURE__ */ jsxs(FormLabel, {
											className: "text-gray-900",
											children: ["Location ", /* @__PURE__ */ jsx("span", {
												className: "text-red-500",
												children: "*"
											})]
										}),
										/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, {
											...field,
											className: "border-2 border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-0",
											placeholder: "San Francisco, CA"
										}) }),
										/* @__PURE__ */ jsx(FormMessage, {})
									] })
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
							className: "mb-4 font-semibold text-gray-700 text-xs uppercase tracking-wider",
							children: "Optional Links"
						}), /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 gap-4 md:grid-cols-3",
							children: [
								/* @__PURE__ */ jsx(FormField, {
									control: basicDetailsForm.control,
									name: "linkedinUrl",
									render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
										/* @__PURE__ */ jsx(FormLabel, {
											className: "text-gray-900",
											children: "LinkedIn URL"
										}),
										/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, {
											...field,
											type: "url",
											className: "border-2 border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-0",
											placeholder: "https://linkedin.com/in/..."
										}) }),
										/* @__PURE__ */ jsx(FormMessage, {})
									] })
								}),
								/* @__PURE__ */ jsx(FormField, {
									control: basicDetailsForm.control,
									name: "githubUrl",
									render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
										/* @__PURE__ */ jsx(FormLabel, {
											className: "text-gray-900",
											children: "GitHub URL"
										}),
										/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, {
											...field,
											type: "url",
											className: "border-2 border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-0",
											placeholder: "https://github.com/..."
										}) }),
										/* @__PURE__ */ jsx(FormMessage, {})
									] })
								}),
								/* @__PURE__ */ jsx(FormField, {
									control: basicDetailsForm.control,
									name: "websiteUrl",
									render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
										/* @__PURE__ */ jsx(FormLabel, {
											className: "text-gray-900",
											children: "Website URL"
										}),
										/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, {
											...field,
											type: "url",
											className: "border-2 border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-0",
											placeholder: "https://yourwebsite.com"
										}) }),
										/* @__PURE__ */ jsx(FormMessage, {})
									] })
								})
							]
						})] }),
						/* @__PURE__ */ jsxs(DialogFooter, {
							className: "grid grid-cols-2 gap-x-2 pt-6 sm:flex sm:justify-end",
							children: [/* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								className: "border-gray-300 bg-white text-gray-700 hover:bg-gray-100",
								onClick: closeDialog,
								children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "mr-2" }), "Cancel"]
							}), /* @__PURE__ */ jsxs(Button, {
								type: "submit",
								disabled: !isFormValid,
								className: "bg-emerald-600 hover:bg-emerald-700",
								children: ["Continue", /* @__PURE__ */ jsx(ArrowRightIcon, { className: "ml-2" })]
							})]
						})
					]
				})
			})
		]
	});
	return /* @__PURE__ */ jsxs(DialogContent, {
		className: "max-h-[90vh] max-w-6xl overflow-y-auto bg-white text-gray-900",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mb-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-2 flex items-center justify-between",
					children: [/* @__PURE__ */ jsx("span", {
						className: "font-medium text-gray-700 text-sm",
						children: "Step 2 of 2"
					}), /* @__PURE__ */ jsx("span", {
						className: "font-medium text-gray-700 text-sm",
						children: "Choose Template"
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "h-1.5 w-full rounded-full bg-gray-200",
					children: /* @__PURE__ */ jsx("div", {
						className: "h-1.5 rounded-full bg-emerald-600 transition-all duration-300",
						style: { width: "100%" }
					})
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mb-8 text-center",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "mb-4 flex items-center justify-center gap-2",
						children: [/* @__PURE__ */ jsx("img", {
							src: "/zoe-talking.png",
							alt: "Zoe AI",
							className: "h-8 w-8 rounded-full"
						}), /* @__PURE__ */ jsx("span", {
							className: "font-medium text-gray-600 text-sm",
							children: "Zoe AI - Resume Builder Assistant"
						})]
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "mb-2 font-bold text-3xl text-emerald-900",
						children: "Choose Your Template"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-gray-600",
						children: "Pick a design that matches your style. You can always change it later."
					})
				]
			}),
			" ",
			/* @__PURE__ */ jsx("div", {
				className: "mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
				children: Object.entries(templates).map(([key, template]) => /* @__PURE__ */ jsx(TemplateCard$1, {
					template,
					isSelected: selectedTemplate === key,
					onSelect: () => setSelectedTemplate(key),
					onContinue: onTemplateSelected,
					isPending
				}, key))
			}),
			/* @__PURE__ */ jsx(DialogFooter, {
				className: "flex items-center justify-between border-gray-200 border-t pt-6",
				children: /* @__PURE__ */ jsxs(Button, {
					style: { backgroundColor: "grey" },
					type: "button",
					variant: "outline",
					onClick: () => setCurrentStep(1),
					children: [/* @__PURE__ */ jsx(ArrowLeftIcon, { className: "mr-2" }), "Back"]
				})
			})
		]
	});
}
function UpdateResumeDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const queryClient = useQueryClient();
	const { mutate: updateResume, isPending } = useMutation({
		mutationFn: (data$1) => api.updateResume(data$1.id, data$1),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["resumes"] });
		}
	});
	const form = useForm({
		resolver: zodResolver(formSchema$16),
		defaultValues: {
			id: data.id,
			name: data.name,
			slug: data.slug,
			tags: data.tags
		}
	});
	const name = useWatch({
		control: form.control,
		name: "name"
	});
	useEffect(() => {
		if (!name) return;
		form.setValue("slug", slugify(name), { shouldDirty: true });
	}, [form, name]);
	const { blockEvents } = useFormBlocker(form);
	const onSubmit = (data$1) => {
		const toastId = toast.loading(i18n._({ id: "rYyCb4" }));
		updateResume(data$1, {
			onSuccess: () => {
				toast.success(i18n._({ id: "wX/xaI" }), { id: toastId });
				closeDialog();
			},
			onError: (error$1) => {
				if (error$1.message === "RESUME_SLUG_ALREADY_EXISTS" || error$1.message.toLowerCase().includes("internal server error")) {
					toast.error(i18n._({ id: "wTW9KJ" }), { id: toastId });
					return;
				}
				toast.error(error$1.message, { id: toastId });
			}
		});
	};
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ jsx(PencilSimpleLineIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "DBeXFR" })]
		}), /* @__PURE__ */ jsx(DialogDescription, { children: /* @__PURE__ */ jsx(Trans, { id: "cn2elv" }) })] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				onSubmit: form.handleSubmit(onSubmit),
				className: "space-y-4",
				children: [/* @__PURE__ */ jsx(ResumeForm, {}), /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, {
					type: "submit",
					disabled: isPending,
					children: /* @__PURE__ */ jsx(Trans, { id: "IUwGEM" })
				}) })]
			})
		})]
	});
}
function DuplicateResumeDialog({ data }) {
	const navigate = useNavigate();
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const queryClient = useQueryClient();
	const { mutate: duplicateResume, isPending } = useMutation({
		mutationFn: (values) => api.duplicateResume(data.id, values),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["resumes"] });
		}
	});
	const form = useForm({
		resolver: zodResolver(formSchema$16),
		defaultValues: {
			id: data.id,
			name: `${data.name} (Copy)`,
			slug: `${data.slug}-copy`,
			tags: data.tags
		}
	});
	const name = useWatch({
		control: form.control,
		name: "name"
	});
	useEffect(() => {
		if (!name) return;
		form.setValue("slug", slugify(name), { shouldDirty: true });
	}, [form, name]);
	const { blockEvents } = useFormBlocker(form);
	const onSubmit = (values) => {
		const toastId = toast.loading(i18n._({ id: "3tlS4P" }));
		duplicateResume(values, {
			onSuccess: async (response) => {
				const resumeId = response.id;
				toast.success(i18n._({ id: "LKNBKw" }), { id: toastId });
				closeDialog();
				if (data.shouldRedirect) navigate({
					to: `/builder/$resumeId`,
					params: { resumeId }
				});
			},
			onError: (error$1) => {
				if (error$1.message === "RESUME_SLUG_ALREADY_EXISTS" || error$1.message.toLowerCase().includes("internal server error")) {
					toast.error("Name already exists, please use a different name.", { id: toastId });
					return;
				}
				toast.error(error$1.message, { id: toastId });
			}
		});
	};
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ jsx(PencilSimpleLineIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "nfwsru" })]
		}), /* @__PURE__ */ jsx(DialogDescription, { children: /* @__PURE__ */ jsx(Trans, { id: "LBosAm" }) })] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				onSubmit: form.handleSubmit(onSubmit),
				className: "space-y-4",
				children: [/* @__PURE__ */ jsx(ResumeForm, {}), /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, {
					type: "submit",
					disabled: isPending,
					children: /* @__PURE__ */ jsx(Trans, { id: "euc6Ns" })
				}) })]
			})
		})]
	});
}
function ResumeForm() {
	return /* @__PURE__ */ jsx(Fragment$1, { children: /* @__PURE__ */ jsx(FormField, {
		control: useFormContext().control,
		name: "name",
		render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
			/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "6YtxFj" }) }),
			/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, {
				min: 1,
				max: 64,
				...field
			}) }),
			/* @__PURE__ */ jsx(FormMessage, {}),
			/* @__PURE__ */ jsx(FormDescription, { children: /* @__PURE__ */ jsx(Trans, { id: "K5RgPm" }) })
		] })
	}) });
}
function TemplateCard$1({ template, isSelected, onSelect, onContinue, isPending }) {
	return /* @__PURE__ */ jsx("div", {
		onClick: onSelect,
		className: `group cursor-pointer transition-all ${isSelected ? "ring-2 ring-emerald-600 ring-offset-2" : ""}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: "overflow-hidden rounded-xl border-2 border-gray-200 bg-white transition-all hover:border-gray-300",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "relative aspect-[8.5/11] overflow-hidden bg-linear-to-br from-gray-100 to-gray-50",
				children: [/* @__PURE__ */ jsx("img", {
					src: template.imageUrl,
					alt: template.name,
					className: "h-full w-full object-cover"
				}), isSelected && /* @__PURE__ */ jsx("div", {
					className: "absolute inset-0 flex items-center justify-center bg-emerald-50/80",
					children: /* @__PURE__ */ jsx("div", {
						className: "flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600",
						children: /* @__PURE__ */ jsx("svg", {
							className: "h-7 w-7 text-white",
							fill: "none",
							stroke: "currentColor",
							viewBox: "0 0 24 24",
							children: /* @__PURE__ */ jsx("path", {
								strokeLinecap: "round",
								strokeLinejoin: "round",
								strokeWidth: 3,
								d: "M5 13l4 4L19 7"
							})
						})
					})
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "bg-white p-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "mb-1 flex items-start justify-between",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "font-semibold text-emerald-900",
							children: template.name
						}), /* @__PURE__ */ jsx("span", {
							className: "rounded bg-emerald-100 px-2 py-0.5 font-medium text-emerald-700 text-xs",
							children: template.sidebarPosition === "left" ? "Left Sidebar" : template.sidebarPosition === "right" ? "Right Sidebar" : "Single Column"
						})]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-gray-600 text-sm",
						children: typeof template.description === "object" ? template.name : template.description
					}),
					isSelected && /* @__PURE__ */ jsxs(Button, {
						type: "button",
						className: "mt-4 w-full bg-emerald-600 hover:bg-emerald-700",
						onClick: (e) => {
							e.stopPropagation();
							onContinue();
						},
						disabled: isPending,
						children: ["Continue to Editor", /* @__PURE__ */ jsx(ArrowRightIcon, { className: "ml-2" })]
					})
				]
			})]
		})
	});
}
init_data();
init_string();
var iso8601 = z$1.string().regex(/^([1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]|[1-2][0-9]{3}-[0-1][0-9]|[1-2][0-9]{3})$/, "Must be a valid ISO 8601 date (YYYY, YYYY-MM, or YYYY-MM-DD)");
var locationSchema = z$1.looseObject({
	address: z$1.string().optional(),
	postalCode: z$1.string().optional(),
	city: z$1.string().optional(),
	countryCode: z$1.string().optional(),
	region: z$1.string().optional()
});
var profileSchema = z$1.looseObject({
	network: z$1.string().optional(),
	username: z$1.string().optional(),
	url: z$1.url().optional()
});
var basicsSchema = z$1.looseObject({
	name: z$1.string().optional(),
	label: z$1.string().optional(),
	image: z$1.string().optional(),
	email: z$1.email().optional(),
	phone: z$1.string().optional(),
	url: z$1.url().optional(),
	summary: z$1.string().optional(),
	location: locationSchema.optional(),
	profiles: z$1.array(profileSchema).optional()
});
var workSchema = z$1.looseObject({
	name: z$1.string().optional(),
	location: z$1.string().optional(),
	description: z$1.string().optional(),
	position: z$1.string().optional(),
	url: z$1.url().optional(),
	startDate: iso8601.optional(),
	endDate: iso8601.optional(),
	summary: z$1.string().optional(),
	highlights: z$1.array(z$1.string()).optional()
});
var volunteerSchema = z$1.looseObject({
	organization: z$1.string().optional(),
	position: z$1.string().optional(),
	url: z$1.url().optional(),
	startDate: iso8601.optional(),
	endDate: iso8601.optional(),
	summary: z$1.string().optional(),
	highlights: z$1.array(z$1.string()).optional()
});
var educationSchema = z$1.looseObject({
	institution: z$1.string().optional(),
	url: z$1.url().optional(),
	area: z$1.string().optional(),
	studyType: z$1.string().optional(),
	startDate: iso8601.optional(),
	endDate: iso8601.optional(),
	score: z$1.string().optional(),
	courses: z$1.array(z$1.string()).optional()
});
var awardSchema = z$1.looseObject({
	title: z$1.string().optional(),
	date: iso8601.optional(),
	awarder: z$1.string().optional(),
	summary: z$1.string().optional()
});
var certificateSchema = z$1.looseObject({
	name: z$1.string().optional(),
	date: iso8601.optional(),
	url: z$1.url().optional(),
	issuer: z$1.string().optional()
});
var publicationSchema = z$1.looseObject({
	name: z$1.string().optional(),
	publisher: z$1.string().optional(),
	releaseDate: iso8601.optional(),
	url: z$1.url().optional(),
	summary: z$1.string().optional()
});
var skillSchema = z$1.looseObject({
	name: z$1.string().optional(),
	level: z$1.string().optional(),
	keywords: z$1.array(z$1.string()).optional()
});
var languageSchema = z$1.looseObject({
	language: z$1.string().optional(),
	fluency: z$1.string().optional()
});
var interestSchema = z$1.looseObject({
	name: z$1.string().optional(),
	keywords: z$1.array(z$1.string()).optional()
});
var referenceSchema = z$1.looseObject({
	name: z$1.string().optional(),
	reference: z$1.string().optional()
});
var projectSchema = z$1.looseObject({
	name: z$1.string().optional(),
	description: z$1.string().optional(),
	highlights: z$1.array(z$1.string()).optional(),
	keywords: z$1.array(z$1.string()).optional(),
	startDate: iso8601.optional(),
	endDate: iso8601.optional(),
	url: z$1.url().optional(),
	roles: z$1.array(z$1.string()).optional(),
	entity: z$1.string().optional(),
	type: z$1.string().optional()
});
var metaSchema = z$1.looseObject({
	canonical: z$1.url().optional(),
	version: z$1.string().optional(),
	lastModified: z$1.string().optional()
});
var jsonResumeSchema = z$1.looseObject({
	$schema: z$1.url().optional(),
	basics: basicsSchema.optional(),
	work: z$1.array(workSchema).optional(),
	volunteer: z$1.array(volunteerSchema).optional(),
	education: z$1.array(educationSchema).optional(),
	awards: z$1.array(awardSchema).optional(),
	certificates: z$1.array(certificateSchema).optional(),
	publications: z$1.array(publicationSchema).optional(),
	skills: z$1.array(skillSchema).optional(),
	languages: z$1.array(languageSchema).optional(),
	interests: z$1.array(interestSchema).optional(),
	references: z$1.array(referenceSchema).optional(),
	projects: z$1.array(projectSchema).optional(),
	meta: metaSchema.optional()
});
function formatPeriod(startDate, endDate) {
	if (!startDate && !endDate) return "";
	if (!startDate) return endDate || "";
	if (!endDate) return `${startDate} - Present`;
	const formatDate = (date) => {
		const parts = date.split("-");
		if (parts.length === 3) {
			const [year$1, month] = parts;
			return `${[
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			][parseInt(month, 10) - 1]} ${year$1}`;
		}
		if (parts.length === 2) {
			const [year$1, month] = parts;
			return `${[
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			][parseInt(month, 10) - 1]} ${year$1}`;
		}
		return date;
	};
	return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}
function formatSingleDate(date) {
	if (!date) return "";
	const parts = date.split("-");
	if (parts.length === 3) {
		const [year$1, month, day$1] = parts;
		return `${[
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		][parseInt(month, 10) - 1]} ${day$1}, ${year$1}`;
	}
	if (parts.length === 2) {
		const [year$1, month] = parts;
		return `${[
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		][parseInt(month, 10) - 1]} ${year$1}`;
	}
	return date;
}
function toHtmlDescription(summary, highlights) {
	const parts = [];
	if (summary) parts.push(`<p>${summary}</p>`);
	if (highlights && highlights.length > 0) {
		parts.push("<ul>");
		for (const highlight of highlights) parts.push(`<li>${highlight}</li>`);
		parts.push("</ul>");
	}
	return parts.join("");
}
function arrayToHtmlList(items) {
	if (!items || items.length === 0) return "";
	return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}
function formatLocation(location) {
	if (!location) return "";
	const parts = [];
	if (location.city) parts.push(location.city);
	if (location.region) parts.push(location.region);
	if (location.countryCode) parts.push(location.countryCode);
	return parts.join(", ");
}
function getNetworkIcon(network) {
	if (!network) return "star";
	const networkLower = network.toLowerCase();
	if (networkLower.includes("github")) return "github-logo";
	if (networkLower.includes("linkedin")) return "linkedin-logo";
	if (networkLower.includes("twitter") || networkLower.includes("x.com")) return "twitter-logo";
	if (networkLower.includes("facebook")) return "facebook-logo";
	if (networkLower.includes("instagram")) return "instagram-logo";
	if (networkLower.includes("youtube")) return "youtube-logo";
	if (networkLower.includes("stackoverflow") || networkLower.includes("stack-overflow")) return "stack-overflow-logo";
	if (networkLower.includes("medium")) return "medium-logo";
	if (networkLower.includes("dev.to") || networkLower.includes("devto")) return "code";
	if (networkLower.includes("dribbble")) return "dribbble-logo";
	if (networkLower.includes("behance")) return "behance-logo";
	if (networkLower.includes("gitlab")) return "git-branch";
	if (networkLower.includes("bitbucket")) return "code";
	if (networkLower.includes("codepen")) return "code";
	return "star";
}
function parseLevel(level) {
	if (!level) return 0;
	const levelLower = level.toLowerCase();
	const numeric = parseInt(levelLower, 10);
	if (!Number.isNaN(numeric) && numeric >= 0 && numeric <= 5) return numeric;
	if (levelLower.includes("native") || levelLower.includes("expert") || levelLower.includes("master")) return 5;
	if (levelLower.includes("fluent") || levelLower.includes("advanced") || levelLower.includes("proficient")) return 4;
	if (levelLower.includes("intermediate") || levelLower.includes("conversational")) return 3;
	if (levelLower.includes("beginner") || levelLower.includes("basic") || levelLower.includes("elementary")) return 2;
	if (levelLower.includes("novice")) return 1;
	if (levelLower.includes("c2")) return 5;
	if (levelLower.includes("c1")) return 4;
	if (levelLower.includes("b2")) return 3;
	if (levelLower.includes("b1")) return 2;
	if (levelLower.includes("a2")) return 1;
	if (levelLower.includes("a1")) return 1;
	return 0;
}
function createUrl(url, label) {
	if (!url) return {
		url: "",
		label: ""
	};
	return {
		url,
		label: label || url
	};
}
var JSONResumeImporter = class {
	convert(jsonResume) {
		const result = { ...defaultResumeData };
		if (jsonResume.basics) {
			const basics = jsonResume.basics;
			result.basics = {
				name: basics.name || "",
				headline: basics.label || "",
				email: basics.email || "",
				phone: basics.phone || "",
				location: basics.location ? formatLocation(basics.location) : "",
				website: createUrl(basics.url),
				customFields: []
			};
			if (basics.image) result.picture = {
				...defaultResumeData.picture,
				url: basics.image,
				hidden: false
			};
		}
		if (jsonResume.basics?.summary) result.summary = {
			...defaultResumeData.summary,
			content: `<p>${jsonResume.basics.summary}</p>`,
			hidden: false
		};
		if (jsonResume.work && jsonResume.work.length > 0) result.sections.experience = {
			...defaultResumeData.sections.experience,
			items: jsonResume.work.filter((work) => work.name || work.position).map((work) => ({
				id: generateId$1(),
				hidden: false,
				company: work.name || "",
				position: work.position || "",
				location: work.location || "",
				period: formatPeriod(work.startDate, work.endDate),
				website: createUrl(work.url),
				description: toHtmlDescription(work.summary, work.highlights)
			}))
		};
		if (jsonResume.education && jsonResume.education.length > 0) result.sections.education = {
			...defaultResumeData.sections.education,
			items: jsonResume.education.filter((edu) => edu.institution).map((edu) => ({
				id: generateId$1(),
				hidden: false,
				school: edu.institution || "",
				degree: [edu.studyType, edu.area].filter(Boolean).join(" in ") || "",
				area: edu.area || "",
				grade: edu.score || "",
				location: "",
				period: formatPeriod(edu.startDate, edu.endDate),
				website: createUrl(edu.url),
				description: edu.courses && edu.courses.length > 0 ? arrayToHtmlList(edu.courses) : ""
			}))
		};
		if (jsonResume.projects && jsonResume.projects.length > 0) result.sections.projects = {
			...defaultResumeData.sections.projects,
			items: jsonResume.projects.filter((project) => project.name).map((project) => ({
				id: generateId$1(),
				hidden: false,
				name: project.name || "",
				period: formatPeriod(project.startDate, project.endDate),
				website: createUrl(project.url),
				description: toHtmlDescription(project.description, project.highlights)
			}))
		};
		if (jsonResume.skills && jsonResume.skills.length > 0) result.sections.skills = {
			...defaultResumeData.sections.skills,
			items: jsonResume.skills.filter((skill) => skill.name).map((skill) => ({
				id: generateId$1(),
				hidden: false,
				icon: "star",
				name: skill.name || "",
				proficiency: skill.level || "",
				level: parseLevel(skill.level),
				keywords: skill.keywords || []
			}))
		};
		if (jsonResume.languages && jsonResume.languages.length > 0) result.sections.languages = {
			...defaultResumeData.sections.languages,
			items: jsonResume.languages.filter((lang) => lang.language).map((lang) => ({
				id: generateId$1(),
				hidden: false,
				language: lang.language || "",
				fluency: lang.fluency || "",
				level: parseLevel(lang.fluency)
			}))
		};
		if (jsonResume.interests && jsonResume.interests.length > 0) result.sections.interests = {
			...defaultResumeData.sections.interests,
			items: jsonResume.interests.filter((interest) => interest.name).map((interest) => ({
				id: generateId$1(),
				hidden: false,
				icon: "star",
				name: interest.name || "",
				keywords: interest.keywords || []
			}))
		};
		if (jsonResume.awards && jsonResume.awards.length > 0) result.sections.awards = {
			...defaultResumeData.sections.awards,
			items: jsonResume.awards.filter((award) => award.title).map((award) => ({
				id: generateId$1(),
				hidden: false,
				title: award.title || "",
				awarder: award.awarder || "",
				date: formatSingleDate(award.date),
				website: {
					url: "",
					label: ""
				},
				description: award.summary ? `<p>${award.summary}</p>` : ""
			}))
		};
		if (jsonResume.certificates && jsonResume.certificates.length > 0) result.sections.certifications = {
			...defaultResumeData.sections.certifications,
			items: jsonResume.certificates.filter((cert) => cert.name).map((cert) => ({
				id: generateId$1(),
				hidden: false,
				title: cert.name || "",
				issuer: cert.issuer || "",
				date: formatSingleDate(cert.date),
				website: createUrl(cert.url),
				description: ""
			}))
		};
		if (jsonResume.publications && jsonResume.publications.length > 0) result.sections.publications = {
			...defaultResumeData.sections.publications,
			items: jsonResume.publications.filter((pub) => pub.name).map((pub) => ({
				id: generateId$1(),
				hidden: false,
				title: pub.name || "",
				publisher: pub.publisher || "",
				date: formatSingleDate(pub.releaseDate),
				website: createUrl(pub.url),
				description: pub.summary ? `<p>${pub.summary}</p>` : ""
			}))
		};
		if (jsonResume.volunteer && jsonResume.volunteer.length > 0) result.sections.volunteer = {
			...defaultResumeData.sections.volunteer,
			items: jsonResume.volunteer.filter((vol) => vol.organization).map((vol) => ({
				id: generateId$1(),
				hidden: false,
				organization: vol.organization || "",
				location: "",
				period: formatPeriod(vol.startDate, vol.endDate),
				website: createUrl(vol.url),
				description: toHtmlDescription(vol.summary, vol.highlights)
			}))
		};
		if (jsonResume.references && jsonResume.references.length > 0) result.sections.references = {
			...defaultResumeData.sections.references,
			items: jsonResume.references.filter((ref) => ref.name || ref.reference).map((ref) => ({
				id: generateId$1(),
				hidden: false,
				name: ref.name || "",
				position: "",
				website: {
					url: "",
					label: ""
				},
				phone: "",
				description: ref.reference ? `<p>${ref.reference}</p>` : ""
			}))
		};
		if (jsonResume.basics?.profiles && jsonResume.basics.profiles.length > 0) result.sections.profiles = {
			...defaultResumeData.sections.profiles,
			items: jsonResume.basics.profiles.filter((profile) => profile.network).map((profile) => ({
				id: generateId$1(),
				hidden: false,
				icon: getNetworkIcon(profile.network),
				network: profile.network || "",
				username: profile.username || "",
				website: createUrl(profile.url, profile.username || profile.network)
			}))
		};
		return resumeDataSchema.parse(result);
	}
	parse(json) {
		try {
			const jsonResume = jsonResumeSchema.parse(JSON.parse(json));
			return this.convert(jsonResume);
		} catch (error$1) {
			if (error$1 instanceof ZodError) {
				const errors = flattenError(error$1);
				throw new Error(JSON.stringify(errors));
			}
			throw error$1;
		}
	}
};
init_data();
var ReactiveResumeJSONImporter = class {
	parse(json) {
		try {
			return resumeDataSchema.parse(JSON.parse(json));
		} catch (error$1) {
			if (error$1 instanceof ZodError) {
				const errors = flattenError(error$1);
				throw new Error(JSON.stringify(errors));
			}
			throw error$1;
		}
	}
};
init_data();
init_string();
function colorToRgba(color) {
	const parsed = parseRgbString(color);
	if (!parsed) return "rgba(0, 0, 0, 1)";
	return `rgba(${parsed.r}, ${parsed.g}, ${parsed.b}, ${parsed.a})`;
}
var clamp = (value, min, max) => Math.max(min, Math.min(max, value));
var nonNegative = (value) => Math.max(0, value);
var pxToPt = (px) => px * .75;
var clampPictureSize = (size) => clamp(size, 32, 512);
var clampRotation = (rotation) => clamp(rotation, 0, 360);
var clampAspectRatio = (ratio) => clamp(ratio, .5, 2.5);
var clampBorderRadius = (radius) => clamp(radius, 0, 100);
var clampFontSize = (size) => clamp(size, 6, 24);
var clampLineHeight = (height) => clamp(height, .5, 4);
var clampSidebarWidth = (width) => clamp(width, 10, 50);
var clampLevel = (level) => clamp(level, 0, 5);
var convertAndClampFontSize = (px) => clampFontSize(pxToPt(px));
var isValidEmail = (email) => {
	if (!email) return false;
	return z.email().safeParse(email).success;
};
var sanitizeEmail = (email) => {
	if (!email) return "";
	return isValidEmail(email) ? email : "";
};
var FONT_WEIGHT_MAP = {
	regular: "400",
	italic: "400",
	"100": "100",
	"200": "200",
	"300": "300",
	"400": "400",
	"500": "500",
	"600": "600",
	"700": "700",
	"800": "800",
	"900": "900",
	bold: "700",
	"bold-italic": "700"
};
var convertFontVariantToWeight = (variant, defaultWeight = "400") => FONT_WEIGHT_MAP[variant.toLowerCase()] ?? defaultWeight;
var convertFontVariants = (variants, defaultWeight = "400") => {
	if (!variants || variants.length === 0) return [defaultWeight];
	return variants.map((v) => convertFontVariantToWeight(v, defaultWeight));
};
var convertFontVariantsForHeading = (variants) => {
	const filtered = convertFontVariants(variants, "600").filter((w) => Number.parseInt(w, 10) >= 600);
	return filtered.length > 0 ? filtered : ["600"];
};
var transformLayoutSectionId = (id) => {
	if (id.startsWith("custom.")) return id.slice(7);
	return id;
};
var transformLayoutColumn = (column) => {
	return column.filter((id) => id !== "summary").map(transformLayoutSectionId);
};
var ReactiveResumeV4JSONImporter = class {
	parse(json) {
		try {
			const v4Data = JSON.parse(json);
			const transformed = {
				picture: {
					hidden: v4Data.basics.picture?.effects?.hidden ?? false,
					url: v4Data.basics.picture?.url ?? "",
					size: clampPictureSize(v4Data.basics.picture?.size ?? 80),
					rotation: clampRotation(0),
					aspectRatio: clampAspectRatio(v4Data.basics.picture?.aspectRatio ?? 1),
					borderRadius: clampBorderRadius(v4Data.basics.picture?.borderRadius ?? 0),
					borderColor: v4Data.basics.picture?.effects?.border ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)",
					borderWidth: nonNegative(v4Data.basics.picture?.effects?.border ? 1 : 0),
					shadowColor: "rgba(0, 0, 0, 0.5)",
					shadowWidth: nonNegative(0)
				},
				basics: {
					name: v4Data.basics.name ?? "",
					headline: v4Data.basics.headline ?? "",
					email: sanitizeEmail(v4Data.basics.email),
					phone: v4Data.basics.phone ?? "",
					location: v4Data.basics.location ?? "",
					website: {
						url: v4Data.basics.url?.href ?? "",
						label: v4Data.basics.url?.label ?? ""
					},
					customFields: (v4Data.basics.customFields ?? []).map((field) => ({
						id: field.id ?? generateId$1(),
						icon: field.icon ?? "",
						text: field.text ?? "",
						link: ""
					}))
				},
				summary: {
					title: v4Data.sections.summary?.name ?? "",
					columns: v4Data.sections.summary?.columns ?? 1,
					hidden: !(v4Data.sections.summary?.visible ?? true),
					content: v4Data.sections.summary?.content ?? ""
				},
				sections: {
					profiles: {
						title: v4Data.sections.profiles?.name ?? "",
						columns: v4Data.sections.profiles?.columns ?? 1,
						hidden: !(v4Data.sections.profiles?.visible ?? true),
						items: (v4Data.sections.profiles?.items ?? []).filter((item) => item.network && item.network.length > 0).map((item) => ({
							id: item.id ?? generateId$1(),
							hidden: !(item.visible ?? true),
							icon: item.icon ?? "",
							network: item.network,
							username: item.username ?? "",
							website: {
								url: item.url?.href ?? "",
								label: item.url?.label ?? ""
							}
						}))
					},
					experience: {
						title: v4Data.sections.experience?.name ?? "",
						columns: v4Data.sections.experience?.columns ?? 1,
						hidden: !(v4Data.sections.experience?.visible ?? true),
						items: (v4Data.sections.experience?.items ?? []).filter((item) => item.company && item.company.length > 0).map((item) => ({
							id: item.id ?? generateId$1(),
							hidden: !(item.visible ?? true),
							company: item.company,
							position: item.position ?? "",
							location: item.location ?? "",
							period: item.date ?? "",
							website: {
								url: item.url?.href ?? "",
								label: item.url?.label ?? ""
							},
							description: item.summary ?? ""
						}))
					},
					education: {
						title: v4Data.sections.education?.name ?? "",
						columns: v4Data.sections.education?.columns ?? 1,
						hidden: !(v4Data.sections.education?.visible ?? true),
						items: (v4Data.sections.education?.items ?? []).filter((item) => item.institution && item.institution.length > 0).map((item) => ({
							id: item.id ?? generateId$1(),
							hidden: !(item.visible ?? true),
							school: item.institution,
							degree: item.studyType ?? "",
							area: item.area ?? "",
							grade: item.score ?? "",
							location: "",
							period: item.date ?? "",
							website: {
								url: item.url?.href ?? "",
								label: item.url?.label ?? ""
							},
							description: item.summary ?? ""
						}))
					},
					projects: {
						title: v4Data.sections.projects?.name ?? "",
						columns: v4Data.sections.projects?.columns ?? 1,
						hidden: !(v4Data.sections.projects?.visible ?? true),
						items: (v4Data.sections.projects?.items ?? []).filter((item) => item.name && item.name.length > 0).map((item) => ({
							id: item.id ?? generateId$1(),
							hidden: !(item.visible ?? true),
							name: item.name,
							period: item.date ?? "",
							website: {
								url: item.url?.href ?? "",
								label: item.url?.label ?? ""
							},
							description: item.summary ?? item.description ?? ""
						}))
					},
					skills: {
						title: v4Data.sections.skills?.name ?? "",
						columns: v4Data.sections.skills?.columns ?? 1,
						hidden: !(v4Data.sections.skills?.visible ?? true),
						items: (v4Data.sections.skills?.items ?? []).filter((item) => item.name && item.name.length > 0).map((item) => ({
							id: item.id ?? generateId$1(),
							hidden: !(item.visible ?? true),
							icon: "",
							name: item.name,
							proficiency: item.description ?? "",
							level: clampLevel(item.level ?? 0),
							keywords: item.keywords ?? []
						}))
					},
					languages: {
						title: v4Data.sections.languages?.name ?? "",
						columns: v4Data.sections.languages?.columns ?? 1,
						hidden: !(v4Data.sections.languages?.visible ?? true),
						items: (v4Data.sections.languages?.items ?? []).filter((item) => item.name && item.name.length > 0).map((item) => ({
							id: item.id ?? generateId$1(),
							hidden: !(item.visible ?? true),
							language: item.name,
							fluency: item.description ?? "",
							level: clampLevel(item.level ?? 0)
						}))
					},
					interests: {
						title: v4Data.sections.interests?.name ?? "",
						columns: v4Data.sections.interests?.columns ?? 1,
						hidden: !(v4Data.sections.interests?.visible ?? true),
						items: (v4Data.sections.interests?.items ?? []).filter((item) => item.name && item.name.length > 0).map((item) => ({
							id: item.id ?? generateId$1(),
							hidden: !(item.visible ?? true),
							icon: "",
							name: item.name,
							keywords: item.keywords ?? []
						}))
					},
					awards: {
						title: v4Data.sections.awards?.name ?? "",
						columns: v4Data.sections.awards?.columns ?? 1,
						hidden: !(v4Data.sections.awards?.visible ?? true),
						items: (v4Data.sections.awards?.items ?? []).filter((item) => item.title && item.title.length > 0).map((item) => ({
							id: item.id ?? generateId$1(),
							hidden: !(item.visible ?? true),
							title: item.title,
							awarder: item.awarder ?? "",
							date: item.date ?? "",
							website: {
								url: item.url?.href ?? "",
								label: item.url?.label ?? ""
							},
							description: item.summary ?? ""
						}))
					},
					certifications: {
						title: v4Data.sections.certifications?.name ?? "",
						columns: v4Data.sections.certifications?.columns ?? 1,
						hidden: !(v4Data.sections.certifications?.visible ?? true),
						items: (v4Data.sections.certifications?.items ?? []).filter((item) => item.name && item.name.length > 0).map((item) => ({
							id: item.id ?? generateId$1(),
							hidden: !(item.visible ?? true),
							title: item.name,
							issuer: item.issuer ?? "",
							date: item.date ?? "",
							website: {
								url: item.url?.href ?? "",
								label: item.url?.label ?? ""
							},
							description: item.summary ?? ""
						}))
					},
					publications: {
						title: v4Data.sections.publications?.name ?? "",
						columns: v4Data.sections.publications?.columns ?? 1,
						hidden: !(v4Data.sections.publications?.visible ?? true),
						items: (v4Data.sections.publications?.items ?? []).filter((item) => item.name && item.name.length > 0).map((item) => ({
							id: item.id ?? generateId$1(),
							hidden: !(item.visible ?? true),
							title: item.name,
							publisher: item.publisher ?? "",
							date: item.date ?? "",
							website: {
								url: item.url?.href ?? "",
								label: item.url?.label ?? ""
							},
							description: item.summary ?? ""
						}))
					},
					volunteer: {
						title: v4Data.sections.volunteer?.name ?? "",
						columns: v4Data.sections.volunteer?.columns ?? 1,
						hidden: !(v4Data.sections.volunteer?.visible ?? true),
						items: (v4Data.sections.volunteer?.items ?? []).filter((item) => item.organization && item.organization.length > 0).map((item) => ({
							id: item.id ?? generateId$1(),
							hidden: !(item.visible ?? true),
							organization: item.organization,
							location: item.location ?? "",
							period: item.date ?? "",
							website: {
								url: item.url?.href ?? "",
								label: item.url?.label ?? ""
							},
							description: item.summary ?? ""
						}))
					},
					references: {
						title: v4Data.sections.references?.name ?? "",
						columns: v4Data.sections.references?.columns ?? 1,
						hidden: !(v4Data.sections.references?.visible ?? true),
						items: (v4Data.sections.references?.items ?? []).filter((item) => item.name && item.name.length > 0).map((item) => ({
							id: item.id ?? generateId$1(),
							hidden: !(item.visible ?? true),
							name: item.name,
							position: item.description ?? "",
							phone: "",
							website: {
								url: item.url?.href ?? "",
								label: item.url?.label ?? ""
							},
							description: item.summary ?? ""
						}))
					}
				},
				customSections: Object.entries(v4Data.sections.custom ?? {}).map(([sectionId, section]) => ({
					id: section.id || sectionId,
					title: section.name ?? "",
					type: "experience",
					columns: section.columns ?? 1,
					hidden: !(section.visible ?? true),
					items: section.items.filter((item) => item.visible !== false).map((item, index) => ({
						id: item.id || generateId$1(),
						hidden: !item.visible,
						company: item.name?.trim() || `#${index + 1}`,
						position: item.description ?? "",
						location: item.location ?? "",
						period: item.date ?? "",
						website: {
							url: item.url?.href ?? "",
							label: item.url?.label ?? ""
						},
						description: item.summary ?? ""
					}))
				})),
				metadata: {
					template: templateSchema.safeParse(v4Data.metadata.template).success ? v4Data.metadata.template : "onyx",
					layout: {
						sidebarWidth: clampSidebarWidth(35),
						pages: (v4Data.metadata.layout ?? []).map((page) => {
							const main = transformLayoutColumn(page[0] ?? []);
							const sidebar = transformLayoutColumn(page[1] ?? []);
							return {
								fullWidth: sidebar.length === 0,
								main,
								sidebar
							};
						})
					},
					css: {
						enabled: v4Data.metadata.css?.visible ?? false,
						value: v4Data.metadata.css?.value ?? ""
					},
					page: {
						gapX: nonNegative(4),
						gapY: nonNegative(6),
						marginX: nonNegative(v4Data.metadata.page?.margin ?? 14),
						marginY: nonNegative(v4Data.metadata.page?.margin ?? 14),
						format: v4Data.metadata.page?.format ?? "a4",
						locale: "en-US",
						hideIcons: v4Data.metadata.typography?.hideIcons ?? false
					},
					design: {
						colors: {
							primary: v4Data.metadata.theme?.primary ? colorToRgba(v4Data.metadata.theme.primary) : "rgba(220, 38, 38, 1)",
							text: v4Data.metadata.theme?.text ? colorToRgba(v4Data.metadata.theme.text) : "rgba(0, 0, 0, 1)",
							background: v4Data.metadata.theme?.background ? colorToRgba(v4Data.metadata.theme.background) : "rgba(255, 255, 255, 1)"
						},
						level: {
							icon: "star",
							type: "circle"
						}
					},
					typography: {
						body: {
							fontFamily: v4Data.metadata.typography?.font?.family ?? "IBM Plex Serif",
							fontWeights: convertFontVariants(v4Data.metadata.typography?.font?.variants),
							fontSize: convertAndClampFontSize(v4Data.metadata.typography?.font?.size ?? 14.67),
							lineHeight: clampLineHeight(v4Data.metadata.typography?.lineHeight ?? 1.5)
						},
						heading: {
							fontFamily: v4Data.metadata.typography?.font?.family ?? "IBM Plex Serif",
							fontWeights: convertFontVariantsForHeading(v4Data.metadata.typography?.font?.variants),
							fontSize: clampFontSize(convertAndClampFontSize(v4Data.metadata.typography?.font?.size ?? 14.67) + 3),
							lineHeight: clampLineHeight(v4Data.metadata.typography?.lineHeight ?? 1.5)
						}
					},
					notes: v4Data.metadata.notes ?? ""
				}
			};
			if (v4Data.sections.summary?.visible && v4Data.sections.summary?.content) {
				if (transformed.metadata.layout.pages.length > 0) transformed.metadata.layout.pages[0].main.unshift("summary");
			}
			return resumeDataSchema.parse(transformed);
		} catch (error$1) {
			if (error$1 instanceof ZodError) {
				const errors = flattenError(error$1);
				throw new Error(JSON.stringify(errors));
			}
			throw error$1;
		}
	}
};
init_string();
var formSchema$15 = z.discriminatedUnion("type", [
	z.object({ type: z.literal("") }),
	z.object({
		type: z.literal("pdf"),
		file: z.instanceof(File).refine((file) => file.type === "application/pdf", { message: "File must be a PDF" })
	}),
	z.object({
		type: z.literal("docx"),
		file: z.instanceof(File).refine((file) => file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document", { message: "File must be a Microsoft Word document" })
	}),
	z.object({
		type: z.literal("reactive-resume-json"),
		file: z.instanceof(File).refine((file) => file.type === "application/json", { message: "File must be a JSON file" })
	}),
	z.object({
		type: z.literal("reactive-resume-v4-json"),
		file: z.instanceof(File).refine((file) => file.type === "application/json", { message: "File must be a JSON file" })
	}),
	z.object({
		type: z.literal("json-resume-json"),
		file: z.instanceof(File).refine((file) => file.type === "application/json", { message: "File must be a JSON file" })
	})
]);
function ImportResumeDialog(_) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const prevTypeRef = useRef("");
	const inputRef = useRef(null);
	const [isLoading, setIsLoading] = useState(false);
	const { mutateAsync: createResume } = useMutation({ mutationFn: (data) => api.createResume(data) });
	const form = useForm({
		resolver: zodResolver(formSchema$15),
		defaultValues: { type: "" }
	});
	const type = useWatch({
		control: form.control,
		name: "type"
	});
	useEffect(() => {
		if (prevTypeRef.current === type) return;
		prevTypeRef.current = type;
		form.resetField("file");
	}, [form.resetField, type]);
	const onSelectFile = () => {
		if (!inputRef.current) return;
		inputRef.current.click();
	};
	const onUploadFile = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		form.setValue("file", file, { shouldDirty: true });
	};
	const { blockEvents } = useFormBlocker(form);
	const onSubmit = async (values) => {
		if (values.type === "") return;
		setIsLoading(true);
		const toastId = toast.loading(i18n._({ id: "PLI0By" }), { description: i18n._({ id: "qMiLNT" }) });
		try {
			let data;
			if (values.type === "json-resume-json") {
				const json = await values.file.text();
				data = new JSONResumeImporter().parse(json);
			}
			if (values.type === "reactive-resume-json") {
				const json = await values.file.text();
				data = new ReactiveResumeJSONImporter().parse(json);
			}
			if (values.type === "reactive-resume-v4-json") {
				const json = await values.file.text();
				data = new ReactiveResumeV4JSONImporter().parse(json);
			}
			if (values.type === "pdf" || values.type === "docx") throw new Error(i18n._({ id: "nh4K2m" }));
			if (!data) throw new Error("No data was returned from the importer.");
			const name = data.basics.name || generateRandomName();
			await createResume({
				name,
				slug: slugify(name),
				data
			});
			toast.success(i18n._({ id: "9GT8s1" }), {
				id: toastId,
				description: null
			});
			closeDialog();
		} catch (error$1) {
			if (error$1 instanceof Error) toast.error(error$1.message, {
				id: toastId,
				description: null
			});
			else toast.error(i18n._({ id: "f8/elA" }), {
				id: toastId,
				description: null
			});
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ jsx(DownloadSimpleIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "K03OvA" })]
		}), /* @__PURE__ */ jsx(DialogDescription, { children: /* @__PURE__ */ jsx(Trans, { id: "nCHk+K" }) })] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				onSubmit: form.handleSubmit(onSubmit),
				className: "space-y-4",
				children: [
					/* @__PURE__ */ jsx(FormField, {
						control: form.control,
						name: "type",
						render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
							/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "+zy2Nq" }) }),
							/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Combobox, {
								clearable: false,
								value: field.value,
								onValueChange: field.onChange,
								options: [
									{
										value: "reactive-resume-json",
										label: "Reactive Resume (JSON)"
									},
									{
										value: "reactive-resume-v4-json",
										label: "Reactive Resume v4 (JSON)"
									},
									{
										value: "json-resume-json",
										label: "JSON Resume"
									},
									{
										value: "pdf",
										label: "PDF"
									},
									{
										value: "docx",
										label: "Microsoft Word"
									}
								]
							}) }),
							/* @__PURE__ */ jsx(FormMessage, {})
						] })
					}),
					/* @__PURE__ */ jsx(FormField, {
						control: form.control,
						name: "file",
						render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
							className: cn(!type && "hidden"),
							children: [/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Input, {
								type: "file",
								className: "hidden",
								ref: inputRef,
								onChange: onUploadFile
							}), /* @__PURE__ */ jsx(Button, {
								variant: "outline",
								className: "h-auto w-full flex-col border-dashed py-8 font-normal",
								onClick: onSelectFile,
								children: field.value ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(FileIcon, {
									weight: "thin",
									size: 32
								}), /* @__PURE__ */ jsx("p", { children: field.value.name })] }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(UploadSimpleIcon, {
									weight: "thin",
									size: 32
								}), /* @__PURE__ */ jsx(Trans, { id: "P27Jj3" })] })
							})] }) }), /* @__PURE__ */ jsx(FormMessage, {})]
						})
					}, type),
					/* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsxs(Button, {
						type: "submit",
						disabled: !type || isLoading,
						children: [isLoading ? /* @__PURE__ */ jsx(Spinner, {}) : null, isLoading ? i18n._({ id: "hdsaJo" }) : i18n._({ id: "l3s5ri" })]
					}) })
				]
			})
		})]
	});
}
var [SwitchProvider, useSwitch] = getStrictContext("SwitchContext");
function Switch$2(props) {
	const [isPressed, setIsPressed] = React.useState(false);
	const { checked, defaultChecked, onCheckedChange, ...restProps } = props;
	const [isChecked, setIsChecked] = useControlledState({
		value: checked,
		defaultValue: defaultChecked,
		onChange: onCheckedChange
	});
	return /* @__PURE__ */ jsx(SwitchProvider, {
		value: {
			isChecked,
			setIsChecked,
			isPressed,
			setIsPressed
		},
		children: /* @__PURE__ */ jsx(Switch.Root, {
			...restProps,
			asChild: true,
			checked: isChecked,
			defaultChecked,
			onCheckedChange: setIsChecked,
			children: /* @__PURE__ */ jsx(motion.button, {
				...restProps,
				whileTap: "tap",
				initial: false,
				"data-slot": "switch",
				onTap: () => setIsPressed(false),
				onTapStart: () => setIsPressed(true),
				onTapCancel: () => setIsPressed(false)
			})
		})
	});
}
function SwitchThumb({ pressedAnimation, transition = {
	type: "spring",
	stiffness: 300,
	damping: 25
}, ...props }) {
	const { isPressed } = useSwitch();
	return /* @__PURE__ */ jsx(Switch.Thumb, {
		asChild: true,
		children: /* @__PURE__ */ jsx(motion.div, {
			layout: true,
			whileTap: "tab",
			"data-slot": "switch-thumb",
			transition,
			animate: isPressed ? pressedAnimation : void 0,
			...props
		})
	});
}
function SwitchIcon({ position, transition = {
	type: "spring",
	bounce: 0
}, ...props }) {
	const { isChecked } = useSwitch();
	const isAnimated = React.useMemo(() => {
		if (position === "right") return !isChecked;
		if (position === "left") return isChecked;
		if (position === "thumb") return true;
		return false;
	}, [position, isChecked]);
	return /* @__PURE__ */ jsx(motion.div, {
		"data-slot": `switch-${position}-icon`,
		animate: isAnimated ? {
			scale: 1,
			opacity: 1
		} : {
			scale: 0,
			opacity: 0
		},
		transition,
		...props
	});
}
function Switch$1({ className, pressedWidth = 20, startIcon, endIcon, thumbIcon, ...props }) {
	return /* @__PURE__ */ jsxs(Switch$2, {
		className: cn("peer relative flex h-5 w-8 shrink-0 items-center justify-start rounded-full border border-transparent px-px shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50", "data-[state=checked]:justify-end data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80", className),
		...props,
		children: [
			/* @__PURE__ */ jsx(SwitchThumb, {
				className: cn("pointer-events-none relative z-10 block size-4 rounded-full bg-background ring-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground"),
				pressedAnimation: { width: pressedWidth },
				children: thumbIcon && /* @__PURE__ */ jsx(SwitchIcon, {
					position: "thumb",
					className: "-translate-1/2 absolute start-1/2 top-1/2 text-neutral-400 dark:text-neutral-500 [&_svg]:size-[9px]",
					children: thumbIcon
				})
			}),
			startIcon && /* @__PURE__ */ jsx(SwitchIcon, {
				position: "left",
				className: "absolute start-0.5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 [&_svg]:size-[9px]",
				children: startIcon
			}),
			endIcon && /* @__PURE__ */ jsx(SwitchIcon, {
				position: "right",
				className: "absolute end-0.5 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 [&_svg]:size-[9px]",
				children: endIcon
			})
		]
	});
}
init_data();
init_string();
var formSchema$14 = awardItemSchema;
function CreateAwardDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema$14),
		defaultValues: {
			id: generateId$1(),
			hidden: data?.item?.hidden ?? false,
			options: data?.item?.options ?? { showLinkInTitle: false },
			title: data?.item?.title ?? "",
			awarder: data?.item?.awarder ?? "",
			date: data?.item?.date ?? "",
			website: data?.item?.website ?? {
				url: "",
				label: ""
			},
			description: data?.item?.description ?? ""
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (section) section.items.push(formData);
			} else draft.sections.awards.items.push(formData);
		});
		closeDialog();
	};
	const { blockEvents, requestClose } = useFormBlocker(form);
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ jsx(PlusIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "bvAt4a" })]
		}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				className: "grid gap-4 sm:grid-cols-2",
				onSubmit: form.handleSubmit(onSubmit),
				children: [/* @__PURE__ */ jsx(AwardForm, {}), /* @__PURE__ */ jsxs(DialogFooter, {
					className: "sm:col-span-full",
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						onClick: requestClose,
						children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
					}), /* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: form.formState.isSubmitting,
						children: /* @__PURE__ */ jsx(Trans, { id: "hYgDIe" })
					})]
				})]
			})
		})]
	});
}
function UpdateAwardDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema$14),
		defaultValues: {
			id: data.item.id,
			hidden: data.item.hidden,
			options: data.item.options ?? { showLinkInTitle: false },
			title: data.item.title,
			awarder: data.item.awarder,
			date: data.item.date,
			website: data.item.website,
			description: data.item.description
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (!section) return;
				const index = section.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) section.items[index] = formData;
			} else {
				const index = draft.sections.awards.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) draft.sections.awards.items[index] = formData;
			}
		});
		closeDialog();
	};
	const { blockEvents, requestClose } = useFormBlocker(form);
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ jsx(PencilSimpleLineIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "kKBgmw" })]
		}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				className: "grid gap-4 sm:grid-cols-2",
				onSubmit: form.handleSubmit(onSubmit),
				children: [/* @__PURE__ */ jsx(AwardForm, {}), /* @__PURE__ */ jsxs(DialogFooter, {
					className: "sm:col-span-full",
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						onClick: requestClose,
						children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
					}), /* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: form.formState.isSubmitting,
						children: /* @__PURE__ */ jsx(Trans, { id: "IUwGEM" })
					})]
				})]
			})
		})]
	});
}
function AwardForm() {
	const form = useFormContext();
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "title",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "MHrjPM" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "awarder",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "I+gIeY" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "date",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "mYGY3B" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "website",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "On0aF2" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(URLInput, {
					...field,
					value: field.value,
					onChange: field.onChange,
					hideLabelButton: form.watch("options.showLinkInTitle")
				}) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "options.showLinkInTitle",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
				className: "flex items-center gap-x-2",
				children: [/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Switch$1, {
					checked: field.value,
					onCheckedChange: field.onChange
				}) }), /* @__PURE__ */ jsx(FormLabel, {
					className: "!mt-0",
					children: /* @__PURE__ */ jsx(Trans, { id: "vdCB9I" })
				})]
			})
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "description",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
				className: "sm:col-span-full",
				children: [
					/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "Nu4oKW" }) }),
					/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(RichInput, {
						...field,
						value: field.value,
						onChange: field.onChange
					}) }),
					/* @__PURE__ */ jsx(FormMessage, {})
				]
			})
		})
	] });
}
init_data();
init_string();
var formSchema$13 = certificationItemSchema;
function CreateCertificationDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema$13),
		defaultValues: {
			id: generateId$1(),
			hidden: data?.item?.hidden ?? false,
			options: data?.item?.options ?? { showLinkInTitle: false },
			title: data?.item?.title ?? "",
			issuer: data?.item?.issuer ?? "",
			date: data?.item?.date ?? "",
			website: data?.item?.website ?? {
				url: "",
				label: ""
			},
			description: data?.item?.description ?? ""
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (section) section.items.push(formData);
			} else draft.sections.certifications.items.push(formData);
		});
		closeDialog();
	};
	const { blockEvents, requestClose } = useFormBlocker(form);
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ jsx(PlusIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "8FwfO5" })]
		}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				className: "grid gap-4 sm:grid-cols-2",
				onSubmit: form.handleSubmit(onSubmit),
				children: [/* @__PURE__ */ jsx(CertificationForm, {}), /* @__PURE__ */ jsxs(DialogFooter, {
					className: "sm:col-span-full",
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						onClick: requestClose,
						children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
					}), /* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: form.formState.isSubmitting,
						children: /* @__PURE__ */ jsx(Trans, { id: "hYgDIe" })
					})]
				})]
			})
		})]
	});
}
function UpdateCertificationDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema$13),
		defaultValues: {
			id: data.item.id,
			hidden: data.item.hidden,
			options: data.item.options ?? { showLinkInTitle: false },
			title: data.item.title,
			issuer: data.item.issuer,
			date: data.item.date,
			website: data.item.website,
			description: data.item.description
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (!section) return;
				const index = section.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) section.items[index] = formData;
			} else {
				const index = draft.sections.certifications.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) draft.sections.certifications.items[index] = formData;
			}
		});
		closeDialog();
	};
	const { blockEvents, requestClose } = useFormBlocker(form);
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ jsx(PencilSimpleLineIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "7BMaMX" })]
		}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				className: "grid gap-4 sm:grid-cols-2",
				onSubmit: form.handleSubmit(onSubmit),
				children: [/* @__PURE__ */ jsx(CertificationForm, {}), /* @__PURE__ */ jsxs(DialogFooter, {
					className: "sm:col-span-full",
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						onClick: requestClose,
						children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
					}), /* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: form.formState.isSubmitting,
						children: /* @__PURE__ */ jsx(Trans, { id: "IUwGEM" })
					})]
				})]
			})
		})]
	});
}
function CertificationForm() {
	const form = useFormContext();
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "title",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "MHrjPM" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "issuer",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "x2A79O" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "date",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "mYGY3B" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "website",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "On0aF2" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(URLInput, {
					...field,
					value: field.value,
					onChange: field.onChange,
					hideLabelButton: form.watch("options.showLinkInTitle")
				}) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "options.showLinkInTitle",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
				className: "flex items-center gap-x-2",
				children: [/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Switch$1, {
					checked: field.value,
					onCheckedChange: field.onChange
				}) }), /* @__PURE__ */ jsx(FormLabel, {
					className: "!mt-0",
					children: /* @__PURE__ */ jsx(Trans, { id: "vdCB9I" })
				})]
			})
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "description",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
				className: "sm:col-span-full",
				children: [
					/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "Nu4oKW" }) }),
					/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(RichInput, {
						...field,
						value: field.value,
						onChange: field.onChange
					}) }),
					/* @__PURE__ */ jsx(FormMessage, {})
				]
			})
		})
	] });
}
init_data();
init_string();
var formSchema$12 = coverLetterItemSchema;
function CreateCoverLetterDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema$12),
		defaultValues: {
			id: generateId$1(),
			hidden: data?.item?.hidden ?? false,
			recipient: data?.item?.recipient ?? "",
			content: data?.item?.content ?? ""
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (section) section.items.push(formData);
			}
		});
		closeDialog();
	};
	const { blockEvents, requestClose } = useFormBlocker(form);
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ jsx(PlusIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "8HGzbV" })]
		}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				className: "grid gap-4",
				onSubmit: form.handleSubmit(onSubmit),
				children: [/* @__PURE__ */ jsx(CoverLetterForm, {}), /* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(Button, {
					variant: "ghost",
					onClick: requestClose,
					children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
				}), /* @__PURE__ */ jsx(Button, {
					type: "submit",
					disabled: form.formState.isSubmitting,
					children: /* @__PURE__ */ jsx(Trans, { id: "hYgDIe" })
				})] })]
			})
		})]
	});
}
function UpdateCoverLetterDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema$12),
		defaultValues: {
			id: data.item.id,
			hidden: data.item.hidden,
			recipient: data.item.recipient,
			content: data.item.content
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (!section) return;
				const index = section.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) section.items[index] = formData;
			}
		});
		closeDialog();
	};
	const { blockEvents, requestClose } = useFormBlocker(form);
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ jsx(PencilSimpleLineIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "Fj52/O" })]
		}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				className: "grid gap-4",
				onSubmit: form.handleSubmit(onSubmit),
				children: [/* @__PURE__ */ jsx(CoverLetterForm, {}), /* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(Button, {
					variant: "ghost",
					onClick: requestClose,
					children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
				}), /* @__PURE__ */ jsx(Button, {
					type: "submit",
					disabled: form.formState.isSubmitting,
					children: /* @__PURE__ */ jsx(Trans, { id: "IUwGEM" })
				})] })]
			})
		})]
	});
}
function CoverLetterForm() {
	const form = useFormContext();
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(FormField, {
		control: form.control,
		name: "recipient",
		render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
			/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "I3QpvQ" }) }),
			/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(RichInput, {
				...field,
				value: field.value,
				onChange: field.onChange
			}) }),
			/* @__PURE__ */ jsx(FormMessage, {})
		] })
	}), /* @__PURE__ */ jsx(FormField, {
		control: form.control,
		name: "content",
		render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
			/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "4b3oEV" }) }),
			/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(RichInput, {
				...field,
				value: field.value,
				onChange: field.onChange
			}) }),
			/* @__PURE__ */ jsx(FormMessage, {})
		] })
	})] });
}
init_data();
init_string();
var formSchema$11 = customSectionSchema;
var SECTION_TYPE_OPTIONS = [
	{
		value: "summary",
		label: "Summary"
	},
	{
		value: "experience",
		label: "Experience"
	},
	{
		value: "education",
		label: "Education"
	},
	{
		value: "projects",
		label: "Projects"
	},
	{
		value: "profiles",
		label: "Profiles"
	},
	{
		value: "skills",
		label: "Skills"
	},
	{
		value: "languages",
		label: "Languages"
	},
	{
		value: "interests",
		label: "Interests"
	},
	{
		value: "awards",
		label: "Awards"
	},
	{
		value: "certifications",
		label: "Certifications"
	},
	{
		value: "publications",
		label: "Publications"
	},
	{
		value: "volunteer",
		label: "Volunteer"
	},
	{
		value: "references",
		label: "References"
	},
	{
		value: "cover-letter",
		label: "Cover Letter"
	}
];
function CreateCustomSectionDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema$11),
		defaultValues: {
			id: generateId$1(),
			title: data?.title ?? "",
			type: data?.type ?? "experience",
			columns: data?.columns ?? 1,
			hidden: data?.hidden ?? false,
			items: data?.items ?? []
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			draft.customSections.push(formData);
			const lastPageIndex = draft.metadata.layout.pages.length - 1;
			if (lastPageIndex < 0) return;
			draft.metadata.layout.pages[lastPageIndex].main.push(formData.id);
		});
		closeDialog();
	};
	const { blockEvents, requestClose } = useFormBlocker(form);
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ jsx(PlusIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "cIqpZO" })]
		}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				className: "grid gap-4 sm:grid-cols-2",
				onSubmit: form.handleSubmit(onSubmit),
				children: [/* @__PURE__ */ jsx(CustomSectionForm, {}), /* @__PURE__ */ jsxs(DialogFooter, {
					className: "sm:col-span-full",
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						onClick: requestClose,
						children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
					}), /* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: form.formState.isSubmitting,
						children: /* @__PURE__ */ jsx(Trans, { id: "hYgDIe" })
					})]
				})]
			})
		})]
	});
}
function UpdateCustomSectionDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema$11),
		defaultValues: {
			id: data.id,
			title: data.title,
			type: data.type,
			columns: data.columns,
			hidden: data.hidden,
			items: data.items
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			const index = draft.customSections.findIndex((item) => item.id === formData.id);
			if (index === -1) return;
			draft.customSections[index] = formData;
		});
		closeDialog();
	};
	const { blockEvents, requestClose } = useFormBlocker(form);
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ jsx(PencilSimpleLineIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "1nhf0G" })]
		}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				className: "grid gap-4 sm:grid-cols-2",
				onSubmit: form.handleSubmit(onSubmit),
				children: [/* @__PURE__ */ jsx(CustomSectionForm, { isUpdate: true }), /* @__PURE__ */ jsxs(DialogFooter, {
					className: "sm:col-span-full",
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						onClick: requestClose,
						children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
					}), /* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: form.formState.isSubmitting,
						children: /* @__PURE__ */ jsx(Trans, { id: "IUwGEM" })
					})]
				})]
			})
		})]
	});
}
function CustomSectionForm({ isUpdate = false }) {
	const form = useFormContext();
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(FormField, {
		control: form.control,
		name: "title",
		render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
			className: "sm:col-span-full",
			children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "MHrjPM" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			]
		})
	}), /* @__PURE__ */ jsx(FormField, {
		control: form.control,
		name: "type",
		render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
			className: "sm:col-span-full",
			children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "2IIOQ3" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx("select", {
					...field,
					disabled: isUpdate,
					className: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
					children: SECTION_TYPE_OPTIONS.map((option) => /* @__PURE__ */ jsx("option", {
						value: option.value,
						children: option.label
					}, option.value))
				}) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			]
		})
	})] });
}
init_data();
init_string();
var formSchema$10 = educationItemSchema;
function CreateEducationDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema$10),
		defaultValues: {
			id: generateId$1(),
			hidden: data?.item?.hidden ?? false,
			options: data?.item?.options ?? { showLinkInTitle: false },
			school: data?.item?.school ?? "",
			degree: data?.item?.degree ?? "",
			area: data?.item?.area ?? "",
			grade: data?.item?.grade ?? "",
			location: data?.item?.location ?? "",
			period: data?.item?.period ?? "",
			description: data?.item?.description ?? "",
			currentlyStudyingHere: data?.item?.currentlyStudyingHere ?? false,
			website: data?.item?.website ?? {
				url: "",
				label: ""
			}
		}
	});
	const onSubmit = (formData) => {
		console.log("Form submission triggered");
		console.log("Form data:", formData);
		console.log("Calling updateResumeData with:", formData);
		console.log("Form data passed to updateResumeData:", formData);
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (section) {
					console.log("Updating custom section:", section);
					section.items.push(formData);
				}
			} else {
				console.log("Adding to education section:", draft.sections.education.items);
				draft.sections.education.items.push(formData);
			}
		});
		console.log("Closing dialog");
		closeDialog();
	};
	const handleSubmit = form.handleSubmit(onSubmit);
	const { blockEvents, requestClose } = useFormBlocker(form);
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ jsx(PlusIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "dYLm0B" })]
		}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				className: "grid gap-4 sm:grid-cols-2",
				onSubmit: handleSubmit,
				children: [/* @__PURE__ */ jsx(EducationForm, {}), /* @__PURE__ */ jsxs(DialogFooter, {
					className: "sm:col-span-full",
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						onClick: requestClose,
						children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
					}), /* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: form.formState.isSubmitting,
						children: /* @__PURE__ */ jsx(Trans, { id: "hYgDIe" })
					})]
				})]
			})
		})]
	});
}
function UpdateEducationDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema$10),
		defaultValues: {
			id: data.item.id,
			hidden: data.item.hidden,
			options: data.item.options ?? { showLinkInTitle: false },
			school: data.item.school,
			degree: data.item.degree,
			area: data.item.area,
			grade: data.item.grade,
			location: data.item.location,
			period: data.item.period,
			description: data.item.description,
			currentlyStudyingHere: data.item.currentlyStudyingHere,
			website: data.item.website ?? {
				url: "",
				label: ""
			}
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (!section) return;
				const index = section.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) section.items[index] = formData;
			} else {
				const index = draft.sections.education.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) draft.sections.education.items[index] = formData;
			}
		});
		closeDialog();
	};
	const { blockEvents, requestClose } = useFormBlocker(form);
	console.log("Form errors:", form.formState.errors);
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ jsx(PencilSimpleLineIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "RkEr9m" })]
		}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				className: "grid gap-4 sm:grid-cols-2",
				onSubmit: form.handleSubmit(onSubmit),
				children: [/* @__PURE__ */ jsx(EducationForm, {}), /* @__PURE__ */ jsxs(DialogFooter, {
					className: "sm:col-span-full",
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						onClick: requestClose,
						children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
					}), /* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: form.formState.isSubmitting,
						onClick: () => console.log("Save Changes button clicked"),
						children: /* @__PURE__ */ jsx(Trans, { id: "IUwGEM" })
					})]
				})]
			})
		})]
	});
}
function EducationForm() {
	const form = useFormContext();
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "school",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "77D4QL" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "degree",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "DFxAFd" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "area",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "/1xbV1" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "grade",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "ZtKYrn" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "location",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "wJijgU" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "period",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "NtQvjo" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "currentlyStudyingHere",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
				className: "flex items-center gap-x-2",
				children: [/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Switch$1, {
					checked: field.value,
					onCheckedChange: field.onChange
				}) }), /* @__PURE__ */ jsx(FormLabel, {
					className: "mt-0!",
					children: /* @__PURE__ */ jsx(Trans, { id: "fdkDYO" })
				})]
			})
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "description",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
				className: "sm:col-span-full",
				children: [
					/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "Nu4oKW" }) }),
					/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(RichInput, {
						...field,
						value: field.value,
						onChange: field.onChange
					}) }),
					/* @__PURE__ */ jsx(FormMessage, {})
				]
			})
		})
	] });
}
init_string();
function AIGenerateButton({ resumeId, type, data, onGenerated, disabled, className, roundsUsed = 0, maxRounds = 2, isWordCountValid = true, onRoundComplete }) {
	const isMounted = useRef(true);
	const storeResumeId = useResumeStore((state) => state.resume.id);
	const effectiveResumeId = resumeId || storeResumeId;
	const { mutate: generateContent, isPending } = useMutation({ mutationFn: api.generateAIContent });
	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);
	const hasReachedLimit = roundsUsed >= maxRounds;
	const roundsRemaining = Math.max(0, maxRounds - roundsUsed);
	const isLoading = isPending;
	const handleGenerate = () => {
		if (isLoading) {
			console.log("Already generating, ignoring click");
			toast.info(i18n._({ id: "5p1zxA" }));
			return;
		}
		if (!isWordCountValid) {
			toast.error(i18n._({ id: "8X524Z" }));
			return;
		}
		if (hasReachedLimit) {
			toast.error(i18n._({
				id: "ZNBNRK",
				values: { maxRounds }
			}));
			return;
		}
		console.log("Starting generation for round:", roundsUsed + 1);
		const toastId = toast.loading(roundsUsed === 0 ? i18n._({ id: "0bnETv" }) : i18n._({
			id: "7+3cEb",
			values: {
				0: roundsUsed + 1,
				maxRounds
			}
		}));
		const apiType = type === "experience" ? "ExperienceDescription" : type === "projects" ? "ProjectsDescription" : type;
		const value = stripHtml(data.currentSummary || data.description || data.content || Object.values(data)[0] || "");
		if (!value.trim()) {
			toast.error(i18n._({ id: "ai.generate.error.empty" }), { id: toastId });
			return;
		}
		generateContent({
			resume_id: effectiveResumeId || "",
			type: apiType,
			value
		}, {
			onSuccess: (response) => {
				const content = Object.values(response)[0];
				console.log("Generation successful, content length:", content?.length);
				if (!content || content.length < 10) {
					toast.error(i18n._({ id: "+/7abN" }), { id: toastId });
					return;
				}
				toast.success(i18n._({ id: "L1azzd" }), { id: toastId });
				onGenerated(content);
				if (isMounted.current) {
					console.log("Recording round completion");
					onRoundComplete?.();
				}
			},
			onError: (error$1) => {
				console.error("Generation error:", error$1);
				toast.error(error$1.message || i18n._({ id: "J6+9df" }), { id: toastId });
			}
		});
	};
	const getButtonText = () => {
		if (isLoading) return i18n._({ id: "NOdFZR" });
		if (hasReachedLimit) return i18n._({ id: "Oy/cTY" });
		return i18n._({
			id: "qVlpQy",
			values: {
				0: roundsRemaining === 1 ? "round" : "rounds",
				roundsRemaining
			}
		});
	};
	return /* @__PURE__ */ jsxs(Button, {
		type: "button",
		size: "sm",
		variant: "outline",
		onClick: handleGenerate,
		disabled: disabled || isLoading || !isWordCountValid || hasReachedLimit,
		className: `flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 text-sm shadow-sm transition-all hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`,
		children: [
			/* @__PURE__ */ jsx("img", {
				src: "/zoe-talking.png",
				alt: "",
				className: "size-4"
			}),
			/* @__PURE__ */ jsx("span", { children: getButtonText() }),
			isLoading && /* @__PURE__ */ jsx("span", { className: "ml-1 h-3 w-3 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" })
		]
	});
}
init_data();
init_string();
var formSchema$9 = experienceItemSchema;
function CreateExperienceDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema$9),
		defaultValues: {
			id: generateId$1(),
			hidden: data?.item?.hidden ?? false,
			options: data?.item?.options ?? { showLinkInTitle: false },
			company: data?.item?.company ?? "",
			position: data?.item?.position ?? "",
			location: data?.item?.location ?? "",
			startDate: data?.item?.startDate ?? "",
			endDate: data?.item?.endDate ?? "",
			currentlyWorkingHere: data?.item?.currentlyWorkingHere ?? false,
			description: data?.item?.description ?? "",
			website: data?.item?.website ?? {
				url: "",
				label: ""
			},
			period: data?.item?.period ?? ""
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (section) section.items.push(formData);
				else console.error("Custom section not found for ID:", data.customSectionId);
			} else draft.sections.experience.items.push(formData);
		});
		closeDialog();
	};
	return /* @__PURE__ */ jsxs(DialogContent, { children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
		className: "flex items-center gap-x-2 text-base sm:text-lg",
		children: [/* @__PURE__ */ jsx(PlusIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "nQj0pC" })]
	}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
		...form,
		children: /* @__PURE__ */ jsxs("form", {
			className: "grid gap-4 sm:grid-cols-2",
			onSubmit: form.handleSubmit(onSubmit),
			children: [/* @__PURE__ */ jsx(ExperienceForm, {}), /* @__PURE__ */ jsxs(DialogFooter, {
				className: "grid grid-cols-2 gap-x-2 sm:col-span-full sm:flex sm:flex-row sm:justify-end",
				children: [/* @__PURE__ */ jsx(Button, {
					type: "submit",
					disabled: form.formState.isSubmitting,
					children: /* @__PURE__ */ jsx(Trans, { id: "hYgDIe" })
				}), /* @__PURE__ */ jsx(Button, {
					variant: "ghost",
					className: "border",
					onClick: closeDialog,
					children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
				})]
			})]
		})
	})] });
}
function UpdateExperienceDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema$9),
		defaultValues: {
			id: data.item.id,
			hidden: data.item.hidden,
			options: data.item.options ?? { showLinkInTitle: false },
			company: data.item.company,
			position: data.item.position,
			location: data.item.location,
			startDate: data.item.startDate ?? "",
			endDate: data.item.endDate ?? "",
			currentlyWorkingHere: data.item.currentlyWorkingHere ?? false,
			description: data.item.description,
			website: data.item.website ?? {
				url: "",
				label: ""
			},
			period: data?.item?.period ?? ""
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (!section) return;
				const index = section.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) section.items[index] = formData;
			} else {
				const index = draft.sections.experience.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) draft.sections.experience.items[index] = formData;
			}
		});
		closeDialog();
	};
	return /* @__PURE__ */ jsxs(DialogContent, { children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
		className: "flex items-center gap-x-2 text-base sm:text-lg",
		children: [/* @__PURE__ */ jsx(PencilSimpleLineIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "5JwNjE" })]
	}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
		...form,
		children: /* @__PURE__ */ jsxs("form", {
			className: "grid gap-4 sm:grid-cols-2",
			onSubmit: form.handleSubmit(onSubmit),
			children: [/* @__PURE__ */ jsx(ExperienceForm, {}), /* @__PURE__ */ jsxs(DialogFooter, {
				className: "grid grid-cols-2 gap-x-2 sm:col-span-full sm:flex sm:flex-row sm:justify-end",
				children: [/* @__PURE__ */ jsx(Button, {
					type: "submit",
					disabled: form.formState.isSubmitting,
					children: /* @__PURE__ */ jsx(Trans, { id: "IUwGEM" })
				}), /* @__PURE__ */ jsx(Button, {
					variant: "ghost",
					className: "border",
					onClick: closeDialog,
					children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
				})]
			})]
		})
	})] });
}
function ExperienceForm() {
	const form = useFormContext();
	const experienceId = form.getValues("id");
	const description$1 = useWatch({
		control: form.control,
		name: "description"
	});
	const previousDescriptionRef = useRef(description$1);
	const aiUpdateCountRef = useRef(0);
	const roundsUsed = useResumeStore((state) => state.experienceAIRoundsUsed?.[experienceId] ?? 0);
	const incrementRoundsUsed = useResumeStore((state) => state.incrementExperienceRounds);
	const resetRounds = useResumeStore((state) => state.resetExperienceRounds);
	const maxRounds = 2;
	useEffect(() => {
		if (aiUpdateCountRef.current > 0) {
			aiUpdateCountRef.current -= 1;
			previousDescriptionRef.current = description$1;
			return;
		}
		if (description$1 !== previousDescriptionRef.current) resetRounds(experienceId);
		previousDescriptionRef.current = description$1;
	}, [
		description$1,
		resetRounds,
		experienceId
	]);
	const isWordCountValid = (() => {
		if (typeof description$1 !== "string") return false;
		return description$1.trim().split(/\s+/).filter(Boolean).length >= 5;
	})();
	const { control } = form;
	const handleAIGenerated = (aiExperience) => {
		if (aiExperience && aiExperience.length > 10) {
			aiUpdateCountRef.current = 2;
			form.setValue("description", aiExperience, {
				shouldDirty: true,
				shouldValidate: true
			});
			incrementRoundsUsed(experienceId);
		}
	};
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx(FormField, {
			control,
			name: "company",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "7i8j3G" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control,
			name: "position",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "p/78dY" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control,
			name: "location",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "wJijgU" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control,
			name: "startDate",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "D3iCkb" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, {
					type: "date",
					...field
				}) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control,
			name: "endDate",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "VFv2ZC" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, {
					type: "date",
					...field,
					disabled: form.watch("currentlyWorkingHere")
				}) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control,
			name: "currentlyWorkingHere",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
				className: "flex items-center gap-x-2",
				children: [/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Switch$1, {
					checked: field.value,
					onCheckedChange: field.onChange
				}) }), /* @__PURE__ */ jsx(FormLabel, {
					className: "mt-0!",
					children: /* @__PURE__ */ jsx(Trans, { id: "af+jpI" })
				})]
			})
		}),
		/* @__PURE__ */ jsx(FormField, {
			control,
			name: "description",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
				className: "sm:col-span-full",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-row items-center justify-between",
						children: [/* @__PURE__ */ jsx(FormLabel, {
							className: "text-xs sm:text-base",
							children: "Description"
						}), /* @__PURE__ */ jsx(AIGenerateButton, {
							resumeId: useResumeStore.getState().resume.id,
							type: "experience",
							data: {
								company: form.getValues("company"),
								position: form.getValues("position"),
								description: description$1
							},
							onGenerated: handleAIGenerated,
							roundsUsed,
							maxRounds,
							isWordCountValid,
							disabled: roundsUsed >= maxRounds || !isWordCountValid,
							className: "scale-85 sm:scale-100"
						})]
					}),
					/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(RichInput, {
						...field,
						value: field.value || "",
						onChange: field.onChange
					}) }),
					!isWordCountValid && field.value && field.value.trim().split(/\s+/).filter(Boolean).length < 5 && /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-amber-600 text-xs",
						children: /* @__PURE__ */ jsx(Trans, { id: "gtScT1" })
					}),
					roundsUsed === 1 && /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-blue-600 text-xs",
						children: /* @__PURE__ */ jsx(Trans, { id: "zD7gzh" })
					}),
					roundsUsed >= maxRounds && /* @__PURE__ */ jsx("p", {
						className: "mt-1 font-medium text-red-600 text-xs",
						children: /* @__PURE__ */ jsx(Trans, { id: "S6A43c" })
					}),
					/* @__PURE__ */ jsx(FormMessage, {})
				]
			})
		})
	] });
}
var RETURN_KEY = "Enter";
var COMMA_KEY = ",";
function ChipItem({ chip, index, isEditing, onEdit, onRemove }) {
	const controls = useDragControls();
	const [isHovered, setIsHovered] = React.useState(false);
	return /* @__PURE__ */ jsx(Reorder.Item, {
		value: chip,
		dragListener: false,
		dragControls: controls,
		initial: {
			opacity: 1,
			scale: .9
		},
		animate: {
			opacity: 1,
			scale: 1
		},
		exit: {
			opacity: 0,
			scale: .9
		},
		className: "relative",
		onMouseEnter: () => setIsHovered(true),
		onMouseLeave: () => setIsHovered(false),
		children: /* @__PURE__ */ jsxs(Badge, {
			variant: "outline",
			className: cn("flex h-7 cursor-grab select-none items-center gap-0 overflow-hidden px-3 active:cursor-grabbing", isEditing && "border-primary ring-1 ring-primary"),
			onPointerDown: (e) => {
				e.preventDefault();
				controls.start(e);
			},
			children: [/* @__PURE__ */ jsx("span", {
				className: "max-w-32 truncate",
				children: chip
			}), /* @__PURE__ */ jsxs(motion.div, {
				initial: false,
				animate: {
					width: isHovered ? 40 : 0,
					marginInlineStart: isHovered ? 8 : 0,
					opacity: isHovered ? 1 : 0
				},
				transition: {
					duration: .15,
					ease: "linear"
				},
				className: "flex shrink-0 items-center gap-x-1 overflow-hidden",
				children: [/* @__PURE__ */ jsx("button", {
					type: "button",
					tabIndex: -1,
					"aria-label": `Edit ${chip}`,
					onClick: (e) => {
						e.stopPropagation();
						onEdit(index);
					},
					className: "rounded-sm p-0.5 hover:bg-secondary hover:text-foreground focus:outline-none",
					children: /* @__PURE__ */ jsx(PencilSimpleIcon, { className: "size-3.5" })
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					tabIndex: -1,
					"aria-label": `Remove ${chip}`,
					onClick: (e) => {
						e.stopPropagation();
						onRemove(index);
					},
					className: "rounded-sm p-0.5 hover:bg-destructive/10 hover:text-destructive focus:outline-none",
					children: /* @__PURE__ */ jsx(XIcon, { className: "size-3.5" })
				})]
			})]
		})
	});
}
function ChipInput({ value, defaultValue = [], onChange, className, ...props }) {
	const [chips, setChips] = useControlledState({
		value,
		defaultValue,
		onChange
	});
	const [input, setInput] = React.useState("");
	const [editingIndex, setEditingIndex] = React.useState(null);
	const inputRef = React.useRef(null);
	const addChip = React.useCallback((chip) => {
		const trimmed = chip.trim();
		if (!trimmed) return;
		setChips(Array.from(new Set([...chips, trimmed])));
	}, [chips, setChips]);
	const updateChip = React.useCallback((index, newValue) => {
		const trimmed = newValue.trim();
		if (!trimmed || index < 0 || index >= chips.length) return;
		if (chips.findIndex((c, i) => c === trimmed && i !== index) !== -1) return;
		const newChips = [...chips];
		newChips[index] = trimmed;
		setChips(newChips);
	}, [chips, setChips]);
	const removeChip = React.useCallback((index) => {
		if (index < 0 || index >= chips.length) return;
		setChips(chips.slice(0, index).concat(chips.slice(index + 1)));
		if (editingIndex === index) {
			setEditingIndex(null);
			setInput("");
		} else if (editingIndex !== null && editingIndex > index) setEditingIndex(editingIndex - 1);
	}, [
		chips,
		setChips,
		editingIndex
	]);
	const handleEdit = React.useCallback((index) => {
		setEditingIndex(index);
		setInput(chips[index]);
		inputRef.current?.focus();
	}, [chips]);
	const handleReorder = React.useCallback((newOrder) => {
		if (editingIndex !== null) {
			const editingChip = chips[editingIndex];
			const newIndex = newOrder.indexOf(editingChip);
			if (newIndex !== -1 && newIndex !== editingIndex) setEditingIndex(newIndex);
		}
		setChips(newOrder);
	}, [
		chips,
		editingIndex,
		setChips
	]);
	const handleInputChange = React.useCallback((e) => {
		const newValue = e.target.value;
		if (editingIndex !== null) {
			if (newValue.includes(",")) {
				updateChip(editingIndex, newValue.replace(",", ""));
				setEditingIndex(null);
				setInput("");
			} else setInput(newValue);
			return;
		}
		if (newValue.includes(",")) {
			const parts = newValue.split(",");
			parts.slice(0, -1).forEach(addChip);
			setInput(parts[parts.length - 1]);
		} else setInput(newValue);
	}, [
		addChip,
		editingIndex,
		updateChip
	]);
	const handleKeyDown = React.useCallback((e) => {
		if (e.key === "Enter" || e.key === ",") {
			e.preventDefault();
			if (editingIndex !== null) {
				if (input.trim()) updateChip(editingIndex, input);
				setEditingIndex(null);
				setInput("");
			} else if (input.trim()) {
				addChip(input);
				setInput("");
			}
		} else if (e.key === "Escape" && editingIndex !== null) {
			setEditingIndex(null);
			setInput("");
		}
	}, [
		input,
		addChip,
		editingIndex,
		updateChip
	]);
	return /* @__PURE__ */ jsxs("div", {
		className: cn("flex flex-col gap-2", className),
		...props,
		children: [chips.length > 0 && /* @__PURE__ */ jsx(Reorder.Group, {
			axis: "x",
			values: chips,
			onReorder: handleReorder,
			className: "flex flex-wrap gap-1.5",
			children: chips.map((chip, idx) => /* @__PURE__ */ jsx(ChipItem, {
				chip,
				index: idx,
				isEditing: editingIndex === idx,
				onEdit: handleEdit,
				onRemove: removeChip
			}, `${chip}-${idx}`))
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col gap-2",
			children: [/* @__PURE__ */ jsx(Input, {
				ref: inputRef,
				type: "text",
				value: input,
				autoComplete: "off",
				"aria-label": editingIndex !== null ? "Edit keyword" : "Add keyword",
				placeholder: editingIndex !== null ? "Editing keyword..." : "Add a keyword...",
				onKeyDown: handleKeyDown,
				onChange: handleInputChange
			}), /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground text-xs",
				children: /* @__PURE__ */ jsx(Trans, {
					id: "GNdJKu",
					values: {
						RETURN_KEY,
						COMMA_KEY
					},
					components: {
						0: /* @__PURE__ */ jsx(Kbd, {}),
						1: /* @__PURE__ */ jsx(Kbd, {})
					}
				})
			})]
		})]
	});
}
init_data();
init_string();
var formSchema$8 = interestItemSchema;
function CreateInterestDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema$8),
		defaultValues: {
			id: generateId$1(),
			hidden: data?.item?.hidden ?? false,
			icon: data?.item?.icon ?? "acorn",
			name: data?.item?.name ?? "",
			keywords: data?.item?.keywords ?? []
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (section) section.items.push(formData);
			} else draft.sections.interests.items.push(formData);
		});
		closeDialog();
	};
	const { blockEvents, requestClose } = useFormBlocker(form);
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ jsx(PlusIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "7CeRuK" })]
		}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				className: "grid gap-4 sm:grid-cols-2",
				onSubmit: form.handleSubmit(onSubmit),
				children: [/* @__PURE__ */ jsx(InterestForm, {}), /* @__PURE__ */ jsxs(DialogFooter, {
					className: "sm:col-span-full",
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						onClick: requestClose,
						children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
					}), /* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: form.formState.isSubmitting,
						children: /* @__PURE__ */ jsx(Trans, { id: "hYgDIe" })
					})]
				})]
			})
		})]
	});
}
function UpdateInterestDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema$8),
		defaultValues: {
			id: data.item.id,
			hidden: data.item.hidden,
			icon: data.item.icon,
			name: data.item.name,
			keywords: data.item.keywords
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (!section) return;
				const index = section.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) section.items[index] = formData;
			} else {
				const index = draft.sections.interests.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) draft.sections.interests.items[index] = formData;
			}
		});
		closeDialog();
	};
	const { blockEvents, requestClose } = useFormBlocker(form);
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ jsx(PencilSimpleLineIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "69J3xt" })]
		}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				className: "grid gap-4 sm:grid-cols-2",
				onSubmit: form.handleSubmit(onSubmit),
				children: [/* @__PURE__ */ jsx(InterestForm, {}), /* @__PURE__ */ jsxs(DialogFooter, {
					className: "sm:col-span-full",
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						onClick: requestClose,
						children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
					}), /* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: form.formState.isSubmitting,
						children: /* @__PURE__ */ jsx(Trans, { id: "IUwGEM" })
					})]
				})]
			})
		})]
	});
}
function InterestForm() {
	const form = useFormContext();
	const nameState = useFormState({
		control: form.control,
		name: "name"
	});
	const isNameInvalid = useMemo(() => {
		return nameState.errors && Object.keys(nameState.errors).length > 0;
	}, [nameState]);
	const predefinedInterests = [
		"Music",
		"Travel",
		"Photography",
		"Reading",
		"Writing",
		"Cooking",
		"Sports",
		"Gaming",
		"Art",
		"Volunteering",
		"Fitness",
		"Technology",
		"Movies",
		"Gardening",
		"Dancing",
		"Crafts",
		"Hiking",
		"Yoga",
		"Blogging",
		"Chess"
	];
	const handleAddInterestChip = (interest) => {
		form.setValue("name", interest);
		form.clearErrors("name");
	};
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx("div", {
			className: "col-span-full mb-2 flex flex-wrap gap-2",
			children: predefinedInterests.map((interest) => /* @__PURE__ */ jsx("button", {
				type: "button",
				className: cn("cursor-pointer rounded-full border px-3 py-1 text-xs hover:bg-primary/10", form.watch("name") === interest && "border-primary bg-primary text-white"),
				onClick: () => handleAddInterestChip(interest),
				children: interest
			}, interest))
		}),
		/* @__PURE__ */ jsxs("div", {
			className: cn("col-span-full flex items-end", isNameInvalid && "items-center"),
			children: [/* @__PURE__ */ jsx(FormField, {
				control: form.control,
				name: "icon",
				render: ({ field }) => /* @__PURE__ */ jsx(FormItem, {
					className: "shrink-0",
					children: /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(IconPicker, {
						...field,
						popoverProps: { modal: true },
						className: "rounded-r-none! border-e-0!"
					}) })
				})
			}), /* @__PURE__ */ jsx(FormField, {
				control: form.control,
				name: "name",
				render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
					className: "flex-1",
					children: [
						/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "6YtxFj" }) }),
						/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, {
							className: "rounded-l-none!",
							...field
						}) }),
						/* @__PURE__ */ jsx(FormMessage, {})
					]
				})
			})]
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "keywords",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
				className: "col-span-full",
				children: [
					/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "/n/HCO" }) }),
					/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(ChipInput, { ...field }) }),
					/* @__PURE__ */ jsx(FormMessage, {})
				]
			})
		})
	] });
}
function Slider$1({ className, defaultValue, value, min = 0, max = 100, ...props }) {
	const _values = React.useMemo(() => Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max], [
		value,
		defaultValue,
		min,
		max
	]);
	return /* @__PURE__ */ jsxs(Slider.Root, {
		"data-slot": "slider",
		defaultValue,
		value,
		min,
		max,
		className: cn("relative flex w-full touch-none select-none items-center data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col data-disabled:opacity-50", className),
		...props,
		children: [/* @__PURE__ */ jsx(Slider.Track, {
			"data-slot": "slider-track",
			className: "relative grow overflow-hidden rounded-full bg-muted data-horizontal:h-1.5 data-vertical:h-full data-horizontal:w-full data-vertical:w-1.5",
			children: /* @__PURE__ */ jsx(Slider.Range, {
				"data-slot": "slider-range",
				className: "absolute select-none bg-primary data-horizontal:h-full data-vertical:w-full"
			})
		}), Array.from({ length: _values.length }, (_, index) => /* @__PURE__ */ jsx(Slider.Thumb, {
			"data-slot": "slider-thumb",
			className: "block size-4 shrink-0 select-none rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:outline-hidden focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50"
		}, index))]
	});
}
init_data();
init_string();
var formSchema$7 = languageItemSchema;
function CreateLanguageDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema$7),
		defaultValues: {
			id: generateId$1(),
			hidden: data?.item?.hidden ?? false,
			language: data?.item?.language ?? "",
			fluency: data?.item?.fluency ?? "",
			level: data?.item?.level ?? 0
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (section) section.items.push(formData);
			} else draft.sections.languages.items.push(formData);
		});
		closeDialog();
	};
	const { blockEvents, requestClose } = useFormBlocker(form);
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ jsx(PlusIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "bo35J6" })]
		}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				className: "grid gap-4 sm:grid-cols-2",
				onSubmit: form.handleSubmit(onSubmit),
				children: [/* @__PURE__ */ jsx(LanguageForm, {}), /* @__PURE__ */ jsxs(DialogFooter, {
					className: "sm:col-span-full",
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						onClick: requestClose,
						children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
					}), /* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: form.formState.isSubmitting,
						children: /* @__PURE__ */ jsx(Trans, { id: "hYgDIe" })
					})]
				})]
			})
		})]
	});
}
function UpdateLanguageDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema$7),
		defaultValues: {
			id: data.item.id,
			hidden: data.item.hidden,
			language: data.item.language,
			fluency: data.item.fluency,
			level: data.item.level
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (!section) return;
				const index = section.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) section.items[index] = formData;
			} else {
				const index = draft.sections.languages.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) draft.sections.languages.items[index] = formData;
			}
		});
		closeDialog();
	};
	const { blockEvents, requestClose } = useFormBlocker(form);
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ jsx(PencilSimpleLineIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "5AbKSS" })]
		}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				className: "grid gap-4 sm:grid-cols-2",
				onSubmit: form.handleSubmit(onSubmit),
				children: [/* @__PURE__ */ jsx(LanguageForm, {}), /* @__PURE__ */ jsxs(DialogFooter, {
					className: "sm:col-span-full",
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						onClick: requestClose,
						children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
					}), /* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: form.formState.isSubmitting,
						children: /* @__PURE__ */ jsx(Trans, { id: "IUwGEM" })
					})]
				})]
			})
		})]
	});
}
function LanguageForm() {
	const form = useFormContext();
	const predefinedLanguages = [
		"English",
		"Hindi",
		"Bengali",
		"Telugu",
		"Marathi",
		"Tamil",
		"Gujarati",
		"Urdu",
		"Kannada",
		"Malayalam",
		"Odia",
		"Punjabi",
		"Assamese",
		"Sanskrit",
		"Spanish",
		"French",
		"German",
		"Mandarin",
		"Arabic",
		"Portuguese",
		"Russian",
		"Japanese",
		"Italian",
		"Korean"
	];
	const fluencyOptions = [
		{
			value: "Basic",
			label: "Basic"
		},
		{
			value: "Conversational",
			label: "Conversational"
		},
		{
			value: "Fluent",
			label: "Fluent"
		},
		{
			value: "Native",
			label: "Native"
		}
	];
	const handleAddLanguageChip = (lang) => {
		form.setValue("language", lang);
		form.clearErrors("language");
	};
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx("div", {
			className: "col-span-full mb-2 flex flex-wrap gap-2",
			children: predefinedLanguages.map((lang) => /* @__PURE__ */ jsx("button", {
				type: "button",
				className: cn("cursor-pointer rounded-full border px-3 py-1 text-xs hover:bg-primary/10", form.watch("language") === lang && "border-primary bg-primary text-white"),
				onClick: () => handleAddLanguageChip(lang),
				children: lang
			}, lang))
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "language",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "vXIe7J" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "fluency",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "VELj6Q" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsxs("select", {
					className: "w-full rounded border px-2 py-1",
					value: field.value || "",
					onChange: (e) => field.onChange(e.target.value),
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "Select fluency"
					}), fluencyOptions.map((option) => /* @__PURE__ */ jsx("option", {
						value: option.value,
						children: option.label
					}, option.value))]
				}) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "level",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
				className: "gap-4 sm:col-span-full",
				children: [
					/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "oCHfGC" }) }),
					/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Slider$1, {
						min: 0,
						max: 5,
						step: 1,
						value: [field.value],
						onValueChange: (value) => field.onChange(value[0])
					}) }),
					/* @__PURE__ */ jsx(FormMessage, {}),
					/* @__PURE__ */ jsx(FormDescription, { children: Number(field.value) === 0 ? i18n._({ id: "D+zLDD" }) : `${field.value} / 5` })
				]
			})
		})
	] });
}
init_data();
init_string();
var formSchema$6 = profileItemSchema;
function CreateProfileDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema$6),
		defaultValues: {
			id: generateId$1(),
			hidden: data?.item?.hidden ?? false,
			options: data?.item?.options ?? { showLinkInTitle: false },
			icon: data?.item?.icon ?? "acorn",
			network: data?.item?.network ?? "",
			username: data?.item?.username ?? "",
			website: data?.item?.website ?? {
				url: "",
				label: ""
			}
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (section) section.items.push(formData);
			} else draft.sections.profiles.items.push(formData);
		});
		closeDialog();
	};
	const { blockEvents, requestClose } = useFormBlocker(form);
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ jsx(PlusIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "n2Ez/o" })]
		}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				className: "grid gap-4 sm:grid-cols-2",
				onSubmit: form.handleSubmit(onSubmit),
				children: [/* @__PURE__ */ jsx(ProfileForm, {}), /* @__PURE__ */ jsxs(DialogFooter, {
					className: "sm:col-span-full",
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						onClick: requestClose,
						children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
					}), /* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: form.formState.isSubmitting,
						children: /* @__PURE__ */ jsx(Trans, { id: "hYgDIe" })
					})]
				})]
			})
		})]
	});
}
function UpdateProfileDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema$6),
		defaultValues: {
			id: data.item.id,
			hidden: data.item.hidden,
			options: data.item.options ?? { showLinkInTitle: false },
			icon: data.item.icon,
			network: data.item.network,
			username: data.item.username,
			website: data.item.website
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (!section) return;
				const index = section.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) section.items[index] = formData;
			} else {
				const index = draft.sections.profiles.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) draft.sections.profiles.items[index] = formData;
			}
		});
		closeDialog();
	};
	const { blockEvents, requestClose } = useFormBlocker(form);
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ jsx(PencilSimpleLineIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "SsCM64" })]
		}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				className: "grid gap-4 sm:grid-cols-2",
				onSubmit: form.handleSubmit(onSubmit),
				children: [/* @__PURE__ */ jsx(ProfileForm, {}), /* @__PURE__ */ jsxs(DialogFooter, {
					className: "sm:col-span-full",
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						onClick: requestClose,
						children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
					}), /* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: form.formState.isSubmitting,
						children: /* @__PURE__ */ jsx(Trans, { id: "IUwGEM" })
					})]
				})]
			})
		})]
	});
}
function ProfileForm() {
	const form = useFormContext();
	const networkState = useFormState({
		control: form.control,
		name: "network"
	});
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsxs("div", {
			className: cn("flex items-end", useMemo(() => {
				return networkState.errors && Object.keys(networkState.errors).length > 0;
			}, [networkState]) && "items-center"),
			children: [/* @__PURE__ */ jsx(FormField, {
				control: form.control,
				name: "icon",
				render: ({ field }) => /* @__PURE__ */ jsx(FormItem, {
					className: "shrink-0",
					children: /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(IconPicker, {
						...field,
						popoverProps: { modal: true },
						className: "rounded-r-none! border-e-0!"
					}) })
				})
			}), /* @__PURE__ */ jsx(FormField, {
				control: form.control,
				name: "network",
				render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
					className: "flex-1",
					children: [
						/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "OR475H" }) }),
						/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, {
							className: "rounded-l-none!",
							...field
						}) }),
						/* @__PURE__ */ jsx(FormMessage, {})
					]
				})
			})]
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "username",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "7sNhEz" }) }),
				/* @__PURE__ */ jsxs(InputGroup, { children: [/* @__PURE__ */ jsx(InputGroupAddon, {
					align: "inline-start",
					children: /* @__PURE__ */ jsx(InputGroupText, { children: /* @__PURE__ */ jsx(AtIcon, {}) })
				}), /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(InputGroupInput, { ...field }) })] }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "website",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
				className: "sm:col-span-full",
				children: [
					/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "On0aF2" }) }),
					/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(URLInput, {
						...field,
						value: field.value,
						onChange: field.onChange,
						hideLabelButton: form.watch("options.showLinkInTitle")
					}) }),
					/* @__PURE__ */ jsx(FormMessage, {})
				]
			})
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "options.showLinkInTitle",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
				className: "flex items-center gap-x-2 sm:col-span-full",
				children: [/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Switch$1, {
					checked: field.value,
					onCheckedChange: field.onChange
				}) }), /* @__PURE__ */ jsx(FormLabel, {
					className: "!mt-0",
					children: /* @__PURE__ */ jsx(Trans, { id: "vdCB9I" })
				})]
			})
		})
	] });
}
init_data();
init_string();
var formSchema$5 = projectItemSchema;
function CreateProjectDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema$5),
		defaultValues: {
			id: generateId$1(),
			hidden: data?.item?.hidden ?? false,
			options: data?.item?.options ?? { showLinkInTitle: false },
			name: data?.item?.name ?? "",
			period: data?.item?.period ?? "",
			website: data?.item?.website ?? {
				url: "",
				label: ""
			},
			description: data?.item?.description ?? ""
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (section) section.items.push(formData);
			} else draft.sections.projects.items.push(formData);
		});
		closeDialog();
	};
	return /* @__PURE__ */ jsxs(DialogContent, { children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
		className: "flex items-center gap-x-2 text-base sm:text-lg",
		children: [/* @__PURE__ */ jsx(PlusIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "HSIqMX" })]
	}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
		...form,
		children: /* @__PURE__ */ jsxs("form", {
			className: "grid gap-4 sm:grid-cols-2",
			onSubmit: form.handleSubmit(onSubmit),
			children: [/* @__PURE__ */ jsx(ProjectForm, {}), /* @__PURE__ */ jsxs(DialogFooter, {
				className: "grid grid-cols-2 gap-x-2 sm:col-span-full sm:flex sm:flex-row sm:justify-end",
				children: [/* @__PURE__ */ jsx(Button, {
					type: "submit",
					disabled: form.formState.isSubmitting,
					children: /* @__PURE__ */ jsx(Trans, { id: "hYgDIe" })
				}), /* @__PURE__ */ jsx(Button, {
					variant: "ghost",
					className: "border",
					onClick: closeDialog,
					children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
				})]
			})]
		})
	})] });
}
function UpdateProjectDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema$5),
		defaultValues: {
			id: data.item.id,
			hidden: data.item.hidden,
			options: data.item.options ?? { showLinkInTitle: false },
			name: data.item.name,
			period: data.item.period,
			website: data.item.website,
			description: data.item.description
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (!section) return;
				const index = section.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) section.items[index] = formData;
			} else {
				const index = draft.sections.projects.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) draft.sections.projects.items[index] = formData;
			}
		});
		closeDialog();
	};
	return /* @__PURE__ */ jsxs(DialogContent, { children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
		className: "flex items-center gap-x-2 text-base sm:text-lg",
		children: [/* @__PURE__ */ jsx(PencilSimpleLineIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "XQDpTj" })]
	}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
		...form,
		children: /* @__PURE__ */ jsxs("form", {
			className: "grid gap-4 sm:grid-cols-2",
			onSubmit: form.handleSubmit(onSubmit),
			children: [/* @__PURE__ */ jsx(ProjectForm, {}), /* @__PURE__ */ jsxs(DialogFooter, {
				className: "grid grid-cols-2 gap-x-2 sm:col-span-full sm:flex sm:flex-row sm:justify-end",
				children: [/* @__PURE__ */ jsx(Button, {
					type: "submit",
					disabled: form.formState.isSubmitting,
					children: /* @__PURE__ */ jsx(Trans, { id: "IUwGEM" })
				}), /* @__PURE__ */ jsx(Button, {
					variant: "ghost",
					className: "border",
					onClick: closeDialog,
					children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
				})]
			})]
		})
	})] });
}
function ProjectForm() {
	const form = useFormContext();
	const { control } = form;
	const name = useWatch({
		control,
		name: "name"
	});
	const description$1 = useWatch({
		control,
		name: "description"
	});
	const isWordCountValid = typeof description$1 === "string" && description$1.trim().split(/\s+/).filter(Boolean).length >= 5;
	const projectId = form.getValues("id");
	const aiUpdateCountRef = useRef(0);
	const roundsUsed = useResumeStore((state) => state.projectAIRoundsUsed?.[projectId] ?? 0);
	const incrementRoundsUsed = useResumeStore((state) => state.incrementProjectRounds);
	const resetRounds = useResumeStore((state) => state.resetProjectRounds);
	const maxRounds = 2;
	const previousDescriptionRef = useRef(description$1);
	useEffect(() => {
		if (aiUpdateCountRef.current > 0) {
			aiUpdateCountRef.current -= 1;
			previousDescriptionRef.current = description$1;
			return;
		}
		if (description$1 !== previousDescriptionRef.current) resetRounds(projectId);
		previousDescriptionRef.current = description$1;
	}, [
		description$1,
		projectId,
		resetRounds
	]);
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx(FormField, {
			control,
			name: "name",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "6YtxFj" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control,
			name: "period",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "NtQvjo" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control,
			name: "website",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
				className: "sm:col-span-full",
				children: [
					/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "On0aF2" }) }),
					/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(URLInput, {
						...field,
						value: field.value,
						onChange: field.onChange,
						hideLabelButton: form.watch("options.showLinkInTitle")
					}) }),
					/* @__PURE__ */ jsx(FormMessage, {})
				]
			})
		}),
		/* @__PURE__ */ jsx(FormField, {
			control,
			name: "options.showLinkInTitle",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
				className: "flex items-center gap-x-2 sm:col-span-full",
				children: [/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Switch$1, {
					checked: field.value,
					onCheckedChange: field.onChange
				}) }), /* @__PURE__ */ jsx(FormLabel, {
					className: "mt-0!",
					children: /* @__PURE__ */ jsx(Trans, { id: "vdCB9I" })
				})]
			})
		}),
		/* @__PURE__ */ jsx(FormField, {
			control,
			name: "description",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
				className: "sm:col-span-full",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-row items-center justify-between",
						children: [/* @__PURE__ */ jsx(FormLabel, {
							className: "text-xs sm:text-base",
							children: "Description"
						}), /* @__PURE__ */ jsx(AIGenerateButton, {
							type: "projects",
							data: {
								name,
								technologies: "",
								description: field.value,
								highlights: ""
							},
							onGenerated: (content) => {
								aiUpdateCountRef.current = 2;
								form.setValue("description", content, { shouldDirty: true });
								incrementRoundsUsed(projectId);
							},
							roundsUsed,
							maxRounds,
							isWordCountValid,
							disabled: roundsUsed >= maxRounds || !isWordCountValid,
							className: "scale-85 sm:scale-100"
						})]
					}),
					/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(RichInput, {
						...field,
						value: field.value,
						onChange: field.onChange
					}) }),
					!isWordCountValid && field.value && field.value.trim().split(/\s+/).filter(Boolean).length < 5 && /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-amber-600 text-xs",
						children: /* @__PURE__ */ jsx(Trans, { id: "gtScT1" })
					}),
					roundsUsed === 1 && /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-blue-600 text-xs",
						children: /* @__PURE__ */ jsx(Trans, { id: "zD7gzh" })
					}),
					roundsUsed >= maxRounds && /* @__PURE__ */ jsx("p", {
						className: "mt-1 font-medium text-red-600 text-xs",
						children: /* @__PURE__ */ jsx(Trans, { id: "S6A43c" })
					}),
					/* @__PURE__ */ jsx(FormMessage, {})
				]
			})
		})
	] });
}
init_data();
init_string();
var formSchema$4 = publicationItemSchema;
function CreatePublicationDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema$4),
		defaultValues: {
			id: generateId$1(),
			hidden: data?.item?.hidden ?? false,
			options: data?.item?.options ?? { showLinkInTitle: false },
			title: data?.item?.title ?? "",
			publisher: data?.item?.publisher ?? "",
			date: data?.item?.date ?? "",
			website: data?.item?.website ?? {
				url: "",
				label: ""
			},
			description: data?.item?.description ?? ""
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (section) section.items.push(formData);
			} else draft.sections.publications.items.push(formData);
		});
		closeDialog();
	};
	const { blockEvents, requestClose } = useFormBlocker(form);
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ jsx(PlusIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "M5ssIO" })]
		}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				className: "grid gap-4 sm:grid-cols-2",
				onSubmit: form.handleSubmit(onSubmit),
				children: [/* @__PURE__ */ jsx(PublicationForm, {}), /* @__PURE__ */ jsxs(DialogFooter, {
					className: "sm:col-span-full",
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						onClick: requestClose,
						children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
					}), /* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: form.formState.isSubmitting,
						children: /* @__PURE__ */ jsx(Trans, { id: "hYgDIe" })
					})]
				})]
			})
		})]
	});
}
function UpdatePublicationDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema$4),
		defaultValues: {
			id: data.item.id,
			hidden: data.item.hidden,
			options: data.item.options ?? { showLinkInTitle: false },
			title: data.item.title,
			publisher: data.item.publisher,
			date: data.item.date,
			website: data.item.website,
			description: data.item.description
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (!section) return;
				const index = section.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) section.items[index] = formData;
			} else {
				const index = draft.sections.publications.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) draft.sections.publications.items[index] = formData;
			}
		});
		closeDialog();
	};
	const { blockEvents, requestClose } = useFormBlocker(form);
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ jsx(PencilSimpleLineIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "wpFMlV" })]
		}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				className: "grid gap-4 sm:grid-cols-2",
				onSubmit: form.handleSubmit(onSubmit),
				children: [/* @__PURE__ */ jsx(PublicationForm, {}), /* @__PURE__ */ jsxs(DialogFooter, {
					className: "sm:col-span-full",
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						onClick: requestClose,
						children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
					}), /* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: form.formState.isSubmitting,
						children: /* @__PURE__ */ jsx(Trans, { id: "IUwGEM" })
					})]
				})]
			})
		})]
	});
}
function PublicationForm() {
	const form = useFormContext();
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "title",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "MHrjPM" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "publisher",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "/+NDbp" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "date",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "mYGY3B" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "website",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "On0aF2" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(URLInput, {
					...field,
					value: field.value,
					onChange: field.onChange,
					hideLabelButton: form.watch("options.showLinkInTitle")
				}) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "options.showLinkInTitle",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
				className: "flex items-center gap-x-2",
				children: [/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Switch$1, {
					checked: field.value,
					onCheckedChange: field.onChange
				}) }), /* @__PURE__ */ jsx(FormLabel, {
					className: "!mt-0",
					children: /* @__PURE__ */ jsx(Trans, { id: "vdCB9I" })
				})]
			})
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "description",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
				className: "sm:col-span-full",
				children: [
					/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "Nu4oKW" }) }),
					/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(RichInput, {
						...field,
						value: field.value,
						onChange: field.onChange
					}) }),
					/* @__PURE__ */ jsx(FormMessage, {})
				]
			})
		})
	] });
}
init_data();
init_string();
var formSchema$3 = referenceItemSchema;
function CreateReferenceDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema$3),
		defaultValues: {
			id: generateId$1(),
			hidden: data?.item?.hidden ?? false,
			options: data?.item?.options ?? { showLinkInTitle: false },
			name: data?.item?.name ?? "",
			position: data?.item?.position ?? "",
			website: data?.item?.website ?? {
				url: "",
				label: ""
			},
			phone: data?.item?.phone ?? "",
			description: data?.item?.description ?? ""
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (section) section.items.push(formData);
			} else draft.sections.references.items.push(formData);
		});
		closeDialog();
	};
	const { blockEvents, requestClose } = useFormBlocker(form);
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ jsx(PlusIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "7q6Gyw" })]
		}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				className: "grid gap-4 sm:grid-cols-2",
				onSubmit: form.handleSubmit(onSubmit),
				children: [/* @__PURE__ */ jsx(ReferenceForm, {}), /* @__PURE__ */ jsxs(DialogFooter, {
					className: "sm:col-span-full",
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						onClick: requestClose,
						children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
					}), /* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: form.formState.isSubmitting,
						children: /* @__PURE__ */ jsx(Trans, { id: "hYgDIe" })
					})]
				})]
			})
		})]
	});
}
function UpdateReferenceDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema$3),
		defaultValues: {
			id: data.item.id,
			hidden: data.item.hidden,
			options: data.item.options ?? { showLinkInTitle: false },
			name: data.item.name,
			position: data.item.position,
			website: data.item.website,
			phone: data.item.phone,
			description: data.item.description
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (!section) return;
				const index = section.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) section.items[index] = formData;
			} else {
				const index = draft.sections.references.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) draft.sections.references.items[index] = formData;
			}
		});
		closeDialog();
	};
	const { blockEvents, requestClose } = useFormBlocker(form);
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ jsx(PencilSimpleLineIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "Nc1Z07" })]
		}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				className: "grid gap-4 sm:grid-cols-2",
				onSubmit: form.handleSubmit(onSubmit),
				children: [/* @__PURE__ */ jsx(ReferenceForm, {}), /* @__PURE__ */ jsxs(DialogFooter, {
					className: "sm:col-span-full",
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						onClick: requestClose,
						children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
					}), /* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: form.formState.isSubmitting,
						children: /* @__PURE__ */ jsx(Trans, { id: "IUwGEM" })
					})]
				})]
			})
		})]
	});
}
function ReferenceForm() {
	const form = useFormContext();
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "name",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "6YtxFj" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "position",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "p/78dY" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "phone",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "zmwvG2" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "website",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "On0aF2" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(URLInput, {
					...field,
					value: field.value,
					onChange: field.onChange,
					hideLabelButton: form.watch("options.showLinkInTitle")
				}) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "options.showLinkInTitle",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
				className: "flex items-center gap-x-2",
				children: [/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Switch$1, {
					checked: field.value,
					onCheckedChange: field.onChange
				}) }), /* @__PURE__ */ jsx(FormLabel, {
					className: "!mt-0",
					children: /* @__PURE__ */ jsx(Trans, { id: "vdCB9I" })
				})]
			})
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "description",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
				className: "sm:col-span-full",
				children: [
					/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "Nu4oKW" }) }),
					/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(RichInput, {
						...field,
						value: field.value,
						onChange: field.onChange
					}) }),
					/* @__PURE__ */ jsx(FormMessage, {})
				]
			})
		})
	] });
}
init_data();
init_string();
var formSchema$2 = skillItemSchema;
function CreateSkillDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema$2),
		defaultValues: {
			id: generateId$1(),
			hidden: data?.item?.hidden ?? false,
			icon: data?.item?.icon ?? "acorn",
			name: data?.item?.name ?? "",
			proficiency: data?.item?.proficiency ?? "",
			level: data?.item?.level ?? 0,
			keywords: data?.item?.keywords ?? []
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (section) section.items.push(formData);
			} else draft.sections.skills.items.push(formData);
		});
		closeDialog();
	};
	const { blockEvents, requestClose } = useFormBlocker(form);
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ jsx(PlusIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "kcOHdy" })]
		}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				className: "grid gap-4 sm:grid-cols-2",
				onSubmit: form.handleSubmit(onSubmit),
				children: [/* @__PURE__ */ jsx(SkillForm, {}), /* @__PURE__ */ jsxs(DialogFooter, {
					className: "sm:col-span-full",
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						onClick: requestClose,
						children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
					}), /* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: form.formState.isSubmitting,
						children: /* @__PURE__ */ jsx(Trans, { id: "hYgDIe" })
					})]
				})]
			})
		})]
	});
}
function UpdateSkillDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema$2),
		defaultValues: {
			id: data.item.id,
			hidden: data.item.hidden,
			icon: data.item.icon,
			name: data.item.name,
			proficiency: data.item.proficiency,
			level: data.item.level,
			keywords: data.item.keywords
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (!section) return;
				const index = section.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) section.items[index] = formData;
			} else {
				const index = draft.sections.skills.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) draft.sections.skills.items[index] = formData;
			}
		});
		closeDialog();
	};
	const { blockEvents, requestClose } = useFormBlocker(form);
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ jsx(PencilSimpleLineIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "Qz33yd" })]
		}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				className: "grid gap-4 sm:grid-cols-2",
				onSubmit: form.handleSubmit(onSubmit),
				children: [/* @__PURE__ */ jsx(SkillForm, {}), /* @__PURE__ */ jsxs(DialogFooter, {
					className: "sm:col-span-full",
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						onClick: requestClose,
						children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
					}), /* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: form.formState.isSubmitting,
						children: /* @__PURE__ */ jsx(Trans, { id: "IUwGEM" })
					})]
				})]
			})
		})]
	});
}
function SkillForm() {
	const form = useFormContext();
	const nameState = useFormState({
		control: form.control,
		name: "name"
	});
	const isNameInvalid = useMemo(() => {
		return nameState.errors && Object.keys(nameState.errors).length > 0;
	}, [nameState]);
	const predefinedSkills = [
		"JavaScript",
		"TypeScript",
		"React",
		"Node.js",
		"Python",
		"CSS",
		"HTML",
		"SQL",
		"Git",
		"Docker",
		"Java",
		"C#",
		"C++",
		"Go",
		"Ruby",
		"PHP",
		"Swift",
		"Kotlin",
		"AWS",
		"Figma"
	];
	const proficiencyOptions = [
		{
			value: "Beginner",
			label: "Beginner"
		},
		{
			value: "Intermediate",
			label: "Intermediate"
		},
		{
			value: "Advanced",
			label: "Advanced"
		},
		{
			value: "Expert",
			label: "Expert"
		}
	];
	const handleAddSkillChip = (skill) => {
		form.setValue("name", skill);
		form.clearErrors("name");
	};
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx("div", {
			className: "col-span-full mb-2 flex flex-wrap gap-2",
			children: predefinedSkills.map((skill) => /* @__PURE__ */ jsx("button", {
				type: "button",
				className: cn("cursor-pointer rounded-full border px-3 py-1 text-xs hover:bg-primary/10", form.watch("name") === skill && "border-primary bg-primary text-white"),
				onClick: () => handleAddSkillChip(skill),
				children: skill
			}, skill))
		}),
		/* @__PURE__ */ jsxs("div", {
			className: cn("flex items-end", isNameInvalid && "items-center"),
			children: [/* @__PURE__ */ jsx(FormField, {
				control: form.control,
				name: "icon",
				render: ({ field }) => /* @__PURE__ */ jsx(FormItem, {
					className: "shrink-0",
					children: /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(IconPicker, {
						...field,
						popoverProps: { modal: true },
						className: "rounded-r-none! border-e-0!"
					}) })
				})
			}), /* @__PURE__ */ jsx(FormField, {
				control: form.control,
				name: "name",
				render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
					className: "flex-1",
					children: [
						/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "6YtxFj" }) }),
						/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, {
							className: "rounded-l-none!",
							...field
						}) }),
						/* @__PURE__ */ jsx(FormMessage, {})
					]
				})
			})]
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "proficiency",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "ahatHh" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsxs("select", {
					className: "w-full rounded border px-2 py-1",
					value: field.value || "",
					onChange: (e) => field.onChange(e.target.value),
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "Select proficiency"
					}), proficiencyOptions.map((option) => /* @__PURE__ */ jsx("option", {
						value: option.value,
						children: option.label
					}, option.value))]
				}) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "level",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
				className: "gap-4 sm:col-span-full",
				children: [
					/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "oCHfGC" }) }),
					/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Slider$1, {
						min: 0,
						max: 5,
						step: 1,
						value: [field.value],
						onValueChange: (value) => field.onChange(value[0])
					}) }),
					/* @__PURE__ */ jsx(FormMessage, {}),
					/* @__PURE__ */ jsx(FormDescription, { children: Number(field.value) === 0 ? i18n._({ id: "D+zLDD" }) : `${field.value} / 5` })
				]
			})
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "keywords",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
				className: "sm:col-span-full",
				children: [
					/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "/n/HCO" }) }),
					/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(ChipInput, { ...field }) }),
					/* @__PURE__ */ jsx(FormMessage, {})
				]
			})
		})
	] });
}
init_data();
init_string();
var formSchema$1 = summaryItemSchema;
function CreateSummaryItemDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const roundsUsed = useResumeStore((state) => state.summaryAIRoundsUsed);
	const incrementRoundsUsed = useResumeStore((state) => state.incrementSummaryRounds);
	const resetRounds = useResumeStore((state) => state.resetSummaryRounds);
	const maxRounds = 2;
	const form = useForm({
		resolver: zodResolver(formSchema$1),
		defaultValues: {
			id: generateId$1(),
			hidden: data?.item?.hidden ?? false,
			content: data?.item?.content ?? ""
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (section) section.items.push(formData);
			}
		});
		closeDialog();
	};
	const { blockEvents, requestClose } = useFormBlocker(form);
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2 text-base sm:text-lg",
			children: [/* @__PURE__ */ jsx(PlusIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "rgb6b/" })]
		}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				className: "grid gap-4",
				onSubmit: form.handleSubmit(onSubmit),
				children: [/* @__PURE__ */ jsx(SummaryItemForm, { aiUsage: {
					roundsUsed,
					maxRounds,
					incrementRoundsUsed,
					resetRounds
				} }), /* @__PURE__ */ jsxs(DialogFooter, {
					className: "grid grid-cols-2 gap-x-2 sm:flex sm:flex-row sm:justify-end",
					children: [/* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: form.formState.isSubmitting,
						children: /* @__PURE__ */ jsx(Trans, { id: "hYgDIe" })
					}), /* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						className: "border",
						onClick: requestClose,
						children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
					})]
				})]
			})
		})]
	});
}
function UpdateSummaryItemDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeStore = useResumeStore((state) => state.updateResumeData);
	const roundsUsed = useResumeStore((state) => state.summaryAIRoundsUsed);
	const incrementRoundsUsed = useResumeStore((state) => state.incrementSummaryRounds);
	const resetRounds = useResumeStore((state) => state.resetSummaryRounds);
	const maxRounds = 2;
	const form = useForm({
		resolver: zodResolver(formSchema$1),
		defaultValues: {
			id: data.item.id,
			hidden: data.item.hidden,
			content: data.item.content
		}
	});
	const onSubmit = (formData) => {
		updateResumeStore((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (!section) return;
				const index = section.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) section.items[index] = formData;
			} else draft.summary.content = formData.content;
		});
		closeDialog();
	};
	const { blockEvents, requestClose } = useFormBlocker(form);
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2 text-base sm:text-lg",
			children: [/* @__PURE__ */ jsx(PencilSimpleLineIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "/Fr4Xg" })]
		}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				className: "grid gap-4",
				onSubmit: form.handleSubmit(onSubmit),
				children: [/* @__PURE__ */ jsx(SummaryItemForm, { aiUsage: {
					roundsUsed,
					maxRounds,
					incrementRoundsUsed,
					resetRounds
				} }), /* @__PURE__ */ jsxs(DialogFooter, {
					className: "grid grid-cols-2 gap-x-2 sm:flex sm:flex-row sm:justify-end",
					children: [/* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: form.formState.isSubmitting,
						children: /* @__PURE__ */ jsx(Trans, { id: "IUwGEM" })
					}), /* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						className: "border",
						onClick: requestClose,
						children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
					})]
				})]
			})
		})]
	});
}
function SummaryItemForm({ aiUsage: _aiUsage }) {
	const form = useFormContext();
	const resumeData = useResumeStore((state) => state.resume.data);
	const content = useWatch({
		control: form.control,
		name: "content"
	});
	const previousContentRef = useRef(content);
	const aiUpdateCountRef = useRef(0);
	const roundsUsed = useResumeStore((state) => state.summaryAIRoundsUsed);
	const incrementRoundsUsed = useResumeStore((state) => state.incrementSummaryRounds);
	const resetRounds = useResumeStore((state) => state.resetSummaryRounds);
	const maxRounds = 2;
	useEffect(() => {
		if (aiUpdateCountRef.current > 0) {
			aiUpdateCountRef.current -= 1;
			previousContentRef.current = content;
			return;
		}
		if (content !== previousContentRef.current) resetRounds();
		previousContentRef.current = content;
	}, [content, resetRounds]);
	const isWordCountValid = (() => {
		if (typeof content !== "string") return false;
		return content.trim().split(/\s+/).filter(Boolean).length >= 5;
	})();
	const handleAIGenerated = (aiSummary) => {
		if (aiSummary && aiSummary.length > 10) {
			aiUpdateCountRef.current = 2;
			form.setValue("content", aiSummary, {
				shouldDirty: true,
				shouldValidate: true
			});
			incrementRoundsUsed();
		}
	};
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(FormField, {
		control: form.control,
		name: "content",
		render: ({ field }) => {
			return /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-row items-center justify-between",
					children: [/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "4b3oEV" }) }), /* @__PURE__ */ jsx(AIGenerateButton, {
						resumeId: useResumeStore.getState().resume.id,
						type: "summary",
						data: {
							name: resumeData.basics.name,
							headline: resumeData.basics.headline,
							experience: resumeData.sections.experience.items.slice(0, 2),
							skills: resumeData.sections.skills.items.slice(0, 5).map((skill) => skill.name),
							currentSummary: typeof field.value === "string" ? field.value : ""
						},
						onGenerated: handleAIGenerated,
						roundsUsed,
						maxRounds,
						isWordCountValid,
						disabled: roundsUsed >= maxRounds || !isWordCountValid,
						className: "scale-90 sm:scale-100"
					})]
				}),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(RichInput, {
					...field,
					value: field.value,
					onChange: (value) => {
						field.onChange(value);
					}
				}) }),
				!isWordCountValid && field.value && field.value.trim().split(/\s+/).filter(Boolean).length < 5 && /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-amber-600 text-xs",
					children: /* @__PURE__ */ jsx(Trans, { id: "gtScT1" })
				}),
				roundsUsed === 1 && /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-blue-600 text-xs",
					children: /* @__PURE__ */ jsx(Trans, { id: "zD7gzh" })
				}),
				roundsUsed >= maxRounds && /* @__PURE__ */ jsx("p", {
					className: "mt-1 font-medium text-red-600 text-xs",
					children: /* @__PURE__ */ jsx(Trans, { id: "S6A43c" })
				}),
				/* @__PURE__ */ jsx(FormMessage, {})
			] });
		}
	}), /* @__PURE__ */ jsxs("div", {
		className: "rounded-xl border border-blue-200 bg-blue-50 p-4",
		children: [/* @__PURE__ */ jsx("h4", {
			className: "mb-2 font-semibold text-blue-900 text-sm",
			children: /* @__PURE__ */ jsx(Trans, { id: "DRI5jG" })
		}), /* @__PURE__ */ jsxs("ul", {
			className: "space-y-1 text-blue-800 text-xs",
			children: [
				/* @__PURE__ */ jsxs("li", { children: ["• ", /* @__PURE__ */ jsx(Trans, { id: "XkeXUJ" })] }),
				/* @__PURE__ */ jsxs("li", { children: ["• ", /* @__PURE__ */ jsx(Trans, { id: "vofMRK" })] }),
				/* @__PURE__ */ jsxs("li", { children: ["• ", /* @__PURE__ */ jsx(Trans, { id: "6GcP5O" })] }),
				/* @__PURE__ */ jsxs("li", { children: ["• ", /* @__PURE__ */ jsx(Trans, { id: "VB8HVU" })] })
			]
		})]
	})] });
}
init_data();
init_string();
var formSchema = volunteerItemSchema;
function CreateVolunteerDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: generateId$1(),
			hidden: data?.item?.hidden ?? false,
			options: data?.item?.options ?? { showLinkInTitle: false },
			organization: data?.item?.organization ?? "",
			location: data?.item?.location ?? "",
			period: data?.item?.period ?? "",
			website: data?.item?.website ?? {
				url: "",
				label: ""
			},
			description: data?.item?.description ?? ""
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (section) section.items.push(formData);
			} else draft.sections.volunteer.items.push(formData);
		});
		closeDialog();
	};
	const { blockEvents, requestClose } = useFormBlocker(form);
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ jsx(PlusIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "IHQBV5" })]
		}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				className: "grid gap-4 sm:grid-cols-2",
				onSubmit: form.handleSubmit(onSubmit),
				children: [/* @__PURE__ */ jsx(VolunteerForm, {}), /* @__PURE__ */ jsxs(DialogFooter, {
					className: "sm:col-span-full",
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						onClick: requestClose,
						children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
					}), /* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: form.formState.isSubmitting,
						children: /* @__PURE__ */ jsx(Trans, { id: "hYgDIe" })
					})]
				})]
			})
		})]
	});
}
function UpdateVolunteerDialog({ data }) {
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: data.item.id,
			hidden: data.item.hidden,
			options: data.item.options ?? { showLinkInTitle: false },
			organization: data.item.organization,
			location: data.item.location,
			period: data.item.period,
			website: data.item.website,
			description: data.item.description
		}
	});
	const onSubmit = (formData) => {
		updateResumeData((draft) => {
			if (data?.customSectionId) {
				const section = draft.customSections.find((s) => s.id === data.customSectionId);
				if (!section) return;
				const index = section.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) section.items[index] = formData;
			} else {
				const index = draft.sections.volunteer.items.findIndex((item) => item.id === formData.id);
				if (index !== -1) draft.sections.volunteer.items[index] = formData;
			}
		});
		closeDialog();
	};
	const { blockEvents, requestClose } = useFormBlocker(form);
	return /* @__PURE__ */ jsxs(DialogContent, {
		...blockEvents,
		children: [/* @__PURE__ */ jsxs(DialogHeader, { children: [/* @__PURE__ */ jsxs(DialogTitle, {
			className: "flex items-center gap-x-2",
			children: [/* @__PURE__ */ jsx(PencilSimpleLineIcon, {}), /* @__PURE__ */ jsx(Trans, { id: "K8trJR" })]
		}), /* @__PURE__ */ jsx(DialogDescription, {})] }), /* @__PURE__ */ jsx(Form, {
			...form,
			children: /* @__PURE__ */ jsxs("form", {
				className: "grid gap-4 sm:grid-cols-2",
				onSubmit: form.handleSubmit(onSubmit),
				children: [/* @__PURE__ */ jsx(VolunteerForm, {}), /* @__PURE__ */ jsxs(DialogFooter, {
					className: "sm:col-span-full",
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						onClick: requestClose,
						children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" })
					}), /* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: form.formState.isSubmitting,
						children: /* @__PURE__ */ jsx(Trans, { id: "IUwGEM" })
					})]
				})]
			})
		})]
	});
}
function VolunteerForm() {
	const form = useFormContext();
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "organization",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "ucgZ0o" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "location",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "wJijgU" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "period",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "NtQvjo" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "website",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
				/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "On0aF2" }) }),
				/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(URLInput, {
					...field,
					value: field.value,
					onChange: field.onChange,
					hideLabelButton: form.watch("options.showLinkInTitle")
				}) }),
				/* @__PURE__ */ jsx(FormMessage, {})
			] })
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "options.showLinkInTitle",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
				className: "flex items-center gap-x-2",
				children: [/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Switch$1, {
					checked: field.value,
					onCheckedChange: field.onChange
				}) }), /* @__PURE__ */ jsx(FormLabel, {
					className: "!mt-0",
					children: /* @__PURE__ */ jsx(Trans, { id: "vdCB9I" })
				})]
			})
		}),
		/* @__PURE__ */ jsx(FormField, {
			control: form.control,
			name: "description",
			render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, {
				className: "sm:col-span-full",
				children: [
					/* @__PURE__ */ jsx(FormLabel, { children: /* @__PURE__ */ jsx(Trans, { id: "Nu4oKW" }) }),
					/* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(RichInput, {
						...field,
						value: field.value,
						onChange: field.onChange
					}) }),
					/* @__PURE__ */ jsx(FormMessage, {})
				]
			})
		})
	] });
}
function HoverCard$1({ ...props }) {
	return /* @__PURE__ */ jsx(HoverCard.Root, {
		"data-slot": "hover-card",
		...props
	});
}
function HoverCardTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(HoverCard.Trigger, {
		"data-slot": "hover-card-trigger",
		...props
	});
}
function HoverCardContent({ className, align = "center", sideOffset = 4, ...props }) {
	return /* @__PURE__ */ jsx(HoverCard.Portal, {
		"data-slot": "hover-card-portal",
		children: /* @__PURE__ */ jsx(HoverCard.Content, {
			"data-slot": "hover-card-content",
			align,
			sideOffset,
			className: cn("data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-end-2 data-[side=right]:slide-in-from-start-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-lg bg-popover p-4 text-popover-foreground text-sm shadow-md outline-hidden ring-1 ring-foreground/10 duration-100 data-closed:animate-out data-open:animate-in", className),
			...props
		})
	});
}
function TemplateGalleryDialog(_) {
	const isMobile = useIsMobile();
	const scrollAreaRef = useRef(null);
	const closeDialog = useDialogStore((state) => state.closeDialog);
	const selectedTemplate = useResumeStore((state) => state.resume.data.metadata.template);
	const updateResumeData = useResumeStore((state) => state.updateResumeData);
	function onSelectTemplate(template) {
		const templateMetadata = templates[template];
		updateResumeData((draft) => {
			draft.metadata.template = template;
			const sidebarPosition = templateMetadata.sidebarPosition;
			const sidebarSections = [
				"skills",
				"certifications",
				"awards",
				"languages",
				"interests",
				"publications"
			];
			const allSections = [...new Set([...draft.metadata.layout.pages.flatMap((page) => [...page.main, ...page.sidebar])])];
			draft.metadata.layout.pages.forEach((page) => {
				if (sidebarPosition === "none") {
					page.main = allSections;
					page.sidebar = [];
					page.fullWidth = true;
				} else {
					page.fullWidth = false;
					page.sidebar = allSections.filter((section) => sidebarSections.includes(section));
					page.main = allSections.filter((section) => !sidebarSections.includes(section));
				}
			});
		});
		closeDialog();
	}
	return /* @__PURE__ */ jsxs(DialogContent, {
		className: "max-w-[95vw] p-4 sm:p-6 md:max-w-3xl lg:max-w-5xl",
		children: [/* @__PURE__ */ jsxs(DialogHeader, {
			className: "gap-2",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2",
				children: [isMobile && /* @__PURE__ */ jsx(Button, {
					size: "icon",
					variant: "ghost",
					onClick: closeDialog,
					className: "h-8 w-8 shrink-0",
					children: /* @__PURE__ */ jsx(ArrowLeftIcon, { className: "h-5 w-5" })
				}), /* @__PURE__ */ jsxs(DialogTitle, {
					className: "flex items-center gap-2 text-base sm:gap-3 sm:text-xl",
					children: [/* @__PURE__ */ jsx(SlideshowIcon, { className: "h-4 w-4 sm:h-5 sm:w-5" }), /* @__PURE__ */ jsx(Trans, { id: "i8f34V" })]
				})]
			}), /* @__PURE__ */ jsx(DialogDescription, {
				className: "text-xs leading-relaxed sm:text-sm",
				children: /* @__PURE__ */ jsx(Trans, { id: "0ktPwY" })
			})]
		}), /* @__PURE__ */ jsx(ScrollArea$1, {
			ref: scrollAreaRef,
			className: "max-h-[60svh] pb-4 sm:max-h-[70svh] sm:pb-8",
			children: /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 sm:gap-4 sm:p-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4",
				children: Object.entries(templates).map(([template, metadata]) => /* @__PURE__ */ jsx(TemplateCard, {
					metadata,
					id: template,
					collisionBoundary: scrollAreaRef,
					isActive: template === selectedTemplate,
					onSelect: onSelectTemplate
				}, template))
			})
		})]
	});
}
function TemplateCard({ id, metadata, isActive, collisionBoundary, onSelect }) {
	const { i18n: i18n$1 } = useLingui();
	return /* @__PURE__ */ jsx(HoverCard$1, {
		openDelay: 0,
		closeDelay: 0,
		children: /* @__PURE__ */ jsxs(CometCard, {
			translateDepth: 3,
			rotateDepth: 6,
			glareOpacity: 0,
			children: [
				/* @__PURE__ */ jsx(HoverCardTrigger, {
					asChild: true,
					children: /* @__PURE__ */ jsx("button", {
						tabIndex: -1,
						onClick: () => onSelect(id),
						className: cn("relative block aspect-page size-full cursor-pointer overflow-hidden rounded-md bg-popover outline-none", isActive && "ring-2 ring-ring ring-offset-4 ring-offset-background"),
						children: /* @__PURE__ */ jsx("img", {
							src: metadata.imageUrl,
							alt: metadata.name,
							className: "size-full object-cover"
						})
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex items-center justify-center",
					children: /* @__PURE__ */ jsx("span", {
						className: "font-bold leading-loose tracking-tight",
						children: metadata.name
					})
				}),
				/* @__PURE__ */ jsxs(HoverCardContent, {
					side: "right",
					sideOffset: -32,
					align: "start",
					alignOffset: 32,
					collisionBoundary: collisionBoundary.current,
					className: "pointer-events-none! flex w-80 flex-col justify-between space-y-6 rounded-md bg-background/80 p-4 pb-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "font-semibold text-lg",
							children: metadata.name
						}), /* @__PURE__ */ jsx("p", {
							className: "text-muted-foreground",
							children: i18n$1.t(metadata.description)
						})]
					}), metadata.tags.length > 0 && /* @__PURE__ */ jsx("div", {
						className: "flex flex-wrap gap-2",
						children: metadata.tags.sort((a, b) => a.localeCompare(b)).map((tag$1) => /* @__PURE__ */ jsx(Badge, {
							variant: "default",
							children: tag$1
						}, tag$1))
					})]
				})
			]
		})
	});
}
function DialogManager() {
	const { open, activeDialog, onOpenChange } = useDialogStore();
	return /* @__PURE__ */ jsx(Dialog$1, {
		open,
		onOpenChange,
		children: match(activeDialog).with({ type: "resume.create" }, () => /* @__PURE__ */ jsx(CreateResumeDialog, {})).with({ type: "resume.update" }, ({ data }) => /* @__PURE__ */ jsx(UpdateResumeDialog, { data })).with({ type: "resume.duplicate" }, ({ data }) => /* @__PURE__ */ jsx(DuplicateResumeDialog, { data })).with({ type: "resume.import" }, () => /* @__PURE__ */ jsx(ImportResumeDialog, {})).with({ type: "resume.template.gallery" }, () => /* @__PURE__ */ jsx(TemplateGalleryDialog, {})).with({ type: "resume.sections.profiles.create" }, ({ data }) => /* @__PURE__ */ jsx(CreateProfileDialog, { data })).with({ type: "resume.sections.profiles.update" }, ({ data }) => /* @__PURE__ */ jsx(UpdateProfileDialog, { data })).with({ type: "resume.sections.experience.create" }, ({ data }) => /* @__PURE__ */ jsx(CreateExperienceDialog, { data })).with({ type: "resume.sections.experience.update" }, ({ data }) => /* @__PURE__ */ jsx(UpdateExperienceDialog, { data })).with({ type: "resume.sections.education.create" }, ({ data }) => /* @__PURE__ */ jsx(CreateEducationDialog, { data })).with({ type: "resume.sections.education.update" }, ({ data }) => /* @__PURE__ */ jsx(UpdateEducationDialog, { data })).with({ type: "resume.sections.skills.create" }, ({ data }) => /* @__PURE__ */ jsx(CreateSkillDialog, { data })).with({ type: "resume.sections.skills.update" }, ({ data }) => /* @__PURE__ */ jsx(UpdateSkillDialog, { data })).with({ type: "resume.sections.projects.create" }, ({ data }) => /* @__PURE__ */ jsx(CreateProjectDialog, { data })).with({ type: "resume.sections.projects.update" }, ({ data }) => /* @__PURE__ */ jsx(UpdateProjectDialog, { data })).with({ type: "resume.sections.certifications.create" }, ({ data }) => /* @__PURE__ */ jsx(CreateCertificationDialog, { data })).with({ type: "resume.sections.certifications.update" }, ({ data }) => /* @__PURE__ */ jsx(UpdateCertificationDialog, { data })).with({ type: "resume.sections.languages.create" }, ({ data }) => /* @__PURE__ */ jsx(CreateLanguageDialog, { data })).with({ type: "resume.sections.languages.update" }, ({ data }) => /* @__PURE__ */ jsx(UpdateLanguageDialog, { data })).with({ type: "resume.sections.publications.create" }, ({ data }) => /* @__PURE__ */ jsx(CreatePublicationDialog, { data })).with({ type: "resume.sections.publications.update" }, ({ data }) => /* @__PURE__ */ jsx(UpdatePublicationDialog, { data })).with({ type: "resume.sections.awards.create" }, ({ data }) => /* @__PURE__ */ jsx(CreateAwardDialog, { data })).with({ type: "resume.sections.awards.update" }, ({ data }) => /* @__PURE__ */ jsx(UpdateAwardDialog, { data })).with({ type: "resume.sections.interests.create" }, ({ data }) => /* @__PURE__ */ jsx(CreateInterestDialog, { data })).with({ type: "resume.sections.interests.update" }, ({ data }) => /* @__PURE__ */ jsx(UpdateInterestDialog, { data })).with({ type: "resume.sections.volunteer.create" }, ({ data }) => /* @__PURE__ */ jsx(CreateVolunteerDialog, { data })).with({ type: "resume.sections.volunteer.update" }, ({ data }) => /* @__PURE__ */ jsx(UpdateVolunteerDialog, { data })).with({ type: "resume.sections.references.create" }, ({ data }) => /* @__PURE__ */ jsx(CreateReferenceDialog, { data })).with({ type: "resume.sections.references.update" }, ({ data }) => /* @__PURE__ */ jsx(UpdateReferenceDialog, { data })).with({ type: "resume.sections.summary.create" }, ({ data }) => /* @__PURE__ */ jsx(CreateSummaryItemDialog, { data })).with({ type: "resume.sections.summary.update" }, ({ data }) => /* @__PURE__ */ jsx(UpdateSummaryItemDialog, { data })).with({ type: "resume.sections.cover-letter.create" }, ({ data }) => /* @__PURE__ */ jsx(CreateCoverLetterDialog, { data })).with({ type: "resume.sections.cover-letter.update" }, ({ data }) => /* @__PURE__ */ jsx(UpdateCoverLetterDialog, { data })).with({ type: "resume.sections.custom.create" }, ({ data }) => /* @__PURE__ */ jsx(CreateCustomSectionDialog, { data })).with({ type: "resume.sections.custom.update" }, ({ data }) => /* @__PURE__ */ jsx(UpdateCustomSectionDialog, { data })).otherwise(() => null)
	});
}
var globals_default = "/assets/globals-Dgz2QY9a.css";
var appName = "Zoe Resume Builder";
var title = `${appName} — Build your professional resume with AI assistance`;
var description = "Zoe Resume Builder is a free resume builder with AI assistance that simplifies the process of creating, updating, and sharing your resume.";
await loadLocale(await getLocale());
const Route = createRootRouteWithContext()({
	shellComponent: RootDocument,
	head: () => {
		const appUrl = "https://api-testing.d3s88q50fgekpa.amplifyapp.com";
		return {
			links: [
				{
					rel: "stylesheet",
					href: globals_default
				},
				{
					rel: "icon",
					href: "/zoe-icon.png",
					type: "image/png",
					sizes: "128x128"
				},
				{
					rel: "icon",
					href: "/zoe-icon.png",
					type: "image/png",
					sizes: "256x256 any"
				},
				{
					rel: "apple-touch-icon",
					href: "/zoe-icon.png",
					type: "image/png",
					sizes: "180x180 any"
				},
				{
					rel: "manifest",
					href: "/manifest.webmanifest",
					crossOrigin: "use-credentials"
				}
			],
			meta: [
				{ title },
				{ charSet: "UTF-8" },
				{
					name: "description",
					content: description
				},
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1"
				},
				{
					property: "twitter:image",
					content: `${appUrl}/opengraph/banner.jpg`
				},
				{
					property: "twitter:card",
					content: "summary_large_image"
				},
				{
					property: "twitter:title",
					content: title
				},
				{
					property: "twitter:description",
					content: description
				},
				{
					property: "og:image",
					content: `${appUrl}/opengraph/banner.jpg`
				},
				{
					property: "og:site_name",
					content: appName
				},
				{
					property: "og:title",
					content: title
				},
				{
					property: "og:description",
					content: description
				},
				{
					property: "og:url",
					content: appUrl
				}
			],
			scripts: [{ children: `
						if('serviceWorker' in navigator) {
							window.addEventListener('load', () => {
								navigator.serviceWorker.register('/sw.js', { scope: '/' })
							})
						}
						if (window.location.search.includes('token=preview')) {
							document.documentElement.classList.remove('dark');
						}
					` }]
		};
	},
	beforeLoad: async () => {
		const [theme, locale, session$1, flags] = await Promise.all([
			getTheme(),
			getLocale(),
			getSession().catch(() => null),
			client.flags.get().catch(() => ({
				disableSignups: false,
				disableEmailAuth: false
			}))
		]);
		return {
			theme,
			locale,
			session: session$1,
			flags
		};
	}
});
function RootDocument({ children }) {
	const { theme, locale } = Route.useRouteContext();
	return /* @__PURE__ */ jsxs("html", {
		suppressHydrationWarning: true,
		dir: isRTL(locale) ? "rtl" : "ltr",
		lang: locale,
		className: typeof window !== "undefined" && window.location.search.includes("token=preview") ? "light" : theme,
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [/* @__PURE__ */ jsx(MotionConfig, {
			reducedMotion: "user",
			children: /* @__PURE__ */ jsx(I18nProvider, {
				i18n,
				children: /* @__PURE__ */ jsx(IconContext.Provider, {
					value: {
						size: 16,
						weight: "regular"
					},
					children: /* @__PURE__ */ jsx(ThemeProvider, {
						theme,
						children: /* @__PURE__ */ jsx(ConfirmDialogProvider, { children: /* @__PURE__ */ jsxs(PromptDialogProvider, { children: [
							children,
							/* @__PURE__ */ jsx(DialogManager, {}),
							/* @__PURE__ */ jsx(CommandPalette, {}),
							/* @__PURE__ */ jsx(Toaster$1, {
								richColors: true,
								position: "bottom-right"
							}),
							false
						] }) })
					})
				})
			})
		}), /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
init_data();
function handler$5() {
	const resumeDataJSONSchema = z.toJSONSchema(resumeDataSchema);
	return Response.json(resumeDataJSONSchema, {
		status: 200,
		headers: {
			"Content-Type": "application/schema+json; charset=utf-8",
			"Cache-Control": "public, max-age=86400, immutable",
			"Surrogate-Control": "max-age=86400",
			"X-Content-Type-Options": "nosniff",
			"X-Robots-Tag": "index, follow",
			ETag: `"v5.0.0"`,
			Vary: "Accept"
		}
	});
}
const Route$1 = createFileRoute("/schema.json")({ server: { handlers: { GET: handler$5 } } });
var $$splitComponentImporter$6 = () => import("./route-DxuXM_Si.js");
const Route$2 = createFileRoute("/dashboard")({
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	beforeLoad: async ({ context }) => {
		if (typeof window === "undefined") return { session: context.session };
		new URL(window.location.href);
		const token = getAuthToken();
		const hasZuvySession = Boolean(context.session?.user);
		const hasToken = isValidToken(token);
		if (!hasToken && token) localStorage.removeItem("authToken");
		if (!hasToken && !hasZuvySession && true) throw redirect({ href: buildZuvyLoginUrl(window.location.href) });
		return { session: context.session };
	}
});
var $$splitComponentImporter$5 = () => import("./route-AySXUhVL.js");
const Route$3 = createFileRoute("/_home")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
const Route$4 = createFileRoute("/dashboard/")({ beforeLoad: () => {
	throw redirect({
		to: "/dashboard/resumes",
		search: {
			sort: "lastUpdatedAt",
			tags: []
		},
		replace: true
	});
} });
var $$splitComponentImporter$4 = () => import("./auth-CUF-onLp.js");
const Route$5 = createFileRoute("/auth/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./_home-DfFuMNbH.js");
const Route$6 = createFileRoute("/_home/")({
	beforeLoad: () => {
		throw redirect({ to: "/dashboard/resumes" });
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
init_env();
var PRINTER_TOKEN_TTL_MS = 300 * 1e3;
const verifyPrinterToken = (token) => {
	if (!env$1.AUTH_SECRET) throw new Error("AUTH_SECRET is not configured. Printer functionality is not available.");
	const parts = token.split(".");
	if (parts.length !== 2) throw new Error("Invalid token format");
	const [payloadBase64, signature] = parts;
	const expectedSignature = createHash("sha256").update(`${payloadBase64}.${env$1.AUTH_SECRET}`).digest("hex");
	const signatureBuffer = Buffer.from(signature);
	const expectedBuffer = Buffer.from(expectedSignature);
	if (signatureBuffer.length !== expectedBuffer.length || !timingSafeEqual(signatureBuffer, expectedBuffer)) throw new Error("Invalid token signature");
	const [resumeId, timestampStr] = Buffer.from(payloadBase64, "base64url").toString("utf-8").split(":");
	if (!resumeId || !timestampStr) throw new Error("Invalid token payload");
	const timestamp = Number.parseInt(timestampStr, 10);
	if (Number.isNaN(timestamp)) throw new Error("Invalid timestamp");
	const age = Date.now() - timestamp;
	if (age < 0 || age > PRINTER_TOKEN_TTL_MS) throw new Error("Token expired");
	return resumeId;
};
init_env();
var $$splitComponentImporter$2 = () => import("./_resumeId-DSqiHYhU.js");
var searchSchema = z$1.object({ token: z$1.string().catch("") });
const Route$7 = createFileRoute("/printer/$resumeId")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	validateSearch: zodValidator(searchSchema),
	head: ({ loaderData }) => {
		if (loaderData?.token === "preview") return { styles: [{ children: "html, body { background-color: white !important; color-scheme: light !important; } .dark { background-color: white !important; }" }] };
	},
	beforeLoad: async ({ params, search }) => {
		if (env$1.VITE_FLAG_DEBUG_PRINTER) return;
		if (search?.token === "preview") return;
		try {
			if (verifyPrinterToken(search?.token || "") !== params.resumeId) throw new Error();
		} catch {
			throw redirect({
				to: "/",
				search: {},
				throw: true
			});
		}
	},
	loader: async ({ params, search }) => {
		try {
			if (search?.token === "preview") {
				if (typeof window === "undefined") return {
					resume: {
						description: "Graduated with honors. Major in Computer Science.",
						currentlyStudyingHere: false
					},
					token: search?.token
				};
				const { api: api$2 } = await import("./api-uJy1v23g.js");
				return {
					resume: await api$2.fetchResume(params.resumeId),
					token: search?.token
				};
			}
			const { api: api$1 } = await import("./api-uJy1v23g.js");
			return {
				resume: await api$1.fetchResume(params.resumeId),
				token: search?.token
			};
		} catch (error$1) {
			console.error(`[Printer] Failed to load resume ${params.resumeId}:`, error$1);
			if (typeof window !== "undefined") window.parent.postMessage({
				type: "PRINTER_ERROR",
				resumeId: params.resumeId,
				message: String(error$1)
			}, "*");
			return {
				resume: null,
				token: search?.token
			};
		}
	}
});
var $$splitComponentImporter$1 = () => import("./login-BZYmU6m2.js");
const Route$8 = createFileRoute("/auth/login")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
init_env();
function getDb() {
	if (!env$1.DATABASE_URL) return null;
	try {
		const { db: db$1 } = (init_client(), __toCommonJS(client_exports));
		return db$1;
	} catch {
		return null;
	}
}
function isUnhealthy(check$1) {
	return !!check$1 && typeof check$1 === "object" && "status" in check$1 && typeof check$1.status === "string" && check$1.status === "unhealthy";
}
async function handler$4() {
	const checks = {
		version: process.env.npm_package_version,
		status: "healthy",
		timestamp: (/* @__PURE__ */ new Date()).toISOString(),
		uptime: `${process.uptime().toFixed(2)}s`,
		database: await checkDatabase(),
		storage: await checkStorage()
	};
	if (checks.status === "unhealthy" || Object.values(checks).some(isUnhealthy)) checks.status = "unhealthy";
	const headers = new Headers();
	const body = JSON.stringify(checks);
	headers.set("Content-Type", "application/json; charset=UTF-8");
	headers.set("Content-Length", Buffer.byteLength(body, "utf-8").toString());
	return new Response(body, {
		headers,
		status: checks.status === "unhealthy" ? 500 : 200
	});
}
async function checkDatabase() {
	try {
		const db$1 = getDb();
		if (!db$1) return {
			status: "unhealthy",
			error: "DATABASE_URL not configured"
		};
		await db$1.execute(sql`SELECT 1`);
		return { status: "healthy" };
	} catch (error$1) {
		return {
			status: "unhealthy",
			error: error$1 instanceof Error ? error$1.message : "Unknown error"
		};
	}
}
async function checkStorage() {
	try {
		return await getStorageService().healthcheck();
	} catch (error$1) {
		return {
			status: "unhealthy",
			error: error$1 instanceof Error ? error$1.message : "Unknown error"
		};
	}
}
const Route$9 = createFileRoute("/api/health")({ server: { handlers: { GET: handler$4 } } });
var $$splitComponentImporter = () => import("./_resumeId-Tl6mTtGc.js");
const Route$13 = createFileRoute("/builder/$resumeId/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
init_env();
var storageService = getStorageService();
const Route$14 = createFileRoute("/uploads/$userId/$")({ server: { handlers: { GET: handler$3 } } });
async function handler$3({ request }) {
	try {
		const remoteUrl = new URL(request.url).searchParams.get("url");
		const { userId, filePath } = parseRouteParams(request.url);
		if (!userId || !filePath) return new Response("Bad Request", { status: 400 });
		if (!isValidPath(userId) || !isValidPathSegments(filePath)) return new Response("Forbidden", { status: 403 });
		let data;
		let contentType;
		let size;
		let etag;
		if (remoteUrl) try {
			const response = await fetch(remoteUrl);
			if (response.ok) {
				const buffer$1 = await response.arrayBuffer();
				data = new Uint8Array(buffer$1);
				contentType = response.headers.get("Content-Type") ?? void 0;
				size = data.length;
				etag = createEtag({
					data,
					size,
					etag: response.headers.get("ETag") ?? void 0
				});
			}
		} catch (error$1) {
			console.error("[UploadProxy] Failed to fetch remote URL:", error$1);
		}
		if (!data) {
			const key = filePath.includes("uploads/") ? filePath : `uploads/${userId}/${filePath}`;
			const storedFile = await storageService.read(key);
			if (!storedFile) return new Response(`Not Found: ${key}`, { status: 404 });
			data = storedFile.data;
			contentType = storedFile.contentType;
			size = storedFile.size;
			etag = storedFile.etag;
		}
		const filename = filePath.split("/").pop() ?? filePath;
		const ext = extname(filename).toLowerCase();
		contentType = contentType ?? inferContentType(filename);
		const finalEtag = etag ?? `"${size}-${Date.now()}"`;
		if (isNotModified(request.headers, finalEtag)) return makeNotModifiedResponse(finalEtag);
		const shouldForceDownload = [".pdf"].includes(ext);
		const headers = buildResponseHeaders({
			filename,
			storedFile: { size: size ?? 0 },
			contentType,
			etag: finalEtag,
			shouldForceDownload
		});
		const buffer = toArrayBuffer(data);
		return new Response(buffer, { headers });
	} catch (error$1) {
		console.error("[UploadProxy] Error serving file:", error$1);
		return new Response(JSON.stringify({
			message: error$1 instanceof Error ? error$1.message : "Internal Server Error",
			stack: error$1 instanceof Error ? error$1.stack : void 0
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
}
function parseRouteParams(url) {
	const pathAfterUploads = new URL(url).pathname.replace("/uploads/", "");
	const firstSlashIndex = pathAfterUploads.indexOf("/");
	if (firstSlashIndex === -1) return {
		userId: pathAfterUploads,
		filePath: void 0
	};
	return {
		userId: pathAfterUploads.slice(0, firstSlashIndex),
		filePath: pathAfterUploads.slice(firstSlashIndex + 1) || void 0
	};
}
function isValidPath(segment) {
	return normalize(segment).replace(/^(\.\.(\/|\\|$))+/, "") === segment;
}
function isValidPathSegments(path$1) {
	return path$1.split("/").every((segment) => isValidPath(segment));
}
function isNotModified(headers, etag) {
	return (headers.get("If-None-Match")?.split(",").map((s) => s.trim()) ?? []).includes(etag);
}
function makeNotModifiedResponse(etag) {
	return new Response(null, {
		status: 304,
		headers: {
			ETag: etag,
			"Cache-Control": "public, max-age=31536000, immutable"
		}
	});
}
function buildResponseHeaders({ filename, storedFile, contentType, etag, shouldForceDownload }) {
	const headers = new Headers();
	headers.set("Content-Type", shouldForceDownload ? "application/octet-stream" : contentType);
	headers.set("Content-Length", storedFile.size.toString());
	if (shouldForceDownload) headers.set("Content-Disposition", `attachment; filename="${encodeURIComponent(basename(filename))}"`);
	headers.set("Cache-Control", "public, max-age=31536000, immutable");
	headers.set("ETag", etag);
	headers.set("X-Content-Type-Options", "nosniff");
	headers.set("X-Robots-Tag", "noindex, nofollow");
	headers.set("Cross-Origin-Resource-Policy", "same-site");
	headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
	headers.set("Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'; sandbox;");
	headers.set("X-Frame-Options", "DENY");
	headers.set("X-Download-Options", "noopen");
	headers.set("Access-Control-Allow-Origin", env$1.APP_URL);
	return headers;
}
function toArrayBuffer(data) {
	return data.byteOffset === 0 && data.byteLength === data.buffer.byteLength ? data.buffer : data.slice().buffer;
}
function createEtag(storedFile) {
	if (storedFile.etag) {
		const tag$1 = storedFile.etag.trim();
		if (tag$1.startsWith("W/") || tag$1.startsWith("\"")) return tag$1;
		return `"${tag$1}"`;
	}
	const hash$1 = createHash("sha256").update(storedFile.data).digest("hex");
	return `"${storedFile.size}-${hash$1}"`;
}
var rpcHandler = new RPCHandler(router_default, { plugins: [new BatchHandlerPlugin(), new RequestHeadersPlugin()] });
async function handler$2({ request }) {
	const { response } = await rpcHandler.handle(request, {
		prefix: "/api/rpc",
		context: { locale: await getLocale() }
	});
	if (!response) return new Response("NOT_FOUND", { status: 404 });
	return response;
}
const Route$16 = createFileRoute("/api/rpc/$")({ server: { handlers: { ANY: handler$2 } } });
init_env();
var openAPIHandler = new OpenAPIHandler(router_default, { plugins: [new RequestHeadersPlugin(), new SmartCoercionPlugin({ schemaConverters: [new ZodToJsonSchemaConverter()] })] });
var openAPIGenerator = new OpenAPIGenerator({ schemaConverters: [new ZodToJsonSchemaConverter()] });
async function handler$1({ request }) {
	const locale = await getLocale();
	if (request.method === "GET" && request.url.endsWith("/spec.json")) {
		const spec = await openAPIGenerator.generate(router_default, {
			info: {
				title: "Reactive Resume",
				version: "5.0.0",
				description: "Reactive Resume API",
				license: {
					name: "MIT",
					url: "https://github.com/amruthpillai/reactive-resume/blob/main/LICENSE"
				},
				contact: {
					name: "Amruth Pillai",
					email: "hello@amruthpillai.com",
					url: "https://amruthpillai.com"
				}
			},
			servers: [{ url: `${env$1.APP_URL}/api/openapi` }],
			externalDocs: {
				url: "https://docs.rxresu.me",
				description: "Reactive Resume Documentation"
			},
			components: { securitySchemes: { apiKey: {
				type: "apiKey",
				name: "x-api-key",
				in: "header",
				description: "The API key to authenticate requests."
			} } },
			security: [{ apiKey: [] }],
			filter: ({ contract }) => !contract["~orpc"].route.tags?.includes("Internal")
		});
		return Response.json(spec);
	}
	const { response } = await openAPIHandler.handle(request, {
		prefix: "/api/openapi",
		context: {
			locale,
			reqHeaders: request.headers
		}
	});
	if (!response) return new Response("NOT_FOUND", { status: 404 });
	return response;
}
const Route$17 = createFileRoute("/api/openapi/$")({ server: { handlers: { ANY: handler$1 } } });
function handler({ request }) {
	return auth.handler(request);
}
const Route$18 = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: handler,
	POST: handler
} } });
var SchemaDotjsonRoute = Route$1.update({
	id: "/schema.json",
	path: "/schema.json",
	getParentRoute: () => Route
});
var DashboardRouteRoute = Route$2.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route
});
var HomeRouteRoute = Route$3.update({
	id: "/_home",
	getParentRoute: () => Route
});
var DashboardIndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => DashboardRouteRoute
});
var AuthIndexRoute = Route$5.update({
	id: "/auth/",
	path: "/auth/",
	getParentRoute: () => Route
});
var HomeIndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => HomeRouteRoute
});
var PrinterResumeIdRoute = Route$7.update({
	id: "/printer/$resumeId",
	path: "/printer/$resumeId",
	getParentRoute: () => Route
});
var AuthLoginRoute = Route$8.update({
	id: "/auth/login",
	path: "/auth/login",
	getParentRoute: () => Route
});
var ApiHealthRoute = Route$9.update({
	id: "/api/health",
	path: "/api/health",
	getParentRoute: () => Route
});
var UsernameSlugRoute = Route$10.update({
	id: "/$username/$slug",
	path: "/$username/$slug",
	getParentRoute: () => Route
});
var BuilderResumeIdRouteRoute = Route$11.update({
	id: "/builder/$resumeId",
	path: "/builder/$resumeId",
	getParentRoute: () => Route
});
var DashboardResumesIndexRoute = Route$12.update({
	id: "/resumes/",
	path: "/resumes/",
	getParentRoute: () => DashboardRouteRoute
});
var BuilderResumeIdIndexRoute = Route$13.update({
	id: "/",
	path: "/",
	getParentRoute: () => BuilderResumeIdRouteRoute
});
var UploadsUserIdSplatRoute = Route$14.update({
	id: "/uploads/$userId/$",
	path: "/uploads/$userId/$",
	getParentRoute: () => Route
});
var DashboardSettingsProfileRoute = Route$15.update({
	id: "/settings/profile",
	path: "/settings/profile",
	getParentRoute: () => DashboardRouteRoute
});
var ApiRpcSplatRoute = Route$16.update({
	id: "/api/rpc/$",
	path: "/api/rpc/$",
	getParentRoute: () => Route
});
var ApiOpenapiSplatRoute = Route$17.update({
	id: "/api/openapi/$",
	path: "/api/openapi/$",
	getParentRoute: () => Route
});
var ApiAuthSplatRoute = Route$18.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route
});
var HomeRouteRouteChildren = { HomeIndexRoute };
var HomeRouteRouteWithChildren = HomeRouteRoute._addFileChildren(HomeRouteRouteChildren);
var DashboardRouteRouteChildren = {
	DashboardIndexRoute,
	DashboardSettingsProfileRoute,
	DashboardResumesIndexRoute
};
var DashboardRouteRouteWithChildren = DashboardRouteRoute._addFileChildren(DashboardRouteRouteChildren);
var BuilderResumeIdRouteRouteChildren = { BuilderResumeIdIndexRoute };
var rootRouteChildren = {
	HomeRouteRoute: HomeRouteRouteWithChildren,
	DashboardRouteRoute: DashboardRouteRouteWithChildren,
	SchemaDotjsonRoute,
	BuilderResumeIdRouteRoute: BuilderResumeIdRouteRoute._addFileChildren(BuilderResumeIdRouteRouteChildren),
	UsernameSlugRoute,
	ApiHealthRoute,
	AuthLoginRoute,
	PrinterResumeIdRoute,
	AuthIndexRoute,
	ApiAuthSplatRoute,
	ApiOpenapiSplatRoute,
	ApiRpcSplatRoute,
	UploadsUserIdSplatRoute
};
const routeTree = Route._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = async () => {
	const queryClient = getQueryClient();
	const [theme, locale, session$1, flags] = await Promise.all([
		getTheme(),
		getLocale(),
		getSession(),
		client.flags.get()
	]);
	await loadLocale(locale);
	const router$1 = createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultViewTransition: true,
		defaultStructuralSharing: true,
		defaultErrorComponent: ErrorScreen,
		defaultPendingComponent: LoadingScreen,
		defaultNotFoundComponent: NotFoundScreen,
		context: {
			orpc,
			queryClient,
			theme,
			locale,
			session: session$1,
			flags
		}
	});
	setupRouterSsrQueryIntegration({
		router: router$1,
		queryClient,
		handleRedirects: true,
		wrapQueryClient: true
	});
	return router$1;
};
export { getRouter };
