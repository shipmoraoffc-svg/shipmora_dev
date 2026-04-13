import { ORDERS_DATA, SC } from "../../data/storeData";

export default function AccountPage({ user, acctTab, setAcctTab, wl, onLogin, onLogout }) {
  if (!user) {
    return (
      <div style={{ marginTop: 28, paddingBottom: 50, textAlign: "center", paddingTop: 70 }}>
        <div style={{ fontSize: 68, marginBottom: 14 }}>👤</div>
        <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800 }}>Sign in to your account</h2>
        <button onClick={onLogin} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", border: "none", borderRadius: 11, padding: "11px 28px", fontWeight: 800, fontSize: 14, cursor: "pointer", marginTop: 14 }}>Sign In</button>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 28, paddingBottom: 50, display: "flex", gap: 22, alignItems: "flex-start" }}>
      <div style={{ width: 210, flexShrink: 0 }}>
        <div style={{ background: "linear-gradient(135deg,#1e1b4b,#4c1d95)", borderRadius: 18, padding: "22px 16px", textAlign: "center", marginBottom: 12 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 22, margin: "0 auto 10px" }}>{user.name[0].toUpperCase()}</div>
          <p style={{ margin: "0 0 4px", fontWeight: 800, fontSize: 14, color: "#fff" }}>{user.name}</p>
          <p style={{ margin: "0 0 9px", fontSize: 11, color: "#a5b4fc" }}>{user.email}</p>
          <span style={{ background: "rgba(99,102,241,0.3)", color: "#c4b5fd", padding: "3px 11px", borderRadius: 18, fontSize: 10, fontWeight: 700 }}>{user.role === "admin" ? "⭐ Admin" : "🥈 Silver Member"}</span>
        </div>
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f3f4f6", overflow: "hidden" }}>
          {[{ id: "profile", label: "My Profile" }, { id: "orders", label: "My Orders" }, { id: "wishlist", label: "Wishlist" }, { id: "notifications", label: "Notifications" }, { id: "payments", label: "Payments" }, { id: "settings", label: "Settings" }].map((tab) => <button key={tab.id} onClick={() => setAcctTab(tab.id)} style={{ display: "block", width: "100%", padding: "12px 16px", background: acctTab === tab.id ? "#ede9fe" : "none", border: "none", borderBottom: "1px solid #f9fafb", fontSize: 13, fontWeight: acctTab === tab.id ? 700 : 500, color: acctTab === tab.id ? "#6366f1" : "#374151", cursor: "pointer", textAlign: "left" }}>{tab.label}</button>)}
          <button onClick={onLogout} style={{ display: "block", width: "100%", padding: "12px 16px", background: "none", border: "none", fontSize: 13, fontWeight: 600, color: "#ef4444", cursor: "pointer", textAlign: "left" }}>Logout</button>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        {acctTab === "profile" && <div style={{ background: "#fff", borderRadius: 18, padding: 24, border: "1px solid #f3f4f6" }}><h2 style={{ margin: "0 0 18px", fontSize: 18, fontWeight: 800 }}>My Profile</h2><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>{[{ l: "Full Name", v: user.name }, { l: "Email", v: user.email }, { l: "Phone", v: "+91 98765 43210" }, { l: "Member Since", v: "March 2024" }].map((field) => <div key={field.l} style={{ background: "#f9fafb", borderRadius: 11, padding: "12px 14px" }}><p style={{ margin: "0 0 3px", fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px" }}>{field.l}</p><p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#111827" }}>{field.v}</p></div>)}</div></div>}
        {acctTab === "orders" && <div style={{ background: "#fff", borderRadius: 18, padding: 24, border: "1px solid #f3f4f6" }}><h2 style={{ margin: "0 0 18px", fontSize: 18, fontWeight: 800 }}>My Orders</h2>{ORDERS_DATA.map((order) => <div key={order.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: 13, borderRadius: 12, border: "1px solid #f3f4f6", marginBottom: 9, background: "#fafafa" }}><div style={{ width: 44, height: 44, borderRadius: 10, background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📦</div><div style={{ flex: 1 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: "#111827" }}>{order.product}</p><span style={{ background: SC[order.status]?.bg, color: SC[order.status]?.c, padding: "3px 9px", borderRadius: 18, fontSize: 10, fontWeight: 700 }}>{order.status}</span></div><p style={{ margin: "3px 0 0", fontSize: 11, color: "#9ca3af" }}>{order.id} · {order.date} · {order.amount}</p></div></div>)}</div>}
        {acctTab === "wishlist" && <div style={{ background: "#fff", borderRadius: 18, padding: 24, border: "1px solid #f3f4f6" }}><h2 style={{ margin: "0 0 18px", fontSize: 18, fontWeight: 800 }}>Wishlist ({wl.length})</h2>{wl.length === 0 ? <p style={{ color: "#9ca3af" }}>No wishlisted items yet.</p> : <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>{wl.map((product) => <div key={product.id} style={{ display: "flex", gap: 10, padding: 11, borderRadius: 12, border: "1px solid #f3f4f6", alignItems: "center" }}><div style={{ width: 44, height: 44, borderRadius: 9, background: `${product.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{product.emoji}</div><div style={{ flex: 1, minWidth: 0 }}><p style={{ margin: "0 0 2px", fontSize: 12, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.name}</p><p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: "#6366f1" }}>₹{product.price.toLocaleString()}</p></div></div>)}</div>}</div>}
        {["notifications", "payments", "settings"].includes(acctTab) && <div style={{ background: "#fff", borderRadius: 18, padding: 24, border: "1px solid #f3f4f6" }}><h2 style={{ margin: "0 0 14px", fontSize: 18, fontWeight: 800, textTransform: "capitalize" }}>{acctTab}</h2><p style={{ color: "#9ca3af", fontSize: 14 }}>This section is coming soon.</p></div>}
      </div>
    </div>
  );
}
