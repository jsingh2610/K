package dev.pages.k_ejr2.twa;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

/**
 * Bulletproof TWA launcher.
 * Extends the stock LauncherActivity which already handles:
 *   TWA launch → Custom Tabs fallback
 * We wrap onCreate in try-catch so if ANYTHING fails
 * (no Chrome, bad splash drawable, missing provider),
 * we gracefully open the site in any available browser.
 */
public class MainActivity extends androidx.browser.trusted.LauncherActivity {

    private static final String TAG = "Kailasa";
    private static final String URL = "https://k-er2.pages.dev";

    @Override
    protected Uri getLaunchingUrl() {
        // Hardcoded so we don't depend on meta-data resolution
        return Uri.parse(URL);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        try {
            super.onCreate(savedInstanceState);
        } catch (Exception e) {
            Log.e(TAG, "TWA launch failed, falling back to browser", e);
            openInBrowser();
        }
    }

    private void openInBrowser() {
        try {
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(URL));
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(intent);
        } catch (ActivityNotFoundException e) {
            Log.e(TAG, "No browser available at all", e);
        }
        finish();
    }
}
