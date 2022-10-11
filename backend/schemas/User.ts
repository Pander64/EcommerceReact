import { text, password } from "@keystone-6/core/fields";
import { list } from "@keystone-6/core";

export const User = list({
    fields: {
        // Here are the fields that `User` will have. We want an email and password so they can log in
        // a name so we can refer to them, and a way to connect users to posts.
        name: text({
            validation: { isRequired: true },
            }
        ),
        email: text({ isIndexed: 'unique', validation: { isRequired: true } }),
        password: password(),
        // TODO, add roles, cart and orders
    },
});