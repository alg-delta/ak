import React from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

export default function Cart(props) {
  const { cartItems, add, remove, buy } = props;

  const totalPrice = cartItems.reduce(
    (sum, product) => sum + product.price * product.number,
    0
  );

  const priceTr = cartItems.reduce((sum, product) => totalPrice - 150, 0);

  function Header({ disabled }) {
    if (disabled) {
      return null; // Повертаємо null, щоб компонент не відображався
    }

    return <div></div>;
  }

  return (
    <div className="white">
      <Alert variant="success">
        <Alert.Heading>Корзина</Alert.Heading>
        {cartItems.length === 0 && <p>Корзина порожня</p>}
        <table>
          <tr>
            <td width="25%">Назва</td>
            <td width="33%">Кількість</td>
            <td width="25%">Ціна</td>
            <td width="25%">Всього</td>
          </tr>
          {cartItems.map((product) => (
            <tr>
              <td width="25%">{product.name}</td>
              <td width="25%">
                <Button onClick={() => remove(product)} variant="danger">
                  -
                </Button>
                {product.number}
                <Button onClick={() => add(product)} variant="success">
                  +
                </Button>
              </td>
              <td width="25%">{product.price}грн</td>
              <td width="25%">{product.price * product.number}грн</td>
            </tr>
          ))}
        </table>
        <hr />
        <p className="mb-0">
          Загалом:{totalPrice} з скідкой:{priceTr}
        </p>
        <Header priceTr={priceTr} />
        {/* Інші елементи вашого Cart компонента */}
        <Button
          onClick={buy}
          variant="success"
          disabled={cartItems.length === 0}
        >
          Оформити замовлення
        </Button>
      </Alert>
    </div>
  );
}
