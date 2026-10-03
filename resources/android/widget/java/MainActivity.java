package dev.pages.k_ejr2.twa;

import android.content.Intent;
import android.os.Bundle;
import android.webkit.WebView;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(WidgetBridge.class);
        super.onCreate(savedInstanceState);
        WidgetBridge.captureLaunch(this, getIntent());
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        if (WidgetBridge.captureLaunch(this, intent) && getBridge() != null) {
            final WebView wv = getBridge().getWebView();
            if (wv != null) {
                wv.post(() -> wv.evaluateJavascript("window.KN&&KN.checkLaunch&&KN.checkLaunch()", null));
            }
        }
    }
}
