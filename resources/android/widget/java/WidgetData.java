package dev.pages.k_ejr2.twa;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;

import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

/** Shared helpers for the Kailasa home-screen widgets. */
final class WidgetData {
    static final String PREFS = "kailasa_widget";

    private WidgetData() {}

    static JSONObject load(Context c) {
        try {
            String s = c.getSharedPreferences(PREFS, Context.MODE_PRIVATE).getString("data", null);
            return s == null ? null : new JSONObject(s);
        } catch (Exception e) {
            return null;
        }
    }

    static String day(int offset) {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DATE, offset);
        return new SimpleDateFormat("yyyy-MM-dd", Locale.US).format(cal.getTime());
    }

    static boolean isPro(JSONObject d) {
        return d != null && "pro".equals(d.optString("tier"));
    }

    static PendingIntent open(Context c, String screen, int requestCode) {
        Intent i = new Intent(c, MainActivity.class);
        i.setAction("kailasa.OPEN." + screen);
        i.putExtra("kailasa_screen", screen);
        i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        return PendingIntent.getActivity(c, requestCode, i,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    static void refreshAll(Context c) {
        AppWidgetManager m = AppWidgetManager.getInstance(c);
        Class<?>[] kinds = {AffirmationWidget.class, RitualWidget.class, StreakWidget.class};
        for (Class<?> k : kinds) {
            int[] ids = m.getAppWidgetIds(new ComponentName(c, k));
            if (ids == null || ids.length == 0) continue;
            Intent i = new Intent(c, k);
            i.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
            i.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids);
            c.sendBroadcast(i);
        }
    }
}
