# Music-Event-Search


## What This App Does: 
This app is meant for live-music fans who want to discover the shows that are in their area, based on the artists that they listen to. 

## How it Works: 
This app interacts with multiple APIs to accomplish an aggregated list of local concerts. 

1. First, Knotify will store the user's search parameter and run the artist through the MusicGraph API to generate an array of artists related to the searched artist, in addition to the searched artist. 

2. Next, the array of artists will be fed into the BandsinTown API, which will return all of the upcoming concerts for the artists from their database. 

3. The client browser's built-in geolocation services API is utilized in a process called reverse geocoding, which uses the user's current latitude/longitude to grab information from the JSON response, such as their associated zipcode and state code. 

4. These pieces of information (zip and state code) are used to filter the JSON response from BandsinTown, showing only the concert results that are associated with the user's immediate location. 

I hope you enjoy!

Kyle


UPDATE: The MusicGraph API is down, leading to no search results based on how we designed the JSON flow. To generate results, feel free to input artists into the "artists" array, and run the "searchBandsinTown" function with the array passed in as a parameter (loop through the array).
 
[Link to app](https://bharloe.github.io/Music-Event-Search/)