const Discord = require('discord.js'); // utilise la bibliothèque discord.js

const { request } = require('undici');

const rp = require('request-promise-native');

const https = require('https');

var XMLHttpRequest = require('xhr2');

const { EmbedBuilder } = require('discord.js');

const bot = new Discord.Client({ intents: 3276799 }); // récupère l'objet client

const config = require("./config")

bot.on('ready', function () {
  console.log("Je suis connecté!");
})

const prefix = "!";
bot.on("messageCreate", async message => {
  if (message.author.bot) return;

  if (message.content === prefix + "ping") {
    message.reply("pong !:ping_pong: ");
  }

  if (message.content === prefix + "test") {
    message.reply("**_bonjour_**\n yo");
  }

  if (message.content.startsWith("!commandes")) {
    const embed2 = new Discord.EmbedBuilder()
      .setColor("Red")
      .setTitle("Voici les différentes commandes que je propose :")
      .setAuthor({ name: 'FortniteStats', iconURL: 'https://www.yubigeek.com/wp-content/uploads/2021/04/comment-developper-un-bot-discord-en-nodejs-pour-souhaiter-la-bienvenue.jpeg'})
      .addFields(
        { name: '__!ping__', value: '**_Renvoi : pong!_ :ping_pong:**' },
        { name: '__!test__', value: '**_Renvoi : un message de test_**' },
        { name: '__!apirlreponse__', value: '**_Renvoi :  un embed reponse des stats d\'un joueur rl_**' },
        { name: '__!armes__', value: '**_Renvoi : les armes du jeux fortnite_**' },
        { name: '__!items__', value: '**_Renvoi : tous les différents items du jeux_**'},
        { name: '__!store__', value: '**_Renvoi : les articles disponibles dans la boutique fortnite du jour_**' },
        { name: '__!stats__', value: '**_Renvoi : les stats fortnite du joueur mit en paramètre_**' })
      .setThumbnail("https://upload.wikimedia.org/wikipedia/fr/0/07/Fortnite_Battle_Royale_Logo.png")
      .setTimestamp()
      .setFooter({ text: 'Message par FortniteStats', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
      message.channel.send({ embeds: [embed2] });
  }

  if (message.content.startsWith("!apirlreponse")) {
    const embed2 = new Discord.EmbedBuilder()
      .setColor("Blue")
      .setTitle("Voici les stats Rocket league du joueur Test :")
      .setURL("https://rocketleague.tracker.network/")
      .setAuthor({ name: 'Johan POYET', iconURL: 'https://upload.wikimedia.org/wikipedia/fr/0/07/Fortnite_Battle_Royale_Logo.png', url: 'https://discord.js.org' })
      .addFields(
        { name: '__Pseudo :__', value: '**_Test_**' },
        { name: '__Nombre total d heures jouées :__', value: '**_762_**', inline: true },
        { name: '__Nombre total de matchs effectués :__', value: '**_342_**', inline: true },
        { name: '__Pourcentage de win :__', value: '**_51%_**' },
        { name: '__Pourcentage de défaite :__', value: '**_49%_**' },)
      .addFields(
        { name: '__Rang du joueur :__', value: '**_Champion 2_**', inline: true },)
      .setThumbnail("https://cdn2.unrealengine.com/12br-delay-social-news-header-02-1920x1080-119208936.jpg")
      .addFields(
        { name: '__Division du joueur :__', value: '**_1_**', inline: true },
        { name: '__MMR :__', value: '**_1220_**' },)
      .setTimestamp()
      .setFooter({ text: 'Message par StatsRL', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
      message.channel.send({ embeds: [embed2] });
  }

  if (message.content.startsWith('!store')) {
    // Envoyez une requête à l'API
    const option = {
      hostname: "fortnite-api.theapinetwork.com",
      path: "/store/get",
      headers: {
        'Authorization': '2948c860-f09a-4044-b12f-2ec800727504'
      }
    }
    https.get("https://fortnite-api.theapinetwork.com/store/get", {
      headers: {
        'Authorization': '2948c860-f09a-4044-b12f-2ec800727504'
      }
    }, (response) => {
      let result = "";
      response.on("data", (data) => {
        result += data;
      })
      response.on("end", () => {
        let obj = JSON.parse(result);
        obj.data.forEach((element) => {
          const embed2 = new Discord.EmbedBuilder()
      .setColor("Blue")
      .setTitle("Voici les items disponibles dans la boutique fortnite ajrd :")
      .setURL("https://rocketleague.tracker.network/")
      .setAuthor({ name: 'Johan POYET', iconURL: 'https://upload.wikimedia.org/wikipedia/fr/0/07/Fortnite_Battle_Royale_Logo.png', url: 'https://discord.js.org' })
      .setThumbnail("https://i.imgur.com/KE6nXem.png")
      .setTimestamp()
      .addFields({name: "Nom :", value: `${element.item.name}`})
      .setImage(`${element.item.images.icon}`)
      .setFooter({ text: 'Message par StatsRL', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
      message.channel.send({ embeds: [embed2] });    
      });
      })
    })
  }
  if (message.content.startsWith('!items')) {
    // Envoyez une requête à l'API
    const option = {
      hostname: "fortnite-api.theapinetwork.com",
      path: "/item/list",
      headers: {
        'Authorization': '2948c860-f09a-4044-b12f-2ec800727504'
      }
    }
    https.get("https://fortnite-api.theapinetwork.com/items/list", {
      headers: {
        'Authorization': '2948c860-f09a-4044-b12f-2ec800727504'
      }
    }, (response) => {
      let result = "";
      response.on("data", (data) => {
        result += data;
      })
      response.on("end", () => {
        let obj = JSON.parse(result);
        obj.data.forEach(element => message.channel.send(element.item.name + element.item.images.icon));
      })
    })
  }

  if (message.content.startsWith('!stats')) {
    const taille = message.content.length;
    const name = message.content.substring(7, taille);
    console.log(name);
    const option = {
      hostname: "https://fortnite-api.com/v2/stats/br/v2",
      path: `/${name}`,
      headers: {
        'Authorization': '2948c860-f09a-4044-b12f-2ec800727504'
      }
    }
    https.get(`https://fortnite-api.com/v2/stats/br/v2/?name=${name}&image=all`, {
      headers: {
        'Authorization': '2948c860-f09a-4044-b12f-2ec800727504'
      }
    }, (response) => {
      let result = "";
      response.on("data", (data) => {
        result += data;
      })
      response.on("end", () => {
        let obj = JSON.parse(result);
        message.channel.send(obj.data.image);
        
      })
    })
  }

  if (message.content.startsWith('!pokemon')) {
    const pokemon = message.content.split(' ')[1];
    const xhr = new XMLHttpRequest();
xhr.open("GET", `https://pokeapi.co/api/v2/pokemon/${pokemon}`);
xhr.send();
xhr.responseType = "json";
xhr.onload = () => {
  const data = xhr.response;
  const embed2 = new Discord.EmbedBuilder()
      .setTimestamp()
      .setFooter({ text: 'Message par FortniteStats', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
      .setThumbnail(data.sprites.front_default) 
      .setTitle(data.name)     
        data.types.forEach(element => {
          if(element.type.name === 'electric'){
            embed2.setColor('#FFC631')
          }
          if(element.type.name === 'water'){
            embed2.setColor('#399CFF')
          }
          if(element.type.name === 'grass'){
            embed2.setColor('#7BCE52')
          }
          if(element.type.name === 'steel'){
            embed2.setColor('#6363B5')
          }
          if(element.type.name === 'normal'){
            embed2.setColor('#ADA594')
          }
          if(element.type.name === 'fighting'){
            embed2.setColor('#A55239')
          }
          if(element.type.name === 'flying'){
            embed2.setColor('#9CADF7')
          }
          if(element.type.name === 'poison'){
            embed2.setColor('#B55AA5')
          }
          if(element.type.name === 'ground'){
            embed2.setColor('#D6B55A')
          }
          if(element.type.name === 'rock'){
            embed2.setColor('#BDA55A')
          }
          if(element.type.name === 'bug'){
            embed2.setColor('#ADBD21')
          }
          if(element.type.name === 'ghost'){
            embed2.setColor('#6363B5')
          }
          if(element.type.name === 'fire'){
            embed2.setColor('#F75231')
          }
          if(element.type.name === 'psychic'){
            embed2.setColor('#FF73A5')
          }
          if(element.type.name === 'ice'){
            embed2.setColor('#5ACEE7')
          }
          if(element.type.name === 'dragon'){
            embed2.setColor('#8858F6')
          }
          if(element.type.name === 'dark'){
            embed2.setColor('#735A4A')
          }
          if(element.type.name === 'fairy'){
            embed2.setColor('#E09AE3')
          }
          embed2.addFields(
          { name: '```Type :```', value: element.type.name },
          
          )})
          data.stats.forEach(element => {
            
            if(element.stat.name === 'hp'){
              embed2.addFields(
                { name: '```Hp :```', value: element.base_stat.toString(), inline: true },
                )
            }
            if(element.stat.name === 'attack'){
              embed2.addFields(
                { name: '```Attack :```', value: element.base_stat.toString(), inline: true },               
                )
            }
            if(element.stat.name === 'defense'){
              embed2.addFields(
                { name: '```Defense :```', value: element.base_stat.toString(), inline: true },
                )
            }
            if(element.stat.name === 'special-attack'){
              embed2.addFields(
                { name: '```Special-attack :```', value: element.base_stat.toString(), inline: true},
                )
            }
            if(element.stat.name === 'speed'){
              embed2.addFields(
                { name: '```Speed :```', value: element.base_stat.toString(), inline: true },
                )
            }
            if(element.stat.name === 'special-defense'){
              embed2.addFields(
                { name: '```Special-defense :```', value: element.base_stat.toString(), inline: true },
                )
            }
            })
      message.channel.send({ embeds: [embed2] });   
};
  }
});
bot.login(config.token);

