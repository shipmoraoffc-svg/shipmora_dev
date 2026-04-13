export default function CartDrawer({ cart, setCart, onClose, user, onLogin }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const qty = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 390, background: "#fff", display: "flex", flexDirection: "column", boxShadow: "-8px 0 40px rgba(0,0,0,0.15)" }}>
        <div style={{ padding: "18px 22px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>🛒</span>
            <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800 }}>Cart</h2>
            {qty > 0 && <span style={{ background: "#ede9fe", color: "#6366f1", borderRadius: "50%", width: 22, height: 22, fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>{qty}</span>}
          </div>
          <button onClick={onClose} style={{ background: "#f3f4f6", border: "none", borderRadius: 8, width: 30, height: 30, cursor: "pointer", fontSize: 18, color: "#6b7280" }}>×</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "10px 22px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>
              <div style={{ fontSize: 60 }}>🛒</div>
              <p style={{ fontSize: 16, fontWeight: 600, marginTop: 14, color: "#374151" }}>Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: "1px solid #f9fafb", alignItems: "center" }}>
                <div style={{ width: 54, height: 54, borderRadius: 12, background: `${item.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>{item.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 700, color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</p>
                  <p style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 800, color: "#6366f1" }}>₹{(item.price * item.qty).toLocaleString()}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button onClick={() => item.qty === 1 ? setCart((current) => current.filter((cartItem) => cartItem.id !== item.id)) : setCart((current) => current.map((cartItem) => cartItem.id === item.id ? { ...cartItem, qty: cartItem.qty - 1 } : cartItem))} style={{ width: 26, height: 26, borderRadius: 7, border: "1.5px solid #e5e7eb", background: item.qty === 1 ? "#fee2e2" : "#f9fafb", color: item.qty === 1 ? "#ef4444" : "#374151", cursor: "pointer", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {item.qty === 1 ? "🗑️" : "−"}
                    </button>
                    <span style={{ fontSize: 14, fontWeight: 800, minWidth: 18, textAlign: "center" }}>{item.qty}</span>
                    <button onClick={() => setCart((current) => current.map((cartItem) => cartItem.id === item.id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem))} style={{ width: 26, height: 26, borderRadius: 7, border: "1.5px solid #e5e7eb", background: "#f9fafb", cursor: "pointer", fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      +
                    </button>
                  </div>
                </div>
                <button onClick={() => setCart((current) => current.filter((cartItem) => cartItem.id !== item.id))} style={{ background: "#fee2e2", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 15, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>🗑️</button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div style={{ padding: "18px 22px", borderTop: "1px solid #f3f4f6" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>Total</span>
              <span style={{ fontSize: 21, fontWeight: 900 }}>₹{total.toLocaleString()}</span>
            </div>
            <button onClick={() => { if (!user) { onClose(); onLogin(); } }} style={{ width: "100%", padding: 13, borderRadius: 12, border: "none", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
              {user ? "Proceed to Checkout" : "Sign In to Checkout"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
