import { store } from "../../../redux/store";
import renderer from "react-test-renderer";
import ToDoList from '../ToDoList';

const todo = { id: 5, todo: 'Buy Milk', status: false };

test("should show todo listitem", () => {
    const tree = renderer.create(
        <ToDoList store={store} todo={todo} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});