import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  // NestJS가 실행 중이면 URL에서 직접 가져오고, 없으면 로컬 파일 사용
  schema: process.env.GRAPHQL_SCHEMA_URL ?? "./schema.graphql",

  // 공유 operations
  documents: ["./operations/**/*.graphql"],

  generates: {
    "./generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        withResultType: true,
        // Apollo Client v3 hooks import
        apolloReactHooksImportFrom: "@apollo/client",
        // 불필요한 React import 제거
        addDocBlocks: false,
      },
    },
  },
};

export default config;
