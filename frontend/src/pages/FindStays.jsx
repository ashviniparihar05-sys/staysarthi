import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Heart,
  Share2,
  SlidersHorizontal,
  MapPin,
  Star,
  CheckCircle2,
  X,
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
  const [showFilters, setShowFilters] = useState(false);

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
  const [gateTiming, setGateTiming] = useState("Any");
  const locationHook = useLocation();
  const queryParams = new URLSearchParams(locationHook.search);
  const initialLocation = queryParams.get("location") || "";
  const initialType = queryParams.get("type") || "";
  const initialGender = queryParams.get("gender") || "";

  const [search, setSearch] = useState(initialLocation);
  const [stayType, setStayType] = useState(
    initialType ? initialType.toLowerCase() : "All"
  );
  const [gender, setGender] = useState(
    initialGender ? initialGender.toLowerCase() : "All"
  );

  useEffect(() => {
    axios
      .get(`${API}/api/properties`)
      .then((res) => {
        console.log("API Response:", res.data);
        setProperties(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const toggleFavorite = (id) => {
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter((fav) => fav !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    try {
      localStorage.setItem("favorites", JSON.stringify(updated));
    } catch (error) {
      console.log("Cannot save to localStorage");
    }
  };

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

  const normalizedSearch = search.trim().toLowerCase();
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title?.toLowerCase().includes(normalizedSearch) ||
      property.location?.toLowerCase().includes(normalizedSearch);
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
      selectedAmenities.every((amenity) => property.amenities?.includes(amenity));

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
        : [...prev, amenity]
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

  const clearAllFilters = () => {
    setStayType("All");
    setGender("All");
    setMaxPrice(15000);
    setMinPrice(0);
    setSelectedAmenities([]);
    setGateTiming("Any");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Find Your Perfect Stay
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {filteredProperties.length} properties found
                </p>
              </div>
              
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <SlidersHorizontal size={18} />
                Filters
              </button>
            </div>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search by location or property name..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* SIDEBAR - Desktop */}
          <aside className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <SlidersHorizontal size={20} />
                  Filters
                </h2>
              </div>

              {/* Stay Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stay Type
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={stayType}
                  onChange={(e) => setStayType(e.target.value)}
                >
                  <option value="All">All Types</option>
                  <option value="pg">PG</option>
                  <option value="hostel">Hostel</option>
                  <option value="flat">Flat</option>
                </select>
              </div>

              {/* Gender */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  For
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="boys">Boys</option>
                  <option value="girls">Girls</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rent Range: ₹{minPrice.toLocaleString()} - ₹
                  {maxPrice.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  className="w-full"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>

              {/* Gate Timing */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gate Timing
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={gateTiming}
                  onChange={(e) => setGateTiming(e.target.value)}
                >
                  <option value="Any">Any</option>
                  <option value="10 PM">10 PM</option>
                  <option value="11 PM">11 PM</option>
                  <option value="12 AM">12 AM</option>
                  <option value="No Curfew">No Curfew</option>
                </select>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Amenities
                </label>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {amenitiesList.map((amenity) => (
                    <label
                      key={amenity}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => handleAmenityChange(amenity)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearAllFilters}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
              <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <SlidersHorizontal size={20} />
                      Filters
                    </h2>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Same filter content as desktop */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stay Type
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={stayType}
                      onChange={(e) => setStayType(e.target.value)}
                    >
                      <option value="All">All Types</option>
                      <option value="pg">PG</option>
                      <option value="hostel">Hostel</option>
                      <option value="flat">Flat</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      For
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="All">All</option>
                      <option value="boys">Boys</option>
                      <option value="girls">Girls</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rent Range: ₹{minPrice.toLocaleString()} - ₹
                      {maxPrice.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="1000"
                      className="w-full"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gate Timing
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={gateTiming}
                      onChange={(e) => setGateTiming(e.target.value)}
                    >
                      <option value="Any">Any</option>
                      <option value="10 PM">10 PM</option>
                      <option value="11 PM">11 PM</option>
                      <option value="12 AM">12 AM</option>
                      <option value="No Curfew">No Curfew</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Amenities
                    </label>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {amenitiesList.map((amenity) => (
                        <label
                          key={amenity}
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                        >
                          <input
                            type="checkbox"
                            checked={selectedAmenities.includes(amenity)}
                            onChange={() => handleAmenityChange(amenity)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={clearAllFilters}
                      className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PROPERTY GRID */}
          <main className="flex-1 min-w-0">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredProperties.map((property) => {
                const tc = typeColor(property.type);
                const gc = genderColor(property.gender);
                const visibleAmenities = property.amenities?.slice(0, 3) || [];
                const extraCount = (property.amenities?.length || 0) - 3;

                return (
                  <div
                    key={property.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onClick={() => navigate(`/property/${property.id}`)}
                      />

                      {/* Verified Badge */}
                      {property.verified !== false && (
                        <div className="absolute top-3 left-3 bg-white rounded-full px-3 py-1 shadow-md flex items-center gap-1">
                          <CheckCircle2 size={14} className="text-green-600" />
                          <span className="text-xs font-medium text-gray-900">
                            Verified
                          </span>
                        </div>
                      )}

                      {/* Distance Chip */}
                      {property.distance && (
                        <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm">
                          <MapPin size={12} className="inline mr-1" />
                          {property.distance}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(property.id);
                          }}
                          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                        >
                          <Heart
                            size={18}
                            className={
                              favorites.includes(property.id)
                                ? "fill-red-500 text-red-500"
                                : "text-gray-700"
                            }
                          />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare(property);
                          }}
                          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                        >
                          <Share2 size={18} className="text-gray-700" />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      {/* Type and Rating */}
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: tc.bg, color: tc.color }}
                        >
                          {property.type}
                        </span>
                        <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
                          <Star size={14} className="fill-green-600 text-green-600" />
                          <span className="text-sm font-medium text-green-700">
                            {property.rating || "4.5"}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">
                        {property.title}
                      </h3>

                      {/* Location */}
                      <p className="text-sm text-gray-600 flex items-start gap-1 mb-3">
                        <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{property.location}</span>
                      </p>

                      {/* Amenities */}
                      {visibleAmenities.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {visibleAmenities.map((am) => (
                            <span
                              key={am}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                            >
                              {am}
                            </span>
                          ))}
                          {extraCount > 0 && (
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                              +{extraCount}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Price */}
                      <div className="flex items-end justify-between pt-3 border-t border-gray-100">
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-gray-900">
                              ₹
                              {property.minPrice
                                ? `${Number(property.minPrice).toLocaleString()}`
                                : `${Number(property.price).toLocaleString()}`}
                            </span>
                            {property.minPrice && (
                              <span className="text-sm text-gray-500">
                                - ₹{Number(property.price).toLocaleString()}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">per month</span>
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: gc.bg, color: gc.color }}
                        >
                          {property.gender}
                        </span>
                      </div>

                      {/* Updated Time */}
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500">
                          Updated {property.updatedAgo || "recently"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* No Results */}
            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <SlidersHorizontal size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No properties found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default FindStays;
