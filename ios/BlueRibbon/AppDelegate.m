/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>
#import <react-native-branch/RNBranch/RNBranch.h>
#import <FirebaseAnalytics/FirebaseAnalytics.h>
#import <FirebaseDynamicLinks/FirebaseDynamicLinks.h>
#import <GoogleMaps/GoogleMaps.h>
#import <AppCenterReactNativeShared/AppCenterReactNativeShared.h>
#import <AppCenterReactNative.h>
#import <AppCenterReactNativeAnalytics.h>
#import <AppCenterReactNativeCrashes.h>
#import "RNFirebaseLinks.h"

@import Firebase;

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [GMSServices provideAPIKey:@"AIzaSyBe12m5Dr_Nl4Npazinei3sQoJKr3MbuuY"];
  
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"BlueRibbon"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [AppCenterReactNative register];
  [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];
  [AppCenterReactNativeCrashes registerWithAutomaticProcessing];

  
  [FIROptions defaultOptions].deepLinkURLScheme = @"com.blueribbon.wallet";
    
  [FIRApp configure];
  return YES;
}

//- (BOOL)application:(UIApplication *)application
//continueUserActivity:(nonnull NSUserActivity *)userActivity
// restorationHandler:
//#if defined(__IPHONE_12_0) && (__IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_12_0)
//(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> *_Nullable))restorationHandler {
//#else
//    (nonnull void (^)(NSArray *_Nullable))restorationHandler {
//#endif  // __IPHONE_12_0
//  BOOL handled = [[FIRDynamicLinks dynamicLinks] handleUniversalLink:userActivity.webpageURL
//                                                          completion:^(FIRDynamicLink * _Nullable dynamicLink,
//                                                                       NSError * _Nullable error) {
//                                                            // ...
//                                                          }];
//  return handled;
//}
//
//- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity
// restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
//{
//  return [RCTLinkingManager application:application
//                   continueUserActivity:userActivity
//                     restorationHandler:restorationHandler];
//}
  


- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}


- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<NSString *, id> *)options {
  
  BOOL handled = [RCTLinkingManager application:application
             openURL:url
   sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
          annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];
  
  if (!handled) {
      handled = [[RNFirebaseLinks instance] application:application openURL:url options:options];
  }

  return handled;
  
}

- (BOOL)application:(UIApplication *)application
continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(void (^)(NSArray *))restorationHandler {
  
  BOOL handled = [RCTLinkingManager application:application
                     continueUserActivity:userActivity
                       restorationHandler:restorationHandler];
  
  if (!handled) {
    handled = [[RNFirebaseLinks instance] application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
  }
    
  return handled;
  
}
  
  
//  - (BOOL)application:(UIApplication *)app
//              openURL:(NSURL *)url
//              options:(NSDictionary<NSString *, id> *)options {
//
//
//    return [self application:app
//                     openURL:url
//           sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
//                  annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];
//  }



  
  
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
  // handler for Push Notifications
  [[Branch getInstance] handlePushNotification:userInfo];
}


@end
