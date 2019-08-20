# Fake Trello

베트남 신규 서비스 모바일PC 웹 개발 사전 과제

## Demo
[https://trello-7aae3.firebaseapp.com](https://trello-7aae3.firebaseapp.com)

[데모 대시보드](https://trello-7aae3.firebaseapp.com/users/U3533c16808446e4ab4c710ccb088f024/dashboard)  
본인의 대시보드가 아닌 경우, 제한되는 기능들이 있습니다.  
로그인을 통해 자신의 대시보드를 생성해 볼 수 있습니다.  

## Quick Start
`.env.local` 파일이 있는 경우 실행할 수 있습니다.

```sh
yarn install
yarn start
```

## Detail Guide

#### 1. firebase project를 시작합니다.
- https://firebase.google.com/

#### 2. firebase firestore, firebase storage를 세팅합니다.
- https://console.firebase.google.com

#### 3. line application을 생성하여 로그인 기능을 추가합니다.
- https://developers.line.biz/en/

#### 4. 루트 디렉토리에 `.env.local` 파일을 생성합니다.
```
REACT_APP_FIREBASE_API_KEY={YOUR_REACT_APP_FIREBASE_API_KEY}
REACT_APP_FIREBASE_PROJECT_ID={YOUR_REACT_APP_FIREBASE_PROJECT_ID}
REACT_APP_LINE_CHANNEL_SECRET={YOUR_REACT_APP_LINE_CHANNEL_SECRET}
REACT_APP_LINE_CHANNEL_ID={YOUR_REACT_APP_LINE_CHANNEL_ID}
```

# Libraries

- typescript
- react
- redux, react-redux
- react-router-dom
- axios
- firebase
- react-calendar
  
# Points

- Kanban Board 를 조회하는 Dash Board 구현
- Firebase 연동을 통한 원격 저장
  - 원격 저장소 실시간 조회 및 동시 접속 구현
- Data flow
  - React Component - Redux - Firebase 의 단방향 데이터 흐름으로 구성했습니다.
    - React 에서 Firebase에 데이터 삽입/수정을 실행하면, Firebase의 원격 저장소가 변경되고, [Firebase 리스너](https://firebase.google.com/docs/firestore/query-data/listen)로 인해 리덕스에 반영됩니다. 
- React Hook
  - useState, useEffect을 적극적으로 활용했습니다. 
- Markup
  - Trello와 유사하게 마크업을 구성했습니다.
