// import Button from "../../ui/Button";
import { formatCurrency } from "../../utilities/helpers";
import UpdateItemQuantity from "./UpdateItemQuantity";

import DeleteItemButton from "./deleteItemButton";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  // function handleDeleteItem() {
  //   dispatch(deleteItem(pizzaId));
  // }

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6 ">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity quantity={quantity} pizzaId={pizzaId} />
        <DeleteItemButton pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
