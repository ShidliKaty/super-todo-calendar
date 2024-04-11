import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import PageContainer from "../../components/PageContainer/PageContainer";
import { makeSelectListById } from "../../entities/Sidebar/SidebarLists/model/selectors/getSidebarListById";
import { getSidebarLists } from "../../entities/Sidebar/SidebarLists/model/selectors/sidebarLists";
import { StateSchema } from "../../redux/store";
import { MyList } from "./MyList";

const MyListPage = () => {
  const { id } = useParams();

  const getListById = makeSelectListById(getSidebarLists);

  const list = useSelector((state: StateSchema) => getListById(state, id));

  return (
    <PageContainer>
      <Header name={list?.name} />
      <MyList id={id} />
    </PageContainer>
  );
};

export default MyListPage;
