# JP

### プロジェクトのセットアップ手順

1. Dataディレクトリに移動します。
2. `npm install` を実行して必要なパッケージをインストールします。
3. `npm start` を実行して開発サーバーを起動します。

### 本番用データの作成

- `npm run build` を実行して、本番用データを作成します。

### 音声API

- このプロジェクトでは、VOICEVOX API を使用しています。
- [VOICEVOX公式サイト](https://voicevox.hiroshiba.jp/) からパッケージをダウンロードし、ローカルで起動してください。
- VOICEVOX が起動していない場合は、標準の読み上げAPIが起動する仕組みとなっています。

# EN

### Project Setup Instructions

1. Move to the Data directory.
2. Run `npm install` to install the necessary packages.
3. Run `npm start` to launch the development server.

### Building Production Data

- Run `npm run build` to create production data.

### Voice API

- This project uses the VOICEVOX API.
- Download the package from the [VOICEVOX official website](https://voicevox.hiroshiba.jp/) and launch it locally.
- If VOICEVOX is not running, the standard text-to-speech API will be activated by default.