import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api";
import { Heart, Share2, SlidersHorizontal, MapPin, Star, CheckCircle2 } from "lucide-react";

const amenitiesList = [
  "Wi-Fi", "AC", "Mess", "Study Table", "Warden", "CCTV",
  "Cooler", "Geyser", "Kitchen", "Parking", "Lift", "Laundry", "Gym",
];

const FindStays = () => {
  const navigate = useNavigate();
  const locationHook = useLocation();
  const queryParams = new URLSearchParams(locationHook.search);

  const initialLocation = queryParams.get("location") || "";
  const initialType = queryParams.get("type") || "";
  const initialGender = queryParams.get("gender") || "";

  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState(initialLocation);
  const [stayType, setStayType] = useState(initialType ? initialType.toLowerCase() : "All");
  const [gender, setGender] = useState(initialGender ? initialGender.toLowerCase() : "All");
  const [maxPrice, setMaxPrice] = useState(15000);
  const [minPrice, setMinPrice] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [gateTiming, setGateTiming] = useState("Any");

  const getStoredFavorites = () => {
    if (typeof window === "undefined") return [];
    try {
      const stored = window.localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };
  const [favorites, setFavorites] = useState(getStoredFavorites);

  useEffect(() => {
    axios.get(`${API}/api/properties`)
      .then(res => setProperties(res.data))
      .catch(err => console.log(err));
  }, []);

  const toggleFavorite = (id) => {
    let updated = favorites.includes(id) ? favorites.filter(fav => fav !== id) : [...favorites, id];
    setFavorites(updated);
    try { localStorage.setItem("favorites", JSON.stringify(updated)); } catch {}
  };

  const handleShare = (property) => {
    const url = `${window.location.origin}/property/${property.id}`;
    if (navigator.share) {
      navigator.share({ title: property.title, text: "Check out this stay!", url });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  const filteredProperties = properties.filter(property => {
    const searchLower = search.trim().toLowerCase();
    const matchesSearch = property.title?.toLowerCase().includes(searchLower) ||
                          property.location?.toLowerCase().includes(searchLower);
    const matchesType = stayType === "All" || property.type?.toLowerCase() === stayType.toLowerCase();
    const matchesGender = gender === "All" || property.gender?.toLowerCase() === gender.toLowerCase();
    const matchesPrice = Number(property.price) >= minPrice && Number(property.price) <= maxPrice;
    const matchesAmenities = selectedAmenities.length === 0 || selectedAmenities.every(a => property.amenities?.includes(a));

    return matchesSearch && matchesType && matchesGender && matchesPrice && matchesAmenities;
  });

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities(prev => prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]);
  };

  const typeColor = (type) => {
    if (type === "PG") return { bg: "#e0f2fe", color: "#0369a1" };
    if (type === "Hostel") return { bg: "#fce7f3", color: "#be185d" };
    if (type === "Flat") return { bg: "#d1fae5", color: "#065f46" };
    return { bg: "#f3f4f6", color: "#374151" };
  };

  const genderColor = (g) => {
    if (g === "Girls") return { bg: "#fce7f3", color: "#be185d" };
    if (g === "Boys") return { bg: "#dbeafe", color: "#1d4ed8" };
    return { bg: "#f3f4f6", color: "#374151" };
  };

  return (
    <div style={{ background: "#f1f5f9", minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
      {/* HEADER */}
      <div className="find-header">
        <h1>Find Your Perfect Stay</h1>
        <p>{filteredProperties.length} properties found</p>
        <input
          type="text"
          className="search-bar"
          placeholder="Search by title or location..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="main-layout">
        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="sidebar-title"><SlidersHorizontal size={16} color="#1b263d" /> Filters</div>

          <div className="filter-label">Stay Type</div>
          <select className="filter-select" value={stayType} onChange={e => setStayType(e.target.value)}>
            <option value="All">All Types</option>
            <option value="pg">PG</option>
            <option value="hostel">Hostel</option>
            <option value="flat">Flat</option>
          </select>

          <div className="filter-label">For</div>
          <select className="filter-select" value={gender} onChange={e => setGender(e.target.value)}>
            <option value="All">All</option>
            <option value="boys">Boys</option>
            <option value="girls">Girls</option>
          </select>

          <div className="filter-label" style={{ marginTop: 16 }}>
            <div className="price-range-text">Rent Range: ₹{minPrice.toLocaleString()} - ₹{maxPrice.toLocaleString()}</div>
          </div>
          <input type="range" className="range-slider" min="2000" max="20000" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} />

          <div className="filter-label">Gate Timing</div>
          <select className="filter-select" value={gateTiming} onChange={e => setGateTiming(e.target.value)}>
            <option>Any</option>
            <option>10 PM</option>
            <option>11 PM</option>
            <option>12 AM</option>
            <option>No Curfew</option>
          </select>

          <div className="filter-label" style={{ marginBottom: 10 }}>Amenities</div>
          {amenitiesList.map(amenity => (
            <label key={amenity} className="amenity-item">
              <input type="checkbox" checked={selectedAmenities.includes(amenity)} onChange={() => handleAmenityChange(amenity)} />
              {amenity}
            </label>
          ))}

          <button className="clear-btn" onClick={() => {
            setStayType("All");
            setGender("All");
            setMaxPrice(15000);
            setMinPrice(0);
            setSelectedAmenities([]);
            setGateTiming("Any");
          }}>Clear All Filters</button>
        </div>

        {/* PROPERTY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map(property => {
            const tc = typeColor(property.type);
            const gc = genderColor(property.gender);
            const visibleAmenities = property.amenities?.slice(0, 3) || [];
            const extraCount = (property.amenities?.length || 0) - 3;

            return (
              <div key={property.id} className="property-card">
                <div className="card-img-wrap">
                  <img
                    src={property.imageUrl || "https://via.placeholder.com/300x175?text=No+Image"}
                    alt={property.title}
                    className="card-img"
                    onClick={() => navigate(`/property/${property.id}`)}
                  />
                  {property.verified !== false && <div className="verified-badge"><CheckCircle2 size={11} /> Verified</div>}
                  {property.distance && <div className="distance-chip"><MapPin size={10} /> {property.distance}</div>}

                  <button className="icon-btn icon-btn-heart" onClick={() => toggleFavorite(property.id)}>
                    <Heart size={16} color={favorites.includes(property.id) ? "#ef4444" : "#94a3b8"} fill={favorites.includes(property.id) ? "#ef4444" : "none"} />
                  </button>

                  <button className="icon-btn icon-btn-share" onClick={() => handleShare(property)}>
                    <Share2 size={15} color="#94a3b8" />
                  </button>
                </div>

                <div className="card-body">
                  <div className="card-top-row">
                    <span className="type-badge" style={{ background: tc.bg, color: tc.color }}>{property.type}</span>
                    <div className="rating"><Star size={14} fill="#f59e0b" color="#f59e0b" />{property.rating || "4.5"}</div>
                  </div>
                  <h3 className="card-title">{property.title}</h3>
                  <p className="card-location">{property.location}</p>

                  {visibleAmenities.length > 0 && (
                    <div className="amenities-row">
                      {visibleAmenities.map(am => <span key={am} className="amenity-tag">{am}</span>)}
                      {extraCount > 0 && <span className="amenity-more">+{extraCount}</span>}
                    </div>
                  )}

                  <div className="card-bottom">
                    <div className="price-block">
                      <div className="price-value">
                        ₹{property.minPrice ? `${Number(property.minPrice).toLocaleString()} - ₹${Number(property.price).toLocaleString()}` : Number(property.price).toLocaleString()}
                      </div>
                      <div className="price-sub">per month</div>
                    </div>
                    <span className="gender-badge" style={{ background: gc.bg, color: gc.color }}>{property.gender}</span>
                  </div>

                  <hr className="divider" />
                  <div className="updated-text">Updated {property.updatedAgo || "recently"}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FindStays;
