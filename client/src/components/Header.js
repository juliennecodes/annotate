import { Navigation } from "./Navigation";
import { NewImageModalWrapper } from "./NewImageModal";
import "./Header.css";

export function Header() {
  return (
    <header className="header">
      <Navigation />
      <NewImageModalWrapper />
    </header>
  );
}
