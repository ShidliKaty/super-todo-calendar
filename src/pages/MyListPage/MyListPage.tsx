import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import PageContainer from "../../components/PageContainer/PageContainer";
import TodoList from "../../entities/Todos/ui/TodoList/TodoList";

const MyListPage = () => {
  const { name } = useParams();
  return (
    <PageContainer>
      <Header name={name} />
      <TodoList />
    </PageContainer>
  );
};

export default MyListPage;
