import { Search, FileCheck, Calendar, Home } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      icon: <Search className="w-8 h-8" />,
      title: "Search Stays",
      description: "Find stays near your college or coaching",
      bgColor: "bg-cyan-500",
      gradient: "from-cyan-400 to-cyan-600",
    },
    {
      number: "2",
      icon: <FileCheck className="w-8 h-8" />,
      title: "Compare & Check",
      description: "Real photos, clear rules, honest reviews",
      bgColor: "bg-purple-500",
      gradient: "from-purple-400 to-purple-600",
    },
    {
      number: "3",
      icon: <Calendar className="w-8 h-8" />,
      title: "Book Visit",
      description: "Schedule a visit slot that works for you",
      bgColor: "bg-pink-500",
      gradient: "from-pink-400 to-pink-600",
    },
    {
      number: "4",
      icon: <Home className="w-8 h-8" />,
      title: "Move In",
      description: "We support you even after you settle in",
      bgColor: "bg-red-500",
      gradient: "from-red-400 to-red-600",
    },
  ];

  return (
    <div className="py-16 px-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">How It Works</h2>
          <p className="text-gray-600 text-lg">
            Simple, transparent, and student-friendly process
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center group hover:-translate-y-2 transition-all duration-300"
            >
              {/* Number Badge */}
              <div
                className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-2xl shadow-lg mb-6 group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}
              >
                <span className="text-white text-3xl font-bold">
                  {step.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
