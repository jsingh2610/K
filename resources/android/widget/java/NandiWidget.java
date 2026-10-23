package dev.pages.k_ejr2.twa;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.widget.RemoteViews;

import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;

/**
 * Nandi streak widget. Everything is worked out from the phone's own clock at render time,
 * so it is correct even if the app has not been opened today (like Duolingo):
 * done today -> celebrating; not yet -> eager morning, sad afternoon, angry evening,
 * nervous countdown before midnight, sleepy after midnight; streak broken -> scared.
 * WidgetTick re-renders at the top of every hour and just after midnight.
 */
public class NandiWidget extends AppWidgetProvider {
    private static final int[] DOTS = {R.id.w_d0, R.id.w_d1, R.id.w_d2, R.id.w_d3, R.id.w_d4, R.id.w_d5, R.id.w_d6};

    @Override
    public void onUpdate(Context c, AppWidgetManager m, int[] ids) {
        for (int id : ids) m.updateAppWidget(id, build(c));
        WidgetData.scheduleNext(c);
    }

    @Override
    public void onEnabled(Context c) {
        WidgetData.scheduleNext(c);
    }

    private static String pick(String[] a, int seed) {
        return a[Math.abs(seed) % a.length];
    }

    static RemoteViews build(Context c) {
        RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.widget_nandi);
        JSONObject d = WidgetData.load(c);
        Calendar now = Calendar.getInstance();
        String today = WidgetData.day(0), yest = WidgetData.day(-1);
        String practice = d == null ? "" : d.optString("practice", "");
        String opened = d == null ? "" : d.optString("date", "");
        int streak = d == null ? 0 : Math.max(0, d.optInt("streak", 0));
        boolean done = today.equals(practice);
        boolean activeToday = done || today.equals(opened);
        boolean alive = activeToday || yest.equals(opened) || yest.equals(practice);
        if (!alive) streak = 0;
        int hour = now.get(Calendar.HOUR_OF_DAY);
        int left = 24 - hour;
        int seed = now.get(Calendar.DAY_OF_YEAR);

        int img, bg;
        String msg;
        if (d == null) {
            img = R.drawable.nandi_surprised; bg = R.drawable.wn_go;
            msg = "Pranam! Let's begin your sadhana 🔱";
        } else if (done) {
            img = R.drawable.nandi_congrats; bg = R.drawable.wn_done;
            msg = pick(new String[]{"Shabash! Day " + Math.max(streak, 1) + " done 🔱", "Mahadev is pleased today ✨", "Done for today. See you tomorrow 🙏"}, seed);
        } else if (!alive) {
            img = R.drawable.nandi_scared; bg = R.drawable.wn_lost;
            msg = "Streak lost… start fresh today 🙏";
        } else if (hour < 4) {
            img = R.drawable.nandi_sleepy; bg = R.drawable.wn_sleep;
            msg = "Zzz… Brahma Muhurta soon 🌙";
        } else if (hour < 12) {
            img = R.drawable.nandi_surprised; bg = R.drawable.wn_go;
            msg = pick(new String[]{"Today's sadhana awaits ☀️", "C'mon, just 10 minutes!", "Har Har Mahadev! Let's go 🔱"}, seed);
        } else if (hour < 17) {
            img = R.drawable.nandi_sad; bg = R.drawable.wn_sad;
            msg = pick(new String[]{"Mahadev is waiting… 🥺", "You haven't practised yet 🥺"}, seed);
        } else if (hour < 21) {
            img = R.drawable.nandi_angry; bg = R.drawable.wn_angry;
            msg = streak > 1 ? "Don't break " + streak + " days! 😤" : "Don't skip today! 😤";
        } else {
            img = R.drawable.nandi_nervous; bg = R.drawable.wn_late;
            msg = "⏳ " + left + "h left to save your streak!";
        }

        v.setInt(R.id.w_root, "setBackgroundResource", bg);
        v.setImageViewResource(R.id.w_nandi, img);
        v.setTextViewText(R.id.w_days, String.valueOf(streak));
        v.setTextViewText(R.id.w_msg, msg);
        v.setTextViewText(R.id.w_date,
                new SimpleDateFormat("EEE · d MMM", Locale.US).format(now.getTime()).toUpperCase(Locale.US));

        // last 7 days: practiced (gold), today pending (gold ring), missed (dim)
        int runEnd = activeToday ? 0 : -1;
        int runStart = runEnd - Math.max(streak, 0) + 1;
        SimpleDateFormat letter = new SimpleDateFormat("EEEEE", Locale.US);
        for (int i = 0; i < 7; i++) {
            int off = i - 6;
            Calendar cal = Calendar.getInstance();
            cal.add(Calendar.DATE, off);
            v.setTextViewText(DOTS[i], letter.format(cal.getTime()));
            boolean filled;
            if (off == 0) filled = done;
            else filled = alive && streak > 0 && off >= runStart && off <= runEnd;
            int res = filled ? R.drawable.wn_dot_done : (off == 0 ? R.drawable.wn_dot_today : R.drawable.wn_dot_off);
            v.setInt(DOTS[i], "setBackgroundResource", res);
            v.setTextColor(DOTS[i], filled ? 0xFF1A1206 : (off == 0 ? 0xFFFFC46B : 0x80FFFFFF));
        }
        v.setOnClickPendingIntent(R.id.w_root, WidgetData.open(c, done ? "course" : "japa", 14));
        return v;
    }
}
