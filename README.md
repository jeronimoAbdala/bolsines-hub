# Bolsines Hub

Create a modern web application UI for a university system called "Bolsines".

Purpose:

Manage the shipment and reception of document bags ("Bolsines") between Medical Commissions.

Technology style:

- Clean Architecture inspired

- Enterprise dashboard

- Modern SaaS design

- Material Design 3

- Responsive

- Light theme with blue and white palette

- Professional, similar to Microsoft or Google administrative systems

Main Modules:

1. Login Screen

- Username field

- Password field

- Login button

- Clean card layout centered on screen

2. Main Dashboard

- Sidebar navigation

- Dashboard cards

- Statistics overview

- User information in top-right corner

- Notifications icon

Sidebar menu:

- Documentation

- Remitos

- Bolsines

- Medical Commissions

- Tracking

- Reports

- Users

- Settings

3. Register Reception of Bolsin Screen

This is the main use case.

Layout:

- Header: "Registrar Recepción de Bolsín"

Section: Current Medical Commission

- Readonly commission name

- Logged user information

Section: Search Sent Bolsines

- Filter by seal number

- Filter by origin commission

- Search button

Results Table:

Columns:

- Bolsin Number

- Origin Commission

- Destination Commission

- Seal Number

- Current Status

Button:

- Select Bolsin

Section: Bolsin Content

Expandable table:

Remito

 - Documentation Subject

 - Document Type

 - Current Status

Reception Options (Radio Group):

- Content matches registration

- Missing documentation

- Incorrect documentation

- Redirect documentation to another area

Buttons:

- Confirm Reception

- Cancel

4. Bolsin Tracking Screen

Interactive map layout

Filters:

- Seal Number

- Destination Commission

Map:

- Markers representing Bolsines in transit

Side Panel:

- Bolsin Number

- Last Position

- Last Update Time

- Destination Commission

Button:

- Notify destination manager

5. Reports Screen

Cards:

- Bolsines in transit

- Received bolsines

- Rejected documentation

- Redirected documentation

Charts:

- Line chart

- Bar chart

- Pie chart

6. Domain Model Visualization

Include a UML-inspired panel showing relationships:

Session

 → User

 → Employee

 → Medical Commission

Bolsin

 → Remitos

 → Documentation

Documentation

 → Document Type

 → Status

Use subtle entity relationship cards to visualize these connections.

Visual Style:

- Minimalist

- Clean spacing

- Rounded cards

- Soft shadows

- Elegant typography

- Realistic enterprise software

- No placeholder lorem ipsum

- Use realistic Spanish labels and sample data

Generate all screens and ensure navigation between them.

┌─────────────────────────┐

│ Frontend Web │

│ (Lovable / React) │

└───────────┬─────────────┘

 │ HTTP/JSON

 ▼

┌─────────────────────────┐

│ Backend Java │

│ │

│ Controllers │

│ Gestores (Use Cases) │

│ Entidades │

│ Repositorios │

└───────────┬─────────────┘

 │ JDBC/JPA

 ▼

┌─────────────────────────┐

│ Base de Datos Relacional│

│ PostgreSQL / MySQL │

└─────────────────────────┘

``


only │ Frontend Web

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://bolsines-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f437f0e6-04ca-43c7-b464-878260c9c8f3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
