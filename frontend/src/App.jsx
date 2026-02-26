import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import FindStays from "./pages/FindStays";
import PropertyDetail from "./pages/PropertyDetail";
import ListProperty from "./pages/ListProperty";
//.\mvnw.cmd spring-boot:run

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find-stays" element={<FindStays />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/list-property" element={<ListProperty />} />
      </Routes>
    </Layout>
  );
}

export default App;
