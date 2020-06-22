# Content

This application demonstrates the usage of `tizen.content` API.
With this API it is possible to discover content such as images, videos, music, or others.


## How to use the application

First user needs to plug pendrive or some other type of external storage into SmartTV.

Then when user runs the application on the left of the screen will be shown
up to 11 (limit set for demo purpouses) content pieces from users device.

User can filter this content so it shows only images, audio or video files
using buttons on the bottom of the screen.

In the middle there will be shown information about certain piece of content
which you can choose navigating with your remote.


## Supported platforms

2015 and newer


### Prerequisites

To use this app you need to have pendrive or other external storage pluged into SmartTV, with some files on it.


### Privileges

In order to use `tizen.content` API the following privileges must be included in `config.xml`:

```xml
<tizen:privilege name="http://tizen.org/privilege/content.read" />
```

### File structure

```
Content/ - Content sample app root folder
│
├── assets/ - resources used by this app
│   │
│   └── JosefinSans-Light.ttf - font used in application  
│
├── css/ - styles used in the application  
│   │
│   ├── main.css - styles specific for the application  
│   └── style.css - style for application's template  
│
├── js/ - scripts used in the application  
│   │
│   ├── init.js - script that runs before any other for setup purpose  
│   ├── keyhandler.js - module responsible for handling keydown events  
│   ├── logger.js - module allowing user to register logger instances  
│   ├── main.js - main application script  
│   ├── navigation.js - module responsible for handling in-app focus and navigation  
│   └── utils.js - module with useful tools used through application  
│
├── CHANGELOG.md - changes for each version of application  
├── config.xml - application's configuration file  
├── icon.png - application's icon  
├── index.html - main document  
└── README.md - this file  
```

## Other resources

*  **Content API**  
    https://developer.samsung.com/tv/develop/api-references/tizen-web-device-api-references/content-api

* **Stored Content Management**  
    https://developer.tizen.org/development/guides/web-application/data-storage-and-management/stored-content-management


## Copyright and License

**Copyright 2019 Samsung Electronics, Inc.**

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
