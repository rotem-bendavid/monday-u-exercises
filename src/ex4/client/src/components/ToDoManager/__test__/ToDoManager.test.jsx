import ToDoManager from "../ToDoManager";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import renderer from "react-test-renderer";

test("shouldn't show listitem", () => {
  const tree = renderer.create(
      <Provider store={store}>
      <ToDoManager />
      </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});