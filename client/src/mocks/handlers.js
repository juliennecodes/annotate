import { rest } from "msw";
let images = [];

export const handlers = [
  rest.get("/images", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ images: images }));
  }),

  rest.get("/images/1", (req, res, ctx) => {
    const image = images[0];

    return res(ctx.status(200), ctx.json({ image }));
  }),

  rest.post("/images", (req, res, ctx) => {
    const imageName = req.body.image.name;
    const imageUrl = req.body.image.url;

    const newImage = {
      id: 1,
      name: imageName,
      url: imageUrl,
    };

    images.push(newImage);

    console.log("post request is made");
    console.log({ images: images });

    return res(ctx.status(200), ctx.json({ images: images }));
  }),

  rest.get("/reset", (req, res, ctx) => {
    images = [];
    console.log("reset server is requested");
    // return res(ctx.status(200), ctx.json({images: images}));
    return res(ctx.status(200), ctx.json({images: images}));

  }),
];
