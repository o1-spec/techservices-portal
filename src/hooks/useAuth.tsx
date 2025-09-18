"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { usePathname } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { authAPI } = await import("@/lib/api");
      const { data, error } = await authAPI.login({ email, password });

      if (error) {
        return { success: false, error };
      }

      if (data?.user) {
        setUser(data.user);
        return { success: true };
      }

      return { success: false, error: "Login failed" };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "An unexpected error occurred" };
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      
      const { authAPI } = await import("@/lib/api");
      await authAPI.logout();
      
      setUser(null);
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (!pathname.includes("/auth")) {
        window.location.href = "/auth/login";
      }
    } catch (error) {
      console.error("Logout error:", error);
      setUser(null);
      if (!pathname.includes("/auth")) {
        window.location.href = "/auth/login";
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (pathname.includes("/auth")) {
      setLoading(false);
    }
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}