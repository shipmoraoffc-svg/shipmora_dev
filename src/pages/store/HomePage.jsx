import { CATS, PRODUCTS } from "../../data/storeData";
import Card from "../../components/store/Card";

export default function HomePage({ flash, pad, go, goCat, setCart, wl, setWl, user, openLogin }) {
  const startDrag = (event) => {
    const carousel = event.currentTarget;
    carousel.dataset.dragging = "true";
    carousel.dataset.startX = String(event.pageX - carousel.offsetLeft);
    carousel.dataset.scrollLeft = String(carousel.scrollLeft);
    carousel.style.cursor = "grabbing";
    carousel.style.userSelect = "none";
  };

  const moveDrag = (event) => {
    const carousel = event.currentTarget;
    if (carousel.dataset.dragging !== "true") {
      return;
    }
    event.preventDefault();
    const x = event.pageX - carousel.offsetLeft;
    const walk = (x - Number(carousel.dataset.startX || 0)) * 1.5;
    carousel.scrollLeft = Number(carousel.dataset.scrollLeft || 0) - walk;
  };

  const stopDrag = (event) => {
    const carousel = event.currentTarget;
    carousel.dataset.dragging = "false";
    carousel.style.cursor = "grab";
    carousel.style.userSelect = "";
  };

  return (
    <>
      <div style={{ marginTop: 22, borderRadius: 22, overflow: "hidden", background: "linear-gradient(135deg,#1e1b4b 0%,#312e81 40%,#4c1d95 100%)", padding: "56px 44px", display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 320, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          {[0, 1, 2, 3, 4].map((index) => <div key={index} style={{ position: "absolute", borderRadius: "50%", background: "rgba(255,255,255,0.04)", width: 200 + index * 80, height: 200 + index * 80, top: `${-20 + index * 10}%`, right: `${-10 + index * 5}%` }} />)}
        </div>
        <div style={{ zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(99,102,241,0.3)", borderRadius: 20, padding: "6px 14px", marginBottom: 18 }}><span style={{ color: "#fbbf24" }}>⚡</span><span style={{ color: "#c4b5fd", fontSize: 13, fontWeight: 600 }}>Flash Sale — Ends in {pad(flash.h)}:{pad(flash.m)}:{pad(flash.s)}</span></div>
          <h1 style={{ margin: "0 0 14px", color: "#fff", fontSize: 40, fontWeight: 900, lineHeight: 1.1 }}>Everything<br /><span style={{ color: "#a5b4fc" }}>You Need,</span><br />Delivered Fast</h1>
          <p style={{ margin: "0 0 24px", color: "#c4b5fd", fontSize: 14, maxWidth: 400 }}>Shop 1M+ products across fashion, electronics, home & more.</p>
          <button onClick={() => go("flashSale")} style={{ background: "linear-gradient(135deg,#fbbf24,#f59e0b)", color: "#1e1b4b", border: "none", borderRadius: 11, padding: "12px 24px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>Flash Sale</button>
        </div>
        <div style={{ display: "flex", gap: 14, zIndex: 1 }}>
          {[{ emoji: "🎧", name: "Up to 60% off", color: "#fbbf24" }, { emoji: "👗", name: "Fashion Week", color: "#f472b6" }, { emoji: "📱", name: "Latest Gadgets", color: "#34d399" }].map((item) => (
            <div key={item.name} style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)", borderRadius: 14, padding: 18, textAlign: "center", border: "1px solid rgba(255,255,255,0.12)", minWidth: 90 }}>
              <div style={{ fontSize: 32 }}>{item.emoji}</div>
              <div style={{ color: item.color, fontWeight: 700, fontSize: 11, marginTop: 7 }}>{item.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 14 }}>Shop by Category</h2>
        <div id="cat-carousel" style={{ display: "flex", gap: 10, overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none", paddingBottom: 4, cursor: "grab" }} onMouseDown={startDrag} onMouseMove={moveDrag} onMouseUp={stopDrag} onMouseLeave={stopDrag}>
          {CATS.map((cat) => <button key={cat.id} onClick={() => goCat(cat.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, background: "#fff", border: "2px solid #f3f4f6", borderRadius: 14, padding: 0, cursor: "pointer", flexShrink: 0, width: 100, height: 100, boxShadow: "0 1px 4px rgba(0,0,0,0.05)", transition: "all 0.2s" }} onMouseEnter={(event) => { event.currentTarget.style.borderColor = "#6366f1"; event.currentTarget.style.transform = "translateY(-3px)"; event.currentTarget.style.boxShadow = "0 8px 20px rgba(99,102,241,0.15)"; event.currentTarget.style.background = "#f5f3ff"; }} onMouseLeave={(event) => { event.currentTarget.style.borderColor = "#f3f4f6"; event.currentTarget.style.transform = "none"; event.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)"; event.currentTarget.style.background = "#fff"; }}><span style={{ fontSize: 28, lineHeight: 1 }}>{cat.icon}</span><span style={{ fontSize: 10, fontWeight: 700, color: "#374151", textAlign: "center", lineHeight: 1.3, padding: "0 6px", width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cat.label}</span></button>)}
        </div>
      </div>
      <div style={{ marginTop: 24, background: "linear-gradient(135deg,#ef4444,#dc2626)", borderRadius: 18, padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}><span style={{ fontSize: 32 }}>⚡</span><div><p style={{ margin: 0, color: "#fff", fontSize: 18, fontWeight: 900 }}>Flash Sale!</p><p style={{ margin: 0, color: "#fca5a5", fontSize: 13 }}>Up to 70% off</p></div></div>
        <div style={{ display: "flex", gap: 7 }}>{[{ v: flash.h, l: "HRS" }, { v: flash.m, l: "MIN" }, { v: flash.s, l: "SEC" }].map((time) => <div key={time.l} style={{ background: "rgba(0,0,0,0.3)", borderRadius: 9, padding: "9px 12px", textAlign: "center", minWidth: 48 }}><div style={{ color: "#fff", fontSize: 20, fontWeight: 900 }}>{pad(time.v)}</div><div style={{ color: "#fca5a5", fontSize: 9, fontWeight: 700 }}>{time.l}</div></div>)}</div>
        <button onClick={() => go("flashSale")} style={{ background: "#fff", color: "#ef4444", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 800, cursor: "pointer", fontSize: 13 }}>Shop Now</button>
      </div>
      <div style={{ marginTop: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#111827" }}>🔥 Trending Products</h2>
          <button onClick={() => go("products")} style={{ background: "none", border: "none", color: "#6366f1", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>View All</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 18 }}>
          {PRODUCTS.slice(0, 8).map((product) => <Card key={product.id} p={product} setCart={setCart} wl={wl} setWl={setWl} user={user} onLogin={openLogin} />)}
        </div>
      </div>
      <div style={{ marginTop: 36, marginBottom: 44, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}>
        {[{ icon: "🚚", title: "Free Delivery", desc: "On orders above ₹999" }, { icon: "↩️", title: "Easy Returns", desc: "30-day return policy" }, { icon: "🔒", title: "Secure Payments", desc: "100% safe & encrypted" }, { icon: "🎧", title: "24/7 Support", desc: "Always here to help" }].map((item) => (
          <div key={item.title} style={{ background: "#fff", borderRadius: 14, padding: 18, textAlign: "center", border: "1px solid #f3f4f6" }}>
            <div style={{ fontSize: 32, marginBottom: 7 }}>{item.icon}</div>
            <p style={{ margin: "0 0 3px", fontWeight: 700, fontSize: 14, color: "#111827" }}>{item.title}</p>
            <p style={{ margin: 0, fontSize: 11, color: "#6b7280" }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}
