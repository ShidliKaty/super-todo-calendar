import { HStack, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import { classNames } from "../../lib/classNames";
import AddButton from "../AddButton/AddButton";
import { BsPlusLg } from "react-icons/bs";
import cls from "./Header.module.scss";

interface HeaderProps {
  className?: string;
}

const Header = (props: HeaderProps) => {
  const { className } = props;
  return (
    <div className={classNames(cls.Header, {}, [className])}>
      <HStack justify="space-between">
        <VStack align="flex-start" spacing={1}>
          <Heading as="h1" size="xl">
            Мои Планы
          </Heading>
          <Text color="blackAlpha.600">Четверг, 22 фев 2024</Text>
        </VStack>
        <AddButton>
          <Icon as={BsPlusLg} boxSize={6} />
        </AddButton>
      </HStack>
    </div>
  );
};

export default Header;