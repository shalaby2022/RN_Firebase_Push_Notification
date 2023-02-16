package com.firebase;

import android.app.Application;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;
import java.util.List;

// importing firebase app
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
// importing firestore
import io.invertase.firebase.firestore.ReactNativeFirebaseFirestorePackage;
// importing firebase auth
import io.invertase.firebase.auth.ReactNativeFirebaseAuthPackage;
// importing arrays for firestore
import java.util.Arrays;
// importing mainreactpackage for firestore
import com.facebook.react.shell.MainReactPackage;
// importing RNScreen package
import com.swmansion.rnscreens.RNScreensPackage;
// importing SafeAreaContextPackage for error handling
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// importing pushnotification package
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
// importing firebase messaging package
import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage;
// importing firebase storage package
import io.invertase.firebase.storage.ReactNativeFirebaseStoragePackage;
// importing image picker package
import com.imagepicker.ImagePickerPackage;
// importing RNFS package for photo edit help
import com.rnfs.RNFSPackage;
// importing RNFblob package
import com.RNFetchBlob.RNFetchBlobPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new DefaultReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          return Arrays.asList(
            new MainReactPackage(),
            new SafeAreaContextPackage(),
            new ImagePickerPackage(),
            new RNFSPackage(),
            new RNScreensPackage(),
            new RNFetchBlobPackage(),
            new ReactNativeFirebaseAppPackage(),
            new ReactNativePushNotificationPackage(),
            new ReactNativeFirebaseMessagingPackage(),
            new ReactNativeFirebaseFirestorePackage(),
            new ReactNativeFirebaseStoragePackage(),
            new ReactNativeFirebaseAuthPackage()
            );
          // @SuppressWarnings("UnnecessaryLocalVariable")
          // List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          // return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }

        @Override
        protected boolean isNewArchEnabled() {
          return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }

        @Override
        protected Boolean isHermesEnabled() {
          return BuildConfig.IS_HERMES_ENABLED;
        }

      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      DefaultNewArchitectureEntryPoint.load();
    }
    ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }
}
