import { jsx as m, jsxs as G } from "react/jsx-runtime";
import * as L from "react";
import { useMemo as he, useRef as k, useState as U, useLayoutEffect as Ye, useCallback as ee, useEffect as tt } from "react";
function Ft(e) {
  const r = e.columnDef.meta;
  return !(r?.resizable === !1 || r?.sticky && r.resizable !== !0);
}
function Pe(e, r) {
  return e.columnDef.meta?.textAlign ?? r;
}
function Ke(e) {
  return e && e.endsWith("px") ? parseFloat(e) : 0;
}
function Ae({ table: e, tableWidth: r }) {
  const n = e.getAllLeafColumns(), o = n.map(
    (l) => Ke(l.columnDef.meta?.widthSize)
  ).reduce((l, s) => l + s, 0) > r;
  return /* @__PURE__ */ m("colgroup", { children: n.map((l, s) => {
    const a = l.columnDef.meta, u = s === n.length - 1;
    let d;
    return !o && u ? d = { width: "auto" } : a?.widthSize && (d = { width: a.widthSize }), /* @__PURE__ */ m("col", { style: d }, l.id);
  }) });
}
function Mt({
  table: e,
  tableWidth: r,
  data: n,
  stickyById: t,
  resizableCol: i = !1,
  reorderableCol: o = !1,
  sortableCol: l = !0,
  sortState: s,
  setSortState: a,
  defaultTextAlign: u,
  selectable: d,
  selectedRows: f,
  disableSelectRow: g,
  onDragStart: c,
  scrollRef: h,
  onResizeStart: p,
  setSelectedRows: S,
  expandable: v,
  expandedRows: F,
  setExpandedRows: _
}) {
  const b = n.map((A, M) => typeof A == "object" && A !== null && "id" in A ? A.id ?? M : M), O = !!d, R = d?.label, E = b.filter((A) => !g.includes(A)), V = E.filter((A) => f.has(A)).length, B = V === E.length && E.length > 0, ue = V > 0 && V < E.length, Y = () => {
    S((A) => {
      const M = new Set(A);
      return B ? E.forEach((T) => M.delete(T)) : E.forEach((T) => M.add(T)), M;
    });
  }, ce = !!v, de = v?.allButton || !1, me = b.every((A) => F.has(A)), Z = () => {
    _(me ? /* @__PURE__ */ new Set() : new Set(b));
  };
  return /* @__PURE__ */ m("div", { className: "table-scroll-sync", ref: h, children: /* @__PURE__ */ G("table", { className: "table table-external-header", children: [
    /* @__PURE__ */ m(
      Ae,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ m("thead", { children: e.getHeaderGroups().map((A) => /* @__PURE__ */ m("tr", { children: A.headers.map((M) => {
      const T = M.column.columnDef.meta, K = t.get(M.column.id), ge = Pe(M.column, u), fe = o && T?.reorderable !== !1 && !T?.sticky, y = (T?.sortable ?? l) && !T?.sticky && !["__draggable__", "__selectable__", "__expandable__"].includes(M.column.id), I = s?.columnId === M.column.id, D = () => {
        if (!y) return;
        let x;
        !s || s.columnId !== M.column.id ? x = { columnId: M.column.id, direction: "asc" } : s.direction === "asc" ? x = { columnId: M.column.id, direction: "desc" } : x = null, a(x);
      }, N = [
        K ? "is-sticky" : "",
        K?.side === "left" ? "is-sticky-left" : "",
        K?.side === "right" ? "is-sticky-right" : "",
        y ? "is-sortable" : "",
        I ? `is-sorted-${s.direction}` : ""
      ].filter(Boolean).join(" "), $ = K ? K.side === "left" ? { "--sticky-left": `${K.offset}px` } : { "--sticky-right": `${K.offset}px` } : void 0;
      return /* @__PURE__ */ m(
        "th",
        {
          "data-col-id": M.column.id,
          "data-fixed": T?.sticky ? "true" : void 0,
          "data-reorderable": fe ? void 0 : "false",
          className: N,
          style: $,
          onClick: D,
          children: /* @__PURE__ */ G("div", { className: `th-content align-${ge}`, children: [
            /* @__PURE__ */ m("div", { children: M.isPlaceholder ? null : M.column.id === "__selectable__" && O ? /* @__PURE__ */ G("label", { children: [
              /* @__PURE__ */ m(
                "input",
                {
                  type: "checkbox",
                  checked: B,
                  ref: (x) => {
                    x && (x.indeterminate = ue);
                  },
                  onChange: Y
                }
              ),
              R
            ] }) : M.column.id === "__expandable__" && ce && de ? /* @__PURE__ */ m(
              "button",
              {
                onClick: Z,
                className: `expand-all-button ${me ? "expanded" : ""}`,
                children: "⇅"
              }
            ) : (() => {
              const x = M.column.columnDef.header;
              return typeof x == "function" ? x({ column: M.column, table: e, header: M }) : x;
            })() }),
            y && /* @__PURE__ */ m("span", { className: "sort-indicator" }),
            fe && /* @__PURE__ */ m(
              "span",
              {
                className: "col-drag-handle",
                onClick: (x) => x.stopPropagation(),
                onPointerDown: (x) => {
                  x.preventDefault(), x.currentTarget.setPointerCapture(x.pointerId), c?.(M.column.id, x.nativeEvent);
                },
                children: "☰"
              }
            ),
            i && p && Ft(M.column) && /* @__PURE__ */ m(
              "span",
              {
                className: "col-resize-handle",
                onClick: (x) => x.stopPropagation(),
                onMouseDown: (x) => p(x, M.column)
              }
            )
          ] })
        },
        M.id
      );
    }) }, A.id)) })
  ] }) });
}
function bt({
  table: e,
  tableWidth: r,
  stickyById: n,
  defaultTextAlign: t,
  scrollRef: i
}) {
  return e.getAllLeafColumns().some(
    (s) => s.columnDef.meta?.internalHeader != null
  ) ? /* @__PURE__ */ m("div", { className: "table-scroll-sync", ref: i, children: /* @__PURE__ */ G("table", { className: "table table-internal-header", children: [
    /* @__PURE__ */ m(
      Ae,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ m("thead", { children: /* @__PURE__ */ m("tr", { children: e.getAllLeafColumns().map((s) => {
      const a = s.columnDef.meta?.internalHeader, u = n.get(s.id), d = Pe(s, t), f = [
        u ? "is-sticky" : "",
        u?.side === "left" ? "is-sticky-left" : "",
        u?.side === "right" ? "is-sticky-right" : ""
      ].filter(Boolean).join(" "), g = u ? u.side === "left" ? { "--sticky-left": `${u.offset}px` } : { "--sticky-right": `${u.offset}px` } : void 0;
      return /* @__PURE__ */ m(
        "th",
        {
          className: `${f} align-${d}`,
          style: g,
          children: typeof a == "function" ? a() : a ?? null
        },
        s.id
      );
    }) }) })
  ] }) }) : null;
}
function se(e, r) {
  return typeof e == "function" ? e(r) : e;
}
function X(e, r) {
  return (n) => {
    r.setState((t) => ({
      ...t,
      [e]: se(n, t[e])
    }));
  };
}
function Ve(e) {
  return e instanceof Function;
}
function Ot(e) {
  return Array.isArray(e) && e.every((r) => typeof r == "number");
}
function It(e, r) {
  const n = [], t = (i) => {
    i.forEach((o) => {
      n.push(o);
      const l = r(o);
      l != null && l.length && t(l);
    });
  };
  return t(e), n;
}
function w(e, r, n) {
  let t = [], i;
  return (o) => {
    let l;
    n.key && n.debug && (l = Date.now());
    const s = e(o);
    if (!(s.length !== t.length || s.some((d, f) => t[f] !== d)))
      return i;
    t = s;
    let u;
    if (n.key && n.debug && (u = Date.now()), i = r(...s), n == null || n.onChange == null || n.onChange(i), n.key && n.debug && n != null && n.debug()) {
      const d = Math.round((Date.now() - l) * 100) / 100, f = Math.round((Date.now() - u) * 100) / 100, g = f / 16, c = (h, p) => {
        for (h = String(h); h.length < p; )
          h = " " + h;
        return h;
      };
      console.info(`%c⏱ ${c(f, 5)} /${c(d, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * g, 120))}deg 100% 31%);`, n?.key);
    }
    return i;
  };
}
function C(e, r, n, t) {
  return {
    debug: () => {
      var i;
      return (i = e?.debugAll) != null ? i : e[r];
    },
    key: process.env.NODE_ENV === "development" && n,
    onChange: t
  };
}
function Pt(e, r, n, t) {
  const i = () => {
    var l;
    return (l = o.getValue()) != null ? l : e.options.renderFallbackValue;
  }, o = {
    id: `${r.id}_${n.id}`,
    row: r,
    column: n,
    getValue: () => r.getValue(t),
    renderValue: i,
    getContext: w(() => [e, n, r, o], (l, s, a, u) => ({
      table: l,
      column: s,
      row: a,
      cell: u,
      getValue: u.getValue,
      renderValue: u.renderValue
    }), C(e.options, "debugCells", "cell.getContext"))
  };
  return e._features.forEach((l) => {
    l.createCell == null || l.createCell(o, n, r, e);
  }, {}), o;
}
function At(e, r, n, t) {
  var i, o;
  const s = {
    ...e._getDefaultColumnDef(),
    ...r
  }, a = s.accessorKey;
  let u = (i = (o = s.id) != null ? o : a ? typeof String.prototype.replaceAll == "function" ? a.replaceAll(".", "_") : a.replace(/\./g, "_") : void 0) != null ? i : typeof s.header == "string" ? s.header : void 0, d;
  if (s.accessorFn ? d = s.accessorFn : a && (a.includes(".") ? d = (g) => {
    let c = g;
    for (const p of a.split(".")) {
      var h;
      c = (h = c) == null ? void 0 : h[p], process.env.NODE_ENV !== "production" && c === void 0 && console.warn(`"${p}" in deeply nested key "${a}" returned undefined.`);
    }
    return c;
  } : d = (g) => g[s.accessorKey]), !u)
    throw process.env.NODE_ENV !== "production" ? new Error(s.accessorFn ? "Columns require an id when using an accessorFn" : "Columns require an id when using a non-string header") : new Error();
  let f = {
    id: `${String(u)}`,
    accessorFn: d,
    parent: t,
    depth: n,
    columnDef: s,
    columns: [],
    getFlatColumns: w(() => [!0], () => {
      var g;
      return [f, ...(g = f.columns) == null ? void 0 : g.flatMap((c) => c.getFlatColumns())];
    }, C(e.options, "debugColumns", "column.getFlatColumns")),
    getLeafColumns: w(() => [e._getOrderColumnsFn()], (g) => {
      var c;
      if ((c = f.columns) != null && c.length) {
        let h = f.columns.flatMap((p) => p.getLeafColumns());
        return g(h);
      }
      return [f];
    }, C(e.options, "debugColumns", "column.getLeafColumns"))
  };
  for (const g of e._features)
    g.createColumn == null || g.createColumn(f, e);
  return f;
}
const H = "debugHeaders";
function nt(e, r, n) {
  var t;
  let o = {
    id: (t = n.id) != null ? t : r.id,
    column: r,
    index: n.index,
    isPlaceholder: !!n.isPlaceholder,
    placeholderId: n.placeholderId,
    depth: n.depth,
    subHeaders: [],
    colSpan: 0,
    rowSpan: 0,
    headerGroup: null,
    getLeafHeaders: () => {
      const l = [], s = (a) => {
        a.subHeaders && a.subHeaders.length && a.subHeaders.map(s), l.push(a);
      };
      return s(o), l;
    },
    getContext: () => ({
      table: e,
      header: o,
      column: r
    })
  };
  return e._features.forEach((l) => {
    l.createHeader == null || l.createHeader(o, e);
  }), o;
}
const Vt = {
  createTable: (e) => {
    e.getHeaderGroups = w(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (r, n, t, i) => {
      var o, l;
      const s = (o = t?.map((f) => n.find((g) => g.id === f)).filter(Boolean)) != null ? o : [], a = (l = i?.map((f) => n.find((g) => g.id === f)).filter(Boolean)) != null ? l : [], u = n.filter((f) => !(t != null && t.includes(f.id)) && !(i != null && i.includes(f.id)));
      return $e(r, [...s, ...u, ...a], e);
    }, C(e.options, H, "getHeaderGroups")), e.getCenterHeaderGroups = w(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (r, n, t, i) => (n = n.filter((o) => !(t != null && t.includes(o.id)) && !(i != null && i.includes(o.id))), $e(r, n, e, "center")), C(e.options, H, "getCenterHeaderGroups")), e.getLeftHeaderGroups = w(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left], (r, n, t) => {
      var i;
      const o = (i = t?.map((l) => n.find((s) => s.id === l)).filter(Boolean)) != null ? i : [];
      return $e(r, o, e, "left");
    }, C(e.options, H, "getLeftHeaderGroups")), e.getRightHeaderGroups = w(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.right], (r, n, t) => {
      var i;
      const o = (i = t?.map((l) => n.find((s) => s.id === l)).filter(Boolean)) != null ? i : [];
      return $e(r, o, e, "right");
    }, C(e.options, H, "getRightHeaderGroups")), e.getFooterGroups = w(() => [e.getHeaderGroups()], (r) => [...r].reverse(), C(e.options, H, "getFooterGroups")), e.getLeftFooterGroups = w(() => [e.getLeftHeaderGroups()], (r) => [...r].reverse(), C(e.options, H, "getLeftFooterGroups")), e.getCenterFooterGroups = w(() => [e.getCenterHeaderGroups()], (r) => [...r].reverse(), C(e.options, H, "getCenterFooterGroups")), e.getRightFooterGroups = w(() => [e.getRightHeaderGroups()], (r) => [...r].reverse(), C(e.options, H, "getRightFooterGroups")), e.getFlatHeaders = w(() => [e.getHeaderGroups()], (r) => r.map((n) => n.headers).flat(), C(e.options, H, "getFlatHeaders")), e.getLeftFlatHeaders = w(() => [e.getLeftHeaderGroups()], (r) => r.map((n) => n.headers).flat(), C(e.options, H, "getLeftFlatHeaders")), e.getCenterFlatHeaders = w(() => [e.getCenterHeaderGroups()], (r) => r.map((n) => n.headers).flat(), C(e.options, H, "getCenterFlatHeaders")), e.getRightFlatHeaders = w(() => [e.getRightHeaderGroups()], (r) => r.map((n) => n.headers).flat(), C(e.options, H, "getRightFlatHeaders")), e.getCenterLeafHeaders = w(() => [e.getCenterFlatHeaders()], (r) => r.filter((n) => {
      var t;
      return !((t = n.subHeaders) != null && t.length);
    }), C(e.options, H, "getCenterLeafHeaders")), e.getLeftLeafHeaders = w(() => [e.getLeftFlatHeaders()], (r) => r.filter((n) => {
      var t;
      return !((t = n.subHeaders) != null && t.length);
    }), C(e.options, H, "getLeftLeafHeaders")), e.getRightLeafHeaders = w(() => [e.getRightFlatHeaders()], (r) => r.filter((n) => {
      var t;
      return !((t = n.subHeaders) != null && t.length);
    }), C(e.options, H, "getRightLeafHeaders")), e.getLeafHeaders = w(() => [e.getLeftHeaderGroups(), e.getCenterHeaderGroups(), e.getRightHeaderGroups()], (r, n, t) => {
      var i, o, l, s, a, u;
      return [...(i = (o = r[0]) == null ? void 0 : o.headers) != null ? i : [], ...(l = (s = n[0]) == null ? void 0 : s.headers) != null ? l : [], ...(a = (u = t[0]) == null ? void 0 : u.headers) != null ? a : []].map((d) => d.getLeafHeaders()).flat();
    }, C(e.options, H, "getLeafHeaders"));
  }
};
function $e(e, r, n, t) {
  var i, o;
  let l = 0;
  const s = function(g, c) {
    c === void 0 && (c = 1), l = Math.max(l, c), g.filter((h) => h.getIsVisible()).forEach((h) => {
      var p;
      (p = h.columns) != null && p.length && s(h.columns, c + 1);
    }, 0);
  };
  s(e);
  let a = [];
  const u = (g, c) => {
    const h = {
      depth: c,
      id: [t, `${c}`].filter(Boolean).join("_"),
      headers: []
    }, p = [];
    g.forEach((S) => {
      const v = [...p].reverse()[0], F = S.column.depth === h.depth;
      let _, b = !1;
      if (F && S.column.parent ? _ = S.column.parent : (_ = S.column, b = !0), v && v?.column === _)
        v.subHeaders.push(S);
      else {
        const O = nt(n, _, {
          id: [t, c, _.id, S?.id].filter(Boolean).join("_"),
          isPlaceholder: b,
          placeholderId: b ? `${p.filter((R) => R.column === _).length}` : void 0,
          depth: c,
          index: p.length
        });
        O.subHeaders.push(S), p.push(O);
      }
      h.headers.push(S), S.headerGroup = h;
    }), a.push(h), c > 0 && u(p, c - 1);
  }, d = r.map((g, c) => nt(n, g, {
    depth: l,
    index: c
  }));
  u(d, l - 1), a.reverse();
  const f = (g) => g.filter((h) => h.column.getIsVisible()).map((h) => {
    let p = 0, S = 0, v = [0];
    h.subHeaders && h.subHeaders.length ? (v = [], f(h.subHeaders).forEach((_) => {
      let {
        colSpan: b,
        rowSpan: O
      } = _;
      p += b, v.push(O);
    })) : p = 1;
    const F = Math.min(...v);
    return S = S + F, h.colSpan = p, h.rowSpan = S, {
      colSpan: p,
      rowSpan: S
    };
  });
  return f((i = (o = a[0]) == null ? void 0 : o.headers) != null ? i : []), a;
}
const zt = (e, r, n, t, i, o, l) => {
  let s = {
    id: r,
    index: t,
    original: n,
    depth: i,
    parentId: l,
    _valuesCache: {},
    _uniqueValuesCache: {},
    getValue: (a) => {
      if (s._valuesCache.hasOwnProperty(a))
        return s._valuesCache[a];
      const u = e.getColumn(a);
      if (u != null && u.accessorFn)
        return s._valuesCache[a] = u.accessorFn(s.original, t), s._valuesCache[a];
    },
    getUniqueValues: (a) => {
      if (s._uniqueValuesCache.hasOwnProperty(a))
        return s._uniqueValuesCache[a];
      const u = e.getColumn(a);
      if (u != null && u.accessorFn)
        return u.columnDef.getUniqueValues ? (s._uniqueValuesCache[a] = u.columnDef.getUniqueValues(s.original, t), s._uniqueValuesCache[a]) : (s._uniqueValuesCache[a] = [s.getValue(a)], s._uniqueValuesCache[a]);
    },
    renderValue: (a) => {
      var u;
      return (u = s.getValue(a)) != null ? u : e.options.renderFallbackValue;
    },
    subRows: [],
    getLeafRows: () => It(s.subRows, (a) => a.subRows),
    getParentRow: () => s.parentId ? e.getRow(s.parentId, !0) : void 0,
    getParentRows: () => {
      let a = [], u = s;
      for (; ; ) {
        const d = u.getParentRow();
        if (!d) break;
        a.push(d), u = d;
      }
      return a.reverse();
    },
    getAllCells: w(() => [e.getAllLeafColumns()], (a) => a.map((u) => Pt(e, s, u, u.id)), C(e.options, "debugRows", "getAllCells")),
    _getAllCellsByColumnId: w(() => [s.getAllCells()], (a) => a.reduce((u, d) => (u[d.column.id] = d, u), {}), C(e.options, "debugRows", "getAllCellsByColumnId"))
  };
  for (let a = 0; a < e._features.length; a++) {
    const u = e._features[a];
    u == null || u.createRow == null || u.createRow(s, e);
  }
  return s;
}, Lt = {
  createColumn: (e, r) => {
    e._getFacetedRowModel = r.options.getFacetedRowModel && r.options.getFacetedRowModel(r, e.id), e.getFacetedRowModel = () => e._getFacetedRowModel ? e._getFacetedRowModel() : r.getPreFilteredRowModel(), e._getFacetedUniqueValues = r.options.getFacetedUniqueValues && r.options.getFacetedUniqueValues(r, e.id), e.getFacetedUniqueValues = () => e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getFacetedMinMaxValues = r.options.getFacetedMinMaxValues && r.options.getFacetedMinMaxValues(r, e.id), e.getFacetedMinMaxValues = () => {
      if (e._getFacetedMinMaxValues)
        return e._getFacetedMinMaxValues();
    };
  }
}, ut = (e, r, n) => {
  var t, i;
  const o = n == null || (t = n.toString()) == null ? void 0 : t.toLowerCase();
  return !!(!((i = e.getValue(r)) == null || (i = i.toString()) == null || (i = i.toLowerCase()) == null) && i.includes(o));
};
ut.autoRemove = (e) => Q(e);
const ct = (e, r, n) => {
  var t;
  return !!(!((t = e.getValue(r)) == null || (t = t.toString()) == null) && t.includes(n));
};
ct.autoRemove = (e) => Q(e);
const dt = (e, r, n) => {
  var t;
  return ((t = e.getValue(r)) == null || (t = t.toString()) == null ? void 0 : t.toLowerCase()) === n?.toLowerCase();
};
dt.autoRemove = (e) => Q(e);
const gt = (e, r, n) => {
  var t;
  return (t = e.getValue(r)) == null ? void 0 : t.includes(n);
};
gt.autoRemove = (e) => Q(e);
const ft = (e, r, n) => !n.some((t) => {
  var i;
  return !((i = e.getValue(r)) != null && i.includes(t));
});
ft.autoRemove = (e) => Q(e) || !(e != null && e.length);
const pt = (e, r, n) => n.some((t) => {
  var i;
  return (i = e.getValue(r)) == null ? void 0 : i.includes(t);
});
pt.autoRemove = (e) => Q(e) || !(e != null && e.length);
const ht = (e, r, n) => e.getValue(r) === n;
ht.autoRemove = (e) => Q(e);
const mt = (e, r, n) => e.getValue(r) == n;
mt.autoRemove = (e) => Q(e);
const Qe = (e, r, n) => {
  let [t, i] = n;
  const o = e.getValue(r);
  return o >= t && o <= i;
};
Qe.resolveFilterValue = (e) => {
  let [r, n] = e, t = typeof r != "number" ? parseFloat(r) : r, i = typeof n != "number" ? parseFloat(n) : n, o = r === null || Number.isNaN(t) ? -1 / 0 : t, l = n === null || Number.isNaN(i) ? 1 / 0 : i;
  if (o > l) {
    const s = o;
    o = l, l = s;
  }
  return [o, l];
};
Qe.autoRemove = (e) => Q(e) || Q(e[0]) && Q(e[1]);
const re = {
  includesString: ut,
  includesStringSensitive: ct,
  equalsString: dt,
  arrIncludes: gt,
  arrIncludesAll: ft,
  arrIncludesSome: pt,
  equals: ht,
  weakEquals: mt,
  inNumberRange: Qe
};
function Q(e) {
  return e == null || e === "";
}
const Dt = {
  getDefaultColumnDef: () => ({
    filterFn: "auto"
  }),
  getInitialState: (e) => ({
    columnFilters: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnFiltersChange: X("columnFilters", e),
    filterFromLeafRows: !1,
    maxLeafRowFilterDepth: 100
  }),
  createColumn: (e, r) => {
    e.getAutoFilterFn = () => {
      const n = r.getCoreRowModel().flatRows[0], t = n?.getValue(e.id);
      return typeof t == "string" ? re.includesString : typeof t == "number" ? re.inNumberRange : typeof t == "boolean" || t !== null && typeof t == "object" ? re.equals : Array.isArray(t) ? re.arrIncludes : re.weakEquals;
    }, e.getFilterFn = () => {
      var n, t;
      return Ve(e.columnDef.filterFn) ? e.columnDef.filterFn : e.columnDef.filterFn === "auto" ? e.getAutoFilterFn() : (
        // @ts-ignore
        (n = (t = r.options.filterFns) == null ? void 0 : t[e.columnDef.filterFn]) != null ? n : re[e.columnDef.filterFn]
      );
    }, e.getCanFilter = () => {
      var n, t, i;
      return ((n = e.columnDef.enableColumnFilter) != null ? n : !0) && ((t = r.options.enableColumnFilters) != null ? t : !0) && ((i = r.options.enableFilters) != null ? i : !0) && !!e.accessorFn;
    }, e.getIsFiltered = () => e.getFilterIndex() > -1, e.getFilterValue = () => {
      var n;
      return (n = r.getState().columnFilters) == null || (n = n.find((t) => t.id === e.id)) == null ? void 0 : n.value;
    }, e.getFilterIndex = () => {
      var n, t;
      return (n = (t = r.getState().columnFilters) == null ? void 0 : t.findIndex((i) => i.id === e.id)) != null ? n : -1;
    }, e.setFilterValue = (n) => {
      r.setColumnFilters((t) => {
        const i = e.getFilterFn(), o = t?.find((d) => d.id === e.id), l = se(n, o ? o.value : void 0);
        if (rt(i, l, e)) {
          var s;
          return (s = t?.filter((d) => d.id !== e.id)) != null ? s : [];
        }
        const a = {
          id: e.id,
          value: l
        };
        if (o) {
          var u;
          return (u = t?.map((d) => d.id === e.id ? a : d)) != null ? u : [];
        }
        return t != null && t.length ? [...t, a] : [a];
      });
    };
  },
  createRow: (e, r) => {
    e.columnFilters = {}, e.columnFiltersMeta = {};
  },
  createTable: (e) => {
    e.setColumnFilters = (r) => {
      const n = e.getAllLeafColumns(), t = (i) => {
        var o;
        return (o = se(r, i)) == null ? void 0 : o.filter((l) => {
          const s = n.find((a) => a.id === l.id);
          if (s) {
            const a = s.getFilterFn();
            if (rt(a, l.value, s))
              return !1;
          }
          return !0;
        });
      };
      e.options.onColumnFiltersChange == null || e.options.onColumnFiltersChange(t);
    }, e.resetColumnFilters = (r) => {
      var n, t;
      e.setColumnFilters(r ? [] : (n = (t = e.initialState) == null ? void 0 : t.columnFilters) != null ? n : []);
    }, e.getPreFilteredRowModel = () => e.getCoreRowModel(), e.getFilteredRowModel = () => (!e._getFilteredRowModel && e.options.getFilteredRowModel && (e._getFilteredRowModel = e.options.getFilteredRowModel(e)), e.options.manualFiltering || !e._getFilteredRowModel ? e.getPreFilteredRowModel() : e._getFilteredRowModel());
  }
};
function rt(e, r, n) {
  return (e && e.autoRemove ? e.autoRemove(r, n) : !1) || typeof r > "u" || typeof r == "string" && !r;
}
const Nt = (e, r, n) => n.reduce((t, i) => {
  const o = i.getValue(e);
  return t + (typeof o == "number" ? o : 0);
}, 0), kt = (e, r, n) => {
  let t;
  return n.forEach((i) => {
    const o = i.getValue(e);
    o != null && (t > o || t === void 0 && o >= o) && (t = o);
  }), t;
}, Ht = (e, r, n) => {
  let t;
  return n.forEach((i) => {
    const o = i.getValue(e);
    o != null && (t < o || t === void 0 && o >= o) && (t = o);
  }), t;
}, Gt = (e, r, n) => {
  let t, i;
  return n.forEach((o) => {
    const l = o.getValue(e);
    l != null && (t === void 0 ? l >= l && (t = i = l) : (t > l && (t = l), i < l && (i = l)));
  }), [t, i];
}, Tt = (e, r) => {
  let n = 0, t = 0;
  if (r.forEach((i) => {
    let o = i.getValue(e);
    o != null && (o = +o) >= o && (++n, t += o);
  }), n) return t / n;
}, Wt = (e, r) => {
  if (!r.length)
    return;
  const n = r.map((o) => o.getValue(e));
  if (!Ot(n))
    return;
  if (n.length === 1)
    return n[0];
  const t = Math.floor(n.length / 2), i = n.sort((o, l) => o - l);
  return n.length % 2 !== 0 ? i[t] : (i[t - 1] + i[t]) / 2;
}, Bt = (e, r) => Array.from(new Set(r.map((n) => n.getValue(e))).values()), jt = (e, r) => new Set(r.map((n) => n.getValue(e))).size, qt = (e, r) => r.length, ze = {
  sum: Nt,
  min: kt,
  max: Ht,
  extent: Gt,
  mean: Tt,
  median: Wt,
  unique: Bt,
  uniqueCount: jt,
  count: qt
}, Xt = {
  getDefaultColumnDef: () => ({
    aggregatedCell: (e) => {
      var r, n;
      return (r = (n = e.getValue()) == null || n.toString == null ? void 0 : n.toString()) != null ? r : null;
    },
    aggregationFn: "auto"
  }),
  getInitialState: (e) => ({
    grouping: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGroupingChange: X("grouping", e),
    groupedColumnMode: "reorder"
  }),
  createColumn: (e, r) => {
    e.toggleGrouping = () => {
      r.setGrouping((n) => n != null && n.includes(e.id) ? n.filter((t) => t !== e.id) : [...n ?? [], e.id]);
    }, e.getCanGroup = () => {
      var n, t;
      return ((n = e.columnDef.enableGrouping) != null ? n : !0) && ((t = r.options.enableGrouping) != null ? t : !0) && (!!e.accessorFn || !!e.columnDef.getGroupingValue);
    }, e.getIsGrouped = () => {
      var n;
      return (n = r.getState().grouping) == null ? void 0 : n.includes(e.id);
    }, e.getGroupedIndex = () => {
      var n;
      return (n = r.getState().grouping) == null ? void 0 : n.indexOf(e.id);
    }, e.getToggleGroupingHandler = () => {
      const n = e.getCanGroup();
      return () => {
        n && e.toggleGrouping();
      };
    }, e.getAutoAggregationFn = () => {
      const n = r.getCoreRowModel().flatRows[0], t = n?.getValue(e.id);
      if (typeof t == "number")
        return ze.sum;
      if (Object.prototype.toString.call(t) === "[object Date]")
        return ze.extent;
    }, e.getAggregationFn = () => {
      var n, t;
      if (!e)
        throw new Error();
      return Ve(e.columnDef.aggregationFn) ? e.columnDef.aggregationFn : e.columnDef.aggregationFn === "auto" ? e.getAutoAggregationFn() : (n = (t = r.options.aggregationFns) == null ? void 0 : t[e.columnDef.aggregationFn]) != null ? n : ze[e.columnDef.aggregationFn];
    };
  },
  createTable: (e) => {
    e.setGrouping = (r) => e.options.onGroupingChange == null ? void 0 : e.options.onGroupingChange(r), e.resetGrouping = (r) => {
      var n, t;
      e.setGrouping(r ? [] : (n = (t = e.initialState) == null ? void 0 : t.grouping) != null ? n : []);
    }, e.getPreGroupedRowModel = () => e.getFilteredRowModel(), e.getGroupedRowModel = () => (!e._getGroupedRowModel && e.options.getGroupedRowModel && (e._getGroupedRowModel = e.options.getGroupedRowModel(e)), e.options.manualGrouping || !e._getGroupedRowModel ? e.getPreGroupedRowModel() : e._getGroupedRowModel());
  },
  createRow: (e, r) => {
    e.getIsGrouped = () => !!e.groupingColumnId, e.getGroupingValue = (n) => {
      if (e._groupingValuesCache.hasOwnProperty(n))
        return e._groupingValuesCache[n];
      const t = r.getColumn(n);
      return t != null && t.columnDef.getGroupingValue ? (e._groupingValuesCache[n] = t.columnDef.getGroupingValue(e.original), e._groupingValuesCache[n]) : e.getValue(n);
    }, e._groupingValuesCache = {};
  },
  createCell: (e, r, n, t) => {
    e.getIsGrouped = () => r.getIsGrouped() && r.id === n.groupingColumnId, e.getIsPlaceholder = () => !e.getIsGrouped() && r.getIsGrouped(), e.getIsAggregated = () => {
      var i;
      return !e.getIsGrouped() && !e.getIsPlaceholder() && !!((i = n.subRows) != null && i.length);
    };
  }
};
function Ut(e, r, n) {
  if (!(r != null && r.length) || !n)
    return e;
  const t = e.filter((o) => !r.includes(o.id));
  return n === "remove" ? t : [...r.map((o) => e.find((l) => l.id === o)).filter(Boolean), ...t];
}
const Yt = {
  getInitialState: (e) => ({
    columnOrder: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnOrderChange: X("columnOrder", e)
  }),
  createColumn: (e, r) => {
    e.getIndex = w((n) => [Ee(r, n)], (n) => n.findIndex((t) => t.id === e.id), C(r.options, "debugColumns", "getIndex")), e.getIsFirstColumn = (n) => {
      var t;
      return ((t = Ee(r, n)[0]) == null ? void 0 : t.id) === e.id;
    }, e.getIsLastColumn = (n) => {
      var t;
      const i = Ee(r, n);
      return ((t = i[i.length - 1]) == null ? void 0 : t.id) === e.id;
    };
  },
  createTable: (e) => {
    e.setColumnOrder = (r) => e.options.onColumnOrderChange == null ? void 0 : e.options.onColumnOrderChange(r), e.resetColumnOrder = (r) => {
      var n;
      e.setColumnOrder(r ? [] : (n = e.initialState.columnOrder) != null ? n : []);
    }, e._getOrderColumnsFn = w(() => [e.getState().columnOrder, e.getState().grouping, e.options.groupedColumnMode], (r, n, t) => (i) => {
      let o = [];
      if (!(r != null && r.length))
        o = i;
      else {
        const l = [...r], s = [...i];
        for (; s.length && l.length; ) {
          const a = l.shift(), u = s.findIndex((d) => d.id === a);
          u > -1 && o.push(s.splice(u, 1)[0]);
        }
        o = [...o, ...s];
      }
      return Ut(o, n, t);
    }, C(e.options, "debugTable", "_getOrderColumnsFn"));
  }
}, Le = () => ({
  left: [],
  right: []
}), Kt = {
  getInitialState: (e) => ({
    columnPinning: Le(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnPinningChange: X("columnPinning", e)
  }),
  createColumn: (e, r) => {
    e.pin = (n) => {
      const t = e.getLeafColumns().map((i) => i.id).filter(Boolean);
      r.setColumnPinning((i) => {
        var o, l;
        if (n === "right") {
          var s, a;
          return {
            left: ((s = i?.left) != null ? s : []).filter((f) => !(t != null && t.includes(f))),
            right: [...((a = i?.right) != null ? a : []).filter((f) => !(t != null && t.includes(f))), ...t]
          };
        }
        if (n === "left") {
          var u, d;
          return {
            left: [...((u = i?.left) != null ? u : []).filter((f) => !(t != null && t.includes(f))), ...t],
            right: ((d = i?.right) != null ? d : []).filter((f) => !(t != null && t.includes(f)))
          };
        }
        return {
          left: ((o = i?.left) != null ? o : []).filter((f) => !(t != null && t.includes(f))),
          right: ((l = i?.right) != null ? l : []).filter((f) => !(t != null && t.includes(f)))
        };
      });
    }, e.getCanPin = () => e.getLeafColumns().some((t) => {
      var i, o, l;
      return ((i = t.columnDef.enablePinning) != null ? i : !0) && ((o = (l = r.options.enableColumnPinning) != null ? l : r.options.enablePinning) != null ? o : !0);
    }), e.getIsPinned = () => {
      const n = e.getLeafColumns().map((s) => s.id), {
        left: t,
        right: i
      } = r.getState().columnPinning, o = n.some((s) => t?.includes(s)), l = n.some((s) => i?.includes(s));
      return o ? "left" : l ? "right" : !1;
    }, e.getPinnedIndex = () => {
      var n, t;
      const i = e.getIsPinned();
      return i ? (n = (t = r.getState().columnPinning) == null || (t = t[i]) == null ? void 0 : t.indexOf(e.id)) != null ? n : -1 : 0;
    };
  },
  createRow: (e, r) => {
    e.getCenterVisibleCells = w(() => [e._getAllVisibleCells(), r.getState().columnPinning.left, r.getState().columnPinning.right], (n, t, i) => {
      const o = [...t ?? [], ...i ?? []];
      return n.filter((l) => !o.includes(l.column.id));
    }, C(r.options, "debugRows", "getCenterVisibleCells")), e.getLeftVisibleCells = w(() => [e._getAllVisibleCells(), r.getState().columnPinning.left], (n, t) => (t ?? []).map((o) => n.find((l) => l.column.id === o)).filter(Boolean).map((o) => ({
      ...o,
      position: "left"
    })), C(r.options, "debugRows", "getLeftVisibleCells")), e.getRightVisibleCells = w(() => [e._getAllVisibleCells(), r.getState().columnPinning.right], (n, t) => (t ?? []).map((o) => n.find((l) => l.column.id === o)).filter(Boolean).map((o) => ({
      ...o,
      position: "right"
    })), C(r.options, "debugRows", "getRightVisibleCells"));
  },
  createTable: (e) => {
    e.setColumnPinning = (r) => e.options.onColumnPinningChange == null ? void 0 : e.options.onColumnPinningChange(r), e.resetColumnPinning = (r) => {
      var n, t;
      return e.setColumnPinning(r ? Le() : (n = (t = e.initialState) == null ? void 0 : t.columnPinning) != null ? n : Le());
    }, e.getIsSomeColumnsPinned = (r) => {
      var n;
      const t = e.getState().columnPinning;
      if (!r) {
        var i, o;
        return !!((i = t.left) != null && i.length || (o = t.right) != null && o.length);
      }
      return !!((n = t[r]) != null && n.length);
    }, e.getLeftLeafColumns = w(() => [e.getAllLeafColumns(), e.getState().columnPinning.left], (r, n) => (n ?? []).map((t) => r.find((i) => i.id === t)).filter(Boolean), C(e.options, "debugColumns", "getLeftLeafColumns")), e.getRightLeafColumns = w(() => [e.getAllLeafColumns(), e.getState().columnPinning.right], (r, n) => (n ?? []).map((t) => r.find((i) => i.id === t)).filter(Boolean), C(e.options, "debugColumns", "getRightLeafColumns")), e.getCenterLeafColumns = w(() => [e.getAllLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (r, n, t) => {
      const i = [...n ?? [], ...t ?? []];
      return r.filter((o) => !i.includes(o.id));
    }, C(e.options, "debugColumns", "getCenterLeafColumns"));
  }
};
function Qt(e) {
  return e || (typeof document < "u" ? document : null);
}
const Fe = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
}, De = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: !1,
  columnSizingStart: []
}), Zt = {
  getDefaultColumnDef: () => Fe,
  getInitialState: (e) => ({
    columnSizing: {},
    columnSizingInfo: De(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnSizingChange: X("columnSizing", e),
    onColumnSizingInfoChange: X("columnSizingInfo", e)
  }),
  createColumn: (e, r) => {
    e.getSize = () => {
      var n, t, i;
      const o = r.getState().columnSizing[e.id];
      return Math.min(Math.max((n = e.columnDef.minSize) != null ? n : Fe.minSize, (t = o ?? e.columnDef.size) != null ? t : Fe.size), (i = e.columnDef.maxSize) != null ? i : Fe.maxSize);
    }, e.getStart = w((n) => [n, Ee(r, n), r.getState().columnSizing], (n, t) => t.slice(0, e.getIndex(n)).reduce((i, o) => i + o.getSize(), 0), C(r.options, "debugColumns", "getStart")), e.getAfter = w((n) => [n, Ee(r, n), r.getState().columnSizing], (n, t) => t.slice(e.getIndex(n) + 1).reduce((i, o) => i + o.getSize(), 0), C(r.options, "debugColumns", "getAfter")), e.resetSize = () => {
      r.setColumnSizing((n) => {
        let {
          [e.id]: t,
          ...i
        } = n;
        return i;
      });
    }, e.getCanResize = () => {
      var n, t;
      return ((n = e.columnDef.enableResizing) != null ? n : !0) && ((t = r.options.enableColumnResizing) != null ? t : !0);
    }, e.getIsResizing = () => r.getState().columnSizingInfo.isResizingColumn === e.id;
  },
  createHeader: (e, r) => {
    e.getSize = () => {
      let n = 0;
      const t = (i) => {
        if (i.subHeaders.length)
          i.subHeaders.forEach(t);
        else {
          var o;
          n += (o = i.column.getSize()) != null ? o : 0;
        }
      };
      return t(e), n;
    }, e.getStart = () => {
      if (e.index > 0) {
        const n = e.headerGroup.headers[e.index - 1];
        return n.getStart() + n.getSize();
      }
      return 0;
    }, e.getResizeHandler = (n) => {
      const t = r.getColumn(e.column.id), i = t?.getCanResize();
      return (o) => {
        if (!t || !i || (o.persist == null || o.persist(), Ne(o) && o.touches && o.touches.length > 1))
          return;
        const l = e.getSize(), s = e ? e.getLeafHeaders().map((v) => [v.column.id, v.column.getSize()]) : [[t.id, t.getSize()]], a = Ne(o) ? Math.round(o.touches[0].clientX) : o.clientX, u = {}, d = (v, F) => {
          typeof F == "number" && (r.setColumnSizingInfo((_) => {
            var b, O;
            const R = r.options.columnResizeDirection === "rtl" ? -1 : 1, E = (F - ((b = _?.startOffset) != null ? b : 0)) * R, V = Math.max(E / ((O = _?.startSize) != null ? O : 0), -0.999999);
            return _.columnSizingStart.forEach((B) => {
              let [ue, Y] = B;
              u[ue] = Math.round(Math.max(Y + Y * V, 0) * 100) / 100;
            }), {
              ..._,
              deltaOffset: E,
              deltaPercentage: V
            };
          }), (r.options.columnResizeMode === "onChange" || v === "end") && r.setColumnSizing((_) => ({
            ..._,
            ...u
          })));
        }, f = (v) => d("move", v), g = (v) => {
          d("end", v), r.setColumnSizingInfo((F) => ({
            ...F,
            isResizingColumn: !1,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        }, c = Qt(n), h = {
          moveHandler: (v) => f(v.clientX),
          upHandler: (v) => {
            c?.removeEventListener("mousemove", h.moveHandler), c?.removeEventListener("mouseup", h.upHandler), g(v.clientX);
          }
        }, p = {
          moveHandler: (v) => (v.cancelable && (v.preventDefault(), v.stopPropagation()), f(v.touches[0].clientX), !1),
          upHandler: (v) => {
            var F;
            c?.removeEventListener("touchmove", p.moveHandler), c?.removeEventListener("touchend", p.upHandler), v.cancelable && (v.preventDefault(), v.stopPropagation()), g((F = v.touches[0]) == null ? void 0 : F.clientX);
          }
        }, S = Jt() ? {
          passive: !1
        } : !1;
        Ne(o) ? (c?.addEventListener("touchmove", p.moveHandler, S), c?.addEventListener("touchend", p.upHandler, S)) : (c?.addEventListener("mousemove", h.moveHandler, S), c?.addEventListener("mouseup", h.upHandler, S)), r.setColumnSizingInfo((v) => ({
          ...v,
          startOffset: a,
          startSize: l,
          deltaOffset: 0,
          deltaPercentage: 0,
          columnSizingStart: s,
          isResizingColumn: t.id
        }));
      };
    };
  },
  createTable: (e) => {
    e.setColumnSizing = (r) => e.options.onColumnSizingChange == null ? void 0 : e.options.onColumnSizingChange(r), e.setColumnSizingInfo = (r) => e.options.onColumnSizingInfoChange == null ? void 0 : e.options.onColumnSizingInfoChange(r), e.resetColumnSizing = (r) => {
      var n;
      e.setColumnSizing(r ? {} : (n = e.initialState.columnSizing) != null ? n : {});
    }, e.resetHeaderSizeInfo = (r) => {
      var n;
      e.setColumnSizingInfo(r ? De() : (n = e.initialState.columnSizingInfo) != null ? n : De());
    }, e.getTotalSize = () => {
      var r, n;
      return (r = (n = e.getHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((t, i) => t + i.getSize(), 0)) != null ? r : 0;
    }, e.getLeftTotalSize = () => {
      var r, n;
      return (r = (n = e.getLeftHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((t, i) => t + i.getSize(), 0)) != null ? r : 0;
    }, e.getCenterTotalSize = () => {
      var r, n;
      return (r = (n = e.getCenterHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((t, i) => t + i.getSize(), 0)) != null ? r : 0;
    }, e.getRightTotalSize = () => {
      var r, n;
      return (r = (n = e.getRightHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((t, i) => t + i.getSize(), 0)) != null ? r : 0;
    };
  }
};
let Me = null;
function Jt() {
  if (typeof Me == "boolean") return Me;
  let e = !1;
  try {
    const r = {
      get passive() {
        return e = !0, !1;
      }
    }, n = () => {
    };
    window.addEventListener("test", n, r), window.removeEventListener("test", n);
  } catch {
    e = !1;
  }
  return Me = e, Me;
}
function Ne(e) {
  return e.type === "touchstart";
}
const en = {
  getInitialState: (e) => ({
    columnVisibility: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnVisibilityChange: X("columnVisibility", e)
  }),
  createColumn: (e, r) => {
    e.toggleVisibility = (n) => {
      e.getCanHide() && r.setColumnVisibility((t) => ({
        ...t,
        [e.id]: n ?? !e.getIsVisible()
      }));
    }, e.getIsVisible = () => {
      var n, t;
      const i = e.columns;
      return (n = i.length ? i.some((o) => o.getIsVisible()) : (t = r.getState().columnVisibility) == null ? void 0 : t[e.id]) != null ? n : !0;
    }, e.getCanHide = () => {
      var n, t;
      return ((n = e.columnDef.enableHiding) != null ? n : !0) && ((t = r.options.enableHiding) != null ? t : !0);
    }, e.getToggleVisibilityHandler = () => (n) => {
      e.toggleVisibility == null || e.toggleVisibility(n.target.checked);
    };
  },
  createRow: (e, r) => {
    e._getAllVisibleCells = w(() => [e.getAllCells(), r.getState().columnVisibility], (n) => n.filter((t) => t.column.getIsVisible()), C(r.options, "debugRows", "_getAllVisibleCells")), e.getVisibleCells = w(() => [e.getLeftVisibleCells(), e.getCenterVisibleCells(), e.getRightVisibleCells()], (n, t, i) => [...n, ...t, ...i], C(r.options, "debugRows", "getVisibleCells"));
  },
  createTable: (e) => {
    const r = (n, t) => w(() => [t(), t().filter((i) => i.getIsVisible()).map((i) => i.id).join("_")], (i) => i.filter((o) => o.getIsVisible == null ? void 0 : o.getIsVisible()), C(e.options, "debugColumns", n));
    e.getVisibleFlatColumns = r("getVisibleFlatColumns", () => e.getAllFlatColumns()), e.getVisibleLeafColumns = r("getVisibleLeafColumns", () => e.getAllLeafColumns()), e.getLeftVisibleLeafColumns = r("getLeftVisibleLeafColumns", () => e.getLeftLeafColumns()), e.getRightVisibleLeafColumns = r("getRightVisibleLeafColumns", () => e.getRightLeafColumns()), e.getCenterVisibleLeafColumns = r("getCenterVisibleLeafColumns", () => e.getCenterLeafColumns()), e.setColumnVisibility = (n) => e.options.onColumnVisibilityChange == null ? void 0 : e.options.onColumnVisibilityChange(n), e.resetColumnVisibility = (n) => {
      var t;
      e.setColumnVisibility(n ? {} : (t = e.initialState.columnVisibility) != null ? t : {});
    }, e.toggleAllColumnsVisible = (n) => {
      var t;
      n = (t = n) != null ? t : !e.getIsAllColumnsVisible(), e.setColumnVisibility(e.getAllLeafColumns().reduce((i, o) => ({
        ...i,
        [o.id]: n || !(o.getCanHide != null && o.getCanHide())
      }), {}));
    }, e.getIsAllColumnsVisible = () => !e.getAllLeafColumns().some((n) => !(n.getIsVisible != null && n.getIsVisible())), e.getIsSomeColumnsVisible = () => e.getAllLeafColumns().some((n) => n.getIsVisible == null ? void 0 : n.getIsVisible()), e.getToggleAllColumnsVisibilityHandler = () => (n) => {
      var t;
      e.toggleAllColumnsVisible((t = n.target) == null ? void 0 : t.checked);
    };
  }
};
function Ee(e, r) {
  return r ? r === "center" ? e.getCenterVisibleLeafColumns() : r === "left" ? e.getLeftVisibleLeafColumns() : e.getRightVisibleLeafColumns() : e.getVisibleLeafColumns();
}
const tn = {
  createTable: (e) => {
    e._getGlobalFacetedRowModel = e.options.getFacetedRowModel && e.options.getFacetedRowModel(e, "__global__"), e.getGlobalFacetedRowModel = () => e.options.manualFiltering || !e._getGlobalFacetedRowModel ? e.getPreFilteredRowModel() : e._getGlobalFacetedRowModel(), e._getGlobalFacetedUniqueValues = e.options.getFacetedUniqueValues && e.options.getFacetedUniqueValues(e, "__global__"), e.getGlobalFacetedUniqueValues = () => e._getGlobalFacetedUniqueValues ? e._getGlobalFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getGlobalFacetedMinMaxValues = e.options.getFacetedMinMaxValues && e.options.getFacetedMinMaxValues(e, "__global__"), e.getGlobalFacetedMinMaxValues = () => {
      if (e._getGlobalFacetedMinMaxValues)
        return e._getGlobalFacetedMinMaxValues();
    };
  }
}, nn = {
  getInitialState: (e) => ({
    globalFilter: void 0,
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGlobalFilterChange: X("globalFilter", e),
    globalFilterFn: "auto",
    getColumnCanGlobalFilter: (r) => {
      var n;
      const t = (n = e.getCoreRowModel().flatRows[0]) == null || (n = n._getAllCellsByColumnId()[r.id]) == null ? void 0 : n.getValue();
      return typeof t == "string" || typeof t == "number";
    }
  }),
  createColumn: (e, r) => {
    e.getCanGlobalFilter = () => {
      var n, t, i, o;
      return ((n = e.columnDef.enableGlobalFilter) != null ? n : !0) && ((t = r.options.enableGlobalFilter) != null ? t : !0) && ((i = r.options.enableFilters) != null ? i : !0) && ((o = r.options.getColumnCanGlobalFilter == null ? void 0 : r.options.getColumnCanGlobalFilter(e)) != null ? o : !0) && !!e.accessorFn;
    };
  },
  createTable: (e) => {
    e.getGlobalAutoFilterFn = () => re.includesString, e.getGlobalFilterFn = () => {
      var r, n;
      const {
        globalFilterFn: t
      } = e.options;
      return Ve(t) ? t : t === "auto" ? e.getGlobalAutoFilterFn() : (r = (n = e.options.filterFns) == null ? void 0 : n[t]) != null ? r : re[t];
    }, e.setGlobalFilter = (r) => {
      e.options.onGlobalFilterChange == null || e.options.onGlobalFilterChange(r);
    }, e.resetGlobalFilter = (r) => {
      e.setGlobalFilter(r ? void 0 : e.initialState.globalFilter);
    };
  }
}, rn = {
  getInitialState: (e) => ({
    expanded: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onExpandedChange: X("expanded", e),
    paginateExpandedRows: !0
  }),
  createTable: (e) => {
    let r = !1, n = !1;
    e._autoResetExpanded = () => {
      var t, i;
      if (!r) {
        e._queue(() => {
          r = !0;
        });
        return;
      }
      if ((t = (i = e.options.autoResetAll) != null ? i : e.options.autoResetExpanded) != null ? t : !e.options.manualExpanding) {
        if (n) return;
        n = !0, e._queue(() => {
          e.resetExpanded(), n = !1;
        });
      }
    }, e.setExpanded = (t) => e.options.onExpandedChange == null ? void 0 : e.options.onExpandedChange(t), e.toggleAllRowsExpanded = (t) => {
      t ?? !e.getIsAllRowsExpanded() ? e.setExpanded(!0) : e.setExpanded({});
    }, e.resetExpanded = (t) => {
      var i, o;
      e.setExpanded(t ? {} : (i = (o = e.initialState) == null ? void 0 : o.expanded) != null ? i : {});
    }, e.getCanSomeRowsExpand = () => e.getPrePaginationRowModel().flatRows.some((t) => t.getCanExpand()), e.getToggleAllRowsExpandedHandler = () => (t) => {
      t.persist == null || t.persist(), e.toggleAllRowsExpanded();
    }, e.getIsSomeRowsExpanded = () => {
      const t = e.getState().expanded;
      return t === !0 || Object.values(t).some(Boolean);
    }, e.getIsAllRowsExpanded = () => {
      const t = e.getState().expanded;
      return typeof t == "boolean" ? t === !0 : !(!Object.keys(t).length || e.getRowModel().flatRows.some((i) => !i.getIsExpanded()));
    }, e.getExpandedDepth = () => {
      let t = 0;
      return (e.getState().expanded === !0 ? Object.keys(e.getRowModel().rowsById) : Object.keys(e.getState().expanded)).forEach((o) => {
        const l = o.split(".");
        t = Math.max(t, l.length);
      }), t;
    }, e.getPreExpandedRowModel = () => e.getSortedRowModel(), e.getExpandedRowModel = () => (!e._getExpandedRowModel && e.options.getExpandedRowModel && (e._getExpandedRowModel = e.options.getExpandedRowModel(e)), e.options.manualExpanding || !e._getExpandedRowModel ? e.getPreExpandedRowModel() : e._getExpandedRowModel());
  },
  createRow: (e, r) => {
    e.toggleExpanded = (n) => {
      r.setExpanded((t) => {
        var i;
        const o = t === !0 ? !0 : !!(t != null && t[e.id]);
        let l = {};
        if (t === !0 ? Object.keys(r.getRowModel().rowsById).forEach((s) => {
          l[s] = !0;
        }) : l = t, n = (i = n) != null ? i : !o, !o && n)
          return {
            ...l,
            [e.id]: !0
          };
        if (o && !n) {
          const {
            [e.id]: s,
            ...a
          } = l;
          return a;
        }
        return t;
      });
    }, e.getIsExpanded = () => {
      var n;
      const t = r.getState().expanded;
      return !!((n = r.options.getIsRowExpanded == null ? void 0 : r.options.getIsRowExpanded(e)) != null ? n : t === !0 || t?.[e.id]);
    }, e.getCanExpand = () => {
      var n, t, i;
      return (n = r.options.getRowCanExpand == null ? void 0 : r.options.getRowCanExpand(e)) != null ? n : ((t = r.options.enableExpanding) != null ? t : !0) && !!((i = e.subRows) != null && i.length);
    }, e.getIsAllParentsExpanded = () => {
      let n = !0, t = e;
      for (; n && t.parentId; )
        t = r.getRow(t.parentId, !0), n = t.getIsExpanded();
      return n;
    }, e.getToggleExpandedHandler = () => {
      const n = e.getCanExpand();
      return () => {
        n && e.toggleExpanded();
      };
    };
  }
}, Be = 0, je = 10, ke = () => ({
  pageIndex: Be,
  pageSize: je
}), on = {
  getInitialState: (e) => ({
    ...e,
    pagination: {
      ...ke(),
      ...e?.pagination
    }
  }),
  getDefaultOptions: (e) => ({
    onPaginationChange: X("pagination", e)
  }),
  createTable: (e) => {
    let r = !1, n = !1;
    e._autoResetPageIndex = () => {
      var t, i;
      if (!r) {
        e._queue(() => {
          r = !0;
        });
        return;
      }
      if ((t = (i = e.options.autoResetAll) != null ? i : e.options.autoResetPageIndex) != null ? t : !e.options.manualPagination) {
        if (n) return;
        n = !0, e._queue(() => {
          e.resetPageIndex(), n = !1;
        });
      }
    }, e.setPagination = (t) => {
      const i = (o) => se(t, o);
      return e.options.onPaginationChange == null ? void 0 : e.options.onPaginationChange(i);
    }, e.resetPagination = (t) => {
      var i;
      e.setPagination(t ? ke() : (i = e.initialState.pagination) != null ? i : ke());
    }, e.setPageIndex = (t) => {
      e.setPagination((i) => {
        let o = se(t, i.pageIndex);
        const l = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
        return o = Math.max(0, Math.min(o, l)), {
          ...i,
          pageIndex: o
        };
      });
    }, e.resetPageIndex = (t) => {
      var i, o;
      e.setPageIndex(t ? Be : (i = (o = e.initialState) == null || (o = o.pagination) == null ? void 0 : o.pageIndex) != null ? i : Be);
    }, e.resetPageSize = (t) => {
      var i, o;
      e.setPageSize(t ? je : (i = (o = e.initialState) == null || (o = o.pagination) == null ? void 0 : o.pageSize) != null ? i : je);
    }, e.setPageSize = (t) => {
      e.setPagination((i) => {
        const o = Math.max(1, se(t, i.pageSize)), l = i.pageSize * i.pageIndex, s = Math.floor(l / o);
        return {
          ...i,
          pageIndex: s,
          pageSize: o
        };
      });
    }, e.setPageCount = (t) => e.setPagination((i) => {
      var o;
      let l = se(t, (o = e.options.pageCount) != null ? o : -1);
      return typeof l == "number" && (l = Math.max(-1, l)), {
        ...i,
        pageCount: l
      };
    }), e.getPageOptions = w(() => [e.getPageCount()], (t) => {
      let i = [];
      return t && t > 0 && (i = [...new Array(t)].fill(null).map((o, l) => l)), i;
    }, C(e.options, "debugTable", "getPageOptions")), e.getCanPreviousPage = () => e.getState().pagination.pageIndex > 0, e.getCanNextPage = () => {
      const {
        pageIndex: t
      } = e.getState().pagination, i = e.getPageCount();
      return i === -1 ? !0 : i === 0 ? !1 : t < i - 1;
    }, e.previousPage = () => e.setPageIndex((t) => t - 1), e.nextPage = () => e.setPageIndex((t) => t + 1), e.firstPage = () => e.setPageIndex(0), e.lastPage = () => e.setPageIndex(e.getPageCount() - 1), e.getPrePaginationRowModel = () => e.getExpandedRowModel(), e.getPaginationRowModel = () => (!e._getPaginationRowModel && e.options.getPaginationRowModel && (e._getPaginationRowModel = e.options.getPaginationRowModel(e)), e.options.manualPagination || !e._getPaginationRowModel ? e.getPrePaginationRowModel() : e._getPaginationRowModel()), e.getPageCount = () => {
      var t;
      return (t = e.options.pageCount) != null ? t : Math.ceil(e.getRowCount() / e.getState().pagination.pageSize);
    }, e.getRowCount = () => {
      var t;
      return (t = e.options.rowCount) != null ? t : e.getPrePaginationRowModel().rows.length;
    };
  }
}, He = () => ({
  top: [],
  bottom: []
}), ln = {
  getInitialState: (e) => ({
    rowPinning: He(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowPinningChange: X("rowPinning", e)
  }),
  createRow: (e, r) => {
    e.pin = (n, t, i) => {
      const o = t ? e.getLeafRows().map((a) => {
        let {
          id: u
        } = a;
        return u;
      }) : [], l = i ? e.getParentRows().map((a) => {
        let {
          id: u
        } = a;
        return u;
      }) : [], s = /* @__PURE__ */ new Set([...l, e.id, ...o]);
      r.setRowPinning((a) => {
        var u, d;
        if (n === "bottom") {
          var f, g;
          return {
            top: ((f = a?.top) != null ? f : []).filter((p) => !(s != null && s.has(p))),
            bottom: [...((g = a?.bottom) != null ? g : []).filter((p) => !(s != null && s.has(p))), ...Array.from(s)]
          };
        }
        if (n === "top") {
          var c, h;
          return {
            top: [...((c = a?.top) != null ? c : []).filter((p) => !(s != null && s.has(p))), ...Array.from(s)],
            bottom: ((h = a?.bottom) != null ? h : []).filter((p) => !(s != null && s.has(p)))
          };
        }
        return {
          top: ((u = a?.top) != null ? u : []).filter((p) => !(s != null && s.has(p))),
          bottom: ((d = a?.bottom) != null ? d : []).filter((p) => !(s != null && s.has(p)))
        };
      });
    }, e.getCanPin = () => {
      var n;
      const {
        enableRowPinning: t,
        enablePinning: i
      } = r.options;
      return typeof t == "function" ? t(e) : (n = t ?? i) != null ? n : !0;
    }, e.getIsPinned = () => {
      const n = [e.id], {
        top: t,
        bottom: i
      } = r.getState().rowPinning, o = n.some((s) => t?.includes(s)), l = n.some((s) => i?.includes(s));
      return o ? "top" : l ? "bottom" : !1;
    }, e.getPinnedIndex = () => {
      var n, t;
      const i = e.getIsPinned();
      if (!i) return -1;
      const o = (n = i === "top" ? r.getTopRows() : r.getBottomRows()) == null ? void 0 : n.map((l) => {
        let {
          id: s
        } = l;
        return s;
      });
      return (t = o?.indexOf(e.id)) != null ? t : -1;
    };
  },
  createTable: (e) => {
    e.setRowPinning = (r) => e.options.onRowPinningChange == null ? void 0 : e.options.onRowPinningChange(r), e.resetRowPinning = (r) => {
      var n, t;
      return e.setRowPinning(r ? He() : (n = (t = e.initialState) == null ? void 0 : t.rowPinning) != null ? n : He());
    }, e.getIsSomeRowsPinned = (r) => {
      var n;
      const t = e.getState().rowPinning;
      if (!r) {
        var i, o;
        return !!((i = t.top) != null && i.length || (o = t.bottom) != null && o.length);
      }
      return !!((n = t[r]) != null && n.length);
    }, e._getPinnedRows = (r, n, t) => {
      var i;
      return ((i = e.options.keepPinnedRows) == null || i ? (
        //get all rows that are pinned even if they would not be otherwise visible
        //account for expanded parent rows, but not pagination or filtering
        (n ?? []).map((l) => {
          const s = e.getRow(l, !0);
          return s.getIsAllParentsExpanded() ? s : null;
        })
      ) : (
        //else get only visible rows that are pinned
        (n ?? []).map((l) => r.find((s) => s.id === l))
      )).filter(Boolean).map((l) => ({
        ...l,
        position: t
      }));
    }, e.getTopRows = w(() => [e.getRowModel().rows, e.getState().rowPinning.top], (r, n) => e._getPinnedRows(r, n, "top"), C(e.options, "debugRows", "getTopRows")), e.getBottomRows = w(() => [e.getRowModel().rows, e.getState().rowPinning.bottom], (r, n) => e._getPinnedRows(r, n, "bottom"), C(e.options, "debugRows", "getBottomRows")), e.getCenterRows = w(() => [e.getRowModel().rows, e.getState().rowPinning.top, e.getState().rowPinning.bottom], (r, n, t) => {
      const i = /* @__PURE__ */ new Set([...n ?? [], ...t ?? []]);
      return r.filter((o) => !i.has(o.id));
    }, C(e.options, "debugRows", "getCenterRows"));
  }
}, sn = {
  getInitialState: (e) => ({
    rowSelection: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowSelectionChange: X("rowSelection", e),
    enableRowSelection: !0,
    enableMultiRowSelection: !0,
    enableSubRowSelection: !0
    // enableGroupingRowSelection: false,
    // isAdditiveSelectEvent: (e: unknown) => !!e.metaKey,
    // isInclusiveSelectEvent: (e: unknown) => !!e.shiftKey,
  }),
  createTable: (e) => {
    e.setRowSelection = (r) => e.options.onRowSelectionChange == null ? void 0 : e.options.onRowSelectionChange(r), e.resetRowSelection = (r) => {
      var n;
      return e.setRowSelection(r ? {} : (n = e.initialState.rowSelection) != null ? n : {});
    }, e.toggleAllRowsSelected = (r) => {
      e.setRowSelection((n) => {
        r = typeof r < "u" ? r : !e.getIsAllRowsSelected();
        const t = {
          ...n
        }, i = e.getPreGroupedRowModel().flatRows;
        return r ? i.forEach((o) => {
          o.getCanSelect() && (t[o.id] = !0);
        }) : i.forEach((o) => {
          delete t[o.id];
        }), t;
      });
    }, e.toggleAllPageRowsSelected = (r) => e.setRowSelection((n) => {
      const t = typeof r < "u" ? r : !e.getIsAllPageRowsSelected(), i = {
        ...n
      };
      return e.getRowModel().rows.forEach((o) => {
        qe(i, o.id, t, !0, e);
      }), i;
    }), e.getPreSelectedRowModel = () => e.getCoreRowModel(), e.getSelectedRowModel = w(() => [e.getState().rowSelection, e.getCoreRowModel()], (r, n) => Object.keys(r).length ? Ge(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, C(e.options, "debugTable", "getSelectedRowModel")), e.getFilteredSelectedRowModel = w(() => [e.getState().rowSelection, e.getFilteredRowModel()], (r, n) => Object.keys(r).length ? Ge(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, C(e.options, "debugTable", "getFilteredSelectedRowModel")), e.getGroupedSelectedRowModel = w(() => [e.getState().rowSelection, e.getSortedRowModel()], (r, n) => Object.keys(r).length ? Ge(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, C(e.options, "debugTable", "getGroupedSelectedRowModel")), e.getIsAllRowsSelected = () => {
      const r = e.getFilteredRowModel().flatRows, {
        rowSelection: n
      } = e.getState();
      let t = !!(r.length && Object.keys(n).length);
      return t && r.some((i) => i.getCanSelect() && !n[i.id]) && (t = !1), t;
    }, e.getIsAllPageRowsSelected = () => {
      const r = e.getPaginationRowModel().flatRows.filter((i) => i.getCanSelect()), {
        rowSelection: n
      } = e.getState();
      let t = !!r.length;
      return t && r.some((i) => !n[i.id]) && (t = !1), t;
    }, e.getIsSomeRowsSelected = () => {
      var r;
      const n = Object.keys((r = e.getState().rowSelection) != null ? r : {}).length;
      return n > 0 && n < e.getFilteredRowModel().flatRows.length;
    }, e.getIsSomePageRowsSelected = () => {
      const r = e.getPaginationRowModel().flatRows;
      return e.getIsAllPageRowsSelected() ? !1 : r.filter((n) => n.getCanSelect()).some((n) => n.getIsSelected() || n.getIsSomeSelected());
    }, e.getToggleAllRowsSelectedHandler = () => (r) => {
      e.toggleAllRowsSelected(r.target.checked);
    }, e.getToggleAllPageRowsSelectedHandler = () => (r) => {
      e.toggleAllPageRowsSelected(r.target.checked);
    };
  },
  createRow: (e, r) => {
    e.toggleSelected = (n, t) => {
      const i = e.getIsSelected();
      r.setRowSelection((o) => {
        var l;
        if (n = typeof n < "u" ? n : !i, e.getCanSelect() && i === n)
          return o;
        const s = {
          ...o
        };
        return qe(s, e.id, n, (l = t?.selectChildren) != null ? l : !0, r), s;
      });
    }, e.getIsSelected = () => {
      const {
        rowSelection: n
      } = r.getState();
      return Ze(e, n);
    }, e.getIsSomeSelected = () => {
      const {
        rowSelection: n
      } = r.getState();
      return Xe(e, n) === "some";
    }, e.getIsAllSubRowsSelected = () => {
      const {
        rowSelection: n
      } = r.getState();
      return Xe(e, n) === "all";
    }, e.getCanSelect = () => {
      var n;
      return typeof r.options.enableRowSelection == "function" ? r.options.enableRowSelection(e) : (n = r.options.enableRowSelection) != null ? n : !0;
    }, e.getCanSelectSubRows = () => {
      var n;
      return typeof r.options.enableSubRowSelection == "function" ? r.options.enableSubRowSelection(e) : (n = r.options.enableSubRowSelection) != null ? n : !0;
    }, e.getCanMultiSelect = () => {
      var n;
      return typeof r.options.enableMultiRowSelection == "function" ? r.options.enableMultiRowSelection(e) : (n = r.options.enableMultiRowSelection) != null ? n : !0;
    }, e.getToggleSelectedHandler = () => {
      const n = e.getCanSelect();
      return (t) => {
        var i;
        n && e.toggleSelected((i = t.target) == null ? void 0 : i.checked);
      };
    };
  }
}, qe = (e, r, n, t, i) => {
  var o;
  const l = i.getRow(r, !0);
  n ? (l.getCanMultiSelect() || Object.keys(e).forEach((s) => delete e[s]), l.getCanSelect() && (e[r] = !0)) : delete e[r], t && (o = l.subRows) != null && o.length && l.getCanSelectSubRows() && l.subRows.forEach((s) => qe(e, s.id, n, t, i));
};
function Ge(e, r) {
  const n = e.getState().rowSelection, t = [], i = {}, o = function(l, s) {
    return l.map((a) => {
      var u;
      const d = Ze(a, n);
      if (d && (t.push(a), i[a.id] = a), (u = a.subRows) != null && u.length && (a = {
        ...a,
        subRows: o(a.subRows)
      }), d)
        return a;
    }).filter(Boolean);
  };
  return {
    rows: o(r.rows),
    flatRows: t,
    rowsById: i
  };
}
function Ze(e, r) {
  var n;
  return (n = r[e.id]) != null ? n : !1;
}
function Xe(e, r, n) {
  var t;
  if (!((t = e.subRows) != null && t.length)) return !1;
  let i = !0, o = !1;
  return e.subRows.forEach((l) => {
    if (!(o && !i) && (l.getCanSelect() && (Ze(l, r) ? o = !0 : i = !1), l.subRows && l.subRows.length)) {
      const s = Xe(l, r);
      s === "all" ? o = !0 : (s === "some" && (o = !0), i = !1);
    }
  }), i ? "all" : o ? "some" : !1;
}
const Ue = /([0-9]+)/gm, an = (e, r, n) => vt(ae(e.getValue(n)).toLowerCase(), ae(r.getValue(n)).toLowerCase()), un = (e, r, n) => vt(ae(e.getValue(n)), ae(r.getValue(n))), cn = (e, r, n) => Je(ae(e.getValue(n)).toLowerCase(), ae(r.getValue(n)).toLowerCase()), dn = (e, r, n) => Je(ae(e.getValue(n)), ae(r.getValue(n))), gn = (e, r, n) => {
  const t = e.getValue(n), i = r.getValue(n);
  return t > i ? 1 : t < i ? -1 : 0;
}, fn = (e, r, n) => Je(e.getValue(n), r.getValue(n));
function Je(e, r) {
  return e === r ? 0 : e > r ? 1 : -1;
}
function ae(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function vt(e, r) {
  const n = e.split(Ue).filter(Boolean), t = r.split(Ue).filter(Boolean);
  for (; n.length && t.length; ) {
    const i = n.shift(), o = t.shift(), l = parseInt(i, 10), s = parseInt(o, 10), a = [l, s].sort();
    if (isNaN(a[0])) {
      if (i > o)
        return 1;
      if (o > i)
        return -1;
      continue;
    }
    if (isNaN(a[1]))
      return isNaN(l) ? -1 : 1;
    if (l > s)
      return 1;
    if (s > l)
      return -1;
  }
  return n.length - t.length;
}
const ye = {
  alphanumeric: an,
  alphanumericCaseSensitive: un,
  text: cn,
  textCaseSensitive: dn,
  datetime: gn,
  basic: fn
}, pn = {
  getInitialState: (e) => ({
    sorting: [],
    ...e
  }),
  getDefaultColumnDef: () => ({
    sortingFn: "auto",
    sortUndefined: 1
  }),
  getDefaultOptions: (e) => ({
    onSortingChange: X("sorting", e),
    isMultiSortEvent: (r) => r.shiftKey
  }),
  createColumn: (e, r) => {
    e.getAutoSortingFn = () => {
      const n = r.getFilteredRowModel().flatRows.slice(10);
      let t = !1;
      for (const i of n) {
        const o = i?.getValue(e.id);
        if (Object.prototype.toString.call(o) === "[object Date]")
          return ye.datetime;
        if (typeof o == "string" && (t = !0, o.split(Ue).length > 1))
          return ye.alphanumeric;
      }
      return t ? ye.text : ye.basic;
    }, e.getAutoSortDir = () => {
      const n = r.getFilteredRowModel().flatRows[0];
      return typeof n?.getValue(e.id) == "string" ? "asc" : "desc";
    }, e.getSortingFn = () => {
      var n, t;
      if (!e)
        throw new Error();
      return Ve(e.columnDef.sortingFn) ? e.columnDef.sortingFn : e.columnDef.sortingFn === "auto" ? e.getAutoSortingFn() : (n = (t = r.options.sortingFns) == null ? void 0 : t[e.columnDef.sortingFn]) != null ? n : ye[e.columnDef.sortingFn];
    }, e.toggleSorting = (n, t) => {
      const i = e.getNextSortingOrder(), o = typeof n < "u" && n !== null;
      r.setSorting((l) => {
        const s = l?.find((c) => c.id === e.id), a = l?.findIndex((c) => c.id === e.id);
        let u = [], d, f = o ? n : i === "desc";
        if (l != null && l.length && e.getCanMultiSort() && t ? s ? d = "toggle" : d = "add" : l != null && l.length && a !== l.length - 1 ? d = "replace" : s ? d = "toggle" : d = "replace", d === "toggle" && (o || i || (d = "remove")), d === "add") {
          var g;
          u = [...l, {
            id: e.id,
            desc: f
          }], u.splice(0, u.length - ((g = r.options.maxMultiSortColCount) != null ? g : Number.MAX_SAFE_INTEGER));
        } else d === "toggle" ? u = l.map((c) => c.id === e.id ? {
          ...c,
          desc: f
        } : c) : d === "remove" ? u = l.filter((c) => c.id !== e.id) : u = [{
          id: e.id,
          desc: f
        }];
        return u;
      });
    }, e.getFirstSortDir = () => {
      var n, t;
      return ((n = (t = e.columnDef.sortDescFirst) != null ? t : r.options.sortDescFirst) != null ? n : e.getAutoSortDir() === "desc") ? "desc" : "asc";
    }, e.getNextSortingOrder = (n) => {
      var t, i;
      const o = e.getFirstSortDir(), l = e.getIsSorted();
      return l ? l !== o && ((t = r.options.enableSortingRemoval) == null || t) && // If enableSortRemove, enable in general
      (!(n && (i = r.options.enableMultiRemove) != null) || i) ? !1 : l === "desc" ? "asc" : "desc" : o;
    }, e.getCanSort = () => {
      var n, t;
      return ((n = e.columnDef.enableSorting) != null ? n : !0) && ((t = r.options.enableSorting) != null ? t : !0) && !!e.accessorFn;
    }, e.getCanMultiSort = () => {
      var n, t;
      return (n = (t = e.columnDef.enableMultiSort) != null ? t : r.options.enableMultiSort) != null ? n : !!e.accessorFn;
    }, e.getIsSorted = () => {
      var n;
      const t = (n = r.getState().sorting) == null ? void 0 : n.find((i) => i.id === e.id);
      return t ? t.desc ? "desc" : "asc" : !1;
    }, e.getSortIndex = () => {
      var n, t;
      return (n = (t = r.getState().sorting) == null ? void 0 : t.findIndex((i) => i.id === e.id)) != null ? n : -1;
    }, e.clearSorting = () => {
      r.setSorting((n) => n != null && n.length ? n.filter((t) => t.id !== e.id) : []);
    }, e.getToggleSortingHandler = () => {
      const n = e.getCanSort();
      return (t) => {
        n && (t.persist == null || t.persist(), e.toggleSorting == null || e.toggleSorting(void 0, e.getCanMultiSort() ? r.options.isMultiSortEvent == null ? void 0 : r.options.isMultiSortEvent(t) : !1));
      };
    };
  },
  createTable: (e) => {
    e.setSorting = (r) => e.options.onSortingChange == null ? void 0 : e.options.onSortingChange(r), e.resetSorting = (r) => {
      var n, t;
      e.setSorting(r ? [] : (n = (t = e.initialState) == null ? void 0 : t.sorting) != null ? n : []);
    }, e.getPreSortedRowModel = () => e.getGroupedRowModel(), e.getSortedRowModel = () => (!e._getSortedRowModel && e.options.getSortedRowModel && (e._getSortedRowModel = e.options.getSortedRowModel(e)), e.options.manualSorting || !e._getSortedRowModel ? e.getPreSortedRowModel() : e._getSortedRowModel());
  }
}, hn = [
  Vt,
  en,
  Yt,
  Kt,
  Lt,
  Dt,
  tn,
  //depends on ColumnFaceting
  nn,
  //depends on ColumnFiltering
  pn,
  Xt,
  //depends on RowSorting
  rn,
  on,
  ln,
  sn,
  Zt
];
function mn(e) {
  var r, n;
  process.env.NODE_ENV !== "production" && (e.debugAll || e.debugTable) && console.info("Creating Table Instance...");
  const t = [...hn, ...(r = e._features) != null ? r : []];
  let i = {
    _features: t
  };
  const o = i._features.reduce((g, c) => Object.assign(g, c.getDefaultOptions == null ? void 0 : c.getDefaultOptions(i)), {}), l = (g) => i.options.mergeOptions ? i.options.mergeOptions(o, g) : {
    ...o,
    ...g
  };
  let a = {
    ...{},
    ...(n = e.initialState) != null ? n : {}
  };
  i._features.forEach((g) => {
    var c;
    a = (c = g.getInitialState == null ? void 0 : g.getInitialState(a)) != null ? c : a;
  });
  const u = [];
  let d = !1;
  const f = {
    _features: t,
    options: {
      ...o,
      ...e
    },
    initialState: a,
    _queue: (g) => {
      u.push(g), d || (d = !0, Promise.resolve().then(() => {
        for (; u.length; )
          u.shift()();
        d = !1;
      }).catch((c) => setTimeout(() => {
        throw c;
      })));
    },
    reset: () => {
      i.setState(i.initialState);
    },
    setOptions: (g) => {
      const c = se(g, i.options);
      i.options = l(c);
    },
    getState: () => i.options.state,
    setState: (g) => {
      i.options.onStateChange == null || i.options.onStateChange(g);
    },
    _getRowId: (g, c, h) => {
      var p;
      return (p = i.options.getRowId == null ? void 0 : i.options.getRowId(g, c, h)) != null ? p : `${h ? [h.id, c].join(".") : c}`;
    },
    getCoreRowModel: () => (i._getCoreRowModel || (i._getCoreRowModel = i.options.getCoreRowModel(i)), i._getCoreRowModel()),
    // The final calls start at the bottom of the model,
    // expanded rows, which then work their way up
    getRowModel: () => i.getPaginationRowModel(),
    //in next version, we should just pass in the row model as the optional 2nd arg
    getRow: (g, c) => {
      let h = (c ? i.getPrePaginationRowModel() : i.getRowModel()).rowsById[g];
      if (!h && (h = i.getCoreRowModel().rowsById[g], !h))
        throw process.env.NODE_ENV !== "production" ? new Error(`getRow could not find row with ID: ${g}`) : new Error();
      return h;
    },
    _getDefaultColumnDef: w(() => [i.options.defaultColumn], (g) => {
      var c;
      return g = (c = g) != null ? c : {}, {
        header: (h) => {
          const p = h.header.column.columnDef;
          return p.accessorKey ? p.accessorKey : p.accessorFn ? p.id : null;
        },
        // footer: props => props.header.column.id,
        cell: (h) => {
          var p, S;
          return (p = (S = h.renderValue()) == null || S.toString == null ? void 0 : S.toString()) != null ? p : null;
        },
        ...i._features.reduce((h, p) => Object.assign(h, p.getDefaultColumnDef == null ? void 0 : p.getDefaultColumnDef()), {}),
        ...g
      };
    }, C(e, "debugColumns", "_getDefaultColumnDef")),
    _getColumnDefs: () => i.options.columns,
    getAllColumns: w(() => [i._getColumnDefs()], (g) => {
      const c = function(h, p, S) {
        return S === void 0 && (S = 0), h.map((v) => {
          const F = At(i, v, S, p), _ = v;
          return F.columns = _.columns ? c(_.columns, F, S + 1) : [], F;
        });
      };
      return c(g);
    }, C(e, "debugColumns", "getAllColumns")),
    getAllFlatColumns: w(() => [i.getAllColumns()], (g) => g.flatMap((c) => c.getFlatColumns()), C(e, "debugColumns", "getAllFlatColumns")),
    _getAllFlatColumnsById: w(() => [i.getAllFlatColumns()], (g) => g.reduce((c, h) => (c[h.id] = h, c), {}), C(e, "debugColumns", "getAllFlatColumnsById")),
    getAllLeafColumns: w(() => [i.getAllColumns(), i._getOrderColumnsFn()], (g, c) => {
      let h = g.flatMap((p) => p.getLeafColumns());
      return c(h);
    }, C(e, "debugColumns", "getAllLeafColumns")),
    getColumn: (g) => {
      const c = i._getAllFlatColumnsById()[g];
      return process.env.NODE_ENV !== "production" && !c && console.error(`[Table] Column with id '${g}' does not exist.`), c;
    }
  };
  Object.assign(i, f);
  for (let g = 0; g < i._features.length; g++) {
    const c = i._features[g];
    c == null || c.createTable == null || c.createTable(i);
  }
  return i;
}
function vn() {
  return (e) => w(() => [e.options.data], (r) => {
    const n = {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, t = function(i, o, l) {
      o === void 0 && (o = 0);
      const s = [];
      for (let u = 0; u < i.length; u++) {
        const d = zt(e, e._getRowId(i[u], u, l), i[u], u, o, void 0, l?.id);
        if (n.flatRows.push(d), n.rowsById[d.id] = d, s.push(d), e.options.getSubRows) {
          var a;
          d.originalSubRows = e.options.getSubRows(i[u], u), (a = d.originalSubRows) != null && a.length && (d.subRows = t(d.originalSubRows, o + 1, d));
        }
      }
      return s;
    };
    return n.rows = t(r), n;
  }, C(e.options, "debugTable", "getRowModel", () => e._autoResetPageIndex()));
}
function Sn(e, r) {
  return e ? wn(e) ? /* @__PURE__ */ L.createElement(e, r) : e : null;
}
function wn(e) {
  return Cn(e) || typeof e == "function" || Rn(e);
}
function Cn(e) {
  return typeof e == "function" && (() => {
    const r = Object.getPrototypeOf(e);
    return r.prototype && r.prototype.isReactComponent;
  })();
}
function Rn(e) {
  return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
function yn(e) {
  const r = {
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    ...e
  }, [n] = L.useState(() => ({
    current: mn(r)
  })), [t, i] = L.useState(() => n.current.initialState);
  return n.current.setOptions((o) => ({
    ...o,
    ...e,
    state: {
      ...t,
      ...e.state
    },
    // Similarly, we'll maintain both our internal state and any user-provided
    // state.
    onStateChange: (l) => {
      i(l), e.onStateChange == null || e.onStateChange(l);
    }
  })), n.current;
}
function xn({
  table: e,
  tableWidth: r,
  stickyById: n,
  defaultTextAlign: t,
  editable: i = !1,
  draggable: o = !1,
  setData: l,
  setInternalData: s,
  selectable: a,
  selectedRows: u,
  setSelectedRows: d,
  disableSelectRow: f,
  expandable: g,
  expandedRows: c,
  setExpandedRows: h,
  stripedRows: p = !1,
  hoverableRow: S = !1,
  loading: v,
  loadingCustom: F,
  noResultMessage: _,
  totalItems: b
}) {
  const O = he(
    () => l ?? s,
    [l, s]
  ), R = k(null), E = k(null), [V, B] = U(null), [ue, Y] = U(0), ce = (y, I) => {
    o && (I.preventDefault(), R.current = I.clientY, E.current = y, B(y), Y(0), I.currentTarget.setPointerCapture(I.pointerId));
  }, de = (y) => {
    if (!o || R.current === null || E.current === null) return;
    const I = y.clientY - R.current;
    Y(I);
    const D = 32, N = I > D ? 1 : I < -D ? -1 : 0;
    if (N === 0) return;
    const $ = E.current, x = $ + N;
    x < 0 || x >= e.getRowModel().rows.length || (O((j) => {
      const pe = [...j], [J] = pe.splice($, 1);
      return pe.splice(x, 0, J), pe;
    }), E.current = x, R.current = y.clientY, Y(0), B(x));
  }, me = () => {
    R.current = null, E.current = null, B(null), Y(0);
  }, [Z, A] = U(null), [M, T] = U(""), K = (y) => {
    A({
      rowId: y.row.id,
      colId: y.column.id
    }), T(String(y.getValue() ?? ""));
  }, ge = (y) => {
    s(
      (I) => I.map(
        (D, N) => N === y.row.index ? {
          ...D,
          [y.column.id]: M
        } : D
      )
    ), A(null);
  }, fe = (y, I) => {
    if (!g || !g.clickRow || y.target.closest(".col-drag-handle") || y.target.tagName === "INPUT" && y.target.type === "checkbox" || y.target.tagName === "A" || y.target.tagName === "BUTTON" || y.target.tagName === "INPUT" && Z) return;
    const D = I.original.id ?? I.index;
    h((N) => {
      const $ = new Set(N);
      return $.has(D) ? $.delete(D) : $.add(D), $;
    });
  };
  return /* @__PURE__ */ G("table", { className: `table table-body ${S ? "hoverable" : ""} ${p ? "striped" : ""}`, children: [
    /* @__PURE__ */ m(
      Ae,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ G("tbody", { children: [
      v === "default" && /* @__PURE__ */ m("tr", { className: "table-loading-row", children: /* @__PURE__ */ m(
        "td",
        {
          colSpan: e.getAllColumns().length,
          style: { textAlign: "center", padding: "20px" },
          children: "Carregando dados..."
        }
      ) }),
      v === "spinner" && /* @__PURE__ */ m("tr", { className: "table-loading-row", children: /* @__PURE__ */ m(
        "td",
        {
          colSpan: e.getAllColumns().length,
          style: { textAlign: "center", padding: "20px" },
          children: /* @__PURE__ */ m("div", { style: { display: "flex", justifyContent: "center", alignItems: "center" }, children: /* @__PURE__ */ m("div", { className: "table-spinner" }) })
        }
      ) }),
      v === "custom" && /* @__PURE__ */ m("tr", { className: "table-loading-row", children: /* @__PURE__ */ m(
        "td",
        {
          colSpan: e.getAllColumns().length,
          style: { textAlign: "center", padding: "20px" },
          children: F
        }
      ) }),
      v === "placeholder" && (() => {
        const y = e.getAllColumns().length, I = e.getState().pagination?.pageSize || 10;
        return Array.from({ length: I }).map((D, N) => /* @__PURE__ */ m("tr", { className: "table-placeholder-row", children: Array.from({ length: y }).map(($, x) => /* @__PURE__ */ m("td", { children: /* @__PURE__ */ m("div", { className: "table-placeholder-cell" }) }, `placeholder-cell-${N}-${x}`)) }, `placeholder-row-${N}`));
      })(),
      !v && e.getRowModel().rows.length === 0 && b === 0 && /* @__PURE__ */ m("tr", { className: "table-no-results-row", children: /* @__PURE__ */ m(
        "td",
        {
          colSpan: e.getAllColumns().length,
          style: { textAlign: "center", padding: "20px" },
          children: _
        }
      ) }),
      !v && e.getRowModel().rows.length > 0 && e.getRowModel().rows.map((y) => {
        const I = y.index, D = V === I, N = [];
        return N.push(
          /* @__PURE__ */ m(
            "tr",
            {
              className: `${D ? "row-dragging" : ""}`,
              style: D ? {
                transform: `translateY(${ue}px)`,
                position: "relative",
                zIndex: 50
              } : void 0,
              onPointerMove: de,
              onPointerUp: me,
              onClick: ($) => fe($, y),
              children: y.getVisibleCells().map(($) => {
                const x = $.column.id, j = n.get(x), pe = Pe($.column, t), J = Z?.rowId === y.id && Z?.colId === x, te = [
                  j ? "is-sticky" : "",
                  j?.side === "left" ? "is-sticky-left" : "",
                  j?.side === "right" ? "is-sticky-right" : ""
                ].filter(Boolean).join(" "), ve = j ? j.side === "left" ? { "--sticky-left": `${j.offset}px` } : { "--sticky-right": `${j.offset}px` } : void 0;
                if ($.column.id === "__draggable__" && o)
                  return /* @__PURE__ */ m(
                    "td",
                    {
                      className: `${te} align-center col-drag-handle`,
                      style: ve,
                      onPointerDown: (z) => ce(I, z),
                      children: "☰"
                    },
                    $.id
                  );
                if ($.column.id === "__selectable__" && a) {
                  const z = $.row.original.id ?? $.row.index, P = f.includes(z), Ce = u.has(z);
                  return /* @__PURE__ */ m(
                    "td",
                    {
                      className: `${te} align-center`,
                      style: ve,
                      children: /* @__PURE__ */ m(
                        "input",
                        {
                          type: "checkbox",
                          checked: Ce,
                          disabled: P,
                          onChange: () => {
                            d((Re) => {
                              const ne = new Set(Re);
                              return ne.has(z) ? ne.delete(z) : ne.add(z), ne;
                            });
                          }
                        }
                      )
                    },
                    $.id
                  );
                }
                if ($.column.id === "__expandable__" && g) {
                  const z = $.row.original.id ?? $.row.index, P = c.has(z);
                  return /* @__PURE__ */ m(
                    "td",
                    {
                      className: `${te} align-center`,
                      style: ve,
                      onClick: (Ce) => {
                        Ce.stopPropagation(), h((Re) => {
                          const ne = new Set(Re);
                          return ne.has(z) ? ne.delete(z) : ne.add(z), ne;
                        });
                      },
                      children: /* @__PURE__ */ m(
                        "span",
                        {
                          className: `expand-icon ${P ? "expanded" : ""}`,
                          style: {
                            display: "inline-block",
                            transition: "transform 0.2s",
                            transform: P ? "rotate(90deg)" : "rotate(0deg)",
                            cursor: "pointer",
                            fontSize: "12px"
                          },
                          children: /* @__PURE__ */ m("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ m("path", { d: "M4.5 9L7.5 6L4.5 3", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
                        }
                      )
                    },
                    $.id
                  );
                }
                return /* @__PURE__ */ m(
                  "td",
                  {
                    className: `${te} align-${pe}`,
                    style: ve,
                    onDoubleClick: () => {
                      i && K($);
                    },
                    children: J ? /* @__PURE__ */ m(
                      "input",
                      {
                        autoFocus: !0,
                        value: M,
                        onChange: (z) => T(z.target.value),
                        onBlur: () => ge($),
                        onKeyDown: (z) => {
                          z.key === "Enter" && ge($), z.key === "Escape" && A(null);
                        },
                        onFocus: (z) => z.currentTarget.select(),
                        style: {
                          width: "100%",
                          height: "100%",
                          boxSizing: "border-box",
                          fontSize: "inherit",
                          fontFamily: "inherit"
                        }
                      }
                    ) : Sn(
                      $.column.columnDef.cell,
                      $.getContext()
                    )
                  },
                  $.id
                );
              })
            },
            y.id
          )
        ), g && g.content && c.has(y.original.id ?? y.index) && N.push(
          /* @__PURE__ */ m("tr", { className: "expanded-row", children: /* @__PURE__ */ m("td", { colSpan: e.getAllColumns().length, className: "expanded-content", children: g.content(y.original) }) }, `${y.id}-expanded`)
        ), N;
      }).flat()
    ] })
  ] });
}
function _n({
  table: e,
  tableWidth: r,
  stickyById: n,
  defaultTextAlign: t,
  scrollRef: i
}) {
  return e.getAllLeafColumns().some(
    (s) => s.columnDef.meta?.internalFooter != null
  ) ? /* @__PURE__ */ m("div", { className: "table-scroll-sync", ref: i, children: /* @__PURE__ */ G("table", { className: "table table-internal-footer", children: [
    /* @__PURE__ */ m(
      Ae,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ m("tfoot", { children: /* @__PURE__ */ m("tr", { children: e.getAllLeafColumns().map((s) => {
      const a = s.columnDef.meta?.internalFooter, u = n.get(s.id), d = Pe(s, t), f = [
        u ? "is-sticky" : "",
        u?.side === "left" ? "is-sticky-left" : "",
        u?.side === "right" ? "is-sticky-right" : ""
      ].filter(Boolean).join(" "), g = u ? u.side === "left" ? { "--sticky-left": `${u.offset}px` } : { "--sticky-right": `${u.offset}px` } : void 0;
      return /* @__PURE__ */ m(
        "td",
        {
          className: `${f} align-${d}`,
          style: g,
          children: typeof a == "function" ? a() : a ?? null
        },
        s.id
      );
    }) }) })
  ] }) }) : null;
}
function En({ children: e }) {
  return /* @__PURE__ */ m("table", { className: "table table-external-footer", children: /* @__PURE__ */ m("tfoot", { children: /* @__PURE__ */ m("tr", { children: /* @__PURE__ */ m("td", { children: e }) }) }) });
}
function $n(e, r, n = 2) {
  if (r <= 1) return [1];
  const t = [], i = [], o = Math.max(2, e - n), l = Math.min(r - 1, e + n);
  for (let s = o; s <= l; s++)
    i.push(s);
  return t.push(1), o > 2 && t.push("ellipsis"), t.push(...i), l < r - 1 && t.push("ellipsis"), t.push(r), t;
}
function Fn({
  currentPage: e,
  totalItems: r,
  pageSize: n,
  pageSizeOptions: t = [10, 25, 50, 100, 200],
  onPageChange: i
}) {
  const o = Math.max(1, Math.ceil(r / n)), l = r === 0 ? 0 : (e - 1) * n + 1, s = Math.min(e * n, r), a = he(
    () => $n(e, o),
    [e, o]
  ), u = he(() => {
    const d = new Set(t);
    return d.add(n), Array.from(d).sort((f, g) => f - g);
  }, [t, n]);
  return /* @__PURE__ */ G("div", { className: "table-pagination", children: [
    /* @__PURE__ */ G("div", { className: "pagination-controls", children: [
      /* @__PURE__ */ m(
        "button",
        {
          className: "pagination-btn pagination-arrow",
          disabled: e === 1,
          onClick: () => i(e - 1, n),
          title: "Página anterior",
          children: "«"
        }
      ),
      a.map(
        (d, f) => d === "ellipsis" ? /* @__PURE__ */ m(
          "span",
          {
            className: "pagination-btn ellipsis",
            children: "..."
          },
          `e-${f}`
        ) : /* @__PURE__ */ m(
          "button",
          {
            className: `pagination-btn ${d === e ? "active" : ""}`,
            onClick: () => i(d, n),
            children: d
          },
          d
        )
      ),
      /* @__PURE__ */ m(
        "button",
        {
          className: "pagination-btn pagination-arrow",
          disabled: e === o,
          onClick: () => i(e + 1, n),
          title: "Próxima página",
          children: "»"
        }
      )
    ] }),
    /* @__PURE__ */ G("div", { className: "pagination-info", children: [
      /* @__PURE__ */ G("span", { children: [
        "Exibindo de ",
        l,
        " a ",
        s,
        " de ",
        r,
        " registros"
      ] }),
      /* @__PURE__ */ m("span", { className: "pagination-separator", children: "•" }),
      /* @__PURE__ */ G("div", { className: "pagination-select", children: [
        /* @__PURE__ */ m("label", { children: "Itens por página:" }),
        /* @__PURE__ */ m("div", { className: "select-wrapper", children: /* @__PURE__ */ m(
          "select",
          {
            value: n,
            onChange: (d) => i(1, Number(d.target.value)),
            children: u.map((d) => /* @__PURE__ */ m("option", { value: d, children: d }, d))
          }
        ) })
      ] })
    ] })
  ] });
}
function Oe(e) {
  var r = typeof e;
  return e != null && (r == "object" || r == "function");
}
var Mn = typeof global == "object" && global && global.Object === Object && global, bn = typeof self == "object" && self && self.Object === Object && self, St = Mn || bn || Function("return this")(), Te = function() {
  return St.Date.now();
}, On = /\s/;
function In(e) {
  for (var r = e.length; r-- && On.test(e.charAt(r)); )
    ;
  return r;
}
var Pn = /^\s+/;
function An(e) {
  return e && e.slice(0, In(e) + 1).replace(Pn, "");
}
var Ie = St.Symbol, wt = Object.prototype, Vn = wt.hasOwnProperty, zn = wt.toString, xe = Ie ? Ie.toStringTag : void 0;
function Ln(e) {
  var r = Vn.call(e, xe), n = e[xe];
  try {
    e[xe] = void 0;
    var t = !0;
  } catch {
  }
  var i = zn.call(e);
  return t && (r ? e[xe] = n : delete e[xe]), i;
}
var Dn = Object.prototype, Nn = Dn.toString;
function kn(e) {
  return Nn.call(e);
}
var Hn = "[object Null]", Gn = "[object Undefined]", it = Ie ? Ie.toStringTag : void 0;
function Tn(e) {
  return e == null ? e === void 0 ? Gn : Hn : it && it in Object(e) ? Ln(e) : kn(e);
}
function Wn(e) {
  return e != null && typeof e == "object";
}
var Bn = "[object Symbol]";
function jn(e) {
  return typeof e == "symbol" || Wn(e) && Tn(e) == Bn;
}
var ot = NaN, qn = /^[-+]0x[0-9a-f]+$/i, Xn = /^0b[01]+$/i, Un = /^0o[0-7]+$/i, Yn = parseInt;
function lt(e) {
  if (typeof e == "number")
    return e;
  if (jn(e))
    return ot;
  if (Oe(e)) {
    var r = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Oe(r) ? r + "" : r;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = An(e);
  var n = Xn.test(e);
  return n || Un.test(e) ? Yn(e.slice(2), n ? 2 : 8) : qn.test(e) ? ot : +e;
}
var Kn = "Expected a function", Qn = Math.max, Zn = Math.min;
function be(e, r, n) {
  var t, i, o, l, s, a, u = 0, d = !1, f = !1, g = !0;
  if (typeof e != "function")
    throw new TypeError(Kn);
  r = lt(r) || 0, Oe(n) && (d = !!n.leading, f = "maxWait" in n, o = f ? Qn(lt(n.maxWait) || 0, r) : o, g = "trailing" in n ? !!n.trailing : g);
  function c(R) {
    var E = t, V = i;
    return t = i = void 0, u = R, l = e.apply(V, E), l;
  }
  function h(R) {
    return u = R, s = setTimeout(v, r), d ? c(R) : l;
  }
  function p(R) {
    var E = R - a, V = R - u, B = r - E;
    return f ? Zn(B, o - V) : B;
  }
  function S(R) {
    var E = R - a, V = R - u;
    return a === void 0 || E >= r || E < 0 || f && V >= o;
  }
  function v() {
    var R = Te();
    if (S(R))
      return F(R);
    s = setTimeout(v, p(R));
  }
  function F(R) {
    return s = void 0, g && t ? c(R) : (t = i = void 0, l);
  }
  function _() {
    s !== void 0 && clearTimeout(s), u = 0, t = a = i = s = void 0;
  }
  function b() {
    return s === void 0 ? l : F(Te());
  }
  function O() {
    var R = Te(), E = S(R);
    if (t = arguments, i = this, a = R, E) {
      if (s === void 0)
        return h(a);
      if (f)
        return clearTimeout(s), s = setTimeout(v, r), c(a);
    }
    return s === void 0 && (s = setTimeout(v, r)), l;
  }
  return O.cancel = _, O.flush = b, O;
}
var Jn = "Expected a function";
function er(e, r, n) {
  var t = !0, i = !0;
  if (typeof e != "function")
    throw new TypeError(Jn);
  return Oe(n) && (t = "leading" in n ? !!n.leading : t, i = "trailing" in n ? !!n.trailing : i), be(e, r, {
    leading: t,
    maxWait: r,
    trailing: i
  });
}
var we = function() {
  return we = Object.assign || function(r) {
    for (var n, t = 1, i = arguments.length; t < i; t++) {
      n = arguments[t];
      for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
    }
    return r;
  }, we.apply(this, arguments);
};
function Ct(e) {
  return !e || !e.ownerDocument || !e.ownerDocument.defaultView ? window : e.ownerDocument.defaultView;
}
function Rt(e) {
  return !e || !e.ownerDocument ? document : e.ownerDocument;
}
var yt = function(e) {
  var r = {}, n = Array.prototype.reduce.call(e, function(t, i) {
    var o = i.name.match(/data-simplebar-(.+)/);
    if (o) {
      var l = o[1].replace(/\W+(.)/g, function(s, a) {
        return a.toUpperCase();
      });
      switch (i.value) {
        case "true":
          t[l] = !0;
          break;
        case "false":
          t[l] = !1;
          break;
        case void 0:
          t[l] = !0;
          break;
        default:
          t[l] = i.value;
      }
    }
    return t;
  }, r);
  return n;
};
function xt(e, r) {
  var n;
  e && (n = e.classList).add.apply(n, r.split(" "));
}
function _t(e, r) {
  e && r.split(" ").forEach(function(n) {
    e.classList.remove(n);
  });
}
function Et(e) {
  return ".".concat(e.split(" ").join("."));
}
var et = !!(typeof window < "u" && window.document && window.document.createElement), tr = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  addClasses: xt,
  canUseDOM: et,
  classNamesToQuery: Et,
  getElementDocument: Rt,
  getElementWindow: Ct,
  getOptions: yt,
  removeClasses: _t
}), Se = null, st = null;
et && window.addEventListener("resize", function() {
  st !== window.devicePixelRatio && (st = window.devicePixelRatio, Se = null);
});
function at() {
  if (Se === null) {
    if (typeof document > "u")
      return Se = 0, Se;
    var e = document.body, r = document.createElement("div");
    r.classList.add("simplebar-hide-scrollbar"), e.appendChild(r);
    var n = r.getBoundingClientRect().right;
    e.removeChild(r), Se = n;
  }
  return Se;
}
var ie = Ct, We = Rt, nr = yt, oe = xt, le = _t, W = Et, _e = (
  /** @class */
  (function() {
    function e(r, n) {
      n === void 0 && (n = {});
      var t = this;
      if (this.removePreventClickId = null, this.minScrollbarWidth = 20, this.stopScrollDelay = 175, this.isScrolling = !1, this.isMouseEntering = !1, this.isDragging = !1, this.scrollXTicking = !1, this.scrollYTicking = !1, this.wrapperEl = null, this.contentWrapperEl = null, this.contentEl = null, this.offsetEl = null, this.maskEl = null, this.placeholderEl = null, this.heightAutoObserverWrapperEl = null, this.heightAutoObserverEl = null, this.rtlHelpers = null, this.scrollbarWidth = 0, this.resizeObserver = null, this.mutationObserver = null, this.elStyles = null, this.isRtl = null, this.mouseX = 0, this.mouseY = 0, this.onMouseMove = function() {
      }, this.onWindowResize = function() {
      }, this.onStopScrolling = function() {
      }, this.onMouseEntered = function() {
      }, this.onScroll = function() {
        var i = ie(t.el);
        t.scrollXTicking || (i.requestAnimationFrame(t.scrollX), t.scrollXTicking = !0), t.scrollYTicking || (i.requestAnimationFrame(t.scrollY), t.scrollYTicking = !0), t.isScrolling || (t.isScrolling = !0, oe(t.el, t.classNames.scrolling)), t.showScrollbar("x"), t.showScrollbar("y"), t.onStopScrolling();
      }, this.scrollX = function() {
        t.axis.x.isOverflowing && t.positionScrollbar("x"), t.scrollXTicking = !1;
      }, this.scrollY = function() {
        t.axis.y.isOverflowing && t.positionScrollbar("y"), t.scrollYTicking = !1;
      }, this._onStopScrolling = function() {
        le(t.el, t.classNames.scrolling), t.options.autoHide && (t.hideScrollbar("x"), t.hideScrollbar("y")), t.isScrolling = !1;
      }, this.onMouseEnter = function() {
        t.isMouseEntering || (oe(t.el, t.classNames.mouseEntered), t.showScrollbar("x"), t.showScrollbar("y"), t.isMouseEntering = !0), t.onMouseEntered();
      }, this._onMouseEntered = function() {
        le(t.el, t.classNames.mouseEntered), t.options.autoHide && (t.hideScrollbar("x"), t.hideScrollbar("y")), t.isMouseEntering = !1;
      }, this._onMouseMove = function(i) {
        t.mouseX = i.clientX, t.mouseY = i.clientY, (t.axis.x.isOverflowing || t.axis.x.forceVisible) && t.onMouseMoveForAxis("x"), (t.axis.y.isOverflowing || t.axis.y.forceVisible) && t.onMouseMoveForAxis("y");
      }, this.onMouseLeave = function() {
        t.onMouseMove.cancel(), (t.axis.x.isOverflowing || t.axis.x.forceVisible) && t.onMouseLeaveForAxis("x"), (t.axis.y.isOverflowing || t.axis.y.forceVisible) && t.onMouseLeaveForAxis("y"), t.mouseX = -1, t.mouseY = -1;
      }, this._onWindowResize = function() {
        t.scrollbarWidth = t.getScrollbarWidth(), t.hideNativeScrollbar();
      }, this.onPointerEvent = function(i) {
        if (!(!t.axis.x.track.el || !t.axis.y.track.el || !t.axis.x.scrollbar.el || !t.axis.y.scrollbar.el)) {
          var o, l;
          t.axis.x.track.rect = t.axis.x.track.el.getBoundingClientRect(), t.axis.y.track.rect = t.axis.y.track.el.getBoundingClientRect(), (t.axis.x.isOverflowing || t.axis.x.forceVisible) && (o = t.isWithinBounds(t.axis.x.track.rect)), (t.axis.y.isOverflowing || t.axis.y.forceVisible) && (l = t.isWithinBounds(t.axis.y.track.rect)), (o || l) && (i.stopPropagation(), i.type === "pointerdown" && i.pointerType !== "touch" && (o && (t.axis.x.scrollbar.rect = t.axis.x.scrollbar.el.getBoundingClientRect(), t.isWithinBounds(t.axis.x.scrollbar.rect) ? t.onDragStart(i, "x") : t.onTrackClick(i, "x")), l && (t.axis.y.scrollbar.rect = t.axis.y.scrollbar.el.getBoundingClientRect(), t.isWithinBounds(t.axis.y.scrollbar.rect) ? t.onDragStart(i, "y") : t.onTrackClick(i, "y"))));
        }
      }, this.drag = function(i) {
        var o, l, s, a, u, d, f, g, c, h, p;
        if (!(!t.draggedAxis || !t.contentWrapperEl)) {
          var S, v = t.axis[t.draggedAxis].track, F = (l = (o = v.rect) === null || o === void 0 ? void 0 : o[t.axis[t.draggedAxis].sizeAttr]) !== null && l !== void 0 ? l : 0, _ = t.axis[t.draggedAxis].scrollbar, b = (a = (s = t.contentWrapperEl) === null || s === void 0 ? void 0 : s[t.axis[t.draggedAxis].scrollSizeAttr]) !== null && a !== void 0 ? a : 0, O = parseInt((d = (u = t.elStyles) === null || u === void 0 ? void 0 : u[t.axis[t.draggedAxis].sizeAttr]) !== null && d !== void 0 ? d : "0px", 10);
          i.preventDefault(), i.stopPropagation(), t.draggedAxis === "y" ? S = i.pageY : S = i.pageX;
          var R = S - ((g = (f = v.rect) === null || f === void 0 ? void 0 : f[t.axis[t.draggedAxis].offsetAttr]) !== null && g !== void 0 ? g : 0) - t.axis[t.draggedAxis].dragOffset;
          R = t.draggedAxis === "x" && t.isRtl ? ((h = (c = v.rect) === null || c === void 0 ? void 0 : c[t.axis[t.draggedAxis].sizeAttr]) !== null && h !== void 0 ? h : 0) - _.size - R : R;
          var E = R / (F - _.size), V = E * (b - O);
          t.draggedAxis === "x" && t.isRtl && (V = !((p = e.getRtlHelpers()) === null || p === void 0) && p.isScrollingToNegative ? -V : V), t.contentWrapperEl[t.axis[t.draggedAxis].scrollOffsetAttr] = V;
        }
      }, this.onEndDrag = function(i) {
        t.isDragging = !1;
        var o = We(t.el), l = ie(t.el);
        i.preventDefault(), i.stopPropagation(), le(t.el, t.classNames.dragging), t.onStopScrolling(), o.removeEventListener("mousemove", t.drag, !0), o.removeEventListener("mouseup", t.onEndDrag, !0), t.removePreventClickId = l.setTimeout(function() {
          o.removeEventListener("click", t.preventClick, !0), o.removeEventListener("dblclick", t.preventClick, !0), t.removePreventClickId = null;
        });
      }, this.preventClick = function(i) {
        i.preventDefault(), i.stopPropagation();
      }, this.el = r, this.options = we(we({}, e.defaultOptions), n), this.classNames = we(we({}, e.defaultOptions.classNames), n.classNames), this.axis = {
        x: {
          scrollOffsetAttr: "scrollLeft",
          sizeAttr: "width",
          scrollSizeAttr: "scrollWidth",
          offsetSizeAttr: "offsetWidth",
          offsetAttr: "left",
          overflowAttr: "overflowX",
          dragOffset: 0,
          isOverflowing: !0,
          forceVisible: !1,
          track: { size: null, el: null, rect: null, isVisible: !1 },
          scrollbar: { size: null, el: null, rect: null, isVisible: !1 }
        },
        y: {
          scrollOffsetAttr: "scrollTop",
          sizeAttr: "height",
          scrollSizeAttr: "scrollHeight",
          offsetSizeAttr: "offsetHeight",
          offsetAttr: "top",
          overflowAttr: "overflowY",
          dragOffset: 0,
          isOverflowing: !0,
          forceVisible: !1,
          track: { size: null, el: null, rect: null, isVisible: !1 },
          scrollbar: { size: null, el: null, rect: null, isVisible: !1 }
        }
      }, typeof this.el != "object" || !this.el.nodeName)
        throw new Error("Argument passed to SimpleBar must be an HTML element instead of ".concat(this.el));
      this.onMouseMove = er(this._onMouseMove, 64), this.onWindowResize = be(this._onWindowResize, 64, { leading: !0 }), this.onStopScrolling = be(this._onStopScrolling, this.stopScrollDelay), this.onMouseEntered = be(this._onMouseEntered, this.stopScrollDelay), this.init();
    }
    return e.getRtlHelpers = function() {
      if (e.rtlHelpers)
        return e.rtlHelpers;
      var r = document.createElement("div");
      r.innerHTML = '<div class="simplebar-dummy-scrollbar-size"><div></div></div>';
      var n = r.firstElementChild, t = n?.firstElementChild;
      if (!t)
        return null;
      document.body.appendChild(n), n.scrollLeft = 0;
      var i = e.getOffset(n), o = e.getOffset(t);
      n.scrollLeft = -999;
      var l = e.getOffset(t);
      return document.body.removeChild(n), e.rtlHelpers = {
        // determines if the scrolling is responding with negative values
        isScrollOriginAtZero: i.left !== o.left,
        // determines if the origin scrollbar position is inverted or not (positioned on left or right)
        isScrollingToNegative: o.left !== l.left
      }, e.rtlHelpers;
    }, e.prototype.getScrollbarWidth = function() {
      try {
        return this.contentWrapperEl && getComputedStyle(this.contentWrapperEl, "::-webkit-scrollbar").display === "none" || "scrollbarWidth" in document.documentElement.style || "-ms-overflow-style" in document.documentElement.style ? 0 : at();
      } catch {
        return at();
      }
    }, e.getOffset = function(r) {
      var n = r.getBoundingClientRect(), t = We(r), i = ie(r);
      return {
        top: n.top + (i.pageYOffset || t.documentElement.scrollTop),
        left: n.left + (i.pageXOffset || t.documentElement.scrollLeft)
      };
    }, e.prototype.init = function() {
      et && (this.initDOM(), this.rtlHelpers = e.getRtlHelpers(), this.scrollbarWidth = this.getScrollbarWidth(), this.recalculate(), this.initListeners());
    }, e.prototype.initDOM = function() {
      var r, n;
      this.wrapperEl = this.el.querySelector(W(this.classNames.wrapper)), this.contentWrapperEl = this.options.scrollableNode || this.el.querySelector(W(this.classNames.contentWrapper)), this.contentEl = this.options.contentNode || this.el.querySelector(W(this.classNames.contentEl)), this.offsetEl = this.el.querySelector(W(this.classNames.offset)), this.maskEl = this.el.querySelector(W(this.classNames.mask)), this.placeholderEl = this.findChild(this.wrapperEl, W(this.classNames.placeholder)), this.heightAutoObserverWrapperEl = this.el.querySelector(W(this.classNames.heightAutoObserverWrapperEl)), this.heightAutoObserverEl = this.el.querySelector(W(this.classNames.heightAutoObserverEl)), this.axis.x.track.el = this.findChild(this.el, "".concat(W(this.classNames.track)).concat(W(this.classNames.horizontal))), this.axis.y.track.el = this.findChild(this.el, "".concat(W(this.classNames.track)).concat(W(this.classNames.vertical))), this.axis.x.scrollbar.el = ((r = this.axis.x.track.el) === null || r === void 0 ? void 0 : r.querySelector(W(this.classNames.scrollbar))) || null, this.axis.y.scrollbar.el = ((n = this.axis.y.track.el) === null || n === void 0 ? void 0 : n.querySelector(W(this.classNames.scrollbar))) || null, this.options.autoHide || (oe(this.axis.x.scrollbar.el, this.classNames.visible), oe(this.axis.y.scrollbar.el, this.classNames.visible));
    }, e.prototype.initListeners = function() {
      var r = this, n, t = ie(this.el);
      if (this.el.addEventListener("mouseenter", this.onMouseEnter), this.el.addEventListener("pointerdown", this.onPointerEvent, !0), this.el.addEventListener("mousemove", this.onMouseMove), this.el.addEventListener("mouseleave", this.onMouseLeave), (n = this.contentWrapperEl) === null || n === void 0 || n.addEventListener("scroll", this.onScroll), t.addEventListener("resize", this.onWindowResize), !!this.contentEl) {
        if (window.ResizeObserver) {
          var i = !1, o = t.ResizeObserver || ResizeObserver;
          this.resizeObserver = new o(function() {
            i && t.requestAnimationFrame(function() {
              r.recalculate();
            });
          }), this.resizeObserver.observe(this.el), this.resizeObserver.observe(this.contentEl), t.requestAnimationFrame(function() {
            i = !0;
          });
        }
        this.mutationObserver = new t.MutationObserver(function() {
          t.requestAnimationFrame(function() {
            r.recalculate();
          });
        }), this.mutationObserver.observe(this.contentEl, {
          childList: !0,
          subtree: !0,
          characterData: !0
        });
      }
    }, e.prototype.recalculate = function() {
      if (!(!this.heightAutoObserverEl || !this.contentEl || !this.contentWrapperEl || !this.wrapperEl || !this.placeholderEl)) {
        var r = ie(this.el);
        this.elStyles = r.getComputedStyle(this.el), this.isRtl = this.elStyles.direction === "rtl";
        var n = this.contentEl.offsetWidth, t = this.heightAutoObserverEl.offsetHeight <= 1, i = this.heightAutoObserverEl.offsetWidth <= 1 || n > 0, o = this.contentWrapperEl.offsetWidth, l = this.elStyles.overflowX, s = this.elStyles.overflowY;
        this.contentEl.style.padding = "".concat(this.elStyles.paddingTop, " ").concat(this.elStyles.paddingRight, " ").concat(this.elStyles.paddingBottom, " ").concat(this.elStyles.paddingLeft), this.wrapperEl.style.margin = "-".concat(this.elStyles.paddingTop, " -").concat(this.elStyles.paddingRight, " -").concat(this.elStyles.paddingBottom, " -").concat(this.elStyles.paddingLeft);
        var a = this.contentEl.scrollHeight, u = this.contentEl.scrollWidth;
        this.contentWrapperEl.style.height = t ? "auto" : "100%", this.placeholderEl.style.width = i ? "".concat(n || u, "px") : "auto", this.placeholderEl.style.height = "".concat(a, "px");
        var d = this.contentWrapperEl.offsetHeight;
        this.axis.x.isOverflowing = n !== 0 && u > n, this.axis.y.isOverflowing = a > d, this.axis.x.isOverflowing = l === "hidden" ? !1 : this.axis.x.isOverflowing, this.axis.y.isOverflowing = s === "hidden" ? !1 : this.axis.y.isOverflowing, this.axis.x.forceVisible = this.options.forceVisible === "x" || this.options.forceVisible === !0, this.axis.y.forceVisible = this.options.forceVisible === "y" || this.options.forceVisible === !0, this.hideNativeScrollbar();
        var f = this.axis.x.isOverflowing ? this.scrollbarWidth : 0, g = this.axis.y.isOverflowing ? this.scrollbarWidth : 0;
        this.axis.x.isOverflowing = this.axis.x.isOverflowing && u > o - g, this.axis.y.isOverflowing = this.axis.y.isOverflowing && a > d - f, this.axis.x.scrollbar.size = this.getScrollbarSize("x"), this.axis.y.scrollbar.size = this.getScrollbarSize("y"), this.axis.x.scrollbar.el && (this.axis.x.scrollbar.el.style.width = "".concat(this.axis.x.scrollbar.size, "px")), this.axis.y.scrollbar.el && (this.axis.y.scrollbar.el.style.height = "".concat(this.axis.y.scrollbar.size, "px")), this.positionScrollbar("x"), this.positionScrollbar("y"), this.toggleTrackVisibility("x"), this.toggleTrackVisibility("y");
      }
    }, e.prototype.getScrollbarSize = function(r) {
      var n, t;
      if (r === void 0 && (r = "y"), !this.axis[r].isOverflowing || !this.contentEl)
        return 0;
      var i = this.contentEl[this.axis[r].scrollSizeAttr], o = (t = (n = this.axis[r].track.el) === null || n === void 0 ? void 0 : n[this.axis[r].offsetSizeAttr]) !== null && t !== void 0 ? t : 0, l = o / i, s;
      return s = Math.max(~~(l * o), this.options.scrollbarMinSize), this.options.scrollbarMaxSize && (s = Math.min(s, this.options.scrollbarMaxSize)), s;
    }, e.prototype.positionScrollbar = function(r) {
      var n, t, i;
      r === void 0 && (r = "y");
      var o = this.axis[r].scrollbar;
      if (!(!this.axis[r].isOverflowing || !this.contentWrapperEl || !o.el || !this.elStyles)) {
        var l = this.contentWrapperEl[this.axis[r].scrollSizeAttr], s = ((n = this.axis[r].track.el) === null || n === void 0 ? void 0 : n[this.axis[r].offsetSizeAttr]) || 0, a = parseInt(this.elStyles[this.axis[r].sizeAttr], 10), u = this.contentWrapperEl[this.axis[r].scrollOffsetAttr];
        u = r === "x" && this.isRtl && (!((t = e.getRtlHelpers()) === null || t === void 0) && t.isScrollOriginAtZero) ? -u : u, r === "x" && this.isRtl && (u = !((i = e.getRtlHelpers()) === null || i === void 0) && i.isScrollingToNegative ? u : -u);
        var d = u / (l - a), f = ~~((s - o.size) * d);
        f = r === "x" && this.isRtl ? -f + (s - o.size) : f, o.el.style.transform = r === "x" ? "translate3d(".concat(f, "px, 0, 0)") : "translate3d(0, ".concat(f, "px, 0)");
      }
    }, e.prototype.toggleTrackVisibility = function(r) {
      r === void 0 && (r = "y");
      var n = this.axis[r].track.el, t = this.axis[r].scrollbar.el;
      !n || !t || !this.contentWrapperEl || (this.axis[r].isOverflowing || this.axis[r].forceVisible ? (n.style.visibility = "visible", this.contentWrapperEl.style[this.axis[r].overflowAttr] = "scroll", this.el.classList.add("".concat(this.classNames.scrollable, "-").concat(r))) : (n.style.visibility = "hidden", this.contentWrapperEl.style[this.axis[r].overflowAttr] = "hidden", this.el.classList.remove("".concat(this.classNames.scrollable, "-").concat(r))), this.axis[r].isOverflowing ? t.style.display = "block" : t.style.display = "none");
    }, e.prototype.showScrollbar = function(r) {
      r === void 0 && (r = "y"), this.axis[r].isOverflowing && !this.axis[r].scrollbar.isVisible && (oe(this.axis[r].scrollbar.el, this.classNames.visible), this.axis[r].scrollbar.isVisible = !0);
    }, e.prototype.hideScrollbar = function(r) {
      r === void 0 && (r = "y"), !this.isDragging && this.axis[r].isOverflowing && this.axis[r].scrollbar.isVisible && (le(this.axis[r].scrollbar.el, this.classNames.visible), this.axis[r].scrollbar.isVisible = !1);
    }, e.prototype.hideNativeScrollbar = function() {
      this.offsetEl && (this.offsetEl.style[this.isRtl ? "left" : "right"] = this.axis.y.isOverflowing || this.axis.y.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px", this.offsetEl.style.bottom = this.axis.x.isOverflowing || this.axis.x.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px");
    }, e.prototype.onMouseMoveForAxis = function(r) {
      r === void 0 && (r = "y");
      var n = this.axis[r];
      !n.track.el || !n.scrollbar.el || (n.track.rect = n.track.el.getBoundingClientRect(), n.scrollbar.rect = n.scrollbar.el.getBoundingClientRect(), this.isWithinBounds(n.track.rect) ? (this.showScrollbar(r), oe(n.track.el, this.classNames.hover), this.isWithinBounds(n.scrollbar.rect) ? oe(n.scrollbar.el, this.classNames.hover) : le(n.scrollbar.el, this.classNames.hover)) : (le(n.track.el, this.classNames.hover), this.options.autoHide && this.hideScrollbar(r)));
    }, e.prototype.onMouseLeaveForAxis = function(r) {
      r === void 0 && (r = "y"), le(this.axis[r].track.el, this.classNames.hover), le(this.axis[r].scrollbar.el, this.classNames.hover), this.options.autoHide && this.hideScrollbar(r);
    }, e.prototype.onDragStart = function(r, n) {
      var t;
      n === void 0 && (n = "y"), this.isDragging = !0;
      var i = We(this.el), o = ie(this.el), l = this.axis[n].scrollbar, s = n === "y" ? r.pageY : r.pageX;
      this.axis[n].dragOffset = s - (((t = l.rect) === null || t === void 0 ? void 0 : t[this.axis[n].offsetAttr]) || 0), this.draggedAxis = n, oe(this.el, this.classNames.dragging), i.addEventListener("mousemove", this.drag, !0), i.addEventListener("mouseup", this.onEndDrag, !0), this.removePreventClickId === null ? (i.addEventListener("click", this.preventClick, !0), i.addEventListener("dblclick", this.preventClick, !0)) : (o.clearTimeout(this.removePreventClickId), this.removePreventClickId = null);
    }, e.prototype.onTrackClick = function(r, n) {
      var t = this, i, o, l, s;
      n === void 0 && (n = "y");
      var a = this.axis[n];
      if (!(!this.options.clickOnTrack || !a.scrollbar.el || !this.contentWrapperEl)) {
        r.preventDefault();
        var u = ie(this.el);
        this.axis[n].scrollbar.rect = a.scrollbar.el.getBoundingClientRect();
        var d = this.axis[n].scrollbar, f = (o = (i = d.rect) === null || i === void 0 ? void 0 : i[this.axis[n].offsetAttr]) !== null && o !== void 0 ? o : 0, g = parseInt((s = (l = this.elStyles) === null || l === void 0 ? void 0 : l[this.axis[n].sizeAttr]) !== null && s !== void 0 ? s : "0px", 10), c = this.contentWrapperEl[this.axis[n].scrollOffsetAttr], h = n === "y" ? this.mouseY - f : this.mouseX - f, p = h < 0 ? -1 : 1, S = p === -1 ? c - g : c + g, v = 40, F = function() {
          t.contentWrapperEl && (p === -1 ? c > S && (c -= v, t.contentWrapperEl[t.axis[n].scrollOffsetAttr] = c, u.requestAnimationFrame(F)) : c < S && (c += v, t.contentWrapperEl[t.axis[n].scrollOffsetAttr] = c, u.requestAnimationFrame(F)));
        };
        F();
      }
    }, e.prototype.getContentElement = function() {
      return this.contentEl;
    }, e.prototype.getScrollElement = function() {
      return this.contentWrapperEl;
    }, e.prototype.removeListeners = function() {
      var r = ie(this.el);
      this.el.removeEventListener("mouseenter", this.onMouseEnter), this.el.removeEventListener("pointerdown", this.onPointerEvent, !0), this.el.removeEventListener("mousemove", this.onMouseMove), this.el.removeEventListener("mouseleave", this.onMouseLeave), this.contentWrapperEl && this.contentWrapperEl.removeEventListener("scroll", this.onScroll), r.removeEventListener("resize", this.onWindowResize), this.mutationObserver && this.mutationObserver.disconnect(), this.resizeObserver && this.resizeObserver.disconnect(), this.onMouseMove.cancel(), this.onWindowResize.cancel(), this.onStopScrolling.cancel(), this.onMouseEntered.cancel();
    }, e.prototype.unMount = function() {
      this.removeListeners();
    }, e.prototype.isWithinBounds = function(r) {
      return this.mouseX >= r.left && this.mouseX <= r.left + r.width && this.mouseY >= r.top && this.mouseY <= r.top + r.height;
    }, e.prototype.findChild = function(r, n) {
      var t = r.matches || r.webkitMatchesSelector || r.mozMatchesSelector || r.msMatchesSelector;
      return Array.prototype.filter.call(r.children, function(i) {
        return t.call(i, n);
      })[0];
    }, e.rtlHelpers = null, e.defaultOptions = {
      forceVisible: !1,
      clickOnTrack: !0,
      scrollbarMinSize: 25,
      scrollbarMaxSize: 0,
      ariaLabel: "scrollable content",
      tabIndex: 0,
      classNames: {
        contentEl: "simplebar-content",
        contentWrapper: "simplebar-content-wrapper",
        offset: "simplebar-offset",
        mask: "simplebar-mask",
        wrapper: "simplebar-wrapper",
        placeholder: "simplebar-placeholder",
        scrollbar: "simplebar-scrollbar",
        track: "simplebar-track",
        heightAutoObserverWrapperEl: "simplebar-height-auto-observer-wrapper",
        heightAutoObserverEl: "simplebar-height-auto-observer",
        visible: "simplebar-visible",
        horizontal: "simplebar-horizontal",
        vertical: "simplebar-vertical",
        hover: "simplebar-hover",
        dragging: "simplebar-dragging",
        scrolling: "simplebar-scrolling",
        scrollable: "simplebar-scrollable",
        mouseEntered: "simplebar-mouse-entered"
      },
      scrollableNode: null,
      contentNode: null,
      autoHide: !0
    }, e.getOptions = nr, e.helpers = tr, e;
  })()
), q = function() {
  return q = Object.assign || function(r) {
    for (var n, t = 1, i = arguments.length; t < i; t++) {
      n = arguments[t];
      for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
    }
    return r;
  }, q.apply(this, arguments);
};
function rr(e, r) {
  var n = {};
  for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && r.indexOf(t) < 0 && (n[t] = e[t]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, t = Object.getOwnPropertySymbols(e); i < t.length; i++)
      r.indexOf(t[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, t[i]) && (n[t[i]] = e[t[i]]);
  return n;
}
var $t = L.forwardRef(function(e, r) {
  var n = e.children, t = e.scrollableNodeProps, i = t === void 0 ? {} : t, o = rr(e, ["children", "scrollableNodeProps"]), l = L.useRef(), s = L.useRef(), a = L.useRef(), u = {}, d = {};
  Object.keys(o).forEach(function(c) {
    Object.prototype.hasOwnProperty.call(_e.defaultOptions, c) ? u[c] = o[c] : d[c] = o[c];
  });
  var f = q(q({}, _e.defaultOptions.classNames), u.classNames), g = q(q({}, i), { className: "".concat(f.contentWrapper).concat(i.className ? " ".concat(i.className) : ""), tabIndex: u.tabIndex || _e.defaultOptions.tabIndex, role: "region", "aria-label": u.ariaLabel || _e.defaultOptions.ariaLabel });
  return L.useEffect(function() {
    var c;
    return s.current = g.ref ? g.ref.current : s.current, l.current && (c = new _e(l.current, q(q(q({}, u), s.current && {
      scrollableNode: s.current
    }), a.current && {
      contentNode: a.current
    })), typeof r == "function" ? r(c) : r && (r.current = c)), function() {
      c?.unMount(), c = null, typeof r == "function" && r(null);
    };
  }, []), L.createElement(
    "div",
    q({ "data-simplebar": "init", ref: l }, d),
    L.createElement(
      "div",
      { className: f.wrapper },
      L.createElement(
        "div",
        { className: f.heightAutoObserverWrapperEl },
        L.createElement("div", { className: f.heightAutoObserverEl })
      ),
      L.createElement(
        "div",
        { className: f.mask },
        L.createElement("div", { className: f.offset }, typeof n == "function" ? n({
          scrollableNodeRef: s,
          scrollableNodeProps: q(q({}, g), { ref: s }),
          contentNodeRef: a,
          contentNodeProps: {
            className: f.contentEl,
            ref: a
          }
        }) : L.createElement(
          "div",
          q({}, g),
          L.createElement("div", { className: f.contentEl }, n)
        ))
      ),
      L.createElement("div", { className: f.placeholder })
    ),
    L.createElement(
      "div",
      { className: "".concat(f.track, " ").concat(f.horizontal) },
      L.createElement("div", { className: f.scrollbar })
    ),
    L.createElement(
      "div",
      { className: "".concat(f.track, " ").concat(f.vertical) },
      L.createElement("div", { className: f.scrollbar })
    )
  );
});
$t.displayName = "SimpleBar";
function ir(e, r, n, t) {
  return yn({
    data: r,
    columns: e,
    state: {
      columnOrder: n
    },
    onColumnOrderChange: t,
    getCoreRowModel: vn()
  });
}
function or(e) {
  const [r, n] = U(0);
  return Ye(() => {
    const t = e.current;
    if (!t) return;
    const i = new ResizeObserver((o) => {
      n(o[0].contentRect.width);
    });
    return i.observe(t), () => i.disconnect();
  }, [e]), r;
}
function lr() {
  const e = k(null), r = k([]), n = ee((i) => {
    i && !r.current.includes(i) && r.current.push(i);
  }, []), t = ee(() => {
    if (!e.current) return;
    const i = e.current.scrollLeft;
    r.current.forEach((o) => {
      o.scrollLeft !== i && (o.scrollLeft = i);
    });
  }, []);
  return {
    bodyRef: e,
    registerSyncElement: n,
    onBodyScroll: t
  };
}
function sr({
  onResize: e,
  onResizeEnd: r,
  minWidth: n = 40
}) {
  const t = k(0), i = k(0), o = k(null), l = ee(
    (u) => {
      if (!o.current) return;
      const d = u.clientX - t.current, f = Math.max(n, i.current + d);
      e(o.current, f);
    },
    [n, e]
  ), s = ee(() => {
    o.current = null, document.removeEventListener("mousemove", l), document.removeEventListener("mouseup", s), r?.();
  }, [l, r]);
  return { startResize: ee(
    (u, d) => {
      u.preventDefault(), u.stopPropagation(), o.current = d.id, t.current = u.clientX, i.current = Ke(d.columnDef.meta?.widthSize), document.addEventListener("mousemove", l), document.addEventListener("mouseup", s);
    },
    [l, s]
  ) };
}
function ar(e) {
  const [r, n] = U(!1);
  return Ye(() => {
    const t = e.current;
    if (!t) return;
    const i = () => {
      const s = t.scrollWidth - t.clientWidth;
      n(s > 1);
    };
    i();
    const o = new ResizeObserver(i);
    o.observe(t);
    const l = t.firstElementChild;
    return l instanceof HTMLElement && o.observe(l), t.addEventListener("scroll", i, { passive: !0 }), () => {
      o.disconnect(), t.removeEventListener("scroll", i);
    };
  }, [e]), r;
}
function ur(e) {
  return he(() => {
    const r = e.getAllLeafColumns(), n = /* @__PURE__ */ new Map();
    for (const l of r)
      n.set(l.id, Ke(l.columnDef.meta?.widthSize));
    const t = /* @__PURE__ */ new Map();
    let i = 0;
    for (const l of r)
      l.columnDef.meta?.sticky === "left" && (t.set(l.id, { side: "left", offset: i, zIndex: 20 }), i += n.get(l.id) ?? 0);
    let o = 0;
    for (let l = r.length - 1; l >= 0; l--) {
      const s = r[l];
      s.columnDef.meta?.sticky === "right" && (t.set(s.id, { side: "right", offset: o, zIndex: 20 }), o += n.get(s.id) ?? 0);
    }
    return t;
  }, [e]);
}
function cr({ setColumnOrder: e }) {
  const r = k(null), n = k(null), t = k(null), i = k(0), o = k(null), l = k(0), s = k([]), a = k(() => {
  }), u = k(() => {
  }), d = ee(() => {
    const c = Array.from(
      document.querySelectorAll("th[data-col-id]")
    );
    s.current = c.filter((h) => h.dataset.reorderable !== "false").map((h) => {
      const p = h.dataset.colId, S = h.getBoundingClientRect();
      return {
        id: p,
        left: S.left,
        right: S.right,
        center: S.left + S.width / 2
      };
    }).sort((h, p) => h.left - p.left);
  }, []), f = ee((c) => {
    const h = c.getBoundingClientRect(), p = c.cloneNode(!0);
    return p.classList.add("table-col-ghost"), p.style.position = "fixed", p.style.left = `${h.left}px`, p.style.top = `${h.top}px`, p.style.width = `${h.width}px`, p.style.height = `${h.height}px`, p.style.pointerEvents = "none", p.style.zIndex = "9999", p.style.willChange = "left", p.style.transition = "none", document.body.appendChild(p), p;
  }, []), g = ee(
    (c, h) => {
      r.current = c;
      const p = document.querySelector(`th[data-col-id="${c}"]`);
      if (!p) return;
      t.current = p;
      const S = p.getBoundingClientRect();
      i.current = h.clientX - S.left;
      const v = f(p);
      n.current = v, p.classList.add("is-dragging-col"), p.style.opacity = "0.2", d(), l.current = h.clientX, document.body.style.cursor = "grabbing", document.addEventListener("pointermove", a.current), document.addEventListener("pointerup", u.current);
    },
    [f, d]
  );
  return a.current = (c) => {
    !r.current || !n.current || (l.current = c.clientX, !o.current && (o.current = requestAnimationFrame(() => {
      if (o.current = null, !r.current || !n.current) return;
      const h = n.current, p = l.current - i.current;
      h.style.left = `${p}px`;
      const S = h.offsetWidth, v = p + S / 2, F = s.current;
      if (!F.length) return;
      let _ = null;
      for (const b of F)
        if (b.id !== r.current && v >= b.left && v <= b.right) {
          _ = b.id;
          break;
        }
      !_ || _ === r.current || (e((b) => {
        const O = b.indexOf(r.current), R = b.indexOf(_);
        if (O === -1 || R === -1 || O === R) return b;
        const E = [...b];
        return E.splice(O, 1), E.splice(R, 0, r.current), E;
      }), requestAnimationFrame(() => {
        d();
      }));
    })));
  }, u.current = () => {
    o.current && (cancelAnimationFrame(o.current), o.current = null), n.current?.remove(), n.current = null, t.current && (t.current.classList.remove("is-dragging-col"), t.current.style.opacity = ""), t.current = null, r.current = null, i.current = 0, l.current = 0, s.current = [], document.body.style.cursor = "", document.removeEventListener("pointermove", a.current), document.removeEventListener("pointerup", u.current);
  }, {
    startDrag: g
  };
}
function dr(e) {
  return "accessorKey" in e && typeof e.accessorKey == "string";
}
function gr(e) {
  return e.map((r) => {
    if (r.id)
      return r;
    if (dr(r))
      return {
        ...r,
        id: r.accessorKey
      };
    throw new Error(
      "Columns sem id e sem accessorKey string. Defina um id explicitamente para esta coluna."
    );
  });
}
function fr(e) {
  return {
    id: "__draggable__",
    header: "",
    accessorFn: () => null,
    meta: {
      widthSize: "36px",
      sticky: e ? "left" : void 0,
      resizable: !1,
      reorderable: !1,
      textAlign: "center"
    },
    cell: () => "☰"
  };
}
function pr(e, r) {
  return {
    id: "__selectable__",
    header: r || "",
    accessorFn: () => null,
    meta: {
      widthSize: r ? "120px" : "36px",
      sticky: e ? "left" : void 0,
      resizable: !1,
      reorderable: !1,
      textAlign: "center"
    },
    cell: () => null
  };
}
function hr(e) {
  return {
    id: "__expandable__",
    header: "",
    accessorFn: () => null,
    meta: {
      widthSize: "36px",
      sticky: e ? "left" : void 0,
      resizable: !1,
      reorderable: !1,
      textAlign: "center"
    },
    cell: () => null
  };
}
function Sr({
  header: e,
  data: r,
  footer: n,
  tableHeight: t = "400px",
  resizableCol: i = !1,
  reorderableCol: o = !1,
  sortableCol: l = !0,
  onSortChange: s,
  onDataChange: a,
  stripedRows: u = !1,
  defaultTextAlign: d = "left",
  editable: f = !1,
  draggable: g = !1,
  draggableSticky: c = !1,
  selectable: h,
  expandable: p,
  pagination: S,
  loading: v,
  loadingCustom: F,
  noResultMessage: _ = "Nenhum resultado encontrado.",
  hoverableRow: b,
  borders: O = "full",
  style: R = "default"
}) {
  const E = k(null), V = ee(
    (P) => {
      E.current = P;
    },
    []
  ), [B, ue] = U(null), Y = ee(
    (P) => {
      ue(P), s?.(P);
    },
    [s]
  ), {
    bodyRef: ce,
    registerSyncElement: de,
    onBodyScroll: me
  } = lr(), Z = or(ce), A = ar(ce), [M, T] = U({}), K = he(
    () => new Set(h?.initialSelectRow || []),
    [h?.initialSelectRow]
  ), [ge, fe] = U(K), [y, I] = U(/* @__PURE__ */ new Set()), D = he(
    () => gr(
      (() => {
        const P = [];
        return g && P.push(fr(c)), h && P.push(pr(
          h.sticky,
          h.label
        )), p && P.push(hr(p.sticky)), [...P, ...e];
      })()
    ),
    [
      e,
      g,
      c,
      h,
      p
    ]
  ), [N, $] = U(
    () => D.map((P) => P.id)
  ), [x, j] = U(r);
  tt(() => {
    j(r);
  }, [r]), tt(() => {
    a?.(x);
  }, [x, a]);
  const pe = he(
    () => D.map((P) => ({
      ...P,
      meta: {
        ...P.meta,
        widthSize: M[P.id] ?? P.meta?.widthSize
      }
    })),
    [D, M]
  ), J = ir(
    pe,
    x,
    N,
    $
  ), te = ur(J), { startResize: ve } = sr({
    onResize: (P, Ce) => {
      T((Re) => ({
        ...Re,
        [P]: `${Ce}px`
      }));
    },
    onResizeEnd: () => {
      requestAnimationFrame(() => {
        E.current?.recalculate();
      });
    }
  }), { startDrag: z } = cr({
    setColumnOrder: $
  });
  return Ye(() => {
    E.current?.recalculate();
  }, [A]), /* @__PURE__ */ G("div", { className: `super-table-wrapper borders-${O} style-${R}`, style: { height: t }, children: [
    /* @__PURE__ */ m(
      Mt,
      {
        table: J,
        scrollRef: de,
        tableWidth: Z,
        stickyById: te,
        resizableCol: i,
        reorderableCol: o,
        sortableCol: l,
        sortState: B,
        setSortState: Y,
        onResizeStart: ve,
        onDragStart: z,
        defaultTextAlign: d,
        selectable: h,
        selectedRows: ge,
        setSelectedRows: fe,
        disableSelectRow: h?.disableSelectRow || [],
        data: r,
        expandable: p,
        expandedRows: y,
        setExpandedRows: I
      }
    ),
    /* @__PURE__ */ G("div", { className: "internal-table", children: [
      /* @__PURE__ */ m(
        bt,
        {
          table: J,
          scrollRef: de,
          tableWidth: Z,
          stickyById: te,
          defaultTextAlign: d
        }
      ),
      /* @__PURE__ */ G("div", { className: `table-body-area ${A ? "has-h-scroll" : "no-h-scroll"}`, children: [
        /* @__PURE__ */ m(
          $t,
          {
            ref: V,
            className: "table-body-scroll",
            scrollableNodeProps: {
              ref: ce,
              onScroll: me
            },
            children: /* @__PURE__ */ m(
              xn,
              {
                table: J,
                tableWidth: Z,
                stickyById: te,
                defaultTextAlign: d,
                editable: f,
                draggable: g,
                setData: j,
                setInternalData: j,
                selectable: h,
                selectedRows: ge,
                setSelectedRows: fe,
                disableSelectRow: h?.disableSelectRow || [],
                expandable: p,
                expandedRows: y,
                setExpandedRows: I,
                loading: v,
                loadingCustom: F,
                noResultMessage: _,
                totalItems: S?.totalItems,
                stripedRows: u,
                hoverableRow: b
              }
            )
          }
        ),
        /* @__PURE__ */ m(
          _n,
          {
            table: J,
            scrollRef: de,
            tableWidth: Z,
            stickyById: te,
            defaultTextAlign: d
          }
        )
      ] })
    ] }),
    n && /* @__PURE__ */ m(En, { table: J, children: n }),
    S && /* @__PURE__ */ m(
      Fn,
      {
        currentPage: S.currentPage,
        totalItems: S.totalItems,
        pageSize: S.pageSize,
        pageSizeOptions: S.pageSizeOptions,
        onPageChange: S.onPageChange
      }
    )
  ] });
}
export {
  Sr as Table
};
