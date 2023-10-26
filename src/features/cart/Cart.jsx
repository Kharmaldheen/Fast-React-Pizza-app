import { Link } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { getCart, getUsername, clearCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";
import { getTotalPizzaPrice } from "./cartSlice";
import { formatCurrency } from "../../utilities/helpers";

function Cart() {
  const userName = useSelector(getUsername);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  const totalPizzaPrice = useSelector(getTotalPizzaPrice);

  function handleClearCart() {
    dispatch(clearCart());
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {userName}</h2>

      <ul className="divide-y divide-stone-200 border-b mt-3">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-4">
        <Button type="primary" to="/order/new">
          Order pizzas ({formatCurrency(totalPizzaPrice)})
        </Button>
        {/* <Link to="/order/new">Order pizzas</Link> */}

        <Button onClick={handleClearCart} type="secondary">
          Clear cart
        </Button>
        {/* <button>Clear cart</button> */}
      </div>
    </div>
  );
}

export default Cart;
