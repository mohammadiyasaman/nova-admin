import { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import AdminSidebar from "./Sidebar/AdminSidebar";
import AdminHeader from "./Header/AdminHeader";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <Layout>
      <AdminSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {isSidebarOpen && (
        <SidebarBackdrop onClick={closeSidebar} aria-label="Close menu" />
      )}

      <MainSection>
        <AdminHeader
          onMenuClick={() => setIsSidebarOpen((previous) => !previous)}
        />

        <Content>
          <Outlet />
        </Content>
      </MainSection>
    </Layout>
  );
};

export default AdminLayout;

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
`;

const MainSection = styled.div`
  flex: 1;
  min-width: 0;
  width: 0;
`;

const Content = styled.main`
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 32px;

  @media (max-width: 768px) {
    padding: 22px;
  }

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

const SidebarBackdrop = styled.button`
  display: none;

  @media (max-width: 900px) {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    border: 0;
    background: rgb(0 0 0 / 45%);
    cursor: pointer;
  }
`;
