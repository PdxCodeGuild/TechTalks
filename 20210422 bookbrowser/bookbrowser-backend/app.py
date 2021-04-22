

from flask import Flask, request
import json
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
db = SQLAlchemy(app)


class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    author = db.Column(db.String(200), nullable=False)
    language = db.Column(db.String(200), nullable=False)
    country = db.Column(db.String(200), nullable=False)
    year = db.Column(db.Integer(), nullable=False)
    pages = db.Column(db.Integer(), nullable=False)
    image = db.Column(db.String(200), nullable=False)
    url = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return self.title



def load_books_json():
    with open('books.json', 'r') as file:
        text = file.read()
    return json.loads(text)

@app.route('/jsondb/')
def jsondb():
    data = load_books_json()
    if 'search' in request.args:
        search = request.args['search'].casefold()
        data['books'] = [book for book in data['books'] if search in book['title'].casefold() or search in book['author'].casefold()]
    return data


@app.route('/books/')
def books():
    if 'search' in request.args:
        search = request.args['search']
        books = Book.query.filter(or_(
                Book.title.contains(search),
                Book.author.contains(search)))
    else:
        books = Book.query.all()
    output = {'books': []}
    for book in books:
        output['books'].append({
            'id': book.id,
            'title': book.title,
            'author': book.author,
            'image': book.image,
        })
    return output


@app.route('/books/<int:book_id>/')
def book_detail(book_id):
    book = Book.query.get(book_id)
    book = {
        'id': book.id,
        'title': book.title,
        'author': book.author,
        'language': book.language,
        'country': book.country,
        'year': book.year,
        'pages': book.pages,
        'image': book.image,
        'url': book.url
    }
    return book




@app.route('/reset/')
def reset():
    data = load_books_json()
    db.drop_all()
    db.create_all()
    for book_data in data['books']:
        book = Book(**book_data)
        db.session.add(book)
    db.session.commit()
    return 'success'
    
app.run(debug=True)

