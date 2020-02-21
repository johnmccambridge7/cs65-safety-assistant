# CS65 Safety App Backend

This is the backend for handling requests made by an Android application.

## Installation

Use the package manager [npm]() to install and run the server locally.

```bash
npm install
npm start (or nodemon)
```

## API Usage


### SMS Messaging
```
/v1/message?from=15017122661&to=15017122661&message=hello+word
```
Send an SMS (utilizing the Twilio API) by providing a `from` and `to` phone number alongside a string `message`.


## Credits
```Rafael Brantley, '20```

```Luis Chamorro, '21```

```Thomas Monfre, '21```

```John McCambridge '22```


Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)
