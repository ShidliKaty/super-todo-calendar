import {
  Divider,
  HStack,
  Heading,
  Icon,
  List,
  ListIcon,
  ListItem,
  VStack,
} from "@chakra-ui/react";
import { FaListAlt } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import AddButton from "../AddButton/AddButton";

const ListsGroup = () => {
  return (
    <VStack align="flex-start" spacing={5} mt={5}>
      <HStack justify="space-between" w="100%">
        <Heading color="blackAlpha.600" size="md">
          Мои списки
        </Heading>
        <AddButton>
          <Icon as={BsPlusLg} boxSize={6} />
        </AddButton>
      </HStack>
      <List spacing={5}>
        <ListItem
          color="blackAlpha.600"
          _hover={{ color: "#6B46C1" }}
          cursor="pointer"
        >
          <ListIcon as={FaListAlt} />
          Список 1
        </ListItem>
        <ListItem
          color="blackAlpha.600"
          _hover={{ color: "#6B46C1" }}
          cursor="pointer"
        >
          <ListIcon as={FaListAlt} />
          Список 2
        </ListItem>
      </List>
      <Divider w="100%" />
    </VStack>
  );
};

export default ListsGroup;
