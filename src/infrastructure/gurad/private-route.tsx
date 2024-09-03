import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  element: React.ReactNode;
  roles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, roles }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    } else {
      try {
        const decodedToken: any = jwtDecode(token);
        if (!roles.includes(decodedToken.role)) {
          navigate("/not-found", { replace: true });
        }
      } catch (error) {
        navigate("/login", { replace: true });
      }
    }
  }, [token, roles, navigate]);

  // Render the component if the user is authenticated and authorized
  return <>{element}</>;
};

export default PrivateRoute;
