import { createClient } from 'next-sanity'

export const client = createClient({
  apiVersion:'v2023-08-06',
  dataset:process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  token:process.env.SANITY_ACCESS_TOKEN,
  useCdn:true,
})
