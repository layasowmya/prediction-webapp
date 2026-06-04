module.exports = async function (context, req) {
  context.log("DEBUG: Function started");

  try {
    context.log("DEBUG: Raw req:", req);
    context.log("DEBUG: req.body:", req.body);

    const prediction = req.body || null;

    context.res = {
      status: 200,
      body: {
        ok: true,
        received: prediction
      }
    };

  } catch (err) {
    context.log("DEBUG ERROR:", err);

    context.res = {
      status: 500,
      body: {
        error: err.message,
        stack: err.stack
      }
    };
  }
};
