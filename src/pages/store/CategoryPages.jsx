import Card from "../../components/store/Card";
import Breadcrumb from "../../components/store/Breadcrumb";

export function CategoryPage({ catData, catProds, go, goSub, setCart, wl, setWl, user, openLogin }) {
  return (
    <div style={{ paddingBottom: 50 }}>
      <div style={{ marginTop: 22, borderRadius: 18, overflow: "hidden", background: `linear-gradient(135deg,${catData.color},${catData.color}cc)`, padding: "44px 38px" }}>
        <Breadcrumb items={[{ label: "Home", action: () => go("home") }, { label: catData.label }]} />
        <div style={{ fontSize: 48, marginBottom: 10 }}>{catData.icon}</div>
        <h1 style={{ margin: "0 0 8px", fontSize: 34, fontWeight: 900, color: "#fff" }}>{catData.label}</h1>
        <p style={{ margin: "0 0 20px", color: "rgba(255,255,255,0.7)", fontSize: 14 }}>{catData.sub.length} subcategories</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{catData.sub.map((sub) => <button key={sub.name} onClick={() => goSub(catData.id, sub.name)} style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 18, padding: "5px 14px", color: "#fff", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>{sub.name}</button>)}</div>
      </div>
      <div style={{ marginTop: 30 }}>
        <h2 style={{ margin: "0 0 16px", fontSize: 19, fontWeight: 800, color: "#111827" }}>Shop by Subcategory</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 14 }}>
          {catData.sub.map((sub) => <div key={sub.name} onClick={() => goSub(catData.id, sub.name)} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #f3f4f6", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}><div style={{ height: 100, background: `linear-gradient(135deg,${catData.color}18,${catData.color}33)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 46, position: "relative" }}>{sub.icon}{sub.items.length > 0 && <span style={{ position: "absolute", bottom: 7, right: 8, background: "#6366f1", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 18 }}>{sub.items.length} types</span>}</div><div style={{ padding: "12px 14px" }}><p style={{ margin: "0 0 3px", fontWeight: 700, fontSize: 13, color: "#111827" }}>{sub.name}</p><p style={{ margin: 0, fontSize: 11, color: "#6b7280" }}>{sub.items.length > 0 ? sub.items.slice(0, 2).join(", ") : "Explore collection"}</p></div></div>)}
        </div>
      </div>
      {catData.sub.map((sub, index) => {
        const prods = catProds.length > 0 ? catProds.slice(index % Math.max(catProds.length, 1), (index % Math.max(catProds.length, 1)) + 2).concat(catProds).slice(0, 2) : [];
        return (
          <div key={sub.name} style={{ marginTop: 34 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}><span style={{ fontSize: 20 }}>{sub.icon}</span><h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#111827" }}>{sub.name}</h3></div>
              <button onClick={() => goSub(catData.id, sub.name)} style={{ background: "none", border: "1px solid #e5e7eb", borderRadius: 7, padding: "5px 12px", fontSize: 12, color: "#6366f1", cursor: "pointer", fontWeight: 700 }}>View all</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 18 }}>
              {prods.map((product) => <Card key={`${product.id}-${sub.name}`} p={product} setCart={setCart} wl={wl} setWl={setWl} user={user} onLogin={openLogin} />)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function SubcategoryPage({ catData, subData, catProds, go, goCat, goItem, setCart, wl, setWl, user, openLogin }) {
  return (
    <div style={{ paddingBottom: 50 }}>
      <div style={{ marginTop: 22, borderRadius: 18, overflow: "hidden", background: `linear-gradient(135deg,${catData.color},${catData.color}cc)`, padding: "40px 38px" }}>
        <Breadcrumb items={[{ label: "Home", action: () => go("home") }, { label: catData.label, action: () => goCat(catData.id) }, { label: subData.name }]} />
        <div style={{ fontSize: 44, marginBottom: 9 }}>{subData.icon}</div>
        <h1 style={{ margin: "0 0 8px", fontSize: 32, fontWeight: 900, color: "#fff" }}>{subData.name}</h1>
        <p style={{ margin: 0, color: "rgba(255,255,255,0.7)", fontSize: 13 }}>{catData.label} · {subData.items.length > 0 ? `${subData.items.length} types` : "All products"}</p>
      </div>
      <div style={{ marginTop: 26 }}>
        {subData.items.length > 0 && <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(155px,1fr))", gap: 12, marginBottom: 24 }}>{subData.items.map((item) => <div key={item} onClick={() => goItem(catData.id, subData.name, item)} style={{ background: "#fff", borderRadius: 14, border: "1px solid #f3f4f6", cursor: "pointer", overflow: "hidden" }}><div style={{ height: 80, background: `linear-gradient(135deg,${catData.color}18,${catData.color}33)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>📦</div><div style={{ padding: "10px 12px" }}><p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#111827", lineHeight: 1.3 }}>{item}</p></div></div>)}</div>}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 18 }}>
          {(catProds.length > 0 ? catProds : []).map((product) => <Card key={product.id} p={product} setCart={setCart} wl={wl} setWl={setWl} user={user} onLogin={openLogin} />)}
          {catProds.length === 0 && <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 0", color: "#9ca3af" }}><div style={{ fontSize: 60 }}>🔍</div><p style={{ fontSize: 15, fontWeight: 600, marginTop: 14, color: "#374151" }}>Products coming soon</p></div>}
        </div>
      </div>
    </div>
  );
}

export function ItemPage({ catData, subData, activeItem, catProds, go, goCat, goSub, goItem, setCart, wl, setWl, user, openLogin }) {
  return (
    <div style={{ paddingBottom: 50 }}>
      <div style={{ marginTop: 22, borderRadius: 18, overflow: "hidden", background: `linear-gradient(135deg,${catData.color},${catData.color}99)`, padding: "40px 38px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
          <button onClick={() => go("home")} style={{ background: "rgba(255,255,255,0.12)", border: "none", borderRadius: 7, padding: "4px 11px", color: "rgba(255,255,255,0.7)", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>Home</button>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>›</span>
          <button onClick={() => goCat(catData.id)} style={{ background: "rgba(255,255,255,0.12)", border: "none", borderRadius: 7, padding: "4px 11px", color: "rgba(255,255,255,0.7)", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>{catData.label}</button>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>›</span>
          <button onClick={() => goSub(catData.id, subData.name)} style={{ background: "rgba(255,255,255,0.12)", border: "none", borderRadius: 7, padding: "4px 11px", color: "rgba(255,255,255,0.7)", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>{subData.name}</button>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>›</span>
          <span style={{ background: "rgba(255,255,255,0.2)", borderRadius: 7, padding: "4px 11px", color: "#fff", fontSize: 11, fontWeight: 700 }}>{activeItem}</span>
        </div>
        <div style={{ fontSize: 44, marginBottom: 10 }}>📦</div>
        <h1 style={{ margin: "0 0 8px", fontSize: 32, fontWeight: 900, color: "#fff" }}>{activeItem}</h1>
      </div>
      <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 18 }}>
        {(catProds.length > 0 ? catProds : []).map((product) => <Card key={product.id} p={product} setCart={setCart} wl={wl} setWl={setWl} user={user} onLogin={openLogin} />)}
        {catProds.length === 0 && [1, 2, 3, 4].map((index) => <div key={index} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #f3f4f6" }}><div style={{ height: 170, background: `linear-gradient(135deg,${catData.color}18,${catData.color}33)`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10 }}><span style={{ fontSize: 52 }}>📦</span><span style={{ background: "#6366f1", color: "#fff", fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 18 }}>{activeItem}</span></div><div style={{ padding: "12px 14px" }}><div style={{ height: 14, background: "#f3f4f6", borderRadius: 7, marginBottom: 8, width: "70%" }} /><div style={{ height: 36, background: "linear-gradient(135deg,#ede9fe,#ddd6fe)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 12, fontWeight: 700, color: "#6366f1" }}>Coming Soon</span></div></div></div>)}
      </div>
      <div style={{ marginTop: 40, padding: 24, background: "#fff", borderRadius: 18, border: "1px solid #f3f4f6" }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 800, color: "#111827" }}>Also explore in {subData.name}</h3>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>{subData.items.filter((item) => item !== activeItem).map((item) => <button key={item} onClick={() => goItem(catData.id, subData.name, item)} style={{ padding: "8px 16px", borderRadius: 20, border: "2px solid #e5e7eb", background: "#fff", color: "#374151", fontWeight: 600, cursor: "pointer", fontSize: 13 }}>{item}</button>)}</div>
      </div>
    </div>
  );
}
