import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Button, HStack, Heading, Text } from "@chakra-ui/react";
import { Fragment } from "react";
import { classNames } from "../../../../utils/classNames";
import { todosMap } from "../../../../utils/todosMap";
import { useExpandedLists } from "../../../../utils/useExpandedLists";
import { SidebarList } from "../../../SidebarLists/types/sidebarListTypes";
import { Todo } from "../../types/todoTypes";
import TodoList from "../TodoList/TodoList";
import cls from "./ExpandedList.module.scss";

interface ExpandedListProps {
  lists: SidebarList[];
  todos: Todo[];
  isLoading?: boolean;
  error?: string;
}

export const ExpandedList = (props: ExpandedListProps) => {
  const { lists, todos, isLoading, error } = props;

  const myListTodosMap = todosMap({ lists, todos });

  const listsPlusOne: SidebarList[] = [
    { id: "0", name: "Общий список" },
    ...lists,
  ];

  const { expandedLists, toggleList } = useExpandedLists(listsPlusOne);

  return (
    <>
      {error && (
        <Text color="red.600">
          Произошла ошибка! Попробуйте перезагрузить страницу
        </Text>
      )}

      {/* <TodoList todos={myListTodosMap["0"] || []} isLoading={isLoading} /> */}
      {listsPlusOne.map((list) => {
        if (myListTodosMap[list.id] && myListTodosMap[list.id].length !== 0) {
          return (
            <Fragment key={list.id}>
              <HStack>
                <Heading as="h4" size="md">
                  {list.name}
                </Heading>
                <Button onClick={() => toggleList(list.id)}>
                  {expandedLists[list.id] ? (
                    <ChevronDownIcon boxSize={6} />
                  ) : (
                    <ChevronUpIcon boxSize={6} />
                  )}
                </Button>
              </HStack>
              <div
                className={classNames(
                  cls.animationContainer,
                  { [cls.hidden]: !expandedLists[list.id] },
                  []
                )}
              >
                <TodoList
                  todos={myListTodosMap[list.id] || []}
                  isLoading={isLoading}
                />
              </div>
            </Fragment>
          );
        }
      })}
    </>
  );
};
