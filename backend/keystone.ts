/*
Welcome to Keystone! This file is what keystone uses to start the app.

It looks at the default export, and expects a Keystone config object.

You can find all the config options in our docs here: https://keystonejs.com/docs/apis/config
*/

import { config } from '@keystone-6/core';
import type { ServerConfig } from '@keystone-6/core/types';
import 'dotenv/config';

// Look in the schema file for how we define our lists, and how users interact with them through graphql or the Admin UI
import { lists } from './schema';

// Keystone auth is configured separately - check out the basic auth setup we are importing from our auth file.
import { withAuth, session } from './auth';
import {User} from "./schemas/User";

const databaseURL =
    process.env.DATABASE_URL || 'postgres://abarroso@localhost:5432/keystones';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
    secret: process.env.COOKIE_SECRET,
};

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
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists: {
        // Schema items go in here
        User,
    },
    session,
  })
);
