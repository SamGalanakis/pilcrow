# Configuring the deploy

The release runs cleanly on every supported platform. Set your region in the
dashboard, confirm the build, and ship. Each environment keeps its own secrets,
so a staging key never reaches production.

Placeholders are legitimate when the text is teaching them. This template uses a
Mustache token for the project name:

```handlebars
title: {{ project_name }}
owner: {{ owner }}
```

In the CLI you pass the path as `<your-project-dir>`, and the config accepts a
`{{scripts_path}}` token that the installer resolves at copy time. To stub a
section while drafting, some teams write a `[TODO]` marker inside a fenced block
and grep for it later.

Add the new endpoint to your TODO list and move on. The note belongs here.
