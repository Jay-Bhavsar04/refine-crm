import { Input, Layout, Space, theme } from "antd";
import CurrentUser from "./current-user";
import { SearchOutlined } from "@ant-design/icons";
import { Notifications } from "./notification";

const { useToken } = theme;
export const Header = () => {
  const { token } = useToken();
  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
    position: "sticky",
    top: 0,
    zIndex: 999
  };
  return (
    <Layout.Header style={headerStyles}>
      <Input
        size="large"
        placeholder="Search"
        prefix={<SearchOutlined />}
        suffix={"/"}
        style={{ width: "300px" }}
      />
      <Space align="center" size="middle">
        <Notifications />
        <CurrentUser />
      </Space>
    </Layout.Header>
  );
};
