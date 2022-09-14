# A simple instagram-type backend service

A simple content management backend application in [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) standard for image-conent management (uploading images, applying tags and filters, removing them etc.)

## Usage

All the sample test files are located in `/test` directory. There are three individual `x-...-.http` files. Each one covers a different area for the project.
```
`/test/x-files.http` covers the entire file-management system. 
`/test/x-files.http` covers the entire file-management system. 
`/test/x-files.http` covers the entire file-management system. 
```

### x-files.http
`/test/x-files.http` covers the entire file-management system. 

<br>Upload an image

<br>See the image and its metadata. You need to provide the image ID as a parameter which, you can get by looking it up in the album.

<br>See all the images in the album

<br>Patch the image

<br>Delete the image

### x-filters.http
`/test/x-files.http` covers the entire file-management system. A user may upload an image, see all the images in their album, patch it, delete it.

### x-tags.http
`/test/x-files.http` covers the entire file-management system. A user may upload an image, see all the images in their album, patch it, delete it.
