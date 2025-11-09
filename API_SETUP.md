# OMDb API Setup

## Get Your Free API Key

1. Visit: http://www.omdbapi.com/apikey.aspx
2. Choose the FREE plan (1,000 daily requests)
3. Enter your email and verify
4. Copy your API key

## Configure the App

1. Open `src/utils/api.js`
2. Replace `YOUR_API_KEY_HERE` with your actual API key
3. Save the file

Example:
```javascript
const API_KEY = 'abc12345'; // Your actual key here
```

## API Endpoints Used

- **Movie Data**: `http://www.omdbapi.com/?apikey=[yourkey]&`
- **Posters**: `http://img.omdbapi.com/?apikey=[yourkey]&`

The app will automatically use these endpoints with your key!