import { Text } from "@/components";
import { LatestActivitiesAuditsQuery, LatestActivitiesDealsQuery } from "@/graphql/types";

import { UnorderedListOutlined } from "@ant-design/icons";
import { useList } from "@refinedev/core";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { Card, Skeleton as AntdSkeleton, Avatar } from "antd";
import { AUDITS_QUERY, DEALS_QUERY } from "./queries";

import styles from "./index.module.css";
import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const DashboardLatestActivities: React.FC<{ limit?: number }> = ({
  limit = 5
}) => {
  const { data: deals, isLoading: isLoadingDeals } = useList<
    GetFieldsFromList<LatestActivitiesDealsQuery>
  >({
    resource: "deals",
    pagination: {
      mode: "off"
    },
    meta: {
      gqlQuery: DEALS_QUERY
    }
  });
  const {
    data: audit,
    isLoading: isLoadingAudit,
    isError,
    error
  } = useList<GetFieldsFromList<LatestActivitiesAuditsQuery>>({
    resource: "audits",
    pagination: {
      pageSize: limit
    },
    sorters: [
      {
        field: "createdAt",
        order: "desc"
      }
    ],
    filters: [
      {
        field: "action",
        operator: "in",
        value: ["CREATE", "UPDATE"]
      },
      {
        field: "targetEntity",
        operator: "eq",
        value: "Deal"
      }
    ],
    meta: {
      gqlQuery: AUDITS_QUERY
    }
  });

  if (isError) {
    console.error("Error fetching latest activities", error);
    return null;
  }

  const isLoading = isLoadingAudit || isLoadingDeals;

  return (
    <Card
      style={{ height: "100%", padding: 0 }}
      headStyle={{ backgroundColor: "#fafafa", padding: "8px 16px" }}
      bodyStyle={{
        padding: "8px 8px 8px 12px"
      }}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            whiteSpace: "nowrap"
          }}
        >
          <UnorderedListOutlined />
          <Text size="md" className="secondary" style={{ marginLeft: "8px" }}>
            Latest Activity
          </Text>
        </div>
      }
    >
      {isLoading &&
        Array.from({ length: limit }).map((_, index) => (
          <Skeleton key={index} />
        ))}

      {!isLoading &&
        audit?.data.map(({ id, user, createdAt, action, targetId }) => {
          const deal =
            deals?.data.find((task) => task.id === `${targetId}`) || undefined;
          return (
            <div key={id} className={styles.item}>
              <div className={styles.avatar}>
                <Avatar
                  size={48}
                  shape="square"
                  src={deal?.company.avatarUrl}
                />
              </div>
              <div className={styles.action}>
                <Text size="xs" type="secondary">
                  {dayjs(createdAt).fromNow()}
                </Text>
                <Text className={styles.details}>
                  <Text strong size="md" className={styles.name}>
                    {user?.name}
                  </Text>
                  <Text>{action === "CREATE" ? " created " : " moved "}</Text>
                  <Text strong>{deal?.title}</Text>
                  <Text> deal </Text>
                  <Text strong>{action === "CREATE" ? " in " : " to "}</Text>
                  <Text strong>{deal?.stage?.title || "Unassigned"}</Text>
                </Text>
              </div>
            </div>
          );
        })}
    </Card>
  );
};

const Skeleton = () => {
  return (
    <div className={styles.item}>
      <AntdSkeleton.Avatar
        active
        size={48}
        shape="square"
        style={{
          borderRadius: "4px",
          marginRight: "16px"
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <AntdSkeleton.Button
          active
          style={{
            height: "16px"
          }}
        />
        <AntdSkeleton.Button
          active
          style={{
            width: "300px",
            height: "16px"
          }}
        />
      </div>
    </div>
  );
};
