const TwitchAPI = require('node-twitch').default
var request = require("request");
tokentwitch = (process.env.TOKENTWITCH)
twitchClientID = (process.env.twitch_client)
twitchClientSecreat = (process.env.twitch_client_secreat)
secreat = (process.env.SECREAT)
var Twit = require("twit");

const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
//require("dotenv").config();
app.listen(process.env.PORT);

app.get("/", (req, res) => {
  //res.send("Online");
});

const gabrieldgamertweet = new Twit({

    consumer_key: process.env.CONSUMER_KEY,  
  
    consumer_secret: process.env.CONSUMER_SECRET,    
    access_token: process.env.ACCESS_TOKEN,  
  
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000
});

const twitch = new TwitchAPI({
    client_id: twitchClientID,
    client_secret: twitchClientSecreat
})

    async function getThumbnailUrl(){
	
    }

const { MongoClient } = require('mongodb');
const urlDB = `mongodb+srv://gabrieldgamer:${process.env.dbpass}@gabrieldgamerdb.tu3jd.mongodb.net/${process.env.dbname}?retryWrites=true&w=majority`;
const clientDB = new MongoClient(urlDB, { useNewUrlParser: true, useUnifiedTopology: true });
clientDB.connect()
  const collectionPostLiveStatus = clientDB.db("gabrieldgamerdb").collection("GabrielDGamerLiveStatus");
  

const run_gabrieldgamer = async function getStreams(){
	const gabrieldgamer = await twitch.getStreams({ channels: ["gabrieldgamer_"] });
  if(gabrieldgamer.data.length == 0) {
    await sleep(300000);
    if(gabrieldgamer.data.length == 0) {
      const filteredDocs = (await collectionPostLiveStatus.find().toArray());

    if(filteredDocs[0].live == true) {
      collectionPostLiveStatus.updateOne({ live: filteredDocs[0].live }, { $set: { live: false } });
    }
    if(filteredDocs[0].tweet_published == true) {
      collectionPostLiveStatus.updateOne({ tweet_published: filteredDocs[0].tweet_published }, { $set: { tweet_published: false } });
    }
    } else {
      return;
    }
  //console.log(filteredDocs[0].tweet_published);
    //db.set(`live`, 'no')
    //db.set(`msg`, 'no')
    //console.log("Offline")
  } else {
  const stream = gabrieldgamer.data[0];
  let thumb = await stream.getThumbnailUrl();
  let name = stream.user_name;
  let view = stream.viewer_count;
  let avatar = gabrieldgamer.profile_image_url;
  let game = stream.game_name;
  let title = stream.title;

  const filteredDocs = (await collectionPostLiveStatus.find().toArray());

   if(filteredDocs[0].live == false) {
     collectionPostLiveStatus.updateOne({ live: filteredDocs[0].live }, { $set: { live: true } });
   }
   var livePost = `Vem ver a Live\n\n${title}\n\ntwitch.tv/gabrieldgamer_\n\n#minecraft #live`
   if(filteredDocs[0].tweet_published == false) {
     gabrieldgamertweet.post(
      
      'statuses/update', 
      {status: livePost},
   )
     collectionPostLiveStatus.updateOne({ tweet_published: filteredDocs[0].tweet_published }, { $set: { tweet_published: true } });
   }

  //console.log(filteredDocs[0].tweet_published)
    }
    function sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }
  };

setInterval(
    run_gabrieldgamer, 1500)

console.log("Started")