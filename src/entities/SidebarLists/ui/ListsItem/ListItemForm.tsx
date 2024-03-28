import { FormEvent, useCallback, useEffect, useRef } from "react";
import { useAppDispatch } from "../../../../redux/store";
import { addSidebarList } from "../../model/services/addSidebarList";
import { updateListName } from "../../model/services/updateListName";

interface ListItemFormProps {
  listName?: string;
  isEdit?: boolean;
  listId?: string;
  isNew?: boolean;
  secondary?: boolean;
  onCloseForm: () => void;
}

const ListItemForm = (props: ListItemFormProps) => {
  const { listName, isEdit, isNew, secondary, onCloseForm, listId } = props;

  const nameRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const addNewList = useCallback(() => {
    const inputValue = nameRef.current?.value.trim();
    if (inputValue && inputValue !== "") {
      const newList = {
        id: crypto.randomUUID(),
        name: inputValue,
        secondary: secondary,
      };
      dispatch(addSidebarList(newList));
    }
  }, [dispatch, secondary]);

  const updateList = useCallback(() => {
    const inputValue = nameRef.current?.value.trim();
    if (inputValue && listId) {
      dispatch(updateListName({ id: listId, name: inputValue }));
    }
  }, [dispatch, listId]);

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
