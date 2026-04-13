export default function WishlistDrawer({ wl, setWl, setCart, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 370, background: "#fff", display: "flex", flexDirection: "column", boxShadow: "-8px 0 40px rgba(0,0,0,0.15)" }}>
        <div style={{ padding: "18px 22px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>❤️</span>
            <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>Wishlist</h2>
            {wl.length > 0 && <span style={{ background: "#fee2e2", color: "#ef4444", borderRadius: "50%", width: 22, height: 22, fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>{wl.length}</span>}
          </div>
          <button onClick={onClose} style={{ background: "#f3f4f6", border: "none", borderRadius: 8, width: 30, height: 30, cursor: "pointer", fontSize: 18, color: "#6b7280" }}>×</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "10px 22px" }}>
          {wl.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>
              <div style={{ fontSize: 60 }}>🤍</div>
              <p style={{ fontSize: 15, fontWeight: 600, marginTop: 14, color: "#374151" }}>Your wishlist is empty</p>
              <p style={{ fontSize: 13 }}>Tap the heart on any product</p>
            </div>
          ) : (
            wl.map((product) => (
              <div key={product.id} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: "1px solid #f9fafb", alignItems: "center" }}>
                <div style={{ width: 52, height: 52, borderRadius: 11, background: `${product.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{product.emoji}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: "0 0 3px", fontSize: 13, fontWeight: 700, color: "#111827" }}>{product.name}</p>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#6366f1" }}>₹{product.price.toLocaleString()}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <button onClick={() => setCart((current) => { const existing = current.find((item) => item.id === product.id); return existing ? current.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item) : [...current, { ...product, qty: 1 }]; })} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11, cursor: "pointer", fontWeight: 700 }}>
                    Add
                  </button>
                  <button onClick={() => setWl((current) => current.filter((item) => item.id !== product.id))} style={{ background: "#fee2e2", color: "#ef4444", border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11, cursor: "pointer", fontWeight: 700 }}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
