// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Heart, Share2 } from "lucide-react";

// const FindStays = () => {
//   const navigate = useNavigate();

//   const [properties, setProperties] = useState([]);
//   const [search, setSearch] = useState("");
//   const [stayType, setStayType] = useState("All");
//   const [gender, setGender] = useState("All");
//   const [maxPrice, setMaxPrice] = useState(15000);
//   const [selectedAmenities, setSelectedAmenities] = useState([]);
//   const [favorites, setFavorites] = useState([]);

//   // 🔥 FETCH DATA (ONLY ONCE)
//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/properties")
//       .then((res) => {
//         setProperties(res.data);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   // ❤️ LIKE FUNCTION
//   const toggleFavorite = (id) => {
//     setFavorites((prev) =>
//       prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id],
//     );
//   };

//   // 🔗 SHARE FUNCTION
//   const handleShare = (property) => {
//     const url = `${window.location.origin}/property/${property.id}`;

//     if (navigator.share) {
//       navigator.share({
//         title: property.title,
//         text: "Check out this stay!",
//         url: url,
//       });
//     } else {
//       navigator.clipboard.writeText(url);
//       alert("Link copied to clipboard!");
//     }
//   };

//   // 🎯 MAIN FILTER LOGIC (Single Source of Truth)
//   const filteredProperties = properties.filter((property) => {
//     const matchesSearch =
//       property.title?.toLowerCase().includes(search.toLowerCase()) ||
//       property.location?.toLowerCase().includes(search.toLowerCase());

//     const matchesType = stayType === "All" || property.type === stayType;

//     const matchesGender = gender === "All" || property.gender === gender;

//     const matchesPrice = Number(property.price) <= Number(maxPrice);

//     const matchesAmenities =
//       selectedAmenities.length === 0 ||
//       selectedAmenities.every((amenity) =>
//         property.amenities?.includes(amenity),
//       );

//     return (
//       matchesSearch &&
//       matchesType &&
//       matchesGender &&
//       matchesPrice &&
//       matchesAmenities
//     );
//   });

//   const handleAmenityChange = (amenity) => {
//     if (selectedAmenities.includes(amenity)) {
//       setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
//     } else {
//       setSelectedAmenities([...selectedAmenities, amenity]);
//     }
//   };

//   return (
//     <div style={{ background: "#f3f4f6", minHeight: "100vh" }}>
//       {/* HEADER */}
//       <div
//         style={{
//           background: "linear-gradient(90deg,#0ea5e9,#2563eb)",
//           padding: "40px 60px",
//           color: "white",
//         }}
//       >
//         <h1 style={{ margin: 0, fontSize: "32px", fontWeight: "700" }}>
//           Find Your Perfect Stay
//         </h1>
//         <p style={{ marginTop: "8px" }}>
//           {filteredProperties.length} properties found
//         </p>

//         {/* SEARCH BAR */}
//         <input
//           type="text"
//           placeholder="Search by title or location..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={{
//             marginTop: "20px",
//             padding: "10px",
//             width: "300px",
//             borderRadius: "8px",
//             border: "none",
//             color: "black",
//           }}
//         />
//       </div>

//       <div style={{ display: "flex", padding: "40px 60px", gap: "30px" }}>
//         {/* SIDEBAR FILTER */}
//         <div
//           style={{
//             width: "260px",
//             background: "white",
//             padding: "20px",
//             borderRadius: "16px",
//           }}
//         >
//           <h4>Stay Type</h4>
//           <select
//             value={stayType}
//             onChange={(e) => setStayType(e.target.value)}
//             style={{ width: "100%", marginBottom: "15px" }}
//           >
//             <option>All</option>
//             <option>PG</option>
//             <option>Hostel</option>
//             <option>Flat</option>
//           </select>

//           <h4>For</h4>
//           <select
//             value={gender}
//             onChange={(e) => setGender(e.target.value)}
//             style={{ width: "100%", marginBottom: "15px" }}
//           >
//             <option>All</option>
//             <option>Boys</option>
//             <option>Girls</option>
//           </select>

