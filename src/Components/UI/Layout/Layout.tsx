import { useAppSelector } from "../../../App/Hooks";
import { Header } from "../Header";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer";

export const Layout = () => {
  // Get the current theme from the Redux store.
  const theme = useAppSelector((state) => state.theme.mode);

  return (
    <>
      {/* Apply a full-screen layout with theme-based styling. */}
      {/* The background will change based on whether the theme is 'dark' or 'light'. */}
      <div
        className={`min-h-screen flex flex-col transition-colors duration-500
          ${
            theme === "dark"
              ? "bg-gradient-to-br from-[#1a132f] via-[#3a1f78] to-[#0e0e1a] text-white"
              : "bg-white text-gray-800"
          }
        `}
      >
        <Header />
        {/*
          The <Outlet /> component will render the child components (e.g., Home, About)
          with a consistent layout.
        */}
        <main
          className={`flex-grow container mx-auto p-4 transition-colors duration-500`}
        >
          <Outlet />
        </main>
              <hr className={`border-t-2 ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`} />
 <Footer />
      </div>
    </>
  );
};
