import { jsx as m, jsxs as G } from "react/jsx-runtime";
import * as z from "react";
import { useMemo as fe, useRef as D, useState as X, useLayoutEffect as Ze, useCallback as Z, useEffect as Fe } from "react";
function bt(e) {
  const r = e.columnDef.meta;
  return !(r?.resizable === !1 || r?.sticky && r.resizable !== !0);
}
function Ve(e, r) {
  return e.columnDef.meta?.textAlign ?? r;
}
function Je(e) {
  return e && e.endsWith("px") ? parseFloat(e) : 0;
}
function ze({ table: e, tableWidth: r }) {
  const n = e.getAllLeafColumns(), o = n.map(
    (l) => Je(l.columnDef.meta?.widthSize)
  ).reduce((l, s) => l + s, 0) > r;
  return /* @__PURE__ */ m("colgroup", { children: n.map((l, s) => {
    const a = l.columnDef.meta, u = s === n.length - 1;
    let d;
    return !o && u ? d = { width: "auto" } : a?.widthSize && (d = { width: a.widthSize }), /* @__PURE__ */ m("col", { style: d }, l.id);
  }) });
}
function Ot({
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
  selectedRows: p,
  disableSelectRow: g,
  onDragStart: c,
  scrollRef: f,
  onResizeStart: h,
  setSelectedRows: S,
  expandable: v,
  expandedRows: $,
  setExpandedRows: E
}) {
  const b = n.map((V, F) => typeof V == "object" && V !== null && "id" in V ? V.id ?? F : F), A = !!d, x = d?.label, M = b.filter((V) => !g.includes(V)), I = M.filter((V) => p.has(V)).length, U = I === M.length && M.length > 0, J = I > 0 && I < M.length, re = () => {
    S((V) => {
      const F = new Set(V);
      return U ? M.forEach((H) => F.delete(H)) : M.forEach((H) => F.add(H)), F;
    });
  }, ie = !!v, ge = v?.allButton || !1, oe = b.every((V) => $.has(V)), Ce = () => {
    E(oe ? /* @__PURE__ */ new Set() : new Set(b));
  };
  return /* @__PURE__ */ m("div", { className: "table-scroll-sync", ref: f, children: /* @__PURE__ */ G("table", { className: "table table-external-header", children: [
    /* @__PURE__ */ m(
      ze,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ m("thead", { children: e.getHeaderGroups().map((V) => /* @__PURE__ */ m("tr", { children: V.headers.map((F) => {
      const H = F.column.columnDef.meta, j = t.get(F.column.id), Re = Ve(F.column, u), Q = o && H?.reorderable !== !1 && !H?.sticky, ee = (H?.sortable ?? l) && !H?.sticky && !["__draggable__", "__selectable__", "__expandable__"].includes(F.column.id), pe = s?.columnId === F.column.id, y = () => {
        if (!ee) return;
        let R;
        !s || s.columnId !== F.column.id ? R = { columnId: F.column.id, direction: "asc" } : s.direction === "asc" ? R = { columnId: F.column.id, direction: "desc" } : R = null, a(R);
      }, P = [
        j ? "is-sticky" : "",
        j?.side === "left" ? "is-sticky-left" : "",
        j?.side === "right" ? "is-sticky-right" : "",
        ee ? "is-sortable" : "",
        pe ? `is-sorted-${s.direction}` : ""
      ].filter(Boolean).join(" "), k = j ? j.side === "left" ? { "--sticky-left": `${j.offset}px` } : { "--sticky-right": `${j.offset}px` } : void 0;
      return /* @__PURE__ */ m(
        "th",
        {
          "data-col-id": F.column.id,
          "data-fixed": H?.sticky ? "true" : void 0,
          "data-reorderable": Q ? void 0 : "false",
          className: P,
          style: k,
          onClick: y,
          children: /* @__PURE__ */ G("div", { className: `th-content align-${Re}`, children: [
            /* @__PURE__ */ m("div", { children: F.isPlaceholder ? null : F.column.id === "__selectable__" && A ? /* @__PURE__ */ G("label", { children: [
              /* @__PURE__ */ m(
                "input",
                {
                  type: "checkbox",
                  checked: U,
                  ref: (R) => {
                    R && (R.indeterminate = J);
                  },
                  onChange: re
                }
              ),
              x
            ] }) : F.column.id === "__expandable__" && ie && ge ? /* @__PURE__ */ m(
              "button",
              {
                onClick: Ce,
                className: `expand-all-button ${oe ? "expanded" : ""}`,
                children: "⇅"
              }
            ) : (() => {
              const R = F.column.columnDef.header;
              return typeof R == "function" ? R({ column: F.column, table: e, header: F }) : R;
            })() }),
            ee && /* @__PURE__ */ m("span", { className: "sort-indicator" }),
            Q && /* @__PURE__ */ m(
              "span",
              {
                className: "col-drag-handle",
                onClick: (R) => R.stopPropagation(),
                onPointerDown: (R) => {
                  R.preventDefault(), R.currentTarget.setPointerCapture(R.pointerId), c?.(F.column.id, R.nativeEvent);
                },
                children: "☰"
              }
            ),
            i && h && bt(F.column) && /* @__PURE__ */ m(
              "span",
              {
                className: "col-resize-handle",
                onClick: (R) => R.stopPropagation(),
                onMouseDown: (R) => h(R, F.column)
              }
            )
          ] })
        },
        F.id
      );
    }) }, V.id)) })
  ] }) });
}
function It({
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
      ze,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ m("thead", { children: /* @__PURE__ */ m("tr", { children: e.getAllLeafColumns().map((s) => {
      const a = s.columnDef.meta?.internalHeader, u = n.get(s.id), d = Ve(s, t), p = [
        u ? "is-sticky" : "",
        u?.side === "left" ? "is-sticky-left" : "",
        u?.side === "right" ? "is-sticky-right" : ""
      ].filter(Boolean).join(" "), g = u ? u.side === "left" ? { "--sticky-left": `${u.offset}px` } : { "--sticky-right": `${u.offset}px` } : void 0;
      return /* @__PURE__ */ m(
        "th",
        {
          className: `${p} align-${d}`,
          style: g,
          children: typeof a == "function" ? a() : a ?? null
        },
        s.id
      );
    }) }) })
  ] }) }) : null;
}
function ce(e, r) {
  return typeof e == "function" ? e(r) : e;
}
function B(e, r) {
  return (n) => {
    r.setState((t) => ({
      ...t,
      [e]: ce(n, t[e])
    }));
  };
}
function Le(e) {
  return e instanceof Function;
}
function Pt(e) {
  return Array.isArray(e) && e.every((r) => typeof r == "number");
}
function At(e, r) {
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
    if (!(s.length !== t.length || s.some((d, p) => t[p] !== d)))
      return i;
    t = s;
    let u;
    if (n.key && n.debug && (u = Date.now()), i = r(...s), n == null || n.onChange == null || n.onChange(i), n.key && n.debug && n != null && n.debug()) {
      const d = Math.round((Date.now() - l) * 100) / 100, p = Math.round((Date.now() - u) * 100) / 100, g = p / 16, c = (f, h) => {
        for (f = String(f); f.length < h; )
          f = " " + f;
        return f;
      };
      console.info(`%c⏱ ${c(p, 5)} /${c(d, 5)} ms`, `
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
function Vt(e, r, n, t) {
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
function zt(e, r, n, t) {
  var i, o;
  const s = {
    ...e._getDefaultColumnDef(),
    ...r
  }, a = s.accessorKey;
  let u = (i = (o = s.id) != null ? o : a ? typeof String.prototype.replaceAll == "function" ? a.replaceAll(".", "_") : a.replace(/\./g, "_") : void 0) != null ? i : typeof s.header == "string" ? s.header : void 0, d;
  if (s.accessorFn ? d = s.accessorFn : a && (a.includes(".") ? d = (g) => {
    let c = g;
    for (const h of a.split(".")) {
      var f;
      c = (f = c) == null ? void 0 : f[h], process.env.NODE_ENV !== "production" && c === void 0 && console.warn(`"${h}" in deeply nested key "${a}" returned undefined.`);
    }
    return c;
  } : d = (g) => g[s.accessorKey]), !u)
    throw process.env.NODE_ENV !== "production" ? new Error(s.accessorFn ? "Columns require an id when using an accessorFn" : "Columns require an id when using a non-string header") : new Error();
  let p = {
    id: `${String(u)}`,
    accessorFn: d,
    parent: t,
    depth: n,
    columnDef: s,
    columns: [],
    getFlatColumns: w(() => [!0], () => {
      var g;
      return [p, ...(g = p.columns) == null ? void 0 : g.flatMap((c) => c.getFlatColumns())];
    }, C(e.options, "debugColumns", "column.getFlatColumns")),
    getLeafColumns: w(() => [e._getOrderColumnsFn()], (g) => {
      var c;
      if ((c = p.columns) != null && c.length) {
        let f = p.columns.flatMap((h) => h.getLeafColumns());
        return g(f);
      }
      return [p];
    }, C(e.options, "debugColumns", "column.getLeafColumns"))
  };
  for (const g of e._features)
    g.createColumn == null || g.createColumn(p, e);
  return p;
}
const N = "debugHeaders";
function it(e, r, n) {
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
const Lt = {
  createTable: (e) => {
    e.getHeaderGroups = w(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (r, n, t, i) => {
      var o, l;
      const s = (o = t?.map((p) => n.find((g) => g.id === p)).filter(Boolean)) != null ? o : [], a = (l = i?.map((p) => n.find((g) => g.id === p)).filter(Boolean)) != null ? l : [], u = n.filter((p) => !(t != null && t.includes(p.id)) && !(i != null && i.includes(p.id)));
      return Me(r, [...s, ...u, ...a], e);
    }, C(e.options, N, "getHeaderGroups")), e.getCenterHeaderGroups = w(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (r, n, t, i) => (n = n.filter((o) => !(t != null && t.includes(o.id)) && !(i != null && i.includes(o.id))), Me(r, n, e, "center")), C(e.options, N, "getCenterHeaderGroups")), e.getLeftHeaderGroups = w(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left], (r, n, t) => {
      var i;
      const o = (i = t?.map((l) => n.find((s) => s.id === l)).filter(Boolean)) != null ? i : [];
      return Me(r, o, e, "left");
    }, C(e.options, N, "getLeftHeaderGroups")), e.getRightHeaderGroups = w(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.right], (r, n, t) => {
      var i;
      const o = (i = t?.map((l) => n.find((s) => s.id === l)).filter(Boolean)) != null ? i : [];
      return Me(r, o, e, "right");
    }, C(e.options, N, "getRightHeaderGroups")), e.getFooterGroups = w(() => [e.getHeaderGroups()], (r) => [...r].reverse(), C(e.options, N, "getFooterGroups")), e.getLeftFooterGroups = w(() => [e.getLeftHeaderGroups()], (r) => [...r].reverse(), C(e.options, N, "getLeftFooterGroups")), e.getCenterFooterGroups = w(() => [e.getCenterHeaderGroups()], (r) => [...r].reverse(), C(e.options, N, "getCenterFooterGroups")), e.getRightFooterGroups = w(() => [e.getRightHeaderGroups()], (r) => [...r].reverse(), C(e.options, N, "getRightFooterGroups")), e.getFlatHeaders = w(() => [e.getHeaderGroups()], (r) => r.map((n) => n.headers).flat(), C(e.options, N, "getFlatHeaders")), e.getLeftFlatHeaders = w(() => [e.getLeftHeaderGroups()], (r) => r.map((n) => n.headers).flat(), C(e.options, N, "getLeftFlatHeaders")), e.getCenterFlatHeaders = w(() => [e.getCenterHeaderGroups()], (r) => r.map((n) => n.headers).flat(), C(e.options, N, "getCenterFlatHeaders")), e.getRightFlatHeaders = w(() => [e.getRightHeaderGroups()], (r) => r.map((n) => n.headers).flat(), C(e.options, N, "getRightFlatHeaders")), e.getCenterLeafHeaders = w(() => [e.getCenterFlatHeaders()], (r) => r.filter((n) => {
      var t;
      return !((t = n.subHeaders) != null && t.length);
    }), C(e.options, N, "getCenterLeafHeaders")), e.getLeftLeafHeaders = w(() => [e.getLeftFlatHeaders()], (r) => r.filter((n) => {
      var t;
      return !((t = n.subHeaders) != null && t.length);
    }), C(e.options, N, "getLeftLeafHeaders")), e.getRightLeafHeaders = w(() => [e.getRightFlatHeaders()], (r) => r.filter((n) => {
      var t;
      return !((t = n.subHeaders) != null && t.length);
    }), C(e.options, N, "getRightLeafHeaders")), e.getLeafHeaders = w(() => [e.getLeftHeaderGroups(), e.getCenterHeaderGroups(), e.getRightHeaderGroups()], (r, n, t) => {
      var i, o, l, s, a, u;
      return [...(i = (o = r[0]) == null ? void 0 : o.headers) != null ? i : [], ...(l = (s = n[0]) == null ? void 0 : s.headers) != null ? l : [], ...(a = (u = t[0]) == null ? void 0 : u.headers) != null ? a : []].map((d) => d.getLeafHeaders()).flat();
    }, C(e.options, N, "getLeafHeaders"));
  }
};
function Me(e, r, n, t) {
  var i, o;
  let l = 0;
  const s = function(g, c) {
    c === void 0 && (c = 1), l = Math.max(l, c), g.filter((f) => f.getIsVisible()).forEach((f) => {
      var h;
      (h = f.columns) != null && h.length && s(f.columns, c + 1);
    }, 0);
  };
  s(e);
  let a = [];
  const u = (g, c) => {
    const f = {
      depth: c,
      id: [t, `${c}`].filter(Boolean).join("_"),
      headers: []
    }, h = [];
    g.forEach((S) => {
      const v = [...h].reverse()[0], $ = S.column.depth === f.depth;
      let E, b = !1;
      if ($ && S.column.parent ? E = S.column.parent : (E = S.column, b = !0), v && v?.column === E)
        v.subHeaders.push(S);
      else {
        const A = it(n, E, {
          id: [t, c, E.id, S?.id].filter(Boolean).join("_"),
          isPlaceholder: b,
          placeholderId: b ? `${h.filter((x) => x.column === E).length}` : void 0,
          depth: c,
          index: h.length
        });
        A.subHeaders.push(S), h.push(A);
      }
      f.headers.push(S), S.headerGroup = f;
    }), a.push(f), c > 0 && u(h, c - 1);
  }, d = r.map((g, c) => it(n, g, {
    depth: l,
    index: c
  }));
  u(d, l - 1), a.reverse();
  const p = (g) => g.filter((f) => f.column.getIsVisible()).map((f) => {
    let h = 0, S = 0, v = [0];
    f.subHeaders && f.subHeaders.length ? (v = [], p(f.subHeaders).forEach((E) => {
      let {
        colSpan: b,
        rowSpan: A
      } = E;
      h += b, v.push(A);
    })) : h = 1;
    const $ = Math.min(...v);
    return S = S + $, f.colSpan = h, f.rowSpan = S, {
      colSpan: h,
      rowSpan: S
    };
  });
  return p((i = (o = a[0]) == null ? void 0 : o.headers) != null ? i : []), a;
}
const Dt = (e, r, n, t, i, o, l) => {
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
    getLeafRows: () => At(s.subRows, (a) => a.subRows),
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
    getAllCells: w(() => [e.getAllLeafColumns()], (a) => a.map((u) => Vt(e, s, u, u.id)), C(e.options, "debugRows", "getAllCells")),
    _getAllCellsByColumnId: w(() => [s.getAllCells()], (a) => a.reduce((u, d) => (u[d.column.id] = d, u), {}), C(e.options, "debugRows", "getAllCellsByColumnId"))
  };
  for (let a = 0; a < e._features.length; a++) {
    const u = e._features[a];
    u == null || u.createRow == null || u.createRow(s, e);
  }
  return s;
}, kt = {
  createColumn: (e, r) => {
    e._getFacetedRowModel = r.options.getFacetedRowModel && r.options.getFacetedRowModel(r, e.id), e.getFacetedRowModel = () => e._getFacetedRowModel ? e._getFacetedRowModel() : r.getPreFilteredRowModel(), e._getFacetedUniqueValues = r.options.getFacetedUniqueValues && r.options.getFacetedUniqueValues(r, e.id), e.getFacetedUniqueValues = () => e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getFacetedMinMaxValues = r.options.getFacetedMinMaxValues && r.options.getFacetedMinMaxValues(r, e.id), e.getFacetedMinMaxValues = () => {
      if (e._getFacetedMinMaxValues)
        return e._getFacetedMinMaxValues();
    };
  }
}, dt = (e, r, n) => {
  var t, i;
  const o = n == null || (t = n.toString()) == null ? void 0 : t.toLowerCase();
  return !!(!((i = e.getValue(r)) == null || (i = i.toString()) == null || (i = i.toLowerCase()) == null) && i.includes(o));
};
dt.autoRemove = (e) => K(e);
const gt = (e, r, n) => {
  var t;
  return !!(!((t = e.getValue(r)) == null || (t = t.toString()) == null) && t.includes(n));
};
gt.autoRemove = (e) => K(e);
const ft = (e, r, n) => {
  var t;
  return ((t = e.getValue(r)) == null || (t = t.toString()) == null ? void 0 : t.toLowerCase()) === n?.toLowerCase();
};
ft.autoRemove = (e) => K(e);
const pt = (e, r, n) => {
  var t;
  return (t = e.getValue(r)) == null ? void 0 : t.includes(n);
};
pt.autoRemove = (e) => K(e);
const ht = (e, r, n) => !n.some((t) => {
  var i;
  return !((i = e.getValue(r)) != null && i.includes(t));
});
ht.autoRemove = (e) => K(e) || !(e != null && e.length);
const mt = (e, r, n) => n.some((t) => {
  var i;
  return (i = e.getValue(r)) == null ? void 0 : i.includes(t);
});
mt.autoRemove = (e) => K(e) || !(e != null && e.length);
const vt = (e, r, n) => e.getValue(r) === n;
vt.autoRemove = (e) => K(e);
const St = (e, r, n) => e.getValue(r) == n;
St.autoRemove = (e) => K(e);
const et = (e, r, n) => {
  let [t, i] = n;
  const o = e.getValue(r);
  return o >= t && o <= i;
};
et.resolveFilterValue = (e) => {
  let [r, n] = e, t = typeof r != "number" ? parseFloat(r) : r, i = typeof n != "number" ? parseFloat(n) : n, o = r === null || Number.isNaN(t) ? -1 / 0 : t, l = n === null || Number.isNaN(i) ? 1 / 0 : i;
  if (o > l) {
    const s = o;
    o = l, l = s;
  }
  return [o, l];
};
et.autoRemove = (e) => K(e) || K(e[0]) && K(e[1]);
const ne = {
  includesString: dt,
  includesStringSensitive: gt,
  equalsString: ft,
  arrIncludes: pt,
  arrIncludesAll: ht,
  arrIncludesSome: mt,
  equals: vt,
  weakEquals: St,
  inNumberRange: et
};
function K(e) {
  return e == null || e === "";
}
const Nt = {
  getDefaultColumnDef: () => ({
    filterFn: "auto"
  }),
  getInitialState: (e) => ({
    columnFilters: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnFiltersChange: B("columnFilters", e),
    filterFromLeafRows: !1,
    maxLeafRowFilterDepth: 100
  }),
  createColumn: (e, r) => {
    e.getAutoFilterFn = () => {
      const n = r.getCoreRowModel().flatRows[0], t = n?.getValue(e.id);
      return typeof t == "string" ? ne.includesString : typeof t == "number" ? ne.inNumberRange : typeof t == "boolean" || t !== null && typeof t == "object" ? ne.equals : Array.isArray(t) ? ne.arrIncludes : ne.weakEquals;
    }, e.getFilterFn = () => {
      var n, t;
      return Le(e.columnDef.filterFn) ? e.columnDef.filterFn : e.columnDef.filterFn === "auto" ? e.getAutoFilterFn() : (
        // @ts-ignore
        (n = (t = r.options.filterFns) == null ? void 0 : t[e.columnDef.filterFn]) != null ? n : ne[e.columnDef.filterFn]
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
        const i = e.getFilterFn(), o = t?.find((d) => d.id === e.id), l = ce(n, o ? o.value : void 0);
        if (ot(i, l, e)) {
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
        return (o = ce(r, i)) == null ? void 0 : o.filter((l) => {
          const s = n.find((a) => a.id === l.id);
          if (s) {
            const a = s.getFilterFn();
            if (ot(a, l.value, s))
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
function ot(e, r, n) {
  return (e && e.autoRemove ? e.autoRemove(r, n) : !1) || typeof r > "u" || typeof r == "string" && !r;
}
const Ht = (e, r, n) => n.reduce((t, i) => {
  const o = i.getValue(e);
  return t + (typeof o == "number" ? o : 0);
}, 0), Gt = (e, r, n) => {
  let t;
  return n.forEach((i) => {
    const o = i.getValue(e);
    o != null && (t > o || t === void 0 && o >= o) && (t = o);
  }), t;
}, Tt = (e, r, n) => {
  let t;
  return n.forEach((i) => {
    const o = i.getValue(e);
    o != null && (t < o || t === void 0 && o >= o) && (t = o);
  }), t;
}, Wt = (e, r, n) => {
  let t, i;
  return n.forEach((o) => {
    const l = o.getValue(e);
    l != null && (t === void 0 ? l >= l && (t = i = l) : (t > l && (t = l), i < l && (i = l)));
  }), [t, i];
}, Bt = (e, r) => {
  let n = 0, t = 0;
  if (r.forEach((i) => {
    let o = i.getValue(e);
    o != null && (o = +o) >= o && (++n, t += o);
  }), n) return t / n;
}, jt = (e, r) => {
  if (!r.length)
    return;
  const n = r.map((o) => o.getValue(e));
  if (!Pt(n))
    return;
  if (n.length === 1)
    return n[0];
  const t = Math.floor(n.length / 2), i = n.sort((o, l) => o - l);
  return n.length % 2 !== 0 ? i[t] : (i[t - 1] + i[t]) / 2;
}, qt = (e, r) => Array.from(new Set(r.map((n) => n.getValue(e))).values()), Xt = (e, r) => new Set(r.map((n) => n.getValue(e))).size, Ut = (e, r) => r.length, ke = {
  sum: Ht,
  min: Gt,
  max: Tt,
  extent: Wt,
  mean: Bt,
  median: jt,
  unique: qt,
  uniqueCount: Xt,
  count: Ut
}, Yt = {
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
    onGroupingChange: B("grouping", e),
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
        return ke.sum;
      if (Object.prototype.toString.call(t) === "[object Date]")
        return ke.extent;
    }, e.getAggregationFn = () => {
      var n, t;
      if (!e)
        throw new Error();
      return Le(e.columnDef.aggregationFn) ? e.columnDef.aggregationFn : e.columnDef.aggregationFn === "auto" ? e.getAutoAggregationFn() : (n = (t = r.options.aggregationFns) == null ? void 0 : t[e.columnDef.aggregationFn]) != null ? n : ke[e.columnDef.aggregationFn];
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
function Kt(e, r, n) {
  if (!(r != null && r.length) || !n)
    return e;
  const t = e.filter((o) => !r.includes(o.id));
  return n === "remove" ? t : [...r.map((o) => e.find((l) => l.id === o)).filter(Boolean), ...t];
}
const Qt = {
  getInitialState: (e) => ({
    columnOrder: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnOrderChange: B("columnOrder", e)
  }),
  createColumn: (e, r) => {
    e.getIndex = w((n) => [$e(r, n)], (n) => n.findIndex((t) => t.id === e.id), C(r.options, "debugColumns", "getIndex")), e.getIsFirstColumn = (n) => {
      var t;
      return ((t = $e(r, n)[0]) == null ? void 0 : t.id) === e.id;
    }, e.getIsLastColumn = (n) => {
      var t;
      const i = $e(r, n);
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
      return Kt(o, n, t);
    }, C(e.options, "debugTable", "_getOrderColumnsFn"));
  }
}, Ne = () => ({
  left: [],
  right: []
}), Zt = {
  getInitialState: (e) => ({
    columnPinning: Ne(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnPinningChange: B("columnPinning", e)
  }),
  createColumn: (e, r) => {
    e.pin = (n) => {
      const t = e.getLeafColumns().map((i) => i.id).filter(Boolean);
      r.setColumnPinning((i) => {
        var o, l;
        if (n === "right") {
          var s, a;
          return {
            left: ((s = i?.left) != null ? s : []).filter((p) => !(t != null && t.includes(p))),
            right: [...((a = i?.right) != null ? a : []).filter((p) => !(t != null && t.includes(p))), ...t]
          };
        }
        if (n === "left") {
          var u, d;
          return {
            left: [...((u = i?.left) != null ? u : []).filter((p) => !(t != null && t.includes(p))), ...t],
            right: ((d = i?.right) != null ? d : []).filter((p) => !(t != null && t.includes(p)))
          };
        }
        return {
          left: ((o = i?.left) != null ? o : []).filter((p) => !(t != null && t.includes(p))),
          right: ((l = i?.right) != null ? l : []).filter((p) => !(t != null && t.includes(p)))
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
      return e.setColumnPinning(r ? Ne() : (n = (t = e.initialState) == null ? void 0 : t.columnPinning) != null ? n : Ne());
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
function Jt(e) {
  return e || (typeof document < "u" ? document : null);
}
const be = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
}, He = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: !1,
  columnSizingStart: []
}), en = {
  getDefaultColumnDef: () => be,
  getInitialState: (e) => ({
    columnSizing: {},
    columnSizingInfo: He(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnSizingChange: B("columnSizing", e),
    onColumnSizingInfoChange: B("columnSizingInfo", e)
  }),
  createColumn: (e, r) => {
    e.getSize = () => {
      var n, t, i;
      const o = r.getState().columnSizing[e.id];
      return Math.min(Math.max((n = e.columnDef.minSize) != null ? n : be.minSize, (t = o ?? e.columnDef.size) != null ? t : be.size), (i = e.columnDef.maxSize) != null ? i : be.maxSize);
    }, e.getStart = w((n) => [n, $e(r, n), r.getState().columnSizing], (n, t) => t.slice(0, e.getIndex(n)).reduce((i, o) => i + o.getSize(), 0), C(r.options, "debugColumns", "getStart")), e.getAfter = w((n) => [n, $e(r, n), r.getState().columnSizing], (n, t) => t.slice(e.getIndex(n) + 1).reduce((i, o) => i + o.getSize(), 0), C(r.options, "debugColumns", "getAfter")), e.resetSize = () => {
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
        if (!t || !i || (o.persist == null || o.persist(), Ge(o) && o.touches && o.touches.length > 1))
          return;
        const l = e.getSize(), s = e ? e.getLeafHeaders().map((v) => [v.column.id, v.column.getSize()]) : [[t.id, t.getSize()]], a = Ge(o) ? Math.round(o.touches[0].clientX) : o.clientX, u = {}, d = (v, $) => {
          typeof $ == "number" && (r.setColumnSizingInfo((E) => {
            var b, A;
            const x = r.options.columnResizeDirection === "rtl" ? -1 : 1, M = ($ - ((b = E?.startOffset) != null ? b : 0)) * x, I = Math.max(M / ((A = E?.startSize) != null ? A : 0), -0.999999);
            return E.columnSizingStart.forEach((U) => {
              let [J, re] = U;
              u[J] = Math.round(Math.max(re + re * I, 0) * 100) / 100;
            }), {
              ...E,
              deltaOffset: M,
              deltaPercentage: I
            };
          }), (r.options.columnResizeMode === "onChange" || v === "end") && r.setColumnSizing((E) => ({
            ...E,
            ...u
          })));
        }, p = (v) => d("move", v), g = (v) => {
          d("end", v), r.setColumnSizingInfo(($) => ({
            ...$,
            isResizingColumn: !1,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        }, c = Jt(n), f = {
          moveHandler: (v) => p(v.clientX),
          upHandler: (v) => {
            c?.removeEventListener("mousemove", f.moveHandler), c?.removeEventListener("mouseup", f.upHandler), g(v.clientX);
          }
        }, h = {
          moveHandler: (v) => (v.cancelable && (v.preventDefault(), v.stopPropagation()), p(v.touches[0].clientX), !1),
          upHandler: (v) => {
            var $;
            c?.removeEventListener("touchmove", h.moveHandler), c?.removeEventListener("touchend", h.upHandler), v.cancelable && (v.preventDefault(), v.stopPropagation()), g(($ = v.touches[0]) == null ? void 0 : $.clientX);
          }
        }, S = tn() ? {
          passive: !1
        } : !1;
        Ge(o) ? (c?.addEventListener("touchmove", h.moveHandler, S), c?.addEventListener("touchend", h.upHandler, S)) : (c?.addEventListener("mousemove", f.moveHandler, S), c?.addEventListener("mouseup", f.upHandler, S)), r.setColumnSizingInfo((v) => ({
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
      e.setColumnSizingInfo(r ? He() : (n = e.initialState.columnSizingInfo) != null ? n : He());
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
let Oe = null;
function tn() {
  if (typeof Oe == "boolean") return Oe;
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
  return Oe = e, Oe;
}
function Ge(e) {
  return e.type === "touchstart";
}
const nn = {
  getInitialState: (e) => ({
    columnVisibility: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnVisibilityChange: B("columnVisibility", e)
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
function $e(e, r) {
  return r ? r === "center" ? e.getCenterVisibleLeafColumns() : r === "left" ? e.getLeftVisibleLeafColumns() : e.getRightVisibleLeafColumns() : e.getVisibleLeafColumns();
}
const rn = {
  createTable: (e) => {
    e._getGlobalFacetedRowModel = e.options.getFacetedRowModel && e.options.getFacetedRowModel(e, "__global__"), e.getGlobalFacetedRowModel = () => e.options.manualFiltering || !e._getGlobalFacetedRowModel ? e.getPreFilteredRowModel() : e._getGlobalFacetedRowModel(), e._getGlobalFacetedUniqueValues = e.options.getFacetedUniqueValues && e.options.getFacetedUniqueValues(e, "__global__"), e.getGlobalFacetedUniqueValues = () => e._getGlobalFacetedUniqueValues ? e._getGlobalFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getGlobalFacetedMinMaxValues = e.options.getFacetedMinMaxValues && e.options.getFacetedMinMaxValues(e, "__global__"), e.getGlobalFacetedMinMaxValues = () => {
      if (e._getGlobalFacetedMinMaxValues)
        return e._getGlobalFacetedMinMaxValues();
    };
  }
}, on = {
  getInitialState: (e) => ({
    globalFilter: void 0,
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGlobalFilterChange: B("globalFilter", e),
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
    e.getGlobalAutoFilterFn = () => ne.includesString, e.getGlobalFilterFn = () => {
      var r, n;
      const {
        globalFilterFn: t
      } = e.options;
      return Le(t) ? t : t === "auto" ? e.getGlobalAutoFilterFn() : (r = (n = e.options.filterFns) == null ? void 0 : n[t]) != null ? r : ne[t];
    }, e.setGlobalFilter = (r) => {
      e.options.onGlobalFilterChange == null || e.options.onGlobalFilterChange(r);
    }, e.resetGlobalFilter = (r) => {
      e.setGlobalFilter(r ? void 0 : e.initialState.globalFilter);
    };
  }
}, ln = {
  getInitialState: (e) => ({
    expanded: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onExpandedChange: B("expanded", e),
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
}, Xe = 0, Ue = 10, Te = () => ({
  pageIndex: Xe,
  pageSize: Ue
}), sn = {
  getInitialState: (e) => ({
    ...e,
    pagination: {
      ...Te(),
      ...e?.pagination
    }
  }),
  getDefaultOptions: (e) => ({
    onPaginationChange: B("pagination", e)
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
      const i = (o) => ce(t, o);
      return e.options.onPaginationChange == null ? void 0 : e.options.onPaginationChange(i);
    }, e.resetPagination = (t) => {
      var i;
      e.setPagination(t ? Te() : (i = e.initialState.pagination) != null ? i : Te());
    }, e.setPageIndex = (t) => {
      e.setPagination((i) => {
        let o = ce(t, i.pageIndex);
        const l = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
        return o = Math.max(0, Math.min(o, l)), {
          ...i,
          pageIndex: o
        };
      });
    }, e.resetPageIndex = (t) => {
      var i, o;
      e.setPageIndex(t ? Xe : (i = (o = e.initialState) == null || (o = o.pagination) == null ? void 0 : o.pageIndex) != null ? i : Xe);
    }, e.resetPageSize = (t) => {
      var i, o;
      e.setPageSize(t ? Ue : (i = (o = e.initialState) == null || (o = o.pagination) == null ? void 0 : o.pageSize) != null ? i : Ue);
    }, e.setPageSize = (t) => {
      e.setPagination((i) => {
        const o = Math.max(1, ce(t, i.pageSize)), l = i.pageSize * i.pageIndex, s = Math.floor(l / o);
        return {
          ...i,
          pageIndex: s,
          pageSize: o
        };
      });
    }, e.setPageCount = (t) => e.setPagination((i) => {
      var o;
      let l = ce(t, (o = e.options.pageCount) != null ? o : -1);
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
}, We = () => ({
  top: [],
  bottom: []
}), an = {
  getInitialState: (e) => ({
    rowPinning: We(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowPinningChange: B("rowPinning", e)
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
          var p, g;
          return {
            top: ((p = a?.top) != null ? p : []).filter((h) => !(s != null && s.has(h))),
            bottom: [...((g = a?.bottom) != null ? g : []).filter((h) => !(s != null && s.has(h))), ...Array.from(s)]
          };
        }
        if (n === "top") {
          var c, f;
          return {
            top: [...((c = a?.top) != null ? c : []).filter((h) => !(s != null && s.has(h))), ...Array.from(s)],
            bottom: ((f = a?.bottom) != null ? f : []).filter((h) => !(s != null && s.has(h)))
          };
        }
        return {
          top: ((u = a?.top) != null ? u : []).filter((h) => !(s != null && s.has(h))),
          bottom: ((d = a?.bottom) != null ? d : []).filter((h) => !(s != null && s.has(h)))
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
      return e.setRowPinning(r ? We() : (n = (t = e.initialState) == null ? void 0 : t.rowPinning) != null ? n : We());
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
}, un = {
  getInitialState: (e) => ({
    rowSelection: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowSelectionChange: B("rowSelection", e),
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
        Ye(i, o.id, t, !0, e);
      }), i;
    }), e.getPreSelectedRowModel = () => e.getCoreRowModel(), e.getSelectedRowModel = w(() => [e.getState().rowSelection, e.getCoreRowModel()], (r, n) => Object.keys(r).length ? Be(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, C(e.options, "debugTable", "getSelectedRowModel")), e.getFilteredSelectedRowModel = w(() => [e.getState().rowSelection, e.getFilteredRowModel()], (r, n) => Object.keys(r).length ? Be(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, C(e.options, "debugTable", "getFilteredSelectedRowModel")), e.getGroupedSelectedRowModel = w(() => [e.getState().rowSelection, e.getSortedRowModel()], (r, n) => Object.keys(r).length ? Be(e, n) : {
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
        return Ye(s, e.id, n, (l = t?.selectChildren) != null ? l : !0, r), s;
      });
    }, e.getIsSelected = () => {
      const {
        rowSelection: n
      } = r.getState();
      return tt(e, n);
    }, e.getIsSomeSelected = () => {
      const {
        rowSelection: n
      } = r.getState();
      return Ke(e, n) === "some";
    }, e.getIsAllSubRowsSelected = () => {
      const {
        rowSelection: n
      } = r.getState();
      return Ke(e, n) === "all";
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
}, Ye = (e, r, n, t, i) => {
  var o;
  const l = i.getRow(r, !0);
  n ? (l.getCanMultiSelect() || Object.keys(e).forEach((s) => delete e[s]), l.getCanSelect() && (e[r] = !0)) : delete e[r], t && (o = l.subRows) != null && o.length && l.getCanSelectSubRows() && l.subRows.forEach((s) => Ye(e, s.id, n, t, i));
};
function Be(e, r) {
  const n = e.getState().rowSelection, t = [], i = {}, o = function(l, s) {
    return l.map((a) => {
      var u;
      const d = tt(a, n);
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
function tt(e, r) {
  var n;
  return (n = r[e.id]) != null ? n : !1;
}
function Ke(e, r, n) {
  var t;
  if (!((t = e.subRows) != null && t.length)) return !1;
  let i = !0, o = !1;
  return e.subRows.forEach((l) => {
    if (!(o && !i) && (l.getCanSelect() && (tt(l, r) ? o = !0 : i = !1), l.subRows && l.subRows.length)) {
      const s = Ke(l, r);
      s === "all" ? o = !0 : (s === "some" && (o = !0), i = !1);
    }
  }), i ? "all" : o ? "some" : !1;
}
const Qe = /([0-9]+)/gm, cn = (e, r, n) => wt(de(e.getValue(n)).toLowerCase(), de(r.getValue(n)).toLowerCase()), dn = (e, r, n) => wt(de(e.getValue(n)), de(r.getValue(n))), gn = (e, r, n) => nt(de(e.getValue(n)).toLowerCase(), de(r.getValue(n)).toLowerCase()), fn = (e, r, n) => nt(de(e.getValue(n)), de(r.getValue(n))), pn = (e, r, n) => {
  const t = e.getValue(n), i = r.getValue(n);
  return t > i ? 1 : t < i ? -1 : 0;
}, hn = (e, r, n) => nt(e.getValue(n), r.getValue(n));
function nt(e, r) {
  return e === r ? 0 : e > r ? 1 : -1;
}
function de(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function wt(e, r) {
  const n = e.split(Qe).filter(Boolean), t = r.split(Qe).filter(Boolean);
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
const xe = {
  alphanumeric: cn,
  alphanumericCaseSensitive: dn,
  text: gn,
  textCaseSensitive: fn,
  datetime: pn,
  basic: hn
}, mn = {
  getInitialState: (e) => ({
    sorting: [],
    ...e
  }),
  getDefaultColumnDef: () => ({
    sortingFn: "auto",
    sortUndefined: 1
  }),
  getDefaultOptions: (e) => ({
    onSortingChange: B("sorting", e),
    isMultiSortEvent: (r) => r.shiftKey
  }),
  createColumn: (e, r) => {
    e.getAutoSortingFn = () => {
      const n = r.getFilteredRowModel().flatRows.slice(10);
      let t = !1;
      for (const i of n) {
        const o = i?.getValue(e.id);
        if (Object.prototype.toString.call(o) === "[object Date]")
          return xe.datetime;
        if (typeof o == "string" && (t = !0, o.split(Qe).length > 1))
          return xe.alphanumeric;
      }
      return t ? xe.text : xe.basic;
    }, e.getAutoSortDir = () => {
      const n = r.getFilteredRowModel().flatRows[0];
      return typeof n?.getValue(e.id) == "string" ? "asc" : "desc";
    }, e.getSortingFn = () => {
      var n, t;
      if (!e)
        throw new Error();
      return Le(e.columnDef.sortingFn) ? e.columnDef.sortingFn : e.columnDef.sortingFn === "auto" ? e.getAutoSortingFn() : (n = (t = r.options.sortingFns) == null ? void 0 : t[e.columnDef.sortingFn]) != null ? n : xe[e.columnDef.sortingFn];
    }, e.toggleSorting = (n, t) => {
      const i = e.getNextSortingOrder(), o = typeof n < "u" && n !== null;
      r.setSorting((l) => {
        const s = l?.find((c) => c.id === e.id), a = l?.findIndex((c) => c.id === e.id);
        let u = [], d, p = o ? n : i === "desc";
        if (l != null && l.length && e.getCanMultiSort() && t ? s ? d = "toggle" : d = "add" : l != null && l.length && a !== l.length - 1 ? d = "replace" : s ? d = "toggle" : d = "replace", d === "toggle" && (o || i || (d = "remove")), d === "add") {
          var g;
          u = [...l, {
            id: e.id,
            desc: p
          }], u.splice(0, u.length - ((g = r.options.maxMultiSortColCount) != null ? g : Number.MAX_SAFE_INTEGER));
        } else d === "toggle" ? u = l.map((c) => c.id === e.id ? {
          ...c,
          desc: p
        } : c) : d === "remove" ? u = l.filter((c) => c.id !== e.id) : u = [{
          id: e.id,
          desc: p
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
}, vn = [
  Lt,
  nn,
  Qt,
  Zt,
  kt,
  Nt,
  rn,
  //depends on ColumnFaceting
  on,
  //depends on ColumnFiltering
  mn,
  Yt,
  //depends on RowSorting
  ln,
  sn,
  an,
  un,
  en
];
function Sn(e) {
  var r, n;
  process.env.NODE_ENV !== "production" && (e.debugAll || e.debugTable) && console.info("Creating Table Instance...");
  const t = [...vn, ...(r = e._features) != null ? r : []];
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
  const p = {
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
      const c = ce(g, i.options);
      i.options = l(c);
    },
    getState: () => i.options.state,
    setState: (g) => {
      i.options.onStateChange == null || i.options.onStateChange(g);
    },
    _getRowId: (g, c, f) => {
      var h;
      return (h = i.options.getRowId == null ? void 0 : i.options.getRowId(g, c, f)) != null ? h : `${f ? [f.id, c].join(".") : c}`;
    },
    getCoreRowModel: () => (i._getCoreRowModel || (i._getCoreRowModel = i.options.getCoreRowModel(i)), i._getCoreRowModel()),
    // The final calls start at the bottom of the model,
    // expanded rows, which then work their way up
    getRowModel: () => i.getPaginationRowModel(),
    //in next version, we should just pass in the row model as the optional 2nd arg
    getRow: (g, c) => {
      let f = (c ? i.getPrePaginationRowModel() : i.getRowModel()).rowsById[g];
      if (!f && (f = i.getCoreRowModel().rowsById[g], !f))
        throw process.env.NODE_ENV !== "production" ? new Error(`getRow could not find row with ID: ${g}`) : new Error();
      return f;
    },
    _getDefaultColumnDef: w(() => [i.options.defaultColumn], (g) => {
      var c;
      return g = (c = g) != null ? c : {}, {
        header: (f) => {
          const h = f.header.column.columnDef;
          return h.accessorKey ? h.accessorKey : h.accessorFn ? h.id : null;
        },
        // footer: props => props.header.column.id,
        cell: (f) => {
          var h, S;
          return (h = (S = f.renderValue()) == null || S.toString == null ? void 0 : S.toString()) != null ? h : null;
        },
        ...i._features.reduce((f, h) => Object.assign(f, h.getDefaultColumnDef == null ? void 0 : h.getDefaultColumnDef()), {}),
        ...g
      };
    }, C(e, "debugColumns", "_getDefaultColumnDef")),
    _getColumnDefs: () => i.options.columns,
    getAllColumns: w(() => [i._getColumnDefs()], (g) => {
      const c = function(f, h, S) {
        return S === void 0 && (S = 0), f.map((v) => {
          const $ = zt(i, v, S, h), E = v;
          return $.columns = E.columns ? c(E.columns, $, S + 1) : [], $;
        });
      };
      return c(g);
    }, C(e, "debugColumns", "getAllColumns")),
    getAllFlatColumns: w(() => [i.getAllColumns()], (g) => g.flatMap((c) => c.getFlatColumns()), C(e, "debugColumns", "getAllFlatColumns")),
    _getAllFlatColumnsById: w(() => [i.getAllFlatColumns()], (g) => g.reduce((c, f) => (c[f.id] = f, c), {}), C(e, "debugColumns", "getAllFlatColumnsById")),
    getAllLeafColumns: w(() => [i.getAllColumns(), i._getOrderColumnsFn()], (g, c) => {
      let f = g.flatMap((h) => h.getLeafColumns());
      return c(f);
    }, C(e, "debugColumns", "getAllLeafColumns")),
    getColumn: (g) => {
      const c = i._getAllFlatColumnsById()[g];
      return process.env.NODE_ENV !== "production" && !c && console.error(`[Table] Column with id '${g}' does not exist.`), c;
    }
  };
  Object.assign(i, p);
  for (let g = 0; g < i._features.length; g++) {
    const c = i._features[g];
    c == null || c.createTable == null || c.createTable(i);
  }
  return i;
}
function wn() {
  return (e) => w(() => [e.options.data], (r) => {
    const n = {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, t = function(i, o, l) {
      o === void 0 && (o = 0);
      const s = [];
      for (let u = 0; u < i.length; u++) {
        const d = Dt(e, e._getRowId(i[u], u, l), i[u], u, o, void 0, l?.id);
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
function Cn(e, r) {
  return e ? Rn(e) ? /* @__PURE__ */ z.createElement(e, r) : e : null;
}
function Rn(e) {
  return yn(e) || typeof e == "function" || xn(e);
}
function yn(e) {
  return typeof e == "function" && (() => {
    const r = Object.getPrototypeOf(e);
    return r.prototype && r.prototype.isReactComponent;
  })();
}
function xn(e) {
  return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
function _n(e) {
  const r = {
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    ...e
  }, [n] = z.useState(() => ({
    current: Sn(r)
  })), [t, i] = z.useState(() => n.current.initialState);
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
function En({
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
  disableSelectRow: p,
  expandable: g,
  expandedRows: c,
  setExpandedRows: f,
  stripedRows: h = !1,
  hoverableRow: S = !1,
  loading: v,
  loadingCustom: $,
  noResultMessage: E,
  onRowClick: b,
  totalItems: A
}) {
  const x = fe(
    () => l ?? s,
    [l, s]
  ), M = D(null), I = D(null), [U, J] = X(null), [re, ie] = X(0), ge = (y, P) => {
    o && (P.preventDefault(), M.current = P.clientY, I.current = y, J(y), ie(0), P.currentTarget.setPointerCapture(P.pointerId));
  }, oe = (y) => {
    if (!o || M.current === null || I.current === null) return;
    const P = y.clientY - M.current;
    ie(P);
    const k = 32, R = P > k ? 1 : P < -k ? -1 : 0;
    if (R === 0) return;
    const O = I.current, L = O + R;
    L < 0 || L >= e.getRowModel().rows.length || (x((Y) => {
      const q = [...Y], [le] = q.splice(O, 1);
      return q.splice(L, 0, le), q;
    }), I.current = L, M.current = y.clientY, ie(0), J(L));
  }, Ce = () => {
    M.current = null, I.current = null, J(null), ie(0);
  }, [V, F] = X(null), [H, j] = X(""), Re = (y) => {
    F({
      rowId: y.row.id,
      colId: y.column.id
    }), j(String(y.getValue() ?? ""));
  }, Q = (y) => {
    s(
      (P) => P.map(
        (k, R) => R === y.row.index ? {
          ...k,
          [y.column.id]: H
        } : k
      )
    ), F(null);
  }, ee = (y) => !!(y.closest("button") || y.closest("a") || y.closest("input") || y.closest("select") || y.closest("textarea") || y.closest("[data-stop-row-click]")), pe = (y, P) => {
    const k = y.target;
    if (!ee(k) && !k.closest(".col-drag-handle")) {
      if (g?.clickRow) {
        const R = P.original.id ?? P.index;
        f((O) => {
          const L = new Set(O);
          return L.has(R) ? L.delete(R) : L.add(R), L;
        });
      }
      b && b(P.original);
    }
  };
  return /* @__PURE__ */ G("table", { className: `table table-body ${S ? "hoverable" : ""} ${h ? "striped" : ""}`, children: [
    /* @__PURE__ */ m(
      ze,
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
          children: $
        }
      ) }),
      v === "placeholder" && (() => {
        const y = e.getAllColumns().length, P = e.getState().pagination?.pageSize || 10;
        return Array.from({ length: P }).map((k, R) => /* @__PURE__ */ m("tr", { className: "table-placeholder-row", children: Array.from({ length: y }).map((O, L) => /* @__PURE__ */ m("td", { children: /* @__PURE__ */ m("div", { className: "table-placeholder-cell" }) }, `placeholder-cell-${R}-${L}`)) }, `placeholder-row-${R}`));
      })(),
      !v && e.getRowModel().rows.length === 0 && A === 0 && /* @__PURE__ */ m("tr", { className: "table-no-results-row", children: /* @__PURE__ */ m(
        "td",
        {
          colSpan: e.getAllColumns().length,
          style: { textAlign: "center", padding: "20px" },
          children: E
        }
      ) }),
      !v && e.getRowModel().rows.length > 0 && e.getRowModel().rows.map((y) => {
        const P = y.index, k = U === P, R = [];
        return R.push(
          /* @__PURE__ */ m(
            "tr",
            {
              className: `${k ? "row-dragging" : ""}`,
              style: k ? {
                transform: `translateY(${re}px)`,
                position: "relative",
                zIndex: 50
              } : void 0,
              onPointerMove: oe,
              onPointerUp: Ce,
              onClick: (O) => pe(O, {
                original: y.original,
                index: y.index
              }),
              children: y.getVisibleCells().map((O) => {
                const L = O.column.id, Y = n.get(L), q = Ve(O.column, t), le = V?.rowId === y.id && V?.colId === L, he = [
                  Y ? "is-sticky" : "",
                  Y?.side === "left" ? "is-sticky-left" : "",
                  Y?.side === "right" ? "is-sticky-right" : ""
                ].filter(Boolean).join(" "), me = Y ? Y.side === "left" ? { "--sticky-left": `${Y.offset}px` } : { "--sticky-right": `${Y.offset}px` } : void 0;
                if (O.column.id === "__draggable__" && o)
                  return /* @__PURE__ */ m(
                    "td",
                    {
                      className: `${he} align-center col-drag-handle`,
                      style: me,
                      onPointerDown: (_) => ge(P, _),
                      children: "☰"
                    },
                    O.id
                  );
                if (O.column.id === "__selectable__" && a) {
                  const _ = O.row.original.id ?? O.row.index, ve = p.includes(_), ye = u.has(_);
                  return /* @__PURE__ */ m(
                    "td",
                    {
                      className: `${he} align-center`,
                      style: me,
                      children: /* @__PURE__ */ m(
                        "input",
                        {
                          type: "checkbox",
                          checked: ye,
                          disabled: ve,
                          onChange: () => {
                            d((De) => {
                              const te = new Set(De);
                              return te.has(_) ? te.delete(_) : te.add(_), te;
                            });
                          }
                        }
                      )
                    },
                    O.id
                  );
                }
                if (O.column.id === "__expandable__" && g) {
                  const _ = O.row.original.id ?? O.row.index, ve = c.has(_);
                  return /* @__PURE__ */ m(
                    "td",
                    {
                      className: `${he} align-center`,
                      style: me,
                      onClick: (ye) => {
                        ye.stopPropagation(), f((De) => {
                          const te = new Set(De);
                          return te.has(_) ? te.delete(_) : te.add(_), te;
                        });
                      },
                      children: /* @__PURE__ */ m(
                        "span",
                        {
                          className: `expand-icon ${ve ? "expanded" : ""}`,
                          style: {
                            display: "inline-block",
                            transition: "transform 0.2s",
                            transform: ve ? "rotate(90deg)" : "rotate(0deg)",
                            cursor: "pointer",
                            fontSize: "12px"
                          },
                          children: /* @__PURE__ */ m("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ m("path", { d: "M4.5 9L7.5 6L4.5 3", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
                        }
                      )
                    },
                    O.id
                  );
                }
                return /* @__PURE__ */ m(
                  "td",
                  {
                    className: `${he} align-${q}`,
                    style: me,
                    onDoubleClick: () => {
                      i && Re(O);
                    },
                    children: le ? /* @__PURE__ */ m(
                      "input",
                      {
                        autoFocus: !0,
                        value: H,
                        onChange: (_) => j(_.target.value),
                        onBlur: () => Q(O),
                        onKeyDown: (_) => {
                          _.key === "Enter" && Q(O), _.key === "Escape" && F(null);
                        },
                        onFocus: (_) => _.currentTarget.select(),
                        style: {
                          width: "100%",
                          height: "100%",
                          boxSizing: "border-box",
                          fontSize: "inherit",
                          fontFamily: "inherit"
                        }
                      }
                    ) : Cn(
                      O.column.columnDef.cell,
                      O.getContext()
                    )
                  },
                  O.id
                );
              })
            },
            y.id
          )
        ), g && g.content && c.has(y.original.id ?? y.index) && R.push(
          /* @__PURE__ */ m("tr", { className: "expanded-row", children: /* @__PURE__ */ m("td", { colSpan: e.getAllColumns().length, className: "expanded-content", children: g.content(y.original) }) }, `${y.id}-expanded`)
        ), R;
      }).flat()
    ] })
  ] });
}
function $n({
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
      ze,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ m("tfoot", { children: /* @__PURE__ */ m("tr", { children: e.getAllLeafColumns().map((s) => {
      const a = s.columnDef.meta?.internalFooter, u = n.get(s.id), d = Ve(s, t), p = [
        u ? "is-sticky" : "",
        u?.side === "left" ? "is-sticky-left" : "",
        u?.side === "right" ? "is-sticky-right" : ""
      ].filter(Boolean).join(" "), g = u ? u.side === "left" ? { "--sticky-left": `${u.offset}px` } : { "--sticky-right": `${u.offset}px` } : void 0;
      return /* @__PURE__ */ m(
        "td",
        {
          className: `${p} align-${d}`,
          style: g,
          children: typeof a == "function" ? a() : a ?? null
        },
        s.id
      );
    }) }) })
  ] }) }) : null;
}
function Fn({ children: e }) {
  return /* @__PURE__ */ m("table", { className: "table table-external-footer", children: /* @__PURE__ */ m("tfoot", { children: /* @__PURE__ */ m("tr", { children: /* @__PURE__ */ m("td", { children: e }) }) }) });
}
function Mn(e, r, n = 2) {
  if (r <= 1) return [1];
  const t = [], i = [], o = Math.max(2, e - n), l = Math.min(r - 1, e + n);
  for (let s = o; s <= l; s++)
    i.push(s);
  return t.push(1), o > 2 && t.push("ellipsis"), t.push(...i), l < r - 1 && t.push("ellipsis"), t.push(r), t;
}
function bn({
  currentPage: e,
  totalItems: r,
  pageSize: n,
  pageSizeOptions: t = [10, 25, 50, 100, 200],
  onPageChange: i
}) {
  const o = Math.max(1, Math.ceil(r / n)), l = r === 0 ? 0 : (e - 1) * n + 1, s = Math.min(e * n, r), a = fe(
    () => Mn(e, o),
    [e, o]
  ), u = fe(() => {
    const d = new Set(t);
    return d.add(n), Array.from(d).sort((p, g) => p - g);
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
        (d, p) => d === "ellipsis" ? /* @__PURE__ */ m(
          "span",
          {
            className: "pagination-btn ellipsis",
            children: "..."
          },
          `e-${p}`
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
function Pe(e) {
  var r = typeof e;
  return e != null && (r == "object" || r == "function");
}
var On = typeof global == "object" && global && global.Object === Object && global, In = typeof self == "object" && self && self.Object === Object && self, Ct = On || In || Function("return this")(), je = function() {
  return Ct.Date.now();
}, Pn = /\s/;
function An(e) {
  for (var r = e.length; r-- && Pn.test(e.charAt(r)); )
    ;
  return r;
}
var Vn = /^\s+/;
function zn(e) {
  return e && e.slice(0, An(e) + 1).replace(Vn, "");
}
var Ae = Ct.Symbol, Rt = Object.prototype, Ln = Rt.hasOwnProperty, Dn = Rt.toString, _e = Ae ? Ae.toStringTag : void 0;
function kn(e) {
  var r = Ln.call(e, _e), n = e[_e];
  try {
    e[_e] = void 0;
    var t = !0;
  } catch {
  }
  var i = Dn.call(e);
  return t && (r ? e[_e] = n : delete e[_e]), i;
}
var Nn = Object.prototype, Hn = Nn.toString;
function Gn(e) {
  return Hn.call(e);
}
var Tn = "[object Null]", Wn = "[object Undefined]", lt = Ae ? Ae.toStringTag : void 0;
function Bn(e) {
  return e == null ? e === void 0 ? Wn : Tn : lt && lt in Object(e) ? kn(e) : Gn(e);
}
function jn(e) {
  return e != null && typeof e == "object";
}
var qn = "[object Symbol]";
function Xn(e) {
  return typeof e == "symbol" || jn(e) && Bn(e) == qn;
}
var st = NaN, Un = /^[-+]0x[0-9a-f]+$/i, Yn = /^0b[01]+$/i, Kn = /^0o[0-7]+$/i, Qn = parseInt;
function at(e) {
  if (typeof e == "number")
    return e;
  if (Xn(e))
    return st;
  if (Pe(e)) {
    var r = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Pe(r) ? r + "" : r;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = zn(e);
  var n = Yn.test(e);
  return n || Kn.test(e) ? Qn(e.slice(2), n ? 2 : 8) : Un.test(e) ? st : +e;
}
var Zn = "Expected a function", Jn = Math.max, er = Math.min;
function Ie(e, r, n) {
  var t, i, o, l, s, a, u = 0, d = !1, p = !1, g = !0;
  if (typeof e != "function")
    throw new TypeError(Zn);
  r = at(r) || 0, Pe(n) && (d = !!n.leading, p = "maxWait" in n, o = p ? Jn(at(n.maxWait) || 0, r) : o, g = "trailing" in n ? !!n.trailing : g);
  function c(x) {
    var M = t, I = i;
    return t = i = void 0, u = x, l = e.apply(I, M), l;
  }
  function f(x) {
    return u = x, s = setTimeout(v, r), d ? c(x) : l;
  }
  function h(x) {
    var M = x - a, I = x - u, U = r - M;
    return p ? er(U, o - I) : U;
  }
  function S(x) {
    var M = x - a, I = x - u;
    return a === void 0 || M >= r || M < 0 || p && I >= o;
  }
  function v() {
    var x = je();
    if (S(x))
      return $(x);
    s = setTimeout(v, h(x));
  }
  function $(x) {
    return s = void 0, g && t ? c(x) : (t = i = void 0, l);
  }
  function E() {
    s !== void 0 && clearTimeout(s), u = 0, t = a = i = s = void 0;
  }
  function b() {
    return s === void 0 ? l : $(je());
  }
  function A() {
    var x = je(), M = S(x);
    if (t = arguments, i = this, a = x, M) {
      if (s === void 0)
        return f(a);
      if (p)
        return clearTimeout(s), s = setTimeout(v, r), c(a);
    }
    return s === void 0 && (s = setTimeout(v, r)), l;
  }
  return A.cancel = E, A.flush = b, A;
}
var tr = "Expected a function";
function nr(e, r, n) {
  var t = !0, i = !0;
  if (typeof e != "function")
    throw new TypeError(tr);
  return Pe(n) && (t = "leading" in n ? !!n.leading : t, i = "trailing" in n ? !!n.trailing : i), Ie(e, r, {
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
function yt(e) {
  return !e || !e.ownerDocument || !e.ownerDocument.defaultView ? window : e.ownerDocument.defaultView;
}
function xt(e) {
  return !e || !e.ownerDocument ? document : e.ownerDocument;
}
var _t = function(e) {
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
function Et(e, r) {
  var n;
  e && (n = e.classList).add.apply(n, r.split(" "));
}
function $t(e, r) {
  e && r.split(" ").forEach(function(n) {
    e.classList.remove(n);
  });
}
function Ft(e) {
  return ".".concat(e.split(" ").join("."));
}
var rt = !!(typeof window < "u" && window.document && window.document.createElement), rr = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  addClasses: Et,
  canUseDOM: rt,
  classNamesToQuery: Ft,
  getElementDocument: xt,
  getElementWindow: yt,
  getOptions: _t,
  removeClasses: $t
}), Se = null, ut = null;
rt && window.addEventListener("resize", function() {
  ut !== window.devicePixelRatio && (ut = window.devicePixelRatio, Se = null);
});
function ct() {
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
var se = yt, qe = xt, ir = _t, ae = Et, ue = $t, T = Ft, Ee = (
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
        var i = se(t.el);
        t.scrollXTicking || (i.requestAnimationFrame(t.scrollX), t.scrollXTicking = !0), t.scrollYTicking || (i.requestAnimationFrame(t.scrollY), t.scrollYTicking = !0), t.isScrolling || (t.isScrolling = !0, ae(t.el, t.classNames.scrolling)), t.showScrollbar("x"), t.showScrollbar("y"), t.onStopScrolling();
      }, this.scrollX = function() {
        t.axis.x.isOverflowing && t.positionScrollbar("x"), t.scrollXTicking = !1;
      }, this.scrollY = function() {
        t.axis.y.isOverflowing && t.positionScrollbar("y"), t.scrollYTicking = !1;
      }, this._onStopScrolling = function() {
        ue(t.el, t.classNames.scrolling), t.options.autoHide && (t.hideScrollbar("x"), t.hideScrollbar("y")), t.isScrolling = !1;
      }, this.onMouseEnter = function() {
        t.isMouseEntering || (ae(t.el, t.classNames.mouseEntered), t.showScrollbar("x"), t.showScrollbar("y"), t.isMouseEntering = !0), t.onMouseEntered();
      }, this._onMouseEntered = function() {
        ue(t.el, t.classNames.mouseEntered), t.options.autoHide && (t.hideScrollbar("x"), t.hideScrollbar("y")), t.isMouseEntering = !1;
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
        var o, l, s, a, u, d, p, g, c, f, h;
        if (!(!t.draggedAxis || !t.contentWrapperEl)) {
          var S, v = t.axis[t.draggedAxis].track, $ = (l = (o = v.rect) === null || o === void 0 ? void 0 : o[t.axis[t.draggedAxis].sizeAttr]) !== null && l !== void 0 ? l : 0, E = t.axis[t.draggedAxis].scrollbar, b = (a = (s = t.contentWrapperEl) === null || s === void 0 ? void 0 : s[t.axis[t.draggedAxis].scrollSizeAttr]) !== null && a !== void 0 ? a : 0, A = parseInt((d = (u = t.elStyles) === null || u === void 0 ? void 0 : u[t.axis[t.draggedAxis].sizeAttr]) !== null && d !== void 0 ? d : "0px", 10);
          i.preventDefault(), i.stopPropagation(), t.draggedAxis === "y" ? S = i.pageY : S = i.pageX;
          var x = S - ((g = (p = v.rect) === null || p === void 0 ? void 0 : p[t.axis[t.draggedAxis].offsetAttr]) !== null && g !== void 0 ? g : 0) - t.axis[t.draggedAxis].dragOffset;
          x = t.draggedAxis === "x" && t.isRtl ? ((f = (c = v.rect) === null || c === void 0 ? void 0 : c[t.axis[t.draggedAxis].sizeAttr]) !== null && f !== void 0 ? f : 0) - E.size - x : x;
          var M = x / ($ - E.size), I = M * (b - A);
          t.draggedAxis === "x" && t.isRtl && (I = !((h = e.getRtlHelpers()) === null || h === void 0) && h.isScrollingToNegative ? -I : I), t.contentWrapperEl[t.axis[t.draggedAxis].scrollOffsetAttr] = I;
        }
      }, this.onEndDrag = function(i) {
        t.isDragging = !1;
        var o = qe(t.el), l = se(t.el);
        i.preventDefault(), i.stopPropagation(), ue(t.el, t.classNames.dragging), t.onStopScrolling(), o.removeEventListener("mousemove", t.drag, !0), o.removeEventListener("mouseup", t.onEndDrag, !0), t.removePreventClickId = l.setTimeout(function() {
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
      this.onMouseMove = nr(this._onMouseMove, 64), this.onWindowResize = Ie(this._onWindowResize, 64, { leading: !0 }), this.onStopScrolling = Ie(this._onStopScrolling, this.stopScrollDelay), this.onMouseEntered = Ie(this._onMouseEntered, this.stopScrollDelay), this.init();
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
        return this.contentWrapperEl && getComputedStyle(this.contentWrapperEl, "::-webkit-scrollbar").display === "none" || "scrollbarWidth" in document.documentElement.style || "-ms-overflow-style" in document.documentElement.style ? 0 : ct();
      } catch {
        return ct();
      }
    }, e.getOffset = function(r) {
      var n = r.getBoundingClientRect(), t = qe(r), i = se(r);
      return {
        top: n.top + (i.pageYOffset || t.documentElement.scrollTop),
        left: n.left + (i.pageXOffset || t.documentElement.scrollLeft)
      };
    }, e.prototype.init = function() {
      rt && (this.initDOM(), this.rtlHelpers = e.getRtlHelpers(), this.scrollbarWidth = this.getScrollbarWidth(), this.recalculate(), this.initListeners());
    }, e.prototype.initDOM = function() {
      var r, n;
      this.wrapperEl = this.el.querySelector(T(this.classNames.wrapper)), this.contentWrapperEl = this.options.scrollableNode || this.el.querySelector(T(this.classNames.contentWrapper)), this.contentEl = this.options.contentNode || this.el.querySelector(T(this.classNames.contentEl)), this.offsetEl = this.el.querySelector(T(this.classNames.offset)), this.maskEl = this.el.querySelector(T(this.classNames.mask)), this.placeholderEl = this.findChild(this.wrapperEl, T(this.classNames.placeholder)), this.heightAutoObserverWrapperEl = this.el.querySelector(T(this.classNames.heightAutoObserverWrapperEl)), this.heightAutoObserverEl = this.el.querySelector(T(this.classNames.heightAutoObserverEl)), this.axis.x.track.el = this.findChild(this.el, "".concat(T(this.classNames.track)).concat(T(this.classNames.horizontal))), this.axis.y.track.el = this.findChild(this.el, "".concat(T(this.classNames.track)).concat(T(this.classNames.vertical))), this.axis.x.scrollbar.el = ((r = this.axis.x.track.el) === null || r === void 0 ? void 0 : r.querySelector(T(this.classNames.scrollbar))) || null, this.axis.y.scrollbar.el = ((n = this.axis.y.track.el) === null || n === void 0 ? void 0 : n.querySelector(T(this.classNames.scrollbar))) || null, this.options.autoHide || (ae(this.axis.x.scrollbar.el, this.classNames.visible), ae(this.axis.y.scrollbar.el, this.classNames.visible));
    }, e.prototype.initListeners = function() {
      var r = this, n, t = se(this.el);
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
        var r = se(this.el);
        this.elStyles = r.getComputedStyle(this.el), this.isRtl = this.elStyles.direction === "rtl";
        var n = this.contentEl.offsetWidth, t = this.heightAutoObserverEl.offsetHeight <= 1, i = this.heightAutoObserverEl.offsetWidth <= 1 || n > 0, o = this.contentWrapperEl.offsetWidth, l = this.elStyles.overflowX, s = this.elStyles.overflowY;
        this.contentEl.style.padding = "".concat(this.elStyles.paddingTop, " ").concat(this.elStyles.paddingRight, " ").concat(this.elStyles.paddingBottom, " ").concat(this.elStyles.paddingLeft), this.wrapperEl.style.margin = "-".concat(this.elStyles.paddingTop, " -").concat(this.elStyles.paddingRight, " -").concat(this.elStyles.paddingBottom, " -").concat(this.elStyles.paddingLeft);
        var a = this.contentEl.scrollHeight, u = this.contentEl.scrollWidth;
        this.contentWrapperEl.style.height = t ? "auto" : "100%", this.placeholderEl.style.width = i ? "".concat(n || u, "px") : "auto", this.placeholderEl.style.height = "".concat(a, "px");
        var d = this.contentWrapperEl.offsetHeight;
        this.axis.x.isOverflowing = n !== 0 && u > n, this.axis.y.isOverflowing = a > d, this.axis.x.isOverflowing = l === "hidden" ? !1 : this.axis.x.isOverflowing, this.axis.y.isOverflowing = s === "hidden" ? !1 : this.axis.y.isOverflowing, this.axis.x.forceVisible = this.options.forceVisible === "x" || this.options.forceVisible === !0, this.axis.y.forceVisible = this.options.forceVisible === "y" || this.options.forceVisible === !0, this.hideNativeScrollbar();
        var p = this.axis.x.isOverflowing ? this.scrollbarWidth : 0, g = this.axis.y.isOverflowing ? this.scrollbarWidth : 0;
        this.axis.x.isOverflowing = this.axis.x.isOverflowing && u > o - g, this.axis.y.isOverflowing = this.axis.y.isOverflowing && a > d - p, this.axis.x.scrollbar.size = this.getScrollbarSize("x"), this.axis.y.scrollbar.size = this.getScrollbarSize("y"), this.axis.x.scrollbar.el && (this.axis.x.scrollbar.el.style.width = "".concat(this.axis.x.scrollbar.size, "px")), this.axis.y.scrollbar.el && (this.axis.y.scrollbar.el.style.height = "".concat(this.axis.y.scrollbar.size, "px")), this.positionScrollbar("x"), this.positionScrollbar("y"), this.toggleTrackVisibility("x"), this.toggleTrackVisibility("y");
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
        var d = u / (l - a), p = ~~((s - o.size) * d);
        p = r === "x" && this.isRtl ? -p + (s - o.size) : p, o.el.style.transform = r === "x" ? "translate3d(".concat(p, "px, 0, 0)") : "translate3d(0, ".concat(p, "px, 0)");
      }
    }, e.prototype.toggleTrackVisibility = function(r) {
      r === void 0 && (r = "y");
      var n = this.axis[r].track.el, t = this.axis[r].scrollbar.el;
      !n || !t || !this.contentWrapperEl || (this.axis[r].isOverflowing || this.axis[r].forceVisible ? (n.style.visibility = "visible", this.contentWrapperEl.style[this.axis[r].overflowAttr] = "scroll", this.el.classList.add("".concat(this.classNames.scrollable, "-").concat(r))) : (n.style.visibility = "hidden", this.contentWrapperEl.style[this.axis[r].overflowAttr] = "hidden", this.el.classList.remove("".concat(this.classNames.scrollable, "-").concat(r))), this.axis[r].isOverflowing ? t.style.display = "block" : t.style.display = "none");
    }, e.prototype.showScrollbar = function(r) {
      r === void 0 && (r = "y"), this.axis[r].isOverflowing && !this.axis[r].scrollbar.isVisible && (ae(this.axis[r].scrollbar.el, this.classNames.visible), this.axis[r].scrollbar.isVisible = !0);
    }, e.prototype.hideScrollbar = function(r) {
      r === void 0 && (r = "y"), !this.isDragging && this.axis[r].isOverflowing && this.axis[r].scrollbar.isVisible && (ue(this.axis[r].scrollbar.el, this.classNames.visible), this.axis[r].scrollbar.isVisible = !1);
    }, e.prototype.hideNativeScrollbar = function() {
      this.offsetEl && (this.offsetEl.style[this.isRtl ? "left" : "right"] = this.axis.y.isOverflowing || this.axis.y.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px", this.offsetEl.style.bottom = this.axis.x.isOverflowing || this.axis.x.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px");
    }, e.prototype.onMouseMoveForAxis = function(r) {
      r === void 0 && (r = "y");
      var n = this.axis[r];
      !n.track.el || !n.scrollbar.el || (n.track.rect = n.track.el.getBoundingClientRect(), n.scrollbar.rect = n.scrollbar.el.getBoundingClientRect(), this.isWithinBounds(n.track.rect) ? (this.showScrollbar(r), ae(n.track.el, this.classNames.hover), this.isWithinBounds(n.scrollbar.rect) ? ae(n.scrollbar.el, this.classNames.hover) : ue(n.scrollbar.el, this.classNames.hover)) : (ue(n.track.el, this.classNames.hover), this.options.autoHide && this.hideScrollbar(r)));
    }, e.prototype.onMouseLeaveForAxis = function(r) {
      r === void 0 && (r = "y"), ue(this.axis[r].track.el, this.classNames.hover), ue(this.axis[r].scrollbar.el, this.classNames.hover), this.options.autoHide && this.hideScrollbar(r);
    }, e.prototype.onDragStart = function(r, n) {
      var t;
      n === void 0 && (n = "y"), this.isDragging = !0;
      var i = qe(this.el), o = se(this.el), l = this.axis[n].scrollbar, s = n === "y" ? r.pageY : r.pageX;
      this.axis[n].dragOffset = s - (((t = l.rect) === null || t === void 0 ? void 0 : t[this.axis[n].offsetAttr]) || 0), this.draggedAxis = n, ae(this.el, this.classNames.dragging), i.addEventListener("mousemove", this.drag, !0), i.addEventListener("mouseup", this.onEndDrag, !0), this.removePreventClickId === null ? (i.addEventListener("click", this.preventClick, !0), i.addEventListener("dblclick", this.preventClick, !0)) : (o.clearTimeout(this.removePreventClickId), this.removePreventClickId = null);
    }, e.prototype.onTrackClick = function(r, n) {
      var t = this, i, o, l, s;
      n === void 0 && (n = "y");
      var a = this.axis[n];
      if (!(!this.options.clickOnTrack || !a.scrollbar.el || !this.contentWrapperEl)) {
        r.preventDefault();
        var u = se(this.el);
        this.axis[n].scrollbar.rect = a.scrollbar.el.getBoundingClientRect();
        var d = this.axis[n].scrollbar, p = (o = (i = d.rect) === null || i === void 0 ? void 0 : i[this.axis[n].offsetAttr]) !== null && o !== void 0 ? o : 0, g = parseInt((s = (l = this.elStyles) === null || l === void 0 ? void 0 : l[this.axis[n].sizeAttr]) !== null && s !== void 0 ? s : "0px", 10), c = this.contentWrapperEl[this.axis[n].scrollOffsetAttr], f = n === "y" ? this.mouseY - p : this.mouseX - p, h = f < 0 ? -1 : 1, S = h === -1 ? c - g : c + g, v = 40, $ = function() {
          t.contentWrapperEl && (h === -1 ? c > S && (c -= v, t.contentWrapperEl[t.axis[n].scrollOffsetAttr] = c, u.requestAnimationFrame($)) : c < S && (c += v, t.contentWrapperEl[t.axis[n].scrollOffsetAttr] = c, u.requestAnimationFrame($)));
        };
        $();
      }
    }, e.prototype.getContentElement = function() {
      return this.contentEl;
    }, e.prototype.getScrollElement = function() {
      return this.contentWrapperEl;
    }, e.prototype.removeListeners = function() {
      var r = se(this.el);
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
    }, e.getOptions = ir, e.helpers = rr, e;
  })()
), W = function() {
  return W = Object.assign || function(r) {
    for (var n, t = 1, i = arguments.length; t < i; t++) {
      n = arguments[t];
      for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
    }
    return r;
  }, W.apply(this, arguments);
};
function or(e, r) {
  var n = {};
  for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && r.indexOf(t) < 0 && (n[t] = e[t]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, t = Object.getOwnPropertySymbols(e); i < t.length; i++)
      r.indexOf(t[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, t[i]) && (n[t[i]] = e[t[i]]);
  return n;
}
var Mt = z.forwardRef(function(e, r) {
  var n = e.children, t = e.scrollableNodeProps, i = t === void 0 ? {} : t, o = or(e, ["children", "scrollableNodeProps"]), l = z.useRef(), s = z.useRef(), a = z.useRef(), u = {}, d = {};
  Object.keys(o).forEach(function(c) {
    Object.prototype.hasOwnProperty.call(Ee.defaultOptions, c) ? u[c] = o[c] : d[c] = o[c];
  });
  var p = W(W({}, Ee.defaultOptions.classNames), u.classNames), g = W(W({}, i), { className: "".concat(p.contentWrapper).concat(i.className ? " ".concat(i.className) : ""), tabIndex: u.tabIndex || Ee.defaultOptions.tabIndex, role: "region", "aria-label": u.ariaLabel || Ee.defaultOptions.ariaLabel });
  return z.useEffect(function() {
    var c;
    return s.current = g.ref ? g.ref.current : s.current, l.current && (c = new Ee(l.current, W(W(W({}, u), s.current && {
      scrollableNode: s.current
    }), a.current && {
      contentNode: a.current
    })), typeof r == "function" ? r(c) : r && (r.current = c)), function() {
      c?.unMount(), c = null, typeof r == "function" && r(null);
    };
  }, []), z.createElement(
    "div",
    W({ "data-simplebar": "init", ref: l }, d),
    z.createElement(
      "div",
      { className: p.wrapper },
      z.createElement(
        "div",
        { className: p.heightAutoObserverWrapperEl },
        z.createElement("div", { className: p.heightAutoObserverEl })
      ),
      z.createElement(
        "div",
        { className: p.mask },
        z.createElement("div", { className: p.offset }, typeof n == "function" ? n({
          scrollableNodeRef: s,
          scrollableNodeProps: W(W({}, g), { ref: s }),
          contentNodeRef: a,
          contentNodeProps: {
            className: p.contentEl,
            ref: a
          }
        }) : z.createElement(
          "div",
          W({}, g),
          z.createElement("div", { className: p.contentEl }, n)
        ))
      ),
      z.createElement("div", { className: p.placeholder })
    ),
    z.createElement(
      "div",
      { className: "".concat(p.track, " ").concat(p.horizontal) },
      z.createElement("div", { className: p.scrollbar })
    ),
    z.createElement(
      "div",
      { className: "".concat(p.track, " ").concat(p.vertical) },
      z.createElement("div", { className: p.scrollbar })
    )
  );
});
Mt.displayName = "SimpleBar";
function lr(e, r, n, t) {
  return _n({
    data: r,
    columns: e,
    state: {
      columnOrder: n
    },
    onColumnOrderChange: t,
    getCoreRowModel: wn()
  });
}
function sr(e) {
  const [r, n] = X(0);
  return Ze(() => {
    const t = e.current;
    if (!t) return;
    const i = new ResizeObserver((o) => {
      n(o[0].contentRect.width);
    });
    return i.observe(t), () => i.disconnect();
  }, [e]), r;
}
function ar() {
  const e = D(null), r = D([]), n = Z((i) => {
    i && !r.current.includes(i) && r.current.push(i);
  }, []), t = Z(() => {
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
function ur({
  onResize: e,
  onResizeEnd: r,
  minWidth: n = 40
}) {
  const t = D(0), i = D(0), o = D(null), l = Z(
    (u) => {
      if (!o.current) return;
      const d = u.clientX - t.current, p = Math.max(n, i.current + d);
      e(o.current, p);
    },
    [n, e]
  ), s = Z(() => {
    o.current = null, document.removeEventListener("mousemove", l), document.removeEventListener("mouseup", s), r?.();
  }, [l, r]);
  return { startResize: Z(
    (u, d) => {
      u.preventDefault(), u.stopPropagation(), o.current = d.id, t.current = u.clientX, i.current = Je(d.columnDef.meta?.widthSize), document.addEventListener("mousemove", l), document.addEventListener("mouseup", s);
    },
    [l, s]
  ) };
}
function cr(e) {
  const [r, n] = X(!1);
  return Ze(() => {
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
function dr(e) {
  return fe(() => {
    const r = e.getAllLeafColumns(), n = /* @__PURE__ */ new Map();
    for (const l of r)
      n.set(l.id, Je(l.columnDef.meta?.widthSize));
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
function gr({ setColumnOrder: e }) {
  const r = D(null), n = D(null), t = D(null), i = D(0), o = D(null), l = D(0), s = D([]), a = D(() => {
  }), u = D(() => {
  }), d = Z(() => {
    const c = Array.from(
      document.querySelectorAll("th[data-col-id]")
    );
    s.current = c.filter((f) => f.dataset.reorderable !== "false").map((f) => {
      const h = f.dataset.colId, S = f.getBoundingClientRect();
      return {
        id: h,
        left: S.left,
        right: S.right,
        center: S.left + S.width / 2
      };
    }).sort((f, h) => f.left - h.left);
  }, []), p = Z((c) => {
    const f = c.getBoundingClientRect(), h = c.cloneNode(!0);
    return h.classList.add("table-col-ghost"), h.style.position = "fixed", h.style.left = `${f.left}px`, h.style.top = `${f.top}px`, h.style.width = `${f.width}px`, h.style.height = `${f.height}px`, h.style.pointerEvents = "none", h.style.zIndex = "9999", h.style.willChange = "left", h.style.transition = "none", document.body.appendChild(h), h;
  }, []), g = Z(
    (c, f) => {
      r.current = c;
      const h = document.querySelector(`th[data-col-id="${c}"]`);
      if (!h) return;
      t.current = h;
      const S = h.getBoundingClientRect();
      i.current = f.clientX - S.left;
      const v = p(h);
      n.current = v, h.classList.add("is-dragging-col"), h.style.opacity = "0.2", d(), l.current = f.clientX, document.body.style.cursor = "grabbing", document.addEventListener("pointermove", a.current), document.addEventListener("pointerup", u.current);
    },
    [p, d]
  );
  return a.current = (c) => {
    !r.current || !n.current || (l.current = c.clientX, !o.current && (o.current = requestAnimationFrame(() => {
      if (o.current = null, !r.current || !n.current) return;
      const f = n.current, h = l.current - i.current;
      f.style.left = `${h}px`;
      const S = f.offsetWidth, v = h + S / 2, $ = s.current;
      if (!$.length) return;
      let E = null;
      for (const b of $)
        if (b.id !== r.current && v >= b.left && v <= b.right) {
          E = b.id;
          break;
        }
      !E || E === r.current || (e((b) => {
        const A = b.indexOf(r.current), x = b.indexOf(E);
        if (A === -1 || x === -1 || A === x) return b;
        const M = [...b];
        return M.splice(A, 1), M.splice(x, 0, r.current), M;
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
function fr(e) {
  return "accessorKey" in e && typeof e.accessorKey == "string";
}
function pr(e) {
  return e.map((r) => {
    if (r.id)
      return r;
    if (fr(r))
      return {
        ...r,
        id: r.accessorKey
      };
    throw new Error(
      "Columns sem id e sem accessorKey string. Defina um id explicitamente para esta coluna."
    );
  });
}
function hr(e) {
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
function mr(e, r) {
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
function vr(e) {
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
function Cr({
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
  editable: p = !1,
  draggable: g = !1,
  draggableSticky: c = !1,
  selectable: f,
  expandable: h,
  pagination: S,
  loading: v,
  loadingCustom: $,
  noResultMessage: E = "Nenhum resultado encontrado.",
  onRowClick: b,
  hoverableRow: A,
  borders: x = "full",
  style: M = "default"
}) {
  const I = D(null), U = Z(
    (_) => {
      I.current = _;
    },
    []
  ), [J, re] = X(null), ie = Z(
    (_) => {
      re(_), s?.(_);
    },
    [s]
  ), {
    bodyRef: ge,
    registerSyncElement: oe,
    onBodyScroll: Ce
  } = ar(), V = sr(ge), F = cr(ge), [H, j] = X({}), Re = fe(
    () => new Set(f?.initialSelectRow || []),
    [f?.initialSelectRow]
  ), [Q, ee] = X(Re);
  Fe(() => {
    f?.initialSelectRow && ee(new Set(f.initialSelectRow));
  }, [f?.initialSelectRow]), Fe(() => {
    f?.onSelectedRowsChange?.(Array.from(Q));
  }, [Q, f]);
  const [pe, y] = X(/* @__PURE__ */ new Set()), P = fe(
    () => pr(
      (() => {
        const _ = [];
        return g && _.push(hr(c)), f && _.push(mr(
          f.sticky,
          f.label
        )), h && _.push(vr(h.sticky)), [..._, ...e];
      })()
    ),
    [
      e,
      g,
      c,
      f,
      h
    ]
  ), [k, R] = X(
    () => P.map((_) => _.id)
  ), [O, L] = X(r);
  Fe(() => {
    L(r);
  }, [r]), Fe(() => {
    a?.(O);
  }, [O, a]);
  const Y = fe(
    () => P.map((_) => ({
      ..._,
      meta: {
        ..._.meta,
        widthSize: H[_.id] ?? _.meta?.widthSize
      }
    })),
    [P, H]
  ), q = lr(
    Y,
    O,
    k,
    R
  ), le = dr(q), { startResize: he } = ur({
    onResize: (_, ve) => {
      j((ye) => ({
        ...ye,
        [_]: `${ve}px`
      }));
    },
    onResizeEnd: () => {
      requestAnimationFrame(() => {
        I.current?.recalculate();
      });
    }
  }), { startDrag: me } = gr({
    setColumnOrder: R
  });
  return Ze(() => {
    I.current?.recalculate();
  }, [F]), /* @__PURE__ */ G("div", { className: `super-table-wrapper borders-${x} style-${M}`, style: { height: t }, children: [
    /* @__PURE__ */ m(
      Ot,
      {
        table: q,
        scrollRef: oe,
        tableWidth: V,
        stickyById: le,
        resizableCol: i,
        reorderableCol: o,
        sortableCol: l,
        sortState: J,
        setSortState: ie,
        onResizeStart: he,
        onDragStart: me,
        defaultTextAlign: d,
        selectable: f,
        selectedRows: Q,
        setSelectedRows: ee,
        disableSelectRow: f?.disableSelectRow || [],
        data: r,
        expandable: h,
        expandedRows: pe,
        setExpandedRows: y
      }
    ),
    /* @__PURE__ */ G("div", { className: "internal-table", children: [
      /* @__PURE__ */ m(
        It,
        {
          table: q,
          scrollRef: oe,
          tableWidth: V,
          stickyById: le,
          defaultTextAlign: d
        }
      ),
      /* @__PURE__ */ G("div", { className: `table-body-area ${F ? "has-h-scroll" : "no-h-scroll"}`, children: [
        /* @__PURE__ */ m(
          Mt,
          {
            ref: U,
            className: "table-body-scroll",
            scrollableNodeProps: {
              ref: ge,
              onScroll: Ce
            },
            children: /* @__PURE__ */ m(
              En,
              {
                table: q,
                tableWidth: V,
                stickyById: le,
                defaultTextAlign: d,
                editable: p,
                draggable: g,
                setData: L,
                setInternalData: L,
                selectable: f,
                selectedRows: Q,
                setSelectedRows: ee,
                disableSelectRow: f?.disableSelectRow || [],
                expandable: h,
                expandedRows: pe,
                setExpandedRows: y,
                loading: v,
                loadingCustom: $,
                noResultMessage: E,
                onRowClick: b,
                totalItems: S?.totalItems,
                stripedRows: u,
                hoverableRow: A
              }
            )
          }
        ),
        /* @__PURE__ */ m(
          $n,
          {
            table: q,
            scrollRef: oe,
            tableWidth: V,
            stickyById: le,
            defaultTextAlign: d
          }
        )
      ] })
    ] }),
    n && /* @__PURE__ */ m(Fn, { table: q, children: n }),
    S && /* @__PURE__ */ m(
      bn,
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
  Cr as Table
};
