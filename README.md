🧪 Test Case Generator App
This project is an AI-powered tool that connects with your GitHub, lists code files from your repositories, and generates test case summaries and full test code using OpenAI.

Built as an assignment for Workik AI internship.

🔧 Tech Stack
Frontend: React

Backend: Node.js (Express)

AI: OpenAI GPT-3.5 API

OAuth: GitHub OAuth App

Deployment: Localhost (dev)

🚀 Features
✅ GitHub OAuth authentication
✅ Fetch repositories and files
✅ Select multiple files to generate test cases
✅ Display test case summaries
✅ Click a summary to generate full test case code
✅ Clean and simple UI
🆓 Uses OpenAI free-tier

🛠 How to Run Locally
1. Clone the repository
git clone https://github.com/ManasviGarud/testcase-generator-app
cd testcase-generator-app

2. Setup the environment
Update a .env file in /server directory with the following:
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
OPENAI_API_KEY=your_openai_api_key


3. Install dependencies
# In root for frontend
npm install

# In server folder
cd server
npm install
4. Run the app
# Start backend
cd server
node index.js

# Start frontend
cd ..
npm start


🧠 What I Learned
GitHub OAuth integration

Using OpenAI with file input

Handling token securely

Clean UI design with React hooks

How to chain multiple async operations from GitHub → AI → Frontend