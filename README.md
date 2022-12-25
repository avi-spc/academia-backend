# academia-backend

-   Backend repo for [academia](https://github.com/avi-spc/academia) web app.

### Development

-   Install Dependencies.

```sh
npm install
```

-   Run Development Server.

```sh
npm run server
```

-   Create `default.json` file in config folder with the following data:

```
{
	"mongoURI": "YOUR_LOCAL_MONGO_SERVER_URI",
	"jwtSecret": "YOUR_SECRET"
}
```

---

### Technologies Used

##### Back End

-   [Node](https://nodejs.org)
-   [Express](http://expressjs.com)
-   [MongoDB](http://mongodb.com)
-   [Mongoose](http://mongoosejs.com)

##### Front End

-   [React](https://reactjs.org)
-   [Sass](https://sass-lang.com/)

##### State Management

-   [Redux](https://redux.js.org)
