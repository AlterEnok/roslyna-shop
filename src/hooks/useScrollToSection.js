
import { useNavigate, useLocation } from "react-router-dom";

export function useScrollToSection() {
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToSection = (sectionId) => {
        if (location.pathname !== "/") {

            localStorage.setItem("scrollTarget", sectionId);
            navigate("/");
        } else {

            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return scrollToSection;
}
