## Things to consider when we clean and re-create the ios project

### Prerequisites

- Install [CocoaPods](https://formulae.brew.sh/formula/cocoapods)
- Choose the right team under Signing & Capabilities

### Camera Permissions

Add the following keys to the Info.plist file

```xml
	<key>NSCameraUsageDescription</key>
	<string>$(PRODUCT_NAME) needs camera access to capture the receipt</string>
	<key>NSPhotoLibraryAddUsageDescription</key>
	<string>$(PRODUCT_NAME) needs this access to store the captured receipt</string>
	<key>NSPhotoLibraryUsageDescription</key>
	<string>$(PRODUCT_NAME) needs this access to fetch a receipt from the gallery</string>
```

### Firebase Setup

#### GoogleService-Info.plist
- Download the `GoogleService-Info.plist` file from the [Firebase console](https://firebase.google.com/docs/ios/setup#add-config-file)
- Add the file to the `App/App` folder
- Add the following keys to the `App/App/Info.plist` file

#### Add Firebase to the Podfile

Add the following lines to the `App/Podfile` file

```ruby
  # Firebase related pods
  pod 'FirebaseAuth'
  pod 'FirebaseFirestore'
```

#### Configure Firebase in the AppDelegate.swift file

In the `App/App/AppDelegate.swift` file, 

 - Import the Firebase libraries
 - Configure Firebase

```swift
import UIKit
import Capacitor
import FirebaseCore
import FirebaseFirestore
import FirebaseAuth

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?	
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        FirebaseApp.configure()
        return true
    }

	...

}											
```

#### Install the Firebase pod

Run the below command to install the Firebase pod setup in the previous step

```bash
ionic cap sync
```