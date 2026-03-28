import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   if(email!=='timelessphotograph@gmail.com'){
    toast.error('Email not matched')
   }
   else if(password!=='12345678'){
    toast.error('password not matched')
   }
   else{
    navigate("/dashboard");
   }
    
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl text-center mb-8 text-black">Welcome Back</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 bg-black text-white hover:bg-gray-900 transition-colors rounded-md"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-gray-600 hover:text-black transition-colors rounded-md"
            >
              ← Back to home
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}