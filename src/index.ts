import fetch from 'node-fetch';
import cheerio from 'cheerio';

export default class PartifulApi {
  authToken: string;

  constructor(authToken: string) {
    this.authToken = authToken;
  }

  async getMutuals() {
    const url = 'https://us-central1-getpartiful.cloudfunctions.net/getMutualsV2';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.authToken}`,
      },
      body: JSON.stringify({
        data: {
          params: {},
          paging: { cursor: null, maxResults: 8 },
        },
      }),
    });

    return response.json();
  }

  async getUsers(ids: string[], excludePartyStats = false, includePartyStats = true) {
    const url = 'https://us-central1-getpartiful.cloudfunctions.net/getUsersV2';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${encodeURIComponent(this.authToken)}`,
      },
      body: JSON.stringify({
        data: {
          params: {
            excludePartyStats: excludePartyStats,
            ids: ids,
            includePartyStats: includePartyStats,
          },
        },
      }),
    });

    return response.json();
  }

  async getInvitableContacts(eventId: string, skip = 0, limit = 100) {
    const url = 'https://us-central1-getpartiful.cloudfunctions.net/getInvitableContactsV2';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${encodeURIComponent(this.authToken)}`,
      },
      body: JSON.stringify({
        data: {
          params: {
            skip,
            limit,
            eventId,
          },
        },
      }),
    });

    return response.json();
  }

  async getGuestsCsv(
    eventId: string,
    statuses = ['APPROVED', 'PENDING_APPROVAL', 'GOING', 'MAYBE', 'WAITLIST', 'DECLINED'],
    questionnaire = true,
  ) {
    let url = `https://us-central1-getpartiful.cloudfunctions.net/getGuestsCsvV2?eventId=${eventId}&questionnaire=${questionnaire}`;

    const allowedStatuses = ['APPROVED', 'PENDING_APPROVAL', 'GOING', 'MAYBE', 'WAITLIST', 'DECLINED'];

    // Append statuses to the URL only if they are in the allowedStatuses array
    for (const status of statuses) {
      if (allowedStatuses.includes(status)) {
        url += `&statuses=${status}`;
      }
    }

    const response = await fetch(url, {
      headers: {
        authorization: `Bearer ${encodeURIComponent(this.authToken)}`,
      },
    });

    const csv = await response.text();
    return csv;
  }

  async getEvent(eventId: string) {
    const url = `https://partiful.com/e/${eventId}`;
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const name = $('h1 span').first().text();
    const timeElement = $('time');
    const dateTime = timeElement.attr('datetime') || null;
    const startDatetime = dateTime ? new Date(dateTime).toISOString() : null;

    // TODO: Parse event end time from HTML

    const event = {
      id: eventId,
      name: name,
      startDateTime: startDatetime,
      url: url,
    };

    return event;
  }
}
