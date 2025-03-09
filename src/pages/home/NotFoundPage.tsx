import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <article className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <menu className="mt-4">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved to
            another URL.
          </p>
        </menu>
        <menu className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="inline-flex cursor-pointer items-center justify-center px-6 py-3 border border-primary text-primary font-medium rounded-md hover:bg-primary hover:text-white transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Go Back
          </button>
          <Link
            to="/urls"
            className="inline-flex cursor-pointer items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Back to Home
          </Link>
        </menu>
      </article>
    </main>
  );
};

export default NotFoundPage;
