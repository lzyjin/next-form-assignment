import NavBar from "@/components/nav-bar";

export default function NavLayout(
  {children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar/>
      <div className="w-full h-full ml-20 border-r border-neutral-200">
        {children}
      </div>
    </div>
  );
}