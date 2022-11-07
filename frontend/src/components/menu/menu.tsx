import { Link } from "react-router-dom";
import "./menu.css";

export const Menu: React.FC = () => {
    return (
        <aside className="menu-area">
            <nav className="menu">
                <Link to="/">
                    <i className="fa fa-home"></i> Pagina inicial
                </Link>
            </nav>
        </aside>
    );
};