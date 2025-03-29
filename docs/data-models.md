# Data Models

This document outlines the data models and database schema for the FloodSpy application.

## Overview

The FloodSpy application uses a relational database structure to store and manage data related to flood monitoring, user information, locations, alerts, and sensor data.

## Entity Relationship Diagram

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    User     │       │  Location   │       │   Sensor    │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id          │       │ id          │       │ id          │
│ email       │       │ name        │       │ name        │
│ password    │       │ latitude    │       │ type        │
│ name        │       │ longitude   │       │ latitude    │
│ phone       │       │ address     │       │ longitude   │
│ preferences │       │ region_id   │◄──────┤ region_id   │
└─────┬───────┘       └──────┬──────┘       │ status      │
      │                      │              │ last_updated│
      │                      │              └──────┬──────┘
      │                      │                     │
      │                      │                     │
      │                      │                     │
┌─────▼───────┐       ┌──────▼──────┐       ┌──────▼──────┐
│UserLocation │       │   Region    │       │ SensorData  │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ user_id     │       │ id          │       │ id          │
│ location_id │       │ name        │       │ sensor_id   │
│ is_primary  │       │ boundaries  │       │ value       │
│ alert_level │       │ risk_level  │       │ timestamp   │
└─────────────┘       └─────────────┘       └─────────────┘
      │                                            │
      │                                            │
      │                                            │
┌─────▼───────┐                            ┌──────▼──────┐
│    Alert    │                            │   Forecast  │
├─────────────┤                            ├─────────────┤
│ id          │                            │ id          │
│ user_id     │                            │ region_id   │
│ location_id │                            │ prediction  │
│ severity    │                            │ confidence  │
│ message     │                            │ timestamp   │
│ timestamp   │                            │ valid_until │
│ is_read     │                            └─────────────┘
└─────────────┘
```

## Data Models

### User
Stores information about application users.

| Field       | Type         | Description                                   |
|-------------|--------------|-----------------------------------------------|
| id          | UUID         | Primary key                                   |
| email       | String       | User's email address (unique)                 |
| password    | String       | Hashed password                               |
| name        | String       | User's full name                              |
| phone       | String       | User's phone number (optional)                |
| preferences | JSON         | User preferences for notifications and display |
| created_at  | Timestamp    | When the user account was created             |
| updated_at  | Timestamp    | When the user account was last updated        |

### Location
Represents a geographic location that can be monitored for flooding.

| Field       | Type         | Description                                   |
|-------------|--------------|-----------------------------------------------|
| id          | UUID         | Primary key                                   |
| name        | String       | Location name                                 |
| latitude    | Float        | Geographic latitude                           |
| longitude   | Float        | Geographic longitude                          |
| address     | String       | Human-readable address                        |
| region_id   | UUID         | Foreign key to Region                         |
| created_at  | Timestamp    | When the location was added                   |
| updated_at  | Timestamp    | When the location was last updated            |

### UserLocation
Junction table linking users to their saved locations.

| Field        | Type         | Description                                   |
|--------------|--------------|-----------------------------------------------|
| user_id      | UUID         | Foreign key to User                           |
| location_id  | UUID         | Foreign key to Location                       |
| is_primary   | Boolean      | Whether this is the user's primary location   |
| alert_level  | Enum         | Minimum severity level for alerts (low/medium/high) |
| created_at   | Timestamp    | When the relation was created                 |
| updated_at   | Timestamp    | When the relation was last updated            |

### Region
Represents a geographic region or area for flood monitoring.

| Field       | Type         | Description                                   |
|-------------|--------------|-----------------------------------------------|
| id          | UUID         | Primary key                                   |
| name        | String       | Region name                                   |
| boundaries  | Geometry     | Geographic boundaries (GeoJSON)               |
| risk_level  | Enum         | Overall flood risk level (low/medium/high)    |
| created_at  | Timestamp    | When the region was added                     |
| updated_at  | Timestamp    | When the region was last updated              |

### Sensor
Represents a physical flood sensor device.

| Field        | Type         | Description                                   |
|--------------|--------------|-----------------------------------------------|
| id           | UUID         | Primary key                                   |
| name         | String       | Sensor name                                   |
| type         | Enum         | Type of sensor (water level, flow rate, etc.) |
| latitude     | Float        | Geographic latitude                           |
| longitude    | Float        | Geographic longitude                          |
| region_id    | UUID         | Foreign key to Region                         |
| status       | Enum         | Operational status (active/inactive/maintenance) |
| last_updated | Timestamp    | When the sensor last reported data            |
| created_at   | Timestamp    | When the sensor was added to the system       |
| updated_at   | Timestamp    | When the sensor information was last updated  |

### SensorData
Stores readings from flood sensors.

| Field       | Type         | Description                                   |
|-------------|--------------|-----------------------------------------------|
| id          | UUID         | Primary key                                   |
| sensor_id   | UUID         | Foreign key to Sensor                         |
| value       | Float        | Measured value (e.g., water level in cm)      |
| timestamp   | Timestamp    | When the reading was taken                    |
| created_at  | Timestamp    | When the data was added to the system         |

### Alert
Represents notifications sent to users about flood conditions.

| Field        | Type         | Description                                   |
|--------------|--------------|-----------------------------------------------|
| id           | UUID         | Primary key                                   |
| user_id      | UUID         | Foreign key to User                           |
| location_id  | UUID         | Foreign key to Location                       |
| severity     | Enum         | Alert severity (low/medium/high)              |
| message      | String       | Alert message content                         |
| timestamp    | Timestamp    | When the alert was generated                  |
| is_read      | Boolean      | Whether the user has viewed the alert         |
| created_at   | Timestamp    | When the alert was created                    |
| updated_at   | Timestamp    | When the alert was last updated               |

### Forecast
Stores flood prediction data.

| Field        | Type         | Description                                   |
|--------------|--------------|-----------------------------------------------|
| id           | UUID         | Primary key                                   |
| region_id    | UUID         | Foreign key to Region                         |
| prediction   | JSON         | Predicted flood levels and conditions         |
| confidence   | Float        | Confidence level of prediction (0-1)          |
| timestamp    | Timestamp    | When the forecast was generated               |
| valid_until  | Timestamp    | When the forecast expires                     |
| created_at   | Timestamp    | When the forecast was added to the system     |

## Data Flow

1. **Sensor Data Collection**:
   - Sensors continuously collect data about water levels, flow rates, etc.
   - Data is transmitted to the application and stored in the SensorData table
   - Current sensor status is updated in the Sensor table

2. **Alert Generation**:
   - System analyzes sensor data against thresholds
   - When thresholds are exceeded, alerts are generated for affected regions
   - Alerts are filtered based on user locations and preferences
   - Notifications are sent to users via preferred channels

3. **Forecast Generation**:
   - Historical sensor data is analyzed along with weather forecasts
   - Predictive models generate flood forecasts for regions
   - Forecasts are stored and made available through the application

4. **User Interaction**:
   - Users can view real-time and historical data for their saved locations
   - Users receive and manage alerts based on their preferences
   - Users can contribute community reports to supplement sensor data

## Data Retention Policy

- **Sensor Data**: Raw sensor data is retained for 2 years, then aggregated
- **Alerts**: Retained for 1 year
- **User Data**: Retained until account deletion
- **Forecasts**: Retained for 6 months for accuracy analysis

## Data Security

- All personally identifiable information is encrypted at rest
- User passwords are hashed using bcrypt
- Data access is controlled through role-based permissions
- All API requests require authentication
- Sensitive operations are logged for audit purposes
