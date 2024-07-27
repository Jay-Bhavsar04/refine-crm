import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { Authenticated, Refine } from "@refinedev/core";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier
} from "@refinedev/react-router-v6";

import { App as AntdApp, ConfigProvider } from "antd";

import { themeConfig } from "./config";

import { liveProvider, dataProvider, authProvider } from "./providers";

import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { ForgotPassword, Login, Register } from "./pages";
import { Layout } from "./components";

import { DashboardPage } from "./routes/dashboard";
import { resources } from "./config/resources";

import "./styles/antd.css";
import "./styles/fc.css";
import "./styles/index.css";
import { CalendarPageWrapper } from "./routes/calendar/wrapper";
import { useAutoLoginForDemo } from "./hooks/useAutoLoginForDemo";
import { FullScreenloading } from "./components/fullscreen-loading";
import {
  CompanyCreatePage,
  CompanyEditPage,
  CompanyListPage,
  CompanyShowPage
} from "./routes/companies";
import {
  ContactCreatePage,
  ContactEditPage,
  ContactList,
  ContactShowPage
} from "./routes/contacts";
import { QuotesCreate, QuotesEdit, QuotesList, QuotesShow } from "./routes/quotes";
import { SettingsPage } from "./routes/administration/settings";
import { AuditLogPage } from "./routes/administration/audit-log";

const App: React.FC = () => {
  const { loading } = useAutoLoginForDemo();

  if (loading) {
    return <FullScreenloading />;
  }

  return (
    <BrowserRouter>
      <ConfigProvider theme={themeConfig}>
        <RefineKbarProvider>
          <AntdApp>
            <Refine
              dataProvider={dataProvider}
              authProvider={authProvider}
              liveProvider={liveProvider}
              routerProvider={routerBindings}
              resources={resources}
              notificationProvider={useNotificationProvider}
              options={{
                liveMode: "auto",
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "fOZrlY-BHO9nT-tRjDHX"
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authetication-layout"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route index element={<DashboardPage />} />
                  <Route
                    path="/calendar"
                    element={
                      <CalendarPageWrapper>
                        <Outlet />
                      </CalendarPageWrapper>
                    }
                  />
                  <Route path="/scrumboard" element={<Outlet />}>
                    <Route path="kanban" element={<Outlet />}></Route>
                    <Route path="sales" element={<Outlet />}></Route>
                  </Route>
                  <Route path="/companies">
                    <Route index element={<CompanyListPage />} />
                    <Route path="create" element={<CompanyCreatePage />} />
                    <Route path="edit/:id" element={<CompanyEditPage />} />
                    <Route path="show/:id" element={<CompanyShowPage />} />
                  </Route>
                  <Route path="/contacts">
                    <Route index element={<ContactList />} />
                    <Route path="create" element={<ContactCreatePage />} />
                    <Route path="edit/:id" element={<ContactEditPage />} />
                    <Route path="show/:id" element={<ContactShowPage />} />
                  </Route>
                  <Route path="/quotes">
                    <Route index element={<QuotesList />} />
                    <Route path="create" element={<QuotesCreate />} />
                    <Route path="edit/:id" element={<QuotesEdit />} />
                    <Route path="show/:id" element={<QuotesShow />} />
                  </Route>
                  <Route path="/administration" element={<Outlet />}>
                    <Route path="setting" element={<SettingsPage />} />
                    <Route
                      path="/administration/audit-log"
                      element={<AuditLogPage />}
                    />
                  </Route>
                </Route>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-auth"
                      fallback={<Outlet />}
                    >
                      <NavigateToResource resource="dashboard" />
                    </Authenticated>
                  }
                >
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                </Route>
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </AntdApp>
        </RefineKbarProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
