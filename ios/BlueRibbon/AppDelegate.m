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
#import <FirebaseAnalytics/FirebaseAnalytics.h>
#import <FirebaseDynamicLinks/FirebaseDynamicLinks.h>
#import <GoogleMaps/GoogleMaps.h>
#import <AppCenterReactNativeShared/AppCenterReactNativeShared.h>
#import <AppCenterReactNative.h>
#import <AppCenterReactNativeAnalytics.h>
#import <AppCenterReactNativeCrashes.h>

#import "RNFirebaseLinks.h"

#import "RNNotifications.h"
#import "RNCPushNotificationIOS.h"


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
  
  [[UNUserNotificationCenter currentNotificationCenter] setDelegate:self];
  [RNNotifications startMonitorNotifications];
  return YES;
}


// Required to register for notifications
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
  [RNCPushNotificationIOS didRegisterUserNotificationSettings:notificationSettings];
}
// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
  [RNNotifications didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}
// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  [RNNotifications didFailToRegisterForRemoteNotificationsWithError:error];
  [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
}
// Required for the localNotification event.
- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
{
  [RNCPushNotificationIOS didReceiveLocalNotification:notification];
}






- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}



// handle dynamic links

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}

- (BOOL)application:(UIApplication *)application
continueUserActivity:(nonnull NSUserActivity *)userActivity restorationHandler:(nonnull void (^)
   (NSArray<id<UIUserActivityRestoring>> *
   _Nullable))restorationHandler {
  

  BOOL handled = [[FIRDynamicLinks dynamicLinks]
      handleUniversalLink:userActivity.webpageURL
      completion:^(FIRDynamicLink * _Nullable dynamicLink,
      NSError * _Nullable error) {
    if (!error) {
      [RCTLinkingManager application:application
            openURL:dynamicLink.url options:nil];
      [[RNFirebaseLinks instance] application:application
            openURL:dynamicLink.url options:nil];
     }
  }];
  if(!handled) {
  handled = [RCTLinkingManager application:application
       continueUserActivity:userActivity
       restorationHandler:restorationHandler];
  }
  return handled;

}
  
- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<NSString *, id> *)options {
  
  BOOL handled = NO;
  FIRDynamicLink *dynamicLink = [[FIRDynamicLinks dynamicLinks]
       dynamicLinkFromCustomSchemeURL:url];
    if (dynamicLink) {
      if (dynamicLink.url) {
        handled = [RCTLinkingManager application:app
          openURL:dynamicLink.url options:options]
          || [[RNFirebaseLinks instance] application:app openURL:dynamicLink.url options:options];
        }
    }
    if(!handled) {
      handled = [RCTLinkingManager application:app openURL:url
          options:options];
    }
    return handled;
                   
}
 
@end
