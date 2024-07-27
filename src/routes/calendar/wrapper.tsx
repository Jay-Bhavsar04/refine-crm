import { CalendarUpcomingEvents } from "@/components/calendar/upcoming-event";
import { CreateButton } from "@refinedev/antd";
import { Col, Row } from "antd";
import { CalendarCategories } from "./components";
import { CalendarPage } from "./components/calendar";

export const CalendarPageWrapper: React.FC<React.PropsWithChildren> = () => {
  // const [selectedEventCategory, setSelectedEventCategory] = useState<string[]>(
  //   []
  // );
  return (
    <div className="page-container">
      <Row gutter={[32, 32]}>
        <Col xs={24} xl={6}>
          <CreateButton block size="large" style={{ marginBottom: "1rem" }}>
            Create event
          </CreateButton>

          <CalendarUpcomingEvents
            limit={3}
            cardProps={{ style: { marginBottom: "1rem" } }}
          />
          <CalendarCategories />
        </Col>
        <Col xs={24} xl={18}>
          <CalendarPage />
        </Col>
      </Row>
    </div>
  );
};
