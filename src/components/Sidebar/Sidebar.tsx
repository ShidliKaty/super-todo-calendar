import { CheckCircleIcon, StarIcon, SunIcon } from "@chakra-ui/icons";
import {
  Divider,
  HStack,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { Search } from "../../entities/Search/Search";
import { MiniLists } from "../../entities/SidebarLists/ui/MiniLists/MiniLists";
import { SidebarLists } from "../../entities/SidebarLists/ui/SidebarLists/SidebarLists";
import { classNames } from "../../utils/classNames";
import cls from "./Sidebar.module.scss";

interface SidebarProps {
  className?: string;
}

const Sidebar = (props: SidebarProps) => {
  const { className } = props;
  return (
    <div className={classNames(cls.Sidebar, {}, [className])}>
      <VStack spacing={5} align="flex-start">
        <Search />
        <List spacing={5}>
          <ListItem
            color="blackAlpha.600"
            _hover={{ color: "#6B46C1" }}
            cursor="pointer"
          >
            <Link to="/plans">
              <HStack spacing={0.5} paddingRight="60px">
                <ListIcon as={SunIcon} />
                <Text>Мои Планы</Text>
              </HStack>
            </Link>
          </ListItem>
          <ListItem
            color="blackAlpha.600"
            _hover={{ color: "#6B46C1" }}
            cursor="pointer"
          >
            <Link to="/important">
              <HStack spacing={0.5} paddingRight="60px">
                <ListIcon as={StarIcon} />
                <Text>Важно</Text>
              </HStack>
            </Link>
          </ListItem>
          <ListItem
            color="blackAlpha.600"
            _hover={{ color: "#6B46C1" }}
            cursor="pointer"
          >
            <Link to="/done">
              <HStack spacing={0.5} paddingRight="60px">
                <ListIcon as={CheckCircleIcon} />
                <Text>Завершено</Text>
              </HStack>
            </Link>
          </ListItem>
        </List>
        <Divider w="100%" borderColor="gray.300" />
      </VStack>
      <SidebarLists />
      <MiniLists />
    </div>
  );
};

export default Sidebar;
