import Cookie from "js-cookie";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cookieKey = "jwt-token";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setAccessToken = (token: string) => {
  Cookie.set(cookieKey, token, {
    expires: 1,
  });
};

export const getAccessToken = () => {
  const token = Cookie.get(cookieKey);
  return token ?? '';
};

export const removeAccessToken = () => {
  Cookie.remove(cookieKey);
};
