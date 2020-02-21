# CS 65 Safety App Backend

This is the backend for handling requests made by an Android application.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install and run the server locally.

```bash
npm install
npm start (or nodemon)
```

## API Usage

### SMS Messaging

```bash
POST
/v1/message/[number to text]

BODY: {
    message: [your message here]
}
```

Send an SMS (utilizing the Twilio API) by providing a number as the URL query parameter and a message in a JSON body with the key `message` as shown above.

## Credits
```Rafael Brantley, '20```

```Luis Chamorro, '21```

```Thomas Monfre, '21```

```John McCambridge '22```


Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)
