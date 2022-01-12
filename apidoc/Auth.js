/*
 * Kairos APIs Document
 *
 * This is a document for Kairos's Apis.
 * Documentation blocks without @api (like this block) will be ignored.
 */

/**
 * @api {post} /api/auth/signup 01-Sign Up
 * @apiName AuthSignUp
 * @apiGroup Auth
 *
 * @apiBody  {String} firstName User firstname
 * @apiBody  {String} lastName User lastName
 * @apiBody  {String} email User email
 * @apiBody  {String} password User password
 *
 * @apiSuccess (Success 200) {Object} data user's info
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": "success",
 *       "data": {
 *         "user": {
 *           "id": 52,
 *           "firstName": "Phat",
 *           "lastName": "Nguyen",
 *           "email": "test_phat@gmail.com",
 *           "roleName": "user",
 *           "updatedAt": "2022-01-12T02:42:39.231Z",
 *           "createdAt": "2022-01-12T02:42:39.231Z"
 *         },
 *         "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTIsInJvbGVOYW1lIjoidXNlciIsImlhdCI6MTY0MTk1NTM1OSwiZXhwIjoxNjQxOTU4OTU5fQ.JDGxL-oa4dQw2ll7y48Z2p-CXYoZteBAd78WBWpr_MmdipNSgA0ARmMti91vp9O-b07zg2HG9TNUGLKaTjjYExpxOKPGE7Cv-MLthLFv_HYRPhkyRkOwap6C3NYrdc23pw6nny4qZtyUp1c_Q8k7fCrN4IcP0yAHo_OGkMaaBOJMhj0wdgh8JtrKNAy744lLGo6eeYf_pfDjsUrg4Oka-T06c7n3Kr12qT7sV1mOrvUDHr0dhe8jt7rVQOgp8klrvYL80X4t6cSqr5fddB2iuRMhrJ_XbgGjp4Jh3m8DS_mzLSYpVPqdluNGWrn4SVeRWuVnZf3OG0I_AzIHN28MWwFj3MkvsPJruAGT2qAD5YZsoRvlEzBQBi29bxOGSUdFBGmkkpgfKUY3qyti82zfzeLyqJMOaZwhSqBpDXhlXpeiPJqsF2HZ8MF86g7_6q1Ke_JxsvIDQHg0CotEhXT9dwUY5YB8MBUI0xE-UBfmJGKitq2_uCkNiMboImftaplag7SIyy4aqZmJFlGMjCSgXyGJLwEbOamTnMau6ioGCC0p6GY9BSJzQex6NNSdfR0K7GFpgC6lG49gRNgxEpv0KjTCsqp0sPZxFXKaosBYYil_7g_ZfTeTIi0ZCzPzlAZOLE40Vp7XSs3fUQimSFeB5QEMWiNbo8yp5Pu7wu7KgG8"
 *       },
 *       "statusCode": 201,
 *       "message": "success"
 *     }
 *
 * @apiError error BadRequest
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 BadRequest
 *     {
 *       "statusCode": 400,
 *       "error": "Bad Request",
 *       "message": "Validation failed",
 *       "validation": {
 *         "body": {
 *           "source": "body",
 *           "keys": [
 *             "firstName",
 *             "lastName",
 *             "email",
 *             "password"
 *           ],
 *           "message": "\"firstName\" is required. \"lastName\" is required. \"email\" is required. \"password\" is required"
 *         }
 *       }
 *     }
 */

/**
 * @api {post} /api/auth/signin 02-Sign In
 * @apiName AuthSignIn
 * @apiGroup Auth
 *
 * @apiBody  {String} email User email
 * @apiBody  {String} password User password
 *
 * @apiSuccess (Success 200) {Object} data user's info
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": "success",
 *       "data": {
 *         "user": {
 *           "id": 1,
 *           "email": "test_phat@gmail.com",
 *           "firstName": "Phat",
 *           "lastName": "Nguyen",
 *           "roleName": "user",
 *           "createdAt": "2022-01-12T02:42:39.000Z",
 *           "updatedAt": "2022-01-12T02:42:39.000Z",
 *           "deletedAt": null
 *         },
 *         "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTIsInJvbGVOYW1lIjoidXNlciIsImlhdCI6MTY0MTk1NTgxOCwiZXhwIjoxNjQxOTU5NDE4fQ.XqtqekdS-EHyJ8__XIXk9mRZY_SC0_X6z5D3SFInkB9dJlwojef3AfC41IqnfpiwH7-Ty-FBhNIISzq8JWxJVNDMlMpeMZqZx5BmffQwCyB3_BQYBt-SHntwmcuXjSEgxByzNFn5XonEJ7HoN0jM9kWBDOSiNsITvfuxt-XiAZnAgVOSEd-exD3TwqdpyoWHH_bqhyKRgs-iMW9sBnksiwyvmB-MlXYC3enL5ToytAVAk5-VgBWGPHCJ7Lx7UYhHilLduE5Fs6OphhLqUldMgQIzxM9dQRoWf1P57MJrhsroU4ek4SsbzjFBaWFDvhrui_XkxIe5LAC6nZi7IrzDzXw2jop_OGne6lCgBex74Q6pVdlsslRWFtZ28rgxGt_91ppkz1Z6nTXuz5qtU7XYxF7bLlDIfFdTowUbBhgfRLSg1-JusFUzX1WsDY6Bv95v59tstfu42P_qgLuzEuu_zeceZkXATQKNUhseccdHHRyKOW3mHT-I_H6VPCEaw-DGV0bE2y6yVjdGRPZ2OpHh4gU1i7YqtQswyIOzWs1TY053mOWcvpFFf5b1kBsxtzZ67E-gP0ctceSFYeIKZ3TmU9IxeuEVSBI13PNh52-ID8Mnri31ZUgPrFVoRWnHy9L8T4ka1HBLWZDoC0Kj4725R8fhPEBtt2dMcxt-96mAGOA",
 *         "refreshToken": "r:c47579a9544dc29ddd05fd04bb4e9589"
 *       },
 *       "statusCode": 200,
 *       "message": "success"
 *     }
 *
 * @apiError error BadRequest
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 BadRequest
 *     {
 *       "statusCode": 400,
 *       "error": "Bad Request",
 *       "message": "Validation failed",
 *       "validation": {
 *         "body": {
 *           "source": "body",
 *           "keys": [
 *             "email"
 *           ],
 *           "message": "\"email\" must be a valid email"
 *         }
 *       }
 *     }
 */
