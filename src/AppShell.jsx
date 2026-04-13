import { useEffect, useState } from "react";

import AdminPanel from "./components/admin/AdminPanel";
import CartDrawer from "./components/store/CartDrawer";
import LoginModal from "./components/store/LoginModal";
import StoreFooter from "./components/store/StoreFooter";
import StoreHeader from "./components/store/StoreHeader";
import WishlistDrawer from "./components/store/WishlistDrawer";
import { CATS, INFO, PRODUCTS } from "./data/storeData";
import AccountPage from "./pages/store/AccountPage";
import { CategoryPage, ItemPage, SubcategoryPage } from "./pages/store/CategoryPages";
import HomePage from "./pages/store/HomePage";
import InfoPage from "./pages/store/InfoPage";
import { FlashSalePage, NewArrivalsPage, ProductsPage } from "./pages/store/ProductListingPages";

export default function AppShell() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("store");
  const [view, setView] = useState("home");
  const [activeCat, setActiveCat] = useState(null);
  const [activeSub, setActiveSub] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [cart, setCart] = useState([]);
  const [wl, setWl] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wlOpen, setWlOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [catFilter, setCatFilter] = useState("all");
  const [megaOpen, setMegaOpen] = useState(false);
  const [hovCat, setHovCat] = useState(null);
  const [hovSub, setHovSub] = useState(null);
  const [acctTab, setAcctTab] = useState("profile");
  const [adminTab, setAdminTab] = useState("dashboard");
  const [flash, setFlash] = useState({ h: 3, m: 42, s: 17 });
  const [infoPage, setInfoPage] = useState(null);

  useEffect(() => {
    const countdown = setInterval(() => {
      setFlash((current) => {
        let { h, m, s } = current;
        s -= 1;
        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        return h < 0 ? { h: 0, m: 0, s: 0 } : { h, m, s };
      });
    }, 1000);

    const styleEl = document.createElement("style");
    styleEl.textContent = "#cat-carousel::-webkit-scrollbar{display:none}";
    document.head.appendChild(styleEl);

    const autoScroll = setInterval(() => {
      const carousel = document.getElementById("cat-carousel");
      if (!carousel || carousel.dataset.dragging === "true") {
        return;
      }
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      if (maxScroll <= 0) {
        return;
      }
      if (carousel.scrollLeft >= maxScroll - 2) {
        carousel.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        carousel.scrollBy({ left: 110, behavior: "smooth" });
      }
    }, 2200);

    return () => {
      clearInterval(countdown);
      clearInterval(autoScroll);
      document.head.removeChild(styleEl);
    };
  }, []);

  const pad = (value) => String(value).padStart(2, "0");
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const filtered = PRODUCTS.filter((product) => catFilter === "all" || product.cat === catFilter);
  const catData = CATS.find((cat) => cat.id === activeCat);
  const subData = catData?.sub.find((sub) => sub.name === activeSub);
  const catProds = PRODUCTS.filter((product) => product.cat === activeCat);

  const go = (nextView) => {
    setView(nextView);
    setActiveCat(null);
    setActiveSub(null);
    setActiveItem(null);
    setInfoPage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goCat = (id) => {
    setActiveCat(id);
    setActiveSub(null);
    setActiveItem(null);
    setCatFilter(id);
    setView("cat");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goSub = (id, subName) => {
    setActiveCat(id);
    setActiveSub(subName);
    setActiveItem(null);
    setView("sub");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goItem = (id, subName, item) => {
    setActiveCat(id);
    setActiveSub(subName);
    setActiveItem(item);
    setView("item");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goInfo = (page) => {
    setInfoPage(page);
    setView("info");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    setUser(null);
    setMode("store");
    setCartOpen(false);
    setWlOpen(false);
    go("home");
  };

  const openAccount = () => {
    setAcctTab("profile");
    go("account");
  };

  const renderStoreView = () => {
    switch (view) {
      case "products":
        return <ProductsPage catFilter={catFilter} setCatFilter={setCatFilter} filtered={filtered} setCart={setCart} wl={wl} setWl={setWl} user={user} openLogin={() => setShowLogin(true)} />;
      case "cat":
        return catData ? <CategoryPage catData={catData} catProds={catProds} go={go} goSub={goSub} setCart={setCart} wl={wl} setWl={setWl} user={user} openLogin={() => setShowLogin(true)} /> : null;
      case "sub":
        return catData && subData ? <SubcategoryPage catData={catData} subData={subData} catProds={catProds} go={go} goCat={goCat} goItem={goItem} setCart={setCart} wl={wl} setWl={setWl} user={user} openLogin={() => setShowLogin(true)} /> : null;
      case "item":
        return catData && subData && activeItem ? <ItemPage catData={catData} subData={subData} activeItem={activeItem} catProds={catProds} go={go} goCat={goCat} goSub={goSub} goItem={goItem} setCart={setCart} wl={wl} setWl={setWl} user={user} openLogin={() => setShowLogin(true)} /> : null;
      case "newArrivals":
        return <NewArrivalsPage catFilter={catFilter} setCatFilter={setCatFilter} filtered={filtered} setCart={setCart} wl={wl} setWl={setWl} user={user} openLogin={() => setShowLogin(true)} />;
      case "flashSale":
        return <FlashSalePage flash={flash} pad={pad} catFilter={catFilter} setCatFilter={setCatFilter} filtered={filtered} setCart={setCart} wl={wl} setWl={setWl} user={user} openLogin={() => setShowLogin(true)} />;
      case "account":
        return <AccountPage user={user} acctTab={acctTab} setAcctTab={setAcctTab} wl={wl} onLogin={() => setShowLogin(true)} onLogout={handleLogout} />;
      case "info":
        return <InfoPage infoPage={infoPage} data={INFO[infoPage]} go={go} />;
      case "home":
      default:
        return <HomePage flash={flash} pad={pad} go={go} goCat={goCat} setCart={setCart} wl={wl} setWl={setWl} user={user} openLogin={() => setShowLogin(true)} />;
    }
  };

  if (mode === "admin") {
    return <AdminPanel adminTab={adminTab} setAdminTab={setAdminTab} onExitAdmin={() => setMode("store")} onLogout={handleLogout} />;
  }

  return (
    <div style={{ fontFamily: "system-ui,sans-serif", background: "#fafafa", minHeight: "100vh" }}>
      <StoreHeader
        user={user}
        wl={wl}
        totalQty={totalQty}
        view={view}
        megaOpen={megaOpen}
        setMegaOpen={setMegaOpen}
        hovCat={hovCat}
        setHovCat={setHovCat}
        hovSub={hovSub}
        setHovSub={setHovSub}
        onGo={go}
        onGoCat={goCat}
        onGoSub={goSub}
        onGoItem={goItem}
        onShowLogin={() => setShowLogin(true)}
        onShowWishlist={() => setWlOpen(true)}
        onShowCart={() => setCartOpen(true)}
        onShowAdmin={() => setMode("admin")}
        onOpenAccount={openAccount}
        onLogout={handleLogout}
      />
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
        {renderStoreView()}
      </main>
      <StoreFooter goInfo={goInfo} />
      {cartOpen && <CartDrawer cart={cart} setCart={setCart} onClose={() => setCartOpen(false)} user={user} onLogin={() => { setCartOpen(false); setShowLogin(true); }} />}
      {wlOpen && <WishlistDrawer wl={wl} setWl={setWl} setCart={setCart} onClose={() => setWlOpen(false)} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={(nextUser) => { setUser(nextUser); setShowLogin(false); }} />}
    </div>
  );
}
