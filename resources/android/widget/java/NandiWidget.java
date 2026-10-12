package dev.pages.k_ejr2.twa;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.widget.RemoteViews;

import org.json.JSONObject;

import java.util.Calendar;

/**
 * Nandi streak widget: counts sadhana days and Nandi's mood follows today's practice.
 * Done today -> celebrating. Not done -> eager in the morning, sad in the afternoon,
 * angry in the evening, nervous before midnight, sleepy late at night. Streak broken -> scared.
 * Re-evaluated every 30 minutes by the system and whenever the app saves.
 */
public class NandiWidget extends AppWidgetProvider {
    @Override
    public void onUpdate(Context c, AppWidgetManager m, int[] ids) {
        for (int id : ids) m.updateAppWidget(id, build(c));
    }

    static RemoteViews build(Context c) {
        RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.widget_nandi);
        JSONObject d = WidgetData.load(c);
        String today = WidgetData.day(0), yesterday = WidgetData.day(-1);
        String last = d == null ? "" : d.optString("practice", "");
        int streak = d == null ? 0 : d.optInt("streak", 0);
        boolean doneToday = today.equals(last);
        boolean alive = doneToday || yesterday.equals(last);
        int hour = Calendar.getInstance().get(Calendar.HOUR_OF_DAY);

        int img;
        String msg;
        if (d == null) {
            img = R.drawable.nandi_surprised; streak = 0; msg = "Let's begin your sadhana!";
        } else if (doneToday) {
            img = R.drawable.nandi_congrats; msg = "Shabash! Day done 🔱";
        } else if (!alive) {
            img = R.drawable.nandi_scared; streak = 0; msg = "Streak lost! Start again today";
        } else if (hour < 4) {
            img = R.drawable.nandi_sleepy; msg = "Zzz… sadhana at Brahma Muhurta";
        } else if (hour < 12) {
            img = R.drawable.nandi_surprised; msg = "C'mon, let's do it!";
        } else if (hour < 17) {
            img = R.drawable.nandi_sad; msg = "Mahadev is waiting… 🥺";
        } else if (hour < 22) {
            img = R.drawable.nandi_angry; msg = "Don't break the streak! 😤";
        } else {
            img = R.drawable.nandi_nervous; msg = "Last call before midnight!";
        }
        v.setImageViewResource(R.id.w_nandi, img);
        v.setTextViewText(R.id.w_days, String.valueOf(streak));
        v.setTextViewText(R.id.w_msg, msg);
        v.setOnClickPendingIntent(R.id.w_root, WidgetData.open(c, doneToday ? "course" : "japa", 14));
        return v;
    }
}
