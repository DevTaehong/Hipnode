# Hipnode

<img width="1395" alt="Screenshot 2024-02-08 at 12 24 54 PM" src="https://github.com/DevTaehong/Hipnode/assets/71358207/f292c85c-ec17-4951-964f-ca3c655df805">

![PRs](https://img.shields.io/badge/PRs-welcome-ff69b4.svg?style=shields)
[![website](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://github.com/DevTaehong/Hipnode)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🌐 Demo
Here is a working live demo:  https://hipnode-devtaehong.vercel.app/

## 📝 Description
Hipnode, a premium Social Media Forum Web App, redefines digital interaction by offering a suite of powerful functionalities. Seamlessly navigating the platform begins with a user-friendly Sign Up & Sign In process, complemented by in-depth surveys for a tailored onboarding experience. The Homepage serves as the hub, featuring a dynamic home feed, detailed post views, and dedicated creation pages. Hipnode goes beyond traditional social media by introducing specialized sections for Meetups, encouraging connections based on shared interests. 


## 🛠️ Setup Project
To get this project up and running in your development environment, follow these step-by-step instructions.

### 🍴 Prerequisites

We need to install or make sure that these tools are pre-installed on your machine:

- [NodeJS](https://nodejs.org/en/download/): It is a JavaScript runtime build. 
- [Git](https://git-scm.com/downloads): It is an open-source version control system. 

## ✨ Features

- Sign Up & Sign in - Complete authentication and survey
- Homepage - Consisting of a home feed, post details, and creation pages
- Meetups - Display all available meetups
- Groups-Displayallcontentwithingroups
- Podcasts - Display all podcasts with a podcast details page
- Profile - Show all posts, meetups, and podcasts for a specific user
- Live Chat - Engage in real-time conversations, share instant feedback, and build connections through our interactive live chat feature
- Live Notifications - Display notifications in real-time using Supabase realtime

## 🔍 Usage

### How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/DevTaehong/Hipnode.git

# Go into the repository
$ cd Hipnode

# Install dependencies
$ npm install

# Run the app
$ npm start
```

> **Note**
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

### ⚒️ How to Contribute
Want to contribute? Great!

To fix a bug or enhance an existing module, follow these steps:

- Fork the repo
- Create a new branch (`git checkout -b improve-feature`)
- Make the appropriate changes in the files
- Add changes to reflect the changes made
- Commit your changes (`git commit -am 'Improve feature'`)
- Push to the branch (`git push origin improve-feature`)
- Create a Pull Request 

### 📩 Bug / Feature Request

If you find a bug (the website couldn't handle the query and / or gave undesired results), kindly open an issue [here](https://github.com/devtaehong/hipnode/issues/new) by including your search query and the expected result.

If you'd like to request a new function, feel free to do so by opening an issue [here](https://github.com/devtaehong/hipnode/issues/new). Please include sample queries and their corresponding results.

## 🔒 ENV file
 ```
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<clerk_publishable_key>
   CLERK_SECRET_KEY=<clerk_secret_key>
   WEBHOOK_SECRET=<webhook_secret>
   
   # Clerk URLs
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
   
   # Direct URL and Database URL
   DIRECT_URL=<direct_url>
   DATABASE_URL=<database_url>
   
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=<supabase_url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<supabase_anon_key> 
   
   # Ably API Key
   NEXT_PUBLIC_ABLY_API_KEY=<ably_api_key>
  
   # Google Maps API Key
   GOOGLE_MAPS_API_KEY=<google_maps_api_key>
   
   # Resend API Key
   RESEND_API_KEY=<resend_api_key>
   ```

## 📜 Credits

👦 Tye Stanley <br>
Email: tyestanley090@gmail.com <br>
GitHub: @TyeStanley

👦 Glen McCallum <br>
Email: glen.mccallum@live.co.uk <br>
GitHub: @glenmac90

👦 Alexander Mc Lachlan <br>
Email: alexmonk17@gmail.com <br>
GitHub: @AlexDjangoX


## 📞 Contact Me

[![Follow us on LinkedIn](https://img.shields.io/badge/LinkedIn-taehong-blue?style=flat&logo=linkedin&logoColor=b0c0c0&labelColor=363D44)](https://www.linkedin.com/in/taehong/)
