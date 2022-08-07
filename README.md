## 概要

Redux Toolkit (RTK) と React Testing Library (RTL) のサンプルです。  
バックエンドは Spring Boot で 簡易な REST API を作成しています。  

フロントは RTL でコンポーネント・カスタムフック・RTK のテストを実施し、  
API は MSW でモックしています。  

`npm run start:msw` でアプリケーション起動時も MSW が API コールをインターセプトします。  

以下の要素を含みます：

**フロント (React)**
* Basics
  - TypeScript
  - Custom Hook
  - 再レンダリングの最適化 (memo, useCallback)
* State management
  - Redux Toolkit (RTK)
* Styling
  - CSS Modules
  - Material UI
  - React Icons
* Routing
  - React Router
* Testing
  - Jest
  - React Testing Library (RTL)
  - Mock Service Worker (MSW)

**バック (Spring Boot)**
* REST API
* Swagger UI (Open API ドキュメント)

## デモ

https://user-images.githubusercontent.com/59589496/181875657-41cfd54c-77cb-4e69-911b-c898a0bd6a25.mp4

## レンダリング

##### ログイン画面
<img width="740" src="https://user-images.githubusercontent.com/59589496/181875784-346451aa-5162-4a9f-82fc-05069e054e96.png" />
<img width="740" src="https://user-images.githubusercontent.com/59589496/181876016-e8e8fa0f-b38d-429c-b34a-f58560433a31.png" />

##### タスク画面
<img width="740" src="https://user-images.githubusercontent.com/59589496/181875873-eb62f8a6-0963-4251-b70b-a25ee1ad1a20.png" />
<img width="740" src="https://user-images.githubusercontent.com/59589496/181875941-3c4fcd57-1aec-4276-a3b7-aa83ed657856.png" />

## バックエンド

##### API 一覧 (Swagger UI)
<img width="740" src="https://user-images.githubusercontent.com/59589496/181876221-c01d888a-5cf0-4da3-87d7-0a7f603dd63c.png" />

## フォルダ構成

`tree -C --noreport front/src back/src`

<img width="520" src="https://user-images.githubusercontent.com/59589496/183291522-5c79b202-c6fd-4163-9c0d-f93df651a8da.png" />
