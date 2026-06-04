import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { loginUser } from "../../Utils/Apicalls";

export default function TeamLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    // Add authentication logic here

    if(email === ""){
      return;
    }
    if(password === ""){
      return;
    }
    try {
  const response = await loginUser({
    email,
    password,
  });

  if(response.message === 'Login successful'){
    navigate("/dashboard");

    localStorage.setItem(
  "user",
  JSON.stringify(response.user)
);
  }

} catch (error) {
  console.error(error.message);
}
  };

  return (
    <div className="relative bg-background text-foreground min-h-screen overflow-hidden">
      {/* Functional Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-blue-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,rgba(59,130,246,0.02),transparent_50%)]" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 md:px-6">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12"
          >
            <Link
              to="/workspace"
              className="inline-flex items-center gap-2 text-sm opacity-40 hover:opacity-70 transition-opacity"
            >
              <span>← Back to access selection</span>
            </Link>
          </motion.div>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="relative"
          >
            {/* Glassmorphism Card */}
            <div className="relative bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 md:p-12 backdrop-blur-xl">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent rounded-3xl opacity-50" />

              <div className="relative">
                {/* Header */}
                <div className="mb-10">
                  <p className="text-xs uppercase tracking-[0.3em] opacity-40 mb-4">
Studio Workspace
                  </p>
                  <h1 className="text-3xl md:text-4xl mb-3 tracking-tight">
                    Members Access
                  </h1>
                  <p className="text-sm opacity-50">
                    Manage workflows and deliver exceptional projects
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Field */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider opacity-50 mb-3">
                      Work Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="team@midorimedia.com"
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-12 pr-4 py-4 text-base focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider opacity-50 mb-3">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-12 pr-4 py-4 text-base focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Forgot Password */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-xs opacity-40 hover:opacity-70 transition-opacity"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group mt-8"
                  >
                    <span className="text-base">Access Workspace</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>

             
               
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent rounded-3xl blur-2xl opacity-30 -z-10" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
