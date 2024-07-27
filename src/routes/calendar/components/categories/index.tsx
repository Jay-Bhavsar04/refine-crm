import React from "react";
import { Button, Card, Checkbox, Skeleton as AntSkeleton } from "antd";
import { FlagTwoTone, SettingOutlined } from "@ant-design/icons";
import { Text } from "@/components";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useList } from "@refinedev/core";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { EventCategoriesQuery } from "@/graphql/types";
import { EVENT_CATEGORIES_QUERY } from "@/graphql/queries";

import styles from "./index.module.css";

type CalendarCategoriesProps = {
  onChange?: (e: CheckboxChangeEvent) => void;
};

const Skeleton: React.FC = () => {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <AntSkeleton.Button active style={{ height: "10px", width: "10px" }} />
        <AntSkeleton.Button style={{ height: "10px", width: "90%" }} />
      </div>
    </div>
  );
};

export const CalendarCategories: React.FC<CalendarCategoriesProps> = ({
  onChange,
  ...rest
}) => {
  const { data, isLoading } = useList<GetFieldsFromList<EventCategoriesQuery>>({
    resource: "eventCategories",
    meta: {
      gqlQuery: EVENT_CATEGORIES_QUERY
    }
  });

  return (
    <Card
      title={
        <span>
          <FlagTwoTone />
          <Text size="sm" style={{ paddingLeft: "10px" }}>
            Category
          </Text>
        </span>
      }
      extra={<Button shape="circle" icon={<SettingOutlined />} />}
    >
      {isLoading &&
        Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} />)}

      {!isLoading && (
        <div className={styles.container}>
          {data?.data.map((item) => (
            <div key={item.id} className={styles.category}>
              <Checkbox
                className={styles.checkbox}
                value={item.id}
                onChange={onChange}
              />
              <Text>{item.title}</Text>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
