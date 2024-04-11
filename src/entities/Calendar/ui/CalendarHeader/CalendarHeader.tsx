import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, HStack, Text } from "@chakra-ui/react";

export const CalendarHeader = () => {
  return (
    <HStack justify="flex-start" alignItems="center">
      <Button colorScheme="purple" variant="solid" size="sm" mr="10px">
        Сегодня
      </Button>
      <Text as="b" fontSize="20px" lineHeight="40px" mr="10px">
        Апрель, 2024
      </Text>
      <ButtonGroup colorScheme="purple" variant="solid" size="xs" spacing={1}>
        <Button>
          <ChevronLeftIcon />
        </Button>
        <Button>
          <ChevronRightIcon />
        </Button>
      </ButtonGroup>
    </HStack>
  );
};
