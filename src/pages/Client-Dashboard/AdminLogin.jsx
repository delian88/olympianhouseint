import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import OhiLogo from "../../components/LandingPage/Logo/logo";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

import { motion } from "framer-motion";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const from = location.state?.from || "/dashboard/overview";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [from, isAuthenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const result = await login({ email, password });

    if (!result.ok) {
      toast.error(result.message);
      setLoading(false);
      return;
    }

    toast.success(result.message);
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(17,138,178,0.18),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(0,86,179,0.14),_transparent_32%),linear-gradient(135deg,_#f8fbff_0%,_#edf4fb_45%,_#dce9f8_100%)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="relative order-2 overflow-hidden border-white/60 bg-[#0f4c81] text-white shadow-[0_30px_80px_rgba(15,76,129,0.25)] lg:order-1">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%,rgba(255,255,255,0.05))]" />
          <CardContent className="relative z-10 flex h-full flex-col justify-between gap-10 px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div className="flex items-center gap-3">
              <OhiLogo className="h-14 w-auto" />
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/70">
                  Olympian House International
                </p>
                <h1 className="mt-1 text-xl font-semibold">Admin login</h1>
              </div>
            </div>

            <div className="max-w-xl">
              <p className="text-sm uppercase tracking-[0.25em] text-white/70">
                Secure access
              </p>
              <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
                Manage OHI from one place.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-white/85">
                Update the homepage, images, and colors without touching code.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {["Homepage editor", "Brand controls", "Mission and stories"].map(
                (item) => (
                  <Card
                    key={item}
                    className="border-white/15 bg-white/10 text-white backdrop-blur"
                  >
                    <CardContent className="px-4 py-4">
                      <p className="text-sm font-medium">{item}</p>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="order-1 border-white/70 bg-card/90 shadow-[0_30px_80px_rgba(15,23,42,0.14)] backdrop-blur lg:order-2">
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-primaryColor/10 p-3 text-primaryColor">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primaryColor">
                  OHI Admin
                </p>
                <CardTitle className="mt-1 text-2xl">Sign in</CardTitle>
              </div>
            </div>
            <CardDescription className="max-w-md text-sm leading-6">
              Use the admin credentials to enter the dashboard. Session data is
              stored locally in this browser.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">
                  Admin email
                </Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="admin@olympianhouseintl.com"
                    className="h-12 rounded-2xl border-border bg-background px-11 text-sm text-foreground"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold">
                  Password
                </Label>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="h-12 rounded-2xl border-border bg-background px-11 pr-14 text-sm text-foreground"
                    autoComplete="current-password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-2xl px-5 text-sm font-semibold shadow-[0_18px_40px_rgba(7,94,171,0.24)]"
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>



            <div className="mt-6 flex items-center justify-between gap-3 text-sm text-muted-foreground">
              <Button asChild variant="link" className="h-auto px-0 font-semibold">
                <Link to="/">Back to home</Link>
              </Button>
              <span>Protected OHI admin access</span>
            </div>
          </CardContent>
        </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
