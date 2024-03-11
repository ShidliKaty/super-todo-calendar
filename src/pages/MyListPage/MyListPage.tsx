import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import PageContainer from "../../components/PageContainer/PageContainer";
import TodoList from "../../entities/Todos/ui/TodoList/TodoList";

const MyListPage = () => {
  const { name, id } = useParams();
  return (
    <PageContainer>
      <Header name={name} />
      <TodoList id={id} />
    </PageContainer>
  );
};

export default MyListPage;
