import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Share2 } from "lucide-react";
import API from "../api";
/* ─── Amenity Icon Map ─────────────────────────────────────── */
const AMENITY_ICONS = {
  "Study Table & Chair": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 7H4a1 1 0 00-1 1v1h18V8a1 1 0 00-1-1zM3 9v9a1 1 0 001 1h3v-4h8v4h3a1 1 0 001-1V9H3z"
      />
    </svg>
  ),
  "Wi-Fi": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01"
      />
    </svg>
  ),
  AC: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-5 h-5"
    >
      <rect x="2" y="6" width="20" height="8" rx="2" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 14v4M12 14v4M18 14v4"
      />
    </svg>
  ),
  Cooler: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"
      />
    </svg>
  ),
  Geyser: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
      />
    </svg>
  ),
  "Mess Facility": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 6h18M3 12h18M3 18h18"
      />
    </svg>
  ),
  Laundry: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-5 h-5"
    >
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <circle cx="12" cy="13" r="4" />
      <path d="M6 7h.01" strokeLinecap="round" />
    </svg>
  ),
  Lift: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7l4-4 4 4M8 17l4 4 4-4"
      />
    </svg>
  ),
  Parking: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-5 h-5"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17V7h4a3 3 0 010 6H9"
      />
    </svg>
  ),
  Gym: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 4v6M18 4v6M3 7h4M17 7h4M6 20v-6M18 20v-6M3 17h4M17 17h4M9 10h6"
      />
    </svg>
  ),
};

const DEFAULT_ICON = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-5 h-5"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    <circle cx="12" cy="12" r="9" />
  </svg>
);

/* ─── generateCalendar ─────────────────────────────────────── */
function generateCalendar(month, year) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendar = [];

  for (let i = 0; i < firstDay; i++) {
    calendar.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    calendar.push(d);
  }

  return calendar;
}

