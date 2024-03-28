import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import PageContainer from "../../components/PageContainer/PageContainer";
import TodoListFilter from "../../entities/Todos/ui/TodoListFilter/TodoListFilter";
import { makeSelectListById } from "../../entities/SidebarLists/model/selectors/getSidebarListById";
import { useSelector } from "react-redux";
import { StateSchema } from "../../redux/store";
import { getSidebarLists } from "../../entities/SidebarLists/model/selectors/sidebarLists";

const MyListPage = () => {
  const { id } = useParams();

  const getListById = makeSelectListById(getSidebarLists);

  const list = useSelector((state: StateSchema) => getListById(state, id));

  return (
    <PageContainer>
      <Header name={list?.name} />
      <TodoListFilter id={id} />
    </PageContainer>
  );
};

export default MyListPage;
