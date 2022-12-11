<p align="center">
    <img alt="oss image" src="https://user-images.githubusercontent.com/79405091/206928780-fd6e5f1b-0fa3-4257-97be-89c180cc8382.png" width="100px">
    <h1 align="center">MODB</h1>
</p>

MODB is a React project build around the API provided by [The Movie Database](https://www.themoviedb.org/). Some of the features:
- custom made components like sliders, toggles and more,
- responsive design,
- showing navbar on scrolling up,
- search suggestions,
- fetching data on scroll,
- lazy loaded images


## :globe_with_meridians: Demo:
You can see the demo version of the app by clicking [here](https://kamilkazor.github.io/modb/). 
Note that the demo version of the app uses fixed data instead of that provided by the API. 
Because of that the app always shows the same data and features like search suggestions or filters are unable to work as intended.

## :hammer: Enabling the API:
If you want to enable the API and see all the features of the project, please follow the steps below:

#### 1. Open terminal, go to destination directory and run the following commands:
```bash
# Clone this repository
git clone https://github.com/kamilkazor/modb.git
cd modb

# Install dependencies
npm install
```

#### 2. Get the Key on TMDB site:
To get the key first of all you have to create an account on [The Movie Database](https://www.themoviedb.org/).
After that go into your [settings/api](https://www.themoviedb.org/settings/api) and fill the form to get the (v3 auth) API Key.

#### 3. Add Key to the project:
```bash
# Inside src directory create new file named ".env"
modb/src/.env

# Open .env file and add REACT_APP_KEY variable with your Key as a value"
REACT_APP_KEY=YOUR_KEY
```
#### 4. Open terminal, go to the modb directory and run the app:
```bash
npm run start

```
