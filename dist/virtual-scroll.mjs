import { defineComponent as H, reactive as B, ref as g, onMounted as k, onActivated as T, nextTick as C, watch as w, computed as m, openBlock as u, createElementBlock as d, createElementVNode as A, normalizeStyle as D, unref as _, Fragment as E, renderList as F, renderSlot as h, createCommentVNode as b } from "vue";
const R = { key: 0 }, V = /* @__PURE__ */ H({
  __name: "Index",
  props: {
    dataSet: {
      type: Array,
      required: !0
    },
    scrollBottomHandler: {
      type: Function
    },
    loadOrEndDataToolTip: {
      type: Object,
      default: "\u6B63\u5728\u52AA\u529B\u52A0\u8F7D\u4E2D..."
    }
  },
  emits: ["scrollBottomHandler"],
  setup(l, { emit: c }) {
    const o = l, e = B({
      itemCount: 0,
      startIdx: 0,
      curScorllTop: 0
    }), n = g(), r = g();
    k(async () => {
      window.onresize = () => {
        p();
      };
    }), T(() => {
      C(() => {
        n.value.scrollTop = e.curScorllTop;
      });
    }), w(
      () => [o.dataSet, r.value],
      () => {
        p();
      }
    );
    const x = m(() => {
      let t = v();
      return o.dataSet.slice(t, f.value);
    }), f = m(() => {
      let t = e.startIdx + e.itemCount * 2;
      return o.dataSet[t] || (t = o.dataSet.length - 1), t;
    }), S = m(() => {
      let t = v(), a = r.value ? r.value[0]?.offsetHeight : 100, s = (o.dataSet.length - f.value) * a;
      return {
        paddingTop: `${a * t}px`,
        paddingBottom: `${s}px`
      };
    }), p = () => {
      let t = r.value ? r.value[0]?.offsetHeight : 100;
      e.itemCount = ~~(n.value.offsetHeight / t) + 2;
    }, I = async () => {
      let a = 1e3 / 30, s = Date.now();
      requestAnimationFrame(() => {
        let i = Date.now();
        y(), i - s >= a && (s = i, requestAnimationFrame(arguments.callee));
      });
    }, y = async () => {
      e.curScorllTop = n.value.scrollTop;
      let t = ~~(n.value.scrollTop / r.value[0]?.offsetHeight);
      t !== e.startIdx && (e.startIdx = t, e.startIdx + e.itemCount > o.dataSet.length - 1 && (console.log("\u5230\u5E95\u4E86"), c("scrollBottomHandler")));
    }, v = () => {
      let t = 0;
      return e.startIdx <= e.itemCount ? t = 0 : t = e.startIdx - e.itemCount, t;
    };
    return (t, a) => (u(), d("article", {
      class: "visual-scroll",
      ref_key: "scrollRef",
      ref: n,
      onScrollPassive: I
    }, [
      A("div", {
        style: D(_(S))
      }, [
        (u(!0), d(E, null, F(_(x), (s, i) => (u(), d("span", {
          class: "item",
          ref_for: !0,
          ref_key: "itemRef",
          ref: r
        }, [
          h(t.$slots, "item", { data: s }, void 0, !0)
        ], 512))), 256)),
        o.dataSet.length > e.itemCount ? (u(), d("div", R, [
          h(t.$slots, "toolTip", {}, void 0, !0)
        ])) : b("", !0)
      ], 4)
    ], 544));
  }
});
const $ = (l, c) => {
  const o = l.__vccOpts || l;
  for (const [e, n] of c)
    o[e] = n;
  return o;
}, q = /* @__PURE__ */ $(V, [["__scopeId", "data-v-be8e0dfc"]]), L = (l) => (l.install = function(c) {
  c.component(l.name, l);
}, l), z = L(q);
export {
  z as llcVirtualScroll
};
//# sourceMappingURL=virtual-scroll.mjs.map
