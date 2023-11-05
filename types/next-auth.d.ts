// types/next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  /**
   * Extend the built-in session/user types to include custom fields like 'id'.
   */
  interface User {
    id: string; // Adding the 'id' field to the user type definition.
  }

  interface Session {
    user: User; // Ensuring the session's 'user' field uses the extended User type with 'id'.
  }
}
