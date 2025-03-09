import {
  faBars,
  faChevronDown,
  faChevronUp,
  faRightFromBracket,
  faUser,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { motion, useAnimation } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/states/store';
import { setIsOpen } from '@/states/features/sidebarSlice';
import { sidebarLinks } from '@/constants/sidebar.constants';
import CustomPopover from '@/components/inputs/CustomPopover';
import { useGetUserById } from '@/hooks/users.hooks';
import { SkeletonLoader } from '@/components/inputs/Loader';
import { useLazyLogoutQuery } from '@/states/api/apiQuerySlice';
import store from 'store'
import { setToken } from '@/states/features/userSlice';
import { setUser } from '@/states/features/userSlice';

const Sidebar = () => {
  const { pathname } = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const { isOpen: sidebarOpen } = useSelector(
    (state: RootState) => state.sidebar
  );
  const { user, userProfile } = useSelector((state: RootState) => state.user);
  const [isSubCategoriesOpen, setIsSubCategoriesOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [sidebarNav, setSidebarNav] = useState<
    Array<{
      label: string;
      path: string;
      icon: IconDefinition;
      subCategories?: {
        label: string;
        path: string;
        icon: IconDefinition;
      }[];
      roles?: string[];
    }>
  >([]);

  useEffect(() => {
    setSidebarNav(sidebarLinks);
  }, []);

  // NAVIGATION
  const navigate = useNavigate();

  const controls = useAnimation();
  const controlText = useAnimation();
  const controlTitleText = useAnimation();

  const showMore = useCallback(() => {
    controls.start({
      width: 'auto',
      transition: { duration: 0.2 },
    });
    controlText.start({
      opacity: 1,
      display: 'block',
      transition: { delay: 0.3 },
    });
    controlTitleText.start({
      opacity: 1,
      transition: { delay: 0.3 },
    });
  }, [controls, controlText, controlTitleText]);

  const showLess = useCallback(() => {
    controls.start({
      width: 'auto',
      transition: { duration: 0.2 },
    });

    controlText.start({
      opacity: 0,
      display: 'none',
    });

    controlTitleText.start({
      opacity: 0,
    });
  }, [controls, controlText, controlTitleText]);

  useEffect(() => {
    if (sidebarOpen) {
      showMore();
    } else {
      showLess();
    }
  }, [sidebarOpen, showLess, showMore]);

  // GET USER PROFILE
  const { userIsFetching } = useGetUserById({ id: user?.id });

  // INITIALIZE LOGOUT QUERY
  const [logout, { isFetching: logoutIsFetching, isSuccess: logoutIsSuccess }] =
    useLazyLogoutQuery();

  useEffect(() => {
    if (logoutIsSuccess) {
      dispatch(setUser(undefined));
      dispatch(setToken(undefined));
      store.clearAll();
      navigate('/auth/login');
    }
  }, [dispatch, logoutIsSuccess, navigate]);

  return (
    <aside
      className={`flex flex-col h-screen ${
        sidebarOpen ? 'w-[40vw] md:w-[25vw] lg:w-[20vw]' : 'w-[5vw]'
      } transition-all duration-300 fixed`}
    >
      <motion.div
        animate={controls}
        className={`flex flex-col items-center h-full bg-background text-white transition-all duration-300 px-4`}
      >
        <header
          className={`w-full flex items-center gap-4 justify-end px-4 py-4 ${
            sidebarOpen ? 'flex-row' : 'flex-col gap-4'
          }`}
        >
          <FontAwesomeIcon
            onClick={(e) => {
              e.preventDefault();
              dispatch(setIsOpen(!sidebarOpen));
            }}
            className="p-2 rounded-full bg-primary px-[9px] text-white text-[16px] cursor-pointer ease-in-out duration-150 hover:scale-[1.01]"
            icon={faBars}
          />
        </header>
        <ul className="flex flex-col w-full h-full gap-2 mt-10">
          {sidebarNav?.map((nav, index) => {
            const selected = pathname === nav?.path;
            return (
              <li key={index}>
                <Link
                  to={nav?.path}
                  className={`flex items-center gap-5 px-4 font-semibold text-[15px] ease-in-out duration-200 hover:bg-white text-secondary rounded-md py-3 ${
                    selected && 'bg-white !text-primary'
                  } ${sidebarOpen ? 'justify-start' : 'justify-center'}`}
                  onClick={(e) => {
                    if (nav.subCategories) {
                      e.preventDefault();
                      if (selectedSubCategory === nav?.label) {
                        setIsSubCategoriesOpen(!isSubCategoriesOpen);
                      } else {
                        setIsSubCategoriesOpen(true);
                        setSelectedSubCategory(nav?.label);
                      }
                    }
                  }}
                >
                  <FontAwesomeIcon
                    icon={nav?.icon}
                    className={`text-secondary font-bold ${
                      selected && '!text-primary'
                    } ${sidebarOpen ? 'text-[20px]' : 'text-[16px]'}`}
                  />
                  {sidebarOpen ? nav?.label : null}
                  {nav.subCategories && sidebarOpen && (
                    <FontAwesomeIcon
                      icon={
                        isSubCategoriesOpen &&
                        selectedSubCategory === nav?.label
                          ? faChevronUp
                          : faChevronDown
                      }
                      className="ml-auto"
                    />
                  )}
                </Link>
                {nav?.subCategories &&
                  sidebarOpen &&
                  selectedSubCategory === nav?.label && (
                    <ul className="px-2 flex flex-col gap-1 my-1">
                      {isSubCategoriesOpen
                        ? nav.subCategories.map((sub, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                to={sub.path}
                                className={`flex items-center gap-5 px-4 font-semibold text-[15px] ease-in-out duration-200 hover:bg-white text-secondary rounded-md py-3 ${
                                  pathname === sub.path &&
                                  'bg-white !text-primary'
                                } ${
                                  sidebarOpen
                                    ? 'justify-start'
                                    : 'justify-center'
                                }`}
                              >
                                <FontAwesomeIcon
                                  icon={sub.icon}
                                  className={`text-secondary font-bold ${
                                    pathname === sub.path && '!text-primary'
                                  } ${
                                    sidebarOpen ? 'text-[20px]' : 'text-[16px]'
                                  }`}
                                />
                                {sidebarOpen ? sub.label : null}
                              </Link>
                            </li>
                          ))
                        : null}
                    </ul>
                  )}
              </li>
            );
          })}
        </ul>

        {/* User Profile Section */}
        <footer className="w-full mt-auto mb-4">
          {userIsFetching ? (
            <figure className="w-full flex flex-col gap-2">
              <SkeletonLoader className="bg-white" />
              <SkeletonLoader className="bg-white" type="button" />
            </figure>
          ) : (
            <CustomPopover
              trigger={
                <Link
                  to="#"
                  className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 font-semibold text-[15px] ease-in-out duration-200 hover:bg-white text-secondary rounded-md ${
                    sidebarOpen ? 'justify-start' : 'justify-center'
                  }`}
                >
                  {
                    <p className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                      {userProfile?.username ? (
                        <span className="text-sm font-semibold">
                          {userProfile.username.slice(0, 2).toUpperCase()}
                        </span>
                      ) : (
                        <>
                          {sidebarOpen ? (
                            <FontAwesomeIcon
                              icon={faUser}
                              className="text-sm"
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faUser}
                              className="text-sm px-[11px]"
                            />
                          )}
                        </>
                      )}
                    </p>
                  }
                  {sidebarOpen && (
                    <ul className="flex flex-col items-start">
                      <p className="text-sm font-semibold text-primary">
                        {userProfile?.username || 'User'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {userProfile?.email || 'user@example.com'}
                      </p>
                    </ul>
                  )}
                </Link>
              }
              children={
                <menu className="w-full flex flex-col gap-2 min-w-[200px]">
                  <Link
                    to="/profile"
                    className="text-secondary flex items-center gap-2 text-sm hover:bg-background p-2 px-3 rounded-md"
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-secondary text-sm"
                    />
                    View Profile
                  </Link>
                  {logoutIsFetching ? (
                    <SkeletonLoader type="button" />
                  ) : (
                    <Link
                      to="/auth/login"
                      className="text-red-700 flex items-center gap-2 text-sm hover:bg-background p-2 px-3 rounded-md w-full"
                      onClick={(e) => {
                        e.preventDefault();
                        logout({})
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faRightFromBracket}
                        className="text-red-700 text-sm"
                      />
                      Logout
                    </Link>
                  )}
                </menu>
              }
            />
          )}
        </footer>
      </motion.div>
    </aside>
  );
};

export default Sidebar;
