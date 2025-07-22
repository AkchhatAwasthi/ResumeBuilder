# 🧠 AI Resume Builder

An intelligent, industry-aware Resume Builder that dynamically generates beautifully structured resumes using **React**, **Node.js**, and the **Gemini AI API**. This project was built with a focus on clean design, smart assistance, and ATS-friendly formatting — making resume building faster, smarter, and accessible for everyone.

Live Project: **https://airesumebuilder18.netlify.app**

---

## 📌 Features

- **Industry-Specific Resume Flow**  
  Users can choose between "IT Sector" and "Other Sector" at the start.  
  - IT resumes are structured, minimal, and optimized for ATS systems.  
  - Non-IT resumes are colorful, creative, and visually engaging.

- **AI-Powered Assistance (Gemini API)**  
  - Auto-suggests relevant skills based on job role.  
  - Generates a professional personal summary from user input.  
  - Fully editable output for customization.

- **Live Resume Preview**  
  - Updates in real-time as the user enters details.  
  - Displays the final version exactly as it will appear in the PDF.

- **PDF Download**  
  - Only the resume is downloaded (not the form or other UI).  
  - Direct download, not just print popup.

- **Persistent Form Data**  
  - Keeps entered information intact unless the user closes the tab.  
  - Prevents accidental data loss during download or refresh.

---

## ⚙️ Tech Stack

- **Frontend**: React (TypeScript), Tailwind CSS  
- **Backend**: Node.js, Express  
- **AI Integration**: Google Gemini API  
- **PDF Export**: html2pdf.js  
- **State Management**: React Hooks + Local Storage

---

## 📥 Installation & Setup




git clone https://github.com/your-username/ai-resume-builder.git
cd ai-resume-builder
2. Install Dependencies
Frontend (React)


cd client
npm install
Backend (Node.js)


cd ../server
npm install
3. Add Your API Key
In the server directory, create a .env file and add:

ini

GEMINI_API_KEY=your_api_key_here
Replace your_api_key_here with your actual Google Gemini API key.

🚀 Running the App
Start the Backend Server


cd server
npm run dev
Start the Frontend (React)


cd ../client
npm start
Visit http://localhost:3000 in your browser to access the app locally.

🧠 How It Works
When users open the app, they are first asked which sector their resume is for. Based on the selection, the resume layout adapts automatically — with minimal, black-and-white formatting for IT jobs, and colorful, styled designs for other fields like marketing or design.

The app integrates with the Gemini API to suggest relevant skills and auto-generate summaries. Users can edit all AI-generated content, preview their resume live, and download the final PDF with a single click. All entered data is retained unless the user closes the tab.

🔮 Future Scope
Add resume templates for more fields (Design, Education, Finance, etc.)

Enable account login and saving multiple resume versions

Export to .docx and integrate with LinkedIn

Add multilingual support

AI-powered resume scoring and job matching suggestions

🤝 Contributing
Pull requests are welcome!

To contribute:

Fork this repository

Create a new branch (git checkout -b feature/your-feature)

Commit your changes (git commit -m "Add feature")

Push to your branch (git push origin feature/your-feature)

Open a Pull Request

👨‍💻 Developer
Akchhat Awasthi
📧 akchhatawasthi1234@gmail.com

📜 License
This project is open-source and available under the MIT License.
