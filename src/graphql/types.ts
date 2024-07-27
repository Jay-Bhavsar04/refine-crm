import type * as Types from "./schema.types";

export type LatestActivitiesDealsQueryVariables = Types.Exact<{
  filter: Types.DealFilter;
  sorting: Array<Types.DealSort> | Types.DealSort;
  paging: Types.OffsetPaging;
}>;

export type UpcomingEventsQuery = {
  events: Pick<Types.EventConnection, "totalCount"> & {
    nodes: Array<
      Pick<Types.Event, "id" | "title" | "color" | "startDate" | "endDate">
    >;
  };
};

export type LatestActivitiesDealsQuery = {
  deals: {
    nodes: Array<
      Pick<Types.Deal, "id" | "title"> & {
        stage?: Types.Maybe<Pick<Types.DealStage, "id" | "title">>;
        company: Pick<Types.Company, "id" | "name" | "avatarUrl">;
      }
    >;
  };
};

export type DashboardTotalRevenueQueryVariables = Types.Exact<{
  filter: Types.DealStageFilter;
  sorting?: Types.InputMaybe<Array<Types.DealStageSort> | Types.DealStageSort>;
  paging: Types.OffsetPaging;
}>;

export type LatestActivitiesAuditsQueryVariables = Types.Exact<{
  filter: Types.AuditFilter;
  sorting: Array<Types.AuditSort> | Types.AuditSort;
  paging: Types.OffsetPaging;
}>;

export type LatestActivitiesAuditsQuery = {
  audits: {
    nodes: Array<
      Pick<
        Types.Audit,
        "id" | "action" | "targetEntity" | "targetId" | "createdAt"
      > & {
        changes: Array<Pick<Types.AuditChange, "field" | "from" | "to">>;
        user?: Types.Maybe<Pick<Types.User, "id" | "name" | "avatarUrl">>;
      }
    >;
  };
};

export type DashboardDealsChartQueryVariables = Types.Exact<{
  filter: Types.DealStageFilter;
  sorting?: Types.InputMaybe<Array<Types.DealStageSort> | Types.DealStageSort>;
  paging: Types.OffsetPaging;
}>;

export type DashboardDealsChartQuery = {
  dealStages: {
    nodes: Array<
      Pick<Types.DealStage, "title"> & {
        dealsAggregate: Array<{
          groupBy?: Types.Maybe<
            Pick<
              Types.DealStageDealsAggregateGroupBy,
              "closeDateMonth" | "closeDateYear"
            >
          >;
          sum?: Types.Maybe<Pick<Types.DealStageDealsSumAggregate, "value">>;
        }>;
      }
    >;
  };
};

export type DashboardTasksChartQueryVariables = Types.Exact<{
  filter: Types.TaskStageFilter;
  sorting?: Types.InputMaybe<Array<Types.TaskStageSort> | Types.TaskStageSort>;
  paging: Types.OffsetPaging;
}>;

export type DashboardTasksChartQuery = {
  taskStages: {
    nodes: Array<
      Pick<Types.TaskStage, "title"> & {
        tasksAggregate: Array<{
          count?: Types.Maybe<Pick<Types.TaskStageTasksCountAggregate, "id">>;
        }>;
      }
    >;
  };
};

export type DashboardTotalCountsQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type DashboardTotalCountsQuery = {
  companies: Pick<Types.CompanyConnection, "totalCount">;
  contacts: Pick<Types.ContactConnection, "totalCount">;
  deals: Pick<Types.DealConnection, "totalCount">;
};

export type DashboardTotalRevenueQuery = {
  dealStages: {
    nodes: Array<
      Pick<Types.DealStage, "title"> & {
        dealsAggregate: Array<{
          sum?: Types.Maybe<Pick<Types.DealStageDealsSumAggregate, "value">>;
        }>;
      }
    >;
  };
};

export type EventCategoriesQuery = {
  eventCategories: Pick<Types.EventCategoryConnection, "totalCount"> & {
    nodes: Array<Pick<Types.EventCategory, "id" | "title">>;
  };
};

export type UsersSelectQuery = {
  users: { nodes: Array<Pick<Types.User, "id" | "name" | "avatarUrl">> };
};


export type NotificationsQuery = {
  audits: Pick<Types.AuditConnection, "totalCount"> & {
    nodes: Array<
      Pick<
        Types.Audit,
        "id" | "action" | "targetEntity" | "targetId" | "createdAt"
      > & {
        user?: Types.Maybe<Pick<Types.User, "id" | "name" | "avatarUrl">>;
      }
    >;
  };
};

export type NotificationsDealsQuery = {
  deals: {
    nodes: Array<
      Pick<Types.Deal, "id" | "title"> & {
        stage?: Types.Maybe<Pick<Types.DealStage, "id" | "title">>;
        company: Pick<Types.Company, "id" | "name" | "avatarUrl">;
      }
    >;
  };
};

export type AdministrationUsersQuery = {
  users: Pick<Types.UserConnection, "totalCount"> & {
    nodes: Array<
      Pick<Types.User, "id" | "name" | "jobTitle" | "role" | "avatarUrl">
    >;
  };
};

export type ContactsListQuery = {
  contacts: Pick<Types.ContactConnection, "totalCount"> & {
    nodes: Array<
      Pick<
        Types.Contact,
        "id" | "name" | "email" | "jobTitle" | "status" | "avatarUrl"
      > & { company: Pick<Types.Company, "id" | "name" | "avatarUrl"> }
    >;
  };
};


export type KanbanTasksQuery = {
  tasks: Pick<Types.TaskConnection, "totalCount"> & {
    nodes: Array<
      Pick<
        Types.Task,
        "id" | "title" | "description" | "dueDate" | "completed" | "stageId"
      > & {
        checklist: Array<Pick<Types.CheckListItem, "title" | "checked">>;
        users: Array<Pick<Types.User, "id" | "name" | "avatarUrl">>;
        comments: Pick<Types.TaskCommentsConnection, "totalCount">;
      }
    >;
  };
};


export type KanbanTaskStagesQuery = {
  taskStages: Pick<Types.TaskStageConnection, "totalCount"> & {
    nodes: Array<Pick<Types.TaskStage, "id" | "title">>;
  };
};  


export type AdministrationAuditLogsQuery = {
  audits: Pick<Types.AuditConnection, "totalCount"> & {
    nodes: Array<
      Pick<
        Types.Audit,
        "id" | "action" | "targetEntity" | "targetId" | "createdAt"
      > & {
        user?: Types.Maybe<Pick<Types.User, "id" | "name" | "avatarUrl">>;
        changes: Array<Pick<Types.AuditChange, "field" | "from" | "to">>;
      }
    >;
  };
};