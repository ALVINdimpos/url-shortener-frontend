import { Link } from 'react-router-dom';
import { NavPanelProps } from './PublicNavbar';

export const LearnMorePanel = ({
  isVisible,
  onMouseEnter,
  onMouseLeave,
}: NavPanelProps) => {
  if (!isVisible) return null;

  return (
    <section
      className="absolute top-full left-0 w-full bg-white shadow-lg border-t"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="grid grid-cols-3 gap-8">
          <section>
            <h3 className="text-lg font-semibold mb-4">LEARN MORE</h3>
            <ul className="space-y-3">
              <li className="p-2 px-3 rounded-md hover:bg-background cursor-pointer">
                <Link
                  to="#"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Blog
                  <p className="text-sm text-gray-500">
                    Get the latest trends, tips, and best practices
                  </p>
                </Link>
              </li>
              <li className="p-2 px-3 rounded-md hover:bg-background cursor-pointer">
                <Link
                  to="#"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Guides & eBooks
                  <p className="text-sm text-gray-500">
                    Dig into in-depth resources and expert insights
                  </p>
                </Link>
              </li>
            </ul>
          </section>
          <section>
            <h3 className="text-lg font-semibold mb-4">GET INSPIRED</h3>
            <ul className="space-y-3">
              <li className="p-2 px-3 rounded-md hover:bg-background cursor-pointer">
                <Link
                  to="#"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Customer Stories
                  <p className="text-sm text-gray-500">
                    Explore success stories from Bitly customers
                  </p>
                </Link>
              </li>
              <li className="p-2 px-3 rounded-md hover:bg-background cursor-pointer">
                <Link
                  to="#"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  QR Code Inspiration Gallery
                  <p className="text-sm text-gray-500">
                    Check out QR Code examples for every industry
                  </p>
                </Link>
              </li>
            </ul>
          </section>
          <section>
            <h3 className="text-lg font-semibold mb-4">WHAT'S NEW</h3>
            <article className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm text-primary font-semibold">
                WEBINAR
              </span>
              <h4 className="font-semibold mt-2">
                QR Codes and the Future of Retail Webinar Recap
              </h4>
              <Link
                to="#"
                className="text-primary hover:text-primary mt-2 inline-block hover:underline"
              >
                Watch Now →
              </Link>
            </article>
          </section>
        </nav>
      </article>
    </section>
  );
};
