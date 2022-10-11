/*
Welcome to Keystone! This file is what keystone uses to start the app.

It looks at the default export, and expects a Keystone config object.

You can find all the config options in our docs here: https://keystonejs.com/docs/apis/config
*/

import { config } from '@keystone-6/core';
import type { ServerConfig } from '@keystone-6/core/types';
import 'dotenv/config';

// Look in the schema file for how we define our lists, and how users interact with them through graphql or the Admin UI

// Keystone auth is configured separately - check out the basic auth setup we are importing from our auth file.
import { createAuth } from '@keystone-6/auth';
import {User} from "./schemas/User";
import {statelessSessions} from "@keystone-6/core/session";

const databaseURL =
    process.env.DATABASE_URL || 'postgres://abarroso@localhost:5432/keystones';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
    secret: process.env.COOKIE_SECRET || 'this secret should only be used in testing',
};

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'],
        // TODO: Add in inital roles here
    },
});

export default withAuth(
  // Using the config function helps typescript guide you to the available options.
  config({
      // @ts-ignore
      server: {
          cors: {
              origin: ["http://localhost:7777"],
              credentials: true,
          },
          port: 3000,
          maxFileSize: 200 * 1024 * 1024,
          healthCheck: true,
      },
    // the db sets the database provider - we're using sqlite for the fastest startup experience
      db: {
          provider: 'postgresql',
          url: databaseURL
      },
    // This config allows us to set up features of the Admin UI https://keystonejs.com/docs/apis/config#ui
    ui: {
        // Show the UI only for poeple who pass this test
        isAccessAllowed: ({ session }) =>
            // console.log(session);
            !!session?.data,
    },
    lists: {
        // Schema items go in here
        User,
    },
      session: statelessSessions(sessionConfig),
  })
);
