package dev.pages.k_ejr2.twa;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

/**
 * Keeps the widgets in step with the clock: fires every hour (and just after midnight),
 * plus after reboot, app update and time/timezone changes, then re-renders all widgets.
 */
public class WidgetTick extends BroadcastReceiver {
    @Override
    public void onReceive(Context c, Intent i) {
        WidgetData.refreshAll(c);
    }
}
