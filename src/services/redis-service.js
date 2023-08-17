import asyncRedis from "async-redis";
const client = asyncRedis.createClient(6379, "127.0.0.1");
const BASE_KEY_PREFIX = "emurgo.dev.";

/**
 * Redis service which is used to maintain the connection to the redis
 */
class RedisService {
  constructor(client) {
    this.client = client;
  }

  /**
   * function which is used to get data from redis
   * @param { String } key
   */
  get(key) {
    return client.get(BASE_KEY_PREFIX + key);
  }
  /**
   * function which is used to set value to redis
   * @param { String } key
   * @param { String } value
   * @param { number } ex
   */
  set(key, value, ex) {
    if (value !== undefined && value !== "null" && value !== null) {
      if (!ex) return client.set(BASE_KEY_PREFIX + key, value ? value.toString() : null);
      return client.set(BASE_KEY_PREFIX + key, value ? value.toString() : null, "EX", ex);
    }
    return;
  }

  /**
   * function which is used to del data from redis
   * @param { String } key
   */
  del(key) {
    return client.del(BASE_KEY_PREFIX + key);
  }
}

const redisService = new RedisService();
export default redisService;
