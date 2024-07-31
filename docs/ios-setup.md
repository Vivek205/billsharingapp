## Things to consider when we clean and re-create the ios project

### Prerequisites

- Install [CocoaPods](https://formulae.brew.sh/formula/cocoapods)
- Choose the right team under Signing & Capabilities

### Info PList

Add the following keys to the Info.plist file

#### Camera Permissions

```xml
	<key>NSCameraUsageDescription</key>
	<string>$(PRODUCT_NAME) needs camera access to capture the receipt</string>
	<key>NSPhotoLibraryAddUsageDescription</key>
	<string>$(PRODUCT_NAME) needs this access to store the captured receipt</string>
	<key>NSPhotoLibraryUsageDescription</key>
	<string>$(PRODUCT_NAME) needs this access to fetch a receipt from the gallery</string>
```
