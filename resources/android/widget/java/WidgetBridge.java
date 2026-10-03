package dev.pages.k_ejr2.twa;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/** Bridge between the web app and the native widgets. */
@CapacitorPlugin(name = "WidgetBridge")
public class WidgetBridge extends Plugin {

    /** Remember which screen a widget tap asked for, so the web app can open it. */
    static boolean captureLaunch(Context c, Intent i) {
        if (i == null) return false;
        String s = i.getStringExtra("kailasa_screen");
        if (s == null) return false;
        c.getSharedPreferences(WidgetData.PREFS, Context.MODE_PRIVATE).edit().putString("launch", s).apply();
        i.removeExtra("kailasa_screen");
        return true;
    }

    @PluginMethod
    public void update(PluginCall call) {
        String data = call.getString("data");
        if (data == null) {
            call.reject("missing data");
            return;
        }
        Context c = getContext();
        c.getSharedPreferences(WidgetData.PREFS, Context.MODE_PRIVATE).edit().putString("data", data).apply();
        WidgetData.refreshAll(c);
        call.resolve();
    }

    @PluginMethod
    public void consumeLaunchScreen(PluginCall call) {
        SharedPreferences p = getContext().getSharedPreferences(WidgetData.PREFS, Context.MODE_PRIVATE);
        String s = p.getString("launch", null);
        p.edit().remove("launch").apply();
        JSObject r = new JSObject();
        if (s != null) r.put("screen", s);
        call.resolve(r);
    }
}
