import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useAppDispatch } from "@/Redux/hooks";
import { logoutUser } from "@/Redux/Slices/authThunks";
import { useAdminUI } from "@/Shared/Providers/useAdminUI";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

const AdminHeader = ({ onMenuClick }: AdminHeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { themeMode, language, toggleTheme, toggleLanguage, t } = useAdminUI();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login", { replace: true });
  };

  return (
    <Header>
      <HeaderStart>
        <MenuButton type="button" onClick={onMenuClick} aria-label="Open menu">
          <span />
          <span />
          <span />
        </MenuButton>

        <PageTitle>{t.appName}</PageTitle>
      </HeaderStart>

      <HeaderActions>
        <ActionButton onClick={toggleLanguage}>
          {language === "fa" ? "English" : "فارسی"}
        </ActionButton>

        <ActionButton onClick={toggleTheme}>
          {themeMode === "light" ? t.darkMode : t.lightMode}
        </ActionButton>

        <UserInfo>
          <Avatar>AD</Avatar>
          <UserName>{t.administrator}</UserName>
        </UserInfo>

        <LogoutButton onClick={handleLogout}>{t.logout}</LogoutButton>
      </HeaderActions>
    </Header>
  );
};

export default AdminHeader;

const Header = styled.header`
  min-height: 76px;
  box-sizing: border-box;
  padding: 12px 32px;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 768px) {
    min-height: 68px;
    padding: 12px 20px;
    flex-wrap: wrap;
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
    align-items: flex-start;
    flex-direction: column;
  }
`;

const HeaderStart = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
`;

const PageTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  white-space: nowrap;
`;

const MenuButton = styled.button`
  display: none;
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  padding: 9px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  cursor: pointer;

  span {
    display: block;
    width: 100%;
    height: 2px;
    margin: 4px 0;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.text};
  }

  @media (max-width: 900px) {
    display: block;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  min-width: 0;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    width: 100%;
    justify-content: space-between;
    gap: 8px;
  }
`;

const ActionButton = styled.button`
  min-height: 36px;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 7px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;

  @media (max-width: 480px) {
    padding: 7px 9px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  white-space: nowrap;
`;

const UserName = styled.span`
  @media (max-width: 380px) {
    display: none;
  }
`;

const Avatar = styled.div`
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  font-weight: 700;
  font-size: 12px;
`;

const LogoutButton = styled.button`
  min-height: 36px;
  padding: 8px 13px;
  border: none;
  border-radius: 7px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-family: inherit;
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
`;
