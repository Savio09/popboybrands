import { NextRequest, NextResponse } from "next/server";
import { isValidPassword } from "./lib/isValidPassword";
export async function middleware(req: NextRequest) {
  if ((await isAuthenticated(req)) === false) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": "Basic",
      },
    });
  }
}

async function isAuthenticated(req: NextRequest) {
  const auth =
    req.headers.get("Authorization") || req.headers.get("authorization");
  if (!auth) return false;

  const [username, password] = Buffer.from(auth.split(" ")[1], "base64")
    .toString()
    .split(":");

  console.log("username: ", username);
  console.log("password: ", password);
  console.log(
    "process.env.ADMIN_USERNAME: ",
    process.env.HASHED_ADMIN_PASSWORD
  );

  return (
    username === process.env.ADMIN_USERNAME &&
    (await isValidPassword(
      password,
      process.env.HASHED_ADMIN_PASSWORD as string
    ))
  );
}

export const config = {
  matcher: "/admin/:path",
};
