module.exports = {
  apps: [
    {
      name: "errorMailer",
      cwd: ".",
      script: "npm",
      args: "run start",
      watch: false,
      autorestart: true,
      env: {
        // PORT: 80,
        PORT: 5000,
        // NODE_ENV: "prod",
        // SUBDOMAIN: "app",
        // USERNAME: "nowigencefirebase@gmail.com",
        // PASSWORD: "LhfJ9uZtmp",
      },
      // env_testing: {
      //   PORT: 80,
      //   NODE_ENV: "testing",
      //   SUBDOMAIN: "nodereacttesting",
      //   USERNAME: "nowigencefirebase@gmail.com",
      //   PASSWORD: "LhfJ9uZtmp",
      // },
      // env_orion: {
      //   PORT: 80,
      //   NODE_ENV: "orion",
      //   SUBDOMAIN: "hydra",
      //   USERNAME: "nowigencefirebase@gmail.com",
      //   PASSWORD: "LhfJ9uZtmp",
      // },
    },
    // {
    //   name: "react",
    //   cwd: "./client",
    //   script: "npm",
    //   args: "start",
    //   watch: false,
    //   autorestart: true,
    // },
  ],
};
