import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { LearnMorePanel } from "./LearnMorePanel";
import { SolutionsPanel } from "./SolutionsPanel";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface NavPanelProps {
  isVisible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const PublicNavbar = () => {
  // STATE VARIABLES
  const [activePanel, setActivePanel] = useState<string | null>(null);

  // HANDLERS
  const handleMouseEnter = (panel: string) => {
    setActivePanel(panel);
  };

  const handleMouseLeave = () => {
    setActivePanel(null);
  };

  // NAVIGATION
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 border-none">
      <section className="relative">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <figure className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-orange-700">
                Alvin's URL Shortener
              </Link>
            </figure>

            {pathname.includes("auth/login") ||
            pathname.includes("auth/signup") ? null : (
              <>
                <ul className="hidden md:flex items-center space-x-8">
                  <li
                    className="relative"
                    onMouseEnter={() => handleMouseEnter("platform")}
                  >
                    <Link to="#" className="text-gray-600 hover:text-gray-900">
                      Platform
                    </Link>
                  </li>
                  <li
                    className="relative"
                    onMouseEnter={() => handleMouseEnter("solutions")}
                  >
                    <Link
                      to="#"
                      className="text-gray-600 hover:text-gray-900 flex items-center"
                    >
                      Solutions{" "}
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="ml-[6px] text-[12px]"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="text-gray-600 hover:text-gray-900">
                      Pricing
                    </Link>
                  </li>
                  <li
                    className="relative"
                    onMouseEnter={() => handleMouseEnter("resources")}
                  >
                    <Link
                      to="#"
                      className="text-gray-600 hover:text-gray-900 flex items-center"
                    >
                      Resources{" "}
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="ml-[6px] text-[12px]"
                      />
                    </Link>
                  </li>
                </ul>

                <section className="flex items-center space-x-4">
                  <Link
                    to="/auth/login"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth/signup"
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
                  >
                    Sign Up Free
                  </Link>
                </section>
              </>
            )}
          </div>
        </nav>

        <LearnMorePanel
          isVisible={activePanel === "resources"}
          onMouseEnter={() => handleMouseEnter("resources")}
          onMouseLeave={handleMouseLeave}
        />
        <SolutionsPanel
          isVisible={activePanel === "solutions"}
          onMouseEnter={() => handleMouseEnter("solutions")}
          onMouseLeave={handleMouseLeave}
        />
      </section>
    </header>
  );
};

export default PublicNavbar;
