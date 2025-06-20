﻿# MapleAir
 
NOTE THAT THIS IS A PROOF OF CONCEPT DEMO OF THE PLATFORM 

MapleAir is a modern, AI-powered web application for an HVAC (Heating, Ventilation, and Air Conditioning) services company. It provides a seamless user experience for customers to get information, receive product recommendations, and request quotes.

## ✨ Features

- **🤖 AI-Powered Chatbot**: An intelligent chatbot, `MapleAir AI`, built with Hugging Face and Llama 3.2, assists users with their HVAC-related questions, provides information about products and services, and recommends suitable packages based on their needs.
- **📝 Quote Request System**: Users can request a quote for pre-defined packages or custom-built systems. The request is then sent to the company's sales team via email.
- **🔐 Password-Protected Sales Panel**: A secure area for the sales team to access relevant information.
- **Modern UI**: Built with Next.js, Tailwind CSS, and Shadcn/UI for a beautiful and responsive user interface.
- **Animations**: Includes engaging animations using Framer Motion and tsParticles.

## 🛠️ Technologies Used

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **AI/ML**: [Hugging Face Inference API](https://huggingface.co/docs/api-inference/index)
- **Language Model**: `meta-llama/Llama-3.2-3B-Instruct`
- **Email**: [Resend](https://resend.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/), [tsParticles](https://particles.js.org/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v20.x or later)
- npm or yarn

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username/MapleAir.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a `.env.local` file in the root of the project and add the following environment variables:
   ```env
   HUGGING_FACE_API_KEY=your_hugging_face_api_key
   RESEND_API_KEY=your_resend_api_key
   SALES_PANEL_PASSWORD=your_sales_panel_password
   ```
   - `HUGGING_FACE_API_KEY`: Your API key from Hugging Face.
   - `RESEND_API_KEY`: Your API key from Resend.
   - `SALES_PANEL_PASSWORD`: The password for the sales panel. You can get this from `src/components/sales/password-protection.tsx`.

### Usage

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Runs the linter.
