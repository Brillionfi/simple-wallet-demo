# Brillion Wallet Infra as Service Demo Application

Welcome to the Brillion Wallet Infra as Service demo application repository! This demo application allows you to interact with the Brillion dashboard to manage your organization and applications, as well as to access your application as a wallet user.

## Getting Started

To work with the Brillion Wallet Infra as Service, follow these steps:

1. **Sign In and Create Your Organization:**
   - Visit the Brillion dashboard and sign in.
   - Create your organization.

2. **Add Users to Your Organization:**
   - After creating your organization, add more users as needed.

3. **Integrate Brillion Wallet Infra to Your Application:**
   - Create an application within your organization.
   - Provide a name for your application.
   - Generate a 512-bit RSA key pair and paste your public key into the form.
   - Keep your private key secure, as it is required to sign all wallet requests.
   - Once the application is created, an API key will be generated.
   - You can now onboard your users to their wallets using social login.

## Running the Application

This application is built using Next.js. To run the application locally:

1. Ensure you have Node.js and npm installed on your system.

2. Clone this repository to your local machine.

3. Navigate to the project directory in your terminal.

4. Install dependencies by running:
```bash
npm install .
```
5. Run the development server by running:
```bash 
npm run dev
```

6. Access the application at `http://localhost:3000`.

## Configuration

To configure the BASE_URL for your application:

1. Locate the `constants.ts` file in the `/utils` directory.

2. Replace the `BASE_URL` with the URL provided by the Brillion team.

2. Replace the `PRIVATE_KEY` with your private key.

## Support

For any issues or questions regarding this demo application, please reach out to the Brillion support team.

Thank you for using the Brillion Wallet Infra as Service demo application!

