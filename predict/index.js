module.exports = async function (context, req) {
  const prediction = req.body;
  context.log("Saving prediction:", prediction);
  context.res = {
    status: 200,
    body: { message: "Prediction saved successfully!" }
  };
};

