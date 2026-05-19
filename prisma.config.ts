import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url:"mysql://root:C4mp0s@116@localhost:3306/lms",
  },
});