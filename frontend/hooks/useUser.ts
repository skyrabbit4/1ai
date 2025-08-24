import { BACKEND_URL } from "@/lib/utils";
import { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  name?: string;
  credits: number;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`${BACKEND_URL}/auth/me`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            res.json().then((data) => {
                setUser(data.user);
                setIsLoading(false);
            });
        });
    }, []);

    return { user, isLoading };
}