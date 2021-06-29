import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { server } from "./mocks/mock-server";

beforeAll(() => server.listen());
afterEach(() => {resetServer(); server.resetHandlers();});
afterAll(() => server.close());

// ----------------------------------------------------------------------------------------------------
// test("clicking get started leads to images page", async () => {
//   render(<App />);
//   await goToImagesPage();
//   expect(screen.getByText(/images/i)).toBeInTheDocument();
// });

test("image can be added", async()=> {
  render(<App />);
  await goToImagesPage();
  expect(screen.queryByAltText(/fry/i)).not.toBeInTheDocument();
  await addNewImage();
  expect(screen.getByAltText(/fry/i)).toBeInTheDocument();

})

// test("clicking on image thumbnail leads to image page", async()=> {
//   render(<App />);
//   await goToImagesPage();


//   await addNewImage();
// })

// ----------------------------------------------------------------------------------------------------
async function goToImagesPage() {
  await waitFor(() => screen.getByRole("link", {name: "get started"}));
  const linkToImages = screen.getByRole("link", {name: "get started"});
  userEvent.click(linkToImages);
  await waitFor(() => screen.getByText(/images/i));
}

// async function clickOnImage(){
//   await waitFor(()=> screen.getByAltText(/fry/i));
//   const image = screen.getByAltText(/fry/i);
//   userEvent.click(image);
// }

async function addNewImage(){
  await waitFor(()=> screen.getByRole("button", {name: "Add New Image"}));
  const addNewImageButton = screen.getByRole("button", {name: "Add New Image"});
  userEvent.click(addNewImageButton);
  
  await waitFor(()=> screen.getByRole("heading", {name: "Add New Image"}));

  const nameInputField = screen.getByRole("textbox", {name: "name-input"});
  const urlInputField = screen.getByRole("textbox", {name: "url-input"});
  const submitButton = screen.getByRole("button", {name: "Submit"});

  userEvent.type(nameInputField, "Fry");
  userEvent.type(urlInputField, "image-url");
  userEvent.click(submitButton);

  await waitForElementToBeRemoved(()=> screen.queryByRole("button", {name: "Submit"}));
  await waitFor(()=> screen.getByAltText(/fry/i));
}

function resetServer() {
  fetch(`/reset`)
  .then(res => res.json())
  .then(serverResponse => serverResponse);
}
