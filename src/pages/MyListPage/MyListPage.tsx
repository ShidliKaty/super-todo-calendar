import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import PageContainer from "../../components/PageContainer/PageContainer";
import TodoListFilter from "../../entities/Todos/ui/TodoListFilter/TodoListFilter";

const MyListPage = () => {
  const { name, id } = useParams();
  return (
    <PageContainer>
      <Header name={name} />
      <TodoListFilter id={id} />
    </PageContainer>
  );
};

export default MyListPage;
