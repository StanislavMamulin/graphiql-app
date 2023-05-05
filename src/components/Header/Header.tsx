import { useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import styles from "./Header.module.css";

const STICKY_THRESHOLD_PX = 100;

export function Header() {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const isSticky = () => {
      if (window.scrollY >= STICKY_THRESHOLD_PX && !sticky) {
        setSticky(true);
      }

      if (window.scrollY < STICKY_THRESHOLD_PX && sticky) {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, [sticky]);

  const getHeaderClass = () =>
    styles.header__container +
    (sticky ? " " + styles.header__container_sticky : "");

  return (
    <header className={getHeaderClass()}>
      <Button title="Sign out" clickHandler={() => console.log("clicked")} />
    </header>
  );
}
