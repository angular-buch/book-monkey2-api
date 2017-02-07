import { Book, Thumbnail } from './shared/book'

export class SomeBooks {
  public static get() {
    return [
      new Book(
        '9783864903571',
        'Angular',
        ['Gregor Woiwode', 'Ferdinand Malcher', 'Danny Koppenhagen', 'Johannes Hoppe'],
        new Date('2017-04-01T12:00:00.000Z'),
        'Einstieg in die komponentenbasierte Entwicklung von Web- und Mobile-Anwendungen',
        5,
        [new Thumbnail('https://ng-buch.de/cover2.jpg', 'Front Cover')],
        'Mit diesem Buch arbeiten Sie sich durch Googles neuestes Framework und erstellen mit aktuellen Technologien moderne Webanwendungen. Lernen und vertiefen Sie die komponentenorientierte Entwicklung von Single-Page-Anwendungen. Neben den Grundlagen werden auch fortgeschrittene Konzepte von Angular am Beispiel erklärt.'),
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
