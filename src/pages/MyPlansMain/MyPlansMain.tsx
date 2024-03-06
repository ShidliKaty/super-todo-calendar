import Header from "../../components/Header/Header";
import PageContainer from "../../components/PageContainer/PageContainer";
import TodoList from "../../entities/TodoList/TodoList";

const MyPlansMain = () => {
  return (
    <PageContainer>
      <Header />
      <TodoList />
    </PageContainer>
  );
};

export default MyPlansMain;
