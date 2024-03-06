//this class will be used to sync players across the network - also to store locally for next session.
export class NetworkedPlayer {
    constructor(playerLobbyId, playeName, isHost) {
        this.playerLobbyId = -1;
        this.playeName = playeName;
        this.isHost = isHost;
    }
}
