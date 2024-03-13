import Header from "../../components/Header/Header";
import PageContainer from "../../components/PageContainer/PageContainer";
import TodoListFilter from "../../entities/Todos/ui/TodoListFilter/TodoListFilter";

const ImportantPage = () => {
  return (
    <PageContainer>
      <Header name={"Важно"} />
      <TodoListFilter />
    </PageContainer>
  );
};

export default ImportantPage;
