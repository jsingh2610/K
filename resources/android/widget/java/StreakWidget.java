package dev.pages.k_ejr2.twa;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.widget.RemoteViews;

import org.json.JSONObject;

/** 2x2 widget: sadhana streak, next badge and today's japa count. */
public class StreakWidget extends AppWidgetProvider {
    @Override
    public void onUpdate(Context c, AppWidgetManager m, int[] ids) {
        for (int id : ids) m.updateAppWidget(id, build(c));
    }

    static RemoteViews build(Context c) {
        RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.widget_streak);
        JSONObject d = WidgetData.load(c);
        String practice = d == null ? "" : d.optString("practice", "");
        boolean done = practice.equals(WidgetData.day(0));
        boolean alive = done || practice.equals(WidgetData.day(-1));
        int streak = d == null ? 0 : Math.max(0, d.optInt("streak", 0));
        // japa count only belongs to today if the data was written today
        int japa = (d != null && d.optString("date").equals(WidgetData.day(0))) ? d.optInt("japa", 0) : 0;
        if (d != null && alive) {
            v.setTextViewText(R.id.w_num, String.valueOf(done ? Math.max(streak, 1) : streak));
            v.setTextViewText(R.id.w_next, done ? d.optString("next", "") : "Practise today to keep it");
            v.setTextViewText(R.id.w_japa, "📿 " + japa + " japa today");
        } else {
            v.setTextViewText(R.id.w_num, "0");
            v.setTextViewText(R.id.w_next, "Start your streak today");
            v.setTextViewText(R.id.w_japa, "📿 Tap to begin");
        }
        v.setOnClickPendingIntent(R.id.w_root, WidgetData.open(c, "japa", 13));
        return v;
    }
}
