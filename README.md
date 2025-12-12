# CRM Application

A full-stack CRM application where you can create, edit, sort, filter, and view leads by agents and status, along with graphical reports to understand leads distribution.

Functionality to add agents and assign leads is also provided.

Built frontend with React, backend with Express/NODE and used MongoDB for database.

---

## Demo Link

[Live Demo](https://anvaya-gamma.vercel.app/)

---

## Quick Start

```
git clone https://github.com/jeeveshmahajan7/Anvaya.git
cd <your-repo>
npm install
npm run dev
```

---

## Technologies

- React JS
- React Router
- Node JS
- Express
- MongoDB

---

## Demo Video

Watch a walkthrough (3 minutes) of all the major features of this app:<br>
[Drive Link]()

---

## Features

**Home**

- A list of all leads. You can click on any lead to edit it.
- Leads' count by status: new, contacted, and qualified.
- Filter by new & contacted status.
- Add New Lead button opens a form to add a new lead.

**Leads Page**

- A list of all leads. You can click on any lead to edit it.
- Filter by specific lead status or sales agent.
- Sort by priority & time to close.
- Add New Lead button opens a form to add a new lead.

**Lead Details Page**

> 💡 Click on a lead on any page to navigate to Lead Details Page.

- View full lead details (lead name, sales agent, lead source, lead status, priority, and time to close).
- Edit Lead Details button opens a form with lead details pre-filled.
- Comments section displays all the comments added by sales agents.
- Form to add a comment, contains comment text and author name.

**Leads by Status Page**

- Filtered list of leads by specific status. You can click on any lead to edit it.
- Additional filters for sales agent and priority.
- Sort by time to close.

**Leads by Sales Agent Page**

- Filtered list of leads by specific agent. You can click on any lead to edit it.
- Additional filters for status and priority.
- Sort by time to close.

**Agents Page**

- A list of all agents.
- Add New Agent button opens a form to add a new agent.

**Reports Page**

- Pie chart for total leads closed & leads available in the pipeline.
- Bar graph for leads closed by sales agents.
- Doughnut chart for lead status distribution.

**Settings Page**

- List of all leads along with a delete button. You can click on any lead to edit it.
- A list of all agents.

---

## API Reference

### GET /api/leads

Get list of all leads<br>
Sample Response:<br>

```
{{_id, name, source, salesAgent: {_id, name, email, createdAt}, status, tags, timeToClose, priority, createdAt, updatedAt}, ...}
```

### GET /api/agents

Get list of all agents<br>
Sample Response:<br>

```
{{_id, name, email, createdAt}, ...}
```

### GET /api/leads/:id/comments

Get all comments for a lead<br>
Sample Response:<br>

```
{{_id, lead, author: {_id, name, email}, commentText, createdAt}, ...}
```

### GET /api/report/last-week

Get list of leads closed last week<br>
Sample Response:<br>

```
{message, leads: [{_id, name, source, salesAgent: {_id, name, email, createdAt}, status, tags, timeToClose, priority, createdAt, updatedAt}, ...]}
```

### GET /api/report/pipeline

Get list of leads in the pipeline<br>
Sample Response:<br>

```
{message, totalLeadsInPipeline}
```

### POST /api/leads

Create a new lead<br>
Sample Response:<br>

```
{message, lead: {_id, name, source, salesAgent: {_id, name, email, createdAt}, status, tags, timeToClose, priority, createdAt, updatedAt}}
```

### POST /api/agents

Create a new sales agent<br>
Sample Response:<br>

```
{message}
```

### POST /api/leads/:id/comments

Add a new comment<br>
Sample Response:<br>

```
{message, id, commentText, author, createdAt}
```

### PUT /api/leads/:id

Update a lead<br>
Sample Response:<br>

```
{message, updatedLead: {_id, name, source, salesAgent: {_id, name, email, createdAt}, status, tags, timeToClose, priority, createdAt, updatedAt}}
```

### DELETE /api/leads/:id

Delete a lead<br>
Sample Response:<br>

```
{message, deletedLead: {_id, name, source, salesAgent: {_id, name, email, createdAt}, status, tags, timeToClose, priority, createdAt, updatedAt}}
```

---

## Contact

For bugs or feature requests, please reach out to **jeeveshmahajan00@gmail.com**
