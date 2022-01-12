# Kairos Project Sample

Build simple Restful API with ExpressJs, MySQL. Apply simple Authentication Role Permission
- API restful structure
- Features:
  - User has one role
  - Role has many permissions
  - Each secure endpoint has a permissions

## Tech Requirements

- NodeJS vesion: > 14
- Sequelize ORM: 6
- MySQL

## How to generate JWT RS256 key

```
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
# Don't add passphrase
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
```

## Database Config

- Change database info in file `.env.development` and `.env.test`
- File config database in `config/db.config.js`
- `PORT=6868`
- Dev DB: `kairos`
- Test DB: `kairos_test`

## Init table

Run `npm run sync`

## Init seeder data

Run `npm run seed`

## Start Project

- Run `npm install`
- Run `npm start`

## API public URL

API URL: `http://localhost:{port}/api`

## API Docs public URL

API URL: `http://localhost:{port}/apidoc`

## Testing

Currently, I just apply `chai`, `mocha` and `supertest`

- Run `npm run test`

## @TODO

- Write full-test
- Write full-api update Role, Permission
- Extend Role and Permission with n:n relationship
- Update API docs
- Test try to use Jest instead of mocha
