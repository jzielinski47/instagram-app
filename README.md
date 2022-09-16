# A simple instagram-type backend service

A simple JavaScript content management backend application in [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) standard for image-conent management (uploading images, applying tags and filters, removing them and more). It was a school asignment for ServerSide-Applications Classes. The project was abandoned due to lack of time during a school-year (2022). However it is ready to be developed further. 

## Usage

All the sample test files are located in `/test` directory. There are three individual `x-...-.http` files. Each one covers a different area for the project. It is important to mention that you need a file to operate on while testing the other two controllers.
```
`/test/x-files.http` covers the entire file-management system. 
`/test/x-filters.http` covers the filter system for uploaded image files.  
`/test/x-tags.http` covers the tag system for uploaded image files. 
```

### x-files.http
`/test/x-files.http` covers the entire file-management system. 

<br>**Upload an image**
```js
POST http://localhost:3000/api/photos HTTP/1.1
Content-Type: multipart/form-data; boundary=----FormBoundary1234

------FormBoundary1234
Content-Disposition: form-data; name="file"; filename="test-image.jpg"
Content-Type: image/jpeg

< ./test-image.jpg

------FormBoundary1234
Content-Disposition: form-data; name="album"
Content-Type: text/plain

nazwa_albumu
------FormBoundary1234
```

<br>**See the image and its metadata.** You need to provide the image ID as a parameter.
```js
// GET http://localhost:3000/api/photos/image_id HTTP/1.1

example:
GET http://localhost:3000/api/photos/1661768334201 HTTP/1.1
```

<br>**See the entire album and read metadata for each image**
```js
GET http://localhost:3000/api/photos HTTP/1.1
Content-Type: application/json
```

<br>**Patch the image**
```js
PATCH http://localhost:3000/api/photos/1661768334201 HTTP/1.1
```

<br>**Delete the image**
```js
DELETE  http://localhost:3000/api/photos/1661768334201 HTTP/1.1
```

### x-filters.http
`/test/x-files.http` covers the entire file-management system.

### x-tags.http
`/test/x-files.http` covers the entire file-management system.
