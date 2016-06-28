# bolaget.io (https://bolaget.io)

This API has nothing to do with Systembolaget, this app consumes a large XML API from Systembolaget and transforms it into a REST JSON API. More info can be found here: http://www.systembolaget.se/api

**Products**
----
  Returns json data for products.

* **URL**

  /products


* **Method:**

  `GET`


*  **URL Params**

   ***Optional:***

   `limit=[number]`

   `skip=[number]`

   `year=[number]`

   `ecologial=[bool]`

   `koscher=[bool]`

   `ethical=[bool]`

   `price_from=[number]`

   `price_to=[number]`

   `name=[alphanumeric]` - Simple fuzzy name search


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ name: '117 Grythyttan' ... }]`


* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : err }`

  OR

  * **Code:** 400 Bad Request <br />
    **Content:** `{ error : err }`




**Stores**
----
  Returns json data for stores.

* **URL**

  /stores


* **Method:**

  `GET`


*  **URL Params**

   ***Optional:***

   `limit=[number]`

   `skip=[number]`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ adress_1: 'Kungsholmstorg 11 A' ... }]`


* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : err }`

  OR

  * **Code:** 400 Bad Request <br />
    **Content:** `{ error : err }`
