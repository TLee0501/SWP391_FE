import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { AppSider } from "./Sider";
import { AppHeader } from "./Header";
import { Outlet } from "react-router-dom";
import AuthApi from "../../apis/auth";
import { UserContext } from "../../providers/user";

const { Content } = Layout;

export const Dashboard = () => {
  const [user, setUser] = useState()
	
  useEffect(() => {
    AuthApi.getUser().then((user) => setUser(user));
  }, []);

  return (
    <UserContext.Provider value={{user: user, setUser: setUser}}>
      <Layout hasSider>
        <AppSider />
        <Layout
          style={{
            marginLeft: 200,
          }}
        >
          <AppHeader />
          <Content
            style={{
              padding: "16px 16px 0",
              overflow: "initial",
              backgroundColor: "white",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </UserContext.Provider>
  );
};
