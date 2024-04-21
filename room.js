var room = HBInit({
	roomName: "🐍HAXBALL Room",
	maxPlayers: 10,
	noPlayer: false,
    public: false,
    password: "1234",
    playerName: "SYSTEM",
});

room.setDefaultStadium("Big");
room.setScoreLimit(8);
room.setTimeLimit(14);
room.setTeamsLock(true);
//room.setTeamColors(1,0xFFF000,0xFFF000,0xFFF000);
//room.setTeamColors(2,0x65EC29,0x65EC29,0x65EC29);

// If there are no admins left in the room give admin to one of the remaining players.
function updateAdmins() { 
    // Get all players
    var players = room.getPlayerList();
    if ( players.length == 0 ) return; // No players left, do nothing.
    if ( players.find((player) => player.admin) != null ) return; // There's an admin left so do nothing.
    room.setPlayerAdmin(players[0].id, true); // Give admin to the first non admin player in the list
}

room.onPlayerJoin = function(player) {
    if (player.auth == "1UpGa7JBjQNB6cAuSu_gEVHMXDmVDO0sVa03yt4A08E") {
        room.setPlayerAdmin(player.id, true)
    }
    room.sendAnnouncement("🐍👋 Witaj, " + player.name + "!", player.id, 0x7DDA58, "bold", 2)
    room.sendAnnouncement(player.name + " wszedł na serwer.", null, 0xE06666, "bold", 2)
    /*const avatars = ["🐍","🐘","💅","✨","🤡","👀","🗿","🔧",]
    room.setPlayerAvatar(player.id, avatars[Math.random(0, avatars.length)])*/
    updateAdmins();
}

room.onTeamGoal = function(id) {
    if (id == 1) {
        //room.sendAnnouncement("⚽ Żółci strzelili gola!", null, 0xFFF000, "bold", 2)
        room.sendAnnouncement("⚽ Czerwoni strzelili gola!", null, 0xCC0000, "bold", 1)
    } else {
        //room.sendAnnouncement("⚽ Zieloni strzelili gola!", null, 0x65EC29, "bold", 2)
        room.sendAnnouncement("⚽ Niebiescy strzelili gola!", null, 0x6FA8DC, "bold", 1)
    }
} 
/*room.onGameStart = function() {
    var players = room.getPlayerList()
    for (let i = 0; i < players.length; i++) {
       const avatars = ["🐍","🐘","💅","✨","🤡","👀","🗿","🔧",]
        room.setPlayerAvatar(players[i].id, avatars[Math.random(0, avatars.length)])
   } 
}
*/

room.onPlayerLeave = function(player) {
    room.sendAnnouncement(player.name + " wyszedł z serwera.", null, 0xE06666, "bold", 2)
    updateAdmins();
}