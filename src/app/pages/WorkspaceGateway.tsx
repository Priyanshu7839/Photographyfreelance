import { motion } from "motion/react";
import { Users, Briefcase, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const roles = [
  {
    id: "client",
    title: "Client Portal",
    description: "Track your wedding project and collaborate with the studio",
    icon: Users,
    path: "/login/client",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    id: "Studio",
    title: "Studio Workspace",
    description: "Manage workflows, edit content, and deliver projects",
    icon: Briefcase,
    path: "/login/team",
    gradient: "from-blue-500/20 to-blue-500/5",
  }
];

export default function WorkspaceGateway() {
  return (
    <div className="relative bg-background text-foreground min-h-screen overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.02),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.015),transparent_50%)]" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] opacity-40 mb-6">
            Production Workspace
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-4 tracking-tight">
            Choose Your Access
          </h1>
          <p className="text-base md:text-lg opacity-50 max-w-md mx-auto">
            Enter your dedicated workspace to manage projects and collaborate
          </p>
        </motion.div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl w-full">
          {roles.map((role, index) => (
            <Link key={role.id} to={role.path}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative bg-white/[0.02] border border-white/[0.08] rounded-2xl p-8 md:p-10 min-h-[320px] flex flex-col backdrop-blur-sm hover:bg-white/[0.04] hover:border-white/20 transition-all duration-500 overflow-hidden">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Icon */}
                  <div className="relative mb-8">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                      <role.icon className="w-7 h-7 md:w-8 md:h-8 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative flex-1 flex flex-col">
                    <h3 className="text-2xl md:text-3xl mb-3 tracking-tight">
                      {role.title}
                    </h3>
                    <p className="text-sm md:text-base opacity-50 mb-8 leading-relaxed">
                      {role.description}
                    </p>

                    {/* CTA */}
                    <div className="mt-auto flex items-center gap-2 text-sm opacity-60 group-hover:opacity-100 transition-opacity">
                      <span>Enter workspace</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Shadow */}
                <div className="absolute -inset-4 bg-gradient-to-b from-transparent to-black/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 md:mt-20"
        >
          <Link
            to="/"
            className="text-sm opacity-40 hover:opacity-70 transition-opacity inline-flex items-center gap-2"
          >
            <span>← Back to homepage</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
