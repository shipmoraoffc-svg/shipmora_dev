import { useState, useEffect } from "react";

const ADMIN_EMAIL = "shipmoraoffc@gmail.com";
const ADMIN_PASS  = "Shipmora@2025";

// ── CATEGORY DATA ─────────────────────────────────────────────────────────────
const CATS = [
  { id:"electronics", label:"Electronics", icon:"⚡", color:"#1e1b4b", sub:[
    { name:"Smart Gadgets", icon:"📱", items:[] },
    { name:"Audio & Video", icon:"🎧", items:["Headphones & Earphones","Speakers & Soundbars","Home Theatre","Projectors"] },
    { name:"Storage", icon:"💾", items:[] },
    { name:"Batteries & Power", icon:"🔋", items:[] },
  ]},
  { id:"phone", label:"Phone Accessories", icon:"📱", color:"#0c4a6e", sub:[
    { name:"Charging Accessories", icon:"🔌", items:["Type-C Cables","Wall Chargers","Wireless Chargers","Car Chargers"] },
    { name:"Protection", icon:"🛡️", items:["Screen Protectors","Phone Cases","Camera Lens Protectors"] },
    { name:"Holders & Mounts", icon:"📌", items:["Desk Stands","Car Mounts","Bike Holders","Ring Holders"] },
    { name:"Audio", icon:"🎵", items:["Wired Earphones","Bluetooth Earbuds","Neckbands","Audio Adapters"] },
    { name:"Camera Accessories", icon:"📷", items:["Clip-on Lens","Selfie Ring Lights","Mobile Tripods","Gimbals"] },
  ]},
  { id:"home", label:"Home & Kitchen", icon:"🏠", color:"#14532d", sub:[
    { name:"Kitchen & Dining", icon:"🍳", items:[] },
    { name:"Home Decor", icon:"🏮", items:["Arts & Crafts","Indoor & LED Lightings","Fragrance"] },
    { name:"Home Textiles", icon:"🛏️", items:[] },
    { name:"Garden & Outdoor", icon:"🌿", items:["Garden Lightings","Plants","Garden Accessories","Fertilizers"] },
    { name:"Home Improvement", icon:"🔧", items:["Cleaning","Power Tools","Hand Tools","Measuring Tools"] },
  ]},
  { id:"auto", label:"Automobiles", icon:"🚗", color:"#450a0a", sub:[
    { name:"Car Electronics", icon:"📡", items:["Chargers","Dash Cams","Monitors","GPS Trackers","Mirror Cams","Car Lightings"] },
    { name:"Car Care", icon:"🧽", items:["Cleaning","Polish","Washing Kits"] },
    { name:"Car Accessories", icon:"🚗", items:[] },
    { name:"Motorcycle Accessories", icon:"🏍️", items:["Moto Lightings","Fairings","Handlebar Accessories","Mirrors","Footrests","Exhausts"] },
    { name:"Helmets", icon:"⛑️", items:[] },
  ]},
  { id:"mens", label:"Men's Fashion", icon:"👔", color:"#1e3a5f", sub:[
    { name:"Topwear", icon:"👕", items:["T-Shirts & Polos","Formal Shirts","Casual Shirts","Hoodies","Jackets & Coats"] },
    { name:"Bottomwear", icon:"👖", items:["Jeans","Trousers","Cargos","Shorts"] },
    { name:"Ethnic Wear", icon:"👘", items:["Kurtas","Kurta Sets","Sherwanis","Ethnic Jackets"] },
    { name:"Suits & Blazers", icon:"🤵", items:["Blazers","Formal Suits","Waistcoats"] },
    { name:"Footwear", icon:"👟", items:["Casual Shoes","Formal Shoes","Sports Shoes","Sneakers","Boots","Sandals"] },
    { name:"Watches", icon:"⌚", items:["Analog","Digital","Chronograph","Smart Watches"] },
    { name:"Sunglasses", icon:"🕶️", items:["Aviators","Wayfarers","Round","Square"] },
    { name:"Accessories", icon:"💎", items:["Belts","Wallets","Socks","Caps & Hats"] },
  ]},
  { id:"womens", label:"Women's Fashion", icon:"👗", color:"#4a1942", sub:[
    { name:"Western Wear", icon:"👗", items:["Tops & T-Shirts","Dresses","Jumpsuits","Skirts","Shorts"] },
    { name:"Ethnic Wear", icon:"🥻", items:["Kurtis","Sarees","Salwar Suits","Lehengas","Dupattas"] },
    { name:"Winter Wear", icon:"🧥", items:["Hoodies","Sweaters","Jackets","Coats"] },
    { name:"Footwear", icon:"👠", items:["Flats","Heels","Boots","Sneakers","Sandals"] },
    { name:"Watches", icon:"⌚", items:["Analog","Digital","Bracelet Watches","Smart Watches"] },
    { name:"Accessories", icon:"💍", items:["Earrings","Necklaces","Bracelets","Rings","Belts","Hair Accessories"] },
  ]},
  { id:"kids", label:"Kids Fashion", icon:"🎒", color:"#7c2d12", sub:[
    { name:"Boys", icon:"👦", items:["T-Shirts","Shirts","Jeans","Shorts","Ethnic Wear","Nightwear"] },
    { name:"Girls", icon:"👧", items:["Dresses","Tops","Jeans & Leggings","Skirts","Ethnic Wear"] },
    { name:"Footwear", icon:"👟", items:["Casual","Sports","Sandals","School Shoes","Boots"] },
    { name:"Accessories", icon:"🧢", items:["Caps & Hats","Socks","Sunglasses","Watches","School Bags"] },
  ]},
  { id:"baby", label:"Baby Care", icon:"🍼", color:"#1c1917", sub:[
    { name:"Baby Clothing", icon:"👶", items:["Bodysuits","Rompers","Baby Sets","Nightwear","Sweaters"] },
    { name:"Baby Essentials", icon:"🍼", items:["Diaper Bags","Feeding Bottles","Bibs","Baby Towels","Blankets"] },
    { name:"Baby Gear", icon:"🛒", items:["Strollers","Walkers","Car Seats","Baby Carriers"] },
  ]},
  { id:"toys", label:"Toys", icon:"🧸", color:"#065f46", sub:[
    { name:"Educational Toys", icon:"📚", items:[] },
    { name:"Building Blocks", icon:"🧱", items:[] },
    { name:"Dolls & Action Figures", icon:"🪆", items:[] },
    { name:"RC Toys", icon:"🎮", items:[] },
    { name:"Board Games", icon:"♟️", items:[] },
    { name:"Soft Toys", icon:"🧸", items:[] },
    { name:"Outdoor Toys", icon:"⛹️", items:[] },
    { name:"Puzzles", icon:"🧩", items:[] },
  ]},
  { id:"sports", label:"Sports & Fitness", icon:"🏋️", color:"#1a2e05", sub:[
    { name:"Fitness Equipment", icon:"🏋️", items:[] },
    { name:"Yoga & Wellness", icon:"🧘", items:[] },
    { name:"Sports Equipment", icon:"⚽", items:[] },
    { name:"Cycling", icon:"🚴", items:[] },
    { name:"Sports Accessories", icon:"🏅", items:[] },
  ]},
  { id:"bags", label:"Bags", icon:"👜", color:"#451a03", sub:[
    { name:"Backpacks", icon:"🎒", items:["Casual Backpacks","Laptop Backpacks","Travel Backpacks"] },
    { name:"Laptop Bags", icon:"💼", items:["Office Laptop Bags","Sleeves"] },
    { name:"Duffel Bags", icon:"👜", items:["Gym Bags","Travel Duffel Bags","Weekender Bags"] },
    { name:"Travel Luggage", icon:"🧳", items:["Cabin Trolley","Suitcases","Luggage Sets"] },
    { name:"Women's Bags", icon:"👛", items:["Handbags","Clutches","Chain Sling Bags"] },
  ]},
  { id:"health", label:"Health & Beauty", icon:"💊", color:"#3b0764", sub:[
    { name:"Beauty", icon:"💄", items:["Makeup","Skincare","Haircare"] },
    { name:"Personal Care", icon:"🧴", items:["Daily Hygiene Products"] },
    { name:"Health Care", icon:"💊", items:["Vitamins & Supplements"] },
  ]},
];

const PRODUCTS = [
  { id:1,  name:"AirPods Pro Max",        price:24999, orig:29999, cat:"electronics", rating:4.8, reviews:2341, badge:"Bestseller", emoji:"🎧", color:"#1a1a2e" },
  { id:2,  name:"Slim Fit Shirt",         price:1299,  orig:2499,  cat:"mens",        rating:4.5, reviews:876,  badge:"",           emoji:"👔", color:"#16213e" },
  { id:3,  name:"Ceramic Pan Set",        price:3499,  orig:5999,  cat:"home",        rating:4.7, reviews:1203, badge:"",           emoji:"🍳", color:"#0f3460" },
  { id:4,  name:"Kids Learning Tablet",   price:5999,  orig:8999,  cat:"toys",        rating:4.6, reviews:654,  badge:"",           emoji:"📱", color:"#533483" },
  { id:5,  name:"Yoga Mat Pro",           price:1899,  orig:2999,  cat:"sports",      rating:4.9, reviews:3201, badge:"Bestseller", emoji:"🧘", color:"#e94560" },
  { id:6,  name:"Floral Ethnic Kurta",    price:1599,  orig:2999,  cat:"womens",      rating:4.4, reviews:421,  badge:"",           emoji:"👗", color:"#b8316a" },
  { id:7,  name:"Car Dash Camera 4K",     price:4599,  orig:7999,  cat:"auto",        rating:4.6, reviews:987,  badge:"",           emoji:"📷", color:"#2d6a4f" },
  { id:8,  name:"Premium Leather Bag",    price:2999,  orig:4999,  cat:"bags",        rating:4.7, reviews:1543, badge:"Bestseller", emoji:"🎒", color:"#774936" },
  { id:9,  name:"MagSafe Charger",        price:2299,  orig:3499,  cat:"phone",       rating:4.5, reviews:2109, badge:"",           emoji:"🔌", color:"#1b4332" },
  { id:10, name:"Power Bank 30K",         price:1799,  orig:2999,  cat:"electronics", rating:4.8, reviews:4520, badge:"Bestseller", emoji:"🔋", color:"#003049" },
  { id:11, name:"Baby Organic Romper",    price:899,   orig:1499,  cat:"baby",        rating:4.9, reviews:312,  badge:"",           emoji:"🍼", color:"#6d6875" },
  { id:12, name:"RC Racing Car",          price:2499,  orig:3999,  cat:"toys",        rating:4.3, reviews:765,  badge:"",           emoji:"🚗", color:"#d62828" },
];

const ORDERS_DATA = [
  { id:"#ORD-9821", customer:"Rahul Sharma", product:"AirPods Pro Max", amount:"₹24,999", status:"Delivered",  date:"Mar 10" },
  { id:"#ORD-9820", customer:"Priya Singh",  product:"Yoga Mat Pro",    amount:"₹1,899",  status:"Shipped",    date:"Mar 10" },
  { id:"#ORD-9819", customer:"Amit Verma",   product:"Car Dash Camera", amount:"₹4,599",  status:"Processing", date:"Mar 09" },
  { id:"#ORD-9818", customer:"Sneha Patel",  product:"Leather Bag",     amount:"₹2,999",  status:"Cancelled",  date:"Mar 09" },
];

const SC = { Delivered:{bg:"#d1fae5",c:"#065f46"}, Shipped:{bg:"#dbeafe",c:"#1e40af"}, Processing:{bg:"#fef3c7",c:"#92400e"}, Cancelled:{bg:"#fee2e2",c:"#991b1b"} };

