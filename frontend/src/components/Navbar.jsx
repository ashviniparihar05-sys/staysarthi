// /*import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <div className="flex justify-between items-center px-8 py-4 shadow-md">
//       <h1 className="text-2xl font-bold text-blue-600">StaySarthi</h1>

//       <div className="space-x-6">
//         <Link to="/" className="hover:text-blue-600">
//           Home
//         </Link>
//         <Link to="/properties" className="hover:text-blue-600">
//           Properties
//         </Link>
//         <Link to="/contact" className="hover:text-blue-600">
//           Contact
//         </Link>
//       </div>

//       <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
//         Login
//       </button>
//     </div>
//   );
// };

// export default Navbar;*/
// import { Link } from "react-router-dom";
// import { Heart, User } from "lucide-react";

// const Navbar = () => {
//   return (
//     <div className="flex justify-between items-center px-8 py-4 bg-white shadow-sm border-b border-gray-100">
//       {/* Logo */}
//       <Link to="/" className="flex items-center gap-2">
//         <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
//           <svg
//             className="w-6 h-6 text-white"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//             />
//           </svg>
//         </div>
//         <span className="text-2xl font-bold text-gray-800">
//           Stay<span className="text-cyan-500">Sarthi</span>
//         </span>
//       </Link>

//       {/* Navigation Links */}
//       <div className="flex items-right gap-8">
//         <Link
//           to="/"
//           className="text-gray-700 hover:text-cyan-500 transition-colors font-medium"
//         >
//           Home
//         </Link>
//         <Link
//           to="/find-stays"
//           className="text-gray-700 hover:text-cyan-500 transition-colors font-medium"
//         >
//           Find Stays
//         </Link>
//         <Link
//           to="/list-property"
//           className="text-gray-700 hover:text-cyan-500 transition-colors font-medium"
//         >
//           List Property
//         </Link>
//       </div>

//       {/* Right Side Icons */}
//       <div className="flex items-center gap-6">
//         <button className="text-gray-600 hover:text-cyan-500 transition-colors">
//           <Heart className="w-6 h-6" />
//         </button>
//         <button className="text-gray-600 hover:text-cyan-500 transition-colors">
//           <User className="w-6 h-6" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import { Link } from "react-router-dom";
import { Heart, User, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-white shadow-sm border-b border-gray-100">
      <div className="flex justify-between items-center px-6 md:px-8 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <span className="text-2xl font-bold text-gray-800">
            Stay<span className="text-cyan-500">Sarthi</span>
          </span>
        </Link>

        {/* Desktop Navigation (Centered) */}
        <div className="hidden md:flex flex-1 justify-center gap-10">
          <Link
            to="/"
            className="text-gray-700 hover:text-cyan-500 transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            to="/find-stays"
            className="text-gray-700 hover:text-cyan-500 transition-colors font-medium"
          >
            Find Stays
          </Link>
          <Link
            to="/list-property"
            className="text-gray-700 hover:text-cyan-500 transition-colors font-medium"
          >
            List Property
          </Link>
        </div>

        {/* Right Side Icons (Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          <button className="text-gray-600 hover:text-cyan-500 transition-colors">
            <Heart className="w-6 h-6" />
          </button>
          <button className="text-gray-600 hover:text-cyan-500 transition-colors">
            <User className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-6 pb-6">
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/find-stays" onClick={() => setIsOpen(false)}>
            Find Stays
          </Link>
          <Link to="/list-property" onClick={() => setIsOpen(false)}>
            List Property
          </Link>

          <div className="flex gap-6 pt-2">
            <Heart className="w-6 h-6" />
            <User className="w-6 h-6" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
