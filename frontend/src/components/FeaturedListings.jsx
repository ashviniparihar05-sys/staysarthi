import { Heart, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FeaturedListings = ({ properties }) => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id],
    );
  };

  return (
    <div className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              Featured Listings
            </h2>
            <p className="text-gray-600">Verified stays near your campus</p>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties && properties.length > 0 ? (
            properties.map((property) => (
              <div
                key={property.id}
                onClick={() => navigate(`/property/${property.id}`)}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={property.imageUrl}
                    alt={property.title}
                    className="w-full h-56 object-cover"
                  />

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(property.id);
                    }}
                    className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.includes(property.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {property.title || "No Title"}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{property.location || "Location not available"}</span>
                  </div>

                  <p className="text-xl font-bold text-cyan-600">
                    ₹ {property.price || 0}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No properties found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedListings;
