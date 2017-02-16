import * as _ from 'lodash';

let urlmapping = require('../urlmapping.json');

export class RedirectController {

  private normalizeUrl(url: string): string {
    return url ? url.toLowerCase()
      .replace('-', '')
      .replace(/^\//, '')
      .replace(/\.git$/, '') : 'FALSY';
  }

  redirect(req, res, next) {

    let currentUrl = this.normalizeUrl(req.url);
    let isGitUrl = _.endsWith(req.url, '.git'); // attach .git to the redirect target if shortlink ends with .git

    var match = _(urlmapping)
      .find((redirectUrl, redirectMatch) => {

        let normalizeMapping = this.normalizeUrl(redirectMatch);
        return ~normalizeMapping.indexOf(currentUrl);
      });

    if (match) {
      return res.redirect(302, isGitUrl ? match + '.git' : match, next);
    }

    // nothing found
    return res.redirect(302, 'https://angular-buch.com', next);
  }
}
