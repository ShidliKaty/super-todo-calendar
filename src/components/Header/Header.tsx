import { HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { classNames } from "../../utils/classNames";
import { formatDate } from "../../utils/formatDate";
import AddButton from "../AddButton/AddButton";
import cls from "./Header.module.scss";
import { TodoModal } from "../../entities/Todos";

interface HeaderProps {
  className?: string;
  name?: string;
  noBtn?: boolean;
}

const Header = (props: HeaderProps) => {
  const { className, name = "Мои планы", noBtn } = props;

  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);

  const date = new Date();

  const formattedDate = formatDate(date, {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className={classNames(cls.Header, {}, [className])}>
      <HStack justify="space-between" mb="20px">
        <VStack align="flex-start" spacing={1}>
          <Heading as="h1" size="xl">
            {name}
          </Heading>
          <Text color="blackAlpha.600">Сегодня {formattedDate}</Text>
        </VStack>
        {!noBtn && <AddButton main onClick={() => setIsTodoModalOpen(true)} />}
        <TodoModal
          isOpen={isTodoModalOpen}
          onClose={() => setIsTodoModalOpen(false)}
        />
      </HStack>
    </div>
  );
};

export default Header;
