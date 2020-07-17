# 新規即売会適用

1. MySQLで新規テーブルを作成する
```
$ mysql -u xxx -p
$ CREATE DATABASE voiceconnect;
```

2. koetsuki-back用userに対し作成したテーブルの権限を渡す
```
$ GRANT ALL PRIVILEGES ON voiceconnect.* TO user@localhost;
```

3. sequelizeでmigrateを実行する

```
$ cd koetsuki_back
$ sequelize db:migrate
```

4. 既存即売会のユーザを新規即売会に移行する

