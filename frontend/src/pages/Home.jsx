import { useEffect, useState } from "react";
import axios from "axios";
import HeroSection from "../components/HeroSection";
import WhyStaySarthi from "../components/WhyStaySarthi";
import HowItWorks from "../components/HowItWorks";
import FeaturedListings from "../components/FeaturedListings";
import WhatMakesUsDifferent from "../components/WhatMakesUsDifferent";
import API from "../api";
const Home = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get("${API}/api/properties")
      .then((res) => {
        console.log(res.data);
        setProperties(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <WhyStaySarthi />
      <HowItWorks />
      <>
        <FeaturedListings properties={properties} />
      </>
      <WhatMakesUsDifferent />
    </div>
  );
};

export default Home;
