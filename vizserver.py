from flask import Flask, render_template, send_file

app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('index.html',
                            movie_names = 1)

@app.route('/test')
def test():
    return render_template('test.html',
                            movie_names = 1)

@app.route('/images/<filename>')
def get_image(filename):
    filepath = f'static/images/{filename}'
    return send_file(filepath, mimetype='image/gif')

@app.route('/csv/<filename>')
def get_csv(filename):
    filepath = f'static/csv/{filename}'
    return send_file(filepath, mimetype='text/csv')


@app.route('/images/characters/<filename>')
def get_char_image(filename):
    filepath = f'static/images/characters/{filename}'
    return send_file(filepath, mimetype='image/gif')


@app.route('/images/barcode/<filename>')
def get_barcode_image(filename):
    filepath = f'static/images/barcode/{filename}'
    return send_file(filepath, mimetype='image/gif')


if __name__ == '__main__':
    # app.run()
    app.run(host='127.0.0.1', port=8000)