import { useState } from "react";

import { ADMIN_EMAIL, ADMIN_PASS } from "../../data/storeData";

const GOOGLE_ACCOUNTS = [
  { name: "Rahul Sharma", email: "rahul.sharma@gmail.com", av: "R", color: "#4285f4" },
  { name: "Priya Singh", email: "priya.singh99@gmail.com", av: "P", color: "#ea4335" },
  { name: "work@gmail.com", email: "work@gmail.com", av: "W", color: "#34a853" },
];

export default function LoginModal({ onClose, onLogin }) {
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [fEmail, setFEmail] = useState("");
  const [fSent, setFSent] = useState(false);
  const [gPicker, setGPicker] = useState(false);

  const submit = () => {
    setErr("");
    if (!email || !pass) {
      setErr("Fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email.trim().toLowerCase() === ADMIN_EMAIL && pass === ADMIN_PASS) {
        onLogin({ email, role: "admin", name: "Admin" });
        return;
      }
      if (email.includes("@") && pass.length >= 6) {
        onLogin({ email, role: "customer", name: email.split("@")[0] });
        return;
      }
      setErr("Invalid email or password (min 6 chars).");
    }, 900);
  };

  if (gPicker) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 3000, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div onClick={() => setGPicker(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
        <div style={{ position: "relative", background: "#fff", borderRadius: 22, width: "100%", maxWidth: 340, padding: "26px 22px", boxShadow: "0 24px 80px rgba(0,0,0,0.2)" }}>
          <div style={{ textAlign: "center", marginBottom: 18 }}>
            <p style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 800 }}>Sign in with Google</p>
            <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>Choose an account for <strong>Shipmora</strong></p>
          </div>
          {GOOGLE_ACCOUNTS.map((account) => (
            <button key={account.email} onClick={() => onLogin({ email: account.email, role: "customer", name: account.name })} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "12px 14px", cursor: "pointer", marginBottom: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: account.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>{account.av}</div>
              <div style={{ textAlign: "left" }}>
                <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 700, color: "#111827" }}>{account.name}</p>
                <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>{account.email}</p>
              </div>
            </button>
          ))}
          <button onClick={() => setGPicker(false)} style={{ position: "absolute", top: 12, right: 12, background: "#f3f4f6", border: "none", borderRadius: 8, width: 26, height: 26, cursor: "pointer", fontSize: 14, color: "#6b7280" }}>×</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(15,10,40,0.6)" }} />
      <div style={{ position: "relative", background: "#fff", borderRadius: 22, width: "100%", maxWidth: 410, padding: "32px 32px 28px", boxShadow: "0 24px 80px rgba(99,102,241,0.18)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🚀</div>
          <span style={{ fontSize: 21, fontWeight: 900, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Shipmora</span>
        </div>
        {forgot ? (
          <>
            <button onClick={() => { setForgot(false); setFSent(false); setErr(""); }} style={{ background: "none", border: "none", color: "#6366f1", fontWeight: 700, fontSize: 13, cursor: "pointer", marginBottom: 14, padding: 0 }}>Back to Sign In</button>
            {fSent ? (
              <div style={{ textAlign: "center", padding: "14px 0" }}>
                <div style={{ fontSize: 52, marginBottom: 12 }}>📧</div>
                <h3 style={{ margin: "0 0 8px", fontSize: 19, fontWeight: 800 }}>Check your inbox!</h3>
                <p style={{ margin: "0 0 18px", fontSize: 14, color: "#6b7280" }}>Reset link sent to <strong style={{ color: "#6366f1" }}>{fEmail}</strong></p>
                <button onClick={() => { setForgot(false); setFSent(false); }} style={{ width: "100%", padding: 11, borderRadius: 11, border: "none", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>Back to Sign In</button>
              </div>
            ) : (
              <>
                <h2 style={{ margin: "0 0 6px", fontSize: 21, fontWeight: 900 }}>Forgot Password? 🔑</h2>
                <p style={{ margin: "0 0 18px", fontSize: 14, color: "#6b7280" }}>Enter your email for a reset link.</p>
                <input value={fEmail} onChange={(event) => setFEmail(event.target.value)} placeholder="you@example.com" type="email" style={{ width: "100%", padding: "10px 13px", borderRadius: 9, border: "2px solid #e5e7eb", fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: 14 }} />
                {err && <div style={{ background: "#fee2e2", borderRadius: 9, padding: "9px 13px", marginBottom: 12, fontSize: 13, color: "#991b1b" }}>⚠️ {err}</div>}
                <button onClick={() => { if (!fEmail.includes("@")) { setErr("Enter a valid email."); return; } setFSent(true); }} style={{ width: "100%", padding: 12, borderRadius: 11, border: "none", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>Send Reset Link</button>
              </>
            )}
          </>
        ) : (
          <>
            <div style={{ display: "flex", background: "#f3f4f6", borderRadius: 11, padding: 4, marginBottom: 22 }}>
              {["login", "signup"].map((item) => (
                <button key={item} onClick={() => { setTab(item); setErr(""); }} style={{ flex: 1, padding: 8, border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 14, background: tab === item ? "#fff" : "transparent", color: tab === item ? "#6366f1" : "#9ca3af" }}>
                  {item === "login" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>
            <h2 style={{ margin: "0 0 5px", fontSize: 21, fontWeight: 900 }}>{tab === "login" ? "Welcome back 👋" : "Create account 🎉"}</h2>
            <p style={{ margin: "0 0 18px", fontSize: 14, color: "#6b7280" }}>{tab === "login" ? "Sign in to continue" : "Join millions of shoppers"}</p>
            {tab === "signup" && <div style={{ marginBottom: 12 }}><label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 5 }}>Full Name</label><input placeholder="Your name" style={{ width: "100%", padding: "10px 13px", borderRadius: 9, border: "2px solid #e5e7eb", fontSize: 14, outline: "none", boxSizing: "border-box" }} /></div>}
            <div style={{ marginBottom: 12 }}><label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 5 }}>Email</label><input value={email} onChange={(event) => setEmail(event.target.value)} onKeyDown={(event) => event.key === "Enter" && submit()} placeholder="you@example.com" type="email" style={{ width: "100%", padding: "10px 13px", borderRadius: 9, border: `2px solid ${err ? "#fca5a5" : "#e5e7eb"}`, fontSize: 14, outline: "none", boxSizing: "border-box" }} /></div>
            <div style={{ marginBottom: tab === "login" ? 6 : 14 }}><label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 5 }}>Password</label><div style={{ position: "relative" }}><input value={pass} onChange={(event) => setPass(event.target.value)} onKeyDown={(event) => event.key === "Enter" && submit()} placeholder={tab === "signup" ? "Min 6 chars" : "Your password"} type={show ? "text" : "password"} style={{ width: "100%", padding: "10px 42px 10px 13px", borderRadius: 9, border: `2px solid ${err ? "#fca5a5" : "#e5e7eb"}`, fontSize: 14, outline: "none", boxSizing: "border-box" }} /><button onClick={() => setShow((current) => !current)} style={{ position: "absolute", right: 11, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 15, color: "#9ca3af" }}>{show ? "🙈" : "👁️"}</button></div></div>
            {tab === "login" && <div style={{ textAlign: "right", marginBottom: 14 }}><button onClick={() => { setForgot(true); setFEmail(email); setErr(""); }} style={{ background: "none", border: "none", color: "#6366f1", fontSize: 13, fontWeight: 700, cursor: "pointer", padding: 0 }}>Forgot password?</button></div>}
            {err && <div style={{ background: "#fee2e2", borderRadius: 9, padding: "9px 13px", marginBottom: 12, fontSize: 13, color: "#991b1b" }}>⚠️ {err}</div>}
            <button onClick={submit} disabled={loading} style={{ width: "100%", padding: 12, borderRadius: 11, border: "none", background: loading ? "#c4b5fd" : "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", fontWeight: 800, fontSize: 14, cursor: loading ? "not-allowed" : "pointer", marginBottom: 18 }}>{loading ? "Signing in..." : tab === "login" ? "Sign In" : "Create Account"}</button>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}><div style={{ flex: 1, height: 1, background: "#f3f4f6" }} /><span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600 }}>or</span><div style={{ flex: 1, height: 1, background: "#f3f4f6" }} /></div>
            <button onClick={() => setGPicker(true)} style={{ width: "100%", padding: 10, border: "2px solid #e5e7eb", borderRadius: 10, background: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, color: "#374151" }}>
              <svg width="17" height="17" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" /><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" /><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" /><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" /></svg>
              Continue with Google
            </button>
          </>
        )}
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, background: "#f3f4f6", border: "none", borderRadius: 8, width: 28, height: 28, cursor: "pointer", fontSize: 15, color: "#6b7280" }}>×</button>
      </div>
    </div>
  );
}
