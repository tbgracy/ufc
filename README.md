# 🔥 Ultimate Frontend Challenge 🔥

## 📝 Description

A weekly frontend challenge to improve your skills in HTML, CSS and JavaScript.


## 🤔 Why

Me and some friends wanted to practice our frontend coding skills and decide
to take one design to life every week. Along that, we needed an automatic accountability
system that could also motivate us to give our best. So I thought of a website were we can
browse all participant's entries and eventually vote for one. It was also a good excuse for
me to practice and learn React at the same time.

## 🙋 How to participate

Go to [dot.com](dot.com). Login with your github account.
Create a repository with the following pattern for every entry : 

`ufc-w<week-number>-<anything-you-want>`

Example : `ufc-w1-my-first-entry`

Then you push your code to your repository and it will be automatically added to the website.
You need to host your code on github pages (or any other provider) to be able to see it on the website and provide the url in the `README.md` file (it will be automatically be scrapped).

## Toggle dev mode (for mock api)

In `src/context.ts` change the `inDevEnv` value to `true` or `false`.

## 👥 Authors

- Tsierenana Botramanagna Gracy for the idea and coding
- Luca Zo Haingo for the overall design
- Safidy Raharijesy for the logo

## TODO 
- [ ] Set up message system (popups, with semantic color)
- [x] Use react layout (for better perf for the navbar rendering, I guess)
- [ ] Add unit tests
- [ ] Add pagination
- [ ] Add ranking algo (using votes x lighthouse x latest commit date)
- [ ] Add handmade icons
- [ ] Make it mobile friendly
- [ ] Add view toggle (card / list)
- [ ] Automate template selection (using scrapping)
- [ ] Internationalization
