import { HStack, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import { BsPlusLg } from "react-icons/bs";
import TodoModal from "../../entities/TodoFormModal/ui/TodoModal/TodoModal";
import { classNames } from "../../utils/classNames";
import AddButton from "../AddButton/AddButton";
import cls from "./Header.module.scss";
import { useState } from "react";
import { formatDate } from "../../utils/formatDate";

interface HeaderProps {
  className?: string;
  name?: string;
}

const Header = (props: HeaderProps) => {
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);

  const date = new Date();

  const formattedDate = formatDate(date, {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const { className, name = "Мои планы" } = props;
  return (
    <div className={classNames(cls.Header, {}, [className])}>
      <HStack justify="space-between">
        <VStack align="flex-start" spacing={1}>
          <Heading as="h1" size="xl">
            {name}
          </Heading>
          <Text color="blackAlpha.600">Сегодня {formattedDate}</Text>
        </VStack>
        <AddButton onClick={() => setIsTodoModalOpen(true)}>
          <Icon as={BsPlusLg} boxSize={6} />
        </AddButton>
        <TodoModal
          isOpen={isTodoModalOpen}
          onClose={() => setIsTodoModalOpen(false)}
        />
      </HStack>
    </div>
  );
};

export default Header;
