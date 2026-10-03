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
        String date = d == null ? "" : d.optString("date");
        if (d != null && date.equals(WidgetData.day(0))) {
            v.setTextViewText(R.id.w_num, String.valueOf(d.optInt("streak", 1)));
            v.setTextViewText(R.id.w_next, d.optString("next", ""));
            v.setTextViewText(R.id.w_japa, "📿 " + d.optInt("japa", 0) + " japa today");
        } else if (d != null && date.equals(WidgetData.day(-1))) {
            v.setTextViewText(R.id.w_num, String.valueOf(d.optInt("streak", 1)));
            v.setTextViewText(R.id.w_next, "Open today to keep it");
            v.setTextViewText(R.id.w_japa, "📿 0 japa today");
        } else {
            v.setTextViewText(R.id.w_num, "0");
            v.setTextViewText(R.id.w_next, "Start your streak today");
            v.setTextViewText(R.id.w_japa, "📿 Tap to begin");
        }
        v.setOnClickPendingIntent(R.id.w_root, WidgetData.open(c, "japa", 13));
        return v;
    }
}
