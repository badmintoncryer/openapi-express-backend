# openapi-express-backend

openAPI仕様書からExpressのAPIサーバを自動生成する検証用リポジトリです。

## 使い方

- src/openapi.yaml にOpenAPI仕様書を記述します。
- `npm run gen-api` を実行すると、src/api ディレクトリにAPIの引数/返り値の型定義が生成されます。
- `npm run build && npm run start` を実行すると、APIサーバが起動します。

## 注意点

openAPI仕様での`operationId`をkeyとして、以下のようにhandlerとの紐づけを行います。

```ts
const handlers: Record<
  string,
  (req: express.Request, res: express.Response) => object
> = {
  test: testHandler,
};
```

エンドポイント設定などは自動で行われるため、明記不要です。
