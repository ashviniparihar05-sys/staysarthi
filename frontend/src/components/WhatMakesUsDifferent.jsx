import {
  Camera,
  MessageCircle,
  Users,
  TrendingUp,
  Building2,
  ShieldCheck,
} from "lucide-react";

const WhatMakesUsDifferent = () => {
  const features = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Real Photos. Real Stays.",
      description: "Every photo is verified with timestamp. No catfishing!",
      bgColor: "bg-cyan-500",
      gradient: "from-cyan-400 to-cyan-600",
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Support After You Move In",
      description: "WhatsApp rent reminders, issue resolution, and more",
      bgColor: "bg-orange-500",
      gradient: "from-orange-400 to-orange-600",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Built for Students, Not Brokers",
      description: "Zero commission. Direct connection with owners.",
      bgColor: "bg-purple-500",
      gradient: "from-purple-400 to-purple-600",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Simple for Owners",
      description: "Non-tech friendly. List your property in 5 minutes.",
      bgColor: "bg-green-500",
      gradient: "from-green-400 to-green-600",
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "PGs, Hostels & Flats",
      description: "One platform for all your accommodation needs",
      bgColor: "bg-pink-500",
      gradient: "from-pink-400 to-pink-600",
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Safe & Verified",
      description: "Student ID verification & secure payment tracking",
      bgColor: "bg-red-500",
      gradient: "from-red-400 to-red-600",
    },
  ];

  return (
    <div className="py-16 px-6 bg-gradient-to-b from-orange-50 via-yellow-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            What Makes Us Different
          </h2>
          <p className="text-gray-600 text-lg">
            Built by students, for students
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
            >
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl shadow-lg mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
              >
                <div className="text-white">{feature.icon}</div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-cyan-600 transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatMakesUsDifferent;
