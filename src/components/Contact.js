import React, { useState } from "react";
import "./Contact.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Contact() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  // eslint-disable-next-line
  const [newbuyer, setNewBuyer] = useState(true);
  // eslint-disable-next-line
  const [namedecoration, setNameDecoration] = useState("");
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [promoCodeActivated, setPromoCodeActivated] = useState(false);

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);

    // Activate promo code if name is 'p'
    if (newName.toLowerCase() === "p") {
      setIsAdminMode(true);
      setPromoCodeActivated(true);
    }
  };

  const handleAgeChange = (event) => {
    let newAge = event.target.value;
    // Ensure age is between 18 and 126
    newAge = Math.min(Math.max(newAge, 18), 126);
    setAge(newAge);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name && !age && !namedecoration) {
      alert("Please fill in all fields");
      return;
    }

    if (name && age && namedecoration) {
      let price = 160; // Default order price

      // If promo code is activated
      if (promoCodeActivated) {
        price = 160;
      } else if (newbuyer) {
        // If new buyer
        price = 170;
      }

      const adminMessage = isAdminMode ? "Promo code activated. " : "";
      alert(
        `${adminMessage} To order, call 2551525625. Discount for the amount to be paid: ${price} грн`
      );
    } else {
      // alert("Please fill in all fields");
    }

    alert("Ваш акаунт був созданий");
  };

  const fullProfile = () => {
    // alert("Ваш акаунт був созданий");
  };

  return (
    <div className="contact-container, white">
      <h1>Создати акаунт</h1>
      <form onSubmit={handleSubmit} className="text-ork">
        <div>
          Як вас звати? (повне ім'я)
          <input className="teut" type="text" onChange={handleNameChange} />
        </div>
        <div>
          Скільки тобі років?
          <input
            className="teut"
            type="number"
            min="18"
            max="126"
            onChange={handleAgeChange}
            value={age}
          />
        </div>
        <div className="br">
          <p>Ви хочете бути...</p>
          <Form.Select aria-label="Default select example">
            <option value="1">Продавцем</option>
            <option value="2">Покупцем</option>
          </Form.Select>
          <p>Ви вперше на цьому сайті?</p>
          <Form.Select aria-label="Default select example">
            <option value="1">Так</option>
            <option value="2">Ні</option>
          </Form.Select>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Ваша почта</Form.Label>
              <Form.Control type="email" placeholder="Писати сюди" />
              <Form.Text className="text-muted">
                Ми ніколи вам не напишем листа якщо ви не дасте на це згоду
                внизу
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Придумайте надійний пароль</Form.Label>
              <Form.Control type="password" placeholder="Писати сюди" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Даю дозвіл на відправку мені листів"
              />
            </Form.Group>
          </Form>
        </div>
        <div className="d-grid gap-2">
          <Button
            onClick={fullProfile}
            className="tyu"
            variant="primary"
            size="lg"
            type="submit"
          >
            Створити акаунт
          </Button>
          {/* Header component removed from here */}
        </div>
      </form>
    </div>
  );
}
