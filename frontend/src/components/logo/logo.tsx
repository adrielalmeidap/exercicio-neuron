import { Link } from "react-router-dom";
import logo from "../../assets/imgs/Logo.png";
import "./logo.css";

export const Logo: React.FC = () => {
    return (
        <aside className="logo">
            <Link to="/" className="logo">
                <img src={logo} alt="Logo"/>
            </Link>
        </aside>
    );
};