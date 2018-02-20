"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var urlmapping = require('../urlmapping.json');
var RedirectController = (function () {
    function RedirectController() {
    }
    RedirectController.prototype.normalizeUrl = function (url) {
        return url ? url.toLowerCase()
            .replace('-', '')
            .replace(/^\//, '')
            .replace(/\.git.*/, '') : 'NO_URL_SOMETHING_WENT_WRONG';
    };
    RedirectController.prototype.redirect = function (req, res, next) {
        var _this = this;
        var currentUrl = this.normalizeUrl(req.url);
        var isGitUrl = !!~req.url.indexOf('.git');
        var match = _(urlmapping)
            .find(function (redirectUrl, redirectMatch) {
            var normalizeMapping = _this.normalizeUrl(redirectMatch);
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
    };
    // /a/xxx or /avatar/XXX to https://gravatar.com/avatar/XXX?s=80&default=wavatar
    RedirectController.prototype.avatarRedirect = function (req, res, next) {
        var data = req.url.replace(/^\/(a\/|avatar\/)/, '');
        var redirect = "https://gravatar.com/avatar/" + data + "?s=80&default=wavatar";
        return res.redirect(301, redirect, next);
    };
    return RedirectController;
}());
exports.RedirectController = RedirectController;
//# sourceMappingURL=redirect-controller.js.map