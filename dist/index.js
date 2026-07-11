import { jsx as v, jsxs as G, Fragment as Nt } from "react/jsx-runtime";
import * as z from "react";
import { useCallback as Y, useMemo as fe, useRef as H, useState as J, useLayoutEffect as lt, useEffect as Le } from "react";
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
  const n = e.getAllLeafColumns(), o = n.map(
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
  sortableCol: l = !0,
  sortState: s,
  setSortState: a,
  defaultTextAlign: u,
  selectable: f,
  selectedRows: d,
  disableSelectRow: g,
  onDragStart: c,
  scrollRef: m,
  onResizeStart: p,
  setSelectedRows: S,
  expandable: h,
  expandedRows: C,
  setExpandedRows: y
}) {
  const E = n.map((D, F) => typeof D == "object" && D !== null && "id" in D ? D.id ?? F : F), I = !!f, _ = f?.label, $ = E.filter((D) => !g.includes(D)), A = $.filter((D) => d.has(D)).length, T = A === $.length && $.length > 0, O = A > 0 && A < $.length, V = () => {
    S((D) => {
      const F = new Set(D);
      return T ? $.forEach((q) => F.delete(q)) : $.forEach((q) => F.add(q)), F;
    });
  }, W = !!h, me = h?.expandAllButton || !1, se = E.every((D) => C.has(D)), re = () => {
    y(se ? /* @__PURE__ */ new Set() : new Set(E));
  };
  return /* @__PURE__ */ v("div", { className: "table-scroll-sync", ref: m, children: /* @__PURE__ */ G("table", { className: "table table-external-header", children: [
    /* @__PURE__ */ v(
      We,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ v("thead", { children: e.getHeaderGroups().map((D) => /* @__PURE__ */ v("tr", { children: D.headers.map((F) => {
      const q = F.column.columnDef.meta, U = t.get(F.column.id), ve = Ae(F.column, u), ae = o && q?.reorderable !== !1 && !q?.sticky, Z = (q?.sortable ?? l) && !q?.sticky && !["__draggable__", "__selectable__", "__expandable__"].includes(F.column.id), Se = s?.columnId === F.column.id, we = () => {
        if (!Z) return;
        let w;
        !s || s.columnId !== F.column.id ? w = { columnId: F.column.id, direction: "asc" } : s.direction === "asc" ? w = { columnId: F.column.id, direction: "desc" } : w = null, a(w);
      }, Re = [
        U ? "is-sticky" : "",
        U?.side === "left" ? "is-sticky-left" : "",
        U?.side === "right" ? "is-sticky-right" : "",
        Z ? "is-sortable" : "",
        Se ? `is-sorted-${s.direction}` : ""
      ].filter(Boolean).join(" "), oe = U ? U.side === "left" ? { "--sticky-left": `${U.offset}px` } : { "--sticky-right": `${U.offset}px` } : void 0;
      return /* @__PURE__ */ v(
        "th",
        {
          "data-col-id": F.column.id,
          "data-fixed": q?.sticky ? "true" : void 0,
          "data-reorderable": ae ? void 0 : "false",
          className: Re,
          style: oe,
          onClick: we,
          children: /* @__PURE__ */ G("div", { className: `th-content align-${ve}`, children: [
            /* @__PURE__ */ v("div", { children: F.isPlaceholder ? null : F.column.id === "__selectable__" && I ? /* @__PURE__ */ G("label", { children: [
              /* @__PURE__ */ v(
                "input",
                {
                  type: "checkbox",
                  checked: T,
                  ref: (w) => {
                    w && (w.indeterminate = O);
                  },
                  onChange: V
                }
              ),
              _
            ] }) : F.column.id === "__expandable__" && W && me ? /* @__PURE__ */ v(
              "button",
              {
                onClick: re,
                className: `expand-all-button ${se ? "expanded" : ""}`,
                children: "⇅"
              }
            ) : (() => {
              const w = F.column.columnDef.header;
              return typeof w == "function" ? w({ column: F.column, table: e, header: F }) : w;
            })() }),
            (Z || ae) && /* @__PURE__ */ G("div", { className: "th-actions", children: [
              Z && /* @__PURE__ */ v("span", { className: "sort-indicator" }),
              ae && /* @__PURE__ */ v(
                "span",
                {
                  className: "col-drag-handle",
                  onClick: (w) => w.stopPropagation(),
                  onPointerDown: (w) => {
                    w.preventDefault(), w.currentTarget.setPointerCapture(w.pointerId), c?.(F.column.id, w.nativeEvent);
                  },
                  children: "☰"
                }
              )
            ] }),
            i && p && Ht(F.column) && /* @__PURE__ */ v(
              "span",
              {
                className: "col-resize-handle",
                onClick: (w) => w.stopPropagation(),
                onMouseDown: (w) => p(w, F.column)
              }
            )
          ] })
        },
        F.id
      );
    }) }, D.id)) })
  ] }) });
}
function Gt({
  table: e,
  tableWidth: r,
  stickyById: n,
  defaultTextAlign: t,
  scrollRef: i
}) {
  return e.getAllLeafColumns().some(
    (s) => s.columnDef.meta?.internalHeader != null
  ) ? /* @__PURE__ */ v("div", { className: "table-scroll-sync", ref: i, children: /* @__PURE__ */ G("table", { className: "table table-internal-header", children: [
    /* @__PURE__ */ v(
      We,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ v("thead", { children: /* @__PURE__ */ v("tr", { children: e.getAllLeafColumns().map((s) => {
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
function pe(e, r) {
  return typeof e == "function" ? e(r) : e;
}
function Q(e, r) {
  return (n) => {
    r.setState((t) => ({
      ...t,
      [e]: pe(n, t[e])
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
      const f = Math.round((Date.now() - l) * 100) / 100, d = Math.round((Date.now() - u) * 100) / 100, g = d / 16, c = (m, p) => {
        for (m = String(m); m.length < p; )
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
function qt(e, r, n, t) {
  var i, o;
  const s = {
    ...e._getDefaultColumnDef(),
    ...r
  }, a = s.accessorKey;
  let u = (i = (o = s.id) != null ? o : a ? typeof String.prototype.replaceAll == "function" ? a.replaceAll(".", "_") : a.replace(/\./g, "_") : void 0) != null ? i : typeof s.header == "string" ? s.header : void 0, f;
  if (s.accessorFn ? f = s.accessorFn : a && (a.includes(".") ? f = (g) => {
    let c = g;
    for (const p of a.split(".")) {
      var m;
      c = (m = c) == null ? void 0 : m[p], process.env.NODE_ENV !== "production" && c === void 0 && console.warn(`"${p}" in deeply nested key "${a}" returned undefined.`);
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
        let m = d.columns.flatMap((p) => p.getLeafColumns());
        return g(m);
      }
      return [d];
    }, x(e.options, "debugColumns", "column.getLeafColumns"))
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
    e.getHeaderGroups = R(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (r, n, t, i) => {
      var o, l;
      const s = (o = t?.map((d) => n.find((g) => g.id === d)).filter(Boolean)) != null ? o : [], a = (l = i?.map((d) => n.find((g) => g.id === d)).filter(Boolean)) != null ? l : [], u = n.filter((d) => !(t != null && t.includes(d.id)) && !(i != null && i.includes(d.id)));
      return De(r, [...s, ...u, ...a], e);
    }, x(e.options, B, "getHeaderGroups")), e.getCenterHeaderGroups = R(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (r, n, t, i) => (n = n.filter((o) => !(t != null && t.includes(o.id)) && !(i != null && i.includes(o.id))), De(r, n, e, "center")), x(e.options, B, "getCenterHeaderGroups")), e.getLeftHeaderGroups = R(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left], (r, n, t) => {
      var i;
      const o = (i = t?.map((l) => n.find((s) => s.id === l)).filter(Boolean)) != null ? i : [];
      return De(r, o, e, "left");
    }, x(e.options, B, "getLeftHeaderGroups")), e.getRightHeaderGroups = R(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.right], (r, n, t) => {
      var i;
      const o = (i = t?.map((l) => n.find((s) => s.id === l)).filter(Boolean)) != null ? i : [];
      return De(r, o, e, "right");
    }, x(e.options, B, "getRightHeaderGroups")), e.getFooterGroups = R(() => [e.getHeaderGroups()], (r) => [...r].reverse(), x(e.options, B, "getFooterGroups")), e.getLeftFooterGroups = R(() => [e.getLeftHeaderGroups()], (r) => [...r].reverse(), x(e.options, B, "getLeftFooterGroups")), e.getCenterFooterGroups = R(() => [e.getCenterHeaderGroups()], (r) => [...r].reverse(), x(e.options, B, "getCenterFooterGroups")), e.getRightFooterGroups = R(() => [e.getRightHeaderGroups()], (r) => [...r].reverse(), x(e.options, B, "getRightFooterGroups")), e.getFlatHeaders = R(() => [e.getHeaderGroups()], (r) => r.map((n) => n.headers).flat(), x(e.options, B, "getFlatHeaders")), e.getLeftFlatHeaders = R(() => [e.getLeftHeaderGroups()], (r) => r.map((n) => n.headers).flat(), x(e.options, B, "getLeftFlatHeaders")), e.getCenterFlatHeaders = R(() => [e.getCenterHeaderGroups()], (r) => r.map((n) => n.headers).flat(), x(e.options, B, "getCenterFlatHeaders")), e.getRightFlatHeaders = R(() => [e.getRightHeaderGroups()], (r) => r.map((n) => n.headers).flat(), x(e.options, B, "getRightFlatHeaders")), e.getCenterLeafHeaders = R(() => [e.getCenterFlatHeaders()], (r) => r.filter((n) => {
      var t;
      return !((t = n.subHeaders) != null && t.length);
    }), x(e.options, B, "getCenterLeafHeaders")), e.getLeftLeafHeaders = R(() => [e.getLeftFlatHeaders()], (r) => r.filter((n) => {
      var t;
      return !((t = n.subHeaders) != null && t.length);
    }), x(e.options, B, "getLeftLeafHeaders")), e.getRightLeafHeaders = R(() => [e.getRightFlatHeaders()], (r) => r.filter((n) => {
      var t;
      return !((t = n.subHeaders) != null && t.length);
    }), x(e.options, B, "getRightLeafHeaders")), e.getLeafHeaders = R(() => [e.getLeftHeaderGroups(), e.getCenterHeaderGroups(), e.getRightHeaderGroups()], (r, n, t) => {
      var i, o, l, s, a, u;
      return [...(i = (o = r[0]) == null ? void 0 : o.headers) != null ? i : [], ...(l = (s = n[0]) == null ? void 0 : s.headers) != null ? l : [], ...(a = (u = t[0]) == null ? void 0 : u.headers) != null ? a : []].map((f) => f.getLeafHeaders()).flat();
    }, x(e.options, B, "getLeafHeaders"));
  }
};
function De(e, r, n, t) {
  var i, o;
  let l = 0;
  const s = function(g, c) {
    c === void 0 && (c = 1), l = Math.max(l, c), g.filter((m) => m.getIsVisible()).forEach((m) => {
      var p;
      (p = m.columns) != null && p.length && s(m.columns, c + 1);
    }, 0);
  };
  s(e);
  let a = [];
  const u = (g, c) => {
    const m = {
      depth: c,
      id: [t, `${c}`].filter(Boolean).join("_"),
      headers: []
    }, p = [];
    g.forEach((S) => {
      const h = [...p].reverse()[0], C = S.column.depth === m.depth;
      let y, E = !1;
      if (C && S.column.parent ? y = S.column.parent : (y = S.column, E = !0), h && h?.column === y)
        h.subHeaders.push(S);
      else {
        const I = gt(n, y, {
          id: [t, c, y.id, S?.id].filter(Boolean).join("_"),
          isPlaceholder: E,
          placeholderId: E ? `${p.filter((_) => _.column === y).length}` : void 0,
          depth: c,
          index: p.length
        });
        I.subHeaders.push(S), p.push(I);
      }
      m.headers.push(S), S.headerGroup = m;
    }), a.push(m), c > 0 && u(p, c - 1);
  }, f = r.map((g, c) => gt(n, g, {
    depth: l,
    index: c
  }));
  u(f, l - 1), a.reverse();
  const d = (g) => g.filter((m) => m.column.getIsVisible()).map((m) => {
    let p = 0, S = 0, h = [0];
    m.subHeaders && m.subHeaders.length ? (h = [], d(m.subHeaders).forEach((y) => {
      let {
        colSpan: E,
        rowSpan: I
      } = y;
      p += E, h.push(I);
    })) : p = 1;
    const C = Math.min(...h);
    return S = S + C, m.colSpan = p, m.rowSpan = S, {
      colSpan: p,
      rowSpan: S
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
    getAllCells: R(() => [e.getAllLeafColumns()], (a) => a.map((u) => jt(e, s, u, u.id)), x(e.options, "debugRows", "getAllCells")),
    _getAllCellsByColumnId: R(() => [s.getAllCells()], (a) => a.reduce((u, f) => (u[f.column.id] = f, u), {}), x(e.options, "debugRows", "getAllCellsByColumnId"))
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
Ct.autoRemove = (e) => ne(e);
const yt = (e, r, n) => {
  var t;
  return !!(!((t = e.getValue(r)) == null || (t = t.toString()) == null) && t.includes(n));
};
yt.autoRemove = (e) => ne(e);
const Rt = (e, r, n) => {
  var t;
  return ((t = e.getValue(r)) == null || (t = t.toString()) == null ? void 0 : t.toLowerCase()) === n?.toLowerCase();
};
Rt.autoRemove = (e) => ne(e);
const xt = (e, r, n) => {
  var t;
  return (t = e.getValue(r)) == null ? void 0 : t.includes(n);
};
xt.autoRemove = (e) => ne(e);
const _t = (e, r, n) => !n.some((t) => {
  var i;
  return !((i = e.getValue(r)) != null && i.includes(t));
});
_t.autoRemove = (e) => ne(e) || !(e != null && e.length);
const Et = (e, r, n) => n.some((t) => {
  var i;
  return (i = e.getValue(r)) == null ? void 0 : i.includes(t);
});
Et.autoRemove = (e) => ne(e) || !(e != null && e.length);
const bt = (e, r, n) => e.getValue(r) === n;
bt.autoRemove = (e) => ne(e);
const $t = (e, r, n) => e.getValue(r) == n;
$t.autoRemove = (e) => ne(e);
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
at.autoRemove = (e) => ne(e) || ne(e[0]) && ne(e[1]);
const le = {
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
function ne(e) {
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
    onColumnFiltersChange: Q("columnFilters", e),
    filterFromLeafRows: !1,
    maxLeafRowFilterDepth: 100
  }),
  createColumn: (e, r) => {
    e.getAutoFilterFn = () => {
      const n = r.getCoreRowModel().flatRows[0], t = n?.getValue(e.id);
      return typeof t == "string" ? le.includesString : typeof t == "number" ? le.inNumberRange : typeof t == "boolean" || t !== null && typeof t == "object" ? le.equals : Array.isArray(t) ? le.arrIncludes : le.weakEquals;
    }, e.getFilterFn = () => {
      var n, t;
      return Be(e.columnDef.filterFn) ? e.columnDef.filterFn : e.columnDef.filterFn === "auto" ? e.getAutoFilterFn() : (
        // @ts-ignore
        (n = (t = r.options.filterFns) == null ? void 0 : t[e.columnDef.filterFn]) != null ? n : le[e.columnDef.filterFn]
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
        const i = e.getFilterFn(), o = t?.find((f) => f.id === e.id), l = pe(n, o ? o.value : void 0);
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
        return (o = pe(r, i)) == null ? void 0 : o.filter((l) => {
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
    onGroupingChange: Q("grouping", e),
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
    onColumnOrderChange: Q("columnOrder", e)
  }),
  createColumn: (e, r) => {
    e.getIndex = R((n) => [Pe(r, n)], (n) => n.findIndex((t) => t.id === e.id), x(r.options, "debugColumns", "getIndex")), e.getIsFirstColumn = (n) => {
      var t;
      return ((t = Pe(r, n)[0]) == null ? void 0 : t.id) === e.id;
    }, e.getIsLastColumn = (n) => {
      var t;
      const i = Pe(r, n);
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
      return an(o, n, t);
    }, x(e.options, "debugTable", "_getOrderColumnsFn"));
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
    onColumnPinningChange: Q("columnPinning", e)
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
      return e.setColumnPinning(r ? Xe() : (n = (t = e.initialState) == null ? void 0 : t.columnPinning) != null ? n : Xe());
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
    onColumnSizingChange: Q("columnSizing", e),
    onColumnSizingInfoChange: Q("columnSizingInfo", e)
  }),
  createColumn: (e, r) => {
    e.getSize = () => {
      var n, t, i;
      const o = r.getState().columnSizing[e.id];
      return Math.min(Math.max((n = e.columnDef.minSize) != null ? n : ke.minSize, (t = o ?? e.columnDef.size) != null ? t : ke.size), (i = e.columnDef.maxSize) != null ? i : ke.maxSize);
    }, e.getStart = R((n) => [n, Pe(r, n), r.getState().columnSizing], (n, t) => t.slice(0, e.getIndex(n)).reduce((i, o) => i + o.getSize(), 0), x(r.options, "debugColumns", "getStart")), e.getAfter = R((n) => [n, Pe(r, n), r.getState().columnSizing], (n, t) => t.slice(e.getIndex(n) + 1).reduce((i, o) => i + o.getSize(), 0), x(r.options, "debugColumns", "getAfter")), e.resetSize = () => {
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
        const l = e.getSize(), s = e ? e.getLeafHeaders().map((h) => [h.column.id, h.column.getSize()]) : [[t.id, t.getSize()]], a = Ue(o) ? Math.round(o.touches[0].clientX) : o.clientX, u = {}, f = (h, C) => {
          typeof C == "number" && (r.setColumnSizingInfo((y) => {
            var E, I;
            const _ = r.options.columnResizeDirection === "rtl" ? -1 : 1, $ = (C - ((E = y?.startOffset) != null ? E : 0)) * _, A = Math.max($ / ((I = y?.startSize) != null ? I : 0), -0.999999);
            return y.columnSizingStart.forEach((T) => {
              let [O, V] = T;
              u[O] = Math.round(Math.max(V + V * A, 0) * 100) / 100;
            }), {
              ...y,
              deltaOffset: $,
              deltaPercentage: A
            };
          }), (r.options.columnResizeMode === "onChange" || h === "end") && r.setColumnSizing((y) => ({
            ...y,
            ...u
          })));
        }, d = (h) => f("move", h), g = (h) => {
          f("end", h), r.setColumnSizingInfo((C) => ({
            ...C,
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
        }, p = {
          moveHandler: (h) => (h.cancelable && (h.preventDefault(), h.stopPropagation()), d(h.touches[0].clientX), !1),
          upHandler: (h) => {
            var C;
            c?.removeEventListener("touchmove", p.moveHandler), c?.removeEventListener("touchend", p.upHandler), h.cancelable && (h.preventDefault(), h.stopPropagation()), g((C = h.touches[0]) == null ? void 0 : C.clientX);
          }
        }, S = fn() ? {
          passive: !1
        } : !1;
        Ue(o) ? (c?.addEventListener("touchmove", p.moveHandler, S), c?.addEventListener("touchend", p.upHandler, S)) : (c?.addEventListener("mousemove", m.moveHandler, S), c?.addEventListener("mouseup", m.upHandler, S)), r.setColumnSizingInfo((h) => ({
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
    onColumnVisibilityChange: Q("columnVisibility", e)
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
function Pe(e, r) {
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
    onGlobalFilterChange: Q("globalFilter", e),
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
    e.getGlobalAutoFilterFn = () => le.includesString, e.getGlobalFilterFn = () => {
      var r, n;
      const {
        globalFilterFn: t
      } = e.options;
      return Be(t) ? t : t === "auto" ? e.getGlobalAutoFilterFn() : (r = (n = e.options.filterFns) == null ? void 0 : n[t]) != null ? r : le[t];
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
    onExpandedChange: Q("expanded", e),
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
    onPaginationChange: Q("pagination", e)
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
      const i = (o) => pe(t, o);
      return e.options.onPaginationChange == null ? void 0 : e.options.onPaginationChange(i);
    }, e.resetPagination = (t) => {
      var i;
      e.setPagination(t ? Ke() : (i = e.initialState.pagination) != null ? i : Ke());
    }, e.setPageIndex = (t) => {
      e.setPagination((i) => {
        let o = pe(t, i.pageIndex);
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
        const o = Math.max(1, pe(t, i.pageSize)), l = i.pageSize * i.pageIndex, s = Math.floor(l / o);
        return {
          ...i,
          pageIndex: s,
          pageSize: o
        };
      });
    }, e.setPageCount = (t) => e.setPagination((i) => {
      var o;
      let l = pe(t, (o = e.options.pageCount) != null ? o : -1);
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
}, Qe = () => ({
  top: [],
  bottom: []
}), wn = {
  getInitialState: (e) => ({
    rowPinning: Qe(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowPinningChange: Q("rowPinning", e)
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
            top: ((d = a?.top) != null ? d : []).filter((p) => !(s != null && s.has(p))),
            bottom: [...((g = a?.bottom) != null ? g : []).filter((p) => !(s != null && s.has(p))), ...Array.from(s)]
          };
        }
        if (n === "top") {
          var c, m;
          return {
            top: [...((c = a?.top) != null ? c : []).filter((p) => !(s != null && s.has(p))), ...Array.from(s)],
            bottom: ((m = a?.bottom) != null ? m : []).filter((p) => !(s != null && s.has(p)))
          };
        }
        return {
          top: ((u = a?.top) != null ? u : []).filter((p) => !(s != null && s.has(p))),
          bottom: ((f = a?.bottom) != null ? f : []).filter((p) => !(s != null && s.has(p)))
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
    }, e.getTopRows = R(() => [e.getRowModel().rows, e.getState().rowPinning.top], (r, n) => e._getPinnedRows(r, n, "top"), x(e.options, "debugRows", "getTopRows")), e.getBottomRows = R(() => [e.getRowModel().rows, e.getState().rowPinning.bottom], (r, n) => e._getPinnedRows(r, n, "bottom"), x(e.options, "debugRows", "getBottomRows")), e.getCenterRows = R(() => [e.getRowModel().rows, e.getState().rowPinning.top, e.getState().rowPinning.bottom], (r, n, t) => {
      const i = /* @__PURE__ */ new Set([...n ?? [], ...t ?? []]);
      return r.filter((o) => !i.has(o.id));
    }, x(e.options, "debugRows", "getCenterRows"));
  }
}, Cn = {
  getInitialState: (e) => ({
    rowSelection: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowSelectionChange: Q("rowSelection", e),
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
    }), e.getPreSelectedRowModel = () => e.getCoreRowModel(), e.getSelectedRowModel = R(() => [e.getState().rowSelection, e.getCoreRowModel()], (r, n) => Object.keys(r).length ? Ze(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, x(e.options, "debugTable", "getSelectedRowModel")), e.getFilteredSelectedRowModel = R(() => [e.getState().rowSelection, e.getFilteredRowModel()], (r, n) => Object.keys(r).length ? Ze(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, x(e.options, "debugTable", "getFilteredSelectedRowModel")), e.getGroupedSelectedRowModel = R(() => [e.getState().rowSelection, e.getSortedRowModel()], (r, n) => Object.keys(r).length ? Ze(e, n) : {
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
const ot = /([0-9]+)/gm, yn = (e, r, n) => Mt(he(e.getValue(n)).toLowerCase(), he(r.getValue(n)).toLowerCase()), Rn = (e, r, n) => Mt(he(e.getValue(n)), he(r.getValue(n))), xn = (e, r, n) => ct(he(e.getValue(n)).toLowerCase(), he(r.getValue(n)).toLowerCase()), _n = (e, r, n) => ct(he(e.getValue(n)), he(r.getValue(n))), En = (e, r, n) => {
  const t = e.getValue(n), i = r.getValue(n);
  return t > i ? 1 : t < i ? -1 : 0;
}, bn = (e, r, n) => ct(e.getValue(n), r.getValue(n));
function ct(e, r) {
  return e === r ? 0 : e > r ? 1 : -1;
}
function he(e) {
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
const Fe = {
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
    onSortingChange: Q("sorting", e),
    isMultiSortEvent: (r) => r.shiftKey
  }),
  createColumn: (e, r) => {
    e.getAutoSortingFn = () => {
      const n = r.getFilteredRowModel().flatRows.slice(10);
      let t = !1;
      for (const i of n) {
        const o = i?.getValue(e.id);
        if (Object.prototype.toString.call(o) === "[object Date]")
          return Fe.datetime;
        if (typeof o == "string" && (t = !0, o.split(ot).length > 1))
          return Fe.alphanumeric;
      }
      return t ? Fe.text : Fe.basic;
    }, e.getAutoSortDir = () => {
      const n = r.getFilteredRowModel().flatRows[0];
      return typeof n?.getValue(e.id) == "string" ? "asc" : "desc";
    }, e.getSortingFn = () => {
      var n, t;
      if (!e)
        throw new Error();
      return Be(e.columnDef.sortingFn) ? e.columnDef.sortingFn : e.columnDef.sortingFn === "auto" ? e.getAutoSortingFn() : (n = (t = r.options.sortingFns) == null ? void 0 : t[e.columnDef.sortingFn]) != null ? n : Fe[e.columnDef.sortingFn];
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
      const c = pe(g, i.options);
      i.options = l(c);
    },
    getState: () => i.options.state,
    setState: (g) => {
      i.options.onStateChange == null || i.options.onStateChange(g);
    },
    _getRowId: (g, c, m) => {
      var p;
      return (p = i.options.getRowId == null ? void 0 : i.options.getRowId(g, c, m)) != null ? p : `${m ? [m.id, c].join(".") : c}`;
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
    _getDefaultColumnDef: R(() => [i.options.defaultColumn], (g) => {
      var c;
      return g = (c = g) != null ? c : {}, {
        header: (m) => {
          const p = m.header.column.columnDef;
          return p.accessorKey ? p.accessorKey : p.accessorFn ? p.id : null;
        },
        // footer: props => props.header.column.id,
        cell: (m) => {
          var p, S;
          return (p = (S = m.renderValue()) == null || S.toString == null ? void 0 : S.toString()) != null ? p : null;
        },
        ...i._features.reduce((m, p) => Object.assign(m, p.getDefaultColumnDef == null ? void 0 : p.getDefaultColumnDef()), {}),
        ...g
      };
    }, x(e, "debugColumns", "_getDefaultColumnDef")),
    _getColumnDefs: () => i.options.columns,
    getAllColumns: R(() => [i._getColumnDefs()], (g) => {
      const c = function(m, p, S) {
        return S === void 0 && (S = 0), m.map((h) => {
          const C = qt(i, h, S, p), y = h;
          return C.columns = y.columns ? c(y.columns, C, S + 1) : [], C;
        });
      };
      return c(g);
    }, x(e, "debugColumns", "getAllColumns")),
    getAllFlatColumns: R(() => [i.getAllColumns()], (g) => g.flatMap((c) => c.getFlatColumns()), x(e, "debugColumns", "getAllFlatColumns")),
    _getAllFlatColumnsById: R(() => [i.getAllFlatColumns()], (g) => g.reduce((c, m) => (c[m.id] = m, c), {}), x(e, "debugColumns", "getAllFlatColumnsById")),
    getAllLeafColumns: R(() => [i.getAllColumns(), i._getOrderColumnsFn()], (g, c) => {
      let m = g.flatMap((p) => p.getLeafColumns());
      return c(m);
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
function On() {
  return (e) => R(() => [e.options.data], (r) => {
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
  }, x(e.options, "debugTable", "getRowModel", () => e._autoResetPageIndex()));
}
function pt(e, r) {
  return e ? In(e) ? /* @__PURE__ */ z.createElement(e, r) : e : null;
}
function In(e) {
  return Pn(e) || typeof e == "function" || An(e);
}
function Pn(e) {
  return typeof e == "function" && (() => {
    const r = Object.getPrototypeOf(e);
    return r.prototype && r.prototype.isReactComponent;
  })();
}
function An(e) {
  return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
function Vn(e) {
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
  stripedRows: p = !1,
  hoverableRow: S = !1,
  loading: h,
  loadingCustom: C,
  noResultMessage: y,
  onRowClick: E,
  totalItems: I,
  revealOnHoverColIds: _
}) {
  const $ = Y((w) => {
    w.currentTarget.querySelectorAll(".cell-content-reveal").forEach((P) => {
      P.style.opacity = "1";
    });
  }, []), A = Y((w) => {
    w.currentTarget.querySelectorAll(".cell-content-reveal").forEach((P) => {
      P.style.opacity = "";
    });
  }, []), T = fe(
    () => l ?? s,
    [l, s]
  ), O = H(null), V = H(null), [W, me] = J(null), [se, re] = J(0), D = (w, P) => {
    o && (P.preventDefault(), O.current = P.clientY, V.current = w, me(w), re(0), P.currentTarget.setPointerCapture(P.pointerId));
  }, F = (w) => {
    if (!o || O.current === null || V.current === null) return;
    const P = w.clientY - O.current;
    re(P);
    const j = 32, L = P > j ? 1 : P < -j ? -1 : 0;
    if (L === 0) return;
    const ee = V.current, N = ee + L;
    N < 0 || N >= e.getRowModel().rows.length || (T((te) => {
      const ie = [...te], [M] = ie.splice(ee, 1);
      return ie.splice(N, 0, M), ie;
    }), V.current = N, O.current = w.clientY, re(0), me(N));
  }, q = () => {
    O.current = null, V.current = null, me(null), re(0);
  }, [U, ve] = J(null), [ae, Z] = J(""), Se = (w) => {
    ve({
      rowId: w.row.id,
      colId: w.column.id
    }), Z(String(w.getValue() ?? ""));
  }, we = (w) => {
    s(
      (P) => P.map(
        (j, L) => L === w.row.index ? {
          ...j,
          [w.column.id]: ae
        } : j
      )
    ), ve(null);
  }, Re = (w) => !!(w.closest("button") || w.closest("a") || w.closest("input") || w.closest("select") || w.closest("textarea") || w.closest("[data-stop-row-click]")), oe = (w, P) => {
    const j = w.target;
    if (!Re(j) && !j.closest(".col-drag-handle")) {
      if (g?.clickRow) {
        const L = P.original.id ?? P.index;
        m((ee) => {
          const N = new Set(ee);
          return N.has(L) ? N.delete(L) : N.add(L), N;
        });
      }
      E && E(P.original);
    }
  };
  return /* @__PURE__ */ G("table", { className: `table table-body ${S ? "hoverable" : ""} ${p ? "striped" : ""}`, children: [
    /* @__PURE__ */ v(
      We,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ G("tbody", { children: [
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
          children: C
        }
      ) }),
      h === "placeholder" && (() => {
        const w = e.getAllColumns().length, P = e.getState().pagination?.pageSize || 10;
        return Array.from({ length: P }).map((j, L) => /* @__PURE__ */ v("tr", { className: "table-placeholder-row", children: Array.from({ length: w }).map((ee, N) => /* @__PURE__ */ v("td", { children: /* @__PURE__ */ v("div", { className: "table-placeholder-cell" }) }, `placeholder-cell-${L}-${N}`)) }, `placeholder-row-${L}`));
      })(),
      !h && e.getRowModel().rows.length === 0 && I === 0 && /* @__PURE__ */ v("tr", { className: "table-no-results-row", children: /* @__PURE__ */ v(
        "td",
        {
          colSpan: e.getAllColumns().length,
          style: { textAlign: "center", padding: "20px" },
          children: y
        }
      ) }),
      !h && e.getRowModel().rows.length > 0 && e.getRowModel().rows.map((w) => {
        const P = w.index, j = W === P, L = [];
        L.push(
          /* @__PURE__ */ v(
            "tr",
            {
              className: `${j ? "row-dragging" : ""}`,
              style: j ? {
                transform: `translateY(${se}px)`,
                position: "relative",
                zIndex: 50
              } : void 0,
              onPointerMove: F,
              onPointerUp: q,
              onMouseEnter: $,
              onMouseLeave: A,
              onClick: (M) => oe(M, {
                original: w.original,
                index: w.index
              }),
              children: w.getVisibleCells().map((M) => {
                const Ce = M.column.id, b = n.get(Ce), be = Ae(M.column, t), $e = U?.rowId === w.id && U?.colId === Ce, ye = [
                  b ? "is-sticky" : "",
                  b?.side === "left" ? "is-sticky-left" : "",
                  b?.side === "right" ? "is-sticky-right" : ""
                ].filter(Boolean).join(" "), ue = b ? b.side === "left" ? { "--sticky-left": `${b.offset}px` } : { "--sticky-right": `${b.offset}px` } : void 0;
                if (M.column.id === "__draggable__" && o)
                  return /* @__PURE__ */ v(
                    "td",
                    {
                      className: `${ye} align-center col-drag-handle`,
                      style: ue,
                      onPointerDown: (k) => D(P, k),
                      children: "☰"
                    },
                    M.id
                  );
                if (M.column.id === "__selectable__" && a) {
                  const k = M.row.original.id ?? M.row.index, Me = d.includes(k), je = u.has(k);
                  if (Me && a.hideDisabledSelects)
                    return /* @__PURE__ */ v(
                      "td",
                      {
                        className: `${ye} align-center`,
                        style: ue
                      },
                      M.id
                    );
                  const Ve = /* @__PURE__ */ v(
                    "input",
                    {
                      type: "checkbox",
                      checked: je,
                      disabled: Me,
                      onChange: () => {
                        f((xe) => {
                          const ze = new Set(xe);
                          return ze.has(k) ? ze.delete(k) : ze.add(k), ze;
                        });
                      }
                    }
                  );
                  return /* @__PURE__ */ v(
                    "td",
                    {
                      className: `${ye} align-center`,
                      style: ue,
                      children: a.revealOnHover ? /* @__PURE__ */ v("span", { className: "cell-content-reveal", children: Ve }) : Ve
                    },
                    M.id
                  );
                }
                if (M.column.id === "__expandable__" && g) {
                  const k = M.row.original.id ?? M.row.index, Me = c.has(k);
                  return /* @__PURE__ */ v(
                    "td",
                    {
                      className: `${ye} align-center`,
                      style: ue,
                      onClick: (je) => {
                        je.stopPropagation(), m((Ve) => {
                          const xe = new Set(Ve);
                          return xe.has(k) ? xe.delete(k) : xe.add(k), xe;
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
                    M.id
                  );
                }
                const kt = _?.has(Ce);
                return /* @__PURE__ */ v(
                  "td",
                  {
                    className: `${ye} align-${be}`,
                    style: ue,
                    onDoubleClick: () => {
                      i && Se(M);
                    },
                    children: $e ? /* @__PURE__ */ v(
                      "input",
                      {
                        autoFocus: !0,
                        value: ae,
                        onChange: (k) => Z(k.target.value),
                        onBlur: () => we(M),
                        onKeyDown: (k) => {
                          k.key === "Enter" && we(M), k.key === "Escape" && ve(null);
                        },
                        onFocus: (k) => k.currentTarget.select(),
                        style: {
                          width: "100%",
                          height: "100%",
                          boxSizing: "border-box",
                          fontSize: "inherit",
                          fontFamily: "inherit"
                        }
                      }
                    ) : kt ? /* @__PURE__ */ v("span", { className: "cell-content-reveal", children: pt(
                      M.column.columnDef.cell,
                      M.getContext()
                    ) }) : pt(
                      M.column.columnDef.cell,
                      M.getContext()
                    )
                  },
                  M.id
                );
              })
            },
            w.id
          )
        );
        const ee = w.original.id ?? w.index, N = g?.content?.(w.original), te = w.getVisibleCells(), ie = te.some(
          (M) => !!M.column.columnDef.meta?.expandable
        );
        return g && c.has(ee) && (N || ie) && (N ? L.push(
          /* @__PURE__ */ v("tr", { className: "expanded-row", children: /* @__PURE__ */ v("td", { colSpan: e.getAllColumns().length, className: "expanded-content", children: N }) }, `${w.id}-expanded`)
        ) : L.push(
          /* @__PURE__ */ v("tr", { className: "expanded-row", children: te.map((M) => {
            const Ce = M.column.id, b = n.get(Ce), be = Ae(M.column, t), $e = [
              b ? "is-sticky" : "",
              b?.side === "left" ? "is-sticky-left" : "",
              b?.side === "right" ? "is-sticky-right" : ""
            ].filter(Boolean).join(" "), ye = b ? b.side === "left" ? { "--sticky-left": `${b.offset}px` } : { "--sticky-right": `${b.offset}px` } : void 0, ue = M.column.columnDef.meta?.expandable;
            return /* @__PURE__ */ v(
              "td",
              {
                className: `${$e} align-${be} expanded-cell`,
                style: ye,
                children: ue ? ue.content(w.original) : null
              },
              `${M.id}-expanded`
            );
          }) }, `${w.id}-expanded`)
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
  return e.getAllLeafColumns().some(
    (s) => s.columnDef.meta?.internalFooter != null
  ) ? /* @__PURE__ */ v("div", { className: "table-scroll-sync", ref: i, children: /* @__PURE__ */ G("table", { className: "table table-internal-footer", children: [
    /* @__PURE__ */ v(
      We,
      {
        table: e,
        tableWidth: r
      }
    ),
    /* @__PURE__ */ v("tfoot", { children: /* @__PURE__ */ v("tr", { children: e.getAllLeafColumns().map((s) => {
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
  const l = Math.max(1, Math.ceil(r / n)), s = r === 0 ? 0 : (e - 1) * n + 1, a = Math.min(e * n, r), u = fe(
    () => kn(e, l),
    [e, l]
  ), f = fe(() => {
    const d = new Set(t);
    return d.add(n), Array.from(d).sort((g, c) => g - c);
  }, [t, n]);
  return /* @__PURE__ */ G("div", { className: "table-pagination", children: [
    /* @__PURE__ */ G("div", { className: "pagination-controls", children: [
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
    /* @__PURE__ */ G("div", { className: "pagination-info", children: [
      o ? o({ totalItems: r, displayedItems: a - s + (r === 0 ? 0 : 1), startItem: s, endItem: a, pageSize: n }) : /* @__PURE__ */ G(Nt, { children: [
        /* @__PURE__ */ G("span", { children: [
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
      /* @__PURE__ */ G("div", { className: "pagination-select", children: [
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
var Ge = Ft.Symbol, Ot = Object.prototype, qn = Ot.hasOwnProperty, Xn = Ot.toString, Oe = Ge ? Ge.toStringTag : void 0;
function Yn(e) {
  var r = qn.call(e, Oe), n = e[Oe];
  try {
    e[Oe] = void 0;
    var t = !0;
  } catch {
  }
  var i = Xn.call(e);
  return t && (r ? e[Oe] = n : delete e[Oe]), i;
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
  function c(_) {
    var $ = t, A = i;
    return t = i = void 0, u = _, l = e.apply(A, $), l;
  }
  function m(_) {
    return u = _, s = setTimeout(h, r), f ? c(_) : l;
  }
  function p(_) {
    var $ = _ - a, A = _ - u, T = r - $;
    return d ? cr(T, o - A) : T;
  }
  function S(_) {
    var $ = _ - a, A = _ - u;
    return a === void 0 || $ >= r || $ < 0 || d && A >= o;
  }
  function h() {
    var _ = Je();
    if (S(_))
      return C(_);
    s = setTimeout(h, p(_));
  }
  function C(_) {
    return s = void 0, g && t ? c(_) : (t = i = void 0, l);
  }
  function y() {
    s !== void 0 && clearTimeout(s), u = 0, t = a = i = s = void 0;
  }
  function E() {
    return s === void 0 ? l : C(Je());
  }
  function I() {
    var _ = Je(), $ = S(_);
    if (t = arguments, i = this, a = _, $) {
      if (s === void 0)
        return m(a);
      if (d)
        return clearTimeout(s), s = setTimeout(h, r), c(a);
    }
    return s === void 0 && (s = setTimeout(h, r)), l;
  }
  return I.cancel = y, I.flush = E, I;
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
var Ee = function() {
  return Ee = Object.assign || function(r) {
    for (var n, t = 1, i = arguments.length; t < i; t++) {
      n = arguments[t];
      for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
    }
    return r;
  }, Ee.apply(this, arguments);
};
function It(e) {
  return !e || !e.ownerDocument || !e.ownerDocument.defaultView ? window : e.ownerDocument.defaultView;
}
function Pt(e) {
  return !e || !e.ownerDocument ? document : e.ownerDocument;
}
var At = function(e) {
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
function Vt(e, r) {
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
  addClasses: Vt,
  canUseDOM: dt,
  classNamesToQuery: Lt,
  getElementDocument: Pt,
  getElementWindow: It,
  getOptions: At,
  removeClasses: zt
}), _e = null, St = null;
dt && window.addEventListener("resize", function() {
  St !== window.devicePixelRatio && (St = window.devicePixelRatio, _e = null);
});
function wt() {
  if (_e === null) {
    if (typeof document > "u")
      return _e = 0, _e;
    var e = document.body, r = document.createElement("div");
    r.classList.add("simplebar-hide-scrollbar"), e.appendChild(r);
    var n = r.getBoundingClientRect().right;
    e.removeChild(r), _e = n;
  }
  return _e;
}
var ce = It, et = Pt, pr = At, de = Vt, ge = zt, X = Lt, Ie = (
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
        var o, l, s, a, u, f, d, g, c, m, p;
        if (!(!t.draggedAxis || !t.contentWrapperEl)) {
          var S, h = t.axis[t.draggedAxis].track, C = (l = (o = h.rect) === null || o === void 0 ? void 0 : o[t.axis[t.draggedAxis].sizeAttr]) !== null && l !== void 0 ? l : 0, y = t.axis[t.draggedAxis].scrollbar, E = (a = (s = t.contentWrapperEl) === null || s === void 0 ? void 0 : s[t.axis[t.draggedAxis].scrollSizeAttr]) !== null && a !== void 0 ? a : 0, I = parseInt((f = (u = t.elStyles) === null || u === void 0 ? void 0 : u[t.axis[t.draggedAxis].sizeAttr]) !== null && f !== void 0 ? f : "0px", 10);
          i.preventDefault(), i.stopPropagation(), t.draggedAxis === "y" ? S = i.pageY : S = i.pageX;
          var _ = S - ((g = (d = h.rect) === null || d === void 0 ? void 0 : d[t.axis[t.draggedAxis].offsetAttr]) !== null && g !== void 0 ? g : 0) - t.axis[t.draggedAxis].dragOffset;
          _ = t.draggedAxis === "x" && t.isRtl ? ((m = (c = h.rect) === null || c === void 0 ? void 0 : c[t.axis[t.draggedAxis].sizeAttr]) !== null && m !== void 0 ? m : 0) - y.size - _ : _;
          var $ = _ / (C - y.size), A = $ * (E - I);
          t.draggedAxis === "x" && t.isRtl && (A = !((p = e.getRtlHelpers()) === null || p === void 0) && p.isScrollingToNegative ? -A : A), t.contentWrapperEl[t.axis[t.draggedAxis].scrollOffsetAttr] = A;
        }
      }, this.onEndDrag = function(i) {
        t.isDragging = !1;
        var o = et(t.el), l = ce(t.el);
        i.preventDefault(), i.stopPropagation(), ge(t.el, t.classNames.dragging), t.onStopScrolling(), o.removeEventListener("mousemove", t.drag, !0), o.removeEventListener("mouseup", t.onEndDrag, !0), t.removePreventClickId = l.setTimeout(function() {
          o.removeEventListener("click", t.preventClick, !0), o.removeEventListener("dblclick", t.preventClick, !0), t.removePreventClickId = null;
        });
      }, this.preventClick = function(i) {
        i.preventDefault(), i.stopPropagation();
      }, this.el = r, this.options = Ee(Ee({}, e.defaultOptions), n), this.classNames = Ee(Ee({}, e.defaultOptions.classNames), n.classNames), this.axis = {
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
      var n = r.getBoundingClientRect(), t = et(r), i = ce(r);
      return {
        top: n.top + (i.pageYOffset || t.documentElement.scrollTop),
        left: n.left + (i.pageXOffset || t.documentElement.scrollLeft)
      };
    }, e.prototype.init = function() {
      dt && (this.initDOM(), this.rtlHelpers = e.getRtlHelpers(), this.scrollbarWidth = this.getScrollbarWidth(), this.recalculate(), this.initListeners());
    }, e.prototype.initDOM = function() {
      var r, n;
      this.wrapperEl = this.el.querySelector(X(this.classNames.wrapper)), this.contentWrapperEl = this.options.scrollableNode || this.el.querySelector(X(this.classNames.contentWrapper)), this.contentEl = this.options.contentNode || this.el.querySelector(X(this.classNames.contentEl)), this.offsetEl = this.el.querySelector(X(this.classNames.offset)), this.maskEl = this.el.querySelector(X(this.classNames.mask)), this.placeholderEl = this.findChild(this.wrapperEl, X(this.classNames.placeholder)), this.heightAutoObserverWrapperEl = this.el.querySelector(X(this.classNames.heightAutoObserverWrapperEl)), this.heightAutoObserverEl = this.el.querySelector(X(this.classNames.heightAutoObserverEl)), this.axis.x.track.el = this.findChild(this.el, "".concat(X(this.classNames.track)).concat(X(this.classNames.horizontal))), this.axis.y.track.el = this.findChild(this.el, "".concat(X(this.classNames.track)).concat(X(this.classNames.vertical))), this.axis.x.scrollbar.el = ((r = this.axis.x.track.el) === null || r === void 0 ? void 0 : r.querySelector(X(this.classNames.scrollbar))) || null, this.axis.y.scrollbar.el = ((n = this.axis.y.track.el) === null || n === void 0 ? void 0 : n.querySelector(X(this.classNames.scrollbar))) || null, this.options.autoHide || (de(this.axis.x.scrollbar.el, this.classNames.visible), de(this.axis.y.scrollbar.el, this.classNames.visible));
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
      var i = et(this.el), o = ce(this.el), l = this.axis[n].scrollbar, s = n === "y" ? r.pageY : r.pageX;
      this.axis[n].dragOffset = s - (((t = l.rect) === null || t === void 0 ? void 0 : t[this.axis[n].offsetAttr]) || 0), this.draggedAxis = n, de(this.el, this.classNames.dragging), i.addEventListener("mousemove", this.drag, !0), i.addEventListener("mouseup", this.onEndDrag, !0), this.removePreventClickId === null ? (i.addEventListener("click", this.preventClick, !0), i.addEventListener("dblclick", this.preventClick, !0)) : (o.clearTimeout(this.removePreventClickId), this.removePreventClickId = null);
    }, e.prototype.onTrackClick = function(r, n) {
      var t = this, i, o, l, s;
      n === void 0 && (n = "y");
      var a = this.axis[n];
      if (!(!this.options.clickOnTrack || !a.scrollbar.el || !this.contentWrapperEl)) {
        r.preventDefault();
        var u = ce(this.el);
        this.axis[n].scrollbar.rect = a.scrollbar.el.getBoundingClientRect();
        var f = this.axis[n].scrollbar, d = (o = (i = f.rect) === null || i === void 0 ? void 0 : i[this.axis[n].offsetAttr]) !== null && o !== void 0 ? o : 0, g = parseInt((s = (l = this.elStyles) === null || l === void 0 ? void 0 : l[this.axis[n].sizeAttr]) !== null && s !== void 0 ? s : "0px", 10), c = this.contentWrapperEl[this.axis[n].scrollOffsetAttr], m = n === "y" ? this.mouseY - d : this.mouseX - d, p = m < 0 ? -1 : 1, S = p === -1 ? c - g : c + g, h = 40, C = function() {
          t.contentWrapperEl && (p === -1 ? c > S && (c -= h, t.contentWrapperEl[t.axis[n].scrollOffsetAttr] = c, u.requestAnimationFrame(C)) : c < S && (c += h, t.contentWrapperEl[t.axis[n].scrollOffsetAttr] = c, u.requestAnimationFrame(C)));
        };
        C();
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
    }, e.getOptions = pr, e.helpers = fr, e;
  })()
), K = function() {
  return K = Object.assign || function(r) {
    for (var n, t = 1, i = arguments.length; t < i; t++) {
      n = arguments[t];
      for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
    }
    return r;
  }, K.apply(this, arguments);
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
    Object.prototype.hasOwnProperty.call(Ie.defaultOptions, c) ? u[c] = o[c] : f[c] = o[c];
  });
  var d = K(K({}, Ie.defaultOptions.classNames), u.classNames), g = K(K({}, i), { className: "".concat(d.contentWrapper).concat(i.className ? " ".concat(i.className) : ""), tabIndex: u.tabIndex || Ie.defaultOptions.tabIndex, role: "region", "aria-label": u.ariaLabel || Ie.defaultOptions.ariaLabel });
  return z.useEffect(function() {
    var c;
    return s.current = g.ref ? g.ref.current : s.current, l.current && (c = new Ie(l.current, K(K(K({}, u), s.current && {
      scrollableNode: s.current
    }), a.current && {
      contentNode: a.current
    })), typeof r == "function" ? r(c) : r && (r.current = c)), function() {
      c?.unMount(), c = null, typeof r == "function" && r(null);
    };
  }, []), z.createElement(
    "div",
    K({ "data-simplebar": "init", ref: l }, f),
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
          scrollableNodeProps: K(K({}, g), { ref: s }),
          contentNodeRef: a,
          contentNodeProps: {
            className: d.contentEl,
            ref: a
          }
        }) : z.createElement(
          "div",
          K({}, g),
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
  return Vn({
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
  const [r, n] = J(0);
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
  const e = H(null), r = H([]), n = Y((i) => {
    i && !r.current.includes(i) && r.current.push(i);
  }, []), t = Y(() => {
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
  const t = H(0), i = H(0), o = H(null), l = Y(
    (u) => {
      if (!o.current) return;
      const f = u.clientX - t.current, d = Math.max(n, i.current + f);
      e(o.current, d);
    },
    [n, e]
  ), s = Y(() => {
    o.current = null, document.removeEventListener("mousemove", l), document.removeEventListener("mouseup", s), r?.();
  }, [l, r]);
  return { startResize: Y(
    (u, f) => {
      u.preventDefault(), u.stopPropagation(), o.current = f.id, t.current = u.clientX, i.current = st(f.columnDef.meta?.widthSize), document.addEventListener("mousemove", l), document.addEventListener("mouseup", s);
    },
    [l, s]
  ) };
}
function Cr(e) {
  const [r, n] = J(!1);
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
  return fe(() => {
    const r = e.getAllLeafColumns(), n = /* @__PURE__ */ new Map();
    for (const l of r)
      n.set(l.id, st(l.columnDef.meta?.widthSize));
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
function Rr({ setColumnOrder: e }) {
  const r = H(null), n = H(null), t = H(null), i = H(null), o = H(null), l = H(0), s = H(0), a = H([]), u = H(() => {
  }), f = H(() => {
  }), d = Y(() => {
    const S = Array.from(
      document.querySelectorAll("th[data-col-id]")
    );
    a.current = S.filter((h) => h.dataset.reorderable !== "false").map((h) => {
      const C = h.getBoundingClientRect();
      return {
        id: h.dataset.colId,
        left: C.left,
        right: C.right
      };
    }).sort((h, C) => h.left - C.left);
  }, []), g = Y((S, h, C) => {
    const y = S.getBoundingClientRect();
    let E = S.parentElement;
    for (; E && !E.classList.contains("super-table-wrapper"); )
      E = E.parentElement;
    const I = E?.querySelector(".table-internal-footer"), _ = E?.querySelector(".internal-table"), $ = I ?? _, T = ($ ? $.getBoundingClientRect().bottom : y.bottom) - y.top, O = document.createElement("div");
    O.classList.add("table-col-ghost");
    const V = window.getComputedStyle(S), W = document.createElement("div");
    return W.classList.add("table-col-ghost-header"), W.style.height = `${y.height}px`, W.style.fontFamily = V.fontFamily, W.style.fontSize = V.fontSize, W.style.fontWeight = V.fontWeight, W.style.fontStyle = V.fontStyle, W.style.letterSpacing = V.letterSpacing, W.style.color = V.color, W.innerHTML = S.innerHTML, O.appendChild(W), O.style.position = "fixed", O.style.left = `${h}px`, O.style.top = `${C}px`, O.style.width = `${y.width}px`, O.style.height = `${T}px`, O.style.pointerEvents = "none", O.style.zIndex = "9999", O.style.willChange = "left, top", O.style.transition = "none", document.body.appendChild(O), O;
  }, []), c = Y(() => {
    const S = document.createElement("div");
    return S.className = "table-col-drop-indicator", S.style.position = "fixed", S.style.pointerEvents = "none", S.style.zIndex = "10000", S.style.display = "none", document.body.appendChild(S), S;
  }, []), m = Y((S, h) => {
    const C = i.current;
    if (!C) return;
    const y = document.querySelector(`th[data-col-id="${S}"]`);
    if (!y) {
      C.style.display = "none";
      return;
    }
    const E = y.getBoundingClientRect(), I = h < E.left + E.width / 2, _ = E.top;
    let $ = y.parentElement;
    for (; $ && !$.classList.contains("super-table-wrapper"); )
      $ = $.parentElement;
    const A = $?.querySelector(".table-internal-footer"), T = $?.querySelector(".internal-table"), O = A ?? T, V = O ? O.getBoundingClientRect().bottom : E.bottom;
    C.style.display = "block", C.style.top = `${_}px`, C.style.height = `${V - _}px`, C.style.left = I ? `${E.left}px` : `${E.right}px`;
  }, []), p = Y(
    (S, h) => {
      r.current = S;
      const C = document.querySelector(`th[data-col-id="${S}"]`);
      C && (t.current = C, n.current = g(C, h.clientX, C.getBoundingClientRect().top), i.current = c(), C.classList.add("is-dragging-col"), C.style.opacity = "0.2", d(), l.current = h.clientX, s.current = h.clientY, document.body.style.cursor = "grabbing", document.addEventListener("pointermove", u.current), document.addEventListener("pointerup", f.current));
    },
    [g, c, d]
  );
  return u.current = (S) => {
    !r.current || !n.current || (l.current = S.clientX, s.current = S.clientY, !o.current && (o.current = requestAnimationFrame(() => {
      if (o.current = null, !r.current || !n.current) return;
      n.current.style.left = `${l.current}px`;
      const h = a.current;
      if (!h.length) return;
      let C = null;
      for (const y of h)
        if (y.id !== r.current && l.current >= y.left && l.current <= y.right) {
          C = y.id;
          break;
        }
      C ? m(C, l.current) : i.current && (i.current.style.display = "none"), !(!C || C === r.current) && (e((y) => {
        const E = y.indexOf(r.current), I = y.indexOf(C);
        if (E === -1 || I === -1 || E === I) return y;
        const _ = [...y];
        return _.splice(E, 1), _.splice(I, 0, r.current), _;
      }), requestAnimationFrame(() => {
        d();
      }));
    })));
  }, f.current = () => {
    o.current && (cancelAnimationFrame(o.current), o.current = null), n.current?.remove(), n.current = null, i.current?.remove(), i.current = null, t.current && (t.current.classList.remove("is-dragging-col"), t.current.style.opacity = ""), t.current = null, r.current = null, l.current = 0, s.current = 0, a.current = [], document.body.style.cursor = "", document.removeEventListener("pointermove", u.current), document.removeEventListener("pointerup", f.current);
  }, {
    startDrag: p
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
  sortableCol: s = !0,
  onSortChange: a,
  onDataChange: u,
  stripedRows: f = !1,
  defaultTextAlign: d = "left",
  editable: g = !1,
  draggable: c = !1,
  draggableSticky: m = !1,
  selectable: p,
  expandable: S,
  pagination: h,
  loading: C,
  loadingCustom: y,
  noResultMessage: E = "Nenhum resultado encontrado.",
  onRowClick: I,
  hoverableRow: _,
  borders: $ = "full",
  style: A = "default"
}) {
  const T = H(null), O = Y(
    (b) => {
      T.current = b;
    },
    []
  ), [V, W] = J(null), me = Y(
    (b) => {
      W(b), a?.(b);
    },
    [a]
  ), {
    bodyRef: se,
    registerSyncElement: re,
    onBodyScroll: D
  } = Sr(), F = vr(se), q = Cr(se), [U, ve] = J({}), ae = fe(
    () => new Set(p?.initialSelectRow || []),
    [p?.initialSelectRow]
  ), [Z, Se] = J(ae);
  Le(() => {
    p?.initialSelectRow && Se(new Set(p.initialSelectRow));
  }, [p?.initialSelectRow]), Le(() => {
    p?.onSelectedRowsChange?.(Array.from(Z));
  }, [Z, p]);
  const [we, Re] = J(/* @__PURE__ */ new Set()), oe = fe(
    () => _r(
      (() => {
        const b = [];
        return c && b.push(Er(m)), p && b.push(br(
          p.sticky,
          p.label
        )), S && b.push($r(S.sticky)), [...b, ...r];
      })()
    ),
    [
      r,
      c,
      m,
      p,
      S
    ]
  ), w = fe(
    () => new Set(
      oe.filter((b) => b.meta?.revealOnHover).map((b) => b.id)
    ),
    [oe]
  ), [P, j] = J(
    () => oe.map((b) => b.id)
  ), [L, ee] = J(n);
  Le(() => {
    ee(n);
  }, [n]), Le(() => {
    u?.(L);
  }, [L, u]);
  const N = fe(
    () => oe.map((b) => ({
      ...b,
      meta: {
        ...b.meta,
        widthSize: U[b.id] ?? b.meta?.widthSize
      }
    })),
    [oe, U]
  ), te = mr(
    N,
    L,
    P,
    j
  ), ie = yr(te), { startResize: M } = wr({
    onResize: (b, be) => {
      ve(($e) => ({
        ...$e,
        [b]: `${be}px`
      }));
    },
    onResizeEnd: () => {
      requestAnimationFrame(() => {
        T.current?.recalculate();
      });
    }
  }), { startDrag: Ce } = Rr({
    setColumnOrder: j
  });
  return lt(() => {
    T.current?.recalculate();
  }, [q]), /* @__PURE__ */ G("div", { id: e, className: `super-table-wrapper borders-${$} style-${A}`, style: { height: i }, children: [
    /* @__PURE__ */ v(
      Tt,
      {
        table: te,
        scrollRef: re,
        tableWidth: F,
        stickyById: ie,
        resizableCol: o,
        reorderableCol: l,
        sortableCol: s,
        sortState: V,
        setSortState: me,
        onResizeStart: M,
        onDragStart: Ce,
        defaultTextAlign: d,
        selectable: p,
        selectedRows: Z,
        setSelectedRows: Se,
        disableSelectRow: p?.disableSelectRow || [],
        data: n,
        expandable: S,
        expandedRows: we,
        setExpandedRows: Re
      }
    ),
    /* @__PURE__ */ G("div", { className: "internal-table", children: [
      /* @__PURE__ */ v(
        Gt,
        {
          table: te,
          scrollRef: re,
          tableWidth: F,
          stickyById: ie,
          defaultTextAlign: d
        }
      ),
      /* @__PURE__ */ G("div", { className: `table-body-area ${q ? "has-h-scroll" : "no-h-scroll"}`, children: [
        /* @__PURE__ */ v(
          Dt,
          {
            ref: O,
            className: "table-body-scroll",
            scrollableNodeProps: {
              ref: se,
              onScroll: D
            },
            children: /* @__PURE__ */ v(
              zn,
              {
                table: te,
                tableWidth: F,
                stickyById: ie,
                defaultTextAlign: d,
                editable: g,
                draggable: c,
                setData: ee,
                setInternalData: ee,
                selectable: p,
                selectedRows: Z,
                setSelectedRows: Se,
                disableSelectRow: p?.disableSelectRow || [],
                expandable: S,
                expandedRows: we,
                setExpandedRows: Re,
                loading: C,
                loadingCustom: y,
                noResultMessage: E,
                onRowClick: I,
                totalItems: h?.totalItems,
                stripedRows: f,
                hoverableRow: _,
                revealOnHoverColIds: w
              }
            )
          }
        ),
        /* @__PURE__ */ v(
          Ln,
          {
            table: te,
            scrollRef: re,
            tableWidth: F,
            stickyById: ie,
            defaultTextAlign: d
          }
        )
      ] })
    ] }),
    t && /* @__PURE__ */ v(Dn, { table: te, children: t }),
    h && /* @__PURE__ */ v(
      Nn,
      {
        currentPage: h.currentPage,
        totalItems: h.totalItems,
        pageSize: h.pageSize,
        pageSizeOptions: h.pageSizeOptions,
        onPageChange: h.onPageChange,
        renderInfo: h.renderInfo
      }
    )
  ] });
}
export {
  Or as SuperTable
};
