import { CATS } from "../../data/storeData";

export default function StoreHeader({
  user,
  wl,
  totalQty,
  view,
  megaOpen,
  setMegaOpen,
  hovCat,
  setHovCat,
  hovSub,
  setHovSub,
  onGo,
  onGoCat,
  onGoSub,
  onGoItem,
  onShowLogin,
  onShowWishlist,
  onShowCart,
  onShowAdmin,
  onOpenAccount,
  onLogout,
}) {
  return (
    <>
      <div style={{ background: "#1e1b4b", color: "#c4b5fd", fontSize: 12, textAlign: "center", padding: 7 }}>
        🎉 Free shipping above ₹999 · Use code <strong style={{ color: "#fbbf24" }}>SHIP50</strong> for 50% off
      </div>
      <header style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", alignItems: "center", height: 62, gap: 18 }}>
            <div onClick={() => onGo("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>🚀</div>
              <span style={{ fontSize: 21, fontWeight: 900, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Shipmora</span>
            </div>
            <div style={{ flex: 1, position: "relative" }}>
              <input placeholder="Search products, brands..." style={{ width: "100%", padding: "9px 14px 9px 42px", borderRadius: 11, border: "2px solid #e5e7eb", fontSize: 14, outline: "none", background: "#f9fafb", boxSizing: "border-box" }} />
              <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", fontSize: 17, color: "#9ca3af" }}>🔍</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {user?.role === "admin" && <button onClick={onShowAdmin} style={{ background: "linear-gradient(135deg,#1e1b4b,#312e81)", color: "#fff", border: "none", borderRadius: 9, padding: "7px 13px", fontSize: 12, cursor: "pointer", fontWeight: 700 }}>🔐 Admin</button>}
              {user ? (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div onClick={onOpenAccount} style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>{user.name[0].toUpperCase()}</div>
                  <button onClick={onLogout} style={{ background: "#fee2e2", color: "#ef4444", border: "none", borderRadius: 8, padding: "5px 10px", fontSize: 12, cursor: "pointer", fontWeight: 700 }}>Logout</button>
                </div>
              ) : (
                <button onClick={onShowLogin} style={{ background: "#ede9fe", color: "#6366f1", border: "none", borderRadius: 9, padding: "7px 13px", fontSize: 13, cursor: "pointer", fontWeight: 700 }}>👤 Sign In</button>
              )}
              <button onClick={() => { if (!user) { onShowLogin(); return; } onShowWishlist(); }} style={{ background: "none", border: "none", fontSize: 21, cursor: "pointer", position: "relative", color: "#ef4444" }}>
                ❤️
                {wl.length > 0 && user && <span style={{ position: "absolute", top: -5, right: -5, background: "#ef4444", color: "#fff", borderRadius: "50%", width: 16, height: 16, fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>{wl.length}</span>}
              </button>
              <button onClick={onShowCart} style={{ background: "none", border: "none", fontSize: 21, cursor: "pointer", position: "relative", color: "#374151" }}>
                🛒
                {totalQty > 0 && <span style={{ position: "absolute", top: -5, right: -5, background: "#6366f1", color: "#fff", borderRadius: "50%", width: 16, height: 16, fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>{totalQty}</span>}
              </button>
            </div>
          </div>
          <nav style={{ display: "flex", alignItems: "center", position: "relative" }}>
            <div onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => { setMegaOpen(false); setHovCat(null); setHovSub(null); }} style={{ position: "relative" }}>
              <button onClick={() => setMegaOpen((current) => !current)} style={{ display: "flex", alignItems: "center", gap: 7, background: megaOpen ? "#ede9fe" : "none", border: "none", padding: "9px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer", color: megaOpen ? "#6366f1" : "#374151", borderBottom: megaOpen ? "2px solid #6366f1" : "2px solid transparent" }}>
                ☰ All Categories ▾
              </button>
              {megaOpen && (
                <div style={{ position: "absolute", top: "100%", left: 0, display: "flex", background: "#fff", borderRadius: "0 14px 14px 14px", boxShadow: "0 20px 60px rgba(0,0,0,0.15)", border: "1px solid #f3f4f6", borderTop: "3px solid #6366f1", zIndex: 300, minHeight: 400 }}>
                  <div style={{ width: 210, borderRight: "1px solid #f3f4f6", padding: "6px 0", background: "#fafafa", overflowY: "auto", maxHeight: 480 }}>
                    {CATS.map((cat) => (
                      <button
                        key={cat.id}
                        onMouseEnter={() => { setHovCat(cat.id); setHovSub(null); }}
                        onClick={() => { onGoCat(cat.id); setMegaOpen(false); setHovCat(null); setHovSub(null); }}
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "10px 14px", border: "none", background: hovCat === cat.id ? "#ede9fe" : "transparent", color: hovCat === cat.id ? "#6366f1" : "#374151", fontSize: 13, fontWeight: hovCat === cat.id ? 700 : 500, cursor: "pointer", borderLeft: hovCat === cat.id ? "3px solid #6366f1" : "3px solid transparent" }}
                      >
                        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ width: 26, height: 26, borderRadius: 7, fontSize: 14, background: hovCat === cat.id ? "rgba(99,102,241,0.15)" : "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>{cat.icon}</span>
                          {cat.label}
                        </span>
                        <span style={{ fontSize: 10, color: hovCat === cat.id ? "#6366f1" : "#d1d5db" }}>›</span>
                      </button>
                    ))}
                  </div>
                  <div style={{ width: 210, borderRight: "1px solid #f3f4f6", padding: "8px 4px", overflowY: "auto", maxHeight: 480 }}>
                    {hovCat ? (() => {
                      const hoveredCat = CATS.find((cat) => cat.id === hovCat);
                      return (
                        <>
                          <p style={{ margin: "0 0 6px 8px", fontSize: 10, fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "1px" }}>{hoveredCat.icon} {hoveredCat.label}</p>
                          {hoveredCat.sub.map((sub) => (
                            <button
                              key={sub.name}
                              onMouseEnter={() => setHovSub(sub.name)}
                              onClick={() => { onGoSub(hoveredCat.id, sub.name); setMegaOpen(false); setHovCat(null); setHovSub(null); }}
                              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "9px 10px", border: "none", background: hovSub === sub.name ? "#f5f3ff" : "none", fontSize: 13, color: hovSub === sub.name ? "#6366f1" : "#374151", cursor: "pointer", borderRadius: 7, fontWeight: hovSub === sub.name ? 700 : 500, transition: "background 0.1s" }}
                            >
                              <span style={{ display: "flex", alignItems: "center", gap: 7 }}><span>{sub.icon}</span>{sub.name}</span>
                              {sub.items.length > 0 && <span style={{ fontSize: 10, color: hovSub === sub.name ? "#6366f1" : "#d1d5db", flexShrink: 0 }}>›</span>}
                            </button>
                          ))}
                          <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid #f3f4f6", padding: "8px 10px 0" }}>
                            <button onClick={() => { onGoCat(hoveredCat.id); setMegaOpen(false); setHovCat(null); setHovSub(null); }} style={{ width: "100%", padding: "7px 10px", background: "#ede9fe", border: "none", fontSize: 12, color: "#6366f1", cursor: "pointer", borderRadius: 7, fontWeight: 700, textAlign: "left" }}>View all in {hoveredCat.label}</button>
                          </div>
                        </>
                      );
                    })() : <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "80%", paddingTop: 60, color: "#9ca3af" }}><span style={{ fontSize: 34 }}>👈</span><p style={{ margin: "10px 0 0", fontSize: 12, fontWeight: 600 }}>Hover a category</p></div>}
                  </div>
                  <div style={{ width: 190, padding: "8px 4px", overflowY: "auto", maxHeight: 480 }}>
                    {hovSub && hovCat ? (() => {
                      const hoveredCat = CATS.find((cat) => cat.id === hovCat);
                      const hoveredSub = hoveredCat?.sub.find((sub) => sub.name === hovSub);
                      if (!hoveredSub || hoveredSub.items.length === 0) {
                        return null;
                      }
                      return (
                        <>
                          <p style={{ margin: "0 0 6px 8px", fontSize: 10, fontWeight: 800, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "1px" }}>{hoveredSub.icon} {hovSub}</p>
                          {hoveredSub.items.map((item) => (
                            <button
                              key={item}
                              onClick={() => { onGoItem(hovCat, hovSub, item); setMegaOpen(false); setHovCat(null); setHovSub(null); }}
                              style={{ display: "block", width: "100%", padding: "8px 10px", border: "none", background: "none", fontSize: 12, color: "#374151", cursor: "pointer", borderRadius: 7, textAlign: "left", fontWeight: 500, transition: "all 0.1s" }}
                              onMouseEnter={(event) => { event.currentTarget.style.background = "#f5f3ff"; event.currentTarget.style.color = "#6366f1"; event.currentTarget.style.fontWeight = 700; }}
                              onMouseLeave={(event) => { event.currentTarget.style.background = "none"; event.currentTarget.style.color = "#374151"; event.currentTarget.style.fontWeight = 500; }}
                            >
                              {item}
                            </button>
                          ))}
                        </>
                      );
                    })() : <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "80%", paddingTop: 60, color: "#e5e7eb" }}><span style={{ fontSize: 28 }}>👈</span><p style={{ margin: "8px 0 0", fontSize: 11, fontWeight: 600, color: "#d1d5db" }}>Hover a subcategory</p></div>}
                  </div>
                </div>
              )}
            </div>
            {[{ label: "New Arrivals", value: "newArrivals", color: "#374151" }, { label: "Flash Sale ⚡", value: "flashSale", color: "#ef4444" }, { label: "Trending 🔥", value: "products", color: "#f59e0b" }].map((item) => (
              <button
                key={item.value}
                onClick={() => onGo(item.value)}
                onMouseEnter={(event) => {
                  event.currentTarget.style.color = "#6366f1";
                  event.currentTarget.style.borderBottomColor = "#6366f1";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.color = view === item.value ? "#6366f1" : item.color;
                  event.currentTarget.style.borderBottomColor = view === item.value ? "#6366f1" : "transparent";
                }}
                style={{ background: "none", border: "none", padding: "9px 13px", margin: 0, fontSize: 13, fontWeight: 600, lineHeight: 1.2, cursor: "pointer", color: view === item.value ? "#6366f1" : item.color, borderBottom: view === item.value ? "2px solid #6366f1" : "2px solid transparent", whiteSpace: "nowrap", alignSelf: "stretch" }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
