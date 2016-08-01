'use strict';

var allBooks = {};


var shallowCopy = function(arr) {
    return Array.prototype.slice.call(arr);
}

var normalizeKey = function(key) {

}


/***************************************/

exports.getAllBooks = function(callback){
    callback(false, shallowCopy(allBooks).reverse())
};

exports.getBookByISBN = function(isbn, callback){
    callback(false, allBooks.find((book) => book.isbn == isbn));
};

exports.createBook = function(book, callback){

    allBooks.push(book);
    callback(false);

    if(!book) return callback(new Error('No record given'));

    var key = db.createDomainKey('book', book.isbn);
    db.insert(key, book, callback);
};

exports.updateBook = function(book, callback){
    if(!book) return callback(new Error('No record given'));

    var key = db.createDomainKey('book', book.isbn);
    db.update(key, book, callback);
};

exports.deleteBook = function(isbn, callback){
    if(!isbn) return callback(new Error('No record given'));

    var key = db.createDomainKey('book', isbn);
    db.delete(key, callback);
};

exports.reset = function(callback){
    
    callback = callback || function() {};
    
    db.queryKeys(allBooksParams, function(err, list) { 
      if (err) return callback(err);
      
      async.each(list, db.delete, function(err) {
        if (err)  return callback(err);
                
        db.restore(__dirname + '/initial.db', callback);
      });
    });
};
