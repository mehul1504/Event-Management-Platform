const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

const setCache = async (key, value) => {
    return new Promise((resolve, reject) => {
        const success = cache.set(key, value);
        if (success) {
            resolve(true);
        } else {
            reject(new Error('Failed to set cache'));
        }
    });
};

const getCache = async (key) => {
    return new Promise((resolve, reject) => {
        const value = cache.get(key);
        if (value) {
            resolve(value);
        } else {
            reject(new Error('Cache miss'));
        }
    });
};

module.exports = { setCache, getCache };
