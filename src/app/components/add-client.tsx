import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, User } from "lucide-react";
import { CreateClient } from "../../Apicalls/Apicalls";
import { toast } from "sonner";

export function AddClient() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"client" | "owner">("client");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location:"",
    date:"",
    eventName:""

  });
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [creating,setcreating] = useState(false)

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setcreating(true)
    // Handle client/user creation logic here
    // console.log(`Creating ${userType}:`, formData);
    if(userType === 'client'){
        const upload =await CreateClient(formData.name,formData.email,userType,formData.password,formData.location,formData.date,formData.eventName)
      

        if(upload.data.msg === 'duplicate key value violates unique constraint \"clients_email_key\"'){
         
          toast.error("Email Already Exist")
        }
        else if(upload.data.msg ==='Client Created'){
          toast.success('Client Created')
        }
        else{
          toast.error("Error Creating Client")
        }
    }

    setcreating(false)
  
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="text-xl tracking-tight text-black">Timeless</div>
          
          <div className="relative">
            <button
              onMouseEnter={() => setShowUserDropdown(true)}
              onMouseLeave={() => setShowUserDropdown(false)}
              className="w-10 h-10 rounded-xlll bg-black text-white flex items-center justify-center hover:bg-gray-900 transition-colors"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Photographer Details Dropdown */}
            {showUserDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                onMouseEnter={() => setShowUserDropdown(true)}
                onMouseLeave={() => setShowUserDropdown(false)}
                className="absolute right-0 top-12 w-64 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg p-4"
              >
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Name</p>
                    <p className="text-sm text-black mt-1">Sarah Johnson</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                    <p className="text-sm text-black mt-1">sarah@timeless.photo</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                    <p className="text-sm text-black mt-1">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                    <p className="text-sm text-black mt-1">Los Angeles, CA</p>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <button
                      onClick={() => navigate("/login")}
                      className="text-xs text-gray-600 hover:text-black transition-colors rounded-xl"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-32 px-6 pb-20">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl mb-2 text-black">
              Add New {userType === "client" ? "Client" : "User"}
            </h1>
            <p className="text-gray-600 mb-8">
              {userType === "client"
                ? "Create a new client account to share photos and selections"
                : "Add a new team member or photographer"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Toggle Switch */}
              <div className="flex items-center justify-center gap-3 p-1 bg-gray-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setUserType("client")}
                  className={`flex-1 py-2.5 rounded-lg text-sm transition-all ${
                    userType === "client"
                      ? "bg-white text-black shadow-sm"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  Add Client
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("owner")}
                  className={`flex-1 py-2.5 rounded-lg text-sm transition-all ${
                    userType === "owner"
                      ? "bg-white text-black shadow-sm"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  Add User
                </button>
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-gray-700 mb-2"
                >
                  {userType === "client" ? "Name" : "Full Name"}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={userType === "client" ? "John & Jane Doe" : "Sarah Johnson"}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="client@example.com"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div className="flex items-center justify-between gap-2">
                <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Event Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="client@example.com"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-black transition-colors"
                />
              </div><div>
                <label
                  htmlFor="email"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Event Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Las Vegas Nevada"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-black transition-colors"
                />
              </div>
              </div>

              
<div>
                <label
                  htmlFor="eventName"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Event Location
                </label>
                <input
                  type="text"
                  id="eventName"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  placeholder="Wedding"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-black transition-colors"
                />
              </div>
              {/* <div>
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  minLength={8}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-black transition-colors"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Minimum 8 characters
                </p>
              </div> */}

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 py-3 bg-white border border-gray-300 text-black hover:bg-gray-50 transition-colors rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-black text-white hover:bg-gray-900 transition-colors rounded-xl"
                >
                  {creating?'Creating':"Create"} {userType  === "client" ? "Client" : "User"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}