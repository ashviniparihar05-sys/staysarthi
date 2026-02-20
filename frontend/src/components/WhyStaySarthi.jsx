import {
  Camera,
  Clock,
  Users,
  XCircle,
  CheckCircle,
  Shield,
  MessageCircle,
  UserCheck,
} from "lucide-react";

const WhyStaySarthi = () => {
  const problems = [
    {
      icon: <Camera className="w-6 h-6" />,
      emoji: "🤥",
      title: "Fake Photos",
      description: "10 saal purane photos dikha ke scam karte hain",
      bgColor: "bg-red-50",
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      emoji: "😡",
      title: "Hidden Rules",
      description: "Shift karne ke baad pata chalta hai gate timing 8 PM hai",
      bgColor: "bg-red-50",
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
    },
    {
      icon: <Users className="w-6 h-6" />,
      emoji: "💸",
      title: "Broker Drama",
      description: "Unnecessary middleman charges and commission",
      bgColor: "bg-red-50",
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
    },
    {
      icon: <XCircle className="w-6 h-6" />,
      emoji: "😭",
      title: "No Help After Moving",
      description: "Shift karne ke baad koi help nahi karta",
      bgColor: "bg-red-50",
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
    },
  ];

  const solutions = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      emoji: "✅",
      title: "Verified Real Photos",
      description:
        "Photos with 'Last updated' tag. What you see is what you get!",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      emoji: "📋",
      title: "Rules First, Surprises Never",
      description: "Gate timing, deposit, guests policy — sab upfront",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      emoji: "💛",
      title: "Direct Connect",
      description: "Seedha student ↔ owner. No broker charges!",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      emoji: "💚",
      title: "Post-Move Support",
      description: "WhatsApp reminders, issue resolution — we've got your back",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
    },
  ];

  return (
    <div className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            Why StaySarthi?
          </h2>
          <p className="text-gray-600 text-lg">
            We get it. Here's how we fix the problems you actually face.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Problems */}
          <div className="space-y-4">
            {problems.map((item, index) => (
              <div
                key={index}
                className={`${item.bgColor} rounded-2xl p-6 border-2 border-red-100 hover:border-red-200 transition-all duration-300`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`${item.iconBg} ${item.iconColor} p-3 rounded-xl`}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                      <span>{item.emoji}</span>
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Solutions */}
          <div className="space-y-4">
            {solutions.map((item, index) => (
              <div
                key={index}
                className={`${item.bgColor} rounded-2xl p-6 border-2 border-green-100 hover:border-green-200 transition-all duration-300`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`${item.iconBg} ${item.iconColor} p-3 rounded-xl`}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                      <span>{item.emoji}</span>
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyStaySarthi;
