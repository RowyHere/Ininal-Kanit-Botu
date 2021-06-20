const { Client, MessageAttachment } = require("discord.js");
const client = new Client();
const moment = require('moment');
const db = require("quick.db")
moment.locale("tr");
const Canvas = require('canvas');
Canvas.registerFont('OpenSans-Regular.otf', { family: 'newFont' })
client.on("message", async message =>{

  function rowyCharacter() {
    var text = "";
    var possible = "0123456789";
    var possible2 = "abcdefghijklmnopqrstuvwxyz";
    var possible3 = "0123456789";
    var possible4 = "-";
    var possible5 = "abcdefghijklmnopqrstuvwxyz";
    var possible6 = "...";
  
    for (var i = 0; i < 4; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    for (var i = 0; i < 1; i++)
    text += possible2.charAt(Math.floor(Math.random() * possible2.length));
    for (var i = 0; i < 2; i++)
    text += possible3.charAt(Math.floor(Math.random() * possible3.length));
    for (var i = 0; i < 1; i++)
    text += possible4.charAt(Math.floor(Math.random() * possible4.length));
    for (var i = 0; i < 2; i++)
    text += possible5.charAt(Math.floor(Math.random() * possible5.length));
    for (var i = 0; i < 3; i++)
    text += possible6.charAt(Math.floor(Math.random() * possible6.length));

    return text;
    
  }

  if(message.content.startsWith("+ininal")){

    const rowyTarih = moment().format("DD/MM/YYYY")
    const args = message.content.split(" ");
    if(!args[1])return;
    if(args[1] > 1000) return;
    const canvas = Canvas.createCanvas(770, 125);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./image2.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#2b2b2b';
    ctx.font = '14px "newFont"';

    let rowyRefNO = rowyCharacter()
    
     ctx.fillText(`${args[1]} TRY`, 425, 110);
     ctx.fillText(`${rowyTarih}`, 20, 70);
     ctx.fillText(`${rowyTarih}`, 20, 110);
     ctx.fillText(`${rowyRefNO}`, 658, 110);
     ctx.fillText(`${rowyRefNO}`, 658, 70);

     let psayi = db.add(`rowyData.${message.author.id}.ininal`, 1)
     let psayiCheck = db.get(`rowyData.${message.author.id}.ininal`)
     message.delete({ timeout: 10000 }) 
     
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    const attachment = new MessageAttachment(canvas.toBuffer(), `ininal_${psayiCheck}.png`);
    message.channel.send(attachment).then(r => r.delete({ timeout: 10000}))

    console.log(`${message.author.tag} adlı kişiye bir ininal proof yaptım! Kişinin proof sayisi: ${psayiCheck}`);
}
})


client.on("ready",() =>{
	console.log("Bot Aktif.")
})


client.login("TOKEN");