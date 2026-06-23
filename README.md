# Retrofit Edge AX Copilot Dashboard

GitHub Pages 배포용 정적 사이트입니다.

## 구성

- `index.html`: 발표용 대시보드 화면
- `github-pages-demo.js`: GitHub Pages에서 API 서버 없이 동작하는 데모 데이터 스크립트
- `.nojekyll`: GitHub Pages 정적 파일 처리용 설정

## 배포 방법

1. GitHub에서 새 저장소를 생성합니다.
2. 이 폴더의 파일을 저장소 루트에 업로드합니다.
3. GitHub 저장소의 `Settings > Pages`에서 배포 소스를 `Deploy from a branch`로 선택합니다.
4. Branch는 `main`, folder는 `/root`로 선택합니다.
5. 배포가 완료되면 `https://계정명.github.io/저장소명/` 주소로 접속합니다.

## 운영 전환 시 참고

GitHub Pages는 정적 호스팅만 지원하므로 Python API 서버나 실제 장비 연동 서버를 직접 실행할 수 없습니다.
실제 설비, PLC, CCTV, IoT 센서와 연결하려면 별도 API 서버를 클라우드 또는 사내 서버에 배포하고,
대시보드의 API 주소를 해당 서버 주소로 변경해야 합니다.
