export default function lazyCache(prototypeName, propertyName, resourceUrl) {
  Object.defineProperty(prototypeName, propertyName, {
    configurable: true,
    get: async function () {
      const cache = await caches.open('v1');
      await cache.add(resourceUrl);
      const rawData = await cache.match(resourceUrl);
      const usableData = await rawData.json();

      Object.defineProperty(this, propertyName, {
        value: usableData,
        configurable: true,
      });
      return usableData;
    },
  });
}
