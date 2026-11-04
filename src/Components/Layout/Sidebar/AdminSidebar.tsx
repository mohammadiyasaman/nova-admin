import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { useAdminUI } from "@/Shared/Providers/useAdminUI";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => {
  const { t, language } = useAdminUI();
  const isFa = language === "fa";

  return (
    <Sidebar $isOpen={isOpen} $isFa={isFa}>
      <SidebarHeader>
        <Logo>{t.appName}</Logo>

        <CloseButton type="button" onClick={onClose} aria-label="Close menu">
          ×
        </CloseButton>
      </SidebarHeader>

      <Navigation>
        <NavLink to="/dashboard" onClick={onClose}>
          <span>▦</span>
          {t.dashboard}
        </NavLink>

        <NavLink to="/products" onClick={onClose}>
          <span>▣</span>
          {t.products}
        </NavLink>

        <NavLink to="/users" onClick={onClose}>
          <span>♙</span>
          {t.users}
        </NavLink>
      </Navigation>
    </Sidebar>
  );
};

export default AdminSidebar;

const Sidebar = styled.aside<{
  $isOpen: boolean;
  $isFa: boolean;
}>`
  position: relative;
  z-index: 1002;
  width: 250px;
  min-width: 250px;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 28px 18px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;

  @media (max-width: 900px) {
    position: fixed;
    top: 0;
    bottom: 0;
    width: min(280px, 85vw);
    min-width: 0;
    overflow-y: auto;
    transition: transform 0.25s ease;

    ${({ $isFa, $isOpen }) =>
      $isFa
        ? `
          right: 0;
          left: auto;
          transform: translateX(${$isOpen ? "0" : "110%"});
        `
        : `
          left: 0;
          right: auto;
          transform: translateX(${$isOpen ? "0" : "-110%"});
        `}
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 40px;
`;

const Logo = styled.h2`
  margin: 0;
  padding: 0 12px;
  font-size: 21px;
`;

const CloseButton = styled.button`
  display: none;
  width: 34px;
  height: 34px;
  border: 1px solid rgb(255 255 255 / 25%);
  border-radius: 8px;
  background: transparent;
  color: #fff;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 900px) {
    display: grid;
    place-items: center;
  }
`;

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;

  a {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 13px 14px;
    border-radius: 6px;
    color: #dce5f0;
    text-decoration: none;
    transition: background 0.2s;

    &:hover,
    &.active {
      background: ${({ theme }) => theme.colors.secondary};
      color: #fff;
    }
  }

  span {
    width: 20px;
    font-size: 18px;
  }
`;
