import AppHeader from "./AppHeader";
import BottomNav from "./BottomNav";

type Props = {
  children: React.ReactNode;
};

const AppShell = ({ children }: Props) => {
  return (
    <div className="mx-auto min-h-screen max-w-md">
      <AppHeader />
      <main className="pb-20 px-4 pt-4">{children}</main>
      <BottomNav />
    </div>
  );
};

export default AppShell;
