const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Endpoint to handle Lightspeed workflow events
app.post('/lightspeed/workflow', async (req, res) => {
  try {
    // Extract the incoming request
    const request = req.body;

    // Check if the request is a POST request and contains line items
    if (req.method === 'POST' && request.line_items) {
      const targetItemId = '48fc0f69-6912-4cf8-9e47-266f74ad71de'; // ID of the item to add
      const lineItems = request.line_items;

      // Check if the target item is already in the sale to prevent duplicates
      const targetItemExists = lineItems.find(
        (item) => item['product_id'] === targetItemId
      );

      // If the event type is 'sale.line_items.added' and the target item is not already in the sale
      if (request['event_type'] === 'sale.line_items.added' && !targetItemExists) {
        // Prepare the action to add the line item
        const actions = {
          actions: [
            {
              type: 'add_line_item', // Specify the action type to add a line item
              product_id: targetItemId, // The product ID of the item to add
              quantity: 1, // Quantity of the item to add
              unit_price: 16, // Unit price of the item
              note: 'Freight price $16. Ship out to ...' // Note to be added to the line item
            }
          ]
        };

        // Respond with the actions to be performed
        return res.status(200).json(actions);
      }
    }

    // If no action is needed, respond with a 200 status
    return res.status(200).send();
  } catch (error) {
    console.error('Error processing Lightspeed workflow event:', error);
    return res.status(500).send('Internal Server Error');
  }
});

// Start the server on the specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
