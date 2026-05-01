import * as signalR from "@microsoft/signalr";

class SignalRService {
  constructor() {
    this.connection = null;
  }

  async startConnection() {
    // آدرس هاب رو با پورت پروژه‌ات عوض کن
    const hubUrl = "https://localhost:7087/chessHub";
    console.log("starting connection");
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    try {
      await this.connection.start();
      console.log("✅ SignalR connected");
      return true;
    } catch (err) {
      console.error("❌ SignalR connection failed: ", err);
      setTimeout(() => this.startConnection(), 5000);
      return false;
    }
  }

  // متدهای مورد نیاز برای بازی
  async createGame() {
    return await this.connection.invoke("CreateGame");
  }

  async joinGame(gameId, playername) {
    console.log("joined Game");
    return JSON.parse(
      await this.connection.invoke("JoinGame", gameId, playername),
    );
  }

  async sendMove(gameId, fromposition,toposition,moveNotation,playerColor) {
    return await this.connection.invoke("MakeMove", gameId, fromposition, toposition,moveNotation,playerColor);
  }

  async getChessboard(gameId) {
    return await this.connection.invoke("GetChessBoard", gameId);
  }
  async squareClick(gameId,player,row,col) {
    return await this.connection.invoke("SelectScreen", gameId,player,row,col);
  }

  // تنظیم event listenerها
  onGameStarted(callback) {
    this.connection.on("GameStarted", callback);
  }

  onMoveMade(callback) {
    this.connection.on("MoveMade", callback);
  }

  onPlayerJoined(callback) {
    this.connection.on("PlayerJoined", callback);
  }

  onPlayerJoined(callback) {
    this.connection.on("PlayerJoined", callback);
  }
  onGameEnded(callback) {
    this.connection.on("GameEnded", callback);
  }
  onPawnPromoted(callback) {
    this.connection.on("PawnPromoted", callback);
  }
  onSelectScreen(callback) {
    this.connection.on("SelectScreen", callback);
  }
 onReceiveConnectionId(callback) {
    this.connection.on("ReceiveConnectionId", callback);
  }

  stopConnection() {
    if (this.connection) {
      this.connection.stop();
    }
  }
}

export default new SignalRService();
