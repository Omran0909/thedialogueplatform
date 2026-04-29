import { NextResponse } from "next/server";

export type AdminIdentity = {
  id: string;
  email: string;
  role: "admin";
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function secureCompare(a: string, b: string) {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let index = 0; index < a.length; index += 1) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return result === 0;
}

function readToken(request: Request) {
  const authorization = clean(request.headers.get("authorization"));
  if (authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.slice(7).trim();
  }

  return clean(request.headers.get("x-platform-admin-token"));
}

export function getAdminIdentity(request: Request): AdminIdentity | null {
  const expectedToken = clean(process.env.PLATFORM_ADMIN_TOKEN);
  if (!expectedToken) {
    return null;
  }

  const suppliedToken = readToken(request);
  if (!suppliedToken || !secureCompare(suppliedToken, expectedToken)) {
    return null;
  }

  return {
    id: "platform-admin",
    email: clean(process.env.PLATFORM_ADMIN_EMAIL) || "admin@thedialogueplatform.com",
    role: "admin",
  };
}

export function adminUnauthorizedResponse() {
  return NextResponse.json(
    {
      ok: false,
      message: "Admin token required.",
    },
    { status: 401 },
  );
}
