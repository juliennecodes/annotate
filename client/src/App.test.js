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

beforeAll(() => {
  jest.spyOn(HTMLCanvasElement.prototype, "toDataURL").mockImplementation(() => {});
  server.listen();
});

afterEach(() => {
  resetServer();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
// ----------------------------------------------------------------------------------------------------
// test("clicking get started leads to images page", async () => {
//   render(<App />);
//   await goToImagesPage();
//   expect(screen.getByText(/images/i)).toBeInTheDocument();
// });

// test("image can be added", async()=> {
//   render(<App />);
//   await goToImagesPage();
//   expect(screen.queryByAltText(/fry/i)).not.toBeInTheDocument();
//   await addNewImage();
//   expect(screen.getByAltText(/fry/i)).toBeInTheDocument();
// });

// test("clicking on image thumbnail leads to image page", async()=> {
//   render(<App />);
//   await goToImagesPage();
//   await addNewImage();
//   await clickOnImage();

//   expect(screen.getByRole("heading", {name: "Image Page"})).toBeInTheDocument();
//   screen.debug();
// });

// test("clicking on display image details shows image details", async ()=> {
// render(<App />);
// await goToImagesPage();
// await addNewImage();
// await clickOnImage();
//   await clickOnDisplayImageDetails();

//   expect(screen.getByText("Fry")).toBeInTheDocument();
//   expect(screen.getByRole("link", {name: "Source Link"})).toBeInTheDocument();
//   screen.debug();
// });

// test.skip("clicking on display annotations shows image annotations", async()=>{
//   render(<App />);
//   await goToImagesPage();
//   await addNewImage();
//   await clickOnImage();
//   await clickOnAnnotate();
//   await annotate();
//   await clickOnDisplayImage();
//   await clickOnDisplayAnnotations();

//   expect(screen.getByText("This is a written annotation")).toBeInTheDocument();
//   expect(screen.getByAltText("Fry visual annotation")).toBeInTheDocument();
// });

// test("clicking on annotate shows the annotation form", async()=> {
//     render(<App />);
//     await goToImagePageWithImage();
//     await clickOnAnnotate();

//     expect(screen.getByRole("heading", {name: "Annotation Form"})).toBeInTheDocument();
//     screen.debug();
// });

test("annotation can be created", async () => {
  render(<App />);
  await goToImagePageWithImage();
  await clickOnAnnotate();
  await annotate();
});

async function annotate() {
  const setImageAnnotationButton = screen.getByRole("button", {
    name: "Set Image Annotation",
  });
  const textbox = screen.getByRole("textbox", {
    name: "written-annotation-input",
  });
  const submitButton = screen.getByRole("button", { name: "Submit" });

  userEvent.click(setImageAnnotationButton);
  userEvent.type(textbox, "This is a written annotation");
  userEvent.click(submitButton);

  await waitForElementToBeRemoved(()=> screen.queryByRole("button", {name: "Submit"}));
  await waitFor(()=> screen.getByRole("heading", {name: "Annotations"}));
  await waitFor(()=> screen.getByText("This is a written annotation"));
  await waitFor(()=> screen.getByAltText("Fry visual annotation"));
}

// ----------------------------------------------------------------------------------------------------
async function goToImagesPage() {
  await waitFor(() => screen.getByRole("link", { name: "get started" }));
  const linkToImages = screen.getByRole("link", { name: "get started" });
  userEvent.click(linkToImages);
  await waitFor(() => screen.getByText(/images/i));
}

async function goToImagePageWithImage() {
  await goToImagesPage();
  await addNewImage();
  await clickOnImage();
}

async function addNewImage() {
  await waitFor(() => screen.getByRole("button", { name: "Add New Image" }));
  const addNewImageButton = screen.getByRole("button", {
    name: "Add New Image",
  });
  userEvent.click(addNewImageButton);

  await waitFor(() => screen.getByRole("heading", { name: "Add New Image" }));

  const nameInputField = screen.getByRole("textbox", { name: "name-input" });
  const urlInputField = screen.getByRole("textbox", { name: "url-input" });
  const submitButton = screen.getByRole("button", { name: "Submit" });

  userEvent.type(nameInputField, "Fry");
  userEvent.type(urlInputField, "image-url");
  userEvent.click(submitButton);

  await waitForElementToBeRemoved(() =>
    screen.queryByRole("button", { name: "Submit" })
  );
  await waitFor(() => screen.getByAltText(/fry/i));
}

async function clickOnImage() {
  await waitFor(() => screen.getByAltText(/fry/i));
  const image = screen.getByAltText(/fry/i);
  userEvent.click(image);
  await waitFor(() => screen.getByRole("heading", { name: "Image Page" }));
  await waitFor(() => screen.getByAltText(/fry/i));
  await waitFor(() => screen.getByText("Display Image"));
  await waitFor(() => screen.getByText("Display Image Details"));
  await waitFor(() => screen.getByText(/display annotations/i));
  await waitFor(() => screen.getByText(/annotate/i));
}

async function clickOnDisplayImageDetails() {
  const displayImageDetailsButton = screen.getByRole("button", {
    name: "Display Image Details",
  });
  userEvent.click(displayImageDetailsButton);
  await waitFor(() => screen.getByText("Fry"));
  await waitFor(() => screen.getByRole("link", { name: "Source Link" }));
}

async function clickOnDisplayAnnotations() {
  const displayAnnotationsButton = screen.getByRole("button", {
    name: "Display Annotations",
  });
  userEvent.click(displayAnnotationsButton);
  await waitFor(() => screen.getByRole("heading", { name: "Annotations" }));
  await waitFor(() => screen.getByText("This is a written annotation"));
  await waitFor(() => screen.getByAltText("Fry visual annotation"));
}

async function clickOnAnnotate() {
  const annotateButton = screen.getByRole("button", { name: "Annotate" });
  userEvent.click(annotateButton);
  await waitFor(() => screen.getByRole("heading", { name: "Annotation Form" }));
}

// ----------------------------------------------------------------------------------------------------
function resetServer() {
  fetch(`/reset`)
    .then((res) => res.json())
    .then((serverResponse) => serverResponse);
}
