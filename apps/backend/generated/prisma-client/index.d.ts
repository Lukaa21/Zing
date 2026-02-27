
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Friendship
 * 
 */
export type Friendship = $Result.DefaultSelection<Prisma.$FriendshipPayload>
/**
 * Model RoomInvite
 * 
 */
export type RoomInvite = $Result.DefaultSelection<Prisma.$RoomInvitePayload>
/**
 * Model Game
 * 
 */
export type Game = $Result.DefaultSelection<Prisma.$GamePayload>
/**
 * Model Player
 * 
 */
export type Player = $Result.DefaultSelection<Prisma.$PlayerPayload>
/**
 * Model GameEvent
 * 
 */
export type GameEvent = $Result.DefaultSelection<Prisma.$GameEventPayload>
/**
 * Model GameSnapshot
 * 
 */
export type GameSnapshot = $Result.DefaultSelection<Prisma.$GameSnapshotPayload>
/**
 * Model RoundScore
 * 
 */
export type RoundScore = $Result.DefaultSelection<Prisma.$RoundScorePayload>
/**
 * Model MatchHistory
 * 
 */
export type MatchHistory = $Result.DefaultSelection<Prisma.$MatchHistoryPayload>
/**
 * Model UserStats
 * 
 */
export type UserStats = $Result.DefaultSelection<Prisma.$UserStatsPayload>
/**
 * Model Achievement
 * 
 */
export type Achievement = $Result.DefaultSelection<Prisma.$AchievementPayload>
/**
 * Model UserAchievement
 * 
 */
export type UserAchievement = $Result.DefaultSelection<Prisma.$UserAchievementPayload>
/**
 * Model LeaderboardSnapshot
 * 
 */
export type LeaderboardSnapshot = $Result.DefaultSelection<Prisma.$LeaderboardSnapshotPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const FriendshipStatus: {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
};

export type FriendshipStatus = (typeof FriendshipStatus)[keyof typeof FriendshipStatus]


export const RoomInviteStatus: {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED'
};

export type RoomInviteStatus = (typeof RoomInviteStatus)[keyof typeof RoomInviteStatus]


export const AchievementType: {
  GAMES_PLAYED: 'GAMES_PLAYED',
  SOLO_WINS: 'SOLO_WINS',
  DUO_WINS: 'DUO_WINS',
  POINTS_TAKEN: 'POINTS_TAKEN',
  ZINGS_MADE: 'ZINGS_MADE',
  GAMES_HOSTED: 'GAMES_HOSTED',
  FRIENDS_ADDED: 'FRIENDS_ADDED'
};

export type AchievementType = (typeof AchievementType)[keyof typeof AchievementType]


export const LeaderboardCategory: {
  WINS: 'WINS',
  ZINGS: 'ZINGS',
  POINTS: 'POINTS'
};

export type LeaderboardCategory = (typeof LeaderboardCategory)[keyof typeof LeaderboardCategory]


export const LeaderboardPeriod: {
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  YEARLY: 'YEARLY',
  ALL_TIME: 'ALL_TIME'
};

export type LeaderboardPeriod = (typeof LeaderboardPeriod)[keyof typeof LeaderboardPeriod]

}

export type FriendshipStatus = $Enums.FriendshipStatus

export const FriendshipStatus: typeof $Enums.FriendshipStatus

export type RoomInviteStatus = $Enums.RoomInviteStatus

export const RoomInviteStatus: typeof $Enums.RoomInviteStatus

export type AchievementType = $Enums.AchievementType

export const AchievementType: typeof $Enums.AchievementType

export type LeaderboardCategory = $Enums.LeaderboardCategory

export const LeaderboardCategory: typeof $Enums.LeaderboardCategory

export type LeaderboardPeriod = $Enums.LeaderboardPeriod

export const LeaderboardPeriod: typeof $Enums.LeaderboardPeriod

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.friendship`: Exposes CRUD operations for the **Friendship** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Friendships
    * const friendships = await prisma.friendship.findMany()
    * ```
    */
  get friendship(): Prisma.FriendshipDelegate<ExtArgs>;

  /**
   * `prisma.roomInvite`: Exposes CRUD operations for the **RoomInvite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoomInvites
    * const roomInvites = await prisma.roomInvite.findMany()
    * ```
    */
  get roomInvite(): Prisma.RoomInviteDelegate<ExtArgs>;

  /**
   * `prisma.game`: Exposes CRUD operations for the **Game** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Games
    * const games = await prisma.game.findMany()
    * ```
    */
  get game(): Prisma.GameDelegate<ExtArgs>;

  /**
   * `prisma.player`: Exposes CRUD operations for the **Player** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Players
    * const players = await prisma.player.findMany()
    * ```
    */
  get player(): Prisma.PlayerDelegate<ExtArgs>;

  /**
   * `prisma.gameEvent`: Exposes CRUD operations for the **GameEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GameEvents
    * const gameEvents = await prisma.gameEvent.findMany()
    * ```
    */
  get gameEvent(): Prisma.GameEventDelegate<ExtArgs>;

  /**
   * `prisma.gameSnapshot`: Exposes CRUD operations for the **GameSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GameSnapshots
    * const gameSnapshots = await prisma.gameSnapshot.findMany()
    * ```
    */
  get gameSnapshot(): Prisma.GameSnapshotDelegate<ExtArgs>;

  /**
   * `prisma.roundScore`: Exposes CRUD operations for the **RoundScore** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoundScores
    * const roundScores = await prisma.roundScore.findMany()
    * ```
    */
  get roundScore(): Prisma.RoundScoreDelegate<ExtArgs>;

  /**
   * `prisma.matchHistory`: Exposes CRUD operations for the **MatchHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MatchHistories
    * const matchHistories = await prisma.matchHistory.findMany()
    * ```
    */
  get matchHistory(): Prisma.MatchHistoryDelegate<ExtArgs>;

  /**
   * `prisma.userStats`: Exposes CRUD operations for the **UserStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserStats
    * const userStats = await prisma.userStats.findMany()
    * ```
    */
  get userStats(): Prisma.UserStatsDelegate<ExtArgs>;

  /**
   * `prisma.achievement`: Exposes CRUD operations for the **Achievement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Achievements
    * const achievements = await prisma.achievement.findMany()
    * ```
    */
  get achievement(): Prisma.AchievementDelegate<ExtArgs>;

  /**
   * `prisma.userAchievement`: Exposes CRUD operations for the **UserAchievement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserAchievements
    * const userAchievements = await prisma.userAchievement.findMany()
    * ```
    */
  get userAchievement(): Prisma.UserAchievementDelegate<ExtArgs>;

  /**
   * `prisma.leaderboardSnapshot`: Exposes CRUD operations for the **LeaderboardSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LeaderboardSnapshots
    * const leaderboardSnapshots = await prisma.leaderboardSnapshot.findMany()
    * ```
    */
  get leaderboardSnapshot(): Prisma.LeaderboardSnapshotDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "friendship" | "roomInvite" | "game" | "player" | "gameEvent" | "gameSnapshot" | "roundScore" | "matchHistory" | "userStats" | "achievement" | "userAchievement" | "leaderboardSnapshot"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Friendship: {
        payload: Prisma.$FriendshipPayload<ExtArgs>
        fields: Prisma.FriendshipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FriendshipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FriendshipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>
          }
          findFirst: {
            args: Prisma.FriendshipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FriendshipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>
          }
          findMany: {
            args: Prisma.FriendshipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>[]
          }
          create: {
            args: Prisma.FriendshipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>
          }
          createMany: {
            args: Prisma.FriendshipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FriendshipCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>[]
          }
          delete: {
            args: Prisma.FriendshipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>
          }
          update: {
            args: Prisma.FriendshipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>
          }
          deleteMany: {
            args: Prisma.FriendshipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FriendshipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FriendshipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>
          }
          aggregate: {
            args: Prisma.FriendshipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFriendship>
          }
          groupBy: {
            args: Prisma.FriendshipGroupByArgs<ExtArgs>
            result: $Utils.Optional<FriendshipGroupByOutputType>[]
          }
          count: {
            args: Prisma.FriendshipCountArgs<ExtArgs>
            result: $Utils.Optional<FriendshipCountAggregateOutputType> | number
          }
        }
      }
      RoomInvite: {
        payload: Prisma.$RoomInvitePayload<ExtArgs>
        fields: Prisma.RoomInviteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomInviteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomInvitePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomInviteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomInvitePayload>
          }
          findFirst: {
            args: Prisma.RoomInviteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomInvitePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomInviteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomInvitePayload>
          }
          findMany: {
            args: Prisma.RoomInviteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomInvitePayload>[]
          }
          create: {
            args: Prisma.RoomInviteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomInvitePayload>
          }
          createMany: {
            args: Prisma.RoomInviteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomInviteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomInvitePayload>[]
          }
          delete: {
            args: Prisma.RoomInviteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomInvitePayload>
          }
          update: {
            args: Prisma.RoomInviteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomInvitePayload>
          }
          deleteMany: {
            args: Prisma.RoomInviteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomInviteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoomInviteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomInvitePayload>
          }
          aggregate: {
            args: Prisma.RoomInviteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoomInvite>
          }
          groupBy: {
            args: Prisma.RoomInviteGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomInviteGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomInviteCountArgs<ExtArgs>
            result: $Utils.Optional<RoomInviteCountAggregateOutputType> | number
          }
        }
      }
      Game: {
        payload: Prisma.$GamePayload<ExtArgs>
        fields: Prisma.GameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findFirst: {
            args: Prisma.GameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findMany: {
            args: Prisma.GameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          create: {
            args: Prisma.GameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          createMany: {
            args: Prisma.GameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          delete: {
            args: Prisma.GameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          update: {
            args: Prisma.GameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          deleteMany: {
            args: Prisma.GameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          aggregate: {
            args: Prisma.GameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGame>
          }
          groupBy: {
            args: Prisma.GameGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameCountArgs<ExtArgs>
            result: $Utils.Optional<GameCountAggregateOutputType> | number
          }
        }
      }
      Player: {
        payload: Prisma.$PlayerPayload<ExtArgs>
        fields: Prisma.PlayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          findFirst: {
            args: Prisma.PlayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          findMany: {
            args: Prisma.PlayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          create: {
            args: Prisma.PlayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          createMany: {
            args: Prisma.PlayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlayerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          delete: {
            args: Prisma.PlayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          update: {
            args: Prisma.PlayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          deleteMany: {
            args: Prisma.PlayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PlayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          aggregate: {
            args: Prisma.PlayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlayer>
          }
          groupBy: {
            args: Prisma.PlayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlayerCountArgs<ExtArgs>
            result: $Utils.Optional<PlayerCountAggregateOutputType> | number
          }
        }
      }
      GameEvent: {
        payload: Prisma.$GameEventPayload<ExtArgs>
        fields: Prisma.GameEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameEventPayload>
          }
          findFirst: {
            args: Prisma.GameEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameEventPayload>
          }
          findMany: {
            args: Prisma.GameEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameEventPayload>[]
          }
          create: {
            args: Prisma.GameEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameEventPayload>
          }
          createMany: {
            args: Prisma.GameEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameEventPayload>[]
          }
          delete: {
            args: Prisma.GameEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameEventPayload>
          }
          update: {
            args: Prisma.GameEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameEventPayload>
          }
          deleteMany: {
            args: Prisma.GameEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GameEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameEventPayload>
          }
          aggregate: {
            args: Prisma.GameEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGameEvent>
          }
          groupBy: {
            args: Prisma.GameEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameEventCountArgs<ExtArgs>
            result: $Utils.Optional<GameEventCountAggregateOutputType> | number
          }
        }
      }
      GameSnapshot: {
        payload: Prisma.$GameSnapshotPayload<ExtArgs>
        fields: Prisma.GameSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameSnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameSnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameSnapshotPayload>
          }
          findFirst: {
            args: Prisma.GameSnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameSnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameSnapshotPayload>
          }
          findMany: {
            args: Prisma.GameSnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameSnapshotPayload>[]
          }
          create: {
            args: Prisma.GameSnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameSnapshotPayload>
          }
          createMany: {
            args: Prisma.GameSnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameSnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameSnapshotPayload>[]
          }
          delete: {
            args: Prisma.GameSnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameSnapshotPayload>
          }
          update: {
            args: Prisma.GameSnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.GameSnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameSnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GameSnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameSnapshotPayload>
          }
          aggregate: {
            args: Prisma.GameSnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGameSnapshot>
          }
          groupBy: {
            args: Prisma.GameSnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameSnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<GameSnapshotCountAggregateOutputType> | number
          }
        }
      }
      RoundScore: {
        payload: Prisma.$RoundScorePayload<ExtArgs>
        fields: Prisma.RoundScoreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoundScoreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoundScorePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoundScoreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoundScorePayload>
          }
          findFirst: {
            args: Prisma.RoundScoreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoundScorePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoundScoreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoundScorePayload>
          }
          findMany: {
            args: Prisma.RoundScoreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoundScorePayload>[]
          }
          create: {
            args: Prisma.RoundScoreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoundScorePayload>
          }
          createMany: {
            args: Prisma.RoundScoreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoundScoreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoundScorePayload>[]
          }
          delete: {
            args: Prisma.RoundScoreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoundScorePayload>
          }
          update: {
            args: Prisma.RoundScoreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoundScorePayload>
          }
          deleteMany: {
            args: Prisma.RoundScoreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoundScoreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoundScoreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoundScorePayload>
          }
          aggregate: {
            args: Prisma.RoundScoreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoundScore>
          }
          groupBy: {
            args: Prisma.RoundScoreGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoundScoreGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoundScoreCountArgs<ExtArgs>
            result: $Utils.Optional<RoundScoreCountAggregateOutputType> | number
          }
        }
      }
      MatchHistory: {
        payload: Prisma.$MatchHistoryPayload<ExtArgs>
        fields: Prisma.MatchHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MatchHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MatchHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchHistoryPayload>
          }
          findFirst: {
            args: Prisma.MatchHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MatchHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchHistoryPayload>
          }
          findMany: {
            args: Prisma.MatchHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchHistoryPayload>[]
          }
          create: {
            args: Prisma.MatchHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchHistoryPayload>
          }
          createMany: {
            args: Prisma.MatchHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MatchHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchHistoryPayload>[]
          }
          delete: {
            args: Prisma.MatchHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchHistoryPayload>
          }
          update: {
            args: Prisma.MatchHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchHistoryPayload>
          }
          deleteMany: {
            args: Prisma.MatchHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MatchHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MatchHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchHistoryPayload>
          }
          aggregate: {
            args: Prisma.MatchHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMatchHistory>
          }
          groupBy: {
            args: Prisma.MatchHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<MatchHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.MatchHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<MatchHistoryCountAggregateOutputType> | number
          }
        }
      }
      UserStats: {
        payload: Prisma.$UserStatsPayload<ExtArgs>
        fields: Prisma.UserStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          findFirst: {
            args: Prisma.UserStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          findMany: {
            args: Prisma.UserStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>[]
          }
          create: {
            args: Prisma.UserStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          createMany: {
            args: Prisma.UserStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserStatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>[]
          }
          delete: {
            args: Prisma.UserStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          update: {
            args: Prisma.UserStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          deleteMany: {
            args: Prisma.UserStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          aggregate: {
            args: Prisma.UserStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserStats>
          }
          groupBy: {
            args: Prisma.UserStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserStatsCountArgs<ExtArgs>
            result: $Utils.Optional<UserStatsCountAggregateOutputType> | number
          }
        }
      }
      Achievement: {
        payload: Prisma.$AchievementPayload<ExtArgs>
        fields: Prisma.AchievementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AchievementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AchievementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          findFirst: {
            args: Prisma.AchievementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AchievementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          findMany: {
            args: Prisma.AchievementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>[]
          }
          create: {
            args: Prisma.AchievementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          createMany: {
            args: Prisma.AchievementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AchievementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>[]
          }
          delete: {
            args: Prisma.AchievementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          update: {
            args: Prisma.AchievementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          deleteMany: {
            args: Prisma.AchievementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AchievementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AchievementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          aggregate: {
            args: Prisma.AchievementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAchievement>
          }
          groupBy: {
            args: Prisma.AchievementGroupByArgs<ExtArgs>
            result: $Utils.Optional<AchievementGroupByOutputType>[]
          }
          count: {
            args: Prisma.AchievementCountArgs<ExtArgs>
            result: $Utils.Optional<AchievementCountAggregateOutputType> | number
          }
        }
      }
      UserAchievement: {
        payload: Prisma.$UserAchievementPayload<ExtArgs>
        fields: Prisma.UserAchievementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserAchievementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserAchievementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>
          }
          findFirst: {
            args: Prisma.UserAchievementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserAchievementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>
          }
          findMany: {
            args: Prisma.UserAchievementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>[]
          }
          create: {
            args: Prisma.UserAchievementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>
          }
          createMany: {
            args: Prisma.UserAchievementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserAchievementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>[]
          }
          delete: {
            args: Prisma.UserAchievementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>
          }
          update: {
            args: Prisma.UserAchievementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>
          }
          deleteMany: {
            args: Prisma.UserAchievementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserAchievementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserAchievementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAchievementPayload>
          }
          aggregate: {
            args: Prisma.UserAchievementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserAchievement>
          }
          groupBy: {
            args: Prisma.UserAchievementGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserAchievementGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserAchievementCountArgs<ExtArgs>
            result: $Utils.Optional<UserAchievementCountAggregateOutputType> | number
          }
        }
      }
      LeaderboardSnapshot: {
        payload: Prisma.$LeaderboardSnapshotPayload<ExtArgs>
        fields: Prisma.LeaderboardSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeaderboardSnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeaderboardSnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardSnapshotPayload>
          }
          findFirst: {
            args: Prisma.LeaderboardSnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeaderboardSnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardSnapshotPayload>
          }
          findMany: {
            args: Prisma.LeaderboardSnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardSnapshotPayload>[]
          }
          create: {
            args: Prisma.LeaderboardSnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardSnapshotPayload>
          }
          createMany: {
            args: Prisma.LeaderboardSnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeaderboardSnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardSnapshotPayload>[]
          }
          delete: {
            args: Prisma.LeaderboardSnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardSnapshotPayload>
          }
          update: {
            args: Prisma.LeaderboardSnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.LeaderboardSnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeaderboardSnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LeaderboardSnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardSnapshotPayload>
          }
          aggregate: {
            args: Prisma.LeaderboardSnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeaderboardSnapshot>
          }
          groupBy: {
            args: Prisma.LeaderboardSnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeaderboardSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeaderboardSnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<LeaderboardSnapshotCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    friendRequestsSent: number
    friendRequestsReceived: number
    invitesSent: number
    invitesReceived: number
    achievements: number
    leaderboardEntries: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    friendRequestsSent?: boolean | UserCountOutputTypeCountFriendRequestsSentArgs
    friendRequestsReceived?: boolean | UserCountOutputTypeCountFriendRequestsReceivedArgs
    invitesSent?: boolean | UserCountOutputTypeCountInvitesSentArgs
    invitesReceived?: boolean | UserCountOutputTypeCountInvitesReceivedArgs
    achievements?: boolean | UserCountOutputTypeCountAchievementsArgs
    leaderboardEntries?: boolean | UserCountOutputTypeCountLeaderboardEntriesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFriendRequestsSentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendshipWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFriendRequestsReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendshipWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInvitesSentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomInviteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInvitesReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomInviteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAchievementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAchievementWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLeaderboardEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaderboardSnapshotWhereInput
  }


  /**
   * Count Type GameCountOutputType
   */

  export type GameCountOutputType = {
    events: number
  }

  export type GameCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | GameCountOutputTypeCountEventsArgs
  }

  // Custom InputTypes
  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCountOutputType
     */
    select?: GameCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameEventWhereInput
  }


  /**
   * Count Type AchievementCountOutputType
   */

  export type AchievementCountOutputType = {
    unlockedBy: number
  }

  export type AchievementCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    unlockedBy?: boolean | AchievementCountOutputTypeCountUnlockedByArgs
  }

  // Custom InputTypes
  /**
   * AchievementCountOutputType without action
   */
  export type AchievementCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AchievementCountOutputType
     */
    select?: AchievementCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AchievementCountOutputType without action
   */
  export type AchievementCountOutputTypeCountUnlockedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAchievementWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    email: number
    passwordHash: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    email: string
    passwordHash: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    friendRequestsSent?: boolean | User$friendRequestsSentArgs<ExtArgs>
    friendRequestsReceived?: boolean | User$friendRequestsReceivedArgs<ExtArgs>
    invitesSent?: boolean | User$invitesSentArgs<ExtArgs>
    invitesReceived?: boolean | User$invitesReceivedArgs<ExtArgs>
    stats?: boolean | User$statsArgs<ExtArgs>
    achievements?: boolean | User$achievementsArgs<ExtArgs>
    leaderboardEntries?: boolean | User$leaderboardEntriesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    friendRequestsSent?: boolean | User$friendRequestsSentArgs<ExtArgs>
    friendRequestsReceived?: boolean | User$friendRequestsReceivedArgs<ExtArgs>
    invitesSent?: boolean | User$invitesSentArgs<ExtArgs>
    invitesReceived?: boolean | User$invitesReceivedArgs<ExtArgs>
    stats?: boolean | User$statsArgs<ExtArgs>
    achievements?: boolean | User$achievementsArgs<ExtArgs>
    leaderboardEntries?: boolean | User$leaderboardEntriesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      friendRequestsSent: Prisma.$FriendshipPayload<ExtArgs>[]
      friendRequestsReceived: Prisma.$FriendshipPayload<ExtArgs>[]
      invitesSent: Prisma.$RoomInvitePayload<ExtArgs>[]
      invitesReceived: Prisma.$RoomInvitePayload<ExtArgs>[]
      stats: Prisma.$UserStatsPayload<ExtArgs> | null
      achievements: Prisma.$UserAchievementPayload<ExtArgs>[]
      leaderboardEntries: Prisma.$LeaderboardSnapshotPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      email: string
      passwordHash: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    friendRequestsSent<T extends User$friendRequestsSentArgs<ExtArgs> = {}>(args?: Subset<T, User$friendRequestsSentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findMany"> | Null>
    friendRequestsReceived<T extends User$friendRequestsReceivedArgs<ExtArgs> = {}>(args?: Subset<T, User$friendRequestsReceivedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findMany"> | Null>
    invitesSent<T extends User$invitesSentArgs<ExtArgs> = {}>(args?: Subset<T, User$invitesSentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomInvitePayload<ExtArgs>, T, "findMany"> | Null>
    invitesReceived<T extends User$invitesReceivedArgs<ExtArgs> = {}>(args?: Subset<T, User$invitesReceivedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomInvitePayload<ExtArgs>, T, "findMany"> | Null>
    stats<T extends User$statsArgs<ExtArgs> = {}>(args?: Subset<T, User$statsArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    achievements<T extends User$achievementsArgs<ExtArgs> = {}>(args?: Subset<T, User$achievementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "findMany"> | Null>
    leaderboardEntries<T extends User$leaderboardEntriesArgs<ExtArgs> = {}>(args?: Subset<T, User$leaderboardEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaderboardSnapshotPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.friendRequestsSent
   */
  export type User$friendRequestsSentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    where?: FriendshipWhereInput
    orderBy?: FriendshipOrderByWithRelationInput | FriendshipOrderByWithRelationInput[]
    cursor?: FriendshipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendshipScalarFieldEnum | FriendshipScalarFieldEnum[]
  }

  /**
   * User.friendRequestsReceived
   */
  export type User$friendRequestsReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    where?: FriendshipWhereInput
    orderBy?: FriendshipOrderByWithRelationInput | FriendshipOrderByWithRelationInput[]
    cursor?: FriendshipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendshipScalarFieldEnum | FriendshipScalarFieldEnum[]
  }

  /**
   * User.invitesSent
   */
  export type User$invitesSentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomInvite
     */
    select?: RoomInviteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInviteInclude<ExtArgs> | null
    where?: RoomInviteWhereInput
    orderBy?: RoomInviteOrderByWithRelationInput | RoomInviteOrderByWithRelationInput[]
    cursor?: RoomInviteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomInviteScalarFieldEnum | RoomInviteScalarFieldEnum[]
  }

  /**
   * User.invitesReceived
   */
  export type User$invitesReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomInvite
     */
    select?: RoomInviteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInviteInclude<ExtArgs> | null
    where?: RoomInviteWhereInput
    orderBy?: RoomInviteOrderByWithRelationInput | RoomInviteOrderByWithRelationInput[]
    cursor?: RoomInviteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomInviteScalarFieldEnum | RoomInviteScalarFieldEnum[]
  }

  /**
   * User.stats
   */
  export type User$statsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    where?: UserStatsWhereInput
  }

  /**
   * User.achievements
   */
  export type User$achievementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    where?: UserAchievementWhereInput
    orderBy?: UserAchievementOrderByWithRelationInput | UserAchievementOrderByWithRelationInput[]
    cursor?: UserAchievementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserAchievementScalarFieldEnum | UserAchievementScalarFieldEnum[]
  }

  /**
   * User.leaderboardEntries
   */
  export type User$leaderboardEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardSnapshot
     */
    select?: LeaderboardSnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaderboardSnapshotInclude<ExtArgs> | null
    where?: LeaderboardSnapshotWhereInput
    orderBy?: LeaderboardSnapshotOrderByWithRelationInput | LeaderboardSnapshotOrderByWithRelationInput[]
    cursor?: LeaderboardSnapshotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeaderboardSnapshotScalarFieldEnum | LeaderboardSnapshotScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Friendship
   */

  export type AggregateFriendship = {
    _count: FriendshipCountAggregateOutputType | null
    _min: FriendshipMinAggregateOutputType | null
    _max: FriendshipMaxAggregateOutputType | null
  }

  export type FriendshipMinAggregateOutputType = {
    id: string | null
    requesterId: string | null
    addresseeId: string | null
    status: $Enums.FriendshipStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FriendshipMaxAggregateOutputType = {
    id: string | null
    requesterId: string | null
    addresseeId: string | null
    status: $Enums.FriendshipStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FriendshipCountAggregateOutputType = {
    id: number
    requesterId: number
    addresseeId: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FriendshipMinAggregateInputType = {
    id?: true
    requesterId?: true
    addresseeId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FriendshipMaxAggregateInputType = {
    id?: true
    requesterId?: true
    addresseeId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FriendshipCountAggregateInputType = {
    id?: true
    requesterId?: true
    addresseeId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FriendshipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Friendship to aggregate.
     */
    where?: FriendshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friendships to fetch.
     */
    orderBy?: FriendshipOrderByWithRelationInput | FriendshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FriendshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friendships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friendships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Friendships
    **/
    _count?: true | FriendshipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FriendshipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FriendshipMaxAggregateInputType
  }

  export type GetFriendshipAggregateType<T extends FriendshipAggregateArgs> = {
        [P in keyof T & keyof AggregateFriendship]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFriendship[P]>
      : GetScalarType<T[P], AggregateFriendship[P]>
  }




  export type FriendshipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendshipWhereInput
    orderBy?: FriendshipOrderByWithAggregationInput | FriendshipOrderByWithAggregationInput[]
    by: FriendshipScalarFieldEnum[] | FriendshipScalarFieldEnum
    having?: FriendshipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FriendshipCountAggregateInputType | true
    _min?: FriendshipMinAggregateInputType
    _max?: FriendshipMaxAggregateInputType
  }

  export type FriendshipGroupByOutputType = {
    id: string
    requesterId: string
    addresseeId: string
    status: $Enums.FriendshipStatus
    createdAt: Date
    updatedAt: Date
    _count: FriendshipCountAggregateOutputType | null
    _min: FriendshipMinAggregateOutputType | null
    _max: FriendshipMaxAggregateOutputType | null
  }

  type GetFriendshipGroupByPayload<T extends FriendshipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FriendshipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FriendshipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FriendshipGroupByOutputType[P]>
            : GetScalarType<T[P], FriendshipGroupByOutputType[P]>
        }
      >
    >


  export type FriendshipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requesterId?: boolean
    addresseeId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    requester?: boolean | UserDefaultArgs<ExtArgs>
    addressee?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friendship"]>

  export type FriendshipSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requesterId?: boolean
    addresseeId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    requester?: boolean | UserDefaultArgs<ExtArgs>
    addressee?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friendship"]>

  export type FriendshipSelectScalar = {
    id?: boolean
    requesterId?: boolean
    addresseeId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FriendshipInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requester?: boolean | UserDefaultArgs<ExtArgs>
    addressee?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FriendshipIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requester?: boolean | UserDefaultArgs<ExtArgs>
    addressee?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FriendshipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Friendship"
    objects: {
      requester: Prisma.$UserPayload<ExtArgs>
      addressee: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      requesterId: string
      addresseeId: string
      status: $Enums.FriendshipStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["friendship"]>
    composites: {}
  }

  type FriendshipGetPayload<S extends boolean | null | undefined | FriendshipDefaultArgs> = $Result.GetResult<Prisma.$FriendshipPayload, S>

  type FriendshipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FriendshipFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FriendshipCountAggregateInputType | true
    }

  export interface FriendshipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Friendship'], meta: { name: 'Friendship' } }
    /**
     * Find zero or one Friendship that matches the filter.
     * @param {FriendshipFindUniqueArgs} args - Arguments to find a Friendship
     * @example
     * // Get one Friendship
     * const friendship = await prisma.friendship.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FriendshipFindUniqueArgs>(args: SelectSubset<T, FriendshipFindUniqueArgs<ExtArgs>>): Prisma__FriendshipClient<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Friendship that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FriendshipFindUniqueOrThrowArgs} args - Arguments to find a Friendship
     * @example
     * // Get one Friendship
     * const friendship = await prisma.friendship.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FriendshipFindUniqueOrThrowArgs>(args: SelectSubset<T, FriendshipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FriendshipClient<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Friendship that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipFindFirstArgs} args - Arguments to find a Friendship
     * @example
     * // Get one Friendship
     * const friendship = await prisma.friendship.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FriendshipFindFirstArgs>(args?: SelectSubset<T, FriendshipFindFirstArgs<ExtArgs>>): Prisma__FriendshipClient<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Friendship that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipFindFirstOrThrowArgs} args - Arguments to find a Friendship
     * @example
     * // Get one Friendship
     * const friendship = await prisma.friendship.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FriendshipFindFirstOrThrowArgs>(args?: SelectSubset<T, FriendshipFindFirstOrThrowArgs<ExtArgs>>): Prisma__FriendshipClient<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Friendships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Friendships
     * const friendships = await prisma.friendship.findMany()
     * 
     * // Get first 10 Friendships
     * const friendships = await prisma.friendship.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const friendshipWithIdOnly = await prisma.friendship.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FriendshipFindManyArgs>(args?: SelectSubset<T, FriendshipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Friendship.
     * @param {FriendshipCreateArgs} args - Arguments to create a Friendship.
     * @example
     * // Create one Friendship
     * const Friendship = await prisma.friendship.create({
     *   data: {
     *     // ... data to create a Friendship
     *   }
     * })
     * 
     */
    create<T extends FriendshipCreateArgs>(args: SelectSubset<T, FriendshipCreateArgs<ExtArgs>>): Prisma__FriendshipClient<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Friendships.
     * @param {FriendshipCreateManyArgs} args - Arguments to create many Friendships.
     * @example
     * // Create many Friendships
     * const friendship = await prisma.friendship.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FriendshipCreateManyArgs>(args?: SelectSubset<T, FriendshipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Friendships and returns the data saved in the database.
     * @param {FriendshipCreateManyAndReturnArgs} args - Arguments to create many Friendships.
     * @example
     * // Create many Friendships
     * const friendship = await prisma.friendship.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Friendships and only return the `id`
     * const friendshipWithIdOnly = await prisma.friendship.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FriendshipCreateManyAndReturnArgs>(args?: SelectSubset<T, FriendshipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Friendship.
     * @param {FriendshipDeleteArgs} args - Arguments to delete one Friendship.
     * @example
     * // Delete one Friendship
     * const Friendship = await prisma.friendship.delete({
     *   where: {
     *     // ... filter to delete one Friendship
     *   }
     * })
     * 
     */
    delete<T extends FriendshipDeleteArgs>(args: SelectSubset<T, FriendshipDeleteArgs<ExtArgs>>): Prisma__FriendshipClient<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Friendship.
     * @param {FriendshipUpdateArgs} args - Arguments to update one Friendship.
     * @example
     * // Update one Friendship
     * const friendship = await prisma.friendship.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FriendshipUpdateArgs>(args: SelectSubset<T, FriendshipUpdateArgs<ExtArgs>>): Prisma__FriendshipClient<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Friendships.
     * @param {FriendshipDeleteManyArgs} args - Arguments to filter Friendships to delete.
     * @example
     * // Delete a few Friendships
     * const { count } = await prisma.friendship.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FriendshipDeleteManyArgs>(args?: SelectSubset<T, FriendshipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Friendships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Friendships
     * const friendship = await prisma.friendship.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FriendshipUpdateManyArgs>(args: SelectSubset<T, FriendshipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Friendship.
     * @param {FriendshipUpsertArgs} args - Arguments to update or create a Friendship.
     * @example
     * // Update or create a Friendship
     * const friendship = await prisma.friendship.upsert({
     *   create: {
     *     // ... data to create a Friendship
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Friendship we want to update
     *   }
     * })
     */
    upsert<T extends FriendshipUpsertArgs>(args: SelectSubset<T, FriendshipUpsertArgs<ExtArgs>>): Prisma__FriendshipClient<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Friendships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipCountArgs} args - Arguments to filter Friendships to count.
     * @example
     * // Count the number of Friendships
     * const count = await prisma.friendship.count({
     *   where: {
     *     // ... the filter for the Friendships we want to count
     *   }
     * })
    **/
    count<T extends FriendshipCountArgs>(
      args?: Subset<T, FriendshipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FriendshipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Friendship.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FriendshipAggregateArgs>(args: Subset<T, FriendshipAggregateArgs>): Prisma.PrismaPromise<GetFriendshipAggregateType<T>>

    /**
     * Group by Friendship.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FriendshipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FriendshipGroupByArgs['orderBy'] }
        : { orderBy?: FriendshipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FriendshipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFriendshipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Friendship model
   */
  readonly fields: FriendshipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Friendship.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FriendshipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    requester<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    addressee<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Friendship model
   */ 
  interface FriendshipFieldRefs {
    readonly id: FieldRef<"Friendship", 'String'>
    readonly requesterId: FieldRef<"Friendship", 'String'>
    readonly addresseeId: FieldRef<"Friendship", 'String'>
    readonly status: FieldRef<"Friendship", 'FriendshipStatus'>
    readonly createdAt: FieldRef<"Friendship", 'DateTime'>
    readonly updatedAt: FieldRef<"Friendship", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Friendship findUnique
   */
  export type FriendshipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    /**
     * Filter, which Friendship to fetch.
     */
    where: FriendshipWhereUniqueInput
  }

  /**
   * Friendship findUniqueOrThrow
   */
  export type FriendshipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    /**
     * Filter, which Friendship to fetch.
     */
    where: FriendshipWhereUniqueInput
  }

  /**
   * Friendship findFirst
   */
  export type FriendshipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    /**
     * Filter, which Friendship to fetch.
     */
    where?: FriendshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friendships to fetch.
     */
    orderBy?: FriendshipOrderByWithRelationInput | FriendshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Friendships.
     */
    cursor?: FriendshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friendships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friendships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Friendships.
     */
    distinct?: FriendshipScalarFieldEnum | FriendshipScalarFieldEnum[]
  }

  /**
   * Friendship findFirstOrThrow
   */
  export type FriendshipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    /**
     * Filter, which Friendship to fetch.
     */
    where?: FriendshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friendships to fetch.
     */
    orderBy?: FriendshipOrderByWithRelationInput | FriendshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Friendships.
     */
    cursor?: FriendshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friendships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friendships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Friendships.
     */
    distinct?: FriendshipScalarFieldEnum | FriendshipScalarFieldEnum[]
  }

  /**
   * Friendship findMany
   */
  export type FriendshipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    /**
     * Filter, which Friendships to fetch.
     */
    where?: FriendshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friendships to fetch.
     */
    orderBy?: FriendshipOrderByWithRelationInput | FriendshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Friendships.
     */
    cursor?: FriendshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friendships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friendships.
     */
    skip?: number
    distinct?: FriendshipScalarFieldEnum | FriendshipScalarFieldEnum[]
  }

  /**
   * Friendship create
   */
  export type FriendshipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    /**
     * The data needed to create a Friendship.
     */
    data: XOR<FriendshipCreateInput, FriendshipUncheckedCreateInput>
  }

  /**
   * Friendship createMany
   */
  export type FriendshipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Friendships.
     */
    data: FriendshipCreateManyInput | FriendshipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Friendship createManyAndReturn
   */
  export type FriendshipCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Friendships.
     */
    data: FriendshipCreateManyInput | FriendshipCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Friendship update
   */
  export type FriendshipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    /**
     * The data needed to update a Friendship.
     */
    data: XOR<FriendshipUpdateInput, FriendshipUncheckedUpdateInput>
    /**
     * Choose, which Friendship to update.
     */
    where: FriendshipWhereUniqueInput
  }

  /**
   * Friendship updateMany
   */
  export type FriendshipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Friendships.
     */
    data: XOR<FriendshipUpdateManyMutationInput, FriendshipUncheckedUpdateManyInput>
    /**
     * Filter which Friendships to update
     */
    where?: FriendshipWhereInput
  }

  /**
   * Friendship upsert
   */
  export type FriendshipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    /**
     * The filter to search for the Friendship to update in case it exists.
     */
    where: FriendshipWhereUniqueInput
    /**
     * In case the Friendship found by the `where` argument doesn't exist, create a new Friendship with this data.
     */
    create: XOR<FriendshipCreateInput, FriendshipUncheckedCreateInput>
    /**
     * In case the Friendship was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FriendshipUpdateInput, FriendshipUncheckedUpdateInput>
  }

  /**
   * Friendship delete
   */
  export type FriendshipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    /**
     * Filter which Friendship to delete.
     */
    where: FriendshipWhereUniqueInput
  }

  /**
   * Friendship deleteMany
   */
  export type FriendshipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Friendships to delete
     */
    where?: FriendshipWhereInput
  }

  /**
   * Friendship without action
   */
  export type FriendshipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
  }


  /**
   * Model RoomInvite
   */

  export type AggregateRoomInvite = {
    _count: RoomInviteCountAggregateOutputType | null
    _min: RoomInviteMinAggregateOutputType | null
    _max: RoomInviteMaxAggregateOutputType | null
  }

  export type RoomInviteMinAggregateOutputType = {
    id: string | null
    roomId: string | null
    inviterId: string | null
    inviteeId: string | null
    status: $Enums.RoomInviteStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    expiresAt: Date | null
  }

  export type RoomInviteMaxAggregateOutputType = {
    id: string | null
    roomId: string | null
    inviterId: string | null
    inviteeId: string | null
    status: $Enums.RoomInviteStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    expiresAt: Date | null
  }

  export type RoomInviteCountAggregateOutputType = {
    id: number
    roomId: number
    inviterId: number
    inviteeId: number
    status: number
    createdAt: number
    updatedAt: number
    expiresAt: number
    metadata: number
    _all: number
  }


  export type RoomInviteMinAggregateInputType = {
    id?: true
    roomId?: true
    inviterId?: true
    inviteeId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    expiresAt?: true
  }

  export type RoomInviteMaxAggregateInputType = {
    id?: true
    roomId?: true
    inviterId?: true
    inviteeId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    expiresAt?: true
  }

  export type RoomInviteCountAggregateInputType = {
    id?: true
    roomId?: true
    inviterId?: true
    inviteeId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    expiresAt?: true
    metadata?: true
    _all?: true
  }

  export type RoomInviteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomInvite to aggregate.
     */
    where?: RoomInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomInvites to fetch.
     */
    orderBy?: RoomInviteOrderByWithRelationInput | RoomInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoomInvites
    **/
    _count?: true | RoomInviteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomInviteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomInviteMaxAggregateInputType
  }

  export type GetRoomInviteAggregateType<T extends RoomInviteAggregateArgs> = {
        [P in keyof T & keyof AggregateRoomInvite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomInvite[P]>
      : GetScalarType<T[P], AggregateRoomInvite[P]>
  }




  export type RoomInviteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomInviteWhereInput
    orderBy?: RoomInviteOrderByWithAggregationInput | RoomInviteOrderByWithAggregationInput[]
    by: RoomInviteScalarFieldEnum[] | RoomInviteScalarFieldEnum
    having?: RoomInviteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomInviteCountAggregateInputType | true
    _min?: RoomInviteMinAggregateInputType
    _max?: RoomInviteMaxAggregateInputType
  }

  export type RoomInviteGroupByOutputType = {
    id: string
    roomId: string
    inviterId: string
    inviteeId: string
    status: $Enums.RoomInviteStatus
    createdAt: Date
    updatedAt: Date
    expiresAt: Date
    metadata: JsonValue | null
    _count: RoomInviteCountAggregateOutputType | null
    _min: RoomInviteMinAggregateOutputType | null
    _max: RoomInviteMaxAggregateOutputType | null
  }

  type GetRoomInviteGroupByPayload<T extends RoomInviteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomInviteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomInviteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomInviteGroupByOutputType[P]>
            : GetScalarType<T[P], RoomInviteGroupByOutputType[P]>
        }
      >
    >


  export type RoomInviteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    inviterId?: boolean
    inviteeId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expiresAt?: boolean
    metadata?: boolean
    inviter?: boolean | UserDefaultArgs<ExtArgs>
    invitee?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomInvite"]>

  export type RoomInviteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    inviterId?: boolean
    inviteeId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expiresAt?: boolean
    metadata?: boolean
    inviter?: boolean | UserDefaultArgs<ExtArgs>
    invitee?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomInvite"]>

  export type RoomInviteSelectScalar = {
    id?: boolean
    roomId?: boolean
    inviterId?: boolean
    inviteeId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expiresAt?: boolean
    metadata?: boolean
  }

  export type RoomInviteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inviter?: boolean | UserDefaultArgs<ExtArgs>
    invitee?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RoomInviteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inviter?: boolean | UserDefaultArgs<ExtArgs>
    invitee?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RoomInvitePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoomInvite"
    objects: {
      inviter: Prisma.$UserPayload<ExtArgs>
      invitee: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roomId: string
      inviterId: string
      inviteeId: string
      status: $Enums.RoomInviteStatus
      createdAt: Date
      updatedAt: Date
      expiresAt: Date
      metadata: Prisma.JsonValue | null
    }, ExtArgs["result"]["roomInvite"]>
    composites: {}
  }

  type RoomInviteGetPayload<S extends boolean | null | undefined | RoomInviteDefaultArgs> = $Result.GetResult<Prisma.$RoomInvitePayload, S>

  type RoomInviteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RoomInviteFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RoomInviteCountAggregateInputType | true
    }

  export interface RoomInviteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoomInvite'], meta: { name: 'RoomInvite' } }
    /**
     * Find zero or one RoomInvite that matches the filter.
     * @param {RoomInviteFindUniqueArgs} args - Arguments to find a RoomInvite
     * @example
     * // Get one RoomInvite
     * const roomInvite = await prisma.roomInvite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomInviteFindUniqueArgs>(args: SelectSubset<T, RoomInviteFindUniqueArgs<ExtArgs>>): Prisma__RoomInviteClient<$Result.GetResult<Prisma.$RoomInvitePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RoomInvite that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RoomInviteFindUniqueOrThrowArgs} args - Arguments to find a RoomInvite
     * @example
     * // Get one RoomInvite
     * const roomInvite = await prisma.roomInvite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomInviteFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomInviteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomInviteClient<$Result.GetResult<Prisma.$RoomInvitePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RoomInvite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomInviteFindFirstArgs} args - Arguments to find a RoomInvite
     * @example
     * // Get one RoomInvite
     * const roomInvite = await prisma.roomInvite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomInviteFindFirstArgs>(args?: SelectSubset<T, RoomInviteFindFirstArgs<ExtArgs>>): Prisma__RoomInviteClient<$Result.GetResult<Prisma.$RoomInvitePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RoomInvite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomInviteFindFirstOrThrowArgs} args - Arguments to find a RoomInvite
     * @example
     * // Get one RoomInvite
     * const roomInvite = await prisma.roomInvite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomInviteFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomInviteFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomInviteClient<$Result.GetResult<Prisma.$RoomInvitePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RoomInvites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomInviteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomInvites
     * const roomInvites = await prisma.roomInvite.findMany()
     * 
     * // Get first 10 RoomInvites
     * const roomInvites = await prisma.roomInvite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomInviteWithIdOnly = await prisma.roomInvite.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomInviteFindManyArgs>(args?: SelectSubset<T, RoomInviteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomInvitePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RoomInvite.
     * @param {RoomInviteCreateArgs} args - Arguments to create a RoomInvite.
     * @example
     * // Create one RoomInvite
     * const RoomInvite = await prisma.roomInvite.create({
     *   data: {
     *     // ... data to create a RoomInvite
     *   }
     * })
     * 
     */
    create<T extends RoomInviteCreateArgs>(args: SelectSubset<T, RoomInviteCreateArgs<ExtArgs>>): Prisma__RoomInviteClient<$Result.GetResult<Prisma.$RoomInvitePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RoomInvites.
     * @param {RoomInviteCreateManyArgs} args - Arguments to create many RoomInvites.
     * @example
     * // Create many RoomInvites
     * const roomInvite = await prisma.roomInvite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomInviteCreateManyArgs>(args?: SelectSubset<T, RoomInviteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoomInvites and returns the data saved in the database.
     * @param {RoomInviteCreateManyAndReturnArgs} args - Arguments to create many RoomInvites.
     * @example
     * // Create many RoomInvites
     * const roomInvite = await prisma.roomInvite.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoomInvites and only return the `id`
     * const roomInviteWithIdOnly = await prisma.roomInvite.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomInviteCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomInviteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomInvitePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RoomInvite.
     * @param {RoomInviteDeleteArgs} args - Arguments to delete one RoomInvite.
     * @example
     * // Delete one RoomInvite
     * const RoomInvite = await prisma.roomInvite.delete({
     *   where: {
     *     // ... filter to delete one RoomInvite
     *   }
     * })
     * 
     */
    delete<T extends RoomInviteDeleteArgs>(args: SelectSubset<T, RoomInviteDeleteArgs<ExtArgs>>): Prisma__RoomInviteClient<$Result.GetResult<Prisma.$RoomInvitePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RoomInvite.
     * @param {RoomInviteUpdateArgs} args - Arguments to update one RoomInvite.
     * @example
     * // Update one RoomInvite
     * const roomInvite = await prisma.roomInvite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomInviteUpdateArgs>(args: SelectSubset<T, RoomInviteUpdateArgs<ExtArgs>>): Prisma__RoomInviteClient<$Result.GetResult<Prisma.$RoomInvitePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RoomInvites.
     * @param {RoomInviteDeleteManyArgs} args - Arguments to filter RoomInvites to delete.
     * @example
     * // Delete a few RoomInvites
     * const { count } = await prisma.roomInvite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomInviteDeleteManyArgs>(args?: SelectSubset<T, RoomInviteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomInviteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomInvites
     * const roomInvite = await prisma.roomInvite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomInviteUpdateManyArgs>(args: SelectSubset<T, RoomInviteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RoomInvite.
     * @param {RoomInviteUpsertArgs} args - Arguments to update or create a RoomInvite.
     * @example
     * // Update or create a RoomInvite
     * const roomInvite = await prisma.roomInvite.upsert({
     *   create: {
     *     // ... data to create a RoomInvite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomInvite we want to update
     *   }
     * })
     */
    upsert<T extends RoomInviteUpsertArgs>(args: SelectSubset<T, RoomInviteUpsertArgs<ExtArgs>>): Prisma__RoomInviteClient<$Result.GetResult<Prisma.$RoomInvitePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RoomInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomInviteCountArgs} args - Arguments to filter RoomInvites to count.
     * @example
     * // Count the number of RoomInvites
     * const count = await prisma.roomInvite.count({
     *   where: {
     *     // ... the filter for the RoomInvites we want to count
     *   }
     * })
    **/
    count<T extends RoomInviteCountArgs>(
      args?: Subset<T, RoomInviteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomInviteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoomInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomInviteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomInviteAggregateArgs>(args: Subset<T, RoomInviteAggregateArgs>): Prisma.PrismaPromise<GetRoomInviteAggregateType<T>>

    /**
     * Group by RoomInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomInviteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomInviteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomInviteGroupByArgs['orderBy'] }
        : { orderBy?: RoomInviteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomInviteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomInviteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoomInvite model
   */
  readonly fields: RoomInviteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomInvite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomInviteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    inviter<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    invitee<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RoomInvite model
   */ 
  interface RoomInviteFieldRefs {
    readonly id: FieldRef<"RoomInvite", 'String'>
    readonly roomId: FieldRef<"RoomInvite", 'String'>
    readonly inviterId: FieldRef<"RoomInvite", 'String'>
    readonly inviteeId: FieldRef<"RoomInvite", 'String'>
    readonly status: FieldRef<"RoomInvite", 'RoomInviteStatus'>
    readonly createdAt: FieldRef<"RoomInvite", 'DateTime'>
    readonly updatedAt: FieldRef<"RoomInvite", 'DateTime'>
    readonly expiresAt: FieldRef<"RoomInvite", 'DateTime'>
    readonly metadata: FieldRef<"RoomInvite", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * RoomInvite findUnique
   */
  export type RoomInviteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomInvite
     */
    select?: RoomInviteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInviteInclude<ExtArgs> | null
    /**
     * Filter, which RoomInvite to fetch.
     */
    where: RoomInviteWhereUniqueInput
  }

  /**
   * RoomInvite findUniqueOrThrow
   */
  export type RoomInviteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomInvite
     */
    select?: RoomInviteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInviteInclude<ExtArgs> | null
    /**
     * Filter, which RoomInvite to fetch.
     */
    where: RoomInviteWhereUniqueInput
  }

  /**
   * RoomInvite findFirst
   */
  export type RoomInviteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomInvite
     */
    select?: RoomInviteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInviteInclude<ExtArgs> | null
    /**
     * Filter, which RoomInvite to fetch.
     */
    where?: RoomInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomInvites to fetch.
     */
    orderBy?: RoomInviteOrderByWithRelationInput | RoomInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomInvites.
     */
    cursor?: RoomInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomInvites.
     */
    distinct?: RoomInviteScalarFieldEnum | RoomInviteScalarFieldEnum[]
  }

  /**
   * RoomInvite findFirstOrThrow
   */
  export type RoomInviteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomInvite
     */
    select?: RoomInviteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInviteInclude<ExtArgs> | null
    /**
     * Filter, which RoomInvite to fetch.
     */
    where?: RoomInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomInvites to fetch.
     */
    orderBy?: RoomInviteOrderByWithRelationInput | RoomInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomInvites.
     */
    cursor?: RoomInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomInvites.
     */
    distinct?: RoomInviteScalarFieldEnum | RoomInviteScalarFieldEnum[]
  }

  /**
   * RoomInvite findMany
   */
  export type RoomInviteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomInvite
     */
    select?: RoomInviteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInviteInclude<ExtArgs> | null
    /**
     * Filter, which RoomInvites to fetch.
     */
    where?: RoomInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomInvites to fetch.
     */
    orderBy?: RoomInviteOrderByWithRelationInput | RoomInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoomInvites.
     */
    cursor?: RoomInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomInvites.
     */
    skip?: number
    distinct?: RoomInviteScalarFieldEnum | RoomInviteScalarFieldEnum[]
  }

  /**
   * RoomInvite create
   */
  export type RoomInviteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomInvite
     */
    select?: RoomInviteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInviteInclude<ExtArgs> | null
    /**
     * The data needed to create a RoomInvite.
     */
    data: XOR<RoomInviteCreateInput, RoomInviteUncheckedCreateInput>
  }

  /**
   * RoomInvite createMany
   */
  export type RoomInviteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomInvites.
     */
    data: RoomInviteCreateManyInput | RoomInviteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomInvite createManyAndReturn
   */
  export type RoomInviteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomInvite
     */
    select?: RoomInviteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RoomInvites.
     */
    data: RoomInviteCreateManyInput | RoomInviteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInviteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomInvite update
   */
  export type RoomInviteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomInvite
     */
    select?: RoomInviteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInviteInclude<ExtArgs> | null
    /**
     * The data needed to update a RoomInvite.
     */
    data: XOR<RoomInviteUpdateInput, RoomInviteUncheckedUpdateInput>
    /**
     * Choose, which RoomInvite to update.
     */
    where: RoomInviteWhereUniqueInput
  }

  /**
   * RoomInvite updateMany
   */
  export type RoomInviteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomInvites.
     */
    data: XOR<RoomInviteUpdateManyMutationInput, RoomInviteUncheckedUpdateManyInput>
    /**
     * Filter which RoomInvites to update
     */
    where?: RoomInviteWhereInput
  }

  /**
   * RoomInvite upsert
   */
  export type RoomInviteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomInvite
     */
    select?: RoomInviteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInviteInclude<ExtArgs> | null
    /**
     * The filter to search for the RoomInvite to update in case it exists.
     */
    where: RoomInviteWhereUniqueInput
    /**
     * In case the RoomInvite found by the `where` argument doesn't exist, create a new RoomInvite with this data.
     */
    create: XOR<RoomInviteCreateInput, RoomInviteUncheckedCreateInput>
    /**
     * In case the RoomInvite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomInviteUpdateInput, RoomInviteUncheckedUpdateInput>
  }

  /**
   * RoomInvite delete
   */
  export type RoomInviteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomInvite
     */
    select?: RoomInviteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInviteInclude<ExtArgs> | null
    /**
     * Filter which RoomInvite to delete.
     */
    where: RoomInviteWhereUniqueInput
  }

  /**
   * RoomInvite deleteMany
   */
  export type RoomInviteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomInvites to delete
     */
    where?: RoomInviteWhereInput
  }

  /**
   * RoomInvite without action
   */
  export type RoomInviteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomInvite
     */
    select?: RoomInviteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInviteInclude<ExtArgs> | null
  }


  /**
   * Model Game
   */

  export type AggregateGame = {
    _count: GameCountAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  export type GameMinAggregateOutputType = {
    id: string | null
    status: string | null
    deckSeed: string | null
    dealerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GameMaxAggregateOutputType = {
    id: string | null
    status: string | null
    deckSeed: string | null
    dealerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GameCountAggregateOutputType = {
    id: number
    status: number
    deckSeed: number
    dealerId: number
    surrenderVotes: number
    rematchVotes: number
    originalRoomIds: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GameMinAggregateInputType = {
    id?: true
    status?: true
    deckSeed?: true
    dealerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GameMaxAggregateInputType = {
    id?: true
    status?: true
    deckSeed?: true
    dealerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GameCountAggregateInputType = {
    id?: true
    status?: true
    deckSeed?: true
    dealerId?: true
    surrenderVotes?: true
    rematchVotes?: true
    originalRoomIds?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Game to aggregate.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Games
    **/
    _count?: true | GameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameMaxAggregateInputType
  }

  export type GetGameAggregateType<T extends GameAggregateArgs> = {
        [P in keyof T & keyof AggregateGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGame[P]>
      : GetScalarType<T[P], AggregateGame[P]>
  }




  export type GameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
    orderBy?: GameOrderByWithAggregationInput | GameOrderByWithAggregationInput[]
    by: GameScalarFieldEnum[] | GameScalarFieldEnum
    having?: GameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameCountAggregateInputType | true
    _min?: GameMinAggregateInputType
    _max?: GameMaxAggregateInputType
  }

  export type GameGroupByOutputType = {
    id: string
    status: string
    deckSeed: string
    dealerId: string | null
    surrenderVotes: string[]
    rematchVotes: string[]
    originalRoomIds: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: GameCountAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  type GetGameGroupByPayload<T extends GameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameGroupByOutputType[P]>
            : GetScalarType<T[P], GameGroupByOutputType[P]>
        }
      >
    >


  export type GameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    deckSeed?: boolean
    dealerId?: boolean
    surrenderVotes?: boolean
    rematchVotes?: boolean
    originalRoomIds?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    events?: boolean | Game$eventsArgs<ExtArgs>
    _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    deckSeed?: boolean
    dealerId?: boolean
    surrenderVotes?: boolean
    rematchVotes?: boolean
    originalRoomIds?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["game"]>

  export type GameSelectScalar = {
    id?: boolean
    status?: boolean
    deckSeed?: boolean
    dealerId?: boolean
    surrenderVotes?: boolean
    rematchVotes?: boolean
    originalRoomIds?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GameInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | Game$eventsArgs<ExtArgs>
    _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GameIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Game"
    objects: {
      events: Prisma.$GameEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      status: string
      deckSeed: string
      dealerId: string | null
      surrenderVotes: string[]
      rematchVotes: string[]
      originalRoomIds: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["game"]>
    composites: {}
  }

  type GameGetPayload<S extends boolean | null | undefined | GameDefaultArgs> = $Result.GetResult<Prisma.$GamePayload, S>

  type GameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GameFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GameCountAggregateInputType | true
    }

  export interface GameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Game'], meta: { name: 'Game' } }
    /**
     * Find zero or one Game that matches the filter.
     * @param {GameFindUniqueArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameFindUniqueArgs>(args: SelectSubset<T, GameFindUniqueArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Game that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GameFindUniqueOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameFindUniqueOrThrowArgs>(args: SelectSubset<T, GameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Game that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameFindFirstArgs>(args?: SelectSubset<T, GameFindFirstArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Game that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameFindFirstOrThrowArgs>(args?: SelectSubset<T, GameFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Games that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Games
     * const games = await prisma.game.findMany()
     * 
     * // Get first 10 Games
     * const games = await prisma.game.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameWithIdOnly = await prisma.game.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameFindManyArgs>(args?: SelectSubset<T, GameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Game.
     * @param {GameCreateArgs} args - Arguments to create a Game.
     * @example
     * // Create one Game
     * const Game = await prisma.game.create({
     *   data: {
     *     // ... data to create a Game
     *   }
     * })
     * 
     */
    create<T extends GameCreateArgs>(args: SelectSubset<T, GameCreateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Games.
     * @param {GameCreateManyArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameCreateManyArgs>(args?: SelectSubset<T, GameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Games and returns the data saved in the database.
     * @param {GameCreateManyAndReturnArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameCreateManyAndReturnArgs>(args?: SelectSubset<T, GameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Game.
     * @param {GameDeleteArgs} args - Arguments to delete one Game.
     * @example
     * // Delete one Game
     * const Game = await prisma.game.delete({
     *   where: {
     *     // ... filter to delete one Game
     *   }
     * })
     * 
     */
    delete<T extends GameDeleteArgs>(args: SelectSubset<T, GameDeleteArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Game.
     * @param {GameUpdateArgs} args - Arguments to update one Game.
     * @example
     * // Update one Game
     * const game = await prisma.game.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameUpdateArgs>(args: SelectSubset<T, GameUpdateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Games.
     * @param {GameDeleteManyArgs} args - Arguments to filter Games to delete.
     * @example
     * // Delete a few Games
     * const { count } = await prisma.game.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameDeleteManyArgs>(args?: SelectSubset<T, GameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameUpdateManyArgs>(args: SelectSubset<T, GameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Game.
     * @param {GameUpsertArgs} args - Arguments to update or create a Game.
     * @example
     * // Update or create a Game
     * const game = await prisma.game.upsert({
     *   create: {
     *     // ... data to create a Game
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Game we want to update
     *   }
     * })
     */
    upsert<T extends GameUpsertArgs>(args: SelectSubset<T, GameUpsertArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCountArgs} args - Arguments to filter Games to count.
     * @example
     * // Count the number of Games
     * const count = await prisma.game.count({
     *   where: {
     *     // ... the filter for the Games we want to count
     *   }
     * })
    **/
    count<T extends GameCountArgs>(
      args?: Subset<T, GameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameAggregateArgs>(args: Subset<T, GameAggregateArgs>): Prisma.PrismaPromise<GetGameAggregateType<T>>

    /**
     * Group by Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameGroupByArgs['orderBy'] }
        : { orderBy?: GameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Game model
   */
  readonly fields: GameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Game.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    events<T extends Game$eventsArgs<ExtArgs> = {}>(args?: Subset<T, Game$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameEventPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Game model
   */ 
  interface GameFieldRefs {
    readonly id: FieldRef<"Game", 'String'>
    readonly status: FieldRef<"Game", 'String'>
    readonly deckSeed: FieldRef<"Game", 'String'>
    readonly dealerId: FieldRef<"Game", 'String'>
    readonly surrenderVotes: FieldRef<"Game", 'String[]'>
    readonly rematchVotes: FieldRef<"Game", 'String[]'>
    readonly originalRoomIds: FieldRef<"Game", 'Json'>
    readonly createdAt: FieldRef<"Game", 'DateTime'>
    readonly updatedAt: FieldRef<"Game", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Game findUnique
   */
  export type GameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findUniqueOrThrow
   */
  export type GameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findFirst
   */
  export type GameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findFirstOrThrow
   */
  export type GameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findMany
   */
  export type GameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Games to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game create
   */
  export type GameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to create a Game.
     */
    data: XOR<GameCreateInput, GameUncheckedCreateInput>
  }

  /**
   * Game createMany
   */
  export type GameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Game createManyAndReturn
   */
  export type GameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Game update
   */
  export type GameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to update a Game.
     */
    data: XOR<GameUpdateInput, GameUncheckedUpdateInput>
    /**
     * Choose, which Game to update.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game updateMany
   */
  export type GameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
  }

  /**
   * Game upsert
   */
  export type GameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The filter to search for the Game to update in case it exists.
     */
    where: GameWhereUniqueInput
    /**
     * In case the Game found by the `where` argument doesn't exist, create a new Game with this data.
     */
    create: XOR<GameCreateInput, GameUncheckedCreateInput>
    /**
     * In case the Game was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameUpdateInput, GameUncheckedUpdateInput>
  }

  /**
   * Game delete
   */
  export type GameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter which Game to delete.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game deleteMany
   */
  export type GameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Games to delete
     */
    where?: GameWhereInput
  }

  /**
   * Game.events
   */
  export type Game$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameEvent
     */
    select?: GameEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameEventInclude<ExtArgs> | null
    where?: GameEventWhereInput
    orderBy?: GameEventOrderByWithRelationInput | GameEventOrderByWithRelationInput[]
    cursor?: GameEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameEventScalarFieldEnum | GameEventScalarFieldEnum[]
  }

  /**
   * Game without action
   */
  export type GameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
  }


  /**
   * Model Player
   */

  export type AggregatePlayer = {
    _count: PlayerCountAggregateOutputType | null
    _avg: PlayerAvgAggregateOutputType | null
    _sum: PlayerSumAggregateOutputType | null
    _min: PlayerMinAggregateOutputType | null
    _max: PlayerMaxAggregateOutputType | null
  }

  export type PlayerAvgAggregateOutputType = {
    seatIdx: number | null
  }

  export type PlayerSumAggregateOutputType = {
    seatIdx: number | null
  }

  export type PlayerMinAggregateOutputType = {
    id: string | null
    userId: string | null
    gameId: string | null
    name: string | null
    seatIdx: number | null
    role: string | null
  }

  export type PlayerMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    gameId: string | null
    name: string | null
    seatIdx: number | null
    role: string | null
  }

  export type PlayerCountAggregateOutputType = {
    id: number
    userId: number
    gameId: number
    name: number
    seatIdx: number
    role: number
    _all: number
  }


  export type PlayerAvgAggregateInputType = {
    seatIdx?: true
  }

  export type PlayerSumAggregateInputType = {
    seatIdx?: true
  }

  export type PlayerMinAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    name?: true
    seatIdx?: true
    role?: true
  }

  export type PlayerMaxAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    name?: true
    seatIdx?: true
    role?: true
  }

  export type PlayerCountAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    name?: true
    seatIdx?: true
    role?: true
    _all?: true
  }

  export type PlayerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Player to aggregate.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Players
    **/
    _count?: true | PlayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlayerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlayerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlayerMaxAggregateInputType
  }

  export type GetPlayerAggregateType<T extends PlayerAggregateArgs> = {
        [P in keyof T & keyof AggregatePlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlayer[P]>
      : GetScalarType<T[P], AggregatePlayer[P]>
  }




  export type PlayerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayerWhereInput
    orderBy?: PlayerOrderByWithAggregationInput | PlayerOrderByWithAggregationInput[]
    by: PlayerScalarFieldEnum[] | PlayerScalarFieldEnum
    having?: PlayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlayerCountAggregateInputType | true
    _avg?: PlayerAvgAggregateInputType
    _sum?: PlayerSumAggregateInputType
    _min?: PlayerMinAggregateInputType
    _max?: PlayerMaxAggregateInputType
  }

  export type PlayerGroupByOutputType = {
    id: string
    userId: string
    gameId: string
    name: string
    seatIdx: number
    role: string
    _count: PlayerCountAggregateOutputType | null
    _avg: PlayerAvgAggregateOutputType | null
    _sum: PlayerSumAggregateOutputType | null
    _min: PlayerMinAggregateOutputType | null
    _max: PlayerMaxAggregateOutputType | null
  }

  type GetPlayerGroupByPayload<T extends PlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlayerGroupByOutputType[P]>
            : GetScalarType<T[P], PlayerGroupByOutputType[P]>
        }
      >
    >


  export type PlayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gameId?: boolean
    name?: boolean
    seatIdx?: boolean
    role?: boolean
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gameId?: boolean
    name?: boolean
    seatIdx?: boolean
    role?: boolean
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectScalar = {
    id?: boolean
    userId?: boolean
    gameId?: boolean
    name?: boolean
    seatIdx?: boolean
    role?: boolean
  }


  export type $PlayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Player"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      gameId: string
      name: string
      seatIdx: number
      role: string
    }, ExtArgs["result"]["player"]>
    composites: {}
  }

  type PlayerGetPayload<S extends boolean | null | undefined | PlayerDefaultArgs> = $Result.GetResult<Prisma.$PlayerPayload, S>

  type PlayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PlayerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PlayerCountAggregateInputType | true
    }

  export interface PlayerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Player'], meta: { name: 'Player' } }
    /**
     * Find zero or one Player that matches the filter.
     * @param {PlayerFindUniqueArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlayerFindUniqueArgs>(args: SelectSubset<T, PlayerFindUniqueArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Player that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PlayerFindUniqueOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlayerFindUniqueOrThrowArgs>(args: SelectSubset<T, PlayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Player that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlayerFindFirstArgs>(args?: SelectSubset<T, PlayerFindFirstArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Player that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlayerFindFirstOrThrowArgs>(args?: SelectSubset<T, PlayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Players that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Players
     * const players = await prisma.player.findMany()
     * 
     * // Get first 10 Players
     * const players = await prisma.player.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playerWithIdOnly = await prisma.player.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlayerFindManyArgs>(args?: SelectSubset<T, PlayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Player.
     * @param {PlayerCreateArgs} args - Arguments to create a Player.
     * @example
     * // Create one Player
     * const Player = await prisma.player.create({
     *   data: {
     *     // ... data to create a Player
     *   }
     * })
     * 
     */
    create<T extends PlayerCreateArgs>(args: SelectSubset<T, PlayerCreateArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Players.
     * @param {PlayerCreateManyArgs} args - Arguments to create many Players.
     * @example
     * // Create many Players
     * const player = await prisma.player.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlayerCreateManyArgs>(args?: SelectSubset<T, PlayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Players and returns the data saved in the database.
     * @param {PlayerCreateManyAndReturnArgs} args - Arguments to create many Players.
     * @example
     * // Create many Players
     * const player = await prisma.player.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Players and only return the `id`
     * const playerWithIdOnly = await prisma.player.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlayerCreateManyAndReturnArgs>(args?: SelectSubset<T, PlayerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Player.
     * @param {PlayerDeleteArgs} args - Arguments to delete one Player.
     * @example
     * // Delete one Player
     * const Player = await prisma.player.delete({
     *   where: {
     *     // ... filter to delete one Player
     *   }
     * })
     * 
     */
    delete<T extends PlayerDeleteArgs>(args: SelectSubset<T, PlayerDeleteArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Player.
     * @param {PlayerUpdateArgs} args - Arguments to update one Player.
     * @example
     * // Update one Player
     * const player = await prisma.player.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlayerUpdateArgs>(args: SelectSubset<T, PlayerUpdateArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Players.
     * @param {PlayerDeleteManyArgs} args - Arguments to filter Players to delete.
     * @example
     * // Delete a few Players
     * const { count } = await prisma.player.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlayerDeleteManyArgs>(args?: SelectSubset<T, PlayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Players
     * const player = await prisma.player.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlayerUpdateManyArgs>(args: SelectSubset<T, PlayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Player.
     * @param {PlayerUpsertArgs} args - Arguments to update or create a Player.
     * @example
     * // Update or create a Player
     * const player = await prisma.player.upsert({
     *   create: {
     *     // ... data to create a Player
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Player we want to update
     *   }
     * })
     */
    upsert<T extends PlayerUpsertArgs>(args: SelectSubset<T, PlayerUpsertArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerCountArgs} args - Arguments to filter Players to count.
     * @example
     * // Count the number of Players
     * const count = await prisma.player.count({
     *   where: {
     *     // ... the filter for the Players we want to count
     *   }
     * })
    **/
    count<T extends PlayerCountArgs>(
      args?: Subset<T, PlayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlayerAggregateArgs>(args: Subset<T, PlayerAggregateArgs>): Prisma.PrismaPromise<GetPlayerAggregateType<T>>

    /**
     * Group by Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlayerGroupByArgs['orderBy'] }
        : { orderBy?: PlayerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Player model
   */
  readonly fields: PlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Player.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlayerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Player model
   */ 
  interface PlayerFieldRefs {
    readonly id: FieldRef<"Player", 'String'>
    readonly userId: FieldRef<"Player", 'String'>
    readonly gameId: FieldRef<"Player", 'String'>
    readonly name: FieldRef<"Player", 'String'>
    readonly seatIdx: FieldRef<"Player", 'Int'>
    readonly role: FieldRef<"Player", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Player findUnique
   */
  export type PlayerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player findUniqueOrThrow
   */
  export type PlayerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player findFirst
   */
  export type PlayerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player findFirstOrThrow
   */
  export type PlayerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player findMany
   */
  export type PlayerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Filter, which Players to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player create
   */
  export type PlayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * The data needed to create a Player.
     */
    data: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>
  }

  /**
   * Player createMany
   */
  export type PlayerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Players.
     */
    data: PlayerCreateManyInput | PlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Player createManyAndReturn
   */
  export type PlayerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Players.
     */
    data: PlayerCreateManyInput | PlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Player update
   */
  export type PlayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * The data needed to update a Player.
     */
    data: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>
    /**
     * Choose, which Player to update.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player updateMany
   */
  export type PlayerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Players.
     */
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyInput>
    /**
     * Filter which Players to update
     */
    where?: PlayerWhereInput
  }

  /**
   * Player upsert
   */
  export type PlayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * The filter to search for the Player to update in case it exists.
     */
    where: PlayerWhereUniqueInput
    /**
     * In case the Player found by the `where` argument doesn't exist, create a new Player with this data.
     */
    create: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>
    /**
     * In case the Player was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>
  }

  /**
   * Player delete
   */
  export type PlayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Filter which Player to delete.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player deleteMany
   */
  export type PlayerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Players to delete
     */
    where?: PlayerWhereInput
  }

  /**
   * Player without action
   */
  export type PlayerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
  }


  /**
   * Model GameEvent
   */

  export type AggregateGameEvent = {
    _count: GameEventCountAggregateOutputType | null
    _avg: GameEventAvgAggregateOutputType | null
    _sum: GameEventSumAggregateOutputType | null
    _min: GameEventMinAggregateOutputType | null
    _max: GameEventMaxAggregateOutputType | null
  }

  export type GameEventAvgAggregateOutputType = {
    seq: number | null
  }

  export type GameEventSumAggregateOutputType = {
    seq: number | null
  }

  export type GameEventMinAggregateOutputType = {
    id: string | null
    gameId: string | null
    seq: number | null
    type: string | null
    actor: string | null
    createdAt: Date | null
  }

  export type GameEventMaxAggregateOutputType = {
    id: string | null
    gameId: string | null
    seq: number | null
    type: string | null
    actor: string | null
    createdAt: Date | null
  }

  export type GameEventCountAggregateOutputType = {
    id: number
    gameId: number
    seq: number
    type: number
    actor: number
    payload: number
    createdAt: number
    _all: number
  }


  export type GameEventAvgAggregateInputType = {
    seq?: true
  }

  export type GameEventSumAggregateInputType = {
    seq?: true
  }

  export type GameEventMinAggregateInputType = {
    id?: true
    gameId?: true
    seq?: true
    type?: true
    actor?: true
    createdAt?: true
  }

  export type GameEventMaxAggregateInputType = {
    id?: true
    gameId?: true
    seq?: true
    type?: true
    actor?: true
    createdAt?: true
  }

  export type GameEventCountAggregateInputType = {
    id?: true
    gameId?: true
    seq?: true
    type?: true
    actor?: true
    payload?: true
    createdAt?: true
    _all?: true
  }

  export type GameEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameEvent to aggregate.
     */
    where?: GameEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameEvents to fetch.
     */
    orderBy?: GameEventOrderByWithRelationInput | GameEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GameEvents
    **/
    _count?: true | GameEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameEventMaxAggregateInputType
  }

  export type GetGameEventAggregateType<T extends GameEventAggregateArgs> = {
        [P in keyof T & keyof AggregateGameEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGameEvent[P]>
      : GetScalarType<T[P], AggregateGameEvent[P]>
  }




  export type GameEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameEventWhereInput
    orderBy?: GameEventOrderByWithAggregationInput | GameEventOrderByWithAggregationInput[]
    by: GameEventScalarFieldEnum[] | GameEventScalarFieldEnum
    having?: GameEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameEventCountAggregateInputType | true
    _avg?: GameEventAvgAggregateInputType
    _sum?: GameEventSumAggregateInputType
    _min?: GameEventMinAggregateInputType
    _max?: GameEventMaxAggregateInputType
  }

  export type GameEventGroupByOutputType = {
    id: string
    gameId: string
    seq: number
    type: string
    actor: string | null
    payload: JsonValue
    createdAt: Date
    _count: GameEventCountAggregateOutputType | null
    _avg: GameEventAvgAggregateOutputType | null
    _sum: GameEventSumAggregateOutputType | null
    _min: GameEventMinAggregateOutputType | null
    _max: GameEventMaxAggregateOutputType | null
  }

  type GetGameEventGroupByPayload<T extends GameEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameEventGroupByOutputType[P]>
            : GetScalarType<T[P], GameEventGroupByOutputType[P]>
        }
      >
    >


  export type GameEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    seq?: boolean
    type?: boolean
    actor?: boolean
    payload?: boolean
    createdAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameEvent"]>

  export type GameEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    seq?: boolean
    type?: boolean
    actor?: boolean
    payload?: boolean
    createdAt?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameEvent"]>

  export type GameEventSelectScalar = {
    id?: boolean
    gameId?: boolean
    seq?: boolean
    type?: boolean
    actor?: boolean
    payload?: boolean
    createdAt?: boolean
  }

  export type GameEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
  }
  export type GameEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
  }

  export type $GameEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GameEvent"
    objects: {
      game: Prisma.$GamePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      gameId: string
      seq: number
      type: string
      actor: string | null
      payload: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["gameEvent"]>
    composites: {}
  }

  type GameEventGetPayload<S extends boolean | null | undefined | GameEventDefaultArgs> = $Result.GetResult<Prisma.$GameEventPayload, S>

  type GameEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GameEventFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GameEventCountAggregateInputType | true
    }

  export interface GameEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GameEvent'], meta: { name: 'GameEvent' } }
    /**
     * Find zero or one GameEvent that matches the filter.
     * @param {GameEventFindUniqueArgs} args - Arguments to find a GameEvent
     * @example
     * // Get one GameEvent
     * const gameEvent = await prisma.gameEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameEventFindUniqueArgs>(args: SelectSubset<T, GameEventFindUniqueArgs<ExtArgs>>): Prisma__GameEventClient<$Result.GetResult<Prisma.$GameEventPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GameEvent that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GameEventFindUniqueOrThrowArgs} args - Arguments to find a GameEvent
     * @example
     * // Get one GameEvent
     * const gameEvent = await prisma.gameEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameEventFindUniqueOrThrowArgs>(args: SelectSubset<T, GameEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameEventClient<$Result.GetResult<Prisma.$GameEventPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GameEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameEventFindFirstArgs} args - Arguments to find a GameEvent
     * @example
     * // Get one GameEvent
     * const gameEvent = await prisma.gameEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameEventFindFirstArgs>(args?: SelectSubset<T, GameEventFindFirstArgs<ExtArgs>>): Prisma__GameEventClient<$Result.GetResult<Prisma.$GameEventPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GameEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameEventFindFirstOrThrowArgs} args - Arguments to find a GameEvent
     * @example
     * // Get one GameEvent
     * const gameEvent = await prisma.gameEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameEventFindFirstOrThrowArgs>(args?: SelectSubset<T, GameEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameEventClient<$Result.GetResult<Prisma.$GameEventPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GameEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GameEvents
     * const gameEvents = await prisma.gameEvent.findMany()
     * 
     * // Get first 10 GameEvents
     * const gameEvents = await prisma.gameEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameEventWithIdOnly = await prisma.gameEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameEventFindManyArgs>(args?: SelectSubset<T, GameEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameEventPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GameEvent.
     * @param {GameEventCreateArgs} args - Arguments to create a GameEvent.
     * @example
     * // Create one GameEvent
     * const GameEvent = await prisma.gameEvent.create({
     *   data: {
     *     // ... data to create a GameEvent
     *   }
     * })
     * 
     */
    create<T extends GameEventCreateArgs>(args: SelectSubset<T, GameEventCreateArgs<ExtArgs>>): Prisma__GameEventClient<$Result.GetResult<Prisma.$GameEventPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GameEvents.
     * @param {GameEventCreateManyArgs} args - Arguments to create many GameEvents.
     * @example
     * // Create many GameEvents
     * const gameEvent = await prisma.gameEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameEventCreateManyArgs>(args?: SelectSubset<T, GameEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GameEvents and returns the data saved in the database.
     * @param {GameEventCreateManyAndReturnArgs} args - Arguments to create many GameEvents.
     * @example
     * // Create many GameEvents
     * const gameEvent = await prisma.gameEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GameEvents and only return the `id`
     * const gameEventWithIdOnly = await prisma.gameEvent.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameEventCreateManyAndReturnArgs>(args?: SelectSubset<T, GameEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameEventPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GameEvent.
     * @param {GameEventDeleteArgs} args - Arguments to delete one GameEvent.
     * @example
     * // Delete one GameEvent
     * const GameEvent = await prisma.gameEvent.delete({
     *   where: {
     *     // ... filter to delete one GameEvent
     *   }
     * })
     * 
     */
    delete<T extends GameEventDeleteArgs>(args: SelectSubset<T, GameEventDeleteArgs<ExtArgs>>): Prisma__GameEventClient<$Result.GetResult<Prisma.$GameEventPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GameEvent.
     * @param {GameEventUpdateArgs} args - Arguments to update one GameEvent.
     * @example
     * // Update one GameEvent
     * const gameEvent = await prisma.gameEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameEventUpdateArgs>(args: SelectSubset<T, GameEventUpdateArgs<ExtArgs>>): Prisma__GameEventClient<$Result.GetResult<Prisma.$GameEventPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GameEvents.
     * @param {GameEventDeleteManyArgs} args - Arguments to filter GameEvents to delete.
     * @example
     * // Delete a few GameEvents
     * const { count } = await prisma.gameEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameEventDeleteManyArgs>(args?: SelectSubset<T, GameEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GameEvents
     * const gameEvent = await prisma.gameEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameEventUpdateManyArgs>(args: SelectSubset<T, GameEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GameEvent.
     * @param {GameEventUpsertArgs} args - Arguments to update or create a GameEvent.
     * @example
     * // Update or create a GameEvent
     * const gameEvent = await prisma.gameEvent.upsert({
     *   create: {
     *     // ... data to create a GameEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GameEvent we want to update
     *   }
     * })
     */
    upsert<T extends GameEventUpsertArgs>(args: SelectSubset<T, GameEventUpsertArgs<ExtArgs>>): Prisma__GameEventClient<$Result.GetResult<Prisma.$GameEventPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GameEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameEventCountArgs} args - Arguments to filter GameEvents to count.
     * @example
     * // Count the number of GameEvents
     * const count = await prisma.gameEvent.count({
     *   where: {
     *     // ... the filter for the GameEvents we want to count
     *   }
     * })
    **/
    count<T extends GameEventCountArgs>(
      args?: Subset<T, GameEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GameEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameEventAggregateArgs>(args: Subset<T, GameEventAggregateArgs>): Prisma.PrismaPromise<GetGameEventAggregateType<T>>

    /**
     * Group by GameEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameEventGroupByArgs['orderBy'] }
        : { orderBy?: GameEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GameEvent model
   */
  readonly fields: GameEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GameEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    game<T extends GameDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameDefaultArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GameEvent model
   */ 
  interface GameEventFieldRefs {
    readonly id: FieldRef<"GameEvent", 'String'>
    readonly gameId: FieldRef<"GameEvent", 'String'>
    readonly seq: FieldRef<"GameEvent", 'Int'>
    readonly type: FieldRef<"GameEvent", 'String'>
    readonly actor: FieldRef<"GameEvent", 'String'>
    readonly payload: FieldRef<"GameEvent", 'Json'>
    readonly createdAt: FieldRef<"GameEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GameEvent findUnique
   */
  export type GameEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameEvent
     */
    select?: GameEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameEventInclude<ExtArgs> | null
    /**
     * Filter, which GameEvent to fetch.
     */
    where: GameEventWhereUniqueInput
  }

  /**
   * GameEvent findUniqueOrThrow
   */
  export type GameEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameEvent
     */
    select?: GameEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameEventInclude<ExtArgs> | null
    /**
     * Filter, which GameEvent to fetch.
     */
    where: GameEventWhereUniqueInput
  }

  /**
   * GameEvent findFirst
   */
  export type GameEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameEvent
     */
    select?: GameEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameEventInclude<ExtArgs> | null
    /**
     * Filter, which GameEvent to fetch.
     */
    where?: GameEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameEvents to fetch.
     */
    orderBy?: GameEventOrderByWithRelationInput | GameEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameEvents.
     */
    cursor?: GameEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameEvents.
     */
    distinct?: GameEventScalarFieldEnum | GameEventScalarFieldEnum[]
  }

  /**
   * GameEvent findFirstOrThrow
   */
  export type GameEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameEvent
     */
    select?: GameEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameEventInclude<ExtArgs> | null
    /**
     * Filter, which GameEvent to fetch.
     */
    where?: GameEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameEvents to fetch.
     */
    orderBy?: GameEventOrderByWithRelationInput | GameEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameEvents.
     */
    cursor?: GameEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameEvents.
     */
    distinct?: GameEventScalarFieldEnum | GameEventScalarFieldEnum[]
  }

  /**
   * GameEvent findMany
   */
  export type GameEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameEvent
     */
    select?: GameEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameEventInclude<ExtArgs> | null
    /**
     * Filter, which GameEvents to fetch.
     */
    where?: GameEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameEvents to fetch.
     */
    orderBy?: GameEventOrderByWithRelationInput | GameEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GameEvents.
     */
    cursor?: GameEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameEvents.
     */
    skip?: number
    distinct?: GameEventScalarFieldEnum | GameEventScalarFieldEnum[]
  }

  /**
   * GameEvent create
   */
  export type GameEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameEvent
     */
    select?: GameEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameEventInclude<ExtArgs> | null
    /**
     * The data needed to create a GameEvent.
     */
    data: XOR<GameEventCreateInput, GameEventUncheckedCreateInput>
  }

  /**
   * GameEvent createMany
   */
  export type GameEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GameEvents.
     */
    data: GameEventCreateManyInput | GameEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GameEvent createManyAndReturn
   */
  export type GameEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameEvent
     */
    select?: GameEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GameEvents.
     */
    data: GameEventCreateManyInput | GameEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameEvent update
   */
  export type GameEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameEvent
     */
    select?: GameEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameEventInclude<ExtArgs> | null
    /**
     * The data needed to update a GameEvent.
     */
    data: XOR<GameEventUpdateInput, GameEventUncheckedUpdateInput>
    /**
     * Choose, which GameEvent to update.
     */
    where: GameEventWhereUniqueInput
  }

  /**
   * GameEvent updateMany
   */
  export type GameEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GameEvents.
     */
    data: XOR<GameEventUpdateManyMutationInput, GameEventUncheckedUpdateManyInput>
    /**
     * Filter which GameEvents to update
     */
    where?: GameEventWhereInput
  }

  /**
   * GameEvent upsert
   */
  export type GameEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameEvent
     */
    select?: GameEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameEventInclude<ExtArgs> | null
    /**
     * The filter to search for the GameEvent to update in case it exists.
     */
    where: GameEventWhereUniqueInput
    /**
     * In case the GameEvent found by the `where` argument doesn't exist, create a new GameEvent with this data.
     */
    create: XOR<GameEventCreateInput, GameEventUncheckedCreateInput>
    /**
     * In case the GameEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameEventUpdateInput, GameEventUncheckedUpdateInput>
  }

  /**
   * GameEvent delete
   */
  export type GameEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameEvent
     */
    select?: GameEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameEventInclude<ExtArgs> | null
    /**
     * Filter which GameEvent to delete.
     */
    where: GameEventWhereUniqueInput
  }

  /**
   * GameEvent deleteMany
   */
  export type GameEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameEvents to delete
     */
    where?: GameEventWhereInput
  }

  /**
   * GameEvent without action
   */
  export type GameEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameEvent
     */
    select?: GameEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameEventInclude<ExtArgs> | null
  }


  /**
   * Model GameSnapshot
   */

  export type AggregateGameSnapshot = {
    _count: GameSnapshotCountAggregateOutputType | null
    _avg: GameSnapshotAvgAggregateOutputType | null
    _sum: GameSnapshotSumAggregateOutputType | null
    _min: GameSnapshotMinAggregateOutputType | null
    _max: GameSnapshotMaxAggregateOutputType | null
  }

  export type GameSnapshotAvgAggregateOutputType = {
    seq: number | null
  }

  export type GameSnapshotSumAggregateOutputType = {
    seq: number | null
  }

  export type GameSnapshotMinAggregateOutputType = {
    id: string | null
    gameId: string | null
    seq: number | null
    createdAt: Date | null
  }

  export type GameSnapshotMaxAggregateOutputType = {
    id: string | null
    gameId: string | null
    seq: number | null
    createdAt: Date | null
  }

  export type GameSnapshotCountAggregateOutputType = {
    id: number
    gameId: number
    seq: number
    snapshot: number
    createdAt: number
    _all: number
  }


  export type GameSnapshotAvgAggregateInputType = {
    seq?: true
  }

  export type GameSnapshotSumAggregateInputType = {
    seq?: true
  }

  export type GameSnapshotMinAggregateInputType = {
    id?: true
    gameId?: true
    seq?: true
    createdAt?: true
  }

  export type GameSnapshotMaxAggregateInputType = {
    id?: true
    gameId?: true
    seq?: true
    createdAt?: true
  }

  export type GameSnapshotCountAggregateInputType = {
    id?: true
    gameId?: true
    seq?: true
    snapshot?: true
    createdAt?: true
    _all?: true
  }

  export type GameSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameSnapshot to aggregate.
     */
    where?: GameSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameSnapshots to fetch.
     */
    orderBy?: GameSnapshotOrderByWithRelationInput | GameSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GameSnapshots
    **/
    _count?: true | GameSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameSnapshotMaxAggregateInputType
  }

  export type GetGameSnapshotAggregateType<T extends GameSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateGameSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGameSnapshot[P]>
      : GetScalarType<T[P], AggregateGameSnapshot[P]>
  }




  export type GameSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameSnapshotWhereInput
    orderBy?: GameSnapshotOrderByWithAggregationInput | GameSnapshotOrderByWithAggregationInput[]
    by: GameSnapshotScalarFieldEnum[] | GameSnapshotScalarFieldEnum
    having?: GameSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameSnapshotCountAggregateInputType | true
    _avg?: GameSnapshotAvgAggregateInputType
    _sum?: GameSnapshotSumAggregateInputType
    _min?: GameSnapshotMinAggregateInputType
    _max?: GameSnapshotMaxAggregateInputType
  }

  export type GameSnapshotGroupByOutputType = {
    id: string
    gameId: string
    seq: number
    snapshot: JsonValue
    createdAt: Date
    _count: GameSnapshotCountAggregateOutputType | null
    _avg: GameSnapshotAvgAggregateOutputType | null
    _sum: GameSnapshotSumAggregateOutputType | null
    _min: GameSnapshotMinAggregateOutputType | null
    _max: GameSnapshotMaxAggregateOutputType | null
  }

  type GetGameSnapshotGroupByPayload<T extends GameSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], GameSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type GameSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    seq?: boolean
    snapshot?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["gameSnapshot"]>

  export type GameSnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    seq?: boolean
    snapshot?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["gameSnapshot"]>

  export type GameSnapshotSelectScalar = {
    id?: boolean
    gameId?: boolean
    seq?: boolean
    snapshot?: boolean
    createdAt?: boolean
  }


  export type $GameSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GameSnapshot"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      gameId: string
      seq: number
      snapshot: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["gameSnapshot"]>
    composites: {}
  }

  type GameSnapshotGetPayload<S extends boolean | null | undefined | GameSnapshotDefaultArgs> = $Result.GetResult<Prisma.$GameSnapshotPayload, S>

  type GameSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GameSnapshotFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GameSnapshotCountAggregateInputType | true
    }

  export interface GameSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GameSnapshot'], meta: { name: 'GameSnapshot' } }
    /**
     * Find zero or one GameSnapshot that matches the filter.
     * @param {GameSnapshotFindUniqueArgs} args - Arguments to find a GameSnapshot
     * @example
     * // Get one GameSnapshot
     * const gameSnapshot = await prisma.gameSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameSnapshotFindUniqueArgs>(args: SelectSubset<T, GameSnapshotFindUniqueArgs<ExtArgs>>): Prisma__GameSnapshotClient<$Result.GetResult<Prisma.$GameSnapshotPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GameSnapshot that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GameSnapshotFindUniqueOrThrowArgs} args - Arguments to find a GameSnapshot
     * @example
     * // Get one GameSnapshot
     * const gameSnapshot = await prisma.gameSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameSnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, GameSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameSnapshotClient<$Result.GetResult<Prisma.$GameSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GameSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameSnapshotFindFirstArgs} args - Arguments to find a GameSnapshot
     * @example
     * // Get one GameSnapshot
     * const gameSnapshot = await prisma.gameSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameSnapshotFindFirstArgs>(args?: SelectSubset<T, GameSnapshotFindFirstArgs<ExtArgs>>): Prisma__GameSnapshotClient<$Result.GetResult<Prisma.$GameSnapshotPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GameSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameSnapshotFindFirstOrThrowArgs} args - Arguments to find a GameSnapshot
     * @example
     * // Get one GameSnapshot
     * const gameSnapshot = await prisma.gameSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameSnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, GameSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameSnapshotClient<$Result.GetResult<Prisma.$GameSnapshotPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GameSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameSnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GameSnapshots
     * const gameSnapshots = await prisma.gameSnapshot.findMany()
     * 
     * // Get first 10 GameSnapshots
     * const gameSnapshots = await prisma.gameSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameSnapshotWithIdOnly = await prisma.gameSnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameSnapshotFindManyArgs>(args?: SelectSubset<T, GameSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameSnapshotPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GameSnapshot.
     * @param {GameSnapshotCreateArgs} args - Arguments to create a GameSnapshot.
     * @example
     * // Create one GameSnapshot
     * const GameSnapshot = await prisma.gameSnapshot.create({
     *   data: {
     *     // ... data to create a GameSnapshot
     *   }
     * })
     * 
     */
    create<T extends GameSnapshotCreateArgs>(args: SelectSubset<T, GameSnapshotCreateArgs<ExtArgs>>): Prisma__GameSnapshotClient<$Result.GetResult<Prisma.$GameSnapshotPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GameSnapshots.
     * @param {GameSnapshotCreateManyArgs} args - Arguments to create many GameSnapshots.
     * @example
     * // Create many GameSnapshots
     * const gameSnapshot = await prisma.gameSnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameSnapshotCreateManyArgs>(args?: SelectSubset<T, GameSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GameSnapshots and returns the data saved in the database.
     * @param {GameSnapshotCreateManyAndReturnArgs} args - Arguments to create many GameSnapshots.
     * @example
     * // Create many GameSnapshots
     * const gameSnapshot = await prisma.gameSnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GameSnapshots and only return the `id`
     * const gameSnapshotWithIdOnly = await prisma.gameSnapshot.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameSnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, GameSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameSnapshotPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GameSnapshot.
     * @param {GameSnapshotDeleteArgs} args - Arguments to delete one GameSnapshot.
     * @example
     * // Delete one GameSnapshot
     * const GameSnapshot = await prisma.gameSnapshot.delete({
     *   where: {
     *     // ... filter to delete one GameSnapshot
     *   }
     * })
     * 
     */
    delete<T extends GameSnapshotDeleteArgs>(args: SelectSubset<T, GameSnapshotDeleteArgs<ExtArgs>>): Prisma__GameSnapshotClient<$Result.GetResult<Prisma.$GameSnapshotPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GameSnapshot.
     * @param {GameSnapshotUpdateArgs} args - Arguments to update one GameSnapshot.
     * @example
     * // Update one GameSnapshot
     * const gameSnapshot = await prisma.gameSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameSnapshotUpdateArgs>(args: SelectSubset<T, GameSnapshotUpdateArgs<ExtArgs>>): Prisma__GameSnapshotClient<$Result.GetResult<Prisma.$GameSnapshotPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GameSnapshots.
     * @param {GameSnapshotDeleteManyArgs} args - Arguments to filter GameSnapshots to delete.
     * @example
     * // Delete a few GameSnapshots
     * const { count } = await prisma.gameSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameSnapshotDeleteManyArgs>(args?: SelectSubset<T, GameSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GameSnapshots
     * const gameSnapshot = await prisma.gameSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameSnapshotUpdateManyArgs>(args: SelectSubset<T, GameSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GameSnapshot.
     * @param {GameSnapshotUpsertArgs} args - Arguments to update or create a GameSnapshot.
     * @example
     * // Update or create a GameSnapshot
     * const gameSnapshot = await prisma.gameSnapshot.upsert({
     *   create: {
     *     // ... data to create a GameSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GameSnapshot we want to update
     *   }
     * })
     */
    upsert<T extends GameSnapshotUpsertArgs>(args: SelectSubset<T, GameSnapshotUpsertArgs<ExtArgs>>): Prisma__GameSnapshotClient<$Result.GetResult<Prisma.$GameSnapshotPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GameSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameSnapshotCountArgs} args - Arguments to filter GameSnapshots to count.
     * @example
     * // Count the number of GameSnapshots
     * const count = await prisma.gameSnapshot.count({
     *   where: {
     *     // ... the filter for the GameSnapshots we want to count
     *   }
     * })
    **/
    count<T extends GameSnapshotCountArgs>(
      args?: Subset<T, GameSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GameSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameSnapshotAggregateArgs>(args: Subset<T, GameSnapshotAggregateArgs>): Prisma.PrismaPromise<GetGameSnapshotAggregateType<T>>

    /**
     * Group by GameSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: GameSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GameSnapshot model
   */
  readonly fields: GameSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GameSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GameSnapshot model
   */ 
  interface GameSnapshotFieldRefs {
    readonly id: FieldRef<"GameSnapshot", 'String'>
    readonly gameId: FieldRef<"GameSnapshot", 'String'>
    readonly seq: FieldRef<"GameSnapshot", 'Int'>
    readonly snapshot: FieldRef<"GameSnapshot", 'Json'>
    readonly createdAt: FieldRef<"GameSnapshot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GameSnapshot findUnique
   */
  export type GameSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSnapshot
     */
    select?: GameSnapshotSelect<ExtArgs> | null
    /**
     * Filter, which GameSnapshot to fetch.
     */
    where: GameSnapshotWhereUniqueInput
  }

  /**
   * GameSnapshot findUniqueOrThrow
   */
  export type GameSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSnapshot
     */
    select?: GameSnapshotSelect<ExtArgs> | null
    /**
     * Filter, which GameSnapshot to fetch.
     */
    where: GameSnapshotWhereUniqueInput
  }

  /**
   * GameSnapshot findFirst
   */
  export type GameSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSnapshot
     */
    select?: GameSnapshotSelect<ExtArgs> | null
    /**
     * Filter, which GameSnapshot to fetch.
     */
    where?: GameSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameSnapshots to fetch.
     */
    orderBy?: GameSnapshotOrderByWithRelationInput | GameSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameSnapshots.
     */
    cursor?: GameSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameSnapshots.
     */
    distinct?: GameSnapshotScalarFieldEnum | GameSnapshotScalarFieldEnum[]
  }

  /**
   * GameSnapshot findFirstOrThrow
   */
  export type GameSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSnapshot
     */
    select?: GameSnapshotSelect<ExtArgs> | null
    /**
     * Filter, which GameSnapshot to fetch.
     */
    where?: GameSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameSnapshots to fetch.
     */
    orderBy?: GameSnapshotOrderByWithRelationInput | GameSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameSnapshots.
     */
    cursor?: GameSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameSnapshots.
     */
    distinct?: GameSnapshotScalarFieldEnum | GameSnapshotScalarFieldEnum[]
  }

  /**
   * GameSnapshot findMany
   */
  export type GameSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSnapshot
     */
    select?: GameSnapshotSelect<ExtArgs> | null
    /**
     * Filter, which GameSnapshots to fetch.
     */
    where?: GameSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameSnapshots to fetch.
     */
    orderBy?: GameSnapshotOrderByWithRelationInput | GameSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GameSnapshots.
     */
    cursor?: GameSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameSnapshots.
     */
    skip?: number
    distinct?: GameSnapshotScalarFieldEnum | GameSnapshotScalarFieldEnum[]
  }

  /**
   * GameSnapshot create
   */
  export type GameSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSnapshot
     */
    select?: GameSnapshotSelect<ExtArgs> | null
    /**
     * The data needed to create a GameSnapshot.
     */
    data: XOR<GameSnapshotCreateInput, GameSnapshotUncheckedCreateInput>
  }

  /**
   * GameSnapshot createMany
   */
  export type GameSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GameSnapshots.
     */
    data: GameSnapshotCreateManyInput | GameSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GameSnapshot createManyAndReturn
   */
  export type GameSnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSnapshot
     */
    select?: GameSnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GameSnapshots.
     */
    data: GameSnapshotCreateManyInput | GameSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GameSnapshot update
   */
  export type GameSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSnapshot
     */
    select?: GameSnapshotSelect<ExtArgs> | null
    /**
     * The data needed to update a GameSnapshot.
     */
    data: XOR<GameSnapshotUpdateInput, GameSnapshotUncheckedUpdateInput>
    /**
     * Choose, which GameSnapshot to update.
     */
    where: GameSnapshotWhereUniqueInput
  }

  /**
   * GameSnapshot updateMany
   */
  export type GameSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GameSnapshots.
     */
    data: XOR<GameSnapshotUpdateManyMutationInput, GameSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which GameSnapshots to update
     */
    where?: GameSnapshotWhereInput
  }

  /**
   * GameSnapshot upsert
   */
  export type GameSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSnapshot
     */
    select?: GameSnapshotSelect<ExtArgs> | null
    /**
     * The filter to search for the GameSnapshot to update in case it exists.
     */
    where: GameSnapshotWhereUniqueInput
    /**
     * In case the GameSnapshot found by the `where` argument doesn't exist, create a new GameSnapshot with this data.
     */
    create: XOR<GameSnapshotCreateInput, GameSnapshotUncheckedCreateInput>
    /**
     * In case the GameSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameSnapshotUpdateInput, GameSnapshotUncheckedUpdateInput>
  }

  /**
   * GameSnapshot delete
   */
  export type GameSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSnapshot
     */
    select?: GameSnapshotSelect<ExtArgs> | null
    /**
     * Filter which GameSnapshot to delete.
     */
    where: GameSnapshotWhereUniqueInput
  }

  /**
   * GameSnapshot deleteMany
   */
  export type GameSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameSnapshots to delete
     */
    where?: GameSnapshotWhereInput
  }

  /**
   * GameSnapshot without action
   */
  export type GameSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSnapshot
     */
    select?: GameSnapshotSelect<ExtArgs> | null
  }


  /**
   * Model RoundScore
   */

  export type AggregateRoundScore = {
    _count: RoundScoreCountAggregateOutputType | null
    _avg: RoundScoreAvgAggregateOutputType | null
    _sum: RoundScoreSumAggregateOutputType | null
    _min: RoundScoreMinAggregateOutputType | null
    _max: RoundScoreMaxAggregateOutputType | null
  }

  export type RoundScoreAvgAggregateOutputType = {
    team: number | null
    points: number | null
  }

  export type RoundScoreSumAggregateOutputType = {
    team: number | null
    points: number | null
  }

  export type RoundScoreMinAggregateOutputType = {
    id: string | null
    gameId: string | null
    team: number | null
    points: number | null
    createdAt: Date | null
  }

  export type RoundScoreMaxAggregateOutputType = {
    id: string | null
    gameId: string | null
    team: number | null
    points: number | null
    createdAt: Date | null
  }

  export type RoundScoreCountAggregateOutputType = {
    id: number
    gameId: number
    team: number
    points: number
    createdAt: number
    _all: number
  }


  export type RoundScoreAvgAggregateInputType = {
    team?: true
    points?: true
  }

  export type RoundScoreSumAggregateInputType = {
    team?: true
    points?: true
  }

  export type RoundScoreMinAggregateInputType = {
    id?: true
    gameId?: true
    team?: true
    points?: true
    createdAt?: true
  }

  export type RoundScoreMaxAggregateInputType = {
    id?: true
    gameId?: true
    team?: true
    points?: true
    createdAt?: true
  }

  export type RoundScoreCountAggregateInputType = {
    id?: true
    gameId?: true
    team?: true
    points?: true
    createdAt?: true
    _all?: true
  }

  export type RoundScoreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoundScore to aggregate.
     */
    where?: RoundScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoundScores to fetch.
     */
    orderBy?: RoundScoreOrderByWithRelationInput | RoundScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoundScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoundScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoundScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoundScores
    **/
    _count?: true | RoundScoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoundScoreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoundScoreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoundScoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoundScoreMaxAggregateInputType
  }

  export type GetRoundScoreAggregateType<T extends RoundScoreAggregateArgs> = {
        [P in keyof T & keyof AggregateRoundScore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoundScore[P]>
      : GetScalarType<T[P], AggregateRoundScore[P]>
  }




  export type RoundScoreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoundScoreWhereInput
    orderBy?: RoundScoreOrderByWithAggregationInput | RoundScoreOrderByWithAggregationInput[]
    by: RoundScoreScalarFieldEnum[] | RoundScoreScalarFieldEnum
    having?: RoundScoreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoundScoreCountAggregateInputType | true
    _avg?: RoundScoreAvgAggregateInputType
    _sum?: RoundScoreSumAggregateInputType
    _min?: RoundScoreMinAggregateInputType
    _max?: RoundScoreMaxAggregateInputType
  }

  export type RoundScoreGroupByOutputType = {
    id: string
    gameId: string
    team: number
    points: number
    createdAt: Date
    _count: RoundScoreCountAggregateOutputType | null
    _avg: RoundScoreAvgAggregateOutputType | null
    _sum: RoundScoreSumAggregateOutputType | null
    _min: RoundScoreMinAggregateOutputType | null
    _max: RoundScoreMaxAggregateOutputType | null
  }

  type GetRoundScoreGroupByPayload<T extends RoundScoreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoundScoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoundScoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoundScoreGroupByOutputType[P]>
            : GetScalarType<T[P], RoundScoreGroupByOutputType[P]>
        }
      >
    >


  export type RoundScoreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    team?: boolean
    points?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["roundScore"]>

  export type RoundScoreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    team?: boolean
    points?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["roundScore"]>

  export type RoundScoreSelectScalar = {
    id?: boolean
    gameId?: boolean
    team?: boolean
    points?: boolean
    createdAt?: boolean
  }


  export type $RoundScorePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoundScore"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      gameId: string
      team: number
      points: number
      createdAt: Date
    }, ExtArgs["result"]["roundScore"]>
    composites: {}
  }

  type RoundScoreGetPayload<S extends boolean | null | undefined | RoundScoreDefaultArgs> = $Result.GetResult<Prisma.$RoundScorePayload, S>

  type RoundScoreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RoundScoreFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RoundScoreCountAggregateInputType | true
    }

  export interface RoundScoreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoundScore'], meta: { name: 'RoundScore' } }
    /**
     * Find zero or one RoundScore that matches the filter.
     * @param {RoundScoreFindUniqueArgs} args - Arguments to find a RoundScore
     * @example
     * // Get one RoundScore
     * const roundScore = await prisma.roundScore.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoundScoreFindUniqueArgs>(args: SelectSubset<T, RoundScoreFindUniqueArgs<ExtArgs>>): Prisma__RoundScoreClient<$Result.GetResult<Prisma.$RoundScorePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RoundScore that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RoundScoreFindUniqueOrThrowArgs} args - Arguments to find a RoundScore
     * @example
     * // Get one RoundScore
     * const roundScore = await prisma.roundScore.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoundScoreFindUniqueOrThrowArgs>(args: SelectSubset<T, RoundScoreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoundScoreClient<$Result.GetResult<Prisma.$RoundScorePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RoundScore that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoundScoreFindFirstArgs} args - Arguments to find a RoundScore
     * @example
     * // Get one RoundScore
     * const roundScore = await prisma.roundScore.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoundScoreFindFirstArgs>(args?: SelectSubset<T, RoundScoreFindFirstArgs<ExtArgs>>): Prisma__RoundScoreClient<$Result.GetResult<Prisma.$RoundScorePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RoundScore that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoundScoreFindFirstOrThrowArgs} args - Arguments to find a RoundScore
     * @example
     * // Get one RoundScore
     * const roundScore = await prisma.roundScore.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoundScoreFindFirstOrThrowArgs>(args?: SelectSubset<T, RoundScoreFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoundScoreClient<$Result.GetResult<Prisma.$RoundScorePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RoundScores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoundScoreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoundScores
     * const roundScores = await prisma.roundScore.findMany()
     * 
     * // Get first 10 RoundScores
     * const roundScores = await prisma.roundScore.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roundScoreWithIdOnly = await prisma.roundScore.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoundScoreFindManyArgs>(args?: SelectSubset<T, RoundScoreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoundScorePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RoundScore.
     * @param {RoundScoreCreateArgs} args - Arguments to create a RoundScore.
     * @example
     * // Create one RoundScore
     * const RoundScore = await prisma.roundScore.create({
     *   data: {
     *     // ... data to create a RoundScore
     *   }
     * })
     * 
     */
    create<T extends RoundScoreCreateArgs>(args: SelectSubset<T, RoundScoreCreateArgs<ExtArgs>>): Prisma__RoundScoreClient<$Result.GetResult<Prisma.$RoundScorePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RoundScores.
     * @param {RoundScoreCreateManyArgs} args - Arguments to create many RoundScores.
     * @example
     * // Create many RoundScores
     * const roundScore = await prisma.roundScore.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoundScoreCreateManyArgs>(args?: SelectSubset<T, RoundScoreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoundScores and returns the data saved in the database.
     * @param {RoundScoreCreateManyAndReturnArgs} args - Arguments to create many RoundScores.
     * @example
     * // Create many RoundScores
     * const roundScore = await prisma.roundScore.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoundScores and only return the `id`
     * const roundScoreWithIdOnly = await prisma.roundScore.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoundScoreCreateManyAndReturnArgs>(args?: SelectSubset<T, RoundScoreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoundScorePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RoundScore.
     * @param {RoundScoreDeleteArgs} args - Arguments to delete one RoundScore.
     * @example
     * // Delete one RoundScore
     * const RoundScore = await prisma.roundScore.delete({
     *   where: {
     *     // ... filter to delete one RoundScore
     *   }
     * })
     * 
     */
    delete<T extends RoundScoreDeleteArgs>(args: SelectSubset<T, RoundScoreDeleteArgs<ExtArgs>>): Prisma__RoundScoreClient<$Result.GetResult<Prisma.$RoundScorePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RoundScore.
     * @param {RoundScoreUpdateArgs} args - Arguments to update one RoundScore.
     * @example
     * // Update one RoundScore
     * const roundScore = await prisma.roundScore.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoundScoreUpdateArgs>(args: SelectSubset<T, RoundScoreUpdateArgs<ExtArgs>>): Prisma__RoundScoreClient<$Result.GetResult<Prisma.$RoundScorePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RoundScores.
     * @param {RoundScoreDeleteManyArgs} args - Arguments to filter RoundScores to delete.
     * @example
     * // Delete a few RoundScores
     * const { count } = await prisma.roundScore.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoundScoreDeleteManyArgs>(args?: SelectSubset<T, RoundScoreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoundScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoundScoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoundScores
     * const roundScore = await prisma.roundScore.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoundScoreUpdateManyArgs>(args: SelectSubset<T, RoundScoreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RoundScore.
     * @param {RoundScoreUpsertArgs} args - Arguments to update or create a RoundScore.
     * @example
     * // Update or create a RoundScore
     * const roundScore = await prisma.roundScore.upsert({
     *   create: {
     *     // ... data to create a RoundScore
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoundScore we want to update
     *   }
     * })
     */
    upsert<T extends RoundScoreUpsertArgs>(args: SelectSubset<T, RoundScoreUpsertArgs<ExtArgs>>): Prisma__RoundScoreClient<$Result.GetResult<Prisma.$RoundScorePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RoundScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoundScoreCountArgs} args - Arguments to filter RoundScores to count.
     * @example
     * // Count the number of RoundScores
     * const count = await prisma.roundScore.count({
     *   where: {
     *     // ... the filter for the RoundScores we want to count
     *   }
     * })
    **/
    count<T extends RoundScoreCountArgs>(
      args?: Subset<T, RoundScoreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoundScoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoundScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoundScoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoundScoreAggregateArgs>(args: Subset<T, RoundScoreAggregateArgs>): Prisma.PrismaPromise<GetRoundScoreAggregateType<T>>

    /**
     * Group by RoundScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoundScoreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoundScoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoundScoreGroupByArgs['orderBy'] }
        : { orderBy?: RoundScoreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoundScoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoundScoreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoundScore model
   */
  readonly fields: RoundScoreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoundScore.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoundScoreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RoundScore model
   */ 
  interface RoundScoreFieldRefs {
    readonly id: FieldRef<"RoundScore", 'String'>
    readonly gameId: FieldRef<"RoundScore", 'String'>
    readonly team: FieldRef<"RoundScore", 'Int'>
    readonly points: FieldRef<"RoundScore", 'Int'>
    readonly createdAt: FieldRef<"RoundScore", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RoundScore findUnique
   */
  export type RoundScoreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoundScore
     */
    select?: RoundScoreSelect<ExtArgs> | null
    /**
     * Filter, which RoundScore to fetch.
     */
    where: RoundScoreWhereUniqueInput
  }

  /**
   * RoundScore findUniqueOrThrow
   */
  export type RoundScoreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoundScore
     */
    select?: RoundScoreSelect<ExtArgs> | null
    /**
     * Filter, which RoundScore to fetch.
     */
    where: RoundScoreWhereUniqueInput
  }

  /**
   * RoundScore findFirst
   */
  export type RoundScoreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoundScore
     */
    select?: RoundScoreSelect<ExtArgs> | null
    /**
     * Filter, which RoundScore to fetch.
     */
    where?: RoundScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoundScores to fetch.
     */
    orderBy?: RoundScoreOrderByWithRelationInput | RoundScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoundScores.
     */
    cursor?: RoundScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoundScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoundScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoundScores.
     */
    distinct?: RoundScoreScalarFieldEnum | RoundScoreScalarFieldEnum[]
  }

  /**
   * RoundScore findFirstOrThrow
   */
  export type RoundScoreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoundScore
     */
    select?: RoundScoreSelect<ExtArgs> | null
    /**
     * Filter, which RoundScore to fetch.
     */
    where?: RoundScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoundScores to fetch.
     */
    orderBy?: RoundScoreOrderByWithRelationInput | RoundScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoundScores.
     */
    cursor?: RoundScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoundScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoundScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoundScores.
     */
    distinct?: RoundScoreScalarFieldEnum | RoundScoreScalarFieldEnum[]
  }

  /**
   * RoundScore findMany
   */
  export type RoundScoreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoundScore
     */
    select?: RoundScoreSelect<ExtArgs> | null
    /**
     * Filter, which RoundScores to fetch.
     */
    where?: RoundScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoundScores to fetch.
     */
    orderBy?: RoundScoreOrderByWithRelationInput | RoundScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoundScores.
     */
    cursor?: RoundScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoundScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoundScores.
     */
    skip?: number
    distinct?: RoundScoreScalarFieldEnum | RoundScoreScalarFieldEnum[]
  }

  /**
   * RoundScore create
   */
  export type RoundScoreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoundScore
     */
    select?: RoundScoreSelect<ExtArgs> | null
    /**
     * The data needed to create a RoundScore.
     */
    data: XOR<RoundScoreCreateInput, RoundScoreUncheckedCreateInput>
  }

  /**
   * RoundScore createMany
   */
  export type RoundScoreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoundScores.
     */
    data: RoundScoreCreateManyInput | RoundScoreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoundScore createManyAndReturn
   */
  export type RoundScoreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoundScore
     */
    select?: RoundScoreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RoundScores.
     */
    data: RoundScoreCreateManyInput | RoundScoreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoundScore update
   */
  export type RoundScoreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoundScore
     */
    select?: RoundScoreSelect<ExtArgs> | null
    /**
     * The data needed to update a RoundScore.
     */
    data: XOR<RoundScoreUpdateInput, RoundScoreUncheckedUpdateInput>
    /**
     * Choose, which RoundScore to update.
     */
    where: RoundScoreWhereUniqueInput
  }

  /**
   * RoundScore updateMany
   */
  export type RoundScoreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoundScores.
     */
    data: XOR<RoundScoreUpdateManyMutationInput, RoundScoreUncheckedUpdateManyInput>
    /**
     * Filter which RoundScores to update
     */
    where?: RoundScoreWhereInput
  }

  /**
   * RoundScore upsert
   */
  export type RoundScoreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoundScore
     */
    select?: RoundScoreSelect<ExtArgs> | null
    /**
     * The filter to search for the RoundScore to update in case it exists.
     */
    where: RoundScoreWhereUniqueInput
    /**
     * In case the RoundScore found by the `where` argument doesn't exist, create a new RoundScore with this data.
     */
    create: XOR<RoundScoreCreateInput, RoundScoreUncheckedCreateInput>
    /**
     * In case the RoundScore was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoundScoreUpdateInput, RoundScoreUncheckedUpdateInput>
  }

  /**
   * RoundScore delete
   */
  export type RoundScoreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoundScore
     */
    select?: RoundScoreSelect<ExtArgs> | null
    /**
     * Filter which RoundScore to delete.
     */
    where: RoundScoreWhereUniqueInput
  }

  /**
   * RoundScore deleteMany
   */
  export type RoundScoreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoundScores to delete
     */
    where?: RoundScoreWhereInput
  }

  /**
   * RoundScore without action
   */
  export type RoundScoreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoundScore
     */
    select?: RoundScoreSelect<ExtArgs> | null
  }


  /**
   * Model MatchHistory
   */

  export type AggregateMatchHistory = {
    _count: MatchHistoryCountAggregateOutputType | null
    _avg: MatchHistoryAvgAggregateOutputType | null
    _sum: MatchHistorySumAggregateOutputType | null
    _min: MatchHistoryMinAggregateOutputType | null
    _max: MatchHistoryMaxAggregateOutputType | null
  }

  export type MatchHistoryAvgAggregateOutputType = {
    winnerTeam: number | null
    team0Score: number | null
    team1Score: number | null
    team0Zings: number | null
    team1Zings: number | null
    duration: number | null
  }

  export type MatchHistorySumAggregateOutputType = {
    winnerTeam: number | null
    team0Score: number | null
    team1Score: number | null
    team0Zings: number | null
    team1Zings: number | null
    duration: number | null
  }

  export type MatchHistoryMinAggregateOutputType = {
    id: string | null
    mode: string | null
    winnerTeam: number | null
    team0Score: number | null
    team1Score: number | null
    team0Zings: number | null
    team1Zings: number | null
    hostUserId: string | null
    team0Player1Id: string | null
    team0Player1Name: string | null
    team0Player2Id: string | null
    team0Player2Name: string | null
    team1Player1Id: string | null
    team1Player1Name: string | null
    team1Player2Id: string | null
    team1Player2Name: string | null
    duration: number | null
    createdAt: Date | null
  }

  export type MatchHistoryMaxAggregateOutputType = {
    id: string | null
    mode: string | null
    winnerTeam: number | null
    team0Score: number | null
    team1Score: number | null
    team0Zings: number | null
    team1Zings: number | null
    hostUserId: string | null
    team0Player1Id: string | null
    team0Player1Name: string | null
    team0Player2Id: string | null
    team0Player2Name: string | null
    team1Player1Id: string | null
    team1Player1Name: string | null
    team1Player2Id: string | null
    team1Player2Name: string | null
    duration: number | null
    createdAt: Date | null
  }

  export type MatchHistoryCountAggregateOutputType = {
    id: number
    mode: number
    winnerTeam: number
    team0Score: number
    team1Score: number
    team0Zings: number
    team1Zings: number
    hostUserId: number
    team0Player1Id: number
    team0Player1Name: number
    team0Player2Id: number
    team0Player2Name: number
    team1Player1Id: number
    team1Player1Name: number
    team1Player2Id: number
    team1Player2Name: number
    duration: number
    createdAt: number
    _all: number
  }


  export type MatchHistoryAvgAggregateInputType = {
    winnerTeam?: true
    team0Score?: true
    team1Score?: true
    team0Zings?: true
    team1Zings?: true
    duration?: true
  }

  export type MatchHistorySumAggregateInputType = {
    winnerTeam?: true
    team0Score?: true
    team1Score?: true
    team0Zings?: true
    team1Zings?: true
    duration?: true
  }

  export type MatchHistoryMinAggregateInputType = {
    id?: true
    mode?: true
    winnerTeam?: true
    team0Score?: true
    team1Score?: true
    team0Zings?: true
    team1Zings?: true
    hostUserId?: true
    team0Player1Id?: true
    team0Player1Name?: true
    team0Player2Id?: true
    team0Player2Name?: true
    team1Player1Id?: true
    team1Player1Name?: true
    team1Player2Id?: true
    team1Player2Name?: true
    duration?: true
    createdAt?: true
  }

  export type MatchHistoryMaxAggregateInputType = {
    id?: true
    mode?: true
    winnerTeam?: true
    team0Score?: true
    team1Score?: true
    team0Zings?: true
    team1Zings?: true
    hostUserId?: true
    team0Player1Id?: true
    team0Player1Name?: true
    team0Player2Id?: true
    team0Player2Name?: true
    team1Player1Id?: true
    team1Player1Name?: true
    team1Player2Id?: true
    team1Player2Name?: true
    duration?: true
    createdAt?: true
  }

  export type MatchHistoryCountAggregateInputType = {
    id?: true
    mode?: true
    winnerTeam?: true
    team0Score?: true
    team1Score?: true
    team0Zings?: true
    team1Zings?: true
    hostUserId?: true
    team0Player1Id?: true
    team0Player1Name?: true
    team0Player2Id?: true
    team0Player2Name?: true
    team1Player1Id?: true
    team1Player1Name?: true
    team1Player2Id?: true
    team1Player2Name?: true
    duration?: true
    createdAt?: true
    _all?: true
  }

  export type MatchHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MatchHistory to aggregate.
     */
    where?: MatchHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchHistories to fetch.
     */
    orderBy?: MatchHistoryOrderByWithRelationInput | MatchHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MatchHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MatchHistories
    **/
    _count?: true | MatchHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MatchHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MatchHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MatchHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MatchHistoryMaxAggregateInputType
  }

  export type GetMatchHistoryAggregateType<T extends MatchHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateMatchHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMatchHistory[P]>
      : GetScalarType<T[P], AggregateMatchHistory[P]>
  }




  export type MatchHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchHistoryWhereInput
    orderBy?: MatchHistoryOrderByWithAggregationInput | MatchHistoryOrderByWithAggregationInput[]
    by: MatchHistoryScalarFieldEnum[] | MatchHistoryScalarFieldEnum
    having?: MatchHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MatchHistoryCountAggregateInputType | true
    _avg?: MatchHistoryAvgAggregateInputType
    _sum?: MatchHistorySumAggregateInputType
    _min?: MatchHistoryMinAggregateInputType
    _max?: MatchHistoryMaxAggregateInputType
  }

  export type MatchHistoryGroupByOutputType = {
    id: string
    mode: string
    winnerTeam: number
    team0Score: number
    team1Score: number
    team0Zings: number
    team1Zings: number
    hostUserId: string | null
    team0Player1Id: string | null
    team0Player1Name: string
    team0Player2Id: string | null
    team0Player2Name: string | null
    team1Player1Id: string | null
    team1Player1Name: string
    team1Player2Id: string | null
    team1Player2Name: string | null
    duration: number | null
    createdAt: Date
    _count: MatchHistoryCountAggregateOutputType | null
    _avg: MatchHistoryAvgAggregateOutputType | null
    _sum: MatchHistorySumAggregateOutputType | null
    _min: MatchHistoryMinAggregateOutputType | null
    _max: MatchHistoryMaxAggregateOutputType | null
  }

  type GetMatchHistoryGroupByPayload<T extends MatchHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MatchHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MatchHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MatchHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], MatchHistoryGroupByOutputType[P]>
        }
      >
    >


  export type MatchHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mode?: boolean
    winnerTeam?: boolean
    team0Score?: boolean
    team1Score?: boolean
    team0Zings?: boolean
    team1Zings?: boolean
    hostUserId?: boolean
    team0Player1Id?: boolean
    team0Player1Name?: boolean
    team0Player2Id?: boolean
    team0Player2Name?: boolean
    team1Player1Id?: boolean
    team1Player1Name?: boolean
    team1Player2Id?: boolean
    team1Player2Name?: boolean
    duration?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["matchHistory"]>

  export type MatchHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mode?: boolean
    winnerTeam?: boolean
    team0Score?: boolean
    team1Score?: boolean
    team0Zings?: boolean
    team1Zings?: boolean
    hostUserId?: boolean
    team0Player1Id?: boolean
    team0Player1Name?: boolean
    team0Player2Id?: boolean
    team0Player2Name?: boolean
    team1Player1Id?: boolean
    team1Player1Name?: boolean
    team1Player2Id?: boolean
    team1Player2Name?: boolean
    duration?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["matchHistory"]>

  export type MatchHistorySelectScalar = {
    id?: boolean
    mode?: boolean
    winnerTeam?: boolean
    team0Score?: boolean
    team1Score?: boolean
    team0Zings?: boolean
    team1Zings?: boolean
    hostUserId?: boolean
    team0Player1Id?: boolean
    team0Player1Name?: boolean
    team0Player2Id?: boolean
    team0Player2Name?: boolean
    team1Player1Id?: boolean
    team1Player1Name?: boolean
    team1Player2Id?: boolean
    team1Player2Name?: boolean
    duration?: boolean
    createdAt?: boolean
  }


  export type $MatchHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MatchHistory"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      mode: string
      winnerTeam: number
      team0Score: number
      team1Score: number
      team0Zings: number
      team1Zings: number
      hostUserId: string | null
      team0Player1Id: string | null
      team0Player1Name: string
      team0Player2Id: string | null
      team0Player2Name: string | null
      team1Player1Id: string | null
      team1Player1Name: string
      team1Player2Id: string | null
      team1Player2Name: string | null
      duration: number | null
      createdAt: Date
    }, ExtArgs["result"]["matchHistory"]>
    composites: {}
  }

  type MatchHistoryGetPayload<S extends boolean | null | undefined | MatchHistoryDefaultArgs> = $Result.GetResult<Prisma.$MatchHistoryPayload, S>

  type MatchHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MatchHistoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MatchHistoryCountAggregateInputType | true
    }

  export interface MatchHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MatchHistory'], meta: { name: 'MatchHistory' } }
    /**
     * Find zero or one MatchHistory that matches the filter.
     * @param {MatchHistoryFindUniqueArgs} args - Arguments to find a MatchHistory
     * @example
     * // Get one MatchHistory
     * const matchHistory = await prisma.matchHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MatchHistoryFindUniqueArgs>(args: SelectSubset<T, MatchHistoryFindUniqueArgs<ExtArgs>>): Prisma__MatchHistoryClient<$Result.GetResult<Prisma.$MatchHistoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MatchHistory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MatchHistoryFindUniqueOrThrowArgs} args - Arguments to find a MatchHistory
     * @example
     * // Get one MatchHistory
     * const matchHistory = await prisma.matchHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MatchHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, MatchHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MatchHistoryClient<$Result.GetResult<Prisma.$MatchHistoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MatchHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchHistoryFindFirstArgs} args - Arguments to find a MatchHistory
     * @example
     * // Get one MatchHistory
     * const matchHistory = await prisma.matchHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MatchHistoryFindFirstArgs>(args?: SelectSubset<T, MatchHistoryFindFirstArgs<ExtArgs>>): Prisma__MatchHistoryClient<$Result.GetResult<Prisma.$MatchHistoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MatchHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchHistoryFindFirstOrThrowArgs} args - Arguments to find a MatchHistory
     * @example
     * // Get one MatchHistory
     * const matchHistory = await prisma.matchHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MatchHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, MatchHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__MatchHistoryClient<$Result.GetResult<Prisma.$MatchHistoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MatchHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MatchHistories
     * const matchHistories = await prisma.matchHistory.findMany()
     * 
     * // Get first 10 MatchHistories
     * const matchHistories = await prisma.matchHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const matchHistoryWithIdOnly = await prisma.matchHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MatchHistoryFindManyArgs>(args?: SelectSubset<T, MatchHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchHistoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MatchHistory.
     * @param {MatchHistoryCreateArgs} args - Arguments to create a MatchHistory.
     * @example
     * // Create one MatchHistory
     * const MatchHistory = await prisma.matchHistory.create({
     *   data: {
     *     // ... data to create a MatchHistory
     *   }
     * })
     * 
     */
    create<T extends MatchHistoryCreateArgs>(args: SelectSubset<T, MatchHistoryCreateArgs<ExtArgs>>): Prisma__MatchHistoryClient<$Result.GetResult<Prisma.$MatchHistoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MatchHistories.
     * @param {MatchHistoryCreateManyArgs} args - Arguments to create many MatchHistories.
     * @example
     * // Create many MatchHistories
     * const matchHistory = await prisma.matchHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MatchHistoryCreateManyArgs>(args?: SelectSubset<T, MatchHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MatchHistories and returns the data saved in the database.
     * @param {MatchHistoryCreateManyAndReturnArgs} args - Arguments to create many MatchHistories.
     * @example
     * // Create many MatchHistories
     * const matchHistory = await prisma.matchHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MatchHistories and only return the `id`
     * const matchHistoryWithIdOnly = await prisma.matchHistory.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MatchHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, MatchHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchHistoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MatchHistory.
     * @param {MatchHistoryDeleteArgs} args - Arguments to delete one MatchHistory.
     * @example
     * // Delete one MatchHistory
     * const MatchHistory = await prisma.matchHistory.delete({
     *   where: {
     *     // ... filter to delete one MatchHistory
     *   }
     * })
     * 
     */
    delete<T extends MatchHistoryDeleteArgs>(args: SelectSubset<T, MatchHistoryDeleteArgs<ExtArgs>>): Prisma__MatchHistoryClient<$Result.GetResult<Prisma.$MatchHistoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MatchHistory.
     * @param {MatchHistoryUpdateArgs} args - Arguments to update one MatchHistory.
     * @example
     * // Update one MatchHistory
     * const matchHistory = await prisma.matchHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MatchHistoryUpdateArgs>(args: SelectSubset<T, MatchHistoryUpdateArgs<ExtArgs>>): Prisma__MatchHistoryClient<$Result.GetResult<Prisma.$MatchHistoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MatchHistories.
     * @param {MatchHistoryDeleteManyArgs} args - Arguments to filter MatchHistories to delete.
     * @example
     * // Delete a few MatchHistories
     * const { count } = await prisma.matchHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MatchHistoryDeleteManyArgs>(args?: SelectSubset<T, MatchHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MatchHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MatchHistories
     * const matchHistory = await prisma.matchHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MatchHistoryUpdateManyArgs>(args: SelectSubset<T, MatchHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MatchHistory.
     * @param {MatchHistoryUpsertArgs} args - Arguments to update or create a MatchHistory.
     * @example
     * // Update or create a MatchHistory
     * const matchHistory = await prisma.matchHistory.upsert({
     *   create: {
     *     // ... data to create a MatchHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MatchHistory we want to update
     *   }
     * })
     */
    upsert<T extends MatchHistoryUpsertArgs>(args: SelectSubset<T, MatchHistoryUpsertArgs<ExtArgs>>): Prisma__MatchHistoryClient<$Result.GetResult<Prisma.$MatchHistoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MatchHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchHistoryCountArgs} args - Arguments to filter MatchHistories to count.
     * @example
     * // Count the number of MatchHistories
     * const count = await prisma.matchHistory.count({
     *   where: {
     *     // ... the filter for the MatchHistories we want to count
     *   }
     * })
    **/
    count<T extends MatchHistoryCountArgs>(
      args?: Subset<T, MatchHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MatchHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MatchHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MatchHistoryAggregateArgs>(args: Subset<T, MatchHistoryAggregateArgs>): Prisma.PrismaPromise<GetMatchHistoryAggregateType<T>>

    /**
     * Group by MatchHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MatchHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MatchHistoryGroupByArgs['orderBy'] }
        : { orderBy?: MatchHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MatchHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMatchHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MatchHistory model
   */
  readonly fields: MatchHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MatchHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MatchHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MatchHistory model
   */ 
  interface MatchHistoryFieldRefs {
    readonly id: FieldRef<"MatchHistory", 'String'>
    readonly mode: FieldRef<"MatchHistory", 'String'>
    readonly winnerTeam: FieldRef<"MatchHistory", 'Int'>
    readonly team0Score: FieldRef<"MatchHistory", 'Int'>
    readonly team1Score: FieldRef<"MatchHistory", 'Int'>
    readonly team0Zings: FieldRef<"MatchHistory", 'Int'>
    readonly team1Zings: FieldRef<"MatchHistory", 'Int'>
    readonly hostUserId: FieldRef<"MatchHistory", 'String'>
    readonly team0Player1Id: FieldRef<"MatchHistory", 'String'>
    readonly team0Player1Name: FieldRef<"MatchHistory", 'String'>
    readonly team0Player2Id: FieldRef<"MatchHistory", 'String'>
    readonly team0Player2Name: FieldRef<"MatchHistory", 'String'>
    readonly team1Player1Id: FieldRef<"MatchHistory", 'String'>
    readonly team1Player1Name: FieldRef<"MatchHistory", 'String'>
    readonly team1Player2Id: FieldRef<"MatchHistory", 'String'>
    readonly team1Player2Name: FieldRef<"MatchHistory", 'String'>
    readonly duration: FieldRef<"MatchHistory", 'Int'>
    readonly createdAt: FieldRef<"MatchHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MatchHistory findUnique
   */
  export type MatchHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchHistory
     */
    select?: MatchHistorySelect<ExtArgs> | null
    /**
     * Filter, which MatchHistory to fetch.
     */
    where: MatchHistoryWhereUniqueInput
  }

  /**
   * MatchHistory findUniqueOrThrow
   */
  export type MatchHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchHistory
     */
    select?: MatchHistorySelect<ExtArgs> | null
    /**
     * Filter, which MatchHistory to fetch.
     */
    where: MatchHistoryWhereUniqueInput
  }

  /**
   * MatchHistory findFirst
   */
  export type MatchHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchHistory
     */
    select?: MatchHistorySelect<ExtArgs> | null
    /**
     * Filter, which MatchHistory to fetch.
     */
    where?: MatchHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchHistories to fetch.
     */
    orderBy?: MatchHistoryOrderByWithRelationInput | MatchHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatchHistories.
     */
    cursor?: MatchHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchHistories.
     */
    distinct?: MatchHistoryScalarFieldEnum | MatchHistoryScalarFieldEnum[]
  }

  /**
   * MatchHistory findFirstOrThrow
   */
  export type MatchHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchHistory
     */
    select?: MatchHistorySelect<ExtArgs> | null
    /**
     * Filter, which MatchHistory to fetch.
     */
    where?: MatchHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchHistories to fetch.
     */
    orderBy?: MatchHistoryOrderByWithRelationInput | MatchHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatchHistories.
     */
    cursor?: MatchHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchHistories.
     */
    distinct?: MatchHistoryScalarFieldEnum | MatchHistoryScalarFieldEnum[]
  }

  /**
   * MatchHistory findMany
   */
  export type MatchHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchHistory
     */
    select?: MatchHistorySelect<ExtArgs> | null
    /**
     * Filter, which MatchHistories to fetch.
     */
    where?: MatchHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchHistories to fetch.
     */
    orderBy?: MatchHistoryOrderByWithRelationInput | MatchHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MatchHistories.
     */
    cursor?: MatchHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchHistories.
     */
    skip?: number
    distinct?: MatchHistoryScalarFieldEnum | MatchHistoryScalarFieldEnum[]
  }

  /**
   * MatchHistory create
   */
  export type MatchHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchHistory
     */
    select?: MatchHistorySelect<ExtArgs> | null
    /**
     * The data needed to create a MatchHistory.
     */
    data: XOR<MatchHistoryCreateInput, MatchHistoryUncheckedCreateInput>
  }

  /**
   * MatchHistory createMany
   */
  export type MatchHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MatchHistories.
     */
    data: MatchHistoryCreateManyInput | MatchHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MatchHistory createManyAndReturn
   */
  export type MatchHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchHistory
     */
    select?: MatchHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MatchHistories.
     */
    data: MatchHistoryCreateManyInput | MatchHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MatchHistory update
   */
  export type MatchHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchHistory
     */
    select?: MatchHistorySelect<ExtArgs> | null
    /**
     * The data needed to update a MatchHistory.
     */
    data: XOR<MatchHistoryUpdateInput, MatchHistoryUncheckedUpdateInput>
    /**
     * Choose, which MatchHistory to update.
     */
    where: MatchHistoryWhereUniqueInput
  }

  /**
   * MatchHistory updateMany
   */
  export type MatchHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MatchHistories.
     */
    data: XOR<MatchHistoryUpdateManyMutationInput, MatchHistoryUncheckedUpdateManyInput>
    /**
     * Filter which MatchHistories to update
     */
    where?: MatchHistoryWhereInput
  }

  /**
   * MatchHistory upsert
   */
  export type MatchHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchHistory
     */
    select?: MatchHistorySelect<ExtArgs> | null
    /**
     * The filter to search for the MatchHistory to update in case it exists.
     */
    where: MatchHistoryWhereUniqueInput
    /**
     * In case the MatchHistory found by the `where` argument doesn't exist, create a new MatchHistory with this data.
     */
    create: XOR<MatchHistoryCreateInput, MatchHistoryUncheckedCreateInput>
    /**
     * In case the MatchHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MatchHistoryUpdateInput, MatchHistoryUncheckedUpdateInput>
  }

  /**
   * MatchHistory delete
   */
  export type MatchHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchHistory
     */
    select?: MatchHistorySelect<ExtArgs> | null
    /**
     * Filter which MatchHistory to delete.
     */
    where: MatchHistoryWhereUniqueInput
  }

  /**
   * MatchHistory deleteMany
   */
  export type MatchHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MatchHistories to delete
     */
    where?: MatchHistoryWhereInput
  }

  /**
   * MatchHistory without action
   */
  export type MatchHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchHistory
     */
    select?: MatchHistorySelect<ExtArgs> | null
  }


  /**
   * Model UserStats
   */

  export type AggregateUserStats = {
    _count: UserStatsCountAggregateOutputType | null
    _avg: UserStatsAvgAggregateOutputType | null
    _sum: UserStatsSumAggregateOutputType | null
    _min: UserStatsMinAggregateOutputType | null
    _max: UserStatsMaxAggregateOutputType | null
  }

  export type UserStatsAvgAggregateOutputType = {
    gamesPlayed: number | null
    soloWins: number | null
    duoWins: number | null
    pointsTaken: number | null
    zingsMade: number | null
    gamesHosted: number | null
    friendsAdded: number | null
  }

  export type UserStatsSumAggregateOutputType = {
    gamesPlayed: number | null
    soloWins: number | null
    duoWins: number | null
    pointsTaken: number | null
    zingsMade: number | null
    gamesHosted: number | null
    friendsAdded: number | null
  }

  export type UserStatsMinAggregateOutputType = {
    id: string | null
    userId: string | null
    gamesPlayed: number | null
    soloWins: number | null
    duoWins: number | null
    pointsTaken: number | null
    zingsMade: number | null
    gamesHosted: number | null
    friendsAdded: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserStatsMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    gamesPlayed: number | null
    soloWins: number | null
    duoWins: number | null
    pointsTaken: number | null
    zingsMade: number | null
    gamesHosted: number | null
    friendsAdded: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserStatsCountAggregateOutputType = {
    id: number
    userId: number
    gamesPlayed: number
    soloWins: number
    duoWins: number
    pointsTaken: number
    zingsMade: number
    gamesHosted: number
    friendsAdded: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserStatsAvgAggregateInputType = {
    gamesPlayed?: true
    soloWins?: true
    duoWins?: true
    pointsTaken?: true
    zingsMade?: true
    gamesHosted?: true
    friendsAdded?: true
  }

  export type UserStatsSumAggregateInputType = {
    gamesPlayed?: true
    soloWins?: true
    duoWins?: true
    pointsTaken?: true
    zingsMade?: true
    gamesHosted?: true
    friendsAdded?: true
  }

  export type UserStatsMinAggregateInputType = {
    id?: true
    userId?: true
    gamesPlayed?: true
    soloWins?: true
    duoWins?: true
    pointsTaken?: true
    zingsMade?: true
    gamesHosted?: true
    friendsAdded?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserStatsMaxAggregateInputType = {
    id?: true
    userId?: true
    gamesPlayed?: true
    soloWins?: true
    duoWins?: true
    pointsTaken?: true
    zingsMade?: true
    gamesHosted?: true
    friendsAdded?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserStatsCountAggregateInputType = {
    id?: true
    userId?: true
    gamesPlayed?: true
    soloWins?: true
    duoWins?: true
    pointsTaken?: true
    zingsMade?: true
    gamesHosted?: true
    friendsAdded?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserStats to aggregate.
     */
    where?: UserStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStats to fetch.
     */
    orderBy?: UserStatsOrderByWithRelationInput | UserStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserStats
    **/
    _count?: true | UserStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserStatsMaxAggregateInputType
  }

  export type GetUserStatsAggregateType<T extends UserStatsAggregateArgs> = {
        [P in keyof T & keyof AggregateUserStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserStats[P]>
      : GetScalarType<T[P], AggregateUserStats[P]>
  }




  export type UserStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserStatsWhereInput
    orderBy?: UserStatsOrderByWithAggregationInput | UserStatsOrderByWithAggregationInput[]
    by: UserStatsScalarFieldEnum[] | UserStatsScalarFieldEnum
    having?: UserStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserStatsCountAggregateInputType | true
    _avg?: UserStatsAvgAggregateInputType
    _sum?: UserStatsSumAggregateInputType
    _min?: UserStatsMinAggregateInputType
    _max?: UserStatsMaxAggregateInputType
  }

  export type UserStatsGroupByOutputType = {
    id: string
    userId: string
    gamesPlayed: number
    soloWins: number
    duoWins: number
    pointsTaken: number
    zingsMade: number
    gamesHosted: number
    friendsAdded: number
    createdAt: Date
    updatedAt: Date
    _count: UserStatsCountAggregateOutputType | null
    _avg: UserStatsAvgAggregateOutputType | null
    _sum: UserStatsSumAggregateOutputType | null
    _min: UserStatsMinAggregateOutputType | null
    _max: UserStatsMaxAggregateOutputType | null
  }

  type GetUserStatsGroupByPayload<T extends UserStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserStatsGroupByOutputType[P]>
            : GetScalarType<T[P], UserStatsGroupByOutputType[P]>
        }
      >
    >


  export type UserStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gamesPlayed?: boolean
    soloWins?: boolean
    duoWins?: boolean
    pointsTaken?: boolean
    zingsMade?: boolean
    gamesHosted?: boolean
    friendsAdded?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userStats"]>

  export type UserStatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gamesPlayed?: boolean
    soloWins?: boolean
    duoWins?: boolean
    pointsTaken?: boolean
    zingsMade?: boolean
    gamesHosted?: boolean
    friendsAdded?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userStats"]>

  export type UserStatsSelectScalar = {
    id?: boolean
    userId?: boolean
    gamesPlayed?: boolean
    soloWins?: boolean
    duoWins?: boolean
    pointsTaken?: boolean
    zingsMade?: boolean
    gamesHosted?: boolean
    friendsAdded?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserStatsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserStatsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserStats"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      gamesPlayed: number
      soloWins: number
      duoWins: number
      pointsTaken: number
      zingsMade: number
      gamesHosted: number
      friendsAdded: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userStats"]>
    composites: {}
  }

  type UserStatsGetPayload<S extends boolean | null | undefined | UserStatsDefaultArgs> = $Result.GetResult<Prisma.$UserStatsPayload, S>

  type UserStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserStatsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserStatsCountAggregateInputType | true
    }

  export interface UserStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserStats'], meta: { name: 'UserStats' } }
    /**
     * Find zero or one UserStats that matches the filter.
     * @param {UserStatsFindUniqueArgs} args - Arguments to find a UserStats
     * @example
     * // Get one UserStats
     * const userStats = await prisma.userStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserStatsFindUniqueArgs>(args: SelectSubset<T, UserStatsFindUniqueArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one UserStats that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserStatsFindUniqueOrThrowArgs} args - Arguments to find a UserStats
     * @example
     * // Get one UserStats
     * const userStats = await prisma.userStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, UserStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first UserStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsFindFirstArgs} args - Arguments to find a UserStats
     * @example
     * // Get one UserStats
     * const userStats = await prisma.userStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserStatsFindFirstArgs>(args?: SelectSubset<T, UserStatsFindFirstArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first UserStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsFindFirstOrThrowArgs} args - Arguments to find a UserStats
     * @example
     * // Get one UserStats
     * const userStats = await prisma.userStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, UserStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more UserStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserStats
     * const userStats = await prisma.userStats.findMany()
     * 
     * // Get first 10 UserStats
     * const userStats = await prisma.userStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userStatsWithIdOnly = await prisma.userStats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserStatsFindManyArgs>(args?: SelectSubset<T, UserStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a UserStats.
     * @param {UserStatsCreateArgs} args - Arguments to create a UserStats.
     * @example
     * // Create one UserStats
     * const UserStats = await prisma.userStats.create({
     *   data: {
     *     // ... data to create a UserStats
     *   }
     * })
     * 
     */
    create<T extends UserStatsCreateArgs>(args: SelectSubset<T, UserStatsCreateArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many UserStats.
     * @param {UserStatsCreateManyArgs} args - Arguments to create many UserStats.
     * @example
     * // Create many UserStats
     * const userStats = await prisma.userStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserStatsCreateManyArgs>(args?: SelectSubset<T, UserStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserStats and returns the data saved in the database.
     * @param {UserStatsCreateManyAndReturnArgs} args - Arguments to create many UserStats.
     * @example
     * // Create many UserStats
     * const userStats = await prisma.userStats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserStats and only return the `id`
     * const userStatsWithIdOnly = await prisma.userStats.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserStatsCreateManyAndReturnArgs>(args?: SelectSubset<T, UserStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a UserStats.
     * @param {UserStatsDeleteArgs} args - Arguments to delete one UserStats.
     * @example
     * // Delete one UserStats
     * const UserStats = await prisma.userStats.delete({
     *   where: {
     *     // ... filter to delete one UserStats
     *   }
     * })
     * 
     */
    delete<T extends UserStatsDeleteArgs>(args: SelectSubset<T, UserStatsDeleteArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one UserStats.
     * @param {UserStatsUpdateArgs} args - Arguments to update one UserStats.
     * @example
     * // Update one UserStats
     * const userStats = await prisma.userStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserStatsUpdateArgs>(args: SelectSubset<T, UserStatsUpdateArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more UserStats.
     * @param {UserStatsDeleteManyArgs} args - Arguments to filter UserStats to delete.
     * @example
     * // Delete a few UserStats
     * const { count } = await prisma.userStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserStatsDeleteManyArgs>(args?: SelectSubset<T, UserStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserStats
     * const userStats = await prisma.userStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserStatsUpdateManyArgs>(args: SelectSubset<T, UserStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserStats.
     * @param {UserStatsUpsertArgs} args - Arguments to update or create a UserStats.
     * @example
     * // Update or create a UserStats
     * const userStats = await prisma.userStats.upsert({
     *   create: {
     *     // ... data to create a UserStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserStats we want to update
     *   }
     * })
     */
    upsert<T extends UserStatsUpsertArgs>(args: SelectSubset<T, UserStatsUpsertArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of UserStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsCountArgs} args - Arguments to filter UserStats to count.
     * @example
     * // Count the number of UserStats
     * const count = await prisma.userStats.count({
     *   where: {
     *     // ... the filter for the UserStats we want to count
     *   }
     * })
    **/
    count<T extends UserStatsCountArgs>(
      args?: Subset<T, UserStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserStatsAggregateArgs>(args: Subset<T, UserStatsAggregateArgs>): Prisma.PrismaPromise<GetUserStatsAggregateType<T>>

    /**
     * Group by UserStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserStatsGroupByArgs['orderBy'] }
        : { orderBy?: UserStatsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserStats model
   */
  readonly fields: UserStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserStats model
   */ 
  interface UserStatsFieldRefs {
    readonly id: FieldRef<"UserStats", 'String'>
    readonly userId: FieldRef<"UserStats", 'String'>
    readonly gamesPlayed: FieldRef<"UserStats", 'Int'>
    readonly soloWins: FieldRef<"UserStats", 'Int'>
    readonly duoWins: FieldRef<"UserStats", 'Int'>
    readonly pointsTaken: FieldRef<"UserStats", 'Int'>
    readonly zingsMade: FieldRef<"UserStats", 'Int'>
    readonly gamesHosted: FieldRef<"UserStats", 'Int'>
    readonly friendsAdded: FieldRef<"UserStats", 'Int'>
    readonly createdAt: FieldRef<"UserStats", 'DateTime'>
    readonly updatedAt: FieldRef<"UserStats", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserStats findUnique
   */
  export type UserStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserStats to fetch.
     */
    where: UserStatsWhereUniqueInput
  }

  /**
   * UserStats findUniqueOrThrow
   */
  export type UserStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserStats to fetch.
     */
    where: UserStatsWhereUniqueInput
  }

  /**
   * UserStats findFirst
   */
  export type UserStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserStats to fetch.
     */
    where?: UserStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStats to fetch.
     */
    orderBy?: UserStatsOrderByWithRelationInput | UserStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserStats.
     */
    cursor?: UserStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserStats.
     */
    distinct?: UserStatsScalarFieldEnum | UserStatsScalarFieldEnum[]
  }

  /**
   * UserStats findFirstOrThrow
   */
  export type UserStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserStats to fetch.
     */
    where?: UserStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStats to fetch.
     */
    orderBy?: UserStatsOrderByWithRelationInput | UserStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserStats.
     */
    cursor?: UserStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserStats.
     */
    distinct?: UserStatsScalarFieldEnum | UserStatsScalarFieldEnum[]
  }

  /**
   * UserStats findMany
   */
  export type UserStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserStats to fetch.
     */
    where?: UserStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStats to fetch.
     */
    orderBy?: UserStatsOrderByWithRelationInput | UserStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserStats.
     */
    cursor?: UserStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStats.
     */
    skip?: number
    distinct?: UserStatsScalarFieldEnum | UserStatsScalarFieldEnum[]
  }

  /**
   * UserStats create
   */
  export type UserStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * The data needed to create a UserStats.
     */
    data: XOR<UserStatsCreateInput, UserStatsUncheckedCreateInput>
  }

  /**
   * UserStats createMany
   */
  export type UserStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserStats.
     */
    data: UserStatsCreateManyInput | UserStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserStats createManyAndReturn
   */
  export type UserStatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many UserStats.
     */
    data: UserStatsCreateManyInput | UserStatsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserStats update
   */
  export type UserStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * The data needed to update a UserStats.
     */
    data: XOR<UserStatsUpdateInput, UserStatsUncheckedUpdateInput>
    /**
     * Choose, which UserStats to update.
     */
    where: UserStatsWhereUniqueInput
  }

  /**
   * UserStats updateMany
   */
  export type UserStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserStats.
     */
    data: XOR<UserStatsUpdateManyMutationInput, UserStatsUncheckedUpdateManyInput>
    /**
     * Filter which UserStats to update
     */
    where?: UserStatsWhereInput
  }

  /**
   * UserStats upsert
   */
  export type UserStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * The filter to search for the UserStats to update in case it exists.
     */
    where: UserStatsWhereUniqueInput
    /**
     * In case the UserStats found by the `where` argument doesn't exist, create a new UserStats with this data.
     */
    create: XOR<UserStatsCreateInput, UserStatsUncheckedCreateInput>
    /**
     * In case the UserStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserStatsUpdateInput, UserStatsUncheckedUpdateInput>
  }

  /**
   * UserStats delete
   */
  export type UserStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter which UserStats to delete.
     */
    where: UserStatsWhereUniqueInput
  }

  /**
   * UserStats deleteMany
   */
  export type UserStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserStats to delete
     */
    where?: UserStatsWhereInput
  }

  /**
   * UserStats without action
   */
  export type UserStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
  }


  /**
   * Model Achievement
   */

  export type AggregateAchievement = {
    _count: AchievementCountAggregateOutputType | null
    _avg: AchievementAvgAggregateOutputType | null
    _sum: AchievementSumAggregateOutputType | null
    _min: AchievementMinAggregateOutputType | null
    _max: AchievementMaxAggregateOutputType | null
  }

  export type AchievementAvgAggregateOutputType = {
    tier: number | null
    threshold: number | null
  }

  export type AchievementSumAggregateOutputType = {
    tier: number | null
    threshold: number | null
  }

  export type AchievementMinAggregateOutputType = {
    id: string | null
    type: $Enums.AchievementType | null
    tier: number | null
    threshold: number | null
    name: string | null
    description: string | null
  }

  export type AchievementMaxAggregateOutputType = {
    id: string | null
    type: $Enums.AchievementType | null
    tier: number | null
    threshold: number | null
    name: string | null
    description: string | null
  }

  export type AchievementCountAggregateOutputType = {
    id: number
    type: number
    tier: number
    threshold: number
    name: number
    description: number
    _all: number
  }


  export type AchievementAvgAggregateInputType = {
    tier?: true
    threshold?: true
  }

  export type AchievementSumAggregateInputType = {
    tier?: true
    threshold?: true
  }

  export type AchievementMinAggregateInputType = {
    id?: true
    type?: true
    tier?: true
    threshold?: true
    name?: true
    description?: true
  }

  export type AchievementMaxAggregateInputType = {
    id?: true
    type?: true
    tier?: true
    threshold?: true
    name?: true
    description?: true
  }

  export type AchievementCountAggregateInputType = {
    id?: true
    type?: true
    tier?: true
    threshold?: true
    name?: true
    description?: true
    _all?: true
  }

  export type AchievementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Achievement to aggregate.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Achievements
    **/
    _count?: true | AchievementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AchievementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AchievementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AchievementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AchievementMaxAggregateInputType
  }

  export type GetAchievementAggregateType<T extends AchievementAggregateArgs> = {
        [P in keyof T & keyof AggregateAchievement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAchievement[P]>
      : GetScalarType<T[P], AggregateAchievement[P]>
  }




  export type AchievementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AchievementWhereInput
    orderBy?: AchievementOrderByWithAggregationInput | AchievementOrderByWithAggregationInput[]
    by: AchievementScalarFieldEnum[] | AchievementScalarFieldEnum
    having?: AchievementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AchievementCountAggregateInputType | true
    _avg?: AchievementAvgAggregateInputType
    _sum?: AchievementSumAggregateInputType
    _min?: AchievementMinAggregateInputType
    _max?: AchievementMaxAggregateInputType
  }

  export type AchievementGroupByOutputType = {
    id: string
    type: $Enums.AchievementType
    tier: number
    threshold: number
    name: string
    description: string
    _count: AchievementCountAggregateOutputType | null
    _avg: AchievementAvgAggregateOutputType | null
    _sum: AchievementSumAggregateOutputType | null
    _min: AchievementMinAggregateOutputType | null
    _max: AchievementMaxAggregateOutputType | null
  }

  type GetAchievementGroupByPayload<T extends AchievementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AchievementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AchievementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AchievementGroupByOutputType[P]>
            : GetScalarType<T[P], AchievementGroupByOutputType[P]>
        }
      >
    >


  export type AchievementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    tier?: boolean
    threshold?: boolean
    name?: boolean
    description?: boolean
    unlockedBy?: boolean | Achievement$unlockedByArgs<ExtArgs>
    _count?: boolean | AchievementCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["achievement"]>

  export type AchievementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    tier?: boolean
    threshold?: boolean
    name?: boolean
    description?: boolean
  }, ExtArgs["result"]["achievement"]>

  export type AchievementSelectScalar = {
    id?: boolean
    type?: boolean
    tier?: boolean
    threshold?: boolean
    name?: boolean
    description?: boolean
  }

  export type AchievementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    unlockedBy?: boolean | Achievement$unlockedByArgs<ExtArgs>
    _count?: boolean | AchievementCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AchievementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AchievementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Achievement"
    objects: {
      unlockedBy: Prisma.$UserAchievementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.AchievementType
      tier: number
      threshold: number
      name: string
      description: string
    }, ExtArgs["result"]["achievement"]>
    composites: {}
  }

  type AchievementGetPayload<S extends boolean | null | undefined | AchievementDefaultArgs> = $Result.GetResult<Prisma.$AchievementPayload, S>

  type AchievementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AchievementFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AchievementCountAggregateInputType | true
    }

  export interface AchievementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Achievement'], meta: { name: 'Achievement' } }
    /**
     * Find zero or one Achievement that matches the filter.
     * @param {AchievementFindUniqueArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AchievementFindUniqueArgs>(args: SelectSubset<T, AchievementFindUniqueArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Achievement that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AchievementFindUniqueOrThrowArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AchievementFindUniqueOrThrowArgs>(args: SelectSubset<T, AchievementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Achievement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementFindFirstArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AchievementFindFirstArgs>(args?: SelectSubset<T, AchievementFindFirstArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Achievement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementFindFirstOrThrowArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AchievementFindFirstOrThrowArgs>(args?: SelectSubset<T, AchievementFindFirstOrThrowArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Achievements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Achievements
     * const achievements = await prisma.achievement.findMany()
     * 
     * // Get first 10 Achievements
     * const achievements = await prisma.achievement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const achievementWithIdOnly = await prisma.achievement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AchievementFindManyArgs>(args?: SelectSubset<T, AchievementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Achievement.
     * @param {AchievementCreateArgs} args - Arguments to create a Achievement.
     * @example
     * // Create one Achievement
     * const Achievement = await prisma.achievement.create({
     *   data: {
     *     // ... data to create a Achievement
     *   }
     * })
     * 
     */
    create<T extends AchievementCreateArgs>(args: SelectSubset<T, AchievementCreateArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Achievements.
     * @param {AchievementCreateManyArgs} args - Arguments to create many Achievements.
     * @example
     * // Create many Achievements
     * const achievement = await prisma.achievement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AchievementCreateManyArgs>(args?: SelectSubset<T, AchievementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Achievements and returns the data saved in the database.
     * @param {AchievementCreateManyAndReturnArgs} args - Arguments to create many Achievements.
     * @example
     * // Create many Achievements
     * const achievement = await prisma.achievement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Achievements and only return the `id`
     * const achievementWithIdOnly = await prisma.achievement.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AchievementCreateManyAndReturnArgs>(args?: SelectSubset<T, AchievementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Achievement.
     * @param {AchievementDeleteArgs} args - Arguments to delete one Achievement.
     * @example
     * // Delete one Achievement
     * const Achievement = await prisma.achievement.delete({
     *   where: {
     *     // ... filter to delete one Achievement
     *   }
     * })
     * 
     */
    delete<T extends AchievementDeleteArgs>(args: SelectSubset<T, AchievementDeleteArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Achievement.
     * @param {AchievementUpdateArgs} args - Arguments to update one Achievement.
     * @example
     * // Update one Achievement
     * const achievement = await prisma.achievement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AchievementUpdateArgs>(args: SelectSubset<T, AchievementUpdateArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Achievements.
     * @param {AchievementDeleteManyArgs} args - Arguments to filter Achievements to delete.
     * @example
     * // Delete a few Achievements
     * const { count } = await prisma.achievement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AchievementDeleteManyArgs>(args?: SelectSubset<T, AchievementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Achievements
     * const achievement = await prisma.achievement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AchievementUpdateManyArgs>(args: SelectSubset<T, AchievementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Achievement.
     * @param {AchievementUpsertArgs} args - Arguments to update or create a Achievement.
     * @example
     * // Update or create a Achievement
     * const achievement = await prisma.achievement.upsert({
     *   create: {
     *     // ... data to create a Achievement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Achievement we want to update
     *   }
     * })
     */
    upsert<T extends AchievementUpsertArgs>(args: SelectSubset<T, AchievementUpsertArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementCountArgs} args - Arguments to filter Achievements to count.
     * @example
     * // Count the number of Achievements
     * const count = await prisma.achievement.count({
     *   where: {
     *     // ... the filter for the Achievements we want to count
     *   }
     * })
    **/
    count<T extends AchievementCountArgs>(
      args?: Subset<T, AchievementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AchievementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Achievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AchievementAggregateArgs>(args: Subset<T, AchievementAggregateArgs>): Prisma.PrismaPromise<GetAchievementAggregateType<T>>

    /**
     * Group by Achievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AchievementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AchievementGroupByArgs['orderBy'] }
        : { orderBy?: AchievementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AchievementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAchievementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Achievement model
   */
  readonly fields: AchievementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Achievement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AchievementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    unlockedBy<T extends Achievement$unlockedByArgs<ExtArgs> = {}>(args?: Subset<T, Achievement$unlockedByArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Achievement model
   */ 
  interface AchievementFieldRefs {
    readonly id: FieldRef<"Achievement", 'String'>
    readonly type: FieldRef<"Achievement", 'AchievementType'>
    readonly tier: FieldRef<"Achievement", 'Int'>
    readonly threshold: FieldRef<"Achievement", 'Int'>
    readonly name: FieldRef<"Achievement", 'String'>
    readonly description: FieldRef<"Achievement", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Achievement findUnique
   */
  export type AchievementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where: AchievementWhereUniqueInput
  }

  /**
   * Achievement findUniqueOrThrow
   */
  export type AchievementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where: AchievementWhereUniqueInput
  }

  /**
   * Achievement findFirst
   */
  export type AchievementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Achievements.
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Achievements.
     */
    distinct?: AchievementScalarFieldEnum | AchievementScalarFieldEnum[]
  }

  /**
   * Achievement findFirstOrThrow
   */
  export type AchievementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Achievements.
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Achievements.
     */
    distinct?: AchievementScalarFieldEnum | AchievementScalarFieldEnum[]
  }

  /**
   * Achievement findMany
   */
  export type AchievementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievements to fetch.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Achievements.
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    distinct?: AchievementScalarFieldEnum | AchievementScalarFieldEnum[]
  }

  /**
   * Achievement create
   */
  export type AchievementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * The data needed to create a Achievement.
     */
    data: XOR<AchievementCreateInput, AchievementUncheckedCreateInput>
  }

  /**
   * Achievement createMany
   */
  export type AchievementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Achievements.
     */
    data: AchievementCreateManyInput | AchievementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Achievement createManyAndReturn
   */
  export type AchievementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Achievements.
     */
    data: AchievementCreateManyInput | AchievementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Achievement update
   */
  export type AchievementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * The data needed to update a Achievement.
     */
    data: XOR<AchievementUpdateInput, AchievementUncheckedUpdateInput>
    /**
     * Choose, which Achievement to update.
     */
    where: AchievementWhereUniqueInput
  }

  /**
   * Achievement updateMany
   */
  export type AchievementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Achievements.
     */
    data: XOR<AchievementUpdateManyMutationInput, AchievementUncheckedUpdateManyInput>
    /**
     * Filter which Achievements to update
     */
    where?: AchievementWhereInput
  }

  /**
   * Achievement upsert
   */
  export type AchievementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * The filter to search for the Achievement to update in case it exists.
     */
    where: AchievementWhereUniqueInput
    /**
     * In case the Achievement found by the `where` argument doesn't exist, create a new Achievement with this data.
     */
    create: XOR<AchievementCreateInput, AchievementUncheckedCreateInput>
    /**
     * In case the Achievement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AchievementUpdateInput, AchievementUncheckedUpdateInput>
  }

  /**
   * Achievement delete
   */
  export type AchievementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter which Achievement to delete.
     */
    where: AchievementWhereUniqueInput
  }

  /**
   * Achievement deleteMany
   */
  export type AchievementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Achievements to delete
     */
    where?: AchievementWhereInput
  }

  /**
   * Achievement.unlockedBy
   */
  export type Achievement$unlockedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    where?: UserAchievementWhereInput
    orderBy?: UserAchievementOrderByWithRelationInput | UserAchievementOrderByWithRelationInput[]
    cursor?: UserAchievementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserAchievementScalarFieldEnum | UserAchievementScalarFieldEnum[]
  }

  /**
   * Achievement without action
   */
  export type AchievementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
  }


  /**
   * Model UserAchievement
   */

  export type AggregateUserAchievement = {
    _count: UserAchievementCountAggregateOutputType | null
    _min: UserAchievementMinAggregateOutputType | null
    _max: UserAchievementMaxAggregateOutputType | null
  }

  export type UserAchievementMinAggregateOutputType = {
    id: string | null
    userId: string | null
    achievementId: string | null
    unlockedAt: Date | null
  }

  export type UserAchievementMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    achievementId: string | null
    unlockedAt: Date | null
  }

  export type UserAchievementCountAggregateOutputType = {
    id: number
    userId: number
    achievementId: number
    unlockedAt: number
    _all: number
  }


  export type UserAchievementMinAggregateInputType = {
    id?: true
    userId?: true
    achievementId?: true
    unlockedAt?: true
  }

  export type UserAchievementMaxAggregateInputType = {
    id?: true
    userId?: true
    achievementId?: true
    unlockedAt?: true
  }

  export type UserAchievementCountAggregateInputType = {
    id?: true
    userId?: true
    achievementId?: true
    unlockedAt?: true
    _all?: true
  }

  export type UserAchievementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAchievement to aggregate.
     */
    where?: UserAchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAchievements to fetch.
     */
    orderBy?: UserAchievementOrderByWithRelationInput | UserAchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserAchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAchievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAchievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserAchievements
    **/
    _count?: true | UserAchievementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserAchievementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserAchievementMaxAggregateInputType
  }

  export type GetUserAchievementAggregateType<T extends UserAchievementAggregateArgs> = {
        [P in keyof T & keyof AggregateUserAchievement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserAchievement[P]>
      : GetScalarType<T[P], AggregateUserAchievement[P]>
  }




  export type UserAchievementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAchievementWhereInput
    orderBy?: UserAchievementOrderByWithAggregationInput | UserAchievementOrderByWithAggregationInput[]
    by: UserAchievementScalarFieldEnum[] | UserAchievementScalarFieldEnum
    having?: UserAchievementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserAchievementCountAggregateInputType | true
    _min?: UserAchievementMinAggregateInputType
    _max?: UserAchievementMaxAggregateInputType
  }

  export type UserAchievementGroupByOutputType = {
    id: string
    userId: string
    achievementId: string
    unlockedAt: Date
    _count: UserAchievementCountAggregateOutputType | null
    _min: UserAchievementMinAggregateOutputType | null
    _max: UserAchievementMaxAggregateOutputType | null
  }

  type GetUserAchievementGroupByPayload<T extends UserAchievementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserAchievementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserAchievementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserAchievementGroupByOutputType[P]>
            : GetScalarType<T[P], UserAchievementGroupByOutputType[P]>
        }
      >
    >


  export type UserAchievementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    achievementId?: boolean
    unlockedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    achievement?: boolean | AchievementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAchievement"]>

  export type UserAchievementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    achievementId?: boolean
    unlockedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    achievement?: boolean | AchievementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAchievement"]>

  export type UserAchievementSelectScalar = {
    id?: boolean
    userId?: boolean
    achievementId?: boolean
    unlockedAt?: boolean
  }

  export type UserAchievementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    achievement?: boolean | AchievementDefaultArgs<ExtArgs>
  }
  export type UserAchievementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    achievement?: boolean | AchievementDefaultArgs<ExtArgs>
  }

  export type $UserAchievementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserAchievement"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      achievement: Prisma.$AchievementPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      achievementId: string
      unlockedAt: Date
    }, ExtArgs["result"]["userAchievement"]>
    composites: {}
  }

  type UserAchievementGetPayload<S extends boolean | null | undefined | UserAchievementDefaultArgs> = $Result.GetResult<Prisma.$UserAchievementPayload, S>

  type UserAchievementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserAchievementFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserAchievementCountAggregateInputType | true
    }

  export interface UserAchievementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserAchievement'], meta: { name: 'UserAchievement' } }
    /**
     * Find zero or one UserAchievement that matches the filter.
     * @param {UserAchievementFindUniqueArgs} args - Arguments to find a UserAchievement
     * @example
     * // Get one UserAchievement
     * const userAchievement = await prisma.userAchievement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserAchievementFindUniqueArgs>(args: SelectSubset<T, UserAchievementFindUniqueArgs<ExtArgs>>): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one UserAchievement that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserAchievementFindUniqueOrThrowArgs} args - Arguments to find a UserAchievement
     * @example
     * // Get one UserAchievement
     * const userAchievement = await prisma.userAchievement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserAchievementFindUniqueOrThrowArgs>(args: SelectSubset<T, UserAchievementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first UserAchievement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementFindFirstArgs} args - Arguments to find a UserAchievement
     * @example
     * // Get one UserAchievement
     * const userAchievement = await prisma.userAchievement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserAchievementFindFirstArgs>(args?: SelectSubset<T, UserAchievementFindFirstArgs<ExtArgs>>): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first UserAchievement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementFindFirstOrThrowArgs} args - Arguments to find a UserAchievement
     * @example
     * // Get one UserAchievement
     * const userAchievement = await prisma.userAchievement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserAchievementFindFirstOrThrowArgs>(args?: SelectSubset<T, UserAchievementFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more UserAchievements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserAchievements
     * const userAchievements = await prisma.userAchievement.findMany()
     * 
     * // Get first 10 UserAchievements
     * const userAchievements = await prisma.userAchievement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userAchievementWithIdOnly = await prisma.userAchievement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserAchievementFindManyArgs>(args?: SelectSubset<T, UserAchievementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a UserAchievement.
     * @param {UserAchievementCreateArgs} args - Arguments to create a UserAchievement.
     * @example
     * // Create one UserAchievement
     * const UserAchievement = await prisma.userAchievement.create({
     *   data: {
     *     // ... data to create a UserAchievement
     *   }
     * })
     * 
     */
    create<T extends UserAchievementCreateArgs>(args: SelectSubset<T, UserAchievementCreateArgs<ExtArgs>>): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many UserAchievements.
     * @param {UserAchievementCreateManyArgs} args - Arguments to create many UserAchievements.
     * @example
     * // Create many UserAchievements
     * const userAchievement = await prisma.userAchievement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserAchievementCreateManyArgs>(args?: SelectSubset<T, UserAchievementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserAchievements and returns the data saved in the database.
     * @param {UserAchievementCreateManyAndReturnArgs} args - Arguments to create many UserAchievements.
     * @example
     * // Create many UserAchievements
     * const userAchievement = await prisma.userAchievement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserAchievements and only return the `id`
     * const userAchievementWithIdOnly = await prisma.userAchievement.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserAchievementCreateManyAndReturnArgs>(args?: SelectSubset<T, UserAchievementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a UserAchievement.
     * @param {UserAchievementDeleteArgs} args - Arguments to delete one UserAchievement.
     * @example
     * // Delete one UserAchievement
     * const UserAchievement = await prisma.userAchievement.delete({
     *   where: {
     *     // ... filter to delete one UserAchievement
     *   }
     * })
     * 
     */
    delete<T extends UserAchievementDeleteArgs>(args: SelectSubset<T, UserAchievementDeleteArgs<ExtArgs>>): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one UserAchievement.
     * @param {UserAchievementUpdateArgs} args - Arguments to update one UserAchievement.
     * @example
     * // Update one UserAchievement
     * const userAchievement = await prisma.userAchievement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserAchievementUpdateArgs>(args: SelectSubset<T, UserAchievementUpdateArgs<ExtArgs>>): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more UserAchievements.
     * @param {UserAchievementDeleteManyArgs} args - Arguments to filter UserAchievements to delete.
     * @example
     * // Delete a few UserAchievements
     * const { count } = await prisma.userAchievement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserAchievementDeleteManyArgs>(args?: SelectSubset<T, UserAchievementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserAchievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserAchievements
     * const userAchievement = await prisma.userAchievement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserAchievementUpdateManyArgs>(args: SelectSubset<T, UserAchievementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserAchievement.
     * @param {UserAchievementUpsertArgs} args - Arguments to update or create a UserAchievement.
     * @example
     * // Update or create a UserAchievement
     * const userAchievement = await prisma.userAchievement.upsert({
     *   create: {
     *     // ... data to create a UserAchievement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserAchievement we want to update
     *   }
     * })
     */
    upsert<T extends UserAchievementUpsertArgs>(args: SelectSubset<T, UserAchievementUpsertArgs<ExtArgs>>): Prisma__UserAchievementClient<$Result.GetResult<Prisma.$UserAchievementPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of UserAchievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementCountArgs} args - Arguments to filter UserAchievements to count.
     * @example
     * // Count the number of UserAchievements
     * const count = await prisma.userAchievement.count({
     *   where: {
     *     // ... the filter for the UserAchievements we want to count
     *   }
     * })
    **/
    count<T extends UserAchievementCountArgs>(
      args?: Subset<T, UserAchievementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserAchievementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserAchievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAchievementAggregateArgs>(args: Subset<T, UserAchievementAggregateArgs>): Prisma.PrismaPromise<GetUserAchievementAggregateType<T>>

    /**
     * Group by UserAchievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAchievementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserAchievementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserAchievementGroupByArgs['orderBy'] }
        : { orderBy?: UserAchievementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserAchievementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserAchievementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserAchievement model
   */
  readonly fields: UserAchievementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserAchievement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserAchievementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    achievement<T extends AchievementDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AchievementDefaultArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserAchievement model
   */ 
  interface UserAchievementFieldRefs {
    readonly id: FieldRef<"UserAchievement", 'String'>
    readonly userId: FieldRef<"UserAchievement", 'String'>
    readonly achievementId: FieldRef<"UserAchievement", 'String'>
    readonly unlockedAt: FieldRef<"UserAchievement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserAchievement findUnique
   */
  export type UserAchievementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * Filter, which UserAchievement to fetch.
     */
    where: UserAchievementWhereUniqueInput
  }

  /**
   * UserAchievement findUniqueOrThrow
   */
  export type UserAchievementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * Filter, which UserAchievement to fetch.
     */
    where: UserAchievementWhereUniqueInput
  }

  /**
   * UserAchievement findFirst
   */
  export type UserAchievementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * Filter, which UserAchievement to fetch.
     */
    where?: UserAchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAchievements to fetch.
     */
    orderBy?: UserAchievementOrderByWithRelationInput | UserAchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAchievements.
     */
    cursor?: UserAchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAchievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAchievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAchievements.
     */
    distinct?: UserAchievementScalarFieldEnum | UserAchievementScalarFieldEnum[]
  }

  /**
   * UserAchievement findFirstOrThrow
   */
  export type UserAchievementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * Filter, which UserAchievement to fetch.
     */
    where?: UserAchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAchievements to fetch.
     */
    orderBy?: UserAchievementOrderByWithRelationInput | UserAchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAchievements.
     */
    cursor?: UserAchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAchievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAchievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAchievements.
     */
    distinct?: UserAchievementScalarFieldEnum | UserAchievementScalarFieldEnum[]
  }

  /**
   * UserAchievement findMany
   */
  export type UserAchievementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * Filter, which UserAchievements to fetch.
     */
    where?: UserAchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAchievements to fetch.
     */
    orderBy?: UserAchievementOrderByWithRelationInput | UserAchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserAchievements.
     */
    cursor?: UserAchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAchievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAchievements.
     */
    skip?: number
    distinct?: UserAchievementScalarFieldEnum | UserAchievementScalarFieldEnum[]
  }

  /**
   * UserAchievement create
   */
  export type UserAchievementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * The data needed to create a UserAchievement.
     */
    data: XOR<UserAchievementCreateInput, UserAchievementUncheckedCreateInput>
  }

  /**
   * UserAchievement createMany
   */
  export type UserAchievementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserAchievements.
     */
    data: UserAchievementCreateManyInput | UserAchievementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserAchievement createManyAndReturn
   */
  export type UserAchievementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many UserAchievements.
     */
    data: UserAchievementCreateManyInput | UserAchievementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserAchievement update
   */
  export type UserAchievementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * The data needed to update a UserAchievement.
     */
    data: XOR<UserAchievementUpdateInput, UserAchievementUncheckedUpdateInput>
    /**
     * Choose, which UserAchievement to update.
     */
    where: UserAchievementWhereUniqueInput
  }

  /**
   * UserAchievement updateMany
   */
  export type UserAchievementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserAchievements.
     */
    data: XOR<UserAchievementUpdateManyMutationInput, UserAchievementUncheckedUpdateManyInput>
    /**
     * Filter which UserAchievements to update
     */
    where?: UserAchievementWhereInput
  }

  /**
   * UserAchievement upsert
   */
  export type UserAchievementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * The filter to search for the UserAchievement to update in case it exists.
     */
    where: UserAchievementWhereUniqueInput
    /**
     * In case the UserAchievement found by the `where` argument doesn't exist, create a new UserAchievement with this data.
     */
    create: XOR<UserAchievementCreateInput, UserAchievementUncheckedCreateInput>
    /**
     * In case the UserAchievement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserAchievementUpdateInput, UserAchievementUncheckedUpdateInput>
  }

  /**
   * UserAchievement delete
   */
  export type UserAchievementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
    /**
     * Filter which UserAchievement to delete.
     */
    where: UserAchievementWhereUniqueInput
  }

  /**
   * UserAchievement deleteMany
   */
  export type UserAchievementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAchievements to delete
     */
    where?: UserAchievementWhereInput
  }

  /**
   * UserAchievement without action
   */
  export type UserAchievementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAchievement
     */
    select?: UserAchievementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAchievementInclude<ExtArgs> | null
  }


  /**
   * Model LeaderboardSnapshot
   */

  export type AggregateLeaderboardSnapshot = {
    _count: LeaderboardSnapshotCountAggregateOutputType | null
    _avg: LeaderboardSnapshotAvgAggregateOutputType | null
    _sum: LeaderboardSnapshotSumAggregateOutputType | null
    _min: LeaderboardSnapshotMinAggregateOutputType | null
    _max: LeaderboardSnapshotMaxAggregateOutputType | null
  }

  export type LeaderboardSnapshotAvgAggregateOutputType = {
    value: number | null
    rank: number | null
  }

  export type LeaderboardSnapshotSumAggregateOutputType = {
    value: number | null
    rank: number | null
  }

  export type LeaderboardSnapshotMinAggregateOutputType = {
    id: string | null
    userId: string | null
    username: string | null
    category: $Enums.LeaderboardCategory | null
    period: $Enums.LeaderboardPeriod | null
    value: number | null
    weekStart: Date | null
    monthStart: Date | null
    yearStart: Date | null
    rank: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LeaderboardSnapshotMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    username: string | null
    category: $Enums.LeaderboardCategory | null
    period: $Enums.LeaderboardPeriod | null
    value: number | null
    weekStart: Date | null
    monthStart: Date | null
    yearStart: Date | null
    rank: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LeaderboardSnapshotCountAggregateOutputType = {
    id: number
    userId: number
    username: number
    category: number
    period: number
    value: number
    weekStart: number
    monthStart: number
    yearStart: number
    rank: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LeaderboardSnapshotAvgAggregateInputType = {
    value?: true
    rank?: true
  }

  export type LeaderboardSnapshotSumAggregateInputType = {
    value?: true
    rank?: true
  }

  export type LeaderboardSnapshotMinAggregateInputType = {
    id?: true
    userId?: true
    username?: true
    category?: true
    period?: true
    value?: true
    weekStart?: true
    monthStart?: true
    yearStart?: true
    rank?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LeaderboardSnapshotMaxAggregateInputType = {
    id?: true
    userId?: true
    username?: true
    category?: true
    period?: true
    value?: true
    weekStart?: true
    monthStart?: true
    yearStart?: true
    rank?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LeaderboardSnapshotCountAggregateInputType = {
    id?: true
    userId?: true
    username?: true
    category?: true
    period?: true
    value?: true
    weekStart?: true
    monthStart?: true
    yearStart?: true
    rank?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LeaderboardSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeaderboardSnapshot to aggregate.
     */
    where?: LeaderboardSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaderboardSnapshots to fetch.
     */
    orderBy?: LeaderboardSnapshotOrderByWithRelationInput | LeaderboardSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeaderboardSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaderboardSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaderboardSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LeaderboardSnapshots
    **/
    _count?: true | LeaderboardSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LeaderboardSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LeaderboardSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeaderboardSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeaderboardSnapshotMaxAggregateInputType
  }

  export type GetLeaderboardSnapshotAggregateType<T extends LeaderboardSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateLeaderboardSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeaderboardSnapshot[P]>
      : GetScalarType<T[P], AggregateLeaderboardSnapshot[P]>
  }




  export type LeaderboardSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaderboardSnapshotWhereInput
    orderBy?: LeaderboardSnapshotOrderByWithAggregationInput | LeaderboardSnapshotOrderByWithAggregationInput[]
    by: LeaderboardSnapshotScalarFieldEnum[] | LeaderboardSnapshotScalarFieldEnum
    having?: LeaderboardSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeaderboardSnapshotCountAggregateInputType | true
    _avg?: LeaderboardSnapshotAvgAggregateInputType
    _sum?: LeaderboardSnapshotSumAggregateInputType
    _min?: LeaderboardSnapshotMinAggregateInputType
    _max?: LeaderboardSnapshotMaxAggregateInputType
  }

  export type LeaderboardSnapshotGroupByOutputType = {
    id: string
    userId: string
    username: string
    category: $Enums.LeaderboardCategory
    period: $Enums.LeaderboardPeriod
    value: number
    weekStart: Date | null
    monthStart: Date | null
    yearStart: Date | null
    rank: number | null
    createdAt: Date
    updatedAt: Date
    _count: LeaderboardSnapshotCountAggregateOutputType | null
    _avg: LeaderboardSnapshotAvgAggregateOutputType | null
    _sum: LeaderboardSnapshotSumAggregateOutputType | null
    _min: LeaderboardSnapshotMinAggregateOutputType | null
    _max: LeaderboardSnapshotMaxAggregateOutputType | null
  }

  type GetLeaderboardSnapshotGroupByPayload<T extends LeaderboardSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeaderboardSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeaderboardSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeaderboardSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], LeaderboardSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type LeaderboardSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    username?: boolean
    category?: boolean
    period?: boolean
    value?: boolean
    weekStart?: boolean
    monthStart?: boolean
    yearStart?: boolean
    rank?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leaderboardSnapshot"]>

  export type LeaderboardSnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    username?: boolean
    category?: boolean
    period?: boolean
    value?: boolean
    weekStart?: boolean
    monthStart?: boolean
    yearStart?: boolean
    rank?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leaderboardSnapshot"]>

  export type LeaderboardSnapshotSelectScalar = {
    id?: boolean
    userId?: boolean
    username?: boolean
    category?: boolean
    period?: boolean
    value?: boolean
    weekStart?: boolean
    monthStart?: boolean
    yearStart?: boolean
    rank?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LeaderboardSnapshotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LeaderboardSnapshotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $LeaderboardSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LeaderboardSnapshot"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      username: string
      category: $Enums.LeaderboardCategory
      period: $Enums.LeaderboardPeriod
      value: number
      weekStart: Date | null
      monthStart: Date | null
      yearStart: Date | null
      rank: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["leaderboardSnapshot"]>
    composites: {}
  }

  type LeaderboardSnapshotGetPayload<S extends boolean | null | undefined | LeaderboardSnapshotDefaultArgs> = $Result.GetResult<Prisma.$LeaderboardSnapshotPayload, S>

  type LeaderboardSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LeaderboardSnapshotFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LeaderboardSnapshotCountAggregateInputType | true
    }

  export interface LeaderboardSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LeaderboardSnapshot'], meta: { name: 'LeaderboardSnapshot' } }
    /**
     * Find zero or one LeaderboardSnapshot that matches the filter.
     * @param {LeaderboardSnapshotFindUniqueArgs} args - Arguments to find a LeaderboardSnapshot
     * @example
     * // Get one LeaderboardSnapshot
     * const leaderboardSnapshot = await prisma.leaderboardSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeaderboardSnapshotFindUniqueArgs>(args: SelectSubset<T, LeaderboardSnapshotFindUniqueArgs<ExtArgs>>): Prisma__LeaderboardSnapshotClient<$Result.GetResult<Prisma.$LeaderboardSnapshotPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one LeaderboardSnapshot that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LeaderboardSnapshotFindUniqueOrThrowArgs} args - Arguments to find a LeaderboardSnapshot
     * @example
     * // Get one LeaderboardSnapshot
     * const leaderboardSnapshot = await prisma.leaderboardSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeaderboardSnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, LeaderboardSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeaderboardSnapshotClient<$Result.GetResult<Prisma.$LeaderboardSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first LeaderboardSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardSnapshotFindFirstArgs} args - Arguments to find a LeaderboardSnapshot
     * @example
     * // Get one LeaderboardSnapshot
     * const leaderboardSnapshot = await prisma.leaderboardSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeaderboardSnapshotFindFirstArgs>(args?: SelectSubset<T, LeaderboardSnapshotFindFirstArgs<ExtArgs>>): Prisma__LeaderboardSnapshotClient<$Result.GetResult<Prisma.$LeaderboardSnapshotPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first LeaderboardSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardSnapshotFindFirstOrThrowArgs} args - Arguments to find a LeaderboardSnapshot
     * @example
     * // Get one LeaderboardSnapshot
     * const leaderboardSnapshot = await prisma.leaderboardSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeaderboardSnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, LeaderboardSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeaderboardSnapshotClient<$Result.GetResult<Prisma.$LeaderboardSnapshotPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more LeaderboardSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardSnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LeaderboardSnapshots
     * const leaderboardSnapshots = await prisma.leaderboardSnapshot.findMany()
     * 
     * // Get first 10 LeaderboardSnapshots
     * const leaderboardSnapshots = await prisma.leaderboardSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leaderboardSnapshotWithIdOnly = await prisma.leaderboardSnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeaderboardSnapshotFindManyArgs>(args?: SelectSubset<T, LeaderboardSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaderboardSnapshotPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a LeaderboardSnapshot.
     * @param {LeaderboardSnapshotCreateArgs} args - Arguments to create a LeaderboardSnapshot.
     * @example
     * // Create one LeaderboardSnapshot
     * const LeaderboardSnapshot = await prisma.leaderboardSnapshot.create({
     *   data: {
     *     // ... data to create a LeaderboardSnapshot
     *   }
     * })
     * 
     */
    create<T extends LeaderboardSnapshotCreateArgs>(args: SelectSubset<T, LeaderboardSnapshotCreateArgs<ExtArgs>>): Prisma__LeaderboardSnapshotClient<$Result.GetResult<Prisma.$LeaderboardSnapshotPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many LeaderboardSnapshots.
     * @param {LeaderboardSnapshotCreateManyArgs} args - Arguments to create many LeaderboardSnapshots.
     * @example
     * // Create many LeaderboardSnapshots
     * const leaderboardSnapshot = await prisma.leaderboardSnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeaderboardSnapshotCreateManyArgs>(args?: SelectSubset<T, LeaderboardSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LeaderboardSnapshots and returns the data saved in the database.
     * @param {LeaderboardSnapshotCreateManyAndReturnArgs} args - Arguments to create many LeaderboardSnapshots.
     * @example
     * // Create many LeaderboardSnapshots
     * const leaderboardSnapshot = await prisma.leaderboardSnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LeaderboardSnapshots and only return the `id`
     * const leaderboardSnapshotWithIdOnly = await prisma.leaderboardSnapshot.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeaderboardSnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, LeaderboardSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaderboardSnapshotPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a LeaderboardSnapshot.
     * @param {LeaderboardSnapshotDeleteArgs} args - Arguments to delete one LeaderboardSnapshot.
     * @example
     * // Delete one LeaderboardSnapshot
     * const LeaderboardSnapshot = await prisma.leaderboardSnapshot.delete({
     *   where: {
     *     // ... filter to delete one LeaderboardSnapshot
     *   }
     * })
     * 
     */
    delete<T extends LeaderboardSnapshotDeleteArgs>(args: SelectSubset<T, LeaderboardSnapshotDeleteArgs<ExtArgs>>): Prisma__LeaderboardSnapshotClient<$Result.GetResult<Prisma.$LeaderboardSnapshotPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one LeaderboardSnapshot.
     * @param {LeaderboardSnapshotUpdateArgs} args - Arguments to update one LeaderboardSnapshot.
     * @example
     * // Update one LeaderboardSnapshot
     * const leaderboardSnapshot = await prisma.leaderboardSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeaderboardSnapshotUpdateArgs>(args: SelectSubset<T, LeaderboardSnapshotUpdateArgs<ExtArgs>>): Prisma__LeaderboardSnapshotClient<$Result.GetResult<Prisma.$LeaderboardSnapshotPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more LeaderboardSnapshots.
     * @param {LeaderboardSnapshotDeleteManyArgs} args - Arguments to filter LeaderboardSnapshots to delete.
     * @example
     * // Delete a few LeaderboardSnapshots
     * const { count } = await prisma.leaderboardSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeaderboardSnapshotDeleteManyArgs>(args?: SelectSubset<T, LeaderboardSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeaderboardSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LeaderboardSnapshots
     * const leaderboardSnapshot = await prisma.leaderboardSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeaderboardSnapshotUpdateManyArgs>(args: SelectSubset<T, LeaderboardSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LeaderboardSnapshot.
     * @param {LeaderboardSnapshotUpsertArgs} args - Arguments to update or create a LeaderboardSnapshot.
     * @example
     * // Update or create a LeaderboardSnapshot
     * const leaderboardSnapshot = await prisma.leaderboardSnapshot.upsert({
     *   create: {
     *     // ... data to create a LeaderboardSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LeaderboardSnapshot we want to update
     *   }
     * })
     */
    upsert<T extends LeaderboardSnapshotUpsertArgs>(args: SelectSubset<T, LeaderboardSnapshotUpsertArgs<ExtArgs>>): Prisma__LeaderboardSnapshotClient<$Result.GetResult<Prisma.$LeaderboardSnapshotPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of LeaderboardSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardSnapshotCountArgs} args - Arguments to filter LeaderboardSnapshots to count.
     * @example
     * // Count the number of LeaderboardSnapshots
     * const count = await prisma.leaderboardSnapshot.count({
     *   where: {
     *     // ... the filter for the LeaderboardSnapshots we want to count
     *   }
     * })
    **/
    count<T extends LeaderboardSnapshotCountArgs>(
      args?: Subset<T, LeaderboardSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeaderboardSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LeaderboardSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeaderboardSnapshotAggregateArgs>(args: Subset<T, LeaderboardSnapshotAggregateArgs>): Prisma.PrismaPromise<GetLeaderboardSnapshotAggregateType<T>>

    /**
     * Group by LeaderboardSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeaderboardSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeaderboardSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: LeaderboardSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeaderboardSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeaderboardSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LeaderboardSnapshot model
   */
  readonly fields: LeaderboardSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LeaderboardSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeaderboardSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LeaderboardSnapshot model
   */ 
  interface LeaderboardSnapshotFieldRefs {
    readonly id: FieldRef<"LeaderboardSnapshot", 'String'>
    readonly userId: FieldRef<"LeaderboardSnapshot", 'String'>
    readonly username: FieldRef<"LeaderboardSnapshot", 'String'>
    readonly category: FieldRef<"LeaderboardSnapshot", 'LeaderboardCategory'>
    readonly period: FieldRef<"LeaderboardSnapshot", 'LeaderboardPeriod'>
    readonly value: FieldRef<"LeaderboardSnapshot", 'Int'>
    readonly weekStart: FieldRef<"LeaderboardSnapshot", 'DateTime'>
    readonly monthStart: FieldRef<"LeaderboardSnapshot", 'DateTime'>
    readonly yearStart: FieldRef<"LeaderboardSnapshot", 'DateTime'>
    readonly rank: FieldRef<"LeaderboardSnapshot", 'Int'>
    readonly createdAt: FieldRef<"LeaderboardSnapshot", 'DateTime'>
    readonly updatedAt: FieldRef<"LeaderboardSnapshot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LeaderboardSnapshot findUnique
   */
  export type LeaderboardSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardSnapshot
     */
    select?: LeaderboardSnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaderboardSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which LeaderboardSnapshot to fetch.
     */
    where: LeaderboardSnapshotWhereUniqueInput
  }

  /**
   * LeaderboardSnapshot findUniqueOrThrow
   */
  export type LeaderboardSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardSnapshot
     */
    select?: LeaderboardSnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaderboardSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which LeaderboardSnapshot to fetch.
     */
    where: LeaderboardSnapshotWhereUniqueInput
  }

  /**
   * LeaderboardSnapshot findFirst
   */
  export type LeaderboardSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardSnapshot
     */
    select?: LeaderboardSnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaderboardSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which LeaderboardSnapshot to fetch.
     */
    where?: LeaderboardSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaderboardSnapshots to fetch.
     */
    orderBy?: LeaderboardSnapshotOrderByWithRelationInput | LeaderboardSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeaderboardSnapshots.
     */
    cursor?: LeaderboardSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaderboardSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaderboardSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeaderboardSnapshots.
     */
    distinct?: LeaderboardSnapshotScalarFieldEnum | LeaderboardSnapshotScalarFieldEnum[]
  }

  /**
   * LeaderboardSnapshot findFirstOrThrow
   */
  export type LeaderboardSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardSnapshot
     */
    select?: LeaderboardSnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaderboardSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which LeaderboardSnapshot to fetch.
     */
    where?: LeaderboardSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaderboardSnapshots to fetch.
     */
    orderBy?: LeaderboardSnapshotOrderByWithRelationInput | LeaderboardSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeaderboardSnapshots.
     */
    cursor?: LeaderboardSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaderboardSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaderboardSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeaderboardSnapshots.
     */
    distinct?: LeaderboardSnapshotScalarFieldEnum | LeaderboardSnapshotScalarFieldEnum[]
  }

  /**
   * LeaderboardSnapshot findMany
   */
  export type LeaderboardSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardSnapshot
     */
    select?: LeaderboardSnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaderboardSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which LeaderboardSnapshots to fetch.
     */
    where?: LeaderboardSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaderboardSnapshots to fetch.
     */
    orderBy?: LeaderboardSnapshotOrderByWithRelationInput | LeaderboardSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LeaderboardSnapshots.
     */
    cursor?: LeaderboardSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaderboardSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaderboardSnapshots.
     */
    skip?: number
    distinct?: LeaderboardSnapshotScalarFieldEnum | LeaderboardSnapshotScalarFieldEnum[]
  }

  /**
   * LeaderboardSnapshot create
   */
  export type LeaderboardSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardSnapshot
     */
    select?: LeaderboardSnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaderboardSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to create a LeaderboardSnapshot.
     */
    data: XOR<LeaderboardSnapshotCreateInput, LeaderboardSnapshotUncheckedCreateInput>
  }

  /**
   * LeaderboardSnapshot createMany
   */
  export type LeaderboardSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LeaderboardSnapshots.
     */
    data: LeaderboardSnapshotCreateManyInput | LeaderboardSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LeaderboardSnapshot createManyAndReturn
   */
  export type LeaderboardSnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardSnapshot
     */
    select?: LeaderboardSnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many LeaderboardSnapshots.
     */
    data: LeaderboardSnapshotCreateManyInput | LeaderboardSnapshotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaderboardSnapshotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeaderboardSnapshot update
   */
  export type LeaderboardSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardSnapshot
     */
    select?: LeaderboardSnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaderboardSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to update a LeaderboardSnapshot.
     */
    data: XOR<LeaderboardSnapshotUpdateInput, LeaderboardSnapshotUncheckedUpdateInput>
    /**
     * Choose, which LeaderboardSnapshot to update.
     */
    where: LeaderboardSnapshotWhereUniqueInput
  }

  /**
   * LeaderboardSnapshot updateMany
   */
  export type LeaderboardSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LeaderboardSnapshots.
     */
    data: XOR<LeaderboardSnapshotUpdateManyMutationInput, LeaderboardSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which LeaderboardSnapshots to update
     */
    where?: LeaderboardSnapshotWhereInput
  }

  /**
   * LeaderboardSnapshot upsert
   */
  export type LeaderboardSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardSnapshot
     */
    select?: LeaderboardSnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaderboardSnapshotInclude<ExtArgs> | null
    /**
     * The filter to search for the LeaderboardSnapshot to update in case it exists.
     */
    where: LeaderboardSnapshotWhereUniqueInput
    /**
     * In case the LeaderboardSnapshot found by the `where` argument doesn't exist, create a new LeaderboardSnapshot with this data.
     */
    create: XOR<LeaderboardSnapshotCreateInput, LeaderboardSnapshotUncheckedCreateInput>
    /**
     * In case the LeaderboardSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeaderboardSnapshotUpdateInput, LeaderboardSnapshotUncheckedUpdateInput>
  }

  /**
   * LeaderboardSnapshot delete
   */
  export type LeaderboardSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardSnapshot
     */
    select?: LeaderboardSnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaderboardSnapshotInclude<ExtArgs> | null
    /**
     * Filter which LeaderboardSnapshot to delete.
     */
    where: LeaderboardSnapshotWhereUniqueInput
  }

  /**
   * LeaderboardSnapshot deleteMany
   */
  export type LeaderboardSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeaderboardSnapshots to delete
     */
    where?: LeaderboardSnapshotWhereInput
  }

  /**
   * LeaderboardSnapshot without action
   */
  export type LeaderboardSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardSnapshot
     */
    select?: LeaderboardSnapshotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaderboardSnapshotInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    passwordHash: 'passwordHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const FriendshipScalarFieldEnum: {
    id: 'id',
    requesterId: 'requesterId',
    addresseeId: 'addresseeId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FriendshipScalarFieldEnum = (typeof FriendshipScalarFieldEnum)[keyof typeof FriendshipScalarFieldEnum]


  export const RoomInviteScalarFieldEnum: {
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

  export type RoomInviteScalarFieldEnum = (typeof RoomInviteScalarFieldEnum)[keyof typeof RoomInviteScalarFieldEnum]


  export const GameScalarFieldEnum: {
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

  export type GameScalarFieldEnum = (typeof GameScalarFieldEnum)[keyof typeof GameScalarFieldEnum]


  export const PlayerScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    gameId: 'gameId',
    name: 'name',
    seatIdx: 'seatIdx',
    role: 'role'
  };

  export type PlayerScalarFieldEnum = (typeof PlayerScalarFieldEnum)[keyof typeof PlayerScalarFieldEnum]


  export const GameEventScalarFieldEnum: {
    id: 'id',
    gameId: 'gameId',
    seq: 'seq',
    type: 'type',
    actor: 'actor',
    payload: 'payload',
    createdAt: 'createdAt'
  };

  export type GameEventScalarFieldEnum = (typeof GameEventScalarFieldEnum)[keyof typeof GameEventScalarFieldEnum]


  export const GameSnapshotScalarFieldEnum: {
    id: 'id',
    gameId: 'gameId',
    seq: 'seq',
    snapshot: 'snapshot',
    createdAt: 'createdAt'
  };

  export type GameSnapshotScalarFieldEnum = (typeof GameSnapshotScalarFieldEnum)[keyof typeof GameSnapshotScalarFieldEnum]


  export const RoundScoreScalarFieldEnum: {
    id: 'id',
    gameId: 'gameId',
    team: 'team',
    points: 'points',
    createdAt: 'createdAt'
  };

  export type RoundScoreScalarFieldEnum = (typeof RoundScoreScalarFieldEnum)[keyof typeof RoundScoreScalarFieldEnum]


  export const MatchHistoryScalarFieldEnum: {
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

  export type MatchHistoryScalarFieldEnum = (typeof MatchHistoryScalarFieldEnum)[keyof typeof MatchHistoryScalarFieldEnum]


  export const UserStatsScalarFieldEnum: {
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

  export type UserStatsScalarFieldEnum = (typeof UserStatsScalarFieldEnum)[keyof typeof UserStatsScalarFieldEnum]


  export const AchievementScalarFieldEnum: {
    id: 'id',
    type: 'type',
    tier: 'tier',
    threshold: 'threshold',
    name: 'name',
    description: 'description'
  };

  export type AchievementScalarFieldEnum = (typeof AchievementScalarFieldEnum)[keyof typeof AchievementScalarFieldEnum]


  export const UserAchievementScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    achievementId: 'achievementId',
    unlockedAt: 'unlockedAt'
  };

  export type UserAchievementScalarFieldEnum = (typeof UserAchievementScalarFieldEnum)[keyof typeof UserAchievementScalarFieldEnum]


  export const LeaderboardSnapshotScalarFieldEnum: {
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

  export type LeaderboardSnapshotScalarFieldEnum = (typeof LeaderboardSnapshotScalarFieldEnum)[keyof typeof LeaderboardSnapshotScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'FriendshipStatus'
   */
  export type EnumFriendshipStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FriendshipStatus'>
    


  /**
   * Reference to a field of type 'FriendshipStatus[]'
   */
  export type ListEnumFriendshipStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FriendshipStatus[]'>
    


  /**
   * Reference to a field of type 'RoomInviteStatus'
   */
  export type EnumRoomInviteStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoomInviteStatus'>
    


  /**
   * Reference to a field of type 'RoomInviteStatus[]'
   */
  export type ListEnumRoomInviteStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoomInviteStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'AchievementType'
   */
  export type EnumAchievementTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AchievementType'>
    


  /**
   * Reference to a field of type 'AchievementType[]'
   */
  export type ListEnumAchievementTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AchievementType[]'>
    


  /**
   * Reference to a field of type 'LeaderboardCategory'
   */
  export type EnumLeaderboardCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeaderboardCategory'>
    


  /**
   * Reference to a field of type 'LeaderboardCategory[]'
   */
  export type ListEnumLeaderboardCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeaderboardCategory[]'>
    


  /**
   * Reference to a field of type 'LeaderboardPeriod'
   */
  export type EnumLeaderboardPeriodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeaderboardPeriod'>
    


  /**
   * Reference to a field of type 'LeaderboardPeriod[]'
   */
  export type ListEnumLeaderboardPeriodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeaderboardPeriod[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    friendRequestsSent?: FriendshipListRelationFilter
    friendRequestsReceived?: FriendshipListRelationFilter
    invitesSent?: RoomInviteListRelationFilter
    invitesReceived?: RoomInviteListRelationFilter
    stats?: XOR<UserStatsNullableRelationFilter, UserStatsWhereInput> | null
    achievements?: UserAchievementListRelationFilter
    leaderboardEntries?: LeaderboardSnapshotListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    friendRequestsSent?: FriendshipOrderByRelationAggregateInput
    friendRequestsReceived?: FriendshipOrderByRelationAggregateInput
    invitesSent?: RoomInviteOrderByRelationAggregateInput
    invitesReceived?: RoomInviteOrderByRelationAggregateInput
    stats?: UserStatsOrderByWithRelationInput
    achievements?: UserAchievementOrderByRelationAggregateInput
    leaderboardEntries?: LeaderboardSnapshotOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    friendRequestsSent?: FriendshipListRelationFilter
    friendRequestsReceived?: FriendshipListRelationFilter
    invitesSent?: RoomInviteListRelationFilter
    invitesReceived?: RoomInviteListRelationFilter
    stats?: XOR<UserStatsNullableRelationFilter, UserStatsWhereInput> | null
    achievements?: UserAchievementListRelationFilter
    leaderboardEntries?: LeaderboardSnapshotListRelationFilter
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type FriendshipWhereInput = {
    AND?: FriendshipWhereInput | FriendshipWhereInput[]
    OR?: FriendshipWhereInput[]
    NOT?: FriendshipWhereInput | FriendshipWhereInput[]
    id?: StringFilter<"Friendship"> | string
    requesterId?: StringFilter<"Friendship"> | string
    addresseeId?: StringFilter<"Friendship"> | string
    status?: EnumFriendshipStatusFilter<"Friendship"> | $Enums.FriendshipStatus
    createdAt?: DateTimeFilter<"Friendship"> | Date | string
    updatedAt?: DateTimeFilter<"Friendship"> | Date | string
    requester?: XOR<UserRelationFilter, UserWhereInput>
    addressee?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type FriendshipOrderByWithRelationInput = {
    id?: SortOrder
    requesterId?: SortOrder
    addresseeId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    requester?: UserOrderByWithRelationInput
    addressee?: UserOrderByWithRelationInput
  }

  export type FriendshipWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    requesterId_addresseeId?: FriendshipRequesterIdAddresseeIdCompoundUniqueInput
    AND?: FriendshipWhereInput | FriendshipWhereInput[]
    OR?: FriendshipWhereInput[]
    NOT?: FriendshipWhereInput | FriendshipWhereInput[]
    requesterId?: StringFilter<"Friendship"> | string
    addresseeId?: StringFilter<"Friendship"> | string
    status?: EnumFriendshipStatusFilter<"Friendship"> | $Enums.FriendshipStatus
    createdAt?: DateTimeFilter<"Friendship"> | Date | string
    updatedAt?: DateTimeFilter<"Friendship"> | Date | string
    requester?: XOR<UserRelationFilter, UserWhereInput>
    addressee?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "requesterId_addresseeId">

  export type FriendshipOrderByWithAggregationInput = {
    id?: SortOrder
    requesterId?: SortOrder
    addresseeId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FriendshipCountOrderByAggregateInput
    _max?: FriendshipMaxOrderByAggregateInput
    _min?: FriendshipMinOrderByAggregateInput
  }

  export type FriendshipScalarWhereWithAggregatesInput = {
    AND?: FriendshipScalarWhereWithAggregatesInput | FriendshipScalarWhereWithAggregatesInput[]
    OR?: FriendshipScalarWhereWithAggregatesInput[]
    NOT?: FriendshipScalarWhereWithAggregatesInput | FriendshipScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Friendship"> | string
    requesterId?: StringWithAggregatesFilter<"Friendship"> | string
    addresseeId?: StringWithAggregatesFilter<"Friendship"> | string
    status?: EnumFriendshipStatusWithAggregatesFilter<"Friendship"> | $Enums.FriendshipStatus
    createdAt?: DateTimeWithAggregatesFilter<"Friendship"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Friendship"> | Date | string
  }

  export type RoomInviteWhereInput = {
    AND?: RoomInviteWhereInput | RoomInviteWhereInput[]
    OR?: RoomInviteWhereInput[]
    NOT?: RoomInviteWhereInput | RoomInviteWhereInput[]
    id?: StringFilter<"RoomInvite"> | string
    roomId?: StringFilter<"RoomInvite"> | string
    inviterId?: StringFilter<"RoomInvite"> | string
    inviteeId?: StringFilter<"RoomInvite"> | string
    status?: EnumRoomInviteStatusFilter<"RoomInvite"> | $Enums.RoomInviteStatus
    createdAt?: DateTimeFilter<"RoomInvite"> | Date | string
    updatedAt?: DateTimeFilter<"RoomInvite"> | Date | string
    expiresAt?: DateTimeFilter<"RoomInvite"> | Date | string
    metadata?: JsonNullableFilter<"RoomInvite">
    inviter?: XOR<UserRelationFilter, UserWhereInput>
    invitee?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type RoomInviteOrderByWithRelationInput = {
    id?: SortOrder
    roomId?: SortOrder
    inviterId?: SortOrder
    inviteeId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiresAt?: SortOrder
    metadata?: SortOrderInput | SortOrder
    inviter?: UserOrderByWithRelationInput
    invitee?: UserOrderByWithRelationInput
  }

  export type RoomInviteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RoomInviteWhereInput | RoomInviteWhereInput[]
    OR?: RoomInviteWhereInput[]
    NOT?: RoomInviteWhereInput | RoomInviteWhereInput[]
    roomId?: StringFilter<"RoomInvite"> | string
    inviterId?: StringFilter<"RoomInvite"> | string
    inviteeId?: StringFilter<"RoomInvite"> | string
    status?: EnumRoomInviteStatusFilter<"RoomInvite"> | $Enums.RoomInviteStatus
    createdAt?: DateTimeFilter<"RoomInvite"> | Date | string
    updatedAt?: DateTimeFilter<"RoomInvite"> | Date | string
    expiresAt?: DateTimeFilter<"RoomInvite"> | Date | string
    metadata?: JsonNullableFilter<"RoomInvite">
    inviter?: XOR<UserRelationFilter, UserWhereInput>
    invitee?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type RoomInviteOrderByWithAggregationInput = {
    id?: SortOrder
    roomId?: SortOrder
    inviterId?: SortOrder
    inviteeId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiresAt?: SortOrder
    metadata?: SortOrderInput | SortOrder
    _count?: RoomInviteCountOrderByAggregateInput
    _max?: RoomInviteMaxOrderByAggregateInput
    _min?: RoomInviteMinOrderByAggregateInput
  }

  export type RoomInviteScalarWhereWithAggregatesInput = {
    AND?: RoomInviteScalarWhereWithAggregatesInput | RoomInviteScalarWhereWithAggregatesInput[]
    OR?: RoomInviteScalarWhereWithAggregatesInput[]
    NOT?: RoomInviteScalarWhereWithAggregatesInput | RoomInviteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RoomInvite"> | string
    roomId?: StringWithAggregatesFilter<"RoomInvite"> | string
    inviterId?: StringWithAggregatesFilter<"RoomInvite"> | string
    inviteeId?: StringWithAggregatesFilter<"RoomInvite"> | string
    status?: EnumRoomInviteStatusWithAggregatesFilter<"RoomInvite"> | $Enums.RoomInviteStatus
    createdAt?: DateTimeWithAggregatesFilter<"RoomInvite"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RoomInvite"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"RoomInvite"> | Date | string
    metadata?: JsonNullableWithAggregatesFilter<"RoomInvite">
  }

  export type GameWhereInput = {
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    id?: StringFilter<"Game"> | string
    status?: StringFilter<"Game"> | string
    deckSeed?: StringFilter<"Game"> | string
    dealerId?: StringNullableFilter<"Game"> | string | null
    surrenderVotes?: StringNullableListFilter<"Game">
    rematchVotes?: StringNullableListFilter<"Game">
    originalRoomIds?: JsonNullableFilter<"Game">
    createdAt?: DateTimeFilter<"Game"> | Date | string
    updatedAt?: DateTimeFilter<"Game"> | Date | string
    events?: GameEventListRelationFilter
  }

  export type GameOrderByWithRelationInput = {
    id?: SortOrder
    status?: SortOrder
    deckSeed?: SortOrder
    dealerId?: SortOrderInput | SortOrder
    surrenderVotes?: SortOrder
    rematchVotes?: SortOrder
    originalRoomIds?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    events?: GameEventOrderByRelationAggregateInput
  }

  export type GameWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    status?: StringFilter<"Game"> | string
    deckSeed?: StringFilter<"Game"> | string
    dealerId?: StringNullableFilter<"Game"> | string | null
    surrenderVotes?: StringNullableListFilter<"Game">
    rematchVotes?: StringNullableListFilter<"Game">
    originalRoomIds?: JsonNullableFilter<"Game">
    createdAt?: DateTimeFilter<"Game"> | Date | string
    updatedAt?: DateTimeFilter<"Game"> | Date | string
    events?: GameEventListRelationFilter
  }, "id">

  export type GameOrderByWithAggregationInput = {
    id?: SortOrder
    status?: SortOrder
    deckSeed?: SortOrder
    dealerId?: SortOrderInput | SortOrder
    surrenderVotes?: SortOrder
    rematchVotes?: SortOrder
    originalRoomIds?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GameCountOrderByAggregateInput
    _max?: GameMaxOrderByAggregateInput
    _min?: GameMinOrderByAggregateInput
  }

  export type GameScalarWhereWithAggregatesInput = {
    AND?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    OR?: GameScalarWhereWithAggregatesInput[]
    NOT?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Game"> | string
    status?: StringWithAggregatesFilter<"Game"> | string
    deckSeed?: StringWithAggregatesFilter<"Game"> | string
    dealerId?: StringNullableWithAggregatesFilter<"Game"> | string | null
    surrenderVotes?: StringNullableListFilter<"Game">
    rematchVotes?: StringNullableListFilter<"Game">
    originalRoomIds?: JsonNullableWithAggregatesFilter<"Game">
    createdAt?: DateTimeWithAggregatesFilter<"Game"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Game"> | Date | string
  }

  export type PlayerWhereInput = {
    AND?: PlayerWhereInput | PlayerWhereInput[]
    OR?: PlayerWhereInput[]
    NOT?: PlayerWhereInput | PlayerWhereInput[]
    id?: StringFilter<"Player"> | string
    userId?: StringFilter<"Player"> | string
    gameId?: StringFilter<"Player"> | string
    name?: StringFilter<"Player"> | string
    seatIdx?: IntFilter<"Player"> | number
    role?: StringFilter<"Player"> | string
  }

  export type PlayerOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    name?: SortOrder
    seatIdx?: SortOrder
    role?: SortOrder
  }

  export type PlayerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PlayerWhereInput | PlayerWhereInput[]
    OR?: PlayerWhereInput[]
    NOT?: PlayerWhereInput | PlayerWhereInput[]
    userId?: StringFilter<"Player"> | string
    gameId?: StringFilter<"Player"> | string
    name?: StringFilter<"Player"> | string
    seatIdx?: IntFilter<"Player"> | number
    role?: StringFilter<"Player"> | string
  }, "id">

  export type PlayerOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    name?: SortOrder
    seatIdx?: SortOrder
    role?: SortOrder
    _count?: PlayerCountOrderByAggregateInput
    _avg?: PlayerAvgOrderByAggregateInput
    _max?: PlayerMaxOrderByAggregateInput
    _min?: PlayerMinOrderByAggregateInput
    _sum?: PlayerSumOrderByAggregateInput
  }

  export type PlayerScalarWhereWithAggregatesInput = {
    AND?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[]
    OR?: PlayerScalarWhereWithAggregatesInput[]
    NOT?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Player"> | string
    userId?: StringWithAggregatesFilter<"Player"> | string
    gameId?: StringWithAggregatesFilter<"Player"> | string
    name?: StringWithAggregatesFilter<"Player"> | string
    seatIdx?: IntWithAggregatesFilter<"Player"> | number
    role?: StringWithAggregatesFilter<"Player"> | string
  }

  export type GameEventWhereInput = {
    AND?: GameEventWhereInput | GameEventWhereInput[]
    OR?: GameEventWhereInput[]
    NOT?: GameEventWhereInput | GameEventWhereInput[]
    id?: StringFilter<"GameEvent"> | string
    gameId?: StringFilter<"GameEvent"> | string
    seq?: IntFilter<"GameEvent"> | number
    type?: StringFilter<"GameEvent"> | string
    actor?: StringNullableFilter<"GameEvent"> | string | null
    payload?: JsonFilter<"GameEvent">
    createdAt?: DateTimeFilter<"GameEvent"> | Date | string
    game?: XOR<GameRelationFilter, GameWhereInput>
  }

  export type GameEventOrderByWithRelationInput = {
    id?: SortOrder
    gameId?: SortOrder
    seq?: SortOrder
    type?: SortOrder
    actor?: SortOrderInput | SortOrder
    payload?: SortOrder
    createdAt?: SortOrder
    game?: GameOrderByWithRelationInput
  }

  export type GameEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GameEventWhereInput | GameEventWhereInput[]
    OR?: GameEventWhereInput[]
    NOT?: GameEventWhereInput | GameEventWhereInput[]
    gameId?: StringFilter<"GameEvent"> | string
    seq?: IntFilter<"GameEvent"> | number
    type?: StringFilter<"GameEvent"> | string
    actor?: StringNullableFilter<"GameEvent"> | string | null
    payload?: JsonFilter<"GameEvent">
    createdAt?: DateTimeFilter<"GameEvent"> | Date | string
    game?: XOR<GameRelationFilter, GameWhereInput>
  }, "id">

  export type GameEventOrderByWithAggregationInput = {
    id?: SortOrder
    gameId?: SortOrder
    seq?: SortOrder
    type?: SortOrder
    actor?: SortOrderInput | SortOrder
    payload?: SortOrder
    createdAt?: SortOrder
    _count?: GameEventCountOrderByAggregateInput
    _avg?: GameEventAvgOrderByAggregateInput
    _max?: GameEventMaxOrderByAggregateInput
    _min?: GameEventMinOrderByAggregateInput
    _sum?: GameEventSumOrderByAggregateInput
  }

  export type GameEventScalarWhereWithAggregatesInput = {
    AND?: GameEventScalarWhereWithAggregatesInput | GameEventScalarWhereWithAggregatesInput[]
    OR?: GameEventScalarWhereWithAggregatesInput[]
    NOT?: GameEventScalarWhereWithAggregatesInput | GameEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GameEvent"> | string
    gameId?: StringWithAggregatesFilter<"GameEvent"> | string
    seq?: IntWithAggregatesFilter<"GameEvent"> | number
    type?: StringWithAggregatesFilter<"GameEvent"> | string
    actor?: StringNullableWithAggregatesFilter<"GameEvent"> | string | null
    payload?: JsonWithAggregatesFilter<"GameEvent">
    createdAt?: DateTimeWithAggregatesFilter<"GameEvent"> | Date | string
  }

  export type GameSnapshotWhereInput = {
    AND?: GameSnapshotWhereInput | GameSnapshotWhereInput[]
    OR?: GameSnapshotWhereInput[]
    NOT?: GameSnapshotWhereInput | GameSnapshotWhereInput[]
    id?: StringFilter<"GameSnapshot"> | string
    gameId?: StringFilter<"GameSnapshot"> | string
    seq?: IntFilter<"GameSnapshot"> | number
    snapshot?: JsonFilter<"GameSnapshot">
    createdAt?: DateTimeFilter<"GameSnapshot"> | Date | string
  }

  export type GameSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    gameId?: SortOrder
    seq?: SortOrder
    snapshot?: SortOrder
    createdAt?: SortOrder
  }

  export type GameSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GameSnapshotWhereInput | GameSnapshotWhereInput[]
    OR?: GameSnapshotWhereInput[]
    NOT?: GameSnapshotWhereInput | GameSnapshotWhereInput[]
    gameId?: StringFilter<"GameSnapshot"> | string
    seq?: IntFilter<"GameSnapshot"> | number
    snapshot?: JsonFilter<"GameSnapshot">
    createdAt?: DateTimeFilter<"GameSnapshot"> | Date | string
  }, "id">

  export type GameSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    gameId?: SortOrder
    seq?: SortOrder
    snapshot?: SortOrder
    createdAt?: SortOrder
    _count?: GameSnapshotCountOrderByAggregateInput
    _avg?: GameSnapshotAvgOrderByAggregateInput
    _max?: GameSnapshotMaxOrderByAggregateInput
    _min?: GameSnapshotMinOrderByAggregateInput
    _sum?: GameSnapshotSumOrderByAggregateInput
  }

  export type GameSnapshotScalarWhereWithAggregatesInput = {
    AND?: GameSnapshotScalarWhereWithAggregatesInput | GameSnapshotScalarWhereWithAggregatesInput[]
    OR?: GameSnapshotScalarWhereWithAggregatesInput[]
    NOT?: GameSnapshotScalarWhereWithAggregatesInput | GameSnapshotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GameSnapshot"> | string
    gameId?: StringWithAggregatesFilter<"GameSnapshot"> | string
    seq?: IntWithAggregatesFilter<"GameSnapshot"> | number
    snapshot?: JsonWithAggregatesFilter<"GameSnapshot">
    createdAt?: DateTimeWithAggregatesFilter<"GameSnapshot"> | Date | string
  }

  export type RoundScoreWhereInput = {
    AND?: RoundScoreWhereInput | RoundScoreWhereInput[]
    OR?: RoundScoreWhereInput[]
    NOT?: RoundScoreWhereInput | RoundScoreWhereInput[]
    id?: StringFilter<"RoundScore"> | string
    gameId?: StringFilter<"RoundScore"> | string
    team?: IntFilter<"RoundScore"> | number
    points?: IntFilter<"RoundScore"> | number
    createdAt?: DateTimeFilter<"RoundScore"> | Date | string
  }

  export type RoundScoreOrderByWithRelationInput = {
    id?: SortOrder
    gameId?: SortOrder
    team?: SortOrder
    points?: SortOrder
    createdAt?: SortOrder
  }

  export type RoundScoreWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RoundScoreWhereInput | RoundScoreWhereInput[]
    OR?: RoundScoreWhereInput[]
    NOT?: RoundScoreWhereInput | RoundScoreWhereInput[]
    gameId?: StringFilter<"RoundScore"> | string
    team?: IntFilter<"RoundScore"> | number
    points?: IntFilter<"RoundScore"> | number
    createdAt?: DateTimeFilter<"RoundScore"> | Date | string
  }, "id">

  export type RoundScoreOrderByWithAggregationInput = {
    id?: SortOrder
    gameId?: SortOrder
    team?: SortOrder
    points?: SortOrder
    createdAt?: SortOrder
    _count?: RoundScoreCountOrderByAggregateInput
    _avg?: RoundScoreAvgOrderByAggregateInput
    _max?: RoundScoreMaxOrderByAggregateInput
    _min?: RoundScoreMinOrderByAggregateInput
    _sum?: RoundScoreSumOrderByAggregateInput
  }

  export type RoundScoreScalarWhereWithAggregatesInput = {
    AND?: RoundScoreScalarWhereWithAggregatesInput | RoundScoreScalarWhereWithAggregatesInput[]
    OR?: RoundScoreScalarWhereWithAggregatesInput[]
    NOT?: RoundScoreScalarWhereWithAggregatesInput | RoundScoreScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RoundScore"> | string
    gameId?: StringWithAggregatesFilter<"RoundScore"> | string
    team?: IntWithAggregatesFilter<"RoundScore"> | number
    points?: IntWithAggregatesFilter<"RoundScore"> | number
    createdAt?: DateTimeWithAggregatesFilter<"RoundScore"> | Date | string
  }

  export type MatchHistoryWhereInput = {
    AND?: MatchHistoryWhereInput | MatchHistoryWhereInput[]
    OR?: MatchHistoryWhereInput[]
    NOT?: MatchHistoryWhereInput | MatchHistoryWhereInput[]
    id?: StringFilter<"MatchHistory"> | string
    mode?: StringFilter<"MatchHistory"> | string
    winnerTeam?: IntFilter<"MatchHistory"> | number
    team0Score?: IntFilter<"MatchHistory"> | number
    team1Score?: IntFilter<"MatchHistory"> | number
    team0Zings?: IntFilter<"MatchHistory"> | number
    team1Zings?: IntFilter<"MatchHistory"> | number
    hostUserId?: StringNullableFilter<"MatchHistory"> | string | null
    team0Player1Id?: StringNullableFilter<"MatchHistory"> | string | null
    team0Player1Name?: StringFilter<"MatchHistory"> | string
    team0Player2Id?: StringNullableFilter<"MatchHistory"> | string | null
    team0Player2Name?: StringNullableFilter<"MatchHistory"> | string | null
    team1Player1Id?: StringNullableFilter<"MatchHistory"> | string | null
    team1Player1Name?: StringFilter<"MatchHistory"> | string
    team1Player2Id?: StringNullableFilter<"MatchHistory"> | string | null
    team1Player2Name?: StringNullableFilter<"MatchHistory"> | string | null
    duration?: IntNullableFilter<"MatchHistory"> | number | null
    createdAt?: DateTimeFilter<"MatchHistory"> | Date | string
  }

  export type MatchHistoryOrderByWithRelationInput = {
    id?: SortOrder
    mode?: SortOrder
    winnerTeam?: SortOrder
    team0Score?: SortOrder
    team1Score?: SortOrder
    team0Zings?: SortOrder
    team1Zings?: SortOrder
    hostUserId?: SortOrderInput | SortOrder
    team0Player1Id?: SortOrderInput | SortOrder
    team0Player1Name?: SortOrder
    team0Player2Id?: SortOrderInput | SortOrder
    team0Player2Name?: SortOrderInput | SortOrder
    team1Player1Id?: SortOrderInput | SortOrder
    team1Player1Name?: SortOrder
    team1Player2Id?: SortOrderInput | SortOrder
    team1Player2Name?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type MatchHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MatchHistoryWhereInput | MatchHistoryWhereInput[]
    OR?: MatchHistoryWhereInput[]
    NOT?: MatchHistoryWhereInput | MatchHistoryWhereInput[]
    mode?: StringFilter<"MatchHistory"> | string
    winnerTeam?: IntFilter<"MatchHistory"> | number
    team0Score?: IntFilter<"MatchHistory"> | number
    team1Score?: IntFilter<"MatchHistory"> | number
    team0Zings?: IntFilter<"MatchHistory"> | number
    team1Zings?: IntFilter<"MatchHistory"> | number
    hostUserId?: StringNullableFilter<"MatchHistory"> | string | null
    team0Player1Id?: StringNullableFilter<"MatchHistory"> | string | null
    team0Player1Name?: StringFilter<"MatchHistory"> | string
    team0Player2Id?: StringNullableFilter<"MatchHistory"> | string | null
    team0Player2Name?: StringNullableFilter<"MatchHistory"> | string | null
    team1Player1Id?: StringNullableFilter<"MatchHistory"> | string | null
    team1Player1Name?: StringFilter<"MatchHistory"> | string
    team1Player2Id?: StringNullableFilter<"MatchHistory"> | string | null
    team1Player2Name?: StringNullableFilter<"MatchHistory"> | string | null
    duration?: IntNullableFilter<"MatchHistory"> | number | null
    createdAt?: DateTimeFilter<"MatchHistory"> | Date | string
  }, "id">

  export type MatchHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    mode?: SortOrder
    winnerTeam?: SortOrder
    team0Score?: SortOrder
    team1Score?: SortOrder
    team0Zings?: SortOrder
    team1Zings?: SortOrder
    hostUserId?: SortOrderInput | SortOrder
    team0Player1Id?: SortOrderInput | SortOrder
    team0Player1Name?: SortOrder
    team0Player2Id?: SortOrderInput | SortOrder
    team0Player2Name?: SortOrderInput | SortOrder
    team1Player1Id?: SortOrderInput | SortOrder
    team1Player1Name?: SortOrder
    team1Player2Id?: SortOrderInput | SortOrder
    team1Player2Name?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: MatchHistoryCountOrderByAggregateInput
    _avg?: MatchHistoryAvgOrderByAggregateInput
    _max?: MatchHistoryMaxOrderByAggregateInput
    _min?: MatchHistoryMinOrderByAggregateInput
    _sum?: MatchHistorySumOrderByAggregateInput
  }

  export type MatchHistoryScalarWhereWithAggregatesInput = {
    AND?: MatchHistoryScalarWhereWithAggregatesInput | MatchHistoryScalarWhereWithAggregatesInput[]
    OR?: MatchHistoryScalarWhereWithAggregatesInput[]
    NOT?: MatchHistoryScalarWhereWithAggregatesInput | MatchHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MatchHistory"> | string
    mode?: StringWithAggregatesFilter<"MatchHistory"> | string
    winnerTeam?: IntWithAggregatesFilter<"MatchHistory"> | number
    team0Score?: IntWithAggregatesFilter<"MatchHistory"> | number
    team1Score?: IntWithAggregatesFilter<"MatchHistory"> | number
    team0Zings?: IntWithAggregatesFilter<"MatchHistory"> | number
    team1Zings?: IntWithAggregatesFilter<"MatchHistory"> | number
    hostUserId?: StringNullableWithAggregatesFilter<"MatchHistory"> | string | null
    team0Player1Id?: StringNullableWithAggregatesFilter<"MatchHistory"> | string | null
    team0Player1Name?: StringWithAggregatesFilter<"MatchHistory"> | string
    team0Player2Id?: StringNullableWithAggregatesFilter<"MatchHistory"> | string | null
    team0Player2Name?: StringNullableWithAggregatesFilter<"MatchHistory"> | string | null
    team1Player1Id?: StringNullableWithAggregatesFilter<"MatchHistory"> | string | null
    team1Player1Name?: StringWithAggregatesFilter<"MatchHistory"> | string
    team1Player2Id?: StringNullableWithAggregatesFilter<"MatchHistory"> | string | null
    team1Player2Name?: StringNullableWithAggregatesFilter<"MatchHistory"> | string | null
    duration?: IntNullableWithAggregatesFilter<"MatchHistory"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"MatchHistory"> | Date | string
  }

  export type UserStatsWhereInput = {
    AND?: UserStatsWhereInput | UserStatsWhereInput[]
    OR?: UserStatsWhereInput[]
    NOT?: UserStatsWhereInput | UserStatsWhereInput[]
    id?: StringFilter<"UserStats"> | string
    userId?: StringFilter<"UserStats"> | string
    gamesPlayed?: IntFilter<"UserStats"> | number
    soloWins?: IntFilter<"UserStats"> | number
    duoWins?: IntFilter<"UserStats"> | number
    pointsTaken?: IntFilter<"UserStats"> | number
    zingsMade?: IntFilter<"UserStats"> | number
    gamesHosted?: IntFilter<"UserStats"> | number
    friendsAdded?: IntFilter<"UserStats"> | number
    createdAt?: DateTimeFilter<"UserStats"> | Date | string
    updatedAt?: DateTimeFilter<"UserStats"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type UserStatsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    gamesPlayed?: SortOrder
    soloWins?: SortOrder
    duoWins?: SortOrder
    pointsTaken?: SortOrder
    zingsMade?: SortOrder
    gamesHosted?: SortOrder
    friendsAdded?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: UserStatsWhereInput | UserStatsWhereInput[]
    OR?: UserStatsWhereInput[]
    NOT?: UserStatsWhereInput | UserStatsWhereInput[]
    gamesPlayed?: IntFilter<"UserStats"> | number
    soloWins?: IntFilter<"UserStats"> | number
    duoWins?: IntFilter<"UserStats"> | number
    pointsTaken?: IntFilter<"UserStats"> | number
    zingsMade?: IntFilter<"UserStats"> | number
    gamesHosted?: IntFilter<"UserStats"> | number
    friendsAdded?: IntFilter<"UserStats"> | number
    createdAt?: DateTimeFilter<"UserStats"> | Date | string
    updatedAt?: DateTimeFilter<"UserStats"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type UserStatsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    gamesPlayed?: SortOrder
    soloWins?: SortOrder
    duoWins?: SortOrder
    pointsTaken?: SortOrder
    zingsMade?: SortOrder
    gamesHosted?: SortOrder
    friendsAdded?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserStatsCountOrderByAggregateInput
    _avg?: UserStatsAvgOrderByAggregateInput
    _max?: UserStatsMaxOrderByAggregateInput
    _min?: UserStatsMinOrderByAggregateInput
    _sum?: UserStatsSumOrderByAggregateInput
  }

  export type UserStatsScalarWhereWithAggregatesInput = {
    AND?: UserStatsScalarWhereWithAggregatesInput | UserStatsScalarWhereWithAggregatesInput[]
    OR?: UserStatsScalarWhereWithAggregatesInput[]
    NOT?: UserStatsScalarWhereWithAggregatesInput | UserStatsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserStats"> | string
    userId?: StringWithAggregatesFilter<"UserStats"> | string
    gamesPlayed?: IntWithAggregatesFilter<"UserStats"> | number
    soloWins?: IntWithAggregatesFilter<"UserStats"> | number
    duoWins?: IntWithAggregatesFilter<"UserStats"> | number
    pointsTaken?: IntWithAggregatesFilter<"UserStats"> | number
    zingsMade?: IntWithAggregatesFilter<"UserStats"> | number
    gamesHosted?: IntWithAggregatesFilter<"UserStats"> | number
    friendsAdded?: IntWithAggregatesFilter<"UserStats"> | number
    createdAt?: DateTimeWithAggregatesFilter<"UserStats"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserStats"> | Date | string
  }

  export type AchievementWhereInput = {
    AND?: AchievementWhereInput | AchievementWhereInput[]
    OR?: AchievementWhereInput[]
    NOT?: AchievementWhereInput | AchievementWhereInput[]
    id?: StringFilter<"Achievement"> | string
    type?: EnumAchievementTypeFilter<"Achievement"> | $Enums.AchievementType
    tier?: IntFilter<"Achievement"> | number
    threshold?: IntFilter<"Achievement"> | number
    name?: StringFilter<"Achievement"> | string
    description?: StringFilter<"Achievement"> | string
    unlockedBy?: UserAchievementListRelationFilter
  }

  export type AchievementOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    tier?: SortOrder
    threshold?: SortOrder
    name?: SortOrder
    description?: SortOrder
    unlockedBy?: UserAchievementOrderByRelationAggregateInput
  }

  export type AchievementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    type_tier?: AchievementTypeTierCompoundUniqueInput
    AND?: AchievementWhereInput | AchievementWhereInput[]
    OR?: AchievementWhereInput[]
    NOT?: AchievementWhereInput | AchievementWhereInput[]
    type?: EnumAchievementTypeFilter<"Achievement"> | $Enums.AchievementType
    tier?: IntFilter<"Achievement"> | number
    threshold?: IntFilter<"Achievement"> | number
    name?: StringFilter<"Achievement"> | string
    description?: StringFilter<"Achievement"> | string
    unlockedBy?: UserAchievementListRelationFilter
  }, "id" | "type_tier">

  export type AchievementOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    tier?: SortOrder
    threshold?: SortOrder
    name?: SortOrder
    description?: SortOrder
    _count?: AchievementCountOrderByAggregateInput
    _avg?: AchievementAvgOrderByAggregateInput
    _max?: AchievementMaxOrderByAggregateInput
    _min?: AchievementMinOrderByAggregateInput
    _sum?: AchievementSumOrderByAggregateInput
  }

  export type AchievementScalarWhereWithAggregatesInput = {
    AND?: AchievementScalarWhereWithAggregatesInput | AchievementScalarWhereWithAggregatesInput[]
    OR?: AchievementScalarWhereWithAggregatesInput[]
    NOT?: AchievementScalarWhereWithAggregatesInput | AchievementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Achievement"> | string
    type?: EnumAchievementTypeWithAggregatesFilter<"Achievement"> | $Enums.AchievementType
    tier?: IntWithAggregatesFilter<"Achievement"> | number
    threshold?: IntWithAggregatesFilter<"Achievement"> | number
    name?: StringWithAggregatesFilter<"Achievement"> | string
    description?: StringWithAggregatesFilter<"Achievement"> | string
  }

  export type UserAchievementWhereInput = {
    AND?: UserAchievementWhereInput | UserAchievementWhereInput[]
    OR?: UserAchievementWhereInput[]
    NOT?: UserAchievementWhereInput | UserAchievementWhereInput[]
    id?: StringFilter<"UserAchievement"> | string
    userId?: StringFilter<"UserAchievement"> | string
    achievementId?: StringFilter<"UserAchievement"> | string
    unlockedAt?: DateTimeFilter<"UserAchievement"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    achievement?: XOR<AchievementRelationFilter, AchievementWhereInput>
  }

  export type UserAchievementOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    achievementId?: SortOrder
    unlockedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    achievement?: AchievementOrderByWithRelationInput
  }

  export type UserAchievementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_achievementId?: UserAchievementUserIdAchievementIdCompoundUniqueInput
    AND?: UserAchievementWhereInput | UserAchievementWhereInput[]
    OR?: UserAchievementWhereInput[]
    NOT?: UserAchievementWhereInput | UserAchievementWhereInput[]
    userId?: StringFilter<"UserAchievement"> | string
    achievementId?: StringFilter<"UserAchievement"> | string
    unlockedAt?: DateTimeFilter<"UserAchievement"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    achievement?: XOR<AchievementRelationFilter, AchievementWhereInput>
  }, "id" | "userId_achievementId">

  export type UserAchievementOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    achievementId?: SortOrder
    unlockedAt?: SortOrder
    _count?: UserAchievementCountOrderByAggregateInput
    _max?: UserAchievementMaxOrderByAggregateInput
    _min?: UserAchievementMinOrderByAggregateInput
  }

  export type UserAchievementScalarWhereWithAggregatesInput = {
    AND?: UserAchievementScalarWhereWithAggregatesInput | UserAchievementScalarWhereWithAggregatesInput[]
    OR?: UserAchievementScalarWhereWithAggregatesInput[]
    NOT?: UserAchievementScalarWhereWithAggregatesInput | UserAchievementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserAchievement"> | string
    userId?: StringWithAggregatesFilter<"UserAchievement"> | string
    achievementId?: StringWithAggregatesFilter<"UserAchievement"> | string
    unlockedAt?: DateTimeWithAggregatesFilter<"UserAchievement"> | Date | string
  }

  export type LeaderboardSnapshotWhereInput = {
    AND?: LeaderboardSnapshotWhereInput | LeaderboardSnapshotWhereInput[]
    OR?: LeaderboardSnapshotWhereInput[]
    NOT?: LeaderboardSnapshotWhereInput | LeaderboardSnapshotWhereInput[]
    id?: StringFilter<"LeaderboardSnapshot"> | string
    userId?: StringFilter<"LeaderboardSnapshot"> | string
    username?: StringFilter<"LeaderboardSnapshot"> | string
    category?: EnumLeaderboardCategoryFilter<"LeaderboardSnapshot"> | $Enums.LeaderboardCategory
    period?: EnumLeaderboardPeriodFilter<"LeaderboardSnapshot"> | $Enums.LeaderboardPeriod
    value?: IntFilter<"LeaderboardSnapshot"> | number
    weekStart?: DateTimeNullableFilter<"LeaderboardSnapshot"> | Date | string | null
    monthStart?: DateTimeNullableFilter<"LeaderboardSnapshot"> | Date | string | null
    yearStart?: DateTimeNullableFilter<"LeaderboardSnapshot"> | Date | string | null
    rank?: IntNullableFilter<"LeaderboardSnapshot"> | number | null
    createdAt?: DateTimeFilter<"LeaderboardSnapshot"> | Date | string
    updatedAt?: DateTimeFilter<"LeaderboardSnapshot"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type LeaderboardSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    category?: SortOrder
    period?: SortOrder
    value?: SortOrder
    weekStart?: SortOrderInput | SortOrder
    monthStart?: SortOrderInput | SortOrder
    yearStart?: SortOrderInput | SortOrder
    rank?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type LeaderboardSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_category_period_weekStart_monthStart_yearStart?: LeaderboardSnapshotUserIdCategoryPeriodWeekStartMonthStartYearStartCompoundUniqueInput
    AND?: LeaderboardSnapshotWhereInput | LeaderboardSnapshotWhereInput[]
    OR?: LeaderboardSnapshotWhereInput[]
    NOT?: LeaderboardSnapshotWhereInput | LeaderboardSnapshotWhereInput[]
    userId?: StringFilter<"LeaderboardSnapshot"> | string
    username?: StringFilter<"LeaderboardSnapshot"> | string
    category?: EnumLeaderboardCategoryFilter<"LeaderboardSnapshot"> | $Enums.LeaderboardCategory
    period?: EnumLeaderboardPeriodFilter<"LeaderboardSnapshot"> | $Enums.LeaderboardPeriod
    value?: IntFilter<"LeaderboardSnapshot"> | number
    weekStart?: DateTimeNullableFilter<"LeaderboardSnapshot"> | Date | string | null
    monthStart?: DateTimeNullableFilter<"LeaderboardSnapshot"> | Date | string | null
    yearStart?: DateTimeNullableFilter<"LeaderboardSnapshot"> | Date | string | null
    rank?: IntNullableFilter<"LeaderboardSnapshot"> | number | null
    createdAt?: DateTimeFilter<"LeaderboardSnapshot"> | Date | string
    updatedAt?: DateTimeFilter<"LeaderboardSnapshot"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "userId_category_period_weekStart_monthStart_yearStart">

  export type LeaderboardSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    category?: SortOrder
    period?: SortOrder
    value?: SortOrder
    weekStart?: SortOrderInput | SortOrder
    monthStart?: SortOrderInput | SortOrder
    yearStart?: SortOrderInput | SortOrder
    rank?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LeaderboardSnapshotCountOrderByAggregateInput
    _avg?: LeaderboardSnapshotAvgOrderByAggregateInput
    _max?: LeaderboardSnapshotMaxOrderByAggregateInput
    _min?: LeaderboardSnapshotMinOrderByAggregateInput
    _sum?: LeaderboardSnapshotSumOrderByAggregateInput
  }

  export type LeaderboardSnapshotScalarWhereWithAggregatesInput = {
    AND?: LeaderboardSnapshotScalarWhereWithAggregatesInput | LeaderboardSnapshotScalarWhereWithAggregatesInput[]
    OR?: LeaderboardSnapshotScalarWhereWithAggregatesInput[]
    NOT?: LeaderboardSnapshotScalarWhereWithAggregatesInput | LeaderboardSnapshotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LeaderboardSnapshot"> | string
    userId?: StringWithAggregatesFilter<"LeaderboardSnapshot"> | string
    username?: StringWithAggregatesFilter<"LeaderboardSnapshot"> | string
    category?: EnumLeaderboardCategoryWithAggregatesFilter<"LeaderboardSnapshot"> | $Enums.LeaderboardCategory
    period?: EnumLeaderboardPeriodWithAggregatesFilter<"LeaderboardSnapshot"> | $Enums.LeaderboardPeriod
    value?: IntWithAggregatesFilter<"LeaderboardSnapshot"> | number
    weekStart?: DateTimeNullableWithAggregatesFilter<"LeaderboardSnapshot"> | Date | string | null
    monthStart?: DateTimeNullableWithAggregatesFilter<"LeaderboardSnapshot"> | Date | string | null
    yearStart?: DateTimeNullableWithAggregatesFilter<"LeaderboardSnapshot"> | Date | string | null
    rank?: IntNullableWithAggregatesFilter<"LeaderboardSnapshot"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"LeaderboardSnapshot"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LeaderboardSnapshot"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    friendRequestsSent?: FriendshipCreateNestedManyWithoutRequesterInput
    friendRequestsReceived?: FriendshipCreateNestedManyWithoutAddresseeInput
    invitesSent?: RoomInviteCreateNestedManyWithoutInviterInput
    invitesReceived?: RoomInviteCreateNestedManyWithoutInviteeInput
    stats?: UserStatsCreateNestedOneWithoutUserInput
    achievements?: UserAchievementCreateNestedManyWithoutUserInput
    leaderboardEntries?: LeaderboardSnapshotCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    friendRequestsSent?: FriendshipUncheckedCreateNestedManyWithoutRequesterInput
    friendRequestsReceived?: FriendshipUncheckedCreateNestedManyWithoutAddresseeInput
    invitesSent?: RoomInviteUncheckedCreateNestedManyWithoutInviterInput
    invitesReceived?: RoomInviteUncheckedCreateNestedManyWithoutInviteeInput
    stats?: UserStatsUncheckedCreateNestedOneWithoutUserInput
    achievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput
    leaderboardEntries?: LeaderboardSnapshotUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    friendRequestsSent?: FriendshipUpdateManyWithoutRequesterNestedInput
    friendRequestsReceived?: FriendshipUpdateManyWithoutAddresseeNestedInput
    invitesSent?: RoomInviteUpdateManyWithoutInviterNestedInput
    invitesReceived?: RoomInviteUpdateManyWithoutInviteeNestedInput
    stats?: UserStatsUpdateOneWithoutUserNestedInput
    achievements?: UserAchievementUpdateManyWithoutUserNestedInput
    leaderboardEntries?: LeaderboardSnapshotUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    friendRequestsSent?: FriendshipUncheckedUpdateManyWithoutRequesterNestedInput
    friendRequestsReceived?: FriendshipUncheckedUpdateManyWithoutAddresseeNestedInput
    invitesSent?: RoomInviteUncheckedUpdateManyWithoutInviterNestedInput
    invitesReceived?: RoomInviteUncheckedUpdateManyWithoutInviteeNestedInput
    stats?: UserStatsUncheckedUpdateOneWithoutUserNestedInput
    achievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput
    leaderboardEntries?: LeaderboardSnapshotUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendshipCreateInput = {
    id?: string
    status?: $Enums.FriendshipStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    requester: UserCreateNestedOneWithoutFriendRequestsSentInput
    addressee: UserCreateNestedOneWithoutFriendRequestsReceivedInput
  }

  export type FriendshipUncheckedCreateInput = {
    id?: string
    requesterId: string
    addresseeId: string
    status?: $Enums.FriendshipStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendshipUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendshipStatusFieldUpdateOperationsInput | $Enums.FriendshipStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requester?: UserUpdateOneRequiredWithoutFriendRequestsSentNestedInput
    addressee?: UserUpdateOneRequiredWithoutFriendRequestsReceivedNestedInput
  }

  export type FriendshipUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterId?: StringFieldUpdateOperationsInput | string
    addresseeId?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendshipStatusFieldUpdateOperationsInput | $Enums.FriendshipStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendshipCreateManyInput = {
    id?: string
    requesterId: string
    addresseeId: string
    status?: $Enums.FriendshipStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendshipUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendshipStatusFieldUpdateOperationsInput | $Enums.FriendshipStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendshipUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterId?: StringFieldUpdateOperationsInput | string
    addresseeId?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendshipStatusFieldUpdateOperationsInput | $Enums.FriendshipStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomInviteCreateInput = {
    id?: string
    roomId: string
    status?: $Enums.RoomInviteStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    expiresAt: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    inviter: UserCreateNestedOneWithoutInvitesSentInput
    invitee: UserCreateNestedOneWithoutInvitesReceivedInput
  }

  export type RoomInviteUncheckedCreateInput = {
    id?: string
    roomId: string
    inviterId: string
    inviteeId: string
    status?: $Enums.RoomInviteStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    expiresAt: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RoomInviteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomInviteStatusFieldUpdateOperationsInput | $Enums.RoomInviteStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    inviter?: UserUpdateOneRequiredWithoutInvitesSentNestedInput
    invitee?: UserUpdateOneRequiredWithoutInvitesReceivedNestedInput
  }

  export type RoomInviteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    inviterId?: StringFieldUpdateOperationsInput | string
    inviteeId?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomInviteStatusFieldUpdateOperationsInput | $Enums.RoomInviteStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RoomInviteCreateManyInput = {
    id?: string
    roomId: string
    inviterId: string
    inviteeId: string
    status?: $Enums.RoomInviteStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    expiresAt: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RoomInviteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomInviteStatusFieldUpdateOperationsInput | $Enums.RoomInviteStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RoomInviteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    inviterId?: StringFieldUpdateOperationsInput | string
    inviteeId?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomInviteStatusFieldUpdateOperationsInput | $Enums.RoomInviteStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type GameCreateInput = {
    id?: string
    status?: string
    deckSeed: string
    dealerId?: string | null
    surrenderVotes?: GameCreatesurrenderVotesInput | string[]
    rematchVotes?: GameCreaterematchVotesInput | string[]
    originalRoomIds?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: GameEventCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateInput = {
    id?: string
    status?: string
    deckSeed: string
    dealerId?: string | null
    surrenderVotes?: GameCreatesurrenderVotesInput | string[]
    rematchVotes?: GameCreaterematchVotesInput | string[]
    originalRoomIds?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: GameEventUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    deckSeed?: StringFieldUpdateOperationsInput | string
    dealerId?: NullableStringFieldUpdateOperationsInput | string | null
    surrenderVotes?: GameUpdatesurrenderVotesInput | string[]
    rematchVotes?: GameUpdaterematchVotesInput | string[]
    originalRoomIds?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: GameEventUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    deckSeed?: StringFieldUpdateOperationsInput | string
    dealerId?: NullableStringFieldUpdateOperationsInput | string | null
    surrenderVotes?: GameUpdatesurrenderVotesInput | string[]
    rematchVotes?: GameUpdaterematchVotesInput | string[]
    originalRoomIds?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: GameEventUncheckedUpdateManyWithoutGameNestedInput
  }

  export type GameCreateManyInput = {
    id?: string
    status?: string
    deckSeed: string
    dealerId?: string | null
    surrenderVotes?: GameCreatesurrenderVotesInput | string[]
    rematchVotes?: GameCreaterematchVotesInput | string[]
    originalRoomIds?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GameUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    deckSeed?: StringFieldUpdateOperationsInput | string
    dealerId?: NullableStringFieldUpdateOperationsInput | string | null
    surrenderVotes?: GameUpdatesurrenderVotesInput | string[]
    rematchVotes?: GameUpdaterematchVotesInput | string[]
    originalRoomIds?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    deckSeed?: StringFieldUpdateOperationsInput | string
    dealerId?: NullableStringFieldUpdateOperationsInput | string | null
    surrenderVotes?: GameUpdatesurrenderVotesInput | string[]
    rematchVotes?: GameUpdaterematchVotesInput | string[]
    originalRoomIds?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerCreateInput = {
    id?: string
    userId: string
    gameId: string
    name: string
    seatIdx: number
    role: string
  }

  export type PlayerUncheckedCreateInput = {
    id?: string
    userId: string
    gameId: string
    name: string
    seatIdx: number
    role: string
  }

  export type PlayerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    seatIdx?: IntFieldUpdateOperationsInput | number
    role?: StringFieldUpdateOperationsInput | string
  }

  export type PlayerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    seatIdx?: IntFieldUpdateOperationsInput | number
    role?: StringFieldUpdateOperationsInput | string
  }

  export type PlayerCreateManyInput = {
    id?: string
    userId: string
    gameId: string
    name: string
    seatIdx: number
    role: string
  }

  export type PlayerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    seatIdx?: IntFieldUpdateOperationsInput | number
    role?: StringFieldUpdateOperationsInput | string
  }

  export type PlayerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    seatIdx?: IntFieldUpdateOperationsInput | number
    role?: StringFieldUpdateOperationsInput | string
  }

  export type GameEventCreateInput = {
    id?: string
    seq: number
    type: string
    actor?: string | null
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    game: GameCreateNestedOneWithoutEventsInput
  }

  export type GameEventUncheckedCreateInput = {
    id?: string
    gameId: string
    seq: number
    type: string
    actor?: string | null
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type GameEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    seq?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    actor?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: GameUpdateOneRequiredWithoutEventsNestedInput
  }

  export type GameEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    seq?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    actor?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameEventCreateManyInput = {
    id?: string
    gameId: string
    seq: number
    type: string
    actor?: string | null
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type GameEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    seq?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    actor?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    seq?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    actor?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameSnapshotCreateInput = {
    id?: string
    gameId: string
    seq: number
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type GameSnapshotUncheckedCreateInput = {
    id?: string
    gameId: string
    seq: number
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type GameSnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    seq?: IntFieldUpdateOperationsInput | number
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameSnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    seq?: IntFieldUpdateOperationsInput | number
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameSnapshotCreateManyInput = {
    id?: string
    gameId: string
    seq: number
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type GameSnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    seq?: IntFieldUpdateOperationsInput | number
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameSnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    seq?: IntFieldUpdateOperationsInput | number
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoundScoreCreateInput = {
    id?: string
    gameId: string
    team: number
    points: number
    createdAt?: Date | string
  }

  export type RoundScoreUncheckedCreateInput = {
    id?: string
    gameId: string
    team: number
    points: number
    createdAt?: Date | string
  }

  export type RoundScoreUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    team?: IntFieldUpdateOperationsInput | number
    points?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoundScoreUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    team?: IntFieldUpdateOperationsInput | number
    points?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoundScoreCreateManyInput = {
    id?: string
    gameId: string
    team: number
    points: number
    createdAt?: Date | string
  }

  export type RoundScoreUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    team?: IntFieldUpdateOperationsInput | number
    points?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoundScoreUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameId?: StringFieldUpdateOperationsInput | string
    team?: IntFieldUpdateOperationsInput | number
    points?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchHistoryCreateInput = {
    id?: string
    mode: string
    winnerTeam: number
    team0Score: number
    team1Score: number
    team0Zings?: number
    team1Zings?: number
    hostUserId?: string | null
    team0Player1Id?: string | null
    team0Player1Name: string
    team0Player2Id?: string | null
    team0Player2Name?: string | null
    team1Player1Id?: string | null
    team1Player1Name: string
    team1Player2Id?: string | null
    team1Player2Name?: string | null
    duration?: number | null
    createdAt?: Date | string
  }

  export type MatchHistoryUncheckedCreateInput = {
    id?: string
    mode: string
    winnerTeam: number
    team0Score: number
    team1Score: number
    team0Zings?: number
    team1Zings?: number
    hostUserId?: string | null
    team0Player1Id?: string | null
    team0Player1Name: string
    team0Player2Id?: string | null
    team0Player2Name?: string | null
    team1Player1Id?: string | null
    team1Player1Name: string
    team1Player2Id?: string | null
    team1Player2Name?: string | null
    duration?: number | null
    createdAt?: Date | string
  }

  export type MatchHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    winnerTeam?: IntFieldUpdateOperationsInput | number
    team0Score?: IntFieldUpdateOperationsInput | number
    team1Score?: IntFieldUpdateOperationsInput | number
    team0Zings?: IntFieldUpdateOperationsInput | number
    team1Zings?: IntFieldUpdateOperationsInput | number
    hostUserId?: NullableStringFieldUpdateOperationsInput | string | null
    team0Player1Id?: NullableStringFieldUpdateOperationsInput | string | null
    team0Player1Name?: StringFieldUpdateOperationsInput | string
    team0Player2Id?: NullableStringFieldUpdateOperationsInput | string | null
    team0Player2Name?: NullableStringFieldUpdateOperationsInput | string | null
    team1Player1Id?: NullableStringFieldUpdateOperationsInput | string | null
    team1Player1Name?: StringFieldUpdateOperationsInput | string
    team1Player2Id?: NullableStringFieldUpdateOperationsInput | string | null
    team1Player2Name?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    winnerTeam?: IntFieldUpdateOperationsInput | number
    team0Score?: IntFieldUpdateOperationsInput | number
    team1Score?: IntFieldUpdateOperationsInput | number
    team0Zings?: IntFieldUpdateOperationsInput | number
    team1Zings?: IntFieldUpdateOperationsInput | number
    hostUserId?: NullableStringFieldUpdateOperationsInput | string | null
    team0Player1Id?: NullableStringFieldUpdateOperationsInput | string | null
    team0Player1Name?: StringFieldUpdateOperationsInput | string
    team0Player2Id?: NullableStringFieldUpdateOperationsInput | string | null
    team0Player2Name?: NullableStringFieldUpdateOperationsInput | string | null
    team1Player1Id?: NullableStringFieldUpdateOperationsInput | string | null
    team1Player1Name?: StringFieldUpdateOperationsInput | string
    team1Player2Id?: NullableStringFieldUpdateOperationsInput | string | null
    team1Player2Name?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchHistoryCreateManyInput = {
    id?: string
    mode: string
    winnerTeam: number
    team0Score: number
    team1Score: number
    team0Zings?: number
    team1Zings?: number
    hostUserId?: string | null
    team0Player1Id?: string | null
    team0Player1Name: string
    team0Player2Id?: string | null
    team0Player2Name?: string | null
    team1Player1Id?: string | null
    team1Player1Name: string
    team1Player2Id?: string | null
    team1Player2Name?: string | null
    duration?: number | null
    createdAt?: Date | string
  }

  export type MatchHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    winnerTeam?: IntFieldUpdateOperationsInput | number
    team0Score?: IntFieldUpdateOperationsInput | number
    team1Score?: IntFieldUpdateOperationsInput | number
    team0Zings?: IntFieldUpdateOperationsInput | number
    team1Zings?: IntFieldUpdateOperationsInput | number
    hostUserId?: NullableStringFieldUpdateOperationsInput | string | null
    team0Player1Id?: NullableStringFieldUpdateOperationsInput | string | null
    team0Player1Name?: StringFieldUpdateOperationsInput | string
    team0Player2Id?: NullableStringFieldUpdateOperationsInput | string | null
    team0Player2Name?: NullableStringFieldUpdateOperationsInput | string | null
    team1Player1Id?: NullableStringFieldUpdateOperationsInput | string | null
    team1Player1Name?: StringFieldUpdateOperationsInput | string
    team1Player2Id?: NullableStringFieldUpdateOperationsInput | string | null
    team1Player2Name?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    mode?: StringFieldUpdateOperationsInput | string
    winnerTeam?: IntFieldUpdateOperationsInput | number
    team0Score?: IntFieldUpdateOperationsInput | number
    team1Score?: IntFieldUpdateOperationsInput | number
    team0Zings?: IntFieldUpdateOperationsInput | number
    team1Zings?: IntFieldUpdateOperationsInput | number
    hostUserId?: NullableStringFieldUpdateOperationsInput | string | null
    team0Player1Id?: NullableStringFieldUpdateOperationsInput | string | null
    team0Player1Name?: StringFieldUpdateOperationsInput | string
    team0Player2Id?: NullableStringFieldUpdateOperationsInput | string | null
    team0Player2Name?: NullableStringFieldUpdateOperationsInput | string | null
    team1Player1Id?: NullableStringFieldUpdateOperationsInput | string | null
    team1Player1Name?: StringFieldUpdateOperationsInput | string
    team1Player2Id?: NullableStringFieldUpdateOperationsInput | string | null
    team1Player2Name?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserStatsCreateInput = {
    id?: string
    gamesPlayed?: number
    soloWins?: number
    duoWins?: number
    pointsTaken?: number
    zingsMade?: number
    gamesHosted?: number
    friendsAdded?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutStatsInput
  }

  export type UserStatsUncheckedCreateInput = {
    id?: string
    userId: string
    gamesPlayed?: number
    soloWins?: number
    duoWins?: number
    pointsTaken?: number
    zingsMade?: number
    gamesHosted?: number
    friendsAdded?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserStatsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gamesPlayed?: IntFieldUpdateOperationsInput | number
    soloWins?: IntFieldUpdateOperationsInput | number
    duoWins?: IntFieldUpdateOperationsInput | number
    pointsTaken?: IntFieldUpdateOperationsInput | number
    zingsMade?: IntFieldUpdateOperationsInput | number
    gamesHosted?: IntFieldUpdateOperationsInput | number
    friendsAdded?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutStatsNestedInput
  }

  export type UserStatsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    gamesPlayed?: IntFieldUpdateOperationsInput | number
    soloWins?: IntFieldUpdateOperationsInput | number
    duoWins?: IntFieldUpdateOperationsInput | number
    pointsTaken?: IntFieldUpdateOperationsInput | number
    zingsMade?: IntFieldUpdateOperationsInput | number
    gamesHosted?: IntFieldUpdateOperationsInput | number
    friendsAdded?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserStatsCreateManyInput = {
    id?: string
    userId: string
    gamesPlayed?: number
    soloWins?: number
    duoWins?: number
    pointsTaken?: number
    zingsMade?: number
    gamesHosted?: number
    friendsAdded?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserStatsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    gamesPlayed?: IntFieldUpdateOperationsInput | number
    soloWins?: IntFieldUpdateOperationsInput | number
    duoWins?: IntFieldUpdateOperationsInput | number
    pointsTaken?: IntFieldUpdateOperationsInput | number
    zingsMade?: IntFieldUpdateOperationsInput | number
    gamesHosted?: IntFieldUpdateOperationsInput | number
    friendsAdded?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserStatsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    gamesPlayed?: IntFieldUpdateOperationsInput | number
    soloWins?: IntFieldUpdateOperationsInput | number
    duoWins?: IntFieldUpdateOperationsInput | number
    pointsTaken?: IntFieldUpdateOperationsInput | number
    zingsMade?: IntFieldUpdateOperationsInput | number
    gamesHosted?: IntFieldUpdateOperationsInput | number
    friendsAdded?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AchievementCreateInput = {
    id?: string
    type: $Enums.AchievementType
    tier: number
    threshold: number
    name: string
    description: string
    unlockedBy?: UserAchievementCreateNestedManyWithoutAchievementInput
  }

  export type AchievementUncheckedCreateInput = {
    id?: string
    type: $Enums.AchievementType
    tier: number
    threshold: number
    name: string
    description: string
    unlockedBy?: UserAchievementUncheckedCreateNestedManyWithoutAchievementInput
  }

  export type AchievementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAchievementTypeFieldUpdateOperationsInput | $Enums.AchievementType
    tier?: IntFieldUpdateOperationsInput | number
    threshold?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    unlockedBy?: UserAchievementUpdateManyWithoutAchievementNestedInput
  }

  export type AchievementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAchievementTypeFieldUpdateOperationsInput | $Enums.AchievementType
    tier?: IntFieldUpdateOperationsInput | number
    threshold?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    unlockedBy?: UserAchievementUncheckedUpdateManyWithoutAchievementNestedInput
  }

  export type AchievementCreateManyInput = {
    id?: string
    type: $Enums.AchievementType
    tier: number
    threshold: number
    name: string
    description: string
  }

  export type AchievementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAchievementTypeFieldUpdateOperationsInput | $Enums.AchievementType
    tier?: IntFieldUpdateOperationsInput | number
    threshold?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type AchievementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAchievementTypeFieldUpdateOperationsInput | $Enums.AchievementType
    tier?: IntFieldUpdateOperationsInput | number
    threshold?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type UserAchievementCreateInput = {
    id?: string
    unlockedAt?: Date | string
    user: UserCreateNestedOneWithoutAchievementsInput
    achievement: AchievementCreateNestedOneWithoutUnlockedByInput
  }

  export type UserAchievementUncheckedCreateInput = {
    id?: string
    userId: string
    achievementId: string
    unlockedAt?: Date | string
  }

  export type UserAchievementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAchievementsNestedInput
    achievement?: AchievementUpdateOneRequiredWithoutUnlockedByNestedInput
  }

  export type UserAchievementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    achievementId?: StringFieldUpdateOperationsInput | string
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAchievementCreateManyInput = {
    id?: string
    userId: string
    achievementId: string
    unlockedAt?: Date | string
  }

  export type UserAchievementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAchievementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    achievementId?: StringFieldUpdateOperationsInput | string
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaderboardSnapshotCreateInput = {
    id?: string
    username: string
    category: $Enums.LeaderboardCategory
    period: $Enums.LeaderboardPeriod
    value: number
    weekStart?: Date | string | null
    monthStart?: Date | string | null
    yearStart?: Date | string | null
    rank?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutLeaderboardEntriesInput
  }

  export type LeaderboardSnapshotUncheckedCreateInput = {
    id?: string
    userId: string
    username: string
    category: $Enums.LeaderboardCategory
    period: $Enums.LeaderboardPeriod
    value: number
    weekStart?: Date | string | null
    monthStart?: Date | string | null
    yearStart?: Date | string | null
    rank?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeaderboardSnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    category?: EnumLeaderboardCategoryFieldUpdateOperationsInput | $Enums.LeaderboardCategory
    period?: EnumLeaderboardPeriodFieldUpdateOperationsInput | $Enums.LeaderboardPeriod
    value?: IntFieldUpdateOperationsInput | number
    weekStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    yearStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLeaderboardEntriesNestedInput
  }

  export type LeaderboardSnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    category?: EnumLeaderboardCategoryFieldUpdateOperationsInput | $Enums.LeaderboardCategory
    period?: EnumLeaderboardPeriodFieldUpdateOperationsInput | $Enums.LeaderboardPeriod
    value?: IntFieldUpdateOperationsInput | number
    weekStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    yearStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaderboardSnapshotCreateManyInput = {
    id?: string
    userId: string
    username: string
    category: $Enums.LeaderboardCategory
    period: $Enums.LeaderboardPeriod
    value: number
    weekStart?: Date | string | null
    monthStart?: Date | string | null
    yearStart?: Date | string | null
    rank?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeaderboardSnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    category?: EnumLeaderboardCategoryFieldUpdateOperationsInput | $Enums.LeaderboardCategory
    period?: EnumLeaderboardPeriodFieldUpdateOperationsInput | $Enums.LeaderboardPeriod
    value?: IntFieldUpdateOperationsInput | number
    weekStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    yearStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaderboardSnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    category?: EnumLeaderboardCategoryFieldUpdateOperationsInput | $Enums.LeaderboardCategory
    period?: EnumLeaderboardPeriodFieldUpdateOperationsInput | $Enums.LeaderboardPeriod
    value?: IntFieldUpdateOperationsInput | number
    weekStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    yearStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FriendshipListRelationFilter = {
    every?: FriendshipWhereInput
    some?: FriendshipWhereInput
    none?: FriendshipWhereInput
  }

  export type RoomInviteListRelationFilter = {
    every?: RoomInviteWhereInput
    some?: RoomInviteWhereInput
    none?: RoomInviteWhereInput
  }

  export type UserStatsNullableRelationFilter = {
    is?: UserStatsWhereInput | null
    isNot?: UserStatsWhereInput | null
  }

  export type UserAchievementListRelationFilter = {
    every?: UserAchievementWhereInput
    some?: UserAchievementWhereInput
    none?: UserAchievementWhereInput
  }

  export type LeaderboardSnapshotListRelationFilter = {
    every?: LeaderboardSnapshotWhereInput
    some?: LeaderboardSnapshotWhereInput
    none?: LeaderboardSnapshotWhereInput
  }

  export type FriendshipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomInviteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserAchievementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeaderboardSnapshotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumFriendshipStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FriendshipStatus | EnumFriendshipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FriendshipStatus[] | ListEnumFriendshipStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FriendshipStatus[] | ListEnumFriendshipStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFriendshipStatusFilter<$PrismaModel> | $Enums.FriendshipStatus
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type FriendshipRequesterIdAddresseeIdCompoundUniqueInput = {
    requesterId: string
    addresseeId: string
  }

  export type FriendshipCountOrderByAggregateInput = {
    id?: SortOrder
    requesterId?: SortOrder
    addresseeId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FriendshipMaxOrderByAggregateInput = {
    id?: SortOrder
    requesterId?: SortOrder
    addresseeId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FriendshipMinOrderByAggregateInput = {
    id?: SortOrder
    requesterId?: SortOrder
    addresseeId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumFriendshipStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FriendshipStatus | EnumFriendshipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FriendshipStatus[] | ListEnumFriendshipStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FriendshipStatus[] | ListEnumFriendshipStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFriendshipStatusWithAggregatesFilter<$PrismaModel> | $Enums.FriendshipStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFriendshipStatusFilter<$PrismaModel>
    _max?: NestedEnumFriendshipStatusFilter<$PrismaModel>
  }

  export type EnumRoomInviteStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomInviteStatus | EnumRoomInviteStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RoomInviteStatus[] | ListEnumRoomInviteStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomInviteStatus[] | ListEnumRoomInviteStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomInviteStatusFilter<$PrismaModel> | $Enums.RoomInviteStatus
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RoomInviteCountOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    inviterId?: SortOrder
    inviteeId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiresAt?: SortOrder
    metadata?: SortOrder
  }

  export type RoomInviteMaxOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    inviterId?: SortOrder
    inviteeId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type RoomInviteMinOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    inviterId?: SortOrder
    inviteeId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type EnumRoomInviteStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomInviteStatus | EnumRoomInviteStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RoomInviteStatus[] | ListEnumRoomInviteStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomInviteStatus[] | ListEnumRoomInviteStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomInviteStatusWithAggregatesFilter<$PrismaModel> | $Enums.RoomInviteStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoomInviteStatusFilter<$PrismaModel>
    _max?: NestedEnumRoomInviteStatusFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type GameEventListRelationFilter = {
    every?: GameEventWhereInput
    some?: GameEventWhereInput
    none?: GameEventWhereInput
  }

  export type GameEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GameCountOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    deckSeed?: SortOrder
    dealerId?: SortOrder
    surrenderVotes?: SortOrder
    rematchVotes?: SortOrder
    originalRoomIds?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GameMaxOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    deckSeed?: SortOrder
    dealerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GameMinOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    deckSeed?: SortOrder
    dealerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type PlayerCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    name?: SortOrder
    seatIdx?: SortOrder
    role?: SortOrder
  }

  export type PlayerAvgOrderByAggregateInput = {
    seatIdx?: SortOrder
  }

  export type PlayerMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    name?: SortOrder
    seatIdx?: SortOrder
    role?: SortOrder
  }

  export type PlayerMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    name?: SortOrder
    seatIdx?: SortOrder
    role?: SortOrder
  }

  export type PlayerSumOrderByAggregateInput = {
    seatIdx?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type GameRelationFilter = {
    is?: GameWhereInput
    isNot?: GameWhereInput
  }

  export type GameEventCountOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    seq?: SortOrder
    type?: SortOrder
    actor?: SortOrder
    payload?: SortOrder
    createdAt?: SortOrder
  }

  export type GameEventAvgOrderByAggregateInput = {
    seq?: SortOrder
  }

  export type GameEventMaxOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    seq?: SortOrder
    type?: SortOrder
    actor?: SortOrder
    createdAt?: SortOrder
  }

  export type GameEventMinOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    seq?: SortOrder
    type?: SortOrder
    actor?: SortOrder
    createdAt?: SortOrder
  }

  export type GameEventSumOrderByAggregateInput = {
    seq?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type GameSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    seq?: SortOrder
    snapshot?: SortOrder
    createdAt?: SortOrder
  }

  export type GameSnapshotAvgOrderByAggregateInput = {
    seq?: SortOrder
  }

  export type GameSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    seq?: SortOrder
    createdAt?: SortOrder
  }

  export type GameSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    seq?: SortOrder
    createdAt?: SortOrder
  }

  export type GameSnapshotSumOrderByAggregateInput = {
    seq?: SortOrder
  }

  export type RoundScoreCountOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    team?: SortOrder
    points?: SortOrder
    createdAt?: SortOrder
  }

  export type RoundScoreAvgOrderByAggregateInput = {
    team?: SortOrder
    points?: SortOrder
  }

  export type RoundScoreMaxOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    team?: SortOrder
    points?: SortOrder
    createdAt?: SortOrder
  }

  export type RoundScoreMinOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    team?: SortOrder
    points?: SortOrder
    createdAt?: SortOrder
  }

  export type RoundScoreSumOrderByAggregateInput = {
    team?: SortOrder
    points?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type MatchHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    mode?: SortOrder
    winnerTeam?: SortOrder
    team0Score?: SortOrder
    team1Score?: SortOrder
    team0Zings?: SortOrder
    team1Zings?: SortOrder
    hostUserId?: SortOrder
    team0Player1Id?: SortOrder
    team0Player1Name?: SortOrder
    team0Player2Id?: SortOrder
    team0Player2Name?: SortOrder
    team1Player1Id?: SortOrder
    team1Player1Name?: SortOrder
    team1Player2Id?: SortOrder
    team1Player2Name?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
  }

  export type MatchHistoryAvgOrderByAggregateInput = {
    winnerTeam?: SortOrder
    team0Score?: SortOrder
    team1Score?: SortOrder
    team0Zings?: SortOrder
    team1Zings?: SortOrder
    duration?: SortOrder
  }

  export type MatchHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    mode?: SortOrder
    winnerTeam?: SortOrder
    team0Score?: SortOrder
    team1Score?: SortOrder
    team0Zings?: SortOrder
    team1Zings?: SortOrder
    hostUserId?: SortOrder
    team0Player1Id?: SortOrder
    team0Player1Name?: SortOrder
    team0Player2Id?: SortOrder
    team0Player2Name?: SortOrder
    team1Player1Id?: SortOrder
    team1Player1Name?: SortOrder
    team1Player2Id?: SortOrder
    team1Player2Name?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
  }

  export type MatchHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    mode?: SortOrder
    winnerTeam?: SortOrder
    team0Score?: SortOrder
    team1Score?: SortOrder
    team0Zings?: SortOrder
    team1Zings?: SortOrder
    hostUserId?: SortOrder
    team0Player1Id?: SortOrder
    team0Player1Name?: SortOrder
    team0Player2Id?: SortOrder
    team0Player2Name?: SortOrder
    team1Player1Id?: SortOrder
    team1Player1Name?: SortOrder
    team1Player2Id?: SortOrder
    team1Player2Name?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
  }

  export type MatchHistorySumOrderByAggregateInput = {
    winnerTeam?: SortOrder
    team0Score?: SortOrder
    team1Score?: SortOrder
    team0Zings?: SortOrder
    team1Zings?: SortOrder
    duration?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type UserStatsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gamesPlayed?: SortOrder
    soloWins?: SortOrder
    duoWins?: SortOrder
    pointsTaken?: SortOrder
    zingsMade?: SortOrder
    gamesHosted?: SortOrder
    friendsAdded?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserStatsAvgOrderByAggregateInput = {
    gamesPlayed?: SortOrder
    soloWins?: SortOrder
    duoWins?: SortOrder
    pointsTaken?: SortOrder
    zingsMade?: SortOrder
    gamesHosted?: SortOrder
    friendsAdded?: SortOrder
  }

  export type UserStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gamesPlayed?: SortOrder
    soloWins?: SortOrder
    duoWins?: SortOrder
    pointsTaken?: SortOrder
    zingsMade?: SortOrder
    gamesHosted?: SortOrder
    friendsAdded?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserStatsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gamesPlayed?: SortOrder
    soloWins?: SortOrder
    duoWins?: SortOrder
    pointsTaken?: SortOrder
    zingsMade?: SortOrder
    gamesHosted?: SortOrder
    friendsAdded?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserStatsSumOrderByAggregateInput = {
    gamesPlayed?: SortOrder
    soloWins?: SortOrder
    duoWins?: SortOrder
    pointsTaken?: SortOrder
    zingsMade?: SortOrder
    gamesHosted?: SortOrder
    friendsAdded?: SortOrder
  }

  export type EnumAchievementTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AchievementType | EnumAchievementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AchievementType[] | ListEnumAchievementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AchievementType[] | ListEnumAchievementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAchievementTypeFilter<$PrismaModel> | $Enums.AchievementType
  }

  export type AchievementTypeTierCompoundUniqueInput = {
    type: $Enums.AchievementType
    tier: number
  }

  export type AchievementCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    tier?: SortOrder
    threshold?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type AchievementAvgOrderByAggregateInput = {
    tier?: SortOrder
    threshold?: SortOrder
  }

  export type AchievementMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    tier?: SortOrder
    threshold?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type AchievementMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    tier?: SortOrder
    threshold?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type AchievementSumOrderByAggregateInput = {
    tier?: SortOrder
    threshold?: SortOrder
  }

  export type EnumAchievementTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AchievementType | EnumAchievementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AchievementType[] | ListEnumAchievementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AchievementType[] | ListEnumAchievementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAchievementTypeWithAggregatesFilter<$PrismaModel> | $Enums.AchievementType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAchievementTypeFilter<$PrismaModel>
    _max?: NestedEnumAchievementTypeFilter<$PrismaModel>
  }

  export type AchievementRelationFilter = {
    is?: AchievementWhereInput
    isNot?: AchievementWhereInput
  }

  export type UserAchievementUserIdAchievementIdCompoundUniqueInput = {
    userId: string
    achievementId: string
  }

  export type UserAchievementCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    achievementId?: SortOrder
    unlockedAt?: SortOrder
  }

  export type UserAchievementMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    achievementId?: SortOrder
    unlockedAt?: SortOrder
  }

  export type UserAchievementMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    achievementId?: SortOrder
    unlockedAt?: SortOrder
  }

  export type EnumLeaderboardCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaderboardCategory | EnumLeaderboardCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.LeaderboardCategory[] | ListEnumLeaderboardCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaderboardCategory[] | ListEnumLeaderboardCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaderboardCategoryFilter<$PrismaModel> | $Enums.LeaderboardCategory
  }

  export type EnumLeaderboardPeriodFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaderboardPeriod | EnumLeaderboardPeriodFieldRefInput<$PrismaModel>
    in?: $Enums.LeaderboardPeriod[] | ListEnumLeaderboardPeriodFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaderboardPeriod[] | ListEnumLeaderboardPeriodFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaderboardPeriodFilter<$PrismaModel> | $Enums.LeaderboardPeriod
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type LeaderboardSnapshotUserIdCategoryPeriodWeekStartMonthStartYearStartCompoundUniqueInput = {
    userId: string
    category: $Enums.LeaderboardCategory
    period: $Enums.LeaderboardPeriod
    weekStart: Date | string
    monthStart: Date | string
    yearStart: Date | string
  }

  export type LeaderboardSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    category?: SortOrder
    period?: SortOrder
    value?: SortOrder
    weekStart?: SortOrder
    monthStart?: SortOrder
    yearStart?: SortOrder
    rank?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeaderboardSnapshotAvgOrderByAggregateInput = {
    value?: SortOrder
    rank?: SortOrder
  }

  export type LeaderboardSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    category?: SortOrder
    period?: SortOrder
    value?: SortOrder
    weekStart?: SortOrder
    monthStart?: SortOrder
    yearStart?: SortOrder
    rank?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeaderboardSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    category?: SortOrder
    period?: SortOrder
    value?: SortOrder
    weekStart?: SortOrder
    monthStart?: SortOrder
    yearStart?: SortOrder
    rank?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeaderboardSnapshotSumOrderByAggregateInput = {
    value?: SortOrder
    rank?: SortOrder
  }

  export type EnumLeaderboardCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaderboardCategory | EnumLeaderboardCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.LeaderboardCategory[] | ListEnumLeaderboardCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaderboardCategory[] | ListEnumLeaderboardCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaderboardCategoryWithAggregatesFilter<$PrismaModel> | $Enums.LeaderboardCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLeaderboardCategoryFilter<$PrismaModel>
    _max?: NestedEnumLeaderboardCategoryFilter<$PrismaModel>
  }

  export type EnumLeaderboardPeriodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaderboardPeriod | EnumLeaderboardPeriodFieldRefInput<$PrismaModel>
    in?: $Enums.LeaderboardPeriod[] | ListEnumLeaderboardPeriodFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaderboardPeriod[] | ListEnumLeaderboardPeriodFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaderboardPeriodWithAggregatesFilter<$PrismaModel> | $Enums.LeaderboardPeriod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLeaderboardPeriodFilter<$PrismaModel>
    _max?: NestedEnumLeaderboardPeriodFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FriendshipCreateNestedManyWithoutRequesterInput = {
    create?: XOR<FriendshipCreateWithoutRequesterInput, FriendshipUncheckedCreateWithoutRequesterInput> | FriendshipCreateWithoutRequesterInput[] | FriendshipUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: FriendshipCreateOrConnectWithoutRequesterInput | FriendshipCreateOrConnectWithoutRequesterInput[]
    createMany?: FriendshipCreateManyRequesterInputEnvelope
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
  }

  export type FriendshipCreateNestedManyWithoutAddresseeInput = {
    create?: XOR<FriendshipCreateWithoutAddresseeInput, FriendshipUncheckedCreateWithoutAddresseeInput> | FriendshipCreateWithoutAddresseeInput[] | FriendshipUncheckedCreateWithoutAddresseeInput[]
    connectOrCreate?: FriendshipCreateOrConnectWithoutAddresseeInput | FriendshipCreateOrConnectWithoutAddresseeInput[]
    createMany?: FriendshipCreateManyAddresseeInputEnvelope
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
  }

  export type RoomInviteCreateNestedManyWithoutInviterInput = {
    create?: XOR<RoomInviteCreateWithoutInviterInput, RoomInviteUncheckedCreateWithoutInviterInput> | RoomInviteCreateWithoutInviterInput[] | RoomInviteUncheckedCreateWithoutInviterInput[]
    connectOrCreate?: RoomInviteCreateOrConnectWithoutInviterInput | RoomInviteCreateOrConnectWithoutInviterInput[]
    createMany?: RoomInviteCreateManyInviterInputEnvelope
    connect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
  }

  export type RoomInviteCreateNestedManyWithoutInviteeInput = {
    create?: XOR<RoomInviteCreateWithoutInviteeInput, RoomInviteUncheckedCreateWithoutInviteeInput> | RoomInviteCreateWithoutInviteeInput[] | RoomInviteUncheckedCreateWithoutInviteeInput[]
    connectOrCreate?: RoomInviteCreateOrConnectWithoutInviteeInput | RoomInviteCreateOrConnectWithoutInviteeInput[]
    createMany?: RoomInviteCreateManyInviteeInputEnvelope
    connect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
  }

  export type UserStatsCreateNestedOneWithoutUserInput = {
    create?: XOR<UserStatsCreateWithoutUserInput, UserStatsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserStatsCreateOrConnectWithoutUserInput
    connect?: UserStatsWhereUniqueInput
  }

  export type UserAchievementCreateNestedManyWithoutUserInput = {
    create?: XOR<UserAchievementCreateWithoutUserInput, UserAchievementUncheckedCreateWithoutUserInput> | UserAchievementCreateWithoutUserInput[] | UserAchievementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutUserInput | UserAchievementCreateOrConnectWithoutUserInput[]
    createMany?: UserAchievementCreateManyUserInputEnvelope
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
  }

  export type LeaderboardSnapshotCreateNestedManyWithoutUserInput = {
    create?: XOR<LeaderboardSnapshotCreateWithoutUserInput, LeaderboardSnapshotUncheckedCreateWithoutUserInput> | LeaderboardSnapshotCreateWithoutUserInput[] | LeaderboardSnapshotUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LeaderboardSnapshotCreateOrConnectWithoutUserInput | LeaderboardSnapshotCreateOrConnectWithoutUserInput[]
    createMany?: LeaderboardSnapshotCreateManyUserInputEnvelope
    connect?: LeaderboardSnapshotWhereUniqueInput | LeaderboardSnapshotWhereUniqueInput[]
  }

  export type FriendshipUncheckedCreateNestedManyWithoutRequesterInput = {
    create?: XOR<FriendshipCreateWithoutRequesterInput, FriendshipUncheckedCreateWithoutRequesterInput> | FriendshipCreateWithoutRequesterInput[] | FriendshipUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: FriendshipCreateOrConnectWithoutRequesterInput | FriendshipCreateOrConnectWithoutRequesterInput[]
    createMany?: FriendshipCreateManyRequesterInputEnvelope
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
  }

  export type FriendshipUncheckedCreateNestedManyWithoutAddresseeInput = {
    create?: XOR<FriendshipCreateWithoutAddresseeInput, FriendshipUncheckedCreateWithoutAddresseeInput> | FriendshipCreateWithoutAddresseeInput[] | FriendshipUncheckedCreateWithoutAddresseeInput[]
    connectOrCreate?: FriendshipCreateOrConnectWithoutAddresseeInput | FriendshipCreateOrConnectWithoutAddresseeInput[]
    createMany?: FriendshipCreateManyAddresseeInputEnvelope
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
  }

  export type RoomInviteUncheckedCreateNestedManyWithoutInviterInput = {
    create?: XOR<RoomInviteCreateWithoutInviterInput, RoomInviteUncheckedCreateWithoutInviterInput> | RoomInviteCreateWithoutInviterInput[] | RoomInviteUncheckedCreateWithoutInviterInput[]
    connectOrCreate?: RoomInviteCreateOrConnectWithoutInviterInput | RoomInviteCreateOrConnectWithoutInviterInput[]
    createMany?: RoomInviteCreateManyInviterInputEnvelope
    connect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
  }

  export type RoomInviteUncheckedCreateNestedManyWithoutInviteeInput = {
    create?: XOR<RoomInviteCreateWithoutInviteeInput, RoomInviteUncheckedCreateWithoutInviteeInput> | RoomInviteCreateWithoutInviteeInput[] | RoomInviteUncheckedCreateWithoutInviteeInput[]
    connectOrCreate?: RoomInviteCreateOrConnectWithoutInviteeInput | RoomInviteCreateOrConnectWithoutInviteeInput[]
    createMany?: RoomInviteCreateManyInviteeInputEnvelope
    connect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
  }

  export type UserStatsUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserStatsCreateWithoutUserInput, UserStatsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserStatsCreateOrConnectWithoutUserInput
    connect?: UserStatsWhereUniqueInput
  }

  export type UserAchievementUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserAchievementCreateWithoutUserInput, UserAchievementUncheckedCreateWithoutUserInput> | UserAchievementCreateWithoutUserInput[] | UserAchievementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutUserInput | UserAchievementCreateOrConnectWithoutUserInput[]
    createMany?: UserAchievementCreateManyUserInputEnvelope
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
  }

  export type LeaderboardSnapshotUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<LeaderboardSnapshotCreateWithoutUserInput, LeaderboardSnapshotUncheckedCreateWithoutUserInput> | LeaderboardSnapshotCreateWithoutUserInput[] | LeaderboardSnapshotUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LeaderboardSnapshotCreateOrConnectWithoutUserInput | LeaderboardSnapshotCreateOrConnectWithoutUserInput[]
    createMany?: LeaderboardSnapshotCreateManyUserInputEnvelope
    connect?: LeaderboardSnapshotWhereUniqueInput | LeaderboardSnapshotWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FriendshipUpdateManyWithoutRequesterNestedInput = {
    create?: XOR<FriendshipCreateWithoutRequesterInput, FriendshipUncheckedCreateWithoutRequesterInput> | FriendshipCreateWithoutRequesterInput[] | FriendshipUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: FriendshipCreateOrConnectWithoutRequesterInput | FriendshipCreateOrConnectWithoutRequesterInput[]
    upsert?: FriendshipUpsertWithWhereUniqueWithoutRequesterInput | FriendshipUpsertWithWhereUniqueWithoutRequesterInput[]
    createMany?: FriendshipCreateManyRequesterInputEnvelope
    set?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    disconnect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    delete?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    update?: FriendshipUpdateWithWhereUniqueWithoutRequesterInput | FriendshipUpdateWithWhereUniqueWithoutRequesterInput[]
    updateMany?: FriendshipUpdateManyWithWhereWithoutRequesterInput | FriendshipUpdateManyWithWhereWithoutRequesterInput[]
    deleteMany?: FriendshipScalarWhereInput | FriendshipScalarWhereInput[]
  }

  export type FriendshipUpdateManyWithoutAddresseeNestedInput = {
    create?: XOR<FriendshipCreateWithoutAddresseeInput, FriendshipUncheckedCreateWithoutAddresseeInput> | FriendshipCreateWithoutAddresseeInput[] | FriendshipUncheckedCreateWithoutAddresseeInput[]
    connectOrCreate?: FriendshipCreateOrConnectWithoutAddresseeInput | FriendshipCreateOrConnectWithoutAddresseeInput[]
    upsert?: FriendshipUpsertWithWhereUniqueWithoutAddresseeInput | FriendshipUpsertWithWhereUniqueWithoutAddresseeInput[]
    createMany?: FriendshipCreateManyAddresseeInputEnvelope
    set?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    disconnect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    delete?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    update?: FriendshipUpdateWithWhereUniqueWithoutAddresseeInput | FriendshipUpdateWithWhereUniqueWithoutAddresseeInput[]
    updateMany?: FriendshipUpdateManyWithWhereWithoutAddresseeInput | FriendshipUpdateManyWithWhereWithoutAddresseeInput[]
    deleteMany?: FriendshipScalarWhereInput | FriendshipScalarWhereInput[]
  }

  export type RoomInviteUpdateManyWithoutInviterNestedInput = {
    create?: XOR<RoomInviteCreateWithoutInviterInput, RoomInviteUncheckedCreateWithoutInviterInput> | RoomInviteCreateWithoutInviterInput[] | RoomInviteUncheckedCreateWithoutInviterInput[]
    connectOrCreate?: RoomInviteCreateOrConnectWithoutInviterInput | RoomInviteCreateOrConnectWithoutInviterInput[]
    upsert?: RoomInviteUpsertWithWhereUniqueWithoutInviterInput | RoomInviteUpsertWithWhereUniqueWithoutInviterInput[]
    createMany?: RoomInviteCreateManyInviterInputEnvelope
    set?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    disconnect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    delete?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    connect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    update?: RoomInviteUpdateWithWhereUniqueWithoutInviterInput | RoomInviteUpdateWithWhereUniqueWithoutInviterInput[]
    updateMany?: RoomInviteUpdateManyWithWhereWithoutInviterInput | RoomInviteUpdateManyWithWhereWithoutInviterInput[]
    deleteMany?: RoomInviteScalarWhereInput | RoomInviteScalarWhereInput[]
  }

  export type RoomInviteUpdateManyWithoutInviteeNestedInput = {
    create?: XOR<RoomInviteCreateWithoutInviteeInput, RoomInviteUncheckedCreateWithoutInviteeInput> | RoomInviteCreateWithoutInviteeInput[] | RoomInviteUncheckedCreateWithoutInviteeInput[]
    connectOrCreate?: RoomInviteCreateOrConnectWithoutInviteeInput | RoomInviteCreateOrConnectWithoutInviteeInput[]
    upsert?: RoomInviteUpsertWithWhereUniqueWithoutInviteeInput | RoomInviteUpsertWithWhereUniqueWithoutInviteeInput[]
    createMany?: RoomInviteCreateManyInviteeInputEnvelope
    set?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    disconnect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    delete?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    connect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    update?: RoomInviteUpdateWithWhereUniqueWithoutInviteeInput | RoomInviteUpdateWithWhereUniqueWithoutInviteeInput[]
    updateMany?: RoomInviteUpdateManyWithWhereWithoutInviteeInput | RoomInviteUpdateManyWithWhereWithoutInviteeInput[]
    deleteMany?: RoomInviteScalarWhereInput | RoomInviteScalarWhereInput[]
  }

  export type UserStatsUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserStatsCreateWithoutUserInput, UserStatsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserStatsCreateOrConnectWithoutUserInput
    upsert?: UserStatsUpsertWithoutUserInput
    disconnect?: UserStatsWhereInput | boolean
    delete?: UserStatsWhereInput | boolean
    connect?: UserStatsWhereUniqueInput
    update?: XOR<XOR<UserStatsUpdateToOneWithWhereWithoutUserInput, UserStatsUpdateWithoutUserInput>, UserStatsUncheckedUpdateWithoutUserInput>
  }

  export type UserAchievementUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserAchievementCreateWithoutUserInput, UserAchievementUncheckedCreateWithoutUserInput> | UserAchievementCreateWithoutUserInput[] | UserAchievementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutUserInput | UserAchievementCreateOrConnectWithoutUserInput[]
    upsert?: UserAchievementUpsertWithWhereUniqueWithoutUserInput | UserAchievementUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserAchievementCreateManyUserInputEnvelope
    set?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    disconnect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    delete?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    update?: UserAchievementUpdateWithWhereUniqueWithoutUserInput | UserAchievementUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserAchievementUpdateManyWithWhereWithoutUserInput | UserAchievementUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[]
  }

  export type LeaderboardSnapshotUpdateManyWithoutUserNestedInput = {
    create?: XOR<LeaderboardSnapshotCreateWithoutUserInput, LeaderboardSnapshotUncheckedCreateWithoutUserInput> | LeaderboardSnapshotCreateWithoutUserInput[] | LeaderboardSnapshotUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LeaderboardSnapshotCreateOrConnectWithoutUserInput | LeaderboardSnapshotCreateOrConnectWithoutUserInput[]
    upsert?: LeaderboardSnapshotUpsertWithWhereUniqueWithoutUserInput | LeaderboardSnapshotUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LeaderboardSnapshotCreateManyUserInputEnvelope
    set?: LeaderboardSnapshotWhereUniqueInput | LeaderboardSnapshotWhereUniqueInput[]
    disconnect?: LeaderboardSnapshotWhereUniqueInput | LeaderboardSnapshotWhereUniqueInput[]
    delete?: LeaderboardSnapshotWhereUniqueInput | LeaderboardSnapshotWhereUniqueInput[]
    connect?: LeaderboardSnapshotWhereUniqueInput | LeaderboardSnapshotWhereUniqueInput[]
    update?: LeaderboardSnapshotUpdateWithWhereUniqueWithoutUserInput | LeaderboardSnapshotUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LeaderboardSnapshotUpdateManyWithWhereWithoutUserInput | LeaderboardSnapshotUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LeaderboardSnapshotScalarWhereInput | LeaderboardSnapshotScalarWhereInput[]
  }

  export type FriendshipUncheckedUpdateManyWithoutRequesterNestedInput = {
    create?: XOR<FriendshipCreateWithoutRequesterInput, FriendshipUncheckedCreateWithoutRequesterInput> | FriendshipCreateWithoutRequesterInput[] | FriendshipUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: FriendshipCreateOrConnectWithoutRequesterInput | FriendshipCreateOrConnectWithoutRequesterInput[]
    upsert?: FriendshipUpsertWithWhereUniqueWithoutRequesterInput | FriendshipUpsertWithWhereUniqueWithoutRequesterInput[]
    createMany?: FriendshipCreateManyRequesterInputEnvelope
    set?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    disconnect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    delete?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    update?: FriendshipUpdateWithWhereUniqueWithoutRequesterInput | FriendshipUpdateWithWhereUniqueWithoutRequesterInput[]
    updateMany?: FriendshipUpdateManyWithWhereWithoutRequesterInput | FriendshipUpdateManyWithWhereWithoutRequesterInput[]
    deleteMany?: FriendshipScalarWhereInput | FriendshipScalarWhereInput[]
  }

  export type FriendshipUncheckedUpdateManyWithoutAddresseeNestedInput = {
    create?: XOR<FriendshipCreateWithoutAddresseeInput, FriendshipUncheckedCreateWithoutAddresseeInput> | FriendshipCreateWithoutAddresseeInput[] | FriendshipUncheckedCreateWithoutAddresseeInput[]
    connectOrCreate?: FriendshipCreateOrConnectWithoutAddresseeInput | FriendshipCreateOrConnectWithoutAddresseeInput[]
    upsert?: FriendshipUpsertWithWhereUniqueWithoutAddresseeInput | FriendshipUpsertWithWhereUniqueWithoutAddresseeInput[]
    createMany?: FriendshipCreateManyAddresseeInputEnvelope
    set?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    disconnect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    delete?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    update?: FriendshipUpdateWithWhereUniqueWithoutAddresseeInput | FriendshipUpdateWithWhereUniqueWithoutAddresseeInput[]
    updateMany?: FriendshipUpdateManyWithWhereWithoutAddresseeInput | FriendshipUpdateManyWithWhereWithoutAddresseeInput[]
    deleteMany?: FriendshipScalarWhereInput | FriendshipScalarWhereInput[]
  }

  export type RoomInviteUncheckedUpdateManyWithoutInviterNestedInput = {
    create?: XOR<RoomInviteCreateWithoutInviterInput, RoomInviteUncheckedCreateWithoutInviterInput> | RoomInviteCreateWithoutInviterInput[] | RoomInviteUncheckedCreateWithoutInviterInput[]
    connectOrCreate?: RoomInviteCreateOrConnectWithoutInviterInput | RoomInviteCreateOrConnectWithoutInviterInput[]
    upsert?: RoomInviteUpsertWithWhereUniqueWithoutInviterInput | RoomInviteUpsertWithWhereUniqueWithoutInviterInput[]
    createMany?: RoomInviteCreateManyInviterInputEnvelope
    set?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    disconnect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    delete?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    connect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    update?: RoomInviteUpdateWithWhereUniqueWithoutInviterInput | RoomInviteUpdateWithWhereUniqueWithoutInviterInput[]
    updateMany?: RoomInviteUpdateManyWithWhereWithoutInviterInput | RoomInviteUpdateManyWithWhereWithoutInviterInput[]
    deleteMany?: RoomInviteScalarWhereInput | RoomInviteScalarWhereInput[]
  }

  export type RoomInviteUncheckedUpdateManyWithoutInviteeNestedInput = {
    create?: XOR<RoomInviteCreateWithoutInviteeInput, RoomInviteUncheckedCreateWithoutInviteeInput> | RoomInviteCreateWithoutInviteeInput[] | RoomInviteUncheckedCreateWithoutInviteeInput[]
    connectOrCreate?: RoomInviteCreateOrConnectWithoutInviteeInput | RoomInviteCreateOrConnectWithoutInviteeInput[]
    upsert?: RoomInviteUpsertWithWhereUniqueWithoutInviteeInput | RoomInviteUpsertWithWhereUniqueWithoutInviteeInput[]
    createMany?: RoomInviteCreateManyInviteeInputEnvelope
    set?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    disconnect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    delete?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    connect?: RoomInviteWhereUniqueInput | RoomInviteWhereUniqueInput[]
    update?: RoomInviteUpdateWithWhereUniqueWithoutInviteeInput | RoomInviteUpdateWithWhereUniqueWithoutInviteeInput[]
    updateMany?: RoomInviteUpdateManyWithWhereWithoutInviteeInput | RoomInviteUpdateManyWithWhereWithoutInviteeInput[]
    deleteMany?: RoomInviteScalarWhereInput | RoomInviteScalarWhereInput[]
  }

  export type UserStatsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserStatsCreateWithoutUserInput, UserStatsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserStatsCreateOrConnectWithoutUserInput
    upsert?: UserStatsUpsertWithoutUserInput
    disconnect?: UserStatsWhereInput | boolean
    delete?: UserStatsWhereInput | boolean
    connect?: UserStatsWhereUniqueInput
    update?: XOR<XOR<UserStatsUpdateToOneWithWhereWithoutUserInput, UserStatsUpdateWithoutUserInput>, UserStatsUncheckedUpdateWithoutUserInput>
  }

  export type UserAchievementUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserAchievementCreateWithoutUserInput, UserAchievementUncheckedCreateWithoutUserInput> | UserAchievementCreateWithoutUserInput[] | UserAchievementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutUserInput | UserAchievementCreateOrConnectWithoutUserInput[]
    upsert?: UserAchievementUpsertWithWhereUniqueWithoutUserInput | UserAchievementUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserAchievementCreateManyUserInputEnvelope
    set?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    disconnect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    delete?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    update?: UserAchievementUpdateWithWhereUniqueWithoutUserInput | UserAchievementUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserAchievementUpdateManyWithWhereWithoutUserInput | UserAchievementUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[]
  }

  export type LeaderboardSnapshotUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<LeaderboardSnapshotCreateWithoutUserInput, LeaderboardSnapshotUncheckedCreateWithoutUserInput> | LeaderboardSnapshotCreateWithoutUserInput[] | LeaderboardSnapshotUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LeaderboardSnapshotCreateOrConnectWithoutUserInput | LeaderboardSnapshotCreateOrConnectWithoutUserInput[]
    upsert?: LeaderboardSnapshotUpsertWithWhereUniqueWithoutUserInput | LeaderboardSnapshotUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LeaderboardSnapshotCreateManyUserInputEnvelope
    set?: LeaderboardSnapshotWhereUniqueInput | LeaderboardSnapshotWhereUniqueInput[]
    disconnect?: LeaderboardSnapshotWhereUniqueInput | LeaderboardSnapshotWhereUniqueInput[]
    delete?: LeaderboardSnapshotWhereUniqueInput | LeaderboardSnapshotWhereUniqueInput[]
    connect?: LeaderboardSnapshotWhereUniqueInput | LeaderboardSnapshotWhereUniqueInput[]
    update?: LeaderboardSnapshotUpdateWithWhereUniqueWithoutUserInput | LeaderboardSnapshotUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LeaderboardSnapshotUpdateManyWithWhereWithoutUserInput | LeaderboardSnapshotUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LeaderboardSnapshotScalarWhereInput | LeaderboardSnapshotScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutFriendRequestsSentInput = {
    create?: XOR<UserCreateWithoutFriendRequestsSentInput, UserUncheckedCreateWithoutFriendRequestsSentInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriendRequestsSentInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFriendRequestsReceivedInput = {
    create?: XOR<UserCreateWithoutFriendRequestsReceivedInput, UserUncheckedCreateWithoutFriendRequestsReceivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriendRequestsReceivedInput
    connect?: UserWhereUniqueInput
  }

  export type EnumFriendshipStatusFieldUpdateOperationsInput = {
    set?: $Enums.FriendshipStatus
  }

  export type UserUpdateOneRequiredWithoutFriendRequestsSentNestedInput = {
    create?: XOR<UserCreateWithoutFriendRequestsSentInput, UserUncheckedCreateWithoutFriendRequestsSentInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriendRequestsSentInput
    upsert?: UserUpsertWithoutFriendRequestsSentInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFriendRequestsSentInput, UserUpdateWithoutFriendRequestsSentInput>, UserUncheckedUpdateWithoutFriendRequestsSentInput>
  }

  export type UserUpdateOneRequiredWithoutFriendRequestsReceivedNestedInput = {
    create?: XOR<UserCreateWithoutFriendRequestsReceivedInput, UserUncheckedCreateWithoutFriendRequestsReceivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriendRequestsReceivedInput
    upsert?: UserUpsertWithoutFriendRequestsReceivedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFriendRequestsReceivedInput, UserUpdateWithoutFriendRequestsReceivedInput>, UserUncheckedUpdateWithoutFriendRequestsReceivedInput>
  }

  export type UserCreateNestedOneWithoutInvitesSentInput = {
    create?: XOR<UserCreateWithoutInvitesSentInput, UserUncheckedCreateWithoutInvitesSentInput>
    connectOrCreate?: UserCreateOrConnectWithoutInvitesSentInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutInvitesReceivedInput = {
    create?: XOR<UserCreateWithoutInvitesReceivedInput, UserUncheckedCreateWithoutInvitesReceivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutInvitesReceivedInput
    connect?: UserWhereUniqueInput
  }

  export type EnumRoomInviteStatusFieldUpdateOperationsInput = {
    set?: $Enums.RoomInviteStatus
  }

  export type UserUpdateOneRequiredWithoutInvitesSentNestedInput = {
    create?: XOR<UserCreateWithoutInvitesSentInput, UserUncheckedCreateWithoutInvitesSentInput>
    connectOrCreate?: UserCreateOrConnectWithoutInvitesSentInput
    upsert?: UserUpsertWithoutInvitesSentInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInvitesSentInput, UserUpdateWithoutInvitesSentInput>, UserUncheckedUpdateWithoutInvitesSentInput>
  }

  export type UserUpdateOneRequiredWithoutInvitesReceivedNestedInput = {
    create?: XOR<UserCreateWithoutInvitesReceivedInput, UserUncheckedCreateWithoutInvitesReceivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutInvitesReceivedInput
    upsert?: UserUpsertWithoutInvitesReceivedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInvitesReceivedInput, UserUpdateWithoutInvitesReceivedInput>, UserUncheckedUpdateWithoutInvitesReceivedInput>
  }

  export type GameCreatesurrenderVotesInput = {
    set: string[]
  }

  export type GameCreaterematchVotesInput = {
    set: string[]
  }

  export type GameEventCreateNestedManyWithoutGameInput = {
    create?: XOR<GameEventCreateWithoutGameInput, GameEventUncheckedCreateWithoutGameInput> | GameEventCreateWithoutGameInput[] | GameEventUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GameEventCreateOrConnectWithoutGameInput | GameEventCreateOrConnectWithoutGameInput[]
    createMany?: GameEventCreateManyGameInputEnvelope
    connect?: GameEventWhereUniqueInput | GameEventWhereUniqueInput[]
  }

  export type GameEventUncheckedCreateNestedManyWithoutGameInput = {
    create?: XOR<GameEventCreateWithoutGameInput, GameEventUncheckedCreateWithoutGameInput> | GameEventCreateWithoutGameInput[] | GameEventUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GameEventCreateOrConnectWithoutGameInput | GameEventCreateOrConnectWithoutGameInput[]
    createMany?: GameEventCreateManyGameInputEnvelope
    connect?: GameEventWhereUniqueInput | GameEventWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type GameUpdatesurrenderVotesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type GameUpdaterematchVotesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type GameEventUpdateManyWithoutGameNestedInput = {
    create?: XOR<GameEventCreateWithoutGameInput, GameEventUncheckedCreateWithoutGameInput> | GameEventCreateWithoutGameInput[] | GameEventUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GameEventCreateOrConnectWithoutGameInput | GameEventCreateOrConnectWithoutGameInput[]
    upsert?: GameEventUpsertWithWhereUniqueWithoutGameInput | GameEventUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: GameEventCreateManyGameInputEnvelope
    set?: GameEventWhereUniqueInput | GameEventWhereUniqueInput[]
    disconnect?: GameEventWhereUniqueInput | GameEventWhereUniqueInput[]
    delete?: GameEventWhereUniqueInput | GameEventWhereUniqueInput[]
    connect?: GameEventWhereUniqueInput | GameEventWhereUniqueInput[]
    update?: GameEventUpdateWithWhereUniqueWithoutGameInput | GameEventUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: GameEventUpdateManyWithWhereWithoutGameInput | GameEventUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: GameEventScalarWhereInput | GameEventScalarWhereInput[]
  }

  export type GameEventUncheckedUpdateManyWithoutGameNestedInput = {
    create?: XOR<GameEventCreateWithoutGameInput, GameEventUncheckedCreateWithoutGameInput> | GameEventCreateWithoutGameInput[] | GameEventUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GameEventCreateOrConnectWithoutGameInput | GameEventCreateOrConnectWithoutGameInput[]
    upsert?: GameEventUpsertWithWhereUniqueWithoutGameInput | GameEventUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: GameEventCreateManyGameInputEnvelope
    set?: GameEventWhereUniqueInput | GameEventWhereUniqueInput[]
    disconnect?: GameEventWhereUniqueInput | GameEventWhereUniqueInput[]
    delete?: GameEventWhereUniqueInput | GameEventWhereUniqueInput[]
    connect?: GameEventWhereUniqueInput | GameEventWhereUniqueInput[]
    update?: GameEventUpdateWithWhereUniqueWithoutGameInput | GameEventUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: GameEventUpdateManyWithWhereWithoutGameInput | GameEventUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: GameEventScalarWhereInput | GameEventScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GameCreateNestedOneWithoutEventsInput = {
    create?: XOR<GameCreateWithoutEventsInput, GameUncheckedCreateWithoutEventsInput>
    connectOrCreate?: GameCreateOrConnectWithoutEventsInput
    connect?: GameWhereUniqueInput
  }

  export type GameUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<GameCreateWithoutEventsInput, GameUncheckedCreateWithoutEventsInput>
    connectOrCreate?: GameCreateOrConnectWithoutEventsInput
    upsert?: GameUpsertWithoutEventsInput
    connect?: GameWhereUniqueInput
    update?: XOR<XOR<GameUpdateToOneWithWhereWithoutEventsInput, GameUpdateWithoutEventsInput>, GameUncheckedUpdateWithoutEventsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserCreateNestedOneWithoutStatsInput = {
    create?: XOR<UserCreateWithoutStatsInput, UserUncheckedCreateWithoutStatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutStatsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutStatsNestedInput = {
    create?: XOR<UserCreateWithoutStatsInput, UserUncheckedCreateWithoutStatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutStatsInput
    upsert?: UserUpsertWithoutStatsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStatsInput, UserUpdateWithoutStatsInput>, UserUncheckedUpdateWithoutStatsInput>
  }

  export type UserAchievementCreateNestedManyWithoutAchievementInput = {
    create?: XOR<UserAchievementCreateWithoutAchievementInput, UserAchievementUncheckedCreateWithoutAchievementInput> | UserAchievementCreateWithoutAchievementInput[] | UserAchievementUncheckedCreateWithoutAchievementInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutAchievementInput | UserAchievementCreateOrConnectWithoutAchievementInput[]
    createMany?: UserAchievementCreateManyAchievementInputEnvelope
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
  }

  export type UserAchievementUncheckedCreateNestedManyWithoutAchievementInput = {
    create?: XOR<UserAchievementCreateWithoutAchievementInput, UserAchievementUncheckedCreateWithoutAchievementInput> | UserAchievementCreateWithoutAchievementInput[] | UserAchievementUncheckedCreateWithoutAchievementInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutAchievementInput | UserAchievementCreateOrConnectWithoutAchievementInput[]
    createMany?: UserAchievementCreateManyAchievementInputEnvelope
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
  }

  export type EnumAchievementTypeFieldUpdateOperationsInput = {
    set?: $Enums.AchievementType
  }

  export type UserAchievementUpdateManyWithoutAchievementNestedInput = {
    create?: XOR<UserAchievementCreateWithoutAchievementInput, UserAchievementUncheckedCreateWithoutAchievementInput> | UserAchievementCreateWithoutAchievementInput[] | UserAchievementUncheckedCreateWithoutAchievementInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutAchievementInput | UserAchievementCreateOrConnectWithoutAchievementInput[]
    upsert?: UserAchievementUpsertWithWhereUniqueWithoutAchievementInput | UserAchievementUpsertWithWhereUniqueWithoutAchievementInput[]
    createMany?: UserAchievementCreateManyAchievementInputEnvelope
    set?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    disconnect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    delete?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    update?: UserAchievementUpdateWithWhereUniqueWithoutAchievementInput | UserAchievementUpdateWithWhereUniqueWithoutAchievementInput[]
    updateMany?: UserAchievementUpdateManyWithWhereWithoutAchievementInput | UserAchievementUpdateManyWithWhereWithoutAchievementInput[]
    deleteMany?: UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[]
  }

  export type UserAchievementUncheckedUpdateManyWithoutAchievementNestedInput = {
    create?: XOR<UserAchievementCreateWithoutAchievementInput, UserAchievementUncheckedCreateWithoutAchievementInput> | UserAchievementCreateWithoutAchievementInput[] | UserAchievementUncheckedCreateWithoutAchievementInput[]
    connectOrCreate?: UserAchievementCreateOrConnectWithoutAchievementInput | UserAchievementCreateOrConnectWithoutAchievementInput[]
    upsert?: UserAchievementUpsertWithWhereUniqueWithoutAchievementInput | UserAchievementUpsertWithWhereUniqueWithoutAchievementInput[]
    createMany?: UserAchievementCreateManyAchievementInputEnvelope
    set?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    disconnect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    delete?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    connect?: UserAchievementWhereUniqueInput | UserAchievementWhereUniqueInput[]
    update?: UserAchievementUpdateWithWhereUniqueWithoutAchievementInput | UserAchievementUpdateWithWhereUniqueWithoutAchievementInput[]
    updateMany?: UserAchievementUpdateManyWithWhereWithoutAchievementInput | UserAchievementUpdateManyWithWhereWithoutAchievementInput[]
    deleteMany?: UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAchievementsInput = {
    create?: XOR<UserCreateWithoutAchievementsInput, UserUncheckedCreateWithoutAchievementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAchievementsInput
    connect?: UserWhereUniqueInput
  }

  export type AchievementCreateNestedOneWithoutUnlockedByInput = {
    create?: XOR<AchievementCreateWithoutUnlockedByInput, AchievementUncheckedCreateWithoutUnlockedByInput>
    connectOrCreate?: AchievementCreateOrConnectWithoutUnlockedByInput
    connect?: AchievementWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAchievementsNestedInput = {
    create?: XOR<UserCreateWithoutAchievementsInput, UserUncheckedCreateWithoutAchievementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAchievementsInput
    upsert?: UserUpsertWithoutAchievementsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAchievementsInput, UserUpdateWithoutAchievementsInput>, UserUncheckedUpdateWithoutAchievementsInput>
  }

  export type AchievementUpdateOneRequiredWithoutUnlockedByNestedInput = {
    create?: XOR<AchievementCreateWithoutUnlockedByInput, AchievementUncheckedCreateWithoutUnlockedByInput>
    connectOrCreate?: AchievementCreateOrConnectWithoutUnlockedByInput
    upsert?: AchievementUpsertWithoutUnlockedByInput
    connect?: AchievementWhereUniqueInput
    update?: XOR<XOR<AchievementUpdateToOneWithWhereWithoutUnlockedByInput, AchievementUpdateWithoutUnlockedByInput>, AchievementUncheckedUpdateWithoutUnlockedByInput>
  }

  export type UserCreateNestedOneWithoutLeaderboardEntriesInput = {
    create?: XOR<UserCreateWithoutLeaderboardEntriesInput, UserUncheckedCreateWithoutLeaderboardEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutLeaderboardEntriesInput
    connect?: UserWhereUniqueInput
  }

  export type EnumLeaderboardCategoryFieldUpdateOperationsInput = {
    set?: $Enums.LeaderboardCategory
  }

  export type EnumLeaderboardPeriodFieldUpdateOperationsInput = {
    set?: $Enums.LeaderboardPeriod
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutLeaderboardEntriesNestedInput = {
    create?: XOR<UserCreateWithoutLeaderboardEntriesInput, UserUncheckedCreateWithoutLeaderboardEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutLeaderboardEntriesInput
    upsert?: UserUpsertWithoutLeaderboardEntriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLeaderboardEntriesInput, UserUpdateWithoutLeaderboardEntriesInput>, UserUncheckedUpdateWithoutLeaderboardEntriesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumFriendshipStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FriendshipStatus | EnumFriendshipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FriendshipStatus[] | ListEnumFriendshipStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FriendshipStatus[] | ListEnumFriendshipStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFriendshipStatusFilter<$PrismaModel> | $Enums.FriendshipStatus
  }

  export type NestedEnumFriendshipStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FriendshipStatus | EnumFriendshipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FriendshipStatus[] | ListEnumFriendshipStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FriendshipStatus[] | ListEnumFriendshipStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFriendshipStatusWithAggregatesFilter<$PrismaModel> | $Enums.FriendshipStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFriendshipStatusFilter<$PrismaModel>
    _max?: NestedEnumFriendshipStatusFilter<$PrismaModel>
  }

  export type NestedEnumRoomInviteStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomInviteStatus | EnumRoomInviteStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RoomInviteStatus[] | ListEnumRoomInviteStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomInviteStatus[] | ListEnumRoomInviteStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomInviteStatusFilter<$PrismaModel> | $Enums.RoomInviteStatus
  }

  export type NestedEnumRoomInviteStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoomInviteStatus | EnumRoomInviteStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RoomInviteStatus[] | ListEnumRoomInviteStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoomInviteStatus[] | ListEnumRoomInviteStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRoomInviteStatusWithAggregatesFilter<$PrismaModel> | $Enums.RoomInviteStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoomInviteStatusFilter<$PrismaModel>
    _max?: NestedEnumRoomInviteStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumAchievementTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AchievementType | EnumAchievementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AchievementType[] | ListEnumAchievementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AchievementType[] | ListEnumAchievementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAchievementTypeFilter<$PrismaModel> | $Enums.AchievementType
  }

  export type NestedEnumAchievementTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AchievementType | EnumAchievementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AchievementType[] | ListEnumAchievementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AchievementType[] | ListEnumAchievementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAchievementTypeWithAggregatesFilter<$PrismaModel> | $Enums.AchievementType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAchievementTypeFilter<$PrismaModel>
    _max?: NestedEnumAchievementTypeFilter<$PrismaModel>
  }

  export type NestedEnumLeaderboardCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaderboardCategory | EnumLeaderboardCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.LeaderboardCategory[] | ListEnumLeaderboardCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaderboardCategory[] | ListEnumLeaderboardCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaderboardCategoryFilter<$PrismaModel> | $Enums.LeaderboardCategory
  }

  export type NestedEnumLeaderboardPeriodFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaderboardPeriod | EnumLeaderboardPeriodFieldRefInput<$PrismaModel>
    in?: $Enums.LeaderboardPeriod[] | ListEnumLeaderboardPeriodFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaderboardPeriod[] | ListEnumLeaderboardPeriodFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaderboardPeriodFilter<$PrismaModel> | $Enums.LeaderboardPeriod
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumLeaderboardCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaderboardCategory | EnumLeaderboardCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.LeaderboardCategory[] | ListEnumLeaderboardCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaderboardCategory[] | ListEnumLeaderboardCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaderboardCategoryWithAggregatesFilter<$PrismaModel> | $Enums.LeaderboardCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLeaderboardCategoryFilter<$PrismaModel>
    _max?: NestedEnumLeaderboardCategoryFilter<$PrismaModel>
  }

  export type NestedEnumLeaderboardPeriodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaderboardPeriod | EnumLeaderboardPeriodFieldRefInput<$PrismaModel>
    in?: $Enums.LeaderboardPeriod[] | ListEnumLeaderboardPeriodFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaderboardPeriod[] | ListEnumLeaderboardPeriodFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaderboardPeriodWithAggregatesFilter<$PrismaModel> | $Enums.LeaderboardPeriod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLeaderboardPeriodFilter<$PrismaModel>
    _max?: NestedEnumLeaderboardPeriodFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FriendshipCreateWithoutRequesterInput = {
    id?: string
    status?: $Enums.FriendshipStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    addressee: UserCreateNestedOneWithoutFriendRequestsReceivedInput
  }

  export type FriendshipUncheckedCreateWithoutRequesterInput = {
    id?: string
    addresseeId: string
    status?: $Enums.FriendshipStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendshipCreateOrConnectWithoutRequesterInput = {
    where: FriendshipWhereUniqueInput
    create: XOR<FriendshipCreateWithoutRequesterInput, FriendshipUncheckedCreateWithoutRequesterInput>
  }

  export type FriendshipCreateManyRequesterInputEnvelope = {
    data: FriendshipCreateManyRequesterInput | FriendshipCreateManyRequesterInput[]
    skipDuplicates?: boolean
  }

  export type FriendshipCreateWithoutAddresseeInput = {
    id?: string
    status?: $Enums.FriendshipStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    requester: UserCreateNestedOneWithoutFriendRequestsSentInput
  }

  export type FriendshipUncheckedCreateWithoutAddresseeInput = {
    id?: string
    requesterId: string
    status?: $Enums.FriendshipStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendshipCreateOrConnectWithoutAddresseeInput = {
    where: FriendshipWhereUniqueInput
    create: XOR<FriendshipCreateWithoutAddresseeInput, FriendshipUncheckedCreateWithoutAddresseeInput>
  }

  export type FriendshipCreateManyAddresseeInputEnvelope = {
    data: FriendshipCreateManyAddresseeInput | FriendshipCreateManyAddresseeInput[]
    skipDuplicates?: boolean
  }

  export type RoomInviteCreateWithoutInviterInput = {
    id?: string
    roomId: string
    status?: $Enums.RoomInviteStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    expiresAt: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    invitee: UserCreateNestedOneWithoutInvitesReceivedInput
  }

  export type RoomInviteUncheckedCreateWithoutInviterInput = {
    id?: string
    roomId: string
    inviteeId: string
    status?: $Enums.RoomInviteStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    expiresAt: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RoomInviteCreateOrConnectWithoutInviterInput = {
    where: RoomInviteWhereUniqueInput
    create: XOR<RoomInviteCreateWithoutInviterInput, RoomInviteUncheckedCreateWithoutInviterInput>
  }

  export type RoomInviteCreateManyInviterInputEnvelope = {
    data: RoomInviteCreateManyInviterInput | RoomInviteCreateManyInviterInput[]
    skipDuplicates?: boolean
  }

  export type RoomInviteCreateWithoutInviteeInput = {
    id?: string
    roomId: string
    status?: $Enums.RoomInviteStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    expiresAt: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    inviter: UserCreateNestedOneWithoutInvitesSentInput
  }

  export type RoomInviteUncheckedCreateWithoutInviteeInput = {
    id?: string
    roomId: string
    inviterId: string
    status?: $Enums.RoomInviteStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    expiresAt: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RoomInviteCreateOrConnectWithoutInviteeInput = {
    where: RoomInviteWhereUniqueInput
    create: XOR<RoomInviteCreateWithoutInviteeInput, RoomInviteUncheckedCreateWithoutInviteeInput>
  }

  export type RoomInviteCreateManyInviteeInputEnvelope = {
    data: RoomInviteCreateManyInviteeInput | RoomInviteCreateManyInviteeInput[]
    skipDuplicates?: boolean
  }

  export type UserStatsCreateWithoutUserInput = {
    id?: string
    gamesPlayed?: number
    soloWins?: number
    duoWins?: number
    pointsTaken?: number
    zingsMade?: number
    gamesHosted?: number
    friendsAdded?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserStatsUncheckedCreateWithoutUserInput = {
    id?: string
    gamesPlayed?: number
    soloWins?: number
    duoWins?: number
    pointsTaken?: number
    zingsMade?: number
    gamesHosted?: number
    friendsAdded?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserStatsCreateOrConnectWithoutUserInput = {
    where: UserStatsWhereUniqueInput
    create: XOR<UserStatsCreateWithoutUserInput, UserStatsUncheckedCreateWithoutUserInput>
  }

  export type UserAchievementCreateWithoutUserInput = {
    id?: string
    unlockedAt?: Date | string
    achievement: AchievementCreateNestedOneWithoutUnlockedByInput
  }

  export type UserAchievementUncheckedCreateWithoutUserInput = {
    id?: string
    achievementId: string
    unlockedAt?: Date | string
  }

  export type UserAchievementCreateOrConnectWithoutUserInput = {
    where: UserAchievementWhereUniqueInput
    create: XOR<UserAchievementCreateWithoutUserInput, UserAchievementUncheckedCreateWithoutUserInput>
  }

  export type UserAchievementCreateManyUserInputEnvelope = {
    data: UserAchievementCreateManyUserInput | UserAchievementCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type LeaderboardSnapshotCreateWithoutUserInput = {
    id?: string
    username: string
    category: $Enums.LeaderboardCategory
    period: $Enums.LeaderboardPeriod
    value: number
    weekStart?: Date | string | null
    monthStart?: Date | string | null
    yearStart?: Date | string | null
    rank?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeaderboardSnapshotUncheckedCreateWithoutUserInput = {
    id?: string
    username: string
    category: $Enums.LeaderboardCategory
    period: $Enums.LeaderboardPeriod
    value: number
    weekStart?: Date | string | null
    monthStart?: Date | string | null
    yearStart?: Date | string | null
    rank?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeaderboardSnapshotCreateOrConnectWithoutUserInput = {
    where: LeaderboardSnapshotWhereUniqueInput
    create: XOR<LeaderboardSnapshotCreateWithoutUserInput, LeaderboardSnapshotUncheckedCreateWithoutUserInput>
  }

  export type LeaderboardSnapshotCreateManyUserInputEnvelope = {
    data: LeaderboardSnapshotCreateManyUserInput | LeaderboardSnapshotCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FriendshipUpsertWithWhereUniqueWithoutRequesterInput = {
    where: FriendshipWhereUniqueInput
    update: XOR<FriendshipUpdateWithoutRequesterInput, FriendshipUncheckedUpdateWithoutRequesterInput>
    create: XOR<FriendshipCreateWithoutRequesterInput, FriendshipUncheckedCreateWithoutRequesterInput>
  }

  export type FriendshipUpdateWithWhereUniqueWithoutRequesterInput = {
    where: FriendshipWhereUniqueInput
    data: XOR<FriendshipUpdateWithoutRequesterInput, FriendshipUncheckedUpdateWithoutRequesterInput>
  }

  export type FriendshipUpdateManyWithWhereWithoutRequesterInput = {
    where: FriendshipScalarWhereInput
    data: XOR<FriendshipUpdateManyMutationInput, FriendshipUncheckedUpdateManyWithoutRequesterInput>
  }

  export type FriendshipScalarWhereInput = {
    AND?: FriendshipScalarWhereInput | FriendshipScalarWhereInput[]
    OR?: FriendshipScalarWhereInput[]
    NOT?: FriendshipScalarWhereInput | FriendshipScalarWhereInput[]
    id?: StringFilter<"Friendship"> | string
    requesterId?: StringFilter<"Friendship"> | string
    addresseeId?: StringFilter<"Friendship"> | string
    status?: EnumFriendshipStatusFilter<"Friendship"> | $Enums.FriendshipStatus
    createdAt?: DateTimeFilter<"Friendship"> | Date | string
    updatedAt?: DateTimeFilter<"Friendship"> | Date | string
  }

  export type FriendshipUpsertWithWhereUniqueWithoutAddresseeInput = {
    where: FriendshipWhereUniqueInput
    update: XOR<FriendshipUpdateWithoutAddresseeInput, FriendshipUncheckedUpdateWithoutAddresseeInput>
    create: XOR<FriendshipCreateWithoutAddresseeInput, FriendshipUncheckedCreateWithoutAddresseeInput>
  }

  export type FriendshipUpdateWithWhereUniqueWithoutAddresseeInput = {
    where: FriendshipWhereUniqueInput
    data: XOR<FriendshipUpdateWithoutAddresseeInput, FriendshipUncheckedUpdateWithoutAddresseeInput>
  }

  export type FriendshipUpdateManyWithWhereWithoutAddresseeInput = {
    where: FriendshipScalarWhereInput
    data: XOR<FriendshipUpdateManyMutationInput, FriendshipUncheckedUpdateManyWithoutAddresseeInput>
  }

  export type RoomInviteUpsertWithWhereUniqueWithoutInviterInput = {
    where: RoomInviteWhereUniqueInput
    update: XOR<RoomInviteUpdateWithoutInviterInput, RoomInviteUncheckedUpdateWithoutInviterInput>
    create: XOR<RoomInviteCreateWithoutInviterInput, RoomInviteUncheckedCreateWithoutInviterInput>
  }

  export type RoomInviteUpdateWithWhereUniqueWithoutInviterInput = {
    where: RoomInviteWhereUniqueInput
    data: XOR<RoomInviteUpdateWithoutInviterInput, RoomInviteUncheckedUpdateWithoutInviterInput>
  }

  export type RoomInviteUpdateManyWithWhereWithoutInviterInput = {
    where: RoomInviteScalarWhereInput
    data: XOR<RoomInviteUpdateManyMutationInput, RoomInviteUncheckedUpdateManyWithoutInviterInput>
  }

  export type RoomInviteScalarWhereInput = {
    AND?: RoomInviteScalarWhereInput | RoomInviteScalarWhereInput[]
    OR?: RoomInviteScalarWhereInput[]
    NOT?: RoomInviteScalarWhereInput | RoomInviteScalarWhereInput[]
    id?: StringFilter<"RoomInvite"> | string
    roomId?: StringFilter<"RoomInvite"> | string
    inviterId?: StringFilter<"RoomInvite"> | string
    inviteeId?: StringFilter<"RoomInvite"> | string
    status?: EnumRoomInviteStatusFilter<"RoomInvite"> | $Enums.RoomInviteStatus
    createdAt?: DateTimeFilter<"RoomInvite"> | Date | string
    updatedAt?: DateTimeFilter<"RoomInvite"> | Date | string
    expiresAt?: DateTimeFilter<"RoomInvite"> | Date | string
    metadata?: JsonNullableFilter<"RoomInvite">
  }

  export type RoomInviteUpsertWithWhereUniqueWithoutInviteeInput = {
    where: RoomInviteWhereUniqueInput
    update: XOR<RoomInviteUpdateWithoutInviteeInput, RoomInviteUncheckedUpdateWithoutInviteeInput>
    create: XOR<RoomInviteCreateWithoutInviteeInput, RoomInviteUncheckedCreateWithoutInviteeInput>
  }

  export type RoomInviteUpdateWithWhereUniqueWithoutInviteeInput = {
    where: RoomInviteWhereUniqueInput
    data: XOR<RoomInviteUpdateWithoutInviteeInput, RoomInviteUncheckedUpdateWithoutInviteeInput>
  }

  export type RoomInviteUpdateManyWithWhereWithoutInviteeInput = {
    where: RoomInviteScalarWhereInput
    data: XOR<RoomInviteUpdateManyMutationInput, RoomInviteUncheckedUpdateManyWithoutInviteeInput>
  }

  export type UserStatsUpsertWithoutUserInput = {
    update: XOR<UserStatsUpdateWithoutUserInput, UserStatsUncheckedUpdateWithoutUserInput>
    create: XOR<UserStatsCreateWithoutUserInput, UserStatsUncheckedCreateWithoutUserInput>
    where?: UserStatsWhereInput
  }

  export type UserStatsUpdateToOneWithWhereWithoutUserInput = {
    where?: UserStatsWhereInput
    data: XOR<UserStatsUpdateWithoutUserInput, UserStatsUncheckedUpdateWithoutUserInput>
  }

  export type UserStatsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    gamesPlayed?: IntFieldUpdateOperationsInput | number
    soloWins?: IntFieldUpdateOperationsInput | number
    duoWins?: IntFieldUpdateOperationsInput | number
    pointsTaken?: IntFieldUpdateOperationsInput | number
    zingsMade?: IntFieldUpdateOperationsInput | number
    gamesHosted?: IntFieldUpdateOperationsInput | number
    friendsAdded?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserStatsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    gamesPlayed?: IntFieldUpdateOperationsInput | number
    soloWins?: IntFieldUpdateOperationsInput | number
    duoWins?: IntFieldUpdateOperationsInput | number
    pointsTaken?: IntFieldUpdateOperationsInput | number
    zingsMade?: IntFieldUpdateOperationsInput | number
    gamesHosted?: IntFieldUpdateOperationsInput | number
    friendsAdded?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAchievementUpsertWithWhereUniqueWithoutUserInput = {
    where: UserAchievementWhereUniqueInput
    update: XOR<UserAchievementUpdateWithoutUserInput, UserAchievementUncheckedUpdateWithoutUserInput>
    create: XOR<UserAchievementCreateWithoutUserInput, UserAchievementUncheckedCreateWithoutUserInput>
  }

  export type UserAchievementUpdateWithWhereUniqueWithoutUserInput = {
    where: UserAchievementWhereUniqueInput
    data: XOR<UserAchievementUpdateWithoutUserInput, UserAchievementUncheckedUpdateWithoutUserInput>
  }

  export type UserAchievementUpdateManyWithWhereWithoutUserInput = {
    where: UserAchievementScalarWhereInput
    data: XOR<UserAchievementUpdateManyMutationInput, UserAchievementUncheckedUpdateManyWithoutUserInput>
  }

  export type UserAchievementScalarWhereInput = {
    AND?: UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[]
    OR?: UserAchievementScalarWhereInput[]
    NOT?: UserAchievementScalarWhereInput | UserAchievementScalarWhereInput[]
    id?: StringFilter<"UserAchievement"> | string
    userId?: StringFilter<"UserAchievement"> | string
    achievementId?: StringFilter<"UserAchievement"> | string
    unlockedAt?: DateTimeFilter<"UserAchievement"> | Date | string
  }

  export type LeaderboardSnapshotUpsertWithWhereUniqueWithoutUserInput = {
    where: LeaderboardSnapshotWhereUniqueInput
    update: XOR<LeaderboardSnapshotUpdateWithoutUserInput, LeaderboardSnapshotUncheckedUpdateWithoutUserInput>
    create: XOR<LeaderboardSnapshotCreateWithoutUserInput, LeaderboardSnapshotUncheckedCreateWithoutUserInput>
  }

  export type LeaderboardSnapshotUpdateWithWhereUniqueWithoutUserInput = {
    where: LeaderboardSnapshotWhereUniqueInput
    data: XOR<LeaderboardSnapshotUpdateWithoutUserInput, LeaderboardSnapshotUncheckedUpdateWithoutUserInput>
  }

  export type LeaderboardSnapshotUpdateManyWithWhereWithoutUserInput = {
    where: LeaderboardSnapshotScalarWhereInput
    data: XOR<LeaderboardSnapshotUpdateManyMutationInput, LeaderboardSnapshotUncheckedUpdateManyWithoutUserInput>
  }

  export type LeaderboardSnapshotScalarWhereInput = {
    AND?: LeaderboardSnapshotScalarWhereInput | LeaderboardSnapshotScalarWhereInput[]
    OR?: LeaderboardSnapshotScalarWhereInput[]
    NOT?: LeaderboardSnapshotScalarWhereInput | LeaderboardSnapshotScalarWhereInput[]
    id?: StringFilter<"LeaderboardSnapshot"> | string
    userId?: StringFilter<"LeaderboardSnapshot"> | string
    username?: StringFilter<"LeaderboardSnapshot"> | string
    category?: EnumLeaderboardCategoryFilter<"LeaderboardSnapshot"> | $Enums.LeaderboardCategory
    period?: EnumLeaderboardPeriodFilter<"LeaderboardSnapshot"> | $Enums.LeaderboardPeriod
    value?: IntFilter<"LeaderboardSnapshot"> | number
    weekStart?: DateTimeNullableFilter<"LeaderboardSnapshot"> | Date | string | null
    monthStart?: DateTimeNullableFilter<"LeaderboardSnapshot"> | Date | string | null
    yearStart?: DateTimeNullableFilter<"LeaderboardSnapshot"> | Date | string | null
    rank?: IntNullableFilter<"LeaderboardSnapshot"> | number | null
    createdAt?: DateTimeFilter<"LeaderboardSnapshot"> | Date | string
    updatedAt?: DateTimeFilter<"LeaderboardSnapshot"> | Date | string
  }

  export type UserCreateWithoutFriendRequestsSentInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    friendRequestsReceived?: FriendshipCreateNestedManyWithoutAddresseeInput
    invitesSent?: RoomInviteCreateNestedManyWithoutInviterInput
    invitesReceived?: RoomInviteCreateNestedManyWithoutInviteeInput
    stats?: UserStatsCreateNestedOneWithoutUserInput
    achievements?: UserAchievementCreateNestedManyWithoutUserInput
    leaderboardEntries?: LeaderboardSnapshotCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFriendRequestsSentInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    friendRequestsReceived?: FriendshipUncheckedCreateNestedManyWithoutAddresseeInput
    invitesSent?: RoomInviteUncheckedCreateNestedManyWithoutInviterInput
    invitesReceived?: RoomInviteUncheckedCreateNestedManyWithoutInviteeInput
    stats?: UserStatsUncheckedCreateNestedOneWithoutUserInput
    achievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput
    leaderboardEntries?: LeaderboardSnapshotUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFriendRequestsSentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFriendRequestsSentInput, UserUncheckedCreateWithoutFriendRequestsSentInput>
  }

  export type UserCreateWithoutFriendRequestsReceivedInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    friendRequestsSent?: FriendshipCreateNestedManyWithoutRequesterInput
    invitesSent?: RoomInviteCreateNestedManyWithoutInviterInput
    invitesReceived?: RoomInviteCreateNestedManyWithoutInviteeInput
    stats?: UserStatsCreateNestedOneWithoutUserInput
    achievements?: UserAchievementCreateNestedManyWithoutUserInput
    leaderboardEntries?: LeaderboardSnapshotCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFriendRequestsReceivedInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    friendRequestsSent?: FriendshipUncheckedCreateNestedManyWithoutRequesterInput
    invitesSent?: RoomInviteUncheckedCreateNestedManyWithoutInviterInput
    invitesReceived?: RoomInviteUncheckedCreateNestedManyWithoutInviteeInput
    stats?: UserStatsUncheckedCreateNestedOneWithoutUserInput
    achievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput
    leaderboardEntries?: LeaderboardSnapshotUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFriendRequestsReceivedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFriendRequestsReceivedInput, UserUncheckedCreateWithoutFriendRequestsReceivedInput>
  }

  export type UserUpsertWithoutFriendRequestsSentInput = {
    update: XOR<UserUpdateWithoutFriendRequestsSentInput, UserUncheckedUpdateWithoutFriendRequestsSentInput>
    create: XOR<UserCreateWithoutFriendRequestsSentInput, UserUncheckedCreateWithoutFriendRequestsSentInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFriendRequestsSentInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFriendRequestsSentInput, UserUncheckedUpdateWithoutFriendRequestsSentInput>
  }

  export type UserUpdateWithoutFriendRequestsSentInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    friendRequestsReceived?: FriendshipUpdateManyWithoutAddresseeNestedInput
    invitesSent?: RoomInviteUpdateManyWithoutInviterNestedInput
    invitesReceived?: RoomInviteUpdateManyWithoutInviteeNestedInput
    stats?: UserStatsUpdateOneWithoutUserNestedInput
    achievements?: UserAchievementUpdateManyWithoutUserNestedInput
    leaderboardEntries?: LeaderboardSnapshotUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFriendRequestsSentInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    friendRequestsReceived?: FriendshipUncheckedUpdateManyWithoutAddresseeNestedInput
    invitesSent?: RoomInviteUncheckedUpdateManyWithoutInviterNestedInput
    invitesReceived?: RoomInviteUncheckedUpdateManyWithoutInviteeNestedInput
    stats?: UserStatsUncheckedUpdateOneWithoutUserNestedInput
    achievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput
    leaderboardEntries?: LeaderboardSnapshotUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutFriendRequestsReceivedInput = {
    update: XOR<UserUpdateWithoutFriendRequestsReceivedInput, UserUncheckedUpdateWithoutFriendRequestsReceivedInput>
    create: XOR<UserCreateWithoutFriendRequestsReceivedInput, UserUncheckedCreateWithoutFriendRequestsReceivedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFriendRequestsReceivedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFriendRequestsReceivedInput, UserUncheckedUpdateWithoutFriendRequestsReceivedInput>
  }

  export type UserUpdateWithoutFriendRequestsReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    friendRequestsSent?: FriendshipUpdateManyWithoutRequesterNestedInput
    invitesSent?: RoomInviteUpdateManyWithoutInviterNestedInput
    invitesReceived?: RoomInviteUpdateManyWithoutInviteeNestedInput
    stats?: UserStatsUpdateOneWithoutUserNestedInput
    achievements?: UserAchievementUpdateManyWithoutUserNestedInput
    leaderboardEntries?: LeaderboardSnapshotUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFriendRequestsReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    friendRequestsSent?: FriendshipUncheckedUpdateManyWithoutRequesterNestedInput
    invitesSent?: RoomInviteUncheckedUpdateManyWithoutInviterNestedInput
    invitesReceived?: RoomInviteUncheckedUpdateManyWithoutInviteeNestedInput
    stats?: UserStatsUncheckedUpdateOneWithoutUserNestedInput
    achievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput
    leaderboardEntries?: LeaderboardSnapshotUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutInvitesSentInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    friendRequestsSent?: FriendshipCreateNestedManyWithoutRequesterInput
    friendRequestsReceived?: FriendshipCreateNestedManyWithoutAddresseeInput
    invitesReceived?: RoomInviteCreateNestedManyWithoutInviteeInput
    stats?: UserStatsCreateNestedOneWithoutUserInput
    achievements?: UserAchievementCreateNestedManyWithoutUserInput
    leaderboardEntries?: LeaderboardSnapshotCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutInvitesSentInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    friendRequestsSent?: FriendshipUncheckedCreateNestedManyWithoutRequesterInput
    friendRequestsReceived?: FriendshipUncheckedCreateNestedManyWithoutAddresseeInput
    invitesReceived?: RoomInviteUncheckedCreateNestedManyWithoutInviteeInput
    stats?: UserStatsUncheckedCreateNestedOneWithoutUserInput
    achievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput
    leaderboardEntries?: LeaderboardSnapshotUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutInvitesSentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInvitesSentInput, UserUncheckedCreateWithoutInvitesSentInput>
  }

  export type UserCreateWithoutInvitesReceivedInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    friendRequestsSent?: FriendshipCreateNestedManyWithoutRequesterInput
    friendRequestsReceived?: FriendshipCreateNestedManyWithoutAddresseeInput
    invitesSent?: RoomInviteCreateNestedManyWithoutInviterInput
    stats?: UserStatsCreateNestedOneWithoutUserInput
    achievements?: UserAchievementCreateNestedManyWithoutUserInput
    leaderboardEntries?: LeaderboardSnapshotCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutInvitesReceivedInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    friendRequestsSent?: FriendshipUncheckedCreateNestedManyWithoutRequesterInput
    friendRequestsReceived?: FriendshipUncheckedCreateNestedManyWithoutAddresseeInput
    invitesSent?: RoomInviteUncheckedCreateNestedManyWithoutInviterInput
    stats?: UserStatsUncheckedCreateNestedOneWithoutUserInput
    achievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput
    leaderboardEntries?: LeaderboardSnapshotUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutInvitesReceivedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInvitesReceivedInput, UserUncheckedCreateWithoutInvitesReceivedInput>
  }

  export type UserUpsertWithoutInvitesSentInput = {
    update: XOR<UserUpdateWithoutInvitesSentInput, UserUncheckedUpdateWithoutInvitesSentInput>
    create: XOR<UserCreateWithoutInvitesSentInput, UserUncheckedCreateWithoutInvitesSentInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInvitesSentInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInvitesSentInput, UserUncheckedUpdateWithoutInvitesSentInput>
  }

  export type UserUpdateWithoutInvitesSentInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    friendRequestsSent?: FriendshipUpdateManyWithoutRequesterNestedInput
    friendRequestsReceived?: FriendshipUpdateManyWithoutAddresseeNestedInput
    invitesReceived?: RoomInviteUpdateManyWithoutInviteeNestedInput
    stats?: UserStatsUpdateOneWithoutUserNestedInput
    achievements?: UserAchievementUpdateManyWithoutUserNestedInput
    leaderboardEntries?: LeaderboardSnapshotUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutInvitesSentInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    friendRequestsSent?: FriendshipUncheckedUpdateManyWithoutRequesterNestedInput
    friendRequestsReceived?: FriendshipUncheckedUpdateManyWithoutAddresseeNestedInput
    invitesReceived?: RoomInviteUncheckedUpdateManyWithoutInviteeNestedInput
    stats?: UserStatsUncheckedUpdateOneWithoutUserNestedInput
    achievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput
    leaderboardEntries?: LeaderboardSnapshotUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutInvitesReceivedInput = {
    update: XOR<UserUpdateWithoutInvitesReceivedInput, UserUncheckedUpdateWithoutInvitesReceivedInput>
    create: XOR<UserCreateWithoutInvitesReceivedInput, UserUncheckedCreateWithoutInvitesReceivedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInvitesReceivedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInvitesReceivedInput, UserUncheckedUpdateWithoutInvitesReceivedInput>
  }

  export type UserUpdateWithoutInvitesReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    friendRequestsSent?: FriendshipUpdateManyWithoutRequesterNestedInput
    friendRequestsReceived?: FriendshipUpdateManyWithoutAddresseeNestedInput
    invitesSent?: RoomInviteUpdateManyWithoutInviterNestedInput
    stats?: UserStatsUpdateOneWithoutUserNestedInput
    achievements?: UserAchievementUpdateManyWithoutUserNestedInput
    leaderboardEntries?: LeaderboardSnapshotUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutInvitesReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    friendRequestsSent?: FriendshipUncheckedUpdateManyWithoutRequesterNestedInput
    friendRequestsReceived?: FriendshipUncheckedUpdateManyWithoutAddresseeNestedInput
    invitesSent?: RoomInviteUncheckedUpdateManyWithoutInviterNestedInput
    stats?: UserStatsUncheckedUpdateOneWithoutUserNestedInput
    achievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput
    leaderboardEntries?: LeaderboardSnapshotUncheckedUpdateManyWithoutUserNestedInput
  }

  export type GameEventCreateWithoutGameInput = {
    id?: string
    seq: number
    type: string
    actor?: string | null
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type GameEventUncheckedCreateWithoutGameInput = {
    id?: string
    seq: number
    type: string
    actor?: string | null
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type GameEventCreateOrConnectWithoutGameInput = {
    where: GameEventWhereUniqueInput
    create: XOR<GameEventCreateWithoutGameInput, GameEventUncheckedCreateWithoutGameInput>
  }

  export type GameEventCreateManyGameInputEnvelope = {
    data: GameEventCreateManyGameInput | GameEventCreateManyGameInput[]
    skipDuplicates?: boolean
  }

  export type GameEventUpsertWithWhereUniqueWithoutGameInput = {
    where: GameEventWhereUniqueInput
    update: XOR<GameEventUpdateWithoutGameInput, GameEventUncheckedUpdateWithoutGameInput>
    create: XOR<GameEventCreateWithoutGameInput, GameEventUncheckedCreateWithoutGameInput>
  }

  export type GameEventUpdateWithWhereUniqueWithoutGameInput = {
    where: GameEventWhereUniqueInput
    data: XOR<GameEventUpdateWithoutGameInput, GameEventUncheckedUpdateWithoutGameInput>
  }

  export type GameEventUpdateManyWithWhereWithoutGameInput = {
    where: GameEventScalarWhereInput
    data: XOR<GameEventUpdateManyMutationInput, GameEventUncheckedUpdateManyWithoutGameInput>
  }

  export type GameEventScalarWhereInput = {
    AND?: GameEventScalarWhereInput | GameEventScalarWhereInput[]
    OR?: GameEventScalarWhereInput[]
    NOT?: GameEventScalarWhereInput | GameEventScalarWhereInput[]
    id?: StringFilter<"GameEvent"> | string
    gameId?: StringFilter<"GameEvent"> | string
    seq?: IntFilter<"GameEvent"> | number
    type?: StringFilter<"GameEvent"> | string
    actor?: StringNullableFilter<"GameEvent"> | string | null
    payload?: JsonFilter<"GameEvent">
    createdAt?: DateTimeFilter<"GameEvent"> | Date | string
  }

  export type GameCreateWithoutEventsInput = {
    id?: string
    status?: string
    deckSeed: string
    dealerId?: string | null
    surrenderVotes?: GameCreatesurrenderVotesInput | string[]
    rematchVotes?: GameCreaterematchVotesInput | string[]
    originalRoomIds?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GameUncheckedCreateWithoutEventsInput = {
    id?: string
    status?: string
    deckSeed: string
    dealerId?: string | null
    surrenderVotes?: GameCreatesurrenderVotesInput | string[]
    rematchVotes?: GameCreaterematchVotesInput | string[]
    originalRoomIds?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GameCreateOrConnectWithoutEventsInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutEventsInput, GameUncheckedCreateWithoutEventsInput>
  }

  export type GameUpsertWithoutEventsInput = {
    update: XOR<GameUpdateWithoutEventsInput, GameUncheckedUpdateWithoutEventsInput>
    create: XOR<GameCreateWithoutEventsInput, GameUncheckedCreateWithoutEventsInput>
    where?: GameWhereInput
  }

  export type GameUpdateToOneWithWhereWithoutEventsInput = {
    where?: GameWhereInput
    data: XOR<GameUpdateWithoutEventsInput, GameUncheckedUpdateWithoutEventsInput>
  }

  export type GameUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    deckSeed?: StringFieldUpdateOperationsInput | string
    dealerId?: NullableStringFieldUpdateOperationsInput | string | null
    surrenderVotes?: GameUpdatesurrenderVotesInput | string[]
    rematchVotes?: GameUpdaterematchVotesInput | string[]
    originalRoomIds?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    deckSeed?: StringFieldUpdateOperationsInput | string
    dealerId?: NullableStringFieldUpdateOperationsInput | string | null
    surrenderVotes?: GameUpdatesurrenderVotesInput | string[]
    rematchVotes?: GameUpdaterematchVotesInput | string[]
    originalRoomIds?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutStatsInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    friendRequestsSent?: FriendshipCreateNestedManyWithoutRequesterInput
    friendRequestsReceived?: FriendshipCreateNestedManyWithoutAddresseeInput
    invitesSent?: RoomInviteCreateNestedManyWithoutInviterInput
    invitesReceived?: RoomInviteCreateNestedManyWithoutInviteeInput
    achievements?: UserAchievementCreateNestedManyWithoutUserInput
    leaderboardEntries?: LeaderboardSnapshotCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutStatsInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    friendRequestsSent?: FriendshipUncheckedCreateNestedManyWithoutRequesterInput
    friendRequestsReceived?: FriendshipUncheckedCreateNestedManyWithoutAddresseeInput
    invitesSent?: RoomInviteUncheckedCreateNestedManyWithoutInviterInput
    invitesReceived?: RoomInviteUncheckedCreateNestedManyWithoutInviteeInput
    achievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput
    leaderboardEntries?: LeaderboardSnapshotUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutStatsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStatsInput, UserUncheckedCreateWithoutStatsInput>
  }

  export type UserUpsertWithoutStatsInput = {
    update: XOR<UserUpdateWithoutStatsInput, UserUncheckedUpdateWithoutStatsInput>
    create: XOR<UserCreateWithoutStatsInput, UserUncheckedCreateWithoutStatsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStatsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStatsInput, UserUncheckedUpdateWithoutStatsInput>
  }

  export type UserUpdateWithoutStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    friendRequestsSent?: FriendshipUpdateManyWithoutRequesterNestedInput
    friendRequestsReceived?: FriendshipUpdateManyWithoutAddresseeNestedInput
    invitesSent?: RoomInviteUpdateManyWithoutInviterNestedInput
    invitesReceived?: RoomInviteUpdateManyWithoutInviteeNestedInput
    achievements?: UserAchievementUpdateManyWithoutUserNestedInput
    leaderboardEntries?: LeaderboardSnapshotUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    friendRequestsSent?: FriendshipUncheckedUpdateManyWithoutRequesterNestedInput
    friendRequestsReceived?: FriendshipUncheckedUpdateManyWithoutAddresseeNestedInput
    invitesSent?: RoomInviteUncheckedUpdateManyWithoutInviterNestedInput
    invitesReceived?: RoomInviteUncheckedUpdateManyWithoutInviteeNestedInput
    achievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput
    leaderboardEntries?: LeaderboardSnapshotUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserAchievementCreateWithoutAchievementInput = {
    id?: string
    unlockedAt?: Date | string
    user: UserCreateNestedOneWithoutAchievementsInput
  }

  export type UserAchievementUncheckedCreateWithoutAchievementInput = {
    id?: string
    userId: string
    unlockedAt?: Date | string
  }

  export type UserAchievementCreateOrConnectWithoutAchievementInput = {
    where: UserAchievementWhereUniqueInput
    create: XOR<UserAchievementCreateWithoutAchievementInput, UserAchievementUncheckedCreateWithoutAchievementInput>
  }

  export type UserAchievementCreateManyAchievementInputEnvelope = {
    data: UserAchievementCreateManyAchievementInput | UserAchievementCreateManyAchievementInput[]
    skipDuplicates?: boolean
  }

  export type UserAchievementUpsertWithWhereUniqueWithoutAchievementInput = {
    where: UserAchievementWhereUniqueInput
    update: XOR<UserAchievementUpdateWithoutAchievementInput, UserAchievementUncheckedUpdateWithoutAchievementInput>
    create: XOR<UserAchievementCreateWithoutAchievementInput, UserAchievementUncheckedCreateWithoutAchievementInput>
  }

  export type UserAchievementUpdateWithWhereUniqueWithoutAchievementInput = {
    where: UserAchievementWhereUniqueInput
    data: XOR<UserAchievementUpdateWithoutAchievementInput, UserAchievementUncheckedUpdateWithoutAchievementInput>
  }

  export type UserAchievementUpdateManyWithWhereWithoutAchievementInput = {
    where: UserAchievementScalarWhereInput
    data: XOR<UserAchievementUpdateManyMutationInput, UserAchievementUncheckedUpdateManyWithoutAchievementInput>
  }

  export type UserCreateWithoutAchievementsInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    friendRequestsSent?: FriendshipCreateNestedManyWithoutRequesterInput
    friendRequestsReceived?: FriendshipCreateNestedManyWithoutAddresseeInput
    invitesSent?: RoomInviteCreateNestedManyWithoutInviterInput
    invitesReceived?: RoomInviteCreateNestedManyWithoutInviteeInput
    stats?: UserStatsCreateNestedOneWithoutUserInput
    leaderboardEntries?: LeaderboardSnapshotCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAchievementsInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    friendRequestsSent?: FriendshipUncheckedCreateNestedManyWithoutRequesterInput
    friendRequestsReceived?: FriendshipUncheckedCreateNestedManyWithoutAddresseeInput
    invitesSent?: RoomInviteUncheckedCreateNestedManyWithoutInviterInput
    invitesReceived?: RoomInviteUncheckedCreateNestedManyWithoutInviteeInput
    stats?: UserStatsUncheckedCreateNestedOneWithoutUserInput
    leaderboardEntries?: LeaderboardSnapshotUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAchievementsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAchievementsInput, UserUncheckedCreateWithoutAchievementsInput>
  }

  export type AchievementCreateWithoutUnlockedByInput = {
    id?: string
    type: $Enums.AchievementType
    tier: number
    threshold: number
    name: string
    description: string
  }

  export type AchievementUncheckedCreateWithoutUnlockedByInput = {
    id?: string
    type: $Enums.AchievementType
    tier: number
    threshold: number
    name: string
    description: string
  }

  export type AchievementCreateOrConnectWithoutUnlockedByInput = {
    where: AchievementWhereUniqueInput
    create: XOR<AchievementCreateWithoutUnlockedByInput, AchievementUncheckedCreateWithoutUnlockedByInput>
  }

  export type UserUpsertWithoutAchievementsInput = {
    update: XOR<UserUpdateWithoutAchievementsInput, UserUncheckedUpdateWithoutAchievementsInput>
    create: XOR<UserCreateWithoutAchievementsInput, UserUncheckedCreateWithoutAchievementsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAchievementsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAchievementsInput, UserUncheckedUpdateWithoutAchievementsInput>
  }

  export type UserUpdateWithoutAchievementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    friendRequestsSent?: FriendshipUpdateManyWithoutRequesterNestedInput
    friendRequestsReceived?: FriendshipUpdateManyWithoutAddresseeNestedInput
    invitesSent?: RoomInviteUpdateManyWithoutInviterNestedInput
    invitesReceived?: RoomInviteUpdateManyWithoutInviteeNestedInput
    stats?: UserStatsUpdateOneWithoutUserNestedInput
    leaderboardEntries?: LeaderboardSnapshotUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAchievementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    friendRequestsSent?: FriendshipUncheckedUpdateManyWithoutRequesterNestedInput
    friendRequestsReceived?: FriendshipUncheckedUpdateManyWithoutAddresseeNestedInput
    invitesSent?: RoomInviteUncheckedUpdateManyWithoutInviterNestedInput
    invitesReceived?: RoomInviteUncheckedUpdateManyWithoutInviteeNestedInput
    stats?: UserStatsUncheckedUpdateOneWithoutUserNestedInput
    leaderboardEntries?: LeaderboardSnapshotUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AchievementUpsertWithoutUnlockedByInput = {
    update: XOR<AchievementUpdateWithoutUnlockedByInput, AchievementUncheckedUpdateWithoutUnlockedByInput>
    create: XOR<AchievementCreateWithoutUnlockedByInput, AchievementUncheckedCreateWithoutUnlockedByInput>
    where?: AchievementWhereInput
  }

  export type AchievementUpdateToOneWithWhereWithoutUnlockedByInput = {
    where?: AchievementWhereInput
    data: XOR<AchievementUpdateWithoutUnlockedByInput, AchievementUncheckedUpdateWithoutUnlockedByInput>
  }

  export type AchievementUpdateWithoutUnlockedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAchievementTypeFieldUpdateOperationsInput | $Enums.AchievementType
    tier?: IntFieldUpdateOperationsInput | number
    threshold?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type AchievementUncheckedUpdateWithoutUnlockedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAchievementTypeFieldUpdateOperationsInput | $Enums.AchievementType
    tier?: IntFieldUpdateOperationsInput | number
    threshold?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateWithoutLeaderboardEntriesInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    friendRequestsSent?: FriendshipCreateNestedManyWithoutRequesterInput
    friendRequestsReceived?: FriendshipCreateNestedManyWithoutAddresseeInput
    invitesSent?: RoomInviteCreateNestedManyWithoutInviterInput
    invitesReceived?: RoomInviteCreateNestedManyWithoutInviteeInput
    stats?: UserStatsCreateNestedOneWithoutUserInput
    achievements?: UserAchievementCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLeaderboardEntriesInput = {
    id?: string
    username: string
    email: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    friendRequestsSent?: FriendshipUncheckedCreateNestedManyWithoutRequesterInput
    friendRequestsReceived?: FriendshipUncheckedCreateNestedManyWithoutAddresseeInput
    invitesSent?: RoomInviteUncheckedCreateNestedManyWithoutInviterInput
    invitesReceived?: RoomInviteUncheckedCreateNestedManyWithoutInviteeInput
    stats?: UserStatsUncheckedCreateNestedOneWithoutUserInput
    achievements?: UserAchievementUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLeaderboardEntriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLeaderboardEntriesInput, UserUncheckedCreateWithoutLeaderboardEntriesInput>
  }

  export type UserUpsertWithoutLeaderboardEntriesInput = {
    update: XOR<UserUpdateWithoutLeaderboardEntriesInput, UserUncheckedUpdateWithoutLeaderboardEntriesInput>
    create: XOR<UserCreateWithoutLeaderboardEntriesInput, UserUncheckedCreateWithoutLeaderboardEntriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLeaderboardEntriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLeaderboardEntriesInput, UserUncheckedUpdateWithoutLeaderboardEntriesInput>
  }

  export type UserUpdateWithoutLeaderboardEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    friendRequestsSent?: FriendshipUpdateManyWithoutRequesterNestedInput
    friendRequestsReceived?: FriendshipUpdateManyWithoutAddresseeNestedInput
    invitesSent?: RoomInviteUpdateManyWithoutInviterNestedInput
    invitesReceived?: RoomInviteUpdateManyWithoutInviteeNestedInput
    stats?: UserStatsUpdateOneWithoutUserNestedInput
    achievements?: UserAchievementUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLeaderboardEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    friendRequestsSent?: FriendshipUncheckedUpdateManyWithoutRequesterNestedInput
    friendRequestsReceived?: FriendshipUncheckedUpdateManyWithoutAddresseeNestedInput
    invitesSent?: RoomInviteUncheckedUpdateManyWithoutInviterNestedInput
    invitesReceived?: RoomInviteUncheckedUpdateManyWithoutInviteeNestedInput
    stats?: UserStatsUncheckedUpdateOneWithoutUserNestedInput
    achievements?: UserAchievementUncheckedUpdateManyWithoutUserNestedInput
  }

  export type FriendshipCreateManyRequesterInput = {
    id?: string
    addresseeId: string
    status?: $Enums.FriendshipStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendshipCreateManyAddresseeInput = {
    id?: string
    requesterId: string
    status?: $Enums.FriendshipStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomInviteCreateManyInviterInput = {
    id?: string
    roomId: string
    inviteeId: string
    status?: $Enums.RoomInviteStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    expiresAt: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RoomInviteCreateManyInviteeInput = {
    id?: string
    roomId: string
    inviterId: string
    status?: $Enums.RoomInviteStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    expiresAt: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type UserAchievementCreateManyUserInput = {
    id?: string
    achievementId: string
    unlockedAt?: Date | string
  }

  export type LeaderboardSnapshotCreateManyUserInput = {
    id?: string
    username: string
    category: $Enums.LeaderboardCategory
    period: $Enums.LeaderboardPeriod
    value: number
    weekStart?: Date | string | null
    monthStart?: Date | string | null
    yearStart?: Date | string | null
    rank?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendshipUpdateWithoutRequesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendshipStatusFieldUpdateOperationsInput | $Enums.FriendshipStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addressee?: UserUpdateOneRequiredWithoutFriendRequestsReceivedNestedInput
  }

  export type FriendshipUncheckedUpdateWithoutRequesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    addresseeId?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendshipStatusFieldUpdateOperationsInput | $Enums.FriendshipStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendshipUncheckedUpdateManyWithoutRequesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    addresseeId?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendshipStatusFieldUpdateOperationsInput | $Enums.FriendshipStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendshipUpdateWithoutAddresseeInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendshipStatusFieldUpdateOperationsInput | $Enums.FriendshipStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requester?: UserUpdateOneRequiredWithoutFriendRequestsSentNestedInput
  }

  export type FriendshipUncheckedUpdateWithoutAddresseeInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterId?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendshipStatusFieldUpdateOperationsInput | $Enums.FriendshipStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendshipUncheckedUpdateManyWithoutAddresseeInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterId?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendshipStatusFieldUpdateOperationsInput | $Enums.FriendshipStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomInviteUpdateWithoutInviterInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomInviteStatusFieldUpdateOperationsInput | $Enums.RoomInviteStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    invitee?: UserUpdateOneRequiredWithoutInvitesReceivedNestedInput
  }

  export type RoomInviteUncheckedUpdateWithoutInviterInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    inviteeId?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomInviteStatusFieldUpdateOperationsInput | $Enums.RoomInviteStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RoomInviteUncheckedUpdateManyWithoutInviterInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    inviteeId?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomInviteStatusFieldUpdateOperationsInput | $Enums.RoomInviteStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RoomInviteUpdateWithoutInviteeInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomInviteStatusFieldUpdateOperationsInput | $Enums.RoomInviteStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    inviter?: UserUpdateOneRequiredWithoutInvitesSentNestedInput
  }

  export type RoomInviteUncheckedUpdateWithoutInviteeInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    inviterId?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomInviteStatusFieldUpdateOperationsInput | $Enums.RoomInviteStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RoomInviteUncheckedUpdateManyWithoutInviteeInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    inviterId?: StringFieldUpdateOperationsInput | string
    status?: EnumRoomInviteStatusFieldUpdateOperationsInput | $Enums.RoomInviteStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type UserAchievementUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    achievement?: AchievementUpdateOneRequiredWithoutUnlockedByNestedInput
  }

  export type UserAchievementUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    achievementId?: StringFieldUpdateOperationsInput | string
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAchievementUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    achievementId?: StringFieldUpdateOperationsInput | string
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaderboardSnapshotUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    category?: EnumLeaderboardCategoryFieldUpdateOperationsInput | $Enums.LeaderboardCategory
    period?: EnumLeaderboardPeriodFieldUpdateOperationsInput | $Enums.LeaderboardPeriod
    value?: IntFieldUpdateOperationsInput | number
    weekStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    yearStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaderboardSnapshotUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    category?: EnumLeaderboardCategoryFieldUpdateOperationsInput | $Enums.LeaderboardCategory
    period?: EnumLeaderboardPeriodFieldUpdateOperationsInput | $Enums.LeaderboardPeriod
    value?: IntFieldUpdateOperationsInput | number
    weekStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    yearStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaderboardSnapshotUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    category?: EnumLeaderboardCategoryFieldUpdateOperationsInput | $Enums.LeaderboardCategory
    period?: EnumLeaderboardPeriodFieldUpdateOperationsInput | $Enums.LeaderboardPeriod
    value?: IntFieldUpdateOperationsInput | number
    weekStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    yearStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameEventCreateManyGameInput = {
    id?: string
    seq: number
    type: string
    actor?: string | null
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type GameEventUpdateWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    seq?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    actor?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameEventUncheckedUpdateWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    seq?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    actor?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameEventUncheckedUpdateManyWithoutGameInput = {
    id?: StringFieldUpdateOperationsInput | string
    seq?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    actor?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAchievementCreateManyAchievementInput = {
    id?: string
    userId: string
    unlockedAt?: Date | string
  }

  export type UserAchievementUpdateWithoutAchievementInput = {
    id?: StringFieldUpdateOperationsInput | string
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAchievementsNestedInput
  }

  export type UserAchievementUncheckedUpdateWithoutAchievementInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAchievementUncheckedUpdateManyWithoutAchievementInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    unlockedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GameCountOutputTypeDefaultArgs instead
     */
    export type GameCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GameCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AchievementCountOutputTypeDefaultArgs instead
     */
    export type AchievementCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AchievementCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FriendshipDefaultArgs instead
     */
    export type FriendshipArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FriendshipDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RoomInviteDefaultArgs instead
     */
    export type RoomInviteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoomInviteDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GameDefaultArgs instead
     */
    export type GameArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GameDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PlayerDefaultArgs instead
     */
    export type PlayerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PlayerDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GameEventDefaultArgs instead
     */
    export type GameEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GameEventDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GameSnapshotDefaultArgs instead
     */
    export type GameSnapshotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GameSnapshotDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RoundScoreDefaultArgs instead
     */
    export type RoundScoreArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoundScoreDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MatchHistoryDefaultArgs instead
     */
    export type MatchHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MatchHistoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserStatsDefaultArgs instead
     */
    export type UserStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserStatsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AchievementDefaultArgs instead
     */
    export type AchievementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AchievementDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserAchievementDefaultArgs instead
     */
    export type UserAchievementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserAchievementDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LeaderboardSnapshotDefaultArgs instead
     */
    export type LeaderboardSnapshotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LeaderboardSnapshotDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}