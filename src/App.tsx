import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";

// Lazy imports
const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const Contact = lazy(() => import("./Pages/Contact"));
const Layout = lazy(() => import("./Components"));
import { PageLoader } from "./Components/UI/Loader"; // Make sure it's exported from index.ts

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5 seconds delay

    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <PageLoader />;

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Suspense>
  );
}

export default App;
