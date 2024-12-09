import {getIronSession} from "iron-session";
import {cookies} from "next/headers";
import {SessionContent} from "@/lib/types";

export async function getSession() {
  return await getIronSession<SessionContent>(cookies(), {
    password: process.env.COOKIE_PASSOWORD!,
    cookieName: "twitter"
  });
}