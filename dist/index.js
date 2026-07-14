import { jsx as p, jsxs as j, Fragment as Rt } from "react/jsx-runtime";
import * as N from "react";
import { useCallback as K, useMemo as pe, useRef as T, useState as re, useLayoutEffect as ut, useEffect as Pe } from "react";
function Tt(e) {
  const r = e.columnDef.meta;
  return !(r?.resizable === !1 || r?.sticky && r.resizable !== !0);
}
function Oe(e, r) {
  return e.columnDef.meta?.textAlign ?? r;
}
function ct(e) {
  return e && e.endsWith("px") ? parseFloat(e) : 0;
}
function ke({ table: e, tableWidth: r }) {
  const n = e.getVisibleLeafColumns(), o = n.map(
    (l) => ct(l.columnDef.meta?.widthSize)
  ).reduce((l, s) => l + s, 0) > r;
  return /* @__PURE__ */ p("colgroup", { children: n.map((l, s) => {
    const a = l.columnDef.meta, u = s === n.length - 1;
    let f;
    return !o && u ? f = { width: "auto" } : a?.widthSize && (f = { width: a.widthSize }), /* @__PURE__ */ p("col", { style: f }, l.id);
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
  onDragStart: v,
  scrollRef: S,
  onResizeStart: h,
  setSelectedRows: m,
  expandable: w,
  expandedRows: y,
  setExpandedRows: E
}) {
  const P = n.map((H, $) => typeof H == "object" && H !== null && "id" in H ? H.id ?? $ : $), _ = !!d, V = d?.label, A = P.filter((H) => !c.includes(H)), q = A.filter((H) => g.has(H)).length, O = q === A.length && A.length > 0, k = q > 0 && q < A.length, W = () => {
    m((H) => {
      const $ = new Set(H);
      return O ? A.forEach((Y) => $.delete(Y)) : A.forEach((Y) => $.add(Y)), $;
    });
  }, ve = !!w, Se = w?.expandAllButton || !1, te = P.every((H) => y.has(H)), se = () => {
    E(te ? /* @__PURE__ */ new Set() : new Set(P));
  };
  return /* @__PURE__ */ p("div", { className: "table-scroll-sync", ref: S, children: /* @__PURE__ */ j("table", { className: "table table-external-header", children: [
    /* @__PURE__ */ p(
      ke,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ p("thead", { children: e.getHeaderGroups().map((H) => /* @__PURE__ */ p("tr", { children: H.headers.map(($) => {
      const Y = $.column.columnDef.meta, Q = t.get($.column.id), we = Oe($.column, f), ue = o && Y?.reorderable !== !1 && !Y?.sticky, ie = (Y?.sortable ?? s) && !Y?.sticky && !["__draggable__", "__selectable__", "__expandable__"].includes($.column.id), Ce = a?.columnId === $.column.id, ye = () => {
        if (!ie) return;
        let L;
        !a || a.columnId !== $.column.id ? L = { columnId: $.column.id, direction: "asc" } : a.direction === "asc" ? L = { columnId: $.column.id, direction: "desc" } : L = null, u(L);
      }, be = [
        Q ? "is-sticky" : "",
        Q?.side === "left" ? "is-sticky-left" : "",
        Q?.side === "right" ? "is-sticky-right" : "",
        ie ? "is-sortable" : "",
        Ce ? `is-sorted-${a.direction}` : ""
      ].filter(Boolean).join(" "), oe = Q ? Q.side === "left" ? { "--sticky-left": `${Q.offset}px` } : { "--sticky-right": `${Q.offset}px` } : void 0;
      return /* @__PURE__ */ p(
        "th",
        {
          "data-col-id": $.column.id,
          "data-fixed": Y?.sticky ? "true" : void 0,
          "data-reorderable": ue ? void 0 : "false",
          className: be,
          style: oe,
          onClick: ye,
          children: /* @__PURE__ */ j(
            "div",
            {
              className: [
                "th-content",
                `align-${we}`,
                ue ? `reorder-icon-${l}` : ""
              ].filter(Boolean).join(" "),
              children: [
                /* @__PURE__ */ p("div", { children: $.isPlaceholder ? null : $.column.id === "__selectable__" && _ ? /* @__PURE__ */ j("label", { children: [
                  /* @__PURE__ */ p(
                    "input",
                    {
                      type: "checkbox",
                      checked: O,
                      ref: (L) => {
                        L && (L.indeterminate = k);
                      },
                      onChange: W
                    }
                  ),
                  V
                ] }) : $.column.id === "__expandable__" && ve && Se ? /* @__PURE__ */ p(
                  "button",
                  {
                    onClick: se,
                    className: `expand-all-button ${te ? "expanded" : ""}`,
                    children: "⇅"
                  }
                ) : (() => {
                  const L = $.column.columnDef.header;
                  return typeof L == "function" ? L({ column: $.column, table: e, header: $ }) : L;
                })() }),
                ie && /* @__PURE__ */ p("div", { className: "th-actions th-sort-actions", children: /* @__PURE__ */ p("span", { className: "sort-indicator" }) }),
                ue && /* @__PURE__ */ p(
                  "div",
                  {
                    className: `th-actions th-reorder-actions position-${l}`,
                    children: /* @__PURE__ */ p(
                      "span",
                      {
                        className: "col-drag-handle",
                        onClick: (L) => L.stopPropagation(),
                        onPointerDown: (L) => {
                          L.preventDefault(), L.currentTarget.setPointerCapture(L.pointerId), v?.($.column.id, L.nativeEvent);
                        },
                        children: "☰"
                      }
                    )
                  }
                ),
                i && h && Tt($.column) && /* @__PURE__ */ p(
                  "span",
                  {
                    className: "col-resize-handle",
                    onClick: (L) => L.stopPropagation(),
                    onMouseDown: (L) => h(L, $.column)
                  }
                )
              ]
            }
          )
        },
        $.id
      );
    }) }, H.id)) })
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
  ) ? /* @__PURE__ */ p("div", { className: "table-scroll-sync", ref: i, children: /* @__PURE__ */ j("table", { className: "table table-internal-header", children: [
    /* @__PURE__ */ p(
      ke,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ p("thead", { children: /* @__PURE__ */ p("tr", { children: e.getVisibleLeafColumns().map((s) => {
      const a = s.columnDef.meta?.internalHeader, u = n.get(s.id), f = Oe(s, t), d = [
        u ? "is-sticky" : "",
        u?.side === "left" ? "is-sticky-left" : "",
        u?.side === "right" ? "is-sticky-right" : ""
      ].filter(Boolean).join(" "), g = u ? u.side === "left" ? { "--sticky-left": `${u.offset}px` } : { "--sticky-right": `${u.offset}px` } : void 0;
      return /* @__PURE__ */ p(
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
function ee(e, r) {
  return (n) => {
    r.setState((t) => ({
      ...t,
      [e]: he(n, t[e])
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
function R(e, r, n) {
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
      const f = Math.round((Date.now() - l) * 100) / 100, d = Math.round((Date.now() - u) * 100) / 100, g = d / 16, c = (v, S) => {
        for (v = String(v); v.length < S; )
          v = " " + v;
        return v;
      };
      console.info(`%c⏱ ${c(d, 5)} /${c(f, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * g, 120))}deg 100% 31%);`, n?.key);
    }
    return i;
  };
}
function x(e, r, n, t) {
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
    getContext: R(() => [e, n, r, o], (l, s, a, u) => ({
      table: l,
      column: s,
      row: a,
      cell: u,
      getValue: u.getValue,
      renderValue: u.renderValue
    }), x(e.options, "debugCells", "cell.getContext"))
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
    for (const S of a.split(".")) {
      var v;
      c = (v = c) == null ? void 0 : v[S], process.env.NODE_ENV !== "production" && c === void 0 && console.warn(`"${S}" in deeply nested key "${a}" returned undefined.`);
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
    getFlatColumns: R(() => [!0], () => {
      var g;
      return [d, ...(g = d.columns) == null ? void 0 : g.flatMap((c) => c.getFlatColumns())];
    }, x(e.options, "debugColumns", "column.getFlatColumns")),
    getLeafColumns: R(() => [e._getOrderColumnsFn()], (g) => {
      var c;
      if ((c = d.columns) != null && c.length) {
        let v = d.columns.flatMap((S) => S.getLeafColumns());
        return g(v);
      }
      return [d];
    }, x(e.options, "debugColumns", "column.getLeafColumns"))
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
    e.getHeaderGroups = R(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (r, n, t, i) => {
      var o, l;
      const s = (o = t?.map((d) => n.find((g) => g.id === d)).filter(Boolean)) != null ? o : [], a = (l = i?.map((d) => n.find((g) => g.id === d)).filter(Boolean)) != null ? l : [], u = n.filter((d) => !(t != null && t.includes(d.id)) && !(i != null && i.includes(d.id)));
      return He(r, [...s, ...u, ...a], e);
    }, x(e.options, X, "getHeaderGroups")), e.getCenterHeaderGroups = R(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (r, n, t, i) => (n = n.filter((o) => !(t != null && t.includes(o.id)) && !(i != null && i.includes(o.id))), He(r, n, e, "center")), x(e.options, X, "getCenterHeaderGroups")), e.getLeftHeaderGroups = R(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left], (r, n, t) => {
      var i;
      const o = (i = t?.map((l) => n.find((s) => s.id === l)).filter(Boolean)) != null ? i : [];
      return He(r, o, e, "left");
    }, x(e.options, X, "getLeftHeaderGroups")), e.getRightHeaderGroups = R(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.right], (r, n, t) => {
      var i;
      const o = (i = t?.map((l) => n.find((s) => s.id === l)).filter(Boolean)) != null ? i : [];
      return He(r, o, e, "right");
    }, x(e.options, X, "getRightHeaderGroups")), e.getFooterGroups = R(() => [e.getHeaderGroups()], (r) => [...r].reverse(), x(e.options, X, "getFooterGroups")), e.getLeftFooterGroups = R(() => [e.getLeftHeaderGroups()], (r) => [...r].reverse(), x(e.options, X, "getLeftFooterGroups")), e.getCenterFooterGroups = R(() => [e.getCenterHeaderGroups()], (r) => [...r].reverse(), x(e.options, X, "getCenterFooterGroups")), e.getRightFooterGroups = R(() => [e.getRightHeaderGroups()], (r) => [...r].reverse(), x(e.options, X, "getRightFooterGroups")), e.getFlatHeaders = R(() => [e.getHeaderGroups()], (r) => r.map((n) => n.headers).flat(), x(e.options, X, "getFlatHeaders")), e.getLeftFlatHeaders = R(() => [e.getLeftHeaderGroups()], (r) => r.map((n) => n.headers).flat(), x(e.options, X, "getLeftFlatHeaders")), e.getCenterFlatHeaders = R(() => [e.getCenterHeaderGroups()], (r) => r.map((n) => n.headers).flat(), x(e.options, X, "getCenterFlatHeaders")), e.getRightFlatHeaders = R(() => [e.getRightHeaderGroups()], (r) => r.map((n) => n.headers).flat(), x(e.options, X, "getRightFlatHeaders")), e.getCenterLeafHeaders = R(() => [e.getCenterFlatHeaders()], (r) => r.filter((n) => {
      var t;
      return !((t = n.subHeaders) != null && t.length);
    }), x(e.options, X, "getCenterLeafHeaders")), e.getLeftLeafHeaders = R(() => [e.getLeftFlatHeaders()], (r) => r.filter((n) => {
      var t;
      return !((t = n.subHeaders) != null && t.length);
    }), x(e.options, X, "getLeftLeafHeaders")), e.getRightLeafHeaders = R(() => [e.getRightFlatHeaders()], (r) => r.filter((n) => {
      var t;
      return !((t = n.subHeaders) != null && t.length);
    }), x(e.options, X, "getRightLeafHeaders")), e.getLeafHeaders = R(() => [e.getLeftHeaderGroups(), e.getCenterHeaderGroups(), e.getRightHeaderGroups()], (r, n, t) => {
      var i, o, l, s, a, u;
      return [...(i = (o = r[0]) == null ? void 0 : o.headers) != null ? i : [], ...(l = (s = n[0]) == null ? void 0 : s.headers) != null ? l : [], ...(a = (u = t[0]) == null ? void 0 : u.headers) != null ? a : []].map((f) => f.getLeafHeaders()).flat();
    }, x(e.options, X, "getLeafHeaders"));
  }
};
function He(e, r, n, t) {
  var i, o;
  let l = 0;
  const s = function(g, c) {
    c === void 0 && (c = 1), l = Math.max(l, c), g.filter((v) => v.getIsVisible()).forEach((v) => {
      var S;
      (S = v.columns) != null && S.length && s(v.columns, c + 1);
    }, 0);
  };
  s(e);
  let a = [];
  const u = (g, c) => {
    const v = {
      depth: c,
      id: [t, `${c}`].filter(Boolean).join("_"),
      headers: []
    }, S = [];
    g.forEach((h) => {
      const m = [...S].reverse()[0], w = h.column.depth === v.depth;
      let y, E = !1;
      if (w && h.column.parent ? y = h.column.parent : (y = h.column, E = !0), m && m?.column === y)
        m.subHeaders.push(h);
      else {
        const P = ht(n, y, {
          id: [t, c, y.id, h?.id].filter(Boolean).join("_"),
          isPlaceholder: E,
          placeholderId: E ? `${S.filter((_) => _.column === y).length}` : void 0,
          depth: c,
          index: S.length
        });
        P.subHeaders.push(h), S.push(P);
      }
      v.headers.push(h), h.headerGroup = v;
    }), a.push(v), c > 0 && u(S, c - 1);
  }, f = r.map((g, c) => ht(n, g, {
    depth: l,
    index: c
  }));
  u(f, l - 1), a.reverse();
  const d = (g) => g.filter((v) => v.column.getIsVisible()).map((v) => {
    let S = 0, h = 0, m = [0];
    v.subHeaders && v.subHeaders.length ? (m = [], d(v.subHeaders).forEach((y) => {
      let {
        colSpan: E,
        rowSpan: P
      } = y;
      S += E, m.push(P);
    })) : S = 1;
    const w = Math.min(...m);
    return h = h + w, v.colSpan = S, v.rowSpan = h, {
      colSpan: S,
      rowSpan: h
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
    getAllCells: R(() => [e.getAllLeafColumns()], (a) => a.map((u) => Xt(e, s, u, u.id)), x(e.options, "debugRows", "getAllCells")),
    _getAllCellsByColumnId: R(() => [s.getAllCells()], (a) => a.reduce((u, f) => (u[f.column.id] = f, u), {}), x(e.options, "debugRows", "getAllCellsByColumnId"))
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
xt.autoRemove = (e) => le(e);
const _t = (e, r, n) => {
  var t;
  return !!(!((t = e.getValue(r)) == null || (t = t.toString()) == null) && t.includes(n));
};
_t.autoRemove = (e) => le(e);
const Et = (e, r, n) => {
  var t;
  return ((t = e.getValue(r)) == null || (t = t.toString()) == null ? void 0 : t.toLowerCase()) === n?.toLowerCase();
};
Et.autoRemove = (e) => le(e);
const bt = (e, r, n) => {
  var t;
  return (t = e.getValue(r)) == null ? void 0 : t.includes(n);
};
bt.autoRemove = (e) => le(e);
const $t = (e, r, n) => !n.some((t) => {
  var i;
  return !((i = e.getValue(r)) != null && i.includes(t));
});
$t.autoRemove = (e) => le(e) || !(e != null && e.length);
const Mt = (e, r, n) => n.some((t) => {
  var i;
  return (i = e.getValue(r)) == null ? void 0 : i.includes(t);
});
Mt.autoRemove = (e) => le(e) || !(e != null && e.length);
const Ft = (e, r, n) => e.getValue(r) === n;
Ft.autoRemove = (e) => le(e);
const Ot = (e, r, n) => e.getValue(r) == n;
Ot.autoRemove = (e) => le(e);
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
dt.autoRemove = (e) => le(e) || le(e[0]) && le(e[1]);
const ae = {
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
function le(e) {
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
    onColumnFiltersChange: ee("columnFilters", e),
    filterFromLeafRows: !1,
    maxLeafRowFilterDepth: 100
  }),
  createColumn: (e, r) => {
    e.getAutoFilterFn = () => {
      const n = r.getCoreRowModel().flatRows[0], t = n?.getValue(e.id);
      return typeof t == "string" ? ae.includesString : typeof t == "number" ? ae.inNumberRange : typeof t == "boolean" || t !== null && typeof t == "object" ? ae.equals : Array.isArray(t) ? ae.arrIncludes : ae.weakEquals;
    }, e.getFilterFn = () => {
      var n, t;
      return qe(e.columnDef.filterFn) ? e.columnDef.filterFn : e.columnDef.filterFn === "auto" ? e.getAutoFilterFn() : (
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
        return (o = he(r, i)) == null ? void 0 : o.filter((l) => {
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
    onGroupingChange: ee("grouping", e),
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
    onColumnOrderChange: ee("columnOrder", e)
  }),
  createColumn: (e, r) => {
    e.getIndex = R((n) => [ze(r, n)], (n) => n.findIndex((t) => t.id === e.id), x(r.options, "debugColumns", "getIndex")), e.getIsFirstColumn = (n) => {
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
    }, e._getOrderColumnsFn = R(() => [e.getState().columnOrder, e.getState().grouping, e.options.groupedColumnMode], (r, n, t) => (i) => {
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
    }, x(e.options, "debugTable", "_getOrderColumnsFn"));
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
    onColumnPinningChange: ee("columnPinning", e)
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
    e.getCenterVisibleCells = R(() => [e._getAllVisibleCells(), r.getState().columnPinning.left, r.getState().columnPinning.right], (n, t, i) => {
      const o = [...t ?? [], ...i ?? []];
      return n.filter((l) => !o.includes(l.column.id));
    }, x(r.options, "debugRows", "getCenterVisibleCells")), e.getLeftVisibleCells = R(() => [e._getAllVisibleCells(), r.getState().columnPinning.left], (n, t) => (t ?? []).map((o) => n.find((l) => l.column.id === o)).filter(Boolean).map((o) => ({
      ...o,
      position: "left"
    })), x(r.options, "debugRows", "getLeftVisibleCells")), e.getRightVisibleCells = R(() => [e._getAllVisibleCells(), r.getState().columnPinning.right], (n, t) => (t ?? []).map((o) => n.find((l) => l.column.id === o)).filter(Boolean).map((o) => ({
      ...o,
      position: "right"
    })), x(r.options, "debugRows", "getRightVisibleCells"));
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
    }, e.getLeftLeafColumns = R(() => [e.getAllLeafColumns(), e.getState().columnPinning.left], (r, n) => (n ?? []).map((t) => r.find((i) => i.id === t)).filter(Boolean), x(e.options, "debugColumns", "getLeftLeafColumns")), e.getRightLeafColumns = R(() => [e.getAllLeafColumns(), e.getState().columnPinning.right], (r, n) => (n ?? []).map((t) => r.find((i) => i.id === t)).filter(Boolean), x(e.options, "debugColumns", "getRightLeafColumns")), e.getCenterLeafColumns = R(() => [e.getAllLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (r, n, t) => {
      const i = [...n ?? [], ...t ?? []];
      return r.filter((o) => !i.includes(o.id));
    }, x(e.options, "debugColumns", "getCenterLeafColumns"));
  }
};
function fn(e) {
  return e || (typeof document < "u" ? document : null);
}
const Ge = {
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
  getDefaultColumnDef: () => Ge,
  getInitialState: (e) => ({
    columnSizing: {},
    columnSizingInfo: Ke(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnSizingChange: ee("columnSizing", e),
    onColumnSizingInfoChange: ee("columnSizingInfo", e)
  }),
  createColumn: (e, r) => {
    e.getSize = () => {
      var n, t, i;
      const o = r.getState().columnSizing[e.id];
      return Math.min(Math.max((n = e.columnDef.minSize) != null ? n : Ge.minSize, (t = o ?? e.columnDef.size) != null ? t : Ge.size), (i = e.columnDef.maxSize) != null ? i : Ge.maxSize);
    }, e.getStart = R((n) => [n, ze(r, n), r.getState().columnSizing], (n, t) => t.slice(0, e.getIndex(n)).reduce((i, o) => i + o.getSize(), 0), x(r.options, "debugColumns", "getStart")), e.getAfter = R((n) => [n, ze(r, n), r.getState().columnSizing], (n, t) => t.slice(e.getIndex(n) + 1).reduce((i, o) => i + o.getSize(), 0), x(r.options, "debugColumns", "getAfter")), e.resetSize = () => {
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
        const l = e.getSize(), s = e ? e.getLeafHeaders().map((m) => [m.column.id, m.column.getSize()]) : [[t.id, t.getSize()]], a = Qe(o) ? Math.round(o.touches[0].clientX) : o.clientX, u = {}, f = (m, w) => {
          typeof w == "number" && (r.setColumnSizingInfo((y) => {
            var E, P;
            const _ = r.options.columnResizeDirection === "rtl" ? -1 : 1, V = (w - ((E = y?.startOffset) != null ? E : 0)) * _, A = Math.max(V / ((P = y?.startSize) != null ? P : 0), -0.999999);
            return y.columnSizingStart.forEach((q) => {
              let [O, k] = q;
              u[O] = Math.round(Math.max(k + k * A, 0) * 100) / 100;
            }), {
              ...y,
              deltaOffset: V,
              deltaPercentage: A
            };
          }), (r.options.columnResizeMode === "onChange" || m === "end") && r.setColumnSizing((y) => ({
            ...y,
            ...u
          })));
        }, d = (m) => f("move", m), g = (m) => {
          f("end", m), r.setColumnSizingInfo((w) => ({
            ...w,
            isResizingColumn: !1,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        }, c = fn(n), v = {
          moveHandler: (m) => d(m.clientX),
          upHandler: (m) => {
            c?.removeEventListener("mousemove", v.moveHandler), c?.removeEventListener("mouseup", v.upHandler), g(m.clientX);
          }
        }, S = {
          moveHandler: (m) => (m.cancelable && (m.preventDefault(), m.stopPropagation()), d(m.touches[0].clientX), !1),
          upHandler: (m) => {
            var w;
            c?.removeEventListener("touchmove", S.moveHandler), c?.removeEventListener("touchend", S.upHandler), m.cancelable && (m.preventDefault(), m.stopPropagation()), g((w = m.touches[0]) == null ? void 0 : w.clientX);
          }
        }, h = hn() ? {
          passive: !1
        } : !1;
        Qe(o) ? (c?.addEventListener("touchmove", S.moveHandler, h), c?.addEventListener("touchend", S.upHandler, h)) : (c?.addEventListener("mousemove", v.moveHandler, h), c?.addEventListener("mouseup", v.upHandler, h)), r.setColumnSizingInfo((m) => ({
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
let Te = null;
function hn() {
  if (typeof Te == "boolean") return Te;
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
  return Te = e, Te;
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
    onColumnVisibilityChange: ee("columnVisibility", e)
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
    e._getAllVisibleCells = R(() => [e.getAllCells(), r.getState().columnVisibility], (n) => n.filter((t) => t.column.getIsVisible()), x(r.options, "debugRows", "_getAllVisibleCells")), e.getVisibleCells = R(() => [e.getLeftVisibleCells(), e.getCenterVisibleCells(), e.getRightVisibleCells()], (n, t, i) => [...n, ...t, ...i], x(r.options, "debugRows", "getVisibleCells"));
  },
  createTable: (e) => {
    const r = (n, t) => R(() => [t(), t().filter((i) => i.getIsVisible()).map((i) => i.id).join("_")], (i) => i.filter((o) => o.getIsVisible == null ? void 0 : o.getIsVisible()), x(e.options, "debugColumns", n));
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
    onGlobalFilterChange: ee("globalFilter", e),
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
      return qe(t) ? t : t === "auto" ? e.getGlobalAutoFilterFn() : (r = (n = e.options.filterFns) == null ? void 0 : n[t]) != null ? r : ae[t];
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
    onExpandedChange: ee("expanded", e),
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
    onPaginationChange: ee("pagination", e)
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
      e.setPagination(t ? Ze() : (i = e.initialState.pagination) != null ? i : Ze());
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
      e.setPageIndex(t ? it : (i = (o = e.initialState) == null || (o = o.pagination) == null ? void 0 : o.pageIndex) != null ? i : it);
    }, e.resetPageSize = (t) => {
      var i, o;
      e.setPageSize(t ? ot : (i = (o = e.initialState) == null || (o = o.pagination) == null ? void 0 : o.pageSize) != null ? i : ot);
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
    }), e.getPageOptions = R(() => [e.getPageCount()], (t) => {
      let i = [];
      return t && t > 0 && (i = [...new Array(t)].fill(null).map((o, l) => l)), i;
    }, x(e.options, "debugTable", "getPageOptions")), e.getCanPreviousPage = () => e.getState().pagination.pageIndex > 0, e.getCanNextPage = () => {
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
    onRowPinningChange: ee("rowPinning", e)
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
          var c, v;
          return {
            top: [...((c = a?.top) != null ? c : []).filter((S) => !(s != null && s.has(S))), ...Array.from(s)],
            bottom: ((v = a?.bottom) != null ? v : []).filter((S) => !(s != null && s.has(S)))
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
    }, e.getTopRows = R(() => [e.getRowModel().rows, e.getState().rowPinning.top], (r, n) => e._getPinnedRows(r, n, "top"), x(e.options, "debugRows", "getTopRows")), e.getBottomRows = R(() => [e.getRowModel().rows, e.getState().rowPinning.bottom], (r, n) => e._getPinnedRows(r, n, "bottom"), x(e.options, "debugRows", "getBottomRows")), e.getCenterRows = R(() => [e.getRowModel().rows, e.getState().rowPinning.top, e.getState().rowPinning.bottom], (r, n, t) => {
      const i = /* @__PURE__ */ new Set([...n ?? [], ...t ?? []]);
      return r.filter((o) => !i.has(o.id));
    }, x(e.options, "debugRows", "getCenterRows"));
  }
}, Rn = {
  getInitialState: (e) => ({
    rowSelection: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowSelectionChange: ee("rowSelection", e),
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
    }), e.getPreSelectedRowModel = () => e.getCoreRowModel(), e.getSelectedRowModel = R(() => [e.getState().rowSelection, e.getCoreRowModel()], (r, n) => Object.keys(r).length ? et(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, x(e.options, "debugTable", "getSelectedRowModel")), e.getFilteredSelectedRowModel = R(() => [e.getState().rowSelection, e.getFilteredRowModel()], (r, n) => Object.keys(r).length ? et(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, x(e.options, "debugTable", "getFilteredSelectedRowModel")), e.getGroupedSelectedRowModel = R(() => [e.getState().rowSelection, e.getSortedRowModel()], (r, n) => Object.keys(r).length ? et(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, x(e.options, "debugTable", "getGroupedSelectedRowModel")), e.getIsAllRowsSelected = () => {
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
const at = /([0-9]+)/gm, xn = (e, r, n) => It(me(e.getValue(n)).toLowerCase(), me(r.getValue(n)).toLowerCase()), _n = (e, r, n) => It(me(e.getValue(n)), me(r.getValue(n))), En = (e, r, n) => ft(me(e.getValue(n)).toLowerCase(), me(r.getValue(n)).toLowerCase()), bn = (e, r, n) => ft(me(e.getValue(n)), me(r.getValue(n))), $n = (e, r, n) => {
  const t = e.getValue(n), i = r.getValue(n);
  return t > i ? 1 : t < i ? -1 : 0;
}, Mn = (e, r, n) => ft(e.getValue(n), r.getValue(n));
function ft(e, r) {
  return e === r ? 0 : e > r ? 1 : -1;
}
function me(e) {
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
    onSortingChange: ee("sorting", e),
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
      const c = he(g, i.options);
      i.options = l(c);
    },
    getState: () => i.options.state,
    setState: (g) => {
      i.options.onStateChange == null || i.options.onStateChange(g);
    },
    _getRowId: (g, c, v) => {
      var S;
      return (S = i.options.getRowId == null ? void 0 : i.options.getRowId(g, c, v)) != null ? S : `${v ? [v.id, c].join(".") : c}`;
    },
    getCoreRowModel: () => (i._getCoreRowModel || (i._getCoreRowModel = i.options.getCoreRowModel(i)), i._getCoreRowModel()),
    // The final calls start at the bottom of the model,
    // expanded rows, which then work their way up
    getRowModel: () => i.getPaginationRowModel(),
    //in next version, we should just pass in the row model as the optional 2nd arg
    getRow: (g, c) => {
      let v = (c ? i.getPrePaginationRowModel() : i.getRowModel()).rowsById[g];
      if (!v && (v = i.getCoreRowModel().rowsById[g], !v))
        throw process.env.NODE_ENV !== "production" ? new Error(`getRow could not find row with ID: ${g}`) : new Error();
      return v;
    },
    _getDefaultColumnDef: R(() => [i.options.defaultColumn], (g) => {
      var c;
      return g = (c = g) != null ? c : {}, {
        header: (v) => {
          const S = v.header.column.columnDef;
          return S.accessorKey ? S.accessorKey : S.accessorFn ? S.id : null;
        },
        // footer: props => props.header.column.id,
        cell: (v) => {
          var S, h;
          return (S = (h = v.renderValue()) == null || h.toString == null ? void 0 : h.toString()) != null ? S : null;
        },
        ...i._features.reduce((v, S) => Object.assign(v, S.getDefaultColumnDef == null ? void 0 : S.getDefaultColumnDef()), {}),
        ...g
      };
    }, x(e, "debugColumns", "_getDefaultColumnDef")),
    _getColumnDefs: () => i.options.columns,
    getAllColumns: R(() => [i._getColumnDefs()], (g) => {
      const c = function(v, S, h) {
        return h === void 0 && (h = 0), v.map((m) => {
          const w = Yt(i, m, h, S), y = m;
          return w.columns = y.columns ? c(y.columns, w, h + 1) : [], w;
        });
      };
      return c(g);
    }, x(e, "debugColumns", "getAllColumns")),
    getAllFlatColumns: R(() => [i.getAllColumns()], (g) => g.flatMap((c) => c.getFlatColumns()), x(e, "debugColumns", "getAllFlatColumns")),
    _getAllFlatColumnsById: R(() => [i.getAllFlatColumns()], (g) => g.reduce((c, v) => (c[v.id] = v, c), {}), x(e, "debugColumns", "getAllFlatColumnsById")),
    getAllLeafColumns: R(() => [i.getAllColumns(), i._getOrderColumnsFn()], (g, c) => {
      let v = g.flatMap((S) => S.getLeafColumns());
      return c(v);
    }, x(e, "debugColumns", "getAllLeafColumns")),
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
function Pn() {
  return (e) => R(() => [e.options.data], (r) => {
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
  }, x(e.options, "debugTable", "getRowModel", () => e._autoResetPageIndex()));
}
function tt(e, r) {
  return e ? Vn(e) ? /* @__PURE__ */ N.createElement(e, r) : e : null;
}
function Vn(e) {
  return An(e) || typeof e == "function" || Ln(e);
}
function An(e) {
  return typeof e == "function" && (() => {
    const r = Object.getPrototypeOf(e);
    return r.prototype && r.prototype.isReactComponent;
  })();
}
function Ln(e) {
  return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
function zn(e) {
  const r = {
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    ...e
  }, [n] = N.useState(() => ({
    current: In(r)
  })), [t, i] = N.useState(() => n.current.initialState);
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
function kn({
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
  setExpandedRows: v,
  stripedRows: S = !1,
  hoverableRow: h = !1,
  loading: m,
  loadingCustom: w,
  noResultMessage: y,
  onRowClick: E,
  totalItems: P,
  revealOnHoverColIds: _
}) {
  const V = K((C) => {
    C.currentTarget.querySelectorAll(".cell-content-reveal").forEach((M) => {
      M.style.opacity = "1";
    });
  }, []), A = K((C) => {
    C.currentTarget.querySelectorAll(".cell-content-reveal").forEach((M) => {
      M.style.opacity = "";
    });
  }, []), q = pe(
    () => l ?? s,
    [l, s]
  ), O = T(null), k = T(null), W = T(0), [ve, Se] = re(null), [te, se] = re(null), H = (C, M) => {
    if (!o) return;
    M.preventDefault();
    const I = M.currentTarget.closest("tr")?.getBoundingClientRect();
    I && (W.current = M.clientY - I.top, se({
      top: I.top,
      left: I.left,
      width: I.width
    })), O.current = M.clientY, k.current = C, Se(C), M.currentTarget.setPointerCapture(M.pointerId);
  }, $ = (C) => {
    if (!o || O.current === null || k.current === null) return;
    const M = C.clientY - O.current;
    se(
      (Z) => Z && {
        ...Z,
        top: C.clientY - W.current
      }
    );
    const B = 32, I = M > B ? 1 : M < -B ? -1 : 0;
    if (I === 0) return;
    const ne = k.current, z = ne + I;
    z < 0 || z >= e.getRowModel().rows.length || (q((Z) => {
      const Re = [...Z], [b] = Re.splice(ne, 1);
      return Re.splice(z, 0, b), Re;
    }), k.current = z, O.current = C.clientY, Se(z));
  }, Y = () => {
    O.current = null, k.current = null, W.current = 0, Se(null), se(null);
  }, [Q, we] = re(null), [ue, ie] = re(""), Ce = (C) => {
    we({
      rowId: C.row.id,
      colId: C.column.id
    }), ie(String(C.getValue() ?? ""));
  }, ye = (C) => {
    s(
      (M) => M.map(
        (B, I) => I === C.row.index ? {
          ...B,
          [C.column.id]: ue
        } : B
      )
    ), we(null);
  }, be = (C) => !!(C.closest("button") || C.closest("a") || C.closest("input") || C.closest("select") || C.closest("textarea") || C.closest("[data-stop-row-click]")), oe = (C, M) => {
    const B = C.target;
    if (!be(B) && !B.closest(".col-drag-handle")) {
      if (g?.clickRow) {
        const I = M.original.id ?? M.index;
        v((ne) => {
          const z = new Set(ne);
          return z.has(I) ? z.delete(I) : z.add(I), z;
        });
      }
      E && E(M.original);
    }
  }, L = ve === null ? null : e.getRowModel().rows[ve] ?? null;
  return /* @__PURE__ */ j(Rt, { children: [
    /* @__PURE__ */ j("table", { className: `table table-body ${h ? "hoverable" : ""} ${S ? "striped" : ""}`, children: [
      /* @__PURE__ */ p(
        ke,
        {
          table: e,
          tableWidth: r
        }
      ),
      /* @__PURE__ */ j("tbody", { children: [
        m === "default" && /* @__PURE__ */ p("tr", { className: "table-loading-row", children: /* @__PURE__ */ p(
          "td",
          {
            colSpan: e.getAllColumns().length,
            style: { textAlign: "center", padding: "20px" },
            children: "Carregando dados..."
          }
        ) }),
        m === "spinner" && /* @__PURE__ */ p("tr", { className: "table-loading-row", children: /* @__PURE__ */ p(
          "td",
          {
            colSpan: e.getAllColumns().length,
            style: { textAlign: "center", padding: "20px" },
            children: /* @__PURE__ */ p("div", { style: { display: "flex", justifyContent: "center", alignItems: "center" }, children: /* @__PURE__ */ p("div", { className: "table-spinner" }) })
          }
        ) }),
        m === "custom" && /* @__PURE__ */ p("tr", { className: "table-loading-row", children: /* @__PURE__ */ p(
          "td",
          {
            colSpan: e.getAllColumns().length,
            style: { textAlign: "center", padding: "20px" },
            children: w
          }
        ) }),
        m === "placeholder" && (() => {
          const C = e.getAllColumns().length, M = e.getState().pagination?.pageSize || 10;
          return Array.from({ length: M }).map((B, I) => /* @__PURE__ */ p("tr", { className: "table-placeholder-row", children: Array.from({ length: C }).map((ne, z) => /* @__PURE__ */ p("td", { children: /* @__PURE__ */ p("div", { className: "table-placeholder-cell" }) }, `placeholder-cell-${I}-${z}`)) }, `placeholder-row-${I}`));
        })(),
        !m && e.getRowModel().rows.length === 0 && P === 0 && /* @__PURE__ */ p("tr", { className: "table-no-results-row", children: /* @__PURE__ */ p(
          "td",
          {
            colSpan: e.getAllColumns().length,
            style: { textAlign: "center", padding: "20px" },
            children: y
          }
        ) }),
        !m && e.getRowModel().rows.length > 0 && e.getRowModel().rows.map((C) => {
          const M = C.index, B = ve === M, I = [];
          I.push(
            /* @__PURE__ */ p(
              "tr",
              {
                className: `${B ? "row-dragging" : ""}`,
                onPointerMove: $,
                onPointerUp: Y,
                onPointerCancel: Y,
                onMouseEnter: V,
                onMouseLeave: A,
                onClick: (b) => oe(b, {
                  original: C.original,
                  index: C.index
                }),
                children: C.getVisibleCells().map((b) => {
                  const F = b.column.id, D = n.get(F), xe = Oe(b.column, t), _e = Q?.rowId === C.id && Q?.colId === F, Ee = [
                    D ? "is-sticky" : "",
                    D?.side === "left" ? "is-sticky-left" : "",
                    D?.side === "right" ? "is-sticky-right" : ""
                  ].filter(Boolean).join(" "), ce = D ? D.side === "left" ? { "--sticky-left": `${D.offset}px` } : { "--sticky-right": `${D.offset}px` } : void 0;
                  if (b.column.id === "__draggable__" && o)
                    return /* @__PURE__ */ p(
                      "td",
                      {
                        className: `${Ee} align-center col-drag-handle`,
                        style: ce,
                        onPointerDown: (G) => H(M, G),
                        children: "☰"
                      },
                      b.id
                    );
                  if (b.column.id === "__selectable__" && a) {
                    const G = b.row.original.id ?? b.row.index, Ie = d.includes(G), Xe = u.has(G);
                    if (Ie && a.hideDisabledSelects)
                      return /* @__PURE__ */ p(
                        "td",
                        {
                          className: `${Ee} align-center`,
                          style: ce
                        },
                        b.id
                      );
                    const De = /* @__PURE__ */ p(
                      "input",
                      {
                        type: "checkbox",
                        checked: Xe,
                        disabled: Ie,
                        onChange: () => {
                          f(($e) => {
                            const Ne = new Set($e);
                            return Ne.has(G) ? Ne.delete(G) : Ne.add(G), Ne;
                          });
                        }
                      }
                    );
                    return /* @__PURE__ */ p(
                      "td",
                      {
                        className: `${Ee} align-center`,
                        style: ce,
                        children: a.revealOnHover ? /* @__PURE__ */ p("span", { className: "cell-content-reveal", children: De }) : De
                      },
                      b.id
                    );
                  }
                  if (b.column.id === "__expandable__" && g) {
                    const G = b.row.original.id ?? b.row.index, Ie = c.has(G);
                    return /* @__PURE__ */ p(
                      "td",
                      {
                        className: `${Ee} align-center`,
                        style: ce,
                        onClick: (Xe) => {
                          Xe.stopPropagation(), v((De) => {
                            const $e = new Set(De);
                            return $e.has(G) ? $e.delete(G) : $e.add(G), $e;
                          });
                        },
                        children: /* @__PURE__ */ p(
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
                            children: /* @__PURE__ */ p("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ p("path", { d: "M4.5 9L7.5 6L4.5 3", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
                          }
                        )
                      },
                      b.id
                    );
                  }
                  const Gt = _?.has(F);
                  return /* @__PURE__ */ p(
                    "td",
                    {
                      className: `${Ee} align-${xe}`,
                      style: ce,
                      onDoubleClick: () => {
                        i && Ce(b);
                      },
                      children: _e ? /* @__PURE__ */ p(
                        "input",
                        {
                          autoFocus: !0,
                          value: ue,
                          onChange: (G) => ie(G.target.value),
                          onBlur: () => ye(b),
                          onKeyDown: (G) => {
                            G.key === "Enter" && ye(b), G.key === "Escape" && we(null);
                          },
                          onFocus: (G) => G.currentTarget.select(),
                          style: {
                            width: "100%",
                            height: "100%",
                            boxSizing: "border-box",
                            fontSize: "inherit",
                            fontFamily: "inherit"
                          }
                        }
                      ) : Gt ? /* @__PURE__ */ p("span", { className: "cell-content-reveal", children: tt(
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
              C.id
            )
          );
          const ne = C.original.id ?? C.index, z = g?.content?.(C.original), Z = C.getVisibleCells(), Re = Z.some(
            (b) => !!b.column.columnDef.meta?.expandable
          );
          return g && c.has(ne) && (z || Re) && (z ? I.push(
            /* @__PURE__ */ p("tr", { className: "expanded-row", children: /* @__PURE__ */ p("td", { colSpan: e.getAllColumns().length, className: "expanded-content", children: z }) }, `${C.id}-expanded`)
          ) : I.push(
            /* @__PURE__ */ p("tr", { className: "expanded-row", children: Z.map((b) => {
              const F = b.column.id, D = n.get(F), xe = Oe(b.column, t), _e = [
                D ? "is-sticky" : "",
                D?.side === "left" ? "is-sticky-left" : "",
                D?.side === "right" ? "is-sticky-right" : ""
              ].filter(Boolean).join(" "), Ee = D ? D.side === "left" ? { "--sticky-left": `${D.offset}px` } : { "--sticky-right": `${D.offset}px` } : void 0, ce = b.column.columnDef.meta?.expandable;
              return /* @__PURE__ */ p(
                "td",
                {
                  className: `${_e} align-${xe} expanded-cell`,
                  style: Ee,
                  children: ce ? ce.content(C.original) : null
                },
                `${b.id}-expanded`
              );
            }) }, `${C.id}-expanded`)
          )), I;
        }).flat()
      ] })
    ] }),
    te && L && /* @__PURE__ */ j(
      "table",
      {
        className: `table table-body table-row-drag-ghost ${S ? "striped" : ""}`,
        style: {
          top: te.top,
          left: te.left,
          width: te.width
        },
        children: [
          /* @__PURE__ */ p(
            ke,
            {
              table: e,
              tableWidth: te.width
            }
          ),
          /* @__PURE__ */ p("tbody", { children: /* @__PURE__ */ p("tr", { children: L.getVisibleCells().map((C) => {
            const M = C.column.id, B = Oe(C.column, t);
            if (M === "__draggable__" && o)
              return /* @__PURE__ */ p("td", { className: "align-center col-drag-handle", children: "☰" }, C.id);
            if (M === "__selectable__" && a) {
              const I = C.row.original.id ?? C.row.index;
              return /* @__PURE__ */ p("td", { className: "align-center", children: /* @__PURE__ */ p(
                "input",
                {
                  type: "checkbox",
                  checked: u.has(I),
                  readOnly: !0
                }
              ) }, C.id);
            }
            if (M === "__expandable__" && g) {
              const I = C.row.original.id ?? C.row.index, ne = c.has(I);
              return /* @__PURE__ */ p("td", { className: "align-center", children: /* @__PURE__ */ p(
                "span",
                {
                  className: `expand-icon ${ne ? "expanded" : ""}`,
                  style: {
                    display: "inline-block",
                    transform: ne ? "rotate(90deg)" : "rotate(0deg)",
                    fontSize: "12px"
                  },
                  children: /* @__PURE__ */ p("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ p("path", { d: "M4.5 9L7.5 6L4.5 3", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })
                }
              ) }, C.id);
            }
            return /* @__PURE__ */ p("td", { className: `align-${B}`, children: tt(
              C.column.columnDef.cell,
              C.getContext()
            ) }, C.id);
          }) }) })
        ]
      }
    )
  ] });
}
function Dn({
  table: e,
  tableWidth: r,
  stickyById: n,
  defaultTextAlign: t,
  scrollRef: i
}) {
  return e.getVisibleLeafColumns().some(
    (s) => s.columnDef.meta?.internalFooter != null
  ) ? /* @__PURE__ */ p("div", { className: "table-scroll-sync", ref: i, children: /* @__PURE__ */ j("table", { className: "table table-internal-footer", children: [
    /* @__PURE__ */ p(
      ke,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ p("tfoot", { children: /* @__PURE__ */ p("tr", { children: e.getVisibleLeafColumns().map((s) => {
      const a = s.columnDef.meta?.internalFooter, u = n.get(s.id), f = Oe(s, t), d = [
        u ? "is-sticky" : "",
        u?.side === "left" ? "is-sticky-left" : "",
        u?.side === "right" ? "is-sticky-right" : ""
      ].filter(Boolean).join(" "), g = u ? u.side === "left" ? { "--sticky-left": `${u.offset}px` } : { "--sticky-right": `${u.offset}px` } : void 0;
      return /* @__PURE__ */ p(
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
  return /* @__PURE__ */ p("table", { className: "table table-external-footer", children: /* @__PURE__ */ p("tfoot", { children: /* @__PURE__ */ p("tr", { children: /* @__PURE__ */ p("td", { children: e }) }) }) });
}
function Hn(e, r, n = 2) {
  if (r <= 1) return [1];
  const t = [], i = [], o = Math.max(2, e - n), l = Math.min(r - 1, e + n);
  for (let s = o; s <= l; s++)
    i.push(s);
  return t.push(1), o > 2 && t.push("ellipsis"), t.push(...i), l < r - 1 && t.push("ellipsis"), t.push(r), t;
}
function Gn({
  currentPage: e,
  totalItems: r,
  pageSize: n,
  pageSizeOptions: t = [10, 25, 50, 100, 200],
  onPageChange: i,
  renderInfo: o
}) {
  const l = Math.max(1, Math.ceil(r / n)), s = r === 0 ? 0 : (e - 1) * n + 1, a = Math.min(e * n, r), u = pe(
    () => Hn(e, l),
    [e, l]
  ), f = pe(() => {
    const d = new Set(t);
    return d.add(n), Array.from(d).sort((g, c) => g - c);
  }, [t, n]);
  return /* @__PURE__ */ j("div", { className: "table-pagination", children: [
    /* @__PURE__ */ j("div", { className: "pagination-controls", children: [
      /* @__PURE__ */ p(
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
        (d, g) => d === "ellipsis" ? /* @__PURE__ */ p(
          "span",
          {
            className: "pagination-btn ellipsis",
            children: "..."
          },
          `e-${g}`
        ) : /* @__PURE__ */ p(
          "button",
          {
            className: `pagination-btn ${d === e ? "active" : ""}`,
            onClick: () => i(d, n),
            children: d
          },
          d
        )
      ),
      /* @__PURE__ */ p(
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
      o ? o({ totalItems: r, displayedItems: a - s + (r === 0 ? 0 : 1), startItem: s, endItem: a, pageSize: n }) : /* @__PURE__ */ j(Rt, { children: [
        /* @__PURE__ */ j("span", { children: [
          "Exibindo de ",
          s,
          " a ",
          a,
          " de ",
          r,
          " registros"
        ] }),
        /* @__PURE__ */ p("span", { className: "pagination-separator", children: "•" })
      ] }),
      /* @__PURE__ */ j("div", { className: "pagination-select", children: [
        !o && /* @__PURE__ */ p("label", { children: "Itens por página:" }),
        /* @__PURE__ */ p("div", { className: "select-wrapper", children: /* @__PURE__ */ p(
          "select",
          {
            value: n,
            onChange: (d) => i(1, Number(d.target.value)),
            children: f.map((d) => /* @__PURE__ */ p("option", { value: d, children: d }, d))
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
var Tn = typeof global == "object" && global && global.Object === Object && global, Wn = typeof self == "object" && self && self.Object === Object && self, Pt = Tn || Wn || Function("return this")(), nt = function() {
  return Pt.Date.now();
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
var je = Pt.Symbol, Vt = Object.prototype, Yn = Vt.hasOwnProperty, Un = Vt.toString, Ae = je ? je.toStringTag : void 0;
function Kn(e) {
  var r = Yn.call(e, Ae), n = e[Ae];
  try {
    e[Ae] = void 0;
    var t = !0;
  } catch {
  }
  var i = Un.call(e);
  return t && (r ? e[Ae] = n : delete e[Ae]), i;
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
  function c(_) {
    var V = t, A = i;
    return t = i = void 0, u = _, l = e.apply(A, V), l;
  }
  function v(_) {
    return u = _, s = setTimeout(m, r), f ? c(_) : l;
  }
  function S(_) {
    var V = _ - a, A = _ - u, q = r - V;
    return d ? gr(q, o - A) : q;
  }
  function h(_) {
    var V = _ - a, A = _ - u;
    return a === void 0 || V >= r || V < 0 || d && A >= o;
  }
  function m() {
    var _ = nt();
    if (h(_))
      return w(_);
    s = setTimeout(m, S(_));
  }
  function w(_) {
    return s = void 0, g && t ? c(_) : (t = i = void 0, l);
  }
  function y() {
    s !== void 0 && clearTimeout(s), u = 0, t = a = i = s = void 0;
  }
  function E() {
    return s === void 0 ? l : w(nt());
  }
  function P() {
    var _ = nt(), V = h(_);
    if (t = arguments, i = this, a = _, V) {
      if (s === void 0)
        return v(a);
      if (d)
        return clearTimeout(s), s = setTimeout(m, r), c(a);
    }
    return s === void 0 && (s = setTimeout(m, r)), l;
  }
  return P.cancel = y, P.flush = E, P;
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
function Lt(e) {
  return !e || !e.ownerDocument ? document : e.ownerDocument;
}
var zt = function(e) {
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
function kt(e, r) {
  var n;
  e && (n = e.classList).add.apply(n, r.split(" "));
}
function Dt(e, r) {
  e && r.split(" ").forEach(function(n) {
    e.classList.remove(n);
  });
}
function Nt(e) {
  return ".".concat(e.split(" ").join("."));
}
var pt = !!(typeof window < "u" && window.document && window.document.createElement), hr = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  addClasses: kt,
  canUseDOM: pt,
  classNamesToQuery: Nt,
  getElementDocument: Lt,
  getElementWindow: At,
  getOptions: zt,
  removeClasses: Dt
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
var de = At, rt = Lt, mr = zt, ge = kt, fe = Dt, U = Nt, Le = (
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
        var o, l, s, a, u, f, d, g, c, v, S;
        if (!(!t.draggedAxis || !t.contentWrapperEl)) {
          var h, m = t.axis[t.draggedAxis].track, w = (l = (o = m.rect) === null || o === void 0 ? void 0 : o[t.axis[t.draggedAxis].sizeAttr]) !== null && l !== void 0 ? l : 0, y = t.axis[t.draggedAxis].scrollbar, E = (a = (s = t.contentWrapperEl) === null || s === void 0 ? void 0 : s[t.axis[t.draggedAxis].scrollSizeAttr]) !== null && a !== void 0 ? a : 0, P = parseInt((f = (u = t.elStyles) === null || u === void 0 ? void 0 : u[t.axis[t.draggedAxis].sizeAttr]) !== null && f !== void 0 ? f : "0px", 10);
          i.preventDefault(), i.stopPropagation(), t.draggedAxis === "y" ? h = i.pageY : h = i.pageX;
          var _ = h - ((g = (d = m.rect) === null || d === void 0 ? void 0 : d[t.axis[t.draggedAxis].offsetAttr]) !== null && g !== void 0 ? g : 0) - t.axis[t.draggedAxis].dragOffset;
          _ = t.draggedAxis === "x" && t.isRtl ? ((v = (c = m.rect) === null || c === void 0 ? void 0 : c[t.axis[t.draggedAxis].sizeAttr]) !== null && v !== void 0 ? v : 0) - y.size - _ : _;
          var V = _ / (w - y.size), A = V * (E - P);
          t.draggedAxis === "x" && t.isRtl && (A = !((S = e.getRtlHelpers()) === null || S === void 0) && S.isScrollingToNegative ? -A : A), t.contentWrapperEl[t.axis[t.draggedAxis].scrollOffsetAttr] = A;
        }
      }, this.onEndDrag = function(i) {
        t.isDragging = !1;
        var o = rt(t.el), l = de(t.el);
        i.preventDefault(), i.stopPropagation(), fe(t.el, t.classNames.dragging), t.onStopScrolling(), o.removeEventListener("mousemove", t.drag, !0), o.removeEventListener("mouseup", t.onEndDrag, !0), t.removePreventClickId = l.setTimeout(function() {
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
      var n = r.getBoundingClientRect(), t = rt(r), i = de(r);
      return {
        top: n.top + (i.pageYOffset || t.documentElement.scrollTop),
        left: n.left + (i.pageXOffset || t.documentElement.scrollLeft)
      };
    }, e.prototype.init = function() {
      pt && (this.initDOM(), this.rtlHelpers = e.getRtlHelpers(), this.scrollbarWidth = this.getScrollbarWidth(), this.recalculate(), this.initListeners());
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
      var i = rt(this.el), o = de(this.el), l = this.axis[n].scrollbar, s = n === "y" ? r.pageY : r.pageX;
      this.axis[n].dragOffset = s - (((t = l.rect) === null || t === void 0 ? void 0 : t[this.axis[n].offsetAttr]) || 0), this.draggedAxis = n, ge(this.el, this.classNames.dragging), i.addEventListener("mousemove", this.drag, !0), i.addEventListener("mouseup", this.onEndDrag, !0), this.removePreventClickId === null ? (i.addEventListener("click", this.preventClick, !0), i.addEventListener("dblclick", this.preventClick, !0)) : (o.clearTimeout(this.removePreventClickId), this.removePreventClickId = null);
    }, e.prototype.onTrackClick = function(r, n) {
      var t = this, i, o, l, s;
      n === void 0 && (n = "y");
      var a = this.axis[n];
      if (!(!this.options.clickOnTrack || !a.scrollbar.el || !this.contentWrapperEl)) {
        r.preventDefault();
        var u = de(this.el);
        this.axis[n].scrollbar.rect = a.scrollbar.el.getBoundingClientRect();
        var f = this.axis[n].scrollbar, d = (o = (i = f.rect) === null || i === void 0 ? void 0 : i[this.axis[n].offsetAttr]) !== null && o !== void 0 ? o : 0, g = parseInt((s = (l = this.elStyles) === null || l === void 0 ? void 0 : l[this.axis[n].sizeAttr]) !== null && s !== void 0 ? s : "0px", 10), c = this.contentWrapperEl[this.axis[n].scrollOffsetAttr], v = n === "y" ? this.mouseY - d : this.mouseX - d, S = v < 0 ? -1 : 1, h = S === -1 ? c - g : c + g, m = 40, w = function() {
          t.contentWrapperEl && (S === -1 ? c > h && (c -= m, t.contentWrapperEl[t.axis[n].scrollOffsetAttr] = c, u.requestAnimationFrame(w)) : c < h && (c += m, t.contentWrapperEl[t.axis[n].scrollOffsetAttr] = c, u.requestAnimationFrame(w)));
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
    }, e.getOptions = mr, e.helpers = hr, e;
  })()
), J = function() {
  return J = Object.assign || function(r) {
    for (var n, t = 1, i = arguments.length; t < i; t++) {
      n = arguments[t];
      for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
    }
    return r;
  }, J.apply(this, arguments);
};
function vr(e, r) {
  var n = {};
  for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && r.indexOf(t) < 0 && (n[t] = e[t]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, t = Object.getOwnPropertySymbols(e); i < t.length; i++)
      r.indexOf(t[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, t[i]) && (n[t[i]] = e[t[i]]);
  return n;
}
var Ht = N.forwardRef(function(e, r) {
  var n = e.children, t = e.scrollableNodeProps, i = t === void 0 ? {} : t, o = vr(e, ["children", "scrollableNodeProps"]), l = N.useRef(), s = N.useRef(), a = N.useRef(), u = {}, f = {};
  Object.keys(o).forEach(function(c) {
    Object.prototype.hasOwnProperty.call(Le.defaultOptions, c) ? u[c] = o[c] : f[c] = o[c];
  });
  var d = J(J({}, Le.defaultOptions.classNames), u.classNames), g = J(J({}, i), { className: "".concat(d.contentWrapper).concat(i.className ? " ".concat(i.className) : ""), tabIndex: u.tabIndex || Le.defaultOptions.tabIndex, role: "region", "aria-label": u.ariaLabel || Le.defaultOptions.ariaLabel });
  return N.useEffect(function() {
    var c;
    return s.current = g.ref ? g.ref.current : s.current, l.current && (c = new Le(l.current, J(J(J({}, u), s.current && {
      scrollableNode: s.current
    }), a.current && {
      contentNode: a.current
    })), typeof r == "function" ? r(c) : r && (r.current = c)), function() {
      c?.unMount(), c = null, typeof r == "function" && r(null);
    };
  }, []), N.createElement(
    "div",
    J({ "data-simplebar": "init", ref: l }, f),
    N.createElement(
      "div",
      { className: d.wrapper },
      N.createElement(
        "div",
        { className: d.heightAutoObserverWrapperEl },
        N.createElement("div", { className: d.heightAutoObserverEl })
      ),
      N.createElement(
        "div",
        { className: d.mask },
        N.createElement("div", { className: d.offset }, typeof n == "function" ? n({
          scrollableNodeRef: s,
          scrollableNodeProps: J(J({}, g), { ref: s }),
          contentNodeRef: a,
          contentNodeProps: {
            className: d.contentEl,
            ref: a
          }
        }) : N.createElement(
          "div",
          J({}, g),
          N.createElement("div", { className: d.contentEl }, n)
        ))
      ),
      N.createElement("div", { className: d.placeholder })
    ),
    N.createElement(
      "div",
      { className: "".concat(d.track, " ").concat(d.horizontal) },
      N.createElement("div", { className: d.scrollbar })
    ),
    N.createElement(
      "div",
      { className: "".concat(d.track, " ").concat(d.vertical) },
      N.createElement("div", { className: d.scrollbar })
    )
  );
});
Ht.displayName = "SimpleBar";
function Sr(e, r, n, t) {
  return zn({
    data: r,
    columns: e,
    state: {
      columnOrder: n
    },
    onColumnOrderChange: t,
    getCoreRowModel: Pn()
  });
}
function wr(e) {
  const [r, n] = re(0);
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
  const e = T(null), r = T([]), n = K((i) => {
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
function yr({
  onResize: e,
  onResizeEnd: r,
  minWidth: n = 40
}) {
  const t = T(0), i = T(0), o = T(null), l = K(
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
      u.preventDefault(), u.stopPropagation(), o.current = f.id, t.current = u.clientX, i.current = ct(f.columnDef.meta?.widthSize), document.addEventListener("mousemove", l), document.addEventListener("mouseup", s);
    },
    [l, s]
  ) };
}
function Rr(e) {
  const [r, n] = re(!1);
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
  const r = e.getState().columnOrder;
  return pe(() => {
    const n = e.getVisibleLeafColumns(), t = /* @__PURE__ */ new Map();
    for (const s of n)
      t.set(s.id, ct(s.columnDef.meta?.widthSize));
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
function _r({ setColumnOrder: e }) {
  const r = T(null), n = T(null), t = T(null), i = T(null), o = T(null), l = T(0), s = T(0), a = T([]), u = T(() => {
  }), f = T(() => {
  }), d = K(() => {
    const h = Array.from(
      document.querySelectorAll("th[data-col-id]")
    );
    a.current = h.filter((m) => m.dataset.reorderable !== "false").map((m) => {
      const w = m.getBoundingClientRect();
      return {
        id: m.dataset.colId,
        left: w.left,
        right: w.right
      };
    }).sort((m, w) => m.left - w.left);
  }, []), g = K((h, m, w) => {
    const y = h.getBoundingClientRect();
    let E = h.parentElement;
    for (; E && !E.classList.contains("super-table-wrapper"); )
      E = E.parentElement;
    const P = E?.querySelector(".table-internal-footer"), _ = E?.querySelector(".internal-table"), V = P ?? _, q = (V ? V.getBoundingClientRect().bottom : y.bottom) - y.top, O = document.createElement("div");
    O.classList.add("table-col-ghost");
    const k = window.getComputedStyle(h), W = document.createElement("div");
    return W.classList.add("table-col-ghost-header"), W.style.height = `${y.height}px`, W.style.fontFamily = k.fontFamily, W.style.fontSize = k.fontSize, W.style.fontWeight = k.fontWeight, W.style.fontStyle = k.fontStyle, W.style.letterSpacing = k.letterSpacing, W.style.color = k.color, W.innerHTML = h.innerHTML, O.appendChild(W), O.style.position = "fixed", O.style.left = `${m}px`, O.style.top = `${w}px`, O.style.width = `${y.width}px`, O.style.height = `${q}px`, O.style.pointerEvents = "none", O.style.zIndex = "9999", O.style.willChange = "left, top", O.style.transition = "none", document.body.appendChild(O), O;
  }, []), c = K(() => {
    const h = document.createElement("div");
    return h.className = "table-col-drop-indicator", h.style.position = "fixed", h.style.pointerEvents = "none", h.style.zIndex = "10000", h.style.display = "none", document.body.appendChild(h), h;
  }, []), v = K((h, m) => {
    const w = i.current;
    if (!w) return;
    const y = document.querySelector(`th[data-col-id="${h}"]`);
    if (!y) {
      w.style.display = "none";
      return;
    }
    const E = y.getBoundingClientRect(), P = m < E.left + E.width / 2, _ = E.top;
    let V = y.parentElement;
    for (; V && !V.classList.contains("super-table-wrapper"); )
      V = V.parentElement;
    const A = V?.querySelector(".table-internal-footer"), q = V?.querySelector(".internal-table"), O = A ?? q, k = O ? O.getBoundingClientRect().bottom : E.bottom;
    w.style.display = "block", w.style.top = `${_}px`, w.style.height = `${k - _}px`, w.style.left = P ? `${E.left}px` : `${E.right}px`;
  }, []), S = K(
    (h, m) => {
      r.current = h;
      const w = document.querySelector(`th[data-col-id="${h}"]`);
      w && (t.current = w, n.current = g(w, m.clientX, w.getBoundingClientRect().top), i.current = c(), w.classList.add("is-dragging-col"), w.style.opacity = "0.2", d(), l.current = m.clientX, s.current = m.clientY, document.body.style.cursor = "grabbing", document.addEventListener("pointermove", u.current), document.addEventListener("pointerup", f.current));
    },
    [g, c, d]
  );
  return u.current = (h) => {
    !r.current || !n.current || (l.current = h.clientX, s.current = h.clientY, !o.current && (o.current = requestAnimationFrame(() => {
      if (o.current = null, !r.current || !n.current) return;
      n.current.style.left = `${l.current}px`;
      const m = a.current;
      if (!m.length) return;
      let w = null;
      for (const y of m)
        if (y.id !== r.current && l.current >= y.left && l.current <= y.right) {
          w = y.id;
          break;
        }
      w ? v(w, l.current) : i.current && (i.current.style.display = "none"), !(!w || w === r.current) && (e((y) => {
        const E = y.indexOf(r.current), P = y.indexOf(w);
        if (E === -1 || P === -1 || E === P) return y;
        const _ = [...y];
        return _.splice(E, 1), _.splice(P, 0, r.current), _;
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
  draggable: v = !1,
  draggableSticky: S = !1,
  selectable: h,
  expandable: m,
  pagination: w,
  loading: y,
  loadingCustom: E,
  noResultMessage: P = "Nenhum resultado encontrado.",
  onRowClick: _,
  hoverableRow: V,
  borders: A = "full",
  style: q = "default"
}) {
  const O = T(null), k = K(
    (F) => {
      O.current = F;
    },
    []
  ), [W, ve] = re(null), Se = K(
    (F) => {
      ve(F), u?.(F);
    },
    [u]
  ), {
    bodyRef: te,
    registerSyncElement: se,
    onBodyScroll: H
  } = Cr(), $ = wr(te), Y = Rr(te), [Q, we] = re({}), ue = pe(
    () => new Set(h?.initialSelectRow || []),
    [h?.initialSelectRow]
  ), [ie, Ce] = re(ue);
  Pe(() => {
    h?.initialSelectRow && Ce(new Set(h.initialSelectRow));
  }, [h?.initialSelectRow]), Pe(() => {
    h?.onSelectedRowsChange?.(Array.from(ie));
  }, [ie, h]);
  const [ye, be] = re(/* @__PURE__ */ new Set()), oe = pe(
    () => br(
      (() => {
        const F = [];
        return v && F.push($r(S)), h && F.push(Mr(
          h.sticky,
          h.label
        )), m && F.push(Fr(m.sticky)), [...F, ...r];
      })()
    ),
    [
      r,
      v,
      S,
      h,
      m
    ]
  ), L = pe(
    () => new Set(
      oe.filter((F) => F.meta?.revealOnHover).map((F) => F.id)
    ),
    [oe]
  ), [C, M] = re(
    () => oe.map((F) => F.id)
  );
  Pe(() => {
    M((F) => {
      const D = oe.map((_e) => _e.id), xe = new Set(F);
      return F.length === D.length && D.every((_e) => xe.has(_e)) ? F : D;
    });
  }, [oe]);
  const [B, I] = re(n);
  Pe(() => {
    I(n);
  }, [n]), Pe(() => {
    f?.(B);
  }, [B, f]);
  const ne = pe(
    () => oe.map((F) => ({
      ...F,
      meta: {
        ...F.meta,
        widthSize: Q[F.id] ?? F.meta?.widthSize
      }
    })),
    [oe, Q]
  ), z = Sr(
    ne,
    B,
    C,
    M
  ), Z = xr(z), { startResize: Re } = yr({
    onResize: (F, D) => {
      we((xe) => ({
        ...xe,
        [F]: `${D}px`
      }));
    },
    onResizeEnd: () => {
      requestAnimationFrame(() => {
        O.current?.recalculate();
      });
    }
  }), { startDrag: b } = _r({
    setColumnOrder: M
  });
  return ut(() => {
    O.current?.recalculate();
  }, [Y]), /* @__PURE__ */ j("div", { id: e, className: `super-table-wrapper borders-${A} style-${q}`, style: { height: i }, children: [
    /* @__PURE__ */ p(
      Wt,
      {
        table: z,
        scrollRef: se,
        tableWidth: $,
        stickyById: Z,
        resizableCol: o,
        reorderableCol: l,
        reorderableColIconPosition: s,
        sortableCol: a,
        sortState: W,
        setSortState: Se,
        onResizeStart: Re,
        onDragStart: b,
        defaultTextAlign: g,
        selectable: h,
        selectedRows: ie,
        setSelectedRows: Ce,
        disableSelectRow: h?.disableSelectRow || [],
        data: n,
        expandable: m,
        expandedRows: ye,
        setExpandedRows: be
      }
    ),
    /* @__PURE__ */ j("div", { className: "internal-table", children: [
      /* @__PURE__ */ p(
        Bt,
        {
          table: z,
          scrollRef: se,
          tableWidth: $,
          stickyById: Z,
          defaultTextAlign: g
        }
      ),
      /* @__PURE__ */ j("div", { className: `table-body-area ${Y ? "has-h-scroll" : "no-h-scroll"}`, children: [
        /* @__PURE__ */ p(
          Ht,
          {
            ref: k,
            className: "table-body-scroll",
            scrollableNodeProps: {
              ref: te,
              onScroll: H
            },
            children: /* @__PURE__ */ p(
              kn,
              {
                table: z,
                tableWidth: $,
                stickyById: Z,
                defaultTextAlign: g,
                editable: c,
                draggable: v,
                setData: I,
                setInternalData: I,
                selectable: h,
                selectedRows: ie,
                setSelectedRows: Ce,
                disableSelectRow: h?.disableSelectRow || [],
                expandable: m,
                expandedRows: ye,
                setExpandedRows: be,
                loading: y,
                loadingCustom: E,
                noResultMessage: P,
                onRowClick: _,
                totalItems: w?.totalItems,
                stripedRows: d,
                hoverableRow: V,
                revealOnHoverColIds: L
              }
            )
          }
        ),
        /* @__PURE__ */ p(
          Dn,
          {
            table: z,
            scrollRef: se,
            tableWidth: $,
            stickyById: Z,
            defaultTextAlign: g
          }
        )
      ] })
    ] }),
    t && /* @__PURE__ */ p(Nn, { table: z, children: t }),
    w && /* @__PURE__ */ p(
      Gn,
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
  Pr as SuperTable
};
