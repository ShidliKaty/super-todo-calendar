import {
  CheckCircleIcon,
  SearchIcon,
  StarIcon,
  SunIcon,
} from "@chakra-ui/icons";
import {
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListIcon,
  ListItem,
  VStack,
} from "@chakra-ui/react";

import { classNames } from "../../lib/classNames";
import ListsGroup from "../../entities/SidebarLists/ui/ListsGroup/ListsGroup";
import cls from "./Sidebar.module.scss";

interface SidebarProps {
  className?: string;
}

const Sidebar = (props: SidebarProps) => {
  const { className } = props;
  return (
    <div className={classNames(cls.Sidebar, {}, [className])}>
      <VStack spacing={5} align="flex-start">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            variant="outline"
            borderColor="purple.300"
            backgroundColor="white"
            borderRadius="50"
            type="search"
            color="black"
            placeholder="Поиск"
            focusBorderColor="purple.600"
            _hover={{ borderColor: "purple.300" }}
          />
        </InputGroup>
        <List spacing={5}>
          <ListItem
            color="blackAlpha.600"
            _hover={{ color: "#6B46C1" }}
            cursor="pointer"
          >
            <ListIcon as={SunIcon} />
            Мои Планы
          </ListItem>
          <ListItem
            color="blackAlpha.600"
            _hover={{ color: "#6B46C1" }}
            cursor="pointer"
          >
            <ListIcon as={StarIcon} />
            Важно
          </ListItem>
          <ListItem
            color="blackAlpha.600"
            _hover={{ color: "#6B46C1" }}
            cursor="pointer"
          >
            <ListIcon as={CheckCircleIcon} />
            Завершено
          </ListItem>
        </List>
        <Divider w="100%" borderColor="gray.300" />
      </VStack>

      <ListsGroup />
    </div>
  );
};

export default Sidebar;
