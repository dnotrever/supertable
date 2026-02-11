import { jsx as m, jsxs as W } from "react/jsx-runtime";
import * as V from "react";
import { useMemo as we, useRef as H, useState as Y, useLayoutEffect as nt, useCallback as ee, useEffect as Ie } from "react";
function At(e) {
  const r = e.columnDef.meta;
  return !(r?.resizable === !1 || r?.sticky && r.resizable !== !0);
}
function Oe(e, r) {
  return e.columnDef.meta?.textAlign ?? r;
}
function rt(e) {
  return e && e.endsWith("px") ? parseFloat(e) : 0;
}
function ke({ table: e, tableWidth: r }) {
  const n = e.getAllLeafColumns(), o = n.map(
    (l) => rt(l.columnDef.meta?.widthSize)
  ).reduce((l, s) => l + s, 0) > r;
  return /* @__PURE__ */ m("colgroup", { children: n.map((l, s) => {
    const a = l.columnDef.meta, u = s === n.length - 1;
    let d;
    return !o && u ? d = { width: "auto" } : a?.widthSize && (d = { width: a.widthSize }), /* @__PURE__ */ m("col", { style: d }, l.id);
  }) });
}
function Vt({
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
  disableSelectRow: f,
  onDragStart: c,
  scrollRef: h,
  onResizeStart: g,
  setSelectedRows: S,
  expandable: v,
  expandedRows: b,
  setExpandedRows: E
}) {
  const M = n.map((z, $) => typeof z == "object" && z !== null && "id" in z ? z.id ?? $ : $), P = !!d, x = d?.label, F = M.filter((z) => !f.includes(z)), O = F.filter((z) => p.has(z)).length, j = O === F.length && F.length > 0, te = O > 0 && O < F.length, le = () => {
    S((z) => {
      const $ = new Set(z);
      return j ? F.forEach((T) => $.delete(T)) : F.forEach((T) => $.add(T)), $;
    });
  }, se = !!v, ye = v?.expandAllButton || !1, ae = M.every((z) => b.has(z)), he = () => {
    E(ae ? /* @__PURE__ */ new Set() : new Set(M));
  };
  return /* @__PURE__ */ m("div", { className: "table-scroll-sync", ref: h, children: /* @__PURE__ */ W("table", { className: "table table-external-header", children: [
    /* @__PURE__ */ m(
      ke,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ m("thead", { children: e.getHeaderGroups().map((z) => /* @__PURE__ */ m("tr", { children: z.headers.map(($) => {
      const T = $.column.columnDef.meta, q = t.get($.column.id), xe = Oe($.column, u), me = o && T?.reorderable !== !1 && !T?.sticky, Q = (T?.sortable ?? l) && !T?.sticky && !["__draggable__", "__selectable__", "__expandable__"].includes($.column.id), ve = s?.columnId === $.column.id, R = () => {
        if (!Q) return;
        let y;
        !s || s.columnId !== $.column.id ? y = { columnId: $.column.id, direction: "asc" } : s.direction === "asc" ? y = { columnId: $.column.id, direction: "desc" } : y = null, a(y);
      }, I = [
        q ? "is-sticky" : "",
        q?.side === "left" ? "is-sticky-left" : "",
        q?.side === "right" ? "is-sticky-right" : "",
        Q ? "is-sortable" : "",
        ve ? `is-sorted-${s.direction}` : ""
      ].filter(Boolean).join(" "), k = q ? q.side === "left" ? { "--sticky-left": `${q.offset}px` } : { "--sticky-right": `${q.offset}px` } : void 0;
      return /* @__PURE__ */ m(
        "th",
        {
          "data-col-id": $.column.id,
          "data-fixed": T?.sticky ? "true" : void 0,
          "data-reorderable": me ? void 0 : "false",
          className: I,
          style: k,
          onClick: R,
          children: /* @__PURE__ */ W("div", { className: `th-content align-${xe}`, children: [
            /* @__PURE__ */ m("div", { children: $.isPlaceholder ? null : $.column.id === "__selectable__" && P ? /* @__PURE__ */ W("label", { children: [
              /* @__PURE__ */ m(
                "input",
                {
                  type: "checkbox",
                  checked: j,
                  ref: (y) => {
                    y && (y.indeterminate = te);
                  },
                  onChange: le
                }
              ),
              x
            ] }) : $.column.id === "__expandable__" && se && ye ? /* @__PURE__ */ m(
              "button",
              {
                onClick: he,
                className: `expand-all-button ${ae ? "expanded" : ""}`,
                children: "⇅"
              }
            ) : (() => {
              const y = $.column.columnDef.header;
              return typeof y == "function" ? y({ column: $.column, table: e, header: $ }) : y;
            })() }),
            Q && /* @__PURE__ */ m("span", { className: "sort-indicator" }),
            me && /* @__PURE__ */ m(
              "span",
              {
                className: "col-drag-handle",
                onClick: (y) => y.stopPropagation(),
                onPointerDown: (y) => {
                  y.preventDefault(), y.currentTarget.setPointerCapture(y.pointerId), c?.($.column.id, y.nativeEvent);
                },
                children: "☰"
              }
            ),
            i && g && At($.column) && /* @__PURE__ */ m(
              "span",
              {
                className: "col-resize-handle",
                onClick: (y) => y.stopPropagation(),
                onMouseDown: (y) => g(y, $.column)
              }
            )
          ] })
        },
        $.id
      );
    }) }, z.id)) })
  ] }) });
}
function zt({
  table: e,
  tableWidth: r,
  stickyById: n,
  defaultTextAlign: t,
  scrollRef: i
}) {
  return e.getAllLeafColumns().some(
    (s) => s.columnDef.meta?.internalHeader != null
  ) ? /* @__PURE__ */ m("div", { className: "table-scroll-sync", ref: i, children: /* @__PURE__ */ W("table", { className: "table table-internal-header", children: [
    /* @__PURE__ */ m(
      ke,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ m("thead", { children: /* @__PURE__ */ m("tr", { children: e.getAllLeafColumns().map((s) => {
      const a = s.columnDef.meta?.internalHeader, u = n.get(s.id), d = Oe(s, t), p = [
        u ? "is-sticky" : "",
        u?.side === "left" ? "is-sticky-left" : "",
        u?.side === "right" ? "is-sticky-right" : ""
      ].filter(Boolean).join(" "), f = u ? u.side === "left" ? { "--sticky-left": `${u.offset}px` } : { "--sticky-right": `${u.offset}px` } : void 0;
      return /* @__PURE__ */ m(
        "th",
        {
          className: `${p} align-${d}`,
          style: f,
          children: typeof a == "function" ? a() : a ?? null
        },
        s.id
      );
    }) }) })
  ] }) }) : null;
}
function fe(e, r) {
  return typeof e == "function" ? e(r) : e;
}
function U(e, r) {
  return (n) => {
    r.setState((t) => ({
      ...t,
      [e]: fe(n, t[e])
    }));
  };
}
function Ne(e) {
  return e instanceof Function;
}
function Dt(e) {
  return Array.isArray(e) && e.every((r) => typeof r == "number");
}
function Lt(e, r) {
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
      const d = Math.round((Date.now() - l) * 100) / 100, p = Math.round((Date.now() - u) * 100) / 100, f = p / 16, c = (h, g) => {
        for (h = String(h); h.length < g; )
          h = " " + h;
        return h;
      };
      console.info(`%c⏱ ${c(p, 5)} /${c(d, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * f, 120))}deg 100% 31%);`, n?.key);
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
function kt(e, r, n, t) {
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
function Nt(e, r, n, t) {
  var i, o;
  const s = {
    ...e._getDefaultColumnDef(),
    ...r
  }, a = s.accessorKey;
  let u = (i = (o = s.id) != null ? o : a ? typeof String.prototype.replaceAll == "function" ? a.replaceAll(".", "_") : a.replace(/\./g, "_") : void 0) != null ? i : typeof s.header == "string" ? s.header : void 0, d;
  if (s.accessorFn ? d = s.accessorFn : a && (a.includes(".") ? d = (f) => {
    let c = f;
    for (const g of a.split(".")) {
      var h;
      c = (h = c) == null ? void 0 : h[g], process.env.NODE_ENV !== "production" && c === void 0 && console.warn(`"${g}" in deeply nested key "${a}" returned undefined.`);
    }
    return c;
  } : d = (f) => f[s.accessorKey]), !u)
    throw process.env.NODE_ENV !== "production" ? new Error(s.accessorFn ? "Columns require an id when using an accessorFn" : "Columns require an id when using a non-string header") : new Error();
  let p = {
    id: `${String(u)}`,
    accessorFn: d,
    parent: t,
    depth: n,
    columnDef: s,
    columns: [],
    getFlatColumns: w(() => [!0], () => {
      var f;
      return [p, ...(f = p.columns) == null ? void 0 : f.flatMap((c) => c.getFlatColumns())];
    }, C(e.options, "debugColumns", "column.getFlatColumns")),
    getLeafColumns: w(() => [e._getOrderColumnsFn()], (f) => {
      var c;
      if ((c = p.columns) != null && c.length) {
        let h = p.columns.flatMap((g) => g.getLeafColumns());
        return f(h);
      }
      return [p];
    }, C(e.options, "debugColumns", "column.getLeafColumns"))
  };
  for (const f of e._features)
    f.createColumn == null || f.createColumn(p, e);
  return p;
}
const G = "debugHeaders";
function at(e, r, n) {
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
const Ht = {
  createTable: (e) => {
    e.getHeaderGroups = w(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (r, n, t, i) => {
      var o, l;
      const s = (o = t?.map((p) => n.find((f) => f.id === p)).filter(Boolean)) != null ? o : [], a = (l = i?.map((p) => n.find((f) => f.id === p)).filter(Boolean)) != null ? l : [], u = n.filter((p) => !(t != null && t.includes(p.id)) && !(i != null && i.includes(p.id)));
      return Pe(r, [...s, ...u, ...a], e);
    }, C(e.options, G, "getHeaderGroups")), e.getCenterHeaderGroups = w(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (r, n, t, i) => (n = n.filter((o) => !(t != null && t.includes(o.id)) && !(i != null && i.includes(o.id))), Pe(r, n, e, "center")), C(e.options, G, "getCenterHeaderGroups")), e.getLeftHeaderGroups = w(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left], (r, n, t) => {
      var i;
      const o = (i = t?.map((l) => n.find((s) => s.id === l)).filter(Boolean)) != null ? i : [];
      return Pe(r, o, e, "left");
    }, C(e.options, G, "getLeftHeaderGroups")), e.getRightHeaderGroups = w(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.right], (r, n, t) => {
      var i;
      const o = (i = t?.map((l) => n.find((s) => s.id === l)).filter(Boolean)) != null ? i : [];
      return Pe(r, o, e, "right");
    }, C(e.options, G, "getRightHeaderGroups")), e.getFooterGroups = w(() => [e.getHeaderGroups()], (r) => [...r].reverse(), C(e.options, G, "getFooterGroups")), e.getLeftFooterGroups = w(() => [e.getLeftHeaderGroups()], (r) => [...r].reverse(), C(e.options, G, "getLeftFooterGroups")), e.getCenterFooterGroups = w(() => [e.getCenterHeaderGroups()], (r) => [...r].reverse(), C(e.options, G, "getCenterFooterGroups")), e.getRightFooterGroups = w(() => [e.getRightHeaderGroups()], (r) => [...r].reverse(), C(e.options, G, "getRightFooterGroups")), e.getFlatHeaders = w(() => [e.getHeaderGroups()], (r) => r.map((n) => n.headers).flat(), C(e.options, G, "getFlatHeaders")), e.getLeftFlatHeaders = w(() => [e.getLeftHeaderGroups()], (r) => r.map((n) => n.headers).flat(), C(e.options, G, "getLeftFlatHeaders")), e.getCenterFlatHeaders = w(() => [e.getCenterHeaderGroups()], (r) => r.map((n) => n.headers).flat(), C(e.options, G, "getCenterFlatHeaders")), e.getRightFlatHeaders = w(() => [e.getRightHeaderGroups()], (r) => r.map((n) => n.headers).flat(), C(e.options, G, "getRightFlatHeaders")), e.getCenterLeafHeaders = w(() => [e.getCenterFlatHeaders()], (r) => r.filter((n) => {
      var t;
      return !((t = n.subHeaders) != null && t.length);
    }), C(e.options, G, "getCenterLeafHeaders")), e.getLeftLeafHeaders = w(() => [e.getLeftFlatHeaders()], (r) => r.filter((n) => {
      var t;
      return !((t = n.subHeaders) != null && t.length);
    }), C(e.options, G, "getLeftLeafHeaders")), e.getRightLeafHeaders = w(() => [e.getRightFlatHeaders()], (r) => r.filter((n) => {
      var t;
      return !((t = n.subHeaders) != null && t.length);
    }), C(e.options, G, "getRightLeafHeaders")), e.getLeafHeaders = w(() => [e.getLeftHeaderGroups(), e.getCenterHeaderGroups(), e.getRightHeaderGroups()], (r, n, t) => {
      var i, o, l, s, a, u;
      return [...(i = (o = r[0]) == null ? void 0 : o.headers) != null ? i : [], ...(l = (s = n[0]) == null ? void 0 : s.headers) != null ? l : [], ...(a = (u = t[0]) == null ? void 0 : u.headers) != null ? a : []].map((d) => d.getLeafHeaders()).flat();
    }, C(e.options, G, "getLeafHeaders"));
  }
};
function Pe(e, r, n, t) {
  var i, o;
  let l = 0;
  const s = function(f, c) {
    c === void 0 && (c = 1), l = Math.max(l, c), f.filter((h) => h.getIsVisible()).forEach((h) => {
      var g;
      (g = h.columns) != null && g.length && s(h.columns, c + 1);
    }, 0);
  };
  s(e);
  let a = [];
  const u = (f, c) => {
    const h = {
      depth: c,
      id: [t, `${c}`].filter(Boolean).join("_"),
      headers: []
    }, g = [];
    f.forEach((S) => {
      const v = [...g].reverse()[0], b = S.column.depth === h.depth;
      let E, M = !1;
      if (b && S.column.parent ? E = S.column.parent : (E = S.column, M = !0), v && v?.column === E)
        v.subHeaders.push(S);
      else {
        const P = at(n, E, {
          id: [t, c, E.id, S?.id].filter(Boolean).join("_"),
          isPlaceholder: M,
          placeholderId: M ? `${g.filter((x) => x.column === E).length}` : void 0,
          depth: c,
          index: g.length
        });
        P.subHeaders.push(S), g.push(P);
      }
      h.headers.push(S), S.headerGroup = h;
    }), a.push(h), c > 0 && u(g, c - 1);
  }, d = r.map((f, c) => at(n, f, {
    depth: l,
    index: c
  }));
  u(d, l - 1), a.reverse();
  const p = (f) => f.filter((h) => h.column.getIsVisible()).map((h) => {
    let g = 0, S = 0, v = [0];
    h.subHeaders && h.subHeaders.length ? (v = [], p(h.subHeaders).forEach((E) => {
      let {
        colSpan: M,
        rowSpan: P
      } = E;
      g += M, v.push(P);
    })) : g = 1;
    const b = Math.min(...v);
    return S = S + b, h.colSpan = g, h.rowSpan = S, {
      colSpan: g,
      rowSpan: S
    };
  });
  return p((i = (o = a[0]) == null ? void 0 : o.headers) != null ? i : []), a;
}
const Gt = (e, r, n, t, i, o, l) => {
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
    getLeafRows: () => Lt(s.subRows, (a) => a.subRows),
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
    getAllCells: w(() => [e.getAllLeafColumns()], (a) => a.map((u) => kt(e, s, u, u.id)), C(e.options, "debugRows", "getAllCells")),
    _getAllCellsByColumnId: w(() => [s.getAllCells()], (a) => a.reduce((u, d) => (u[d.column.id] = d, u), {}), C(e.options, "debugRows", "getAllCellsByColumnId"))
  };
  for (let a = 0; a < e._features.length; a++) {
    const u = e._features[a];
    u == null || u.createRow == null || u.createRow(s, e);
  }
  return s;
}, Tt = {
  createColumn: (e, r) => {
    e._getFacetedRowModel = r.options.getFacetedRowModel && r.options.getFacetedRowModel(r, e.id), e.getFacetedRowModel = () => e._getFacetedRowModel ? e._getFacetedRowModel() : r.getPreFilteredRowModel(), e._getFacetedUniqueValues = r.options.getFacetedUniqueValues && r.options.getFacetedUniqueValues(r, e.id), e.getFacetedUniqueValues = () => e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getFacetedMinMaxValues = r.options.getFacetedMinMaxValues && r.options.getFacetedMinMaxValues(r, e.id), e.getFacetedMinMaxValues = () => {
      if (e._getFacetedMinMaxValues)
        return e._getFacetedMinMaxValues();
    };
  }
}, ht = (e, r, n) => {
  var t, i;
  const o = n == null || (t = n.toString()) == null ? void 0 : t.toLowerCase();
  return !!(!((i = e.getValue(r)) == null || (i = i.toString()) == null || (i = i.toLowerCase()) == null) && i.includes(o));
};
ht.autoRemove = (e) => K(e);
const mt = (e, r, n) => {
  var t;
  return !!(!((t = e.getValue(r)) == null || (t = t.toString()) == null) && t.includes(n));
};
mt.autoRemove = (e) => K(e);
const vt = (e, r, n) => {
  var t;
  return ((t = e.getValue(r)) == null || (t = t.toString()) == null ? void 0 : t.toLowerCase()) === n?.toLowerCase();
};
vt.autoRemove = (e) => K(e);
const St = (e, r, n) => {
  var t;
  return (t = e.getValue(r)) == null ? void 0 : t.includes(n);
};
St.autoRemove = (e) => K(e);
const wt = (e, r, n) => !n.some((t) => {
  var i;
  return !((i = e.getValue(r)) != null && i.includes(t));
});
wt.autoRemove = (e) => K(e) || !(e != null && e.length);
const Ct = (e, r, n) => n.some((t) => {
  var i;
  return (i = e.getValue(r)) == null ? void 0 : i.includes(t);
});
Ct.autoRemove = (e) => K(e) || !(e != null && e.length);
const Rt = (e, r, n) => e.getValue(r) === n;
Rt.autoRemove = (e) => K(e);
const yt = (e, r, n) => e.getValue(r) == n;
yt.autoRemove = (e) => K(e);
const it = (e, r, n) => {
  let [t, i] = n;
  const o = e.getValue(r);
  return o >= t && o <= i;
};
it.resolveFilterValue = (e) => {
  let [r, n] = e, t = typeof r != "number" ? parseFloat(r) : r, i = typeof n != "number" ? parseFloat(n) : n, o = r === null || Number.isNaN(t) ? -1 / 0 : t, l = n === null || Number.isNaN(i) ? 1 / 0 : i;
  if (o > l) {
    const s = o;
    o = l, l = s;
  }
  return [o, l];
};
it.autoRemove = (e) => K(e) || K(e[0]) && K(e[1]);
const oe = {
  includesString: ht,
  includesStringSensitive: mt,
  equalsString: vt,
  arrIncludes: St,
  arrIncludesAll: wt,
  arrIncludesSome: Ct,
  equals: Rt,
  weakEquals: yt,
  inNumberRange: it
};
function K(e) {
  return e == null || e === "";
}
const Wt = {
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
      return typeof t == "string" ? oe.includesString : typeof t == "number" ? oe.inNumberRange : typeof t == "boolean" || t !== null && typeof t == "object" ? oe.equals : Array.isArray(t) ? oe.arrIncludes : oe.weakEquals;
    }, e.getFilterFn = () => {
      var n, t;
      return Ne(e.columnDef.filterFn) ? e.columnDef.filterFn : e.columnDef.filterFn === "auto" ? e.getAutoFilterFn() : (
        // @ts-ignore
        (n = (t = r.options.filterFns) == null ? void 0 : t[e.columnDef.filterFn]) != null ? n : oe[e.columnDef.filterFn]
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
        const i = e.getFilterFn(), o = t?.find((d) => d.id === e.id), l = fe(n, o ? o.value : void 0);
        if (ut(i, l, e)) {
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
        return (o = fe(r, i)) == null ? void 0 : o.filter((l) => {
          const s = n.find((a) => a.id === l.id);
          if (s) {
            const a = s.getFilterFn();
            if (ut(a, l.value, s))
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
function ut(e, r, n) {
  return (e && e.autoRemove ? e.autoRemove(r, n) : !1) || typeof r > "u" || typeof r == "string" && !r;
}
const Bt = (e, r, n) => n.reduce((t, i) => {
  const o = i.getValue(e);
  return t + (typeof o == "number" ? o : 0);
}, 0), jt = (e, r, n) => {
  let t;
  return n.forEach((i) => {
    const o = i.getValue(e);
    o != null && (t > o || t === void 0 && o >= o) && (t = o);
  }), t;
}, qt = (e, r, n) => {
  let t;
  return n.forEach((i) => {
    const o = i.getValue(e);
    o != null && (t < o || t === void 0 && o >= o) && (t = o);
  }), t;
}, Xt = (e, r, n) => {
  let t, i;
  return n.forEach((o) => {
    const l = o.getValue(e);
    l != null && (t === void 0 ? l >= l && (t = i = l) : (t > l && (t = l), i < l && (i = l)));
  }), [t, i];
}, Ut = (e, r) => {
  let n = 0, t = 0;
  if (r.forEach((i) => {
    let o = i.getValue(e);
    o != null && (o = +o) >= o && (++n, t += o);
  }), n) return t / n;
}, Yt = (e, r) => {
  if (!r.length)
    return;
  const n = r.map((o) => o.getValue(e));
  if (!Dt(n))
    return;
  if (n.length === 1)
    return n[0];
  const t = Math.floor(n.length / 2), i = n.sort((o, l) => o - l);
  return n.length % 2 !== 0 ? i[t] : (i[t - 1] + i[t]) / 2;
}, Kt = (e, r) => Array.from(new Set(r.map((n) => n.getValue(e))).values()), Qt = (e, r) => new Set(r.map((n) => n.getValue(e))).size, Zt = (e, r) => r.length, Te = {
  sum: Bt,
  min: jt,
  max: qt,
  extent: Xt,
  mean: Ut,
  median: Yt,
  unique: Kt,
  uniqueCount: Qt,
  count: Zt
}, Jt = {
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
        return Te.sum;
      if (Object.prototype.toString.call(t) === "[object Date]")
        return Te.extent;
    }, e.getAggregationFn = () => {
      var n, t;
      if (!e)
        throw new Error();
      return Ne(e.columnDef.aggregationFn) ? e.columnDef.aggregationFn : e.columnDef.aggregationFn === "auto" ? e.getAutoAggregationFn() : (n = (t = r.options.aggregationFns) == null ? void 0 : t[e.columnDef.aggregationFn]) != null ? n : Te[e.columnDef.aggregationFn];
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
function en(e, r, n) {
  if (!(r != null && r.length) || !n)
    return e;
  const t = e.filter((o) => !r.includes(o.id));
  return n === "remove" ? t : [...r.map((o) => e.find((l) => l.id === o)).filter(Boolean), ...t];
}
const tn = {
  getInitialState: (e) => ({
    columnOrder: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnOrderChange: U("columnOrder", e)
  }),
  createColumn: (e, r) => {
    e.getIndex = w((n) => [Me(r, n)], (n) => n.findIndex((t) => t.id === e.id), C(r.options, "debugColumns", "getIndex")), e.getIsFirstColumn = (n) => {
      var t;
      return ((t = Me(r, n)[0]) == null ? void 0 : t.id) === e.id;
    }, e.getIsLastColumn = (n) => {
      var t;
      const i = Me(r, n);
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
      return en(o, n, t);
    }, C(e.options, "debugTable", "_getOrderColumnsFn"));
  }
}, We = () => ({
  left: [],
  right: []
}), nn = {
  getInitialState: (e) => ({
    columnPinning: We(),
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
      return e.setColumnPinning(r ? We() : (n = (t = e.initialState) == null ? void 0 : t.columnPinning) != null ? n : We());
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
function rn(e) {
  return e || (typeof document < "u" ? document : null);
}
const Ae = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
}, Be = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: !1,
  columnSizingStart: []
}), on = {
  getDefaultColumnDef: () => Ae,
  getInitialState: (e) => ({
    columnSizing: {},
    columnSizingInfo: Be(),
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
      return Math.min(Math.max((n = e.columnDef.minSize) != null ? n : Ae.minSize, (t = o ?? e.columnDef.size) != null ? t : Ae.size), (i = e.columnDef.maxSize) != null ? i : Ae.maxSize);
    }, e.getStart = w((n) => [n, Me(r, n), r.getState().columnSizing], (n, t) => t.slice(0, e.getIndex(n)).reduce((i, o) => i + o.getSize(), 0), C(r.options, "debugColumns", "getStart")), e.getAfter = w((n) => [n, Me(r, n), r.getState().columnSizing], (n, t) => t.slice(e.getIndex(n) + 1).reduce((i, o) => i + o.getSize(), 0), C(r.options, "debugColumns", "getAfter")), e.resetSize = () => {
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
        if (!t || !i || (o.persist == null || o.persist(), je(o) && o.touches && o.touches.length > 1))
          return;
        const l = e.getSize(), s = e ? e.getLeafHeaders().map((v) => [v.column.id, v.column.getSize()]) : [[t.id, t.getSize()]], a = je(o) ? Math.round(o.touches[0].clientX) : o.clientX, u = {}, d = (v, b) => {
          typeof b == "number" && (r.setColumnSizingInfo((E) => {
            var M, P;
            const x = r.options.columnResizeDirection === "rtl" ? -1 : 1, F = (b - ((M = E?.startOffset) != null ? M : 0)) * x, O = Math.max(F / ((P = E?.startSize) != null ? P : 0), -0.999999);
            return E.columnSizingStart.forEach((j) => {
              let [te, le] = j;
              u[te] = Math.round(Math.max(le + le * O, 0) * 100) / 100;
            }), {
              ...E,
              deltaOffset: F,
              deltaPercentage: O
            };
          }), (r.options.columnResizeMode === "onChange" || v === "end") && r.setColumnSizing((E) => ({
            ...E,
            ...u
          })));
        }, p = (v) => d("move", v), f = (v) => {
          d("end", v), r.setColumnSizingInfo((b) => ({
            ...b,
            isResizingColumn: !1,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        }, c = rn(n), h = {
          moveHandler: (v) => p(v.clientX),
          upHandler: (v) => {
            c?.removeEventListener("mousemove", h.moveHandler), c?.removeEventListener("mouseup", h.upHandler), f(v.clientX);
          }
        }, g = {
          moveHandler: (v) => (v.cancelable && (v.preventDefault(), v.stopPropagation()), p(v.touches[0].clientX), !1),
          upHandler: (v) => {
            var b;
            c?.removeEventListener("touchmove", g.moveHandler), c?.removeEventListener("touchend", g.upHandler), v.cancelable && (v.preventDefault(), v.stopPropagation()), f((b = v.touches[0]) == null ? void 0 : b.clientX);
          }
        }, S = ln() ? {
          passive: !1
        } : !1;
        je(o) ? (c?.addEventListener("touchmove", g.moveHandler, S), c?.addEventListener("touchend", g.upHandler, S)) : (c?.addEventListener("mousemove", h.moveHandler, S), c?.addEventListener("mouseup", h.upHandler, S)), r.setColumnSizingInfo((v) => ({
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
      e.setColumnSizingInfo(r ? Be() : (n = e.initialState.columnSizingInfo) != null ? n : Be());
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
let Ve = null;
function ln() {
  if (typeof Ve == "boolean") return Ve;
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
  return Ve = e, Ve;
}
function je(e) {
  return e.type === "touchstart";
}
const sn = {
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
function Me(e, r) {
  return r ? r === "center" ? e.getCenterVisibleLeafColumns() : r === "left" ? e.getLeftVisibleLeafColumns() : e.getRightVisibleLeafColumns() : e.getVisibleLeafColumns();
}
const an = {
  createTable: (e) => {
    e._getGlobalFacetedRowModel = e.options.getFacetedRowModel && e.options.getFacetedRowModel(e, "__global__"), e.getGlobalFacetedRowModel = () => e.options.manualFiltering || !e._getGlobalFacetedRowModel ? e.getPreFilteredRowModel() : e._getGlobalFacetedRowModel(), e._getGlobalFacetedUniqueValues = e.options.getFacetedUniqueValues && e.options.getFacetedUniqueValues(e, "__global__"), e.getGlobalFacetedUniqueValues = () => e._getGlobalFacetedUniqueValues ? e._getGlobalFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getGlobalFacetedMinMaxValues = e.options.getFacetedMinMaxValues && e.options.getFacetedMinMaxValues(e, "__global__"), e.getGlobalFacetedMinMaxValues = () => {
      if (e._getGlobalFacetedMinMaxValues)
        return e._getGlobalFacetedMinMaxValues();
    };
  }
}, un = {
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
    e.getGlobalAutoFilterFn = () => oe.includesString, e.getGlobalFilterFn = () => {
      var r, n;
      const {
        globalFilterFn: t
      } = e.options;
      return Ne(t) ? t : t === "auto" ? e.getGlobalAutoFilterFn() : (r = (n = e.options.filterFns) == null ? void 0 : n[t]) != null ? r : oe[t];
    }, e.setGlobalFilter = (r) => {
      e.options.onGlobalFilterChange == null || e.options.onGlobalFilterChange(r);
    }, e.resetGlobalFilter = (r) => {
      e.setGlobalFilter(r ? void 0 : e.initialState.globalFilter);
    };
  }
}, cn = {
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
}, Qe = 0, Ze = 10, qe = () => ({
  pageIndex: Qe,
  pageSize: Ze
}), dn = {
  getInitialState: (e) => ({
    ...e,
    pagination: {
      ...qe(),
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
      const i = (o) => fe(t, o);
      return e.options.onPaginationChange == null ? void 0 : e.options.onPaginationChange(i);
    }, e.resetPagination = (t) => {
      var i;
      e.setPagination(t ? qe() : (i = e.initialState.pagination) != null ? i : qe());
    }, e.setPageIndex = (t) => {
      e.setPagination((i) => {
        let o = fe(t, i.pageIndex);
        const l = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
        return o = Math.max(0, Math.min(o, l)), {
          ...i,
          pageIndex: o
        };
      });
    }, e.resetPageIndex = (t) => {
      var i, o;
      e.setPageIndex(t ? Qe : (i = (o = e.initialState) == null || (o = o.pagination) == null ? void 0 : o.pageIndex) != null ? i : Qe);
    }, e.resetPageSize = (t) => {
      var i, o;
      e.setPageSize(t ? Ze : (i = (o = e.initialState) == null || (o = o.pagination) == null ? void 0 : o.pageSize) != null ? i : Ze);
    }, e.setPageSize = (t) => {
      e.setPagination((i) => {
        const o = Math.max(1, fe(t, i.pageSize)), l = i.pageSize * i.pageIndex, s = Math.floor(l / o);
        return {
          ...i,
          pageIndex: s,
          pageSize: o
        };
      });
    }, e.setPageCount = (t) => e.setPagination((i) => {
      var o;
      let l = fe(t, (o = e.options.pageCount) != null ? o : -1);
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
}, Xe = () => ({
  top: [],
  bottom: []
}), gn = {
  getInitialState: (e) => ({
    rowPinning: Xe(),
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
          var p, f;
          return {
            top: ((p = a?.top) != null ? p : []).filter((g) => !(s != null && s.has(g))),
            bottom: [...((f = a?.bottom) != null ? f : []).filter((g) => !(s != null && s.has(g))), ...Array.from(s)]
          };
        }
        if (n === "top") {
          var c, h;
          return {
            top: [...((c = a?.top) != null ? c : []).filter((g) => !(s != null && s.has(g))), ...Array.from(s)],
            bottom: ((h = a?.bottom) != null ? h : []).filter((g) => !(s != null && s.has(g)))
          };
        }
        return {
          top: ((u = a?.top) != null ? u : []).filter((g) => !(s != null && s.has(g))),
          bottom: ((d = a?.bottom) != null ? d : []).filter((g) => !(s != null && s.has(g)))
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
      return e.setRowPinning(r ? Xe() : (n = (t = e.initialState) == null ? void 0 : t.rowPinning) != null ? n : Xe());
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
}, fn = {
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
        Je(i, o.id, t, !0, e);
      }), i;
    }), e.getPreSelectedRowModel = () => e.getCoreRowModel(), e.getSelectedRowModel = w(() => [e.getState().rowSelection, e.getCoreRowModel()], (r, n) => Object.keys(r).length ? Ue(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, C(e.options, "debugTable", "getSelectedRowModel")), e.getFilteredSelectedRowModel = w(() => [e.getState().rowSelection, e.getFilteredRowModel()], (r, n) => Object.keys(r).length ? Ue(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, C(e.options, "debugTable", "getFilteredSelectedRowModel")), e.getGroupedSelectedRowModel = w(() => [e.getState().rowSelection, e.getSortedRowModel()], (r, n) => Object.keys(r).length ? Ue(e, n) : {
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
        return Je(s, e.id, n, (l = t?.selectChildren) != null ? l : !0, r), s;
      });
    }, e.getIsSelected = () => {
      const {
        rowSelection: n
      } = r.getState();
      return ot(e, n);
    }, e.getIsSomeSelected = () => {
      const {
        rowSelection: n
      } = r.getState();
      return et(e, n) === "some";
    }, e.getIsAllSubRowsSelected = () => {
      const {
        rowSelection: n
      } = r.getState();
      return et(e, n) === "all";
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
}, Je = (e, r, n, t, i) => {
  var o;
  const l = i.getRow(r, !0);
  n ? (l.getCanMultiSelect() || Object.keys(e).forEach((s) => delete e[s]), l.getCanSelect() && (e[r] = !0)) : delete e[r], t && (o = l.subRows) != null && o.length && l.getCanSelectSubRows() && l.subRows.forEach((s) => Je(e, s.id, n, t, i));
};
function Ue(e, r) {
  const n = e.getState().rowSelection, t = [], i = {}, o = function(l, s) {
    return l.map((a) => {
      var u;
      const d = ot(a, n);
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
function ot(e, r) {
  var n;
  return (n = r[e.id]) != null ? n : !1;
}
function et(e, r, n) {
  var t;
  if (!((t = e.subRows) != null && t.length)) return !1;
  let i = !0, o = !1;
  return e.subRows.forEach((l) => {
    if (!(o && !i) && (l.getCanSelect() && (ot(l, r) ? o = !0 : i = !1), l.subRows && l.subRows.length)) {
      const s = et(l, r);
      s === "all" ? o = !0 : (s === "some" && (o = !0), i = !1);
    }
  }), i ? "all" : o ? "some" : !1;
}
const tt = /([0-9]+)/gm, pn = (e, r, n) => xt(pe(e.getValue(n)).toLowerCase(), pe(r.getValue(n)).toLowerCase()), hn = (e, r, n) => xt(pe(e.getValue(n)), pe(r.getValue(n))), mn = (e, r, n) => lt(pe(e.getValue(n)).toLowerCase(), pe(r.getValue(n)).toLowerCase()), vn = (e, r, n) => lt(pe(e.getValue(n)), pe(r.getValue(n))), Sn = (e, r, n) => {
  const t = e.getValue(n), i = r.getValue(n);
  return t > i ? 1 : t < i ? -1 : 0;
}, wn = (e, r, n) => lt(e.getValue(n), r.getValue(n));
function lt(e, r) {
  return e === r ? 0 : e > r ? 1 : -1;
}
function pe(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function xt(e, r) {
  const n = e.split(tt).filter(Boolean), t = r.split(tt).filter(Boolean);
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
const $e = {
  alphanumeric: pn,
  alphanumericCaseSensitive: hn,
  text: mn,
  textCaseSensitive: vn,
  datetime: Sn,
  basic: wn
}, Cn = {
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
          return $e.datetime;
        if (typeof o == "string" && (t = !0, o.split(tt).length > 1))
          return $e.alphanumeric;
      }
      return t ? $e.text : $e.basic;
    }, e.getAutoSortDir = () => {
      const n = r.getFilteredRowModel().flatRows[0];
      return typeof n?.getValue(e.id) == "string" ? "asc" : "desc";
    }, e.getSortingFn = () => {
      var n, t;
      if (!e)
        throw new Error();
      return Ne(e.columnDef.sortingFn) ? e.columnDef.sortingFn : e.columnDef.sortingFn === "auto" ? e.getAutoSortingFn() : (n = (t = r.options.sortingFns) == null ? void 0 : t[e.columnDef.sortingFn]) != null ? n : $e[e.columnDef.sortingFn];
    }, e.toggleSorting = (n, t) => {
      const i = e.getNextSortingOrder(), o = typeof n < "u" && n !== null;
      r.setSorting((l) => {
        const s = l?.find((c) => c.id === e.id), a = l?.findIndex((c) => c.id === e.id);
        let u = [], d, p = o ? n : i === "desc";
        if (l != null && l.length && e.getCanMultiSort() && t ? s ? d = "toggle" : d = "add" : l != null && l.length && a !== l.length - 1 ? d = "replace" : s ? d = "toggle" : d = "replace", d === "toggle" && (o || i || (d = "remove")), d === "add") {
          var f;
          u = [...l, {
            id: e.id,
            desc: p
          }], u.splice(0, u.length - ((f = r.options.maxMultiSortColCount) != null ? f : Number.MAX_SAFE_INTEGER));
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
}, Rn = [
  Ht,
  sn,
  tn,
  nn,
  Tt,
  Wt,
  an,
  //depends on ColumnFaceting
  un,
  //depends on ColumnFiltering
  Cn,
  Jt,
  //depends on RowSorting
  cn,
  dn,
  gn,
  fn,
  on
];
function yn(e) {
  var r, n;
  process.env.NODE_ENV !== "production" && (e.debugAll || e.debugTable) && console.info("Creating Table Instance...");
  const t = [...Rn, ...(r = e._features) != null ? r : []];
  let i = {
    _features: t
  };
  const o = i._features.reduce((f, c) => Object.assign(f, c.getDefaultOptions == null ? void 0 : c.getDefaultOptions(i)), {}), l = (f) => i.options.mergeOptions ? i.options.mergeOptions(o, f) : {
    ...o,
    ...f
  };
  let a = {
    ...{},
    ...(n = e.initialState) != null ? n : {}
  };
  i._features.forEach((f) => {
    var c;
    a = (c = f.getInitialState == null ? void 0 : f.getInitialState(a)) != null ? c : a;
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
    _queue: (f) => {
      u.push(f), d || (d = !0, Promise.resolve().then(() => {
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
    setOptions: (f) => {
      const c = fe(f, i.options);
      i.options = l(c);
    },
    getState: () => i.options.state,
    setState: (f) => {
      i.options.onStateChange == null || i.options.onStateChange(f);
    },
    _getRowId: (f, c, h) => {
      var g;
      return (g = i.options.getRowId == null ? void 0 : i.options.getRowId(f, c, h)) != null ? g : `${h ? [h.id, c].join(".") : c}`;
    },
    getCoreRowModel: () => (i._getCoreRowModel || (i._getCoreRowModel = i.options.getCoreRowModel(i)), i._getCoreRowModel()),
    // The final calls start at the bottom of the model,
    // expanded rows, which then work their way up
    getRowModel: () => i.getPaginationRowModel(),
    //in next version, we should just pass in the row model as the optional 2nd arg
    getRow: (f, c) => {
      let h = (c ? i.getPrePaginationRowModel() : i.getRowModel()).rowsById[f];
      if (!h && (h = i.getCoreRowModel().rowsById[f], !h))
        throw process.env.NODE_ENV !== "production" ? new Error(`getRow could not find row with ID: ${f}`) : new Error();
      return h;
    },
    _getDefaultColumnDef: w(() => [i.options.defaultColumn], (f) => {
      var c;
      return f = (c = f) != null ? c : {}, {
        header: (h) => {
          const g = h.header.column.columnDef;
          return g.accessorKey ? g.accessorKey : g.accessorFn ? g.id : null;
        },
        // footer: props => props.header.column.id,
        cell: (h) => {
          var g, S;
          return (g = (S = h.renderValue()) == null || S.toString == null ? void 0 : S.toString()) != null ? g : null;
        },
        ...i._features.reduce((h, g) => Object.assign(h, g.getDefaultColumnDef == null ? void 0 : g.getDefaultColumnDef()), {}),
        ...f
      };
    }, C(e, "debugColumns", "_getDefaultColumnDef")),
    _getColumnDefs: () => i.options.columns,
    getAllColumns: w(() => [i._getColumnDefs()], (f) => {
      const c = function(h, g, S) {
        return S === void 0 && (S = 0), h.map((v) => {
          const b = Nt(i, v, S, g), E = v;
          return b.columns = E.columns ? c(E.columns, b, S + 1) : [], b;
        });
      };
      return c(f);
    }, C(e, "debugColumns", "getAllColumns")),
    getAllFlatColumns: w(() => [i.getAllColumns()], (f) => f.flatMap((c) => c.getFlatColumns()), C(e, "debugColumns", "getAllFlatColumns")),
    _getAllFlatColumnsById: w(() => [i.getAllFlatColumns()], (f) => f.reduce((c, h) => (c[h.id] = h, c), {}), C(e, "debugColumns", "getAllFlatColumnsById")),
    getAllLeafColumns: w(() => [i.getAllColumns(), i._getOrderColumnsFn()], (f, c) => {
      let h = f.flatMap((g) => g.getLeafColumns());
      return c(h);
    }, C(e, "debugColumns", "getAllLeafColumns")),
    getColumn: (f) => {
      const c = i._getAllFlatColumnsById()[f];
      return process.env.NODE_ENV !== "production" && !c && console.error(`[Table] Column with id '${f}' does not exist.`), c;
    }
  };
  Object.assign(i, p);
  for (let f = 0; f < i._features.length; f++) {
    const c = i._features[f];
    c == null || c.createTable == null || c.createTable(i);
  }
  return i;
}
function xn() {
  return (e) => w(() => [e.options.data], (r) => {
    const n = {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, t = function(i, o, l) {
      o === void 0 && (o = 0);
      const s = [];
      for (let u = 0; u < i.length; u++) {
        const d = Gt(e, e._getRowId(i[u], u, l), i[u], u, o, void 0, l?.id);
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
function _n(e, r) {
  return e ? En(e) ? /* @__PURE__ */ V.createElement(e, r) : e : null;
}
function En(e) {
  return $n(e) || typeof e == "function" || bn(e);
}
function $n(e) {
  return typeof e == "function" && (() => {
    const r = Object.getPrototypeOf(e);
    return r.prototype && r.prototype.isReactComponent;
  })();
}
function bn(e) {
  return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
function Fn(e) {
  const r = {
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    ...e
  }, [n] = V.useState(() => ({
    current: yn(r)
  })), [t, i] = V.useState(() => n.current.initialState);
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
function Mn({
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
  expandable: f,
  expandedRows: c,
  setExpandedRows: h,
  stripedRows: g = !1,
  hoverableRow: S = !1,
  loading: v,
  loadingCustom: b,
  noResultMessage: E,
  onRowClick: M,
  totalItems: P
}) {
  const x = we(
    () => l ?? s,
    [l, s]
  ), F = H(null), O = H(null), [j, te] = Y(null), [le, se] = Y(0), ye = (R, I) => {
    o && (I.preventDefault(), F.current = I.clientY, O.current = R, te(R), se(0), I.currentTarget.setPointerCapture(I.pointerId));
  }, ae = (R) => {
    if (!o || F.current === null || O.current === null) return;
    const I = R.clientY - F.current;
    se(I);
    const k = 32, y = I > k ? 1 : I < -k ? -1 : 0;
    if (y === 0) return;
    const Z = O.current, D = Z + y;
    D < 0 || D >= e.getRowModel().rows.length || (x((ue) => {
      const Se = [...ue], [_] = Se.splice(Z, 1);
      return Se.splice(D, 0, _), Se;
    }), O.current = D, F.current = R.clientY, se(0), te(D));
  }, he = () => {
    F.current = null, O.current = null, te(null), se(0);
  }, [z, $] = Y(null), [T, q] = Y(""), xe = (R) => {
    $({
      rowId: R.row.id,
      colId: R.column.id
    }), q(String(R.getValue() ?? ""));
  }, me = (R) => {
    s(
      (I) => I.map(
        (k, y) => y === R.row.index ? {
          ...k,
          [R.column.id]: T
        } : k
      )
    ), $(null);
  }, Q = (R) => !!(R.closest("button") || R.closest("a") || R.closest("input") || R.closest("select") || R.closest("textarea") || R.closest("[data-stop-row-click]")), ve = (R, I) => {
    const k = R.target;
    if (!Q(k) && !k.closest(".col-drag-handle")) {
      if (f?.clickRow) {
        const y = I.original.id ?? I.index;
        h((Z) => {
          const D = new Set(Z);
          return D.has(y) ? D.delete(y) : D.add(y), D;
        });
      }
      M && M(I.original);
    }
  };
  return /* @__PURE__ */ W("table", { className: `table table-body ${S ? "hoverable" : ""} ${g ? "striped" : ""}`, children: [
    /* @__PURE__ */ m(
      ke,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ W("tbody", { children: [
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
          children: b
        }
      ) }),
      v === "placeholder" && (() => {
        const R = e.getAllColumns().length, I = e.getState().pagination?.pageSize || 10;
        return Array.from({ length: I }).map((k, y) => /* @__PURE__ */ m("tr", { className: "table-placeholder-row", children: Array.from({ length: R }).map((Z, D) => /* @__PURE__ */ m("td", { children: /* @__PURE__ */ m("div", { className: "table-placeholder-cell" }) }, `placeholder-cell-${y}-${D}`)) }, `placeholder-row-${y}`));
      })(),
      !v && e.getRowModel().rows.length === 0 && P === 0 && /* @__PURE__ */ m("tr", { className: "table-no-results-row", children: /* @__PURE__ */ m(
        "td",
        {
          colSpan: e.getAllColumns().length,
          style: { textAlign: "center", padding: "20px" },
          children: E
        }
      ) }),
      !v && e.getRowModel().rows.length > 0 && e.getRowModel().rows.map((R) => {
        const I = R.index, k = j === I, y = [];
        y.push(
          /* @__PURE__ */ m(
            "tr",
            {
              className: `${k ? "row-dragging" : ""}`,
              style: k ? {
                transform: `translateY(${le}px)`,
                position: "relative",
                zIndex: 50
              } : void 0,
              onPointerMove: ae,
              onPointerUp: he,
              onClick: (_) => ve(_, {
                original: R.original,
                index: R.index
              }),
              children: R.getVisibleCells().map((_) => {
                const ne = _.column.id, N = n.get(ne), _e = Oe(_.column, t), A = z?.rowId === R.id && z?.colId === ne, re = [
                  N ? "is-sticky" : "",
                  N?.side === "left" ? "is-sticky-left" : "",
                  N?.side === "right" ? "is-sticky-right" : ""
                ].filter(Boolean).join(" "), J = N ? N.side === "left" ? { "--sticky-left": `${N.offset}px` } : { "--sticky-right": `${N.offset}px` } : void 0;
                if (_.column.id === "__draggable__" && o)
                  return /* @__PURE__ */ m(
                    "td",
                    {
                      className: `${re} align-center col-drag-handle`,
                      style: J,
                      onPointerDown: (L) => ye(I, L),
                      children: "☰"
                    },
                    _.id
                  );
                if (_.column.id === "__selectable__" && a) {
                  const L = _.row.original.id ?? _.row.index, Ee = p.includes(L), He = u.has(L);
                  return Ee && a.hideDisabledSelects ? /* @__PURE__ */ m(
                    "td",
                    {
                      className: `${re} align-center`,
                      style: J
                    },
                    _.id
                  ) : /* @__PURE__ */ m(
                    "td",
                    {
                      className: `${re} align-center`,
                      style: J,
                      children: /* @__PURE__ */ m(
                        "input",
                        {
                          type: "checkbox",
                          checked: He,
                          disabled: Ee,
                          onChange: () => {
                            d((Ge) => {
                              const ie = new Set(Ge);
                              return ie.has(L) ? ie.delete(L) : ie.add(L), ie;
                            });
                          }
                        }
                      )
                    },
                    _.id
                  );
                }
                if (_.column.id === "__expandable__" && f) {
                  const L = _.row.original.id ?? _.row.index, Ee = c.has(L);
                  return /* @__PURE__ */ m(
                    "td",
                    {
                      className: `${re} align-center`,
                      style: J,
                      onClick: (He) => {
                        He.stopPropagation(), h((Ge) => {
                          const ie = new Set(Ge);
                          return ie.has(L) ? ie.delete(L) : ie.add(L), ie;
                        });
                      },
                      children: /* @__PURE__ */ m(
                        "span",
                        {
                          className: `expand-icon ${Ee ? "expanded" : ""}`,
                          style: {
                            display: "inline-block",
                            transition: "transform 0.2s",
                            transform: Ee ? "rotate(90deg)" : "rotate(0deg)",
                            cursor: "pointer",
                            fontSize: "12px"
                          },
                          children: /* @__PURE__ */ m("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ m("path", { d: "M4.5 9L7.5 6L4.5 3", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
                        }
                      )
                    },
                    _.id
                  );
                }
                return /* @__PURE__ */ m(
                  "td",
                  {
                    className: `${re} align-${_e}`,
                    style: J,
                    onDoubleClick: () => {
                      i && xe(_);
                    },
                    children: A ? /* @__PURE__ */ m(
                      "input",
                      {
                        autoFocus: !0,
                        value: T,
                        onChange: (L) => q(L.target.value),
                        onBlur: () => me(_),
                        onKeyDown: (L) => {
                          L.key === "Enter" && me(_), L.key === "Escape" && $(null);
                        },
                        onFocus: (L) => L.currentTarget.select(),
                        style: {
                          width: "100%",
                          height: "100%",
                          boxSizing: "border-box",
                          fontSize: "inherit",
                          fontFamily: "inherit"
                        }
                      }
                    ) : _n(
                      _.column.columnDef.cell,
                      _.getContext()
                    )
                  },
                  _.id
                );
              })
            },
            R.id
          )
        );
        const Z = R.original.id ?? R.index, D = f?.content?.(R.original), ue = R.getVisibleCells(), Se = ue.some(
          (_) => !!_.column.columnDef.meta?.expandable
        );
        return f && c.has(Z) && (D || Se) && (D ? y.push(
          /* @__PURE__ */ m("tr", { className: "expanded-row", children: /* @__PURE__ */ m("td", { colSpan: e.getAllColumns().length, className: "expanded-content", children: D }) }, `${R.id}-expanded`)
        ) : y.push(
          /* @__PURE__ */ m("tr", { className: "expanded-row", children: ue.map((_) => {
            const ne = _.column.id, N = n.get(ne), _e = Oe(_.column, t), A = [
              N ? "is-sticky" : "",
              N?.side === "left" ? "is-sticky-left" : "",
              N?.side === "right" ? "is-sticky-right" : ""
            ].filter(Boolean).join(" "), re = N ? N.side === "left" ? { "--sticky-left": `${N.offset}px` } : { "--sticky-right": `${N.offset}px` } : void 0, J = _.column.columnDef.meta?.expandable;
            return /* @__PURE__ */ m(
              "td",
              {
                className: `${A} align-${_e} expanded-cell`,
                style: re,
                children: J ? J.content(R.original) : null
              },
              `${_.id}-expanded`
            );
          }) }, `${R.id}-expanded`)
        )), y;
      }).flat()
    ] })
  ] });
}
function On({
  table: e,
  tableWidth: r,
  stickyById: n,
  defaultTextAlign: t,
  scrollRef: i
}) {
  return e.getAllLeafColumns().some(
    (s) => s.columnDef.meta?.internalFooter != null
  ) ? /* @__PURE__ */ m("div", { className: "table-scroll-sync", ref: i, children: /* @__PURE__ */ W("table", { className: "table table-internal-footer", children: [
    /* @__PURE__ */ m(
      ke,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ m("tfoot", { children: /* @__PURE__ */ m("tr", { children: e.getAllLeafColumns().map((s) => {
      const a = s.columnDef.meta?.internalFooter, u = n.get(s.id), d = Oe(s, t), p = [
        u ? "is-sticky" : "",
        u?.side === "left" ? "is-sticky-left" : "",
        u?.side === "right" ? "is-sticky-right" : ""
      ].filter(Boolean).join(" "), f = u ? u.side === "left" ? { "--sticky-left": `${u.offset}px` } : { "--sticky-right": `${u.offset}px` } : void 0;
      return /* @__PURE__ */ m(
        "td",
        {
          className: `${p} align-${d}`,
          style: f,
          children: typeof a == "function" ? a() : a ?? null
        },
        s.id
      );
    }) }) })
  ] }) }) : null;
}
function In({ children: e }) {
  return /* @__PURE__ */ m("table", { className: "table table-external-footer", children: /* @__PURE__ */ m("tfoot", { children: /* @__PURE__ */ m("tr", { children: /* @__PURE__ */ m("td", { children: e }) }) }) });
}
function Pn(e, r, n = 2) {
  if (r <= 1) return [1];
  const t = [], i = [], o = Math.max(2, e - n), l = Math.min(r - 1, e + n);
  for (let s = o; s <= l; s++)
    i.push(s);
  return t.push(1), o > 2 && t.push("ellipsis"), t.push(...i), l < r - 1 && t.push("ellipsis"), t.push(r), t;
}
function An({
  currentPage: e,
  totalItems: r,
  pageSize: n,
  pageSizeOptions: t = [10, 25, 50, 100, 200],
  onPageChange: i
}) {
  const o = Math.max(1, Math.ceil(r / n)), l = r === 0 ? 0 : (e - 1) * n + 1, s = Math.min(e * n, r), a = we(
    () => Pn(e, o),
    [e, o]
  ), u = we(() => {
    const d = new Set(t);
    return d.add(n), Array.from(d).sort((p, f) => p - f);
  }, [t, n]);
  return /* @__PURE__ */ W("div", { className: "table-pagination", children: [
    /* @__PURE__ */ W("div", { className: "pagination-controls", children: [
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
    /* @__PURE__ */ W("div", { className: "pagination-info", children: [
      /* @__PURE__ */ W("span", { children: [
        "Exibindo de ",
        l,
        " a ",
        s,
        " de ",
        r,
        " registros"
      ] }),
      /* @__PURE__ */ m("span", { className: "pagination-separator", children: "•" }),
      /* @__PURE__ */ W("div", { className: "pagination-select", children: [
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
function De(e) {
  var r = typeof e;
  return e != null && (r == "object" || r == "function");
}
var Vn = typeof global == "object" && global && global.Object === Object && global, zn = typeof self == "object" && self && self.Object === Object && self, _t = Vn || zn || Function("return this")(), Ye = function() {
  return _t.Date.now();
}, Dn = /\s/;
function Ln(e) {
  for (var r = e.length; r-- && Dn.test(e.charAt(r)); )
    ;
  return r;
}
var kn = /^\s+/;
function Nn(e) {
  return e && e.slice(0, Ln(e) + 1).replace(kn, "");
}
var Le = _t.Symbol, Et = Object.prototype, Hn = Et.hasOwnProperty, Gn = Et.toString, be = Le ? Le.toStringTag : void 0;
function Tn(e) {
  var r = Hn.call(e, be), n = e[be];
  try {
    e[be] = void 0;
    var t = !0;
  } catch {
  }
  var i = Gn.call(e);
  return t && (r ? e[be] = n : delete e[be]), i;
}
var Wn = Object.prototype, Bn = Wn.toString;
function jn(e) {
  return Bn.call(e);
}
var qn = "[object Null]", Xn = "[object Undefined]", ct = Le ? Le.toStringTag : void 0;
function Un(e) {
  return e == null ? e === void 0 ? Xn : qn : ct && ct in Object(e) ? Tn(e) : jn(e);
}
function Yn(e) {
  return e != null && typeof e == "object";
}
var Kn = "[object Symbol]";
function Qn(e) {
  return typeof e == "symbol" || Yn(e) && Un(e) == Kn;
}
var dt = NaN, Zn = /^[-+]0x[0-9a-f]+$/i, Jn = /^0b[01]+$/i, er = /^0o[0-7]+$/i, tr = parseInt;
function gt(e) {
  if (typeof e == "number")
    return e;
  if (Qn(e))
    return dt;
  if (De(e)) {
    var r = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = De(r) ? r + "" : r;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = Nn(e);
  var n = Jn.test(e);
  return n || er.test(e) ? tr(e.slice(2), n ? 2 : 8) : Zn.test(e) ? dt : +e;
}
var nr = "Expected a function", rr = Math.max, ir = Math.min;
function ze(e, r, n) {
  var t, i, o, l, s, a, u = 0, d = !1, p = !1, f = !0;
  if (typeof e != "function")
    throw new TypeError(nr);
  r = gt(r) || 0, De(n) && (d = !!n.leading, p = "maxWait" in n, o = p ? rr(gt(n.maxWait) || 0, r) : o, f = "trailing" in n ? !!n.trailing : f);
  function c(x) {
    var F = t, O = i;
    return t = i = void 0, u = x, l = e.apply(O, F), l;
  }
  function h(x) {
    return u = x, s = setTimeout(v, r), d ? c(x) : l;
  }
  function g(x) {
    var F = x - a, O = x - u, j = r - F;
    return p ? ir(j, o - O) : j;
  }
  function S(x) {
    var F = x - a, O = x - u;
    return a === void 0 || F >= r || F < 0 || p && O >= o;
  }
  function v() {
    var x = Ye();
    if (S(x))
      return b(x);
    s = setTimeout(v, g(x));
  }
  function b(x) {
    return s = void 0, f && t ? c(x) : (t = i = void 0, l);
  }
  function E() {
    s !== void 0 && clearTimeout(s), u = 0, t = a = i = s = void 0;
  }
  function M() {
    return s === void 0 ? l : b(Ye());
  }
  function P() {
    var x = Ye(), F = S(x);
    if (t = arguments, i = this, a = x, F) {
      if (s === void 0)
        return h(a);
      if (p)
        return clearTimeout(s), s = setTimeout(v, r), c(a);
    }
    return s === void 0 && (s = setTimeout(v, r)), l;
  }
  return P.cancel = E, P.flush = M, P;
}
var or = "Expected a function";
function lr(e, r, n) {
  var t = !0, i = !0;
  if (typeof e != "function")
    throw new TypeError(or);
  return De(n) && (t = "leading" in n ? !!n.leading : t, i = "trailing" in n ? !!n.trailing : i), ze(e, r, {
    leading: t,
    maxWait: r,
    trailing: i
  });
}
var Re = function() {
  return Re = Object.assign || function(r) {
    for (var n, t = 1, i = arguments.length; t < i; t++) {
      n = arguments[t];
      for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
    }
    return r;
  }, Re.apply(this, arguments);
};
function $t(e) {
  return !e || !e.ownerDocument || !e.ownerDocument.defaultView ? window : e.ownerDocument.defaultView;
}
function bt(e) {
  return !e || !e.ownerDocument ? document : e.ownerDocument;
}
var Ft = function(e) {
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
function Mt(e, r) {
  var n;
  e && (n = e.classList).add.apply(n, r.split(" "));
}
function Ot(e, r) {
  e && r.split(" ").forEach(function(n) {
    e.classList.remove(n);
  });
}
function It(e) {
  return ".".concat(e.split(" ").join("."));
}
var st = !!(typeof window < "u" && window.document && window.document.createElement), sr = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  addClasses: Mt,
  canUseDOM: st,
  classNamesToQuery: It,
  getElementDocument: bt,
  getElementWindow: $t,
  getOptions: Ft,
  removeClasses: Ot
}), Ce = null, ft = null;
st && window.addEventListener("resize", function() {
  ft !== window.devicePixelRatio && (ft = window.devicePixelRatio, Ce = null);
});
function pt() {
  if (Ce === null) {
    if (typeof document > "u")
      return Ce = 0, Ce;
    var e = document.body, r = document.createElement("div");
    r.classList.add("simplebar-hide-scrollbar"), e.appendChild(r);
    var n = r.getBoundingClientRect().right;
    e.removeChild(r), Ce = n;
  }
  return Ce;
}
var ce = $t, Ke = bt, ar = Ft, de = Mt, ge = Ot, B = It, Fe = (
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
        var i = ce(t.el);
        t.scrollXTicking || (i.requestAnimationFrame(t.scrollX), t.scrollXTicking = !0), t.scrollYTicking || (i.requestAnimationFrame(t.scrollY), t.scrollYTicking = !0), t.isScrolling || (t.isScrolling = !0, de(t.el, t.classNames.scrolling)), t.showScrollbar("x"), t.showScrollbar("y"), t.onStopScrolling();
      }, this.scrollX = function() {
        t.axis.x.isOverflowing && t.positionScrollbar("x"), t.scrollXTicking = !1;
      }, this.scrollY = function() {
        t.axis.y.isOverflowing && t.positionScrollbar("y"), t.scrollYTicking = !1;
      }, this._onStopScrolling = function() {
        ge(t.el, t.classNames.scrolling), t.options.autoHide && (t.hideScrollbar("x"), t.hideScrollbar("y")), t.isScrolling = !1;
      }, this.onMouseEnter = function() {
        t.isMouseEntering || (de(t.el, t.classNames.mouseEntered), t.showScrollbar("x"), t.showScrollbar("y"), t.isMouseEntering = !0), t.onMouseEntered();
      }, this._onMouseEntered = function() {
        ge(t.el, t.classNames.mouseEntered), t.options.autoHide && (t.hideScrollbar("x"), t.hideScrollbar("y")), t.isMouseEntering = !1;
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
        var o, l, s, a, u, d, p, f, c, h, g;
        if (!(!t.draggedAxis || !t.contentWrapperEl)) {
          var S, v = t.axis[t.draggedAxis].track, b = (l = (o = v.rect) === null || o === void 0 ? void 0 : o[t.axis[t.draggedAxis].sizeAttr]) !== null && l !== void 0 ? l : 0, E = t.axis[t.draggedAxis].scrollbar, M = (a = (s = t.contentWrapperEl) === null || s === void 0 ? void 0 : s[t.axis[t.draggedAxis].scrollSizeAttr]) !== null && a !== void 0 ? a : 0, P = parseInt((d = (u = t.elStyles) === null || u === void 0 ? void 0 : u[t.axis[t.draggedAxis].sizeAttr]) !== null && d !== void 0 ? d : "0px", 10);
          i.preventDefault(), i.stopPropagation(), t.draggedAxis === "y" ? S = i.pageY : S = i.pageX;
          var x = S - ((f = (p = v.rect) === null || p === void 0 ? void 0 : p[t.axis[t.draggedAxis].offsetAttr]) !== null && f !== void 0 ? f : 0) - t.axis[t.draggedAxis].dragOffset;
          x = t.draggedAxis === "x" && t.isRtl ? ((h = (c = v.rect) === null || c === void 0 ? void 0 : c[t.axis[t.draggedAxis].sizeAttr]) !== null && h !== void 0 ? h : 0) - E.size - x : x;
          var F = x / (b - E.size), O = F * (M - P);
          t.draggedAxis === "x" && t.isRtl && (O = !((g = e.getRtlHelpers()) === null || g === void 0) && g.isScrollingToNegative ? -O : O), t.contentWrapperEl[t.axis[t.draggedAxis].scrollOffsetAttr] = O;
        }
      }, this.onEndDrag = function(i) {
        t.isDragging = !1;
        var o = Ke(t.el), l = ce(t.el);
        i.preventDefault(), i.stopPropagation(), ge(t.el, t.classNames.dragging), t.onStopScrolling(), o.removeEventListener("mousemove", t.drag, !0), o.removeEventListener("mouseup", t.onEndDrag, !0), t.removePreventClickId = l.setTimeout(function() {
          o.removeEventListener("click", t.preventClick, !0), o.removeEventListener("dblclick", t.preventClick, !0), t.removePreventClickId = null;
        });
      }, this.preventClick = function(i) {
        i.preventDefault(), i.stopPropagation();
      }, this.el = r, this.options = Re(Re({}, e.defaultOptions), n), this.classNames = Re(Re({}, e.defaultOptions.classNames), n.classNames), this.axis = {
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
      this.onMouseMove = lr(this._onMouseMove, 64), this.onWindowResize = ze(this._onWindowResize, 64, { leading: !0 }), this.onStopScrolling = ze(this._onStopScrolling, this.stopScrollDelay), this.onMouseEntered = ze(this._onMouseEntered, this.stopScrollDelay), this.init();
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
        return this.contentWrapperEl && getComputedStyle(this.contentWrapperEl, "::-webkit-scrollbar").display === "none" || "scrollbarWidth" in document.documentElement.style || "-ms-overflow-style" in document.documentElement.style ? 0 : pt();
      } catch {
        return pt();
      }
    }, e.getOffset = function(r) {
      var n = r.getBoundingClientRect(), t = Ke(r), i = ce(r);
      return {
        top: n.top + (i.pageYOffset || t.documentElement.scrollTop),
        left: n.left + (i.pageXOffset || t.documentElement.scrollLeft)
      };
    }, e.prototype.init = function() {
      st && (this.initDOM(), this.rtlHelpers = e.getRtlHelpers(), this.scrollbarWidth = this.getScrollbarWidth(), this.recalculate(), this.initListeners());
    }, e.prototype.initDOM = function() {
      var r, n;
      this.wrapperEl = this.el.querySelector(B(this.classNames.wrapper)), this.contentWrapperEl = this.options.scrollableNode || this.el.querySelector(B(this.classNames.contentWrapper)), this.contentEl = this.options.contentNode || this.el.querySelector(B(this.classNames.contentEl)), this.offsetEl = this.el.querySelector(B(this.classNames.offset)), this.maskEl = this.el.querySelector(B(this.classNames.mask)), this.placeholderEl = this.findChild(this.wrapperEl, B(this.classNames.placeholder)), this.heightAutoObserverWrapperEl = this.el.querySelector(B(this.classNames.heightAutoObserverWrapperEl)), this.heightAutoObserverEl = this.el.querySelector(B(this.classNames.heightAutoObserverEl)), this.axis.x.track.el = this.findChild(this.el, "".concat(B(this.classNames.track)).concat(B(this.classNames.horizontal))), this.axis.y.track.el = this.findChild(this.el, "".concat(B(this.classNames.track)).concat(B(this.classNames.vertical))), this.axis.x.scrollbar.el = ((r = this.axis.x.track.el) === null || r === void 0 ? void 0 : r.querySelector(B(this.classNames.scrollbar))) || null, this.axis.y.scrollbar.el = ((n = this.axis.y.track.el) === null || n === void 0 ? void 0 : n.querySelector(B(this.classNames.scrollbar))) || null, this.options.autoHide || (de(this.axis.x.scrollbar.el, this.classNames.visible), de(this.axis.y.scrollbar.el, this.classNames.visible));
    }, e.prototype.initListeners = function() {
      var r = this, n, t = ce(this.el);
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
        var r = ce(this.el);
        this.elStyles = r.getComputedStyle(this.el), this.isRtl = this.elStyles.direction === "rtl";
        var n = this.contentEl.offsetWidth, t = this.heightAutoObserverEl.offsetHeight <= 1, i = this.heightAutoObserverEl.offsetWidth <= 1 || n > 0, o = this.contentWrapperEl.offsetWidth, l = this.elStyles.overflowX, s = this.elStyles.overflowY;
        this.contentEl.style.padding = "".concat(this.elStyles.paddingTop, " ").concat(this.elStyles.paddingRight, " ").concat(this.elStyles.paddingBottom, " ").concat(this.elStyles.paddingLeft), this.wrapperEl.style.margin = "-".concat(this.elStyles.paddingTop, " -").concat(this.elStyles.paddingRight, " -").concat(this.elStyles.paddingBottom, " -").concat(this.elStyles.paddingLeft);
        var a = this.contentEl.scrollHeight, u = this.contentEl.scrollWidth;
        this.contentWrapperEl.style.height = t ? "auto" : "100%", this.placeholderEl.style.width = i ? "".concat(n || u, "px") : "auto", this.placeholderEl.style.height = "".concat(a, "px");
        var d = this.contentWrapperEl.offsetHeight;
        this.axis.x.isOverflowing = n !== 0 && u > n, this.axis.y.isOverflowing = a > d, this.axis.x.isOverflowing = l === "hidden" ? !1 : this.axis.x.isOverflowing, this.axis.y.isOverflowing = s === "hidden" ? !1 : this.axis.y.isOverflowing, this.axis.x.forceVisible = this.options.forceVisible === "x" || this.options.forceVisible === !0, this.axis.y.forceVisible = this.options.forceVisible === "y" || this.options.forceVisible === !0, this.hideNativeScrollbar();
        var p = this.axis.x.isOverflowing ? this.scrollbarWidth : 0, f = this.axis.y.isOverflowing ? this.scrollbarWidth : 0;
        this.axis.x.isOverflowing = this.axis.x.isOverflowing && u > o - f, this.axis.y.isOverflowing = this.axis.y.isOverflowing && a > d - p, this.axis.x.scrollbar.size = this.getScrollbarSize("x"), this.axis.y.scrollbar.size = this.getScrollbarSize("y"), this.axis.x.scrollbar.el && (this.axis.x.scrollbar.el.style.width = "".concat(this.axis.x.scrollbar.size, "px")), this.axis.y.scrollbar.el && (this.axis.y.scrollbar.el.style.height = "".concat(this.axis.y.scrollbar.size, "px")), this.positionScrollbar("x"), this.positionScrollbar("y"), this.toggleTrackVisibility("x"), this.toggleTrackVisibility("y");
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
      r === void 0 && (r = "y"), this.axis[r].isOverflowing && !this.axis[r].scrollbar.isVisible && (de(this.axis[r].scrollbar.el, this.classNames.visible), this.axis[r].scrollbar.isVisible = !0);
    }, e.prototype.hideScrollbar = function(r) {
      r === void 0 && (r = "y"), !this.isDragging && this.axis[r].isOverflowing && this.axis[r].scrollbar.isVisible && (ge(this.axis[r].scrollbar.el, this.classNames.visible), this.axis[r].scrollbar.isVisible = !1);
    }, e.prototype.hideNativeScrollbar = function() {
      this.offsetEl && (this.offsetEl.style[this.isRtl ? "left" : "right"] = this.axis.y.isOverflowing || this.axis.y.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px", this.offsetEl.style.bottom = this.axis.x.isOverflowing || this.axis.x.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px");
    }, e.prototype.onMouseMoveForAxis = function(r) {
      r === void 0 && (r = "y");
      var n = this.axis[r];
      !n.track.el || !n.scrollbar.el || (n.track.rect = n.track.el.getBoundingClientRect(), n.scrollbar.rect = n.scrollbar.el.getBoundingClientRect(), this.isWithinBounds(n.track.rect) ? (this.showScrollbar(r), de(n.track.el, this.classNames.hover), this.isWithinBounds(n.scrollbar.rect) ? de(n.scrollbar.el, this.classNames.hover) : ge(n.scrollbar.el, this.classNames.hover)) : (ge(n.track.el, this.classNames.hover), this.options.autoHide && this.hideScrollbar(r)));
    }, e.prototype.onMouseLeaveForAxis = function(r) {
      r === void 0 && (r = "y"), ge(this.axis[r].track.el, this.classNames.hover), ge(this.axis[r].scrollbar.el, this.classNames.hover), this.options.autoHide && this.hideScrollbar(r);
    }, e.prototype.onDragStart = function(r, n) {
      var t;
      n === void 0 && (n = "y"), this.isDragging = !0;
      var i = Ke(this.el), o = ce(this.el), l = this.axis[n].scrollbar, s = n === "y" ? r.pageY : r.pageX;
      this.axis[n].dragOffset = s - (((t = l.rect) === null || t === void 0 ? void 0 : t[this.axis[n].offsetAttr]) || 0), this.draggedAxis = n, de(this.el, this.classNames.dragging), i.addEventListener("mousemove", this.drag, !0), i.addEventListener("mouseup", this.onEndDrag, !0), this.removePreventClickId === null ? (i.addEventListener("click", this.preventClick, !0), i.addEventListener("dblclick", this.preventClick, !0)) : (o.clearTimeout(this.removePreventClickId), this.removePreventClickId = null);
    }, e.prototype.onTrackClick = function(r, n) {
      var t = this, i, o, l, s;
      n === void 0 && (n = "y");
      var a = this.axis[n];
      if (!(!this.options.clickOnTrack || !a.scrollbar.el || !this.contentWrapperEl)) {
        r.preventDefault();
        var u = ce(this.el);
        this.axis[n].scrollbar.rect = a.scrollbar.el.getBoundingClientRect();
        var d = this.axis[n].scrollbar, p = (o = (i = d.rect) === null || i === void 0 ? void 0 : i[this.axis[n].offsetAttr]) !== null && o !== void 0 ? o : 0, f = parseInt((s = (l = this.elStyles) === null || l === void 0 ? void 0 : l[this.axis[n].sizeAttr]) !== null && s !== void 0 ? s : "0px", 10), c = this.contentWrapperEl[this.axis[n].scrollOffsetAttr], h = n === "y" ? this.mouseY - p : this.mouseX - p, g = h < 0 ? -1 : 1, S = g === -1 ? c - f : c + f, v = 40, b = function() {
          t.contentWrapperEl && (g === -1 ? c > S && (c -= v, t.contentWrapperEl[t.axis[n].scrollOffsetAttr] = c, u.requestAnimationFrame(b)) : c < S && (c += v, t.contentWrapperEl[t.axis[n].scrollOffsetAttr] = c, u.requestAnimationFrame(b)));
        };
        b();
      }
    }, e.prototype.getContentElement = function() {
      return this.contentEl;
    }, e.prototype.getScrollElement = function() {
      return this.contentWrapperEl;
    }, e.prototype.removeListeners = function() {
      var r = ce(this.el);
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
    }, e.getOptions = ar, e.helpers = sr, e;
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
function ur(e, r) {
  var n = {};
  for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && r.indexOf(t) < 0 && (n[t] = e[t]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, t = Object.getOwnPropertySymbols(e); i < t.length; i++)
      r.indexOf(t[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, t[i]) && (n[t[i]] = e[t[i]]);
  return n;
}
var Pt = V.forwardRef(function(e, r) {
  var n = e.children, t = e.scrollableNodeProps, i = t === void 0 ? {} : t, o = ur(e, ["children", "scrollableNodeProps"]), l = V.useRef(), s = V.useRef(), a = V.useRef(), u = {}, d = {};
  Object.keys(o).forEach(function(c) {
    Object.prototype.hasOwnProperty.call(Fe.defaultOptions, c) ? u[c] = o[c] : d[c] = o[c];
  });
  var p = X(X({}, Fe.defaultOptions.classNames), u.classNames), f = X(X({}, i), { className: "".concat(p.contentWrapper).concat(i.className ? " ".concat(i.className) : ""), tabIndex: u.tabIndex || Fe.defaultOptions.tabIndex, role: "region", "aria-label": u.ariaLabel || Fe.defaultOptions.ariaLabel });
  return V.useEffect(function() {
    var c;
    return s.current = f.ref ? f.ref.current : s.current, l.current && (c = new Fe(l.current, X(X(X({}, u), s.current && {
      scrollableNode: s.current
    }), a.current && {
      contentNode: a.current
    })), typeof r == "function" ? r(c) : r && (r.current = c)), function() {
      c?.unMount(), c = null, typeof r == "function" && r(null);
    };
  }, []), V.createElement(
    "div",
    X({ "data-simplebar": "init", ref: l }, d),
    V.createElement(
      "div",
      { className: p.wrapper },
      V.createElement(
        "div",
        { className: p.heightAutoObserverWrapperEl },
        V.createElement("div", { className: p.heightAutoObserverEl })
      ),
      V.createElement(
        "div",
        { className: p.mask },
        V.createElement("div", { className: p.offset }, typeof n == "function" ? n({
          scrollableNodeRef: s,
          scrollableNodeProps: X(X({}, f), { ref: s }),
          contentNodeRef: a,
          contentNodeProps: {
            className: p.contentEl,
            ref: a
          }
        }) : V.createElement(
          "div",
          X({}, f),
          V.createElement("div", { className: p.contentEl }, n)
        ))
      ),
      V.createElement("div", { className: p.placeholder })
    ),
    V.createElement(
      "div",
      { className: "".concat(p.track, " ").concat(p.horizontal) },
      V.createElement("div", { className: p.scrollbar })
    ),
    V.createElement(
      "div",
      { className: "".concat(p.track, " ").concat(p.vertical) },
      V.createElement("div", { className: p.scrollbar })
    )
  );
});
Pt.displayName = "SimpleBar";
function cr(e, r, n, t) {
  return Fn({
    data: r,
    columns: e,
    state: {
      columnOrder: n
    },
    onColumnOrderChange: t,
    getCoreRowModel: xn()
  });
}
function dr(e) {
  const [r, n] = Y(0);
  return nt(() => {
    const t = e.current;
    if (!t) return;
    const i = new ResizeObserver((o) => {
      n(o[0].contentRect.width);
    });
    return i.observe(t), () => i.disconnect();
  }, [e]), r;
}
function gr() {
  const e = H(null), r = H([]), n = ee((i) => {
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
function fr({
  onResize: e,
  onResizeEnd: r,
  minWidth: n = 40
}) {
  const t = H(0), i = H(0), o = H(null), l = ee(
    (u) => {
      if (!o.current) return;
      const d = u.clientX - t.current, p = Math.max(n, i.current + d);
      e(o.current, p);
    },
    [n, e]
  ), s = ee(() => {
    o.current = null, document.removeEventListener("mousemove", l), document.removeEventListener("mouseup", s), r?.();
  }, [l, r]);
  return { startResize: ee(
    (u, d) => {
      u.preventDefault(), u.stopPropagation(), o.current = d.id, t.current = u.clientX, i.current = rt(d.columnDef.meta?.widthSize), document.addEventListener("mousemove", l), document.addEventListener("mouseup", s);
    },
    [l, s]
  ) };
}
function pr(e) {
  const [r, n] = Y(!1);
  return nt(() => {
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
function hr(e) {
  return we(() => {
    const r = e.getAllLeafColumns(), n = /* @__PURE__ */ new Map();
    for (const l of r)
      n.set(l.id, rt(l.columnDef.meta?.widthSize));
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
function mr({ setColumnOrder: e }) {
  const r = H(null), n = H(null), t = H(null), i = H(0), o = H(null), l = H(0), s = H([]), a = H(() => {
  }), u = H(() => {
  }), d = ee(() => {
    const c = Array.from(
      document.querySelectorAll("th[data-col-id]")
    );
    s.current = c.filter((h) => h.dataset.reorderable !== "false").map((h) => {
      const g = h.dataset.colId, S = h.getBoundingClientRect();
      return {
        id: g,
        left: S.left,
        right: S.right,
        center: S.left + S.width / 2
      };
    }).sort((h, g) => h.left - g.left);
  }, []), p = ee((c) => {
    const h = c.getBoundingClientRect(), g = c.cloneNode(!0);
    return g.classList.add("table-col-ghost"), g.style.position = "fixed", g.style.left = `${h.left}px`, g.style.top = `${h.top}px`, g.style.width = `${h.width}px`, g.style.height = `${h.height}px`, g.style.pointerEvents = "none", g.style.zIndex = "9999", g.style.willChange = "left", g.style.transition = "none", document.body.appendChild(g), g;
  }, []), f = ee(
    (c, h) => {
      r.current = c;
      const g = document.querySelector(`th[data-col-id="${c}"]`);
      if (!g) return;
      t.current = g;
      const S = g.getBoundingClientRect();
      i.current = h.clientX - S.left;
      const v = p(g);
      n.current = v, g.classList.add("is-dragging-col"), g.style.opacity = "0.2", d(), l.current = h.clientX, document.body.style.cursor = "grabbing", document.addEventListener("pointermove", a.current), document.addEventListener("pointerup", u.current);
    },
    [p, d]
  );
  return a.current = (c) => {
    !r.current || !n.current || (l.current = c.clientX, !o.current && (o.current = requestAnimationFrame(() => {
      if (o.current = null, !r.current || !n.current) return;
      const h = n.current, g = l.current - i.current;
      h.style.left = `${g}px`;
      const S = h.offsetWidth, v = g + S / 2, b = s.current;
      if (!b.length) return;
      let E = null;
      for (const M of b)
        if (M.id !== r.current && v >= M.left && v <= M.right) {
          E = M.id;
          break;
        }
      !E || E === r.current || (e((M) => {
        const P = M.indexOf(r.current), x = M.indexOf(E);
        if (P === -1 || x === -1 || P === x) return M;
        const F = [...M];
        return F.splice(P, 1), F.splice(x, 0, r.current), F;
      }), requestAnimationFrame(() => {
        d();
      }));
    })));
  }, u.current = () => {
    o.current && (cancelAnimationFrame(o.current), o.current = null), n.current?.remove(), n.current = null, t.current && (t.current.classList.remove("is-dragging-col"), t.current.style.opacity = ""), t.current = null, r.current = null, i.current = 0, l.current = 0, s.current = [], document.body.style.cursor = "", document.removeEventListener("pointermove", a.current), document.removeEventListener("pointerup", u.current);
  }, {
    startDrag: f
  };
}
function vr(e) {
  return "accessorKey" in e && typeof e.accessorKey == "string";
}
function Sr(e) {
  return e.map((r) => {
    if (r.id)
      return r;
    if (vr(r))
      return {
        ...r,
        id: r.accessorKey
      };
    throw new Error(
      "Columns sem id e sem accessorKey string. Defina um id explicitamente para esta coluna."
    );
  });
}
function wr(e) {
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
function Cr(e, r) {
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
function Rr(e) {
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
function _r({
  id: e,
  header: r,
  data: n,
  footer: t,
  tableHeight: i = "400px",
  resizableCol: o = !1,
  reorderableCol: l = !1,
  sortableCol: s = !0,
  onSortChange: a,
  onDataChange: u,
  stripedRows: d = !1,
  defaultTextAlign: p = "left",
  editable: f = !1,
  draggable: c = !1,
  draggableSticky: h = !1,
  selectable: g,
  expandable: S,
  pagination: v,
  loading: b,
  loadingCustom: E,
  noResultMessage: M = "Nenhum resultado encontrado.",
  onRowClick: P,
  hoverableRow: x,
  borders: F = "full",
  style: O = "default"
}) {
  const j = H(null), te = ee(
    (A) => {
      j.current = A;
    },
    []
  ), [le, se] = Y(null), ye = ee(
    (A) => {
      se(A), a?.(A);
    },
    [a]
  ), {
    bodyRef: ae,
    registerSyncElement: he,
    onBodyScroll: z
  } = gr(), $ = dr(ae), T = pr(ae), [q, xe] = Y({}), me = we(
    () => new Set(g?.initialSelectRow || []),
    [g?.initialSelectRow]
  ), [Q, ve] = Y(me);
  Ie(() => {
    g?.initialSelectRow && ve(new Set(g.initialSelectRow));
  }, [g?.initialSelectRow]), Ie(() => {
    g?.onSelectedRowsChange?.(Array.from(Q));
  }, [Q, g]);
  const [R, I] = Y(/* @__PURE__ */ new Set()), k = we(
    () => Sr(
      (() => {
        const A = [];
        return c && A.push(wr(h)), g && A.push(Cr(
          g.sticky,
          g.label
        )), S && A.push(Rr(S.sticky)), [...A, ...r];
      })()
    ),
    [
      r,
      c,
      h,
      g,
      S
    ]
  ), [y, Z] = Y(
    () => k.map((A) => A.id)
  ), [D, ue] = Y(n);
  Ie(() => {
    ue(n);
  }, [n]), Ie(() => {
    u?.(D);
  }, [D, u]);
  const Se = we(
    () => k.map((A) => ({
      ...A,
      meta: {
        ...A.meta,
        widthSize: q[A.id] ?? A.meta?.widthSize
      }
    })),
    [k, q]
  ), _ = cr(
    Se,
    D,
    y,
    Z
  ), ne = hr(_), { startResize: N } = fr({
    onResize: (A, re) => {
      xe((J) => ({
        ...J,
        [A]: `${re}px`
      }));
    },
    onResizeEnd: () => {
      requestAnimationFrame(() => {
        j.current?.recalculate();
      });
    }
  }), { startDrag: _e } = mr({
    setColumnOrder: Z
  });
  return nt(() => {
    j.current?.recalculate();
  }, [T]), /* @__PURE__ */ W("div", { id: e, className: `super-table-wrapper borders-${F} style-${O}`, style: { height: i }, children: [
    /* @__PURE__ */ m(
      Vt,
      {
        table: _,
        scrollRef: he,
        tableWidth: $,
        stickyById: ne,
        resizableCol: o,
        reorderableCol: l,
        sortableCol: s,
        sortState: le,
        setSortState: ye,
        onResizeStart: N,
        onDragStart: _e,
        defaultTextAlign: p,
        selectable: g,
        selectedRows: Q,
        setSelectedRows: ve,
        disableSelectRow: g?.disableSelectRow || [],
        data: n,
        expandable: S,
        expandedRows: R,
        setExpandedRows: I
      }
    ),
    /* @__PURE__ */ W("div", { className: "internal-table", children: [
      /* @__PURE__ */ m(
        zt,
        {
          table: _,
          scrollRef: he,
          tableWidth: $,
          stickyById: ne,
          defaultTextAlign: p
        }
      ),
      /* @__PURE__ */ W("div", { className: `table-body-area ${T ? "has-h-scroll" : "no-h-scroll"}`, children: [
        /* @__PURE__ */ m(
          Pt,
          {
            ref: te,
            className: "table-body-scroll",
            scrollableNodeProps: {
              ref: ae,
              onScroll: z
            },
            children: /* @__PURE__ */ m(
              Mn,
              {
                table: _,
                tableWidth: $,
                stickyById: ne,
                defaultTextAlign: p,
                editable: f,
                draggable: c,
                setData: ue,
                setInternalData: ue,
                selectable: g,
                selectedRows: Q,
                setSelectedRows: ve,
                disableSelectRow: g?.disableSelectRow || [],
                expandable: S,
                expandedRows: R,
                setExpandedRows: I,
                loading: b,
                loadingCustom: E,
                noResultMessage: M,
                onRowClick: P,
                totalItems: v?.totalItems,
                stripedRows: d,
                hoverableRow: x
              }
            )
          }
        ),
        /* @__PURE__ */ m(
          On,
          {
            table: _,
            scrollRef: he,
            tableWidth: $,
            stickyById: ne,
            defaultTextAlign: p
          }
        )
      ] })
    ] }),
    t && /* @__PURE__ */ m(In, { table: _, children: t }),
    v && /* @__PURE__ */ m(
      An,
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
  _r as SuperTable
};
