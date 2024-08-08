## To run the app from cli

- Find your phone / simulator APP 's target id

```bash
ionic cap run ios --list
```

- Run the app on your phone / simulator with the target id

```bash
ionic cap run ios --livereload --target <target id>
```

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

#### Add the necessary @capacitor-firebase/ pods

- File `ios/App/Podfile`
- Add the pods under the section `#Add your Pods here`

```bash
  target 'App' do
  capacitor_pods
  # Add your Pods here
  pod 'CapacitorFirebaseAuthentication/Google', :path => '../../node_modules/@capacitor-firebase/authentication'
  pod 'CapacitorFirebaseFirestore', :path => '../../node_modules/@capacitor-firebase/firestore'
```


### To Use Filsystem

Add these configurations https://capacitorjs.com/docs/apis/filesystem