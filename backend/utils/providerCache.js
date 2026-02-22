const redis = require("../config/redis");

const getProvidersCacheKey = (serviceType, pincode) => {
  return `providers:${serviceType}:${pincode}`;
};

const getCachedProviders = async (serviceType, pincode) => {
  const key = getProvidersCacheKey(serviceType, pincode);
  const cached = await redis.get(key);

  return cached ? JSON.parse(cached) : null;
};

const setCachedProviders = async (serviceType, pincode, providers) => {
  const key = getProvidersCacheKey(serviceType, pincode);

  // Cache for 10 minutes
  await redis.set(key, JSON.stringify(providers), "EX", 600);
};

module.exports = { getCachedProviders, setCachedProviders };
