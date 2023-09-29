import { useLocation, useNavigate } from "react-router-dom";

export const useGetCurrLocation = () => {
  const location = useLocation();
  const currLocation = location.pathname.split("/").slice(1);
  return currLocation[0];
};

export const useRouterBack = () => {
  const navigate = useNavigate();
  return () => navigate(-1);
};
