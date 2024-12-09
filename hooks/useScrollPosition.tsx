import { useState, useEffect } from "react";

export function useScrollPosition() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 0);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Llamar inmediatamente para establecer el estado inicial

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return isScrolled;
}
