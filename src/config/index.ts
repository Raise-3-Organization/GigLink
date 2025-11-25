// src/config/index.ts

// Get the Project ID from Reown Cloud (https://cloud.reown.com)
export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!PROJECT_ID) {
  throw new Error('Project ID is not defined');
}
