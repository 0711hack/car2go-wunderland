# Methodes

## Login
Url: ``https://common-api-hackathon2017.car2go.io/public/login``

Header:
```ini
Content-Type : application/json
```

Data:
```json
{
      "serviceRequest": {
        "payLoadData":{
          "emailAddress": "REPLACE@car2go.io",
          "password": "REPLACE"
        }
      }
}
```
## Fetch
Url: ``https://fmm-api-hackathon2017.car2go.io/protected/vehicles``
Header:
```ini
userId : REPLACE
accessToken : REPLACE
Content-Type : application/json
```