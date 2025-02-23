import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button 
            className={`btn btn-danger position-fixed bottom-0 end-0 m-3 rounded-circle shadow-lg ${isVisible ? "d-block" : "d-none"}`} 
            onClick={scrollToTop}
            style={{ width: "50px", height: "50px" }}
            aria-label="Scroll to top"
        >
            <FaArrowUp />
        </button>
    );
}
