package dev.pages.k_ejr2.twa;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.widget.RemoteViews;

import org.json.JSONObject;

/** 4x2 widget: today's affirmation for the user's sankalp pillar. */
public class AffirmationWidget extends AppWidgetProvider {
    @Override
    public void onUpdate(Context c, AppWidgetManager m, int[] ids) {
        for (int id : ids) m.updateAppWidget(id, build(c));
    }

    static RemoteViews build(Context c) {
        RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.widget_affirmation);
        JSONObject d = WidgetData.load(c);
        String pillar = "TODAY'S AFFIRMATION";
        String aff = null;
        if (d != null) {
            pillar = d.optString("pillar", pillar);
            JSONObject a = d.optJSONObject("aff");
            if (a != null) aff = a.optString(WidgetData.day(0), null);
        }
        if (aff == null || aff.isEmpty()) {
            aff = d == null ? "Open Kailasa to set your sankalp 🔱" : "Open Kailasa for today's affirmation 🔱";
        } else {
            aff = "“" + aff + "”";
        }
        v.setTextViewText(R.id.w_pillar, pillar);
        v.setTextViewText(R.id.w_text, aff);
        v.setOnClickPendingIntent(R.id.w_root, WidgetData.open(c, "affirm", 11));
        return v;
    }
}
