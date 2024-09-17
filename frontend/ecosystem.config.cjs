module.exports = {
  apps: [
    {
      name: "memoire",
      port: "3000",
      instances: 3,
      script: "./.output/server/index.mjs",
    },
  ],
};
