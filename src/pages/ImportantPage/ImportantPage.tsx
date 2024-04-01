import Header from "../../components/Header/Header";
import PageContainer from "../../components/PageContainer/PageContainer";
import { ImportantList } from "./ImportantList";

const ImportantPage = () => {
  return (
    <PageContainer>
      <Header name={"Важно"} />
      <ImportantList />
    </PageContainer>
  );
};

export default ImportantPage;
