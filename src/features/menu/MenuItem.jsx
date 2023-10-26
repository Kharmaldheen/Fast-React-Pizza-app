import { formatCurrency } from "../../utilities/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";

import { addItem } from "../cart/cartSlice";

import DeleteItemButton from "../cart/deleteItemButton";

import { getCurrentQuantityById } from "../cart/cartSlice";

import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentQuantity = useSelector(getCurrentQuantityById(id));

  const isInCart = currentQuantity > 0;

  console.log(currentQuantity);

  function handleAddCart() {
    const newPizzaitem = {
      pizzaId: id,
      name: name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newPizzaitem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex flex-col grow pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm uppercase font-medium text-stone-500">
              Sold out
            </p>
          )}

          {isInCart && (
            <div className="flex items-center gap-2 md:gap-3">
              <UpdateItemQuantity pizzaId={id} quantity={currentQuantity} />
              <DeleteItemButton pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddCart}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
