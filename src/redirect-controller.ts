import * as _ from 'lodash';

let urlmapping = require('../urlmapping.json');

export class RedirectController {

  private normalizeUrl(url: string): string {
    return url ? url.toLowerCase().replace('-', '').replace(/^\//, '') : 'FALSY';
  }

  redirect(req, res, next) {

    let currentUrl = this.normalizeUrl(req.url);

    var match = _(urlmapping)
      .find((redirectUrl, redirectMatch) => {

        let normalizeMapping = this.normalizeUrl(redirectMatch);
        return ~normalizeMapping.indexOf(currentUrl);
      });

    if (match) {
      return res.redirect(302, match, next);
    }

    // nothing found
    return res.redirect(302, 'https://angular-buch.com', next);
  }
}
