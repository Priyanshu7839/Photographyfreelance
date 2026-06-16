import React, { useState } from "react"
import { motion ,AnimatePresence} from "motion/react";
import { LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { logout } from "../../Utils/Apicalls";
import { toast } from "sonner";



const Navbar = () => {

    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);

const getInitials = (name) => {
  const words = name
    ?.match(/[A-Za-z]+/g) || [];

  if (words.length === 0)
    return "";

  if (words.length === 1)
    return words[0]
      .slice(0, 2)
      .toUpperCase();

  return `${words[0][0]}${
    words[words.length - 1][0]
  }`.toUpperCase();
};

const navigate = useNavigate()
const handleLogout =
  async () => {
    try {
      await logout();

      localStorage.removeItem(
        "user"
      );

      toast.success(
        "Logged out successfully"
      );

      navigate("/");
    } catch (error) {
      toast.error(
        error.message
      );
    }
  };
return(
 <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 md:py-6 flex items-center justify-between backdrop-blur-sm bg-background/80"
      >
        <Link to="/" className="text-xl md:text-2xl tracking-tight">Midori Media</Link>
        <div className="flex gap-4 md:gap-8 items-center">
          <Link to="/" className="hidden sm:block text-sm opacity-70 hover:opacity-100 transition-opacity">Home</Link>
          <Link to="/dashboard" className="hidden sm:block text-sm opacity-70 hover:opacity-100 transition-opacity">Dashboard</Link>
          {/* <a href="#team" className="hidden md:block text-sm opacity-70 hover:opacity-100 transition-opacity">Team</a> */}
          <Link to="/booking" className="bg-accent px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm hover:bg-accent/90 transition-colors rounded-full">
            Book a Shoot
          </Link>

          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="w-10 h-10 rounded-full bg-accent/20 border-2 border-accent/30 hover:border-accent/50 flex items-center justify-center transition-all hover:scale-105"
            >
              <span className="text-sm font-medium">{getInitials(user.client_name || user.full_name)}</span>
            </button>

            <AnimatePresence>
              {showUserDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 w-64 bg-secondary border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                >
                  {/* User Info */}
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-accent/20 border-2 border-accent/30 flex items-center justify-center">
                        <span className="text-base font-medium">{getInitials(user.client_name || user.full_name)}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-medium">{user.client_name || user.full_name}</p>
                        <p className="text-xs opacity-60">{user.role || "Client"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={() => {
                     handleLogout()
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-white/5 transition-all flex items-center gap-3 text-sm"
                  >
                    <LogOut className="w-4 h-4 opacity-60" />
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>
)
}
export default Navbar