import { CATS } from "../../data/storeData";
import Card from "../../components/store/Card";

function FilterButtons({ catFilter, setCatFilter, activeColor, activeBg, allLabel = "All", showIcons = false }) {
  return (
    <div style={{ display: "flex", gap: 7, marginBottom: 18, flexWrap: "wrap" }}>
      <button onClick={() => setCatFilter("all")} style={{ padding: "5px 12px", borderRadius: 18, border: "2px solid", borderColor: catFilter === "all" ? activeColor : "#e5e7eb", background: catFilter === "all" ? activeBg : "#fff", color: catFilter === "all" ? activeColor : "#374151", fontWeight: catFilter === "all" ? 700 : 600, cursor: "pointer", fontSize: 12 }}>{allLabel}</button>
      {CATS.map((cat) => <button key={cat.id} onClick={() => setCatFilter(cat.id)} style={{ padding: "5px 12px", borderRadius: 18, border: "2px solid", borderColor: catFilter === cat.id ? activeColor : "#e5e7eb", background: catFilter === cat.id ? activeBg : "#fff", color: catFilter === cat.id ? activeColor : "#374151", fontWeight: catFilter === cat.id ? 700 : 600, cursor: "pointer", fontSize: 12 }}>{showIcons ? `${cat.icon} ${cat.label}` : cat.label}</button>)}
    </div>
  );
}

export function ProductsPage({ catFilter, setCatFilter, filtered, setCart, wl, setWl, user, openLogin }) {
  return (
    <div style={{ marginTop: 22, paddingBottom: 44 }}>
      <h1 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800 }}>{catFilter === "all" ? "All Products" : CATS.find((cat) => cat.id === catFilter)?.label}</h1>
      <p style={{ margin: "0 0 18px", color: "#6b7280", fontSize: 13 }}>{filtered.length} products</p>
      <FilterButtons catFilter={catFilter} setCatFilter={setCatFilter} activeColor="#6366f1" activeBg="#ede9fe" showIcons />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 18 }}>
        {filtered.map((product) => <Card key={product.id} p={product} setCart={setCart} wl={wl} setWl={setWl} user={user} onLogin={openLogin} />)}
      </div>
    </div>
  );
}

export function NewArrivalsPage({ catFilter, setCatFilter, filtered, setCart, wl, setWl, user, openLogin }) {
  return (
    <div style={{ paddingBottom: 50 }}>
      <div style={{ marginTop: 22, borderRadius: 18, background: "linear-gradient(135deg,#0f172a,#1e40af)", padding: "48px 44px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(99,102,241,0.25)", border: "1px solid rgba(99,102,241,0.4)", borderRadius: 18, padding: "5px 14px", marginBottom: 14 }}><span style={{ color: "#60a5fa" }}>✨</span><span style={{ color: "#c4b5fd", fontSize: 12, fontWeight: 600 }}>Just dropped this week</span></div>
        <h1 style={{ margin: "0 0 10px", color: "#fff", fontSize: 36, fontWeight: 900 }}>New Arrivals</h1>
        <p style={{ margin: 0, color: "#93c5fd", fontSize: 14, maxWidth: 440 }}>Fresh picks added daily — be the first to shop.</p>
      </div>
      <div style={{ marginTop: 22 }}>
        <FilterButtons catFilter={catFilter} setCatFilter={setCatFilter} activeColor="#1d4ed8" activeBg="#eff6ff" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 18 }}>
        {filtered.map((product) => <Card key={product.id} p={product} setCart={setCart} wl={wl} setWl={setWl} user={user} onLogin={openLogin} />)}
      </div>
    </div>
  );
}

export function FlashSalePage({ flash, pad, catFilter, setCatFilter, filtered, setCart, wl, setWl, user, openLogin }) {
  return (
    <div style={{ paddingBottom: 50 }}>
      <div style={{ marginTop: 22, borderRadius: 18, background: "linear-gradient(135deg,#7f1d1d,#dc2626,#ef4444)", padding: "48px 44px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div><h1 style={{ margin: "0 0 10px", color: "#fff", fontSize: 36, fontWeight: 900 }}>Flash Sale ⚡</h1><p style={{ margin: 0, color: "#fca5a5", fontSize: 14 }}>Massive discounts. Limited stock. Hurry!</p></div>
          <div style={{ display: "flex", gap: 9 }}>{[{ v: flash.h, l: "HRS" }, { v: flash.m, l: "MIN" }, { v: flash.s, l: "SEC" }].map((time) => <div key={time.l} style={{ background: "rgba(0,0,0,0.35)", borderRadius: 12, padding: "12px 16px", textAlign: "center", minWidth: 58 }}><div style={{ color: "#fff", fontSize: 26, fontWeight: 900 }}>{pad(time.v)}</div><div style={{ color: "#fca5a5", fontSize: 9, fontWeight: 800, letterSpacing: 1, marginTop: 2 }}>{time.l}</div></div>)}</div>
        </div>
      </div>
      <div style={{ marginTop: 22 }}>
        <FilterButtons catFilter={catFilter} setCatFilter={setCatFilter} activeColor="#dc2626" activeBg="#fef2f2" allLabel="All Deals" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 18 }}>
        {filtered.map((product) => <Card key={product.id} p={product} setCart={setCart} wl={wl} setWl={setWl} user={user} onLogin={openLogin} />)}
      </div>
    </div>
  );
}
