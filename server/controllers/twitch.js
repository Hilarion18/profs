const request =require('request')

class Controller {
    static getHome(req,res){

        var options = {
            url:'https://api.twitch.tv/kraken/streams/featured',
            headers: {
                'User-Agent': 'request',
                'Accept': 'application/vnd.twitchtv.v5+json',
                'Client-ID' : '3cojwzkwd3tnv8ecp4g9ij84bmpvmx'
              }
        }
        request(options, function(err,data){
            res.send(JSON.parse(data.body))
        })
    }

    static search (req, res){
        console.log(req.params.game)
        var joinedUrl = 'https://api.twitch.tv/kraken/streams/?game='+ req.params.game
        let options= {
            url: joinedUrl,
            headers: {
                'User-Agent': 'request',
                'Accept': 'application/vnd.twitchtv.v5+json',
                'Client-ID' : '3cojwzkwd3tnv8ecp4g9ij84bmpvmx'
              }
        }
        request(options, function(err, data){
            res.send(JSON.parse(data.body))
        })
    }

    static topGame(req,res){
        let options= {
            url: 'https://api.twitch.tv/kraken/games/top',
            headers: {
                'User-Agent': 'request',
                'Accept': 'application/vnd.twitchtv.v5+json',
                'Client-ID' : '3cojwzkwd3tnv8ecp4g9ij84bmpvmx'
            }
        }
        request(options,function(err,data){
            res.send(JSON.parse(data.body))
        })
    }
}

module.exports = Controller