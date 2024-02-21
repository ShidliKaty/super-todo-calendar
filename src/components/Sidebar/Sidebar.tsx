import {
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListIcon,
  ListItem,
  VStack,
} from "@chakra-ui/react";
import { classNames } from "../../lib/classNames";
import cls from "./Sidebar.module.scss";
import {
  CheckCircleIcon,
  SearchIcon,
  StarIcon,
  SunIcon,
} from "@chakra-ui/icons";

interface SidebarProps {
  className?: string;
}

const Sidebar = (props: SidebarProps) => {
  const { className } = props;
  return (
    <div className={classNames(cls.Sidebar, {}, [className])}>
      <VStack p={10} spacing={5} align="flex-start">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            variant="outline"
            borderColor="purple.300"
            backgroundColor="white"
            type="search"
            placeholder="Поиск"
          />
        </InputGroup>
        <List spacing={5}>
          <ListItem color="purple.500">
            <ListIcon as={SunIcon} />
            Мои Планы
          </ListItem>
          <ListItem color="purple.500">
            <ListIcon as={StarIcon} />
            Важно
          </ListItem>
          <ListItem color="purple.500">
            <ListIcon as={CheckCircleIcon} />
            Завершено
          </ListItem>
        </List>
      </VStack>
    </div>
  );
};

export default Sidebar;
