import {
  Box,
  Button,
  HStack,
  Icon,
  ListIcon,
  ListItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  VStack,
  Text,
} from "@chakra-ui/react";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import { FaListAlt } from "react-icons/fa";
import { SidebarList } from "../../types";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

interface ListsItemProps {
  list: SidebarList;
}

const ListsItem = (props: ListsItemProps) => {
  const { list } = props;
  return (
    <ListItem
      key={list.id}
      color="blackAlpha.600"
      _hover={{ color: "#6B46C1" }}
      cursor="pointer"
    >
      <HStack justify="space-between" w="100%">
        <HStack spacing={0.5}>
          <ListIcon as={FaListAlt} />
          <Text>{list.name}</Text>
        </HStack>
        <Popover>
          <PopoverTrigger>
            <Box as="button">
              <Icon as={PiDotsThreeOutlineVerticalBold}></Icon>
            </Box>
          </PopoverTrigger>
          <Portal>
            <PopoverContent w="50px">
              <VStack p={1} spacing={1}>
                <Button
                  p="8px"
                  variant="ghost"
                  color="blackAlpha.600"
                  _hover={{ color: "#6B46C1" }}
                  alignItems="center"
                >
                  <EditIcon />
                </Button>
                <Button
                  p="8px"
                  variant="ghost"
                  color="blackAlpha.600"
                  _hover={{ color: "#6B46C1" }}
                >
                  <DeleteIcon />
                </Button>
              </VStack>
            </PopoverContent>
          </Portal>
        </Popover>
      </HStack>
    </ListItem>
  );
};

export default ListsItem;
