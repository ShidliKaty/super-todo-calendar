import Header from "../../components/Header/Header";
import PageContainer from "../../components/PageContainer/PageContainer";
import TodoListFilter from "../../entities/Todos/ui/TodoListFilter/TodoListFilter";

const MyPlansMain = () => {
  return (
    <PageContainer>
      <Header />
      <TodoListFilter />
    </PageContainer>
  );
};

export default MyPlansMain;
