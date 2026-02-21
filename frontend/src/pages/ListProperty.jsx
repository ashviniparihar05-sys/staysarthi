// import { useState } from "react";
// import {
//   Home,
//   Upload,
//   MapPin,
//   DollarSign,
//   Users,
//   Wifi,
//   Wind,
//   UtensilsCrossed,
//   BookOpen,
//   Shield,
//   Camera,
//   CheckCircle,
//   Building2,
//   Phone,
//   Mail,
//   User,
// } from "lucide-react";

// const ListProperty = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [images, setImages] = useState([]);
//   const [formData, setFormData] = useState({
//     propertyType: "",
//     propertyName: "",
//     address: "",
//     city: "",
//     pincode: "",
//     rentMin: "",
//     rentMax: "",
//     gender: "",
//     amenities: [],
//     ownerName: "",
//     ownerPhone: "",
//     ownerEmail: "",
//   });

//   const amenitiesList = [
//     { icon: <Wifi className="w-5 h-5" />, name: "Wi-Fi" },
//     { icon: <Wind className="w-5 h-5" />, name: "AC" },
//     { icon: <UtensilsCrossed className="w-5 h-5" />, name: "Mess" },
//     { icon: <BookOpen className="w-5 h-5" />, name: "Study Table" },
//     { icon: <Shield className="w-5 h-5" />, name: "Warden" },
//     { icon: <Building2 className="w-5 h-5" />, name: "Parking" },
//   ];

//   const handleAmenityToggle = (amenity) => {
//     setFormData((prev) => ({
//       ...prev,
//       amenities: prev.amenities.includes(amenity)
//         ? prev.amenities.filter((a) => a !== amenity)
//         : [...prev.amenities, amenity],
//     }));
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setImages((prev) => [...prev, ...files].slice(0, 10));
//   };

//   const removeImage = (index) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData, images);
//     // Add your submission logic here
//   };

//   const steps = [
//     {
//       number: 1,
//       title: "Property Details",
//       icon: <Home className="w-5 h-5" />,
//     },
//     {
//       number: 2,
//       title: "Amenities",
//       icon: <CheckCircle className="w-5 h-5" />,
//     },
//     { number: 3, title: "Photos", icon: <Camera className="w-5 h-5" /> },
//     { number: 4, title: "Contact Info", icon: <User className="w-5 h-5" /> },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             List Your Property
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Join thousands of property owners on StaySarthi
//           </p>
//         </div>

//         {/* Steps Indicator */}
//         <div className="mb-12">
//           <div className="flex items-center justify-between">
//             {steps.map((step, index) => (
//               <div key={step.number} className="flex-1 flex items-center">
//                 <div className="flex flex-col items-center flex-1">
//                   <div
//                     className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
//                       currentStep >= step.number
//                         ? "bg-cyan-500 text-white shadow-lg"
//                         : "bg-gray-200 text-gray-500"
//                     }`}
//                   >
//                     {currentStep > step.number ? (
//                       <CheckCircle className="w-6 h-6" />
//                     ) : (
//                       step.icon
//                     )}
//                   </div>
//                   <span
//                     className={`text-sm font-medium ${
//                       currentStep >= step.number
//                         ? "text-cyan-600"
//                         : "text-gray-500"
//                     }`}
//                   >
//                     {step.title}
//                   </span>
//                 </div>
//                 {index < steps.length - 1 && (
//                   <div
//                     className={`flex-1 h-1 mx-2 ${
//                       currentStep > step.number ? "bg-cyan-500" : "bg-gray-200"
//                     }`}
//                   ></div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Form Card */}
//         <div className="bg-white rounded-2xl shadow-2xl p-8">
//           <form onSubmit={handleSubmit}>
//             {/* Step 1: Property Details */}
//             {currentStep === 1 && (
//               <div className="space-y-6">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                   Property Details
//                 </h2>

//                 {/* Property Type */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-3">
//                     Property Type *
//                   </label>
//                   <div className="grid grid-cols-3 gap-4">
//                     {["PG", "Hostel", "Flat"].map((type) => (
//                       <button
//                         key={type}
//                         type="button"
//                         onClick={() =>
//                           setFormData({ ...formData, propertyType: type })
//                         }
//                         className={`py-4 px-6 rounded-xl border-2 font-semibold transition-all ${
//                           formData.propertyType === type
//                             ? "border-cyan-500 bg-cyan-50 text-cyan-600"
//                             : "border-gray-200 hover:border-cyan-300"
//                         }`}
//                       >
//                         {type}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Property Name */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-3">
//                     Property Name *
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="e.g., Sunrise PG for Girls"
//                     value={formData.propertyName}
//                     onChange={(e) =>
//                       setFormData({ ...formData, propertyName: e.target.value })
//                     }
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none"
//                     required
//                   />
//                 </div>

