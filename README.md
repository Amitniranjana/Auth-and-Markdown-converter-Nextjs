# Next.js Full Stack Project (My App)

This is a modern, full-stack Next.js application built with React 19, TypeScript, and TailwindCSS. The core highlights of this project include a **Custom JWT Authentication System** (Signup, Login, Middleware) and **Markdown/MDX Parsing** for dynamic content rendering.

---

## 🚀 Tech Stack & Technologies Used

- **Framework:** [Next.js](https://nextjs.org/) (App Router, v16+)
- **Frontend Core:** React 19, TypeScript
- **Database:** MongoDB (using `mongoose`)
- **Authentication:** Custom JWT-based Auth (`jsonwebtoken`, `bcryptjs`, Next.js Middleware)
- **Content Rendering:** MDX (`@next/mdx`, `react-markdown`, `marked`) 
- **State Management:** React Context API (`UserContext.tsx`)
- **Styling:** Tailwind CSS, Radix UI

---

## 🛠️ How Core Features Work (A Short Brief)

Here is a simple explanation of how the main features in this project work:

### 🔐 1. Authentication Flow (JWT + Middleware)
This app uses a complete custom authentication system built from scratch, without relying on third-party providers like NextAuth. 

*   **Signup & Signin Pages (`app/(auth)`):** 
    These are the UI forms where users enter their credentials. Before saving to the database, the password is securely hashed (encrypted) using `bcryptjs`.
*   **Login API (`api/login/route.ts`):** 
    When a user logs in, this API verifies the email and password. If the credentials are correct, a JSON Web Token (`jsonwebtoken`) is generated containing the user's details, and this token is saved in the user's Browser Cookies.
*   **Next.js Middleware (`middleware.ts`):** 
    This acts as a "Gatekeeper". Before allowing access to protected routes (like `/dashboard`), the Middleware checks if the user has a valid JWT cookie. If the token is missing or expired, the user is redirected back to the `/signin` page.
*   **Global User State (`app/context/UserContext.tsx`):**
    Once logged in, React Context API is used to manage the user's data (like their username) globally across the frontend, making it available in the navbar, dashboard, and other components.

### 📝 2. Markdown & MDX Parsing
This project supports reading, parsing, and rendering dynamic Markdown (`.md`) and MDX files.

*   **Libraries Used:** We use `@next/mdx`, `react-markdown`, and `marked` for this functionality.
*   **How it works:** 
    You can write raw markdown text (like `## Heading` or `**bold**`), and the app automatically converts it into beautiful HTML elements (like `<h2>` or `<strong>`) on the screen.
*   **MDX Support (`app/mdx-page`):** The biggest advantage of MDX is that it allows you to import and render actual **React Components** (like a custom Button or Chart) directly inside your Markdown content.

### 🗄️ 3. Database Connection (`db/mongo.ts`)
The application connects to a MongoDB database using `mongoose`. The connection logic maintains a globally cached connection. This prevents the serverless environment in Next.js from opening a new database connection on every request, saving memory and improving performance.

---

## 📂 Project Structure

```text
my-app/
├── app/
│   ├── (auth)/             # Auth UI: signin/, signup/ pages
│   ├── api/                # Backend API routes (e.g., login API logic)
│   ├── context/            # React Context (UserContext.tsx)
│   ├── dashboard/          # Protected Routes (Guarded by Middleware)
│   ├── middleware.ts       # Secure routing and token logic
│   ├── mdx-page/           # MDX file rendering examples
│   └── markdownIn/         # Markdown content rendering logic
├── models/                 # Mongoose schema definitions (e.g., User Model)
├── db/                     # Database connection setup (mongo.ts)
```

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Connection String

### Installation

1. **Clone the repository & install dependencies:**
   ```bash
   npm install
   ```

2. **Set up `.env` file:**
   Create a `.env` file in the root directory and add the required variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```

4. **Open the App:**  
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.
