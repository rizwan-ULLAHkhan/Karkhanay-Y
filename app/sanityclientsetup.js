import { createClient } from '@sanity/client';
import '@/app/globals.css'

// Setup the Sanity client
export const Sclient = createClient({
  projectId: 'u8znbhbc',
  dataset: 'production',
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: '2023-07-10', // use current date (YYYY-MM-DD) to target the latest API version
  token: 'skHhghHJ3cbVYlQYdKF89AjHXiUgjIGmbkS5vBWK4r3ktAkzkZQwbmgKOr7hW5aa42nWR9lHDjzaZjk8Yxu9YEsmTo633JyOMvExjDHbgMd13MEfLvEVOO7tjgMZBboivz5JgGZglqJFmZ3dzujXp8ViBssw9skOchHikSnPLzITR0mEjRve' // Only if you want to update content with the client
})