/* ─── Star Row ─────────────────────────────────────────────── */
const StarRow = ({ n }) =>
  Array.from({ length: 5 }).map((_, i) => (
    <svg
      key={i}
      className={`w-4 h-4 ${i < n ? "text-yellow-400" : "text-gray-200"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ));

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════ */
const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  useEffect(() => {
    axios
      // .get(`http://localhost:8080/api/properties/${id}`)
      axios.get(`${API}/api/properties/${id}`)
      .then((res) => {
        setProperty(res.data);
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (favorites.includes(res.data.id)) {
          setIsFavorite(true);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(property.id)) {
      favorites = favorites.filter((fid) => fid !== property.id);
      setIsFavorite(false);
    } else {
      favorites.push(property.id);
      setIsFavorite(true);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading property...</p>
        </div>
      </div>
    );
  }

  const images = [
    property.imageUrl ||
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80",
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=900&q=80",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80",
    "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=900&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=80",
  ];

  const amenitiesList = property.amenities?.length
    ? property.amenities
    : [
        "Study Table & Chair",
        "Wi-Fi",
        "AC",
        "Cooler",
        "Geyser",
        "Mess Facility",
        "Laundry",
        "Lift",
        "Parking",
        "Gym",
      ];

  const reviews = [
    {
      name: "Priya Sharma",
      loc: "IIT Delhi",
      rating: 5,
      text: "Best PG I've stayed in! Clean rooms, friendly owner, and super close to campus. Highly recommend! 🏡",
    },
    {
      name: "Rahul Kumar",
      loc: "NIT Campus",
      rating: 4,
      text: "Good overall experience. Mess food could be better but the location and facilities are great.",
    },
    {
      name: "Ananya Patel",
      loc: "NIT Today",
      rating: 5,
      text: "Owner is very cooperative. Stayed here for 2 years during my JEE prep. Feels like home!",
    },
  ];

  const nearbyPlaces = [
    { name: "HDFC ATM", cat: "Banks", dist: "250m", icon: "🏦" },
    { name: "City Library", cat: "Library", dist: "450m", icon: "📚" },
    { name: "Local Market", cat: "Market", dist: "800m", icon: "🛒" },
    { name: "India Gate", cat: "Tourist Places", dist: "1 km", icon: "🏛️" },
    { name: "Lotus Temple", cat: "Tourist Place", dist: "2 km", icon: "🪷" },
  ];

  const calendar = generateCalendar(currentMonth, currentYear);

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* TOP NAV */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 h-12 flex items-center px-4 sm:px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-gray-900 mr-auto transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-medium">Back</span>
        </button>
        <div className="flex gap-1">
          {/* ←←← Yaha share button add karo */}
          <button
            onClick={() => {
              // Simple share logic (browser ka native share ya link copy)
              const shareUrl = window.location.href;
              const shareText = `Check out this PG: ${property.title} in ${property.location} - ₹${property.price} onwards\n\n${shareUrl}`;

              if (navigator.share) {
                navigator
                  .share({
                    title: property.title,
                    text: shareText,
                    url: shareUrl,
                  })
                  .catch((err) => console.log("Share failed", err));
              } else {
                // Fallback: copy to clipboard
                navigator.clipboard
                  .writeText(shareText)
                  .then(() => alert("Link copied to clipboard!"))
                  .catch(() => alert("Could not copy link"));
              }
            }}
            className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            title="Share this property"
          >
            {/* <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="7.59" y1="5.51" x2="14.42" y2="15.49" />
              <line x1="14.41" y1="5.51" x2="7.59" y2="15.49" />
            </svg> */}
            <Share2 size={20} color="#4b5563"></Share2>
          </button>

          {/* Existing heart button (already working hai) */}
          <button
            onClick={toggleFavorite}
            className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <svg
              className={`w-5 h-5 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-600"}`}
              viewBox="0 0 24 24"
              fill={isFavorite ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </button>
        </div>
      </nav>

      {/* PAGE BODY */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* LEFT COLUMN */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* IMAGE GALLERY */}
            <div
              className="rounded-2xl overflow-hidden relative bg-gray-200"
              style={{ aspectRatio: "16/9" }}
            >
              <img
                src={images[selectedImage]}
                alt="Property"
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <div className="absolute top-3 left-3 bg-teal-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Verified by StaySarthi
              </div>
              <div className="absolute bottom-3 right-3 bg-black/55 text-white text-xs px-2.5 py-1 rounded-lg backdrop-blur-sm">
                📷 {selectedImage + 1} / {images.length}
              </div>
              <button
                onClick={() =>
                  setSelectedImage(
                    (p) => (p - 1 + images.length) % images.length,
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/85 rounded-full flex items-center justify-center shadow hover:bg-white transition"
              >
                <svg
                  className="w-4 h-4 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() => setSelectedImage((p) => (p + 1) % images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/85 rounded-full flex items-center justify-center shadow hover:bg-white transition"
              >
                <svg
                  className="w-4 h-4 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === i ? "border-teal-500 opacity-100 shadow-sm" : "border-gray-200 opacity-60 hover:opacity-90"}`}
                  style={{ width: 68, height: 56 }}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* PROPERTY INFO CARD */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                    {property.type || "Flat"}
                  </span>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                    {property.gender || "Co-ed"}
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1.5">
                  <svg
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-bold text-gray-800">
                    {property.rating || "4.7"}
                  </span>
                  <span className="text-xs text-gray-400">3 reviews</span>
                </div>
              </div>

              <h1 className="mt-3 text-xl font-bold text-gray-900">
                {property.title}
              </h1>

              <div className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-gray-500">
                <svg
                  className="w-4 h-4 text-gray-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{property.location}</span>
              </div>

              <div className="mt-3 flex items-end justify-between flex-wrap gap-2">
                <div>
                  <p className="text-xl font-bold text-gray-900">
                    ₹{Number(property.price || 8000).toLocaleString()} – ₹
                    {Number(property.priceMax || 12000).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">per month</p>
                </div>
                <span className="text-xs text-teal-600 font-medium whitespace-nowrap">
                  Last updated 3 days ago
                </span>
              </div>

              {property.description && (
                <p className="mt-3 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {property.description}
                </p>
              )}
            </div>

            {/* AMENITIES */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="w-5 h-5 text-teal-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="9" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4"
                  />
                </svg>
                <h2 className="text-sm font-semibold text-gray-800">
                  Amenities & Facilities
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {amenitiesList.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-gray-100 bg-teal-50/40 hover:bg-teal-50 hover:border-teal-200 transition-colors"
                  >
                    <span className="text-teal-500 flex-shrink-0">
                      {AMENITY_ICONS[item] || DEFAULT_ICON}
                    </span>
                    <span className="text-xs font-medium text-gray-700 leading-tight">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl p-3">
                <span className="text-base">💡</span>
                <p className="text-xs text-amber-700">
                  <span className="font-semibold">Pro Tip:</span> All amenities
                  are verified by our team. What you see is what you get!
                </p>
              </div>
            </div>

            {/* RULES & POLICIES */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-0.5">
                <svg
                  className="w-5 h-5 text-teal-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <h2 className="text-sm font-semibold text-gray-800">
                  Rules & Policies
                </h2>
              </div>
              <p className="text-xs text-gray-400 mb-4 ml-7">
                Rules help, we promise!
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  {
                    icon: (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 3" strokeLinecap="round" />
                      </svg>
                    ),
                    bg: "bg-teal-50",
                    iconColor: "text-teal-500",
                    label: "Gate Timing",
                    val: "Flexible",
                    valColor: "text-gray-800",
                  },
                  {
                    icon: (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 110-8 4 4 0 010 8z"
                        />
                      </svg>
                    ),
                    bg: "bg-teal-50",
                    iconColor: "text-teal-500",
                    label: "Guests Policy",
                    val: "Allowed",
                    valColor: "text-gray-800",
                  },
                  {
                    icon: (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10l4.553-2.069A1 1 0 0121 8.879V15.12a1 1 0 01-1.447.89L15 14M4 8h11a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z"
                        />
                      </svg>
                    ),
                    bg: "bg-orange-50",
                    iconColor: "text-orange-400",
                    label: "CCTV",
                    val: "Available",
                    valColor: "text-gray-800",
                  },
                  {
                    icon: (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0M2 12h2m16 0h2M12 2v2m0 16v2"
                        />
                      </svg>
                    ),
                    bg: "bg-red-50",
                    iconColor: "text-red-400",
                    label: "Smoking",
                    val: "Not Allowed",
                    valColor: "text-red-500",
                  },
                  {
                    icon: (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ),
                    bg: "bg-teal-50",
                    iconColor: "text-teal-500",
                    label: "Security Deposit",
                    val: "₹15,000",
                    valColor: "text-gray-800",
                  },
                  {
                    icon: (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                    ),
                    bg: "bg-red-50",
                    iconColor: "text-red-400",
                    label: "Alcohol",
                    val: "Not Allowed",
                    valColor: "text-red-500",
                  },
                ].map((rule, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50"
                  >
                    <div
                      className={`w-8 h-8 rounded-full ${rule.bg} flex items-center justify-center flex-shrink-0`}
                    >
                      <span className={rule.iconColor}>{rule.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400 leading-tight">
                        {rule.label}
                      </p>
                      <p
                        className={`text-xs font-semibold leading-tight mt-0.5 ${rule.valColor}`}
                      >
                        {rule.val}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* STUDENT REVIEWS */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-0.5">
                <svg
                  className="w-5 h-5 text-teal-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <h2 className="text-sm font-semibold text-gray-800">
                  Student Reviews
                </h2>
              </div>
              <p className="text-xs text-gray-400 mb-4 ml-7">
                Honest feedback from real students.
              </p>

              <div className="space-y-3">
                {reviews.map((r, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-gray-100 bg-gray-50"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {r.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{r.loc}</p>
                      </div>
                      <div className="flex gap-0.5 flex-shrink-0 mt-0.5">
                        <StarRow n={r.rating} />
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      {r.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* NEARBY PLACES */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-0.5">
                <svg
                  className="w-5 h-5 text-teal-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <h2 className="text-sm font-semibold text-gray-800">
                  Nearby Places
                </h2>
              </div>
              <p className="text-xs text-gray-400 mb-4 ml-7">
                Important locations around this property
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {nearbyPlaces.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
                      {p.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {p.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">{p.cat}</p>
                    </div>
                    <span className="text-xs font-semibold text-teal-600 whitespace-nowrap">
                      {p.dist}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* HOW WE KEEP YOU SAFE */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="w-5 h-5 text-teal-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <h2 className="text-sm font-semibold text-gray-800">
                  How We Keep You Safe
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  {
                    icon: "✅",
                    title: "Verified Photos",
                    desc: "All photos are verified with timestamps",
                  },
                  {
                    icon: "📞",
                    title: "Routed Calls",
                    desc: "Calls via StaySarthi to protect your privacy",
                  },
                  {
                    icon: "🎓",
                    title: "Student ID Verification",
                    desc: "Both parties verified for safety",
                  },
                  {
                    icon: "💬",
                    title: "WhatsApp Support",
                    desc: "24/7 help for issues during stay",
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl bg-teal-50/60 border border-teal-100"
                  >
                    <span className="text-base mt-0.5 flex-shrink-0">
                      {s.icon}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {s.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — BOOKING CARD */}
          <div className="lg:w-72 xl:w-76 flex-shrink-0">
            <div className="lg:sticky lg:top-14">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                {/* Price */}
                <div className="px-5 pt-5 pb-4">
                  <p className="text-2xl font-bold text-gray-900 leading-none">
                    ₹{Number(property.price || 8000).toLocaleString()} - ₹
                    {Number(property.priceMax || 12000).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 mb-4">per month</p>

                  {/* Calendar */}
                  <div className="border border-gray-200 rounded-xl overflow-hidden mb-3.5">
                    <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 border-b border-gray-200">
                      <svg
                        className="w-4 h-4 text-teal-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-xs font-semibold text-gray-700">
                        Book a Visit Slot
                      </span>
                    </div>

                    <div className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <button
                          onClick={() => {
                            if (currentMonth === 0) {
                              setCurrentMonth(11);
                              setCurrentYear((y) => y - 1);
                            } else {
                              setCurrentMonth((m) => m - 1);
                            }
                          }}
                          className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-gray-100 transition"
                        >
                          <svg
                            className="w-3.5 h-3.5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>

                        <span className="text-xs font-semibold text-gray-800">
                          {new Date(currentYear, currentMonth).toLocaleString(
                            "default",
                            { month: "long", year: "numeric" },
                          )}
                        </span>

                        <button
                          onClick={() => {
                            if (currentMonth === 11) {
                              setCurrentMonth(0);
                              setCurrentYear((y) => y + 1);
                            } else {
                              setCurrentMonth((m) => m + 1);
                            }
                          }}
                          className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-gray-100 transition"
                        >
                          <svg
                            className="w-3.5 h-3.5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="grid grid-cols-7 mb-1">
                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                          <div
                            key={d}
                            className="text-center text-xs font-medium text-gray-400 py-0.5"
                          >
                            {d}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-y-0.5">
                        {calendar.map((day, i) => (
                          <button
                            key={i}
                            disabled={!day}
                            onClick={() => day && setSelectedDate(day)}
                            className={`w-8 h-8 text-xs rounded-lg ${
                              selectedDate === day
                                ? "bg-teal-500 text-white font-medium"
                                : day
                                  ? "hover:bg-gray-100"
                                  : ""
                            } ${!day ? "invisible" : ""}`}
                          >
                            {day || ""}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          if (!selectedDate) {
                            alert("Please select a date first");
                            return;
                          }
                          alert(
                            `Visit booked for ${selectedDate}/${currentMonth + 1}/${currentYear}`,
                          );
                        }}
                        className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2.5 rounded-xl transition text-sm mt-3"
                      >
                        Confirm Visit
                      </button>
                    </div>
                  </div>

                  {/* Book Visit */}
                  <button className="w-full bg-teal-500 hover:bg-teal-600 active:bg-teal-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 mb-2 shadow-sm">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Book Visit
                  </button>

                  {/* Contact Owner */}
                  <button className="w-full border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Contact Owner
                  </button>

                  {/* Safe note */}
                  <div className="mt-3 flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl p-2.5">
                    <svg
                      className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <p className="text-xs text-blue-700">
                      <span className="font-semibold">Safe & Secure:</span> Your
                      call will be routed through{" "}
                      <span className="font-semibold text-blue-600">
                        StaySarthi
                      </span>{" "}
                      to protect your privacy
                    </p>
                  </div>

                  {/* Meta rows */}
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                    {[
                      { k: "Type", v: property.type || "Flat" },
                      { k: "For", v: property.gender || "Co-ed" },
                      { k: "Gate Timing", v: "Flexible" },
                      { k: "Security Deposit", v: "₹15,000" },
                    ].map((row) => (
                      <div
                        key={row.k}
                        className="flex items-center justify-between"
                      >
                        <span className="text-xs text-gray-500">{row.k}</span>
                        <span className="text-xs font-semibold text-gray-800">
                          {row.v}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verified banner */}
                <div className="border-t border-gray-100 bg-emerald-50/70 px-5 py-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        Verified Property
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                        This property has been verified by StaySarthi team.
                        Photos updated 3 days ago.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
