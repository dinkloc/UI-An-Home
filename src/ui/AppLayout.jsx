import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import Sidebar from "./Sidebar";
import Header from "./Header";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Outlet />
    </StyledAppLayout>
  );
};
export default AppLayout;
