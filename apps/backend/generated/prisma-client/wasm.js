
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  username: 'username',
  email: 'email',
  passwordHash: 'passwordHash',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FriendshipScalarFieldEnum = {
  id: 'id',
  requesterId: 'requesterId',
  addresseeId: 'addresseeId',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RoomInviteScalarFieldEnum = {
  id: 'id',
  roomId: 'roomId',
  inviterId: 'inviterId',
  inviteeId: 'inviteeId',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  expiresAt: 'expiresAt',
  metadata: 'metadata'
};

exports.Prisma.GameScalarFieldEnum = {
  id: 'id',
  status: 'status',
  deckSeed: 'deckSeed',
  dealerId: 'dealerId',
  surrenderVotes: 'surrenderVotes',
  rematchVotes: 'rematchVotes',
  originalRoomIds: 'originalRoomIds',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PlayerScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  gameId: 'gameId',
  name: 'name',
  seatIdx: 'seatIdx',
  role: 'role'
};

exports.Prisma.GameEventScalarFieldEnum = {
  id: 'id',
  gameId: 'gameId',
  seq: 'seq',
  type: 'type',
  actor: 'actor',
  payload: 'payload',
  createdAt: 'createdAt'
};

exports.Prisma.GameSnapshotScalarFieldEnum = {
  id: 'id',
  gameId: 'gameId',
  seq: 'seq',
  snapshot: 'snapshot',
  createdAt: 'createdAt'
};

exports.Prisma.RoundScoreScalarFieldEnum = {
  id: 'id',
  gameId: 'gameId',
  team: 'team',
  points: 'points',
  createdAt: 'createdAt'
};

exports.Prisma.MatchHistoryScalarFieldEnum = {
  id: 'id',
  mode: 'mode',
  winnerTeam: 'winnerTeam',
  team0Score: 'team0Score',
  team1Score: 'team1Score',
  team0Zings: 'team0Zings',
  team1Zings: 'team1Zings',
  hostUserId: 'hostUserId',
  team0Player1Id: 'team0Player1Id',
  team0Player1Name: 'team0Player1Name',
  team0Player2Id: 'team0Player2Id',
  team0Player2Name: 'team0Player2Name',
  team1Player1Id: 'team1Player1Id',
  team1Player1Name: 'team1Player1Name',
  team1Player2Id: 'team1Player2Id',
  team1Player2Name: 'team1Player2Name',
  duration: 'duration',
  createdAt: 'createdAt'
};

exports.Prisma.UserStatsScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  gamesPlayed: 'gamesPlayed',
  soloWins: 'soloWins',
  duoWins: 'duoWins',
  pointsTaken: 'pointsTaken',
  zingsMade: 'zingsMade',
  gamesHosted: 'gamesHosted',
  friendsAdded: 'friendsAdded',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AchievementScalarFieldEnum = {
  id: 'id',
  type: 'type',
  tier: 'tier',
  threshold: 'threshold',
  name: 'name',
  description: 'description'
};

exports.Prisma.UserAchievementScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  achievementId: 'achievementId',
  unlockedAt: 'unlockedAt'
};

exports.Prisma.LeaderboardSnapshotScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  username: 'username',
  category: 'category',
  period: 'period',
  value: 'value',
  weekStart: 'weekStart',
  monthStart: 'monthStart',
  yearStart: 'yearStart',
  rank: 'rank',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.FriendshipStatus = exports.$Enums.FriendshipStatus = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
};

exports.RoomInviteStatus = exports.$Enums.RoomInviteStatus = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED'
};

exports.AchievementType = exports.$Enums.AchievementType = {
  GAMES_PLAYED: 'GAMES_PLAYED',
  SOLO_WINS: 'SOLO_WINS',
  DUO_WINS: 'DUO_WINS',
  POINTS_TAKEN: 'POINTS_TAKEN',
  ZINGS_MADE: 'ZINGS_MADE',
  GAMES_HOSTED: 'GAMES_HOSTED',
  FRIENDS_ADDED: 'FRIENDS_ADDED'
};

exports.LeaderboardCategory = exports.$Enums.LeaderboardCategory = {
  WINS: 'WINS',
  ZINGS: 'ZINGS',
  POINTS: 'POINTS'
};

exports.LeaderboardPeriod = exports.$Enums.LeaderboardPeriod = {
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  YEARLY: 'YEARLY',
  ALL_TIME: 'ALL_TIME'
};

exports.Prisma.ModelName = {
  User: 'User',
  Friendship: 'Friendship',
  RoomInvite: 'RoomInvite',
  Game: 'Game',
  Player: 'Player',
  GameEvent: 'GameEvent',
  GameSnapshot: 'GameSnapshot',
  RoundScore: 'RoundScore',
  MatchHistory: 'MatchHistory',
  UserStats: 'UserStats',
  Achievement: 'Achievement',
  UserAchievement: 'UserAchievement',
  LeaderboardSnapshot: 'LeaderboardSnapshot'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
