# Dashboard Wireframe

```
┌─────────────────────────────────────────────────────────────────────────┐
│ FLOODSPY                                      🔔 👤 [User] ▼             │
├─────────────────────────────────────────────────────────────────────────┤
│ ┌───────────┐                                                           │
│ │           │  📍 [Current Location] ▼           🔍 Search locations     │
│ │ NAVIGATION│                                                           │
│ │           │  ┌─────────────────────────────────────────────────────┐  │
│ │ Dashboard │  │                                                     │  │
│ │           │  │                                                     │  │
│ │ My        │  │                                                     │  │
│ │ Locations │  │                                                     │  │
│ │           │  │                INTERACTIVE MAP                      │  │
│ │ Alerts    │  │                                                     │  │
│ │           │  │                                                     │  │
│ │ Historical│  │                                                     │  │
│ │ Data      │  │                                                     │  │
│ │           │  └─────────────────────────────────────────────────────┘  │
│ │ Reports   │                                                           │
│ │           │  ┌──────────────────┐  ┌──────────────────┐  ┌──────────┐ │
│ │ Settings  │  │ CURRENT STATUS   │  │ FORECAST         │  │ ALERTS   │ │
│ │           │  │                  │  │                  │  │          │ │
│ └───────────┘  │ Water Level: 2.3m│  │ 24h Prediction   │  │ ⚠️ Medium │ │
│                │ Status: MODERATE │  │ [Chart]          │  │ 2 active │ │
│                │ Change: ↑ 0.2m   │  │ Trend: Rising    │  │ View all │ │
│                └──────────────────┘  └──────────────────┘  └──────────┘ │
│                                                                         │
│  ┌─────────────────────────────────┐  ┌─────────────────────────────┐   │
│  │ NEARBY SENSORS                  │  │ RECENT COMMUNITY REPORTS    │   │
│  │                                 │  │                             │   │
│  │ • Sensor A: 2.1m (↑)           │  │ • Road closure on Main St   │   │
│  │ • Sensor B: 1.8m (→)           │  │ • Flooding at Central Park  │   │
│  │ • Sensor C: 2.5m (↑)           │  │ • Power outage in District 3│   │
│  │                                 │  │                             │   │
│  │ View all sensors                │  │ Submit a report             │   │
│  └─────────────────────────────────┘  └─────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Component Description

### Header
- **Logo**: FloodSpy branding
- **Notification Bell**: Access to all system notifications
- **User Profile**: Dropdown for account management

### Location Selector
- Dropdown to select from saved locations
- Current location displayed prominently

### Interactive Map
- Central feature showing flood data visualization
- Color-coded flood levels
- Sensor locations marked
- Ability to zoom and pan
- Layer toggles for different data types

### Current Status Card
- Real-time water level information
- Status indicator (Low, Moderate, High, Severe)
- Change indicator showing trend

### Forecast Card
- 24-hour prediction visualization
- Trend indicator
- Confidence level

### Alerts Card
- Summary of active alerts
- Severity indicator
- Quick access to view all alerts

### Nearby Sensors
- List of closest sensors to selected location
- Current readings with trend indicators
- Link to view all sensors

### Community Reports
- Recent user-submitted reports for the area
- Quick access to submit new reports
- Link to view all reports

### Navigation Sidebar
- Access to all main sections of the application
- Visual indication of current section

## Interactions

1. **Map Interactions**:
   - Click on map locations to see detailed information
   - Toggle layers for different data visualizations
   - Zoom in/out for different detail levels

2. **Location Selection**:
   - Change location to update all dashboard components
   - Search functionality for finding new locations

3. **Alert Interactions**:
   - Click on alerts to see detailed information
   - Mark alerts as read
   - Configure alert preferences

4. **Sensor Data**:
   - Click on sensors to see historical readings
   - View sensor details and reliability information

5. **Community Engagement**:
   - Submit new reports
   - Verify existing reports
   - Filter reports by type or time

## Responsive Considerations

- On mobile devices, the navigation collapses to a hamburger menu
- Map remains central but with reduced height
- Cards stack vertically instead of horizontally
- Critical information remains visible without scrolling