//                 {/* Address */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-3">
//                     Full Address *
//                   </label>
//                   <textarea
//                     placeholder="Street address, landmark"
//                     value={formData.address}
//                     onChange={(e) =>
//                       setFormData({ ...formData, address: e.target.value })
//                     }
//                     rows="3"
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none"
//                     required
//                   ></textarea>
//                 </div>

//                 {/* City & Pincode */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-3">
//                       City *
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="e.g., Delhi"
//                       value={formData.city}
//                       onChange={(e) =>
//                         setFormData({ ...formData, city: e.target.value })
//                       }
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-3">
//                       Pincode *
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="e.g., 110001"
//                       value={formData.pincode}
//                       onChange={(e) =>
//                         setFormData({ ...formData, pincode: e.target.value })
//                       }
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Rent Range */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-3">
//                       Min Rent (₹/month) *
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="e.g., 7000"
//                       value={formData.rentMin}
//                       onChange={(e) =>
//                         setFormData({ ...formData, rentMin: e.target.value })
//                       }
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-3">
//                       Max Rent (₹/month) *
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="e.g., 9000"
//                       value={formData.rentMax}
//                       onChange={(e) =>
//                         setFormData({ ...formData, rentMax: e.target.value })
//                       }
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Gender */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-3">
//                     Available For *
//                   </label>
//                   <div className="grid grid-cols-3 gap-4">
//                     {["Boys", "Girls", "Co-ed"].map((gender) => (
//                       <button
//                         key={gender}
//                         type="button"
//                         onClick={() => setFormData({ ...formData, gender })}
//                         className={`py-3 px-6 rounded-xl border-2 font-semibold transition-all ${
//                           formData.gender === gender
//                             ? "border-cyan-500 bg-cyan-50 text-cyan-600"
//                             : "border-gray-200 hover:border-cyan-300"
//                         }`}
//                       >
//                         {gender}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 2: Amenities */}
//             {currentStep === 2 && (
//               <div className="space-y-6">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                   Select Amenities
//                 </h2>

//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                   {amenitiesList.map((amenity) => (
//                     <button
//                       key={amenity.name}
//                       type="button"
//                       onClick={() => handleAmenityToggle(amenity.name)}
//                       className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
//                         formData.amenities.includes(amenity.name)
//                           ? "border-cyan-500 bg-cyan-50 text-cyan-600"
//                           : "border-gray-200 hover:border-cyan-300"
//                       }`}
//                     >
//                       {amenity.icon}
//                       <span className="font-medium">{amenity.name}</span>
//                       {formData.amenities.includes(amenity.name) && (
//                         <CheckCircle className="w-5 h-5 ml-auto" />
//                       )}
//                     </button>
//                   ))}
//                 </div>

//                 <p className="text-sm text-gray-500 mt-4">
//                   Selected: {formData.amenities.length} amenities
//                 </p>
//               </div>
//             )}

//             {/* Step 3: Photos */}
//             {currentStep === 3 && (
//               <div className="space-y-6">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                   Upload Photos
//                 </h2>

//                 {/* Upload Area */}
//                 <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-cyan-400 transition-colors">
//                   <input
//                     type="file"
//                     id="file-upload"
//                     multiple
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     className="hidden"
//                   />
//                   <label
//                     htmlFor="file-upload"
//                     className="cursor-pointer flex flex-col items-center"
//                   >
//                     <Upload className="w-12 h-12 text-gray-400 mb-4" />
//                     <span className="text-lg font-semibold text-gray-700 mb-2">
//                       Click to upload images
//                     </span>
//                     <span className="text-sm text-gray-500">
//                       PNG, JPG up to 10 images
//                     </span>
//                   </label>
//                 </div>

//                 {/* Image Preview */}
//                 {images.length > 0 && (
//                   <div className="grid grid-cols-3 gap-4">
//                     {images.map((image, index) => (
//                       <div key={index} className="relative group">
//                         <img
//                           src={URL.createObjectURL(image)}
//                           alt={`Preview ${index + 1}`}
//                           className="w-full h-32 object-cover rounded-xl"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeImage(index)}
//                           className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                         >
//                           ×
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 <p className="text-sm text-gray-500">
//                   {images.length}/10 images uploaded
//                 </p>
//               </div>
//             )}

