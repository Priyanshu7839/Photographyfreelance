import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, ArrowRight, Calendar, Image } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { clientLogin } from "../../Utils/Apicalls";
import { toast } from "sonner";

export default function ClientLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] =
  useState(false);

const handleSubmit =
  async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await clientLogin(
          email,
          password
        );

      toast.success(
        response.message
      );

      // Optional: store user
      localStorage.setItem(
        "user",
        JSON.stringify(
          response.user
        )
      );

      navigate(
        `/dashboard`
      );
    } catch (error) {
      toast.error(
        error.message
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative bg-background text-foreground min-h-screen overflow-hidden">
      {/* Elegant Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(255,255,255,0.02),transparent_50%)]" />

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
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent rounded-3xl opacity-50" />

              <div className="relative">
                {/* Header */}
                <div className="mb-10">
                  <p className="text-xs uppercase tracking-[0.3em] opacity-40 mb-4">
                    Client Portal
                  </p>
                  <h1 className="text-3xl md:text-4xl mb-3 tracking-tight">
                    Welcome Back
                  </h1>
                  <p className="text-sm opacity-50">
                    Access your wedding project and collaborate with our studio
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Field */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider opacity-50 mb-3">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-12 pr-4 py-4 text-base focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all"
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
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-12 pr-4 py-4 text-base focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Forgot Password */}
                  {/* <div className="flex justify-end">
                    <button
                    
                      type="button"
                      className="text-xs opacity-40 hover:opacity-70 transition-opacity"
                    >
                      Forgot password?
                    </button>
                  </div> */}

                  {/* Submit Button */}
                  <button
                      disabled={loading}
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90 text-background py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group mt-8"
                  >
                    <span className="text-base">

                       {loading
      ? "Logging in..."
      : "Continue to Portal"}
                    </span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>

                
               

                {/* Project Preview Hint */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-10 p-5 bg-accent/5 border border-accent/10 rounded-2xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Image className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm mb-1">Your Project Awaits</p>
                      <p className="text-xs opacity-50">
                        Track editing progress and preview your wedding gallery
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-accent/10 via-transparent to-transparent rounded-3xl blur-2xl opacity-30 -z-10" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
