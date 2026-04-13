export const ADMIN_EMAIL = "shipmoraoffc@gmail.com";
export const ADMIN_PASS = "Shipmora@2025";

export const CATS = [
  { id: "electronics", label: "Electronics", icon: "⚡", color: "#1e1b4b", sub: [
    { name: "Smart Gadgets", icon: "📱", items: [] },
    { name: "Audio & Video", icon: "🎧", items: ["Headphones & Earphones", "Speakers & Soundbars", "Home Theatre", "Projectors"] },
    { name: "Storage", icon: "💾", items: [] },
    { name: "Batteries & Power", icon: "🔋", items: [] },
  ] },
  { id: "phone", label: "Phone Accessories", icon: "📱", color: "#0c4a6e", sub: [
    { name: "Charging Accessories", icon: "🔌", items: ["Type-C Cables", "Wall Chargers", "Wireless Chargers", "Car Chargers"] },
    { name: "Protection", icon: "🛡️", items: ["Screen Protectors", "Phone Cases", "Camera Lens Protectors"] },
    { name: "Holders & Mounts", icon: "📌", items: ["Desk Stands", "Car Mounts", "Bike Holders", "Ring Holders"] },
    { name: "Audio", icon: "🎵", items: ["Wired Earphones", "Bluetooth Earbuds", "Neckbands", "Audio Adapters"] },
    { name: "Camera Accessories", icon: "📷", items: ["Clip-on Lens", "Selfie Ring Lights", "Mobile Tripods", "Gimbals"] },
  ] },
  { id: "home", label: "Home & Kitchen", icon: "🏠", color: "#14532d", sub: [
    { name: "Kitchen & Dining", icon: "🍳", items: [] },
    { name: "Home Decor", icon: "🏮", items: ["Arts & Crafts", "Indoor & LED Lightings", "Fragrance"] },
    { name: "Home Textiles", icon: "🛏️", items: [] },
    { name: "Garden & Outdoor", icon: "🌿", items: ["Garden Lightings", "Plants", "Garden Accessories", "Fertilizers"] },
    { name: "Home Improvement", icon: "🔧", items: ["Cleaning", "Power Tools", "Hand Tools", "Measuring Tools"] },
  ] },
  { id: "auto", label: "Automobiles", icon: "🚗", color: "#450a0a", sub: [
    { name: "Car Electronics", icon: "📡", items: ["Chargers", "Dash Cams", "Monitors", "GPS Trackers", "Mirror Cams", "Car Lightings"] },
    { name: "Car Care", icon: "🧽", items: ["Cleaning", "Polish", "Washing Kits"] },
    { name: "Car Accessories", icon: "🚗", items: [] },
    { name: "Motorcycle Accessories", icon: "🏍️", items: ["Moto Lightings", "Fairings", "Handlebar Accessories", "Mirrors", "Footrests", "Exhausts"] },
    { name: "Helmets", icon: "⛑️", items: [] },
  ] },
  { id: "mens", label: "Men's Fashion", icon: "👔", color: "#1e3a5f", sub: [
    { name: "Topwear", icon: "👕", items: ["T-Shirts & Polos", "Formal Shirts", "Casual Shirts", "Hoodies", "Jackets & Coats"] },
    { name: "Bottomwear", icon: "👖", items: ["Jeans", "Trousers", "Cargos", "Shorts"] },
    { name: "Ethnic Wear", icon: "👘", items: ["Kurtas", "Kurta Sets", "Sherwanis", "Ethnic Jackets"] },
    { name: "Suits & Blazers", icon: "🤵", items: ["Blazers", "Formal Suits", "Waistcoats"] },
    { name: "Footwear", icon: "👟", items: ["Casual Shoes", "Formal Shoes", "Sports Shoes", "Sneakers", "Boots", "Sandals"] },
    { name: "Watches", icon: "⌚", items: ["Analog", "Digital", "Chronograph", "Smart Watches"] },
    { name: "Sunglasses", icon: "🕶️", items: ["Aviators", "Wayfarers", "Round", "Square"] },
    { name: "Accessories", icon: "💎", items: ["Belts", "Wallets", "Socks", "Caps & Hats"] },
  ] },
  { id: "womens", label: "Women's Fashion", icon: "👗", color: "#4a1942", sub: [
    { name: "Western Wear", icon: "👗", items: ["Tops & T-Shirts", "Dresses", "Jumpsuits", "Skirts", "Shorts"] },
    { name: "Ethnic Wear", icon: "🥻", items: ["Kurtis", "Sarees", "Salwar Suits", "Lehengas", "Dupattas"] },
    { name: "Winter Wear", icon: "🧥", items: ["Hoodies", "Sweaters", "Jackets", "Coats"] },
    { name: "Footwear", icon: "👠", items: ["Flats", "Heels", "Boots", "Sneakers", "Sandals"] },
    { name: "Watches", icon: "⌚", items: ["Analog", "Digital", "Bracelet Watches", "Smart Watches"] },
    { name: "Accessories", icon: "💍", items: ["Earrings", "Necklaces", "Bracelets", "Rings", "Belts", "Hair Accessories"] },
  ] },
  { id: "kids", label: "Kids Fashion", icon: "🎒", color: "#7c2d12", sub: [
    { name: "Boys", icon: "👦", items: ["T-Shirts", "Shirts", "Jeans", "Shorts", "Ethnic Wear", "Nightwear"] },
    { name: "Girls", icon: "👧", items: ["Dresses", "Tops", "Jeans & Leggings", "Skirts", "Ethnic Wear"] },
    { name: "Footwear", icon: "👟", items: ["Casual", "Sports", "Sandals", "School Shoes", "Boots"] },
    { name: "Accessories", icon: "🧢", items: ["Caps & Hats", "Socks", "Sunglasses", "Watches", "School Bags"] },
  ] },
  { id: "baby", label: "Baby Care", icon: "🍼", color: "#1c1917", sub: [
    { name: "Baby Clothing", icon: "👶", items: ["Bodysuits", "Rompers", "Baby Sets", "Nightwear", "Sweaters"] },
    { name: "Baby Essentials", icon: "🍼", items: ["Diaper Bags", "Feeding Bottles", "Bibs", "Baby Towels", "Blankets"] },
    { name: "Baby Gear", icon: "🛒", items: ["Strollers", "Walkers", "Car Seats", "Baby Carriers"] },
  ] },
  { id: "toys", label: "Toys", icon: "🧸", color: "#065f46", sub: [
    { name: "Educational Toys", icon: "📚", items: [] },
    { name: "Building Blocks", icon: "🧱", items: [] },
    { name: "Dolls & Action Figures", icon: "🪆", items: [] },
    { name: "RC Toys", icon: "🎮", items: [] },
    { name: "Board Games", icon: "♟️", items: [] },
    { name: "Soft Toys", icon: "🧸", items: [] },
    { name: "Outdoor Toys", icon: "⛹️", items: [] },
    { name: "Puzzles", icon: "🧩", items: [] },
  ] },
  { id: "sports", label: "Sports & Fitness", icon: "🏋️", color: "#1a2e05", sub: [
    { name: "Fitness Equipment", icon: "🏋️", items: [] },
    { name: "Yoga & Wellness", icon: "🧘", items: [] },
    { name: "Sports Equipment", icon: "⚽", items: [] },
    { name: "Cycling", icon: "🚴", items: [] },
    { name: "Sports Accessories", icon: "🏅", items: [] },
  ] },
  { id: "bags", label: "Bags", icon: "👜", color: "#451a03", sub: [
    { name: "Backpacks", icon: "🎒", items: ["Casual Backpacks", "Laptop Backpacks", "Travel Backpacks"] },
    { name: "Laptop Bags", icon: "💼", items: ["Office Laptop Bags", "Sleeves"] },
    { name: "Duffel Bags", icon: "👜", items: ["Gym Bags", "Travel Duffel Bags", "Weekender Bags"] },
    { name: "Travel Luggage", icon: "🧳", items: ["Cabin Trolley", "Suitcases", "Luggage Sets"] },
    { name: "Women's Bags", icon: "👛", items: ["Handbags", "Clutches", "Chain Sling Bags"] },
  ] },
  { id: "health", label: "Health & Beauty", icon: "💊", color: "#3b0764", sub: [
    { name: "Beauty", icon: "💄", items: ["Makeup", "Skincare", "Haircare"] },
    { name: "Personal Care", icon: "🧴", items: ["Daily Hygiene Products"] },
    { name: "Health Care", icon: "💊", items: ["Vitamins & Supplements"] },
  ] },
];

