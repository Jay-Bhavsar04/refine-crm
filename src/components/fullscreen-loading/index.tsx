import { Spin } from "antd";

export const FullScreenloading = () => {
  return (
    <Spin
      size="large"
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    />
  );
};
