# ============================================================
# Kailasa TWA — ProGuard / R8 keep rules
# ============================================================


# Keep ALL androidbrowserhelper classes — prevents stripping or
# renaming of ManageDataLauncherActivity, LauncherActivity,
# FocusActivity, DelegationService and anything else the library
# references via reflection or setComponentEnabledSetting.
-keep class com.google.androidbrowserhelper.** { *; }
-keep class com.google.androidbrowserhelper.trusted.** { *; }


# Keep AndroidX browser (Custom Tabs) classes used by the helper
-keep class androidx.browser.** { *; }


# Keep any class referenced in the manifest by fully-qualified name
-keep public class com.google.androidbrowserhelper.trusted.LauncherActivity { *; }
-keep public class com.google.androidbrowserhelper.trusted.ManageDataLauncherActivity { *; }
-keep public class com.google.androidbrowserhelper.trusted.FocusActivity { *; }
-keep public class com.google.androidbrowserhelper.trusted.DelegationService { *; }


# Don't warn about optional dependencies the library may reference
-dontwarn com.google.androidbrowserhelper.**
-dontwarn androidx.browser.**