export const PRODUCTS = [
  { id: 1, name: "AirPods Pro Max", price: 24999, orig: 29999, cat: "electronics", rating: 4.8, reviews: 2341, badge: "Bestseller", emoji: "🎧", color: "#1a1a2e" },
  { id: 2, name: "Slim Fit Shirt", price: 1299, orig: 2499, cat: "mens", rating: 4.5, reviews: 876, badge: "", emoji: "👔", color: "#16213e" },
  { id: 3, name: "Ceramic Pan Set", price: 3499, orig: 5999, cat: "home", rating: 4.7, reviews: 1203, badge: "", emoji: "🍳", color: "#0f3460" },
  { id: 4, name: "Kids Learning Tablet", price: 5999, orig: 8999, cat: "toys", rating: 4.6, reviews: 654, badge: "", emoji: "📱", color: "#533483" },
  { id: 5, name: "Yoga Mat Pro", price: 1899, orig: 2999, cat: "sports", rating: 4.9, reviews: 3201, badge: "Bestseller", emoji: "🧘", color: "#e94560" },
  { id: 6, name: "Floral Ethnic Kurta", price: 1599, orig: 2999, cat: "womens", rating: 4.4, reviews: 421, badge: "", emoji: "👗", color: "#b8316a" },
  { id: 7, name: "Car Dash Camera 4K", price: 4599, orig: 7999, cat: "auto", rating: 4.6, reviews: 987, badge: "", emoji: "📷", color: "#2d6a4f" },
  { id: 8, name: "Premium Leather Bag", price: 2999, orig: 4999, cat: "bags", rating: 4.7, reviews: 1543, badge: "Bestseller", emoji: "🎒", color: "#774936" },
  { id: 9, name: "MagSafe Charger", price: 2299, orig: 3499, cat: "phone", rating: 4.5, reviews: 2109, badge: "", emoji: "🔌", color: "#1b4332" },
  { id: 10, name: "Power Bank 30K", price: 1799, orig: 2999, cat: "electronics", rating: 4.8, reviews: 4520, badge: "Bestseller", emoji: "🔋", color: "#003049" },
  { id: 11, name: "Baby Organic Romper", price: 899, orig: 1499, cat: "baby", rating: 4.9, reviews: 312, badge: "", emoji: "🍼", color: "#6d6875" },
  { id: 12, name: "RC Racing Car", price: 2499, orig: 3999, cat: "toys", rating: 4.3, reviews: 765, badge: "", emoji: "🚗", color: "#d62828" },
];

