import { FormEvent, useCallback, useEffect, useRef } from "react";
import { SidebarList } from "../../types/sidebarListTypes";

interface ListItemFormProps {
  listName?: string;
  isEdit?: boolean;
  listId?: string;
  isNew?: boolean;
  onCloseForm: () => void;
  addSidebarList?: (newList: SidebarList) => void;
  updateListName?: (updatedList: SidebarList) => void;
}

const ListItemForm = (props: ListItemFormProps) => {
  const {
    listName,
    isEdit,
    isNew,
    onCloseForm,
    listId,
    addSidebarList,
    updateListName,
  } = props;

  const nameRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const addNewList = useCallback(() => {
    const inputValue = nameRef.current?.value.trim();
    if (inputValue && inputValue !== "") {
      const newList = {
        id: crypto.randomUUID(),
        name: inputValue,
      };
      addSidebarList && addSidebarList(newList);
    }
  }, [addSidebarList]);

  const updateList = useCallback(() => {
    const inputValue = nameRef.current?.value.trim();
    if (inputValue && listId) {
      updateListName && updateListName({ id: listId, name: inputValue });
    }
  }, [updateListName, listId]);

  const handleItemBlur = useCallback(() => {
    const inputValue = nameRef.current?.value.trim();
    if (isNew && inputValue === "") {
      onCloseForm();
    }

    if (isNew) {
      addNewList();
    }

    if (isEdit) {
      updateList();
    }

    onCloseForm();
  }, [isNew, onCloseForm, addNewList, isEdit, updateList]);

  useEffect(() => {
    const input = nameRef?.current;
    if (input) {
      input.addEventListener("blur", handleItemBlur);

      return () => input.addEventListener("blur", handleItemBlur);
    }
  }, [handleItemBlur]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    handleItemBlur();
  }

  return (
    <div ref={formRef}>
      <form onSubmit={handleSubmit}>
        <input autoFocus type="text" defaultValue={listName} ref={nameRef} />
      </form>
    </div>
  );
};

export default ListItemForm;
