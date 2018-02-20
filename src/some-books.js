"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var book_1 = require("./shared/book");
var SomeBooks = (function () {
    function SomeBooks() {
    }
    SomeBooks.get = function () {
        return [
            new book_1.Book('9783864903571', 'Angular', ['Gregor Woiwode', 'Ferdinand Malcher', 'Danny Koppenhagen', 'Johannes Hoppe'], new Date('2017-04-01T12:00:00.000Z'), 'Grundlagen, fortgeschrittene Techniken und Best Practices mit TypeScript - ab Angular 4, inklusive NativeScript und Redux', 5, [new book_1.Thumbnail('https://ng-buch.de/cover2.jpg', 'Front Cover')], "Mit Angular setzen Sie auf ein modernes und modulares Web-Framework. Dieses Buch stellt Ihnen die Bausteine von Angular, viele Best Practices und die notwendigen Werkzeuge vor. Beginnen Sie Ihren Einstieg in die Welt von Angular mit einer praxisnahen Einf\u00FChrung.\n        Jedes Thema wird zun\u00E4chst theoretisch behandelt und anschlie\u00DFend anhand einer durchgehenden Beispielanwendung (https://ng-buch.de/app) demonstriert.\n        Meistern Sie die komponentenorientierte Webentwicklung und lernen Sie zus\u00E4tzlich einen Weg zur Erstellung mobiler Apps (NativeScript) kennen. Mit der Redux-Architektur beherrschen Sie auch komplexe Anwendungen.\n        Sie werden als Einsteiger und auch als fortgeschrittener Webentwickler Freude bei der Lekt\u00FCre dieses Buchs haben.)"),
            new book_1.Book('3864901545', 'AngularJS', ['Philipp Tarasiewicz', 'Robin Böhm'], new Date('2014-05-01T00:00:00.000Z'), 'Eine praktische Einführung', 4, [new book_1.Thumbnail('https://ng-buch.de/cover1.jpg', 'Front Cover')], 'Dieses Buch führt Sie anhand eines zusammenhängenden Beispielprojekts schrittweise an die Entwicklung mit dem clientseitigen Webframework AngularJS heran. Lernen Sie dabei Konzepte und Techniken kennen, mit denen Sie strukturierte, modularisierte und gut wartbare JavaScript-Webapplikationen erstellen können.')
        ];
    };
    return SomeBooks;
}());
exports.SomeBooks = SomeBooks;
;
//# sourceMappingURL=some-books.js.map