import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  FaBars,
  FaHome,
  FaPlay,
  FaUserFriends,
  FaHistory,
  FaList,
  FaBookmark,
  FaThumbsUp,
  FaClock,
  FaPlusCircle,
  FaUser,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";
import logo from "../assets/images.png";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sideOpen, setSideOpen] = useState(true);

  const isActive = (path) => location.pathname === path;

  const categories = [
    "All",
    "Music",
    "Gaming",
    "Live",
    "React",
    "JavaScript",
    "Movies",
    "Podcasts",
    "Recently Uploaded",
  ];

  const sidebarMain = [
    { label: "Home", icon: <FaHome />, path: "/" },
    { label: "Shorts", icon: <FaPlay />, path: "/shorts" },
    { label: "Subscriptions", icon: <FaUserFriends />, path: "/subscriptions" },
  ];

  const sidebarYou = [
    { label: "History", icon: <FaHistory />, path: "/history" },
    { label: "Playlists", icon: <FaList />, path: "/playlists" },
    { label: "Saved Videos", icon: <FaBookmark />, path: "/saved" },
    { label: "Liked Videos", icon: <FaThumbsUp />, path: "/liked" },
    { label: "Watch Later", icon: <FaClock />, path: "/watch-later" },
  ];

  const mobileNav = [
    { label: "Home", icon: <FaHome />, path: "/" },
    { label: "Shorts", icon: <FaPlay />, path: "/shorts" },
    { label: "Subscriptions", icon: <FaUserFriends />, path: "/subscriptions" },
    { label: "History", icon: <FaHistory />, path: "/history" },
    { label: "Playlists", icon: <FaList />, path: "/playlists" },
  ];

  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-[60px] bg-[#0f0f0f] border-b border-gray-800 z-50">
        <div className="flex items-center justify-between h-full px-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSideOpen(!sideOpen)}
              className="hidden md:flex bg-[#272727] p-2 rounded-full"
            >
              <FaBars />
            </button>

            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img src={logo} alt="logo" className="w-8" />
              <span className="font-bold hidden sm:block">Play Tube</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FaSearch className="md:hidden" />
            <FaUserCircle className="text-3xl hidden md:block text-gray-400" />
          </div>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside
        className={`hidden md:flex fixed top-[60px] bottom-0 bg-[#0f0f0f] border-r border-gray-800 transition-all ${
          sideOpen ? "w-60" : "w-20"
        }`}
      >
        <nav className="w-full p-2 space-y-2">
          {sidebarMain.map((item) => (
            <SidebarItem
              key={item.path}
              {...item}
              open={sideOpen}
              active={isActive(item.path)}
              onClick={() => navigate(item.path)}
            />
          ))}

          <hr className="border-gray-800 my-2" />

          {sidebarYou.map((item) => (
            <SidebarItem
              key={item.path}
              {...item}
              open={sideOpen}
              active={isActive(item.path)}
              onClick={() => navigate(item.path)}
            />
          ))}
        </nav>
      </aside>

      {/* MAIN */}
      <main
        className={`pt-[60px] pb-[60px] ${
          sideOpen ? "md:pl-60" : "md:pl-20"
        }`}
      >
        {/* CATEGORIES (HOME ONLY) */}
        {location.pathname === "/" && (
          <div className="sticky top-[60px] z-40 bg-[#0f0f0f] px-4 py-2">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className="bg-[#272727] px-4 py-1 rounded-full text-sm whitespace-nowrap hover:bg-[#3a3a3a]"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-2">
          <Outlet />
        </div>
      </main>

      {/* MOBILE BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0f0f0f] border-t border-gray-800 flex md:hidden">
        {mobileNav.map((item, i) => (
          <button
            key={i}
            onClick={() => item.path && navigate(item.path)}
            className={`flex-1 py-2 flex flex-col items-center text-xs ${
              isActive(item.path) ? "text-white" : "text-gray-400"
            }`}
          >
            {item.icon}
            <span className="mt-1">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

function SidebarItem({ icon, label, open, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-3 py-2 rounded transition-colors ${
        open ? "justify-start" : "justify-center"
      } ${active ? "bg-[#272727]" : "hover:bg-[#272727]"}`}
    >
      <span className="text-lg">{icon}</span>
      {open && <span className="text-sm">{label}</span>}
    </button>
  );
}

export default Home;
