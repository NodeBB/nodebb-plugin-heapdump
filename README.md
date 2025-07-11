# Heapdump Plugin for NodeBB

A plugin for NodeBB that enables on-demand heap snapshots for memory analysis and debugging. This plugin uses Node.js's native heap snapshot capabilities, allowing administrators to trigger heap dumps via the NodeBB admin panel or an HTTP endpoint. Heap dumps are useful for diagnosing memory leaks and analyzing memory usage in production environments.

## Features

- Trigger heap snapshots from the admin panel or via a secure HTTP endpoint.
- Useful for debugging memory leaks and performance issues.

## Usage

1. Install the plugin using npm (see below).
2. Restart your NodeBB instance.
3. Navigate to the plugin's settings in the admin panel to trigger a heap dump.


## Installation

    npm install nodebb-plugin-heapdump


