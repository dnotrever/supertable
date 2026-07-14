import { jsx as h, jsxs as W, Fragment as Rt } from "react/jsx-runtime";
import * as L from "react";
import { useCallback as U, useMemo as _e, useRef as k, useState as le, useLayoutEffect as ut, useEffect as Ne } from "react";
function Gt(e) {
  const r = e.columnDef.meta;
  return !(r?.resizable === !1 || r?.sticky && r.resizable !== !0);
}
function Oe(e, r) {
  return e.columnDef.meta?.textAlign ?? r;
}
function ct(e) {
  return e && e.endsWith("px") ? parseFloat(e) : 0;
}
function Le({ table: e, tableWidth: r }) {
  const n = e.getVisibleLeafColumns(), o = n.map(
    (l) => ct(l.columnDef.meta?.widthSize)
  ).reduce((l, s) => l + s, 0) > r;
  return /* @__PURE__ */ h("colgroup", { children: n.map((l, s) => {
    const a = l.columnDef.meta, u = s === n.length - 1;
    let f;
    return !o && u ? f = { width: "auto" } : a?.widthSize && (f = { width: a.widthSize }), /* @__PURE__ */ h("col", { style: f }, l.id);
  }) });
}
function Wt({
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
  scrollRef: v,
  onResizeStart: C,
  setSelectedRows: p,
  expandable: S,
  expandedRows: y,
  setExpandedRows: $
}) {
  const E = n.map((N, M) => typeof N == "object" && N !== null && "id" in N ? N.id ?? M : M), R = !!d, A = d?.label, O = E.filter((N) => !c.includes(N)), B = O.filter((N) => g.has(N)).length, T = B === O.length && O.length > 0, z = B > 0 && B < O.length, K = () => {
    p((N) => {
      const M = new Set(N);
      return T ? O.forEach((Y) => M.delete(Y)) : O.forEach((Y) => M.add(Y)), M;
    });
  }, G = !!S, ye = S?.expandAllButton || !1, ne = E.every((N) => y.has(N)), ge = () => {
    $(ne ? /* @__PURE__ */ new Set() : new Set(E));
  };
  return /* @__PURE__ */ h("div", { className: "table-scroll-sync", ref: v, children: /* @__PURE__ */ W("table", { className: "table table-external-header", children: [
    /* @__PURE__ */ h(
      Le,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ h("thead", { children: e.getHeaderGroups().map((N) => /* @__PURE__ */ h("tr", { children: N.headers.map((M) => {
      const Y = M.column.columnDef.meta, J = t.get(M.column.id), Re = Oe(M.column, f), ue = o && Y?.reorderable !== !1 && !Y?.sticky, ce = (Y?.sortable ?? s) && !Y?.sticky && !["__draggable__", "__selectable__", "__expandable__"].includes(M.column.id), pe = a?.columnId === M.column.id, he = () => {
        if (!ce) return;
        let P;
        !a || a.columnId !== M.column.id ? P = { columnId: M.column.id, direction: "asc" } : a.direction === "asc" ? P = { columnId: M.column.id, direction: "desc" } : P = null, u(P);
      }, Ee = [
        J ? "is-sticky" : "",
        J?.side === "left" ? "is-sticky-left" : "",
        J?.side === "right" ? "is-sticky-right" : "",
        ce ? "is-sortable" : "",
        pe ? `is-sorted-${a.direction}` : ""
      ].filter(Boolean).join(" "), be = J ? J.side === "left" ? { "--sticky-left": `${J.offset}px` } : { "--sticky-right": `${J.offset}px` } : void 0;
      return /* @__PURE__ */ h(
        "th",
        {
          "data-col-id": M.column.id,
          "data-fixed": Y?.sticky ? "true" : void 0,
          "data-reorderable": ue ? void 0 : "false",
          className: Ee,
          style: be,
          onClick: he,
          children: /* @__PURE__ */ W(
            "div",
            {
              className: [
                "th-content",
                `align-${Re}`,
                ue ? `reorder-icon-${l}` : ""
              ].filter(Boolean).join(" "),
              children: [
                /* @__PURE__ */ h("div", { children: M.isPlaceholder ? null : M.column.id === "__selectable__" && R ? /* @__PURE__ */ W("label", { children: [
                  /* @__PURE__ */ h(
                    "input",
                    {
                      type: "checkbox",
                      checked: T,
                      ref: (P) => {
                        P && (P.indeterminate = z);
                      },
                      onChange: K
                    }
                  ),
                  A
                ] }) : M.column.id === "__expandable__" && G && ye ? /* @__PURE__ */ h(
                  "button",
                  {
                    onClick: ge,
                    className: `expand-all-button ${ne ? "expanded" : ""}`,
                    children: "⇅"
                  }
                ) : (() => {
                  const P = M.column.columnDef.header;
                  return typeof P == "function" ? P({ column: M.column, table: e, header: M }) : P;
                })() }),
                ce && /* @__PURE__ */ h("div", { className: "th-actions th-sort-actions", children: /* @__PURE__ */ h("span", { className: "sort-indicator" }) }),
                ue && /* @__PURE__ */ h(
                  "div",
                  {
                    className: `th-actions th-reorder-actions position-${l}`,
                    children: /* @__PURE__ */ h(
                      "span",
                      {
                        className: "col-drag-handle",
                        onClick: (P) => P.stopPropagation(),
                        onPointerDown: (P) => {
                          P.preventDefault(), P.currentTarget.setPointerCapture(P.pointerId), m?.(M.column.id, P.nativeEvent);
                        },
                        children: "☰"
                      }
                    )
                  }
                ),
                i && C && Gt(M.column) && /* @__PURE__ */ h(
                  "span",
                  {
                    className: "col-resize-handle",
                    onClick: (P) => P.stopPropagation(),
                    onMouseDown: (P) => C(P, M.column)
                  }
                )
              ]
            }
          )
        },
        M.id
      );
    }) }, N.id)) })
  ] }) });
}
function Bt({
  table: e,
  tableWidth: r,
  stickyById: n,
  defaultTextAlign: t,
  scrollRef: i
}) {
  return e.getVisibleLeafColumns().some(
    (s) => s.columnDef.meta?.internalHeader != null
  ) ? /* @__PURE__ */ h("div", { className: "table-scroll-sync", ref: i, children: /* @__PURE__ */ W("table", { className: "table table-internal-header", children: [
    /* @__PURE__ */ h(
      Le,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ h("thead", { children: /* @__PURE__ */ h("tr", { children: e.getVisibleLeafColumns().map((s) => {
      const a = s.columnDef.meta?.internalHeader, u = n.get(s.id), f = Oe(s, t), d = [
        u ? "is-sticky" : "",
        u?.side === "left" ? "is-sticky-left" : "",
        u?.side === "right" ? "is-sticky-right" : ""
      ].filter(Boolean).join(" "), g = u ? u.side === "left" ? { "--sticky-left": `${u.offset}px` } : { "--sticky-right": `${u.offset}px` } : void 0;
      return /* @__PURE__ */ h(
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
function we(e, r) {
  return typeof e == "function" ? e(r) : e;
}
function te(e, r) {
  return (n) => {
    r.setState((t) => ({
      ...t,
      [e]: we(n, t[e])
    }));
  };
}
function qe(e) {
  return e instanceof Function;
}
function jt(e) {
  return Array.isArray(e) && e.every((r) => typeof r == "number");
}
function qt(e, r) {
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
      const f = Math.round((Date.now() - l) * 100) / 100, d = Math.round((Date.now() - u) * 100) / 100, g = d / 16, c = (m, v) => {
        for (m = String(m); m.length < v; )
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
function Xt(e, r, n, t) {
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
function Yt(e, r, n, t) {
  var i, o;
  const s = {
    ...e._getDefaultColumnDef(),
    ...r
  }, a = s.accessorKey;
  let u = (i = (o = s.id) != null ? o : a ? typeof String.prototype.replaceAll == "function" ? a.replaceAll(".", "_") : a.replace(/\./g, "_") : void 0) != null ? i : typeof s.header == "string" ? s.header : void 0, f;
  if (s.accessorFn ? f = s.accessorFn : a && (a.includes(".") ? f = (g) => {
    let c = g;
    for (const v of a.split(".")) {
      var m;
      c = (m = c) == null ? void 0 : m[v], process.env.NODE_ENV !== "production" && c === void 0 && console.warn(`"${v}" in deeply nested key "${a}" returned undefined.`);
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
        let m = d.columns.flatMap((v) => v.getLeafColumns());
        return g(m);
      }
      return [d];
    }, _(e.options, "debugColumns", "column.getLeafColumns"))
  };
  for (const g of e._features)
    g.createColumn == null || g.createColumn(d, e);
  return d;
}
const X = "debugHeaders";
function ht(e, r, n) {
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
const Ut = {
  createTable: (e) => {
    e.getHeaderGroups = x(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (r, n, t, i) => {
      var o, l;
      const s = (o = t?.map((d) => n.find((g) => g.id === d)).filter(Boolean)) != null ? o : [], a = (l = i?.map((d) => n.find((g) => g.id === d)).filter(Boolean)) != null ? l : [], u = n.filter((d) => !(t != null && t.includes(d.id)) && !(i != null && i.includes(d.id)));
      return He(r, [...s, ...u, ...a], e);
    }, _(e.options, X, "getHeaderGroups")), e.getCenterHeaderGroups = x(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (r, n, t, i) => (n = n.filter((o) => !(t != null && t.includes(o.id)) && !(i != null && i.includes(o.id))), He(r, n, e, "center")), _(e.options, X, "getCenterHeaderGroups")), e.getLeftHeaderGroups = x(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left], (r, n, t) => {
      var i;
      const o = (i = t?.map((l) => n.find((s) => s.id === l)).filter(Boolean)) != null ? i : [];
      return He(r, o, e, "left");
    }, _(e.options, X, "getLeftHeaderGroups")), e.getRightHeaderGroups = x(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.right], (r, n, t) => {
      var i;
      const o = (i = t?.map((l) => n.find((s) => s.id === l)).filter(Boolean)) != null ? i : [];
      return He(r, o, e, "right");
    }, _(e.options, X, "getRightHeaderGroups")), e.getFooterGroups = x(() => [e.getHeaderGroups()], (r) => [...r].reverse(), _(e.options, X, "getFooterGroups")), e.getLeftFooterGroups = x(() => [e.getLeftHeaderGroups()], (r) => [...r].reverse(), _(e.options, X, "getLeftFooterGroups")), e.getCenterFooterGroups = x(() => [e.getCenterHeaderGroups()], (r) => [...r].reverse(), _(e.options, X, "getCenterFooterGroups")), e.getRightFooterGroups = x(() => [e.getRightHeaderGroups()], (r) => [...r].reverse(), _(e.options, X, "getRightFooterGroups")), e.getFlatHeaders = x(() => [e.getHeaderGroups()], (r) => r.map((n) => n.headers).flat(), _(e.options, X, "getFlatHeaders")), e.getLeftFlatHeaders = x(() => [e.getLeftHeaderGroups()], (r) => r.map((n) => n.headers).flat(), _(e.options, X, "getLeftFlatHeaders")), e.getCenterFlatHeaders = x(() => [e.getCenterHeaderGroups()], (r) => r.map((n) => n.headers).flat(), _(e.options, X, "getCenterFlatHeaders")), e.getRightFlatHeaders = x(() => [e.getRightHeaderGroups()], (r) => r.map((n) => n.headers).flat(), _(e.options, X, "getRightFlatHeaders")), e.getCenterLeafHeaders = x(() => [e.getCenterFlatHeaders()], (r) => r.filter((n) => {
      var t;
      return !((t = n.subHeaders) != null && t.length);
    }), _(e.options, X, "getCenterLeafHeaders")), e.getLeftLeafHeaders = x(() => [e.getLeftFlatHeaders()], (r) => r.filter((n) => {
      var t;
      return !((t = n.subHeaders) != null && t.length);
    }), _(e.options, X, "getLeftLeafHeaders")), e.getRightLeafHeaders = x(() => [e.getRightFlatHeaders()], (r) => r.filter((n) => {
      var t;
      return !((t = n.subHeaders) != null && t.length);
    }), _(e.options, X, "getRightLeafHeaders")), e.getLeafHeaders = x(() => [e.getLeftHeaderGroups(), e.getCenterHeaderGroups(), e.getRightHeaderGroups()], (r, n, t) => {
      var i, o, l, s, a, u;
      return [...(i = (o = r[0]) == null ? void 0 : o.headers) != null ? i : [], ...(l = (s = n[0]) == null ? void 0 : s.headers) != null ? l : [], ...(a = (u = t[0]) == null ? void 0 : u.headers) != null ? a : []].map((f) => f.getLeafHeaders()).flat();
    }, _(e.options, X, "getLeafHeaders"));
  }
};
function He(e, r, n, t) {
  var i, o;
  let l = 0;
  const s = function(g, c) {
    c === void 0 && (c = 1), l = Math.max(l, c), g.filter((m) => m.getIsVisible()).forEach((m) => {
      var v;
      (v = m.columns) != null && v.length && s(m.columns, c + 1);
    }, 0);
  };
  s(e);
  let a = [];
  const u = (g, c) => {
    const m = {
      depth: c,
      id: [t, `${c}`].filter(Boolean).join("_"),
      headers: []
    }, v = [];
    g.forEach((C) => {
      const p = [...v].reverse()[0], S = C.column.depth === m.depth;
      let y, $ = !1;
      if (S && C.column.parent ? y = C.column.parent : (y = C.column, $ = !0), p && p?.column === y)
        p.subHeaders.push(C);
      else {
        const E = ht(n, y, {
          id: [t, c, y.id, C?.id].filter(Boolean).join("_"),
          isPlaceholder: $,
          placeholderId: $ ? `${v.filter((R) => R.column === y).length}` : void 0,
          depth: c,
          index: v.length
        });
        E.subHeaders.push(C), v.push(E);
      }
      m.headers.push(C), C.headerGroup = m;
    }), a.push(m), c > 0 && u(v, c - 1);
  }, f = r.map((g, c) => ht(n, g, {
    depth: l,
    index: c
  }));
  u(f, l - 1), a.reverse();
  const d = (g) => g.filter((m) => m.column.getIsVisible()).map((m) => {
    let v = 0, C = 0, p = [0];
    m.subHeaders && m.subHeaders.length ? (p = [], d(m.subHeaders).forEach((y) => {
      let {
        colSpan: $,
        rowSpan: E
      } = y;
      v += $, p.push(E);
    })) : v = 1;
    const S = Math.min(...p);
    return C = C + S, m.colSpan = v, m.rowSpan = C, {
      colSpan: v,
      rowSpan: C
    };
  });
  return d((i = (o = a[0]) == null ? void 0 : o.headers) != null ? i : []), a;
}
const Kt = (e, r, n, t, i, o, l) => {
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
    getLeafRows: () => qt(s.subRows, (a) => a.subRows),
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
    getAllCells: x(() => [e.getAllLeafColumns()], (a) => a.map((u) => Xt(e, s, u, u.id)), _(e.options, "debugRows", "getAllCells")),
    _getAllCellsByColumnId: x(() => [s.getAllCells()], (a) => a.reduce((u, f) => (u[f.column.id] = f, u), {}), _(e.options, "debugRows", "getAllCellsByColumnId"))
  };
  for (let a = 0; a < e._features.length; a++) {
    const u = e._features[a];
    u == null || u.createRow == null || u.createRow(s, e);
  }
  return s;
}, Qt = {
  createColumn: (e, r) => {
    e._getFacetedRowModel = r.options.getFacetedRowModel && r.options.getFacetedRowModel(r, e.id), e.getFacetedRowModel = () => e._getFacetedRowModel ? e._getFacetedRowModel() : r.getPreFilteredRowModel(), e._getFacetedUniqueValues = r.options.getFacetedUniqueValues && r.options.getFacetedUniqueValues(r, e.id), e.getFacetedUniqueValues = () => e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getFacetedMinMaxValues = r.options.getFacetedMinMaxValues && r.options.getFacetedMinMaxValues(r, e.id), e.getFacetedMinMaxValues = () => {
      if (e._getFacetedMinMaxValues)
        return e._getFacetedMinMaxValues();
    };
  }
}, xt = (e, r, n) => {
  var t, i;
  const o = n == null || (t = n.toString()) == null ? void 0 : t.toLowerCase();
  return !!(!((i = e.getValue(r)) == null || (i = i.toString()) == null || (i = i.toLowerCase()) == null) && i.includes(o));
};
xt.autoRemove = (e) => ae(e);
const _t = (e, r, n) => {
  var t;
  return !!(!((t = e.getValue(r)) == null || (t = t.toString()) == null) && t.includes(n));
};
_t.autoRemove = (e) => ae(e);
const Et = (e, r, n) => {
  var t;
  return ((t = e.getValue(r)) == null || (t = t.toString()) == null ? void 0 : t.toLowerCase()) === n?.toLowerCase();
};
Et.autoRemove = (e) => ae(e);
const bt = (e, r, n) => {
  var t;
  return (t = e.getValue(r)) == null ? void 0 : t.includes(n);
};
bt.autoRemove = (e) => ae(e);
const $t = (e, r, n) => !n.some((t) => {
  var i;
  return !((i = e.getValue(r)) != null && i.includes(t));
});
$t.autoRemove = (e) => ae(e) || !(e != null && e.length);
const Mt = (e, r, n) => n.some((t) => {
  var i;
  return (i = e.getValue(r)) == null ? void 0 : i.includes(t);
});
Mt.autoRemove = (e) => ae(e) || !(e != null && e.length);
const Ft = (e, r, n) => e.getValue(r) === n;
Ft.autoRemove = (e) => ae(e);
const Ot = (e, r, n) => e.getValue(r) == n;
Ot.autoRemove = (e) => ae(e);
const dt = (e, r, n) => {
  let [t, i] = n;
  const o = e.getValue(r);
  return o >= t && o <= i;
};
dt.resolveFilterValue = (e) => {
  let [r, n] = e, t = typeof r != "number" ? parseFloat(r) : r, i = typeof n != "number" ? parseFloat(n) : n, o = r === null || Number.isNaN(t) ? -1 / 0 : t, l = n === null || Number.isNaN(i) ? 1 / 0 : i;
  if (o > l) {
    const s = o;
    o = l, l = s;
  }
  return [o, l];
};
dt.autoRemove = (e) => ae(e) || ae(e[0]) && ae(e[1]);
const fe = {
  includesString: xt,
  includesStringSensitive: _t,
  equalsString: Et,
  arrIncludes: bt,
  arrIncludesAll: $t,
  arrIncludesSome: Mt,
  equals: Ft,
  weakEquals: Ot,
  inNumberRange: dt
};
function ae(e) {
  return e == null || e === "";
}
const Zt = {
  getDefaultColumnDef: () => ({
    filterFn: "auto"
  }),
  getInitialState: (e) => ({
    columnFilters: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnFiltersChange: te("columnFilters", e),
    filterFromLeafRows: !1,
    maxLeafRowFilterDepth: 100
  }),
  createColumn: (e, r) => {
    e.getAutoFilterFn = () => {
      const n = r.getCoreRowModel().flatRows[0], t = n?.getValue(e.id);
      return typeof t == "string" ? fe.includesString : typeof t == "number" ? fe.inNumberRange : typeof t == "boolean" || t !== null && typeof t == "object" ? fe.equals : Array.isArray(t) ? fe.arrIncludes : fe.weakEquals;
    }, e.getFilterFn = () => {
      var n, t;
      return qe(e.columnDef.filterFn) ? e.columnDef.filterFn : e.columnDef.filterFn === "auto" ? e.getAutoFilterFn() : (
        // @ts-ignore
        (n = (t = r.options.filterFns) == null ? void 0 : t[e.columnDef.filterFn]) != null ? n : fe[e.columnDef.filterFn]
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
        const i = e.getFilterFn(), o = t?.find((f) => f.id === e.id), l = we(n, o ? o.value : void 0);
        if (mt(i, l, e)) {
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
        return (o = we(r, i)) == null ? void 0 : o.filter((l) => {
          const s = n.find((a) => a.id === l.id);
          if (s) {
            const a = s.getFilterFn();
            if (mt(a, l.value, s))
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
function mt(e, r, n) {
  return (e && e.autoRemove ? e.autoRemove(r, n) : !1) || typeof r > "u" || typeof r == "string" && !r;
}
const Jt = (e, r, n) => n.reduce((t, i) => {
  const o = i.getValue(e);
  return t + (typeof o == "number" ? o : 0);
}, 0), en = (e, r, n) => {
  let t;
  return n.forEach((i) => {
    const o = i.getValue(e);
    o != null && (t > o || t === void 0 && o >= o) && (t = o);
  }), t;
}, tn = (e, r, n) => {
  let t;
  return n.forEach((i) => {
    const o = i.getValue(e);
    o != null && (t < o || t === void 0 && o >= o) && (t = o);
  }), t;
}, nn = (e, r, n) => {
  let t, i;
  return n.forEach((o) => {
    const l = o.getValue(e);
    l != null && (t === void 0 ? l >= l && (t = i = l) : (t > l && (t = l), i < l && (i = l)));
  }), [t, i];
}, rn = (e, r) => {
  let n = 0, t = 0;
  if (r.forEach((i) => {
    let o = i.getValue(e);
    o != null && (o = +o) >= o && (++n, t += o);
  }), n) return t / n;
}, on = (e, r) => {
  if (!r.length)
    return;
  const n = r.map((o) => o.getValue(e));
  if (!jt(n))
    return;
  if (n.length === 1)
    return n[0];
  const t = Math.floor(n.length / 2), i = n.sort((o, l) => o - l);
  return n.length % 2 !== 0 ? i[t] : (i[t - 1] + i[t]) / 2;
}, ln = (e, r) => Array.from(new Set(r.map((n) => n.getValue(e))).values()), sn = (e, r) => new Set(r.map((n) => n.getValue(e))).size, an = (e, r) => r.length, Ye = {
  sum: Jt,
  min: en,
  max: tn,
  extent: nn,
  mean: rn,
  median: on,
  unique: ln,
  uniqueCount: sn,
  count: an
}, un = {
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
    onGroupingChange: te("grouping", e),
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
        return Ye.sum;
      if (Object.prototype.toString.call(t) === "[object Date]")
        return Ye.extent;
    }, e.getAggregationFn = () => {
      var n, t;
      if (!e)
        throw new Error();
      return qe(e.columnDef.aggregationFn) ? e.columnDef.aggregationFn : e.columnDef.aggregationFn === "auto" ? e.getAutoAggregationFn() : (n = (t = r.options.aggregationFns) == null ? void 0 : t[e.columnDef.aggregationFn]) != null ? n : Ye[e.columnDef.aggregationFn];
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
function cn(e, r, n) {
  if (!(r != null && r.length) || !n)
    return e;
  const t = e.filter((o) => !r.includes(o.id));
  return n === "remove" ? t : [...r.map((o) => e.find((l) => l.id === o)).filter(Boolean), ...t];
}
const dn = {
  getInitialState: (e) => ({
    columnOrder: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnOrderChange: te("columnOrder", e)
  }),
  createColumn: (e, r) => {
    e.getIndex = x((n) => [ze(r, n)], (n) => n.findIndex((t) => t.id === e.id), _(r.options, "debugColumns", "getIndex")), e.getIsFirstColumn = (n) => {
      var t;
      return ((t = ze(r, n)[0]) == null ? void 0 : t.id) === e.id;
    }, e.getIsLastColumn = (n) => {
      var t;
      const i = ze(r, n);
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
      return cn(o, n, t);
    }, _(e.options, "debugTable", "_getOrderColumnsFn"));
  }
}, Ue = () => ({
  left: [],
  right: []
}), gn = {
  getInitialState: (e) => ({
    columnPinning: Ue(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnPinningChange: te("columnPinning", e)
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
      return e.setColumnPinning(r ? Ue() : (n = (t = e.initialState) == null ? void 0 : t.columnPinning) != null ? n : Ue());
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
function fn(e) {
  return e || (typeof document < "u" ? document : null);
}
const Te = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
}, Ke = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: !1,
  columnSizingStart: []
}), pn = {
  getDefaultColumnDef: () => Te,
  getInitialState: (e) => ({
    columnSizing: {},
    columnSizingInfo: Ke(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnSizingChange: te("columnSizing", e),
    onColumnSizingInfoChange: te("columnSizingInfo", e)
  }),
  createColumn: (e, r) => {
    e.getSize = () => {
      var n, t, i;
      const o = r.getState().columnSizing[e.id];
      return Math.min(Math.max((n = e.columnDef.minSize) != null ? n : Te.minSize, (t = o ?? e.columnDef.size) != null ? t : Te.size), (i = e.columnDef.maxSize) != null ? i : Te.maxSize);
    }, e.getStart = x((n) => [n, ze(r, n), r.getState().columnSizing], (n, t) => t.slice(0, e.getIndex(n)).reduce((i, o) => i + o.getSize(), 0), _(r.options, "debugColumns", "getStart")), e.getAfter = x((n) => [n, ze(r, n), r.getState().columnSizing], (n, t) => t.slice(e.getIndex(n) + 1).reduce((i, o) => i + o.getSize(), 0), _(r.options, "debugColumns", "getAfter")), e.resetSize = () => {
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
        if (!t || !i || (o.persist == null || o.persist(), Qe(o) && o.touches && o.touches.length > 1))
          return;
        const l = e.getSize(), s = e ? e.getLeafHeaders().map((p) => [p.column.id, p.column.getSize()]) : [[t.id, t.getSize()]], a = Qe(o) ? Math.round(o.touches[0].clientX) : o.clientX, u = {}, f = (p, S) => {
          typeof S == "number" && (r.setColumnSizingInfo((y) => {
            var $, E;
            const R = r.options.columnResizeDirection === "rtl" ? -1 : 1, A = (S - (($ = y?.startOffset) != null ? $ : 0)) * R, O = Math.max(A / ((E = y?.startSize) != null ? E : 0), -0.999999);
            return y.columnSizingStart.forEach((B) => {
              let [T, z] = B;
              u[T] = Math.round(Math.max(z + z * O, 0) * 100) / 100;
            }), {
              ...y,
              deltaOffset: A,
              deltaPercentage: O
            };
          }), (r.options.columnResizeMode === "onChange" || p === "end") && r.setColumnSizing((y) => ({
            ...y,
            ...u
          })));
        }, d = (p) => f("move", p), g = (p) => {
          f("end", p), r.setColumnSizingInfo((S) => ({
            ...S,
            isResizingColumn: !1,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        }, c = fn(n), m = {
          moveHandler: (p) => d(p.clientX),
          upHandler: (p) => {
            c?.removeEventListener("mousemove", m.moveHandler), c?.removeEventListener("mouseup", m.upHandler), g(p.clientX);
          }
        }, v = {
          moveHandler: (p) => (p.cancelable && (p.preventDefault(), p.stopPropagation()), d(p.touches[0].clientX), !1),
          upHandler: (p) => {
            var S;
            c?.removeEventListener("touchmove", v.moveHandler), c?.removeEventListener("touchend", v.upHandler), p.cancelable && (p.preventDefault(), p.stopPropagation()), g((S = p.touches[0]) == null ? void 0 : S.clientX);
          }
        }, C = hn() ? {
          passive: !1
        } : !1;
        Qe(o) ? (c?.addEventListener("touchmove", v.moveHandler, C), c?.addEventListener("touchend", v.upHandler, C)) : (c?.addEventListener("mousemove", m.moveHandler, C), c?.addEventListener("mouseup", m.upHandler, C)), r.setColumnSizingInfo((p) => ({
          ...p,
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
      e.setColumnSizingInfo(r ? Ke() : (n = e.initialState.columnSizingInfo) != null ? n : Ke());
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
let Ge = null;
function hn() {
  if (typeof Ge == "boolean") return Ge;
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
  return Ge = e, Ge;
}
function Qe(e) {
  return e.type === "touchstart";
}
const mn = {
  getInitialState: (e) => ({
    columnVisibility: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnVisibilityChange: te("columnVisibility", e)
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
function ze(e, r) {
  return r ? r === "center" ? e.getCenterVisibleLeafColumns() : r === "left" ? e.getLeftVisibleLeafColumns() : e.getRightVisibleLeafColumns() : e.getVisibleLeafColumns();
}
const vn = {
  createTable: (e) => {
    e._getGlobalFacetedRowModel = e.options.getFacetedRowModel && e.options.getFacetedRowModel(e, "__global__"), e.getGlobalFacetedRowModel = () => e.options.manualFiltering || !e._getGlobalFacetedRowModel ? e.getPreFilteredRowModel() : e._getGlobalFacetedRowModel(), e._getGlobalFacetedUniqueValues = e.options.getFacetedUniqueValues && e.options.getFacetedUniqueValues(e, "__global__"), e.getGlobalFacetedUniqueValues = () => e._getGlobalFacetedUniqueValues ? e._getGlobalFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getGlobalFacetedMinMaxValues = e.options.getFacetedMinMaxValues && e.options.getFacetedMinMaxValues(e, "__global__"), e.getGlobalFacetedMinMaxValues = () => {
      if (e._getGlobalFacetedMinMaxValues)
        return e._getGlobalFacetedMinMaxValues();
    };
  }
}, Sn = {
  getInitialState: (e) => ({
    globalFilter: void 0,
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGlobalFilterChange: te("globalFilter", e),
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
    e.getGlobalAutoFilterFn = () => fe.includesString, e.getGlobalFilterFn = () => {
      var r, n;
      const {
        globalFilterFn: t
      } = e.options;
      return qe(t) ? t : t === "auto" ? e.getGlobalAutoFilterFn() : (r = (n = e.options.filterFns) == null ? void 0 : n[t]) != null ? r : fe[t];
    }, e.setGlobalFilter = (r) => {
      e.options.onGlobalFilterChange == null || e.options.onGlobalFilterChange(r);
    }, e.resetGlobalFilter = (r) => {
      e.setGlobalFilter(r ? void 0 : e.initialState.globalFilter);
    };
  }
}, wn = {
  getInitialState: (e) => ({
    expanded: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onExpandedChange: te("expanded", e),
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
}, it = 0, ot = 10, Ze = () => ({
  pageIndex: it,
  pageSize: ot
}), Cn = {
  getInitialState: (e) => ({
    ...e,
    pagination: {
      ...Ze(),
      ...e?.pagination
    }
  }),
  getDefaultOptions: (e) => ({
    onPaginationChange: te("pagination", e)
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
      const i = (o) => we(t, o);
      return e.options.onPaginationChange == null ? void 0 : e.options.onPaginationChange(i);
    }, e.resetPagination = (t) => {
      var i;
      e.setPagination(t ? Ze() : (i = e.initialState.pagination) != null ? i : Ze());
    }, e.setPageIndex = (t) => {
      e.setPagination((i) => {
        let o = we(t, i.pageIndex);
        const l = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
        return o = Math.max(0, Math.min(o, l)), {
          ...i,
          pageIndex: o
        };
      });
    }, e.resetPageIndex = (t) => {
      var i, o;
      e.setPageIndex(t ? it : (i = (o = e.initialState) == null || (o = o.pagination) == null ? void 0 : o.pageIndex) != null ? i : it);
    }, e.resetPageSize = (t) => {
      var i, o;
      e.setPageSize(t ? ot : (i = (o = e.initialState) == null || (o = o.pagination) == null ? void 0 : o.pageSize) != null ? i : ot);
    }, e.setPageSize = (t) => {
      e.setPagination((i) => {
        const o = Math.max(1, we(t, i.pageSize)), l = i.pageSize * i.pageIndex, s = Math.floor(l / o);
        return {
          ...i,
          pageIndex: s,
          pageSize: o
        };
      });
    }, e.setPageCount = (t) => e.setPagination((i) => {
      var o;
      let l = we(t, (o = e.options.pageCount) != null ? o : -1);
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
}, Je = () => ({
  top: [],
  bottom: []
}), yn = {
  getInitialState: (e) => ({
    rowPinning: Je(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowPinningChange: te("rowPinning", e)
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
            top: ((d = a?.top) != null ? d : []).filter((v) => !(s != null && s.has(v))),
            bottom: [...((g = a?.bottom) != null ? g : []).filter((v) => !(s != null && s.has(v))), ...Array.from(s)]
          };
        }
        if (n === "top") {
          var c, m;
          return {
            top: [...((c = a?.top) != null ? c : []).filter((v) => !(s != null && s.has(v))), ...Array.from(s)],
            bottom: ((m = a?.bottom) != null ? m : []).filter((v) => !(s != null && s.has(v)))
          };
        }
        return {
          top: ((u = a?.top) != null ? u : []).filter((v) => !(s != null && s.has(v))),
          bottom: ((f = a?.bottom) != null ? f : []).filter((v) => !(s != null && s.has(v)))
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
      return e.setRowPinning(r ? Je() : (n = (t = e.initialState) == null ? void 0 : t.rowPinning) != null ? n : Je());
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
}, Rn = {
  getInitialState: (e) => ({
    rowSelection: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowSelectionChange: te("rowSelection", e),
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
        lt(i, o.id, t, !0, e);
      }), i;
    }), e.getPreSelectedRowModel = () => e.getCoreRowModel(), e.getSelectedRowModel = x(() => [e.getState().rowSelection, e.getCoreRowModel()], (r, n) => Object.keys(r).length ? et(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, _(e.options, "debugTable", "getSelectedRowModel")), e.getFilteredSelectedRowModel = x(() => [e.getState().rowSelection, e.getFilteredRowModel()], (r, n) => Object.keys(r).length ? et(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, _(e.options, "debugTable", "getFilteredSelectedRowModel")), e.getGroupedSelectedRowModel = x(() => [e.getState().rowSelection, e.getSortedRowModel()], (r, n) => Object.keys(r).length ? et(e, n) : {
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
        return lt(s, e.id, n, (l = t?.selectChildren) != null ? l : !0, r), s;
      });
    }, e.getIsSelected = () => {
      const {
        rowSelection: n
      } = r.getState();
      return gt(e, n);
    }, e.getIsSomeSelected = () => {
      const {
        rowSelection: n
      } = r.getState();
      return st(e, n) === "some";
    }, e.getIsAllSubRowsSelected = () => {
      const {
        rowSelection: n
      } = r.getState();
      return st(e, n) === "all";
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
}, lt = (e, r, n, t, i) => {
  var o;
  const l = i.getRow(r, !0);
  n ? (l.getCanMultiSelect() || Object.keys(e).forEach((s) => delete e[s]), l.getCanSelect() && (e[r] = !0)) : delete e[r], t && (o = l.subRows) != null && o.length && l.getCanSelectSubRows() && l.subRows.forEach((s) => lt(e, s.id, n, t, i));
};
function et(e, r) {
  const n = e.getState().rowSelection, t = [], i = {}, o = function(l, s) {
    return l.map((a) => {
      var u;
      const f = gt(a, n);
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
function gt(e, r) {
  var n;
  return (n = r[e.id]) != null ? n : !1;
}
function st(e, r, n) {
  var t;
  if (!((t = e.subRows) != null && t.length)) return !1;
  let i = !0, o = !1;
  return e.subRows.forEach((l) => {
    if (!(o && !i) && (l.getCanSelect() && (gt(l, r) ? o = !0 : i = !1), l.subRows && l.subRows.length)) {
      const s = st(l, r);
      s === "all" ? o = !0 : (s === "some" && (o = !0), i = !1);
    }
  }), i ? "all" : o ? "some" : !1;
}
const at = /([0-9]+)/gm, xn = (e, r, n) => It(Ce(e.getValue(n)).toLowerCase(), Ce(r.getValue(n)).toLowerCase()), _n = (e, r, n) => It(Ce(e.getValue(n)), Ce(r.getValue(n))), En = (e, r, n) => ft(Ce(e.getValue(n)).toLowerCase(), Ce(r.getValue(n)).toLowerCase()), bn = (e, r, n) => ft(Ce(e.getValue(n)), Ce(r.getValue(n))), $n = (e, r, n) => {
  const t = e.getValue(n), i = r.getValue(n);
  return t > i ? 1 : t < i ? -1 : 0;
}, Mn = (e, r, n) => ft(e.getValue(n), r.getValue(n));
function ft(e, r) {
  return e === r ? 0 : e > r ? 1 : -1;
}
function Ce(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function It(e, r) {
  const n = e.split(at).filter(Boolean), t = r.split(at).filter(Boolean);
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
const Ve = {
  alphanumeric: xn,
  alphanumericCaseSensitive: _n,
  text: En,
  textCaseSensitive: bn,
  datetime: $n,
  basic: Mn
}, Fn = {
  getInitialState: (e) => ({
    sorting: [],
    ...e
  }),
  getDefaultColumnDef: () => ({
    sortingFn: "auto",
    sortUndefined: 1
  }),
  getDefaultOptions: (e) => ({
    onSortingChange: te("sorting", e),
    isMultiSortEvent: (r) => r.shiftKey
  }),
  createColumn: (e, r) => {
    e.getAutoSortingFn = () => {
      const n = r.getFilteredRowModel().flatRows.slice(10);
      let t = !1;
      for (const i of n) {
        const o = i?.getValue(e.id);
        if (Object.prototype.toString.call(o) === "[object Date]")
          return Ve.datetime;
        if (typeof o == "string" && (t = !0, o.split(at).length > 1))
          return Ve.alphanumeric;
      }
      return t ? Ve.text : Ve.basic;
    }, e.getAutoSortDir = () => {
      const n = r.getFilteredRowModel().flatRows[0];
      return typeof n?.getValue(e.id) == "string" ? "asc" : "desc";
    }, e.getSortingFn = () => {
      var n, t;
      if (!e)
        throw new Error();
      return qe(e.columnDef.sortingFn) ? e.columnDef.sortingFn : e.columnDef.sortingFn === "auto" ? e.getAutoSortingFn() : (n = (t = r.options.sortingFns) == null ? void 0 : t[e.columnDef.sortingFn]) != null ? n : Ve[e.columnDef.sortingFn];
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
}, On = [
  Ut,
  mn,
  dn,
  gn,
  Qt,
  Zt,
  vn,
  //depends on ColumnFaceting
  Sn,
  //depends on ColumnFiltering
  Fn,
  un,
  //depends on RowSorting
  wn,
  Cn,
  yn,
  Rn,
  pn
];
function In(e) {
  var r, n;
  process.env.NODE_ENV !== "production" && (e.debugAll || e.debugTable) && console.info("Creating Table Instance...");
  const t = [...On, ...(r = e._features) != null ? r : []];
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
      const c = we(g, i.options);
      i.options = l(c);
    },
    getState: () => i.options.state,
    setState: (g) => {
      i.options.onStateChange == null || i.options.onStateChange(g);
    },
    _getRowId: (g, c, m) => {
      var v;
      return (v = i.options.getRowId == null ? void 0 : i.options.getRowId(g, c, m)) != null ? v : `${m ? [m.id, c].join(".") : c}`;
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
          const v = m.header.column.columnDef;
          return v.accessorKey ? v.accessorKey : v.accessorFn ? v.id : null;
        },
        // footer: props => props.header.column.id,
        cell: (m) => {
          var v, C;
          return (v = (C = m.renderValue()) == null || C.toString == null ? void 0 : C.toString()) != null ? v : null;
        },
        ...i._features.reduce((m, v) => Object.assign(m, v.getDefaultColumnDef == null ? void 0 : v.getDefaultColumnDef()), {}),
        ...g
      };
    }, _(e, "debugColumns", "_getDefaultColumnDef")),
    _getColumnDefs: () => i.options.columns,
    getAllColumns: x(() => [i._getColumnDefs()], (g) => {
      const c = function(m, v, C) {
        return C === void 0 && (C = 0), m.map((p) => {
          const S = Yt(i, p, C, v), y = p;
          return S.columns = y.columns ? c(y.columns, S, C + 1) : [], S;
        });
      };
      return c(g);
    }, _(e, "debugColumns", "getAllColumns")),
    getAllFlatColumns: x(() => [i.getAllColumns()], (g) => g.flatMap((c) => c.getFlatColumns()), _(e, "debugColumns", "getAllFlatColumns")),
    _getAllFlatColumnsById: x(() => [i.getAllFlatColumns()], (g) => g.reduce((c, m) => (c[m.id] = m, c), {}), _(e, "debugColumns", "getAllFlatColumnsById")),
    getAllLeafColumns: x(() => [i.getAllColumns(), i._getOrderColumnsFn()], (g, c) => {
      let m = g.flatMap((v) => v.getLeafColumns());
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
function Vn() {
  return (e) => x(() => [e.options.data], (r) => {
    const n = {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, t = function(i, o, l) {
      o === void 0 && (o = 0);
      const s = [];
      for (let u = 0; u < i.length; u++) {
        const f = Kt(e, e._getRowId(i[u], u, l), i[u], u, o, void 0, l?.id);
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
function tt(e, r) {
  return e ? Pn(e) ? /* @__PURE__ */ L.createElement(e, r) : e : null;
}
function Pn(e) {
  return An(e) || typeof e == "function" || zn(e);
}
function An(e) {
  return typeof e == "function" && (() => {
    const r = Object.getPrototypeOf(e);
    return r.prototype && r.prototype.isReactComponent;
  })();
}
function zn(e) {
  return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
function Ln(e) {
  const r = {
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    ...e
  }, [n] = L.useState(() => ({
    current: In(r)
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
function Dn({
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
  stripedRows: v = !1,
  hoverableRow: C = !1,
  loading: p,
  loadingCustom: S,
  noResultMessage: y,
  onRowClick: $,
  totalItems: E,
  revealOnHoverColIds: R
}) {
  const A = U((w) => {
    w.currentTarget.querySelectorAll(".cell-content-reveal").forEach((I) => {
      I.style.opacity = "1";
    });
  }, []), O = U((w) => {
    w.currentTarget.querySelectorAll(".cell-content-reveal").forEach((I) => {
      I.style.opacity = "";
    });
  }, []), B = _e(
    () => l ?? s,
    [l, s]
  ), T = k(null), z = k(null), K = k(0), [G, ye] = le(null), [ne, ge] = le(null), N = (w, I) => {
    if (!o) return;
    I.preventDefault();
    const V = I.currentTarget.closest("tr")?.getBoundingClientRect();
    V && (K.current = I.clientY - V.top, ge({
      top: V.top,
      left: V.left,
      width: V.width
    })), T.current = I.clientY, z.current = w, ye(w), I.currentTarget.setPointerCapture(I.pointerId);
  }, M = (w) => {
    if (!o || T.current === null || z.current === null) return;
    const I = w.clientY - T.current;
    ge(
      (de) => de && {
        ...de,
        top: w.clientY - K.current
      }
    );
    const q = 32, V = I > q ? 1 : I < -q ? -1 : 0;
    if (V === 0) return;
    const Q = z.current, D = Q + V;
    D < 0 || D >= e.getRowModel().rows.length || (B((de) => {
      const re = [...de], [b] = re.splice(Q, 1);
      return re.splice(D, 0, b), re;
    }), z.current = D, T.current = w.clientY, ye(D));
  }, Y = () => {
    T.current = null, z.current = null, K.current = 0, ye(null), ge(null);
  }, [J, Re] = le(null), [ue, ce] = le(""), pe = (w) => {
    Re({
      rowId: w.row.id,
      colId: w.column.id
    }), ce(String(w.getValue() ?? ""));
  }, he = (w) => {
    s(
      (I) => I.map(
        (q, V) => V === w.row.index ? {
          ...q,
          [w.column.id]: ue
        } : q
      )
    ), Re(null);
  }, Ee = (w) => !!(w.closest("button") || w.closest("a") || w.closest("input") || w.closest("select") || w.closest("textarea") || w.closest("[data-stop-row-click]")), be = (w, I) => {
    const q = w.target;
    if (!Ee(q) && !q.closest(".col-drag-handle")) {
      if (g?.clickRow) {
        const V = I.original.id ?? I.index;
        m((Q) => {
          const D = new Set(Q);
          return D.has(V) ? D.delete(V) : D.add(V), D;
        });
      }
      $ && $(I.original);
    }
  }, P = G === null ? null : e.getRowModel().rows[G] ?? null;
  return /* @__PURE__ */ W(Rt, { children: [
    /* @__PURE__ */ W("table", { className: `table table-body ${C ? "hoverable" : ""} ${v ? "striped" : ""}`, children: [
      /* @__PURE__ */ h(
        Le,
        {
          table: e,
          tableWidth: r
        }
      ),
      /* @__PURE__ */ W("tbody", { children: [
        p === "default" && /* @__PURE__ */ h("tr", { className: "table-loading-row", children: /* @__PURE__ */ h(
          "td",
          {
            colSpan: e.getAllColumns().length,
            style: { textAlign: "center", padding: "20px" },
            children: "Carregando dados..."
          }
        ) }),
        p === "spinner" && /* @__PURE__ */ h("tr", { className: "table-loading-row", children: /* @__PURE__ */ h(
          "td",
          {
            colSpan: e.getAllColumns().length,
            style: { textAlign: "center", padding: "20px" },
            children: /* @__PURE__ */ h("div", { style: { display: "flex", justifyContent: "center", alignItems: "center" }, children: /* @__PURE__ */ h("div", { className: "table-spinner" }) })
          }
        ) }),
        p === "custom" && /* @__PURE__ */ h("tr", { className: "table-loading-row", children: /* @__PURE__ */ h(
          "td",
          {
            colSpan: e.getAllColumns().length,
            style: { textAlign: "center", padding: "20px" },
            children: S
          }
        ) }),
        p === "placeholder" && (() => {
          const w = e.getAllColumns().length, I = e.getState().pagination?.pageSize || 10;
          return Array.from({ length: I }).map((q, V) => /* @__PURE__ */ h("tr", { className: "table-placeholder-row", children: Array.from({ length: w }).map((Q, D) => /* @__PURE__ */ h("td", { children: /* @__PURE__ */ h("div", { className: "table-placeholder-cell" }) }, `placeholder-cell-${V}-${D}`)) }, `placeholder-row-${V}`));
        })(),
        !p && e.getRowModel().rows.length === 0 && E === 0 && /* @__PURE__ */ h("tr", { className: "table-no-results-row", children: /* @__PURE__ */ h(
          "td",
          {
            colSpan: e.getAllColumns().length,
            style: { textAlign: "center", padding: "20px" },
            children: y
          }
        ) }),
        !p && e.getRowModel().rows.length > 0 && e.getRowModel().rows.map((w) => {
          const I = w.index, q = G === I, V = [];
          V.push(
            /* @__PURE__ */ h(
              "tr",
              {
                className: `${q ? "row-dragging" : ""}`,
                onPointerMove: M,
                onPointerUp: Y,
                onPointerCancel: Y,
                onMouseEnter: A,
                onMouseLeave: O,
                onClick: (b) => be(b, {
                  original: w.original,
                  index: w.index
                }),
                children: w.getVisibleCells().map((b) => {
                  const xe = b.column.id, j = n.get(xe), F = Oe(b.column, t), ie = J?.rowId === w.id && J?.colId === xe, se = [
                    j ? "is-sticky" : "",
                    j?.side === "left" ? "is-sticky-left" : "",
                    j?.side === "right" ? "is-sticky-right" : ""
                  ].filter(Boolean).join(" "), oe = j ? j.side === "left" ? { "--sticky-left": `${j.offset}px` } : { "--sticky-right": `${j.offset}px` } : void 0;
                  if (b.column.id === "__draggable__" && o)
                    return /* @__PURE__ */ h(
                      "td",
                      {
                        className: `${se} align-center col-drag-handle`,
                        style: oe,
                        onPointerDown: (H) => N(I, H),
                        children: "☰"
                      },
                      b.id
                    );
                  if (b.column.id === "__selectable__" && a) {
                    const H = b.row.original.id ?? b.row.index, Ie = d.includes(H), Xe = u.has(H);
                    if (Ie && a.hideDisabledSelects)
                      return /* @__PURE__ */ h(
                        "td",
                        {
                          className: `${se} align-center`,
                          style: oe
                        },
                        b.id
                      );
                    const De = /* @__PURE__ */ h(
                      "input",
                      {
                        type: "checkbox",
                        checked: Xe,
                        disabled: Ie,
                        onChange: () => {
                          f(($e) => {
                            const ke = new Set($e);
                            return ke.has(H) ? ke.delete(H) : ke.add(H), ke;
                          });
                        }
                      }
                    );
                    return /* @__PURE__ */ h(
                      "td",
                      {
                        className: `${se} align-center`,
                        style: oe,
                        children: a.revealOnHover ? /* @__PURE__ */ h("span", { className: "cell-content-reveal", children: De }) : De
                      },
                      b.id
                    );
                  }
                  if (b.column.id === "__expandable__" && g) {
                    const H = b.row.original.id ?? b.row.index, Ie = c.has(H);
                    return /* @__PURE__ */ h(
                      "td",
                      {
                        className: `${se} align-center`,
                        style: oe,
                        onClick: (Xe) => {
                          Xe.stopPropagation(), m((De) => {
                            const $e = new Set(De);
                            return $e.has(H) ? $e.delete(H) : $e.add(H), $e;
                          });
                        },
                        children: /* @__PURE__ */ h(
                          "span",
                          {
                            className: `expand-icon ${Ie ? "expanded" : ""}`,
                            style: {
                              display: "inline-block",
                              transition: "transform 0.2s",
                              transform: Ie ? "rotate(90deg)" : "rotate(0deg)",
                              cursor: "pointer",
                              fontSize: "12px"
                            },
                            children: /* @__PURE__ */ h("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ h("path", { d: "M4.5 9L7.5 6L4.5 3", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
                          }
                        )
                      },
                      b.id
                    );
                  }
                  const Tt = R?.has(xe);
                  return /* @__PURE__ */ h(
                    "td",
                    {
                      className: `${se} align-${F}`,
                      style: oe,
                      onDoubleClick: () => {
                        i && pe(b);
                      },
                      children: ie ? /* @__PURE__ */ h(
                        "input",
                        {
                          autoFocus: !0,
                          value: ue,
                          onChange: (H) => ce(H.target.value),
                          onBlur: () => he(b),
                          onKeyDown: (H) => {
                            H.key === "Enter" && he(b), H.key === "Escape" && Re(null);
                          },
                          onFocus: (H) => H.currentTarget.select(),
                          style: {
                            width: "100%",
                            height: "100%",
                            boxSizing: "border-box",
                            fontSize: "inherit",
                            fontFamily: "inherit"
                          }
                        }
                      ) : Tt ? /* @__PURE__ */ h("span", { className: "cell-content-reveal", children: tt(
                        b.column.columnDef.cell,
                        b.getContext()
                      ) }) : tt(
                        b.column.columnDef.cell,
                        b.getContext()
                      )
                    },
                    b.id
                  );
                })
              },
              w.id
            )
          );
          const Q = w.original.id ?? w.index, D = g?.content?.(w.original), de = w.getVisibleCells(), re = de.some(
            (b) => !!b.column.columnDef.meta?.expandable
          );
          return g && c.has(Q) && (D || re) && (D ? V.push(
            /* @__PURE__ */ h("tr", { className: "expanded-row", children: /* @__PURE__ */ h("td", { colSpan: e.getAllColumns().length, className: "expanded-content", children: D }) }, `${w.id}-expanded`)
          ) : V.push(
            /* @__PURE__ */ h("tr", { className: "expanded-row", children: de.map((b) => {
              const xe = b.column.id, j = n.get(xe), F = Oe(b.column, t), ie = [
                j ? "is-sticky" : "",
                j?.side === "left" ? "is-sticky-left" : "",
                j?.side === "right" ? "is-sticky-right" : ""
              ].filter(Boolean).join(" "), se = j ? j.side === "left" ? { "--sticky-left": `${j.offset}px` } : { "--sticky-right": `${j.offset}px` } : void 0, oe = b.column.columnDef.meta?.expandable;
              return /* @__PURE__ */ h(
                "td",
                {
                  className: `${ie} align-${F} expanded-cell`,
                  style: se,
                  children: oe ? oe.content(w.original) : null
                },
                `${b.id}-expanded`
              );
            }) }, `${w.id}-expanded`)
          )), V;
        }).flat()
      ] })
    ] }),
    ne && P && /* @__PURE__ */ W(
      "table",
      {
        className: `table table-body table-row-drag-ghost ${v ? "striped" : ""}`,
        style: {
          top: ne.top,
          left: ne.left,
          width: ne.width
        },
        children: [
          /* @__PURE__ */ h(
            Le,
            {
              table: e,
              tableWidth: ne.width
            }
          ),
          /* @__PURE__ */ h("tbody", { children: /* @__PURE__ */ h("tr", { children: P.getVisibleCells().map((w) => {
            const I = w.column.id, q = Oe(w.column, t);
            if (I === "__draggable__" && o)
              return /* @__PURE__ */ h("td", { className: "align-center col-drag-handle", children: "☰" }, w.id);
            if (I === "__selectable__" && a) {
              const V = w.row.original.id ?? w.row.index;
              return /* @__PURE__ */ h("td", { className: "align-center", children: /* @__PURE__ */ h(
                "input",
                {
                  type: "checkbox",
                  checked: u.has(V),
                  readOnly: !0
                }
              ) }, w.id);
            }
            if (I === "__expandable__" && g) {
              const V = w.row.original.id ?? w.row.index, Q = c.has(V);
              return /* @__PURE__ */ h("td", { className: "align-center", children: /* @__PURE__ */ h(
                "span",
                {
                  className: `expand-icon ${Q ? "expanded" : ""}`,
                  style: {
                    display: "inline-block",
                    transform: Q ? "rotate(90deg)" : "rotate(0deg)",
                    fontSize: "12px"
                  },
                  children: /* @__PURE__ */ h("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ h("path", { d: "M4.5 9L7.5 6L4.5 3", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
                }
              ) }, w.id);
            }
            return /* @__PURE__ */ h("td", { className: `align-${q}`, children: tt(
              w.column.columnDef.cell,
              w.getContext()
            ) }, w.id);
          }) }) })
        ]
      }
    )
  ] });
}
function kn({
  table: e,
  tableWidth: r,
  stickyById: n,
  defaultTextAlign: t,
  scrollRef: i
}) {
  return e.getVisibleLeafColumns().some(
    (s) => s.columnDef.meta?.internalFooter != null
  ) ? /* @__PURE__ */ h("div", { className: "table-scroll-sync", ref: i, children: /* @__PURE__ */ W("table", { className: "table table-internal-footer", children: [
    /* @__PURE__ */ h(
      Le,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ h("tfoot", { children: /* @__PURE__ */ h("tr", { children: e.getVisibleLeafColumns().map((s) => {
      const a = s.columnDef.meta?.internalFooter, u = n.get(s.id), f = Oe(s, t), d = [
        u ? "is-sticky" : "",
        u?.side === "left" ? "is-sticky-left" : "",
        u?.side === "right" ? "is-sticky-right" : ""
      ].filter(Boolean).join(" "), g = u ? u.side === "left" ? { "--sticky-left": `${u.offset}px` } : { "--sticky-right": `${u.offset}px` } : void 0;
      return /* @__PURE__ */ h(
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
function Nn({ children: e }) {
  return /* @__PURE__ */ h("table", { className: "table table-external-footer", children: /* @__PURE__ */ h("tfoot", { children: /* @__PURE__ */ h("tr", { children: /* @__PURE__ */ h("td", { children: e }) }) }) });
}
function Hn(e, r, n = 2) {
  if (r <= 1) return [1];
  const t = [], i = [], o = Math.max(2, e - n), l = Math.min(r - 1, e + n);
  for (let s = o; s <= l; s++)
    i.push(s);
  return t.push(1), o > 2 && t.push("ellipsis"), t.push(...i), l < r - 1 && t.push("ellipsis"), t.push(r), t;
}
function Tn({
  currentPage: e,
  totalItems: r,
  pageSize: n,
  pageSizeOptions: t = [10, 25, 50, 100, 200],
  onPageChange: i,
  renderInfo: o
}) {
  const l = Math.max(1, Math.ceil(r / n)), s = r === 0 ? 0 : (e - 1) * n + 1, a = Math.min(e * n, r), u = _e(
    () => Hn(e, l),
    [e, l]
  ), f = _e(() => {
    const d = new Set(t);
    return d.add(n), Array.from(d).sort((g, c) => g - c);
  }, [t, n]);
  return /* @__PURE__ */ W("div", { className: "table-pagination", children: [
    /* @__PURE__ */ W("div", { className: "pagination-controls", children: [
      /* @__PURE__ */ h(
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
        (d, g) => d === "ellipsis" ? /* @__PURE__ */ h(
          "span",
          {
            className: "pagination-btn ellipsis",
            children: "..."
          },
          `e-${g}`
        ) : /* @__PURE__ */ h(
          "button",
          {
            className: `pagination-btn ${d === e ? "active" : ""}`,
            onClick: () => i(d, n),
            children: d
          },
          d
        )
      ),
      /* @__PURE__ */ h(
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
    /* @__PURE__ */ W("div", { className: "pagination-info", children: [
      o ? o({ totalItems: r, displayedItems: a - s + (r === 0 ? 0 : 1), startItem: s, endItem: a, pageSize: n }) : /* @__PURE__ */ W(Rt, { children: [
        /* @__PURE__ */ W("span", { children: [
          "Exibindo de ",
          s,
          " a ",
          a,
          " de ",
          r,
          " registros"
        ] }),
        /* @__PURE__ */ h("span", { className: "pagination-separator", children: "•" })
      ] }),
      /* @__PURE__ */ W("div", { className: "pagination-select", children: [
        !o && /* @__PURE__ */ h("label", { children: "Itens por página:" }),
        /* @__PURE__ */ h("div", { className: "select-wrapper", children: /* @__PURE__ */ h(
          "select",
          {
            value: n,
            onChange: (d) => i(1, Number(d.target.value)),
            children: f.map((d) => /* @__PURE__ */ h("option", { value: d, children: d }, d))
          }
        ) })
      ] })
    ] })
  ] });
}
function Be(e) {
  var r = typeof e;
  return e != null && (r == "object" || r == "function");
}
var Gn = typeof global == "object" && global && global.Object === Object && global, Wn = typeof self == "object" && self && self.Object === Object && self, Vt = Gn || Wn || Function("return this")(), nt = function() {
  return Vt.Date.now();
}, Bn = /\s/;
function jn(e) {
  for (var r = e.length; r-- && Bn.test(e.charAt(r)); )
    ;
  return r;
}
var qn = /^\s+/;
function Xn(e) {
  return e && e.slice(0, jn(e) + 1).replace(qn, "");
}
var je = Vt.Symbol, Pt = Object.prototype, Yn = Pt.hasOwnProperty, Un = Pt.toString, Pe = je ? je.toStringTag : void 0;
function Kn(e) {
  var r = Yn.call(e, Pe), n = e[Pe];
  try {
    e[Pe] = void 0;
    var t = !0;
  } catch {
  }
  var i = Un.call(e);
  return t && (r ? e[Pe] = n : delete e[Pe]), i;
}
var Qn = Object.prototype, Zn = Qn.toString;
function Jn(e) {
  return Zn.call(e);
}
var er = "[object Null]", tr = "[object Undefined]", vt = je ? je.toStringTag : void 0;
function nr(e) {
  return e == null ? e === void 0 ? tr : er : vt && vt in Object(e) ? Kn(e) : Jn(e);
}
function rr(e) {
  return e != null && typeof e == "object";
}
var ir = "[object Symbol]";
function or(e) {
  return typeof e == "symbol" || rr(e) && nr(e) == ir;
}
var St = NaN, lr = /^[-+]0x[0-9a-f]+$/i, sr = /^0b[01]+$/i, ar = /^0o[0-7]+$/i, ur = parseInt;
function wt(e) {
  if (typeof e == "number")
    return e;
  if (or(e))
    return St;
  if (Be(e)) {
    var r = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Be(r) ? r + "" : r;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = Xn(e);
  var n = sr.test(e);
  return n || ar.test(e) ? ur(e.slice(2), n ? 2 : 8) : lr.test(e) ? St : +e;
}
var cr = "Expected a function", dr = Math.max, gr = Math.min;
function We(e, r, n) {
  var t, i, o, l, s, a, u = 0, f = !1, d = !1, g = !0;
  if (typeof e != "function")
    throw new TypeError(cr);
  r = wt(r) || 0, Be(n) && (f = !!n.leading, d = "maxWait" in n, o = d ? dr(wt(n.maxWait) || 0, r) : o, g = "trailing" in n ? !!n.trailing : g);
  function c(R) {
    var A = t, O = i;
    return t = i = void 0, u = R, l = e.apply(O, A), l;
  }
  function m(R) {
    return u = R, s = setTimeout(p, r), f ? c(R) : l;
  }
  function v(R) {
    var A = R - a, O = R - u, B = r - A;
    return d ? gr(B, o - O) : B;
  }
  function C(R) {
    var A = R - a, O = R - u;
    return a === void 0 || A >= r || A < 0 || d && O >= o;
  }
  function p() {
    var R = nt();
    if (C(R))
      return S(R);
    s = setTimeout(p, v(R));
  }
  function S(R) {
    return s = void 0, g && t ? c(R) : (t = i = void 0, l);
  }
  function y() {
    s !== void 0 && clearTimeout(s), u = 0, t = a = i = s = void 0;
  }
  function $() {
    return s === void 0 ? l : S(nt());
  }
  function E() {
    var R = nt(), A = C(R);
    if (t = arguments, i = this, a = R, A) {
      if (s === void 0)
        return m(a);
      if (d)
        return clearTimeout(s), s = setTimeout(p, r), c(a);
    }
    return s === void 0 && (s = setTimeout(p, r)), l;
  }
  return E.cancel = y, E.flush = $, E;
}
var fr = "Expected a function";
function pr(e, r, n) {
  var t = !0, i = !0;
  if (typeof e != "function")
    throw new TypeError(fr);
  return Be(n) && (t = "leading" in n ? !!n.leading : t, i = "trailing" in n ? !!n.trailing : i), We(e, r, {
    leading: t,
    maxWait: r,
    trailing: i
  });
}
var Fe = function() {
  return Fe = Object.assign || function(r) {
    for (var n, t = 1, i = arguments.length; t < i; t++) {
      n = arguments[t];
      for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
    }
    return r;
  }, Fe.apply(this, arguments);
};
function At(e) {
  return !e || !e.ownerDocument || !e.ownerDocument.defaultView ? window : e.ownerDocument.defaultView;
}
function zt(e) {
  return !e || !e.ownerDocument ? document : e.ownerDocument;
}
var Lt = function(e) {
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
function Dt(e, r) {
  var n;
  e && (n = e.classList).add.apply(n, r.split(" "));
}
function kt(e, r) {
  e && r.split(" ").forEach(function(n) {
    e.classList.remove(n);
  });
}
function Nt(e) {
  return ".".concat(e.split(" ").join("."));
}
var pt = !!(typeof window < "u" && window.document && window.document.createElement), hr = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  addClasses: Dt,
  canUseDOM: pt,
  classNamesToQuery: Nt,
  getElementDocument: zt,
  getElementWindow: At,
  getOptions: Lt,
  removeClasses: kt
}), Me = null, Ct = null;
pt && window.addEventListener("resize", function() {
  Ct !== window.devicePixelRatio && (Ct = window.devicePixelRatio, Me = null);
});
function yt() {
  if (Me === null) {
    if (typeof document > "u")
      return Me = 0, Me;
    var e = document.body, r = document.createElement("div");
    r.classList.add("simplebar-hide-scrollbar"), e.appendChild(r);
    var n = r.getBoundingClientRect().right;
    e.removeChild(r), Me = n;
  }
  return Me;
}
var me = At, rt = zt, mr = Lt, ve = Dt, Se = kt, Z = Nt, Ae = (
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
        var i = me(t.el);
        t.scrollXTicking || (i.requestAnimationFrame(t.scrollX), t.scrollXTicking = !0), t.scrollYTicking || (i.requestAnimationFrame(t.scrollY), t.scrollYTicking = !0), t.isScrolling || (t.isScrolling = !0, ve(t.el, t.classNames.scrolling)), t.showScrollbar("x"), t.showScrollbar("y"), t.onStopScrolling();
      }, this.scrollX = function() {
        t.axis.x.isOverflowing && t.positionScrollbar("x"), t.scrollXTicking = !1;
      }, this.scrollY = function() {
        t.axis.y.isOverflowing && t.positionScrollbar("y"), t.scrollYTicking = !1;
      }, this._onStopScrolling = function() {
        Se(t.el, t.classNames.scrolling), t.options.autoHide && (t.hideScrollbar("x"), t.hideScrollbar("y")), t.isScrolling = !1;
      }, this.onMouseEnter = function() {
        t.isMouseEntering || (ve(t.el, t.classNames.mouseEntered), t.showScrollbar("x"), t.showScrollbar("y"), t.isMouseEntering = !0), t.onMouseEntered();
      }, this._onMouseEntered = function() {
        Se(t.el, t.classNames.mouseEntered), t.options.autoHide && (t.hideScrollbar("x"), t.hideScrollbar("y")), t.isMouseEntering = !1;
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
        var o, l, s, a, u, f, d, g, c, m, v;
        if (!(!t.draggedAxis || !t.contentWrapperEl)) {
          var C, p = t.axis[t.draggedAxis].track, S = (l = (o = p.rect) === null || o === void 0 ? void 0 : o[t.axis[t.draggedAxis].sizeAttr]) !== null && l !== void 0 ? l : 0, y = t.axis[t.draggedAxis].scrollbar, $ = (a = (s = t.contentWrapperEl) === null || s === void 0 ? void 0 : s[t.axis[t.draggedAxis].scrollSizeAttr]) !== null && a !== void 0 ? a : 0, E = parseInt((f = (u = t.elStyles) === null || u === void 0 ? void 0 : u[t.axis[t.draggedAxis].sizeAttr]) !== null && f !== void 0 ? f : "0px", 10);
          i.preventDefault(), i.stopPropagation(), t.draggedAxis === "y" ? C = i.pageY : C = i.pageX;
          var R = C - ((g = (d = p.rect) === null || d === void 0 ? void 0 : d[t.axis[t.draggedAxis].offsetAttr]) !== null && g !== void 0 ? g : 0) - t.axis[t.draggedAxis].dragOffset;
          R = t.draggedAxis === "x" && t.isRtl ? ((m = (c = p.rect) === null || c === void 0 ? void 0 : c[t.axis[t.draggedAxis].sizeAttr]) !== null && m !== void 0 ? m : 0) - y.size - R : R;
          var A = R / (S - y.size), O = A * ($ - E);
          t.draggedAxis === "x" && t.isRtl && (O = !((v = e.getRtlHelpers()) === null || v === void 0) && v.isScrollingToNegative ? -O : O), t.contentWrapperEl[t.axis[t.draggedAxis].scrollOffsetAttr] = O;
        }
      }, this.onEndDrag = function(i) {
        t.isDragging = !1;
        var o = rt(t.el), l = me(t.el);
        i.preventDefault(), i.stopPropagation(), Se(t.el, t.classNames.dragging), t.onStopScrolling(), o.removeEventListener("mousemove", t.drag, !0), o.removeEventListener("mouseup", t.onEndDrag, !0), t.removePreventClickId = l.setTimeout(function() {
          o.removeEventListener("click", t.preventClick, !0), o.removeEventListener("dblclick", t.preventClick, !0), t.removePreventClickId = null;
        });
      }, this.preventClick = function(i) {
        i.preventDefault(), i.stopPropagation();
      }, this.el = r, this.options = Fe(Fe({}, e.defaultOptions), n), this.classNames = Fe(Fe({}, e.defaultOptions.classNames), n.classNames), this.axis = {
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
      this.onMouseMove = pr(this._onMouseMove, 64), this.onWindowResize = We(this._onWindowResize, 64, { leading: !0 }), this.onStopScrolling = We(this._onStopScrolling, this.stopScrollDelay), this.onMouseEntered = We(this._onMouseEntered, this.stopScrollDelay), this.init();
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
        return this.contentWrapperEl && getComputedStyle(this.contentWrapperEl, "::-webkit-scrollbar").display === "none" || "scrollbarWidth" in document.documentElement.style || "-ms-overflow-style" in document.documentElement.style ? 0 : yt();
      } catch {
        return yt();
      }
    }, e.getOffset = function(r) {
      var n = r.getBoundingClientRect(), t = rt(r), i = me(r);
      return {
        top: n.top + (i.pageYOffset || t.documentElement.scrollTop),
        left: n.left + (i.pageXOffset || t.documentElement.scrollLeft)
      };
    }, e.prototype.init = function() {
      pt && (this.initDOM(), this.rtlHelpers = e.getRtlHelpers(), this.scrollbarWidth = this.getScrollbarWidth(), this.recalculate(), this.initListeners());
    }, e.prototype.initDOM = function() {
      var r, n;
      this.wrapperEl = this.el.querySelector(Z(this.classNames.wrapper)), this.contentWrapperEl = this.options.scrollableNode || this.el.querySelector(Z(this.classNames.contentWrapper)), this.contentEl = this.options.contentNode || this.el.querySelector(Z(this.classNames.contentEl)), this.offsetEl = this.el.querySelector(Z(this.classNames.offset)), this.maskEl = this.el.querySelector(Z(this.classNames.mask)), this.placeholderEl = this.findChild(this.wrapperEl, Z(this.classNames.placeholder)), this.heightAutoObserverWrapperEl = this.el.querySelector(Z(this.classNames.heightAutoObserverWrapperEl)), this.heightAutoObserverEl = this.el.querySelector(Z(this.classNames.heightAutoObserverEl)), this.axis.x.track.el = this.findChild(this.el, "".concat(Z(this.classNames.track)).concat(Z(this.classNames.horizontal))), this.axis.y.track.el = this.findChild(this.el, "".concat(Z(this.classNames.track)).concat(Z(this.classNames.vertical))), this.axis.x.scrollbar.el = ((r = this.axis.x.track.el) === null || r === void 0 ? void 0 : r.querySelector(Z(this.classNames.scrollbar))) || null, this.axis.y.scrollbar.el = ((n = this.axis.y.track.el) === null || n === void 0 ? void 0 : n.querySelector(Z(this.classNames.scrollbar))) || null, this.options.autoHide || (ve(this.axis.x.scrollbar.el, this.classNames.visible), ve(this.axis.y.scrollbar.el, this.classNames.visible));
    }, e.prototype.initListeners = function() {
      var r = this, n, t = me(this.el);
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
        var r = me(this.el);
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
      r === void 0 && (r = "y"), this.axis[r].isOverflowing && !this.axis[r].scrollbar.isVisible && (ve(this.axis[r].scrollbar.el, this.classNames.visible), this.axis[r].scrollbar.isVisible = !0);
    }, e.prototype.hideScrollbar = function(r) {
      r === void 0 && (r = "y"), !this.isDragging && this.axis[r].isOverflowing && this.axis[r].scrollbar.isVisible && (Se(this.axis[r].scrollbar.el, this.classNames.visible), this.axis[r].scrollbar.isVisible = !1);
    }, e.prototype.hideNativeScrollbar = function() {
      this.offsetEl && (this.offsetEl.style[this.isRtl ? "left" : "right"] = this.axis.y.isOverflowing || this.axis.y.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px", this.offsetEl.style.bottom = this.axis.x.isOverflowing || this.axis.x.forceVisible ? "-".concat(this.scrollbarWidth, "px") : "0px");
    }, e.prototype.onMouseMoveForAxis = function(r) {
      r === void 0 && (r = "y");
      var n = this.axis[r];
      !n.track.el || !n.scrollbar.el || (n.track.rect = n.track.el.getBoundingClientRect(), n.scrollbar.rect = n.scrollbar.el.getBoundingClientRect(), this.isWithinBounds(n.track.rect) ? (this.showScrollbar(r), ve(n.track.el, this.classNames.hover), this.isWithinBounds(n.scrollbar.rect) ? ve(n.scrollbar.el, this.classNames.hover) : Se(n.scrollbar.el, this.classNames.hover)) : (Se(n.track.el, this.classNames.hover), this.options.autoHide && this.hideScrollbar(r)));
    }, e.prototype.onMouseLeaveForAxis = function(r) {
      r === void 0 && (r = "y"), Se(this.axis[r].track.el, this.classNames.hover), Se(this.axis[r].scrollbar.el, this.classNames.hover), this.options.autoHide && this.hideScrollbar(r);
    }, e.prototype.onDragStart = function(r, n) {
      var t;
      n === void 0 && (n = "y"), this.isDragging = !0;
      var i = rt(this.el), o = me(this.el), l = this.axis[n].scrollbar, s = n === "y" ? r.pageY : r.pageX;
      this.axis[n].dragOffset = s - (((t = l.rect) === null || t === void 0 ? void 0 : t[this.axis[n].offsetAttr]) || 0), this.draggedAxis = n, ve(this.el, this.classNames.dragging), i.addEventListener("mousemove", this.drag, !0), i.addEventListener("mouseup", this.onEndDrag, !0), this.removePreventClickId === null ? (i.addEventListener("click", this.preventClick, !0), i.addEventListener("dblclick", this.preventClick, !0)) : (o.clearTimeout(this.removePreventClickId), this.removePreventClickId = null);
    }, e.prototype.onTrackClick = function(r, n) {
      var t = this, i, o, l, s;
      n === void 0 && (n = "y");
      var a = this.axis[n];
      if (!(!this.options.clickOnTrack || !a.scrollbar.el || !this.contentWrapperEl)) {
        r.preventDefault();
        var u = me(this.el);
        this.axis[n].scrollbar.rect = a.scrollbar.el.getBoundingClientRect();
        var f = this.axis[n].scrollbar, d = (o = (i = f.rect) === null || i === void 0 ? void 0 : i[this.axis[n].offsetAttr]) !== null && o !== void 0 ? o : 0, g = parseInt((s = (l = this.elStyles) === null || l === void 0 ? void 0 : l[this.axis[n].sizeAttr]) !== null && s !== void 0 ? s : "0px", 10), c = this.contentWrapperEl[this.axis[n].scrollOffsetAttr], m = n === "y" ? this.mouseY - d : this.mouseX - d, v = m < 0 ? -1 : 1, C = v === -1 ? c - g : c + g, p = 40, S = function() {
          t.contentWrapperEl && (v === -1 ? c > C && (c -= p, t.contentWrapperEl[t.axis[n].scrollOffsetAttr] = c, u.requestAnimationFrame(S)) : c < C && (c += p, t.contentWrapperEl[t.axis[n].scrollOffsetAttr] = c, u.requestAnimationFrame(S)));
        };
        S();
      }
    }, e.prototype.getContentElement = function() {
      return this.contentEl;
    }, e.prototype.getScrollElement = function() {
      return this.contentWrapperEl;
    }, e.prototype.removeListeners = function() {
      var r = me(this.el);
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
    }, e.getOptions = mr, e.helpers = hr, e;
  })()
), ee = function() {
  return ee = Object.assign || function(r) {
    for (var n, t = 1, i = arguments.length; t < i; t++) {
      n = arguments[t];
      for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
    }
    return r;
  }, ee.apply(this, arguments);
};
function vr(e, r) {
  var n = {};
  for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && r.indexOf(t) < 0 && (n[t] = e[t]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, t = Object.getOwnPropertySymbols(e); i < t.length; i++)
      r.indexOf(t[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, t[i]) && (n[t[i]] = e[t[i]]);
  return n;
}
var Ht = L.forwardRef(function(e, r) {
  var n = e.children, t = e.scrollableNodeProps, i = t === void 0 ? {} : t, o = vr(e, ["children", "scrollableNodeProps"]), l = L.useRef(), s = L.useRef(), a = L.useRef(), u = {}, f = {};
  Object.keys(o).forEach(function(c) {
    Object.prototype.hasOwnProperty.call(Ae.defaultOptions, c) ? u[c] = o[c] : f[c] = o[c];
  });
  var d = ee(ee({}, Ae.defaultOptions.classNames), u.classNames), g = ee(ee({}, i), { className: "".concat(d.contentWrapper).concat(i.className ? " ".concat(i.className) : ""), tabIndex: u.tabIndex || Ae.defaultOptions.tabIndex, role: "region", "aria-label": u.ariaLabel || Ae.defaultOptions.ariaLabel });
  return L.useEffect(function() {
    var c;
    return s.current = g.ref ? g.ref.current : s.current, l.current && (c = new Ae(l.current, ee(ee(ee({}, u), s.current && {
      scrollableNode: s.current
    }), a.current && {
      contentNode: a.current
    })), typeof r == "function" ? r(c) : r && (r.current = c)), function() {
      c?.unMount(), c = null, typeof r == "function" && r(null);
    };
  }, []), L.createElement(
    "div",
    ee({ "data-simplebar": "init", ref: l }, f),
    L.createElement(
      "div",
      { className: d.wrapper },
      L.createElement(
        "div",
        { className: d.heightAutoObserverWrapperEl },
        L.createElement("div", { className: d.heightAutoObserverEl })
      ),
      L.createElement(
        "div",
        { className: d.mask },
        L.createElement("div", { className: d.offset }, typeof n == "function" ? n({
          scrollableNodeRef: s,
          scrollableNodeProps: ee(ee({}, g), { ref: s }),
          contentNodeRef: a,
          contentNodeProps: {
            className: d.contentEl,
            ref: a
          }
        }) : L.createElement(
          "div",
          ee({}, g),
          L.createElement("div", { className: d.contentEl }, n)
        ))
      ),
      L.createElement("div", { className: d.placeholder })
    ),
    L.createElement(
      "div",
      { className: "".concat(d.track, " ").concat(d.horizontal) },
      L.createElement("div", { className: d.scrollbar })
    ),
    L.createElement(
      "div",
      { className: "".concat(d.track, " ").concat(d.vertical) },
      L.createElement("div", { className: d.scrollbar })
    )
  );
});
Ht.displayName = "SimpleBar";
function Sr(e, r, n, t) {
  return Ln({
    data: r,
    columns: e,
    state: {
      columnOrder: n
    },
    onColumnOrderChange: t,
    getCoreRowModel: Vn()
  });
}
function wr(e) {
  const [r, n] = le(0);
  return ut(() => {
    const t = e.current;
    if (!t) return;
    const i = new ResizeObserver((o) => {
      n(o[0].contentRect.width);
    });
    return i.observe(t), () => i.disconnect();
  }, [e]), r;
}
function Cr() {
  const e = k(null), r = k([]), n = U((i) => {
    i && !r.current.includes(i) && r.current.push(i);
  }, []), t = U(() => {
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
function yr({
  onResize: e,
  onResizeEnd: r,
  minWidth: n = 40
}) {
  const t = k(0), i = k(0), o = k(null), l = U(
    (u) => {
      if (!o.current) return;
      const f = u.clientX - t.current, d = Math.max(n, i.current + f);
      e(o.current, d);
    },
    [n, e]
  ), s = U(() => {
    o.current = null, document.removeEventListener("mousemove", l), document.removeEventListener("mouseup", s), r?.();
  }, [l, r]);
  return { startResize: U(
    (u, f) => {
      u.preventDefault(), u.stopPropagation(), o.current = f.id, t.current = u.clientX, i.current = ct(f.columnDef.meta?.widthSize), document.addEventListener("mousemove", l), document.addEventListener("mouseup", s);
    },
    [l, s]
  ) };
}
function Rr(e) {
  const [r, n] = le(!1);
  return ut(() => {
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
function xr(e) {
  const r = e.getState().columnOrder, t = e.getVisibleLeafColumns().map((i) => [
    i.id,
    i.columnDef.meta?.sticky ?? "",
    i.columnDef.meta?.widthSize ?? ""
  ].join(":")).join("|");
  return _e(() => {
    const i = e.getVisibleLeafColumns(), o = /* @__PURE__ */ new Map();
    for (const u of i)
      o.set(u.id, ct(u.columnDef.meta?.widthSize));
    const l = /* @__PURE__ */ new Map();
    let s = 0;
    for (const u of i)
      u.columnDef.meta?.sticky === "left" && (l.set(u.id, { side: "left", offset: s, zIndex: 20 }), s += o.get(u.id) ?? 0);
    let a = 0;
    for (let u = i.length - 1; u >= 0; u--) {
      const f = i[u];
      f.columnDef.meta?.sticky === "right" && (l.set(f.id, { side: "right", offset: a, zIndex: 20 }), a += o.get(f.id) ?? 0);
    }
    return l;
  }, [e, r, t]);
}
function _r({ setColumnOrder: e }) {
  const r = k(null), n = k(null), t = k(null), i = k(null), o = k(null), l = k(0), s = k(0), a = k([]), u = k(() => {
  }), f = k(() => {
  }), d = U(() => {
    const p = Array.from(
      document.querySelectorAll("th[data-col-id]")
    );
    a.current = p.filter((S) => S.dataset.reorderable !== "false").map((S) => {
      const y = S.getBoundingClientRect();
      return {
        id: S.dataset.colId,
        left: y.left,
        right: y.right
      };
    }).sort((S, y) => S.left - y.left);
  }, []), g = U((p, S, y) => {
    const $ = p.getBoundingClientRect();
    let E = p.parentElement;
    for (; E && !E.classList.contains("super-table-wrapper"); )
      E = E.parentElement;
    const R = E?.querySelector(".table-internal-footer"), A = E?.querySelector(".internal-table"), O = R ?? A, T = (O ? O.getBoundingClientRect().bottom : $.bottom) - $.top, z = document.createElement("div");
    z.classList.add("table-col-ghost");
    const K = window.getComputedStyle(p), G = document.createElement("div");
    return G.classList.add("table-col-ghost-header"), G.style.height = `${$.height}px`, G.style.fontFamily = K.fontFamily, G.style.fontSize = K.fontSize, G.style.fontWeight = K.fontWeight, G.style.fontStyle = K.fontStyle, G.style.letterSpacing = K.letterSpacing, G.style.color = K.color, G.innerHTML = p.innerHTML, z.appendChild(G), z.style.position = "fixed", z.style.left = `${S}px`, z.style.top = `${y}px`, z.style.width = `${$.width}px`, z.style.height = `${T}px`, z.style.pointerEvents = "none", z.style.zIndex = "9999", z.style.willChange = "left, top", z.style.transition = "none", document.body.appendChild(z), z;
  }, []), c = U(() => {
    const p = document.createElement("div");
    return p.className = "table-col-drop-indicator", p.style.position = "fixed", p.style.pointerEvents = "none", p.style.zIndex = "10000", p.style.display = "none", document.body.appendChild(p), p;
  }, []), m = U((p) => {
    const S = i.current;
    if (!S) return;
    const y = document.querySelector(`th[data-col-id="${p.id}"]`);
    if (!y) {
      S.style.display = "none";
      return;
    }
    const $ = y.getBoundingClientRect(), E = $.top;
    let R = y.parentElement;
    for (; R && !R.classList.contains("super-table-wrapper"); )
      R = R.parentElement;
    const A = R?.querySelector(".table-internal-footer"), O = R?.querySelector(".internal-table"), B = A ?? O, T = B ? B.getBoundingClientRect().bottom : $.bottom;
    S.style.display = "block", S.style.top = `${E}px`, S.style.height = `${T - E}px`, S.style.left = p.side === "left" ? `${$.left}px` : `${$.right}px`;
  }, []), v = U((p) => {
    const S = r.current, y = a.current;
    if (!S || !y.length) return null;
    const $ = y.findIndex((E) => E.id === S);
    if ($ === -1) return null;
    for (let E = 0; E < y.length; E += 1) {
      const R = y[E];
      if (R.id === S || p < R.left || p > R.right) continue;
      const A = R.left + (R.right - R.left) / 2, O = E > $;
      return (O ? p >= A : p <= A) ? {
        id: R.id,
        side: O ? "right" : "left"
      } : null;
    }
    return null;
  }, []), C = U(
    (p, S) => {
      r.current = p;
      const y = document.querySelector(`th[data-col-id="${p}"]`);
      y && (t.current = y, n.current = g(y, S.clientX, y.getBoundingClientRect().top), i.current = c(), y.classList.add("is-dragging-col"), y.style.opacity = "0.2", d(), l.current = S.clientX, s.current = S.clientY, document.body.style.cursor = "grabbing", document.addEventListener("pointermove", u.current), document.addEventListener("pointerup", f.current));
    },
    [g, c, d]
  );
  return u.current = (p) => {
    !r.current || !n.current || (l.current = p.clientX, s.current = p.clientY, !o.current && (o.current = requestAnimationFrame(() => {
      if (o.current = null, !r.current || !n.current) return;
      n.current.style.left = `${l.current}px`;
      const S = v(l.current);
      S ? m(S) : i.current && (i.current.style.display = "none"), !(!S || S.id === r.current) && (e((y) => {
        const $ = y.indexOf(r.current), E = y.indexOf(S.id);
        if ($ === -1 || E === -1 || $ === E) return y;
        const R = [...y];
        return R.splice($, 1), R.splice(E, 0, r.current), R;
      }), requestAnimationFrame(() => {
        d();
      }));
    })));
  }, f.current = () => {
    o.current && (cancelAnimationFrame(o.current), o.current = null), n.current?.remove(), n.current = null, i.current?.remove(), i.current = null, t.current && (t.current.classList.remove("is-dragging-col"), t.current.style.opacity = ""), t.current = null, r.current = null, l.current = 0, s.current = 0, a.current = [], document.body.style.cursor = "", document.removeEventListener("pointermove", u.current), document.removeEventListener("pointerup", f.current);
  }, {
    startDrag: C
  };
}
function Er(e) {
  return "accessorKey" in e && typeof e.accessorKey == "string";
}
function br(e) {
  return e.map((r) => {
    if (r.id)
      return r;
    if (Er(r))
      return {
        ...r,
        id: r.accessorKey
      };
    throw new Error(
      "Columns sem id e sem accessorKey string. Defina um id explicitamente para esta coluna."
    );
  });
}
function $r(e) {
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
function Mr(e, r) {
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
function Fr(e) {
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
function Or(e, r) {
  if (e.size !== r.size) return !1;
  for (const n of e)
    if (!r.has(n)) return !1;
  return !0;
}
function Pr({
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
  draggableSticky: v = !1,
  selectable: C,
  expandable: p,
  pagination: S,
  loading: y,
  loadingCustom: $,
  noResultMessage: E = "Nenhum resultado encontrado.",
  onRowClick: R,
  hoverableRow: A,
  borders: O = "full",
  style: B = "default"
}) {
  const T = k(null), z = U(
    (F) => {
      T.current = F;
    },
    []
  ), [K, G] = le(null), ye = U(
    (F) => {
      G(F), u?.(F);
    },
    [u]
  ), {
    bodyRef: ne,
    registerSyncElement: ge,
    onBodyScroll: N
  } = Cr(), M = wr(ne), Y = Rr(ne), [J, Re] = le({}), ue = !!C, ce = k(ue), [pe, he] = le(
    () => new Set(C?.initialSelectRow || [])
  ), Ee = C?.onSelectedRowsChange;
  Ne(() => {
    if (!ue) {
      ce.current = !1;
      return;
    }
    if (!ce.current) {
      ce.current = !0;
      const F = new Set(C?.initialSelectRow || []);
      he((ie) => Or(ie, F) ? ie : F);
      return;
    }
    Ee?.(Array.from(pe));
  }, [ue, C?.initialSelectRow, pe, Ee]);
  const [be, P] = le(/* @__PURE__ */ new Set()), w = _e(
    () => br(
      (() => {
        const F = [];
        return m && F.push($r(v)), C && F.push(Mr(
          C.sticky,
          C.label
        )), p && F.push(Fr(p.sticky)), [...F, ...r];
      })()
    ),
    [
      r,
      m,
      v,
      C,
      p
    ]
  ), I = _e(
    () => new Set(
      w.filter((F) => F.meta?.revealOnHover).map((F) => F.id)
    ),
    [w]
  ), [q, V] = le(
    () => w.map((F) => F.id)
  );
  Ne(() => {
    V((F) => {
      const ie = w.map((oe) => oe.id), se = new Set(F);
      return F.length === ie.length && ie.every((oe) => se.has(oe)) ? F : ie;
    });
  }, [w]);
  const [Q, D] = le(n);
  Ne(() => {
    D(n);
  }, [n]), Ne(() => {
    f?.(Q);
  }, [Q, f]);
  const de = _e(
    () => w.map((F) => ({
      ...F,
      meta: {
        ...F.meta,
        widthSize: J[F.id] ?? F.meta?.widthSize
      }
    })),
    [w, J]
  ), re = Sr(
    de,
    Q,
    q,
    V
  ), b = xr(re), { startResize: xe } = yr({
    onResize: (F, ie) => {
      Re((se) => ({
        ...se,
        [F]: `${ie}px`
      }));
    },
    onResizeEnd: () => {
      requestAnimationFrame(() => {
        T.current?.recalculate();
      });
    }
  }), { startDrag: j } = _r({
    setColumnOrder: V
  });
  return ut(() => {
    T.current?.recalculate();
  }, [Y]), /* @__PURE__ */ W("div", { id: e, className: `super-table-wrapper borders-${O} style-${B}`, style: { height: i }, children: [
    /* @__PURE__ */ h(
      Wt,
      {
        table: re,
        scrollRef: ge,
        tableWidth: M,
        stickyById: b,
        resizableCol: o,
        reorderableCol: l,
        reorderableColIconPosition: s,
        sortableCol: a,
        sortState: K,
        setSortState: ye,
        onResizeStart: xe,
        onDragStart: j,
        defaultTextAlign: g,
        selectable: C,
        selectedRows: pe,
        setSelectedRows: he,
        disableSelectRow: C?.disableSelectRow || [],
        data: n,
        expandable: p,
        expandedRows: be,
        setExpandedRows: P
      }
    ),
    /* @__PURE__ */ W("div", { className: "internal-table", children: [
      /* @__PURE__ */ h(
        Bt,
        {
          table: re,
          scrollRef: ge,
          tableWidth: M,
          stickyById: b,
          defaultTextAlign: g
        }
      ),
      /* @__PURE__ */ W("div", { className: `table-body-area ${Y ? "has-h-scroll" : "no-h-scroll"}`, children: [
        /* @__PURE__ */ h(
          Ht,
          {
            ref: z,
            className: "table-body-scroll",
            scrollableNodeProps: {
              ref: ne,
              onScroll: N
            },
            children: /* @__PURE__ */ h(
              Dn,
              {
                table: re,
                tableWidth: M,
                stickyById: b,
                defaultTextAlign: g,
                editable: c,
                draggable: m,
                setData: D,
                setInternalData: D,
                selectable: C,
                selectedRows: pe,
                setSelectedRows: he,
                disableSelectRow: C?.disableSelectRow || [],
                expandable: p,
                expandedRows: be,
                setExpandedRows: P,
                loading: y,
                loadingCustom: $,
                noResultMessage: E,
                onRowClick: R,
                totalItems: S?.totalItems,
                stripedRows: d,
                hoverableRow: A,
                revealOnHoverColIds: I
              }
            )
          }
        ),
        /* @__PURE__ */ h(
          kn,
          {
            table: re,
            scrollRef: ge,
            tableWidth: M,
            stickyById: b,
            defaultTextAlign: g
          }
        )
      ] })
    ] }),
    t && /* @__PURE__ */ h(Nn, { table: re, children: t }),
    S && /* @__PURE__ */ h(
      Tn,
      {
        currentPage: S.currentPage,
        totalItems: S.totalItems,
        pageSize: S.pageSize,
        pageSizeOptions: S.pageSizeOptions,
        onPageChange: S.onPageChange,
        renderInfo: S.renderInfo
      }
    )
  ] });
}
export {
  Pr as SuperTable
};
