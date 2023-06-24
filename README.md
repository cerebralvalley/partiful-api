# Partiful API

This is an unofficial implementation of the Partiful API.

## Getting Started

### Install dependency

```bash
npm install partiful-api
```

or

```bash
yarn add partiful-api
```

### Import into project

```javascript
import PartifulApi from 'partiful-api';
```

### Create instance

```javascript
const AUTH_TOKEN = '<YOUR_PARTIFUL_AUTH_TOKEN>';
const partifulApiInstance = new PartifulApi(AUTH_TOKEN);
```

## Getting the Auth Token

Since Partiful doesnt offer proper API access with something like an API key, we need to get the auth token from the browser. To do so:

1. Login to Partiful
2. Open the developer tools
3. Go to the network tab
4. Refresh the page
5. Look for a network request that uses the Authentication Bearer token (such as `getMutuals`)
6. Navigate to the request's headers tab
7. Copy the Authorization header's value (without the `Bearer` part)

Note: this token expires after a while, so you'll need to repeat this process every once in a while.

## Endpoints

These are the endpoints that are currently supported (the ones that were found through looking at Partiful's network requests).

Gets the mutuals of the current user.

```
getMutuals()
```

Gets data about users included in the given ids array.

```
getUsers(ids: string[], excludePartyStats = false, includePartyStats = true)
```

Gets contacts that can be invited to the given event.

```
getInvitableContacts(eventId: string, skip = 0, limit = 100)
```

Gets a CSV file containing the guests of the given event.

```
getGuestsCsv(eventId: string, statuses = ['APPROVED', 'PENDING_APPROVAL', 'GOING', 'MAYBE', 'WAITLIST', 'DECLINED'], questionnaire = true)
```

Gets data about the given event.

```
getEvent(eventId: string)
```

## What about other CRUD events?

Partiful uses Firebase for directly interfacing with the database for some of their actions. These include creating / updating / deleting events, etc. These calls can be reverse engineered from the Partiful web app, but have not been yet.

## Contributing

Feel free to open issues and pull requests. Tag iporollo as a reviewer.
