import Header from "../../components/Header/Header";
import PageContainer from "../../components/PageContainer/PageContainer";
import { DoneList } from "./DoneList";

const DonePage = () => {
  return (
    <PageContainer>
      <Header name={"Завершено"} />
      <DoneList />
    </PageContainer>
  );
};

export default DonePage;
