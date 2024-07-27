import {
  CalendarOutlined,
  ContainerOutlined,
  CrownOutlined,
  DashboardOutlined,
  ProjectOutlined,
  ShopOutlined,
  TeamOutlined
} from "@ant-design/icons";
import { IResourceItem } from "@refinedev/core";

export const resources: IResourceItem[] = [
  {
    name: "dashboard",
    list: "/",
    meta: {
      label: "Dashboard",
      icon: <DashboardOutlined />
    }
  },
  {
    name: "events",
    list: "/calendar",
    create: "/calendar/create",
    edit: "/calendar/edit/:id",
    show: "/calendar/show/:id",
    meta: {
      label: "Calendar",
      icon: <CalendarOutlined />
    }
  },
  {
    name: "scrumboard",
    meta: {
      label: "Scrumboard",
      icon: <ProjectOutlined />
    }
  },

  {
    name: "tasks",
    list: "/scrumboard/kanban",
    create: "/scrumboard/kanban/create",
    edit: "/scrumboard/kanban/edit/:id",
    meta: {
      label: "Project Kanban",
      parent: "scrumboard"
    }
  },
  {
    name: "deals",
    list: "/scrumboard/sales",
    create: "/scrumboard/sales/create",
    edit: "/scrumboard/sales/edit/:id",
    meta: {
      label: "Sales Pipeline",
      parent: "scrumboard"
    }
  },
  {
    name: "companies",
    list: "/companies",
    create: "/companies/create",
    edit: "/companies/edit/:id",
    show: "/companies/show/:id",
    meta:{
      label:"Companies",
      icon: <ShopOutlined />,
    }
  },
  {
    name: "contacts",
    list: "/contacts",
    create: "/contacts/create",
    edit: "/contacts/edit/:id",
    show: "/contacts/show/:id",
    meta:{
      label:"Contact",
      icon: <TeamOutlined />,
    }
  },

  {
    name: "quotes",
    list: "/quotes",
    create: "/quotes/create",
    edit: "/quotes/edit/:id",
    show: "/quotes/show/:id",
    meta:{
      label:"Quotes",
      icon: <ContainerOutlined />
    }
  },
  {
    name: "administration",
    meta: {
      label: "Administration",
      icon: <CrownOutlined />
    }
  },
  {
    name: "setting",
    list: "/administration/setting",
    meta: {
      label: "Settings",
      parent: "administration"
    }
  },
  {
    name: "audits",
    list: "/administration/audit-log",
    meta: {
      label: "Audit Log",
      parent: "administration"
    }
  },
];
