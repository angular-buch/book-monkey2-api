import * as _ from 'lodash';

let urlmapping = require('../urlmapping.json');

export class RedirectController {

  private normalizeUrl(url: string): string {
    return url ? url.toLowerCase()
      .replace('-', '')
      .replace(/^\//, '')
      .replace(/\.git.*/, '') : 'FALSY';
  }

  redirect(req, res, next) {

    let currentUrl = this.normalizeUrl(req.url);
    let isGitUrl = !!~req.url.indexOf('.git');

    var match = _(urlmapping)
      .find((redirectUrl, redirectMatch) => {

        let normalizeMapping = this.normalizeUrl(redirectMatch);
        return ~normalizeMapping.indexOf(currentUrl);
      });

    if (match) {

      // attach .git* to the redirect target if shortlink contains .git
      if (isGitUrl) {
        var parts = req.url.split('.git');
        match = match + '.git' + parts[1];
      }

      return res.redirect(301, match, next);
    }

    // nothing found
    return res.redirect(302, 'https://angular-buch.com', next);
  }
}
