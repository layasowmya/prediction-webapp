const { TableClient } = require("@azure/data-tables");

module.exports = async function (context, req) {
  context.log("DEBUG: Function started");

  try {
    const prediction = req.body;

    if (!prediction) {
      throw new Error("Missing request body");
    }

    // Create a client for the Predictions table
    const client = TableClient.fromConnectionString(
      process.env.AzureWebJobsStorage,
      "Predictions"
    );

    // Build the entity to save
    const entity = {
      partitionKey: prediction.userId || "default",
      rowKey: `${prediction.matchId || Date.now()}`,
      team: prediction.team,
      score: prediction.score,
      timestamp: new Date().toISOString()
    };

    await client.upsertEntity(entity);

    context.res = {
      status: 200,
      body: {
        ok: true,
        message: "Prediction saved",
        saved: entity
      }
    };

  } catch (err) {
    context.log("DEBUG ERROR:", err);

    context.res = {
      status: 500,
      body: {
        error: err.message
      }
    };
  }
};
