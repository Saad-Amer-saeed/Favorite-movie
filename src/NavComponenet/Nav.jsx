import { Logo } from "./Logo";
export function Nav({ children }) {
  return (
    <nav className="nav-bar">
      <Logo></Logo>
      {children}{" "}
    </nav>
  );
}
