

# Emurgo Assessment



This project contains two apis

    1) fetching articles from GNEWS API (http://localhost:3001/api/v1/emurgo/gnews/articles)
    2) Searching articles API (http://localhost:3001/api/v1/emurgo/gnews/search?page=1&keywords=Bid)

---

## Install

    $ git clone https://github.com/YOUR_USERNAME/PROJECT_TITLE
    $ cd PROJECT_TITLE
    $ npm install


## Running the project

    $ npm start

## API Details

    http://localhost:3001/api/v1/emurgo/gnews/articles

    * GNews API Does not support the pagination for free users
    * But I have implemented the pagination logics in the API level.
    * You have to pass the page query param in this api, If you are not passing, I'am taking as 1

    http://localhost:3001/api/v1/emurgo/gnews/search?page=1&keywords=Bid

    * If your are calling this api, without calling the first api, u will get empty response.
    * because based on the first api response, I am searching here.
    * If you want to search title, You can give full title in the title query param.
    * If you are passing the keywords query param, I will search inside title wheather the keywords are exist are not. If exist I will return or else empty response.


## Note

    * I didn't understand full requirement in the search api.
    * In both api's, I am using the redis to store and retrive the data.
    * The redis data will be available in 10 mins, after that We are calling the GNEWS api to get the data and will store in the redis.


    






