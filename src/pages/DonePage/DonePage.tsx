import Header from "../../components/Header/Header";
import PageContainer from "../../components/PageContainer/PageContainer";
import TodoListFilter from "../../entities/Todos/ui/TodoListFilter/TodoListFilter";

const DonePage = () => {
  return (
    <PageContainer>
      <Header name={"Завершено"} />
      <TodoListFilter />
    </PageContainer>
  );
};

export default DonePage;
