import { Button, ButtonGroup, HStack, Text } from "@chakra-ui/react";

export const CalendarHeader = () => {
  return (
    <HStack justify="flex-start" align="center">
      <Button>Today</Button>
      <ButtonGroup>
        <Button>P</Button>
        <Button>N</Button>
        <Text fontSize="20px" lineHeight="40px">
          April 2024
        </Text>
      </ButtonGroup>
    </HStack>
  );
};
