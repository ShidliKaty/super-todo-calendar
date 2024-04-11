import Header from "../../components/Header/Header";
import PageContainer from "../../components/PageContainer/PageContainer";
import { Calendar } from "../../entities/Calendar";

const CalendarPage = () => {
  return (
    <PageContainer>
      <Header name={"Календарь"} noBtn />
      <Calendar />
    </PageContainer>
  );
};

export default CalendarPage;
