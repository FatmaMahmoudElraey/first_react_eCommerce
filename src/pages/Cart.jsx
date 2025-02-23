import { Button, Container, Form, Table, Card } from "react-bootstrap";
import { useCart } from "../components/CartContext"; // Import the useCart hook
import MyBreadcrumb from "../components/MyBreadcrumb";

export function Cart() {
  const { cart, removeFromCart, updateQuantity, checkOut } = useCart();

  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);
  

  return (
    <>
      <MyBreadcrumb title="Cart" />
      <Container className="mt-5 pt-5">
        <h2 className="text-center mb-4 text-uppercase fw-bold text-primary">Shopping Cart</h2>

        {cart.length === 0 ? (
          <p className="text-center fs-5 text-muted">Your cart is empty.</p>
        ) : (
          <>
            <Table striped bordered hover responsive className="shadow-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product, index) => (
                  <tr key={index} className="align-middle">
                    <td className="fw-bold">{index + 1}</td>
                    <td className="text-dark fw-semibold">{product.name}</td>
                    <td className="text-success fw-bold">${product.price.toFixed(2)}</td>
                    <td>
                      <Form.Control
                        type="number"
                        className="text-center"
                        style={{ width: "70px", margin: "auto", fontWeight: "bold" }}
                        value={product.quantity}
                        min="1"
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value);
                          if (newQuantity >= 1) {
                            updateQuantity(index, newQuantity); 
                          }
                        }}
                      />
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        className="fw-bold"
                        style={{ transition: "0.3s", padding: "5px 12px" }}
                        onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
                        onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                        onClick={() => removeFromCart(index)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Card className="mt-4 p-4 text-center shadow-lg border-0" style={{ backgroundColor: "#f8f9fa" }}>
              <Card.Body>
                <h3 className="text-dark fw-bold">Total Amount:</h3>
                <h2 className="text-danger fw-bold display-4" style={{ fontFamily: "cursive" }}>
                  ${totalPrice.toFixed(2)}
                </h2>
                <Button className="mt-3 bg-danger fw-bold px-4 py-2" onClick={checkOut}>
                  Buy Now
                </Button>
              </Card.Body>
            </Card>
          </>
        )}
      </Container>
    </>
  );
}
