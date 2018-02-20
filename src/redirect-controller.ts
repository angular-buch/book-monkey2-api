import * as _ from 'lodash';

let urlmapping = require('../urlmapping.json');

export class RedirectController {

  private normalizeUrl(url: string): string {
    return url ? url.toLowerCase()
      .replace('-', '')
      .replace(/^\//, '')
      .replace(/\.git.*/, '') : 'NO_URL_SOMETHING_WENT_WRONG';
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

      res.set('X-Redirect-Reason', 'Urlmapping Match (' + match + ')');
      return res.redirect(301, match, next);
    }

    // nothing found
    res.set('X-Redirect-Reason', 'Nothing Found');
    return res.redirect(302, 'https://angular-buch.com', next);
  }

  // /a/xxx or /avatar/XXX to https://gravatar.com/avatar/XXX?s=80&default=wavatar
  avatarRedirect(req, res, next) {
    let data = req.url.replace(/^\/(a\/|avatar\/)/, '');
    let redirect = `https://gravatar.com/avatar/${data}?s=80&default=wavatar`;

    res.set('X-Redirect-Reason', 'Avatar Shortener');
    return res.redirect(301, redirect, next);
  }
}
