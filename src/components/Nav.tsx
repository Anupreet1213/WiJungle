import { FaBell } from "react-icons/fa";

const Nav = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-8 border-b-2 border-[#0e0235] ">
      <div>
        <ul className="flex gap-4">
          <li>Dashboard</li>
          <li className="opacity-50 hidden md:block">Pages</li>
          <li className="opacity-50 hidden md:block">Posts</li>
        </ul>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <img
            src="https://pics.craiyon.com/2023-10-23/903eec12f88642079733f99cf3e1eb17.webp"
            alt="profile"
            className="w-12 h-12 bg-cover rounded-full"
          />
          <span className="opacity-80">React Dev</span>
        </div>
        <div>
          <FaBell className="opacity-80" />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
