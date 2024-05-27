import React, { useState, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Components.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";

import Product from "./Product.js";
import Row from "react-bootstrap/Row";
import Cart from "./Cart.js";
import Form from "react-bootstrap/Form";
import GodMod from "./GodMod.js";

const CreateProfile = React.lazy(() => import("./Contact.js"));

export default function Header(props) {
  const { products } = props;

  const [showProfile, setShowProfile] = useState(false);

  const [buttonVisible, setButtonVisible] = useState(true);

  const [password, setPassword] = useState("");

  const [isGodMod, setIsGodMod] = useState(false);

  const handleCreateProfileClick = () => {
    setShowProfile(true);
    setButtonVisible(false); // Скрыть кнопку после нажатия
  };

  const [cartItems, setCartItems] = useState([]);

  const add = (product) => {
    const productInCart = cartItems.find((item) => item.id === product.id);
    if (productInCart) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...productInCart, number: productInCart.number + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, number: 1 }]);
    }
  };

  const remove = (product) => {
    const productInCart = cartItems.find((item) => item.id === product.id);
    if (productInCart.number !== 1) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...productInCart, number: productInCart.number - 1 }
            : item
        )
      );
    } else {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    }
  };

  const buy = () => {
    if (showProfile) {
      setCartItems([]);
      alert(
        "Ваше замовлення прийнято! Вся інша інформація є в вкладці контакти"
      );
    } else {
      alert("Спочатку створіть акаунт.");
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, product) => sum + product.price * product.number,
    0
  );

  const godMod = () => {
    if (password === "iIi34") {
      setIsGodMod(true);
    }
  };

  return (
    <div className="black, white">
      <Tabs
        defaultActiveKey="profile"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="home" title="Магазин" className="tab">
          <Row className="gap-4 justify-content-center">
            {products.map((product) => (
              <Product key={product.id} product={product} add={add} />
            ))}
          </Row>
        </Tab>
        <Tab eventKey="profile" title="Профіль">
          {buttonVisible && ( // Показывать кнопку, если buttonVisible равен true
            <Button
              variant="warning"
              type="button"
              onClick={handleCreateProfileClick}
            >
              Створити Профіль
            </Button>
          )}
          <Suspense fallback={<div>Loading...</div>}>
            {showProfile && <CreateProfile />}
          </Suspense>
        </Tab>
        <Tab eventKey="longer-tab" title="Корзина" className="tab">
          <Cart cartItems={cartItems} remove={remove} add={add} buy={buy} />
        </Tab>
        <Tab eventKey="contact" title="Контакти" className="tab">
          <div className="bgbuy, center">
            <h1>Ваши закази:</h1>
            <table>
              <tr>
                <td width="25%">Назва</td>
                <td width="33%">Кількість</td>
                <td width="25%">Всього</td>
              </tr>
              {cartItems.map((product) => (
                <tr>
                  <td width="25%">{product.name}</td>
                  <td width="25%">{product.number}</td>
                  <td width="25%">{product.price * product.number}грн</td>
                </tr>
              ))}
            </table>
            <p>
              Всього заплатіть за цей заказ:{totalPrice}грн. Для покупки нажміть
              сюди⬇
            </p>
            <div className="buy">
              <Button className="buy" variant="success">
                Платити
              </Button>
            </div>
            <div>
              <Form>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>
                    Введіть пароль для входа в систему зміни сайта
                  </Form.Label>
                  <Form.Control
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                    placeholder="Пароль"
                  />
                </Form.Group>
                <Button className="buy" onClick={godMod} variant="success">
                  Ввести
                </Button>
              </Form>
              {isGodMod && <GodMod />}
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
