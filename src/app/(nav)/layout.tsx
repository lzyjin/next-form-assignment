import NavBar from "@/components/nav-bar";
import {getSession} from "@/lib/session";
import {getLoggedInUsername} from "@/services/user-service";

export default async function NavLayout(
  {children}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const userId = session.id!;
  const username = await getLoggedInUsername(userId) ?? "";

  return (
      <div>
        <NavBar loggedInUsername={username} />
        <div className="h-full pl-20">
          {children}
        </div>
      </div>
  );
}