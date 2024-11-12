# Lightspeed Workflow Server

This project is a Node.js server that handles Lightspeed Retail (X-Series) workflow events. It listens for specific events, such as `sale.line_items.added`, and automatically adds items to sales when triggered.

Repository: [xworkflowsapp](https://github.com/tavarezlspd/xworkflowsapp)

## Features

- Receives and processes workflow events from Lightspeed Retail (X-Series).
- Automatically adds a specific line item to a sale when triggered.
- Prevents duplicate item additions.

## Setup

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/tavarezlspd/xworkflowsapp.git
   cd xworkflowsapp
   ```

2. **Install Dependencies**:
   ```sh
   npm install
   ```

3. **Run the Server**:
   ```sh
   npm start
   ```

   - The server will run on `PORT` specified in the environment or default to `3000`.

## Endpoint

- **POST /lightspeed/workflow**
  - Receives workflow events from Lightspeed.
  - Adds a specific item to the sale if the event type is `sale.line_items.added`.
  
  Example request body:
  ```json
  {
    "event_type": "sale.line_items.added",
    "line_items": [
      {
        "product_id": "some-product-id"
      }
    ]
  }
  ```

## Deployment

This server can be deployed using any Node.js-compatible hosting service, such as:

- **Render**
- **Heroku**
- **AWS**
- **DigitalOcean**

Ensure the server is accessible via a public URL and configure the Lightspeed Retail (X-Series) app to send POST requests to the `/lightspeed/workflow` endpoint.

## Security

- Validate requests to ensure they originate from Lightspeed (e.g., using a shared secret).
- Add rate limiting to prevent abuse.

## License

This project is open source and available under the [MIT License](LICENSE).



