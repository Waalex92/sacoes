export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/homepage/:path*",
        "/login/:path*"
    ],
};