//           <h4>Max Rent: ₹{maxPrice}</h4>
//           <input
//             type="range"
//             min="2000"
//             max="20000"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(e.target.value)}
//             style={{ width: "100%", marginBottom: "20px" }}
//           />

//           <h4>Amenities</h4>
//           {["Wi-Fi", "AC", "Mess"].map((amenity) => (
//             <div key={amenity}>
//               <input
//                 type="checkbox"
//                 checked={selectedAmenities.includes(amenity)}
//                 onChange={() => handleAmenityChange(amenity)}
//               />
//               {amenity}
//             </div>
//           ))}

//           <button
//             style={{ marginTop: "15px" }}
//             onClick={() => {
//               setStayType("All");
//               setGender("All");
//               setMaxPrice(15000);
//               setSelectedAmenities([]);
//             }}
//           >
//             Clear Filters
//           </button>
//         </div>

//         {/* PROPERTY GRID */}
//         <div
//           style={{
//             flex: 1,
//             display: "grid",
//             gridTemplateColumns: "repeat(3,1fr)",
//             gap: "20px",
//           }}
//         >
//           {filteredProperties.map((property) => (
//             <div
//               key={property.id}
//               style={{
//                 background: "white",
//                 borderRadius: "15px",
//                 overflow: "hidden",
//                 boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
//                 cursor: "pointer",
//                 position: "relative",
//               }}
//             >
//               {/* <img
//                 src={property.imageUrl} */}
//               <img
//                 src={property.imageUrl || "https://via.placeholder.com/300"}
//                 alt={property.title}
//                 onClick={() => navigate(`/property/${property.id}`)}
//                 style={{
//                   width: "100%",
//                   height: "180px",
//                   objectFit: "cover",
//                 }}
//               />

//               {/* LIKE */}
//               <button
//                 onClick={() => toggleFavorite(property.id)}
//                 style={{
//                   position: "absolute",
//                   top: "10px",
//                   right: "50px",
//                   background: "white",
//                   borderRadius: "50%",
//                   padding: "6px",
//                   border: "none",
//                   cursor: "pointer",
//                 }}
//               >
//                 <Heart
//                   color={favorites.includes(property.id) ? "red" : "gray"}
//                   fill={favorites.includes(property.id) ? "red" : "none"}
//                 />
//               </button>

//               {/* SHARE */}
//               <button
//                 onClick={() => handleShare(property)}
//                 style={{
//                   position: "absolute",
//                   top: "10px",
//                   right: "10px",
//                   background: "white",
//                   borderRadius: "50%",
//                   padding: "6px",
//                   border: "none",
//                   cursor: "pointer",
//                 }}
//               >
//                 <Share2 size={18} />
//               </button>

//               <div style={{ padding: "15px" }}>
//                 <h3>{property.title}</h3>
//                 <p>{property.location}</p>
//                 <p style={{ fontWeight: "bold", color: "#2563eb" }}>
//                   ₹{property.price} / month
//                 </p>
//                 <p style={{ fontSize: "13px", color: "gray" }}>
//                   For: {property.gender}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FindStays;
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Heart,
  Share2,
  SlidersHorizontal,
  MapPin,
  Star,
  CheckCircle2,
} from "lucide-react";

const amenitiesList = [
  "Wi-Fi",
  "AC",
  "Mess",
  "Study Table",
  "Warden",
  "CCTV",
  "Cooler",
  "Geyser",
  "Kitchen",
  "Parking",
  "Lift",
  "Laundry",
  "Gym",
];

