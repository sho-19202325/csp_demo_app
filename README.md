## 環境構築

### API側
```
cd server
docker-compose build
docker-compose run app db:create db:migrate
docker-compose up
```

### クライアント側

```
cd client
npm run start
```

## CSPの検証方法

1. App.tsxの9~14行目をコメントアウト
2. titleに適当な文字列、content部分に```<img src="invalid-image" onerror="alert(localStorage.getItem('accessToken'))">```を入れて作成。
3. XSSが成功すれば、jsのalert()が起動し、画面に"アクセストークンの中身"というlocalStorageの値が表示される。
4. 1.でコメントアウトした部分を解除
5. 一覧画面をリロード(2で作成したデータを削除してしまった場合は再度作成し直す)
6. alertが表示されず、検証ツールで確認すると、CSPの'script-src', 'self'directiveによってinline eventがrefuseされたという由のエラーメッセージが表示されれば成功
