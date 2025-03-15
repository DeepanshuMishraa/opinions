'use client'

import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";



interface User {
  id: string;
  email: string;
  name: string;
}

interface Session {
  user: User | null;
  status: "loading" | "authenticated" | "unauthenticated";
}

export function useSession() {
  const { data: session, isLoading } = useQuery<Session>({
    queryKey: ["session"],
    queryFn: async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (!token) {
          console.log('No token found');
          return {
            user: null,
            status: "unauthenticated"
          };
        }


        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (!response.data.user) {
          throw new Error('No user data received');
        }

        return {
          user: response.data.user,
          status: "authenticated"
        };
      } catch (error) {
        console.error('Session error:', error);
  
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
        return {
          user: null,
          status: "unauthenticated"
        };
      }
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: false
  });

  return {
    user: session?.user ?? null,
    status: isLoading ? "loading" : session?.status ?? "unauthenticated"
  };
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = async () => {
    try {
      localStorage.removeItem('token');

      queryClient.setQueryData(["session"], {
        user: null,
        status: "unauthenticated"
      });

      queryClient.invalidateQueries();

      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return { logout };
}

export function useRequireAuth(redirectTo: string = "/login") {
  const router = useRouter();
  const { status } = useSession();

  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push(redirectTo);
    }
  }, [status, router, redirectTo]);

  return status === "authenticated";
}