const FindStays = () => {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);

  const [maxPrice, setMaxPrice] = useState(15000);
  const [minPrice, setMinPrice] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [gateTiming, setGateTiming] = useState("Any");

  const locationHook = useLocation();
  const queryParams = new URLSearchParams(locationHook.search);

  const initialLocation = queryParams.get("location") || "";
  const initialType = queryParams.get("type") || "";
  const initialGender = queryParams.get("gender") || "";
  const [search, setSearch] = useState(initialLocation);
  const [stayType, setStayType] = useState(
    initialType ? initialType.toLowerCase() : "All",
  );
  const [gender, setGender] = useState(
    initialGender ? initialGender.toLowerCase() : "All",
  );

  // const [search, setSearch] = useState(initialLocation);
  // const [stayType, setStayType] = useState(initialType || "All");
  // const [gender, setGender] = useState(initialGender || "All");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/properties")
      .then((res) => {
        console.log("API Response:", res.data);
        setProperties(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleShare = (property) => {
    const url = `${window.location.origin}/property/${property.id}`;
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: "Check out this stay!",
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title?.toLowerCase().includes(search.toLowerCase()) ||
      property.location?.toLowerCase().includes(search.toLowerCase());
    const matchesType =
      stayType === "All" ||
      property.type?.toLowerCase() === stayType.toLowerCase();

    const matchesGender =
      gender === "All" ||
      property.gender?.toLowerCase() === gender.toLowerCase();

    const matchesPrice =
      Number(property.price) >= Number(minPrice) &&
      Number(property.price) <= Number(maxPrice);

    const matchesAmenities =
      selectedAmenities.length === 0 ||
      selectedAmenities.every((amenity) =>
        property.amenities?.includes(amenity),
      );
    return (
      matchesSearch &&
      matchesType &&
      matchesGender &&
      matchesPrice &&
      matchesAmenities
    );
  });

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
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
    <div
      style={{
        background: "#f1f5f9",
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        .find-header {
          background: linear-gradient(135deg, #06b6d4 0%, #2563eb 60%, #1e3a8a 100%);
          padding: 36px 48px 40px;
          color: white;
        }

        .find-header h1 {
          margin: 0;
          font-size: 30px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .find-header p {
          margin: 6px 0 0;
          font-size: 14px;
          opacity: 0.85;
        }

        .search-bar {
          margin-top: 20px;
          padding: 10px 16px;
          width: 320px;
          border-radius: 10px;
          border: none;
          font-size: 14px;
          font-family: 'Poppins', sans-serif;
          outline: none;
          color: #1e293b;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }

        .main-layout {
          display: flex;
          padding: 28px 40px;
          gap: 24px;
          align-items: flex-start;
        }

        /* SIDEBAR */
        .sidebar {
          width: 220px;
          flex-shrink: 0;
          background: white;
          border-radius: 16px;
          padding: 20px 18px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.07);
          position: sticky;
          top: 20px;
        }

        .sidebar-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 18px;
        }

        .filter-label {
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
          margin-top: 14px;
        }

        .filter-select {
          width: 100%;
          padding: 8px 10px;
          border-radius: 8px;
          border: 1.5px solid #e2e8f0;
          font-size: 13px;
          font-family: 'Poppins', sans-serif;
          color: #334155;
          background: #f8fafc;
          outline: none;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          padding-right: 28px;
        }

        .price-range-text {
          font-size: 12px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 8px;
        }

        .range-slider {
          width: 100%;
          accent-color: #1e2d4c;
          cursor: pointer;
        }

        .amenity-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #334155;
          margin-bottom: 6px;
          cursor: pointer;
        }

        .amenity-item input[type="checkbox"] {
          width: 15px;
          height: 15px;
          accent-color: #2563eb;
          cursor: pointer;
          border-radius: 4px;
        }

        .clear-btn {
          margin-top: 16px;
          width: 100%;
          padding: 9px;
          border-radius: 8px;
          border: 1.5px solid #e2e8f0;
          background: white;
          font-size: 13px;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s;
        }
        .clear-btn:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
        }

        /* GRID */
        .property-grid {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        @media (max-width: 1100px) {
          .property-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 720px) {
          .property-grid { grid-template-columns: 1fr; }
          .main-layout { flex-direction: column; padding: 16px; }
          .sidebar { width: 100%; position: static; }
          .find-header { padding: 24px 20px; }
          .search-bar { width: 100%; }
        }

        /* CARD */
        .property-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.07);
          cursor: pointer;
          position: relative;
          transition: box-shadow 0.22s, transform 0.22s;
        }
        .property-card:hover {
          box-shadow: 0 8px 28px rgba(37,99,235,0.13);
          transform: translateY(-2px);
        }

        .card-img-wrap {
          position: relative;
        }

        .card-img {
          width: 100%;
          height: 175px;
          object-fit: cover;
          display: block;
        }

        .verified-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #16a34a;
          color: white;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 9px 3px 7px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .distance-chip {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background: rgba(0,0,0,0.55);
          color: white;
          font-size: 11px;
          padding: 3px 9px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 4px;
          backdrop-filter: blur(4px);
        }

        .icon-btn {
          position: absolute;
          top: 10px;
          background: white;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          box-shadow: 0 1px 4px rgba(0,0,0,0.12);
          transition: transform 0.15s;
        }
        .icon-btn:hover { transform: scale(1.1); }
        .icon-btn-heart { right: 46px; }
        .icon-btn-share { right: 10px; }

        .card-body {
          padding: 13px 14px 14px;
        }

        .card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .type-badge {
          font-size: 11px;
          font-weight: 600;
          padding: 3px 9px;
          border-radius: 6px;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          font-weight: 600;
          color: #ffbb45;
        }

        .card-title {
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-location {
          font-size: 12.5px;
          color: #64748b;
          margin: 0 0 10px;
        }

        .amenities-row {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-bottom: 12px;
        }

        .amenity-tag {
          font-size: 11px;
          padding: 3px 9px;
          background: #f1f5f9;
          color: #475569;
          border-radius: 6px;
          font-weight: 500;
        }

        .amenity-more {
          font-size: 11px;
          padding: 3px 9px;
          background: #e0e7ff;
          color: #4338ca;
          border-radius: 6px;
          font-weight: 600;
        }

        .card-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .price-block {}
        .price-value {
          font-size: 15px;
          font-weight: 700;
          color: #14192a;
        }
        .price-sub {
          font-size: 11px;
          color: #94a3b8;
          margin-top: 1px;
        }

        .gender-badge {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 20px;
        }

        .divider {
          border: none;
          border-top: 1px solid #f1f5f9;
          margin: 11px 0 9px;
        }

        .updated-text {
          font-size: 11px;
          color: #94a3b8;
        }
      `}</style>

      {/* HEADER */}
      <div className="find-header">
        <h1>Find Your Perfect Stay</h1>
        <p>{filteredProperties.length} properties found</p>
        <input
          type="text"
          className="search-bar"
          placeholder="Search by title or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="main-layout">
        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="sidebar-title">
            <SlidersHorizontal size={16} color="#1b263d" />
            Filters
          </div>

          <div className="filter-label">Stay Type</div>
          <select
            className="filter-select"
            value={stayType}
            onChange={(e) => setStayType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="pg">PG</option>
            <option value="hostel">Hostel</option>
            <option value="flat">Flat</option>
          </select>

          <div className="filter-label">For</div>
          <select
            className="filter-select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="All">All</option>
            <option value="boys">Boys</option>
            <option value="girls">Girls</option>
          </select>

          <div className="filter-label" style={{ marginTop: 16 }}>
            <div className="price-range-text">
              Rent Range: ₹{minPrice.toLocaleString()} - ₹
              {maxPrice.toLocaleString()}
            </div>
          </div>
          <input
            type="range"
            className="range-slider"
            min="2000"
            max="20000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />

          <div className="filter-label">Gate Timing</div>
          <select
            className="filter-select"
            value={gateTiming}
            onChange={(e) => setGateTiming(e.target.value)}
          >
            <option>Any</option>
            <option>10 PM</option>
            <option>11 PM</option>
            <option>12 AM</option>
            <option>No Curfew</option>
          </select>

          <div className="filter-label" style={{ marginBottom: 10 }}>
            Amenities
          </div>
          {amenitiesList.map((amenity) => (
            <label key={amenity} className="amenity-item">
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
              />
              {amenity}
            </label>
          ))}

          <button
            className="clear-btn"
            onClick={() => {
              setStayType("All");
              setGender("All");
              setMaxPrice(15000);
              setMinPrice(5000);
              setSelectedAmenities([]);
              setGateTiming("Any");
            }}
          >
            Clear All Filters
          </button>
        </div>

        {/* PROPERTY GRID */}
        <div className="property-grid">
          {filteredProperties.map((property) => {
            const tc = typeColor(property.type);
            const gc = genderColor(property.gender);
            const visibleAmenities = property.amenities?.slice(0, 3) || [];
            const extraCount = (property.amenities?.length || 0) - 3;

            return (
              <div key={property.id} className="property-card">
                <div className="card-img-wrap">
                  <img
                    src={
                      property.imageUrl ||
                      "https://via.placeholder.com/300x175?text=No+Image"
                    }
                    alt={property.title}
                    className="card-img"
                    onClick={() => navigate(`/property/${property.id}`)}
                  />

                  {/* Verified Badge */}
                  {property.verified !== false && (
                    <div className="verified-badge">
                      <CheckCircle2 size={11} />
                      Verified
                    </div>
                  )}

                  {/* Distance Chip */}
                  {property.distance && (
                    <div className="distance-chip">
                      <MapPin size={10} />
                      {property.distance}
                    </div>
                  )}

                  {/* Heart */}
                  <button
                    className="icon-btn icon-btn-heart"
                    onClick={() => toggleFavorite(property.id)}
                  >
                    <Heart
                      size={16}
                      color={
                        favorites.includes(property.id) ? "#ef4444" : "#94a3b8"
                      }
                      fill={
                        favorites.includes(property.id) ? "#ef4444" : "none"
                      }
                    />
                  </button>

                  {/* Share */}
                  <button
                    className="icon-btn icon-btn-share"
                    onClick={() => handleShare(property)}
                  >
                    <Share2 size={15} color="#94a3b8" />
                  </button>
                </div>

                <div className="card-body">
                  <div className="card-top-row">
                    <span
                      className="type-badge"
                      style={{ background: tc.bg, color: tc.color }}
                    >
                      {property.type}
                    </span>
                    <div className="rating">
                      <Star size={14} fill="#f59e0b" color="#f59e0b" />
                      {property.rating || "4.5"}
                    </div>
                  </div>

                  <h3 className="card-title">{property.title}</h3>
                  <p className="card-location">{property.location}</p>

                  {/* Amenities */}
                  {visibleAmenities.length > 0 && (
                    <div className="amenities-row">
                      {visibleAmenities.map((am) => (
                        <span key={am} className="amenity-tag">
                          {am}
                        </span>
                      ))}
                      {extraCount > 0 && (
                        <span className="amenity-more">+{extraCount}</span>
                      )}
                    </div>
                  )}

                  <div className="card-bottom">
                    <div className="price-block">
                      <div className="price-value">
                        ₹
                        {property.minPrice
                          ? `${Number(property.minPrice).toLocaleString()} - ₹${Number(property.price).toLocaleString()}`
                          : `${Number(property.price).toLocaleString()}`}
                      </div>
                      <div className="price-sub">per month</div>
                    </div>
                    <span
                      className="gender-badge"
                      style={{ background: gc.bg, color: gc.color }}
                    >
                      {property.gender}
                    </span>
                  </div>

                  <hr className="divider" />
                  <div className="updated-text">
                    Updated {property.updatedAgo || "recently"}
                  </div>
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
