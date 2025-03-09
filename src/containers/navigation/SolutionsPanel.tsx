import { Link } from 'react-router-dom';

interface NavPanelProps {
  isVisible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const SolutionsPanel = ({ isVisible, onMouseEnter, onMouseLeave }: NavPanelProps) => {
  if (!isVisible) return null;
  
  return (
    <section
      className="absolute top-full left-0 w-full bg-white shadow-lg border-t"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Left column - By Industry */}
          <section>
            <h3 className="text-lg font-semibold mb-4">BY INDUSTRY</h3>
            <nav>
              <ul className="space-y-3">
                <li className='p-1 px-2 rounded-md hover:bg-background'>
                  <Link to="#" className="block text-gray-600 hover:text-gray-900">
                    Retail
                  </Link>
                </li>
                <li className='p-1 px-2 rounded-md hover:bg-background'>
                  <Link to="#" className="block text-gray-600 hover:text-gray-900">
                    Hospitality
                  </Link>
                </li>
                <li className='p-1 px-2 rounded-md hover:bg-background'>
                  <Link to="#" className="block text-gray-600 hover:text-gray-900">
                    Technology Software & Hardware
                  </Link>
                </li>
                <li className='p-1 px-2 rounded-md hover:bg-background'>
                  <Link to="#" className="block text-gray-600 hover:text-gray-900">
                    Insurance
                  </Link>
                </li>
                <li className='p-1 px-2 rounded-md hover:bg-background'>
                  <Link to="#" className="block text-gray-600 hover:text-gray-900">
                    Professional Services
                  </Link>
                </li>
                <li className='p-1 px-2 rounded-md hover:bg-background'>
                  <Link to="#" className="block text-gray-600 hover:text-gray-900">
                    Consumer Packaged Goods
                  </Link>
                </li>
                <li className='p-1 px-2 rounded-md hover:bg-background'>
                  <Link to="#" className="block text-gray-600 hover:text-gray-900">
                    Media & Entertainment
                  </Link>
                </li>
                <li className='p-1 px-2 rounded-md hover:bg-background'>
                  <Link to="#" className="block text-gray-600 hover:text-gray-900">
                    Healthcare
                  </Link>
                </li>
                <li className='p-1 px-2 rounded-md hover:bg-background'>
                  <Link to="#" className="block text-gray-600 hover:text-gray-900">
                    Financial Services
                  </Link>
                </li>
                <li className='p-1 px-2 rounded-md hover:bg-background'>
                  <Link to="#" className="block text-gray-600 hover:text-gray-900">
                    Education
                  </Link>
                </li>
              </ul>
            </nav>
          </section>
          
          {/* Middle column - By Team */}
          <section>
            <h3 className="text-lg font-semibold mb-4">BY TEAM</h3>
            <nav>
              <ul className="space-y-3">
                <li className='p-1 px-2 rounded-md hover:bg-background'>
                  <Link to="#" className="block text-gray-600 hover:text-gray-900">
                    Developers
                  </Link>
                </li>
                <li className='p-1 px-2 rounded-md hover:bg-background'>
                  <Link to="#" className="block text-gray-600 hover:text-gray-900">
                    Marketing
                  </Link>
                </li>
                <li className='p-1 px-2 rounded-md hover:bg-background'>
                  <Link to="#" className="block text-gray-600 hover:text-gray-900">
                    Customer Service
                  </Link>
                </li>
              </ul>
            </nav>
            
            <h3 className="text-lg font-semibold mb-4 mt-8">BY BUSINESS</h3>
            <nav>
              <ul className="space-y-3">
                <li className='p-1 px-2 rounded-md hover:bg-background'>
                  <Link to="#" className="block text-gray-600 hover:text-gray-900">
                    Small Business
                  </Link>
                </li>
                <li className='p-1 px-2 rounded-md hover:bg-background'>
                  <Link to="#" className="block text-gray-600 hover:text-gray-900">
                    Midmarket
                  </Link>
                </li>
                <li className='p-1 px-2 rounded-md hover:bg-background'>
                  <Link to="#" className="block text-gray-600 hover:text-gray-900">
                    Enterprise
                  </Link>
                </li>
              </ul>
            </nav>
          </section>
          
          {/* Right column - Use Cases */}
          <section>
            <h3 className="text-lg font-semibold mb-4">USE CASES</h3>
            <nav>
              <ul className="space-y-4">
                <li className='p-1 px-2 rounded-md hover:bg-background'>
                  <Link to="#" className="flex items-start text-gray-600 hover:text-gray-900">
                    <span className="mr-3 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                    Order Confirmation
                  </Link>
                </li>
                <li className='p-1 px-2 rounded-md hover:bg-background'>
                  <Link to="#" className="flex items-start text-gray-600 hover:text-gray-900">
                    <span className="mr-3 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                      </svg>
                    </span>
                    Surveys and Feedback
                  </Link>
                </li>
                <li className='p-1 px-2 rounded-md hover:bg-background'>
                  <Link to="#" className="flex items-start text-gray-600 hover:text-gray-900">
                    <span className="mr-3 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                        <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                      </svg>
                    </span>
                    Product Packaging
                  </Link>
                </li>
                <li className='p-1 px-2 rounded-md hover:bg-background'>
                  <Link to="#" className="flex items-start text-gray-600 hover:text-gray-900">
                    <span className="mr-3 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                    Print Advertising
                  </Link>
                </li>
                <li className='p-1 px-2 rounded-md hover:bg-background'>
                  <Link to="#" className="flex items-start text-gray-600 hover:text-gray-900">
                    <span className="mr-3 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </span>
                    Digital Advertising
                  </Link>
                </li>
                <li className='p-1 px-2 rounded-md hover:bg-background'>
                  <Link to="#" className="flex items-start text-gray-600 hover:text-gray-900">
                    <span className="mr-3 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                      </svg>
                    </span>
                    Content Sharing
                  </Link>
                </li>
              </ul>
            </nav>
          </section>
        </div>
      </article>
    </section>
  );
};
