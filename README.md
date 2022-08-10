# The Dog API

## General overview

Get random photos of dogs through this mobile and desktop web application. Your favorite photos can be saved in the best instagram style by clicking on the heart of each image. The user has the possibility to upload its own dog images to save in the favorites section of the app.

To use the app click here: https://darioparejadiaz.com/the-dog-api/

## Technical overview

- The photos are obtained through the connection to the API of "The Dog API" (https://docs.thedogapi.com/)
- This project is built as a single page aplication (SPA) with vanilla JavaScript
- The HTTP requests to "The Dog API database" were made with the bult-in fetch API

## Views

### **Random Dogs Section**

This section displays 6 random dogs images. If you want to get another images, click on the "show me other dogs" button. If you liked one or more dogs, you can click on the heart icon of each image and to save them in the favorites section at the bottom of the page

![](/assets/readme-imgs/random-dogs.jpg)

---

### **Upload your own dog image**

By clicking on the "choose file" button the user can select its own dog image stored in its system files folder, then the button "upload dog" should be pressed

![](/assets/readme-imgs/upload-dogs.jpg)

---

### **Favorite dogs gallery**

In this section you can see all the dogs you liked by pressing the heart icon. If you do not liked a dog anymore you can remove it from favorites clicking the heart icon again

![](/assets/readme-imgs/favorite-dogs.jpg)
