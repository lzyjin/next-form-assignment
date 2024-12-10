import NavBar from "@/components/nav-bar";
// import {getSession} from "@/lib/session";
// import {getLoggedInUsername} from "@/services/user-service";
// import {createContext} from "react";
// import {notFound} from "next/navigation";

export default async function NavLayout(
  {children}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getSession();
  // const userId = session.id;
  //
  // if (!userId) {
  //   notFound();
  // }
  //
  // const username = await getLoggedInUsername(userId) ?? "";
  // const UsernameContext = createContext<string>(username);

  return (
    // <UsernameContext.Provider value={username}>
      <div>
        <NavBar/>
        <div className="h-full pl-20 border-r border-neutral-200">
          {children}
        </div>
      </div>
    // </UsernameContext.Provider>
  );
}