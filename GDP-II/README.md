<H1>Smart Hydroponic Farming Using Internet of Things</H>

## Steps to install and run the code
1. Install Arduino IDE 1.8.16
2. After Installation create new file(File->New).
3. In File->Preferences. Go and add in Additional Boards Manager URLs the link https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json. this will add the package for the microcontroller that we are using in the project.
4. Furthermore we have to add some external libraries for the sensors.
5. In Arduino IDE menu bar select Tools->Manage Libraries. Install libraries for <DHT11>, <OneWire.h>, <DallasTemperature>, <Blynk>
6. To Dump the code in Microcontroller. Select Tools-> Boards: ESP32 Dev Module and connect the USB cable to the System and dump the code to microcontroller by selecting the Port in tools menu.
7. while Code was uploading to the microcontroller. Press the boot button until the code is uploaded to 100%.
8. Now to monitor the sensor output and control the sensors.

## Steps to create Data Visulization on Blynk Platform
1. Create an account in Blynk IoT platform by clicking on sign up.
2. Initially create a template.
3. Give a name for the template and select the microcontroller that you are using in the project.
4. Create Datastreams by selecting virtual pins.
5. In virtual pin give the name, datatype and give a range for the sensor reading and click create.
6. Now go to the web Dashboard and drag and drop the widgets that you want to use to display for the sensor and select the virtual pin that you want to use and click save.
7. Now create a new device
8. Create a new device from a template that you have created.
9. Select the template and give the name for the device.
10. After creating device, Auth Token is generated now that part of the code has to be used on the top of our code on Arduino 
