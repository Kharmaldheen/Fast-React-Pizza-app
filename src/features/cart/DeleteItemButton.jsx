import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

function DeleteItemButton({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button onClick={() => dispatch(deleteItem(pizzaId))} type="small">
      delete
    </Button>
  );
}

export default DeleteItemButton;
