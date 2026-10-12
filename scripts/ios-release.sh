#!/usr/bin/env bash
# Builds the App Store package and, with "upload", sends it to App Store Connect / TestFlight.
#   npm run ios:release            -> ios/build/export/SolucaoEletrica.ipa
#   npm run ios:release -- upload  -> uploads the build (needs the app created in App Store Connect)
# Needs Xcode signed in with an account of team FB7R6D99A3.
#
# The archive is built unsigned and the export signs it for distribution: automatic signing
# would otherwise demand a development profile, which Apple only issues once a device is registered.
# Raise CURRENT_PROJECT_VERSION (build number) before each new upload.
set -euo pipefail

DESTINO="${1:-export}"
cd "$(dirname "$0")/../ios"
rm -rf build/SolucaoEletrica.xcarchive build/export

xcodebuild -workspace SolucaoEletrica.xcworkspace -scheme SolucaoEletrica \
  -configuration Release -destination "generic/platform=iOS" \
  -archivePath build/SolucaoEletrica.xcarchive \
  CODE_SIGNING_ALLOWED=NO CODE_SIGNING_REQUIRED=NO CODE_SIGN_IDENTITY="" archive

cat > build/ExportOptions.plist <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>method</key><string>app-store-connect</string>
  <key>teamID</key><string>FB7R6D99A3</string>
  <key>signingStyle</key><string>automatic</string>
  <key>destination</key><string>${DESTINO}</string>
  <key>uploadSymbols</key><true/>
</dict>
</plist>
PLIST

xcodebuild -exportArchive -archivePath build/SolucaoEletrica.xcarchive \
  -exportOptionsPlist build/ExportOptions.plist -exportPath build/export -allowProvisioningUpdates
