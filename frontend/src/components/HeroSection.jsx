// import { MapPin, Home, Users, Search } from "lucide-react";

// const HeroSection = () => {
//   return (
//     <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-orange-50 py-16 px-6">
//       <div className="max-w-5xl mx-auto">
//         {/* Heading */}
//         <div className="text-center mb-12">
//           <h1 className="text-5xl md:text-6xl font-bold mb-3">
//             Finding a student stay
//           </h1>
//           <h2 className="text-5xl md:text-6xl font-bold mb-6">
//             <span className="text-cyan-600">shouldn't be </span>
//             <span className="text-orange-500">stressful.</span>
//           </h2>
//           <p className="text-gray-600 text-lg">
//             Real photos. Clear rules. No brokers. Just peace of mind.
//           </p>
//         </div>

//         {/* Search Card */}
//         <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//             {/* Location Input */}
//             <div className="md:col-span-1 relative">
//               <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-cyan-400 transition-colors">
//                 <MapPin className="w-5 h-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Location / University"
//                   className="w-full outline-none text-gray-700"
//                 />
//               </div>
//             </div>

//             {/* Stay Type Dropdown */}
//             <div className="md:col-span-1 relative">
//               <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-cyan-400 transition-colors cursor-pointer">
//                 <Home className="w-5 h-5 text-gray-400" />
//                 <select className="w-full outline-none text-gray-700 cursor-pointer">
//                   <option>Stay Type</option>
//                   <option>PG</option>
//                   <option>Hostel</option>
//                   <option>Flat</option>
//                 </select>
//               </div>
//             </div>

//             {/* For Dropdown */}
//             <div className="md:col-span-1 relative">
//               <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-cyan-400 transition-colors cursor-pointer">
//                 <Users className="w-5 h-5 text-gray-400" />
//                 <select className="w-full outline-none text-gray-700 cursor-pointer">
//                   <option>For</option>
//                   <option>Boys</option>
//                   <option>Girls</option>
//                   <option>Co-ed</option>
//                 </select>
//               </div>
//             </div>

//             {/* Search Button */}
//             <div className="md:col-span-1">
//               <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-cyan-500/30">
//                 <Search className="w-5 h-5" />
//                 Find Your Stay
//               </button>
//             </div>
//           </div>

//           {/* List Property Link */}
//           <div className="text-center">
//             <button className="text-orange-500 hover:text-orange-600 font-medium flex items-center justify-center gap-2 mx-auto transition-colors">
//               <Home className="w-4 h-4" />
//               List Your Property
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
import { MapPin, Home, Users, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [stayType, setStayType] = useState("");
  const [gender, setGender] = useState("");

  const handleSearch = () => {
    navigate(
      `/find-stays?location=${location}&type=${stayType}&gender=${gender}`,
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-orange-50 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-3">
            Finding a student stay
          </h1>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-cyan-600">shouldn't be </span>
            <span className="text-orange-500">stressful.</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Real photos. Clear rules. No brokers. Just peace of mind.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Location */}
            <div className="flex items-center gap-3 p-4 border rounded-xl">
              <MapPin className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Location / University"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full outline-none"
              />
            </div>

            {/* Stay Type */}
            <div className="flex items-center gap-3 p-4 border rounded-xl">
              <Home className="w-5 h-5 text-gray-400" />
              <select
                value={stayType}
                onChange={(e) => setStayType(e.target.value)}
                className="w-full outline-none"
              >
                <option value="">Stay Type</option>
                <option value="pg">PG</option>
                <option value="hostel">Hostel</option>
                <option value="flat">Flat</option>
              </select>
            </div>

            {/* Gender */}
            <div className="flex items-center gap-3 p-4 border rounded-xl">
              <Users className="w-5 h-5 text-gray-400" />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full outline-none"
              >
                <option value="">For</option>
                <option value="boys">Boys</option>
                <option value="girls">Girls</option>
                <option value="co-ed">Co-ed</option>
              </select>
            </div>

            {/* Button */}
            <button
              onClick={handleSearch}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Find Your Stay
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate("/list-property")}
              className="text-orange-500 font-medium flex items-center justify-center gap-2 mx-auto"
            >
              <Home className="w-4 h-4" />
              List Your Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