//             {/* Step 4: Contact Info */}
//             {currentStep === 4 && (
//               <div className="space-y-6">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                   Contact Information
//                 </h2>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-3">
//                     Owner Name *
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Your full name"
//                     value={formData.ownerName}
//                     onChange={(e) =>
//                       setFormData({ ...formData, ownerName: e.target.value })
//                     }
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-3">
//                     Phone Number *
//                   </label>
//                   <input
//                     type="tel"
//                     placeholder="+91 98765 43210"
//                     value={formData.ownerPhone}
//                     onChange={(e) =>
//                       setFormData({ ...formData, ownerPhone: e.target.value })
//                     }
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-3">
//                     Email Address *
//                   </label>
//                   <input
//                     type="email"
//                     placeholder="your.email@example.com"
//                     value={formData.ownerEmail}
//                     onChange={(e) =>
//                       setFormData({ ...formData, ownerEmail: e.target.value })
//                     }
//                     className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none"
//                     required
//                   />
//                 </div>

//                 <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-100">
//                   <h3 className="font-bold text-gray-900 mb-2">
//                     📞 Why we need your contact info
//                   </h3>
//                   <p className="text-sm text-gray-700">
//                     Students will use this information to contact you directly.
//                     We ensure your privacy and only share details with serious
//                     inquiries.
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Navigation Buttons */}
//             <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
//               {currentStep > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => setCurrentStep(currentStep - 1)}
//                   className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
//                 >
//                   Previous
//                 </button>
//               )}

//               {currentStep < 4 ? (
//                 <button
//                   type="button"
//                   onClick={() => setCurrentStep(currentStep + 1)}
//                   className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg ml-auto"
//                 >
//                   Next Step
//                 </button>
//               ) : (
//                 <button
//                   type="submit"
//                   className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg ml-auto"
//                 >
//                   Submit Property
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>

//         {/* Benefits Section */}
//         <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white rounded-xl p-6 shadow-lg text-center">
//             <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <CheckCircle className="w-6 h-6 text-green-600" />
//             </div>
//             <h3 className="font-bold text-gray-900 mb-2">Zero Commission</h3>
//             <p className="text-sm text-gray-600">
//               No middleman charges. Keep 100% of your earnings.
//             </p>
//           </div>

//           <div className="bg-white rounded-xl p-6 shadow-lg text-center">
//             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Users className="w-6 h-6 text-blue-600" />
//             </div>
//             <h3 className="font-bold text-gray-900 mb-2">Direct Connect</h3>
//             <p className="text-sm text-gray-600">
//               Connect directly with verified students.
//             </p>
//           </div>

//           <div className="bg-white rounded-xl p-6 shadow-lg text-center">
//             <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Shield className="w-6 h-6 text-purple-600" />
//             </div>
//             <h3 className="font-bold text-gray-900 mb-2">Verified Listing</h3>
//             <p className="text-sm text-gray-600">
//               Get a verified badge to build trust.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ListProperty;
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../api";
const ListProperty = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    description: "",
    imageUrl: "",
    rating: "",
    type: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   axios
  //     .post("http://localhost:8080/api/properties", formData)
  //     .then((res) => {
  //       alert("Property Added Successfully!");
  //       navigate("/find-stays");
  //     })
  //     .catch((err) => console.log(err));
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("location", formData.location);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("rating", formData.rating);
    data.append("type", formData.type);
    data.append("gender", formData.gender);
    data.append("image", formData.image);

    try {
      await axios.post(`${API}/api/properties`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Property Added Successfully!");
      navigate("/find-stays");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4">List Your Property</h2>

        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <input
          name="type"
          placeholder="Type (PG/Hostel/Flat)"
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <input
          name="gender"
          placeholder="Gender (Boys/Girls/Co-ed)"
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <input
          name="rating"
          type="number"
          step="0.1"
          placeholder="Rating"
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        {/* <input
          name="imageUrl"
          placeholder="Image URL"
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        /> */}
        <input
          type="file"
          name="image"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
          className="w-full p-3 border rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <button className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700">
          Add Property
        </button>
      </form>
    </div>
  );
};

export default ListProperty;