// ── PRODUCT CARD ──────────────────────────────────────────────────────────────
function Card({ p, cart, setCart, wl, setWl, user, onLogin }) {
  const [added, setAdded] = useState(false);
  const disc = Math.round((1 - p.price / p.orig) * 100);
  const wished = wl.some(w => w.id === p.id);
  const addCart = () => {
    setCart(c => { const e = c.find(i => i.id === p.id); return e ? c.map(i => i.id===p.id ? {...i,qty:i.qty+1} : i) : [...c,{...p,qty:1}]; });
    setAdded(true); setTimeout(()=>setAdded(false), 1500);
  };
  const toggleWl = () => { if (!user) { onLogin(); return; } setWl(w => wished ? w.filter(x=>x.id!==p.id) : [...w,p]); };
  return (
    <div style={{background:"#fff",borderRadius:16,overflow:"hidden",boxShadow:"0 2px 12px rgba(0,0,0,0.06)",border:"1px solid #f3f4f6",transition:"transform 0.2s,box-shadow 0.2s"}}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 12px 32px rgba(0,0,0,0.12)";}}
      onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,0.06)";}}>
      <div style={{height:170,background:`linear-gradient(135deg,${p.color}22,${p.color}44)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:68,position:"relative"}}>
        {p.emoji}
        {/* Tag (Bestseller/New etc.) — top-left ONLY */}
        {p.badge && (
          <span style={{
            position:"absolute",top:10,left:10,
            background:"#f59e0b",color:"#fff",
            fontSize:10,fontWeight:700,
            padding:"3px 9px",borderRadius:20,
            lineHeight:1.4,letterSpacing:"0.3px",
            whiteSpace:"nowrap"
          }}>{p.badge}</span>
        )}
        {/* Discount badge — bottom-left ONLY, never overlaps with top-left tag */}
        <span style={{
          position:"absolute",bottom:10,left:10,
          background:"linear-gradient(135deg,#10b981,#059669)",
          color:"#fff",fontSize:10,fontWeight:800,
          padding:"3px 9px",borderRadius:20,
          lineHeight:1.4,whiteSpace:"nowrap"
        }}>{disc}% off</span>
        {/* Wishlist heart — top-right, always separate corner */}
        <button onClick={toggleWl} style={{
          position:"absolute",top:10,right:10,
          background:wished?"#fee2e2":"rgba(255,255,255,0.9)",
          border:"none",borderRadius:"50%",
          width:30,height:30,cursor:"pointer",
          fontSize:15,display:"flex",alignItems:"center",justifyContent:"center",
          flexShrink:0
        }}>{wished?"❤️":"🤍"}</button>
      </div>
      <div style={{padding:"12px 14px 14px"}}>
        <p style={{margin:"0 0 4px",fontSize:14,fontWeight:600,color:"#111827",lineHeight:1.3}}>{p.name}</p>
        <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:4}}>
          <span style={{color:"#f59e0b",fontSize:11}}>{"★".repeat(Math.floor(p.rating))}{"☆".repeat(5-Math.floor(p.rating))}</span>
          <span style={{fontSize:11,color:"#9ca3af"}}>{p.rating} ({p.reviews.toLocaleString()})</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <span style={{fontSize:17,fontWeight:800,color:"#111827"}}>₹{p.price.toLocaleString()}</span>
          <span style={{fontSize:11,color:"#9ca3af",textDecoration:"line-through"}}>₹{p.orig.toLocaleString()}</span>
        </div>
        <button onClick={addCart} style={{width:"100%",padding:"9px",borderRadius:9,border:"none",background:added?"#10b981":"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer",transition:"background 0.2s"}}>{added?"✓ Added!":"Add to Cart"}</button>
      </div>
    </div>
  );
}

// ── CART DRAWER ───────────────────────────────────────────────────────────────
function CartDrawer({ cart, setCart, onClose, user, onLogin }) {
  const total = cart.reduce((s,i)=>s+i.price*i.qty, 0);
  const qty   = cart.reduce((s,i)=>s+i.qty, 0);
  return (
    <div style={{position:"fixed",inset:0,zIndex:1000}}>
      <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)"}}/>
      <div style={{position:"absolute",right:0,top:0,bottom:0,width:390,background:"#fff",display:"flex",flexDirection:"column",boxShadow:"-8px 0 40px rgba(0,0,0,0.15)"}}>
        <div style={{padding:"18px 22px",borderBottom:"1px solid #f3f4f6",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:22}}>🛒</span><h2 style={{margin:0,fontSize:19,fontWeight:800}}>Cart</h2>{qty>0&&<span style={{background:"#ede9fe",color:"#6366f1",borderRadius:"50%",width:22,height:22,fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800}}>{qty}</span>}</div>
          <button onClick={onClose} style={{background:"#f3f4f6",border:"none",borderRadius:8,width:30,height:30,cursor:"pointer",fontSize:18,color:"#6b7280"}}>×</button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"10px 22px"}}>
          {cart.length===0 ? <div style={{textAlign:"center",padding:"60px 0",color:"#9ca3af"}}><div style={{fontSize:60}}>🛒</div><p style={{fontSize:16,fontWeight:600,marginTop:14,color:"#374151"}}>Your cart is empty</p></div>
          : cart.map(item=>(
            <div key={item.id} style={{display:"flex",gap:12,padding:"12px 0",borderBottom:"1px solid #f9fafb",alignItems:"center"}}>
              <div style={{width:54,height:54,borderRadius:12,background:`${item.color}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>{item.emoji}</div>
              <div style={{flex:1,minWidth:0}}>
                <p style={{margin:"0 0 4px",fontSize:13,fontWeight:700,color:"#111827",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name}</p>
                <p style={{margin:"0 0 6px",fontSize:14,fontWeight:800,color:"#6366f1"}}>₹{(item.price*item.qty).toLocaleString()}</p>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <button onClick={()=>item.qty===1?setCart(c=>c.filter(i=>i.id!==item.id)):setCart(c=>c.map(i=>i.id===item.id?{...i,qty:i.qty-1}:i))} style={{width:26,height:26,borderRadius:7,border:"1.5px solid #e5e7eb",background:item.qty===1?"#fee2e2":"#f9fafb",color:item.qty===1?"#ef4444":"#374151",cursor:"pointer",fontSize:14,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{item.qty===1?"🗑️":"−"}</button>
                  <span style={{fontSize:14,fontWeight:800,minWidth:18,textAlign:"center"}}>{item.qty}</span>
                  <button onClick={()=>setCart(c=>c.map(i=>i.id===item.id?{...i,qty:i.qty+1}:i))} style={{width:26,height:26,borderRadius:7,border:"1.5px solid #e5e7eb",background:"#f9fafb",cursor:"pointer",fontSize:15,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                </div>
              </div>
              <button onClick={()=>setCart(c=>c.filter(i=>i.id!==item.id))} style={{background:"#fee2e2",border:"none",borderRadius:8,width:32,height:32,cursor:"pointer",fontSize:15,flexShrink:0}}>🗑️</button>
            </div>
          ))}
        </div>
        {cart.length>0&&<div style={{padding:"18px 22px",borderTop:"1px solid #f3f4f6"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
            <span style={{fontSize:16,fontWeight:700}}>Total</span>
            <span style={{fontSize:21,fontWeight:900}}>₹{total.toLocaleString()}</span>
          </div>
          <button onClick={()=>{if(!user){onClose();onLogin();}}} style={{width:"100%",padding:"13px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",fontWeight:800,fontSize:15,cursor:"pointer"}}>
            {user?"Proceed to Checkout":"Sign In to Checkout"}
          </button>
        </div>}
      </div>
    </div>
  );
}

// ── LOGIN MODAL ───────────────────────────────────────────────────────────────
function LoginModal({ onClose, onLogin }) {
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState(""); const [pass, setPass] = useState("");
  const [show, setShow] = useState(false); const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgot, setForgot] = useState(false); const [fEmail, setFEmail] = useState(""); const [fSent, setFSent] = useState(false);
  const [gPicker, setGPicker] = useState(false);
  const G_ACCOUNTS = [{name:"Rahul Sharma",email:"rahul.sharma@gmail.com",av:"R",color:"#4285f4"},{name:"Priya Singh",email:"priya.singh99@gmail.com",av:"P",color:"#ea4335"},{name:"work@gmail.com",email:"work@gmail.com",av:"W",color:"#34a853"}];
  const submit = () => {
    setErr(""); if(!email||!pass){setErr("Fill in all fields.");return;} setLoading(true);
    setTimeout(()=>{ setLoading(false);
      if(email.trim().toLowerCase()===ADMIN_EMAIL&&pass===ADMIN_PASS) onLogin({email,role:"admin",name:"Admin"});
      else if(email.includes("@")&&pass.length>=6) onLogin({email,role:"customer",name:email.split("@")[0]});
      else setErr("Invalid email or password (min 6 chars).");
    },900);
  };
  if(gPicker) return (
    <div style={{position:"fixed",inset:0,zIndex:3000,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div onClick={()=>setGPicker(false)} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.4)"}}/>
      <div style={{position:"relative",background:"#fff",borderRadius:22,width:"100%",maxWidth:340,padding:"26px 22px",boxShadow:"0 24px 80px rgba(0,0,0,0.2)"}}>
        <div style={{textAlign:"center",marginBottom:18}}><p style={{margin:"0 0 4px",fontSize:17,fontWeight:800}}>Sign in with Google</p><p style={{margin:0,fontSize:13,color:"#6b7280"}}>Choose an account for <strong>Shipmora</strong></p></div>
        {G_ACCOUNTS.map((a,i)=>(
          <button key={i} onClick={()=>{setGPicker(false);onLogin({email:a.email,role:"customer",name:a.name});}} style={{display:"flex",alignItems:"center",gap:14,width:"100%",padding:"11px 12px",border:"none",borderRadius:10,background:"none",cursor:"pointer",marginBottom:4,textAlign:"left"}}
            onMouseEnter={e=>e.currentTarget.style.background="#f3f4f6"} onMouseLeave={e=>e.currentTarget.style.background="none"}>
            <div style={{width:40,height:40,borderRadius:"50%",background:a.color,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:16,flexShrink:0}}>{a.av}</div>
            <div><p style={{margin:"0 0 1px",fontSize:14,fontWeight:700}}>{a.name}</p><p style={{margin:0,fontSize:12,color:"#6b7280"}}>{a.email}</p></div>
          </button>
        ))}
        <button onClick={()=>setGPicker(false)} style={{position:"absolute",top:12,right:12,background:"#f3f4f6",border:"none",borderRadius:8,width:26,height:26,cursor:"pointer",fontSize:14,color:"#6b7280"}}>×</button>
      </div>
    </div>
  );
  return (
    <div style={{position:"fixed",inset:0,zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(15,10,40,0.6)"}}/>
      <div style={{position:"relative",background:"#fff",borderRadius:22,width:"100%",maxWidth:410,padding:"32px 32px 28px",boxShadow:"0 24px 80px rgba(99,102,241,0.18)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:22}}>
          <div style={{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🚀</div>
          <span style={{fontSize:21,fontWeight:900,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Shipmora</span>
        </div>
        {forgot ? (
          <>
            <button onClick={()=>{setForgot(false);setFSent(false);setErr("");}} style={{background:"none",border:"none",color:"#6366f1",fontWeight:700,fontSize:13,cursor:"pointer",marginBottom:14,padding:0}}>Back to Sign In</button>
            {fSent ? <div style={{textAlign:"center",padding:"14px 0"}}><div style={{fontSize:52,marginBottom:12}}>📧</div><h3 style={{margin:"0 0 8px",fontSize:19,fontWeight:800}}>Check your inbox!</h3><p style={{margin:"0 0 18px",fontSize:14,color:"#6b7280"}}>Reset link sent to <strong style={{color:"#6366f1"}}>{fEmail}</strong></p><button onClick={()=>{setForgot(false);setFSent(false);}} style={{width:"100%",padding:"11px",borderRadius:11,border:"none",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer"}}>Back to Sign In</button></div>
            : <><h2 style={{margin:"0 0 6px",fontSize:21,fontWeight:900}}>Forgot Password? 🔑</h2><p style={{margin:"0 0 18px",fontSize:14,color:"#6b7280"}}>Enter your email for a reset link.</p><input value={fEmail} onChange={e=>setFEmail(e.target.value)} placeholder="you@example.com" type="email" style={{width:"100%",padding:"10px 13px",borderRadius:9,border:"2px solid #e5e7eb",fontSize:14,outline:"none",boxSizing:"border-box",marginBottom:14}} onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#e5e7eb"}/>{err&&<div style={{background:"#fee2e2",borderRadius:9,padding:"9px 13px",marginBottom:12,fontSize:13,color:"#991b1b"}}>⚠️ {err}</div>}<button onClick={()=>{if(!fEmail.includes("@")){setErr("Enter a valid email.");return;}setFSent(true);}} style={{width:"100%",padding:"12px",borderRadius:11,border:"none",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer"}}>Send Reset Link</button></>}
          </>
        ) : (
          <>
            <div style={{display:"flex",background:"#f3f4f6",borderRadius:11,padding:4,marginBottom:22}}>
              {["login","signup"].map(t=><button key={t} onClick={()=>{setTab(t);setErr("");}} style={{flex:1,padding:"8px",border:"none",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:14,background:tab===t?"#fff":"transparent",color:tab===t?"#6366f1":"#9ca3af"}}>{t==="login"?"Sign In":"Sign Up"}</button>)}
            </div>
            <h2 style={{margin:"0 0 5px",fontSize:21,fontWeight:900}}>{tab==="login"?"Welcome back 👋":"Create account 🎉"}</h2>
            <p style={{margin:"0 0 18px",fontSize:14,color:"#6b7280"}}>{tab==="login"?"Sign in to continue":"Join millions of shoppers"}</p>
            {tab==="signup"&&<div style={{marginBottom:12}}><label style={{display:"block",fontSize:12,fontWeight:700,color:"#374151",marginBottom:5}}>Full Name</label><input placeholder="Your name" style={{width:"100%",padding:"10px 13px",borderRadius:9,border:"2px solid #e5e7eb",fontSize:14,outline:"none",boxSizing:"border-box"}}/></div>}
            <div style={{marginBottom:12}}><label style={{display:"block",fontSize:12,fontWeight:700,color:"#374151",marginBottom:5}}>Email</label><input value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} placeholder="you@example.com" type="email" style={{width:"100%",padding:"10px 13px",borderRadius:9,border:`2px solid ${err?"#fca5a5":"#e5e7eb"}`,fontSize:14,outline:"none",boxSizing:"border-box"}} onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor=err?"#fca5a5":"#e5e7eb"}/></div>
            <div style={{marginBottom:tab==="login"?6:14}}><label style={{display:"block",fontSize:12,fontWeight:700,color:"#374151",marginBottom:5}}>Password</label><div style={{position:"relative"}}><input value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} placeholder={tab==="signup"?"Min 6 chars":"Your password"} type={show?"text":"password"} style={{width:"100%",padding:"10px 42px 10px 13px",borderRadius:9,border:`2px solid ${err?"#fca5a5":"#e5e7eb"}`,fontSize:14,outline:"none",boxSizing:"border-box"}} onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor=err?"#fca5a5":"#e5e7eb"}/><button onClick={()=>setShow(!show)} style={{position:"absolute",right:11,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:15,color:"#9ca3af"}}>{show?"🙈":"👁️"}</button></div></div>
            {tab==="login"&&<div style={{textAlign:"right",marginBottom:14}}><button onClick={()=>{setForgot(true);setFEmail(email);setErr("");}} style={{background:"none",border:"none",color:"#6366f1",fontSize:13,fontWeight:700,cursor:"pointer",padding:0}}>Forgot password?</button></div>}
            {err&&<div style={{background:"#fee2e2",borderRadius:9,padding:"9px 13px",marginBottom:12,fontSize:13,color:"#991b1b"}}>⚠️ {err}</div>}
            <button onClick={submit} disabled={loading} style={{width:"100%",padding:"12px",borderRadius:11,border:"none",background:loading?"#c4b5fd":"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",fontWeight:800,fontSize:14,cursor:loading?"not-allowed":"pointer",marginBottom:18}}>{loading?"Signing in...":tab==="login"?"Sign In":"Create Account"}</button>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}><div style={{flex:1,height:1,background:"#f3f4f6"}}/><span style={{fontSize:12,color:"#9ca3af",fontWeight:600}}>or</span><div style={{flex:1,height:1,background:"#f3f4f6"}}/></div>
            <button onClick={()=>setGPicker(true)} style={{width:"100%",padding:"10px",border:"2px solid #e5e7eb",borderRadius:10,background:"#fff",cursor:"pointer",fontWeight:700,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",gap:10,color:"#374151"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#4285f4";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#e5e7eb";}}>
              <svg width="17" height="17" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
              Continue with Google
            </button>
          </>
        )}
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"#f3f4f6",border:"none",borderRadius:8,width:28,height:28,cursor:"pointer",fontSize:15,color:"#6b7280",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [user,      setUser]      = useState(null);
  const [mode,      setMode]      = useState("store");
  const [view,      setView]      = useState("home");
  const [activeCat, setActiveCat] = useState(null);
  const [activeSub, setActiveSub] = useState(null);
  const [activeItem,setActiveItem]= useState(null);
  const [cart,      setCart]      = useState([]);
  const [wl,        setWl]        = useState([]);
  const [cartOpen,  setCartOpen]  = useState(false);
  const [wlOpen,    setWlOpen]    = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [catFilter, setCatFilter] = useState("all");
  const [megaOpen,  setMegaOpen]  = useState(false);
  const [hovCat,    setHovCat]    = useState(null);
  const [hovSub,    setHovSub]    = useState(null);
  const [acctTab,   setAcctTab]   = useState("profile");
  const [adminTab,  setAdminTab]  = useState("dashboard");
  const [flash,     setFlash]     = useState({h:3,m:42,s:17});
  const [infoPage,  setInfoPage]  = useState(null);

  useEffect(()=>{
    const t = setInterval(()=>setFlash(p=>{let{h,m,s}=p;s--;if(s<0){s=59;m--;}if(m<0){m=59;h--;}return{h,m,s};}),1000);
    const styleEl = document.createElement("style");
    styleEl.textContent = "#cat-carousel::-webkit-scrollbar{display:none}";
    document.head.appendChild(styleEl);
    const autoScroll = setInterval(()=>{
      const el = document.getElementById("cat-carousel");
      if(!el || el._dragging) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if(el.scrollLeft >= maxScroll - 2){ el.scrollTo({left:0,behavior:"smooth"}); }
      else{ el.scrollBy({left:110,behavior:"smooth"}); }
    }, 2200);
    return ()=>{ clearInterval(t); clearInterval(autoScroll); document.head.removeChild(styleEl); };
  },[]);

  const pad = n => String(n).padStart(2,"0");
  const totalQty = cart.reduce((s,i)=>s+i.qty,0);

  const go    = (v)  => { setView(v); setActiveCat(null); setActiveSub(null); setActiveItem(null); setInfoPage(null); window.scrollTo({top:0,behavior:"smooth"}); };
  const goCat = (id) => { setActiveCat(id); setActiveSub(null); setActiveItem(null); setView("cat"); window.scrollTo({top:0,behavior:"smooth"}); };
  const goSub = (id,sn) => { setActiveCat(id); setActiveSub(sn); setActiveItem(null); setView("sub"); window.scrollTo({top:0,behavior:"smooth"}); };
  const goItem= (id,sn,item) => { setActiveCat(id); setActiveSub(sn); setActiveItem(item); setView("item"); window.scrollTo({top:0,behavior:"smooth"}); };
  const goInfo = (p) => { setInfoPage(p); setView("info"); window.scrollTo({top:0,behavior:"smooth"}); };

  const filtered = PRODUCTS.filter(p => catFilter==="all" || p.cat===catFilter);
  const catData  = CATS.find(c=>c.id===activeCat);
  const subData  = catData?.sub.find(s=>s.name===activeSub);
  const catProds = PRODUCTS.filter(p=>p.cat===activeCat);

  const INFO = {
    "About Us":     {icon:"🚀",color:"linear-gradient(135deg,#1e1b4b,#4c1d95)",desc:"Founded in 2022, Shipmora serves 10M+ customers across 500+ cities.",stats:[{h:"10M+",l:"Customers"},{h:"500+",l:"Cities"},{h:"1M+",l:"Products"},{h:"50K+",l:"Sellers"}]},
    "Careers":      {icon:"💼",color:"linear-gradient(135deg,#065f46,#047857)",desc:"Competitive pay, stock options, remote work, health insurance.",jobs:["Senior Frontend Engineer","Product Manager","Data Scientist","UX Designer","Marketing Intern"]},
    "Press":        {icon:"📰",color:"linear-gradient(135deg,#1e3a5f,#1e40af)",desc:"Contact press@shipmora.com for media enquiries.",press:["Raises ₹500 Cr Series C","Same-Day Delivery in 50 Cities","10 Million Customers","Partnership with India Post"]},
    "Blog":         {icon:"✍️",color:"linear-gradient(135deg,#7c2d12,#c2410c)",desc:"Stories and tips from our team.",posts:["10 Smart Shopping Hacks","How We Cut Delivery Time by 40%","Rise of Sustainable Shopping","Meet the Sellers"]},
    "Contact Us":   {icon:"💬",color:"linear-gradient(135deg,#155e75,#0e7490)",desc:"We are always here to help.",contacts:[{icon:"📧",l:"Email",v:"support@shipmora.com"},{icon:"📞",l:"Phone",v:"+91 1800-SHIP-MORA"},{icon:"💬",l:"Live Chat",v:"Under 2 min wait"},{icon:"📍",l:"Office",v:"45, Koramangala, Bengaluru"}]},
    "FAQs":         {icon:"❓",color:"linear-gradient(135deg,#4a1942,#7e1d7e)",desc:"Quick answers to common questions.",faqs:[{q:"How long does delivery take?",a:"Standard 3-5 days, Express next-day in 100+ cities."},{q:"What payments are accepted?",a:"Cards, UPI, wallets, net banking, Cash on Delivery."},{q:"What is the return policy?",a:"30-day returns. Free pickup within 48 hours."},{q:"How long do refunds take?",a:"5-7 business days to original payment method."}]},
    "Returns":      {icon:"↩️",color:"linear-gradient(135deg,#1c1917,#44403c)",desc:"30-day hassle-free returns. Free pickup, refund in 5-7 days.",steps:["Initiate in My Orders","Schedule free pickup","Pack item securely","Refund processed"]},
    "Shipping":     {icon:"🚚",color:"linear-gradient(135deg,#0c4a6e,#0369a1)",desc:"Delivering to 500+ cities across India.",delivery:[{t:"Standard",time:"3-5 days",cost:"Free above ₹999"},{t:"Express",time:"Next day",cost:"₹149 flat"},{t:"Same-Day",time:"Within 6 hrs",cost:"₹199 flat"},{t:"Scheduled",time:"Choose slot",cost:"₹99 flat"}]},
    "Privacy Policy":{icon:"🔒",color:"linear-gradient(135deg,#1e1b4b,#312e81)",desc:"We never sell your data. Contact privacy@shipmora.com for requests.",sections:["Data Collection","How We Use It","Data Sharing","Your Rights","Cookies"]},
    "Terms":        {icon:"📜",color:"linear-gradient(135deg,#1c1917,#292524)",desc:"By using Shipmora you agree to these terms. Users must be 18+.",sections:["Acceptance","User Accounts","Orders & Payments","Prohibited Activities","Liability"]},
    "Cookie Policy":{icon:"🍪",color:"linear-gradient(135deg,#451a03,#92400e)",desc:"We use essential, analytics and marketing cookies.",cookies:[{t:"Essential",r:true},{t:"Analytics",r:false},{t:"Marketing",r:false},{t:"Preference",r:false}]},
    "Compliance":   {icon:"⚖️",color:"linear-gradient(135deg,#0f172a,#1e293b)",desc:"Compliant with IT Act 2000, DPDPA 2023 and all RBI guidelines.",sections:["Regulatory","Data Protection","Seller Compliance","Grievance Redressal"]},
  };

  // Breadcrumb helper
  const Breadcrumb = ({items}) => (
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:18,flexWrap:"wrap"}}>
      {items.map((it,i)=>(
        <span key={i} style={{display:"flex",alignItems:"center",gap:8}}>
          {it.action
            ? <button onClick={it.action} style={{background:"rgba(255,255,255,0.12)",border:"none",borderRadius:7,padding:"4px 11px",color:"rgba(255,255,255,0.75)",fontSize:12,cursor:"pointer",fontWeight:600}}>{it.label}</button>
            : <span style={{background:"rgba(255,255,255,0.18)",borderRadius:7,padding:"4px 11px",color:"#fff",fontSize:12,fontWeight:700}}>{it.label}</span>}
          {i<items.length-1&&<span style={{color:"rgba(255,255,255,0.4)",fontSize:14}}>›</span>}
        </span>
      ))}
    </div>
  );

  if (mode==="admin") {
    // ── ADMIN PANEL ────────────────────────────────────────────────────────────
    return (
      <div style={{display:"flex",minHeight:"100vh",fontFamily:"system-ui,sans-serif",background:"#f9fafb"}}>
        <aside style={{width:210,background:"#1e1b4b",display:"flex",flexDirection:"column",flexShrink:0}}>
          <div style={{padding:"18px 14px",borderBottom:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",gap:9}}>
            <div style={{width:32,height:32,borderRadius:9,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🚀</div>
            <span style={{fontSize:16,fontWeight:900,color:"#fff"}}>Shipmora</span>
          </div>
          <nav style={{flex:1,padding:"8px 6px"}}>
            {[{id:"dashboard",icon:"📊",label:"Dashboard"},{id:"products",icon:"📦",label:"Products"},{id:"orders",icon:"🛒",label:"Orders"},{id:"customers",icon:"👥",label:"Customers"},{id:"marketing",icon:"📣",label:"Marketing"},{id:"analytics",icon:"📈",label:"Analytics"},{id:"settings",icon:"⚙️",label:"Settings"}].map(item=>(
              <button key={item.id} onClick={()=>setAdminTab(item.id)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 12px",borderRadius:9,border:"none",cursor:"pointer",background:adminTab===item.id?"rgba(99,102,241,0.2)":"transparent",color:adminTab===item.id?"#a5b4fc":"#7c85a2",fontWeight:adminTab===item.id?700:500,fontSize:14,marginBottom:2,textAlign:"left",borderLeft:adminTab===item.id?"3px solid #6366f1":"3px solid transparent"}}>
                <span style={{fontSize:17}}>{item.icon}</span>{item.label}
              </button>
            ))}
          </nav>
          <div style={{padding:"10px 6px",borderTop:"1px solid rgba(255,255,255,0.08)"}}>
            <button onClick={()=>setMode("store")} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"9px 12px",borderRadius:9,border:"none",cursor:"pointer",background:"rgba(239,68,68,0.15)",color:"#fca5a5",fontWeight:700,fontSize:14}}>
              <span style={{fontSize:17}}>🏪</span>View Store
            </button>
          </div>
        </aside>
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <header style={{background:"#fff",borderBottom:"1px solid #e5e7eb",padding:"0 24px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <h2 style={{margin:0,fontSize:17,fontWeight:800,color:"#111827",textTransform:"capitalize"}}>{adminTab}</h2>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:13}}>A</div>
              <div><p style={{margin:0,fontSize:12,fontWeight:700}}>Admin</p><p style={{margin:0,fontSize:11,color:"#9ca3af"}}>{ADMIN_EMAIL}</p></div>
              <button onClick={()=>{setUser(null);setMode("store");}} style={{background:"#fee2e2",color:"#ef4444",border:"none",borderRadius:8,padding:"6px 12px",fontSize:12,cursor:"pointer",fontWeight:700}}>Logout</button>
            </div>
          </header>
          <main style={{flex:1,overflowY:"auto",padding:"24px"}}>
            {adminTab==="dashboard"&&(
              <div>
                <h1 style={{margin:"0 0 20px",fontSize:22,fontWeight:900}}>Dashboard</h1>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:24}}>
                  {[{l:"Revenue",v:"₹18,42,390",ch:"+23%",ic:"💰",up:true},{l:"Orders Today",v:"1,284",ch:"+12%",ic:"📦",up:true},{l:"Customers",v:"48,291",ch:"+8%",ic:"👥",up:true},{l:"Refunds",v:"34",ch:"-5%",ic:"↩️",up:false}].map((s,i)=>(
                    <div key={i} style={{background:"#fff",borderRadius:14,padding:"18px 20px",border:"1px solid #f3f4f6"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                        <div><p style={{margin:"0 0 6px",fontSize:12,color:"#6b7280",fontWeight:600}}>{s.l}</p><p style={{margin:"0 0 6px",fontSize:22,fontWeight:900,color:"#111827"}}>{s.v}</p><span style={{fontSize:11,fontWeight:700,color:s.up?"#10b981":"#ef4444"}}>{s.up?"↑":"↓"} {s.ch}</span></div>
                        <div style={{fontSize:24,background:"#f9fafb",borderRadius:10,padding:"8px 10px"}}>{s.ic}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{background:"#fff",borderRadius:14,padding:"20px",border:"1px solid #f3f4f6"}}>
                  <h3 style={{margin:"0 0 16px",fontWeight:800,fontSize:15}}>Recent Orders</h3>
                  <table style={{width:"100%",borderCollapse:"collapse"}}>
                    <thead><tr>{["Order","Customer","Product","Amount","Status","Date"].map(h=><th key={h} style={{textAlign:"left",padding:"7px 10px",fontSize:11,color:"#9ca3af",fontWeight:700,borderBottom:"1px solid #f3f4f6"}}>{h}</th>)}</tr></thead>
                    <tbody>{ORDERS_DATA.map((o,i)=><tr key={i} style={{borderBottom:"1px solid #f9fafb"}}><td style={{padding:"11px 10px",fontSize:12,fontWeight:700,color:"#6366f1"}}>{o.id}</td><td style={{padding:"11px 10px",fontSize:12}}>{o.customer}</td><td style={{padding:"11px 10px",fontSize:12}}>{o.product}</td><td style={{padding:"11px 10px",fontSize:12,fontWeight:700}}>{o.amount}</td><td style={{padding:"11px 10px"}}><span style={{padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:700,background:SC[o.status]?.bg,color:SC[o.status]?.c}}>{o.status}</span></td><td style={{padding:"11px 10px",fontSize:12,color:"#6b7280"}}>{o.date}</td></tr>)}</tbody>
                  </table>
                </div>
              </div>
            )}
            {adminTab==="products"&&(
              <div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
                  <h1 style={{margin:0,fontSize:22,fontWeight:900}}>Products</h1>
                  <button style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",border:"none",borderRadius:9,padding:"9px 18px",fontWeight:700,cursor:"pointer",fontSize:13}}>+ Add Product</button>
                </div>
                <div style={{background:"#fff",borderRadius:14,border:"1px solid #f3f4f6",overflow:"hidden"}}>
                  <table style={{width:"100%",borderCollapse:"collapse"}}>
                    <thead><tr style={{background:"#f9fafb"}}>{["Product","Category","Price","Rating","Actions"].map(h=><th key={h} style={{textAlign:"left",padding:"10px 14px",fontSize:11,color:"#6b7280",fontWeight:700}}>{h}</th>)}</tr></thead>
                    <tbody>{PRODUCTS.map(p=><tr key={p.id} style={{borderTop:"1px solid #f3f4f6"}}><td style={{padding:"12px 14px"}}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:38,height:38,borderRadius:9,background:`${p.color}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{p.emoji}</div><p style={{margin:0,fontSize:13,fontWeight:700}}>{p.name}</p></div></td><td style={{padding:"12px 14px",fontSize:12}}>{CATS.find(c=>c.id===p.cat)?.label}</td><td style={{padding:"12px 14px",fontSize:13,fontWeight:800}}>₹{p.price.toLocaleString()}</td><td style={{padding:"12px 14px",fontSize:12,color:"#f59e0b"}}>★ {p.rating}</td><td style={{padding:"12px 14px"}}><div style={{display:"flex",gap:6}}><button style={{background:"#ede9fe",color:"#6366f1",border:"none",borderRadius:7,padding:"5px 10px",fontSize:12,cursor:"pointer",fontWeight:600}}>Edit</button><button style={{background:"#fee2e2",color:"#ef4444",border:"none",borderRadius:7,padding:"5px 10px",fontSize:12,cursor:"pointer",fontWeight:600}}>Delete</button></div></td></tr>)}</tbody>
                  </table>
                </div>
              </div>
            )}
            {adminTab==="orders"&&(
              <div>
                <h1 style={{margin:"0 0 20px",fontSize:22,fontWeight:900}}>Orders</h1>
                <div style={{background:"#fff",borderRadius:14,padding:"20px",border:"1px solid #f3f4f6"}}>
                  <table style={{width:"100%",borderCollapse:"collapse"}}>
                    <thead><tr style={{background:"#f9fafb"}}>{["Order","Customer","Product","Amount","Status","Date"].map(h=><th key={h} style={{textAlign:"left",padding:"9px 12px",fontSize:11,color:"#6b7280",fontWeight:700}}>{h}</th>)}</tr></thead>
                    <tbody>{ORDERS_DATA.map((o,i)=><tr key={i} style={{borderTop:"1px solid #f3f4f6"}}><td style={{padding:"12px",fontSize:12,fontWeight:700,color:"#6366f1"}}>{o.id}</td><td style={{padding:"12px",fontSize:12}}>{o.customer}</td><td style={{padding:"12px",fontSize:12}}>{o.product}</td><td style={{padding:"12px",fontSize:12,fontWeight:800}}>{o.amount}</td><td style={{padding:"12px"}}><span style={{padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:700,background:SC[o.status]?.bg,color:SC[o.status]?.c}}>{o.status}</span></td><td style={{padding:"12px",fontSize:12,color:"#6b7280"}}>{o.date}</td></tr>)}</tbody>
                  </table>
                </div>
              </div>
            )}
            {["customers","marketing","analytics","settings"].includes(adminTab)&&(
              <div><h1 style={{margin:"0 0 18px",fontSize:22,fontWeight:900,textTransform:"capitalize"}}>{adminTab}</h1><div style={{background:"#fff",borderRadius:14,padding:"40px",border:"1px solid #f3f4f6",textAlign:"center",color:"#9ca3af"}}><div style={{fontSize:60,marginBottom:14}}>🚧</div><p style={{fontSize:17,fontWeight:600,color:"#374151"}}>Coming Soon</p></div></div>
            )}
          </main>
        </div>
      </div>
    );
  }

  // ── STORE ──────────────────────────────────────────────────────────────────
  return (
    <div style={{fontFamily:"system-ui,sans-serif",background:"#fafafa",minHeight:"100vh"}}>
      <div style={{background:"#1e1b4b",color:"#c4b5fd",fontSize:12,textAlign:"center",padding:"7px"}}>
        🎉 Free shipping above ₹999 · Use code <strong style={{color:"#fbbf24"}}>SHIP50</strong> for 50% off
      </div>
      <header style={{background:"#fff",borderBottom:"1px solid #e5e7eb",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 16px rgba(0,0,0,0.06)"}}>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 20px"}}>
          <div style={{display:"flex",alignItems:"center",height:62,gap:18}}>
            <div onClick={()=>go("home")} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
              <div style={{width:34,height:34,borderRadius:9,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>🚀</div>
              <span style={{fontSize:21,fontWeight:900,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Shipmora</span>
            </div>
            <div style={{flex:1,position:"relative"}}>
              <input placeholder="Search products, brands..." style={{width:"100%",padding:"9px 14px 9px 42px",borderRadius:11,border:"2px solid #e5e7eb",fontSize:14,outline:"none",background:"#f9fafb",boxSizing:"border-box"}} onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#e5e7eb"}/>
              <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",fontSize:17,color:"#9ca3af"}}>🔍</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              {user?.role==="admin"&&<button onClick={()=>setMode("admin")} style={{background:"linear-gradient(135deg,#1e1b4b,#312e81)",color:"#fff",border:"none",borderRadius:9,padding:"7px 13px",fontSize:12,cursor:"pointer",fontWeight:700}}>🔐 Admin</button>}
              {user ? (
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div onClick={()=>{setAcctTab("profile");go("account");}} style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer"}}>{user.name[0].toUpperCase()}</div>
                  <button onClick={()=>{setUser(null);setMode("store");go("home");}} style={{background:"#fee2e2",color:"#ef4444",border:"none",borderRadius:8,padding:"5px 10px",fontSize:12,cursor:"pointer",fontWeight:700}}>Logout</button>
                </div>
              ) : <button onClick={()=>setShowLogin(true)} style={{background:"#ede9fe",color:"#6366f1",border:"none",borderRadius:9,padding:"7px 13px",fontSize:13,cursor:"pointer",fontWeight:700}}>👤 Sign In</button>}
              <button onClick={()=>{if(!user){setShowLogin(true);}else{setWlOpen(true);}}} style={{background:"none",border:"none",fontSize:21,cursor:"pointer",position:"relative",color:"#ef4444"}}>
                ❤️{wl.length>0&&user&&<span style={{position:"absolute",top:-5,right:-5,background:"#ef4444",color:"#fff",borderRadius:"50%",width:16,height:16,fontSize:9,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800}}>{wl.length}</span>}
              </button>
              <button onClick={()=>setCartOpen(true)} style={{background:"none",border:"none",fontSize:21,cursor:"pointer",position:"relative",color:"#374151"}}>
                🛒{totalQty>0&&<span style={{position:"absolute",top:-5,right:-5,background:"#6366f1",color:"#fff",borderRadius:"50%",width:16,height:16,fontSize:9,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800}}>{totalQty}</span>}
              </button>
            </div>
          </div>
          {/* Nav */}
          <nav style={{display:"flex",alignItems:"center",position:"relative"}}>
            <div onMouseEnter={()=>setMegaOpen(true)} onMouseLeave={()=>{setMegaOpen(false);setHovCat(null);setHovSub(null);}} style={{position:"relative"}}>
              <button style={{display:"flex",alignItems:"center",gap:7,background:megaOpen?"#ede9fe":"none",border:"none",padding:"9px 14px",fontSize:13,fontWeight:700,cursor:"pointer",color:megaOpen?"#6366f1":"#374151",borderBottom:megaOpen?"2px solid #6366f1":"2px solid transparent"}}>
                ☰ All Categories ▾
              </button>
              {megaOpen&&(
                <div style={{position:"absolute",top:"100%",left:0,display:"flex",background:"#fff",borderRadius:"0 14px 14px 14px",boxShadow:"0 20px 60px rgba(0,0,0,0.15)",border:"1px solid #f3f4f6",borderTop:"3px solid #6366f1",zIndex:300,minHeight:400}}>
                  {/* Col1 */}
                  <div style={{width:210,borderRight:"1px solid #f3f4f6",padding:"6px 0",background:"#fafafa",overflowY:"auto",maxHeight:480}}>
                    {CATS.map(cat=>(
                      <button key={cat.id}
                        onMouseEnter={()=>{setHovCat(cat.id);setHovSub(null);}}
                        onClick={()=>{goCat(cat.id);setMegaOpen(false);setHovCat(null);setHovSub(null);}}
                        style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"10px 14px",border:"none",background:hovCat===cat.id?"#ede9fe":"transparent",color:hovCat===cat.id?"#6366f1":"#374151",fontSize:13,fontWeight:hovCat===cat.id?700:500,cursor:"pointer",borderLeft:hovCat===cat.id?"3px solid #6366f1":"3px solid transparent"}}>
                        <span style={{display:"flex",alignItems:"center",gap:8}}>
                          <span style={{width:26,height:26,borderRadius:7,fontSize:14,background:hovCat===cat.id?"rgba(99,102,241,0.15)":"#f3f4f6",display:"flex",alignItems:"center",justifyContent:"center"}}>{cat.icon}</span>
                          {cat.label}
                        </span>
                        <span style={{fontSize:10,color:hovCat===cat.id?"#6366f1":"#d1d5db"}}>›</span>
                      </button>
                    ))}
                  </div>
                  {/* Col2 - Subcategories */}
                  <div style={{width:210,borderRight:"1px solid #f3f4f6",padding:"8px 4px",overflowY:"auto",maxHeight:480}}>
                    {hovCat ? (()=>{
                      const hcat = CATS.find(c=>c.id===hovCat);
                      return (<>
                        <p style={{margin:"0 0 6px 8px",fontSize:10,fontWeight:800,color:"#9ca3af",textTransform:"uppercase",letterSpacing:"1px"}}>{hcat.icon} {hcat.label}</p>
                        {hcat.sub.map(s=>(
                          <button key={s.name}
                            onMouseEnter={()=>setHovSub(s.name)}
                            onClick={()=>{goSub(hcat.id,s.name);setMegaOpen(false);setHovCat(null);setHovSub(null);}}
                            style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"9px 10px",border:"none",background:hovSub===s.name?"#f5f3ff":"none",fontSize:13,color:hovSub===s.name?"#6366f1":"#374151",cursor:"pointer",borderRadius:7,fontWeight:hovSub===s.name?700:500,transition:"background 0.1s"}}>
                            <span style={{display:"flex",alignItems:"center",gap:7}}><span>{s.icon}</span>{s.name}</span>
                            {s.items.length>0&&<span style={{fontSize:10,color:hovSub===s.name?"#6366f1":"#d1d5db",flexShrink:0}}>›</span>}
                          </button>
                        ))}
                        <div style={{marginTop:8,paddingTop:8,borderTop:"1px solid #f3f4f6",padding:"8px 10px 0"}}>
                          <button onClick={()=>{goCat(hcat.id);setMegaOpen(false);setHovCat(null);setHovSub(null);}} style={{width:"100%",padding:"7px 10px",background:"#ede9fe",border:"none",fontSize:12,color:"#6366f1",cursor:"pointer",borderRadius:7,fontWeight:700,textAlign:"left"}}>View all in {hcat.label}</button>
                        </div>
                      </>);
                    })() : <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"80%",paddingTop:60,color:"#9ca3af"}}><span style={{fontSize:34}}>👈</span><p style={{margin:"10px 0 0",fontSize:12,fontWeight:600}}>Hover a category</p></div>}
                  </div>
                  {/* Col3 - Sub-subcategories */}
                  <div style={{width:190,padding:"8px 4px",overflowY:"auto",maxHeight:480}}>
                    {hovSub&&hovCat ? (()=>{
                      const hcat = CATS.find(c=>c.id===hovCat);
                      const hsub = hcat?.sub.find(s=>s.name===hovSub);
                      if(!hsub||hsub.items.length===0) return null;
                      return (<>
                        <p style={{margin:"0 0 6px 8px",fontSize:10,fontWeight:800,color:"#9ca3af",textTransform:"uppercase",letterSpacing:"1px"}}>{hsub.icon} {hovSub}</p>
                        {hsub.items.map(item=>(
                          <button key={item}
                            onClick={()=>{goItem(hovCat,hovSub,item);setMegaOpen(false);setHovCat(null);setHovSub(null);}}
                            style={{display:"block",width:"100%",padding:"8px 10px",border:"none",background:"none",fontSize:12,color:"#374151",cursor:"pointer",borderRadius:7,textAlign:"left",fontWeight:500,transition:"all 0.1s"}}
                            onMouseEnter={e=>{e.currentTarget.style.background="#f5f3ff";e.currentTarget.style.color="#6366f1";e.currentTarget.style.fontWeight=700;}}
                            onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color="#374151";e.currentTarget.style.fontWeight=500;}}>
                            {item}
                          </button>
                        ))}
                      </>);
                    })() : <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"80%",paddingTop:60,color:"#e5e7eb"}}><span style={{fontSize:28}}>👈</span><p style={{margin:"8px 0 0",fontSize:11,fontWeight:600,color:"#d1d5db"}}>Hover a subcategory</p></div>}
                  </div>
                </div>
              )}
            </div>
            {[{label:"New Arrivals",v:"newArrivals",col:"#374151"},{label:"Flash Sale ⚡",v:"flashSale",col:"#ef4444"},{label:"Trending 🔥",v:"products",col:"#f59e0b"}].map((item,i)=>(
              <button key={i} onClick={()=>go(item.v)} style={{background:"none",border:"none",padding:"9px 13px",fontSize:13,fontWeight:600,cursor:"pointer",color:view===item.v?"#6366f1":item.col,borderBottom:view===item.v?"2px solid #6366f1":"2px solid transparent",whiteSpace:"nowrap"}}
                onMouseEnter={e=>{e.currentTarget.style.color="#6366f1";e.currentTarget.style.borderBottomColor="#6366f1";}}
                onMouseLeave={e=>{e.currentTarget.style.color=view===item.v?"#6366f1":item.col;e.currentTarget.style.borderBottomColor=view===item.v?"#6366f1":"transparent";}}>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main style={{maxWidth:1280,margin:"0 auto",padding:"0 20px"}}>

        {/* HOME */}
        {view==="home"&&<>
          <div style={{marginTop:22,borderRadius:22,overflow:"hidden",background:"linear-gradient(135deg,#1e1b4b 0%,#312e81 40%,#4c1d95 100%)",padding:"56px 44px",display:"flex",alignItems:"center",justifyContent:"space-between",minHeight:320,position:"relative"}}>
            <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>{[0,1,2,3,4].map(i=><div key={i} style={{position:"absolute",borderRadius:"50%",background:"rgba(255,255,255,0.04)",width:200+i*80,height:200+i*80,top:(-20+i*10)+"%",right:(-10+i*5)+"%"}}/>)}</div>
            <div style={{zIndex:1}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(99,102,241,0.3)",borderRadius:20,padding:"6px 14px",marginBottom:18}}><span style={{color:"#fbbf24"}}>⚡</span><span style={{color:"#c4b5fd",fontSize:13,fontWeight:600}}>Flash Sale — Ends in {pad(flash.h)}:{pad(flash.m)}:{pad(flash.s)}</span></div>
              <h1 style={{margin:"0 0 14px",color:"#fff",fontSize:40,fontWeight:900,lineHeight:1.1}}>Everything<br/><span style={{color:"#a5b4fc"}}>You Need,</span><br/>Delivered Fast</h1>
              <p style={{margin:"0 0 24px",color:"#c4b5fd",fontSize:14,maxWidth:400}}>Shop 1M+ products across fashion, electronics, home & more.</p>
              <div style={{display:"flex",gap:10}}>
                <button onClick={()=>go("flashSale")} style={{background:"linear-gradient(135deg,#fbbf24,#f59e0b)",color:"#1e1b4b",border:"none",borderRadius:11,padding:"12px 24px",fontSize:14,fontWeight:800,cursor:"pointer"}}>Flash Sale</button>
              </div>
            </div>
            <div style={{display:"flex",gap:14,zIndex:1}}>
              {[{e:"🎧",n:"Up to 60% off",c:"#fbbf24"},{e:"👗",n:"Fashion Week",c:"#f472b6"},{e:"📱",n:"Latest Gadgets",c:"#34d399"}].map((item,i)=>(
                <div key={i} style={{background:"rgba(255,255,255,0.08)",backdropFilter:"blur(8px)",borderRadius:14,padding:"18px",textAlign:"center",border:"1px solid rgba(255,255,255,0.12)",minWidth:90}}>
                  <div style={{fontSize:32}}>{item.e}</div>
                  <div style={{color:item.c,fontWeight:700,fontSize:11,marginTop:7}}>{item.n}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{marginTop:28}}>
            <h2 style={{fontSize:20,fontWeight:800,color:"#111827",marginBottom:14}}>Shop by Category</h2>
            <div style={{position:"relative"}}>
              <div id="cat-carousel"
                style={{display:"flex",gap:10,overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",paddingBottom:4,cursor:"grab"}}
                onMouseDown={e=>{const el=e.currentTarget;el._dragging=true;el._startX=e.pageX-el.offsetLeft;el._scrollLeft=el.scrollLeft;el.style.cursor="grabbing";el.style.userSelect="none";}}
                onMouseMove={e=>{const el=e.currentTarget;if(!el._dragging)return;e.preventDefault();const x=e.pageX-el.offsetLeft;const walk=(x-el._startX)*1.5;el.scrollLeft=el._scrollLeft-walk;}}
                onMouseUp={e=>{const el=e.currentTarget;el._dragging=false;el.style.cursor="grab";el.style.userSelect="";}}
                onMouseLeave={e=>{const el=e.currentTarget;el._dragging=false;el.style.cursor="grab";el.style.userSelect="";}}>
                {CATS.map(cat=>(
                  <button key={cat.id} onClick={()=>goCat(cat.id)}
                    style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,background:"#fff",border:"2px solid #f3f4f6",borderRadius:14,padding:0,cursor:"pointer",flexShrink:0,width:100,height:100,transition:"all 0.2s",boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor="#6366f1";e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 8px 20px rgba(99,102,241,0.15)";e.currentTarget.style.background="#f5f3ff";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="#f3f4f6";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,0.05)";e.currentTarget.style.background="#fff";}}>
                    <span style={{fontSize:28,lineHeight:1}}>{cat.icon}</span>
                    <span style={{fontSize:10,fontWeight:700,color:"#374151",textAlign:"center",lineHeight:1.3,padding:"0 6px",width:"100%",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{marginTop:24,background:"linear-gradient(135deg,#ef4444,#dc2626)",borderRadius:18,padding:"18px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}><span style={{fontSize:32}}>⚡</span><div><p style={{margin:0,color:"#fff",fontSize:18,fontWeight:900}}>Flash Sale!</p><p style={{margin:0,color:"#fca5a5",fontSize:13}}>Up to 70% off</p></div></div>
            <div style={{display:"flex",gap:7}}>{[{v:flash.h,l:"HRS"},{v:flash.m,l:"MIN"},{v:flash.s,l:"SEC"}].map((t,i)=><div key={i} style={{background:"rgba(0,0,0,0.3)",borderRadius:9,padding:"9px 12px",textAlign:"center",minWidth:48}}><div style={{color:"#fff",fontSize:20,fontWeight:900}}>{pad(t.v)}</div><div style={{color:"#fca5a5",fontSize:9,fontWeight:700}}>{t.l}</div></div>)}</div>
            <button onClick={()=>go("flashSale")} style={{background:"#fff",color:"#ef4444",border:"none",borderRadius:10,padding:"10px 20px",fontWeight:800,cursor:"pointer",fontSize:13}}>Shop Now</button>
          </div>
          <div style={{marginTop:32}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <h2 style={{margin:0,fontSize:20,fontWeight:800,color:"#111827"}}>🔥 Trending Products</h2>
              <button onClick={()=>go("products")} style={{background:"none",border:"none",color:"#6366f1",fontWeight:700,cursor:"pointer",fontSize:13}}>View All</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:18}}>
              {PRODUCTS.slice(0,8).map(p=><Card key={p.id} p={p} cart={cart} setCart={setCart} wl={wl} setWl={setWl} user={user} onLogin={()=>setShowLogin(true)}/>)}
            </div>
          </div>
          <div style={{marginTop:36,marginBottom:44,display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:18}}>
            {[{icon:"🚚",title:"Free Delivery",desc:"On orders above ₹999"},{icon:"↩️",title:"Easy Returns",desc:"30-day return policy"},{icon:"🔒",title:"Secure Payments",desc:"100% safe & encrypted"},{icon:"🎧",title:"24/7 Support",desc:"Always here to help"}].map((b,i)=>(
              <div key={i} style={{background:"#fff",borderRadius:14,padding:"18px",textAlign:"center",border:"1px solid #f3f4f6"}}>
                <div style={{fontSize:32,marginBottom:7}}>{b.icon}</div>
                <p style={{margin:"0 0 3px",fontWeight:700,fontSize:14,color:"#111827"}}>{b.title}</p>
                <p style={{margin:0,fontSize:11,color:"#6b7280"}}>{b.desc}</p>
              </div>
            ))}
          </div>
        </>}

        {/* ALL PRODUCTS */}
        {view==="products"&&<div style={{marginTop:22,paddingBottom:44}}>
          <h1 style={{margin:"0 0 6px",fontSize:22,fontWeight:800}}>{catFilter==="all"?"All Products":CATS.find(c=>c.id===catFilter)?.label}</h1>
          <p style={{margin:"0 0 18px",color:"#6b7280",fontSize:13}}>{filtered.length} products</p>
          <div style={{display:"flex",gap:7,marginBottom:18,flexWrap:"wrap"}}>
            <button onClick={()=>setCatFilter("all")} style={{padding:"5px 12px",borderRadius:18,border:"2px solid",borderColor:catFilter==="all"?"#6366f1":"#e5e7eb",background:catFilter==="all"?"#ede9fe":"#fff",color:catFilter==="all"?"#6366f1":"#374151",fontWeight:600,cursor:"pointer",fontSize:12}}>All</button>
            {CATS.map(cat=><button key={cat.id} onClick={()=>goCat(cat.id)} style={{padding:"5px 12px",borderRadius:18,border:"2px solid",borderColor:catFilter===cat.id?"#6366f1":"#e5e7eb",background:catFilter===cat.id?"#ede9fe":"#fff",color:catFilter===cat.id?"#6366f1":"#374151",fontWeight:600,cursor:"pointer",fontSize:12}}>{cat.icon} {cat.label}</button>)}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:18}}>
            {filtered.map(p=><Card key={p.id} p={p} cart={cart} setCart={setCart} wl={wl} setWl={setWl} user={user} onLogin={()=>setShowLogin(true)}/>)}
          </div>
        </div>}

        {/* CATEGORY PAGE */}
        {view==="cat"&&catData&&<div style={{paddingBottom:50}}>
          <div style={{marginTop:22,borderRadius:18,overflow:"hidden",background:`linear-gradient(135deg,${catData.color},${catData.color}cc)`,padding:"44px 38px",position:"relative"}}>
            <div style={{position:"absolute",inset:0,pointerEvents:"none"}}>{[0,1,2].map(i=><div key={i} style={{position:"absolute",borderRadius:"50%",background:"rgba(255,255,255,0.04)",width:200+i*100,height:200+i*100,top:(i*15-10)+"%",right:(i*8-5)+"%"}}/>)}</div>
            <div style={{position:"relative",zIndex:1}}>
              <Breadcrumb items={[{label:"Home",action:()=>go("home")},{label:catData.label}]}/>
              <div style={{fontSize:48,marginBottom:10}}>{catData.icon}</div>
              <h1 style={{margin:"0 0 8px",fontSize:34,fontWeight:900,color:"#fff"}}>{catData.label}</h1>
              <p style={{margin:"0 0 20px",color:"rgba(255,255,255,0.7)",fontSize:14}}>{catData.sub.length} subcategories</p>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {catData.sub.map(s=><button key={s.name} onClick={()=>goSub(catData.id,s.name)} style={{background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:18,padding:"5px 14px",color:"#fff",fontSize:12,cursor:"pointer",fontWeight:600}}>{s.name}</button>)}
              </div>
            </div>
          </div>
          <div style={{marginTop:30}}>
            <h2 style={{margin:"0 0 16px",fontSize:19,fontWeight:800,color:"#111827"}}>Shop by Subcategory</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:14}}>
              {catData.sub.map(sub=>(
                <div key={sub.name} onClick={()=>goSub(catData.id,sub.name)} style={{background:"#fff",borderRadius:16,overflow:"hidden",border:"1px solid #f3f4f6",cursor:"pointer",boxShadow:"0 2px 8px rgba(0,0,0,0.04)",transition:"all 0.2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 10px 28px rgba(0,0,0,0.1)";e.currentTarget.style.borderColor="#6366f1";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.04)";e.currentTarget.style.borderColor="#f3f4f6";}}>
                  <div style={{height:100,background:`linear-gradient(135deg,${catData.color}18,${catData.color}33)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:46,position:"relative"}}>
                    {sub.icon}
                    {sub.items.length>0&&<span style={{position:"absolute",bottom:7,right:8,background:"#6366f1",color:"#fff",fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:18}}>{sub.items.length} types</span>}
                  </div>
                  <div style={{padding:"12px 14px"}}>
                    <p style={{margin:"0 0 3px",fontWeight:700,fontSize:13,color:"#111827"}}>{sub.name}</p>
                    <p style={{margin:0,fontSize:11,color:"#6b7280"}}>{sub.items.length>0?sub.items.slice(0,2).join(", "):"Explore collection"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {catData.sub.map((sub,si)=>{
            const prods = catProds.length>0 ? catProds.slice(si%Math.max(catProds.length,1),(si%Math.max(catProds.length,1))+2).concat(catProds).slice(0,2) : [];
            return (
              <div key={sub.name} style={{marginTop:34}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                  <div style={{display:"flex",alignItems:"center",gap:9}}><span style={{fontSize:20}}>{sub.icon}</span><h3 style={{margin:0,fontSize:17,fontWeight:800,color:"#111827"}}>{sub.name}</h3></div>
                  <button onClick={()=>goSub(catData.id,sub.name)} style={{background:"none",border:"1px solid #e5e7eb",borderRadius:7,padding:"5px 12px",fontSize:12,color:"#6366f1",cursor:"pointer",fontWeight:700}}>View all</button>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:18}}>
                  {prods.map(p=><Card key={p.id+sub.name} p={p} cart={cart} setCart={setCart} wl={wl} setWl={setWl} user={user} onLogin={()=>setShowLogin(true)}/>)}
                  <div onClick={()=>goSub(catData.id,sub.name)} style={{background:"linear-gradient(135deg,#ede9fe,#f5f3ff)",borderRadius:14,border:"2px dashed #c4b5fd",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:190,cursor:"pointer",gap:7}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor="#6366f1";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#c4b5fd";}}>
                    <span style={{fontSize:28}}>🛍️</span>
                    <p style={{margin:0,fontSize:12,fontWeight:700,color:"#6366f1"}}>See all in {sub.name}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>}

        {/* SUBCATEGORY PAGE */}
        {view==="sub"&&catData&&subData&&<div style={{paddingBottom:50}}>
          <div style={{marginTop:22,borderRadius:18,overflow:"hidden",background:`linear-gradient(135deg,${catData.color},${catData.color}cc)`,padding:"40px 38px",position:"relative"}}>
            <div style={{position:"absolute",inset:0,pointerEvents:"none"}}>{[0,1,2].map(i=><div key={i} style={{position:"absolute",borderRadius:"50%",background:"rgba(255,255,255,0.04)",width:200+i*100,height:200+i*100,top:(i*15-10)+"%",right:(i*8-5)+"%"}}/>)}</div>
            <div style={{position:"relative",zIndex:1}}>
              <Breadcrumb items={[{label:"Home",action:()=>go("home")},{label:catData.label,action:()=>goCat(catData.id)},{label:subData.name}]}/>
              <div style={{fontSize:44,marginBottom:9}}>{subData.icon}</div>
              <h1 style={{margin:"0 0 8px",fontSize:32,fontWeight:900,color:"#fff"}}>{subData.name}</h1>
              <p style={{margin:0,color:"rgba(255,255,255,0.7)",fontSize:13}}>{catData.label} · {subData.items.length>0?subData.items.length+" types":"All products"}</p>
            </div>
          </div>
          {subData.items.length>0 ? <>
            <div style={{marginTop:28}}>
              <h2 style={{margin:"0 0 14px",fontSize:18,fontWeight:800,color:"#111827"}}>Browse {subData.name}</h2>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))",gap:12}}>
                {subData.items.map(item=>(
                  <div key={item} onClick={()=>goItem(catData.id,subData.name,item)} style={{background:"#fff",borderRadius:14,border:"1px solid #f3f4f6",cursor:"pointer",overflow:"hidden",boxShadow:"0 2px 6px rgba(0,0,0,0.04)",transition:"all 0.2s"}}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.borderColor="#6366f1";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.1)";}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.borderColor="#f3f4f6";e.currentTarget.style.boxShadow="0 2px 6px rgba(0,0,0,0.04)";}}>
                    <div style={{height:80,background:`linear-gradient(135deg,${catData.color}18,${catData.color}33)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36}}>📦</div>
                    <div style={{padding:"10px 12px"}}>
                      <p style={{margin:0,fontSize:12,fontWeight:700,color:"#111827",lineHeight:1.3}}>{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {subData.items.map((item,idx)=>{
              const prods = catProds.length>0 ? catProds.slice(idx%Math.max(catProds.length,1),(idx%Math.max(catProds.length,1))+2).concat(catProds).slice(0,2) : [];
              return (
                <div key={item} style={{marginTop:30}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                    <h3 style={{margin:0,fontSize:16,fontWeight:800,color:"#111827"}}>{item}</h3>
                    <button onClick={()=>goItem(catData.id,subData.name,item)} style={{background:"none",border:"1px solid #e5e7eb",borderRadius:7,padding:"4px 11px",fontSize:11,color:"#6366f1",cursor:"pointer",fontWeight:700}}>View all</button>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:18}}>
                    {prods.map(p=><Card key={p.id+item} p={p} cart={cart} setCart={setCart} wl={wl} setWl={setWl} user={user} onLogin={()=>setShowLogin(true)}/>)}
                    <div onClick={()=>goItem(catData.id,subData.name,item)} style={{background:"linear-gradient(135deg,#ede9fe,#f5f3ff)",borderRadius:14,border:"2px dashed #c4b5fd",display:"flex",alignItems:"center",justifyContent:"center",minHeight:180,cursor:"pointer"}}
                      onMouseEnter={e=>e.currentTarget.style.borderColor="#6366f1"} onMouseLeave={e=>e.currentTarget.style.borderColor="#c4b5fd"}>
                      <p style={{margin:0,fontSize:12,fontWeight:700,color:"#6366f1",textAlign:"center",padding:"0 16px"}}>More in {item}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </> : <div style={{marginTop:26}}>
            <h2 style={{margin:"0 0 14px",fontSize:18,fontWeight:800,color:"#111827"}}>{subData.name} Products</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:18}}>
              {catProds.length>0 ? catProds.map(p=><Card key={p.id} p={p} cart={cart} setCart={setCart} wl={wl} setWl={setWl} user={user} onLogin={()=>setShowLogin(true)}/>) : (
                <div style={{gridColumn:"1/-1",textAlign:"center",padding:"60px 0",color:"#9ca3af"}}><div style={{fontSize:60}}>🔍</div><p style={{fontSize:15,fontWeight:600,marginTop:14,color:"#374151"}}>Products coming soon</p></div>
              )}
            </div>
          </div>}
        </div>}

        {/* SUB-SUBCATEGORY (ITEM) PAGE */}
        {view==="item"&&catData&&subData&&activeItem&&<div style={{paddingBottom:50}}>
          <div style={{marginTop:22,borderRadius:18,overflow:"hidden",background:`linear-gradient(135deg,${catData.color},${catData.color}99)`,padding:"40px 38px",position:"relative"}}>
            <div style={{position:"absolute",inset:0,pointerEvents:"none"}}>{[0,1,2].map(i=><div key={i} style={{position:"absolute",borderRadius:"50%",background:"rgba(255,255,255,0.04)",width:200+i*100,height:200+i*100,top:(i*15-10)+"%",right:(i*8-5)+"%"}}/>)}</div>
            <div style={{position:"relative",zIndex:1}}>
              {/* 4-level Breadcrumb */}
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:18,flexWrap:"wrap"}}>
                <button onClick={()=>go("home")} style={{background:"rgba(255,255,255,0.12)",border:"none",borderRadius:7,padding:"4px 11px",color:"rgba(255,255,255,0.7)",fontSize:11,cursor:"pointer",fontWeight:600}}>Home</button>
                <span style={{color:"rgba(255,255,255,0.4)",fontSize:13}}>›</span>
                <button onClick={()=>goCat(catData.id)} style={{background:"rgba(255,255,255,0.12)",border:"none",borderRadius:7,padding:"4px 11px",color:"rgba(255,255,255,0.7)",fontSize:11,cursor:"pointer",fontWeight:600}}>{catData.label}</button>
                <span style={{color:"rgba(255,255,255,0.4)",fontSize:13}}>›</span>
                <button onClick={()=>goSub(catData.id,subData.name)} style={{background:"rgba(255,255,255,0.12)",border:"none",borderRadius:7,padding:"4px 11px",color:"rgba(255,255,255,0.7)",fontSize:11,cursor:"pointer",fontWeight:600}}>{subData.name}</button>
                <span style={{color:"rgba(255,255,255,0.4)",fontSize:13}}>›</span>
                <span style={{background:"rgba(255,255,255,0.2)",borderRadius:7,padding:"4px 11px",color:"#fff",fontSize:11,fontWeight:700}}>{activeItem}</span>
              </div>
              <div style={{fontSize:44,marginBottom:10}}>📦</div>
              <h1 style={{margin:"0 0 8px",fontSize:32,fontWeight:900,color:"#fff"}}>{activeItem}</h1>
              <p style={{margin:0,color:"rgba(255,255,255,0.7)",fontSize:13}}>{catData.label} › {subData.name} › {activeItem}</p>
            </div>
          </div>

          {/* Filter bar */}
          <div style={{display:"flex",gap:8,marginTop:24,marginBottom:20,flexWrap:"wrap",alignItems:"center"}}>
            <span style={{fontSize:13,fontWeight:700,color:"#374151"}}>Sort by:</span>
            {["Popular","Price: Low to High","Price: High to Low","Top Rated","New Arrivals"].map(sort=>(
              <button key={sort} style={{padding:"5px 14px",borderRadius:18,border:"2px solid #e5e7eb",background:"#fff",color:"#374151",fontWeight:600,cursor:"pointer",fontSize:12,transition:"all 0.15s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#6366f1";e.currentTarget.style.color="#6366f1";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="#e5e7eb";e.currentTarget.style.color="#374151";}}>{sort}</button>
            ))}
          </div>

          {/* Products grid */}
          <div style={{marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <h2 style={{margin:0,fontSize:18,fontWeight:800,color:"#111827"}}>{activeItem} <span style={{fontSize:13,fontWeight:600,color:"#9ca3af"}}>({catProds.length || 0} products)</span></h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:18}}>
            {catProds.length>0 ? catProds.map(p=>(
              <Card key={p.id} p={p} cart={cart} setCart={setCart} wl={wl} setWl={setWl} user={user} onLogin={()=>setShowLogin(true)}/>
            )) : (
              <>
                {/* Placeholder product cards when no real products */}
                {[1,2,3,4,5,6].map(i=>(
                  <div key={i} style={{background:"#fff",borderRadius:16,overflow:"hidden",border:"1px solid #f3f4f6",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
                    <div style={{height:170,background:`linear-gradient(135deg,${catData.color}18,${catData.color}33)`,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:10}}>
                      <span style={{fontSize:52}}>📦</span>
                      <span style={{background:"#6366f1",color:"#fff",fontSize:9,fontWeight:800,padding:"2px 8px",borderRadius:18}}>{activeItem}</span>
                    </div>
                    <div style={{padding:"12px 14px"}}>
                      <div style={{height:14,background:"#f3f4f6",borderRadius:7,marginBottom:8,width:"70%"}}/>
                      <div style={{height:11,background:"#f3f4f6",borderRadius:7,marginBottom:10,width:"50%"}}/>
                      <div style={{height:20,background:"#f3f4f6",borderRadius:7,width:"40%",marginBottom:10}}/>
                      <div style={{height:36,background:"linear-gradient(135deg,#ede9fe,#ddd6fe)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <span style={{fontSize:12,fontWeight:700,color:"#6366f1"}}>Coming Soon</span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Related subcategories */}
          <div style={{marginTop:40,padding:"24px",background:"#fff",borderRadius:18,border:"1px solid #f3f4f6"}}>
            <h3 style={{margin:"0 0 16px",fontSize:16,fontWeight:800,color:"#111827"}}>Also explore in {subData.name}</h3>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              {subData.items.filter(i=>i!==activeItem).map(item=>(
                <button key={item} onClick={()=>goItem(catData.id,subData.name,item)} style={{padding:"8px 16px",borderRadius:20,border:"2px solid #e5e7eb",background:"#fff",color:"#374151",fontWeight:600,cursor:"pointer",fontSize:13,transition:"all 0.15s"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="#6366f1";e.currentTarget.style.background="#ede9fe";e.currentTarget.style.color="#6366f1";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="#e5e7eb";e.currentTarget.style.background="#fff";e.currentTarget.style.color="#374151";}}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>}

        {/* NEW ARRIVALS */}
        {view==="newArrivals"&&<div style={{paddingBottom:50}}>
          <div style={{marginTop:22,borderRadius:18,background:"linear-gradient(135deg,#0f172a,#1e40af)",padding:"48px 44px",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,pointerEvents:"none"}}>{[0,1,2,3].map(i=><div key={i} style={{position:"absolute",borderRadius:"50%",background:"rgba(255,255,255,0.04)",width:180+i*80,height:180+i*80,top:(-10+i*8)+"%",right:(-5+i*6)+"%"}}/>)}</div>
            <div style={{position:"relative",zIndex:1}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(99,102,241,0.25)",border:"1px solid rgba(99,102,241,0.4)",borderRadius:18,padding:"5px 14px",marginBottom:14}}><span style={{color:"#60a5fa"}}>✨</span><span style={{color:"#c4b5fd",fontSize:12,fontWeight:600}}>Just dropped this week</span></div>
              <h1 style={{margin:"0 0 10px",color:"#fff",fontSize:36,fontWeight:900}}>New Arrivals</h1>
              <p style={{margin:0,color:"#93c5fd",fontSize:14,maxWidth:440}}>Fresh picks added daily — be the first to shop.</p>
            </div>
          </div>
          <div style={{display:"flex",gap:7,marginTop:22,marginBottom:18,flexWrap:"wrap"}}>
            <button onClick={()=>setCatFilter("all")} style={{padding:"5px 12px",borderRadius:18,border:"2px solid",borderColor:catFilter==="all"?"#3b82f6":"#e5e7eb",background:catFilter==="all"?"#eff6ff":"#fff",color:catFilter==="all"?"#1d4ed8":"#374151",fontWeight:catFilter==="all"?700:600,cursor:"pointer",fontSize:12}}>All</button>
            {CATS.map(cat=><button key={cat.id} onClick={()=>setCatFilter(cat.id)} style={{padding:"5px 12px",borderRadius:18,border:"2px solid",borderColor:catFilter===cat.id?"#3b82f6":"#e5e7eb",background:catFilter===cat.id?"#eff6ff":"#fff",color:catFilter===cat.id?"#1d4ed8":"#374151",fontWeight:catFilter===cat.id?700:600,cursor:"pointer",fontSize:12}}>{cat.label}</button>)}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:18}}>
            {filtered.map(p=><Card key={p.id} p={p} cart={cart} setCart={setCart} wl={wl} setWl={setWl} user={user} onLogin={()=>setShowLogin(true)}/>)}
          </div>
        </div>}

        {/* FLASH SALE */}
        {view==="flashSale"&&<div style={{paddingBottom:50}}>
          <div style={{marginTop:22,borderRadius:18,background:"linear-gradient(135deg,#7f1d1d,#dc2626,#ef4444)",padding:"48px 44px",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,pointerEvents:"none"}}>{[0,1,2,3].map(i=><div key={i} style={{position:"absolute",borderRadius:"50%",background:"rgba(255,255,255,0.05)",width:200+i*80,height:200+i*80,top:(-20+i*10)+"%",right:(-10+i*6)+"%"}}/>)}</div>
            <div style={{position:"relative",zIndex:1,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20}}>
              <div>
                <h1 style={{margin:"0 0 10px",color:"#fff",fontSize:36,fontWeight:900}}>Flash Sale ⚡</h1>
                <p style={{margin:0,color:"#fca5a5",fontSize:14}}>Massive discounts. Limited stock. Hurry!</p>
              </div>
              <div style={{display:"flex",gap:9}}>{[{v:flash.h,l:"HRS"},{v:flash.m,l:"MIN"},{v:flash.s,l:"SEC"}].map((t,i)=><div key={i} style={{background:"rgba(0,0,0,0.35)",borderRadius:12,padding:"12px 16px",textAlign:"center",minWidth:58}}><div style={{color:"#fff",fontSize:26,fontWeight:900}}>{pad(t.v)}</div><div style={{color:"#fca5a5",fontSize:9,fontWeight:800,letterSpacing:"1px",marginTop:2}}>{t.l}</div></div>)}</div>
            </div>
          </div>
          <div style={{display:"flex",gap:7,marginTop:22,marginBottom:18,flexWrap:"wrap"}}>
            <button onClick={()=>setCatFilter("all")} style={{padding:"5px 12px",borderRadius:18,border:"2px solid",borderColor:catFilter==="all"?"#ef4444":"#e5e7eb",background:catFilter==="all"?"#fef2f2":"#fff",color:catFilter==="all"?"#dc2626":"#374151",fontWeight:catFilter==="all"?700:600,cursor:"pointer",fontSize:12}}>All Deals</button>
            {CATS.map(cat=><button key={cat.id} onClick={()=>setCatFilter(cat.id)} style={{padding:"5px 12px",borderRadius:18,border:"2px solid",borderColor:catFilter===cat.id?"#ef4444":"#e5e7eb",background:catFilter===cat.id?"#fef2f2":"#fff",color:catFilter===cat.id?"#dc2626":"#374151",fontWeight:catFilter===cat.id?700:600,cursor:"pointer",fontSize:12,whiteSpace:"nowrap"}}>{cat.icon} {cat.label}</button>)}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:18}}>
            {filtered.map(p=>(
              <Card key={p.id} p={p} cart={cart} setCart={setCart} wl={wl} setWl={setWl} user={user} onLogin={()=>setShowLogin(true)}/>
            ))}
          </div>
        </div>}

        {/* ACCOUNT */}
        {view==="account"&&<div style={{marginTop:28,paddingBottom:50}}>
          {!user ? <div style={{textAlign:"center",padding:"70px 0"}}><div style={{fontSize:68,marginBottom:14}}>👤</div><h2 style={{margin:"0 0 8px",fontSize:22,fontWeight:800}}>Sign in to your account</h2><button onClick={()=>setShowLogin(true)} style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",border:"none",borderRadius:11,padding:"11px 28px",fontWeight:800,fontSize:14,cursor:"pointer",marginTop:14}}>Sign In</button></div>
          : <div style={{display:"flex",gap:22,alignItems:"flex-start"}}>
            <div style={{width:210,flexShrink:0}}>
              <div style={{background:"linear-gradient(135deg,#1e1b4b,#4c1d95)",borderRadius:18,padding:"22px 16px",textAlign:"center",marginBottom:12}}>
                <div style={{width:56,height:56,borderRadius:"50%",background:"linear-gradient(135deg,#6366f1,#a78bfa)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:900,fontSize:22,margin:"0 auto 10px"}}>{user.name[0].toUpperCase()}</div>
                <p style={{margin:"0 0 4px",fontWeight:800,fontSize:14,color:"#fff"}}>{user.name}</p>
                <p style={{margin:"0 0 9px",fontSize:11,color:"#a5b4fc"}}>{user.email}</p>
                <span style={{background:"rgba(99,102,241,0.3)",color:"#c4b5fd",padding:"3px 11px",borderRadius:18,fontSize:10,fontWeight:700}}>{user.role==="admin"?"⭐ Admin":"🥈 Silver Member"}</span>
              </div>
              <div style={{background:"#fff",borderRadius:14,border:"1px solid #f3f4f6",overflow:"hidden"}}>
                {[{id:"profile",icon:"👤",label:"My Profile"},{id:"orders",icon:"📦",label:"My Orders"},{id:"wishlist",icon:"❤️",label:"Wishlist"},{id:"notifications",icon:"🔔",label:"Notifications"},{id:"payments",icon:"💳",label:"Payments"},{id:"settings",icon:"⚙️",label:"Settings"}].map(tab=>(
                  <button key={tab.id} onClick={()=>setAcctTab(tab.id)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"12px 16px",background:acctTab===tab.id?"#ede9fe":"none",border:"none",borderBottom:"1px solid #f9fafb",fontSize:13,fontWeight:acctTab===tab.id?700:500,color:acctTab===tab.id?"#6366f1":"#374151",cursor:"pointer",borderLeft:acctTab===tab.id?"3px solid #6366f1":"3px solid transparent"}}>
                    <span>{tab.icon}</span>{tab.label}
                  </button>
                ))}
                <button onClick={()=>{setUser(null);go("home");}} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"12px 16px",background:"none",border:"none",fontSize:13,fontWeight:600,color:"#ef4444",cursor:"pointer"}}>🚪 Logout</button>
              </div>
            </div>
            <div style={{flex:1}}>
              {acctTab==="profile"&&<div style={{background:"#fff",borderRadius:18,padding:"24px",border:"1px solid #f3f4f6"}}><h2 style={{margin:"0 0 18px",fontSize:18,fontWeight:800}}>My Profile</h2><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:18}}>{[{l:"Full Name",v:user.name},{l:"Email",v:user.email},{l:"Phone",v:"+91 98765 43210"},{l:"Member Since",v:"March 2024"}].map((f,i)=><div key={i} style={{background:"#f9fafb",borderRadius:11,padding:"12px 14px"}}><p style={{margin:"0 0 3px",fontSize:10,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:"0.5px"}}>{f.l}</p><p style={{margin:0,fontSize:14,fontWeight:600,color:"#111827"}}>{f.v}</p></div>)}</div><button style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",border:"none",borderRadius:11,padding:"10px 22px",fontWeight:700,cursor:"pointer",fontSize:13}}>Edit Profile</button></div>}
              {acctTab==="orders"&&<div style={{background:"#fff",borderRadius:18,padding:"24px",border:"1px solid #f3f4f6"}}><h2 style={{margin:"0 0 18px",fontSize:18,fontWeight:800}}>My Orders</h2>{ORDERS_DATA.map((o,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"13px",borderRadius:12,border:"1px solid #f3f4f6",marginBottom:9,background:"#fafafa"}}><div style={{width:44,height:44,borderRadius:10,background:"#ede9fe",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>📦</div><div style={{flex:1}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><p style={{margin:0,fontWeight:700,fontSize:13,color:"#111827"}}>{o.product}</p><span style={{background:SC[o.status]?.bg,color:SC[o.status]?.c,padding:"3px 9px",borderRadius:18,fontSize:10,fontWeight:700}}>{o.status}</span></div><p style={{margin:"3px 0 0",fontSize:11,color:"#9ca3af"}}>{o.id} · {o.date} · {o.amount}</p></div></div>)}</div>}
              {acctTab==="wishlist"&&<div style={{background:"#fff",borderRadius:18,padding:"24px",border:"1px solid #f3f4f6"}}><h2 style={{margin:"0 0 18px",fontSize:18,fontWeight:800}}>Wishlist ({wl.length})</h2>{wl.length===0?<p style={{color:"#9ca3af"}}>No wishlisted items yet.</p>:<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>{wl.map(p=><div key={p.id} style={{display:"flex",gap:10,padding:"11px",borderRadius:12,border:"1px solid #f3f4f6",alignItems:"center"}}><div style={{width:44,height:44,borderRadius:9,background:`${p.color}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{p.emoji}</div><div style={{flex:1,minWidth:0}}><p style={{margin:"0 0 2px",fontSize:12,fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</p><p style={{margin:0,fontSize:13,fontWeight:800,color:"#6366f1"}}>₹{p.price.toLocaleString()}</p></div></div>)}</div>}</div>}
              {(acctTab==="notifications"||acctTab==="payments"||acctTab==="settings")&&<div style={{background:"#fff",borderRadius:18,padding:"24px",border:"1px solid #f3f4f6"}}><h2 style={{margin:"0 0 14px",fontSize:18,fontWeight:800,textTransform:"capitalize"}}>{acctTab}</h2><p style={{color:"#9ca3af",fontSize:14}}>This section is coming soon.</p></div>}
            </div>
          </div>}
        </div>}

        {/* INFO PAGES */}
        {view==="info"&&infoPage&&(()=>{
          const data = INFO[infoPage];
          if(!data) return null;
          return (
            <div style={{paddingBottom:50}}>
              <div style={{background:data.color,borderRadius:18,marginTop:22,padding:"40px 38px",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",inset:0,pointerEvents:"none"}}>{[0,1,2].map(i=><div key={i} style={{position:"absolute",borderRadius:"50%",background:"rgba(255,255,255,0.04)",width:200+i*100,height:200+i*100,top:(i*15-10)+"%",right:(i*8-5)+"%"}}/>)}</div>
                <button onClick={()=>go("home")} style={{position:"relative",zIndex:1,background:"rgba(255,255,255,0.12)",border:"none",borderRadius:7,padding:"5px 13px",color:"#fff",fontSize:12,cursor:"pointer",fontWeight:600,marginBottom:18}}>Back</button>
                <div style={{position:"relative",zIndex:1}}><div style={{fontSize:42,marginBottom:9}}>{data.icon}</div><h1 style={{margin:"0 0 9px",fontSize:30,fontWeight:900,color:"#fff"}}>{infoPage}</h1><p style={{margin:0,fontSize:14,color:"rgba(255,255,255,0.75)",maxWidth:520,lineHeight:1.7}}>{data.desc}</p></div>
              </div>
              {data.stats&&<div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginTop:20}}>{data.stats.map((s,i)=><div key={i} style={{background:"#fff",borderRadius:14,padding:"20px",textAlign:"center",border:"1px solid #f3f4f6"}}><p style={{margin:"0 0 3px",fontSize:26,fontWeight:900,color:"#6366f1"}}>{s.h}</p><p style={{margin:0,fontSize:12,color:"#6b7280",fontWeight:600}}>{s.l}</p></div>)}</div>}
              {data.jobs&&<div style={{background:"#fff",borderRadius:16,padding:"22px",marginTop:18,border:"1px solid #f3f4f6"}}><h2 style={{margin:"0 0 16px",fontSize:16,fontWeight:800}}>Open Positions</h2>{data.jobs.map((job,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",borderRadius:10,border:"1px solid #f3f4f6",marginBottom:8,background:"#fafafa"}}><div><p style={{margin:"0 0 2px",fontWeight:700,fontSize:14}}>{job}</p><p style={{margin:0,fontSize:11,color:"#6b7280"}}>Full-time · Remote/Bengaluru</p></div><button style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",border:"none",borderRadius:7,padding:"6px 14px",fontSize:11,fontWeight:700,cursor:"pointer"}}>Apply</button></div>)}</div>}
              {data.press&&<div style={{background:"#fff",borderRadius:16,padding:"22px",marginTop:18,border:"1px solid #f3f4f6"}}><h2 style={{margin:"0 0 16px",fontSize:16,fontWeight:800}}>Press Releases</h2>{data.press.map((item,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid #f9fafb"}}><p style={{margin:0,fontWeight:600,fontSize:13}}>{item}</p><span style={{color:"#6366f1",fontWeight:700,fontSize:12,cursor:"pointer",flexShrink:0,marginLeft:14}}>Read</span></div>)}</div>}
              {data.posts&&<div style={{background:"#fff",borderRadius:16,padding:"22px",marginTop:18,border:"1px solid #f3f4f6"}}><h2 style={{margin:"0 0 16px",fontSize:16,fontWeight:800}}>Latest Posts</h2><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>{data.posts.map((post,i)=><div key={i} style={{background:"#f9fafb",borderRadius:12,padding:"16px",border:"1px solid #f3f4f6",cursor:"pointer"}}><span style={{background:"#ede9fe",color:"#6366f1",fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:9}}>Article</span><p style={{margin:"8px 0 0",fontWeight:700,fontSize:13,color:"#111827",lineHeight:1.4}}>{post}</p></div>)}</div></div>}
              {data.contacts&&<div style={{background:"#fff",borderRadius:16,padding:"22px",marginTop:18,border:"1px solid #f3f4f6"}}><h2 style={{margin:"0 0 16px",fontSize:16,fontWeight:800}}>Get in Touch</h2><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>{data.contacts.map((c,i)=><div key={i} style={{background:"#f9fafb",borderRadius:12,padding:"16px",border:"1px solid #f3f4f6"}}><span style={{fontSize:26}}>{c.icon}</span><p style={{margin:"7px 0 3px",fontWeight:700,fontSize:13}}>{c.l}</p><p style={{margin:0,fontSize:12,color:"#6366f1",fontWeight:600}}>{c.v}</p></div>)}</div></div>}
              {data.faqs&&<div style={{background:"#fff",borderRadius:16,padding:"22px",marginTop:18,border:"1px solid #f3f4f6"}}><h2 style={{margin:"0 0 16px",fontSize:16,fontWeight:800}}>FAQs</h2>{data.faqs.map((faq,i)=><div key={i} style={{border:"1px solid #f3f4f6",borderRadius:10,marginBottom:8,overflow:"hidden"}}><div style={{padding:"12px 16px",background:"#fafafa",display:"flex",justifyContent:"space-between"}}><span style={{fontSize:13,fontWeight:700}}>{faq.q}</span></div><div style={{padding:"10px 16px",background:"#fff",borderTop:"1px solid #f3f4f6"}}><p style={{margin:0,fontSize:13,color:"#374151",lineHeight:1.7}}>{faq.a}</p></div></div>)}</div>}
              {data.steps&&<div style={{background:"#fff",borderRadius:16,padding:"22px",marginTop:18,border:"1px solid #f3f4f6"}}><h2 style={{margin:"0 0 16px",fontSize:16,fontWeight:800}}>How to Return</h2><div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>{data.steps.map((step,i)=><div key={i} style={{textAlign:"center",padding:"18px 12px",background:"#f9fafb",borderRadius:12}}><div style={{width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",fontWeight:900,fontSize:15,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px"}}>{i+1}</div><p style={{margin:0,fontSize:12,fontWeight:600,color:"#374151"}}>{step}</p></div>)}</div></div>}
              {data.delivery&&<div style={{background:"#fff",borderRadius:16,padding:"22px",marginTop:18,border:"1px solid #f3f4f6"}}><h2 style={{margin:"0 0 16px",fontSize:16,fontWeight:800}}>Delivery Options</h2><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>{data.delivery.map((d,i)=><div key={i} style={{background:"#f9fafb",borderRadius:12,padding:"16px",border:"1px solid #f3f4f6"}}><p style={{margin:"0 0 3px",fontWeight:800,fontSize:14}}>{d.t}</p><p style={{margin:"0 0 2px",fontSize:12,color:"#6366f1",fontWeight:700}}>{d.time}</p><p style={{margin:0,fontSize:11,color:"#6b7280"}}>{d.cost}</p></div>)}</div></div>}
              {data.sections&&<div style={{background:"#fff",borderRadius:16,padding:"22px",marginTop:18,border:"1px solid #f3f4f6"}}><h2 style={{margin:"0 0 14px",fontSize:16,fontWeight:800}}>Contents</h2>{data.sections.map((s,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:"1px solid #f9fafb"}}><span style={{width:26,height:26,borderRadius:7,background:"#ede9fe",color:"#6366f1",fontWeight:800,fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</span><p style={{margin:0,fontSize:13,fontWeight:600,color:"#374151"}}>{s}</p></div>)}</div>}
              {data.cookies&&<div style={{background:"#fff",borderRadius:16,padding:"22px",marginTop:18,border:"1px solid #f3f4f6"}}><h2 style={{margin:"0 0 16px",fontSize:16,fontWeight:800}}>Cookie Types</h2>{data.cookies.map((c,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 0",borderBottom:"1px solid #f9fafb"}}><p style={{margin:0,fontWeight:600,fontSize:13}}>{c.t}</p><span style={{background:c.r?"#fee2e2":"#d1fae5",color:c.r?"#991b1b":"#065f46",padding:"3px 10px",borderRadius:18,fontSize:10,fontWeight:700}}>{c.r?"Required":"Optional"}</span></div>)}</div>}
            </div>
          );
        })()}

      </main>

      {/* FOOTER */}
      <footer style={{background:"#1e1b4b",color:"#c4b5fd",padding:"42px 20px 22px",marginTop:20}}>
        <div style={{maxWidth:1280,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:44,marginBottom:36}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><div style={{width:30,height:30,borderRadius:8,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>🚀</div><span style={{fontSize:18,fontWeight:900,color:"#fff"}}>Shipmora</span></div>
              <p style={{fontSize:13,lineHeight:1.7,color:"#a5b4fc",marginBottom:0}}>Your one-stop destination for everything you need.</p>
            </div>
            {[{title:"Company",links:["About Us","Careers","Press","Blog"]},{title:"Help",links:["Contact Us","FAQs","Returns","Shipping"]},{title:"Legal",links:["Privacy Policy","Terms","Cookie Policy","Compliance"]}].map((col,i)=>(
              <div key={i}>
                <h4 style={{color:"#fff",margin:"0 0 12px",fontSize:13,fontWeight:700}}>{col.title}</h4>
                {col.links.map(link=><p key={link} onClick={()=>goInfo(link)} style={{margin:"0 0 9px",fontSize:12,cursor:"pointer",color:"#a5b4fc"}} onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="#a5b4fc"}>{link}</p>)}
              </div>
            ))}
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:18,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <p style={{margin:0,fontSize:12,color:"#7c3aed"}}>© 2025 Shipmora. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {cartOpen&&<CartDrawer cart={cart} setCart={setCart} onClose={()=>setCartOpen(false)} user={user} onLogin={()=>{setCartOpen(false);setShowLogin(true);}}/>}
      {wlOpen&&(
        <div style={{position:"fixed",inset:0,zIndex:1000}}>
          <div onClick={()=>setWlOpen(false)} style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)"}}/>
          <div style={{position:"absolute",right:0,top:0,bottom:0,width:370,background:"#fff",display:"flex",flexDirection:"column",boxShadow:"-8px 0 40px rgba(0,0,0,0.15)"}}>
            <div style={{padding:"18px 22px",borderBottom:"1px solid #f3f4f6",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:22}}>❤️</span><h2 style={{margin:0,fontSize:19,fontWeight:800}}>Wishlist</h2>{wl.length>0&&<span style={{background:"#fee2e2",color:"#ef4444",borderRadius:"50%",width:22,height:22,fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800}}>{wl.length}</span>}</div>
              <button onClick={()=>setWlOpen(false)} style={{background:"#f3f4f6",border:"none",borderRadius:8,width:30,height:30,cursor:"pointer",fontSize:18,color:"#6b7280"}}>×</button>
            </div>
            <div style={{flex:1,overflowY:"auto",padding:"10px 22px"}}>
              {wl.length===0?<div style={{textAlign:"center",padding:"60px 0",color:"#9ca3af"}}><div style={{fontSize:60}}>🤍</div><p style={{fontSize:15,fontWeight:600,marginTop:14,color:"#374151"}}>Your wishlist is empty</p><p style={{fontSize:13}}>Tap the heart on any product</p></div>
              :wl.map(p=>(
                <div key={p.id} style={{display:"flex",gap:12,padding:"12px 0",borderBottom:"1px solid #f9fafb",alignItems:"center"}}>
                  <div style={{width:52,height:52,borderRadius:11,background:`${p.color}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>{p.emoji}</div>
                  <div style={{flex:1}}><p style={{margin:"0 0 3px",fontSize:13,fontWeight:700,color:"#111827"}}>{p.name}</p><p style={{margin:0,fontSize:14,fontWeight:800,color:"#6366f1"}}>₹{p.price.toLocaleString()}</p></div>
                  <div style={{display:"flex",flexDirection:"column",gap:5}}>
                    <button onClick={()=>{setCart(c=>{const e=c.find(i=>i.id===p.id);return e?c.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...c,{...p,qty:1}];});}} style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",border:"none",borderRadius:7,padding:"5px 10px",fontSize:11,cursor:"pointer",fontWeight:700}}>Add</button>
                    <button onClick={()=>setWl(w=>w.filter(x=>x.id!==p.id))} style={{background:"#fee2e2",color:"#ef4444",border:"none",borderRadius:7,padding:"5px 10px",fontSize:11,cursor:"pointer",fontWeight:700}}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {showLogin&&<LoginModal onClose={()=>setShowLogin(false)} onLogin={u=>{setUser(u);setShowLogin(false);}}/>}
    </div>
  );
}