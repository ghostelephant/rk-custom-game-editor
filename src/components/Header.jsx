import {Link} from "react-router-dom";
import Blemmye from "../static/img/blemmye.png";

const Header = ({urlBase}) => {
  return (
    <nav className="nav-wrapper purple lighten-3 row">
      <img
        src={Blemmye}
        alt="Blemmye"
        className="col m2 s4 responsive-img left"
        style={{maxHeight: "100%", width: "auto"}}
      />
      
      <Link
        className="brand-logo left black-text col m10 s8"
        to={urlBase}
      >
        Riskrieg&nbsp;Game&nbsp;Editor
      </Link>
    </nav>
  );
};

export default Header;