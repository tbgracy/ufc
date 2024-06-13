# 🔥 Ultimate Frontend Challenge 🔥

## 📝 Description

A weekly frontend challenge host website to improve your skills in HTML, CSS and JavaScript.

## 🤔 Why

Me and some friends wanted to practice our frontend coding skills and decide
to take one design to life every week. Along that, we needed an automatic accountability
system that could also motivate us to give our best. So I thought of a website were we can
browse all participant's entries and eventually vote for one. It was also a good opportunity for
me to practice and learn React at the same time.

## 🙋 How to participate

- **Step 1 :** Go [here](https://ultimate-frontend-challenge.netlify.app). Login with your github account.

- **Step 2 :** Go [here](https://github.com/lucazh/UFC-topic) to see the current challenge.

- **Step 3 :** Create a repository with `ufc` in it's name so the repository will automatically be added to the website.

    - Example : `ufc-w1-my-first-entry`


You need to host your code on github pages (or any other provider) to be able to see it on the website and provide the url in the about section so it can be previewed on the home page.

## 🤝 How to contribute?

You can contribute by doing some of the undone todo items in [the last section](#todo), or make some improvements, whether it's features or design.

### 1️⃣ Make it run locally

First, fork the repository and follow the following instructions to make it run locally : 

1. Clone the repository : 
```
git clone https://github.com/tbgracy/ufc
```
2. Install all the dependencies : 
```
cd ./ufc
npm i # or npm install
```
3. Create an .env file based on the example file provided
```
cp .env.example .env
```
4. Run it
```
npm run dev
```
Now it should run on your local machine fine with placeholder data.

### 2️⃣ Make some changes and open a PR

### Toggle dev mode (for mock api)

In `src/context.ts` change the `inDevEnv` value to `true` or `false`.

## 👥 Authors

- Tsierenana Botramanagna Gracy ([@tbgracy](https://github.com/tbgracy)) for the idea and coding
- Luca Zo Haingo ([@lucazh](https://github.com/lucazh)) for the overall design
- Safidy Raharijesy ([@sfd-consulting]()) for the logo

## TODO 
- [ ] Set up message system (popups, with semantic color)
- [x] Use react layout (for better perf for the navbar rendering, I guess)
- [ ] Add unit tests
- [ ] Add pagination
- [ ] Add ranking algo (using votes x lighthouse x latest commit date)
- [ ] Add handmade icons
- [ ] Make it mobile friendly
- [ ] Add view toggle (card / list)
- [ ] Display current challenge to website
- [ ] Internationalization
