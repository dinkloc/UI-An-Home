import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  return (
    <ButtonIcon
      onClick={() => {
        navigate("/login");
        localStorage.removeItem("token");
      }}
    >
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
};

export default Logout;