export const ORDERS_DATA = [
  { id: "#ORD-9821", customer: "Rahul Sharma", product: "AirPods Pro Max", amount: "₹24,999", status: "Delivered", date: "Mar 10" },
  { id: "#ORD-9820", customer: "Priya Singh", product: "Yoga Mat Pro", amount: "₹1,899", status: "Shipped", date: "Mar 10" },
  { id: "#ORD-9819", customer: "Amit Verma", product: "Car Dash Camera", amount: "₹4,599", status: "Processing", date: "Mar 09" },
  { id: "#ORD-9818", customer: "Sneha Patel", product: "Leather Bag", amount: "₹2,999", status: "Cancelled", date: "Mar 09" },
];

export const SC = {
  Delivered: { bg: "#d1fae5", c: "#065f46" },
  Shipped: { bg: "#dbeafe", c: "#1e40af" },
  Processing: { bg: "#fef3c7", c: "#92400e" },
  Cancelled: { bg: "#fee2e2", c: "#991b1b" },
};

export const INFO = {
  "About Us": { icon: "🚀", color: "linear-gradient(135deg,#1e1b4b,#4c1d95)", desc: "Founded in 2022, Shipmora serves 10M+ customers across 500+ cities.", stats: [{ h: "10M+", l: "Customers" }, { h: "500+", l: "Cities" }, { h: "1M+", l: "Products" }, { h: "50K+", l: "Sellers" }] },
  Careers: { icon: "💼", color: "linear-gradient(135deg,#065f46,#047857)", desc: "Competitive pay, stock options, remote work, health insurance.", jobs: ["Senior Frontend Engineer", "Product Manager", "Data Scientist", "UX Designer", "Marketing Intern"] },
  Press: { icon: "📰", color: "linear-gradient(135deg,#1e3a5f,#1e40af)", desc: "Contact press@shipmora.com for media enquiries.", press: ["Raises ₹500 Cr Series C", "Same-Day Delivery in 50 Cities", "10 Million Customers", "Partnership with India Post"] },
  Blog: { icon: "✍️", color: "linear-gradient(135deg,#7c2d12,#c2410c)", desc: "Stories and tips from our team.", posts: ["10 Smart Shopping Hacks", "How We Cut Delivery Time by 40%", "Rise of Sustainable Shopping", "Meet the Sellers"] },
  "Contact Us": { icon: "💬", color: "linear-gradient(135deg,#155e75,#0e7490)", desc: "We are always here to help.", contacts: [{ icon: "📧", l: "Email", v: "support@shipmora.com" }, { icon: "📞", l: "Phone", v: "+91 1800-SHIP-MORA" }, { icon: "💬", l: "Live Chat", v: "Under 2 min wait" }, { icon: "📍", l: "Office", v: "45, Koramangala, Bengaluru" }] },
  FAQs: { icon: "❓", color: "linear-gradient(135deg,#4a1942,#7e1d7e)", desc: "Quick answers to common questions.", faqs: [{ q: "How long does delivery take?", a: "Standard 3-5 days, Express next-day in 100+ cities." }, { q: "What payments are accepted?", a: "Cards, UPI, wallets, net banking, Cash on Delivery." }, { q: "What is the return policy?", a: "30-day returns. Free pickup within 48 hours." }, { q: "How long do refunds take?", a: "5-7 business days to original payment method." }] },
  Returns: { icon: "↩️", color: "linear-gradient(135deg,#1c1917,#44403c)", desc: "30-day hassle-free returns. Free pickup, refund in 5-7 days.", steps: ["Initiate in My Orders", "Schedule free pickup", "Pack item securely", "Refund processed"] },
  Shipping: { icon: "🚚", color: "linear-gradient(135deg,#0c4a6e,#0369a1)", desc: "Delivering to 500+ cities across India.", delivery: [{ t: "Standard", time: "3-5 days", cost: "Free above ₹999" }, { t: "Express", time: "Next day", cost: "₹149 flat" }, { t: "Same-Day", time: "Within 6 hrs", cost: "₹199 flat" }, { t: "Scheduled", time: "Choose slot", cost: "₹99 flat" }] },
  "Privacy Policy": { icon: "🔒", color: "linear-gradient(135deg,#1e1b4b,#312e81)", desc: "We never sell your data. Contact privacy@shipmora.com for requests.", sections: ["Data Collection", "How We Use It", "Data Sharing", "Your Rights", "Cookies"] },
  Terms: { icon: "📜", color: "linear-gradient(135deg,#1c1917,#292524)", desc: "By using Shipmora you agree to these terms. Users must be 18+.", sections: ["Acceptance", "User Accounts", "Orders & Payments", "Prohibited Activities", "Liability"] },
  "Cookie Policy": { icon: "🍪", color: "linear-gradient(135deg,#451a03,#92400e)", desc: "We use essential, analytics and marketing cookies.", cookies: [{ t: "Essential", r: true }, { t: "Analytics", r: false }, { t: "Marketing", r: false }, { t: "Preference", r: false }] },
  Compliance: { icon: "⚖️", color: "linear-gradient(135deg,#0f172a,#1e293b)", desc: "Compliant with IT Act 2000, DPDPA 2023 and all RBI guidelines.", sections: ["Regulatory", "Data Protection", "Seller Compliance", "Grievance Redressal"] },
};

export const FOOTER_COLUMNS = [
  { title: "Company", links: ["About Us", "Careers", "Press", "Blog"] },
  { title: "Help", links: ["Contact Us", "FAQs", "Returns", "Shipping"] },
  { title: "Legal", links: ["Privacy Policy", "Terms", "Cookie Policy", "Compliance"] },
];
