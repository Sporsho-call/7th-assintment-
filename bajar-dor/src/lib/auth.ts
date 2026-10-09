import { betterAuth } from "better-auth";

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET || "bazardor_secret_key_123456789",
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
});