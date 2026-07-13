export interface GymStatus {
  isOpen: boolean;
  message: string;
  badgeColor: string;
  currentDayInKolkata: string;
  currentTimeInKolkata: string;
}

export function getKolkataStatus(): GymStatus {
  try {
    // Get current date/time in Asia/Kolkata
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric'
    });

    const parts = formatter.formatToParts(new Date());
    const partMap = Object.fromEntries(parts.map(p => [p.type, p.value]));

    const weekday = partMap.weekday; // e.g. "Monday"
    const hour = parseInt(partMap.hour, 10);
    const minute = parseInt(partMap.minute, 10);

    const currentTimeDecimal = hour + minute / 60;
    
    // Check timing rules:
    // Monday - Saturday: 6:30 AM (6.5) to 10:00 PM (22.0)
    // Sunday: 6:30 AM (6.5) to 1:00 PM (13.0)
    const isSunday = weekday === 'Sunday';
    const openTime = 6.5; // 6:30 AM
    const closeTime = isSunday ? 13.0 : 22.0; // 1:00 PM on Sunday, 10:00 PM otherwise

    const isOpen = currentTimeDecimal >= openTime && currentTimeDecimal < closeTime;

    // Build user-friendly current time string
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayMinute = minute.toString().padStart(2, '0');
    const timeStr = `${displayHour}:${displayMinute} ${ampm}`;

    if (isOpen) {
      // Calculate how many hours until closing
      const hoursLeft = closeTime - currentTimeDecimal;
      let closingMsg = '';
      if (hoursLeft < 1) {
        closingMsg = ` (Closing in ${Math.round(hoursLeft * 60)} mins)`;
      } else {
        closingMsg = ` (Closes at ${isSunday ? '1:00 PM' : '10:00 PM'})`;
      }
      return {
        isOpen: true,
        message: `Open Now • ${timeStr}${closingMsg}`,
        badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
        currentDayInKolkata: weekday,
        currentTimeInKolkata: timeStr
      };
    } else {
      // Calculate next opening day and time
      let nextOpening = "6:30 AM";
      let nextDayStr = "today";
      
      if (currentTimeDecimal >= closeTime) {
        nextDayStr = "tomorrow";
      }

      return {
        isOpen: false,
        message: `Closed • Opens ${nextDayStr} at ${nextOpening}`,
        badgeColor: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
        currentDayInKolkata: weekday,
        currentTimeInKolkata: timeStr
      };
    }
  } catch (error) {
    // Graceful fallback if Intl isn't fully supported
    return {
      isOpen: true,
      message: "Open Now • 6:30 AM - 10:00 PM",
      badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      currentDayInKolkata: "Monday",
      currentTimeInKolkata: "8:00 AM"
    };
  }
}
