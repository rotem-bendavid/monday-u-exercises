import { render, screen } from "@testing-library/react";
import ToDoList from "../ToDoList";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";

//I wasn't able to send array of todos to todoManager for integration test
//because todoManager is sending props to todoList
//so i made integration test here (running todoList twice)

const items = [
  {
    id: 56,
    todo: "Take dog out for a walk",
    status: false,
  },
  {
    id: 32,
    todo: "Do the dishes",
    status: true,
  },
];

describe("ListContainer", () => {
  test("should render both items (one done and one not)", () => {
    render(
      <Provider store={store}>
        <ToDoList todo={items[0]} />
        <ToDoList todo={items[1]} />
      </Provider>
    );

    expect(screen.getByText('Take dog out for a walk')).toBeVisible();
    expect(screen.getByText('Take dog out for a walk')).toHaveClass('list-item');

    expect(screen.getByText('Do the dishes')).toBeVisible();
    expect(screen.getByText('Do the dishes')).toHaveClass('list-item complete');
  });
});
/*test('should show list of todos', () => {
  expect(1).toBe(1)
});*/