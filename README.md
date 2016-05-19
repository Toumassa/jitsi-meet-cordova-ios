jitsi-meet-cordova-ios
======================

Cordova app with WebRTC support for iOS 


Description
-----------

This will load jitsi-meet application (or another) exposing WebRTC environment via [cordova-plugin-iosrtc](https://github.com/eface2face/cordova-plugin-iosrtc)
This application will work with the modified version of [lib-jitsi-meet](https://github.com/Toumassa/lib-jitsi-meet) which supports WebRTC exposed by cordova-plugin-iosrtc.
To make it work with jitsi-meet installed on your server you need to serve some cordova files from your server (see below)

Installation
-----------

- install cordova
- clone the project
- cd [PROJECT_DIR]
- run `cordova prepare`
   this should fetch cordova-ios@3.9.2 cordova-plugin-iosrtc@2.2.4 cordova-plugin-whitelist cordova-plugin-console
- open ith Xcode `[PROJECT_DIR]/plateforms/ios/[PROJECT_NAME].xcodeproj`
- go to the project settings
    * set Objective-C Briging Header to `$(PROJECT_DIR)/$(PROJECT_NAME)/Plugins/cordova-plugin-iosrtc/cordova-plugin-iosrtc-Bridging-Header.h`
	* set `Enable bitcode` to `false`
	* add `@executable_path/Frameworks` to runpath Search Paths

- change in config.xml `<content src="YOUR_JITS_MEET_SERVER">	`
- add `<access origin="*.YOUR_DOMAIN">`

- `cordova prepare` (TODO with each modification of config.xml and www or add it in build steps)

The project should compile and run on your device but JitsiMeet won't detect WebRTC environnement

- install [Toumassa/lib-jitsi-meet](https://github.com/Toumassa/lib-jitsi-meet) with your jitsi meet
- rename `index.html` in jitsi meet to `index_jitsi.html`
- copie the content of `cordova_server_side` into the root directory of jitsi meet

When the app launches you should get the jitsi-meet index without WebRTC warning. 

How it works
------------

The idea is to inject jitsi-meet html after cordova environment gets ready, this is why we have a different index.html. It will work normally from a navigator.

TODO
-------------
- Videos displayed on the top of all or aren't visible (see `fix_ios.js` for temporary corrections)
- Distant navigator looses audio from iOS
- signaling issues
- ...

Author
------

Arthur TOUMASSIAN 
artogu@live.fr

