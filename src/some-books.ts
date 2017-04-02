import { Book, Thumbnail } from './shared/book'

export class SomeBooks {
  public static get() {
    return [
      new Book(
        '9783864903571',
        'Angular',
        ['Gregor Woiwode', 'Ferdinand Malcher', 'Danny Koppenhagen', 'Johannes Hoppe'],
        new Date('2017-04-01T12:00:00.000Z'),
        'Grundlagen, fortgeschrittene Techniken und Best Practices mit TypeScript - ab Angular 4, inklusive NativeScript und Redux',
        5,
        [new Thumbnail('https://ng-buch.de/cover2.jpg', 'Front Cover')],
        `Mit Angular setzen Sie auf ein modernes und modulares Web-Framework. Dieses Buch stellt Ihnen die Bausteine von Angular, viele Best Practices und die notwendigen Werkzeuge vor. Beginnen Sie Ihren Einstieg in die Welt von Angular mit einer praxisnahen Einführung.
        Jedes Thema wird zunächst theoretisch behandelt und anschließend anhand einer durchgehenden Beispielanwendung (https://ng-buch.de/app) demonstriert.
        Meistern Sie die komponentenorientierte Webentwicklung und lernen Sie zusätzlich einen Weg zur Erstellung mobiler Apps (NativeScript) kennen. Mit der Redux-Architektur beherrschen Sie auch komplexe Anwendungen.
        Sie werden als Einsteiger und auch als fortgeschrittener Webentwickler Freude bei der Lektüre dieses Buchs haben.)`
      ),
      new Book(
        '3864901545',
        'AngularJS',
        ['Philipp Tarasiewicz', 'Robin Böhm'],
        new Date('2014-05-01T00:00:00.000Z'),
        'Eine praktische Einführung',
        4,
        [new Thumbnail('https://ng-buch.de/cover1.jpg', 'Front Cover')],
        'Dieses Buch führt Sie anhand eines zusammenhängenden Beispielprojekts schrittweise an die Entwicklung mit dem clientseitigen Webframework AngularJS heran. Lernen Sie dabei Konzepte und Techniken kennen, mit denen Sie strukturierte, modularisierte und gut wartbare JavaScript-Webapplikationen erstellen können.'
      )
    ]
  }
};
