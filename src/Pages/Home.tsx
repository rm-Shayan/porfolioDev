
import { useAppSelector } from "../App/Hooks";
import {
  HeroSection,
  TechStack,
  AboutMePreview,
  ProjectsPreview,
  ContactCTA,
} from "../Components";

export const Home = () => {
  const theme = useAppSelector((state) => state.theme.mode) as "light" | "dark";

  return (
    <div className="space-y-20">

      
      {/* UI Sections */}
      <HeroSection theme={theme} />
      <hr className={`border-t-2 ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`} />
      <TechStack />
      <hr className={`border-t-2 ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`} />
      <AboutMePreview theme={theme} />
      <hr className={`border-t-2 ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`} />
      <ProjectsPreview theme={theme} />
      <hr className={`border-t-2 ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`} />
      <ContactCTA theme={theme} />
    </div>
  );
};

export default Home;
