## Context

현재 `createCompanionRoom`은 `pushToRemote()`가 false를 반환하면 새 방을 롤백합니다. MockBolt DNS 오류가 이 경로를 항상 실패시킵니다.

## Decision

기본값은 원격 동기화를 끄고 로컬 저장을 정상 완료로 처리합니다. 원격 동기화는 `window.WANDERSYNC_REMOTE_SYNC`에 유효한 `getUrl`과 `putUrl`이 모두 있을 때만 활성화합니다. 실패한 외부 서비스가 핵심 동행 기능과 브라우저 콘솔을 오염시키지 않도록 합니다.

## Verification

- 로컬 Playwright에서 미래 날짜의 동행방을 생성하고 `state.rooms`와 `localStorage`에 기록되는지 확인합니다.
- 브라우저 콘솔 오류가 없는지 확인합니다.
