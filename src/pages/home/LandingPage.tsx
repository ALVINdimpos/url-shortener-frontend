import PublicNavbar from '@/containers/navigation/PublicNavbar';
import qtLogo from '/images/qt-logo.png';
import rswitchLogo from '/images/rswitch-logo.jpeg';
import iremboLogo from '/images/irembo-logo.svg';
import acgroupLogo from '/images/acgroup-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import store from 'store';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

  // NAVIGATION
  const navigate = useNavigate();
  return (
    <article className="min-h-screen bg-white">
      <PublicNavbar />

      <main className="pt-16">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="text-center pt-20 pb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Short links, big <span className="text-orange-700">results</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
              A URL shortener built with powerful tools to help you grow and
              protect your brand.
            </p>

            <fieldset className="flex flex-col sm:flex-row justify-center max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Enter your link here"
                className="w-full px-6 py-4 border border-gray-300 rounded-md rounded-r-none text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                id="urlInput"
              />
              <button
                className="bg-primary cursor-pointer text-white px-8 py-4 rounded-md rounded-l-none text-lg font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap"
                onClick={(e) => {
                  e.preventDefault();
                  const input = document.getElementById(
                    'urlInput'
                  ) as HTMLInputElement;
                  if (input.value) {
                    store.set('url', input?.value);
                    navigate('/auth/login');
                  }
                }}
              >
                <FontAwesomeIcon icon={faLink} className="mr-2" /> Get your
                short link
              </button>
            </fieldset>
          </section>

          <section className="text-center pb-20">
            <p className="text-sm text-gray-500 mb-6">
              Trusted by the world's leading companies
            </p>
            <ul className="w-[60%] mx-auto flex justify-between items-center gap-8 opacity-90">
              <img src={qtLogo} alt="QT" className="h-16 w-auto" />
              <img src={rswitchLogo} alt="R-Switch" className="h-16 w-auto" />
              <img src={iremboLogo} alt="Irembo" className="h-16 w-auto" />
              <img src={acgroupLogo} alt="AC Group" className="h-8 w-auto" />
            </ul>
          </section>
        </section>
      </main>
    </article>
  );
};

export default LandingPage;
