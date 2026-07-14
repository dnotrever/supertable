import { jsx as v, jsxs as j, Fragment as Nt } from "react/jsx-runtime";
import * as z from "react";
import { useCallback as K, useMemo as pe, useRef as H, useState as te, useLayoutEffect as lt, useEffect as Fe } from "react";
function Ht(e) {
  const r = e.columnDef.meta;
  return !(r?.resizable === !1 || r?.sticky && r.resizable !== !0);
}
function Ae(e, r) {
  return e.columnDef.meta?.textAlign ?? r;
}
function st(e) {
  return e && e.endsWith("px") ? parseFloat(e) : 0;
}
function We({ table: e, tableWidth: r }) {
  const n = e.getVisibleLeafColumns(), o = n.map(
    (l) => st(l.columnDef.meta?.widthSize)
  ).reduce((l, s) => l + s, 0) > r;
  return /* @__PURE__ */ v("colgroup", { children: n.map((l, s) => {
    const a = l.columnDef.meta, u = s === n.length - 1;
    let f;
    return !o && u ? f = { width: "auto" } : a?.widthSize && (f = { width: a.widthSize }), /* @__PURE__ */ v("col", { style: f }, l.id);
  }) });
}
function Tt({
  table: e,
  tableWidth: r,
  data: n,
  stickyById: t,
  resizableCol: i = !1,
  reorderableCol: o = !1,
  reorderableColIconPosition: l = "right",
  sortableCol: s = !0,
  sortState: a,
  setSortState: u,
  defaultTextAlign: f,
  selectable: d,
  selectedRows: g,
  disableSelectRow: c,
  onDragStart: m,
  scrollRef: S,
  onResizeStart: p,
  setSelectedRows: h,
  expandable: w,
  expandedRows: y,
  setExpandedRows: b
}) {
  const I = n.map((k, M) => typeof k == "object" && k !== null && "id" in k ? k.id ?? M : M), E = !!d, P = d?.label, V = I.filter((k) => !c.includes(k)), G = V.filter((k) => g.has(k)).length, F = G === V.length && V.length > 0, A = G > 0 && G < V.length, W = () => {
    h((k) => {
      const M = new Set(k);
      return F ? V.forEach((q) => M.delete(q)) : V.forEach((q) => M.add(q)), M;
    });
  }, ve = !!w, $e = w?.expandAllButton || !1, ne = I.every((k) => y.has(k)), Se = () => {
    b(ne ? /* @__PURE__ */ new Set() : new Set(I));
  };
  return /* @__PURE__ */ v("div", { className: "table-scroll-sync", ref: S, children: /* @__PURE__ */ j("table", { className: "table table-external-header", children: [
    /* @__PURE__ */ v(
      We,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ v("thead", { children: e.getHeaderGroups().map((k) => /* @__PURE__ */ v("tr", { children: k.headers.map((M) => {
      const q = M.column.columnDef.meta, X = t.get(M.column.id), Ce = Ae(M.column, f), ue = o && q?.reorderable !== !1 && !q?.sticky, le = (q?.sortable ?? s) && !q?.sticky && !["__draggable__", "__selectable__", "__expandable__"].includes(M.column.id), ce = a?.columnId === M.column.id, ye = () => {
        if (!le) return;
        let R;
        !a || a.columnId !== M.column.id ? R = { columnId: M.column.id, direction: "asc" } : a.direction === "asc" ? R = { columnId: M.column.id, direction: "desc" } : R = null, u(R);
      }, Re = [
        X ? "is-sticky" : "",
        X?.side === "left" ? "is-sticky-left" : "",
        X?.side === "right" ? "is-sticky-right" : "",
        le ? "is-sortable" : "",
        ce ? `is-sorted-${a.direction}` : ""
      ].filter(Boolean).join(" "), C = X ? X.side === "left" ? { "--sticky-left": `${X.offset}px` } : { "--sticky-right": `${X.offset}px` } : void 0;
      return /* @__PURE__ */ v(
        "th",
        {
          "data-col-id": M.column.id,
          "data-fixed": q?.sticky ? "true" : void 0,
          "data-reorderable": ue ? void 0 : "false",
          className: Re,
          style: C,
          onClick: ye,
          children: /* @__PURE__ */ j(
            "div",
            {
              className: [
                "th-content",
                `align-${Ce}`,
                ue ? `reorder-icon-${l}` : ""
              ].filter(Boolean).join(" "),
              children: [
                /* @__PURE__ */ v("div", { children: M.isPlaceholder ? null : M.column.id === "__selectable__" && E ? /* @__PURE__ */ j("label", { children: [
                  /* @__PURE__ */ v(
                    "input",
                    {
                      type: "checkbox",
                      checked: F,
                      ref: (R) => {
                        R && (R.indeterminate = A);
                      },
                      onChange: W
                    }
                  ),
                  P
                ] }) : M.column.id === "__expandable__" && ve && $e ? /* @__PURE__ */ v(
                  "button",
                  {
                    onClick: Se,
                    className: `expand-all-button ${ne ? "expanded" : ""}`,
                    children: "⇅"
                  }
                ) : (() => {
                  const R = M.column.columnDef.header;
                  return typeof R == "function" ? R({ column: M.column, table: e, header: M }) : R;
                })() }),
                le && /* @__PURE__ */ v("div", { className: "th-actions th-sort-actions", children: /* @__PURE__ */ v("span", { className: "sort-indicator" }) }),
                ue && /* @__PURE__ */ v(
                  "div",
                  {
                    className: `th-actions th-reorder-actions position-${l}`,
                    children: /* @__PURE__ */ v(
                      "span",
                      {
                        className: "col-drag-handle",
                        onClick: (R) => R.stopPropagation(),
                        onPointerDown: (R) => {
                          R.preventDefault(), R.currentTarget.setPointerCapture(R.pointerId), m?.(M.column.id, R.nativeEvent);
                        },
                        children: "☰"
                      }
                    )
                  }
                ),
                i && p && Ht(M.column) && /* @__PURE__ */ v(
                  "span",
                  {
                    className: "col-resize-handle",
                    onClick: (R) => R.stopPropagation(),
                    onMouseDown: (R) => p(R, M.column)
                  }
                )
              ]
            }
          )
        },
        M.id
      );
    }) }, k.id)) })
  ] }) });
}
function Gt({
  table: e,
  tableWidth: r,
  stickyById: n,
  defaultTextAlign: t,
  scrollRef: i
}) {
  return e.getVisibleLeafColumns().some(
    (s) => s.columnDef.meta?.internalHeader != null
  ) ? /* @__PURE__ */ v("div", { className: "table-scroll-sync", ref: i, children: /* @__PURE__ */ j("table", { className: "table table-internal-header", children: [
    /* @__PURE__ */ v(
      We,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ v("thead", { children: /* @__PURE__ */ v("tr", { children: e.getVisibleLeafColumns().map((s) => {
      const a = s.columnDef.meta?.internalHeader, u = n.get(s.id), f = Ae(s, t), d = [
        u ? "is-sticky" : "",
        u?.side === "left" ? "is-sticky-left" : "",
        u?.side === "right" ? "is-sticky-right" : ""
      ].filter(Boolean).join(" "), g = u ? u.side === "left" ? { "--sticky-left": `${u.offset}px` } : { "--sticky-right": `${u.offset}px` } : void 0;
      return /* @__PURE__ */ v(
        "th",
        {
          className: `${d} align-${f}`,
          style: g,
          children: typeof a == "function" ? a() : a ?? null
        },
        s.id
      );
    }) }) })
  ] }) }) : null;
}
function he(e, r) {
  return typeof e == "function" ? e(r) : e;
}
function Z(e, r) {
  return (n) => {
    r.setState((t) => ({
      ...t,
      [e]: he(n, t[e])
    }));
  };
}
function Be(e) {
  return e instanceof Function;
}
function Wt(e) {
  return Array.isArray(e) && e.every((r) => typeof r == "number");
}
function Bt(e, r) {
  const n = [], t = (i) => {
    i.forEach((o) => {
      n.push(o);
      const l = r(o);
      l != null && l.length && t(l);
    });
  };
  return t(e), n;
}
function x(e, r, n) {
  let t = [], i;
  return (o) => {
    let l;
    n.key && n.debug && (l = Date.now());
    const s = e(o);
    if (!(s.length !== t.length || s.some((f, d) => t[d] !== f)))
      return i;
    t = s;
    let u;
    if (n.key && n.debug && (u = Date.now()), i = r(...s), n == null || n.onChange == null || n.onChange(i), n.key && n.debug && n != null && n.debug()) {
      const f = Math.round((Date.now() - l) * 100) / 100, d = Math.round((Date.now() - u) * 100) / 100, g = d / 16, c = (m, S) => {
        for (m = String(m); m.length < S; )
          m = " " + m;
        return m;
      };
      console.info(`%c⏱ ${c(d, 5)} /${c(f, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * g, 120))}deg 100% 31%);`, n?.key);
    }
    return i;
  };
}
function _(e, r, n, t) {
  return {
    debug: () => {
      var i;
      return (i = e?.debugAll) != null ? i : e[r];
    },
    key: process.env.NODE_ENV === "development" && n,
    onChange: t
  };
}
function jt(e, r, n, t) {
  const i = () => {
    var l;
    return (l = o.getValue()) != null ? l : e.options.renderFallbackValue;
  }, o = {
    id: `${r.id}_${n.id}`,
    row: r,
    column: n,
    getValue: () => r.getValue(t),
    renderValue: i,
    getContext: x(() => [e, n, r, o], (l, s, a, u) => ({
      table: l,
      column: s,
      row: a,
      cell: u,
      getValue: u.getValue,
      renderValue: u.renderValue
    }), _(e.options, "debugCells", "cell.getContext"))
  };
  return e._features.forEach((l) => {
    l.createCell == null || l.createCell(o, n, r, e);
  }, {}), o;
}
function qt(e, r, n, t) {
  var i, o;
  const s = {
    ...e._getDefaultColumnDef(),
    ...r
  }, a = s.accessorKey;
  let u = (i = (o = s.id) != null ? o : a ? typeof String.prototype.replaceAll == "function" ? a.replaceAll(".", "_") : a.replace(/\./g, "_") : void 0) != null ? i : typeof s.header == "string" ? s.header : void 0, f;
  if (s.accessorFn ? f = s.accessorFn : a && (a.includes(".") ? f = (g) => {
    let c = g;
    for (const S of a.split(".")) {
      var m;
      c = (m = c) == null ? void 0 : m[S], process.env.NODE_ENV !== "production" && c === void 0 && console.warn(`"${S}" in deeply nested key "${a}" returned undefined.`);
    }
    return c;
  } : f = (g) => g[s.accessorKey]), !u)
    throw process.env.NODE_ENV !== "production" ? new Error(s.accessorFn ? "Columns require an id when using an accessorFn" : "Columns require an id when using a non-string header") : new Error();
  let d = {
    id: `${String(u)}`,
    accessorFn: f,
    parent: t,
    depth: n,
    columnDef: s,
    columns: [],
    getFlatColumns: x(() => [!0], () => {
      var g;
      return [d, ...(g = d.columns) == null ? void 0 : g.flatMap((c) => c.getFlatColumns())];
    }, _(e.options, "debugColumns", "column.getFlatColumns")),
    getLeafColumns: x(() => [e._getOrderColumnsFn()], (g) => {
      var c;
      if ((c = d.columns) != null && c.length) {
        let m = d.columns.flatMap((S) => S.getLeafColumns());
        return g(m);
      }
      return [d];
    }, _(e.options, "debugColumns", "column.getLeafColumns"))
  };
  for (const g of e._features)
    g.createColumn == null || g.createColumn(d, e);
  return d;
}
const B = "debugHeaders";
function gt(e, r, n) {
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
const Xt = {
  createTable: (e) => {
    e.getHeaderGroups = x(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (r, n, t, i) => {
      var o, l;
      const s = (o = t?.map((d) => n.find((g) => g.id === d)).filter(Boolean)) != null ? o : [], a = (l = i?.map((d) => n.find((g) => g.id === d)).filter(Boolean)) != null ? l : [], u = n.filter((d) => !(t != null && t.includes(d.id)) && !(i != null && i.includes(d.id)));
      return De(r, [...s, ...u, ...a], e);
    }, _(e.options, B, "getHeaderGroups")), e.getCenterHeaderGroups = x(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (r, n, t, i) => (n = n.filter((o) => !(t != null && t.includes(o.id)) && !(i != null && i.includes(o.id))), De(r, n, e, "center")), _(e.options, B, "getCenterHeaderGroups")), e.getLeftHeaderGroups = x(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left], (r, n, t) => {
      var i;
      const o = (i = t?.map((l) => n.find((s) => s.id === l)).filter(Boolean)) != null ? i : [];
      return De(r, o, e, "left");
    }, _(e.options, B, "getLeftHeaderGroups")), e.getRightHeaderGroups = x(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.right], (r, n, t) => {
      var i;
      const o = (i = t?.map((l) => n.find((s) => s.id === l)).filter(Boolean)) != null ? i : [];
      return De(r, o, e, "right");
    }, _(e.options, B, "getRightHeaderGroups")), e.getFooterGroups = x(() => [e.getHeaderGroups()], (r) => [...r].reverse(), _(e.options, B, "getFooterGroups")), e.getLeftFooterGroups = x(() => [e.getLeftHeaderGroups()], (r) => [...r].reverse(), _(e.options, B, "getLeftFooterGroups")), e.getCenterFooterGroups = x(() => [e.getCenterHeaderGroups()], (r) => [...r].reverse(), _(e.options, B, "getCenterFooterGroups")), e.getRightFooterGroups = x(() => [e.getRightHeaderGroups()], (r) => [...r].reverse(), _(e.options, B, "getRightFooterGroups")), e.getFlatHeaders = x(() => [e.getHeaderGroups()], (r) => r.map((n) => n.headers).flat(), _(e.options, B, "getFlatHeaders")), e.getLeftFlatHeaders = x(() => [e.getLeftHeaderGroups()], (r) => r.map((n) => n.headers).flat(), _(e.options, B, "getLeftFlatHeaders")), e.getCenterFlatHeaders = x(() => [e.getCenterHeaderGroups()], (r) => r.map((n) => n.headers).flat(), _(e.options, B, "getCenterFlatHeaders")), e.getRightFlatHeaders = x(() => [e.getRightHeaderGroups()], (r) => r.map((n) => n.headers).flat(), _(e.options, B, "getRightFlatHeaders")), e.getCenterLeafHeaders = x(() => [e.getCenterFlatHeaders()], (r) => r.filter((n) => {
      var t;
      return !((t = n.subHeaders) != null && t.length);
    }), _(e.options, B, "getCenterLeafHeaders")), e.getLeftLeafHeaders = x(() => [e.getLeftFlatHeaders()], (r) => r.filter((n) => {
      var t;
      return !((t = n.subHeaders) != null && t.length);
    }), _(e.options, B, "getLeftLeafHeaders")), e.getRightLeafHeaders = x(() => [e.getRightFlatHeaders()], (r) => r.filter((n) => {
      var t;
      return !((t = n.subHeaders) != null && t.length);
    }), _(e.options, B, "getRightLeafHeaders")), e.getLeafHeaders = x(() => [e.getLeftHeaderGroups(), e.getCenterHeaderGroups(), e.getRightHeaderGroups()], (r, n, t) => {
      var i, o, l, s, a, u;
      return [...(i = (o = r[0]) == null ? void 0 : o.headers) != null ? i : [], ...(l = (s = n[0]) == null ? void 0 : s.headers) != null ? l : [], ...(a = (u = t[0]) == null ? void 0 : u.headers) != null ? a : []].map((f) => f.getLeafHeaders()).flat();
    }, _(e.options, B, "getLeafHeaders"));
  }
};
function De(e, r, n, t) {
  var i, o;
  let l = 0;
  const s = function(g, c) {
    c === void 0 && (c = 1), l = Math.max(l, c), g.filter((m) => m.getIsVisible()).forEach((m) => {
      var S;
      (S = m.columns) != null && S.length && s(m.columns, c + 1);
    }, 0);
  };
  s(e);
  let a = [];
  const u = (g, c) => {
    const m = {
      depth: c,
      id: [t, `${c}`].filter(Boolean).join("_"),
      headers: []
    }, S = [];
    g.forEach((p) => {
      const h = [...S].reverse()[0], w = p.column.depth === m.depth;
      let y, b = !1;
      if (w && p.column.parent ? y = p.column.parent : (y = p.column, b = !0), h && h?.column === y)
        h.subHeaders.push(p);
      else {
        const I = gt(n, y, {
          id: [t, c, y.id, p?.id].filter(Boolean).join("_"),
          isPlaceholder: b,
          placeholderId: b ? `${S.filter((E) => E.column === y).length}` : void 0,
          depth: c,
          index: S.length
        });
        I.subHeaders.push(p), S.push(I);
      }
      m.headers.push(p), p.headerGroup = m;
    }), a.push(m), c > 0 && u(S, c - 1);
  }, f = r.map((g, c) => gt(n, g, {
    depth: l,
    index: c
  }));
  u(f, l - 1), a.reverse();
  const d = (g) => g.filter((m) => m.column.getIsVisible()).map((m) => {
    let S = 0, p = 0, h = [0];
    m.subHeaders && m.subHeaders.length ? (h = [], d(m.subHeaders).forEach((y) => {
      let {
        colSpan: b,
        rowSpan: I
      } = y;
      S += b, h.push(I);
    })) : S = 1;
    const w = Math.min(...h);
    return p = p + w, m.colSpan = S, m.rowSpan = p, {
      colSpan: S,
      rowSpan: p
    };
  });
  return d((i = (o = a[0]) == null ? void 0 : o.headers) != null ? i : []), a;
}
const Yt = (e, r, n, t, i, o, l) => {
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
    getLeafRows: () => Bt(s.subRows, (a) => a.subRows),
    getParentRow: () => s.parentId ? e.getRow(s.parentId, !0) : void 0,
    getParentRows: () => {
      let a = [], u = s;
      for (; ; ) {
        const f = u.getParentRow();
        if (!f) break;
        a.push(f), u = f;
      }
      return a.reverse();
    },
    getAllCells: x(() => [e.getAllLeafColumns()], (a) => a.map((u) => jt(e, s, u, u.id)), _(e.options, "debugRows", "getAllCells")),
    _getAllCellsByColumnId: x(() => [s.getAllCells()], (a) => a.reduce((u, f) => (u[f.column.id] = f, u), {}), _(e.options, "debugRows", "getAllCellsByColumnId"))
  };
  for (let a = 0; a < e._features.length; a++) {
    const u = e._features[a];
    u == null || u.createRow == null || u.createRow(s, e);
  }
  return s;
}, Ut = {
  createColumn: (e, r) => {
    e._getFacetedRowModel = r.options.getFacetedRowModel && r.options.getFacetedRowModel(r, e.id), e.getFacetedRowModel = () => e._getFacetedRowModel ? e._getFacetedRowModel() : r.getPreFilteredRowModel(), e._getFacetedUniqueValues = r.options.getFacetedUniqueValues && r.options.getFacetedUniqueValues(r, e.id), e.getFacetedUniqueValues = () => e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getFacetedMinMaxValues = r.options.getFacetedMinMaxValues && r.options.getFacetedMinMaxValues(r, e.id), e.getFacetedMinMaxValues = () => {
      if (e._getFacetedMinMaxValues)
        return e._getFacetedMinMaxValues();
    };
  }
}, Ct = (e, r, n) => {
  var t, i;
  const o = n == null || (t = n.toString()) == null ? void 0 : t.toLowerCase();
  return !!(!((i = e.getValue(r)) == null || (i = i.toString()) == null || (i = i.toLowerCase()) == null) && i.includes(o));
};
Ct.autoRemove = (e) => oe(e);
const yt = (e, r, n) => {
  var t;
  return !!(!((t = e.getValue(r)) == null || (t = t.toString()) == null) && t.includes(n));
};
yt.autoRemove = (e) => oe(e);
const Rt = (e, r, n) => {
  var t;
  return ((t = e.getValue(r)) == null || (t = t.toString()) == null ? void 0 : t.toLowerCase()) === n?.toLowerCase();
};
Rt.autoRemove = (e) => oe(e);
const xt = (e, r, n) => {
  var t;
  return (t = e.getValue(r)) == null ? void 0 : t.includes(n);
};
xt.autoRemove = (e) => oe(e);
const _t = (e, r, n) => !n.some((t) => {
  var i;
  return !((i = e.getValue(r)) != null && i.includes(t));
});
_t.autoRemove = (e) => oe(e) || !(e != null && e.length);
const Et = (e, r, n) => n.some((t) => {
  var i;
  return (i = e.getValue(r)) == null ? void 0 : i.includes(t);
});
Et.autoRemove = (e) => oe(e) || !(e != null && e.length);
const bt = (e, r, n) => e.getValue(r) === n;
bt.autoRemove = (e) => oe(e);
const $t = (e, r, n) => e.getValue(r) == n;
$t.autoRemove = (e) => oe(e);
const at = (e, r, n) => {
  let [t, i] = n;
  const o = e.getValue(r);
  return o >= t && o <= i;
};
at.resolveFilterValue = (e) => {
  let [r, n] = e, t = typeof r != "number" ? parseFloat(r) : r, i = typeof n != "number" ? parseFloat(n) : n, o = r === null || Number.isNaN(t) ? -1 / 0 : t, l = n === null || Number.isNaN(i) ? 1 / 0 : i;
  if (o > l) {
    const s = o;
    o = l, l = s;
  }
  return [o, l];
};
at.autoRemove = (e) => oe(e) || oe(e[0]) && oe(e[1]);
const ae = {
  includesString: Ct,
  includesStringSensitive: yt,
  equalsString: Rt,
  arrIncludes: xt,
  arrIncludesAll: _t,
  arrIncludesSome: Et,
  equals: bt,
  weakEquals: $t,
  inNumberRange: at
};
function oe(e) {
  return e == null || e === "";
}
const Kt = {
  getDefaultColumnDef: () => ({
    filterFn: "auto"
  }),
  getInitialState: (e) => ({
    columnFilters: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnFiltersChange: Z("columnFilters", e),
    filterFromLeafRows: !1,
    maxLeafRowFilterDepth: 100
  }),
  createColumn: (e, r) => {
    e.getAutoFilterFn = () => {
      const n = r.getCoreRowModel().flatRows[0], t = n?.getValue(e.id);
      return typeof t == "string" ? ae.includesString : typeof t == "number" ? ae.inNumberRange : typeof t == "boolean" || t !== null && typeof t == "object" ? ae.equals : Array.isArray(t) ? ae.arrIncludes : ae.weakEquals;
    }, e.getFilterFn = () => {
      var n, t;
      return Be(e.columnDef.filterFn) ? e.columnDef.filterFn : e.columnDef.filterFn === "auto" ? e.getAutoFilterFn() : (
        // @ts-ignore
        (n = (t = r.options.filterFns) == null ? void 0 : t[e.columnDef.filterFn]) != null ? n : ae[e.columnDef.filterFn]
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
        const i = e.getFilterFn(), o = t?.find((f) => f.id === e.id), l = he(n, o ? o.value : void 0);
        if (ft(i, l, e)) {
          var s;
          return (s = t?.filter((f) => f.id !== e.id)) != null ? s : [];
        }
        const a = {
          id: e.id,
          value: l
        };
        if (o) {
          var u;
          return (u = t?.map((f) => f.id === e.id ? a : f)) != null ? u : [];
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
        return (o = he(r, i)) == null ? void 0 : o.filter((l) => {
          const s = n.find((a) => a.id === l.id);
          if (s) {
            const a = s.getFilterFn();
            if (ft(a, l.value, s))
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
function ft(e, r, n) {
  return (e && e.autoRemove ? e.autoRemove(r, n) : !1) || typeof r > "u" || typeof r == "string" && !r;
}
const Qt = (e, r, n) => n.reduce((t, i) => {
  const o = i.getValue(e);
  return t + (typeof o == "number" ? o : 0);
}, 0), Zt = (e, r, n) => {
  let t;
  return n.forEach((i) => {
    const o = i.getValue(e);
    o != null && (t > o || t === void 0 && o >= o) && (t = o);
  }), t;
}, Jt = (e, r, n) => {
  let t;
  return n.forEach((i) => {
    const o = i.getValue(e);
    o != null && (t < o || t === void 0 && o >= o) && (t = o);
  }), t;
}, en = (e, r, n) => {
  let t, i;
  return n.forEach((o) => {
    const l = o.getValue(e);
    l != null && (t === void 0 ? l >= l && (t = i = l) : (t > l && (t = l), i < l && (i = l)));
  }), [t, i];
}, tn = (e, r) => {
  let n = 0, t = 0;
  if (r.forEach((i) => {
    let o = i.getValue(e);
    o != null && (o = +o) >= o && (++n, t += o);
  }), n) return t / n;
}, nn = (e, r) => {
  if (!r.length)
    return;
  const n = r.map((o) => o.getValue(e));
  if (!Wt(n))
    return;
  if (n.length === 1)
    return n[0];
  const t = Math.floor(n.length / 2), i = n.sort((o, l) => o - l);
  return n.length % 2 !== 0 ? i[t] : (i[t - 1] + i[t]) / 2;
}, rn = (e, r) => Array.from(new Set(r.map((n) => n.getValue(e))).values()), on = (e, r) => new Set(r.map((n) => n.getValue(e))).size, ln = (e, r) => r.length, qe = {
  sum: Qt,
  min: Zt,
  max: Jt,
  extent: en,
  mean: tn,
  median: nn,
  unique: rn,
  uniqueCount: on,
  count: ln
}, sn = {
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
    onGroupingChange: Z("grouping", e),
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
        return qe.sum;
      if (Object.prototype.toString.call(t) === "[object Date]")
        return qe.extent;
    }, e.getAggregationFn = () => {
      var n, t;
      if (!e)
        throw new Error();
      return Be(e.columnDef.aggregationFn) ? e.columnDef.aggregationFn : e.columnDef.aggregationFn === "auto" ? e.getAutoAggregationFn() : (n = (t = r.options.aggregationFns) == null ? void 0 : t[e.columnDef.aggregationFn]) != null ? n : qe[e.columnDef.aggregationFn];
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
function an(e, r, n) {
  if (!(r != null && r.length) || !n)
    return e;
  const t = e.filter((o) => !r.includes(o.id));
  return n === "remove" ? t : [...r.map((o) => e.find((l) => l.id === o)).filter(Boolean), ...t];
}
const un = {
  getInitialState: (e) => ({
    columnOrder: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnOrderChange: Z("columnOrder", e)
  }),
  createColumn: (e, r) => {
    e.getIndex = x((n) => [Ve(r, n)], (n) => n.findIndex((t) => t.id === e.id), _(r.options, "debugColumns", "getIndex")), e.getIsFirstColumn = (n) => {
      var t;
      return ((t = Ve(r, n)[0]) == null ? void 0 : t.id) === e.id;
    }, e.getIsLastColumn = (n) => {
      var t;
      const i = Ve(r, n);
      return ((t = i[i.length - 1]) == null ? void 0 : t.id) === e.id;
    };
  },
  createTable: (e) => {
    e.setColumnOrder = (r) => e.options.onColumnOrderChange == null ? void 0 : e.options.onColumnOrderChange(r), e.resetColumnOrder = (r) => {
      var n;
      e.setColumnOrder(r ? [] : (n = e.initialState.columnOrder) != null ? n : []);
    }, e._getOrderColumnsFn = x(() => [e.getState().columnOrder, e.getState().grouping, e.options.groupedColumnMode], (r, n, t) => (i) => {
      let o = [];
      if (!(r != null && r.length))
        o = i;
      else {
        const l = [...r], s = [...i];
        for (; s.length && l.length; ) {
          const a = l.shift(), u = s.findIndex((f) => f.id === a);
          u > -1 && o.push(s.splice(u, 1)[0]);
        }
        o = [...o, ...s];
      }
      return an(o, n, t);
    }, _(e.options, "debugTable", "_getOrderColumnsFn"));
  }
}, Xe = () => ({
  left: [],
  right: []
}), cn = {
  getInitialState: (e) => ({
    columnPinning: Xe(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnPinningChange: Z("columnPinning", e)
  }),
  createColumn: (e, r) => {
    e.pin = (n) => {
      const t = e.getLeafColumns().map((i) => i.id).filter(Boolean);
      r.setColumnPinning((i) => {
        var o, l;
        if (n === "right") {
          var s, a;
          return {
            left: ((s = i?.left) != null ? s : []).filter((d) => !(t != null && t.includes(d))),
            right: [...((a = i?.right) != null ? a : []).filter((d) => !(t != null && t.includes(d))), ...t]
          };
        }
        if (n === "left") {
          var u, f;
          return {
            left: [...((u = i?.left) != null ? u : []).filter((d) => !(t != null && t.includes(d))), ...t],
            right: ((f = i?.right) != null ? f : []).filter((d) => !(t != null && t.includes(d)))
          };
        }
        return {
          left: ((o = i?.left) != null ? o : []).filter((d) => !(t != null && t.includes(d))),
          right: ((l = i?.right) != null ? l : []).filter((d) => !(t != null && t.includes(d)))
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
    e.getCenterVisibleCells = x(() => [e._getAllVisibleCells(), r.getState().columnPinning.left, r.getState().columnPinning.right], (n, t, i) => {
      const o = [...t ?? [], ...i ?? []];
      return n.filter((l) => !o.includes(l.column.id));
    }, _(r.options, "debugRows", "getCenterVisibleCells")), e.getLeftVisibleCells = x(() => [e._getAllVisibleCells(), r.getState().columnPinning.left], (n, t) => (t ?? []).map((o) => n.find((l) => l.column.id === o)).filter(Boolean).map((o) => ({
      ...o,
      position: "left"
    })), _(r.options, "debugRows", "getLeftVisibleCells")), e.getRightVisibleCells = x(() => [e._getAllVisibleCells(), r.getState().columnPinning.right], (n, t) => (t ?? []).map((o) => n.find((l) => l.column.id === o)).filter(Boolean).map((o) => ({
      ...o,
      position: "right"
    })), _(r.options, "debugRows", "getRightVisibleCells"));
  },
  createTable: (e) => {
    e.setColumnPinning = (r) => e.options.onColumnPinningChange == null ? void 0 : e.options.onColumnPinningChange(r), e.resetColumnPinning = (r) => {
      var n, t;
      return e.setColumnPinning(r ? Xe() : (n = (t = e.initialState) == null ? void 0 : t.columnPinning) != null ? n : Xe());
    }, e.getIsSomeColumnsPinned = (r) => {
      var n;
      const t = e.getState().columnPinning;
      if (!r) {
        var i, o;
        return !!((i = t.left) != null && i.length || (o = t.right) != null && o.length);
      }
      return !!((n = t[r]) != null && n.length);
    }, e.getLeftLeafColumns = x(() => [e.getAllLeafColumns(), e.getState().columnPinning.left], (r, n) => (n ?? []).map((t) => r.find((i) => i.id === t)).filter(Boolean), _(e.options, "debugColumns", "getLeftLeafColumns")), e.getRightLeafColumns = x(() => [e.getAllLeafColumns(), e.getState().columnPinning.right], (r, n) => (n ?? []).map((t) => r.find((i) => i.id === t)).filter(Boolean), _(e.options, "debugColumns", "getRightLeafColumns")), e.getCenterLeafColumns = x(() => [e.getAllLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (r, n, t) => {
      const i = [...n ?? [], ...t ?? []];
      return r.filter((o) => !i.includes(o.id));
    }, _(e.options, "debugColumns", "getCenterLeafColumns"));
  }
};
function dn(e) {
  return e || (typeof document < "u" ? document : null);
}
const ke = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
}, Ye = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: !1,
  columnSizingStart: []
}), gn = {
  getDefaultColumnDef: () => ke,
  getInitialState: (e) => ({
    columnSizing: {},
    columnSizingInfo: Ye(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnSizingChange: Z("columnSizing", e),
    onColumnSizingInfoChange: Z("columnSizingInfo", e)
  }),
  createColumn: (e, r) => {
    e.getSize = () => {
      var n, t, i;
      const o = r.getState().columnSizing[e.id];
      return Math.min(Math.max((n = e.columnDef.minSize) != null ? n : ke.minSize, (t = o ?? e.columnDef.size) != null ? t : ke.size), (i = e.columnDef.maxSize) != null ? i : ke.maxSize);
    }, e.getStart = x((n) => [n, Ve(r, n), r.getState().columnSizing], (n, t) => t.slice(0, e.getIndex(n)).reduce((i, o) => i + o.getSize(), 0), _(r.options, "debugColumns", "getStart")), e.getAfter = x((n) => [n, Ve(r, n), r.getState().columnSizing], (n, t) => t.slice(e.getIndex(n) + 1).reduce((i, o) => i + o.getSize(), 0), _(r.options, "debugColumns", "getAfter")), e.resetSize = () => {
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
        if (!t || !i || (o.persist == null || o.persist(), Ue(o) && o.touches && o.touches.length > 1))
          return;
        const l = e.getSize(), s = e ? e.getLeafHeaders().map((h) => [h.column.id, h.column.getSize()]) : [[t.id, t.getSize()]], a = Ue(o) ? Math.round(o.touches[0].clientX) : o.clientX, u = {}, f = (h, w) => {
          typeof w == "number" && (r.setColumnSizingInfo((y) => {
            var b, I;
            const E = r.options.columnResizeDirection === "rtl" ? -1 : 1, P = (w - ((b = y?.startOffset) != null ? b : 0)) * E, V = Math.max(P / ((I = y?.startSize) != null ? I : 0), -0.999999);
            return y.columnSizingStart.forEach((G) => {
              let [F, A] = G;
              u[F] = Math.round(Math.max(A + A * V, 0) * 100) / 100;
            }), {
              ...y,
              deltaOffset: P,
              deltaPercentage: V
            };
          }), (r.options.columnResizeMode === "onChange" || h === "end") && r.setColumnSizing((y) => ({
            ...y,
            ...u
          })));
        }, d = (h) => f("move", h), g = (h) => {
          f("end", h), r.setColumnSizingInfo((w) => ({
            ...w,
            isResizingColumn: !1,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        }, c = dn(n), m = {
          moveHandler: (h) => d(h.clientX),
          upHandler: (h) => {
            c?.removeEventListener("mousemove", m.moveHandler), c?.removeEventListener("mouseup", m.upHandler), g(h.clientX);
          }
        }, S = {
          moveHandler: (h) => (h.cancelable && (h.preventDefault(), h.stopPropagation()), d(h.touches[0].clientX), !1),
          upHandler: (h) => {
            var w;
            c?.removeEventListener("touchmove", S.moveHandler), c?.removeEventListener("touchend", S.upHandler), h.cancelable && (h.preventDefault(), h.stopPropagation()), g((w = h.touches[0]) == null ? void 0 : w.clientX);
          }
        }, p = fn() ? {
          passive: !1
        } : !1;
        Ue(o) ? (c?.addEventListener("touchmove", S.moveHandler, p), c?.addEventListener("touchend", S.upHandler, p)) : (c?.addEventListener("mousemove", m.moveHandler, p), c?.addEventListener("mouseup", m.upHandler, p)), r.setColumnSizingInfo((h) => ({
          ...h,
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
      e.setColumnSizingInfo(r ? Ye() : (n = e.initialState.columnSizingInfo) != null ? n : Ye());
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
let Ne = null;
function fn() {
  if (typeof Ne == "boolean") return Ne;
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
  return Ne = e, Ne;
}
function Ue(e) {
  return e.type === "touchstart";
}
const pn = {
  getInitialState: (e) => ({
    columnVisibility: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnVisibilityChange: Z("columnVisibility", e)
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
    e._getAllVisibleCells = x(() => [e.getAllCells(), r.getState().columnVisibility], (n) => n.filter((t) => t.column.getIsVisible()), _(r.options, "debugRows", "_getAllVisibleCells")), e.getVisibleCells = x(() => [e.getLeftVisibleCells(), e.getCenterVisibleCells(), e.getRightVisibleCells()], (n, t, i) => [...n, ...t, ...i], _(r.options, "debugRows", "getVisibleCells"));
  },
  createTable: (e) => {
    const r = (n, t) => x(() => [t(), t().filter((i) => i.getIsVisible()).map((i) => i.id).join("_")], (i) => i.filter((o) => o.getIsVisible == null ? void 0 : o.getIsVisible()), _(e.options, "debugColumns", n));
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
function Ve(e, r) {
  return r ? r === "center" ? e.getCenterVisibleLeafColumns() : r === "left" ? e.getLeftVisibleLeafColumns() : e.getRightVisibleLeafColumns() : e.getVisibleLeafColumns();
}
const hn = {
  createTable: (e) => {
    e._getGlobalFacetedRowModel = e.options.getFacetedRowModel && e.options.getFacetedRowModel(e, "__global__"), e.getGlobalFacetedRowModel = () => e.options.manualFiltering || !e._getGlobalFacetedRowModel ? e.getPreFilteredRowModel() : e._getGlobalFacetedRowModel(), e._getGlobalFacetedUniqueValues = e.options.getFacetedUniqueValues && e.options.getFacetedUniqueValues(e, "__global__"), e.getGlobalFacetedUniqueValues = () => e._getGlobalFacetedUniqueValues ? e._getGlobalFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getGlobalFacetedMinMaxValues = e.options.getFacetedMinMaxValues && e.options.getFacetedMinMaxValues(e, "__global__"), e.getGlobalFacetedMinMaxValues = () => {
      if (e._getGlobalFacetedMinMaxValues)
        return e._getGlobalFacetedMinMaxValues();
    };
  }
}, mn = {
  getInitialState: (e) => ({
    globalFilter: void 0,
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGlobalFilterChange: Z("globalFilter", e),
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
    e.getGlobalAutoFilterFn = () => ae.includesString, e.getGlobalFilterFn = () => {
      var r, n;
      const {
        globalFilterFn: t
      } = e.options;
      return Be(t) ? t : t === "auto" ? e.getGlobalAutoFilterFn() : (r = (n = e.options.filterFns) == null ? void 0 : n[t]) != null ? r : ae[t];
    }, e.setGlobalFilter = (r) => {
      e.options.onGlobalFilterChange == null || e.options.onGlobalFilterChange(r);
    }, e.resetGlobalFilter = (r) => {
      e.setGlobalFilter(r ? void 0 : e.initialState.globalFilter);
    };
  }
}, vn = {
  getInitialState: (e) => ({
    expanded: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onExpandedChange: Z("expanded", e),
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
}, tt = 0, nt = 10, Ke = () => ({
  pageIndex: tt,
  pageSize: nt
}), Sn = {
  getInitialState: (e) => ({
    ...e,
    pagination: {
      ...Ke(),
      ...e?.pagination
    }
  }),
  getDefaultOptions: (e) => ({
    onPaginationChange: Z("pagination", e)
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
      const i = (o) => he(t, o);
      return e.options.onPaginationChange == null ? void 0 : e.options.onPaginationChange(i);
    }, e.resetPagination = (t) => {
      var i;
      e.setPagination(t ? Ke() : (i = e.initialState.pagination) != null ? i : Ke());
    }, e.setPageIndex = (t) => {
      e.setPagination((i) => {
        let o = he(t, i.pageIndex);
        const l = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
        return o = Math.max(0, Math.min(o, l)), {
          ...i,
          pageIndex: o
        };
      });
    }, e.resetPageIndex = (t) => {
      var i, o;
      e.setPageIndex(t ? tt : (i = (o = e.initialState) == null || (o = o.pagination) == null ? void 0 : o.pageIndex) != null ? i : tt);
    }, e.resetPageSize = (t) => {
      var i, o;
      e.setPageSize(t ? nt : (i = (o = e.initialState) == null || (o = o.pagination) == null ? void 0 : o.pageSize) != null ? i : nt);
    }, e.setPageSize = (t) => {
      e.setPagination((i) => {
        const o = Math.max(1, he(t, i.pageSize)), l = i.pageSize * i.pageIndex, s = Math.floor(l / o);
        return {
          ...i,
          pageIndex: s,
          pageSize: o
        };
      });
    }, e.setPageCount = (t) => e.setPagination((i) => {
      var o;
      let l = he(t, (o = e.options.pageCount) != null ? o : -1);
      return typeof l == "number" && (l = Math.max(-1, l)), {
        ...i,
        pageCount: l
      };
    }), e.getPageOptions = x(() => [e.getPageCount()], (t) => {
      let i = [];
      return t && t > 0 && (i = [...new Array(t)].fill(null).map((o, l) => l)), i;
    }, _(e.options, "debugTable", "getPageOptions")), e.getCanPreviousPage = () => e.getState().pagination.pageIndex > 0, e.getCanNextPage = () => {
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
}, Qe = () => ({
  top: [],
  bottom: []
}), wn = {
  getInitialState: (e) => ({
    rowPinning: Qe(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowPinningChange: Z("rowPinning", e)
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
        var u, f;
        if (n === "bottom") {
          var d, g;
          return {
            top: ((d = a?.top) != null ? d : []).filter((S) => !(s != null && s.has(S))),
            bottom: [...((g = a?.bottom) != null ? g : []).filter((S) => !(s != null && s.has(S))), ...Array.from(s)]
          };
        }
        if (n === "top") {
          var c, m;
          return {
            top: [...((c = a?.top) != null ? c : []).filter((S) => !(s != null && s.has(S))), ...Array.from(s)],
            bottom: ((m = a?.bottom) != null ? m : []).filter((S) => !(s != null && s.has(S)))
          };
        }
        return {
          top: ((u = a?.top) != null ? u : []).filter((S) => !(s != null && s.has(S))),
          bottom: ((f = a?.bottom) != null ? f : []).filter((S) => !(s != null && s.has(S)))
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
      return e.setRowPinning(r ? Qe() : (n = (t = e.initialState) == null ? void 0 : t.rowPinning) != null ? n : Qe());
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
    }, e.getTopRows = x(() => [e.getRowModel().rows, e.getState().rowPinning.top], (r, n) => e._getPinnedRows(r, n, "top"), _(e.options, "debugRows", "getTopRows")), e.getBottomRows = x(() => [e.getRowModel().rows, e.getState().rowPinning.bottom], (r, n) => e._getPinnedRows(r, n, "bottom"), _(e.options, "debugRows", "getBottomRows")), e.getCenterRows = x(() => [e.getRowModel().rows, e.getState().rowPinning.top, e.getState().rowPinning.bottom], (r, n, t) => {
      const i = /* @__PURE__ */ new Set([...n ?? [], ...t ?? []]);
      return r.filter((o) => !i.has(o.id));
    }, _(e.options, "debugRows", "getCenterRows"));
  }
}, Cn = {
  getInitialState: (e) => ({
    rowSelection: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowSelectionChange: Z("rowSelection", e),
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
        rt(i, o.id, t, !0, e);
      }), i;
    }), e.getPreSelectedRowModel = () => e.getCoreRowModel(), e.getSelectedRowModel = x(() => [e.getState().rowSelection, e.getCoreRowModel()], (r, n) => Object.keys(r).length ? Ze(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, _(e.options, "debugTable", "getSelectedRowModel")), e.getFilteredSelectedRowModel = x(() => [e.getState().rowSelection, e.getFilteredRowModel()], (r, n) => Object.keys(r).length ? Ze(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, _(e.options, "debugTable", "getFilteredSelectedRowModel")), e.getGroupedSelectedRowModel = x(() => [e.getState().rowSelection, e.getSortedRowModel()], (r, n) => Object.keys(r).length ? Ze(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, _(e.options, "debugTable", "getGroupedSelectedRowModel")), e.getIsAllRowsSelected = () => {
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
        return rt(s, e.id, n, (l = t?.selectChildren) != null ? l : !0, r), s;
      });
    }, e.getIsSelected = () => {
      const {
        rowSelection: n
      } = r.getState();
      return ut(e, n);
    }, e.getIsSomeSelected = () => {
      const {
        rowSelection: n
      } = r.getState();
      return it(e, n) === "some";
    }, e.getIsAllSubRowsSelected = () => {
      const {
        rowSelection: n
      } = r.getState();
      return it(e, n) === "all";
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
}, rt = (e, r, n, t, i) => {
  var o;
  const l = i.getRow(r, !0);
  n ? (l.getCanMultiSelect() || Object.keys(e).forEach((s) => delete e[s]), l.getCanSelect() && (e[r] = !0)) : delete e[r], t && (o = l.subRows) != null && o.length && l.getCanSelectSubRows() && l.subRows.forEach((s) => rt(e, s.id, n, t, i));
};
function Ze(e, r) {
  const n = e.getState().rowSelection, t = [], i = {}, o = function(l, s) {
    return l.map((a) => {
      var u;
      const f = ut(a, n);
      if (f && (t.push(a), i[a.id] = a), (u = a.subRows) != null && u.length && (a = {
        ...a,
        subRows: o(a.subRows)
      }), f)
        return a;
    }).filter(Boolean);
  };
  return {
    rows: o(r.rows),
    flatRows: t,
    rowsById: i
  };
}
function ut(e, r) {
  var n;
  return (n = r[e.id]) != null ? n : !1;
}
function it(e, r, n) {
  var t;
  if (!((t = e.subRows) != null && t.length)) return !1;
  let i = !0, o = !1;
  return e.subRows.forEach((l) => {
    if (!(o && !i) && (l.getCanSelect() && (ut(l, r) ? o = !0 : i = !1), l.subRows && l.subRows.length)) {
      const s = it(l, r);
      s === "all" ? o = !0 : (s === "some" && (o = !0), i = !1);
    }
  }), i ? "all" : o ? "some" : !1;
}
const ot = /([0-9]+)/gm, yn = (e, r, n) => Mt(me(e.getValue(n)).toLowerCase(), me(r.getValue(n)).toLowerCase()), Rn = (e, r, n) => Mt(me(e.getValue(n)), me(r.getValue(n))), xn = (e, r, n) => ct(me(e.getValue(n)).toLowerCase(), me(r.getValue(n)).toLowerCase()), _n = (e, r, n) => ct(me(e.getValue(n)), me(r.getValue(n))), En = (e, r, n) => {
  const t = e.getValue(n), i = r.getValue(n);
  return t > i ? 1 : t < i ? -1 : 0;
}, bn = (e, r, n) => ct(e.getValue(n), r.getValue(n));
function ct(e, r) {
  return e === r ? 0 : e > r ? 1 : -1;
}
function me(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function Mt(e, r) {
  const n = e.split(ot).filter(Boolean), t = r.split(ot).filter(Boolean);
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
const Oe = {
  alphanumeric: yn,
  alphanumericCaseSensitive: Rn,
  text: xn,
  textCaseSensitive: _n,
  datetime: En,
  basic: bn
}, $n = {
  getInitialState: (e) => ({
    sorting: [],
    ...e
  }),
  getDefaultColumnDef: () => ({
    sortingFn: "auto",
    sortUndefined: 1
  }),
  getDefaultOptions: (e) => ({
    onSortingChange: Z("sorting", e),
    isMultiSortEvent: (r) => r.shiftKey
  }),
  createColumn: (e, r) => {
    e.getAutoSortingFn = () => {
      const n = r.getFilteredRowModel().flatRows.slice(10);
      let t = !1;
      for (const i of n) {
        const o = i?.getValue(e.id);
        if (Object.prototype.toString.call(o) === "[object Date]")
          return Oe.datetime;
        if (typeof o == "string" && (t = !0, o.split(ot).length > 1))
          return Oe.alphanumeric;
      }
      return t ? Oe.text : Oe.basic;
    }, e.getAutoSortDir = () => {
      const n = r.getFilteredRowModel().flatRows[0];
      return typeof n?.getValue(e.id) == "string" ? "asc" : "desc";
    }, e.getSortingFn = () => {
      var n, t;
      if (!e)
        throw new Error();
      return Be(e.columnDef.sortingFn) ? e.columnDef.sortingFn : e.columnDef.sortingFn === "auto" ? e.getAutoSortingFn() : (n = (t = r.options.sortingFns) == null ? void 0 : t[e.columnDef.sortingFn]) != null ? n : Oe[e.columnDef.sortingFn];
    }, e.toggleSorting = (n, t) => {
      const i = e.getNextSortingOrder(), o = typeof n < "u" && n !== null;
      r.setSorting((l) => {
        const s = l?.find((c) => c.id === e.id), a = l?.findIndex((c) => c.id === e.id);
        let u = [], f, d = o ? n : i === "desc";
        if (l != null && l.length && e.getCanMultiSort() && t ? s ? f = "toggle" : f = "add" : l != null && l.length && a !== l.length - 1 ? f = "replace" : s ? f = "toggle" : f = "replace", f === "toggle" && (o || i || (f = "remove")), f === "add") {
          var g;
          u = [...l, {
            id: e.id,
            desc: d
          }], u.splice(0, u.length - ((g = r.options.maxMultiSortColCount) != null ? g : Number.MAX_SAFE_INTEGER));
        } else f === "toggle" ? u = l.map((c) => c.id === e.id ? {
          ...c,
          desc: d
        } : c) : f === "remove" ? u = l.filter((c) => c.id !== e.id) : u = [{
          id: e.id,
          desc: d
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
}, Mn = [
  Xt,
  pn,
  un,
  cn,
  Ut,
  Kt,
  hn,
  //depends on ColumnFaceting
  mn,
  //depends on ColumnFiltering
  $n,
  sn,
  //depends on RowSorting
  vn,
  Sn,
  wn,
  Cn,
  gn
];
function Fn(e) {
  var r, n;
  process.env.NODE_ENV !== "production" && (e.debugAll || e.debugTable) && console.info("Creating Table Instance...");
  const t = [...Mn, ...(r = e._features) != null ? r : []];
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
  let f = !1;
  const d = {
    _features: t,
    options: {
      ...o,
      ...e
    },
    initialState: a,
    _queue: (g) => {
      u.push(g), f || (f = !0, Promise.resolve().then(() => {
        for (; u.length; )
          u.shift()();
        f = !1;
      }).catch((c) => setTimeout(() => {
        throw c;
      })));
    },
    reset: () => {
      i.setState(i.initialState);
    },
    setOptions: (g) => {
      const c = he(g, i.options);
      i.options = l(c);
    },
    getState: () => i.options.state,
    setState: (g) => {
      i.options.onStateChange == null || i.options.onStateChange(g);
    },
    _getRowId: (g, c, m) => {
      var S;
      return (S = i.options.getRowId == null ? void 0 : i.options.getRowId(g, c, m)) != null ? S : `${m ? [m.id, c].join(".") : c}`;
    },
    getCoreRowModel: () => (i._getCoreRowModel || (i._getCoreRowModel = i.options.getCoreRowModel(i)), i._getCoreRowModel()),
    // The final calls start at the bottom of the model,
    // expanded rows, which then work their way up
    getRowModel: () => i.getPaginationRowModel(),
    //in next version, we should just pass in the row model as the optional 2nd arg
    getRow: (g, c) => {
      let m = (c ? i.getPrePaginationRowModel() : i.getRowModel()).rowsById[g];
      if (!m && (m = i.getCoreRowModel().rowsById[g], !m))
        throw process.env.NODE_ENV !== "production" ? new Error(`getRow could not find row with ID: ${g}`) : new Error();
      return m;
    },
    _getDefaultColumnDef: x(() => [i.options.defaultColumn], (g) => {
      var c;
      return g = (c = g) != null ? c : {}, {
        header: (m) => {
          const S = m.header.column.columnDef;
          return S.accessorKey ? S.accessorKey : S.accessorFn ? S.id : null;
        },
        // footer: props => props.header.column.id,
        cell: (m) => {
          var S, p;
          return (S = (p = m.renderValue()) == null || p.toString == null ? void 0 : p.toString()) != null ? S : null;
        },
        ...i._features.reduce((m, S) => Object.assign(m, S.getDefaultColumnDef == null ? void 0 : S.getDefaultColumnDef()), {}),
        ...g
      };
    }, _(e, "debugColumns", "_getDefaultColumnDef")),
    _getColumnDefs: () => i.options.columns,
    getAllColumns: x(() => [i._getColumnDefs()], (g) => {
      const c = function(m, S, p) {
        return p === void 0 && (p = 0), m.map((h) => {
          const w = qt(i, h, p, S), y = h;
          return w.columns = y.columns ? c(y.columns, w, p + 1) : [], w;
        });
      };
      return c(g);
    }, _(e, "debugColumns", "getAllColumns")),
    getAllFlatColumns: x(() => [i.getAllColumns()], (g) => g.flatMap((c) => c.getFlatColumns()), _(e, "debugColumns", "getAllFlatColumns")),
    _getAllFlatColumnsById: x(() => [i.getAllFlatColumns()], (g) => g.reduce((c, m) => (c[m.id] = m, c), {}), _(e, "debugColumns", "getAllFlatColumnsById")),
    getAllLeafColumns: x(() => [i.getAllColumns(), i._getOrderColumnsFn()], (g, c) => {
      let m = g.flatMap((S) => S.getLeafColumns());
      return c(m);
    }, _(e, "debugColumns", "getAllLeafColumns")),
    getColumn: (g) => {
      const c = i._getAllFlatColumnsById()[g];
      return process.env.NODE_ENV !== "production" && !c && console.error(`[Table] Column with id '${g}' does not exist.`), c;
    }
  };
  Object.assign(i, d);
  for (let g = 0; g < i._features.length; g++) {
    const c = i._features[g];
    c == null || c.createTable == null || c.createTable(i);
  }
  return i;
}
function On() {
  return (e) => x(() => [e.options.data], (r) => {
    const n = {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, t = function(i, o, l) {
      o === void 0 && (o = 0);
      const s = [];
      for (let u = 0; u < i.length; u++) {
        const f = Yt(e, e._getRowId(i[u], u, l), i[u], u, o, void 0, l?.id);
        if (n.flatRows.push(f), n.rowsById[f.id] = f, s.push(f), e.options.getSubRows) {
          var a;
          f.originalSubRows = e.options.getSubRows(i[u], u), (a = f.originalSubRows) != null && a.length && (f.subRows = t(f.originalSubRows, o + 1, f));
        }
      }
      return s;
    };
    return n.rows = t(r), n;
  }, _(e.options, "debugTable", "getRowModel", () => e._autoResetPageIndex()));
}
function pt(e, r) {
  return e ? In(e) ? /* @__PURE__ */ z.createElement(e, r) : e : null;
}
function In(e) {
  return Pn(e) || typeof e == "function" || Vn(e);
}
function Pn(e) {
  return typeof e == "function" && (() => {
    const r = Object.getPrototypeOf(e);
    return r.prototype && r.prototype.isReactComponent;
  })();
}
function Vn(e) {
  return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
function An(e) {
  const r = {
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    ...e
  }, [n] = z.useState(() => ({
    current: Fn(r)
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
function zn({
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
  setSelectedRows: f,
  disableSelectRow: d,
  expandable: g,
  expandedRows: c,
  setExpandedRows: m,
  stripedRows: S = !1,
  hoverableRow: p = !1,
  loading: h,
  loadingCustom: w,
  noResultMessage: y,
  onRowClick: b,
  totalItems: I,
  revealOnHoverColIds: E
}) {
  const P = K((C) => {
    C.currentTarget.querySelectorAll(".cell-content-reveal").forEach((R) => {
      R.style.opacity = "1";
    });
  }, []), V = K((C) => {
    C.currentTarget.querySelectorAll(".cell-content-reveal").forEach((R) => {
      R.style.opacity = "";
    });
  }, []), G = pe(
    () => l ?? s,
    [l, s]
  ), F = H(null), A = H(null), [W, ve] = te(null), [$e, ne] = te(0), Se = (C, R) => {
    o && (R.preventDefault(), F.current = R.clientY, A.current = C, ve(C), ne(0), R.currentTarget.setPointerCapture(R.pointerId));
  }, k = (C) => {
    if (!o || F.current === null || A.current === null) return;
    const R = C.clientY - F.current;
    ne(R);
    const Y = 32, L = R > Y ? 1 : R < -Y ? -1 : 0;
    if (L === 0) return;
    const re = A.current, D = re + L;
    D < 0 || D >= e.getRowModel().rows.length || (G((xe) => {
      const J = [...xe], [$] = J.splice(re, 1);
      return J.splice(D, 0, $), J;
    }), A.current = D, F.current = C.clientY, ne(0), ve(D));
  }, M = () => {
    F.current = null, A.current = null, ve(null), ne(0);
  }, [q, X] = te(null), [Ce, ue] = te(""), le = (C) => {
    X({
      rowId: C.row.id,
      colId: C.column.id
    }), ue(String(C.getValue() ?? ""));
  }, ce = (C) => {
    s(
      (R) => R.map(
        (Y, L) => L === C.row.index ? {
          ...Y,
          [C.column.id]: Ce
        } : Y
      )
    ), X(null);
  }, ye = (C) => !!(C.closest("button") || C.closest("a") || C.closest("input") || C.closest("select") || C.closest("textarea") || C.closest("[data-stop-row-click]")), Re = (C, R) => {
    const Y = C.target;
    if (!ye(Y) && !Y.closest(".col-drag-handle")) {
      if (g?.clickRow) {
        const L = R.original.id ?? R.index;
        m((re) => {
          const D = new Set(re);
          return D.has(L) ? D.delete(L) : D.add(L), D;
        });
      }
      b && b(R.original);
    }
  };
  return /* @__PURE__ */ j("table", { className: `table table-body ${p ? "hoverable" : ""} ${S ? "striped" : ""}`, children: [
    /* @__PURE__ */ v(
      We,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ j("tbody", { children: [
      h === "default" && /* @__PURE__ */ v("tr", { className: "table-loading-row", children: /* @__PURE__ */ v(
        "td",
        {
          colSpan: e.getAllColumns().length,
          style: { textAlign: "center", padding: "20px" },
          children: "Carregando dados..."
        }
      ) }),
      h === "spinner" && /* @__PURE__ */ v("tr", { className: "table-loading-row", children: /* @__PURE__ */ v(
        "td",
        {
          colSpan: e.getAllColumns().length,
          style: { textAlign: "center", padding: "20px" },
          children: /* @__PURE__ */ v("div", { style: { display: "flex", justifyContent: "center", alignItems: "center" }, children: /* @__PURE__ */ v("div", { className: "table-spinner" }) })
        }
      ) }),
      h === "custom" && /* @__PURE__ */ v("tr", { className: "table-loading-row", children: /* @__PURE__ */ v(
        "td",
        {
          colSpan: e.getAllColumns().length,
          style: { textAlign: "center", padding: "20px" },
          children: w
        }
      ) }),
      h === "placeholder" && (() => {
        const C = e.getAllColumns().length, R = e.getState().pagination?.pageSize || 10;
        return Array.from({ length: R }).map((Y, L) => /* @__PURE__ */ v("tr", { className: "table-placeholder-row", children: Array.from({ length: C }).map((re, D) => /* @__PURE__ */ v("td", { children: /* @__PURE__ */ v("div", { className: "table-placeholder-cell" }) }, `placeholder-cell-${L}-${D}`)) }, `placeholder-row-${L}`));
      })(),
      !h && e.getRowModel().rows.length === 0 && I === 0 && /* @__PURE__ */ v("tr", { className: "table-no-results-row", children: /* @__PURE__ */ v(
        "td",
        {
          colSpan: e.getAllColumns().length,
          style: { textAlign: "center", padding: "20px" },
          children: y
        }
      ) }),
      !h && e.getRowModel().rows.length > 0 && e.getRowModel().rows.map((C) => {
        const R = C.index, Y = W === R, L = [];
        L.push(
          /* @__PURE__ */ v(
            "tr",
            {
              className: `${Y ? "row-dragging" : ""}`,
              style: Y ? {
                transform: `translateY(${$e}px)`,
                position: "relative",
                zIndex: 50
              } : void 0,
              onPointerMove: k,
              onPointerUp: M,
              onMouseEnter: P,
              onMouseLeave: V,
              onClick: ($) => Re($, {
                original: C.original,
                index: C.index
              }),
              children: C.getVisibleCells().map(($) => {
                const we = $.column.id, T = n.get(we), O = Ae($.column, t), se = q?.rowId === C.id && q?.colId === we, ie = [
                  T ? "is-sticky" : "",
                  T?.side === "left" ? "is-sticky-left" : "",
                  T?.side === "right" ? "is-sticky-right" : ""
                ].filter(Boolean).join(" "), ee = T ? T.side === "left" ? { "--sticky-left": `${T.offset}px` } : { "--sticky-right": `${T.offset}px` } : void 0;
                if ($.column.id === "__draggable__" && o)
                  return /* @__PURE__ */ v(
                    "td",
                    {
                      className: `${ie} align-center col-drag-handle`,
                      style: ee,
                      onPointerDown: (N) => Se(R, N),
                      children: "☰"
                    },
                    $.id
                  );
                if ($.column.id === "__selectable__" && a) {
                  const N = $.row.original.id ?? $.row.index, Me = d.includes(N), je = u.has(N);
                  if (Me && a.hideDisabledSelects)
                    return /* @__PURE__ */ v(
                      "td",
                      {
                        className: `${ie} align-center`,
                        style: ee
                      },
                      $.id
                    );
                  const ze = /* @__PURE__ */ v(
                    "input",
                    {
                      type: "checkbox",
                      checked: je,
                      disabled: Me,
                      onChange: () => {
                        f((_e) => {
                          const Le = new Set(_e);
                          return Le.has(N) ? Le.delete(N) : Le.add(N), Le;
                        });
                      }
                    }
                  );
                  return /* @__PURE__ */ v(
                    "td",
                    {
                      className: `${ie} align-center`,
                      style: ee,
                      children: a.revealOnHover ? /* @__PURE__ */ v("span", { className: "cell-content-reveal", children: ze }) : ze
                    },
                    $.id
                  );
                }
                if ($.column.id === "__expandable__" && g) {
                  const N = $.row.original.id ?? $.row.index, Me = c.has(N);
                  return /* @__PURE__ */ v(
                    "td",
                    {
                      className: `${ie} align-center`,
                      style: ee,
                      onClick: (je) => {
                        je.stopPropagation(), m((ze) => {
                          const _e = new Set(ze);
                          return _e.has(N) ? _e.delete(N) : _e.add(N), _e;
                        });
                      },
                      children: /* @__PURE__ */ v(
                        "span",
                        {
                          className: `expand-icon ${Me ? "expanded" : ""}`,
                          style: {
                            display: "inline-block",
                            transition: "transform 0.2s",
                            transform: Me ? "rotate(90deg)" : "rotate(0deg)",
                            cursor: "pointer",
                            fontSize: "12px"
                          },
                          children: /* @__PURE__ */ v("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ v("path", { d: "M4.5 9L7.5 6L4.5 3", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
                        }
                      )
                    },
                    $.id
                  );
                }
                const kt = E?.has(we);
                return /* @__PURE__ */ v(
                  "td",
                  {
                    className: `${ie} align-${O}`,
                    style: ee,
                    onDoubleClick: () => {
                      i && le($);
                    },
                    children: se ? /* @__PURE__ */ v(
                      "input",
                      {
                        autoFocus: !0,
                        value: Ce,
                        onChange: (N) => ue(N.target.value),
                        onBlur: () => ce($),
                        onKeyDown: (N) => {
                          N.key === "Enter" && ce($), N.key === "Escape" && X(null);
                        },
                        onFocus: (N) => N.currentTarget.select(),
                        style: {
                          width: "100%",
                          height: "100%",
                          boxSizing: "border-box",
                          fontSize: "inherit",
                          fontFamily: "inherit"
                        }
                      }
                    ) : kt ? /* @__PURE__ */ v("span", { className: "cell-content-reveal", children: pt(
                      $.column.columnDef.cell,
                      $.getContext()
                    ) }) : pt(
                      $.column.columnDef.cell,
                      $.getContext()
                    )
                  },
                  $.id
                );
              })
            },
            C.id
          )
        );
        const re = C.original.id ?? C.index, D = g?.content?.(C.original), xe = C.getVisibleCells(), J = xe.some(
          ($) => !!$.column.columnDef.meta?.expandable
        );
        return g && c.has(re) && (D || J) && (D ? L.push(
          /* @__PURE__ */ v("tr", { className: "expanded-row", children: /* @__PURE__ */ v("td", { colSpan: e.getAllColumns().length, className: "expanded-content", children: D }) }, `${C.id}-expanded`)
        ) : L.push(
          /* @__PURE__ */ v("tr", { className: "expanded-row", children: xe.map(($) => {
            const we = $.column.id, T = n.get(we), O = Ae($.column, t), se = [
              T ? "is-sticky" : "",
              T?.side === "left" ? "is-sticky-left" : "",
              T?.side === "right" ? "is-sticky-right" : ""
            ].filter(Boolean).join(" "), ie = T ? T.side === "left" ? { "--sticky-left": `${T.offset}px` } : { "--sticky-right": `${T.offset}px` } : void 0, ee = $.column.columnDef.meta?.expandable;
            return /* @__PURE__ */ v(
              "td",
              {
                className: `${se} align-${O} expanded-cell`,
                style: ie,
                children: ee ? ee.content(C.original) : null
              },
              `${$.id}-expanded`
            );
          }) }, `${C.id}-expanded`)
        )), L;
      }).flat()
    ] })
  ] });
}
function Ln({
  table: e,
  tableWidth: r,
  stickyById: n,
  defaultTextAlign: t,
  scrollRef: i
}) {
  return e.getVisibleLeafColumns().some(
    (s) => s.columnDef.meta?.internalFooter != null
  ) ? /* @__PURE__ */ v("div", { className: "table-scroll-sync", ref: i, children: /* @__PURE__ */ j("table", { className: "table table-internal-footer", children: [
    /* @__PURE__ */ v(
      We,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ v("tfoot", { children: /* @__PURE__ */ v("tr", { children: e.getVisibleLeafColumns().map((s) => {
      const a = s.columnDef.meta?.internalFooter, u = n.get(s.id), f = Ae(s, t), d = [
        u ? "is-sticky" : "",
        u?.side === "left" ? "is-sticky-left" : "",
        u?.side === "right" ? "is-sticky-right" : ""
      ].filter(Boolean).join(" "), g = u ? u.side === "left" ? { "--sticky-left": `${u.offset}px` } : { "--sticky-right": `${u.offset}px` } : void 0;
      return /* @__PURE__ */ v(
        "td",
        {
          className: `${d} align-${f}`,
          style: g,
          children: typeof a == "function" ? a() : a ?? null
        },
        s.id
      );
    }) }) })
  ] }) }) : null;
}
function Dn({ children: e }) {
  return /* @__PURE__ */ v("table", { className: "table table-external-footer", children: /* @__PURE__ */ v("tfoot", { children: /* @__PURE__ */ v("tr", { children: /* @__PURE__ */ v("td", { children: e }) }) }) });
}
function kn(e, r, n = 2) {
  if (r <= 1) return [1];
  const t = [], i = [], o = Math.max(2, e - n), l = Math.min(r - 1, e + n);
  for (let s = o; s <= l; s++)
    i.push(s);
  return t.push(1), o > 2 && t.push("ellipsis"), t.push(...i), l < r - 1 && t.push("ellipsis"), t.push(r), t;
}
function Nn({
  currentPage: e,
  totalItems: r,
  pageSize: n,
  pageSizeOptions: t = [10, 25, 50, 100, 200],
  onPageChange: i,
  renderInfo: o
}) {
  const l = Math.max(1, Math.ceil(r / n)), s = r === 0 ? 0 : (e - 1) * n + 1, a = Math.min(e * n, r), u = pe(
    () => kn(e, l),
    [e, l]
  ), f = pe(() => {
    const d = new Set(t);
    return d.add(n), Array.from(d).sort((g, c) => g - c);
  }, [t, n]);
  return /* @__PURE__ */ j("div", { className: "table-pagination", children: [
    /* @__PURE__ */ j("div", { className: "pagination-controls", children: [
      /* @__PURE__ */ v(
        "button",
        {
          className: "pagination-btn pagination-arrow",
          disabled: e === 1,
          onClick: () => i(e - 1, n),
          title: "Página anterior",
          children: "«"
        }
      ),
      u.map(
        (d, g) => d === "ellipsis" ? /* @__PURE__ */ v(
          "span",
          {
            className: "pagination-btn ellipsis",
            children: "..."
          },
          `e-${g}`
        ) : /* @__PURE__ */ v(
          "button",
          {
            className: `pagination-btn ${d === e ? "active" : ""}`,
            onClick: () => i(d, n),
            children: d
          },
          d
        )
      ),
      /* @__PURE__ */ v(
        "button",
        {
          className: "pagination-btn pagination-arrow",
          disabled: e === l,
          onClick: () => i(e + 1, n),
          title: "Próxima página",
          children: "»"
        }
      )
    ] }),
    /* @__PURE__ */ j("div", { className: "pagination-info", children: [
      o ? o({ totalItems: r, displayedItems: a - s + (r === 0 ? 0 : 1), startItem: s, endItem: a, pageSize: n }) : /* @__PURE__ */ j(Nt, { children: [
        /* @__PURE__ */ j("span", { children: [
          "Exibindo de ",
          s,
          " a ",
          a,
          " de ",
          r,
          " registros"
        ] }),
        /* @__PURE__ */ v("span", { className: "pagination-separator", children: "•" })
      ] }),
      /* @__PURE__ */ j("div", { className: "pagination-select", children: [
        !o && /* @__PURE__ */ v("label", { children: "Itens por página:" }),
        /* @__PURE__ */ v("div", { className: "select-wrapper", children: /* @__PURE__ */ v(
          "select",
          {
            value: n,
            onChange: (d) => i(1, Number(d.target.value)),
            children: f.map((d) => /* @__PURE__ */ v("option", { value: d, children: d }, d))
          }
        ) })
      ] })
    ] })
  ] });
}
function Te(e) {
  var r = typeof e;
  return e != null && (r == "object" || r == "function");
}
var Hn = typeof global == "object" && global && global.Object === Object && global, Tn = typeof self == "object" && self && self.Object === Object && self, Ft = Hn || Tn || Function("return this")(), Je = function() {
  return Ft.Date.now();
}, Gn = /\s/;
function Wn(e) {
  for (var r = e.length; r-- && Gn.test(e.charAt(r)); )
    ;
  return r;
}
var Bn = /^\s+/;
function jn(e) {
  return e && e.slice(0, Wn(e) + 1).replace(Bn, "");
}
var Ge = Ft.Symbol, Ot = Object.prototype, qn = Ot.hasOwnProperty, Xn = Ot.toString, Ie = Ge ? Ge.toStringTag : void 0;
function Yn(e) {
  var r = qn.call(e, Ie), n = e[Ie];
  try {
    e[Ie] = void 0;
    var t = !0;
  } catch {
  }
  var i = Xn.call(e);
  return t && (r ? e[Ie] = n : delete e[Ie]), i;
}
var Un = Object.prototype, Kn = Un.toString;
function Qn(e) {
  return Kn.call(e);
}
var Zn = "[object Null]", Jn = "[object Undefined]", ht = Ge ? Ge.toStringTag : void 0;
function er(e) {
  return e == null ? e === void 0 ? Jn : Zn : ht && ht in Object(e) ? Yn(e) : Qn(e);
}
function tr(e) {
  return e != null && typeof e == "object";
}
var nr = "[object Symbol]";
function rr(e) {
  return typeof e == "symbol" || tr(e) && er(e) == nr;
}
var mt = NaN, ir = /^[-+]0x[0-9a-f]+$/i, or = /^0b[01]+$/i, lr = /^0o[0-7]+$/i, sr = parseInt;
function vt(e) {
  if (typeof e == "number")
    return e;
  if (rr(e))
    return mt;
  if (Te(e)) {
    var r = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Te(r) ? r + "" : r;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = jn(e);
  var n = or.test(e);
  return n || lr.test(e) ? sr(e.slice(2), n ? 2 : 8) : ir.test(e) ? mt : +e;
}
var ar = "Expected a function", ur = Math.max, cr = Math.min;
function He(e, r, n) {
  var t, i, o, l, s, a, u = 0, f = !1, d = !1, g = !0;
  if (typeof e != "function")
    throw new TypeError(ar);
  r = vt(r) || 0, Te(n) && (f = !!n.leading, d = "maxWait" in n, o = d ? ur(vt(n.maxWait) || 0, r) : o, g = "trailing" in n ? !!n.trailing : g);
  function c(E) {
    var P = t, V = i;
    return t = i = void 0, u = E, l = e.apply(V, P), l;
  }
  function m(E) {
    return u = E, s = setTimeout(h, r), f ? c(E) : l;
  }
  function S(E) {
    var P = E - a, V = E - u, G = r - P;
    return d ? cr(G, o - V) : G;
  }
  function p(E) {
    var P = E - a, V = E - u;
    return a === void 0 || P >= r || P < 0 || d && V >= o;
  }
  function h() {
    var E = Je();
    if (p(E))
      return w(E);
    s = setTimeout(h, S(E));
  }
  function w(E) {
    return s = void 0, g && t ? c(E) : (t = i = void 0, l);
  }
  function y() {
    s !== void 0 && clearTimeout(s), u = 0, t = a = i = s = void 0;
  }
  function b() {
    return s === void 0 ? l : w(Je());
  }
  function I() {
    var E = Je(), P = p(E);
    if (t = arguments, i = this, a = E, P) {
      if (s === void 0)
        return m(a);
      if (d)
        return clearTimeout(s), s = setTimeout(h, r), c(a);
    }
    return s === void 0 && (s = setTimeout(h, r)), l;
  }
  return I.cancel = y, I.flush = b, I;
}
var dr = "Expected a function";
function gr(e, r, n) {
  var t = !0, i = !0;
  if (typeof e != "function")
    throw new TypeError(dr);
  return Te(n) && (t = "leading" in n ? !!n.leading : t, i = "trailing" in n ? !!n.trailing : i), He(e, r, {
    leading: t,
    maxWait: r,
    trailing: i
  });
}
var be = function() {
  return be = Object.assign || function(r) {
    for (var n, t = 1, i = arguments.length; t < i; t++) {
      n = arguments[t];
      for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
    }
    return r;
  }, be.apply(this, arguments);
};
function It(e) {
  return !e || !e.ownerDocument || !e.ownerDocument.defaultView ? window : e.ownerDocument.defaultView;
}
function Pt(e) {
  return !e || !e.ownerDocument ? document : e.ownerDocument;
}
var Vt = function(e) {
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
function At(e, r) {
  var n;
  e && (n = e.classList).add.apply(n, r.split(" "));
}
function zt(e, r) {
  e && r.split(" ").forEach(function(n) {
    e.classList.remove(n);
  });
}
function Lt(e) {
  return ".".concat(e.split(" ").join("."));
}
var dt = !!(typeof window < "u" && window.document && window.document.createElement), fr = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  addClasses: At,
  canUseDOM: dt,
  classNamesToQuery: Lt,
  getElementDocument: Pt,
  getElementWindow: It,
  getOptions: Vt,
  removeClasses: zt
}), Ee = null, St = null;
dt && window.addEventListener("resize", function() {
  St !== window.devicePixelRatio && (St = window.devicePixelRatio, Ee = null);
});
function wt() {
  if (Ee === null) {
    if (typeof document > "u")
      return Ee = 0, Ee;
    var e = document.body, r = document.createElement("div");
    r.classList.add("simplebar-hide-scrollbar"), e.appendChild(r);
    var n = r.getBoundingClientRect().right;
    e.removeChild(r), Ee = n;
  }
  return Ee;
}
var de = It, et = Pt, pr = Vt, ge = At, fe = zt, U = Lt, Pe = (
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
        var i = de(t.el);
        t.scrollXTicking || (i.requestAnimationFrame(t.scrollX), t.scrollXTicking = !0), t.scrollYTicking || (i.requestAnimationFrame(t.scrollY), t.scrollYTicking = !0), t.isScrolling || (t.isScrolling = !0, ge(t.el, t.classNames.scrolling)), t.showScrollbar("x"), t.showScrollbar("y"), t.onStopScrolling();
      }, this.scrollX = function() {
        t.axis.x.isOverflowing && t.positionScrollbar("x"), t.scrollXTicking = !1;
      }, this.scrollY = function() {
        t.axis.y.isOverflowing && t.positionScrollbar("y"), t.scrollYTicking = !1;
      }, this._onStopScrolling = function() {
        fe(t.el, t.classNames.scrolling), t.options.autoHide && (t.hideScrollbar("x"), t.hideScrollbar("y")), t.isScrolling = !1;
      }, this.onMouseEnter = function() {
        t.isMouseEntering || (ge(t.el, t.classNames.mouseEntered), t.showScrollbar("x"), t.showScrollbar("y"), t.isMouseEntering = !0), t.onMouseEntered();
      }, this._onMouseEntered = function() {
        fe(t.el, t.classNames.mouseEntered), t.options.autoHide && (t.hideScrollbar("x"), t.hideScrollbar("y")), t.isMouseEntering = !1;
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
        var o, l, s, a, u, f, d, g, c, m, S;
        if (!(!t.draggedAxis || !t.contentWrapperEl)) {
          var p, h = t.axis[t.draggedAxis].track, w = (l = (o = h.rect) === null || o === void 0 ? void 0 : o[t.axis[t.draggedAxis].sizeAttr]) !== null && l !== void 0 ? l : 0, y = t.axis[t.draggedAxis].scrollbar, b = (a = (s = t.contentWrapperEl) === null || s === void 0 ? void 0 : s[t.axis[t.draggedAxis].scrollSizeAttr]) !== null && a !== void 0 ? a : 0, I = parseInt((f = (u = t.elStyles) === null || u === void 0 ? void 0 : u[t.axis[t.draggedAxis].sizeAttr]) !== null && f !== void 0 ? f : "0px", 10);
          i.preventDefault(), i.stopPropagation(), t.draggedAxis === "y" ? p = i.pageY : p = i.pageX;
          var E = p - ((g = (d = h.rect) === null || d === void 0 ? void 0 : d[t.axis[t.draggedAxis].offsetAttr]) !== null && g !== void 0 ? g : 0) - t.axis[t.draggedAxis].dragOffset;
          E = t.draggedAxis === "x" && t.isRtl ? ((m = (c = h.rect) === null || c === void 0 ? void 0 : c[t.axis[t.draggedAxis].sizeAttr]) !== null && m !== void 0 ? m : 0) - y.size - E : E;
          var P = E / (w - y.size), V = P * (b - I);
          t.draggedAxis === "x" && t.isRtl && (V = !((S = e.getRtlHelpers()) === null || S === void 0) && S.isScrollingToNegative ? -V : V), t.contentWrapperEl[t.axis[t.draggedAxis].scrollOffsetAttr] = V;
        }
      }, this.onEndDrag = function(i) {
        t.isDragging = !1;
        var o = et(t.el), l = de(t.el);
        i.preventDefault(), i.stopPropagation(), fe(t.el, t.classNames.dragging), t.onStopScrolling(), o.removeEventListener("mousemove", t.drag, !0), o.removeEventListener("mouseup", t.onEndDrag, !0), t.removePreventClickId = l.setTimeout(function() {
          o.removeEventListener("click", t.preventClick, !0), o.removeEventListener("dblclick", t.preventClick, !0), t.removePreventClickId = null;
        });
      }, this.preventClick = function(i) {
        i.preventDefault(), i.stopPropagation();
      }, this.el = r, this.options = be(be({}, e.defaultOptions), n), this.classNames = be(be({}, e.defaultOptions.classNames), n.classNames), this.axis = {
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
      this.onMouseMove = gr(this._onMouseMove, 64), this.onWindowResize = He(this._onWindowResize, 64, { leading: !0 }), this.onStopScrolling = He(this._onStopScrolling, this.stopScrollDelay), this.onMouseEntered = He(this._onMouseEntered, this.stopScrollDelay), this.init();
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
        return this.contentWrapperEl && getComputedStyle(this.contentWrapperEl, "::-webkit-scrollbar").display === "none" || "scrollbarWidth" in document.documentElement.style || "-ms-overflow-style" in document.documentElement.style ? 0 : wt();
      } catch {
        return wt();
      }
    }, e.getOffset = function(r) {
      var n = r.getBoundingClientRect(), t = et(r), i = de(r);
      return {
        top: n.top + (i.pageYOffset || t.documentElement.scrollTop),
        left: n.left + (i.pageXOffset || t.documentElement.scrollLeft)
      };
    }, e.prototype.init = function() {
      dt && (this.initDOM(), this.rtlHelpers = e.getRtlHelpers(), this.scrollbarWidth = this.getScrollbarWidth(), this.recalculate(), this.initListeners());
    }, e.prototype.initDOM = function() {
      var r, n;
      this.wrapperEl = this.el.querySelector(U(this.classNames.wrapper)), this.contentWrapperEl = this.options.scrollableNode || this.el.querySelector(U(this.classNames.contentWrapper)), this.contentEl = this.options.contentNode || this.el.querySelector(U(this.classNames.contentEl)), this.offsetEl = this.el.querySelector(U(this.classNames.offset)), this.maskEl = this.el.querySelector(U(this.classNames.mask)), this.placeholderEl = this.findChild(this.wrapperEl, U(this.classNames.placeholder)), this.heightAutoObserverWrapperEl = this.el.querySelector(U(this.classNames.heightAutoObserverWrapperEl)), this.heightAutoObserverEl = this.el.querySelector(U(this.classNames.heightAutoObserverEl)), this.axis.x.track.el = this.findChild(this.el, "".concat(U(this.classNames.track)).concat(U(this.classNames.horizontal))), this.axis.y.track.el = this.findChild(this.el, "".concat(U(this.classNames.track)).concat(U(this.classNames.vertical))), this.axis.x.scrollbar.el = ((r = this.axis.x.track.el) === null || r === void 0 ? void 0 : r.querySelector(U(this.classNames.scrollbar))) || null, this.axis.y.scrollbar.el = ((n = this.axis.y.track.el) === null || n === void 0 ? void 0 : n.querySelector(U(this.classNames.scrollbar))) || null, this.options.autoHide || (ge(this.axis.x.scrollbar.el, this.classNames.visible), ge(this.axis.y.scrollbar.el, this.classNames.visible));
    }, e.prototype.initListeners = function() {
      var r = this, n, t = de(this.el);
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
        var r = de(this.el);
        this.elStyles = r.getComputedStyle(this.el), this.isRtl = this.elStyles.direction === "rtl";
        var n = this.contentEl.offsetWidth, t = this.heightAutoObserverEl.offsetHeight <= 1, i = this.heightAutoObserverEl.offsetWidth <= 1 || n > 0, o = this.contentWrapperEl.offsetWidth, l = this.elStyles.overflowX, s = this.elStyles.overflowY;
        this.contentEl.style.padding = "".concat(this.elStyles.paddingTop, " ").concat(this.elStyles.paddingRight, " ").concat(this.elStyles.paddingBottom, " ").concat(this.elStyles.paddingLeft), this.wrapperEl.style.margin = "-".concat(this.elStyles.paddingTop, " -").concat(this.elStyles.paddingRight, " -").concat(this.elStyles.paddingBottom, " -").concat(this.elStyles.paddingLeft);
        var a = this.contentEl.scrollHeight, u = this.contentEl.scrollWidth;
        this.contentWrapperEl.style.height = t ? "auto" : "100%", this.placeholderEl.style.width = i ? "".concat(n || u, "px") : "auto", this.placeholderEl.style.height = "".concat(a, "px");
        var f = this.contentWrapperEl.offsetHeight;
        this.axis.x.isOverflowing = n !== 0 && u > n, this.axis.y.isOverflowing = a > f, this.axis.x.isOverflowing = l === "hidden" ? !1 : this.axis.x.isOverflowing, this.axis.y.isOverflowing = s === "hidden" ? !1 : this.axis.y.isOverflowing, this.axis.x.forceVisible = this.options.forceVisible === "x" || this.options.forceVisible === !0, this.axis.y.forceVisible = this.options.forceVisible === "y" || this.options.forceVisible === !0, this.hideNativeScrollbar();
        var d = this.axis.x.isOverflowing ? this.scrollbarWidth : 0, g = this.axis.y.isOverflowing ? this.scrollbarWidth : 0;
        this.axis.x.isOverflowing = this.axis.x.isOverflowing && u > o - g, this.axis.y.isOverflowing = this.axis.y.isOverflowing && a > f - d, this.axis.x.scrollbar.size = this.getScrollbarSize("x"), this.axis.y.scrollbar.size = this.getScrollbarSize("y"), this.axis.x.scrollbar.el && (this.axis.x.scrollbar.el.style.width = "".concat(this.axis.x.scrollbar.size, "px")), this.axis.y.scrollbar.el && (this.axis.y.scrollbar.el.style.height = "".concat(this.axis.y.scrollbar.size, "px")), this.positionScrollbar("x"), this.positionScrollbar("y"), this.toggleTrackVisibility("x"), this.toggleTrackVisibility("y");
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
        var f = u / (l - a), d = ~~((s - o.size) * f);
        d = r === "x" && this.isRtl ? -d + (s - o.size) : d, o.el.style.transform = r === "x" ? "translate3d(".concat(d, "px, 0, 0)") : "translate3d(0, ".concat(d, "px, 0)");
      }
    }, e.prototype.toggleTrackVisibility = function(r) {
      r === void 0 && (r = "y");
      var n = this.axis[r].track.el, t = this.axis[r].scrollbar.el;
      !n || !t || !this.contentWrapperEl || (this.axis[r].isOverflowing || this.axis[r].forceVisible ? (n.style.visibility = "visible", this.contentWrapperEl.style[this.axis[r].overflowAttr] = "scroll", this.el.classList.add("".concat(this.classNames.scrollable, "-").concat(r))) : (n.style.visibility = "hidden", this.contentWrapperEl.style[this.axis[r].overflowAttr] = "hidden", this.el.classList.remove("".concat(this.classNames.scrollable, "-").concat(r))), this.axis[r].isOverflowing ? t.style.display = "block" : t.style.display = "none");
    }, e.prototype.showScrollbar = function(r) {
      r === void 0 && (r = "y"), this.axis[r].isOverflowing && !this.axis[r].scrollbar.isVisible && (ge(this.axis[r].scrollbar.el, this.classNames.visible), this.axis[r].scrollbar.isVisible = !0);
    }, e.prototype.hideScrollbar = function(r) {
      r === void 0 && (r = "y"), !this.isDragging && this.axis[r].isOverflowing && this.axis[r].scrollbar.isVisible && (fe(this.axis[r].scrollbar.el, this.classNames.visible), this.axis[r].scrollbar.isVisible = !1);
    }, e.prototype.hideNativeScrollbar = function() {
      this.offsetEl && (this.offsetEl.style[this.isRtl ? "left" : "right"] = this.axis.y.isOverflowing || this.axis.y.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px", this.offsetEl.style.bottom = this.axis.x.isOverflowing || this.axis.x.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px");
    }, e.prototype.onMouseMoveForAxis = function(r) {
      r === void 0 && (r = "y");
      var n = this.axis[r];
      !n.track.el || !n.scrollbar.el || (n.track.rect = n.track.el.getBoundingClientRect(), n.scrollbar.rect = n.scrollbar.el.getBoundingClientRect(), this.isWithinBounds(n.track.rect) ? (this.showScrollbar(r), ge(n.track.el, this.classNames.hover), this.isWithinBounds(n.scrollbar.rect) ? ge(n.scrollbar.el, this.classNames.hover) : fe(n.scrollbar.el, this.classNames.hover)) : (fe(n.track.el, this.classNames.hover), this.options.autoHide && this.hideScrollbar(r)));
    }, e.prototype.onMouseLeaveForAxis = function(r) {
      r === void 0 && (r = "y"), fe(this.axis[r].track.el, this.classNames.hover), fe(this.axis[r].scrollbar.el, this.classNames.hover), this.options.autoHide && this.hideScrollbar(r);
    }, e.prototype.onDragStart = function(r, n) {
      var t;
      n === void 0 && (n = "y"), this.isDragging = !0;
      var i = et(this.el), o = de(this.el), l = this.axis[n].scrollbar, s = n === "y" ? r.pageY : r.pageX;
      this.axis[n].dragOffset = s - (((t = l.rect) === null || t === void 0 ? void 0 : t[this.axis[n].offsetAttr]) || 0), this.draggedAxis = n, ge(this.el, this.classNames.dragging), i.addEventListener("mousemove", this.drag, !0), i.addEventListener("mouseup", this.onEndDrag, !0), this.removePreventClickId === null ? (i.addEventListener("click", this.preventClick, !0), i.addEventListener("dblclick", this.preventClick, !0)) : (o.clearTimeout(this.removePreventClickId), this.removePreventClickId = null);
    }, e.prototype.onTrackClick = function(r, n) {
      var t = this, i, o, l, s;
      n === void 0 && (n = "y");
      var a = this.axis[n];
      if (!(!this.options.clickOnTrack || !a.scrollbar.el || !this.contentWrapperEl)) {
        r.preventDefault();
        var u = de(this.el);
        this.axis[n].scrollbar.rect = a.scrollbar.el.getBoundingClientRect();
        var f = this.axis[n].scrollbar, d = (o = (i = f.rect) === null || i === void 0 ? void 0 : i[this.axis[n].offsetAttr]) !== null && o !== void 0 ? o : 0, g = parseInt((s = (l = this.elStyles) === null || l === void 0 ? void 0 : l[this.axis[n].sizeAttr]) !== null && s !== void 0 ? s : "0px", 10), c = this.contentWrapperEl[this.axis[n].scrollOffsetAttr], m = n === "y" ? this.mouseY - d : this.mouseX - d, S = m < 0 ? -1 : 1, p = S === -1 ? c - g : c + g, h = 40, w = function() {
          t.contentWrapperEl && (S === -1 ? c > p && (c -= h, t.contentWrapperEl[t.axis[n].scrollOffsetAttr] = c, u.requestAnimationFrame(w)) : c < p && (c += h, t.contentWrapperEl[t.axis[n].scrollOffsetAttr] = c, u.requestAnimationFrame(w)));
        };
        w();
      }
    }, e.prototype.getContentElement = function() {
      return this.contentEl;
    }, e.prototype.getScrollElement = function() {
      return this.contentWrapperEl;
    }, e.prototype.removeListeners = function() {
      var r = de(this.el);
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
    }, e.getOptions = pr, e.helpers = fr, e;
  })()
), Q = function() {
  return Q = Object.assign || function(r) {
    for (var n, t = 1, i = arguments.length; t < i; t++) {
      n = arguments[t];
      for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
    }
    return r;
  }, Q.apply(this, arguments);
};
function hr(e, r) {
  var n = {};
  for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && r.indexOf(t) < 0 && (n[t] = e[t]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, t = Object.getOwnPropertySymbols(e); i < t.length; i++)
      r.indexOf(t[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, t[i]) && (n[t[i]] = e[t[i]]);
  return n;
}
var Dt = z.forwardRef(function(e, r) {
  var n = e.children, t = e.scrollableNodeProps, i = t === void 0 ? {} : t, o = hr(e, ["children", "scrollableNodeProps"]), l = z.useRef(), s = z.useRef(), a = z.useRef(), u = {}, f = {};
  Object.keys(o).forEach(function(c) {
    Object.prototype.hasOwnProperty.call(Pe.defaultOptions, c) ? u[c] = o[c] : f[c] = o[c];
  });
  var d = Q(Q({}, Pe.defaultOptions.classNames), u.classNames), g = Q(Q({}, i), { className: "".concat(d.contentWrapper).concat(i.className ? " ".concat(i.className) : ""), tabIndex: u.tabIndex || Pe.defaultOptions.tabIndex, role: "region", "aria-label": u.ariaLabel || Pe.defaultOptions.ariaLabel });
  return z.useEffect(function() {
    var c;
    return s.current = g.ref ? g.ref.current : s.current, l.current && (c = new Pe(l.current, Q(Q(Q({}, u), s.current && {
      scrollableNode: s.current
    }), a.current && {
      contentNode: a.current
    })), typeof r == "function" ? r(c) : r && (r.current = c)), function() {
      c?.unMount(), c = null, typeof r == "function" && r(null);
    };
  }, []), z.createElement(
    "div",
    Q({ "data-simplebar": "init", ref: l }, f),
    z.createElement(
      "div",
      { className: d.wrapper },
      z.createElement(
        "div",
        { className: d.heightAutoObserverWrapperEl },
        z.createElement("div", { className: d.heightAutoObserverEl })
      ),
      z.createElement(
        "div",
        { className: d.mask },
        z.createElement("div", { className: d.offset }, typeof n == "function" ? n({
          scrollableNodeRef: s,
          scrollableNodeProps: Q(Q({}, g), { ref: s }),
          contentNodeRef: a,
          contentNodeProps: {
            className: d.contentEl,
            ref: a
          }
        }) : z.createElement(
          "div",
          Q({}, g),
          z.createElement("div", { className: d.contentEl }, n)
        ))
      ),
      z.createElement("div", { className: d.placeholder })
    ),
    z.createElement(
      "div",
      { className: "".concat(d.track, " ").concat(d.horizontal) },
      z.createElement("div", { className: d.scrollbar })
    ),
    z.createElement(
      "div",
      { className: "".concat(d.track, " ").concat(d.vertical) },
      z.createElement("div", { className: d.scrollbar })
    )
  );
});
Dt.displayName = "SimpleBar";
function mr(e, r, n, t) {
  return An({
    data: r,
    columns: e,
    state: {
      columnOrder: n
    },
    onColumnOrderChange: t,
    getCoreRowModel: On()
  });
}
function vr(e) {
  const [r, n] = te(0);
  return lt(() => {
    const t = e.current;
    if (!t) return;
    const i = new ResizeObserver((o) => {
      n(o[0].contentRect.width);
    });
    return i.observe(t), () => i.disconnect();
  }, [e]), r;
}
function Sr() {
  const e = H(null), r = H([]), n = K((i) => {
    i && !r.current.includes(i) && r.current.push(i);
  }, []), t = K(() => {
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
function wr({
  onResize: e,
  onResizeEnd: r,
  minWidth: n = 40
}) {
  const t = H(0), i = H(0), o = H(null), l = K(
    (u) => {
      if (!o.current) return;
      const f = u.clientX - t.current, d = Math.max(n, i.current + f);
      e(o.current, d);
    },
    [n, e]
  ), s = K(() => {
    o.current = null, document.removeEventListener("mousemove", l), document.removeEventListener("mouseup", s), r?.();
  }, [l, r]);
  return { startResize: K(
    (u, f) => {
      u.preventDefault(), u.stopPropagation(), o.current = f.id, t.current = u.clientX, i.current = st(f.columnDef.meta?.widthSize), document.addEventListener("mousemove", l), document.addEventListener("mouseup", s);
    },
    [l, s]
  ) };
}
function Cr(e) {
  const [r, n] = te(!1);
  return lt(() => {
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
function yr(e) {
  const r = e.getState().columnOrder;
  return pe(() => {
    const n = e.getVisibleLeafColumns(), t = /* @__PURE__ */ new Map();
    for (const s of n)
      t.set(s.id, st(s.columnDef.meta?.widthSize));
    const i = /* @__PURE__ */ new Map();
    let o = 0;
    for (const s of n)
      s.columnDef.meta?.sticky === "left" && (i.set(s.id, { side: "left", offset: o, zIndex: 20 }), o += t.get(s.id) ?? 0);
    let l = 0;
    for (let s = n.length - 1; s >= 0; s--) {
      const a = n[s];
      a.columnDef.meta?.sticky === "right" && (i.set(a.id, { side: "right", offset: l, zIndex: 20 }), l += t.get(a.id) ?? 0);
    }
    return i;
  }, [e, r]);
}
function Rr({ setColumnOrder: e }) {
  const r = H(null), n = H(null), t = H(null), i = H(null), o = H(null), l = H(0), s = H(0), a = H([]), u = H(() => {
  }), f = H(() => {
  }), d = K(() => {
    const p = Array.from(
      document.querySelectorAll("th[data-col-id]")
    );
    a.current = p.filter((h) => h.dataset.reorderable !== "false").map((h) => {
      const w = h.getBoundingClientRect();
      return {
        id: h.dataset.colId,
        left: w.left,
        right: w.right
      };
    }).sort((h, w) => h.left - w.left);
  }, []), g = K((p, h, w) => {
    const y = p.getBoundingClientRect();
    let b = p.parentElement;
    for (; b && !b.classList.contains("super-table-wrapper"); )
      b = b.parentElement;
    const I = b?.querySelector(".table-internal-footer"), E = b?.querySelector(".internal-table"), P = I ?? E, G = (P ? P.getBoundingClientRect().bottom : y.bottom) - y.top, F = document.createElement("div");
    F.classList.add("table-col-ghost");
    const A = window.getComputedStyle(p), W = document.createElement("div");
    return W.classList.add("table-col-ghost-header"), W.style.height = `${y.height}px`, W.style.fontFamily = A.fontFamily, W.style.fontSize = A.fontSize, W.style.fontWeight = A.fontWeight, W.style.fontStyle = A.fontStyle, W.style.letterSpacing = A.letterSpacing, W.style.color = A.color, W.innerHTML = p.innerHTML, F.appendChild(W), F.style.position = "fixed", F.style.left = `${h}px`, F.style.top = `${w}px`, F.style.width = `${y.width}px`, F.style.height = `${G}px`, F.style.pointerEvents = "none", F.style.zIndex = "9999", F.style.willChange = "left, top", F.style.transition = "none", document.body.appendChild(F), F;
  }, []), c = K(() => {
    const p = document.createElement("div");
    return p.className = "table-col-drop-indicator", p.style.position = "fixed", p.style.pointerEvents = "none", p.style.zIndex = "10000", p.style.display = "none", document.body.appendChild(p), p;
  }, []), m = K((p, h) => {
    const w = i.current;
    if (!w) return;
    const y = document.querySelector(`th[data-col-id="${p}"]`);
    if (!y) {
      w.style.display = "none";
      return;
    }
    const b = y.getBoundingClientRect(), I = h < b.left + b.width / 2, E = b.top;
    let P = y.parentElement;
    for (; P && !P.classList.contains("super-table-wrapper"); )
      P = P.parentElement;
    const V = P?.querySelector(".table-internal-footer"), G = P?.querySelector(".internal-table"), F = V ?? G, A = F ? F.getBoundingClientRect().bottom : b.bottom;
    w.style.display = "block", w.style.top = `${E}px`, w.style.height = `${A - E}px`, w.style.left = I ? `${b.left}px` : `${b.right}px`;
  }, []), S = K(
    (p, h) => {
      r.current = p;
      const w = document.querySelector(`th[data-col-id="${p}"]`);
      w && (t.current = w, n.current = g(w, h.clientX, w.getBoundingClientRect().top), i.current = c(), w.classList.add("is-dragging-col"), w.style.opacity = "0.2", d(), l.current = h.clientX, s.current = h.clientY, document.body.style.cursor = "grabbing", document.addEventListener("pointermove", u.current), document.addEventListener("pointerup", f.current));
    },
    [g, c, d]
  );
  return u.current = (p) => {
    !r.current || !n.current || (l.current = p.clientX, s.current = p.clientY, !o.current && (o.current = requestAnimationFrame(() => {
      if (o.current = null, !r.current || !n.current) return;
      n.current.style.left = `${l.current}px`;
      const h = a.current;
      if (!h.length) return;
      let w = null;
      for (const y of h)
        if (y.id !== r.current && l.current >= y.left && l.current <= y.right) {
          w = y.id;
          break;
        }
      w ? m(w, l.current) : i.current && (i.current.style.display = "none"), !(!w || w === r.current) && (e((y) => {
        const b = y.indexOf(r.current), I = y.indexOf(w);
        if (b === -1 || I === -1 || b === I) return y;
        const E = [...y];
        return E.splice(b, 1), E.splice(I, 0, r.current), E;
      }), requestAnimationFrame(() => {
        d();
      }));
    })));
  }, f.current = () => {
    o.current && (cancelAnimationFrame(o.current), o.current = null), n.current?.remove(), n.current = null, i.current?.remove(), i.current = null, t.current && (t.current.classList.remove("is-dragging-col"), t.current.style.opacity = ""), t.current = null, r.current = null, l.current = 0, s.current = 0, a.current = [], document.body.style.cursor = "", document.removeEventListener("pointermove", u.current), document.removeEventListener("pointerup", f.current);
  }, {
    startDrag: S
  };
}
function xr(e) {
  return "accessorKey" in e && typeof e.accessorKey == "string";
}
function _r(e) {
  return e.map((r) => {
    if (r.id)
      return r;
    if (xr(r))
      return {
        ...r,
        id: r.accessorKey
      };
    throw new Error(
      "Columns sem id e sem accessorKey string. Defina um id explicitamente para esta coluna."
    );
  });
}
function Er(e) {
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
function br(e, r) {
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
function $r(e) {
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
function Or({
  id: e,
  header: r,
  data: n,
  footer: t,
  tableHeight: i = "400px",
  resizableCol: o = !1,
  reorderableCol: l = !1,
  reorderableColIconPosition: s = "right",
  sortableCol: a = !0,
  onSortChange: u,
  onDataChange: f,
  stripedRows: d = !1,
  defaultTextAlign: g = "left",
  editable: c = !1,
  draggable: m = !1,
  draggableSticky: S = !1,
  selectable: p,
  expandable: h,
  pagination: w,
  loading: y,
  loadingCustom: b,
  noResultMessage: I = "Nenhum resultado encontrado.",
  onRowClick: E,
  hoverableRow: P,
  borders: V = "full",
  style: G = "default"
}) {
  const F = H(null), A = K(
    (O) => {
      F.current = O;
    },
    []
  ), [W, ve] = te(null), $e = K(
    (O) => {
      ve(O), u?.(O);
    },
    [u]
  ), {
    bodyRef: ne,
    registerSyncElement: Se,
    onBodyScroll: k
  } = Sr(), M = vr(ne), q = Cr(ne), [X, Ce] = te({}), ue = pe(
    () => new Set(p?.initialSelectRow || []),
    [p?.initialSelectRow]
  ), [le, ce] = te(ue);
  Fe(() => {
    p?.initialSelectRow && ce(new Set(p.initialSelectRow));
  }, [p?.initialSelectRow]), Fe(() => {
    p?.onSelectedRowsChange?.(Array.from(le));
  }, [le, p]);
  const [ye, Re] = te(/* @__PURE__ */ new Set()), C = pe(
    () => _r(
      (() => {
        const O = [];
        return m && O.push(Er(S)), p && O.push(br(
          p.sticky,
          p.label
        )), h && O.push($r(h.sticky)), [...O, ...r];
      })()
    ),
    [
      r,
      m,
      S,
      p,
      h
    ]
  ), R = pe(
    () => new Set(
      C.filter((O) => O.meta?.revealOnHover).map((O) => O.id)
    ),
    [C]
  ), [Y, L] = te(
    () => C.map((O) => O.id)
  );
  Fe(() => {
    L((O) => {
      const se = C.map((ee) => ee.id), ie = new Set(O);
      return O.length === se.length && se.every((ee) => ie.has(ee)) ? O : se;
    });
  }, [C]);
  const [re, D] = te(n);
  Fe(() => {
    D(n);
  }, [n]), Fe(() => {
    f?.(re);
  }, [re, f]);
  const xe = pe(
    () => C.map((O) => ({
      ...O,
      meta: {
        ...O.meta,
        widthSize: X[O.id] ?? O.meta?.widthSize
      }
    })),
    [C, X]
  ), J = mr(
    xe,
    re,
    Y,
    L
  ), $ = yr(J), { startResize: we } = wr({
    onResize: (O, se) => {
      Ce((ie) => ({
        ...ie,
        [O]: `${se}px`
      }));
    },
    onResizeEnd: () => {
      requestAnimationFrame(() => {
        F.current?.recalculate();
      });
    }
  }), { startDrag: T } = Rr({
    setColumnOrder: L
  });
  return lt(() => {
    F.current?.recalculate();
  }, [q]), /* @__PURE__ */ j("div", { id: e, className: `super-table-wrapper borders-${V} style-${G}`, style: { height: i }, children: [
    /* @__PURE__ */ v(
      Tt,
      {
        table: J,
        scrollRef: Se,
        tableWidth: M,
        stickyById: $,
        resizableCol: o,
        reorderableCol: l,
        reorderableColIconPosition: s,
        sortableCol: a,
        sortState: W,
        setSortState: $e,
        onResizeStart: we,
        onDragStart: T,
        defaultTextAlign: g,
        selectable: p,
        selectedRows: le,
        setSelectedRows: ce,
        disableSelectRow: p?.disableSelectRow || [],
        data: n,
        expandable: h,
        expandedRows: ye,
        setExpandedRows: Re
      }
    ),
    /* @__PURE__ */ j("div", { className: "internal-table", children: [
      /* @__PURE__ */ v(
        Gt,
        {
          table: J,
          scrollRef: Se,
          tableWidth: M,
          stickyById: $,
          defaultTextAlign: g
        }
      ),
      /* @__PURE__ */ j("div", { className: `table-body-area ${q ? "has-h-scroll" : "no-h-scroll"}`, children: [
        /* @__PURE__ */ v(
          Dt,
          {
            ref: A,
            className: "table-body-scroll",
            scrollableNodeProps: {
              ref: ne,
              onScroll: k
            },
            children: /* @__PURE__ */ v(
              zn,
              {
                table: J,
                tableWidth: M,
                stickyById: $,
                defaultTextAlign: g,
                editable: c,
                draggable: m,
                setData: D,
                setInternalData: D,
                selectable: p,
                selectedRows: le,
                setSelectedRows: ce,
                disableSelectRow: p?.disableSelectRow || [],
                expandable: h,
                expandedRows: ye,
                setExpandedRows: Re,
                loading: y,
                loadingCustom: b,
                noResultMessage: I,
                onRowClick: E,
                totalItems: w?.totalItems,
                stripedRows: d,
                hoverableRow: P,
                revealOnHoverColIds: R
              }
            )
          }
        ),
        /* @__PURE__ */ v(
          Ln,
          {
            table: J,
            scrollRef: Se,
            tableWidth: M,
            stickyById: $,
            defaultTextAlign: g
          }
        )
      ] })
    ] }),
    t && /* @__PURE__ */ v(Dn, { table: J, children: t }),
    w && /* @__PURE__ */ v(
      Nn,
      {
        currentPage: w.currentPage,
        totalItems: w.totalItems,
        pageSize: w.pageSize,
        pageSizeOptions: w.pageSizeOptions,
        onPageChange: w.onPageChange,
        renderInfo: w.renderInfo
      }
    )
  ] });
}
export {
  Or as SuperTable
};
