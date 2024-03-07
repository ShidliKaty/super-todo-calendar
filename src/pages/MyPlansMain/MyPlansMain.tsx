import Header from "../../components/Header/Header";
import PageContainer from "../../components/PageContainer/PageContainer";
import TodoList from "../../entities/Todos/ui/TodoList/TodoList";

const MyPlansMain = () => {
  return (
    <PageContainer>
      <Header />
      <TodoList />
    </PageContainer>
  );
};

export default MyPlansMain;
