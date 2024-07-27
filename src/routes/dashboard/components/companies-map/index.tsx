import { Text } from "@/components";
import { GlobalOutlined, RightCircleOutlined } from "@ant-design/icons";
import { useNavigation } from "@refinedev/core";
import { Button, Card, Skeleton } from "antd";

import Countries from "./countries.json";
import styles from "./index.module.css";
import { Suspense } from "react";
import { Map } from "./map";



export const DashboardCompanies = () => {
  const { list } = useNavigation();
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
          <GlobalOutlined />
          <Text size="md" className="secondary" style={{ marginLeft: "8px" }}>
            Companies
          </Text>
        </div>
      }
      extra={
        <Button
          icon={<RightCircleOutlined />}
          onClick={() => list("companies")}
        >
          See all companies
        </Button>
      }
    >
      <div style={{ height: "318px", marginTop: "2px", position: "relative" }}>
        <Suspense>
          <Map />
        </Suspense>
      </div>
      <div className={styles.countries}>
        {Countries.map((country) => {
          return (
            <div className={styles.item} key={country.id}>
              <img
                className={styles.flag}
                src={country.flag}
                alt={`${country.name} flag`}
                width={14}
                height={7}
              />
              <div>{country.shortName}</div>
              {country.count}
            </div>
          );
        })}
      </div>
    </Card>
  );
};
