import { jsx as S, jsxs as B } from "react/jsx-runtime";
import * as L from "react";
import { useMemo as de, useRef as k, useState as K, useLayoutEffect as je, useCallback as Z, useEffect as Qe } from "react";
function xt(e) {
  const r = e.columnDef.meta;
  return !(r?.resizable === !1 || r?.sticky && r.resizable !== !0);
}
function $e(e, r) {
  return e.columnDef.meta?.textAlign ?? r;
}
function qe(e) {
  return e && e.endsWith("px") ? parseFloat(e) : 0;
}
function be({ table: e, tableWidth: r }) {
  const n = e.getAllLeafColumns(), o = n.map(
    (l) => qe(l.columnDef.meta?.widthSize)
  ).reduce((l, s) => l + s, 0) > r;
  return /* @__PURE__ */ S("colgroup", { children: n.map((l, s) => {
    const a = l.columnDef.meta, u = s === n.length - 1;
    let d;
    return !o && u ? d = { width: "auto" } : a?.widthSize && (d = { width: a.widthSize }), /* @__PURE__ */ S("col", { style: d }, l.id);
  }) });
}
function _t({
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
  setSelectedRows: v,
  expandable: m,
  expandedRows: _,
  setExpandedRows: R
}) {
  const b = n.map((A, $) => typeof A == "object" && A !== null && "id" in A ? A.id ?? $ : $), P = !!d, x = d?.label, M = b.filter((A) => !g.includes(A)), I = M.filter((A) => f.has(A)).length, j = I === M.length && M.length > 0, ae = I > 0 && I < M.length, q = () => {
    v((A) => {
      const $ = new Set(A);
      return j ? M.forEach((y) => $.delete(y)) : M.forEach((y) => $.add(y)), $;
    });
  }, ne = !!m, ue = m?.allButton || !1, ce = b.every((A) => _.has(A)), he = () => {
    R(ce ? /* @__PURE__ */ new Set() : new Set(b));
  };
  return /* @__PURE__ */ S("div", { className: "table-scroll-sync", ref: h, children: /* @__PURE__ */ B("table", { className: "table table-external-header", children: [
    /* @__PURE__ */ S(
      be,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ S("thead", { children: e.getHeaderGroups().map((A) => /* @__PURE__ */ S("tr", { children: A.headers.map(($) => {
      const y = $.column.columnDef.meta, O = t.get($.column.id), D = $e($.column, u), H = o && y?.reorderable !== !1 && !y?.sticky, E = (y?.sortable ?? l) && !y?.sticky && !["__draggable__", "__selectable__", "__expandable__"].includes($.column.id), T = s?.columnId === $.column.id, G = () => {
        if (!E) return;
        let F;
        !s || s.columnId !== $.column.id ? F = { columnId: $.column.id, direction: "asc" } : s.direction === "asc" ? F = { columnId: $.column.id, direction: "desc" } : F = null, a(F);
      }, J = [
        O ? "is-sticky" : "",
        O?.side === "left" ? "is-sticky-left" : "",
        O?.side === "right" ? "is-sticky-right" : "",
        E ? "is-sortable" : "",
        T ? `is-sorted-${s.direction}` : ""
      ].filter(Boolean).join(" "), Y = O ? O.side === "left" ? { "--sticky-left": `${O.offset}px` } : { "--sticky-right": `${O.offset}px` } : void 0;
      return /* @__PURE__ */ S(
        "th",
        {
          "data-col-id": $.column.id,
          "data-fixed": y?.sticky ? "true" : void 0,
          "data-reorderable": H ? void 0 : "false",
          className: J,
          style: Y,
          onClick: G,
          children: /* @__PURE__ */ B("div", { className: `th-content align-${D}`, children: [
            /* @__PURE__ */ S("div", { children: $.isPlaceholder ? null : $.column.id === "__selectable__" && P ? /* @__PURE__ */ B("label", { children: [
              /* @__PURE__ */ S(
                "input",
                {
                  type: "checkbox",
                  checked: j,
                  ref: (F) => {
                    F && (F.indeterminate = ae);
                  },
                  onChange: q
                }
              ),
              x
            ] }) : $.column.id === "__expandable__" && ne && ue ? /* @__PURE__ */ S(
              "button",
              {
                onClick: he,
                className: `expand-all-button ${ce ? "expanded" : ""}`,
                children: "⇅"
              }
            ) : (() => {
              const F = $.column.columnDef.header;
              return typeof F == "function" ? F({ column: $.column, table: e, header: $ }) : F;
            })() }),
            E && /* @__PURE__ */ S("span", { className: "sort-indicator" }),
            H && /* @__PURE__ */ S(
              "span",
              {
                className: "col-drag-handle",
                onClick: (F) => F.stopPropagation(),
                onPointerDown: (F) => {
                  F.preventDefault(), F.currentTarget.setPointerCapture(F.pointerId), c?.($.column.id, F.nativeEvent);
                },
                children: "☰"
              }
            ),
            i && p && xt($.column) && /* @__PURE__ */ S(
              "span",
              {
                className: "col-resize-handle",
                onClick: (F) => F.stopPropagation(),
                onMouseDown: (F) => p(F, $.column)
              }
            )
          ] })
        },
        $.id
      );
    }) }, A.id)) })
  ] }) });
}
function Et({
  table: e,
  tableWidth: r,
  stickyById: n,
  defaultTextAlign: t,
  scrollRef: i
}) {
  return e.getAllLeafColumns().some(
    (s) => s.columnDef.meta?.internalHeader != null
  ) ? /* @__PURE__ */ S("div", { className: "table-scroll-sync", ref: i, children: /* @__PURE__ */ B("table", { className: "table table-internal-header", children: [
    /* @__PURE__ */ S(
      be,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ S("thead", { children: /* @__PURE__ */ S("tr", { children: e.getAllLeafColumns().map((s) => {
      const a = s.columnDef.meta?.internalHeader, u = n.get(s.id), d = $e(s, t), f = [
        u ? "is-sticky" : "",
        u?.side === "left" ? "is-sticky-left" : "",
        u?.side === "right" ? "is-sticky-right" : ""
      ].filter(Boolean).join(" "), g = u ? u.side === "left" ? { "--sticky-left": `${u.offset}px` } : { "--sticky-right": `${u.offset}px` } : void 0;
      return /* @__PURE__ */ S(
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
function le(e, r) {
  return typeof e == "function" ? e(r) : e;
}
function U(e, r) {
  return (n) => {
    r.setState((t) => ({
      ...t,
      [e]: le(n, t[e])
    }));
  };
}
function Oe(e) {
  return e instanceof Function;
}
function Ft(e) {
  return Array.isArray(e) && e.every((r) => typeof r == "number");
}
function Mt(e, r) {
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
function $t(e, r, n, t) {
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
function bt(e, r, n, t) {
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
const N = "debugHeaders";
function Ze(e, r, n) {
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
const Ot = {
  createTable: (e) => {
    e.getHeaderGroups = w(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (r, n, t, i) => {
      var o, l;
      const s = (o = t?.map((f) => n.find((g) => g.id === f)).filter(Boolean)) != null ? o : [], a = (l = i?.map((f) => n.find((g) => g.id === f)).filter(Boolean)) != null ? l : [], u = n.filter((f) => !(t != null && t.includes(f.id)) && !(i != null && i.includes(f.id)));
      return ye(r, [...s, ...u, ...a], e);
    }, C(e.options, N, "getHeaderGroups")), e.getCenterHeaderGroups = w(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (r, n, t, i) => (n = n.filter((o) => !(t != null && t.includes(o.id)) && !(i != null && i.includes(o.id))), ye(r, n, e, "center")), C(e.options, N, "getCenterHeaderGroups")), e.getLeftHeaderGroups = w(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left], (r, n, t) => {
      var i;
      const o = (i = t?.map((l) => n.find((s) => s.id === l)).filter(Boolean)) != null ? i : [];
      return ye(r, o, e, "left");
    }, C(e.options, N, "getLeftHeaderGroups")), e.getRightHeaderGroups = w(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.right], (r, n, t) => {
      var i;
      const o = (i = t?.map((l) => n.find((s) => s.id === l)).filter(Boolean)) != null ? i : [];
      return ye(r, o, e, "right");
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
function ye(e, r, n, t) {
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
    g.forEach((v) => {
      const m = [...p].reverse()[0], _ = v.column.depth === h.depth;
      let R, b = !1;
      if (_ && v.column.parent ? R = v.column.parent : (R = v.column, b = !0), m && m?.column === R)
        m.subHeaders.push(v);
      else {
        const P = Ze(n, R, {
          id: [t, c, R.id, v?.id].filter(Boolean).join("_"),
          isPlaceholder: b,
          placeholderId: b ? `${p.filter((x) => x.column === R).length}` : void 0,
          depth: c,
          index: p.length
        });
        P.subHeaders.push(v), p.push(P);
      }
      h.headers.push(v), v.headerGroup = h;
    }), a.push(h), c > 0 && u(p, c - 1);
  }, d = r.map((g, c) => Ze(n, g, {
    depth: l,
    index: c
  }));
  u(d, l - 1), a.reverse();
  const f = (g) => g.filter((h) => h.column.getIsVisible()).map((h) => {
    let p = 0, v = 0, m = [0];
    h.subHeaders && h.subHeaders.length ? (m = [], f(h.subHeaders).forEach((R) => {
      let {
        colSpan: b,
        rowSpan: P
      } = R;
      p += b, m.push(P);
    })) : p = 1;
    const _ = Math.min(...m);
    return v = v + _, h.colSpan = p, h.rowSpan = v, {
      colSpan: p,
      rowSpan: v
    };
  });
  return f((i = (o = a[0]) == null ? void 0 : o.headers) != null ? i : []), a;
}
const Pt = (e, r, n, t, i, o, l) => {
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
    getLeafRows: () => Mt(s.subRows, (a) => a.subRows),
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
    getAllCells: w(() => [e.getAllLeafColumns()], (a) => a.map((u) => $t(e, s, u, u.id)), C(e.options, "debugRows", "getAllCells")),
    _getAllCellsByColumnId: w(() => [s.getAllCells()], (a) => a.reduce((u, d) => (u[d.column.id] = d, u), {}), C(e.options, "debugRows", "getAllCellsByColumnId"))
  };
  for (let a = 0; a < e._features.length; a++) {
    const u = e._features[a];
    u == null || u.createRow == null || u.createRow(s, e);
  }
  return s;
}, It = {
  createColumn: (e, r) => {
    e._getFacetedRowModel = r.options.getFacetedRowModel && r.options.getFacetedRowModel(r, e.id), e.getFacetedRowModel = () => e._getFacetedRowModel ? e._getFacetedRowModel() : r.getPreFilteredRowModel(), e._getFacetedUniqueValues = r.options.getFacetedUniqueValues && r.options.getFacetedUniqueValues(r, e.id), e.getFacetedUniqueValues = () => e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getFacetedMinMaxValues = r.options.getFacetedMinMaxValues && r.options.getFacetedMinMaxValues(r, e.id), e.getFacetedMinMaxValues = () => {
      if (e._getFacetedMinMaxValues)
        return e._getFacetedMinMaxValues();
    };
  }
}, ot = (e, r, n) => {
  var t, i;
  const o = n == null || (t = n.toString()) == null ? void 0 : t.toLowerCase();
  return !!(!((i = e.getValue(r)) == null || (i = i.toString()) == null || (i = i.toLowerCase()) == null) && i.includes(o));
};
ot.autoRemove = (e) => Q(e);
const lt = (e, r, n) => {
  var t;
  return !!(!((t = e.getValue(r)) == null || (t = t.toString()) == null) && t.includes(n));
};
lt.autoRemove = (e) => Q(e);
const st = (e, r, n) => {
  var t;
  return ((t = e.getValue(r)) == null || (t = t.toString()) == null ? void 0 : t.toLowerCase()) === n?.toLowerCase();
};
st.autoRemove = (e) => Q(e);
const at = (e, r, n) => {
  var t;
  return (t = e.getValue(r)) == null ? void 0 : t.includes(n);
};
at.autoRemove = (e) => Q(e);
const ut = (e, r, n) => !n.some((t) => {
  var i;
  return !((i = e.getValue(r)) != null && i.includes(t));
});
ut.autoRemove = (e) => Q(e) || !(e != null && e.length);
const ct = (e, r, n) => n.some((t) => {
  var i;
  return (i = e.getValue(r)) == null ? void 0 : i.includes(t);
});
ct.autoRemove = (e) => Q(e) || !(e != null && e.length);
const dt = (e, r, n) => e.getValue(r) === n;
dt.autoRemove = (e) => Q(e);
const gt = (e, r, n) => e.getValue(r) == n;
gt.autoRemove = (e) => Q(e);
const Xe = (e, r, n) => {
  let [t, i] = n;
  const o = e.getValue(r);
  return o >= t && o <= i;
};
Xe.resolveFilterValue = (e) => {
  let [r, n] = e, t = typeof r != "number" ? parseFloat(r) : r, i = typeof n != "number" ? parseFloat(n) : n, o = r === null || Number.isNaN(t) ? -1 / 0 : t, l = n === null || Number.isNaN(i) ? 1 / 0 : i;
  if (o > l) {
    const s = o;
    o = l, l = s;
  }
  return [o, l];
};
Xe.autoRemove = (e) => Q(e) || Q(e[0]) && Q(e[1]);
const te = {
  includesString: ot,
  includesStringSensitive: lt,
  equalsString: st,
  arrIncludes: at,
  arrIncludesAll: ut,
  arrIncludesSome: ct,
  equals: dt,
  weakEquals: gt,
  inNumberRange: Xe
};
function Q(e) {
  return e == null || e === "";
}
const Vt = {
  getDefaultColumnDef: () => ({
    filterFn: "auto"
  }),
  getInitialState: (e) => ({
    columnFilters: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnFiltersChange: U("columnFilters", e),
    filterFromLeafRows: !1,
    maxLeafRowFilterDepth: 100
  }),
  createColumn: (e, r) => {
    e.getAutoFilterFn = () => {
      const n = r.getCoreRowModel().flatRows[0], t = n?.getValue(e.id);
      return typeof t == "string" ? te.includesString : typeof t == "number" ? te.inNumberRange : typeof t == "boolean" || t !== null && typeof t == "object" ? te.equals : Array.isArray(t) ? te.arrIncludes : te.weakEquals;
    }, e.getFilterFn = () => {
      var n, t;
      return Oe(e.columnDef.filterFn) ? e.columnDef.filterFn : e.columnDef.filterFn === "auto" ? e.getAutoFilterFn() : (
        // @ts-ignore
        (n = (t = r.options.filterFns) == null ? void 0 : t[e.columnDef.filterFn]) != null ? n : te[e.columnDef.filterFn]
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
        const i = e.getFilterFn(), o = t?.find((d) => d.id === e.id), l = le(n, o ? o.value : void 0);
        if (Je(i, l, e)) {
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
        return (o = le(r, i)) == null ? void 0 : o.filter((l) => {
          const s = n.find((a) => a.id === l.id);
          if (s) {
            const a = s.getFilterFn();
            if (Je(a, l.value, s))
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
function Je(e, r, n) {
  return (e && e.autoRemove ? e.autoRemove(r, n) : !1) || typeof r > "u" || typeof r == "string" && !r;
}
const At = (e, r, n) => n.reduce((t, i) => {
  const o = i.getValue(e);
  return t + (typeof o == "number" ? o : 0);
}, 0), zt = (e, r, n) => {
  let t;
  return n.forEach((i) => {
    const o = i.getValue(e);
    o != null && (t > o || t === void 0 && o >= o) && (t = o);
  }), t;
}, Lt = (e, r, n) => {
  let t;
  return n.forEach((i) => {
    const o = i.getValue(e);
    o != null && (t < o || t === void 0 && o >= o) && (t = o);
  }), t;
}, Dt = (e, r, n) => {
  let t, i;
  return n.forEach((o) => {
    const l = o.getValue(e);
    l != null && (t === void 0 ? l >= l && (t = i = l) : (t > l && (t = l), i < l && (i = l)));
  }), [t, i];
}, kt = (e, r) => {
  let n = 0, t = 0;
  if (r.forEach((i) => {
    let o = i.getValue(e);
    o != null && (o = +o) >= o && (++n, t += o);
  }), n) return t / n;
}, Nt = (e, r) => {
  if (!r.length)
    return;
  const n = r.map((o) => o.getValue(e));
  if (!Ft(n))
    return;
  if (n.length === 1)
    return n[0];
  const t = Math.floor(n.length / 2), i = n.sort((o, l) => o - l);
  return n.length % 2 !== 0 ? i[t] : (i[t - 1] + i[t]) / 2;
}, Ht = (e, r) => Array.from(new Set(r.map((n) => n.getValue(e))).values()), Gt = (e, r) => new Set(r.map((n) => n.getValue(e))).size, Tt = (e, r) => r.length, Pe = {
  sum: At,
  min: zt,
  max: Lt,
  extent: Dt,
  mean: kt,
  median: Nt,
  unique: Ht,
  uniqueCount: Gt,
  count: Tt
}, Wt = {
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
    onGroupingChange: U("grouping", e),
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
        return Pe.sum;
      if (Object.prototype.toString.call(t) === "[object Date]")
        return Pe.extent;
    }, e.getAggregationFn = () => {
      var n, t;
      if (!e)
        throw new Error();
      return Oe(e.columnDef.aggregationFn) ? e.columnDef.aggregationFn : e.columnDef.aggregationFn === "auto" ? e.getAutoAggregationFn() : (n = (t = r.options.aggregationFns) == null ? void 0 : t[e.columnDef.aggregationFn]) != null ? n : Pe[e.columnDef.aggregationFn];
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
function Bt(e, r, n) {
  if (!(r != null && r.length) || !n)
    return e;
  const t = e.filter((o) => !r.includes(o.id));
  return n === "remove" ? t : [...r.map((o) => e.find((l) => l.id === o)).filter(Boolean), ...t];
}
const jt = {
  getInitialState: (e) => ({
    columnOrder: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnOrderChange: U("columnOrder", e)
  }),
  createColumn: (e, r) => {
    e.getIndex = w((n) => [Re(r, n)], (n) => n.findIndex((t) => t.id === e.id), C(r.options, "debugColumns", "getIndex")), e.getIsFirstColumn = (n) => {
      var t;
      return ((t = Re(r, n)[0]) == null ? void 0 : t.id) === e.id;
    }, e.getIsLastColumn = (n) => {
      var t;
      const i = Re(r, n);
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
      return Bt(o, n, t);
    }, C(e.options, "debugTable", "_getOrderColumnsFn"));
  }
}, Ie = () => ({
  left: [],
  right: []
}), qt = {
  getInitialState: (e) => ({
    columnPinning: Ie(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnPinningChange: U("columnPinning", e)
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
      return e.setColumnPinning(r ? Ie() : (n = (t = e.initialState) == null ? void 0 : t.columnPinning) != null ? n : Ie());
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
function Xt(e) {
  return e || (typeof document < "u" ? document : null);
}
const xe = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
}, Ve = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: !1,
  columnSizingStart: []
}), Ut = {
  getDefaultColumnDef: () => xe,
  getInitialState: (e) => ({
    columnSizing: {},
    columnSizingInfo: Ve(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnSizingChange: U("columnSizing", e),
    onColumnSizingInfoChange: U("columnSizingInfo", e)
  }),
  createColumn: (e, r) => {
    e.getSize = () => {
      var n, t, i;
      const o = r.getState().columnSizing[e.id];
      return Math.min(Math.max((n = e.columnDef.minSize) != null ? n : xe.minSize, (t = o ?? e.columnDef.size) != null ? t : xe.size), (i = e.columnDef.maxSize) != null ? i : xe.maxSize);
    }, e.getStart = w((n) => [n, Re(r, n), r.getState().columnSizing], (n, t) => t.slice(0, e.getIndex(n)).reduce((i, o) => i + o.getSize(), 0), C(r.options, "debugColumns", "getStart")), e.getAfter = w((n) => [n, Re(r, n), r.getState().columnSizing], (n, t) => t.slice(e.getIndex(n) + 1).reduce((i, o) => i + o.getSize(), 0), C(r.options, "debugColumns", "getAfter")), e.resetSize = () => {
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
        if (!t || !i || (o.persist == null || o.persist(), Ae(o) && o.touches && o.touches.length > 1))
          return;
        const l = e.getSize(), s = e ? e.getLeafHeaders().map((m) => [m.column.id, m.column.getSize()]) : [[t.id, t.getSize()]], a = Ae(o) ? Math.round(o.touches[0].clientX) : o.clientX, u = {}, d = (m, _) => {
          typeof _ == "number" && (r.setColumnSizingInfo((R) => {
            var b, P;
            const x = r.options.columnResizeDirection === "rtl" ? -1 : 1, M = (_ - ((b = R?.startOffset) != null ? b : 0)) * x, I = Math.max(M / ((P = R?.startSize) != null ? P : 0), -0.999999);
            return R.columnSizingStart.forEach((j) => {
              let [ae, q] = j;
              u[ae] = Math.round(Math.max(q + q * I, 0) * 100) / 100;
            }), {
              ...R,
              deltaOffset: M,
              deltaPercentage: I
            };
          }), (r.options.columnResizeMode === "onChange" || m === "end") && r.setColumnSizing((R) => ({
            ...R,
            ...u
          })));
        }, f = (m) => d("move", m), g = (m) => {
          d("end", m), r.setColumnSizingInfo((_) => ({
            ..._,
            isResizingColumn: !1,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        }, c = Xt(n), h = {
          moveHandler: (m) => f(m.clientX),
          upHandler: (m) => {
            c?.removeEventListener("mousemove", h.moveHandler), c?.removeEventListener("mouseup", h.upHandler), g(m.clientX);
          }
        }, p = {
          moveHandler: (m) => (m.cancelable && (m.preventDefault(), m.stopPropagation()), f(m.touches[0].clientX), !1),
          upHandler: (m) => {
            var _;
            c?.removeEventListener("touchmove", p.moveHandler), c?.removeEventListener("touchend", p.upHandler), m.cancelable && (m.preventDefault(), m.stopPropagation()), g((_ = m.touches[0]) == null ? void 0 : _.clientX);
          }
        }, v = Yt() ? {
          passive: !1
        } : !1;
        Ae(o) ? (c?.addEventListener("touchmove", p.moveHandler, v), c?.addEventListener("touchend", p.upHandler, v)) : (c?.addEventListener("mousemove", h.moveHandler, v), c?.addEventListener("mouseup", h.upHandler, v)), r.setColumnSizingInfo((m) => ({
          ...m,
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
      e.setColumnSizingInfo(r ? Ve() : (n = e.initialState.columnSizingInfo) != null ? n : Ve());
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
let _e = null;
function Yt() {
  if (typeof _e == "boolean") return _e;
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
  return _e = e, _e;
}
function Ae(e) {
  return e.type === "touchstart";
}
const Kt = {
  getInitialState: (e) => ({
    columnVisibility: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnVisibilityChange: U("columnVisibility", e)
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
function Re(e, r) {
  return r ? r === "center" ? e.getCenterVisibleLeafColumns() : r === "left" ? e.getLeftVisibleLeafColumns() : e.getRightVisibleLeafColumns() : e.getVisibleLeafColumns();
}
const Qt = {
  createTable: (e) => {
    e._getGlobalFacetedRowModel = e.options.getFacetedRowModel && e.options.getFacetedRowModel(e, "__global__"), e.getGlobalFacetedRowModel = () => e.options.manualFiltering || !e._getGlobalFacetedRowModel ? e.getPreFilteredRowModel() : e._getGlobalFacetedRowModel(), e._getGlobalFacetedUniqueValues = e.options.getFacetedUniqueValues && e.options.getFacetedUniqueValues(e, "__global__"), e.getGlobalFacetedUniqueValues = () => e._getGlobalFacetedUniqueValues ? e._getGlobalFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getGlobalFacetedMinMaxValues = e.options.getFacetedMinMaxValues && e.options.getFacetedMinMaxValues(e, "__global__"), e.getGlobalFacetedMinMaxValues = () => {
      if (e._getGlobalFacetedMinMaxValues)
        return e._getGlobalFacetedMinMaxValues();
    };
  }
}, Zt = {
  getInitialState: (e) => ({
    globalFilter: void 0,
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGlobalFilterChange: U("globalFilter", e),
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
    e.getGlobalAutoFilterFn = () => te.includesString, e.getGlobalFilterFn = () => {
      var r, n;
      const {
        globalFilterFn: t
      } = e.options;
      return Oe(t) ? t : t === "auto" ? e.getGlobalAutoFilterFn() : (r = (n = e.options.filterFns) == null ? void 0 : n[t]) != null ? r : te[t];
    }, e.setGlobalFilter = (r) => {
      e.options.onGlobalFilterChange == null || e.options.onGlobalFilterChange(r);
    }, e.resetGlobalFilter = (r) => {
      e.setGlobalFilter(r ? void 0 : e.initialState.globalFilter);
    };
  }
}, Jt = {
  getInitialState: (e) => ({
    expanded: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onExpandedChange: U("expanded", e),
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
}, He = 0, Ge = 10, ze = () => ({
  pageIndex: He,
  pageSize: Ge
}), en = {
  getInitialState: (e) => ({
    ...e,
    pagination: {
      ...ze(),
      ...e?.pagination
    }
  }),
  getDefaultOptions: (e) => ({
    onPaginationChange: U("pagination", e)
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
      const i = (o) => le(t, o);
      return e.options.onPaginationChange == null ? void 0 : e.options.onPaginationChange(i);
    }, e.resetPagination = (t) => {
      var i;
      e.setPagination(t ? ze() : (i = e.initialState.pagination) != null ? i : ze());
    }, e.setPageIndex = (t) => {
      e.setPagination((i) => {
        let o = le(t, i.pageIndex);
        const l = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
        return o = Math.max(0, Math.min(o, l)), {
          ...i,
          pageIndex: o
        };
      });
    }, e.resetPageIndex = (t) => {
      var i, o;
      e.setPageIndex(t ? He : (i = (o = e.initialState) == null || (o = o.pagination) == null ? void 0 : o.pageIndex) != null ? i : He);
    }, e.resetPageSize = (t) => {
      var i, o;
      e.setPageSize(t ? Ge : (i = (o = e.initialState) == null || (o = o.pagination) == null ? void 0 : o.pageSize) != null ? i : Ge);
    }, e.setPageSize = (t) => {
      e.setPagination((i) => {
        const o = Math.max(1, le(t, i.pageSize)), l = i.pageSize * i.pageIndex, s = Math.floor(l / o);
        return {
          ...i,
          pageIndex: s,
          pageSize: o
        };
      });
    }, e.setPageCount = (t) => e.setPagination((i) => {
      var o;
      let l = le(t, (o = e.options.pageCount) != null ? o : -1);
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
}, Le = () => ({
  top: [],
  bottom: []
}), tn = {
  getInitialState: (e) => ({
    rowPinning: Le(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowPinningChange: U("rowPinning", e)
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
      return e.setRowPinning(r ? Le() : (n = (t = e.initialState) == null ? void 0 : t.rowPinning) != null ? n : Le());
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
}, nn = {
  getInitialState: (e) => ({
    rowSelection: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowSelectionChange: U("rowSelection", e),
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
        Te(i, o.id, t, !0, e);
      }), i;
    }), e.getPreSelectedRowModel = () => e.getCoreRowModel(), e.getSelectedRowModel = w(() => [e.getState().rowSelection, e.getCoreRowModel()], (r, n) => Object.keys(r).length ? De(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, C(e.options, "debugTable", "getSelectedRowModel")), e.getFilteredSelectedRowModel = w(() => [e.getState().rowSelection, e.getFilteredRowModel()], (r, n) => Object.keys(r).length ? De(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, C(e.options, "debugTable", "getFilteredSelectedRowModel")), e.getGroupedSelectedRowModel = w(() => [e.getState().rowSelection, e.getSortedRowModel()], (r, n) => Object.keys(r).length ? De(e, n) : {
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
        return Te(s, e.id, n, (l = t?.selectChildren) != null ? l : !0, r), s;
      });
    }, e.getIsSelected = () => {
      const {
        rowSelection: n
      } = r.getState();
      return Ue(e, n);
    }, e.getIsSomeSelected = () => {
      const {
        rowSelection: n
      } = r.getState();
      return We(e, n) === "some";
    }, e.getIsAllSubRowsSelected = () => {
      const {
        rowSelection: n
      } = r.getState();
      return We(e, n) === "all";
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
}, Te = (e, r, n, t, i) => {
  var o;
  const l = i.getRow(r, !0);
  n ? (l.getCanMultiSelect() || Object.keys(e).forEach((s) => delete e[s]), l.getCanSelect() && (e[r] = !0)) : delete e[r], t && (o = l.subRows) != null && o.length && l.getCanSelectSubRows() && l.subRows.forEach((s) => Te(e, s.id, n, t, i));
};
function De(e, r) {
  const n = e.getState().rowSelection, t = [], i = {}, o = function(l, s) {
    return l.map((a) => {
      var u;
      const d = Ue(a, n);
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
function Ue(e, r) {
  var n;
  return (n = r[e.id]) != null ? n : !1;
}
function We(e, r, n) {
  var t;
  if (!((t = e.subRows) != null && t.length)) return !1;
  let i = !0, o = !1;
  return e.subRows.forEach((l) => {
    if (!(o && !i) && (l.getCanSelect() && (Ue(l, r) ? o = !0 : i = !1), l.subRows && l.subRows.length)) {
      const s = We(l, r);
      s === "all" ? o = !0 : (s === "some" && (o = !0), i = !1);
    }
  }), i ? "all" : o ? "some" : !1;
}
const Be = /([0-9]+)/gm, rn = (e, r, n) => ft(se(e.getValue(n)).toLowerCase(), se(r.getValue(n)).toLowerCase()), on = (e, r, n) => ft(se(e.getValue(n)), se(r.getValue(n))), ln = (e, r, n) => Ye(se(e.getValue(n)).toLowerCase(), se(r.getValue(n)).toLowerCase()), sn = (e, r, n) => Ye(se(e.getValue(n)), se(r.getValue(n))), an = (e, r, n) => {
  const t = e.getValue(n), i = r.getValue(n);
  return t > i ? 1 : t < i ? -1 : 0;
}, un = (e, r, n) => Ye(e.getValue(n), r.getValue(n));
function Ye(e, r) {
  return e === r ? 0 : e > r ? 1 : -1;
}
function se(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function ft(e, r) {
  const n = e.split(Be).filter(Boolean), t = r.split(Be).filter(Boolean);
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
const Se = {
  alphanumeric: rn,
  alphanumericCaseSensitive: on,
  text: ln,
  textCaseSensitive: sn,
  datetime: an,
  basic: un
}, cn = {
  getInitialState: (e) => ({
    sorting: [],
    ...e
  }),
  getDefaultColumnDef: () => ({
    sortingFn: "auto",
    sortUndefined: 1
  }),
  getDefaultOptions: (e) => ({
    onSortingChange: U("sorting", e),
    isMultiSortEvent: (r) => r.shiftKey
  }),
  createColumn: (e, r) => {
    e.getAutoSortingFn = () => {
      const n = r.getFilteredRowModel().flatRows.slice(10);
      let t = !1;
      for (const i of n) {
        const o = i?.getValue(e.id);
        if (Object.prototype.toString.call(o) === "[object Date]")
          return Se.datetime;
        if (typeof o == "string" && (t = !0, o.split(Be).length > 1))
          return Se.alphanumeric;
      }
      return t ? Se.text : Se.basic;
    }, e.getAutoSortDir = () => {
      const n = r.getFilteredRowModel().flatRows[0];
      return typeof n?.getValue(e.id) == "string" ? "asc" : "desc";
    }, e.getSortingFn = () => {
      var n, t;
      if (!e)
        throw new Error();
      return Oe(e.columnDef.sortingFn) ? e.columnDef.sortingFn : e.columnDef.sortingFn === "auto" ? e.getAutoSortingFn() : (n = (t = r.options.sortingFns) == null ? void 0 : t[e.columnDef.sortingFn]) != null ? n : Se[e.columnDef.sortingFn];
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
}, dn = [
  Ot,
  Kt,
  jt,
  qt,
  It,
  Vt,
  Qt,
  //depends on ColumnFaceting
  Zt,
  //depends on ColumnFiltering
  cn,
  Wt,
  //depends on RowSorting
  Jt,
  en,
  tn,
  nn,
  Ut
];
function gn(e) {
  var r, n;
  process.env.NODE_ENV !== "production" && (e.debugAll || e.debugTable) && console.info("Creating Table Instance...");
  const t = [...dn, ...(r = e._features) != null ? r : []];
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
      const c = le(g, i.options);
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
          var p, v;
          return (p = (v = h.renderValue()) == null || v.toString == null ? void 0 : v.toString()) != null ? p : null;
        },
        ...i._features.reduce((h, p) => Object.assign(h, p.getDefaultColumnDef == null ? void 0 : p.getDefaultColumnDef()), {}),
        ...g
      };
    }, C(e, "debugColumns", "_getDefaultColumnDef")),
    _getColumnDefs: () => i.options.columns,
    getAllColumns: w(() => [i._getColumnDefs()], (g) => {
      const c = function(h, p, v) {
        return v === void 0 && (v = 0), h.map((m) => {
          const _ = bt(i, m, v, p), R = m;
          return _.columns = R.columns ? c(R.columns, _, v + 1) : [], _;
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
function fn() {
  return (e) => w(() => [e.options.data], (r) => {
    const n = {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, t = function(i, o, l) {
      o === void 0 && (o = 0);
      const s = [];
      for (let u = 0; u < i.length; u++) {
        const d = Pt(e, e._getRowId(i[u], u, l), i[u], u, o, void 0, l?.id);
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
function pn(e, r) {
  return e ? hn(e) ? /* @__PURE__ */ L.createElement(e, r) : e : null;
}
function hn(e) {
  return mn(e) || typeof e == "function" || vn(e);
}
function mn(e) {
  return typeof e == "function" && (() => {
    const r = Object.getPrototypeOf(e);
    return r.prototype && r.prototype.isReactComponent;
  })();
}
function vn(e) {
  return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
function Sn(e) {
  const r = {
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    ...e
  }, [n] = L.useState(() => ({
    current: gn(r)
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
function wn({
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
  hoverableRow: v = !1
}) {
  const m = de(
    () => l ?? s,
    [l, s]
  ), _ = k(null), R = k(null), [b, P] = K(null), [x, M] = K(0), I = (y, O) => {
    o && (O.preventDefault(), _.current = O.clientY, R.current = y, P(y), M(0), O.currentTarget.setPointerCapture(O.pointerId));
  }, j = (y) => {
    if (!o || _.current === null || R.current === null) return;
    const O = y.clientY - _.current;
    M(O);
    const D = 32, H = O > D ? 1 : O < -D ? -1 : 0;
    if (H === 0) return;
    const E = R.current, T = E + H;
    T < 0 || T >= e.getRowModel().rows.length || (m((G) => {
      const J = [...G], [Y] = J.splice(E, 1);
      return J.splice(T, 0, Y), J;
    }), R.current = T, _.current = y.clientY, M(0), P(T));
  }, ae = () => {
    _.current = null, R.current = null, P(null), M(0);
  }, [q, ne] = K(null), [ue, ce] = K(""), he = (y) => {
    ne({
      rowId: y.row.id,
      colId: y.column.id
    }), ce(String(y.getValue() ?? ""));
  }, A = (y) => {
    s(
      (O) => O.map(
        (D, H) => H === y.row.index ? {
          ...D,
          [y.column.id]: ue
        } : D
      )
    ), ne(null);
  }, $ = (y, O) => {
    if (!g || !g.clickRow || y.target.closest(".col-drag-handle") || y.target.tagName === "INPUT" && y.target.type === "checkbox" || y.target.tagName === "A" || y.target.tagName === "BUTTON" || y.target.tagName === "INPUT" && q) return;
    const D = O.original.id ?? O.index;
    h((H) => {
      const E = new Set(H);
      return E.has(D) ? E.delete(D) : E.add(D), E;
    });
  };
  return /* @__PURE__ */ B("table", { className: `table table-body ${v ? "hoverable" : ""} ${p ? "striped" : ""}`, children: [
    /* @__PURE__ */ S(
      be,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ S("tbody", { children: e.getRowModel().rows.map((y) => {
      const O = y.index, D = b === O, H = [];
      return H.push(
        /* @__PURE__ */ S(
          "tr",
          {
            className: `${D ? "row-dragging" : ""}`,
            style: D ? {
              transform: `translateY(${x}px)`,
              position: "relative",
              zIndex: 50
            } : void 0,
            onPointerMove: j,
            onPointerUp: ae,
            onClick: (E) => $(E, y),
            children: y.getVisibleCells().map((E) => {
              const T = E.column.id, G = n.get(T), J = $e(E.column, t), Y = q?.rowId === y.id && q?.colId === T, F = [
                G ? "is-sticky" : "",
                G?.side === "left" ? "is-sticky-left" : "",
                G?.side === "right" ? "is-sticky-right" : ""
              ].filter(Boolean).join(" "), ge = G ? G.side === "left" ? { "--sticky-left": `${G.offset}px` } : { "--sticky-right": `${G.offset}px` } : void 0;
              if (E.column.id === "__draggable__" && o)
                return /* @__PURE__ */ S(
                  "td",
                  {
                    className: `${F} align-center col-drag-handle`,
                    style: ge,
                    onPointerDown: (z) => I(O, z),
                    children: "☰"
                  },
                  E.id
                );
              if (E.column.id === "__selectable__" && a) {
                const z = E.row.original.id ?? E.row.index, V = f.includes(z), me = u.has(z);
                return /* @__PURE__ */ S(
                  "td",
                  {
                    className: `${F} align-center`,
                    style: ge,
                    children: /* @__PURE__ */ S(
                      "input",
                      {
                        type: "checkbox",
                        checked: me,
                        disabled: V,
                        onChange: () => {
                          d((ve) => {
                            const ee = new Set(ve);
                            return ee.has(z) ? ee.delete(z) : ee.add(z), ee;
                          });
                        }
                      }
                    )
                  },
                  E.id
                );
              }
              if (E.column.id === "__expandable__" && g) {
                const z = E.row.original.id ?? E.row.index, V = c.has(z);
                return /* @__PURE__ */ S(
                  "td",
                  {
                    className: `${F} align-center`,
                    style: ge,
                    onClick: (me) => {
                      me.stopPropagation(), h((ve) => {
                        const ee = new Set(ve);
                        return ee.has(z) ? ee.delete(z) : ee.add(z), ee;
                      });
                    },
                    children: /* @__PURE__ */ S(
                      "span",
                      {
                        className: `expand-icon ${V ? "expanded" : ""}`,
                        style: {
                          display: "inline-block",
                          transition: "transform 0.2s",
                          transform: V ? "rotate(90deg)" : "rotate(0deg)",
                          cursor: "pointer",
                          fontSize: "12px"
                        },
                        children: /* @__PURE__ */ S("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ S("path", { d: "M4.5 9L7.5 6L4.5 3", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
                      }
                    )
                  },
                  E.id
                );
              }
              return /* @__PURE__ */ S(
                "td",
                {
                  className: `${F} align-${J}`,
                  style: ge,
                  onDoubleClick: () => {
                    i && he(E);
                  },
                  children: Y ? /* @__PURE__ */ S(
                    "input",
                    {
                      autoFocus: !0,
                      value: ue,
                      onChange: (z) => ce(z.target.value),
                      onBlur: () => A(E),
                      onKeyDown: (z) => {
                        z.key === "Enter" && A(E), z.key === "Escape" && ne(null);
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
                  ) : pn(
                    E.column.columnDef.cell,
                    E.getContext()
                  )
                },
                E.id
              );
            })
          },
          y.id
        )
      ), g && g.content && c.has(y.original.id ?? y.index) && H.push(
        /* @__PURE__ */ S("tr", { className: "expanded-row", children: /* @__PURE__ */ S("td", { colSpan: e.getAllColumns().length, className: "expanded-content", children: g.content(y.original) }) }, `${y.id}-expanded`)
      ), H;
    }).flat() })
  ] });
}
function Cn({
  table: e,
  tableWidth: r,
  stickyById: n,
  defaultTextAlign: t,
  scrollRef: i
}) {
  return e.getAllLeafColumns().some(
    (s) => s.columnDef.meta?.internalFooter != null
  ) ? /* @__PURE__ */ S("div", { className: "table-scroll-sync", ref: i, children: /* @__PURE__ */ B("table", { className: "table table-internal-footer", children: [
    /* @__PURE__ */ S(
      be,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ S("tfoot", { children: /* @__PURE__ */ S("tr", { children: e.getAllLeafColumns().map((s) => {
      const a = s.columnDef.meta?.internalFooter, u = n.get(s.id), d = $e(s, t), f = [
        u ? "is-sticky" : "",
        u?.side === "left" ? "is-sticky-left" : "",
        u?.side === "right" ? "is-sticky-right" : ""
      ].filter(Boolean).join(" "), g = u ? u.side === "left" ? { "--sticky-left": `${u.offset}px` } : { "--sticky-right": `${u.offset}px` } : void 0;
      return /* @__PURE__ */ S(
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
function Rn({ children: e }) {
  return /* @__PURE__ */ S("table", { className: "table table-external-footer", children: /* @__PURE__ */ S("tfoot", { children: /* @__PURE__ */ S("tr", { children: /* @__PURE__ */ S("td", { children: e }) }) }) });
}
function yn(e, r, n = 2) {
  if (r <= 1) return [1];
  const t = [], i = [], o = Math.max(2, e - n), l = Math.min(r - 1, e + n);
  for (let s = o; s <= l; s++)
    i.push(s);
  return t.push(1), o > 2 && t.push("ellipsis"), t.push(...i), l < r - 1 && t.push("ellipsis"), t.push(r), t;
}
function xn({
  currentPage: e,
  totalItems: r,
  pageSize: n,
  pageSizeOptions: t = [10, 25, 50, 100, 200],
  onPageChange: i
}) {
  const o = Math.max(1, Math.ceil(r / n)), l = r === 0 ? 0 : (e - 1) * n + 1, s = Math.min(e * n, r), a = de(
    () => yn(e, o),
    [e, o]
  ), u = de(() => {
    const d = new Set(t);
    return d.add(n), Array.from(d).sort((f, g) => f - g);
  }, [t, n]);
  return /* @__PURE__ */ B("div", { className: "table-pagination", children: [
    /* @__PURE__ */ B("div", { className: "pagination-controls", children: [
      /* @__PURE__ */ S(
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
        (d, f) => d === "ellipsis" ? /* @__PURE__ */ S(
          "span",
          {
            className: "pagination-btn ellipsis",
            children: "..."
          },
          `e-${f}`
        ) : /* @__PURE__ */ S(
          "button",
          {
            className: `pagination-btn ${d === e ? "active" : ""}`,
            onClick: () => i(d, n),
            children: d
          },
          d
        )
      ),
      /* @__PURE__ */ S(
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
    /* @__PURE__ */ B("div", { className: "pagination-info", children: [
      /* @__PURE__ */ B("span", { children: [
        "Exibindo de ",
        l,
        " a ",
        s,
        " de ",
        r,
        " registros"
      ] }),
      /* @__PURE__ */ S("span", { className: "pagination-separator", children: "•" }),
      /* @__PURE__ */ B("div", { className: "pagination-select", children: [
        /* @__PURE__ */ S("label", { children: "Itens por página:" }),
        /* @__PURE__ */ S(
          "select",
          {
            value: n,
            onChange: (d) => i(1, Number(d.target.value)),
            children: u.map((d) => /* @__PURE__ */ S("option", { value: d, children: d }, d))
          }
        )
      ] })
    ] })
  ] });
}
function Fe(e) {
  var r = typeof e;
  return e != null && (r == "object" || r == "function");
}
var _n = typeof global == "object" && global && global.Object === Object && global, En = typeof self == "object" && self && self.Object === Object && self, pt = _n || En || Function("return this")(), ke = function() {
  return pt.Date.now();
}, Fn = /\s/;
function Mn(e) {
  for (var r = e.length; r-- && Fn.test(e.charAt(r)); )
    ;
  return r;
}
var $n = /^\s+/;
function bn(e) {
  return e && e.slice(0, Mn(e) + 1).replace($n, "");
}
var Me = pt.Symbol, ht = Object.prototype, On = ht.hasOwnProperty, Pn = ht.toString, we = Me ? Me.toStringTag : void 0;
function In(e) {
  var r = On.call(e, we), n = e[we];
  try {
    e[we] = void 0;
    var t = !0;
  } catch {
  }
  var i = Pn.call(e);
  return t && (r ? e[we] = n : delete e[we]), i;
}
var Vn = Object.prototype, An = Vn.toString;
function zn(e) {
  return An.call(e);
}
var Ln = "[object Null]", Dn = "[object Undefined]", et = Me ? Me.toStringTag : void 0;
function kn(e) {
  return e == null ? e === void 0 ? Dn : Ln : et && et in Object(e) ? In(e) : zn(e);
}
function Nn(e) {
  return e != null && typeof e == "object";
}
var Hn = "[object Symbol]";
function Gn(e) {
  return typeof e == "symbol" || Nn(e) && kn(e) == Hn;
}
var tt = NaN, Tn = /^[-+]0x[0-9a-f]+$/i, Wn = /^0b[01]+$/i, Bn = /^0o[0-7]+$/i, jn = parseInt;
function nt(e) {
  if (typeof e == "number")
    return e;
  if (Gn(e))
    return tt;
  if (Fe(e)) {
    var r = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Fe(r) ? r + "" : r;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = bn(e);
  var n = Wn.test(e);
  return n || Bn.test(e) ? jn(e.slice(2), n ? 2 : 8) : Tn.test(e) ? tt : +e;
}
var qn = "Expected a function", Xn = Math.max, Un = Math.min;
function Ee(e, r, n) {
  var t, i, o, l, s, a, u = 0, d = !1, f = !1, g = !0;
  if (typeof e != "function")
    throw new TypeError(qn);
  r = nt(r) || 0, Fe(n) && (d = !!n.leading, f = "maxWait" in n, o = f ? Xn(nt(n.maxWait) || 0, r) : o, g = "trailing" in n ? !!n.trailing : g);
  function c(x) {
    var M = t, I = i;
    return t = i = void 0, u = x, l = e.apply(I, M), l;
  }
  function h(x) {
    return u = x, s = setTimeout(m, r), d ? c(x) : l;
  }
  function p(x) {
    var M = x - a, I = x - u, j = r - M;
    return f ? Un(j, o - I) : j;
  }
  function v(x) {
    var M = x - a, I = x - u;
    return a === void 0 || M >= r || M < 0 || f && I >= o;
  }
  function m() {
    var x = ke();
    if (v(x))
      return _(x);
    s = setTimeout(m, p(x));
  }
  function _(x) {
    return s = void 0, g && t ? c(x) : (t = i = void 0, l);
  }
  function R() {
    s !== void 0 && clearTimeout(s), u = 0, t = a = i = s = void 0;
  }
  function b() {
    return s === void 0 ? l : _(ke());
  }
  function P() {
    var x = ke(), M = v(x);
    if (t = arguments, i = this, a = x, M) {
      if (s === void 0)
        return h(a);
      if (f)
        return clearTimeout(s), s = setTimeout(m, r), c(a);
    }
    return s === void 0 && (s = setTimeout(m, r)), l;
  }
  return P.cancel = R, P.flush = b, P;
}
var Yn = "Expected a function";
function Kn(e, r, n) {
  var t = !0, i = !0;
  if (typeof e != "function")
    throw new TypeError(Yn);
  return Fe(n) && (t = "leading" in n ? !!n.leading : t, i = "trailing" in n ? !!n.trailing : i), Ee(e, r, {
    leading: t,
    maxWait: r,
    trailing: i
  });
}
var pe = function() {
  return pe = Object.assign || function(r) {
    for (var n, t = 1, i = arguments.length; t < i; t++) {
      n = arguments[t];
      for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
    }
    return r;
  }, pe.apply(this, arguments);
};
function mt(e) {
  return !e || !e.ownerDocument || !e.ownerDocument.defaultView ? window : e.ownerDocument.defaultView;
}
function vt(e) {
  return !e || !e.ownerDocument ? document : e.ownerDocument;
}
var St = function(e) {
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
function wt(e, r) {
  var n;
  e && (n = e.classList).add.apply(n, r.split(" "));
}
function Ct(e, r) {
  e && r.split(" ").forEach(function(n) {
    e.classList.remove(n);
  });
}
function Rt(e) {
  return ".".concat(e.split(" ").join("."));
}
var Ke = !!(typeof window < "u" && window.document && window.document.createElement), Qn = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  addClasses: wt,
  canUseDOM: Ke,
  classNamesToQuery: Rt,
  getElementDocument: vt,
  getElementWindow: mt,
  getOptions: St,
  removeClasses: Ct
}), fe = null, rt = null;
Ke && window.addEventListener("resize", function() {
  rt !== window.devicePixelRatio && (rt = window.devicePixelRatio, fe = null);
});
function it() {
  if (fe === null) {
    if (typeof document > "u")
      return fe = 0, fe;
    var e = document.body, r = document.createElement("div");
    r.classList.add("simplebar-hide-scrollbar"), e.appendChild(r);
    var n = r.getBoundingClientRect().right;
    e.removeChild(r), fe = n;
  }
  return fe;
}
var re = mt, Ne = vt, Zn = St, ie = wt, oe = Ct, W = Rt, Ce = (
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
        var i = re(t.el);
        t.scrollXTicking || (i.requestAnimationFrame(t.scrollX), t.scrollXTicking = !0), t.scrollYTicking || (i.requestAnimationFrame(t.scrollY), t.scrollYTicking = !0), t.isScrolling || (t.isScrolling = !0, ie(t.el, t.classNames.scrolling)), t.showScrollbar("x"), t.showScrollbar("y"), t.onStopScrolling();
      }, this.scrollX = function() {
        t.axis.x.isOverflowing && t.positionScrollbar("x"), t.scrollXTicking = !1;
      }, this.scrollY = function() {
        t.axis.y.isOverflowing && t.positionScrollbar("y"), t.scrollYTicking = !1;
      }, this._onStopScrolling = function() {
        oe(t.el, t.classNames.scrolling), t.options.autoHide && (t.hideScrollbar("x"), t.hideScrollbar("y")), t.isScrolling = !1;
      }, this.onMouseEnter = function() {
        t.isMouseEntering || (ie(t.el, t.classNames.mouseEntered), t.showScrollbar("x"), t.showScrollbar("y"), t.isMouseEntering = !0), t.onMouseEntered();
      }, this._onMouseEntered = function() {
        oe(t.el, t.classNames.mouseEntered), t.options.autoHide && (t.hideScrollbar("x"), t.hideScrollbar("y")), t.isMouseEntering = !1;
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
          var v, m = t.axis[t.draggedAxis].track, _ = (l = (o = m.rect) === null || o === void 0 ? void 0 : o[t.axis[t.draggedAxis].sizeAttr]) !== null && l !== void 0 ? l : 0, R = t.axis[t.draggedAxis].scrollbar, b = (a = (s = t.contentWrapperEl) === null || s === void 0 ? void 0 : s[t.axis[t.draggedAxis].scrollSizeAttr]) !== null && a !== void 0 ? a : 0, P = parseInt((d = (u = t.elStyles) === null || u === void 0 ? void 0 : u[t.axis[t.draggedAxis].sizeAttr]) !== null && d !== void 0 ? d : "0px", 10);
          i.preventDefault(), i.stopPropagation(), t.draggedAxis === "y" ? v = i.pageY : v = i.pageX;
          var x = v - ((g = (f = m.rect) === null || f === void 0 ? void 0 : f[t.axis[t.draggedAxis].offsetAttr]) !== null && g !== void 0 ? g : 0) - t.axis[t.draggedAxis].dragOffset;
          x = t.draggedAxis === "x" && t.isRtl ? ((h = (c = m.rect) === null || c === void 0 ? void 0 : c[t.axis[t.draggedAxis].sizeAttr]) !== null && h !== void 0 ? h : 0) - R.size - x : x;
          var M = x / (_ - R.size), I = M * (b - P);
          t.draggedAxis === "x" && t.isRtl && (I = !((p = e.getRtlHelpers()) === null || p === void 0) && p.isScrollingToNegative ? -I : I), t.contentWrapperEl[t.axis[t.draggedAxis].scrollOffsetAttr] = I;
        }
      }, this.onEndDrag = function(i) {
        t.isDragging = !1;
        var o = Ne(t.el), l = re(t.el);
        i.preventDefault(), i.stopPropagation(), oe(t.el, t.classNames.dragging), t.onStopScrolling(), o.removeEventListener("mousemove", t.drag, !0), o.removeEventListener("mouseup", t.onEndDrag, !0), t.removePreventClickId = l.setTimeout(function() {
          o.removeEventListener("click", t.preventClick, !0), o.removeEventListener("dblclick", t.preventClick, !0), t.removePreventClickId = null;
        });
      }, this.preventClick = function(i) {
        i.preventDefault(), i.stopPropagation();
      }, this.el = r, this.options = pe(pe({}, e.defaultOptions), n), this.classNames = pe(pe({}, e.defaultOptions.classNames), n.classNames), this.axis = {
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
      this.onMouseMove = Kn(this._onMouseMove, 64), this.onWindowResize = Ee(this._onWindowResize, 64, { leading: !0 }), this.onStopScrolling = Ee(this._onStopScrolling, this.stopScrollDelay), this.onMouseEntered = Ee(this._onMouseEntered, this.stopScrollDelay), this.init();
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
        return this.contentWrapperEl && getComputedStyle(this.contentWrapperEl, "::-webkit-scrollbar").display === "none" || "scrollbarWidth" in document.documentElement.style || "-ms-overflow-style" in document.documentElement.style ? 0 : it();
      } catch {
        return it();
      }
    }, e.getOffset = function(r) {
      var n = r.getBoundingClientRect(), t = Ne(r), i = re(r);
      return {
        top: n.top + (i.pageYOffset || t.documentElement.scrollTop),
        left: n.left + (i.pageXOffset || t.documentElement.scrollLeft)
      };
    }, e.prototype.init = function() {
      Ke && (this.initDOM(), this.rtlHelpers = e.getRtlHelpers(), this.scrollbarWidth = this.getScrollbarWidth(), this.recalculate(), this.initListeners());
    }, e.prototype.initDOM = function() {
      var r, n;
      this.wrapperEl = this.el.querySelector(W(this.classNames.wrapper)), this.contentWrapperEl = this.options.scrollableNode || this.el.querySelector(W(this.classNames.contentWrapper)), this.contentEl = this.options.contentNode || this.el.querySelector(W(this.classNames.contentEl)), this.offsetEl = this.el.querySelector(W(this.classNames.offset)), this.maskEl = this.el.querySelector(W(this.classNames.mask)), this.placeholderEl = this.findChild(this.wrapperEl, W(this.classNames.placeholder)), this.heightAutoObserverWrapperEl = this.el.querySelector(W(this.classNames.heightAutoObserverWrapperEl)), this.heightAutoObserverEl = this.el.querySelector(W(this.classNames.heightAutoObserverEl)), this.axis.x.track.el = this.findChild(this.el, "".concat(W(this.classNames.track)).concat(W(this.classNames.horizontal))), this.axis.y.track.el = this.findChild(this.el, "".concat(W(this.classNames.track)).concat(W(this.classNames.vertical))), this.axis.x.scrollbar.el = ((r = this.axis.x.track.el) === null || r === void 0 ? void 0 : r.querySelector(W(this.classNames.scrollbar))) || null, this.axis.y.scrollbar.el = ((n = this.axis.y.track.el) === null || n === void 0 ? void 0 : n.querySelector(W(this.classNames.scrollbar))) || null, this.options.autoHide || (ie(this.axis.x.scrollbar.el, this.classNames.visible), ie(this.axis.y.scrollbar.el, this.classNames.visible));
    }, e.prototype.initListeners = function() {
      var r = this, n, t = re(this.el);
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
        var r = re(this.el);
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
      r === void 0 && (r = "y"), this.axis[r].isOverflowing && !this.axis[r].scrollbar.isVisible && (ie(this.axis[r].scrollbar.el, this.classNames.visible), this.axis[r].scrollbar.isVisible = !0);
    }, e.prototype.hideScrollbar = function(r) {
      r === void 0 && (r = "y"), !this.isDragging && this.axis[r].isOverflowing && this.axis[r].scrollbar.isVisible && (oe(this.axis[r].scrollbar.el, this.classNames.visible), this.axis[r].scrollbar.isVisible = !1);
    }, e.prototype.hideNativeScrollbar = function() {
      this.offsetEl && (this.offsetEl.style[this.isRtl ? "left" : "right"] = this.axis.y.isOverflowing || this.axis.y.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px", this.offsetEl.style.bottom = this.axis.x.isOverflowing || this.axis.x.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px");
    }, e.prototype.onMouseMoveForAxis = function(r) {
      r === void 0 && (r = "y");
      var n = this.axis[r];
      !n.track.el || !n.scrollbar.el || (n.track.rect = n.track.el.getBoundingClientRect(), n.scrollbar.rect = n.scrollbar.el.getBoundingClientRect(), this.isWithinBounds(n.track.rect) ? (this.showScrollbar(r), ie(n.track.el, this.classNames.hover), this.isWithinBounds(n.scrollbar.rect) ? ie(n.scrollbar.el, this.classNames.hover) : oe(n.scrollbar.el, this.classNames.hover)) : (oe(n.track.el, this.classNames.hover), this.options.autoHide && this.hideScrollbar(r)));
    }, e.prototype.onMouseLeaveForAxis = function(r) {
      r === void 0 && (r = "y"), oe(this.axis[r].track.el, this.classNames.hover), oe(this.axis[r].scrollbar.el, this.classNames.hover), this.options.autoHide && this.hideScrollbar(r);
    }, e.prototype.onDragStart = function(r, n) {
      var t;
      n === void 0 && (n = "y"), this.isDragging = !0;
      var i = Ne(this.el), o = re(this.el), l = this.axis[n].scrollbar, s = n === "y" ? r.pageY : r.pageX;
      this.axis[n].dragOffset = s - (((t = l.rect) === null || t === void 0 ? void 0 : t[this.axis[n].offsetAttr]) || 0), this.draggedAxis = n, ie(this.el, this.classNames.dragging), i.addEventListener("mousemove", this.drag, !0), i.addEventListener("mouseup", this.onEndDrag, !0), this.removePreventClickId === null ? (i.addEventListener("click", this.preventClick, !0), i.addEventListener("dblclick", this.preventClick, !0)) : (o.clearTimeout(this.removePreventClickId), this.removePreventClickId = null);
    }, e.prototype.onTrackClick = function(r, n) {
      var t = this, i, o, l, s;
      n === void 0 && (n = "y");
      var a = this.axis[n];
      if (!(!this.options.clickOnTrack || !a.scrollbar.el || !this.contentWrapperEl)) {
        r.preventDefault();
        var u = re(this.el);
        this.axis[n].scrollbar.rect = a.scrollbar.el.getBoundingClientRect();
        var d = this.axis[n].scrollbar, f = (o = (i = d.rect) === null || i === void 0 ? void 0 : i[this.axis[n].offsetAttr]) !== null && o !== void 0 ? o : 0, g = parseInt((s = (l = this.elStyles) === null || l === void 0 ? void 0 : l[this.axis[n].sizeAttr]) !== null && s !== void 0 ? s : "0px", 10), c = this.contentWrapperEl[this.axis[n].scrollOffsetAttr], h = n === "y" ? this.mouseY - f : this.mouseX - f, p = h < 0 ? -1 : 1, v = p === -1 ? c - g : c + g, m = 40, _ = function() {
          t.contentWrapperEl && (p === -1 ? c > v && (c -= m, t.contentWrapperEl[t.axis[n].scrollOffsetAttr] = c, u.requestAnimationFrame(_)) : c < v && (c += m, t.contentWrapperEl[t.axis[n].scrollOffsetAttr] = c, u.requestAnimationFrame(_)));
        };
        _();
      }
    }, e.prototype.getContentElement = function() {
      return this.contentEl;
    }, e.prototype.getScrollElement = function() {
      return this.contentWrapperEl;
    }, e.prototype.removeListeners = function() {
      var r = re(this.el);
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
    }, e.getOptions = Zn, e.helpers = Qn, e;
  })()
), X = function() {
  return X = Object.assign || function(r) {
    for (var n, t = 1, i = arguments.length; t < i; t++) {
      n = arguments[t];
      for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
    }
    return r;
  }, X.apply(this, arguments);
};
function Jn(e, r) {
  var n = {};
  for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && r.indexOf(t) < 0 && (n[t] = e[t]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, t = Object.getOwnPropertySymbols(e); i < t.length; i++)
      r.indexOf(t[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, t[i]) && (n[t[i]] = e[t[i]]);
  return n;
}
var yt = L.forwardRef(function(e, r) {
  var n = e.children, t = e.scrollableNodeProps, i = t === void 0 ? {} : t, o = Jn(e, ["children", "scrollableNodeProps"]), l = L.useRef(), s = L.useRef(), a = L.useRef(), u = {}, d = {};
  Object.keys(o).forEach(function(c) {
    Object.prototype.hasOwnProperty.call(Ce.defaultOptions, c) ? u[c] = o[c] : d[c] = o[c];
  });
  var f = X(X({}, Ce.defaultOptions.classNames), u.classNames), g = X(X({}, i), { className: "".concat(f.contentWrapper).concat(i.className ? " ".concat(i.className) : ""), tabIndex: u.tabIndex || Ce.defaultOptions.tabIndex, role: "region", "aria-label": u.ariaLabel || Ce.defaultOptions.ariaLabel });
  return L.useEffect(function() {
    var c;
    return s.current = g.ref ? g.ref.current : s.current, l.current && (c = new Ce(l.current, X(X(X({}, u), s.current && {
      scrollableNode: s.current
    }), a.current && {
      contentNode: a.current
    })), typeof r == "function" ? r(c) : r && (r.current = c)), function() {
      c?.unMount(), c = null, typeof r == "function" && r(null);
    };
  }, []), L.createElement(
    "div",
    X({ "data-simplebar": "init", ref: l }, d),
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
          scrollableNodeProps: X(X({}, g), { ref: s }),
          contentNodeRef: a,
          contentNodeProps: {
            className: f.contentEl,
            ref: a
          }
        }) : L.createElement(
          "div",
          X({}, g),
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
yt.displayName = "SimpleBar";
function er(e, r, n, t) {
  return Sn({
    data: r,
    columns: e,
    state: {
      columnOrder: n
    },
    onColumnOrderChange: t,
    getCoreRowModel: fn()
  });
}
function tr(e) {
  const [r, n] = K(0);
  return je(() => {
    const t = e.current;
    if (!t) return;
    const i = new ResizeObserver((o) => {
      n(o[0].contentRect.width);
    });
    return i.observe(t), () => i.disconnect();
  }, [e]), r;
}
function nr() {
  const e = k(null), r = k([]), n = Z((i) => {
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
function rr({
  onResize: e,
  onResizeEnd: r,
  minWidth: n = 40
}) {
  const t = k(0), i = k(0), o = k(null), l = Z(
    (u) => {
      if (!o.current) return;
      const d = u.clientX - t.current, f = Math.max(n, i.current + d);
      e(o.current, f);
    },
    [n, e]
  ), s = Z(() => {
    o.current = null, document.removeEventListener("mousemove", l), document.removeEventListener("mouseup", s), r?.();
  }, [l, r]);
  return { startResize: Z(
    (u, d) => {
      u.preventDefault(), u.stopPropagation(), o.current = d.id, t.current = u.clientX, i.current = qe(d.columnDef.meta?.widthSize), document.addEventListener("mousemove", l), document.addEventListener("mouseup", s);
    },
    [l, s]
  ) };
}
function ir(e) {
  const [r, n] = K(!1);
  return je(() => {
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
function or(e) {
  return de(() => {
    const r = e.getAllLeafColumns(), n = /* @__PURE__ */ new Map();
    for (const l of r)
      n.set(l.id, qe(l.columnDef.meta?.widthSize));
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
function lr({ setColumnOrder: e }) {
  const r = k(null), n = k(null), t = k(null), i = k(0), o = k(null), l = k(0), s = k([]), a = k(() => {
  }), u = k(() => {
  }), d = Z(() => {
    const c = Array.from(
      document.querySelectorAll("th[data-col-id]")
    );
    s.current = c.filter((h) => h.dataset.reorderable !== "false").map((h) => {
      const p = h.dataset.colId, v = h.getBoundingClientRect();
      return {
        id: p,
        left: v.left,
        right: v.right,
        center: v.left + v.width / 2
      };
    }).sort((h, p) => h.left - p.left);
  }, []), f = Z((c) => {
    const h = c.getBoundingClientRect(), p = c.cloneNode(!0);
    return p.classList.add("table-col-ghost"), p.style.position = "fixed", p.style.left = `${h.left}px`, p.style.top = `${h.top}px`, p.style.width = `${h.width}px`, p.style.height = `${h.height}px`, p.style.pointerEvents = "none", p.style.zIndex = "9999", p.style.willChange = "left", p.style.transition = "none", document.body.appendChild(p), p;
  }, []), g = Z(
    (c, h) => {
      r.current = c;
      const p = document.querySelector(`th[data-col-id="${c}"]`);
      if (!p) return;
      t.current = p;
      const v = p.getBoundingClientRect();
      i.current = h.clientX - v.left;
      const m = f(p);
      n.current = m, p.classList.add("is-dragging-col"), p.style.opacity = "0.2", d(), l.current = h.clientX, document.body.style.cursor = "grabbing", document.addEventListener("pointermove", a.current), document.addEventListener("pointerup", u.current);
    },
    [f, d]
  );
  return a.current = (c) => {
    !r.current || !n.current || (l.current = c.clientX, !o.current && (o.current = requestAnimationFrame(() => {
      if (o.current = null, !r.current || !n.current) return;
      const h = n.current, p = l.current - i.current;
      h.style.left = `${p}px`;
      const v = h.offsetWidth, m = p + v / 2, _ = s.current;
      if (!_.length) return;
      let R = null;
      for (const b of _)
        if (b.id !== r.current && m >= b.left && m <= b.right) {
          R = b.id;
          break;
        }
      !R || R === r.current || (e((b) => {
        const P = b.indexOf(r.current), x = b.indexOf(R);
        if (P === -1 || x === -1 || P === x) return b;
        const M = [...b];
        return M.splice(P, 1), M.splice(x, 0, r.current), M;
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
function sr(e) {
  return "accessorKey" in e && typeof e.accessorKey == "string";
}
function ar(e) {
  return e.map((r) => {
    if (r.id)
      return r;
    if (sr(r))
      return {
        ...r,
        id: r.accessorKey
      };
    throw new Error(
      "Columns sem id e sem accessorKey string. Defina um id explicitamente para esta coluna."
    );
  });
}
function ur(e) {
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
function cr(e, r) {
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
function dr(e) {
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
function pr({
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
  pagination: v,
  hoverableRow: m,
  borders: _
}) {
  const R = k(null), b = Z(
    (V) => {
      R.current = V;
    },
    []
  ), [P, x] = K(null), M = Z(
    (V) => {
      x(V), s?.(V);
    },
    [s]
  ), {
    bodyRef: I,
    registerSyncElement: j,
    onBodyScroll: ae
  } = nr(), q = tr(I), ne = ir(I), [ue, ce] = K({}), he = de(
    () => new Set(h?.initialSelectRow || []),
    [h?.initialSelectRow]
  ), [A, $] = K(he), [y, O] = K(/* @__PURE__ */ new Set()), D = de(
    () => ar(
      (() => {
        const V = [];
        return g && V.push(ur(c)), h && V.push(cr(
          h.sticky,
          h.label
        )), p && V.push(dr(p.sticky)), [...V, ...e];
      })()
    ),
    [
      e,
      g,
      c,
      h,
      p
    ]
  ), [H, E] = K(
    () => D.map((V) => V.id)
  ), [T, G] = K(r);
  Qe(() => {
    G(r);
  }, [r]), Qe(() => {
    a?.(T);
  }, [T, a]);
  const J = de(
    () => D.map((V) => ({
      ...V,
      meta: {
        ...V.meta,
        widthSize: ue[V.id] ?? V.meta?.widthSize
      }
    })),
    [D, ue]
  ), Y = er(
    J,
    T,
    H,
    E
  ), F = or(Y), { startResize: ge } = rr({
    onResize: (V, me) => {
      ce((ve) => ({
        ...ve,
        [V]: `${me}px`
      }));
    },
    onResizeEnd: () => {
      requestAnimationFrame(() => {
        R.current?.recalculate();
      });
    }
  }), { startDrag: z } = lr({
    setColumnOrder: E
  });
  return je(() => {
    R.current?.recalculate();
  }, [ne]), /* @__PURE__ */ B("div", { className: `table-wrapper borders-${_}`, style: { height: t }, children: [
    /* @__PURE__ */ S(
      _t,
      {
        table: Y,
        scrollRef: j,
        tableWidth: q,
        stickyById: F,
        resizableCol: i,
        reorderableCol: o,
        sortableCol: l,
        sortState: P,
        setSortState: M,
        onResizeStart: ge,
        onDragStart: z,
        defaultTextAlign: d,
        selectable: h,
        selectedRows: A,
        setSelectedRows: $,
        disableSelectRow: h?.disableSelectRow || [],
        data: r,
        expandable: p,
        expandedRows: y,
        setExpandedRows: O
      }
    ),
    /* @__PURE__ */ B("div", { className: "internal-table", children: [
      /* @__PURE__ */ S(
        Et,
        {
          table: Y,
          scrollRef: j,
          tableWidth: q,
          stickyById: F,
          defaultTextAlign: d
        }
      ),
      /* @__PURE__ */ B("div", { className: `table-body-area ${ne ? "has-h-scroll" : "no-h-scroll"}`, children: [
        /* @__PURE__ */ S(
          yt,
          {
            ref: b,
            className: "table-body-scroll",
            scrollableNodeProps: {
              ref: I,
              onScroll: ae
            },
            children: /* @__PURE__ */ S(
              wn,
              {
                table: Y,
                tableWidth: q,
                stickyById: F,
                defaultTextAlign: d,
                editable: f,
                draggable: g,
                setData: G,
                setInternalData: G,
                selectable: h,
                selectedRows: A,
                setSelectedRows: $,
                disableSelectRow: h?.disableSelectRow || [],
                expandable: p,
                expandedRows: y,
                setExpandedRows: O,
                stripedRows: u,
                hoverableRow: m
              }
            )
          }
        ),
        /* @__PURE__ */ S(
          Cn,
          {
            table: Y,
            scrollRef: j,
            tableWidth: q,
            stickyById: F,
            defaultTextAlign: d
          }
        )
      ] })
    ] }),
    n && /* @__PURE__ */ S(Rn, { table: Y, children: n }),
    v && /* @__PURE__ */ S(
      xn,
      {
        currentPage: v.currentPage,
        totalItems: v.totalItems,
        pageSize: v.pageSize,
        pageSizeOptions: v.pageSizeOptions,
        onPageChange: v.onPageChange
      }
    )
  ] });
}
export {
  pr as Table
};
