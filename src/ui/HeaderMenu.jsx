import { styled } from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import Logout from "../features/authentication/Logout";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;
const HeaderMenu = () => {
  return (
    <StyledHeaderMenu>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <ButtonIcon>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
