import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import PageContainer from "../../components/PageContainer/PageContainer";
import MiniTodoListGroup from "../../entities/MiniTodos/ui/MiniTodoListGroup/MiniTodoListGroup";
import { makeSelectListById } from "../../entities/SidebarLists/model/selectors/getSidebarListById";
import { getMiniLists } from "../../entities/SidebarLists/model/selectors/miniLists";
import { StateSchema } from "../../redux/store";

const MyMiniListPage = () => {
  const { id } = useParams();

  const getListById = makeSelectListById(getMiniLists);

  const list = useSelector((state: StateSchema) => getListById(state, id));

  return (
    <PageContainer>
      <Header name={list?.name} isMini />
      <MiniTodoListGroup id={id} />
    </PageContainer>
  );
};

export default MyMiniListPage;
