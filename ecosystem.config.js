/*
 *   Copyright (c) 2020 Dimitri Lambrou
 *   All rights reserved.
 *   Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential
 */
module.exports = {
  apps: [{
    name: "Sekure",
    script: 'log.js',
    watch: true,
    ignore_watch: ['.git'],
  }],
  env: { NODE_ENV: "server" },
};
