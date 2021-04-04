import {
  fireEvent,
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

afterEach(() => {
  resetServer();
  server.resetHandlers();
});

afterAll(() => server.close());

test("user clicks on homepage and goes to homepage", async () => {
  render(<App />);

  goToHomepage();

  expect(screen.getByRole("heading", { name: "Homepage" })).toBeInTheDocument();
});

test("user clicks on images link and goes to images page", async () => {
  render(<App />);

  await goToImagesPage();

  expect(screen.getByText("Images Page")).toBeInTheDocument();
});

test("user clicks on add new image and sees the form for adding new image", async () => {
  render(<App />);
  await openAddNewImageForm();
  expect(screen.getByText(/form for new image/i)).toBeInTheDocument();
});

test("user adds a new image and image is added", async () => {
  render(<App />);
  await goToImagesPage();

  expect(screen.queryByAltText("Fry")).not.toBeInTheDocument();

  await addNewImage();
  await goToImagesPage();
  await waitFor(() => screen.findByAltText("Fry"));

  expect(screen.getByAltText("Fry")).toBeInTheDocument();
});

test("user clicks on image thumbnail and goes to image page", async () => {
  render(<App />);

  await addNewImage();

  await goToImagesPage();

  await goToImagePage();

  expect(screen.getByAltText("Fry")).toBeInTheDocument();
});

test("user clicks on annotate, form for annotation appears", async () => {
  render(<App />);
  await openAddNewImageForm();
  await addNewImage();
  await goToImagesPage();
  await goToImagePage();
  await openNewAnnotationForm();

  expect(screen.getByText("Annotation Form")).toBeInTheDocument();
});

test("user adds annotation, new annotation is added", async () => {
  render(<App />);
  await addNewImage();
  await goToImagesPage();
  await goToImagePage();
  await openNewAnnotationForm();
  await writeNewAnnotation();
  await goToImagesPage();
  await goToImagePage();
  await showAnnotations();

  expect(screen.getByText("Shut up and take my money")).toBeInTheDocument();
});

test("user deletes annotation, annotation is deleted", async () => {
  render(<App />);
  await addNewImage();
  await goToImagesPage();
  await goToImagePage();
  await openNewAnnotationForm();
  await writeNewAnnotation();
  await goToImagesPage();
  await goToImagePage();
  await showAnnotations();

  expect(screen.getByText("Shut up and take my money")).toBeInTheDocument();

  await deleteAnnotation();

  expect(
    screen.queryByText("Shut up and take my money")
  ).not.toBeInTheDocument();
});

test("user deletes image, image is deleted", async () => {
  render(<App />);
  await openAddNewImageForm();
  await addNewImage();
  await goToImagesPage();
  expect(screen.getByAltText("Fry")).toBeInTheDocument();
  await goToImagePage();
  await deleteImage();
  await goToImagesPage();
  expect(screen.queryByAltText("Fry")).not.toBeInTheDocument();
});
// ----------------------------------------------------------------------------------------------------
function resetServer() {
  fetch("/resetServer")
    .then((res) => res.json())
    .then((x) => console.log("Server reset"));
}

function goToHomepage() {
  const linkToHomepage = screen.getByRole("link", { name: "Homepage" });
  userEvent.click(linkToHomepage);
}

async function goToImagesPage() {
  const linkToImages = screen.getByRole("link", { name: "Images" });
  userEvent.click(linkToImages);
  await waitFor(() => screen.findByText("Images Page"));
}

async function openAddNewImageForm() {
  const linkToAddNewImage = screen.getByRole("link", { name: "Add new image" });
  userEvent.click(linkToAddNewImage);
  await waitFor(() => screen.findByText("Form For New Image"));
}

async function addNewImage() {
  await openAddNewImageForm();
  const nameInputField = screen.getByLabelText("name-input");
  const urlInputField = screen.getByLabelText("url-input");
  const formElement = screen.getByRole("form");

  userEvent.type(nameInputField, "Fry");
  userEvent.type(urlInputField, "image-url");
  fireEvent.submit(formElement);
}

async function goToImagePage() {
  await waitFor(() => screen.findByAltText("Fry"));
  const image = screen.getByAltText("Fry");
  userEvent.click(image);
  await waitFor(() => screen.findByAltText("Fry"));
}

async function openNewAnnotationForm() {
  await waitFor(() => screen.findByRole("button", { name: "Annotate" }));

  const annotateButton = screen.getByRole("button", { name: "Annotate" });
  userEvent.click(annotateButton);

  await waitFor(() => screen.findByText("Annotation Form"));
}

async function writeNewAnnotation() {
  const annotationInputField = screen.getByLabelText("annotation-input");
  const formElement = screen.getByRole("form");

  userEvent.type(annotationInputField, "Shut up and take my money");
  fireEvent.submit(formElement);
  // should have an indicator that form is completed
}

async function showAnnotations() {
  const showAnnotationsButton = screen.getByRole("button", {
    name: "Show annotations",
  });
  userEvent.click(showAnnotationsButton);
  await waitFor(() => screen.findByText("Shut up and take my money"));
}

async function deleteAnnotation() {
  await waitFor(() => screen.findByText("Shut up and take my money"));
  await waitFor(() =>
    screen.findByRole("button", { name: "Delete annotation" })
  );
  const deleteAnnotationButton = screen.getByRole("button", {
    name: "Delete annotation",
  });
  userEvent.click(deleteAnnotationButton);
  await waitForElementToBeRemoved(() =>
    screen.getByText("Shut up and take my money")
  );
}

async function deleteImage() {
  await waitFor(() => screen.findByAltText("Fry"));
  await waitFor(() => screen.findByRole("button", { name: "Delete image" }));
  const deleteImageButton = screen.getByRole("button", {
    name: "Delete image",
  });
  userEvent.click(deleteImageButton);
  await waitForElementToBeRemoved(() => screen.getByAltText("Fry"));
}
