package dev.pages.k_ejr2.twa;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.widget.RemoteViews;

import java.util.Calendar;

/** 2x2 widget: today's weekly sacred ritual (Sadhu feature; Bhakt sees a lock). */
public class RitualWidget extends AppWidgetProvider {
    private static final String[] DAY = {"RAVIVAR", "SOMVAR", "MANGALVAR", "BUDHVAR", "GURUVAR", "SHUKRAVAR", "SHANIVAR"};
    private static final String[] ICON = {"☀️", "🥛", "🪔", "🌿", "🫘", "🪔", "🛢️"};
    private static final String[] NAME = {"Water to Surya Dev", "Milk Abhishek", "Light a Diya", "Tulsi in Wallet", "Donate Yellow Dal", "Ghee Diya", "Mustard Oil Offering"};
    private static final String[] DEITY = {"Surya Dev", "Lord Shiva", "Hanuman Ji", "Tulsi Devi", "Brihaspati Dev", "Lakshmi Ji", "Shani Dev"};

    @Override
    public void onUpdate(Context c, AppWidgetManager m, int[] ids) {
        for (int id : ids) m.updateAppWidget(id, build(c));
    }

    static RemoteViews build(Context c) {
        RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.widget_ritual);
        int wd = Calendar.getInstance().get(Calendar.DAY_OF_WEEK) - 1; // 0 = Sunday
        v.setTextViewText(R.id.w_day, DAY[wd]);
        if (WidgetData.isPro(WidgetData.load(c))) {
            v.setTextViewText(R.id.w_icon, ICON[wd]);
            v.setTextViewText(R.id.w_name, NAME[wd]);
            v.setTextViewText(R.id.w_deity, DEITY[wd]);
        } else {
            v.setTextViewText(R.id.w_icon, "🔒");
            v.setTextViewText(R.id.w_name, "Today's ritual");
            v.setTextViewText(R.id.w_deity, "Unlock with Sadhu");
        }
        v.setOnClickPendingIntent(R.id.w_root, WidgetData.open(c, "ritual", 12));
        return v;
    }
}
