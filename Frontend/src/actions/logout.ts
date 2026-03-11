// src/app/actions/logout.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieStore = await cookies();
  
  // Lista de todos os nomes possíveis que você usou
  const cookiesToClear = ["session", "token", "role", "isAdmin", "user_id"];
  
  cookiesToClear.forEach(name => {
    cookieStore.delete(name);
  });

  redirect("/");
}