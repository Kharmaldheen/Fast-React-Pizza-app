import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utilities/helpers";
import { getTotalPizzaPrice } from "../cart/cartSlice";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const dispatch = useDispatch();
  const [withPriority, setWithPriority] = useState(false);
  const {
    userName,
    position,
    address,
    error: errorAddress,
    status: addressStatus,
  } = useSelector((store) => store.user);

  const isLoadingAddress = addressStatus === "loading";

  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const formError = useActionData();

  const cart = useSelector(getCart);
  const totalCartPrize = useSelector(getTotalPizzaPrice);

  const priorityPrice = (20 * totalCartPrize) / 100;

  const totalPrice = withPriority
    ? totalCartPrize + priorityPrice
    : totalCartPrize;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="py-8 px-4">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action='/order/new'> */}
      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={userName}
            required
          />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>

          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formError?.phone && (
              <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">
                {" "}
                <strong>{formError.phone}</strong>{" "}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === "error" && (
              <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">
                {" "}
                <strong>{errorAddress}</strong>{" "}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] z-50 top-[34px] sm:right-[4px] sm:top-[3px] md:right-[5px] md:top-[5px]">
              <Button
                type="small"
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                get Position
              </Button>
            </span>
          )}
        </div>

        <div className="flex items-center gap-5 mb-12 sm:mt-8">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />

          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Placing order"
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give the correct number, We might need it to contact you";

  if (Object.keys(errors).length > 0) return errors;

  // return null;

  // if everything is correct, create new order and redirect
  const neworderData = await createOrder(order);

  console.log(neworderData);

  //hack to communicate with the cart cause i don't have access to the useDispatch hooke function
  store.dispatch(clearCart());

  return redirect(`/order/${neworderData.id}`);
}

export default CreateOrder;
